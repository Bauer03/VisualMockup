import * as THREE from 'three';
import { ModelSetupData, SelectedData, RunDynamicsData, ScriptData, rotateOpx } from '../types/types';
import { ThemeManager } from '../theme/themeManager'; // may need for mid render color changes, idk
import { OrbitControls } from 'three/examples/jsm/Addons.js';

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
    private selectedData: SelectedData;
    
    private deltaScale = 1;
    private lastTime = 0;
    private _intervalID:number|null = null;

    private static readonly CANVAS_WIDTH = 400;
    private static readonly CANVAS_HEIGHT = 400;

    private controls:OrbitControls;

    constructor(canvas: HTMLCanvasElement, selectedData: SelectedData) {
        this.selectedData = selectedData;
        this.modelData = selectedData.ModelSetupData ?? defaultModelData;
        this.runDynamicsData = selectedData.RunDynamicsData ?? defaultRunDynamicsData;
        this.ScriptData = selectedData.ScriptData ?? defaultScriptData;

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

        this.controls = new OrbitControls(this.camera,this.renderer.domElement);

        const geometry = new THREE.BoxGeometry(2,2,2);
        const material = new THREE.MeshBasicMaterial({
            color: 0xF3F3F3,
            transparent: true,
            opacity: 0.7
        });
        this.cube = new THREE.Mesh(geometry, material);

        const edges = new THREE.EdgesGeometry(geometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xAAAAAA });
        const edgeLines = new THREE.LineSegments(edges, edgesMaterial);
        this.cube.add(edgeLines);

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        this.scene.add(ambientLight);
        this.scene.add(this.cube);

        this.animate();
    }

    private animate = () => {
        this._intervalID = requestAnimationFrame(this.animate);
        this.controls.update();

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

        // Frame per second debug - don't delete
        // console.log(16.6667/delta*60, this.deltaScale);
    }

    dispose(): void {
        if(this._intervalID != null) {
            cancelAnimationFrame(this._intervalID);
            this._intervalID = null;
        }
        this.scene.clear();
        
        // don't necessarily need to do this, but it visually indicates that the substance is no longer built
        this.cube.visible = false;
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Rotates the substance in the direction specified by the rotateOpx object.
     */
    rotateSubstance(rotateOpx: rotateOpx): void {
        switch(rotateOpx.rotationAxis) {
            case 'x':
                if (rotateOpx.sign === '-') {
                    this.cube.rotation.x -= 0.04;
                } else this.cube.rotation.x += 0.04;
                break;
            case 'y':
                if (rotateOpx.sign === '-') {
                    this.cube.rotation.y -= 0.04;
                } else this.cube.rotation.y += 0.04;
                break;
            case 'z':
                if (rotateOpx.sign === '-') {
                    this.cube.rotation.z -= 0.04;
                } else this.cube.rotation.z += 0.04;
                break;
        }
        this.renderer.render(this.scene, this.camera);
    }

    // zoom in our out. why am I negating zoomIn? because it worky
    zoomCamera(zoomIn: boolean): void {
        const zoom = !zoomIn ? 1.1 : 0.9;
        this.camera.position.z *= zoom;
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    }
}