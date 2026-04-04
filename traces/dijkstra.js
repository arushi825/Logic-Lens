window.PAYLOADS = window.PAYLOADS || {};
window.PAYLOADS['dijkstra'] = {
    problemId: "dijkstra-path",
    approaches: [{
        id: 'dijkstra-wave',
        title: "Dijkstra's Pathfinding",
        badge: 'O(V²)',
        badgeClass: 'badge-olog',
        desc: 'Computes the shortest path from source to all vertices.',
        code: [
            { line: 1, text: "<span class='syn-kw'>def</span> <span class='syn-fn'>dijkstra</span>(graph, start):" },
            { line: 2, text: "    dist = {v: float('inf') <span class='syn-kw'>for</span> v <span class='syn-kw'>in</span> graph}" },
            { line: 3, text: "    dist[start] = 0" },
            { line: 4, text: "    visited = set()" },
            { line: 5, text: "    <span class='syn-kw'>while</span> len(visited) &lt; len(graph):" },
            { line: 6, text: "        u = min((v <span class='syn-kw'>for</span> v <span class='syn-kw'>in</span> dist <span class='syn-kw'>if</span> v <span class='syn-kw'>not in</span> visited), key=dist.get)" },
            { line: 7, text: "        visited.add(u)" },
            { line: 8, text: "        <span class='syn-kw'>for</span> v, weight <span class='syn-kw'>in</span> graph[u].items():" },
            { line: 9, text: "            <span class='syn-kw'>if</span> dist[u] + weight &lt; dist[v]:" },
            { line: 10, text: "                dist[v] = dist[u] + weight" },
            { line: 11, text: "    <span class='syn-kw'>return</span> dist" }
        ]
    }],
    trace: [
        {
            nodes: [
                { id: 'A', val: 'A(0)', state: 'placed', x: '20%', y: '50%' },
                { id: 'B', val: 'B(∞)', state: 'traveling', x: '50%', y: '20%' },
                { id: 'C', val: 'C(∞)', state: 'traveling', x: '50%', y: '80%' }
            ],
            edges: [
                { id: 'e-A-B', from: '20%', fromY: '50%', to: '50%', toY: '20%' },
                { id: 'e-A-C', from: '20%', fromY: '50%', to: '50%', toY: '80%' }
            ],
            explWhat: "The source node A is initialized with a distance of 0. All others are set to infinity.",
            explWhy: "Dijkstra relies on greedy relaxation, meaning we assume worst-case bounds initially.",
            activeLines: [2, 3], stack: ["main()", "dijkstra(A)"], heap: 3
        },
        {
            nodes: [
                { id: 'A', val: 'A(0)', state: 'placed', x: '20%', y: '50%' },
                { id: 'B', val: 'B(5)', state: 'comparing', x: '50%', y: '20%' },
                { id: 'C', val: 'C(10)', state: 'comparing', x: '50%', y: '80%' }
            ],
            edges: [
                { id: 'e-A-B', from: '20%', fromY: '50%', to: '50%', toY: '20%' },
                { id: 'e-A-C', from: '20%', fromY: '50%', to: '50%', toY: '80%' }
            ],
            explWhat: "Evaluating adjacent nodes B and C. The distances are tentatively updated to 5 and 10.",
            explWhy: "The edge weight represents the dynamic cost. We temporarily sum the current node's cost plus the edge cost.",
            activeLines: [8, 9, 10], stack: ["main()", "dijkstra(A)"], heap: 3
        },
        {
            nodes: [
                { id: 'A', val: 'A(0)', state: 'placed', x: '20%', y: '50%' },
                { id: 'B', val: 'B(5)', state: 'placed', x: '50%', y: '20%' },
                { id: 'C', val: 'C(10)', state: 'placed', x: '50%', y: '80%' }
            ],
            edges: [
                { id: 'e-A-B', from: '20%', fromY: '50%', to: '50%', toY: '20%' },
                { id: 'e-A-C', from: '20%', fromY: '50%', to: '50%', toY: '80%' }
            ],
            explWhat: "The wavefront locks in node B as the next shortest path.",
            explWhy: "Since B has the minimum tentative distance (5) among unvisited nodes, it is permanently added to the visited set.",
            activeLines: [6, 7], stack: ["main()", "dijkstra(A)"], heap: 3
        }
    ]
};
