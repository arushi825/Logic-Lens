/**
 * Logic Lens — Optimizer Engine (Phase 1 Prototype)
 * 3 algorithm race scenarios with working charts and counters.
 *
 * TODO: Add animated dot-grid race that fills in real-time — Phase 2
 * TODO: Add 3 more scenarios: Dijkstra, Insertion vs Heap, Merge vs Counting — Phase 2
 */

const OPTIMIZE_PAYLOADS = {
    dp_fibonacci: {
        nDefault: 12,
        reasoning: "Naive recursion computes Fibonacci by branching into fib(n-1) and fib(n-2) independently, with no memory of prior results.",
        shortcomings: "fib(3) gets computed multiple times while solving fib(5). The recursion tree grows exponentially — 2^N branches for input N.",
        optMechanic: "Dynamic Programming (Memoization): cache each subproblem result in a hash map. Before recursing, check if the answer is already stored.",
        optWhyFaster: "The exponential tree collapses into a single linear chain. Each value fib(X) is computed exactly once, then retrieved in O(1) on every subsequent call.",
        optDiff: "O(2^N) → O(N) time. Space shifts from O(N) call stack to O(N) memo cache.",
        brute: {
            oClass: "O(2^N) Time",
            opsFn: n => Math.pow(2, n) - 1,
            spaceFn: n => n,
            color: '#fca5a5',
            code: `function fibBrute(n) {
    if (n <= 1) return n;
    // Recomputes same branches repeatedly
    return fibBrute(n - 1) + fibBrute(n - 2);
}`
        },
        opt: {
            oClass: "O(N) Time",
            opsFn: n => (2 * n) - 1,
            spaceFn: n => n * 2,
            color: '#6ee7b7',
            code: `function fibOpt(n, memo = {}) {
    if (n in memo) return memo[n]; // O(1) cache hit
    if (n <= 1) return n;
    memo[n] = fibOpt(n-1, memo) + fibOpt(n-2, memo);
    return memo[n];
}`
        }
    },

    llx_opt_bubble: {
        nDefault: 20,
        reasoning: "Bubble Sort performs N passes over the array, comparing and swapping adjacent elements. Inner loop runs N times per outer loop pass.",
        shortcomings: "Even for a nearly-sorted array, it blindly runs all N*N comparisons. No early exit optimization in the basic form.",
        optMechanic: "Merge Sort splits the array in half recursively until subarrays are length 1, then merges them back in sorted order using temporary arrays.",
        optWhyFaster: "Halving the dataset at each level gives log N levels of recursion. Merging at each level costs N comparisons — total O(N log N).",
        optDiff: "O(N²) → O(N log N). Space increases from O(1) in-place to O(N) auxiliary merge arrays.",
        brute: {
            oClass: "O(N²) Time",
            opsFn: n => n * n,
            spaceFn: n => 1,
            color: '#fca5a5',
            code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`
        },
        opt: {
            oClass: "O(N log N) Time",
            opsFn: n => Math.floor(n * Math.max(1, Math.log2(n))) + 1,
            spaceFn: n => n,
            color: '#6ee7b7',
            code: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    L = merge_sort(arr[:mid])
    R = merge_sort(arr[mid:])
    return merge(L, R)`
        }
    },

    llx_opt_selection: {
        nDefault: 20,
        reasoning: "Selection Sort scans the entire remaining unsorted portion to find the minimum element, then swaps it into position.",
        shortcomings: "Finding the minimum requires scanning N, then N-1, then N-2... elements. Total: N*(N-1)/2 comparisons — no best-case shortcut.",
        optMechanic: "Quick Sort picks a pivot element and partitions the array so smaller values go left and larger go right, then recurses on each partition.",
        optWhyFaster: "Instead of searching for absolute minimums sequentially, partitioning divides the problem space logarithmically, saving massive iteration overhead.",
        optDiff: "O(N²) → O(N log N) average. Space from O(1) to O(log N) recursion stack.",
        brute: {
            oClass: "O(N²) Time",
            opsFn: n => Math.floor((n * n) / 2),
            spaceFn: n => 1,
            color: '#fca5a5',
            code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`
        },
        opt: {
            oClass: "O(N log N) Time",
            opsFn: n => Math.floor(n * Math.max(1, Math.log2(n))),
            spaceFn: n => Math.max(1, Math.ceil(Math.log2(n + 1))),
            color: '#6ee7b7',
            code: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)`
        }
    }
};

