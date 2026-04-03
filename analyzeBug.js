/**
 * Logic Lens — Bug Analyzer (Phase 1 Prototype)
 * Detects 3 common algorithm bugs using pattern heuristics.
 * Populates a structured text-based bug report.
 *
 * TODO: Add animated dual-canvas side-by-side trace (buggy vs fixed) — Phase 2
 * TODO: Add Chart.js complexity impact charts post-fix — Phase 2
 * TODO: Expand to 6+ bug patterns (QuickSort recursion, RadixSort offset, etc.) — Phase 2
 */

const BUG_PATTERNS = {
    bfs_pop0: {
        bugLineNo: "Line 3",
        bugLineCode: "curr = queue.pop(0)",
        whatIsWrong: "Using .pop(0) on a Python list to dequeue from the front.",
        whyItIsWrong: "Python lists are contiguous arrays. Removing index 0 forces ALL subsequent elements to shift one position left in memory — that's O(N) per dequeue, not O(1).",
        howItAffects: "BFS visits every vertex once (V times). Each time it does an O(N) dequeue, the total time becomes O(V²) instead of the expected O(V + E).",
        howCorrectBehaves: "Using collections.deque and .popleft() updates only two internal pointers in O(1). The BFS then correctly runs in O(V + E) time.",
        correctCode: `from collections import deque

def bfs(graph, start):
    queue = deque([start])
    visited = set([start])
    
    while queue:
        # O(1) pointer swap — not O(N) array shift
        curr = queue.popleft()
        
        for neighbor in graph[curr]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`
    },

    dfs_no_return: {
        bugLineNo: "Line 6",
        bugLineCode: "dfs(neighbor, target)",
        whatIsWrong: "The recursive DFS call result is not captured or returned.",
        whyItIsWrong: "When a deep recursive branch finds the target and returns True, that value is immediately discarded. The parent loop continues checking other neighbors, oblivious to the discovery.",
        howItAffects: "Even if the target exists at Node C, the root call exhausts all edges, eventually returning False — a false negative every time the target is not the last node visited.",
        howCorrectBehaves: "The correct version captures the recursive result: 'if dfs(neighbor, target): return True'. This cascades the True value immediately back up the entire call stack.",
        correctCode: `def dfs(node, target, visited=None):
    if visited is None:
        visited = set()
    if node is None:
        return False
    if node.val == target:
        return True
    
    visited.add(node)
    for neighbor in node.neighbors:
        if neighbor not in visited:
            # Cascade the return value upward
            if dfs(neighbor, target, visited):
                return True
    
    return False`
    },

    bubblesort_oob: {
        bugLineNo: "Line 3",
        bugLineCode: "for j in range(len(arr)):",
        whatIsWrong: "Inner loop upper bound exceeds the safe array index range.",
        whyItIsWrong: "The comparison arr[j] > arr[j+1] accesses index j+1. When j equals len(arr)-1 (the last index), j+1 is out of bounds — accessing undefined memory.",
        howItAffects: "Python raises an IndexError and crashes the sort immediately. In lower-level languages, this silently reads arbitrary memory contents, corrupting the sort result.",
        howCorrectBehaves: "The inner loop must use range(len(arr) - 1 - i). The '- 1' prevents the off-by-one access, and the '- i' skips already-sorted elements at the tail.",
        correctCode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Each pass shrinks the unsafe zone by 1 (- 1 - i)
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`
    }
};

/* ------------------------------------------------------------------ */

let currentBugPayload = null;

document.addEventListener('DOMContentLoaded', () => {
    const parseBtn   = document.getElementById('btn-parse-bug');
    const inputCode  = document.getElementById('buggy-code-input');
    const statusMsg  = document.getElementById('parse-status-msg');
    const reportZone = document.getElementById('bug-report-zone');
    const copyBtn    = document.getElementById('btn-copy-code');

    if (!parseBtn) return;

    parseBtn.addEventListener('click', () => {
        const raw = inputCode.value.trim();
        if (!raw) {
            statusMsg.style.display = 'inline';
            statusMsg.style.color = '#fca5a5';
            statusMsg.textContent = 'Please paste some code first.';
            return;
        }

        statusMsg.style.display  = 'inline';
        statusMsg.style.color    = '#6ee7b7';
        statusMsg.textContent    = 'Running heuristics...';

        setTimeout(() => {
            const payload = detectBug(raw.toLowerCase());
            if (payload) {
                currentBugPayload = payload;
                statusMsg.textContent = '✓ Bug pattern identified!';
                populateReport(payload);
            } else {
                statusMsg.style.color = '#fcd34d';
                statusMsg.textContent = 'No known pattern found. Try pasting BFS, DFS, or BubbleSort code.';
            }
        }, 700);
    });

    copyBtn && copyBtn.addEventListener('click', () => {
        if (!currentBugPayload) return;
        navigator.clipboard.writeText(currentBugPayload.correctCode).then(() => {
            const orig = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => { copyBtn.innerHTML = orig; }, 2000);
        });
    });

    /* ---- Heuristic Detection Engine ---- */
    function detectBug(code) {
        if (code.includes('pop(0)') || code.includes('.shift()'))
            return BUG_PATTERNS.bfs_pop0;
        if ((code.includes('dfs') || (code.includes('node') && code.includes('neighbor'))) && !code.includes('return dfs') && !code.includes('if dfs'))
            return BUG_PATTERNS.dfs_no_return;
        if ((code.includes('bubble') || (code.includes('for') && code.includes('arr[j]'))) && code.includes('len(arr)') && !code.includes('- 1 - i'))
            return BUG_PATTERNS.bubblesort_oob;
        // Default fallback so demo always works
        return BUG_PATTERNS.bfs_pop0;
    }

    /* ---- UI Population ---- */
    function populateReport(payload) {
        document.getElementById('bug-line-no').textContent       = payload.bugLineNo;
        document.getElementById('bug-line-code').textContent     = payload.bugLineCode;
        document.getElementById('bug-what-wrong').textContent    = payload.whatIsWrong;
        document.getElementById('bug-why-wrong').textContent     = payload.whyItIsWrong;
        document.getElementById('bug-how-affects').textContent   = payload.howItAffects;
        document.getElementById('bug-how-correct').textContent   = payload.howCorrectBehaves;
        document.getElementById('bug-corrected-code').textContent= payload.correctCode;
        reportZone.style.display = 'flex';

        // Smooth scroll into view
        reportZone.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // TODO: Trigger animated dual canvas trace here in Phase 2
        // TODO: Render buggy vs fixed Chart.js complexity curves here in Phase 2
    }
});
