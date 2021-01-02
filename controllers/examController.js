const exam = require('../models/exam');
const questionController = require('../controllers/questionController.js');

exports.getExams = function () {
    return exam.distinct('Tipo_Esame');
}

exports.getExamInfoByType = function(examType){
    return exam.findOne({ Tipo_Esame: examType });
}

exports.getExamByType = function (examType) {

    return (exam.findOne({ Tipo_Esame: examType })
        .then(function (esame) {
            var arrPromises = [];
            esame.Composizione.forEach(function (componente) {
                arrPromises.push((questionController.getRandomQuestionsByArg(componente.Argomento, componente.Quantitativo)))

            })
            return arrPromises;
        })
    )

}