import Accordion from '~/js/components/accordion';

window.addEventListener('load', () => {
    $.each('[data-acc]', acc => initAcc(acc));

    document.addEventListener('frontend:reload', e => {
        const wrap = e.detail.wrap;
        if (!wrap) return;
        const accElemsInWrap = $.qsa('[data-acc]', wrap);
        accElemsInWrap.forEach(acc => initAcc(acc));
    });

    document.addEventListener('accordion:update', e => e.detail.el.acc.setContentSize());

    window.addEventListener('resize', () => {
        $.each('[data-acc]', acc => acc.acc?.setContentSize());
    });

    function initAcc(acc) {
        new Accordion(acc);
    }
});
