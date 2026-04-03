# Logic Lens 🔍

> **Prototype Build** — A browser-based algorithm visualization tool built during a 36-hour hackathon.

## What Works So Far

### Mode 01 — Explain My Code
- Step through 3 core algorithms visually (BST, Dijkstra, QuickSort)
- Physical node/edge animation with play/pause/step controls
- Code highlighted per execution step

### Mode 02 — Analyze My Bug
- Paste buggy code → get instant bug diagnosis
- Detects 3 common patterns: DFS missing return, BFS O(N) dequeue, BubbleSort out-of-bounds
- Shows what's wrong, why, and corrected implementation

### Mode 03 — Optimize My Code (Basic)
- Compare brute-force vs optimized on 3 algorithm pairs
- Live operation counters + Chart.js complexity curves
- N-slider to see divergence grow

## Running It

Just open `index.html` in Chrome. No server needed.

## What's Coming Next (Phase 2)

- [ ] 12+ algorithms in Explain mode
- [ ] Side-by-side animated trace canvas in Analyze mode
- [ ] Full dot-grid race animation in Optimize mode
- [ ] Time & Space Complexity deep-dive tabs
- [ ] Three.js particle background
- [ ] Smooth Barba.js page transitions
- [ ] Node.js backend server

## Stack

- HTML5 / CSS3 / Vanilla JavaScript
- Chart.js (complexity graphs)
- Font Awesome (icons)
