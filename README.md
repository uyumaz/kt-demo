# KT Demo - 3D Kart Collection Game

A browser-based 3D kart game built as a tech demonstration of the BMAD (Breakthrough Method of Agile Development) methodology. Drive a kart around a play area and collect all 5 items with satisfying particle effects.

## Play Now

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Controls

| Key | Action |
|-----|--------|
| ↑ / W | Accelerate forward |
| ↓ / S | Reverse |
| ← / A | Turn left |
| → / D | Turn right |

## Features

- 3D environment with ground plane and boundary walls
- Smooth third-person camera that follows the kart
- 5 collectible gems with bobbing animation
- Particle burst effects on collection
- Score counter UI
- Win condition when all items collected

## Tech Stack

- **Three.js** - 3D rendering
- **Vite** - Build tool and dev server
- **Vanilla JavaScript** - No framework overhead

## Project Structure

```
kt-demo/
├── index.html
├── style.css
├── package.json
└── src/game/
    ├── main.js         # Scene setup, game loop
    ├── kart.js         # Kart model and controls
    ├── environment.js  # Ground, walls, lighting
    ├── items.js        # Collectible gems
    ├── particles.js    # Burst effects
    └── ui.js           # Score display
```

## BMAD Artifacts

Planning documents are in `_bmad-output/planning-artifacts/`:

- `product-brief-kt-demo-2026-01-29.md` - Product vision
- `prd.md` - Product Requirements Document
- `architecture.md` - Technical architecture decisions
- `epics.md` - Epic and story breakdown

## License

MIT
