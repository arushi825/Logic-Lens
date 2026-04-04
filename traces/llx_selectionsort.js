window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_selectionsort'] = {
    problemId: "llx_selectionsort",
    approaches: [{
        id: 'llx-select', title: "Selection Sort", badge: 'O(n²)', badgeClass: 'badge-on2',
        desc: 'Naive quadratic array sweep tracking an absolute minimum index for physical swaps.',
        code: [
            { line: 1, text: "<span class='syn-kw'>for</span> i <span class='syn-kw'>in</span> range(len(arr)):" },
            { line: 2, text: "    min_idx = i" },
            { line: 3, text: "    <span class='syn-kw'>for</span> j <span class='syn-kw'>in</span> range(i+1, len(arr)):" },
            { line: 4, text: "        <span class='syn-kw'>if</span> arr[j] &lt; arr[min_idx]: min_idx = j" },
            { line: 5, text: "    arr[i], arr[min_idx] = arr[min_idx], arr[i]" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_ss_0', '8', 'placed', '20%', '50%'),
                window.createNode('llx_ss_1', '5', 'placed', '40%', '50%'),
                window.createNode('llx_ss_2', '2', 'placed', '60%', '50%')
            ],
            edges: [],
            explWhat: "Beginning iteration at index 0. The current index (8) is assumed to be the minimum.",
            explWhy: "Selection sort actively ignores bounds by maintaining a `min_idx` tracking pointer, hoping to find a mathematically smaller number across the remaining set.",
            activeLines: [1, 2], stack: ["selectionSort()"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_ss_0', '8', 'comparing', '20%', '50%'),
                window.createNode('llx_ss_1', '5', 'comparing', '40%', '50%'),
                window.createNode('llx_ss_2', '2', 'placed', '60%', '50%')
            ],
            edges: [],
            explWhat: "Hardware pointer sweeps to 5. It flags 5 as the new lowest minimum.",
            explWhy: "Since 5 < 8, the algorithm re-targets its structural memory address for swapping.",
            activeLines: [3, 4], stack: ["find min element"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_ss_0', '8', 'placed', '20%', '50%'),
                window.createNode('llx_ss_1', '5', 'comparing', '40%', '50%'),
                window.createNode('llx_ss_2', '2', 'comparing', '60%', '50%')
            ],
            edges: [],
            explWhat: "Pointer sweeps to 2. It overrides again as the absolute minimum element.",
            explWhy: "Because of quadratic nesting, the search guarantees finding the global sub-minimum for this interval.",
            activeLines: [4], stack: ["find min element"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_ss_2', '2', 'success', '20%', '50%'),
                window.createNode('llx_ss_1', '5', 'placed', '40%', '50%'),
                window.createNode('llx_ss_0', '8', 'placed', '60%', '50%')
            ],
            edges: [],
            explWhat: "Executing the actual hard memory swap immediately.",
            explWhy: "Node 2 permanently sits at index 0 and won't be evaluated again. O(1) swap cost offsets O(N) sweep cost.",
            activeLines: [5], stack: ["swap memory blocks"], heap: 1
        }
    ]
};
