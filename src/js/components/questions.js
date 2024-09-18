let questionCount = 0;
let isAnswered = false;
let correctAnsweredCount = 0;

const page = $.qs('[data-page]');
const overlay = $.qs('[data-overlay]', page);
const toQuestionsBtn = $.qs('[data-btn-to="questions"]', page);

toQuestionsBtn.addEventListener('click', pageTransition);

function pageTransition() {
    page.classList.add('animate');

    overlay.addEventListener('transitionend', () => {
        if (!page.classList.contains('animate')) return;

        $.dispatch({
            el: document,
            name: 'page-transition:end',
            detail: {
                page: page.dataset.page,
            },
        });
    });
}

document.addEventListener('page-transition:end', ({ detail }) => {
    /* eslint-disable */
    switch (detail.page) {
        case 'main':
            page.dataset.page = 'questions';
            page.classList.add('questions');
            setQuestionsPage();
            break;
        case 'questions':
            page.dataset.page = 'results';
            page.classList.add('results');
            page.classList.remove('questions');
        default:
            break;
    }
    /* eslint-enable */
    page.classList.remove('animate');
});

function setQuestionsPage() {
    const getQuestions = () => axios.get('assets/json/questions.json').then(res => res.data);

    Promise.resolve(getQuestions()).then(data => {
        const container = $.qs('[data-question="container"]');

        if (!container) return;

        const footer = $.qs('footer');
        // Question
        const imageContainer = $.qs('[data-question="img"]', container);
        const imageHTML = $.qs('picture', imageContainer);
        const counterCurrent = $.qs('[data-question="counter-current"]', container);
        const counterTotal = $.qs('[data-question="counter-total"]', container);
        const getQuestionCount = () => counterCurrent.dataset.counterValue;
        const text = $.qs('[data-question="text"]', container);
        const btns = $.qsa('[data-question="btn"]', container);
        const nextBtn = $.qs('[data-question="next"]', container);
        const mainImgs = () => $.qsa('[data-question-img="default"]', container);

        // Answer
        const answerContainer = $.qs('[data-question-answer="container"]', container);
        const answerState = $.qs('[data-question-answer="state"]', answerContainer);
        const answerStateText = $.qs('[data-question-answer="state-text"]', answerContainer);
        const answerText = $.qs('[data-question-answer="text"]', answerContainer);

        counterTotal.innerHTML = data.length;

        for (let i = 1; i < data.length; i++) {
            const question = data[i];
            const image = imageHTML.cloneNode(true);
            const mainImg = $.qs('[data-question-img="default"]', image);

            mainImg.srcset = question.images.desktop.src;
            mainImg.classList.add('is-hidden');
            mainImg.dataset.imgValue = i + 1;

            $.qs('[data-question-img="desktop-webp"]', image).srcset = question.images.desktop.webp;
            $.qs('[data-question-img="desktop"]', image).srcset = question.images.desktop.src;

            $.qs('[data-question-img="mob-webp"]', image).srcset = question.images.mobile.webp;
            $.qs('[data-question-img="mob"]', image).srcset = question.images.mobile.src;

            imageContainer.insertAdjacentHTML('beforeEnd', image.outerHTML);
        }

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (isAnswered) {
                    container.classList.add('is-answered');
                    return;
                }

                const btnIndex = btn.dataset.btnIndex;
                const questionCount = getQuestionCount();
                const isAnswerCorrect = data[questionCount].variants[btnIndex].value;

                isAnswerCorrect && correctAnsweredCount++;
                setAnswer(isAnswerCorrect, questionCount, btnIndex);
            });
        });

        nextBtn.addEventListener('click', () => {
            if (isAnswered && questionCount === data.length) {
                localStorage.setItem('correctAnsweredCount', correctAnsweredCount);
                pageTransition();
                return;
            }
            setQuestion(data[questionCount]);

            container.style.setProperty('--padding-bottom', 0);
            footer.style.removeProperty('--bottom');
        });

        setQuestion(data[0]);

        function setQuestionCount() {
            counterCurrent.dataset.counterValue = questionCount;

            questionCount++;
            counterCurrent.innerHTML = questionCount;
        }

        function setQuestion(data) {
            const { question, variants } = data;
            const randomIndex = Math.floor(Math.random() * 2);

            text.innerHTML = question;

            btns[0].innerHTML = variants[randomIndex].btn;
            btns[0].dataset.btnIndex = randomIndex;

            btns[1].innerHTML = variants[1 - randomIndex].btn;
            btns[1].dataset.btnIndex = 1 - randomIndex;


            container.classList.remove('is-answered');
            isAnswered = false;

            setQuestionCount();

            for (let i = 0; i < mainImgs().length; i++) {
                +mainImgs()[i].dataset.imgValue === questionCount ? mainImgs()[i].classList.remove('is-hidden') : mainImgs()[i].classList.add('is-hidden');
            }
        }

        function setAnswer(isCorrect, questionCount, btnIndex) {
            answerState.dataset.answerValue = isCorrect;
            answerStateText.innerHTML = data[questionCount].variants[btnIndex].btn;
            answerText.innerHTML = data[questionCount].variants[btnIndex].answer;

            container.classList.add('is-answered');
            nextBtn.removeAttribute('disabled');
            isAnswered = true;

            function getDistanceFromBottomToTop(elem1, elem2) {
                // Получаем координаты первого элемента
                const rect1 = elem1.getBoundingClientRect();
                // Получаем координаты второго элемента
                const rect2 = elem2.getBoundingClientRect();

                // Нижняя точка первого элемента (по вертикали)
                const bottomOfElem1 = rect1.bottom;
                // Верхняя точка второго элемента (по вертикали)
                const topOfElem2 = rect2.top;

                // Вычисляем расстояние от нижней точки первого элемента до верхней точки второго
                const verticalDistance = topOfElem2 - bottomOfElem1;

                return verticalDistance;
            }

            const distance = getDistanceFromBottomToTop(answerContainer, footer);
            console.log(distance);

            if (distance - 70 < 0) {
                container.style.setProperty('--padding-bottom', 140 + 'px');
                footer.style.setProperty('--bottom', distance - 80 + 'px');
            }
        }
    });
}
