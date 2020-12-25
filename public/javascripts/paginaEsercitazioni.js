window.onload = function () {
    var selecArg = document.querySelector('#arguemnts-list')
    getNumberOfQuestions(`/esercitazioni/count?argomento=${encodeURIComponent(selecArg.value)}`, displayResults)
    selecArg.addEventListener('change', function () {
        getNumberOfQuestions(`/esercitazioni/count?argomento=${encodeURIComponent(selecArg.value)}`, displayResults)
    })



}

function getNumberOfQuestions(url, manageData) {
    fetch(url)
        .then(response => response.json())
        .then(num => manageData(num));
}

function displayResults(numeroDomande) {
    var numberList = document.querySelector('#number-list');
    removeAll(numberList);
    for (i = 5; i < numeroDomande; i *= 2) {
        var newOption = document.createElement('option');
        newOption.text = i;
        newOption.value = i;
        numberList.add(newOption);
    }
    var newOption = document.createElement('option');
    newOption.text = `TUTTE (${numeroDomande})`
    newOption.value = 'all';
    numberList.add(newOption);
}

function removeAll(selectBox) {
    while (selectBox.options.length > 0) {
        selectBox.remove(0);
    }
}