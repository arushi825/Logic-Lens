/**
 * Logic Lens - Physical Animation Engine with Absolute Tab Isolation
 */

// --- 1. GLOBALLY INJECTED PAYLOADS ---
const PAYLOADS = window.PAYLOADS || {};
let CURRENT_PAYLOAD = PAYLOADS.bst || Object.values(PAYLOADS)[0];

// --- 2. TAB TEMPLATES FOR STRICT ISOLATION ---
// Change TAB_TEMPLATES.time to be a function so it can inject the CURRENT_PAYLOAD labels dynamically
const TAB_TEMPLATES = {
    execution: `
        <div class="visual-canvas active-tab" style="width: 100%; min-height: 480px; position: relative;">
            <svg id="edge-layer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;"></svg>
            <div id="node-layer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2;"></div>
        </div>
    `,
    time: () => {
        let title = "Algorithm Density Proof";
        let badge = "O(X)";
        let desc = "";
        
        if (CURRENT_PAYLOAD.problemId === "bst-insert") {
            title = "Iterative BST Density Proof"; badge = "O(log n) Exact Match";
            desc = "Because the Binary Search Tree divides the searchable nodes strictly by half at every single decision branch, the algorithm completely ignores massive topological chunks of data. The physical CPU only executes mathematical steps exactly equal to the height of the tree.";
        } else if (CURRENT_PAYLOAD.problemId === "quicksort-part") {
            title = "QuickSort Complexity Proof"; badge = "O(n log n) Expected";
            desc = "By partitioning the array across a pivot and recursively dividing, QuickSort limits its comparison depth to logarithmic height while evaluating each of the N elements at that depth layer.";
        } else if (CURRENT_PAYLOAD.problemId === "dijkstra-path") {
            title = "Dijkstra's Pathfinding Proof"; badge = "O(V²) Baseline";
            desc = "Without a priority queue optimization, checking the minimum distance from all unvisited nodes takes O(V) at every V iteration, resulting in a quadratic scaling curve.";
        } else if (["llx_mergesort", "llx_quicksort", "llx_heapsort"].includes(CURRENT_PAYLOAD.problemId)) {
            title = "Logarithmic Bound Curve"; badge = "O(N Log N)";
            desc = "By leveraging structural division or tree-based properties, the data converges safely preventing full N-iteration scans per element. This bounds overall execution heavily compared to simple sweeps.";
        } else if (["llx_selectionsort", "llx_insertionsort", "llx_bubblesort"].includes(CURRENT_PAYLOAD.problemId)) {
            title = "Quadratic Iteration Penalty"; badge = "O(N²)";
            desc = "Due to nested loop evaluations or extensive continuous swapping, the CPU must mathematically evaluate nearly every coordinate combination causing explosive operations scaling.";
        } else if (["llx_countingsort", "llx_radixsort", "llx_bucketsort"].includes(CURRENT_PAYLOAD.problemId)) {
            title = "Linear Density Limit"; badge = "O(N + K)";
            desc = "Avoiding deep comparisons completely bypassing standard monolithic curves. Relying on mathematical memory mapping collapses operations exactly parallel to sequential limits horizontally.";
        }
        
        return `
        <div class="visual-canvas active-tab" style="width: 100%; min-height: 480px; padding: 2rem; overflow-y: auto;">
            <div class="time-layout" style="margin: 0 auto;">
                
                <!-- Zone 1: Header Row -->
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <h3 style="color: #fff; font-size: 1.5rem; margin: 0;">${title}</h3>
                    <div style="display: flex; align-items: center; gap: 1rem;">
                        <button class="control-btn" id="btn-fullscreen-time" title="Toggle Fullscreen" style="width: 40px; height: 40px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text-muted);">
                            <i class="fa-solid fa-expand"></i>
                        </button>
                        <div class="complexity-badge-large">${badge}</div>
                    </div>
                </div>

                <!-- Zone 2: Full Width Scaling Graph -->
                <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 1.5rem; width: 100%;">
                    <h4 style="color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem;">Dominant Scaling Graph</h4>
                    <div style="height: 320px; width: 100%; position: relative; overflow: visible;">
                        <canvas id="complexity-chart"></canvas>
                    </div>
                </div>

                <!-- Zone 3: Full Width Operation Dot Grid -->
                <div style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 1.5rem; width: 100%;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem;">
                        <span style="font-size: 1rem; color: var(--text-muted); line-height: 1.5;">Total Data Density Limits<br><span style="color:#fff;">N Outline Maximums vs Actual Executions</span></span>
                        <div style="text-align: right;">
                            <span id="op-counter-val" style="font-size: 3rem; font-family: var(--font-mono); font-weight: 700; color: #10b981; line-height: 1;">0</span>
                            <span style="font-size: 0.85rem; color: var(--text-muted); display: block;">Exact Ops Executed</span>
                        </div>
                    </div>
                    <!-- DOT GRID -->
                    <div id="operation-grid-container" class="operation-grid" style="max-height: 200px;"></div>
                </div>

                <!-- Zone 4: Full Width Step Callout Card -->
                <div style="background: rgba(16, 185, 129, 0.05); border-left: 4px solid #10b981; border-radius: 0 12px 12px 0; padding: 1.5rem; width: 100%;">
                    <h4 style="color: #10b981; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Why ${badge} happens here</h4>
                    <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 400;">
                        ${desc}
                    </p>
                </div>

                <!-- Zone 5: Sub-Scrubber -->
                <div style="display: flex; align-items: center; gap: 1.5rem; width: 100%; background: rgba(0,0,0,0.8); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    <span style="color: #94a3b8; font-size: 1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Network Node Count (N)</span>
                    <input type="range" id="insight-n-slider" min="1" max="100" value="10" style="flex: 1; accent-color: #10b981;">
                    <span id="insight-n-val" style="color: #fff; font-family: var(--font-mono); font-weight: 700; font-size: 1.5rem; width: 50px; text-align: right;">10</span>
                </div>

            </div>
        </div>
        `;
    },
    space: `
        <div class="visual-canvas active-tab" style="width: 100%; min-height: 480px; padding: 1rem; overflow-y: auto;">
            <div class="memory-play-area" style="display: flex; gap: 2rem; width: 100%; height: 100%; padding: 1rem;">
                <div class="call-stack-area" style="flex: 1; display: flex; flex-direction: column; min-height: 280px;">
                    <h4 style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Call Stack (Depth: <span id="stack-depth">0</span>)</h4>
                    <div class="stack-container" id="call-stack" style="flex: 1; display: flex; flex-direction: column-reverse; justify-content: flex-start; gap: 10px; padding: 1rem; background: rgba(0,0,0,0.5); border-radius: 12px; box-shadow: inset 0 0 20px rgba(0,0,0,0.8); border: none; overflow-y: auto;"></div>
                </div>
                <div class="heap-area" style="flex: 1.5; display: flex; flex-direction: column; min-height: 280px;">
                    <h4 style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Heap Allocations</h4>
                    <div class="heap-container" id="heap-space" style="flex: 1; display: flex; flex-direction: column; gap: 10px; padding: 1rem; background: rgba(0,0,0,0.5); border-radius: 12px; box-shadow: inset 0 0 20px rgba(0,0,0,0.8); border: none; overflow-y: auto;"></div>
                </div>
            </div>
        </div>
    `
};

