const app = document.getElementById('app');
const form = document.getElementById('form');
const search = document.getElementById('search');
let wobbling = false;

// Tweak these to change the feel
const DURATION = 3000;   // total length in ms
const CYCLES = 5;        // back-and-forth swings
const MAX_ROTATE = 4;    // degrees at the strongest point
const MAX_SHIFT = 16;    // pixels at the strongest point

// A damped swing: strong at the start, fading smoothly to rest at the end
function buildKeyframes(steps = 150) {
  const frames = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const decay = Math.pow(1 - t, 2);
    const swing = Math.sin(2 * Math.PI * CYCLES * t) * decay;
    frames.push({
      transform: `rotate(${swing * MAX_ROTATE}deg) translateX(${swing * MAX_SHIFT}px)`,
      offset: t
    });
  }
  return frames;
}

const keyframes = buildKeyframes();

function wobble() {
  if (wobbling) return;
  wobbling = true;
  const anim = app.animate(keyframes, { duration: DURATION, easing: 'linear' });
  anim.onfinish = anim.oncancel = () => { wobbling = false; };
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (search.value.toLowerCase().includes('google')) wobble();
});