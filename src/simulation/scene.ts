import * as THREE from 'three';
import { ModelSetupData, SelectedData, RunDynamicsData, ScriptData } from '../types/types';

const defaultModelData: ModelSetupData = {
    atomType: 'He',
    boundary: 'Fixed Walls',
    potentialModel: 'No Potential',
    numAtoms: 1,
    atomicMass: 1,
    potentialParams: {
        sigma: 1,
        epsilon: 1
    }
};
const defaultRunDynamicsData: RunDynamicsData = {
    simulationType: 'Const-PT',
    temperature: 0,
    volume: 0,
    timeStep: 0,
    stepCount: 0,
    interval: 0
};
const defaultScriptData: ScriptData = {
    script: 'Default Script Contents'
};

export class Scene3D {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private cube: THREE.Mesh;
    public rotate = false;
    private modelData: ModelSetupData;
    private runDynamicsData: RunDynamicsData;
    private ScriptData: ScriptData;
    
    private static readonly CANVAS_WIDTH = 400;
    private static readonly CANVAS_HEIGHT = 400;

    constructor(canvas: HTMLCanvasElement, selectedData?: Partial<SelectedData>) {
        this.modelData = selectedData?.ModelSetupData ?? defaultModelData;
        this.runDynamicsData = selectedData?.RunDynamicsData ?? defaultRunDynamicsData;
        this.ScriptData = selectedData?.ScriptData ?? defaultScriptData;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75, 
            Scene3D.CANVAS_WIDTH / Scene3D.CANVAS_HEIGHT, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ 
            canvas, 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(Scene3D.CANVAS_WIDTH, Scene3D.CANVAS_HEIGHT, false);

        const geometry = new THREE.BoxGeometry(2,2,2);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xF3F3F3,
            transparent: true,
            opacity: 0.8
        });
        this.cube = new THREE.Mesh(geometry, material);

        const edges = new THREE.EdgesGeometry(geometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x0F0F0F });
        const edgeLines = new THREE.LineSegments(edges, edgesMaterial);
        this.cube.add(edgeLines);

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        this.scene.add(ambientLight);
        this.scene.add(this.cube);

        this.animate();
    }

    private deltaScale = 1;
    private lastTime = 0;

    private _intervalID:number|null = null;
    private animate = () => {
        this._intervalID = requestAnimationFrame(this.animate);

        if(this.rotate) {
            this.cube.rotation.x += 0.002 * this.deltaScale;
            this.cube.rotation.y += 0.002 * this.deltaScale;
            this.cube.rotation.z += 0.002 * this.deltaScale;
        }

        this.renderer.render(this.scene, this.camera);

        const now = performance.now();
        const delta = now - this.lastTime;
        this.deltaScale = delta / (1000 / 60);
        this.lastTime = performance.now();

        // console.log(16.6667/delta*60, this.deltaScale);
    }

    dispose(): void {
        if(this._intervalID != null) {
            cancelAnimationFrame(this._intervalID);
            this._intervalID = null;
        }
        for(const child of this.scene.children) {
            this.scene.remove(child);
        }
    }
}