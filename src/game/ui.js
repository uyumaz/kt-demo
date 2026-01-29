import { gameState } from './main.js';

let uiElement = null;
let completionElement = null;

export function createUI() {
  // Get UI container
  uiElement = document.getElementById('ui');

  if (!uiElement) {
    uiElement = document.createElement('div');
    uiElement.id = 'ui';
    document.body.appendChild(uiElement);
  }

  // Initial score display
  updateScore();
}

export function updateScore() {
  if (!uiElement) return;

  uiElement.textContent = `${gameState.score}/${gameState.totalItems} Items`;

  // Show completion message if all items collected
  if (gameState.isComplete && !completionElement) {
    showCompletion();
  }
}

function showCompletion() {
  completionElement = document.createElement('div');
  completionElement.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffff00;
    font-family: 'Arial', sans-serif;
    font-size: 48px;
    font-weight: bold;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
    text-align: center;
    z-index: 200;
    animation: pulse 0.5s ease-in-out infinite alternate;
  `;
  completionElement.innerHTML = '🎉 All Items Collected! 🎉';
  document.body.appendChild(completionElement);

  // Add pulse animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      from { transform: translate(-50%, -50%) scale(1); }
      to { transform: translate(-50%, -50%) scale(1.1); }
    }
  `;
  document.head.appendChild(style);
}
