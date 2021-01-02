const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController')

router.get('/', function (req, res, next) {
    examController.getExams()
        .then(function (exams) {
            res.render('simulazionesami', { title: 'Simulazione Esami', esami: exams });
        })
})

router.get('/init', function (req, res) {
    examController.getExamByType(req.query.esame)
        .then(function (arrayOfPromises) {
            Promise.all(arrayOfPromises).then(function (result) {
                var questions = result.flat();
                var answers = questions.map(val => {
                    return ({ name: val._id, value: val.Risposta_Esatta })
                });
                res.render('training', { title: `Esame: ${req.query.esame}`, questionList: questions, answerList: JSON.stringify(answers) });
            }
            )
        });

})

router.get('/examinfo/:type', function(req, res){
    examController.getExamInfoByType(req.params.type)
        .then(function(examInfo){
            res.json(examInfo);
        })
})

module.exports = router;