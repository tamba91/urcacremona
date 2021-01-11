//controller per la simulazione delle domande presenti su mongodb

const question = require('../models/question');

exports.getArgs = function () {
    return question.distinct('Argomento');
}

exports.getAllQuestionsByArg = function (arg) {
    return question.find({ Argomento: arg });
}

exports.getQuestionsNumberByArg = function (arg) {
    return question.countDocuments({ Argomento: arg });
}

exports.getRandomQuestionsByArg = function (arg, num) {
    if (!isNaN(parseInt(num))) {
        return (question.countDocuments({ Argomento: arg })
            .then(function (documentsNumber) {
                if (num < documentsNumber) {
                    var arr = [];
                    while (arr.length < num) {
                        var r = Math.floor(Math.random() * documentsNumber) + 1;
                        if (arr.indexOf(r) === -1) arr.push(r);
                    }
                }
                return (arr)
            })
            .then(function (arr) {
                if (arr != undefined) {
                    return question.find({
                        'Argomento': arg,
                        'N': { $in: arr }
                    })
                }
                else return question.find({ Argomento: arg }).sort(N);
            })
        )
    }
    else return question.find({ Argomento: arg })
}
