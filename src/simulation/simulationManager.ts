import { Scene3D } from './scene';
import { DataManager } from '../util/dataManager';
import { SelectedData } from '../types/types';

let curScene: Scene3D | null = null;
export function getCurScene() {
    return curScene;
}

export class SimulationManager {
    public scene: Scene3D | null = null;
    private canvas: HTMLCanvasElement;
    private isBuilt = false;
    private isRunning = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    // Collects all user-selected data at this point (from UI) and builds the substance based on that data. 
    // If none is selected, it will build a default substance. If only some data is selected, it will build with
    // whatever the user has selected, and then use the default values for the rest.
    async toggleBuild(): Promise<void> {
        if (this.isBuilt) {
            this.destroySubstance();
        } else {
            let data = DataManager.collectAllData();
            await this.buildSubstance(data);
        }
    }

    private async buildSubstance(simulationData: SelectedData): Promise<void> {
        console.log('building substance')
        this.scene = new Scene3D(this.canvas, simulationData);
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