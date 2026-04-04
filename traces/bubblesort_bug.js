window.PAYLOADS = window.PAYLOADS || {};
window.PAYLOADS['bubblesort_bug'] = {
    problemId: "bubblesort_bug",
    approaches: [{
        id: 'bubble-bounds',
        title: "BubbleSort Bounds Off",
        badge: 'Exception',
        badgeClass: 'badge-on2',
        desc: 'Analyzing classic IndexOutOfBounds exceptions.',
        code: [
            { line: 1, text: "<span class='syn-kw'>for</span> i <span class='syn-kw'>in</span> range(len(arr)):" },
            { line: 2, text: "    <span class='syn-kw'>for</span> j <span class='syn-kw'>in</span> range(len(arr)):" },
            { line: 3, text: "        <span class='syn-kw'>if</span> arr[j] > arr[j+1]: <span class='syn-kw'># Bug</span>" },
            { line: 4, text: "            arr[j], arr[j+1] = arr[j+1], arr[j]" }
        ]
    }],
    trace: [
        {
            nodes: [
                { id: '0', val: '9', state: 'placed', x: '20%', y: '50%' },
                { id: '1', val: '5', state: 'placed', x: '40%', y: '50%' },
                { id: '2', val: '2', state: 'placed', x: '60%', y: '50%' },
                { id: '3', val: '8', state: 'placed', x: '80%', y: '50%' }
            ],
            edges: [],
            explWhat: "Phase 1: Starting array logic with elements at indexes 0, 1, 2, 3.",
            explWhy: "Data occupies bounded heap fragments securely.",
            activeLines: [1], stack: ["bubble()"], heap: 4
        },
        {
            nodes: [
                { id: '0', val: '9', state: 'placed', x: '20%', y: '50%' },
                { id: '1', val: '5', state: 'placed', x: '40%', y: '50%' },
                { id: '2', val: '2', state: 'comparing', x: '60%', y: '50%' },
                { id: '3', val: '8', state: 'comparing', x: '80%', y: '50%' }
            ],
            edges: [],
            explWhat: "Phase 2: Inner loop j reaches index 2. Comparing arr[2] and arr[3].",
            explWhy: "Index math evaluates safely within memory boundaries.",
            activeLines: [2, 3], stack: ["bubble()"], heap: 4
        },
        {
            nodes: [
                { id: '0', val: '9', state: 'placed', x: '20%', y: '50%' },
                { id: '1', val: '5', state: 'placed', x: '40%', y: '50%' },
                { id: '2', val: '2', state: 'placed', x: '60%', y: '50%' },
                { id: '3', val: '8', state: 'error', x: '80%', y: '50%' }
            ],
            edges: [],
            explWhat: "Phase 3 (BUG): j reaches index 3. It tries to compare arr[3] and arr[4].",
            explWhy: "Index 4 is undefined (out of bounds). Trying to read unallocated memory throws a fatal Exception.",
            activeLines: [3], stack: ["Exception: Index Error"], heap: 4
        },
        {
            nodes: [
                { id: '0', val: '9', state: 'placed', x: '20%', y: '50%' },
                { id: '1', val: '5', state: 'placed', x: '40%', y: '50%' },
                { id: '2', val: '2', state: 'success', x: '60%', y: '50%' },
                { id: '3', val: '8', state: 'success', x: '80%', y: '50%' }
            ],
            edges: [],
            explWhat: "Phase 4 (FIX): Modifying the inner loop bound to `range(len(arr) - 1 - i)`.",
            explWhy: "This strictly enforces that `j+1` will never exceed index 3, and also optimizes by mathematically skipping already sorted suffix elements.",
            activeLines: [2], stack: ["bubble()"], heap: 4
        },
        {
            nodes: [
                { id: '0', val: '5', state: 'success', x: '20%', y: '50%' },
                { id: '1', val: '2', state: 'success', x: '40%', y: '50%' },
                { id: '2', val: '8', state: 'success', x: '60%', y: '50%' },
                { id: '3', val: '9', state: 'success', x: '80%', y: '50%' }
            ],
            edges: [],
            explWhat: "Phase 5: Secure array sorted cleanly.",
            explWhy: "Stable array metrics guaranteed without memory faults.",
            activeLines: [4], stack: ["bubble()"], heap: 4
        }
    ]
};
