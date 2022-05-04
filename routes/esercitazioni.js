//pagina gestione esercitazioni

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

//fetch da DB argomenti 
router.get('/', function (req, res) {
    questionController.getArgs()
        .then(function (args) {
            res.render('esercitazioni', { title: 'Esercitazioni', argomenti: args });
        })
        .catch(function (e) {
            console.log(e);
        })

})

//fetch numero di domande per argomento
router.get('/count/', function (req, res) {
    questionController.getQuestionsNumberByArg(req.query.argomento)
        .then(function (num) {
            res.json(num);
        })
        .catch(function (e) {
            console.log(e);
        })
})

//render training dopo fetch domande
router.get('/init/', function (req, res) {
    questionController.getRandomQuestionsByArg(req.query.argomento, req.query.num)
        .then(function (questions) {
            res.render('training', { title: `Esercitazione`, questionList: questions });
        })
        .catch( function (e) {
            console.log(e);
        })

})

router.post('/risposterrate/', function (req, res) {
    questionController.getQuestionsById(JSON.parse(req.body.errAnswersIds))
        .then(function (questions) {
            res.render('training', { title: `Risposte Errate`, questionList: questions });;
        })
})

module.exports = router;