import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { RGBELoader } from "three/addons";
import ReflectionTexture from '../assets/textures/env.hdr';

export default function ThreeAnimation() {

    const refContainer = useRef(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) return;
        isMounted.current = true;
        let camera, scene, renderer;
        const spheres = [];

        let mouseX = 0, mouseY = 0;

        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 100000);
            camera.position.z = 3200;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);

            const heartShape = new THREE.Shape();

            heartShape.moveTo( 25, 25 );
            heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
            heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
            heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
            heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
            heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
            heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

            const extrudeSettings = {
                depth: 10,
                bevelEnabled: true,
                bevelSegments: 2,
                steps: 2,
                bevelSize: 1,
                bevelThickness: 1
            };

            const geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

            const envMap = new RGBELoader().load(ReflectionTexture, () => {
                envMap.mapping = THREE.EquirectangularReflectionMapping;
            }, undefined, (error) => {
                console.error(error);
            });

            const material = new THREE.MeshPhysicalMaterial({
                roughness: 0,
                transmission: 1,
                thickness: 1.5,
                envMap: envMap,
                envMapIntensity: 1.5,
                normalScale: new THREE.Vector2(0.05, 0.05),
                clearcoat: 0.1,
                metalness: 1
            });

            for (let i = 0; i < 120; i++) {
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.x = Math.random() * 10000 - 5000;
                mesh.position.y = Math.random() * 10000 - 5000;
                mesh.position.z = Math.random() * 10000 - 5000;
                mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
                scene.add(mesh);

                spheres.push(mesh);
            }

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            refContainer.current.appendChild(renderer.domElement);

            window.addEventListener('resize', handleResize);
        }

        function handleResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function handleMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) * 10;
            mouseY = (event.clientY - windowHalfY) * 10;
        }

        function animate() {
            requestAnimationFrame(animate);
            render();
        }

        function render() {
            const timer = 0.0001 * Date.now();

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            for (let i = 0, il = spheres.length; i < il; i++) {
                const sphere = spheres[i];
                sphere.position.x = 5000 * Math.cos(timer + i);
                sphere.position.y = 5000 * Math.sin(timer + i * 1.1);
            }

            renderer.render(scene, camera);
        }

    }, []);

    return (
        <div className="CanvasContainer" ref={refContainer}></div>
    );

}