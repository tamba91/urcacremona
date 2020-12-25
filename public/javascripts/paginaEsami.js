window.onload = function () {
    var examArg = document.querySelector('#exams-list')
    getExamInfo(`examinfo/${examArg.value}`, displayExamInfo)
        
            
            
            
       
    examArg.addEventListener('change', function () {
        getExamInfo(`examinfo/${examArg.value}`, displayExamInfo)
    })
}

function getExamInfo(url, manageData) {
    fetch(url)
        .then(response => response.json())
        .then(data => manageData(data));
}

function displayExamInfo(info){
    var tbody = document.querySelector('#info-table')
    removeAll(tbody);
    info.Composizione.forEach(function(componente){
        var tableRow = document.createElement('tr')
        var tdArgomento = document.createElement('td')
        tdArgomento.textContent = componente.Argomento
        var tdQauntitativo = document.createElement('td')
        tdQauntitativo.textContent = componente.Quantitativo
        tableRow.appendChild(tdArgomento);
        tableRow.appendChild(tdQauntitativo);
        tbody.appendChild(tableRow);
    })
    
}

function removeAll(tableId) {
    while(tableId.hasChildNodes()){
        tableId.removeChild(tableId.firstChild)
    }
}