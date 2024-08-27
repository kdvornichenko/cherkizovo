const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

const setScrollbarWidth = () => {
    document.documentElement.style.setProperty('--scrollbar-w', `${window.innerWidth - document.documentElement.clientWidth}px`);
};

window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.style.setProperty(
        '--initial-vh',
        `${window.innerHeight * 0.01}px`,
    );

    setVh();
    setScrollbarWidth();
});

window.addEventListener('resize', () => {
    setVh();
    setScrollbarWidth();
});
