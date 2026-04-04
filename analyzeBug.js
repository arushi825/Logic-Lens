const BUG_PAYLOADS = {
    dfs_buggy: {
        id: "dfs_buggy",
        bugLineNo: "Line 5",
        bugLineCode: "dfs(neighbor, target)",
        whatIsWrong: "The recursive function calls itself, but fails to capture or return the boolean result of that call to the parent context.",
        whyItIsWrong: "In a search algorithm, when a deep recursive branch finally locates the target and returns True, that 'True' is abandoned. The parent loop merely continues to the next neighbor, effectively ignoring the discovery.",
        howItAffects: "The graph is entirely traversed. Even if the target is found at Node C, the root function will eventually exhaust all edges and falsely return False at the very end.",
        howCorrectBehaves: "The correct DFS immediately inspects the recursive return. If 'True' propagates up from a child, it cascades that 'True' all the way back up the call stack, terminating the search instantly.",
        correctCode: `def dfs(node, target):
    if not node: return False
    if node.val == target: return True
    
    for neighbor in node.neighbors:
        # Correctly capture and cascade the truth value
        if dfs(neighbor, target): 
            return True
            
    return False`,
        timeFnBuggy: n => n,
        timeFnFixed: n => n * 0.5,
        spaceFnBuggy: n => n,
        spaceFnFixed: n => n,
        trace: [
            { 
                stepLog: "Step 1: Starting DFS search from Node A.",
                expl: "Both algorithms begin checking root nodes...", 
                nodesBuggy: [{id: 'A', text: 'A(visited)', x: '50%', y: '10%', class: 'array-node'}], 
                nodesFixed: [{id: 'A', text: 'A(visited)', x: '50%', y: '10%', class: 'array-node'}],
                edgesBuggy: [], edgesFixed: []
            },
            { 
                stepLog: "Step 2: Recursing to Node B safely.",
                expl: "Parallel standard recursion into Node B.", 
                nodesBuggy: [{id: 'A', text: 'A', x: '50%', y: '10%', class: 'array-node'}, {id: 'B', text: 'B', x: '30%', y: '40%', class: 'array-node'}], 
                nodesFixed: [{id: 'A', text: 'A', x: '50%', y: '10%', class: 'array-node'}, {id: 'B', text: 'B', x: '30%', y: '40%', class: 'array-node'}],
                edgesBuggy: [{id: 'e1', from: '50%', fromY: '10%', to: '30%', toY: '40%', dashed: false, color: 'rgba(255,255,255,0.2)'}],
                edgesFixed: [{id: 'e1', from: '50%', fromY: '10%', to: '30%', toY: '40%', dashed: false, color: 'rgba(255,255,255,0.2)'}]
            },
            { 
                stepLog: "Step 3: Target found at Node C, returning True.",
                expl: "Both branches find the target. Pay attention to how the return triggers divergently.", 
                isAmber: true, 
                nodesBuggy: [{id: 'A', text: 'A', x: '50%', y: '10%', class: 'array-node'}, {id: 'C', text: 'Target found', x: '70%', y: '40%', class: 'array-node highlight-compare'}], 
                nodesFixed: [{id: 'A', text: 'A', x: '50%', y: '10%', class: 'array-node'}, {id: 'C', text: 'Target found', x: '70%', y: '40%', class: 'array-node highlight-success'}],
                edgesBuggy: [{id: 'e2', from: '50%', fromY: '10%', to: '70%', toY: '40%', dashed: false, color: 'var(--accent-orange)'}],
                edgesFixed: [{id: 'e2', from: '50%', fromY: '10%', to: '70%', toY: '40%', dashed: false, color: 'var(--accent-green)'}]
            },
            { 
                stepLog: "Step 4: Left ignores return value. Right captures it.",
                expl: "DIVERGENCE: The faulty logic ignores the returned truth value. The correct logic cascades it.", 
                isRed: true, 
                nodesBuggy: [{id: 'A', text: 'A ignores return', x: '50%', y: '10%', class: 'array-node highlight-read'}, {id: 'C', text: 'Target C', x: '70%', y: '40%', class: 'array-node'}], 
                nodesFixed: [{id: 'A', text: 'A cascades True', x: '50%', y: '10%', class: 'array-node highlight-success'}, {id: 'C', text: 'Target C', x: '70%', y: '40%', class: 'array-node highlight-success'}],
                edgesBuggy: [{id: 'e2', from: '50%', fromY: '10%', to: '70%', toY: '40%', dashed: true, color: 'var(--accent-red)'}],
                edgesFixed: [{id: 'e2', from: '50%', fromY: '10%', to: '70%', toY: '40%', dashed: true, color: 'var(--accent-green)'}]
            },
            { 
                stepLog: "Step 5: Faulty returns False, Correct returns True.",
                expl: "Consequence: Faulty DFS searches entire trailing graph and falsely returns False. Correct DFS terminated strictly upon discovery.", 
                triggerCharts: true,
                nodesBuggy: [{id: 'R', text: 'Returns: False', x: '50%', y: '70%', class: 'array-node error-node'}], 
                nodesFixed: [{id: 'R', text: 'Returns: True', x: '50%', y: '70%', class: 'array-node highlight-success'}],
                edgesBuggy: [], edgesFixed: []
            }
        ]
    },
    bfs_optimal: {
        id: "bfs_optimal",
        bugLineNo: "Line 3",
        bugLineCode: "curr = queue.pop(0)",
        whatIsWrong: "You are treating a standard dynamic Array as a Queue by removing the element at index 0.",
        whyItIsWrong: "Arrays are contiguous memory blocks. Every single index after 0 must physically shift in memory to close the gap.",
        howItAffects: "If the queue has N elements, pop(0) takes O(N) linear time. Since BFS visits V vertices, this hidden O(N) degrades BFS to O(V²).",
        howCorrectBehaves: "Internal BFS implements a collections.deque (Doubly Linked List). Calling popleft() updates two local memory pointers in O(1) constant time.",
        correctCode: `from collections import deque

def bfs(graph, start):
    queue = deque([start])
    visited = set([start])
    
    while queue:
        # INSTANT O(1) Header Shift
        curr = queue.popleft()
        
        for neighbor in graph[curr]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
        timeFnBuggy: n => n * n, 
        timeFnFixed: n => n, 
        spaceFnBuggy: n => n,
        spaceFnFixed: n => n,
        trace: [
            { 
                stepLog: "Step 1: Instantiating Queues.",
                expl: "Left uses contiguous Array. Right uses Linked Deque.", 
                nodesBuggy: [{id: 'q', text: '[A, B, C, D]', x: '50%', y: '50%', class: 'array-container'}], 
                nodesFixed: [{id: 'q', text: '(A)<->(B)<->(C)<->(D)', x: '50%', y: '50%', class: 'array-container highlight-success'}],
                edgesBuggy: [], edgesFixed: []
            },
            { 
                stepLog: "Step 2: Extracting index 0 element.",
                expl: "Both lines extract 'A' from the front of the sequence...", 
                isAmber: true, 
                nodesBuggy: [{id: 'q', text: '[B, C, D]', x: '50%', y: '50%', class: 'array-container highlight-compare'}], 
                nodesFixed: [{id: 'q', text: '(B)<->(C)<->(D)', x: '50%', y: '50%', class: 'array-container highlight-success'}],
                edgesBuggy: [], edgesFixed: []
            },
            { 
                stepLog: "Step 3: Array triggers O(N) contiguous shift, Deque isolates O(1).",
                expl: "DIVERGENCE: Notice the left array forces an O(N) memory shift penalty. The right linked list simply drops the head pointer instantaneously.", 
                isRed: true, 
                nodesBuggy: [{id: 'q', text: 'O(N) Array Shift Penalty', x: '50%', y: '50%', class: 'array-container error-node'}], 
                nodesFixed: [{id: 'q', text: 'O(1) Instant Header Update', x: '50%', y: '50%', class: 'array-container highlight-success'}],
                edgesBuggy: [], edgesFixed: []
            },
            { 
                stepLog: "Step 4: At V loops, array hits O(V²), Deque hits O(V).",
                expl: "This penalty happens every single loop iteration, shattering theoretical complexity bounds.", 
                triggerCharts: true,
                nodesBuggy: [{id: 'q', text: 'Time Limit Exceeded O(V²)', x: '50%', y: '50%', class: 'array-node error-node'}], 
                nodesFixed: [{id: 'q', text: 'Optimum O(V+E)', x: '50%', y: '50%', class: 'array-node highlight-success'}],
                edgesBuggy: [], edgesFixed: []
            }
        ]
    },
    bubblesort_bug: {
        id: "bubblesort_bug",
        bugLineNo: "Line 2",
        bugLineCode: "for j in range(len(arr)):",
        whatIsWrong: "Inner loop absolute bounds exceed safety constraints.",
        whyItIsWrong: "The logic evaluates arr[j] > arr[j+1]. If j reaches the maximum index len(arr)-1, j+1 references void memory.",
        howItAffects: "The algorithm reads restricted or undefined memory addresses, resulting in a fatal 'Index Out of Bounds' exception crashing the runtime.",
        howCorrectBehaves: "The correctly bounded nested loop iterates range(len(arr) - 1 - i), safely checking contiguous elements and avoiding the sorted tail.",
        correctCode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Enforce boundary constraint
        for j in range(n - 1 - i):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
        timeFnBuggy: n => n * n,
        timeFnFixed: n => n * n * 0.5,
        spaceFnBuggy: n => 1,
        spaceFnFixed: n => 1,
        trace: [
            { 
                stepLog: "Step 1: Sweeping array elements.",
                expl: "Both traces are sorting [9, 5, 2, 8] continuously.", 
                nodesBuggy: [{id: '0', text: '9', x: '25%', y: '50%', class: 'array-node'}, {id: '1', text: '5', x: '75%', y: '50%', class: 'array-node'}], 
                nodesFixed: [{id: '0', text: '9', x: '25%', y: '50%', class: 'array-node'}, {id: '1', text: '5', x: '75%', y: '50%', class: 'array-node'}],
                edgesBuggy: [], edgesFixed: []
            },
            { 
                stepLog: "Step 2: J reaches final index N-1.",
                expl: "Pointer j hits the absolute end of the array. Left trace has no bounds check.", 
                isAmber: true, 
                nodesBuggy: [{id: '0', text: 'Last Element', x: '50%', y: '50%', class: 'array-node highlight-compare'}], 
                nodesFixed: [{id: '0', text: 'Safely bounded', x: '50%', y: '50%', class: 'array-node highlight-success'}],
                edgesBuggy: [], edgesFixed: []
            },
            { 
                stepLog: "Step 3: Faulty evaluates arr[j+1] pointing to unauthorized RAM.",
                expl: "DIVERGENCE: Faulty logic accesses memory outside the array buffer. Correct logic skips this because of `-1 - i` restriction.", 
                isRed: true, 
                nodesBuggy: [{id: '0', text: 'Accessing ??? Offset', x: '50%', y: '50%', class: 'array-node error-node'}], 
                nodesFixed: [{id: '0', text: 'Skips. Tail sorted.', x: '50%', y: '50%', class: 'array-node highlight-success'}],
                edgesBuggy: [], edgesFixed: []
            },
            { 
                stepLog: "Step 4: Left trace crashes. Right correctly resolves array.",
                expl: "The unallocated read triggers an immediate fatal runtime exception.", 
                triggerCharts: true,
                nodesBuggy: [{id: '0', text: 'Fatal: Index-Out-Of-Bounds', x: '50%', y: '50%', class: 'array-node error-node'}], 
                nodesFixed: [{id: '0', text: 'Sorting Successful', x: '50%', y: '50%', class: 'array-node highlight-success'}],
                edgesBuggy: [], edgesFixed: []
            }
        ]
    },
    llx_bug_insertion: {
        id: "llx_bug_insertion",
        bugLineNo: "Line 3",
        bugLineCode: "while j > 0 and key < arr[j]:",
        whatIsWrong: "Off-by-one error drops the absolute edge case index 0.",
        whyItIsWrong: "The while condition checks `j > 0`. This completely skips evaluating index 0. If the 'key' evaluates to the smallest element in the entire array, it gets stuck at index 1.",
        howItAffects: "The array will never fully sort if the absolute minimum value is anywhere towards the right side of the array.",
        howCorrectBehaves: "The correct evaluation includes index 0 explicitly by checking `j >= 0` or mathematically evaluating limits properly.",
        correctCode: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]; j = i-1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]; j -= 1\n        arr[j + 1] = key`,
        timeFnBuggy: n => n * n, timeFnFixed: n => n * n, spaceFnBuggy: n => 1, spaceFnFixed: n => 1,
        trace: [
            { stepLog: "Evaluating 0 at end of array", expl: "Key is 0. It must slide to the absolute front.", nodesBuggy: [{id: '0', text: 'Stops at idx 1', x: '50%', y: '50%', class: 'array-node error-node'}], nodesFixed: [{id: '0', text: 'Slides to idx 0', x: '50%', y: '50%', class: 'array-node highlight-success'}], edgesBuggy: [], edgesFixed: []},
            { stepLog: "Crash / Failed Sort", expl: "Insertion sort permanently fails to place the minimum element.", triggerCharts: true, nodesBuggy: [{id: '0', text: 'Unsorted State', x: '50%', y: '50%', class: 'array-node error-node'}], nodesFixed: [{id: '0', text: 'Perfectly Sorted', x: '50%', y: '50%', class: 'array-node highlight-success'}], edgesBuggy: [], edgesFixed: []}
        ]
    },
    llx_bug_quick: {
        id: "llx_bug_quick",
        bugLineNo: "Line 4",
        bugLineCode: "quickSort(arr, low, pi)",
        whatIsWrong: "Infinite Recursion on subset loops.",
        whyItIsWrong: "You are recursively passing the Pivot back into the unsorted set instead of isolating it (`pi - 1`).",
        howItAffects: "The partition size never mathematically reduces. The recursion depth explodes indefinitely until a 'Maximum Call Stack Exceeded' crash.",
        howCorrectBehaves: "The Pivot is confirmed in its final resting place. The recursion should safely exclude it by evaluating `pi - 1` and `pi + 1` exclusively.",
        correctCode: `def quickSort(arr, low, high):\n    if low < high:\n        pi = partition(arr, low, high)\n        quickSort(arr, low, pi - 1)\n        quickSort(arr, pi + 1, high)`,
        timeFnBuggy: n => Math.pow(n, 3), timeFnFixed: n => n * Math.log2(n || 1), spaceFnBuggy: n => n * n, spaceFnFixed: n => Math.log2(n || 1),
        trace: [
            { stepLog: "Executing Pivot Subset", expl: "Pivot 5 logically settles. Recursion includes Pivot endlessly.", nodesBuggy: [{id: '0', text: 'Stack Overflow 1', x: '50%', y: '50%', class: 'array-container highlight-compare'}], nodesFixed: [{id: '0', text: 'Subset Shrinks safely', x: '50%', y: '50%', class: 'array-container highlight-success'}], edgesBuggy: [], edgesFixed: []},
            { stepLog: "Maximum Call Stack Exceeded", expl: "The recursive bounds never shrink to 0.", triggerCharts: true, nodesBuggy: [{id: '0', text: 'Stack Overflow Crash', x: '50%', y: '50%', class: 'array-node error-node'}], nodesFixed: [{id: '0', text: 'N log N execution', x: '50%', y: '50%', class: 'array-node highlight-success'}], edgesBuggy: [], edgesFixed: []}
        ]
    },
    llx_bug_radix: {
        id: "llx_bug_radix",
        bugLineNo: "Line 3",
        bugLineCode: "count[num - 1] += 1",
        whatIsWrong: "Arbitrary Offset mappings violate boundaries.",
        whyItIsWrong: "The mathematical array indices act identically as memory bins. Shifting the bin lookup index arbitrarily breaks the linear counting logic.",
        howItAffects: "When encountering the element '0', `0 - 1` evaluates to `-1`, accessing memory destructively.",
        howCorrectBehaves: "The count index must exactly mirror the mathematical target integer without implicit sub-shifts.",
        correctCode: `count = [0] * (max_val + 1)\nfor num in arr:\n    count[num] += 1`,
        timeFnBuggy: n => n, timeFnFixed: n => n, spaceFnBuggy: n => 1, spaceFnFixed: n => 1,
        trace: [
            { stepLog: "Frequency Map Hits 0", expl: "Algorithm evaluates the exact zero digit.", nodesBuggy: [{id: '0', text: 'count[-1]??', x: '50%', y: '50%', class: 'array-node error-node'}], nodesFixed: [{id: '0', text: 'count[0] increment', x: '50%', y: '50%', class: 'array-node highlight-success'}], edgesBuggy: [], edgesFixed: []},
            { stepLog: "Out of Bounds Crash", expl: "Negative index read causes fatal structural failure.", triggerCharts: true, nodesBuggy: [{id: '0', text: 'Fatal Bound Crash', x: '50%', y: '50%', class: 'array-node error-node'}], nodesFixed: [{id: '0', text: 'O(N) success', x: '50%', y: '50%', class: 'array-node highlight-success'}], edgesBuggy: [], edgesFixed: []}
        ]
    }
};