// --- 3. STATE ---
let currentState = {
    isAnalyzed: false,
    activeTab: 'execution',
    currentStep: 0,
    isPlaying: false,
    playInterval: null,
    totalSteps: CURRENT_PAYLOAD.trace.length
};

// --- 4. DOM ELEMENTS ---
const ELEMS = {
    btnAnalyze: document.getElementById('magic-analyze-btn'),
    loadingState: document.getElementById('loading-state'),
    animatorContainer: document.getElementById('animator-container'),
    approachesShelf: document.getElementById('approaches-shelf'),
    approachesList: document.getElementById('approaches-list'),
    globalStatusDot: document.getElementById('global-status-dot'),
    globalStatusText: document.getElementById('global-status-text'),
    codeContainer: document.getElementById('code-lines-container'),
    btnPlay: document.getElementById('btn-play'),
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    btnRestart: document.getElementById('btn-restart'),
    speedSlider: document.getElementById('speed-slider'),
    speedVal: document.getElementById('speed-val'),
    explanationWhat: document.getElementById('explanation-what'),
    explanationWhy: document.getElementById('explanation-why'),
    stepBadge: document.getElementById('step-badge'),
    tabs: document.querySelectorAll('.tab-btn'),
    canvasArea: document.getElementById('visual-canvas-area')
};

