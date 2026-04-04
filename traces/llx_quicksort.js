window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_quicksort'] = {
    problemId: "llx_quicksort",
    approaches: [{
        id: 'llx-quick', title: "Quick Sort (Full)", badge: 'O(n log n)', badgeClass: 'badge-olog',
        desc: 'Fast in-place sort executing dynamic partitioning around a pivot element recursively.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>quickSort</span>(arr, low, high):" },
            { line: 2, text: "    <span class='syn-kw'>if</span> low < high:" },
            { line: 3, text: "        pi = partition(arr, low, high)" },
            { line: 4, text: "        quickSort(arr, low, pi-1)" },
            { line: 5, text: "        quickSort(arr, pi+1, high)" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_qs_p', 'Pivot(5)', 'placed', '80%', '20%'),
                window.createNode('llx_qs_1', '9', 'placed', '20%', '20%'),
                window.createNode('llx_qs_2', '2', 'placed', '40%', '20%')
            ],
            edges: [],
            explWhat: "Selecting the right-most element (5) as the functional Pivot.",
            explWhy: "QuickSort fundamentally requires a fulcrum point to determine left/right partition sets structurally.",
            activeLines: [1, 3], stack: ["quickSort(0, 2)"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_qs_p', 'Pivot(5)', 'comparing', '80%', '20%'),
                window.createNode('llx_qs_1', '9', 'comparing', '20%', '20%'),
                window.createNode('llx_qs_2', '2', 'placed', '40%', '20%')
            ],
            edges: [],
            explWhat: "Evaluating element 9 against the Pivot 5. It is larger.",
            explWhy: "Because it exceeds the pivot, the separation pointer 'i' does not advance. It remains trapped on the right logical partition.",
            activeLines: [3], stack: ["partition()"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_qs_p', 'Pivot(5)', 'comparing', '80%', '20%'),
                window.createNode('llx_qs_1', '9', 'placed', '20%', '20%'),
                window.createNode('llx_qs_2', '2', 'comparing', '40%', '20%')
            ],
            edges: [],
            explWhat: "Evaluating element 2 against the Pivot 5. It is smaller.",
            explWhy: "Because 2 < 5, an immediate swap is triggered with element 9 to throw 2 to the absolute left partition.",
            activeLines: [3], stack: ["partition() swap"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_qs_p', 'Pivot(5)', 'success', '40%', '50%'),
                window.createNode('llx_qs_2', '2', 'success', '20%', '50%'),
                window.createNode('llx_qs_1', '9', 'placed', '60%', '50%')
            ],
            edges: [],
            explWhat: "The Pivot forcefully swaps bounds into its exact final sorted position.",
            explWhy: "The partition is complete. The exact index of 5 is structurally locked forever. Operations recursively fork to subarrays.",
            activeLines: [4, 5], stack: ["quickSort recursive fork"], heap: 2
        }
    ]
};
