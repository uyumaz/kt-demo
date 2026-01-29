---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - planning-artifacts/prd.md
  - planning-artifacts/architecture.md
status: complete
implementationStatus:
  epic1: complete
  epic2: complete
  epic3: complete
  epic4: complete
---

# kt-demo - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for kt-demo, decomposing the requirements from the PRD and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**FR-1: Kart Movement System**
- FR-1.1: Arrow key input detection (P0) - Up/Down/Left/Right keys detected
- FR-1.2: Forward/backward movement (P0) - Up = forward, Down = backward
- FR-1.3: Left/right rotation (P0) - Left/Right rotate kart direction
- FR-1.4: Velocity-based movement (P0) - Smooth acceleration/deceleration
- FR-1.5: Boundary collision (P0) - Kart stops at play area edges

**FR-2: Play Environment**
- FR-2.1: 3D rendered scene (P0) - Three.js scene renders in browser
- FR-2.2: Flat ground plane (P0) - Visible textured ground surface
- FR-2.3: Boundary markers (P0) - Visible edges of play area
- FR-2.4: Camera follows kart (P0) - Third-person camera tracks kart
- FR-2.5: Basic lighting (P0) - Scene is properly lit

**FR-3: Item Collection**
- FR-3.1: 5 collectible items (P0) - Items placed in play area
- FR-3.2: Item visibility (P0) - Items are floating, visible 3D objects
- FR-3.3: Collision detection (P0) - Kart touching item triggers collection
- FR-3.4: Item removal on collect (P0) - Collected items disappear
- FR-3.5: Collection counter (P0) - UI shows "X/5 items collected"

**FR-4: Visual Feedback (Juice)**
- FR-4.1: Particle burst on collect (P0) - Particles emit when item collected
- FR-4.2: Particle visibility (P0) - Particles are colorful and noticeable
- FR-4.3: Particle cleanup (P1) - Particles fade/disappear after burst

### NonFunctional Requirements

**NFR-1: Performance**
- NFR-1.1: Initial load time < 3 seconds
- NFR-1.2: Frame rate 60 FPS on modern browsers
- NFR-1.3: Input latency < 16ms (imperceptible)
- NFR-1.4: Memory usage < 100MB

**NFR-2: Compatibility**
- NFR-2.1: Chrome support (latest version)
- NFR-2.2: Firefox support (latest version)
- NFR-2.3: Safari support (latest version)
- NFR-2.4: Edge support (latest version)
- NFR-2.5: WebGL 2.0 required

**NFR-3: Usability**
- NFR-3.1: Time to understand controls < 5 seconds
- NFR-3.2: No instructions needed - self-evident gameplay
- NFR-3.3: No login required - instant play

### Additional Requirements

**From Architecture - Starter Template (Epic 1, Story 1):**
- Initialize project using: `npm create vite@latest kt-demo -- --template vanilla`
- Install Three.js: `npm install three`
- Create 6-module structure in src/game/

**From Architecture - Technical Patterns:**
- Game loop: requestAnimationFrame + Three.Clock delta time
- State management: Simple shared gameState object
- Collision detection: Distance-based sphere collision (~1.5 units threshold)
- Camera: Third-person smooth follow with lerp
- Module exports: Named functions (createX, updateX, checkX, handleX)

**From Architecture - Project Structure:**
- Entry: index.html + src/game/main.js
- Modules: kart.js, environment.js, items.js, particles.js, ui.js
- Build output: dist/ folder for static hosting

### FR Coverage Map

| FR | Epic | Story | Description |
|----|------|-------|-------------|
| FR-1.1 | Epic 2 | 2.2 | Arrow key input detection |
| FR-1.2 | Epic 2 | 2.2 | Forward/backward movement |
| FR-1.3 | Epic 2 | 2.2 | Left/right rotation |
| FR-1.4 | Epic 2 | 2.2 | Velocity-based movement |
| FR-1.5 | Epic 2 | 2.3 | Boundary collision |
| FR-2.1 | Epic 1 | 1.1 | 3D rendered scene |
| FR-2.2 | Epic 1 | 1.2 | Flat ground plane |
| FR-2.3 | Epic 1 | 1.2 | Boundary markers |
| FR-2.4 | Epic 1 | 1.3 | Camera follows kart |
| FR-2.5 | Epic 1 | 1.3 | Basic lighting |
| FR-3.1 | Epic 3 | 3.1 | 5 collectible items |
| FR-3.2 | Epic 3 | 3.1 | Item visibility |
| FR-3.3 | Epic 3 | 3.2 | Collision detection |
| FR-3.4 | Epic 3 | 3.2 | Item removal on collect |
| FR-3.5 | Epic 3 | 3.3 | Collection counter |
| FR-4.1 | Epic 4 | 4.1 | Particle burst on collect |
| FR-4.2 | Epic 4 | 4.1 | Particle visibility |
| FR-4.3 | Epic 4 | 4.1 | Particle cleanup |

**Coverage:** 18/18 FRs mapped (100%)

## Epic List

- Epic 1: Foundation & Playable Environment (3 stories)
- Epic 2: Drivable Kart (3 stories)
- Epic 3: Item Collection System (3 stories)
- Epic 4: Visual Polish - Juice (1 story)

---

## Epic 1: Foundation & Playable Environment

Users can see a complete 3D game environment in their browser.

### Story 1.1: Project Setup & Basic 3D Scene

As a player,
I want the game to load in my browser,
So that I can see a 3D environment ready for gameplay.

**Acceptance Criteria:**

**Given** I navigate to the game URL
**When** the page loads
**Then** a 3D scene renders in the browser using Three.js
**And** the scene displays without errors in the console
**And** the page loads in under 3 seconds

