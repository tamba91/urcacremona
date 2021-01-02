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

router.get('/', function (req, res) {
    readDir('public/uploads')
        .then(function (files) {
            res.render('aris', { title: 'Area Riservata', firstName: req.user.Nome, downloadFiles: files, errMsgCpwd: req.flash('errMsgCpwd'), errMsgAddUsr: req.flash('errMsgAddUsr'), errPostUpld: req.flash('errPostUpld') });
        })
        .catch(function (err) {
            console.log(err);
        })
});

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

//upload di file
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
            console.log(req.files)
            res.render('upload', { file: 'File caricati con successo' });
        }
    });
});

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
            postController.createPost(req.body.postTitle, req.body.postBody, req.files.map(function (fileInfo) { return `${fileInfo.destination}/${fileInfo.filename}` }), req.user._id)
                .then(function () {
                    res.redirect('/')

                })
        }
    })
})

router.get('/postsinfo', function (req, res) {
    postController.getPosts()
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
