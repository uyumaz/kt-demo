import * as THREE from 'three';
import { BOUNDARY_SIZE } from './main.js';

export function createEnvironment(scene) {
  // Create ground plane
  const groundGeometry = new THREE.PlaneGeometry(BOUNDARY_SIZE * 2, BOUNDARY_SIZE * 2);
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d8c40, // Grass green
    roughness: 0.8,
    metalness: 0.1
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Create boundary walls
  createBoundaries(scene);

  // Create lighting
  createLighting(scene);
}

function createBoundaries(scene) {
  const wallHeight = 1;
  const wallThickness = 0.5;
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b6b, // Coral red for visibility
    roughness: 0.6
  });

  // North wall
  const northWall = new THREE.Mesh(
    new THREE.BoxGeometry(BOUNDARY_SIZE * 2 + wallThickness, wallHeight, wallThickness),
    wallMaterial
  );
  northWall.position.set(0, wallHeight / 2, -BOUNDARY_SIZE);
  northWall.castShadow = true;
  northWall.receiveShadow = true;
  scene.add(northWall);

  // South wall
  const southWall = new THREE.Mesh(
    new THREE.BoxGeometry(BOUNDARY_SIZE * 2 + wallThickness, wallHeight, wallThickness),
    wallMaterial
  );
  southWall.position.set(0, wallHeight / 2, BOUNDARY_SIZE);
  southWall.castShadow = true;
  southWall.receiveShadow = true;
  scene.add(southWall);

  // East wall
  const eastWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, BOUNDARY_SIZE * 2 + wallThickness),
    wallMaterial
  );
  eastWall.position.set(BOUNDARY_SIZE, wallHeight / 2, 0);
  eastWall.castShadow = true;
  eastWall.receiveShadow = true;
  scene.add(eastWall);

  // West wall
  const westWall = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, wallHeight, BOUNDARY_SIZE * 2 + wallThickness),
    wallMaterial
  );
  westWall.position.set(-BOUNDARY_SIZE, wallHeight / 2, 0);
  westWall.castShadow = true;
  westWall.receiveShadow = true;
  scene.add(westWall);
}

function createLighting(scene) {
  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Directional light (sun) with shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;

  // Shadow settings
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -25;
  directionalLight.shadow.camera.right = 25;
  directionalLight.shadow.camera.top = 25;
  directionalLight.shadow.camera.bottom = -25;

  scene.add(directionalLight);

  // Hemisphere light for sky/ground color variation
  const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x3d8c40, 0.3);
  scene.add(hemisphereLight);
}
