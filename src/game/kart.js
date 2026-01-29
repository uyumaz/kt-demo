import * as THREE from 'three';
import { gameState, BOUNDARY_SIZE } from './main.js';

// Kart physics constants
const MAX_VELOCITY = 15;
const ACCELERATION = 20;
const DECELERATION = 10;
const ROTATION_SPEED = 3;
const BOUNDARY_MARGIN = 1;

// Input state
const keys = {
  up: false,
  down: false,
  left: false,
  right: false
};

let kartGroup = null;

export function createKart(scene) {
  // Create kart group to hold all parts
  kartGroup = new THREE.Group();

  // Kart body
  const bodyGeometry = new THREE.BoxGeometry(1.2, 0.5, 2);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000, // Red
    roughness: 0.4,
    metalness: 0.3
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.4;
  body.castShadow = true;
  kartGroup.add(body);

  // Driver seat back
  const seatGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.3);
  const seatMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.8
  });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.set(0, 0.7, 0.2);
  seat.castShadow = true;
  kartGroup.add(seat);

  // Wheels
  const wheelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16);
  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.9
  });

  // Front left wheel
  const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelFL.rotation.z = Math.PI / 2;
  wheelFL.position.set(-0.7, 0.25, -0.7);
  wheelFL.castShadow = true;
  kartGroup.add(wheelFL);

  // Front right wheel
  const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelFR.rotation.z = Math.PI / 2;
  wheelFR.position.set(0.7, 0.25, -0.7);
  wheelFR.castShadow = true;
  kartGroup.add(wheelFR);

  // Back left wheel
  const wheelBL = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelBL.rotation.z = Math.PI / 2;
  wheelBL.position.set(-0.7, 0.25, 0.7);
  wheelBL.castShadow = true;
  kartGroup.add(wheelBL);

  // Back right wheel
  const wheelBR = new THREE.Mesh(wheelGeometry, wheelMaterial);
  wheelBR.rotation.z = Math.PI / 2;
  wheelBR.position.set(0.7, 0.25, 0.7);
  wheelBR.castShadow = true;
  kartGroup.add(wheelBR);

  // Position kart in scene
  kartGroup.position.set(0, 0, 0);
  scene.add(kartGroup);

  // Initialize game state position
  gameState.kart.position.set(0, 0, 0);

  return kartGroup;
}

export function handleKeyDown(event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      keys.up = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      keys.down = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      keys.left = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      keys.right = true;
      break;
  }
}

export function handleKeyUp(event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      keys.up = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      keys.down = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      keys.left = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      keys.right = false;
      break;
  }
}

export function updateKart(delta, kartMesh) {
  // Handle rotation
  if (keys.left) {
    gameState.kart.rotation += ROTATION_SPEED * delta;
  }
  if (keys.right) {
    gameState.kart.rotation -= ROTATION_SPEED * delta;
  }

  // Handle acceleration/deceleration
  if (keys.up) {
    gameState.kart.velocity += ACCELERATION * delta;
    if (gameState.kart.velocity > MAX_VELOCITY) {
      gameState.kart.velocity = MAX_VELOCITY;
    }
  } else if (keys.down) {
    gameState.kart.velocity -= ACCELERATION * delta;
    if (gameState.kart.velocity < -MAX_VELOCITY / 2) {
      gameState.kart.velocity = -MAX_VELOCITY / 2;
    }
  } else {
    // Decelerate when no input
    if (gameState.kart.velocity > 0) {
      gameState.kart.velocity -= DECELERATION * delta;
      if (gameState.kart.velocity < 0) gameState.kart.velocity = 0;
    } else if (gameState.kart.velocity < 0) {
      gameState.kart.velocity += DECELERATION * delta;
      if (gameState.kart.velocity > 0) gameState.kart.velocity = 0;
    }
  }

  // Calculate movement direction
  const moveX = Math.sin(gameState.kart.rotation) * gameState.kart.velocity * delta;
  const moveZ = Math.cos(gameState.kart.rotation) * gameState.kart.velocity * delta;

  // Update position
  gameState.kart.position.x += moveX;
  gameState.kart.position.z += moveZ;

  // Apply boundary collision
  checkBoundary();

  // Update kart mesh position and rotation
  if (kartMesh) {
    kartMesh.position.copy(gameState.kart.position);
    kartMesh.rotation.y = gameState.kart.rotation;
  }
}

function checkBoundary() {
  const limit = BOUNDARY_SIZE - BOUNDARY_MARGIN;

  // Clamp X position
  if (gameState.kart.position.x > limit) {
    gameState.kart.position.x = limit;
    gameState.kart.velocity *= 0.5; // Reduce velocity on collision
  } else if (gameState.kart.position.x < -limit) {
    gameState.kart.position.x = -limit;
    gameState.kart.velocity *= 0.5;
  }

  // Clamp Z position
  if (gameState.kart.position.z > limit) {
    gameState.kart.position.z = limit;
    gameState.kart.velocity *= 0.5;
  } else if (gameState.kart.position.z < -limit) {
    gameState.kart.position.z = -limit;
    gameState.kart.velocity *= 0.5;
  }
}
