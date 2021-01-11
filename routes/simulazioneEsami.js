const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController')

//fetch tipo esame dal DB
router.get('/', function (req, res) {
    examController.getExams()
        .then(function (exams) {
            res.render('simulazionesami', { title: 'Simulazione Esami', esami: exams });
        })
})

//render simulazione esame
router.get('/init', function (req, res) {
    examController.getExamByType(req.query.esame)
        .then(function (arrayOfPromises) {
            Promise.all(arrayOfPromises).then(function (result) {
                var questions = result.flat(); //array di un solo livello
                var answers = questions.map(val => {
                    return ({ name: val._id, value: val.Risposta_Esatta })
                });
                res.render('training', { title: `Esame: ${req.query.esame}`, questionList: questions, answerList: JSON.stringify(answers) });
            }
            )
        });

})

//fetch info esame
router.get('/examinfo/:type', function(req, res){
    examController.getExamInfoByType(req.params.type)
        .then(function(examInfo){
            res.json(examInfo);
        })
})

module.exports = router;