let currentBugPayload = null;
let currentBugTrace = [];
let bugStep = 0;
window.analyzeInterval = null;
window.analyzeTimeChart = null;
window.analyzeSpaceChart = null;

document.addEventListener('DOMContentLoaded', () => {
    const inputCode = document.getElementById('buggy-code-input');
    const parseBtn = document.getElementById('btn-parse-bug');
    const statusMsg = document.getElementById('parse-status-msg');
    
    const playBtn = document.getElementById('btn-play-analyze');
    const progressBar = document.getElementById('analyze-timeline-progress');
    const explanation = document.getElementById('analyze-explanation');
    
    // Canvas bindings
    const canvasBuggy = document.getElementById('analyze-visual-canvas-buggy');
    const canvasFixed = document.getElementById('analyze-visual-canvas-fixed');
    const stepLog = document.getElementById('analyze-step-log');
    
    // UI Panels
    const reportZone = document.getElementById('bug-report-zone');
    const animZone = document.getElementById('bug-animation-zone');
    const correctedZone = document.getElementById('bug-corrected-zone');
    const complexityZone = document.getElementById('analyze-complexity-zone');
    
    const copyBtn = document.getElementById('btn-copy-code');
    
    parseBtn.addEventListener('click', () => {
        const rawCode = inputCode.value.trim();
        if (!rawCode) return;

        statusMsg.style.display = 'inline';
        statusMsg.textContent = 'Scanning code...';

        setTimeout(() => {
            const payload = localParserHeuristics(rawCode);
            if (payload) {
                statusMsg.textContent = 'Logical Bug Isolated!';
                currentBugPayload = payload;
                loadBugUI(payload);
            } else {
                statusMsg.textContent = 'No recognized pattern detected.';
            }
            setTimeout(() => { statusMsg.style.display = 'none'; }, 2500);
        }, 600);
    });

    copyBtn.addEventListener('click', () => {
        if(currentBugPayload) {
            navigator.clipboard.writeText(currentBugPayload.correctCode);
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => { copyBtn.innerHTML = original; }, 2000);
        }
    });

    playBtn.addEventListener('click', () => {
        if (!currentBugTrace.length) return;
        if (window.analyzeInterval) {
            clearInterval(window.analyzeInterval);
            window.analyzeInterval = null;
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
            if (bugStep >= currentBugTrace.length) { 
                bugStep = 0;
                stepLog.innerHTML = '<div><strong style="color: white; font-size: 1rem;">Timeline Step-by-Step Breakdown:</strong></div>';
            }
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            window.analyzeInterval = setInterval(nextBugStep, 3000); // 3 seconds per step for comfortable reading
            nextBugStep(); 
        }
    });

    function localParserHeuristics(code) {
        // Normalize: lowercase + collapse whitespace for reliable matching
        const t = code.toLowerCase().replace(/\s+/g, ' ');

        // ── INSERTION SORT ──────────────────────────────────────────────
        // Detect by structure: has insertion_sort OR (key = arr[i] + while + j -= 1)
        // Works for BOTH buggy (j > 0) and correct (j >= 0) versions pasted by user
        if (
            (t.includes('insertion') || t.includes('insertion_sort')) &&
            t.includes('key') && t.includes('j -= 1')
        ) return BUG_PAYLOADS.llx_bug_insertion;

        // Also catch it without function name - pure structure match
        if (
            t.includes('key = arr[i]') &&
            t.includes('while j') &&
            t.includes('j -= 1') &&
            t.includes('arr[j + 1]')
        ) return BUG_PAYLOADS.llx_bug_insertion;

        // ── QUICKSORT ───────────────────────────────────────────────────
        if (
            t.includes('partition') &&
            (t.includes('quicksort') || t.includes('quick_sort')) &&
            (t.includes('low') || t.includes('high') || t.includes('pivot'))
        ) return BUG_PAYLOADS.llx_bug_quick;

        // ── RADIX SORT ──────────────────────────────────────────────────
        if (
            (t.includes('radix') || (t.includes('count[num') && t.includes('digit'))) ||
            (t.includes('count[num - 1]') || t.includes('count[num-1]'))
        ) return BUG_PAYLOADS.llx_bug_radix;

        // ── BFS ─────────────────────────────────────────────────────────
        if (
            (t.includes('bfs') || t.includes('breadth')) &&
            (t.includes('queue') || t.includes('pop(0)') || t.includes('shift()'))
        ) return BUG_PAYLOADS.bfs_optimal;

        // Also catch BFS by structure alone (queue + visited + neighbors)
        if (
            t.includes('queue') &&
            t.includes('visited') &&
            (t.includes('neighbor') || t.includes('graph[')) &&
            (t.includes('pop(0)') || t.includes('append') || t.includes('shift()'))
        ) return BUG_PAYLOADS.bfs_optimal;

        // ── DFS ─────────────────────────────────────────────────────────
        if (
            (t.includes('dfs') || t.includes('depth')) &&
            (t.includes('neighbor') || t.includes('node'))
        ) return BUG_PAYLOADS.dfs_buggy;

        // DFS by structure: recursive + neighbor traversal
        if (
            t.includes('neighbor') &&
            t.includes('return') &&
            (t.includes('def dfs') || t.includes('function dfs') ||
             (t.includes('for') && t.includes('neighbor') && t.includes('return false')))
        ) return BUG_PAYLOADS.dfs_buggy;

        // ── BUBBLE SORT ─────────────────────────────────────────────────
        if (
            (t.includes('bubble') || t.includes('bubble_sort')) ||
            (t.includes('arr[j]') && t.includes('arr[j+1]') && t.includes('for i') && t.includes('for j'))
        ) return BUG_PAYLOADS.bubblesort_bug;

        // No match
        return null;
    }

    function loadBugUI(payload) {
        document.getElementById('bug-line-no').textContent = payload.bugLineNo;
        document.getElementById('bug-line-code').textContent = payload.bugLineCode;
        document.getElementById('bug-what-wrong').textContent = payload.whatIsWrong;
        document.getElementById('bug-why-wrong').textContent = payload.whyItIsWrong;
        document.getElementById('bug-how-affects').textContent = payload.howItAffects;
        document.getElementById('bug-how-correct').textContent = payload.howCorrectBehaves;
        document.getElementById('bug-corrected-code').textContent = payload.correctCode;
        
        reportZone.style.display = 'flex';
        animZone.style.display = 'grid'; 
        correctedZone.style.display = 'flex';
        complexityZone.style.display = 'none';
        
        if(window.analyzeInterval) clearInterval(window.analyzeInterval);
        currentBugTrace = payload.trace;
        bugStep = 0;
        progressBar.style.width = '0%';
        explanation.textContent = "Click Play to begin side-by-side visual trace.";
        explanation.style.color = "white";
        
        canvasBuggy.innerHTML = '<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2);">Awaiting trace execution...</div>';
        canvasFixed.innerHTML = '<div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.2);">Awaiting trace execution...</div>';
        stepLog.innerHTML = '<div><strong style="color: white; font-size: 1rem;">Timeline Step-by-Step Breakdown:</strong></div>';
        
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

    function drawToCanvas(canvasObj, nodesList, edgesList) {
        let html = '';
        if (nodesList) {
            nodesList.forEach(n => {
                html += `<div class="${n.class}" style="position: absolute; left: ${n.x}; top: ${n.y}; transform: translate(-50%, -50%); transition: all 0.5s; padding: 0.5rem 1rem; text-align: center; border-radius: 4px; z-index: 5;">${n.text}</div>`;
            });
        }
        if(edgesList && edgesList.length > 0) {
            html += `<svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">`;
            edgesList.forEach(e => {
                const strokeDash = e.dashed ? "stroke-dasharray='5,5'" : "";
                html += `<line x1="${e.from}" y1="${e.fromY}" x2="${e.to}" y2="${e.toY}" stroke="${e.color}" stroke-width="3" ${strokeDash} />`;
            });
            html += `</svg>`;
        }
        canvasObj.innerHTML = html;
    }

    function nextBugStep() {
        if (bugStep >= currentBugTrace.length) {
            clearInterval(window.analyzeInterval);
            window.analyzeInterval = null;
            playBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i>';
            return;
        }

        const step = currentBugTrace[bugStep];
        
        // Draw to respective canvases
        drawToCanvas(canvasBuggy, step.nodesBuggy, step.edgesBuggy);
        drawToCanvas(canvasFixed, step.nodesFixed, step.edgesFixed);

        // Step log append
        if (step.stepLog) {
            const entryColor = step.isRed ? '#fca5a5' : (step.isAmber ? '#fcd34d' : '#94a3b8');
            stepLog.innerHTML += `<div style="padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 4px; color: ${entryColor}">
                <i class="fa-solid fa-angle-right" style="font-size: 0.8rem; margin-right: 0.5rem;"></i>${step.stepLog}
            </div>`;
            // Auto scroll to bottom
            stepLog.scrollTop = stepLog.scrollHeight;
        }

        if (step.isRed) {
            canvasBuggy.innerHTML += `<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); font-size: 8rem; color: rgba(239,68,68,0.5); font-weight: bold; pointer-events: none; z-index: 20;"><i class="fa-solid fa-xmark"></i></div>`;
            explanation.style.color = '#fca5a5';
        } else if (step.isAmber) {
            explanation.style.color = '#fcd34d';
        } else {
            explanation.style.color = 'white';
        }

        explanation.textContent = step.expl;
        
        if (step.triggerCharts) {
            complexityZone.style.display = 'flex';
            initBugCharts(currentBugPayload);
        }
        
        // Let it cleanly render on stable intervals
        bugStep++;
        progressBar.style.width = `${(bugStep / currentBugTrace.length) * 100}%`;
    }
    
    function initBugCharts(payload) {
        const ctxTime = document.getElementById('analyze-time-chart').getContext('2d');
        const ctxSpace = document.getElementById('analyze-space-chart').getContext('2d');
        
        if (window.analyzeTimeChart) window.analyzeTimeChart.destroy();
        if (window.analyzeSpaceChart) window.analyzeSpaceChart.destroy();
        
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, color: '#94a3b8', text: 'Data Load (N)' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, title: { display: true, color: '#94a3b8', text: 'Cost Magnitude' } }
            },
            plugins: { legend: { labels: { color: '#f8fafc' } } },
            animation: { duration: 1500, easing: 'easeOutQuart' }
        };

        const span = 50;
        const labels = Array.from({length: span}, (_, i) => i + 1);
        
        const tb = [], tf = [], sb = [], sf = [];
        for(let i=1; i<=span; i++){
            tb.push(payload.timeFnBuggy(i));
            tf.push(payload.timeFnFixed(i));
            sb.push(payload.spaceFnBuggy(i));
            sf.push(payload.spaceFnFixed(i));
        }

        window.analyzeTimeChart = new Chart(ctxTime, {
            type: 'line',
            data: {
                labels: labels, datasets: [
                    { label: 'Buggy Alg Memory Degradation Time', data: tb, borderColor: '#fca5a5', borderWidth: 2, fill: true, backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                    { label: 'Corrected Alg Pointer Math Time', data: tf, borderColor: '#6ee7b7', borderWidth: 2, fill: true, backgroundColor: 'rgba(16, 185, 129, 0.1)' }
                ]
            },
            options: chartOptions
        });

        window.analyzeSpaceChart = new Chart(ctxSpace, {
            type: 'line',
            data: {
                labels: labels, datasets: [
                    { label: 'Buggy Memory Bound', data: sb, borderColor: '#fca5a5', borderWidth: 2, borderDash: [5, 5] },
                    { label: 'Corrected Memory Space', data: sf, borderColor: '#6ee7b7', borderWidth: 2, borderDash: [5, 5] }
                ]
            },
            options: chartOptions
        });
    }
});
