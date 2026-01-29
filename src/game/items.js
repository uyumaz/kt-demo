import * as THREE from 'three';
import { gameState, BOUNDARY_SIZE } from './main.js';

const COLLECTION_THRESHOLD = 1.5;
const ITEM_COLORS = [0xffff00, 0x00ffff, 0xff00ff, 0x00ff00, 0xffa500]; // Yellow, Cyan, Magenta, Green, Orange
const BOB_SPEED = 2;
const BOB_HEIGHT = 0.3;

let itemMeshes = [];
let scene = null;
let bobTime = 0;

export function createItems(sceneRef) {
  scene = sceneRef;
  itemMeshes = [];
  gameState.items = [];

  // Define item positions spread across the play area
  const positions = [
    { x: 8, z: 8 },
    { x: -8, z: 8 },
    { x: 8, z: -8 },
    { x: -8, z: -8 },
    { x: 0, z: -12 }
  ];

  for (let i = 0; i < 5; i++) {
    // Create item geometry - octahedron for a gem-like look
    const geometry = new THREE.OctahedronGeometry(0.5);
    const material = new THREE.MeshStandardMaterial({
      color: ITEM_COLORS[i],
      emissive: ITEM_COLORS[i],
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.8
    });

    const item = new THREE.Mesh(geometry, material);
    item.position.set(positions[i].x, 1.5, positions[i].z);
    item.castShadow = true;

    // Store reference for updates
    const itemData = {
      mesh: item,
      collected: false,
      baseY: 1.5,
      index: i
    };

    itemMeshes.push(item);
    gameState.items.push(itemData);
    scene.add(item);
  }
}

export function updateItems(delta) {
  bobTime += delta * BOB_SPEED;

  // Animate uncollected items (bobbing and rotating)
  gameState.items.forEach((item, index) => {
    if (!item.collected && item.mesh) {
      // Bobbing motion
      item.mesh.position.y = item.baseY + Math.sin(bobTime + index) * BOB_HEIGHT;
      // Rotation
      item.mesh.rotation.y += delta * 2;
    }
  });
}

export function checkCollisions(onCollect) {
  const kartPos = gameState.kart.position;

  gameState.items.forEach((item) => {
    if (item.collected) return;

    const itemPos = item.mesh.position;
    const distance = kartPos.distanceTo(new THREE.Vector3(itemPos.x, 0, itemPos.z));

    if (distance < COLLECTION_THRESHOLD) {
      // Mark as collected
      item.collected = true;

      // Get position for particle effect before removing
      const collectPosition = item.mesh.position.clone();

      // Remove from scene
      scene.remove(item.mesh);
      item.mesh.geometry.dispose();
      item.mesh.material.dispose();
      item.mesh = null;

      // Update score
      gameState.score++;

      // Callback for particle effect and UI update
      if (onCollect) {
        onCollect(collectPosition);
      }

      // Check if all items collected
      if (gameState.score >= gameState.totalItems) {
        gameState.isComplete = true;
      }
    }
  });
}
