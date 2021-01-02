const { pseudoRandomBytes } = require('crypto');
const fs = require('fs')
const util = require('util');
const unLink = util.promisify(fs.unlink);
const post = require('../models/post');


exports.createPost = function (title, body, paths, author) {
    return post.create({ Titolo: title, Testo: body, Media_Paths: paths, Autore: author })
}

exports.getPosts = function () {
    return post.find({}).sort({ Data: 'descending' })
}

exports.getPostById = function (postId) {
    return post.findOne({ _id: postId })
}

exports.getPostsByIds = function (postIds) {
    return post.find({ _id: { $in: postIds } })
}

exports.deletePostsByIds = function (postIds) {
    var promises = [];
    return post.find({ _id: { $in: postIds } })
        .then(function (posts) {
            posts.forEach(function (post) {
                post.Media_Paths.forEach(function (path) {
                    promises.push(unLink(path))
                })
            })
        })
        .then(function () {
            post.deleteMany({ _id: { $in: postIds } })
                .then(function () {
                    Promise.all(promises)
                })
        })
}
