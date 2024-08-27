export default class Accordion {
    constructor(el) {
        this.$acc = el;
        this.$btns = $.qsa('[data-acc-btn]', this.$acc);
        this.$contents = $.qsa('[data-acc-content]', this.$acc);
        this.init();
    }

    init() {
        this.setContentSize();

        if (this.$acc.acc) return;

        this.$btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('is-active')) {
                    btn.classList.remove('is-active');
                    this.$contents
                        .find(content => content.dataset.accContent === btn.dataset.accBtn)
                        .classList.remove('is-open');
                } else if (!btn.classList.contains('is-active')) {
                    btn.classList.add('is-active');
                    this.$contents
                        .find(content => content.dataset.accContent === btn.dataset.accBtn)
                        .classList.add('is-open');
                }
            });
        });

        this.$acc.acc = this;
    }

    setContentSize() {
        this.$contents.forEach(content => {
            content.style.setProperty(
                '--acc-max-height',
                `${content.querySelector('[data-acc-content-inner]').offsetHeight}px`,
            );
        });
    }
}
