const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');


router.get('/', function (req, res) {
    questionController.getArgs()
        .then(function (args) {
            res.render('esercitazioni', { title: 'Esercitazioni', argomenti: args });
        })
        .catch(function (e) {
            console.log(e);
        })

})

router.get('/count/', function (req, res) {
    questionController.getQuestionsNumberByArg(req.query.argomento)
        .then(function (num) {
            res.json(num);
        })
        .catch(function (e) {
            console.log(e);
        })
})

router.get('/init/', function (req, res) {
    questionController.getRandomQuestionsByArg(req.query.argomento, req.query.num)
        .then(function (questions) {
            var answers = questions.map(val => {
                return ({ name: val._id, value: val.Risposta_Esatta })
            });
            res.render('training', { title: `Esercitazione`, questionList: questions, answerList: JSON.stringify(answers) });
        })

})

module.exports = router;