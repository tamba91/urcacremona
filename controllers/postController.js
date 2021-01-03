const { pseudoRandomBytes } = require('crypto');
const fs = require('fs')
const util = require('util');
const unLink = util.promisify(fs.unlink);
const post = require('../models/post');


exports.createPost = function (title, body, paths, author, images) {
    return post.create({ Titolo: title, Testo: body, Temp_Media_Paths: paths, Autore: author, Immagini: images })
}

exports.getPosts = function () {
    return post.find({}).sort({ Data: 'descending' })
}

exports.getPostsInfo = function () {
    return post.find({}).sort({ Data: 'descending' }).select('Titolo Temp_Media_Paths Autore Data')
}

exports.getPostById = function (postId) {
    return post.findOne({ _id: postId })
}

exports.getPostsByIds = function (postIds) {
    return post.find({ _id: { $in: postIds } })
}

exports.deletePostsByIds = function (postIds) {
    return post.deleteMany({ _id: { $in: postIds } })
}