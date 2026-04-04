/**
 * Logic Lens — Optimizer Engine v2
 * All 6 algorithm race scenarios with animated dot-race and live charts.
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
            oClass: "O(2ᴺ) Time",
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

    dijkstra_path: {
        nDefault: 15,
        reasoning: "Naive Dijkstra scans all unvisited vertices on every iteration to find the minimum-distance node, requiring a full O(V) sweep each pass.",
        shortcomings: "Nested V×V scans dominate runtime. For dense graphs with many vertices, the quadratic penalty becomes catastrophic.",
        optMechanic: "Priority Queue (Min-Heap) Optimization: instead of scanning all nodes, always pop the closest unvisited node from a min-heap in O(log V) time.",
        optWhyFaster: "The heap replaces the O(V) linear minimum scan with O(log V) extraction. Each edge relaxation is O(log V), giving total O((V+E) log V).",
        optDiff: "O(V²) → O((V+E) log V). The difference explodes on sparse graphs with millions of vertices.",
        brute: {
            oClass: "O(V²) Time",
            opsFn: n => n * n,
            spaceFn: n => n,
            color: '#fca5a5',
            code: `def dijkstra_naive(graph, src):
    dist = {v: inf for v in graph}
    dist[src] = 0
    visited = set()
    for _ in range(len(graph)):
        # O(V) scan every round — quadratic!
        u = min((v for v in graph
                 if v not in visited),
                key=lambda v: dist[v])
        visited.add(u)
        for v, w in graph[u]:
            dist[v] = min(dist[v],
                          dist[u] + w)
    return dist`
        },
        opt: {
            oClass: "O((V+E) log V)",
            opsFn: n => Math.floor((n + n * 2) * Math.max(1, Math.log2(n))),
            spaceFn: n => n * 2,
            color: '#6ee7b7',
            code: `import heapq
def dijkstra_heap(graph, src):
    dist = {v: inf for v in graph}
    dist[src] = 0
    pq = [(0, src)]  # min-heap
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in graph[u]:
            if dist[u]+w < dist[v]:
                dist[v] = dist[u]+w
                heapq.heappush(pq,(dist[v],v))
    return dist`
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
    },

    llx_opt_insertion: {
        nDefault: 18,
        reasoning: "Insertion Sort builds the sorted array one element at a time by shifting larger elements rightward to make room for the key.",
        shortcomings: "In the worst case (reverse-sorted input), every element must slide past every previously sorted element — O(N²) shifts total.",
        optMechanic: "Heap Sort builds a max-heap data structure from the array, then repeatedly extracts the maximum element to produce a sorted sequence.",
        optWhyFaster: "The binary heap guarantees that extracting the max and re-heapifying always costs O(log N). Doing this N times yields tight O(N log N).",
        optDiff: "O(N²) worst → O(N log N) guaranteed. Space stays O(1) for both — but HeapSort has zero degradation on adversarial inputs.",
        brute: {
            oClass: "O(N²) Worst",
            opsFn: n => Math.floor((n * n) / 2),
            spaceFn: n => 1,
            color: '#fca5a5',
            code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift larger elements right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`
        },
        opt: {
            oClass: "O(N log N) Guaranteed",
            opsFn: n => Math.floor(2 * n * Math.max(1, Math.log2(n))),
            spaceFn: n => 1,
            color: '#6ee7b7',
            code: `def heap_sort(arr):
    n = len(arr)
    # Build max-heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)`
        }
    },

    llx_opt_counting: {
        nDefault: 25,
        reasoning: "Merge Sort uses divide-and-conquer: split the array, recursively sort each half, then merge back O(N log N) total.",
        shortcomings: "Despite being asymptotically optimal for comparison sorts, it allocates O(N) temporary memory on every merge pass.",
        optMechanic: "Counting Sort bypasses comparisons entirely. It counts element frequencies and reconstructs the array from those counts in linear time.",
        optWhyFaster: "Without any comparison, the algorithm is no longer bound by Ω(N log N) comparison lower bounds. It runs in O(N + K) where K is the value range.",
        optDiff: "O(N log N) → O(N + K). When K ≈ N, this collapses to pure O(N) — linear time, the theoretical minimum.",
        brute: {
            oClass: "O(N log N) Time",
            opsFn: n => Math.floor(n * Math.max(1, Math.log2(n))) + 1,
            spaceFn: n => n,
            color: '#fca5a5',
            code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    L = merge_sort(arr[:mid])
    R = merge_sort(arr[mid:])
    return merge(L, R)  # O(N) merge`
        },
        opt: {
            oClass: "O(N + K) Time",
            opsFn: n => n + Math.max(10, Math.floor(n * 0.6)),
            spaceFn: n => n + Math.max(10, Math.floor(n * 0.6)),
            color: '#6ee7b7',
            code: `def counting_sort(arr, max_val):
    count = [0] * (max_val + 1)
    # Count frequencies — O(N)
    for num in arr:
        count[num] += 1
    # Reconstruct — O(N + K)
    idx = 0
    for val, freq in enumerate(count):
        for _ in range(freq):
            arr[idx] = val
            idx += 1
    return arr`
        }
    }
};

/* ------------------------------------------------------------------ */

let currentOptPayload = null;
let currentN = 10;
window.optTimeChart  = null;
window.optSpaceChart = null;

