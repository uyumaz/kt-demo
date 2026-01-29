---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success, step-04-ux, step-05-functional, step-06-nonfunctional, step-07-integration, step-08-constraints, step-09-risks, step-10-milestones, step-11-complete]
inputDocuments:
  - planning-artifacts/product-brief-kt-demo-2026-01-29.md
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 0
  projectDocs: 0
classification:
  projectType: web_app
  domain: gaming
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - kt-demo

**Author:** Umut
**Date:** 2026-01-29
**Version:** 1.0

---

## 1. Executive Summary

### Product Vision

A browser-based 3D kart racing game built as a tech demonstration of the BMAD methodology. The game delivers instant, no-install entertainment where players control a kart collecting items with satisfying visual feedback—all built within a 45-minute development window.

### Problem Statement

Browser-based games rarely deliver the visual polish and interactivity of native games. Most browser racing games feel dated or require plugins. Rapid development demos often produce hollow prototypes that are technically functional but not fun to play.

### Solution Overview

A 3D kart game using Three.js that runs natively in any modern browser, featuring:
- Responsive arrow-key kart controls
- Bounded play area with visible edges
- 5 collectible items with pickup counter
- Particle burst effects on collection for "juice"

### Success Criteria

| Metric | Target |
|--------|--------|
| Game loads | < 3 seconds |
| Time to play | < 5 seconds |
| Build time | ≤ 45 minutes |
| Items collectible | 5 items |
| Crashes/freezes | 0 |

---

## 2. Target Users

### Primary Persona: Alex the Casual Gamer

- **Profile:** Anyone with a browser and 5 minutes to kill
- **Context:** Bored at work, waiting for a meeting, quick break
- **Motivation:** Instant entertainment without downloads
- **Success Moment:** "Whoa, this runs right in my browser and actually feels fun!"

### Secondary Persona: Demo Audience

- **Profile:** Developers and stakeholders evaluating BMAD methodology
- **Context:** Watching live coding demonstration
- **Motivation:** See proof of rapid development capabilities
- **Success Moment:** "They built a playable 3D game in 45 minutes"

---

## 3. Functional Requirements

### FR-1: Kart Movement System

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-1.1 | Arrow key input detection | P0 | Up/Down/Left/Right keys detected |
| FR-1.2 | Forward/backward movement | P0 | Up = forward, Down = backward |
| FR-1.3 | Left/right rotation | P0 | Left/Right rotate kart direction |
| FR-1.4 | Velocity-based movement | P0 | Smooth acceleration/deceleration |
| FR-1.5 | Boundary collision | P0 | Kart stops at play area edges |

### FR-2: Play Environment

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-2.1 | 3D rendered scene | P0 | Three.js scene renders in browser |
| FR-2.2 | Flat ground plane | P0 | Visible textured ground surface |
| FR-2.3 | Boundary markers | P0 | Visible edges of play area |
| FR-2.4 | Camera follows kart | P0 | Third-person camera tracks kart |
| FR-2.5 | Basic lighting | P0 | Scene is properly lit |

### FR-3: Item Collection

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-3.1 | 5 collectible items | P0 | Items placed in play area |
| FR-3.2 | Item visibility | P0 | Items are floating, visible 3D objects |
| FR-3.3 | Collision detection | P0 | Kart touching item triggers collection |
| FR-3.4 | Item removal on collect | P0 | Collected items disappear |
| FR-3.5 | Collection counter | P0 | UI shows "X/5 items collected" |

### FR-4: Visual Feedback (Juice)

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-4.1 | Particle burst on collect | P0 | Particles emit when item collected |
| FR-4.2 | Particle visibility | P0 | Particles are colorful and noticeable |
| FR-4.3 | Particle cleanup | P1 | Particles fade/disappear after burst |

---

## 4. Non-Functional Requirements

