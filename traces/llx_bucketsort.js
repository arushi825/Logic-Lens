window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_bucketsort'] = {
    problemId: "llx_bucketsort",
    approaches: [{
        id: 'llx-bucket', title: "Bucket Sort", badge: 'O(N+k)', badgeClass: 'badge-olog',
        desc: 'Distributes elements mathematically strictly across partitioned sub-buckets depending on precise internal intervals.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>bucketSort</span>(arr):" },
            { line: 2, text: "    buckets = [[] <span class='syn-kw'>for</span> _ <span class='syn-kw'>in</span> range(len(arr))]" },
            { line: 3, text: "    <span class='syn-kw'>for</span> idx, num <span class='syn-kw'>in</span> enumerate(arr):" },
            { line: 4, text: "        bucket_idx = int(10 * num) <span class='syn-kw'># Normalization</span>" },
            { line: 5, text: "        buckets[bucket_idx].append(num)" },
            { line: 6, text: "    <span class='syn-kw'>for</span> bucket <span class='syn-kw'>in</span> buckets: bucket.sort()" },
            { line: 7, text: "    arr.clear(); [...arr.extend(b) <span class='syn-kw'>for</span> b <span class='syn-kw'>in</span> buckets]" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_bk_1', '0.78', 'comparing', '30%', '20%'),
                window.createNode('llx_bk_b7', 'Bucket[7]', 'placed', '30%', '60%')
            ],
            edges: [{ id: 'e-bk1', from: '30%', fromY: '20%', to: '30%', toY: '60%' }],
            explWhat: "0.78 is pushed logically into spatial coordinate Bucket 7.",
            explWhy: "Buckets scatter density arrays uniformly effectively splitting giant complexities into tiny micro-sorts.",
            activeLines: [3, 4], stack: ["distribute()"], heap: 3
        },
        {
            nodes: [
                window.createNode('llx_bk_1', '0.78', 'placed', '30%', '60%'),
                window.createNode('llx_bk_2', '0.72', 'comparing', '50%', '20%'),
                window.createNode('llx_bk_b7', 'Bucket[7]', 'placed', '30%', '60%')
            ],
            edges: [{ id: 'e-bk2', from: '50%', fromY: '20%', to: '30%', toY: '60%' }],
            explWhat: "0.72 targets the precise same bucket address creating an internal collision.",
            explWhy: "These local elements are gathered side by side cleanly bypassing standard monolithic N bounds.",
            activeLines: [4, 5], stack: ["distribute()"], heap: 3
        },
        {
            nodes: [
                window.createNode('llx_bk_b7', 'Bucket[7] Sorted', 'success', '40%', '50%')
            ],
            edges: [],
            explWhat: "Bucket internally invokes recursive native micro-sort causing internal stabilization.",
            explWhy: "Flattening the stabilized multi-dimensional list reconstructs the finished output sequentially.",
            activeLines: [6, 7], stack: ["array flattening"], heap: 1
        }
    ]
};
