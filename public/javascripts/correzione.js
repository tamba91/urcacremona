document.querySelector("form").addEventListener("submit", function (ev) {
    ev.preventDefault();

    resolveForm("trainingForm", showResults);

})

function resolveForm(formId, resCb) {
    const timeStamp = Date.now();
    var fieldsets = document.querySelectorAll(`#${formId} fieldset`);
    var results = { correct_answers: 0, wrong_answers: 0 };
    var breakCheck = false;
    for (i = 0; i < fieldsets.length; i++) {
        var radios = fieldsets[i].querySelectorAll("input[type='radio']")
        var correctAnswer = fieldsets[i].getAttribute("data-correct-answer");
        for (j = 0; j < radios.length; j++) {

            if (radios[j].checked == true) {
                if (radios[j].value == correctAnswer) {
                    results.correct_answers += 1;
                    radios[j].parentNode.childNodes[1].style.backgroundColor = "#90EE90"
                    breakCheck = true;
                    break;
                }
                else {
                    results.wrong_answers += 1;
                    localStorage.setItem(fieldsets[i].getAttribute("data-question-id"), timeStamp);
                    radios[j].parentNode.childNodes[1].style.backgroundColor = "#FF6347"
                    radios[correctAnswer].parentNode.childNodes[1].style.backgroundColor = "#90EE90"
                    breakCheck = true;
                    break;
                }
            }
        }
        if (breakCheck == false) {
            results.wrong_answers += 1;
            localStorage.setItem(fieldsets[i].getAttribute("data-question-id"), timeStamp);
            radios[correctAnswer].parentNode.childNodes[1].style.backgroundColor = "#90EE90"
            fieldsets[i].parentNode.style.backgroundColor = "#F08080"
        }
        breakCheck = false;
    }
    return resCb(results);
}

function showResults(res) {
    document.querySelector("#right-answers").textContent = `Risposte esatte: ${res.correct_answers}`;
    document.querySelector("#wrong-answers").textContent = `Risposte errate: ${res.wrong_answers}`;
    document.querySelector("#submit-button").disabled = 'disabled';
}

