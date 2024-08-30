import '~/js/common';

let questionCount = 0;
let isAnswered = false;
let correctAnsweredCount = 0;

function getQuestions() {
    return axios.get('/assets/json/questions.json').then(res => res.data);
}

Promise.resolve(getQuestions()).then(data => {
    const container = $.qs('[data-question="container"]');

    if (!container) return;

    // Question
    const counterCurrent = $.qs('[data-question="counter-current"]', container);
    const counterTotal = $.qs('[data-question="counter-total"]', container);
    const getQuestionCount = () => counterCurrent.dataset.counterValue;
    const text = $.qs('[data-question="text"]', container);
    const btns = $.qsa('[data-question="btn"]', container);
    const nextBtn = $.qs('[data-question="next"]', container);

    // Answer
    const answerContainer = $.qs('[data-question-answer="container"]', container);
    const answerState = $.qs('[data-question-answer="state"]', answerContainer);
    const answerStateText = $.qs('[data-question-answer="state-text"]', answerContainer);
    const answerText = $.qs('[data-question-answer="text"]', answerContainer);

    counterTotal.innerHTML = data.length;

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isAnswered) {
                container.classList.add('is-answered');
                return;
            }

            const btnValue = btn.dataset.btnValue;
            const questionCount = getQuestionCount();
            const isAnswerCorrect = data[questionCount].variants[btnValue].value;

            isAnswerCorrect && correctAnsweredCount++;
            setAnswer(isAnswerCorrect, questionCount, btnValue);
        });
    });

    nextBtn.addEventListener('click', () => {
        if (isAnswered && questionCount === data.length) {
            localStorage.setItem('correctAnsweredCount', correctAnsweredCount);

            return;
        }
        setQuestion(data[questionCount]);
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
        btns[0].dataset.btnValue = randomIndex;

        btns[1].innerHTML = variants[1 - randomIndex].btn;
        btns[1].dataset.btnValue = 1 - randomIndex;

        container.classList.remove('is-answered');
        isAnswered = false;
        setQuestionCount();
    }

    function setAnswer(isCorrect, questionCount, btnValue) {
        answerState.dataset.answerValue = isCorrect;
        answerStateText.innerHTML = data[questionCount].variants[btnValue].btn;
        answerText.innerHTML = data[questionCount].variants[btnValue].answer;

        container.classList.add('is-answered');
        nextBtn.removeAttribute('disabled');
        isAnswered = true;
    }
});
