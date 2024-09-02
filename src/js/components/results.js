document.addEventListener('page-transition:end', ({ detail }) => {
    if (detail.page !== 'questions') return;
    const resultsContainer = $.qs('[data-results]');

    if (!resultsContainer) return;

    const correctAnsweredCount = localStorage.getItem('correctAnsweredCount');
    const count = $.qs('[data-correct-answered-count]', resultsContainer);

    const getResults = () => axios.get('/assets/json/results.json').then(res => res.data);
    const resultsText = $.qs('[data-results-text]', resultsContainer);

    count.textContent = correctAnsweredCount;

    Promise.resolve(getResults()).then(res => {
        if (correctAnsweredCount > 3) {
            resultsText.innerHTML = res[0];
        } else {
            resultsText.innerHTML = res[1];
        }
    });
});