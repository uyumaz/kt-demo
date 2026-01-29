import * as THREE from 'three';

const PARTICLE_COUNT = 30;
const PARTICLE_LIFETIME = 1.0; // seconds
const PARTICLE_SPEED = 8;
const PARTICLE_COLORS = [0xffff00, 0xff00ff, 0x00ffff, 0xff6600, 0x00ff00];

let particleSystems = [];
let scene = null;

export function initParticles(sceneRef) {
  scene = sceneRef;
  particleSystems = [];
}

export function createParticleBurst(position) {
  if (!scene) return;

  // Create geometry for particles
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = [];
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // All particles start at the collection point
    positions[i * 3] = position.x;
    positions[i * 3 + 1] = position.y;
    positions[i * 3 + 2] = position.z;

    // Random velocity in all directions
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    const speed = PARTICLE_SPEED * (0.5 + Math.random() * 0.5);

    velocities.push({
      x: Math.sin(phi) * Math.cos(theta) * speed,
      y: Math.abs(Math.cos(phi)) * speed + 2, // Bias upward
      z: Math.sin(phi) * Math.sin(theta) * speed
    });

    // Random color from palette
    const color = new THREE.Color(PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)]);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Create material
  const material = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 1,
    sizeAttenuation: true
  });

  // Create points system
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // Store particle system data
  particleSystems.push({
    points,
    velocities,
    age: 0,
    gravity: -15
  });
}

export function updateParticles(delta) {
  // Update each particle system
  for (let i = particleSystems.length - 1; i >= 0; i--) {
    const system = particleSystems[i];
    system.age += delta;

    // Remove old particle systems
    if (system.age >= PARTICLE_LIFETIME) {
      scene.remove(system.points);
      system.points.geometry.dispose();
      system.points.material.dispose();
      particleSystems.splice(i, 1);
      continue;
    }

    // Update particle positions
    const positions = system.points.geometry.attributes.position.array;

    for (let j = 0; j < PARTICLE_COUNT; j++) {
      // Apply velocity
      positions[j * 3] += system.velocities[j].x * delta;
      positions[j * 3 + 1] += system.velocities[j].y * delta;
      positions[j * 3 + 2] += system.velocities[j].z * delta;

      // Apply gravity to velocity
      system.velocities[j].y += system.gravity * delta;
    }

    system.points.geometry.attributes.position.needsUpdate = true;

    // Fade out
    const fadeProgress = system.age / PARTICLE_LIFETIME;
    system.points.material.opacity = 1 - fadeProgress;
  }
}
