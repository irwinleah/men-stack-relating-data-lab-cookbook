const express = require('express');
const router = express.Router();

const UserModel = require('../models/user.js');

router.get('/', async function (req, res){
    const users = await UserModel.find({})
    res.render('users/index.ejs', {
        users: users
    })

})

router.get('/:userid', async function (req, res){
    const user = await UserModel.findById(req.params.userid)
    res.render('users/show.ejs', {
        member: user
    })
})

module.exports = router;