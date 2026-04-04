window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_radixsort'] = {
    problemId: "llx_radixsort",
    approaches: [{
        id: 'llx-radix', title: "Radix Sort", badge: 'O(NK)', badgeClass: 'badge-o1',
        desc: 'Advanced base-grouping algorithm partitioning variables systematically using specific individual digit positions.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>radixSort</span>(arr):" },
            { line: 2, text: "    max_val = max(arr); exp = 1" },
            { line: 3, text: "    <span class='syn-kw'>while</span> max_val // exp > 0:" },
            { line: 4, text: "        countingSortByDigit(arr, exp)" },
            { line: 5, text: "        exp *= 10" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_rs_1', '170', 'placed', '20%', '30%'),
                window.createNode('llx_rs_2', '045', 'comparing', '40%', '30%'),
                window.createNode('llx_rs_3', '075', 'placed', '60%', '30%')
            ],
            edges: [],
            explWhat: "Focusing aggressively on the 1s digit layer column (exp=1). Reading the digit '5' in 045.",
            explWhy: "Radix sort splits immense multi-digit algorithms into discrete processing streams scaling cleanly with constant boundaries.",
            activeLines: [3, 4], stack: ["eval digit index 0"], heap: 3
        },
        {
            nodes: [
                window.createNode('llx_rs_1', '170', 'success', '20%', '60%'),
                window.createNode('llx_rs_2', '045', 'error', '40%', '60%'),
                window.createNode('llx_rs_3', '075', 'error', '60%', '60%')
            ],
            edges: [],
            explWhat: "Reordered list purely upon exact 1s digit boundaries structurally independent of true variable volume.",
            explWhy: "Group 0 lands first (170). Groups 5 safely land second.",
            activeLines: [4], stack: ["sub-counting flush"], heap: 3
        },
        {
            nodes: [
                window.createNode('llx_rs_2', '045', 'success', '20%', '60%'),
                window.createNode('llx_rs_1', '170', 'success', '40%', '60%'),
                window.createNode('llx_rs_3', '075', 'success', '60%', '60%')
            ],
            edges: [],
            explWhat: "Finalizing with 10s columns. Structural array shifts into finalized position.",
            explWhy: "By maintaining stability inside the counting boundaries, chronological sweeps force perfect sorting without cross-element comparators.",
            activeLines: [5], stack: ["exp multiplier"], heap: 3
        }
    ]
};
