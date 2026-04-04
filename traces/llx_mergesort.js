window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_mergesort'] = {
    problemId: "llx_mergesort",
    approaches: [{
        id: 'llx-merge', title: "Merge Sort", badge: 'O(n log n)', badgeClass: 'badge-olog',
        desc: 'Divide and conquer algorithm that splits arrays down to 1 element, then merges them in sorted order.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>mergeSort</span>(arr):" },
            { line: 2, text: "    <span class='syn-kw'>if</span> len(arr) > 1:" },
            { line: 3, text: "        mid = len(arr)//2" },
            { line: 4, text: "        L = arr[:mid]; R = arr[mid:]" },
            { line: 5, text: "        mergeSort(L)" },
            { line: 6, text: "        mergeSort(R)" },
            { line: 7, text: "        merge(arr, L, R) <span class='syn-kw'># O(N) merge</span>" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_merge_0', '8', 'placed', '40%', '20%'),
                window.createNode('llx_merge_1', '3', 'placed', '60%', '20%')
            ],
            edges: [],
            explWhat: "The array [8, 3] is initially split into two separate subarrays.",
            explWhy: "Merge sort recursively divides the data in half (log n splits) until every element is entirely isolated and trivially 'sorted'.",
            activeLines: [3, 4], stack: ["mergeSort([8,3])"], heap: 2
        },
        {
            nodes: [
                window.createNode('llx_merge_0', '8', 'comparing', '30%', '50%'),
                window.createNode('llx_merge_1', '3', 'comparing', '70%', '50%')
            ],
            edges: [],
            explWhat: "The single elements [8] and [3] are structurally isolated. The merge process begins comparing them.",
            explWhy: "Because isolated elements are already sorted, we can build a larger sorted array by walking two pointers strictly left-to-right.",
            activeLines: [5, 6], stack: ["merge([8], [3])"], heap: 4
        },
        {
            nodes: [
                window.createNode('llx_merge_1', '3', 'success', '40%', '80%'),
                window.createNode('llx_merge_0', '8', 'comparing', '30%', '50%')
            ],
            edges: [],
            explWhat: "3 is smaller than 8. It gets pushed into the final continuous array sequence first.",
            explWhy: "The algorithm guarantees stability and O(n) merging because it only looks at the absolute minimums currently available.",
            activeLines: [7], stack: ["merge([8], [3])"], heap: 3
        },
        {
            nodes: [
                window.createNode('llx_merge_1', '3', 'success', '40%', '80%'),
                window.createNode('llx_merge_0', '8', 'success', '60%', '80%')
            ],
            edges: [],
            explWhat: "The final element 8 is sequentially flushed into the array.",
            explWhy: "This completes the array branch. The total height of these O(N) merges is strictly limited to Log(N), confirming the O(N Log N) barrier.",
            activeLines: [7], stack: ["mergeSort returns"], heap: 2
        }
    ]
};
