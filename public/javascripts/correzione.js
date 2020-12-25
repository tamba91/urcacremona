window.onload = function () {
    document.querySelector("form").addEventListener("submit", function (ev) {
        ev.preventDefault();

        resolveForm("trainingForm", answerList, showResults, incompleteTraining);

    })
}

function resolveForm(formId, correctAnswersArray, succCb, failCb) {
    var fieldsets = document.querySelectorAll(`#${formId} fieldset`);
    var results = { correct_answers: 0, wrong_answers: 0 };
    var breakCheck = false;
    for (i = 0; i < fieldsets.length; i++) {
        var radios = fieldsets[i].querySelectorAll("input[type='radio']")
        var correctAnswer = correctAnswersArray[i].value;
        for (j = 0; j < radios.length; j++) {

            if (radios[j].checked == true) {
                if (radios[j].value == correctAnswer) {
                    results.correct_answers += 1;
                    radios[j].parentNode.childNodes[1].style.backgroundColor = "#90EE90"
                    fieldsets[i].parentNode.style.backgroundColor = "initial"
                    breakCheck = true;
                    break;
                }
                else {
                    results.wrong_answers += 1;
                    radios[j].parentNode.childNodes[1].style.backgroundColor = "#FF6347"
                    radios[correctAnswer].parentNode.childNodes[1].style.backgroundColor = "#90EE90"
                    fieldsets[i].parentNode.style.backgroundColor = "initial"
                    breakCheck = true;
                    break;
                }
            }
        }
        if (breakCheck == false) {
            if (typeof failCb === 'function') {
                return failCb(fieldsets);
            }
        }
        breakCheck = false;
    }
    return succCb(results);
}

function incompleteTraining(fieldsetsArray) {
    var check;
    for (i = 0; i < fieldsetsArray.length; i++) {
        var radios = fieldsetsArray[i].querySelectorAll("input[type='radio']")
        check = false;
        for (j = 0; j < radios.length; j++) {
            radios[j].parentNode.style.backgroundColor = "initial"
            if (radios[j].checked == true) {
                fieldsetsArray[i].parentNode.style.backgroundColor = "initial"
                check = true
            }
        }
        if (check == false) {
            fieldsetsArray[i].parentNode.style.backgroundColor = "#87CEEB"
        }
    }

}

function showResults(res) {
    document.querySelector("#right-answers").textContent = `Risposte esatte: ${res.correct_answers}`;
    document.querySelector("#wrong-answers").textContent = `Risposte errate: ${res.wrong_answers}`;
    document.querySelector("#submit-button").disabled = 'disabled';
}

