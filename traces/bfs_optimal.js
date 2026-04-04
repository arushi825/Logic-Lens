window.PAYLOADS = window.PAYLOADS || {};
window.PAYLOADS['bfs_optimal'] = {
    problemId: "bfs_optimal",
    approaches: [{
        id: 'bfs-perf',
        title: "BFS Sub-Optimal Queue",
        badge: 'O(V²)',
        badgeClass: 'badge-on2',
        desc: 'Uncovering the hidden O(N) array shifting bug in naive BFS queues.',
        code: [
            { line: 1, text: "queue = [start_node]" },
            { line: 2, text: "<span class='syn-kw'>while</span> queue:" },
            { line: 3, text: "    curr = queue.pop(0) <span class='syn-kw'># The O(N) bug!</span>" },
            { line: 4, text: "    <span class='syn-kw'>for</span> n <span class='syn-kw'>in</span> curr.neighbors:" },
            { line: 5, text: "        queue.append(n)" }
        ]
    }],
    trace: [
        {
            nodes: [{ id: 'q', val: '[ A, B, C, D ]', state: 'placed', x: '50%', y: '50%' }],
            edges: [],
            explWhat: "Phase 1: BFS populated standard Array-based Queue.",
            explWhy: "Using native arrays is functionally correct but computationally dangerous.",
            activeLines: [1], stack: ["bfs()"], heap: 4
        },
        {
            nodes: [{ id: 'q', val: '[ B, C, D ]', state: 'error', x: '50%', y: '50%' }],
            edges: [],
            explWhat: "Phase 2 (BUG): Extracting 'A' using pop(0) forces memory shift.",
            explWhy: "To maintain contiguous memory, shifting the entire remaining 1,000,000 elements left by 1 index requires an O(N) CPU penalty.",
            activeLines: [3], stack: ["bfs()"], heap: 3
        },
        {
            nodes: [{ id: 'q', val: '[ B, C, D ]', state: 'error', x: '45%', y: '50%' }],
            edges: [],
            explWhat: "Phase 3: The hidden N multiplier.",
            explWhy: "Since BFS runs for V vertices, shifting the queue array every time turns O(V+E) into a brutally slow O(V²).",
            activeLines: [3], stack: ["bfs()"], heap: 3
        },
        {
            nodes: [
                { id: 'n1', val: 'B', state: 'success', x: '40%', y: '50%' },
                { id: 'n2', val: 'C', state: 'success', x: '50%', y: '50%' },
                { id: 'n3', val: 'D', state: 'success', x: '60%', y: '50%' }
            ],
            edges: [
                { id: 'll1', from: '40%', fromY: '50%', to: '50%', toY: '50%' },
                { id: 'll2', from: '50%', fromY: '50%', to: '60%', toY: '50%' }
            ],
            explWhat: "Phase 4 (FIX): Refactoring to a Linked-List / Deque structure.",
            explWhy: "We replace the flat array `[ ]` with memory-isolated pointer nodes `collections.deque`.",
            activeLines: [1], stack: ["bfs()"], heap: 3
        },
        {
            nodes: [
                { id: 'n2', val: 'C', state: 'success', x: '50%', y: '50%' },
                { id: 'n3', val: 'D', state: 'success', x: '60%', y: '50%' }
            ],
            edges: [
                { id: 'll2', from: '50%', fromY: '50%', to: '60%', toY: '50%' }
            ],
            explWhat: "Phase 5: O(1) popping restored.",
            explWhy: "Popping 'B' simply moves the `HEAD` pointer to 'C' in constant O(1) time without moving any other memory blocks.",
            activeLines: [3], stack: ["bfs()"], heap: 2
        }
    ]
};
