import '~/js/common';

// Index page scripts
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const page = $.qs('[data-page]');
        page.classList.remove('animate');
    }, 200);
});