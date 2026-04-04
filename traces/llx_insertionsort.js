window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_insertionsort'] = {
    problemId: "llx_insertionsort",
    approaches: [{
        id: 'llx-insert', title: "Insertion Sort", badge: 'O(n²)', badgeClass: 'badge-on2',
        desc: 'Maintains a heavily sorted prefix subset by sliding backwards dynamically.',
        code: [
            { line: 1, text: "<span class='syn-kw'>for</span> i <span class='syn-kw'>in</span> range(1, len(arr)):" },
            { line: 2, text: "    key = arr[i]; j = i-1" },
            { line: 3, text: "    <span class='syn-kw'>while</span> j >= 0 <span class='syn-kw'>and</span> key &lt; arr[j]:" },
            { line: 4, text: "        arr[j + 1] = arr[j]" },
            { line: 5, text: "        j -= 1" },
            { line: 6, text: "    arr[j + 1] = key" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_is_0', '4', 'success', '20%', '50%'),
                window.createNode('llx_is_1', '8', 'success', '40%', '50%'),
                window.createNode('llx_is_2', '3', 'traveling', '60%', '20%')
            ],
            edges: [],
            explWhat: "The prefix [4, 8] is already sorted. The element 3 (key) gets lifted into volatile memory evaluating its destination.",
            explWhy: "Insertion assumes everything to its left is mathematically solid. It sequentially extracts a node trying to sink it backwards into safety.",
            activeLines: [1, 2], stack: ["pull key"], heap: 2
        },
        {
            nodes: [
                window.createNode('llx_is_0', '4', 'success', '20%', '50%'),
                window.createNode('llx_is_1', '8', 'error', '40%', '50%'),
                window.createNode('llx_is_2', '3', 'traveling', '60%', '20%')
            ],
            edges: [],
            explWhat: "Node 8 is mathematically larger than key 3. It mechanically shifts right by one full physical segment.",
            explWhy: "To avoid data overwriting, elements shift up sequentially in memory to construct an empty pointer slot for the extracted key.",
            activeLines: [3, 4], stack: ["shift array bound"], heap: 2
        },
        {
            nodes: [
                window.createNode('llx_is_0', '4', 'error', '20%', '50%'),
                window.createNode('llx_is_1', '8', 'placed', '60%', '50%'),
                window.createNode('llx_is_2', '3', 'traveling', '40%', '20%')
            ],
            edges: [],
            explWhat: "Node 4 evaluates larger than 3 and similarly shifts to the right.",
            explWhy: "This continuous memory cascading takes O(N) operations in the worst case per extraction, causing sluggish array mutations.",
            activeLines: [3, 4, 5], stack: ["shift array bound"], heap: 2
        },
        {
            nodes: [
                window.createNode('llx_is_2', '3', 'success', '20%', '50%'),
                window.createNode('llx_is_0', '4', 'success', '40%', '50%'),
                window.createNode('llx_is_1', '8', 'success', '60%', '50%')
            ],
            edges: [],
            explWhat: "The while loop drops. The volatile key 3 injects directly into the freed slot 0.",
            explWhy: "Prefix is rebuilt and perfectly sorted. Loop advances structurally forward.",
            activeLines: [6], stack: ["inject memory key"], heap: 1
        }
    ]
};
