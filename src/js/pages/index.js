import '~/js/common';

// Index page scripts
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const page = $.qs('[data-page]');
        
        page.classList.remove('animate');
        page.style.overflowY = 'hidden';

        setTimeout(() => {
            page.style.overflowY = 'auto';
        }, 600);
    }, 200);
});