---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - planning-artifacts/prd.md
  - planning-artifacts/product-brief-kt-demo-2026-01-29.md
  - BMAD-Demo-Overview.md
workflowType: 'architecture'
project_name: 'kt-demo'
user_name: 'Umut'
date: '2026-01-29'
lastStep: 8
status: 'complete'
completedAt: '2026-01-29'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- **FR-1 Kart Movement (5 reqs)**: Arrow key input → velocity-based movement with rotation and boundary collision
- **FR-2 Play Environment (5 reqs)**: Three.js scene with ground plane, boundaries, third-person camera, lighting
- **FR-3 Item Collection (5 reqs)**: 5 collectible items with collision detection, removal, and UI counter
- **FR-4 Visual Feedback (3 reqs)**: Particle burst effects on collection with fade/cleanup

**Non-Functional Requirements:**
- **Performance**: <3s load, 60 FPS, <16ms input latency, <100MB memory
- **Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge) with WebGL 2.0
- **Usability**: Self-evident controls, no instructions needed, instant play

**Scale & Complexity:**
- Primary domain: Frontend WebGL/Browser Game
- Complexity level: Low
- Estimated architectural components: 6 (main, kart, environment, items, particles, ui)

### Technical Constraints & Dependencies

| Constraint | Implication |
|------------|-------------|
| 45-minute build window | No physics engine, simple geometries only |
| Browser-native | WebGL 2.0 required, no plugins |
| Static hosting | No backend, no persistence |
| Single HTML entry | Self-contained application |

### Cross-Cutting Concerns Identified

| Concern | Affects |
|---------|---------|
| Game loop timing | All animated components (kart, particles, camera) |
| Collision detection | Kart ↔ boundaries, Kart ↔ items |
| Performance budget | Scene complexity, particle count, draw calls |
| Input handling | Kart movement, potential future extensions |

## Starter Template Evaluation

### Primary Technology Domain

Frontend WebGL/Browser Game based on project requirements analysis.

### Starter Options Considered

| Option | Verdict |
|--------|---------|
| Vanilla Vite + Three.js | ✅ Selected - Minimal overhead, fastest setup |
| vite-threejs-ts-template | Good but adds TypeScript complexity |
| vite-three-js boilerplate | Over-featured for 45-min demo |
| React Three Fiber | Overkill - adds React layer unnecessarily |

### Selected Starter: Vanilla Vite + Three.js

**Rationale for Selection:**
- Fastest setup time (~1 min)
- Zero framework overhead
- Direct Three.js access without abstraction layers
- Matches PRD specification exactly
- Ideal for 45-minute build constraint

**Initialization Commands:**

```bash
npm create vite@latest kt-demo -- --template vanilla
cd kt-demo
npm install three
npm run dev
```

**Architectural Decisions Provided by Starter:**

| Category | Decision |
|----------|----------|
| **Language** | JavaScript (vanilla template) |
| **Build Tool** | Vite 6.x with ESBuild |
| **Dev Server** | localhost:5173 with HMR |
| **Output** | Static files for any web server |
| **Module System** | ES Modules |

**Project Structure (after init):**

```
kt-demo/
├── index.html        # Entry point
├── main.js           # App entry
├── style.css         # Base styles
├── public/           # Static assets
├── package.json
└── vite.config.js    # (optional)
```

**Note:** Project initialization should be the first implementation task.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Game loop pattern (affects all animated components)
- Module organization (affects file structure)
- Collision detection approach (affects item collection)

**Important Decisions (Shape Architecture):**
- State management pattern
- Camera follow behavior

**Deferred Decisions (Post-MVP):**
- Sound system architecture
- Level/track system
- AI opponent patterns

### Game Loop Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Animation Loop | requestAnimationFrame | Browser-native, Three.js integrated |
| Timing | Three.Clock delta time | Handles frame rate variations gracefully |
| Update Order | Input → Physics → Render | Standard game loop sequence |

```javascript
// Pattern: Game loop with delta time
const clock = new THREE.Clock();
function gameLoop() {
  const delta = clock.getDelta();
  handleInput();
  updateKart(delta);
  updateParticles(delta);
  updateCamera();
  renderer.render(scene, camera);
  requestAnimationFrame(gameLoop);
}
```

### Module Organization