// Race animation state
let raceAnimId = null;
let bruteOpsFilled = 0;
let optOpsFilled = 0;

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
        startRaceAnimation();
    });

    nSlider.addEventListener('input', e => {
        currentN = parseInt(e.target.value);
        nVal.textContent = currentN;
        if (currentOptPayload) {
            updateCharts();
            startRaceAnimation();
        }
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
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, color: '#94a3b8', text: 'Operations' }, ticks: { color: '#94a3b8' }, min: 0 }
            },
            plugins: { legend: { labels: { color: '#f8fafc' } } },
            animation: { duration: 500 }
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

        updateCharts();
    }

    function updateCharts() {
        if (!currentOptPayload) return;
        const n = currentN;
        const p = currentOptPayload;

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

        // Update speedup
        const opsBrute = Math.floor(p.brute.opsFn(n));
        const opsOpt   = Math.floor(p.opt.opsFn(n));
        const ratio = opsBrute / Math.max(opsOpt, 1);
        speedupN.textContent = n;
        if (ratio > 1000)     { speedupEl.textContent = (ratio/1000).toFixed(1) + 'k×'; speedupEl.style.color = '#00f0ff'; }
        else if (ratio > 100) { speedupEl.textContent = ratio.toFixed(0) + '×';         speedupEl.style.color = '#3b82f6'; }
        else if (ratio > 1)   { speedupEl.textContent = ratio.toFixed(1) + '×';         speedupEl.style.color = '#6ee7b7'; }
        else                  { speedupEl.textContent = '1.0×';                         speedupEl.style.color = 'white'; }
    }

    /* ────────────────────────────────────────────────────────────────
       ANIMATED DOT RACE ENGINE
       Both grids fill simultaneously at different speeds so you can
       watch brute-force explode while optimized stays small.
    ──────────────────────────────────────────────────────────────── */
    function startRaceAnimation() {
        if (!currentOptPayload) return;

        // Cancel any in-progress race
        if (raceAnimId) cancelAnimationFrame(raceAnimId);

        const n = currentN;
        const p = currentOptPayload;
        const MAX_DOTS = 300;   // visual cap per grid

        const opsBrute = Math.floor(p.brute.opsFn(n));
        const opsOpt   = Math.floor(p.opt.opsFn(n));

        const showB = Math.min(opsBrute, MAX_DOTS);
        const showO = Math.min(opsOpt, MAX_DOTS);

        // Pre-build all dot elements (greyed out)
        gridBrute.innerHTML = '';
        gridOpt.innerHTML   = '';

        const dotsB = [];
        const dotsO = [];

        for (let i = 0; i < showB; i++) {
            const d = document.createElement('div');
            d.className = 'op-dot';
            d.style.cssText = `width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.08);transition:background 0.1s,transform 0.1s;flex-shrink:0;`;
            gridBrute.appendChild(d);
            dotsB.push(d);
        }
        // Overflow label for brute
        if (opsBrute > MAX_DOTS) {
            const lbl = document.createElement('div');
            lbl.style.cssText = 'color:var(--text-muted,#64748b);font-size:0.75rem;width:100%;margin-top:4px;';
            lbl.textContent = `+${(opsBrute - MAX_DOTS).toLocaleString()} more ops`;
            gridBrute.appendChild(lbl);
        }

        for (let i = 0; i < showO; i++) {
            const d = document.createElement('div');
            d.className = 'op-dot';
            d.style.cssText = `width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.08);transition:background 0.1s,transform 0.1s;flex-shrink:0;`;
            gridOpt.appendChild(d);
            dotsO.push(d);
        }
        if (opsOpt > MAX_DOTS) {
            const lbl = document.createElement('div');
            lbl.style.cssText = 'color:var(--text-muted,#64748b);font-size:0.75rem;width:100%;margin-top:4px;';
            lbl.textContent = `+${(opsOpt - MAX_DOTS).toLocaleString()} more ops`;
            gridOpt.appendChild(lbl);
        }

        // Reset counters
        cntBrute.textContent = '0';
        cntOpt.textContent   = '0';

        let filledB = 0;
        let filledO = 0;

        // How many dots to fill per frame — scale so race finishes in ~2.5s (150 frames @ 60fps)
        const TARGET_FRAMES = 150;
        const rateB = Math.max(1, Math.ceil(showB / TARGET_FRAMES));
        const rateO = Math.max(1, Math.ceil(showO / TARGET_FRAMES));

        const colorB = p.brute.color;
        const colorO = p.opt.color;

        function raceTick() {
            let anyChange = false;

            // Fill brute dots
            const endB = Math.min(filledB + rateB, showB);
            for (let i = filledB; i < endB; i++) {
                dotsB[i].style.background = colorB;
                dotsB[i].style.transform  = 'scale(1.15)';
                setTimeout(() => { if (dotsB[i]) dotsB[i].style.transform = 'scale(1)'; }, 120);
            }
            if (endB > filledB) {
                filledB = endB;
                cntBrute.textContent = opsBrute <= MAX_DOTS
                    ? filledB.toLocaleString()
                    : `${MAX_DOTS.toLocaleString()}+`;
                anyChange = true;
            }

            // Fill opt dots
            const endO = Math.min(filledO + rateO, showO);
            for (let i = filledO; i < endO; i++) {
                dotsO[i].style.background = colorO;
                dotsO[i].style.transform  = 'scale(1.15)';
                setTimeout(() => { if (dotsO[i]) dotsO[i].style.transform = 'scale(1)'; }, 120);
            }
            if (endO > filledO) {
                filledO = endO;
                cntOpt.textContent = opsOpt <= MAX_DOTS
                    ? filledO.toLocaleString()
                    : `${Math.min(filledO, MAX_DOTS).toLocaleString()}+`;
                anyChange = true;
            }

            if (filledB < showB || filledO < showO) {
                raceAnimId = requestAnimationFrame(raceTick);
            } else {
                // Final settled state: show true counts
                cntBrute.textContent = opsBrute.toLocaleString();
                cntOpt.textContent   = opsOpt.toLocaleString();
                raceAnimId = null;
            }
        }

        raceAnimId = requestAnimationFrame(raceTick);
    }
});
