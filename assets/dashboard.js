document.addEventListener("DOMContentLoaded", function () {
    function loadScores() {
        for (let i = 1; i <= 5; i++) {
            let score = localStorage.getItem(`test${i}Score`);
            document.getElementById(`score${i}`).textContent = score ? `${score}/100` : "Not Attempted";
        }
    }

    window.resetScores = function () {
        localStorage.clear();
        loadScores();
    };

    loadScores();
});
