window.PAYLOADS = window.PAYLOADS || {};
window.PAYLOADS['bst'] = {
    problemId: "bst-insert",
    approaches: [
        {
            id: 'bst-iter',
            title: 'Iterative BST Insert',
            badge: 'O(log n) Time',
            badgeClass: 'badge-olog',
            desc: 'Traverses the tree iteratively without recursion overhead.',
            code: [
                { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>insert</span>(root, val):" },
                { line: 2, text: "    <span class='syn-kw'>if not</span> root: <span class='syn-kw'>return</span> Node(val)" },
                { line: 3, text: "    curr = root" },
                { line: 4, text: "    <span class='syn-kw'>while True</span>:" },
                { line: 5, text: "        <span class='syn-kw'>if</span> val < curr.val:" },
                { line: 6, text: "            <span class='syn-kw'>if not</span> curr.left:" },
                { line: 7, text: "                curr.left = Node(val); <span class='syn-kw'>break</span>" },
                { line: 8, text: "            curr = curr.left" },
                { line: 9, text: "        <span class='syn-kw'>else</span>:" },
                { line: 10, text: "            <span class='syn-kw'>if not</span> curr.right:" },
                { line: 11, text: "                curr.right = Node(val); <span class='syn-kw'>break</span>" },
                { line: 12, text: "            curr = curr.right" },
                { line: 13, text: "    <span class='syn-kw'>return</span> root" }
            ],
            diffCode: []
        }
    ],
    trace: [
        {
            nodes: [{ id: 50, val: 50, state: 'placed', x: '50%', y: '20%' }],
            edges: [],
            explWhat: "The Binary Search Tree is initialized with a root node containing the value 50.",
            explWhy: "Data structures require a starting anchor in memory. Here, the root node acts as the entry point for all subsequent traversal paths.",
            activeLines: [1, 2], stack: ["main()"], heap: 1
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'placed', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'traveling', x: '50%', y: '5%' }
            ],
            edges: [],
            explWhat: "Incoming node [30] is spawned in memory and begins its traversal.",
            explWhy: "Before a node can be structurally attached to the tree, it must be instantiated as a bare object allocated on the heap.",
            activeLines: [3], stack: ["main()", "insert(30)"], heap: 2
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'comparing', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'traveling', x: '50%', y: '20%' }
            ],
            edges: [],
            explWhat: "Node [30] compares its value against the root node [50].",
            explWhy: "The core invariant of a BST demands leftwards descent for lesser values and rightwards for greater. 30 < 50, triggering a left branch traversal.",
            activeLines: [5], stack: ["main()", "insert(30)"], heap: 2
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'placed', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'placed', x: '30%', y: '45%' }
            ],
            edges: [{ id: 'e-50-30', from: '50%', fromY: '20%', to: '30%', toY: '45%' }],
            explWhat: "Node [30] finds an empty left child pointer at [50]. It is permanently attached, and the structural pointer edge is drawn.",
            explWhy: "Memory linking: the parent's `left` attribute is reassigned to the memory address of our new object, cementing it in the tree topology.",
            activeLines: [6, 7], stack: ["main()", "insert(30)"], heap: 2
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'placed', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'placed', x: '30%', y: '45%' },
                { id: 70, val: 70, state: 'traveling', x: '50%', y: '5%' }
            ],
            edges: [{ id: 'e-50-30', from: '50%', fromY: '20%', to: '30%', toY: '45%' }],
            explWhat: "Incoming node [70] is spawned and begins traversal at the root.",
            explWhy: "All insertions must begin from the absolute root to maintain strict topology rules.",
            activeLines: [3], stack: ["main()", "insert(70)"], heap: 3
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'comparing', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'placed', x: '30%', y: '45%' },
                { id: 70, val: 70, state: 'traveling', x: '50%', y: '20%' }
            ],
            edges: [{ id: 'e-50-30', from: '50%', fromY: '20%', to: '30%', toY: '45%' }],
            explWhat: "Node [70] compares against root [50].",
            explWhy: "Since 70 > 50, it is directed down the right branch.",
            activeLines: [9, 10], stack: ["main()", "insert(70)"], heap: 3
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'placed', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'placed', x: '30%', y: '45%' },
                { id: 70, val: 70, state: 'placed', x: '70%', y: '45%' }
            ],
            edges: [
                { id: 'e-50-30', from: '50%', fromY: '20%', to: '30%', toY: '45%' },
                { id: 'e-50-70', from: '50%', fromY: '20%', to: '70%', toY: '45%' }
            ],
            explWhat: "Node [70] is attached to the right pointer of root [50].",
            explWhy: "Because the right child constraint was null, it safely occupies the space.",
            activeLines: [11], stack: ["main()", "insert(70)"], heap: 3
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'placed', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'placed', x: '30%', y: '45%' },
                { id: 70, val: 70, state: 'placed', x: '70%', y: '45%' },
                { id: 20, val: 20, state: 'traveling', x: '50%', y: '5%' }
            ],
            edges: [
                { id: 'e-50-30', from: '50%', fromY: '20%', to: '30%', toY: '45%' },
                { id: 'e-50-70', from: '50%', fromY: '20%', to: '70%', toY: '45%' }
            ],
            explWhat: "A deep node [20] begins its journey.",
            explWhy: "As tree height grows, multiple comparisons become strictly guaranteed.",
            activeLines: [3], stack: ["main()", "insert(20)"], heap: 4
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'comparing', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'placed', x: '30%', y: '45%' },
                { id: 70, val: 70, state: 'placed', x: '70%', y: '45%' },
                { id: 20, val: 20, state: 'traveling', x: '50%', y: '20%' }
            ],
            edges: [
                { id: 'e-50-30', from: '50%', fromY: '20%', to: '30%', toY: '45%' },
                { id: 'e-50-70', from: '50%', fromY: '20%', to: '70%', toY: '45%' }
            ],
            explWhat: "Node [20] compares with root [50], choosing left.",
            explWhy: "20 < 50. The inner loop progresses to the left child, `curr = curr.left`.",
            activeLines: [5, 8], stack: ["main()", "insert(20)"], heap: 4
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'placed', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'comparing', x: '30%', y: '45%' },
                { id: 70, val: 70, state: 'placed', x: '70%', y: '45%' },
                { id: 20, val: 20, state: 'traveling', x: '30%', y: '45%' }
            ],
            edges: [
                { id: 'e-50-30', from: '50%', fromY: '20%', to: '30%', toY: '45%' },
                { id: 'e-50-70', from: '50%', fromY: '20%', to: '70%', toY: '45%' }
            ],
            explWhat: "Node [20] has slid down the physical edge, comparing with node [30].",
            explWhy: "The physical glide demonstrates constant memory pointer jumps in the linked structure.",
            activeLines: [5, 6], stack: ["main()", "insert(20)"], heap: 4
        },
        {
            nodes: [
                { id: 50, val: 50, state: 'placed', x: '50%', y: '20%' },
                { id: 30, val: 30, state: 'placed', x: '30%', y: '45%' },
                { id: 70, val: 70, state: 'placed', x: '70%', y: '45%' },
                { id: 20, val: 20, state: 'placed', x: '15%', y: '70%' }
            ],
            edges: [
                { id: 'e-50-30', from: '50%', fromY: '20%', to: '30%', toY: '45%' },
                { id: 'e-50-70', from: '50%', fromY: '20%', to: '70%', toY: '45%' },
                { id: 'e-30-20', from: '30%', fromY: '45%', to: '15%', toY: '70%' }
            ],
            explWhat: "Node [20] successfully anchors into the tree topology.",
            explWhy: "Because `curr.left` of 30 was null, the loop breaks. Data architecture stabilizes.",
            activeLines: [7], stack: ["main()"], heap: 4
        }
    ]
};