| Module | Responsibility | Exports |
|--------|----------------|---------|
| main.js | Scene setup, game loop, orchestration | init(), gameLoop() |
| kart.js | Kart mesh, movement, boundaries | createKart(), updateKart() |
| environment.js | Ground, boundaries, lighting | createEnvironment() |
| items.js | Collectibles, collision detection | createItems(), checkCollisions() |
| particles.js | Burst effects on collection | createParticleBurst() |
| ui.js | Score counter display | createUI(), updateScore() |

### State Management

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Pattern | Simple shared object | Low complexity, sufficient for MVP |
| Scope | Single gameState module | No need for complex state management |

```javascript
// Pattern: Shared game state
export const gameState = {
  score: 0,
  totalItems: 5,
  kart: { position: null, velocity: 0, rotation: 0 },
  items: [],
  isComplete: false
};
```

### Collision Detection

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Method | Distance-based (sphere) | Simplest, fastest to implement |
| Threshold | ~1.5 units | Forgiving hitbox for casual play |

```javascript
// Pattern: Distance-based collision
function checkCollision(kartPos, itemPos, threshold = 1.5) {
  return kartPos.distanceTo(itemPos) < threshold;
}
```

### Camera System

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Type | Third-person follow | Classic kart game perspective |
| Behavior | Smooth follow with offset | Lerp to target position |

### Infrastructure & Deployment

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hosting | Any static file server | No backend requirements |
| Build Output | dist/ folder | Vite default, optimized bundles |
| Assets | Inline or public/ | No external asset loading needed |

## Implementation Patterns & Consistency Rules

### Naming Patterns

**File Naming:**
| Type | Pattern | Example |
|------|---------|---------|
| Modules | lowercase, descriptive | `kart.js`, `particles.js` |
| Entry | `main.js` | `main.js` |
| Styles | `style.css` | `style.css` |

**Function Naming:**
| Type | Pattern | Example |
|------|---------|---------|
| Creators | `create{Thing}` | `createKart()`, `createItems()` |
| Updaters | `update{Thing}` | `updateKart(delta)`, `updateParticles(delta)` |
| Checkers | `check{Condition}` | `checkCollisions()`, `checkBoundary()` |
| Handlers | `handle{Event}` | `handleInput()`, `handleKeyDown()` |

**Variable Naming:**
| Type | Pattern | Example |
|------|---------|---------|
| Three.js objects | camelCase | `kartMesh`, `groundPlane` |
| Constants | UPPER_SNAKE | `BOUNDARY_SIZE`, `MAX_VELOCITY` |
| State | camelCase | `gameState`, `score` |

### Code Patterns

**Module Export Pattern:**
```javascript
// Each module exports named functions
export function createKart(scene) { ... }
export function updateKart(delta) { ... }
```

**Three.js Object Creation:**
```javascript
// Pattern: Geometry → Material → Mesh → Add to scene
const geometry = new THREE.BoxGeometry(1, 0.5, 2);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

**Delta Time Usage:**
```javascript
// ALWAYS multiply movement by delta for frame-rate independence
position.x += velocity * delta;
```

### Error Prevention Patterns

**Boundary Checking:**
```javascript
// Clamp position to boundaries
position.x = Math.max(-BOUNDARY, Math.min(BOUNDARY, position.x));
position.z = Math.max(-BOUNDARY, Math.min(BOUNDARY, position.z));
```

**Null Safety for Items:**
```javascript
// Filter collected items, don't mutate during iteration
gameState.items = gameState.items.filter(item => !item.collected);
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
kt-demo/
├── index.html              # HTML entry point with canvas container
├── package.json            # Dependencies: three
├── vite.config.js          # Vite configuration (optional)
├── style.css               # Minimal styles (fullscreen canvas)
│
├── src/
│   └── game/
│       ├── main.js         # Entry: scene setup, game loop, orchestration
│       ├── kart.js         # Kart creation, movement, boundary collision
│       ├── environment.js  # Ground plane, boundary markers, lighting
│       ├── items.js        # Collectible items, collision detection
│       ├── particles.js    # Particle burst system
│       └── ui.js           # Score counter DOM overlay
│
├── public/                 # Static assets (if needed)
│
└── dist/                   # Build output (generated)
    ├── index.html
    └── assets/
        └── index-[hash].js
```

### Module Boundaries & Communication

```
┌─────────────────────────────────────────────────────────────┐
│                         main.js                              │
│  - Creates scene, camera, renderer                          │
│  - Imports and calls all other modules                      │
│  - Owns the game loop                                       │
└─────────────────────────────────────────────────────────────┘
        │           │           │           │           │
        ▼           ▼           ▼           ▼           ▼
