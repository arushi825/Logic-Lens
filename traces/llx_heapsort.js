window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_heapsort'] = {
    problemId: "llx_heapsort",
    approaches: [{
        id: 'llx-heap', title: "Heap Sort", badge: 'O(n log n)', badgeClass: 'badge-olog',
        desc: 'Extracting maximum properties continuously from a mapped binary heap array structure.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>heapSort</span>(arr):" },
            { line: 2, text: "    n = len(arr)" },
            { line: 3, text: "    <span class='syn-kw'>for</span> i <span class='syn-kw'>in</span> range(n//2 - 1, -1, -1): heapify(arr, n, i)" },
            { line: 4, text: "    <span class='syn-kw'>for</span> i <span class='syn-kw'>in</span> range(n-1, 0, -1):" },
            { line: 5, text: "        arr[i], arr[0] = arr[0], arr[i]" },
            { line: 6, text: "        heapify(arr, i, 0)" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_hs_0', 'Max(9)', 'placed', '50%', '20%'),
                window.createNode('llx_hs_1', '4', 'placed', '30%', '50%'),
                window.createNode('llx_hs_2', '7', 'placed', '70%', '50%')
            ],
            edges: [{ id: 'e-hs1', from: '50%', fromY: '20%', to: '30%', toY: '50%' }, { id: 'e-hs2', from: '50%', fromY: '20%', to: '70%', toY: '50%' }],
            explWhat: "The linear array is logically visualized as a Max-Heap geometry. Heapify ensures the root is the largest.",
            explWhy: "Unlike comparison searches, Heapsort establishes an absolute guaranteed maximum without fully sorting the structure.",
            activeLines: [3], stack: ["heapSort()"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_hs_0', 'Max(9)', 'comparing', '50%', '20%'),
                window.createNode('llx_hs_1', '4', 'comparing', '30%', '50%'),
                window.createNode('llx_hs_2', '7', 'placed', '70%', '50%')
            ],
            edges: [{ id: 'e-hs1', from: '50%', fromY: '20%', to: '30%', toY: '50%' }, { id: 'e-hs2', from: '50%', fromY: '20%', to: '70%', toY: '50%' }],
            explWhat: "The root maximum (9) is violently swapped with the last logical leaf node (4).",
            explWhy: "This locks the largest element permanently into the back of the sorted array matrix, effectively removing it from the heap tree.",
            activeLines: [4, 5], stack: ["swap root"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_hs_1', '4', 'placed', '50%', '20%'),
                window.createNode('llx_hs_2', '7', 'placed', '70%', '50%'),
                window.createNode('llx_hs_0', '9', 'success', '85%', '85%')
            ],
            edges: [{ id: 'e-hs2', from: '50%', fromY: '20%', to: '70%', toY: '50%' }],
            explWhat: "Node 9 is severed from tree topology. Node 4 sits improperly as the new root.",
            explWhy: "The heap constraint is now violated. `heapify` must instantly sink the weak node down.",
            activeLines: [6], stack: ["heapify() root fallback"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_hs_2', 'Max(7)', 'placed', '50%', '20%'),
                window.createNode('llx_hs_1', '4', 'placed', '30%', '50%'),
                window.createNode('llx_hs_0', '9', 'success', '85%', '85%')
            ],
            edges: [{ id: 'e-hs1', from: '50%', fromY: '20%', to: '30%', toY: '50%' }],
            explWhat: "Heapify sinks 4, restoring the Max-Heap. Node 7 surfaces as the next maximum.",
            explWhy: "Constant structural regeneration. This continuous O(Log N) sinking limits catastrophic N comparisons.",
            activeLines: [6], stack: ["heapify complete"], heap: 1
        }
    ]
};
