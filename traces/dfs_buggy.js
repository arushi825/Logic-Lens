window.PAYLOADS = window.PAYLOADS || {};
window.PAYLOADS['dfs_buggy'] = {
    problemId: "dfs_buggy",
    approaches: [{
        id: 'dfs-cycle',
        title: "DFS Infinite Loop",
        badge: 'O(∞)',
        badgeClass: 'badge-on2',
        desc: 'A raw depth-first search failing on a cyclic graph.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>dfs</span>(node):" },
            { line: 2, text: "    <span class='syn-kw'>if not</span> node: <span class='syn-kw'>return</span>" },
            { line: 3, text: "    <span class='syn-kw'>for</span> neighbor <span class='syn-kw'>in</span> node.neighbors:" },
            { line: 4, text: "        <span class='syn-kw'># Bug: Missing visited check allows infinite looping!</span>" },
            { line: 5, text: "        dfs(neighbor)" }
        ]
    }],
    trace: [
        {
            nodes: [{ id: 'A', val: 'Root A', state: 'placed', x: '50%', y: '10%' }],
            edges: [],
            explWhat: "Phase 1: Starting DFS at Root node A.",
            explWhy: "Memory is loaded. The call stack pushes dfs(A).",
            activeLines: [1, 2], stack: ["dfs(A)"], heap: 1
        },
        {
            nodes: [
                { id: 'A', val: 'Root A', state: 'placed', x: '50%', y: '10%' },
                { id: 'B', val: 'Node B', state: 'placed', x: '30%', y: '40%' }
            ],
            edges: [{ id: 'e-a-b', from: '50%', fromY: '10%', to: '30%', toY: '40%' }],
            explWhat: "Phase 2: Exploring depth. Stack pushes neighbor B.",
            explWhy: "Normal DFS behavior. Pushing to the hardware call stack recursively.",
            activeLines: [3, 5], stack: ["dfs(A)", "dfs(B)"], heap: 2
        },
        {
            nodes: [
                { id: 'A', val: 'Root A', state: 'comparing', x: '50%', y: '10%' },
                { id: 'B', val: 'Node B', state: 'placed', x: '30%', y: '40%' },
                { id: 'C', val: 'Node C', state: 'placed', x: '70%', y: '40%' }
            ],
            edges: [
                { id: 'e-a-b', from: '50%', fromY: '10%', to: '30%', toY: '40%' },
                { id: 'e-b-c', from: '30%', fromY: '40%', to: '70%', toY: '40%' }
            ],
            explWhat: "Phase 3: Exploring neighbor C from B.",
            explWhy: "Still descending depth correctly.",
            activeLines: [3, 5], stack: ["dfs(A)", "dfs(B)", "dfs(C)"], heap: 3
        },
        {
            nodes: [
                { id: 'A', val: 'FATAL', state: 'error', x: '50%', y: '10%' },
                { id: 'B', val: 'Node B', state: 'placed', x: '30%', y: '40%' },
                { id: 'C', val: 'Node C', state: 'placed', x: '70%', y: '40%' }
            ],
            edges: [
                { id: 'e-a-b', from: '50%', fromY: '10%', to: '30%', toY: '40%' },
                { id: 'e-b-c', from: '30%', fromY: '40%', to: '70%', toY: '40%' },
                { id: 'e-c-a', from: '70%', fromY: '40%', to: '50%', toY: '10%' }
            ],
            explWhat: "Phase 4 (BUG): C connects back to Root A. The stack enters an infinite back-reference cycle!",
            explWhy: "Because we have no 'visited' cache, the CPU blindly follows the edge back up to A, causing a StackOverflow.",
            activeLines: [4, 5], stack: ["dfs(A)", "dfs(B)", "dfs(C)", "dfs(A)..."], heap: 4
        },
        {
            nodes: [
                { id: 'A', val: 'Visited Set', state: 'success', x: '50%', y: '10%' },
                { id: 'B', val: 'Node B', state: 'placed', x: '30%', y: '40%' },
                { id: 'C', val: 'Node C', state: 'success', x: '70%', y: '40%' }
            ],
            edges: [
                { id: 'e-a-b', from: '50%', fromY: '10%', to: '30%', toY: '40%' },
                { id: 'e-b-c', from: '30%', fromY: '40%', to: '70%', toY: '40%' }
            ],
            explWhat: "Phase 5 (FIX): Adding `visited = set()` and `if neighbor in visited: skip`.",
            explWhy: "The topological cycle is detected in O(1) hashmap lookup time, instantly breaking the infinite loop before the stack faults.",
            activeLines: [1, 2], stack: ["dfs(A)", "dfs(B)", "dfs(C)"], heap: 4
        }
    ]
};
