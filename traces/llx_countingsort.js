window.PAYLOADS = window.PAYLOADS || {};
window.createNode = window.createNode || ((id, val, state, x, y) => ({ id, val: val.toString(), state, x, y }));

window.PAYLOADS['llx_countingsort'] = {
    problemId: "llx_countingsort",
    approaches: [{
        id: 'llx-counting', title: "Counting Sort", badge: 'O(N+K)', badgeClass: 'badge-o1',
        desc: 'Maps explicit array occurrences to static memory bins removing recursive overhead completely.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>countingSort</span>(arr, maximum_val):" },
            { line: 2, text: "    count = [0] * (maximum_val + 1)" },
            { line: 3, text: "    <span class='syn-kw'>for</span> num <span class='syn-kw'>in</span> arr: count[num] += 1" },
            { line: 4, text: "    idx = 0" },
            { line: 5, text: "    <span class='syn-kw'>for</span> i, tally <span class='syn-kw'>in</span> enumerate(count):" },
            { line: 6, text: "        <span class='syn-kw'>for</span> _ <span class='syn-kw'>in</span> range(tally):" },
            { line: 7, text: "            arr[idx] = i; idx += 1" }
        ]
    }],
    trace: [
        {
            nodes: [
                window.createNode('llx_cs_n1', '1', 'placed', '10%', '20%'),
                window.createNode('llx_cs_n2', '2', 'placed', '25%', '20%'),
                window.createNode('llx_cs_n3', '1', 'comparing', '40%', '20%'),
                window.createNode('llx_cs_b1', 'Bin[1]=1', 'success', '25%', '70%'),
                window.createNode('llx_cs_b2', 'Bin[2]=1', 'success', '45%', '70%')
            ],
            edges: [],
            explWhat: "Array stream encounters value '1'. It immediately maps straight into Bin[1] memory.",
            explWhy: "Instead of comparing sizes algorithmically, it mathematically maps actual value integers against a generated frequency hash table counting collisions.",
            activeLines: [2, 3], stack: ["counting occurrences"], heap: 5
        },
        {
            nodes: [
                window.createNode('llx_cs_n1', '1', 'placed', '10%', '20%'),
                window.createNode('llx_cs_n2', '2', 'placed', '25%', '20%'),
                window.createNode('llx_cs_n3', '1', 'placed', '40%', '20%'),
                window.createNode('llx_cs_b1', 'Bin[1]=2', 'error', '25%', '70%'),
                window.createNode('llx_cs_b2', 'Bin[2]=1', 'placed', '45%', '70%')
            ],
            edges: [],
            explWhat: "The bin successfully increments tally to 2 occurrences.",
            explWhy: "O(1) memory insertion creates blinding speed constraints avoiding recursive stacking.",
            activeLines: [3], stack: ["increment frequency"], heap: 5
        },
        {
            nodes: [
                window.createNode('llx_cs_n1', '1', 'success', '10%', '20%'),
                window.createNode('llx_cs_n2', '1', 'success', '25%', '20%'),
                window.createNode('llx_cs_n3', '2', 'success', '40%', '20%'),
                window.createNode('llx_cs_b1', 'Bin[1]=0', 'placed', '25%', '70%'),
                window.createNode('llx_cs_b2', 'Bin[2]=0', 'placed', '45%', '70%')
            ],
            edges: [],
            explWhat: "Overwriting original buffer completely by unloading bins iteratively.",
            explWhy: "Sequential enumeration guarantees mathematical ascending sorting simply by exhausting tally counters.",
            activeLines: [6, 7], stack: ["flush bins"], heap: 5
        }
    ]
};
