/**
 * Logic Lens — Navigation Controller (Phase 1)
 * Handles routing between home and the 3 dashboard modes.
 * TODO: Add chart cleanup on reset once optimize charts are live
 */

document.addEventListener('DOMContentLoaded', () => {
    const btnHome     = document.getElementById('btn-home');
    const homeScreen  = document.getElementById('home-screen');
    const viewsCont   = document.getElementById('views-container');
    const dashExplain = document.getElementById('dashboard-explain');
    const dashAnalyze = document.getElementById('dashboard-analyze');
    const dashOptimize= document.getElementById('dashboard-optimize');
    const cardExplain = document.getElementById('card-explain');
    const cardAnalyze = document.getElementById('card-analyze');
    const cardOptimize= document.getElementById('card-optimize');

    function resetAll() {
        homeScreen.style.display   = 'flex';
        viewsCont.style.display    = 'none';
        btnHome.style.display      = 'none';
        dashExplain.style.display  = 'none';
        dashAnalyze.style.display  = 'none';
        dashOptimize.style.display = 'none';

        // Reset Optimize counters
        const grids = ['grid-brute', 'grid-opt'];
        grids.forEach(id => { const el = document.getElementById(id); if (el) el.innerHTML = ''; });
        ['op-counter-brute','op-counter-opt'].forEach(id => {
            const el = document.getElementById(id); if (el) el.textContent = '0';
        });
        const sm = document.getElementById('speedup-multiplier');
        if (sm) sm.textContent = '--';

        // Reset Analyze
        const reportZone = document.getElementById('bug-report-zone');
        if (reportZone) reportZone.style.display = 'none';
        const bugInput = document.getElementById('buggy-code-input');
        if (bugInput) bugInput.value = '';
        const statusMsg = document.getElementById('parse-status-msg');
        if (statusMsg) statusMsg.style.display = 'none';

        // Reset Explain animator
        const animator  = document.getElementById('animator-container');
        const loading   = document.getElementById('loading-state');
        const approaches= document.getElementById('approaches-shelf');
        if (animator)   animator.classList.add('hidden');
        if (loading)    loading.classList.add('hidden');
        if (approaches) approaches.classList.add('hidden');

        // Stop playback if running (app.js exposes pause globally)
        if (typeof window.llPause === 'function') window.llPause();
    }

    function showDash(dash) {
        homeScreen.style.display   = 'none';
        viewsCont.style.display    = 'block';
        btnHome.style.display      = 'flex';
        dashExplain.style.display  = 'none';
        dashAnalyze.style.display  = 'none';
        dashOptimize.style.display = 'none';
        dash.style.display         = 'flex';

        // Resize optimize charts if needed
        if (dash.id === 'dashboard-optimize') {
            if (window.optTimeChart)  window.optTimeChart.resize();
            if (window.optSpaceChart) window.optSpaceChart.resize();
        }
    }

    btnHome.addEventListener('click', resetAll);
    cardExplain.addEventListener('click',  () => showDash(dashExplain));
    cardAnalyze.addEventListener('click',  () => showDash(dashAnalyze));
    cardOptimize.addEventListener('click', () => showDash(dashOptimize));

    // Initial state
    resetAll();
});
