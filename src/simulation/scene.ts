import * as THREE from 'three';

export class Scene3D {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private cube: THREE.Mesh;
    public rotate = false;

    constructor(canvas: HTMLCanvasElement) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        this.renderer.setSize(400, 400);

        this.camera.position.z = 5;
        
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xDDB892 });
        this.cube = new THREE.Mesh(geometry, material);
        
        const edges = new THREE.EdgesGeometry(geometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        const edgeLines = new THREE.LineSegments(edges, edgesMaterial);
        this.cube.add(edgeLines);
        
        this.scene.add(this.cube);
        this.animate();
    }

    private animate = () => {
        requestAnimationFrame(this.animate);

        if(this.rotate) {
            this.cube.rotation.x += 0.002;
            this.cube.rotation.y += 0.002;
            this.cube.rotation.z += 0.002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}