let drawnEdges = new Set();
let drawnNodes = new Map();

// --- 5. INITIALIZATION ---
function init() {
    ELEMS.canvasArea.innerHTML = TAB_TEMPLATES['execution'];
    bindEvents();
}

function bindEvents() {
    // analyzeBtn click listener is now in hookCohereAnalyzer()

    ELEMS.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (currentState.activeTab === tab.dataset.tab) return;

            ELEMS.tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // STRICT TAB ISOLATION UNMOUNTING
            // 1. Destroy active explicit charts to prevent memory bleeds
            if (window.timeChart) {
                window.timeChart.destroy();
                window.timeChart = null;
            }

            // 2. Wipe DOM completely
            ELEMS.canvasArea.innerHTML = '';
            drawnEdges.clear();
            drawnNodes.clear();

            currentState.activeTab = tab.dataset.tab;

            // 3. Mount fresh DOM
            ELEMS.canvasArea.innerHTML = typeof TAB_TEMPLATES[currentState.activeTab] === 'function' ? TAB_TEMPLATES[currentState.activeTab]() : TAB_TEMPLATES[currentState.activeTab];

            // 4. Re-bind Tab specific engines
            if (currentState.activeTab === 'time') {
                initComplexityChart();
                const slider = document.getElementById('insight-n-slider');
                if (slider) {
                    slider.addEventListener('input', renderSpatialInsights);
                    renderSpatialInsights(); // Initial paint
                }
            }

            if (currentState.isAnalyzed) {
                renderStep(currentState.currentStep);
            }
        });
    });

    ELEMS.btnPlay.addEventListener('click', togglePlay);
    ELEMS.btnNext.addEventListener('click', () => { pause(); stepForward(); });
    ELEMS.btnPrev.addEventListener('click', () => { pause(); stepBackward(); });
    ELEMS.btnRestart.addEventListener('click', () => { pause(); goToStep(0); });

    if (ELEMS.speedSlider) {
        ELEMS.speedSlider.addEventListener('input', (e) => {
            ELEMS.speedVal.textContent = `${parseFloat(e.target.value).toFixed(1)}x`;
            if (currentState.isPlaying) { pause(); play(); }
        });
    }

    // Bind dropdown to hot-swap payloads
    const algSelect = document.getElementById('expl-alg-select');
    if (algSelect) {
        algSelect.addEventListener('change', (e) => {
            const chosenId = e.target.value;
            if (PAYLOADS[chosenId]) {
                CURRENT_PAYLOAD = PAYLOADS[chosenId];
                
                // Strict isolation resets
                const nl = document.getElementById('node-layer');
                const el = document.getElementById('edge-layer');
                if (nl) nl.innerHTML = '';
                if (el) el.innerHTML = '';
                drawnNodes.clear();
                drawnEdges.clear();
                currentState.totalSteps = CURRENT_PAYLOAD.trace.length;
                
                // Go back to the beginning explicitly and re-render
                pause();
                goToStep(0);
            }
        });
    }

    // Algorithm Case Studies Card Clicks
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const algo = card.dataset.algorithm;
            if (PAYLOADS[algo]) {
                CURRENT_PAYLOAD = PAYLOADS[algo];
                currentState.totalSteps = CURRENT_PAYLOAD.trace.length;
                
                // Select in dropdown visually
                if (algSelect) algSelect.value = algo;
                
                // Populate input textarea with raw code
                const rawCode = CURRENT_PAYLOAD.approaches[0].code.map(c => c.text.replace(/<[^>]*>?/gm, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')).join('\n');
                const inputArea = document.getElementById('universal-input');
                if (inputArea) inputArea.value = rawCode;
                
                // Scroll to dashboard
                document.querySelector('.dashboard').scrollIntoView({ behavior: 'smooth' });
                
                // Strictly reset trace state
                const nlCard = document.getElementById('node-layer');
                const elCard = document.getElementById('edge-layer');
                if (nlCard) nlCard.innerHTML = '';
                if (elCard) elCard.innerHTML = '';
                drawnNodes.clear();
                drawnEdges.clear();
                goToStep(0);
                
                // Trigger Analyze Engine
                ELEMS.btnAnalyze.click();
            }
        });
    });

    // Fullscreen Toggle Logic
    document.addEventListener('click', (e) => {
        const btnClick = e.target.closest('#btn-fullscreen-main, #btn-fullscreen-time');
        if (btnClick) {
            const dashboard = document.getElementById('dashboard-explain');
            if (!document.fullscreenElement) {
                dashboard.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        }
    });

    document.addEventListener('fullscreenchange', () => {
        const isFull = !!document.fullscreenElement;
        const toggleIcons = document.querySelectorAll('#btn-fullscreen-main i, #btn-fullscreen-time i');
        toggleIcons.forEach(icon => {
            if (isFull) {
                icon.classList.remove('fa-expand');
                icon.classList.add('fa-compress');
            } else {
                icon.classList.remove('fa-compress');
                icon.classList.add('fa-expand');
            }
        });
    });
}

