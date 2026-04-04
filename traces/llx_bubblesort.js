window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_bubblesort'] = {
    problemId: "llx_bubblesort",
    approaches: [{
        id: 'llx-bubble-core', title: "Bubble Sort (Correct)", badge: 'O(n²)', badgeClass: 'badge-on2',
        desc: 'Constant cyclic swaps floating the mathematically maximum digit to its terminal suffix point.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>bubbleSort</span>(arr):" },
            { line: 2, text: "    n = len(arr)" },
            { line: 3, text: "    <span class='syn-kw'>for</span> i <span class='syn-kw'>in</span> range(n):" },
            { line: 4, text: "        swapped = False" },
            { line: 5, text: "        <span class='syn-kw'>for</span> j <span class='syn-kw'>in</span> range(0, n-i-1):" },
            { line: 6, text: "            <span class='syn-kw'>if</span> arr[j] > arr[j+1]:" },
            { line: 7, text: "                arr[j], arr[j+1] = arr[j+1], arr[j]" },
            { line: 8, text: "                swapped = True" },
            { line: 9, text: "        <span class='syn-kw'>if not</span> swapped: <span class='syn-kw'>break</span>" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_bs_0', '6', 'comparing', '20%', '50%'),
                window.createNode('llx_bs_1', '3', 'comparing', '40%', '50%'),
                window.createNode('llx_bs_2', '8', 'placed', '60%', '50%')
            ],
            edges: [],
            explWhat: "Comparing adjacent internal elements (6 and 3).",
            explWhy: "The hardware evaluates strict logical juxtaposition. If the left overlaps the right, they invert.",
            activeLines: [5, 6], stack: ["bubble iteration"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_bs_1', '3', 'placed', '20%', '50%'),
                window.createNode('llx_bs_0', '6', 'comparing', '40%', '50%'),
                window.createNode('llx_bs_2', '8', 'comparing', '60%', '50%')
            ],
            edges: [],
            explWhat: "They have correctly swapped. The pointer immediately walks forward evaluating 6 and 8.",
            explWhy: "Since 6 < 8, no swap occurs. 8 absorbs the volatile momentum and continues shifting right.",
            activeLines: [7, 8], stack: ["bubble swap lock"], heap: 1
        },
        {
            nodes: [
                window.createNode('llx_bs_1', '3', 'placed', '20%', '50%'),
                window.createNode('llx_bs_0', '6', 'placed', '40%', '50%'),
                window.createNode('llx_bs_2', '8', 'success', '80%', '50%')
            ],
            edges: [],
            explWhat: "Algorithm hits structural bound limit (n-i-1). Number 8 successfully bubbles to the top.",
            explWhy: "Because of strict math bounds, the largest digit per loop permanently floats to safety, diminishing cyclic runtime requirements safely.",
            activeLines: [9], stack: ["bubble complete"], heap: 1
        }
    ]
};
