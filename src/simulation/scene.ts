import * as THREE from 'three';
import {
    rotateOpx,
    InputData,
    OutputData
} from '../types/types';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export class Scene3D {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private atoms: THREE.Mesh[] = [];  
    private container: THREE.LineSegments;  
    public rotate = false;
    private inputData: InputData;
    private outputData: OutputData | null = null;
    private runInProgress = false;
    
    private deltaScale = 1;
    private lastTime = 0;
    private _intervalID: number|null = null;

    private static readonly CANVAS_WIDTH = 400;
    private static readonly CANVAS_HEIGHT = 400;

    private controls: OrbitControls;

    constructor(canvas: HTMLCanvasElement, inputData: InputData) {
        this.inputData = inputData;
        this.scene = new THREE.Scene();

        // Set up camera for a wider view
        this.camera = new THREE.PerspectiveCamera(
            75, 
            Scene3D.CANVAS_WIDTH / Scene3D.CANVAS_HEIGHT, 
            0.1, 
            1000
        );
        this.camera.position.z = 15;  // Moved back to see more atoms

        this.renderer = new THREE.WebGLRenderer({ 
            canvas, 
            antialias: true
        });

        this.scene.background = null;
        this.renderer.setClearAlpha(0);

        // Set size with false to prevent changes to canvas style
        this.renderer.setSize(Scene3D.CANVAS_WIDTH, Scene3D.CANVAS_HEIGHT, false);
        // Cap pixel ratio at 2 to prevent performance issues on high-DPI displays
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        
        const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
        const edges = new THREE.EdgesGeometry(boxGeometry);
        const linesMaterial = new THREE.LineBasicMaterial({ 
            color: 0xf3f3f3,
            transparent: true,
            opacity: 0.5
        });
        this.container = new THREE.LineSegments(edges, linesMaterial);
        this.scene.add(this.container);

        // lights
        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
        const pointLight = new THREE.PointLight(0xFFFFFF, 0.8);
        pointLight.position.set(5, 5, 5);
        this.scene.add(ambientLight);
        this.scene.add(pointLight);

        // initial render
        this.renderer.render(this.scene, this.camera);

        this.animate();
        this.initializeOutputData();
    }

    private animate = () => {
        this._intervalID = requestAnimationFrame(this.animate);
        this.controls.update();

        if (this.rotate && this.runInProgress) {
            this.atoms.forEach((atom, index) => {
                const speed = 0.001 * (1 + (index % 3) * 0.5);
                atom.rotation.x += speed * this.deltaScale;
                atom.rotation.y += speed * this.deltaScale;
                atom.rotation.z += speed * this.deltaScale;
            });
        }

        this.renderer.render(this.scene, this.camera);

        const now = performance.now();
        const delta = now - this.lastTime;
        this.deltaScale = delta / (1000 / 60);
        this.lastTime = now;
    }

    private initializeOutputData(): void {
        this.outputData = {
            basic: {
                temperature: { sample: 0, average: 0 },
                pressure: { sample: 0, average: 0 },
                volume: { sample: 0, average: 0 }
            },
            energy: {
                total: { sample: 0, average: 0 },
                kinetic: { sample: 0, average: 0 },
                potential: { sample: 0, average: 0 }
            }
        };
    }

    startRun(): void {
        this.runInProgress = true;
        this.initializeOutputData();
    }

    stopRun(): OutputData | null {
        this.runInProgress = false;
        
        // will implement the final calculations based on atom positions/states
        if (this.outputData) {
            // calculations
            this.calculateFinalOutput();
        }
        
        return this.outputData;
    }

    private calculateFinalOutput(): void {
        if (!this.outputData) return;
        
        // Placeholder for actual calculations
        // implement the real physics calculations based on final atom positions, velocities, etc.
        
        // Example structure:
        this.outputData.basic.temperature.sample = 0;  // Replace with actual calculation
        this.outputData.basic.pressure.sample = 0;     // Replace with actual calculation
        this.outputData.basic.volume.sample = 0;       // Replace with actual calculation
        
        this.outputData.energy.total.sample = 0;       // Replace with actual calculation
        this.outputData.energy.kinetic.sample = 0;     // Replace with actual calculation
        this.outputData.energy.potential.sample = 0;   // Replace with actual calculation
        
        // Set averages equal to samples for now
        // Replace with actual averaging if needed
        this.outputData.basic.temperature.average = this.outputData.basic.temperature.sample;
        this.outputData.basic.pressure.average = this.outputData.basic.pressure.sample;
        this.outputData.basic.volume.average = this.outputData.basic.volume.sample;
        
        this.outputData.energy.total.average = this.outputData.energy.total.sample;
        this.outputData.energy.kinetic.average = this.outputData.energy.kinetic.sample;
        this.outputData.energy.potential.average = this.outputData.energy.potential.sample;
    }

    addAtom(atomType: string, atomicMass: number): void {
        console.log(`Adding atom of type ${atomType} with mass ${atomicMass}`);
        
        const geometry = new THREE.SphereGeometry(0.3, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: this.getAtomColor(atomType),
            specular: 0x444444,
            shininess: 30
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        
        // Position within the container boundaries
        sphere.position.x = (Math.random() - 0.5) * 8;  // Range: -4 to 4
        sphere.position.y = (Math.random() - 0.5) * 8;
        sphere.position.z = (Math.random() - 0.5) * 8;
        
        this.atoms.push(sphere);
        this.scene.add(sphere);
        
        console.log(`Added atom at position:`, sphere.position);
    }

    private getAtomColor(atomType: string): number {
        // Color scheme for different atoms
        const colors = {
            'He': 0xFF69B4,  // Pink
            'Ne': 0xFF4500,  // Orange Red
            'Ar': 0x4B0082,  // Indigo
            'Kr': 0x800080,  // Purple
            'Xe': 0x008080,  // Teal
            'User': 0x3498db  // Blue
        };
        return colors[atomType as keyof typeof colors] || 0x3498db;
    }

    dispose(): void {
        if (this._intervalID != null) {
            cancelAnimationFrame(this._intervalID);
            this._intervalID = null;
        }
        this.atoms.forEach(atom => this.scene.remove(atom));
        this.atoms = [];
        this.scene.remove(this.container);
        this.scene.clear();
        this.renderer.dispose();
    }

    rotateSubstance(rotateOpx: rotateOpx): void {
        // Rotate all atoms
        this.atoms.forEach(atom => {
            switch(rotateOpx.rotationAxis) {
                case 'x':
                    atom.rotation.x += (rotateOpx.sign === '-' ? -0.04 : 0.04);
                    break;
                case 'y':
                    atom.rotation.y += (rotateOpx.sign === '-' ? -0.04 : 0.04);
                    break;
                case 'z':
                    atom.rotation.z += (rotateOpx.sign === '-' ? -0.04 : 0.04);
                    break;
            }
        });
        this.renderer.render(this.scene, this.camera);
    }

    zoomCamera(zoomIn: boolean): void {
        const zoom = !zoomIn ? 1.1 : 0.9;
        this.camera.position.z *= zoom;
        this.camera.updateProjectionMatrix();
        this.renderer.render(this.scene, this.camera);
    }
}