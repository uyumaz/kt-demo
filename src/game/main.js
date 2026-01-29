import * as THREE from 'three';
import { createEnvironment } from './environment.js';
import { createKart, updateKart, handleKeyDown, handleKeyUp } from './kart.js';
import { createItems, updateItems, checkCollisions } from './items.js';
import { initParticles, createParticleBurst, updateParticles } from './particles.js';
import { createUI, updateScore } from './ui.js';

// Game constants
export const BOUNDARY_SIZE = 20;

// Game state
export const gameState = {
  score: 0,
  totalItems: 5,
  kart: {
    position: new THREE.Vector3(0, 0, 0),
    velocity: 0,
    rotation: 0
  },
  items: [],
  isComplete: false
};

// Three.js core objects
let scene, camera, renderer, clock;
let kartMesh;

// Camera settings
const CAMERA_HEIGHT = 8;
const CAMERA_DISTANCE = 12;
const CAMERA_LERP = 0.1;

function init() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue

  // Create camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, CAMERA_HEIGHT, CAMERA_DISTANCE);
  camera.lookAt(0, 0, 0);

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // Create clock for delta time
  clock = new THREE.Clock();

  // Create environment (ground, boundaries, lighting)
  createEnvironment(scene);

  // Create kart
  kartMesh = createKart(scene);

  // Create collectible items
  createItems(scene);

  // Initialize particle system
  initParticles(scene);

  // Create UI
  createUI();

  // Set up input handlers
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  // Start game loop
  gameLoop();
}

function onItemCollected(position) {
  // Create particle burst at collection location
  createParticleBurst(position);

  // Update score display
  updateScore();
}

function updateCamera() {
  // Calculate target camera position behind the kart
  const kartRotation = gameState.kart.rotation;
  const targetX = gameState.kart.position.x - Math.sin(kartRotation) * CAMERA_DISTANCE;
  const targetZ = gameState.kart.position.z - Math.cos(kartRotation) * CAMERA_DISTANCE;
  const targetY = CAMERA_HEIGHT;

  // Smoothly interpolate camera position
  camera.position.x += (targetX - camera.position.x) * CAMERA_LERP;
  camera.position.y += (targetY - camera.position.y) * CAMERA_LERP;
  camera.position.z += (targetZ - camera.position.z) * CAMERA_LERP;

  // Look at kart position
  camera.lookAt(
    gameState.kart.position.x,
    gameState.kart.position.y + 1,
    gameState.kart.position.z
  );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  const delta = clock.getDelta();

  // Update kart movement
  updateKart(delta, kartMesh);

  // Update items (bobbing animation)
  updateItems(delta);

  // Check for item collection
  checkCollisions(onItemCollected);

  // Update particles
  updateParticles(delta);

  // Update camera to follow kart
  updateCamera();

  // Render scene
  renderer.render(scene, camera);
}

// Initialize the game
init();