### NFR-1: Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1.1 | Initial load time | < 3 seconds |
| NFR-1.2 | Frame rate | 60 FPS on modern browsers |
| NFR-1.3 | Input latency | < 16ms (imperceptible) |
| NFR-1.4 | Memory usage | < 100MB |

### NFR-2: Compatibility

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-2.1 | Chrome support | Latest version |
| NFR-2.2 | Firefox support | Latest version |
| NFR-2.3 | Safari support | Latest version |
| NFR-2.4 | Edge support | Latest version |
| NFR-2.5 | WebGL requirement | WebGL 2.0 |

### NFR-3: Usability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-3.1 | Time to understand controls | < 5 seconds |
| NFR-3.2 | No instructions needed | Self-evident gameplay |
| NFR-3.3 | No login required | Instant play |

---

## 5. Technical Architecture

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| 3D Engine | Three.js | Industry standard, well-documented |
| Language | JavaScript/TypeScript | Browser-native, fast iteration |
| Build | Vite | Fast dev server, simple config |
| Hosting | Static files | Any web server works |

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Physics | Fake velocity math | No physics engine = faster dev |
| Kart model | Simple geometry | Box + wheels = quick to build |
| Items | Floating cubes/spheres | Simple geometry, easy collision |
| Particles | Three.js Points | Built-in, performant |

### File Structure

```
/src
  /game
    main.js          # Entry point, game loop
    kart.js          # Kart movement logic
    environment.js   # Ground, boundaries, lighting
    items.js         # Collectible items
    particles.js     # Particle effects
    ui.js            # Counter display
  index.html         # Single page entry
```

---

## 6. User Interface

### UI Elements

| Element | Description | Location |
|---------|-------------|----------|
| Item Counter | "X/5 Items" text | Top-right corner |
| (No other UI) | Minimal for demo | — |

### Controls

| Input | Action |
|-------|--------|
| ↑ Arrow | Accelerate forward |
| ↓ Arrow | Accelerate backward |
| ← Arrow | Rotate left |
| → Arrow | Rotate right |

---

## 7. Out of Scope

The following are explicitly **NOT** included in this MVP:

- ❌ AI opponents or racing
- ❌ Multiple tracks or levels
- ❌ Power-up effects (items just collect)
- ❌ Sound or music
- ❌ Leaderboards or persistence
- ❌ Mobile/touch controls
- ❌ Pause, start, or game over screens
- ❌ Multiplayer

---

## 8. Development Milestones

### 45-Minute Build Plan

| Phase | Time | Deliverable |
|-------|------|-------------|
| 1. Setup | 5 min | Vite + Three.js scaffolding |
| 2. Environment | 5 min | Ground plane, lighting, camera |
| 3. Kart | 10 min | Kart model, arrow key movement |
| 4. Boundaries | 5 min | Play area edges, collision |
| 5. Items | 10 min | 5 collectibles, counter UI |
| 6. Particles | 5 min | Burst effect on collect |
| 7. Polish | 5 min | Tweaks, testing |

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Three.js learning curve | Low | Medium | Use simple geometries only |
| 45 min too tight | Medium | High | Cut particles if needed |
| Browser compatibility | Low | Low | Test Chrome first |
| Performance issues | Low | Medium | Keep scene simple |

---

## 10. Future Vision

| Version | Features |
|---------|----------|
| v1.1 | AI opponents to race against |
| v1.2 | Power-ups with gameplay effects |
| v2.0 | Multiple themed tracks |
| v3.0 | Multiplayer support |

---

## 11. Acceptance Checklist

### MVP Complete When:

- [ ] Game loads in browser < 3 seconds
- [ ] Kart moves with arrow keys
- [ ] Kart stays within bounded area
- [ ] 5 items visible and collectible
- [ ] Counter shows items collected
- [ ] Particle burst on every collect
- [ ] Built in ≤ 45 minutes

---

**Document Status:** ✅ Complete
**Ready for:** Architecture Phase
