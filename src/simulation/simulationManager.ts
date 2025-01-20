import { Scene3D } from './scene';
import {
    InputData,
    OutputData,
    atomType,
    boundary,
    potentialModel,
    simulationType
} from '../types/types';

let curScene: Scene3D | null = null;
export function getCurScene() {
    return curScene;
}

export class SimulationManager {
    public scene: Scene3D | null = null;
    private canvas: HTMLCanvasElement;
    private isBuilt = false;
    private isRunning = false;
    private inputData: InputData;
    private outputData: OutputData;

    constructor(canvas: HTMLCanvasElement, inputData: InputData, outputData: OutputData) {
        this.canvas = canvas;
        this.inputData = inputData;
        this.outputData = outputData;
    }

    // Model Setup Updates
    updateAtomCount(numAtoms: number): void {
        this.inputData.ModelSetupData.numAtoms = numAtoms;
    }

    updateAtomType(atomType: atomType): void {
        this.inputData.ModelSetupData.atomType = atomType;
    }

    updateAtomicMass(mass: number): void {
        this.inputData.ModelSetupData.atomicMass = mass;
    }

    updateBoundary(boundary: boundary): void {
        this.inputData.ModelSetupData.boundary = boundary;
    }

    updatePotentialModel(model: potentialModel): void {
        this.inputData.ModelSetupData.potentialModel = model;
    }

    // Run Dynamics Updates
    updateSimulationType(type: simulationType): void {
        this.inputData.RunDynamicsData.simulationType = type;
    }

    updateInitialTemperature(temp: number): void {
        this.inputData.RunDynamicsData.initialTemperature = temp;
    }

    updateInitialVolume(volume: number): void {
        this.inputData.RunDynamicsData.initialVolume = volume;
    }

    updateTimeStep(step: number): void {
        this.inputData.RunDynamicsData.timeStep = step;
    }

    updateStepCount(count: number): void {
        this.inputData.RunDynamicsData.stepCount = count;
    }

    updateInterval(interval: number): void {
        this.inputData.RunDynamicsData.interval = interval;
    }

    // Script Updates
    updateRunCount(count: number): void {
        this.inputData.ScriptData = count;
    }

    // Core Functionality
    async toggleBuild(): Promise<void> {
        if (this.isBuilt) {
            this.destroySubstance();
        } else {
            if(this.inputData === undefined) {
                alert("Input data is undefined");
                return;
            }
            await this.buildSubstance(this.inputData);
        }
    }

    private async buildSubstance(inputData: InputData): Promise<void> {
        console.log('Building substance with:', inputData);
        this.scene = new Scene3D(this.canvas, inputData);
        
        if (this.scene) {
            const numAtoms = inputData.ModelSetupData.numAtoms;
            const atomType = inputData.ModelSetupData.atomType;
            const atomicMass = inputData.ModelSetupData.atomicMass;
            
            console.log(`Adding ${numAtoms} atoms of type ${atomType}`);
            for (let i = 0; i < numAtoms; i++) {
                this.scene.addAtom(atomType, atomicMass);
            }
        }

        this.inputData = inputData;
        this.isBuilt = true;
        curScene = this.scene;
    }

    private destroySubstance(): void {
        if (this.scene) {
            this.scene.rotate = false;
            this.scene.dispose();
            this.scene = null;
        }
        this.isBuilt = false;
        this.isRunning = false;
    }

    toggleSimulation(): void {
        if (!this.scene || !this.isBuilt) return;
        
        if (!this.isRunning) {
            // Start simulation
            this.scene.startRun();
            this.scene.rotate = true;
            this.isRunning = true;
        } else {
            // Stop simulation
            this.scene.rotate = false;
            this.outputData = this.scene.stopRun() || this.outputData;
            this.isRunning = false;
        }
    }

    getOutput(): OutputData {
        return this.outputData;
    }

    isSubstanceBuilt(): boolean {
        return this.isBuilt;
    }

    isSimulationRunning(): boolean {
        return this.isRunning;
    }
}