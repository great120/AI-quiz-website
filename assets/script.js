document.addEventListener("DOMContentLoaded", function () {
    const questionsContainer = document.getElementById("questions-container");
    const quizForm = document.getElementById("quiz-form");
    const resultContainer = document.getElementById("result-container");

    let testQuestions = [];

    function detectTest() {
        const pageTitle = document.title;
        if (pageTitle.includes("Test 1")) testQuestions = test1Questions;
        else if (pageTitle.includes("Test 2")) testQuestions = test2Questions;
        else if (pageTitle.includes("Test 3")) testQuestions = test3Questions;
        else if (pageTitle.includes("Test 4")) testQuestions = test4Questions;
        else if (pageTitle.includes("Test 5")) testQuestions = test5Questions;
    }

    function loadQuestions() {
        detectTest(); // Set correct testQuestions

        if (testQuestions.length === 0) {
            questionsContainer.innerHTML = "<p style='color: red;'>⚠ Error: No questions found!</p>";
            return;
        }

        testQuestions.forEach((q, index) => {
            let questionBlock = document.createElement("div");
            questionBlock.classList.add("question-block");
            questionBlock.innerHTML = `<p><strong>Q${index + 1}: ${q.question}</strong></p>`;

            q.options.forEach((option, i) => {
                questionBlock.innerHTML += `
                    <label>
                        <input type="radio" name="q${index}" value="${i}">
                        ${option}
                    </label><br>
                `;
            });

            questionsContainer.appendChild(questionBlock);
        });
    }

    function checkAnswers(event) {
        event.preventDefault();
        detectTest(); // Ensure correct test is used

        let score = 0;
        let userAnswers = [];

        testQuestions.forEach((q, index) => {
            let selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            let isCorrect = selectedOption && parseInt(selectedOption.value) === q.answer;

            if (isCorrect) {
                score += 10;
                userAnswers.push(`<p style="color: green;">✅ Q${index + 1}: Correct</p>`);
            } else {
                userAnswers.push(`<p style="color: red;">❌ Q${index + 1}: Incorrect. Correct Answer: <strong>${q.options[q.answer]}</strong></p>`);
            }
        });

        let testNumber = document.title.match(/\d+/)[0]; // Extracts test number from title
        localStorage.setItem(`test${testNumber}Score`, score);

        resultContainer.innerHTML = `<h2>Your Score: ${score}/100</h2>` + userAnswers.join("");
        resultContainer.classList.remove("hidden");
    }

    quizForm.addEventListener("submit", checkAnswers);
    setTimeout(loadQuestions, 100); // Ensures data.js is fully loaded before running
});
