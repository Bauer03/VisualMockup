import { Scene3D } from './scene';
import { DataManager } from '../util/dataManager';
import { SelectedData } from '../types/types';

export class SimulationManager {
    private scene: Scene3D | null = null;
    private canvas: HTMLCanvasElement;
    private isBuilt = false;
    private isRunning = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    async toggleBuild(): Promise<void> {
        if (this.isBuilt) {
            this.destroySubstance();
        } else {
            let data = DataManager.collectSelectedData();
            await this.buildSubstance(data);
        }
    }

    private async buildSubstance(simulationData: SelectedData): Promise<void> {
        this.scene = new Scene3D(this.canvas, simulationData);
        this.isBuilt = true;
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
        
        this.isRunning = !this.isRunning;
        this.scene.rotate = this.isRunning;
    }

    isSubstanceBuilt(): boolean {
        return this.isBuilt;
    }

    isSimulationRunning(): boolean {
        return this.isRunning;
    }
}