function buildApproachesShelf() {
    ELEMS.approachesList.innerHTML = '';
    const appr = CURRENT_PAYLOAD.approaches[0];
    const card = document.createElement('div');
    card.className = `approach-card selected`;
    card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="card-title">${appr.title}</span>
            <span class="complexity-badge ${appr.badgeClass}" style="opacity:1; transform:none; margin:0;">${appr.badge}</span>
        </div>
        <div class="card-desc">${appr.desc}</div>
    `;
    ELEMS.approachesList.appendChild(card);
}

function renderCodeView(activeLines = []) {
    ELEMS.codeContainer.innerHTML = '';
    CURRENT_PAYLOAD.approaches[0].code.forEach((lineObj) => {
        const div = document.createElement('div');
        div.className = 'code-line';
        if (activeLines.includes(lineObj.line)) {
            div.style.background = 'rgba(139, 92, 246, 0.2)';
            div.style.borderLeftColor = '#8b5cf6';
        }
        div.innerHTML = `
            <div class="line-num">${lineObj.line}</div>
            <div class="line-text" style="display:flex; align-items:center;">${lineObj.text}</div>
        `;
        ELEMS.codeContainer.appendChild(div);
    });
}

function buildTimeline() {
    const track = document.getElementById('timeline-track');
    track.innerHTML = '<div class="timeline-progress" id="timeline-progress"></div>';

    CURRENT_PAYLOAD.trace.forEach((step, idx) => {
        if (idx === 0) return;
        const node = document.createElement('div');
        node.className = 'timeline-node';
        node.style.left = `${(idx / (currentState.totalSteps - 1)) * 100}%`;
        node.onclick = (e) => { e.stopPropagation(); goToStep(idx); };
        track.appendChild(node);
    });
}

// --- 6. RENDER SYSTEM ---
function togglePlay() { currentState.isPlaying ? pause() : play(); }

function play() {
    if (currentState.currentStep >= currentState.totalSteps - 1) goToStep(0);
    currentState.isPlaying = true;
    document.getElementById('play-icon').classList.replace('fa-play', 'fa-pause');
    const multiplier = parseFloat(ELEMS.speedSlider.value) || 1.0;
    currentState.playInterval = setInterval(() => {
        if (currentState.currentStep < currentState.totalSteps - 1) stepForward();
        else pause();
    }, 1200 / multiplier);
}
function pause() {
    currentState.isPlaying = false;
    clearInterval(currentState.playInterval);
    document.getElementById('play-icon').classList.replace('fa-pause', 'fa-play');
}
function stepForward() { goToStep(currentState.currentStep + 1); }
function stepBackward() { goToStep(currentState.currentStep - 1); }

function goToStep(idx) {
    if (idx >= 0 && idx < currentState.totalSteps) {
        currentState.currentStep = idx;
        const data = CURRENT_PAYLOAD.trace[idx];
        if (!data) return; // Silent fallback

        const pBar = document.getElementById('timeline-progress');
        if (pBar) pBar.style.width = `${(idx / (Math.max(currentState.totalSteps - 1, 1))) * 100}%`;
        document.querySelectorAll('.timeline-node').forEach((el, i) => el.classList.toggle('active', i + 1 === idx));
        if (ELEMS.stepBadge) ELEMS.stepBadge.textContent = `Step ${idx + 1}`;
        
        // Safety fallbacks for texts
        if (ELEMS.explanationWhat) ELEMS.explanationWhat.textContent = data.explWhat || data.explain || "Explanation unavailable.";
        if (ELEMS.explanationWhy) ELEMS.explanationWhy.textContent = data.explWhy || "";
        
        renderCodeView(data.activeLines || []);

        renderStep(idx);
    }
}

function renderStep(idx) {
    const data = CURRENT_PAYLOAD.trace[idx];
    if (currentState.activeTab === 'execution') renderPhysicalEngine(data);
    if (currentState.activeTab === 'space') renderSpaceComplexity(data);
    // Note: Time tab is rendered globally via sliders, not per-step trace.
}

// --- 7. ISOLATED TAB RENDERING LOGIC ---

// EXPLICIT CHART.JS ENGINE
function initComplexityChart() {
    const ctx = document.getElementById('complexity-chart');
    if (!ctx) return;

    // Theoretical limits for chart
    const maxN = 100;
    const labels = Array.from({ length: maxN }, (_, i) => i + 1);
    const dataOn = labels.map(x => x);
    
    let datasetAlgo = [];
    let algoLabel = "O(log n) Dominant Line";
    
    if (CURRENT_PAYLOAD.problemId === "bst-insert") {
        datasetAlgo = labels.map(x => Math.floor(Math.log2(x)) + 1);
        algoLabel = "O(log n) Dominant Line";
    } else if (CURRENT_PAYLOAD.problemId === "quicksort-part") {
        datasetAlgo = labels.map(x => Math.floor(x * Math.log2(x)) + 1);
        algoLabel = "O(n log n) Expected Time";
    } else if (CURRENT_PAYLOAD.problemId === "dijkstra-path") {
        datasetAlgo = labels.map(x => Math.floor(x * x));
        algoLabel = "O(V²) Baseline Graph";
    } else if (["llx_mergesort", "llx_quicksort", "llx_heapsort"].includes(CURRENT_PAYLOAD.problemId)) {
        datasetAlgo = labels.map(x => Math.floor(x * Math.log2(x)) + 1);
        algoLabel = "O(N log N) Ideal Bounds";
    } else if (["llx_selectionsort", "llx_insertionsort", "llx_bubblesort"].includes(CURRENT_PAYLOAD.problemId)) {
        datasetAlgo = labels.map(x => Math.floor(x * x));
        algoLabel = "O(N²) Nested Iterations";
    } else if (["llx_countingsort", "llx_radixsort", "llx_bucketsort"].includes(CURRENT_PAYLOAD.problemId)) {
        datasetAlgo = labels.map(x => x);
        algoLabel = "O(N) Flat Map Boundary";
    }

    window.timeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: algoLabel,
                    data: datasetAlgo,
                    borderColor: '#10b981', // Literal Hex color
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: Array(maxN).fill(0), // Array of point sizes
                    pointBackgroundColor: Array(maxN).fill('#10b981'),
                    pointBorderColor: Array(maxN).fill('#10b981')
                },
                {
                    label: 'O(n) Linear Limit',
                    data: dataOn,
                    borderColor: '#3b82f6', // Literal Hex color
                    borderWidth: 1.5,
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Forces obedience to CSS strict height
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                legend: { labels: { color: '#e2e8f0', font: { family: 'sans-serif', size: 11 } } },
                tooltip: { enabled: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' },
                    title: { display: true, text: 'Input Size (N)', color: '#94a3b8' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#94a3b8' },
                    title: { display: true, text: 'Operations Count', color: '#94a3b8' },
                    min: 0,
                    max: CURRENT_PAYLOAD.problemId === "dijkstra-path" ? 10000 : (CURRENT_PAYLOAD.problemId === "quicksort-part" ? 800 : 100)
                }
            }
        }
    });
}

function renderSpatialInsights() {
    const slider = document.getElementById('insight-n-slider');
    const valDisplay = document.getElementById('insight-n-val');
    const gridContainer = document.getElementById('operation-grid-container');
    const opCounter = document.getElementById('op-counter-val');

    if (!slider || !valDisplay || !gridContainer || !opCounter) return;

    const N = parseInt(slider.value);
    valDisplay.textContent = N;

    let opsRequired = 0;
    if (CURRENT_PAYLOAD.problemId === "bst-insert") {
        opsRequired = Math.floor(Math.log2(N)) + 1;
    } else if (CURRENT_PAYLOAD.problemId === "quicksort-part") {
        opsRequired = Math.floor(N * Math.log2(N)) + 1;
    } else if (CURRENT_PAYLOAD.problemId === "dijkstra-path") {
        opsRequired = Math.floor(N * N);
    } else if (["llx_mergesort", "llx_quicksort", "llx_heapsort"].includes(CURRENT_PAYLOAD.problemId)) {
        opsRequired = Math.floor(N * Math.log2(N)) + 1;
    } else if (["llx_selectionsort", "llx_insertionsort", "llx_bubblesort"].includes(CURRENT_PAYLOAD.problemId)) {
        opsRequired = Math.floor(N * N);
    } else if (["llx_countingsort", "llx_radixsort", "llx_bucketsort"].includes(CURRENT_PAYLOAD.problemId)) {
        opsRequired = N;
    }
    
    opCounter.textContent = opsRequired;

    // Build dots (cap visual dots at max 1000 so the DOM doesn't freeze for O(V^2))
    gridContainer.innerHTML = '';
    const visualCap = Math.min(N * N, 500); 
    const visualN = Math.min(N, visualCap);
    for (let i = 0; i < visualN; i++) {
        const dot = document.createElement('div');
        dot.className = `op-dot ${i < opsRequired ? 'op-dot-filled' : 'op-dot-outline'}`;
        gridContainer.appendChild(dot);
    }

    // Reactively update the Chart marker globally
    if (window.timeChart) {
        // Build dynamic arrays to explode the exact point size
        const radiusArr = Array.from({ length: 100 }, (_, idx) => (idx === N - 1) ? 6 : 0);
        const colorArr = Array.from({ length: 100 }, (_, idx) => (idx === N - 1) ? '#ffffff' : '#10b981');

        window.timeChart.data.datasets[0].pointRadius = radiusArr;
        window.timeChart.data.datasets[0].pointBackgroundColor = colorArr;
        window.timeChart.data.datasets[0].pointBorderColor = colorArr;
        window.timeChart.update();
    }
}

// SVG PHYSICS
function renderPhysicalEngine(data) {
    const nodeLayer = document.getElementById('node-layer');
    const edgeLayer = document.getElementById('edge-layer');
    if (!nodeLayer || !edgeLayer || !data) return;

    const safeNodes = data.nodes || [];
    const safeEdges = data.edges || [];

    const currentFrameIds = new Set(safeNodes.map(n => n.id));

    safeNodes.forEach(nodeData => {
        let el = drawnNodes.get(nodeData.id);
        if (!el) {
            el = document.createElement('div');
            el.className = 'physical-node';
            el.textContent = nodeData.val;
            nodeLayer.appendChild(el);
            drawnNodes.set(nodeData.id, el);
        }
        el.className = `physical-node ${nodeData.state}`;
        el.style.left = nodeData.x;
        el.style.top = nodeData.y;
    });

    drawnNodes.forEach((el, id) => {
        if (!currentFrameIds.has(id)) {
            el.remove();
            drawnNodes.delete(id);
        }
    });

    const currentEdgeIds = new Set(safeEdges.map(e => e.id));
    safeEdges.forEach(edgeData => {
        let line = document.getElementById(edgeData.id);
        if (!line) {
            line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('id', edgeData.id);
            line.setAttribute('class', 'edge-line');
            line.setAttribute('x1', edgeData.from);
            line.setAttribute('y1', edgeData.fromY);

            line.setAttribute('x2', edgeData.to);
            line.setAttribute('y2', edgeData.toY);

            line.style.strokeDasharray = '1000';
            line.style.strokeDashoffset = '1000';
            edgeLayer.appendChild(line);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    line.style.strokeDashoffset = '0';
                    line.classList.add('highlight');
                    drawnEdges.add(edgeData.id);
                    setTimeout(() => line.classList.remove('highlight'), 800);
                });
            });
        }
    });

    Array.from(edgeLayer.children).forEach(line => {
        if (!currentEdgeIds.has(line.id)) {
            line.remove();
            drawnEdges.delete(line.id);
        }
    });
}

function renderSpaceComplexity(data) {
    const stackList = document.getElementById('call-stack');
    const depthDisplay = document.getElementById('stack-depth');
    const heapList = document.getElementById('heap-space');
    if (!stackList || !heapList || !depthDisplay || !data) return;

    stackList.innerHTML = '';
    const safeStack = data.stack || [];
    const revFrames = [...safeStack].reverse();
    revFrames.forEach((frameStr, i) => {
        const d = document.createElement('div');
        d.className = `stack-frame ${i === 0 ? 'executing' : 'waiting'}`;
        d.textContent = frameStr;
        stackList.appendChild(d);
    });

    depthDisplay.textContent = safeStack.length;

    heapList.innerHTML = '';
    const safeHeap = data.heap || 0;
    for (let i = 0; i < safeHeap; i++) {
        const block = document.createElement('div');
        block.className = 'heap-block type-constant';
        block.textContent = "Node";
        heapList.appendChild(block);
    }
}

// --- 8. GLOBAL EFFECTS & TRANSITIONS ---
function initThreeJSParticles() {
    const container = document.getElementById('three-canvas-container');
    if (!container || typeof THREE === 'undefined') return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x8b5cf6, // purple accent
        transparent: true,
        opacity: 0.6
    });
    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);
    camera.position.z = 5;

    let mouseX = 0; let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();
    function animateThree() {
        requestAnimationFrame(animateThree);
        const elapsedTime = clock.getElapsedTime();
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;
        particlesMesh.position.x += (mouseX * 0.5 - particlesMesh.position.x) * 0.05;
        particlesMesh.position.y += (-mouseY * 0.5 - particlesMesh.position.y) * 0.05;
        renderer.render(scene, camera);
    }
    animateThree();
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- 9. LOCAL ALGORITHMS ENGINE ---
async function triggerVisualizerUpdate() {
    ELEMS.loadingState.classList.add('hidden');
    ELEMS.animatorContainer.classList.remove('hidden');
    ELEMS.approachesShelf.classList.remove('hidden');
    ELEMS.globalStatusText.textContent = "Execution Live.";

    buildApproachesShelf();
    renderCodeView();
    buildTimeline();
    currentState.isAnalyzed = true;
    goToStep(0);
}

function hookLocalAnalyzer() {
    const analyzeBtn = document.getElementById('magic-analyze-btn');
    if(!analyzeBtn) return;
    
    // Rive Loading Animation Init (if canvas exists)
    const riveCanvas = document.getElementById('rive-loading-canvas');
    if(riveCanvas && typeof rive !== 'undefined') {
        new rive.Rive({
            src: 'https://cdn.rive.app/animations/vehicles.riv', 
            canvas: riveCanvas,
            autoplay: true,
        });
    }

    analyzeBtn.addEventListener('click', () => {
        ELEMS.loadingState.classList.remove('hidden');
        ELEMS.animatorContainer.classList.add('hidden');
        ELEMS.approachesShelf.classList.add('hidden');
        ELEMS.globalStatusDot.classList.add('active');
        ELEMS.globalStatusText.textContent = "Loading offline logic...";

        setTimeout(() => {
            // Restore manual offline logic by directly executing CURRENT_PAYLOAD
            if (!CURRENT_PAYLOAD || !CURRENT_PAYLOAD.trace) {
                alert("No manual payload selected or loaded.");
                ELEMS.loadingState.classList.add('hidden');
                return;
            }
            
            currentState.totalSteps = CURRENT_PAYLOAD.trace.length || 1;
            triggerVisualizerUpdate();
        }, 800); // Small loading effect for UX
    });
}

function initBarba() {
    if(typeof barba === 'undefined') return;
    barba.init({
        transitions: [{
            name: 'opacity-transition',
            leave(data) {
                return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
            },
            enter(data) {
                return gsap.from(data.next.container, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.out' });
            }
        }]
    });
}

// Global initialization override
window.addEventListener('DOMContentLoaded', () => {
    initThreeJSParticles();
    initBarba();
    hookLocalAnalyzer();
    
    // Initialize Locomotive Scroll v5
    if (typeof LocomotiveScroll !== 'undefined') {
        const locomotiveScroll = new LocomotiveScroll();
    }
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50
        });
    }

    init(); // Fire original engine mounting
});