┌─────────┐  ┌─────────────┐  ┌───────┐  ┌──────────┐  ┌────┐
│ kart.js │  │environment.js│  │items.js│  │particles.js│  │ui.js│
│         │  │             │  │       │  │          │  │    │
│ Reads:  │  │ Reads:      │  │Reads: │  │ Reads:   │  │Reads:│
│ input   │  │ nothing     │  │kart   │  │ nothing  │  │score│
│         │  │             │  │pos    │  │          │  │    │
│ Writes: │  │ Writes:     │  │Writes:│  │ Writes:  │  │Writes:│
│ kart    │  │ scene       │  │score  │  │ scene    │  │DOM  │
│ state   │  │ objects     │  │items  │  │ particles│  │    │
└─────────┘  └─────────────┘  └───────┘  └──────────┘  └────┘
```

### Data Flow

```
User Input (Arrow Keys)
        │
        ▼
    handleInput()
        │
        ▼
    updateKart(delta)  ──────► gameState.kart.position
        │
        ▼
    checkCollisions()  ──────► gameState.score++
        │                      gameState.items (filter)
        ▼
    createParticleBurst()  ──► particles array
        │
        ▼
    updateParticles(delta)
        │
        ▼
    updateCamera()
        │
        ▼
    updateScore()  ───────────► DOM text content
        │
        ▼
    renderer.render()
```

### Requirements to Structure Mapping

| Requirement | Module | Function |
|-------------|--------|----------|
| FR-1.1 Arrow key input | kart.js | handleInput() |
| FR-1.2-1.4 Movement | kart.js | updateKart() |
| FR-1.5 Boundary collision | kart.js | checkBoundary() |
| FR-2.1-2.5 Environment | environment.js | createEnvironment() |
| FR-3.1-3.4 Items | items.js | createItems(), checkCollisions() |
| FR-3.5 Counter | ui.js | createUI(), updateScore() |
| FR-4.1-4.3 Particles | particles.js | createParticleBurst(), updateParticles() |

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- Three.js + Vite + vanilla JS work seamlessly together
- No version conflicts - all latest stable versions
- Simple module structure supports all game requirements

**Pattern Consistency:**
- All naming follows `create/update/check/handle` pattern
- Delta time usage consistent across all animated components
- State access patterns uniform across modules

**Structure Alignment:**
- 6-module structure maps directly to 4 FR categories
- Each module has single responsibility
- No circular dependencies possible with current design

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**

| FR Category | Coverage | Implementing Module |
|-------------|----------|---------------------|
| FR-1 Kart Movement | 100% | kart.js |
| FR-2 Play Environment | 100% | environment.js |
| FR-3 Item Collection | 100% | items.js + ui.js |
| FR-4 Visual Feedback | 100% | particles.js |

**Non-Functional Requirements Coverage:**

| NFR | Architectural Support |
|-----|----------------------|
| <3s load | Minimal dependencies, Vite bundling |
| 60 FPS | requestAnimationFrame, simple scene |
| <16ms input | Direct event handling, no framework overhead |
| <100MB memory | No textures, simple geometries |
| Browser compat | Three.js handles WebGL abstraction |

### Implementation Readiness Validation ✅

**Decision Completeness:**
- All critical decisions documented with code patterns
- No ambiguous choices remain
- Clear examples for each pattern

**Structure Completeness:**
- Complete file tree defined
- All imports/exports specified
- Data flow documented

**Pattern Completeness:**
- Naming conventions cover all cases
- Error handling patterns defined
- State management fully specified

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Low)
- [x] Technical constraints identified (45-min, browser-only)
- [x] Cross-cutting concerns mapped (timing, collision, performance)

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified (Vite + Three.js)
- [x] Integration patterns defined (module imports)
- [x] Performance considerations addressed (delta time, simple geometry)

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified (shared state)
- [x] Process patterns documented (game loop)

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
- Minimal complexity, maximum clarity
- Direct mapping from requirements to code structure
- No framework overhead or abstraction layers
- Proven patterns for game development

**Areas for Future Enhancement:**
- Sound system (v1.1)
- Level/track variations (v2.0)
- AI opponents (v1.1)
- Mobile controls (future)

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**
```bash
npm create vite@latest kt-demo -- --template vanilla
cd kt-demo
npm install three
npm run dev
```

Then create the 6 game modules in `src/game/` following the patterns above.
