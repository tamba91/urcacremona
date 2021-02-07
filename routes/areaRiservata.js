//area riservata - form per caricare i contenuti e gestire gli amministratori

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const util = require('util');
const readDir = util.promisify(fs.readdir)
const unLink = util.promisify(fs.unlink);
const multer = require('multer');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const postController = require('../controllers/postController');
const eventController = require('../controllers/eventController')

//rendering della pagina dopo l'accesso (log-in)
router.get('/', function (req, res) {
    readDir('public/uploads')
        .then(function (files) {
            res.render('aris', { title: 'Area Riservata', firstName: req.user.Nome, downloadFiles: files, errMsgCpwd: req.flash('errMsgCpwd'), errMsgAddUsr: req.flash('errMsgAddUsr'), errPostUpld: req.flash('errPostUpld') });
        })
        .catch(function (err) {
            console.log(err);
        })
});

// form per il cambio password
router.post('/changepasswd', function (req, res) {
    var error;

    if (req.body.newPassword.length < 6) {
        error = 'La password deve essere di almeno 6 caratteri';
    }

    if (req.body.newPassword !== req.body.newPassword2) {
        error = 'Le password non coincidono'
    }

    if (!bcrypt.compareSync(req.body.oldPassword, req.user.Password)) {
        error = 'La vecchia password non è corretta'
    }

    if (error !== undefined) {
        req.flash('errMsgCpwd', error);
        res.redirect('/areariservata');
    }

    else {
        const filter = { Email: req.user.Email }
        const update = { Password: bcrypt.hashSync(req.body.newPassword) }
        User.findOneAndUpdate(filter, update)
            .then(function () {
                res.redirect('/users/logout');;
            })
    }

})

//upload di file (sperimentale, funziona correttamente solo su localhost)
router.post('/upload', function (req, res) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/uploads');
        },
        filename: (req, file, cb) => {
            const fileName = `${file.fieldname + Date.now()}_-_${file.originalname.split(' ').join('_')}`;
            cb(null, fileName);
        }
    });

    var upload = multer({ storage: storage }).array('myFiles');
    upload(req, res, function () {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else {
            res.render('upload', { file: 'File caricati con successo' });
        }
    });
});

//nuovo amministratore
router.post('/register', function (req, res) {
    var { firstName, lastName, email, password, password2 } = req.body;
    var error;

    // controllo tutti i campi compilati
    if (!firstName || !lastName || !email || !password || !password2) {
        error = 'Completare tutti i campi';
    }

    //check password
    if (password !== password2) {
        error = 'Le password non coincidono';
    }

    //password lunghezza min 6 
    if (password.length < 6) {
        error = 'La password deve essere di almeno 6 caratteri';
    }

    if (error != undefined) {
        req.flash('errMsgAddUsr', error)
        res.redirect('/areariservata');
    }
    else {
        //validato
        User.findOne({ Email: email })
            .then(function (user) {
                if (user) {
                    error = `L'utente ${user.Email} è già presente`
                    req.flash('errMsgAddUsr', error)
                    res.redirect('/areariservata');
                }
                else {
                    //salva utente
                    var hashedPassword = bcrypt.hashSync(password);
                    User.create({ Nome: firstName.toUpperCase(), Cognome: lastName.toUpperCase(), Email: email, Password: hashedPassword })
                        .then(function () {
                            res.redirect('/users/logout');
                        })
                        .catch(function (err) { console.log(err) });
                }
            })

    }


})

//eliminazione file area download. vedi sopra
router.post('/delete', function (req, res) {
    var arrPromises = [];
    if (req.body.fileDelete) {
        if (Array.isArray(req.body.fileDelete)) {
            for (i = 0; i < req.body.fileDelete.length; i++) {
                arrPromises.push(unLink(`public/uploads/${req.body.fileDelete[i]}`));
            }
        }
        else {
            arrPromises.push(unLink(`public/uploads/${req.body.fileDelete}`))
        }


        Promise.all(arrPromises)
            .then(function () {
                res.redirect('/areariservata')
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    else {
        res.redirect('/areariservata');
    }
})

//nuovo evento in bacheca
router.post('/newevent', function(req, res){
    eventController.createNewEvent(req.body.eventDate, req.body.eventText, req.user._id)
        .then(function(){
            res.redirect('/')
        })
    
})

// nuovo post. da aggiungere cod. per dimensione max immagini 
router.post('/newpost', function (req, res) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/post_images');
        },
        filename: (req, file, cb) => {
            const fileName = `${file.fieldname + Date.now() + path.extname(file.originalname)}`;
            cb(null, fileName);
        }
    });
    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            req.fileValidationError = 'Tipo file non corretto'
            return cb(null, false, new Error('Tipo file non corretto'))
        }
    };
    const upload = multer({
        storage: storage,
        fileFilter: multerFilter
    }).array('post_image');

    upload(req, res, function () {
        if (req.fileValidationError) {
            req.flash('errPostUpld', req.fileValidationError);
            return res.redirect('/areariservata');
        }
        else {
            var binaryFilesArray = [];
            var tempPathsArray = [];
            for(i=0; i<req.files.length; i++){
                var buffer = fs.readFileSync(req.files[i].path);
                binaryFilesArray.push({data: buffer, contentType: req.files[i].mimetype});
                tempPathsArray.push(req.files[i].path)
            }
            postController.createPost(req.body.postTitle, req.body.postBody, tempPathsArray, req.user._id, binaryFilesArray)
                .then(function () {
                    res.redirect('/')

                })
        }
    })
})

//display degli eventi salvati nel DB
router.get('/eventsinfo', function(req, res){
    eventController.getEvents()
        .then(function (events) {
            res.json(events);
        })
        .catch(function (err) {
            res.json(400, {
                error: 1,
                msg: "some error"
            });
        })
})

//info sui post nel DB per la gestione
router.get('/postsinfo', function (req, res) {
    postController.getPostsInfo()
        .then(function (posts) {
            res.json(posts);
        })
        .catch(function (err) {
            res.json(400, {
                error: 1,
                msg: "some error"
            });
        })
})

//cancella un evento in bacheca
router.post('/deleteevent', function(req, res){
    eventController.deleteEventsById(req.body.eventDelete)
    .then(function () {
        res.redirect('/');
    })
    .catch(function (err) {
        throw err
    })
})

//cancella i post che l'utente ha selezionato
router.post('/deletepost', function (req, res) {
    postController.deletePostsByIds(req.body.postDelete)
        .then(function () {
            res.redirect('/');
        })
        .catch(function (err) {
            throw err
        })
})

module.exports = router;
