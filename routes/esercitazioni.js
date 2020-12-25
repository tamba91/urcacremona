var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController');


router.get('/', function (req, res, next) {
    questionController.getArgs()
        .then(function (args) {
            res.render('esercitazioni', { title: 'Esercitazioni', argomenti: args });
        })
        .catch(function (e) {
            console.log(e);
        })

})

router.get('/count/', function (req, res, next) {
    questionController.getQuestionsNumberByArg(req.query.argomento)
        .then(function (num) {
            res.json(num);
        })
        .catch(function (e) {
            console.log(e);
        })
})

router.get('/init/', function (req, res, next) {
    questionController.getRandomQuestionsByArg(req.query.argomento, req.query.num)
        .then(function (questions) {
            var answers = questions.map(val => {
                return ({ name: val._id, value: val.Risposta_Esatta })
            });
            res.render('training', { title: `Esercitazione`, questionList: questions, answerList: JSON.stringify(answers) });
        })

})



module.exports = router;