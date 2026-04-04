window.PAYLOADS = window.PAYLOADS || {};
window.PAYLOADS['quicksort'] = {
    problemId: "quicksort-part",
    approaches: [{
        id: 'qs-lomuto',
        title: "QuickSort Partitions",
        badge: 'O(n log n)',
        badgeClass: 'badge-olog',
        desc: 'Recursive divide and conquer using a pivot element.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>quicksort</span>(arr, low, high):" },
            { line: 2, text: "    <span class='syn-kw'>if</span> low &lt; high:" },
            { line: 3, text: "        pi = partition(arr, low, high)" },
            { line: 4, text: "        quicksort(arr, low, pi - 1)" },
            { line: 5, text: "        quicksort(arr, pi + 1, high)" }
        ]
    }],
    trace: [
        {
            nodes: [
                { id: 'p', val: 'Pivot(7)', state: 'placed', x: '80%', y: '50%' },
                { id: 'a', val: '3', state: 'placed', x: '20%', y: '50%' },
                { id: 'b', val: '8', state: 'traveling', x: '50%', y: '10%' }
            ],
            edges: [],
            explWhat: "Selecting the right-most element as the pivot(7). Node 3 is already partitioned.",
            explWhy: "Partitioning groups elements smaller than the pivot to its left, and larger to its right.",
            activeLines: [3], stack: ["main()", "quicksort()"], heap: 1
        },
        {
            nodes: [
                { id: 'p', val: 'Pivot(7)', state: 'comparing', x: '80%', y: '50%' },
                { id: 'a', val: '3', state: 'placed', x: '20%', y: '50%' },
                { id: 'b', val: '8', state: 'comparing', x: '60%', y: '50%' }
            ],
            edges: [],
            explWhat: "Comparing the next element [8] against the Pivot [7].",
            explWhy: "If the element is larger than the pivot, it will bypass the swap logic and remain on the right side of the partition barrier.",
            activeLines: [3], stack: ["main()", "quicksort()", "partition()"], heap: 1
        },
        {
            nodes: [
                { id: 'p', val: 'Pivot(7)', state: 'placed', x: '80%', y: '50%' },
                { id: 'a', val: '3', state: 'placed', x: '20%', y: '50%' },
                { id: 'b', val: '8', state: 'placed', x: '95%', y: '50%' }
            ],
            edges: [],
            explWhat: "Node [8] is moved to the space right of the pivot.",
            explWhy: "8 is greater than 7, so the 'i' pointer does not increment. The pivot acts as an absolute physical boundary.",
            activeLines: [3], stack: ["main()", "quicksort()"], heap: 1
        }
    ]
};
