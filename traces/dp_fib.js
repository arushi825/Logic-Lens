window.PAYLOADS = window.PAYLOADS || {};
window.PAYLOADS['dp_fib'] = {
    problemId: "dp_fib",
    approaches: [{
        id: 'dp-memo',
        title: "DP Memoization Proof",
        badge: 'O(N)',
        badgeClass: 'badge-o1',
        desc: 'Visualizing exponential stack pruning mathematically.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>fib</span>(n, cache):" },
            { line: 2, text: "    <span class='syn-kw'>if</span> n <span class='syn-kw'>in</span> cache: <span class='syn-kw'>return</span> cache[n]" },
            { line: 3, text: "    <span class='syn-kw'>if</span> n <= 1: <span class='syn-kw'>return</span> n" },
            { line: 4, text: "    res = fib(n-1) + fib(n-2)" },
            { line: 5, text: "    cache[n] = res; <span class='syn-kw'>return</span> res" }
        ]
    }],
    trace: [
        {
            nodes: [{ id: 'f4', val: 'fib(4)', state: 'placed', x: '50%', y: '10%' }],
            edges: [],
            explWhat: "Phase 1: Computing fib(4).",
            explWhy: "Requires recursively branching into fib(3) and fib(2).",
            activeLines: [1, 4], stack: ["fib(4)"], heap: 1
        },
        {
            nodes: [
                { id: 'f4', val: 'fib(4)', state: 'placed', x: '50%', y: '10%' },
                { id: 'f3', val: 'fib(3)', state: 'placed', x: '30%', y: '40%' },
                { id: 'f2a', val: 'fib(2)', state: 'placed', x: '70%', y: '40%' },
                { id: 'f2b', val: 'fib(2)', state: 'error', x: '20%', y: '70%' },
                { id: 'f1', val: 'fib(1)', state: 'placed', x: '40%', y: '70%' }
            ],
            edges: [
                { id: 'e1', from: '50%', fromY: '10%', to: '30%', toY: '40%' },
                { id: 'e2', from: '50%', fromY: '10%', to: '70%', toY: '40%' },
                { id: 'e3', from: '30%', fromY: '40%', to: '20%', toY: '70%' },
                { id: 'e4', from: '30%', fromY: '40%', to: '40%', toY: '70%' }
            ],
            explWhat: "Phase 2 (INEFFICIENCY): Notice the multiple redundant fib(2) branching calculations.",
            explWhy: "A purely recursive tree calculates the exact same sub-problems over and over. Processing limits scale at terrifying O(2^n) rates.",
            activeLines: [4], stack: ["..."], heap: 5
        },
        {
            nodes: [
                { id: 'c', val: 'Cache {2:1}', state: 'success', x: '80%', y: '20%' },
                { id: 'f4', val: 'fib(4)', state: 'success', x: '50%', y: '10%' },
                { id: 'f3', val: 'fib(3)', state: 'success', x: '30%', y: '40%' },
                { id: 'f2a', val: 'fib(2)', state: 'success', x: '70%', y: '40%' },
                { id: 'f1', val: 'fib(1)', state: 'success', x: '40%', y: '70%' }
            ],
            edges: [
                { id: 'e1', from: '50%', fromY: '10%', to: '30%', toY: '40%' },
                { id: 'e2', from: '50%', fromY: '10%', to: '70%', toY: '40%' },
                { id: 'e4', from: '30%', fromY: '40%', to: '40%', toY: '70%' }
            ],
            explWhat: "Phase 4 (FIX): The DP hash map intervenes.",
            explWhy: "Instead of branching left into fib(2) entirely, we save its state during the rightward branch. The left branch is instantaneously halted by a cache hit.",
            activeLines: [2, 5], stack: ["fib(4)"], heap: 3
        },
        {
            nodes: [
                { id: 'c', val: 'O(N) Saved', state: 'success', x: '50%', y: '50%' }
            ],
            edges: [],
            explWhat: "Phase 5: Time complexity collapses from O(2^N) down to O(N).",
            explWhy: "Each unique number from 1 to N is computed exactly once structurally, reducing an impossible tree curve to a perfectly straight line.",
            activeLines: [5], stack: [""], heap: 1
        }
    ]
};