**Technical Notes:**
- Initialize Vite project with vanilla template
- Install Three.js dependency
- Create main.js with scene, renderer, camera setup
- Implement game loop with requestAnimationFrame
- Create src/game/ directory structure

---

### Story 1.2: Ground Plane & Boundary Markers

As a player,
I want to see a ground surface and play area boundaries,
So that I understand the playable space.

**Acceptance Criteria:**

**Given** the 3D scene is loaded
**When** I view the environment
**Then** I see a flat ground plane with a visible surface
**And** I see visible boundary markers at the edges of the play area
**And** the boundaries clearly define a contained play space

**Technical Notes:**
- Create environment.js module
- Add ground plane with MeshStandardMaterial
- Add boundary markers (walls or lines) at edges
- Use BOUNDARY_SIZE constant for consistent sizing

---

### Story 1.3: Camera System & Lighting

As a player,
I want proper lighting and a third-person camera view,
So that I can see the entire play area clearly.

**Acceptance Criteria:**

**Given** the environment is rendered
**When** I view the scene
**Then** the scene is properly lit with visible shadows/depth
**And** the camera provides a third-person perspective
**And** all objects in the scene are clearly visible

**Technical Notes:**
- Add ambient light and directional light
- Position camera for third-person view
- Camera will be updated to follow kart in Epic 2

---

## Epic 2: Drivable Kart

Users can drive a kart around the play area using arrow keys.

### Story 2.1: Kart Model & Rendering

As a player,
I want to see a kart in the game world,
So that I have an avatar to control.

**Acceptance Criteria:**

**Given** the environment is loaded
**When** the game starts
**Then** a kart model is visible in the scene
**And** the kart is positioned on the ground plane
**And** the kart is visually distinct from the environment

**Technical Notes:**
- Create kart.js module
- Build kart from simple box geometry (body + wheels)
- Use contrasting color (red) for visibility
- Export createKart() function

---

### Story 2.2: Arrow Key Controls & Movement

As a player,
I want to control the kart with arrow keys,
So that I can drive around the play area.

**Acceptance Criteria:**

**Given** the kart is in the scene
**When** I press the Up arrow key
**Then** the kart moves forward

**Given** the kart is moving
**When** I press the Down arrow key
**Then** the kart moves backward

**Given** the kart is in the scene
**When** I press the Left arrow key
**Then** the kart rotates left

**Given** the kart is in the scene
**When** I press the Right arrow key
**Then** the kart rotates right

**Given** I am holding an arrow key
**When** I release the key
**Then** the kart gradually decelerates to a stop

**And** movement feels smooth with acceleration/deceleration
**And** the camera follows the kart position

**Technical Notes:**
- Implement handleInput() for keydown/keyup events
- Use velocity-based movement with delta time
- Implement updateKart(delta) function
- Update camera to follow kart with smooth lerp

---

### Story 2.3: Boundary Collision

As a player,
I want the kart to stop at the play area edges,
So that I stay within the game boundaries.

**Acceptance Criteria:**

**Given** I am driving the kart
**When** I reach the edge of the play area
**Then** the kart stops and cannot move beyond the boundary
**And** I can still turn and drive in other directions

**Technical Notes:**
- Implement checkBoundary() function
- Clamp kart position to BOUNDARY_SIZE limits
- Apply boundary check after movement calculation

---

## Epic 3: Item Collection System

Users can collect items and see their progress.

### Story 3.1: Collectible Items

As a player,
I want to see collectible items in the play area,
So that I have objectives to pursue.

**Acceptance Criteria:**

**Given** the game environment is loaded
**When** I look around the play area
**Then** I see 5 collectible items placed in different locations
**And** each item is a visible, floating 3D object
**And** items are visually distinct from the environment (bright colors)

**Technical Notes:**
- Create items.js module
- Generate 5 items at random/fixed positions
- Use simple geometry (sphere or octahedron)
- Add floating animation (bobbing up/down)
- Store items in gameState.items array

---

### Story 3.2: Collection Mechanics

As a player,
I want to collect items by driving into them,
So that I can complete the game objective.

**Acceptance Criteria:**

**Given** I am driving the kart
**When** I drive into an item (kart touches item)
**Then** the item disappears from the scene
**And** my score increases by 1

**Given** I have collected all 5 items
**When** I collect the last item
**Then** all items have been removed from the scene

**Technical Notes:**
- Implement checkCollisions() function
- Use distance-based collision (~1.5 units threshold)
- Remove item mesh from scene on collection
- Update gameState.score on collection

---

### Story 3.3: Score Counter UI

As a player,
I want to see how many items I've collected,
So that I know my progress toward completing the game.

**Acceptance Criteria:**

**Given** I am playing the game
**When** I look at the screen
**Then** I see a counter showing "X/5 Items" in the top-right corner

**Given** I collect an item
**When** the item disappears
**Then** the counter updates to show the new count

**Technical Notes:**
- Create ui.js module
- Add DOM overlay element for score display
- Implement createUI() and updateScore() functions
- Style with CSS for visibility (white text, shadow)

---

## Epic 4: Visual Polish (Juice)

Users experience satisfying visual feedback when collecting items.

### Story 4.1: Particle Burst Effects

As a player,
I want to see a particle burst when I collect an item,
So that collection feels satisfying and rewarding.

**Acceptance Criteria:**

**Given** I drive into a collectible item
**When** the item is collected
**Then** a burst of colorful particles emits from the collection point
**And** the particles are clearly visible and noticeable
**And** the particles fade away after a short time

**Given** particles have been emitted
**When** approximately 1 second passes
**Then** the particles have faded and been removed from the scene

**Technical Notes:**
- Create particles.js module
- Use Three.js Points with BufferGeometry
- Implement createParticleBurst(position) function
- Implement updateParticles(delta) for animation/cleanup
- Use bright, varied colors for particles

