---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - _bmad-output/BMAD-Demo-Overview.md
date: 2026-01-29
author: Umut
projectIdea: Mario Kart-style browser racing game
---

# Product Brief: kt-demo

## Executive Summary

A browser-based 3D kart racing game built as a tech demonstration of the BMAD methodology. Players control a kart in a 3D environment, collecting power-up items with satisfying visual feedback. The project showcases rapid development capabilities—delivering a playable, polished-feeling game experience within a 45-minute build window. Targets casual gamers who want instant, no-install gaming directly in their browser.

---

## Core Vision

### Problem Statement

Browser-based games rarely deliver the visual polish and interactivity of native games. Most browser racing games feel dated, clunky, or require plugins. There's a gap between "impressive 3D game" and "runs instantly in a browser." More critically, rapid development demos often produce hollow prototypes—this project proves you can build something genuinely playable, not just technically functional.

### Problem Impact

Casual gamers looking for quick entertainment are stuck with either low-quality browser games or the friction of downloading/installing native apps. Developers lack compelling examples of what modern browser tech can achieve AND how structured methodology enables rapid delivery.

### Why Existing Solutions Fall Short

- Most browser racing games use outdated 2D graphics
- 3D browser games often have poor performance or complexity issues
- Few demonstrate the full potential of modern WebGL/Three.js capabilities
- Rapid prototypes typically feel hollow—technically working but not fun
- No clear examples of structured methodology producing playable games quickly

### Proposed Solution

A 3D kart racing game using Three.js that runs natively in any modern browser. Features:
- **Drivable kart** with responsive arrow-key controls
- **Bounded play area** (flat plane with edges) for contained gameplay
- **Collectible items** (5 floating objects) with pickup counter
- **Signature juice moment**: Particle burst effect on item collection

Technical approach: Simple velocity-based movement (no physics engine) to maximize dev speed while maintaining good game feel.

### Key Differentiators

- **Zero friction**: No download, no install—just play
- **Modern 3D graphics**: Three.js-powered visuals that rival simple native games
- **BMAD methodology showcase**: Proves structured AI-assisted development delivers real results
- **Rapid development proof**: Playable 3D game built in under an hour
- **Playable, not just functional**: Signature particle effects make collection feel satisfying
- **Realistic scope**: Clear 45-minute breakdown (15 min kart, 10 min track, 10 min items, 10 min polish)

### Demo Success Criteria

| Component | Time Budget | Deliverable |
|-----------|-------------|-------------|
| Drivable kart | 15 min | Arrow keys control kart movement |
| Track/environment | 10 min | Flat plane with visible boundaries |
| Item collection | 10 min | 5 floating items, counter on pickup |
| Polish/juice | 10 min | Particle burst on collect |

---

## Target Users

### Primary Users

**"Alex the Casual Gamer"**
- **Profile:** Anyone with a browser and 5 minutes to kill
- **Context:** Bored at work, waiting for a meeting, quick break between tasks
- **Motivation:** Instant entertainment without downloads or commitments
- **Pain point:** Most browser games look dated or require plugins/installs
- **Success moment:** "Whoa, this runs right in my browser and actually feels fun!"

### Secondary Users

**"Demo Audience"**
- **Profile:** Developers, stakeholders, or curious observers watching the BMAD demo
- **Context:** Evaluating rapid development methodology capabilities
- **Motivation:** See proof that structured AI-assisted development delivers real results
- **Success moment:** "They built a playable 3D game in 45 minutes—that's impressive"

### User Journey

| Stage | Alex (Player) | Demo Audience |
|-------|---------------|---------------|
| Discovery | Clicks a link, game loads instantly | Watches live coding session |
| First 10 sec | Arrow keys work, kart moves | Sees responsive controls appear |
| Core loop | Drive around, collect items | Observes features being added |
| Aha moment | Particle burst on collect—feels polished | "This is actually playable" |
| Takeaway | Bookmarks for later | Impressed by BMAD methodology |

---

## Success Metrics

### Demo Success (Primary)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Game loads in browser | < 3 seconds | Page load to rendered scene |
| Kart controllable | Immediate | Arrow keys respond on first press |
| Items collectible | 5 items | Counter increments on collision |
| Visual feedback | On every collect | Particle burst triggers |
| Build time | ≤ 45 minutes | Clock time from start to playable |

### User Success

- **Time to play:** Player driving within 5 seconds of page load
- **Control responsiveness:** No perceptible input lag
- **Satisfaction signal:** Particle burst on collect feels rewarding
- **Stability:** Zero crashes or freezes during session

### Business Objectives

- **BMAD Proof:** Structured AI-assisted workflow produces working software
- **Audience Impact:** Demo viewers impressed by rapid development
- **Artifact Quality:** Each phase produces clear, usable documentation
- **Reproducibility:** Process can be repeated for other projects

---

## MVP Scope

### Core Features

| Priority | Feature | Description |
|----------|---------|-------------|
| P0 | Drivable kart | Arrow key controls, responsive movement |
| P0 | Play area | Flat plane with visible boundaries |
| P0 | Collectible items | 5 floating objects placed in environment |
| P0 | Pickup counter | UI showing items collected |
| P0 | Particle effect | Burst animation on item collection |

### Out of Scope for MVP

- **AI opponents** — No racing, single-player collection only
- **Multiple tracks** — Single environment only
- **Power-up effects** — Items collect but don't grant abilities
- **Sound/music** — Silent gameplay for demo
- **Leaderboards** — No scoring or persistence
- **Mobile controls** — Desktop keyboard only
- **Game states** — No pause, start, or game over screens

### MVP Success Criteria

- [ ] Kart moves smoothly with arrow keys
- [ ] Kart stays within bounded play area
- [ ] All 5 items are collectible
- [ ] Counter increments correctly
- [ ] Particle burst triggers on every collect
- [ ] Total build time ≤ 45 minutes

### Future Vision

| Phase | Features |
|-------|----------|
| v1.1 | AI opponents to race against |
| v1.2 | Power-ups with gameplay effects (speed boost, etc.) |
| v2.0 | Multiple themed tracks |
| v3.0 | Multiplayer support |