/* ------------------------------------------------------------------ */

let currentOptPayload = null;
let currentN = 10;
window.optTimeChart  = null;
window.optSpaceChart = null;

document.addEventListener('DOMContentLoaded', () => {
    const algSelect   = document.getElementById('alg-select-optimize');
    const nSlider     = document.getElementById('optimize-n-slider');
    const nVal        = document.getElementById('optimize-n-val');
    const elReasoning = document.getElementById('opt-reasoning');
    const elShort     = document.getElementById('opt-shortcomings');
    const elMechanic  = document.getElementById('opt-mechanic');
    const elWhy       = document.getElementById('opt-why-faster');
    const elDiff      = document.getElementById('opt-diff');
    const elBrute     = document.getElementById('opt-code-brute');
    const elOpt       = document.getElementById('opt-code-opt');
    const cntBrute    = document.getElementById('op-counter-brute');
    const cntOpt      = document.getElementById('op-counter-opt');
    const gridBrute   = document.getElementById('grid-brute');
    const gridOpt     = document.getElementById('grid-opt');
    const badgeBrute  = document.getElementById('bg-badge-brute');
    const badgeOpt    = document.getElementById('bg-badge-opt');
    const speedupEl   = document.getElementById('speedup-multiplier');
    const speedupN    = document.getElementById('speedup-n-label');

    if (!algSelect) return;

    algSelect.addEventListener('change', e => {
        const p = OPTIMIZE_PAYLOADS[e.target.value];
        if (!p) return;
        currentOptPayload = p;
        currentN = p.nDefault;
        nSlider.value = currentN;
        nVal.textContent = currentN;

        elReasoning.textContent = p.reasoning;
        elShort.textContent     = p.shortcomings;
        elMechanic.textContent  = p.optMechanic;
        elWhy.textContent       = p.optWhyFaster;
        elDiff.textContent      = p.optDiff;
        elBrute.textContent     = p.brute.code;
        elOpt.textContent       = p.opt.code;
        badgeBrute.textContent  = p.brute.oClass;
        badgeOpt.textContent    = p.opt.oClass;

        initCharts();
        updateRace();
    });

    nSlider.addEventListener('input', e => {
        currentN = parseInt(e.target.value);
        nVal.textContent = currentN;
        if (currentOptPayload) updateRace();
    });

    function initCharts() {
        const ctxTime  = document.getElementById('optimize-time-chart')?.getContext('2d');
        const ctxSpace = document.getElementById('optimize-space-chart')?.getContext('2d');
        if (!ctxTime || !ctxSpace) return;

        if (window.optTimeChart)  window.optTimeChart.destroy();
        if (window.optSpaceChart) window.optSpaceChart.destroy();

        const chartBase = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, color: '#94a3b8', text: 'Input Size (N)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, color: '#94a3b8', text: 'Operations' }, ticks: { color: '#94a3b8' } }
            },
            plugins: { legend: { labels: { color: '#f8fafc' } } },
            animation: { duration: 400 }
        };

        window.optTimeChart = new Chart(ctxTime, {
            type: 'line',
            data: { labels: [], datasets: [
                { label: 'Brute Force', data: [], borderColor: '#fca5a5', borderWidth: 2, fill: true, backgroundColor: 'rgba(239,68,68,0.08)', tension: 0.3, pointRadius: 0 },
                { label: 'Optimized',  data: [], borderColor: '#6ee7b7', borderWidth: 2, fill: true, backgroundColor: 'rgba(16,185,129,0.08)', tension: 0.3, pointRadius: 0 }
            ]},
            options: chartBase
        });

        window.optSpaceChart = new Chart(ctxSpace, {
            type: 'line',
            data: { labels: [], datasets: [
                { label: 'Brute Space', data: [], borderColor: '#fca5a5', borderWidth: 2, borderDash: [5,5], tension: 0.3, pointRadius: 0 },
                { label: 'Opt Space',   data: [], borderColor: '#6ee7b7', borderWidth: 2, borderDash: [5,5], tension: 0.3, pointRadius: 0 }
            ]},
            options: { ...chartBase, plugins: { legend: { labels: { color: '#f8fafc' } } } }
        });
    }

    function updateRace() {
        if (!currentOptPayload) return;
        const n = currentN;
        const p = currentOptPayload;

        const opsBrute = Math.floor(p.brute.opsFn(n));
        const opsOpt   = Math.floor(p.opt.opsFn(n));

        cntBrute.textContent = opsBrute.toLocaleString();
        cntOpt.textContent   = opsOpt.toLocaleString();

        // Speedup
        const ratio = opsBrute / Math.max(opsOpt, 1);
        speedupN.textContent = n;
        if (ratio > 1000)       { speedupEl.textContent = (ratio/1000).toFixed(1) + 'k×'; speedupEl.style.color = '#00f0ff'; }
        else if (ratio > 100)   { speedupEl.textContent = ratio.toFixed(0) + '×';         speedupEl.style.color = '#3b82f6'; }
        else if (ratio > 1)     { speedupEl.textContent = ratio.toFixed(1) + '×';         speedupEl.style.color = '#6ee7b7'; }
        else                    { speedupEl.textContent = '1.0×';                         speedupEl.style.color = 'white'; }

        // Build chart data
        const tB = [], tO = [], sB = [], sO = [], labels = [];
        for (let i = 1; i <= n; i++) {
            labels.push(i);
            tB.push(p.brute.opsFn(i));
            tO.push(p.opt.opsFn(i));
            sB.push(p.brute.spaceFn(i));
            sO.push(p.opt.spaceFn(i));
        }

        if (window.optTimeChart) {
            window.optTimeChart.data.labels = labels;
            window.optTimeChart.data.datasets[0].data = tB;
            window.optTimeChart.data.datasets[1].data = tO;
            window.optTimeChart.update();
        }
        if (window.optSpaceChart) {
            window.optSpaceChart.data.labels = labels;
            window.optSpaceChart.data.datasets[0].data = sB;
            window.optSpaceChart.data.datasets[1].data = sO;
            window.optSpaceChart.update();
        }

        // Dot Grid (capped at 300 dots for performance)
        const MAX_DOTS = 300;
        gridBrute.innerHTML = '';
        gridOpt.innerHTML   = '';

        let bHtml = '', oHtml = '';
        const showB = Math.min(opsBrute, MAX_DOTS);
        const showO = Math.min(opsOpt, MAX_DOTS);

        for (let i = 0; i < showB; i++)
            bHtml += `<div class="op-dot op-dot-filled" style="background:${p.brute.color};"></div>`;
        if (opsBrute > MAX_DOTS)
            bHtml += `<div style="color:var(--text-muted);font-size:0.75rem;width:100%;">+${(opsBrute - MAX_DOTS).toLocaleString()} more</div>`;

        for (let i = 0; i < showO; i++)
            oHtml += `<div class="op-dot op-dot-filled" style="background:${p.opt.color};"></div>`;
        if (opsOpt > MAX_DOTS)
            oHtml += `<div style="color:var(--text-muted);font-size:0.75rem;width:100%;">+${(opsOpt - MAX_DOTS).toLocaleString()} more</div>`;

        gridBrute.innerHTML = bHtml;
        gridOpt.innerHTML   = oHtml;

        // TODO: Add timed animated dot-fill race in Phase 2
    }
});
