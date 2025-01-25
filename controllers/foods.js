// controllers/foods.js

const express = require('express');
const router = express.Router();

const UserModel = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.session.user._id)
        res.render('foods/index.ejs', {
            pantry: currentUser.pantry

        });
    } catch (error) {
        console.log(error)
        res.redirect(`/`)
    }
});

router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
});

router.put('/:foodId', async function (req, res) {
    try {
        const currentUser = await UserModel.findById(req.session.user._id)
        const food = currentUser.pantry.id(req.params.foodId)
        food.set(req.body)
        console.log(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods/${food._id}`)
    } catch (err) {
        console.log(err)
        res.send('error updating item, check terminal')
    }
})

router.get('/:foodId/edit', async function (req, res) {
    try {
        const currentUser = await UserModel.findById(req.session.user._id)
        const item = currentUser.pantry.id(req.params.foodId)
        res.render('foods/edit.ejs', {
            item: item
        })
    } catch (err) {
        console.log(err)
        res.send('error editing item, check terminal')
    }
})

router.delete('/:foodId', async function (req, res) {
    try {
        // look up the user, becuase the user has the applications array
        // Google (mongoose model methods)
        const currentUser = await UserModel.findById(req.session.user._id)
        // look up and delete the application in the array that matches the id
        // in the params
        // google (mongoose document methods)
        currentUser.pantry.id(req.params.foodId).deleteOne();
        // tell the database that we deleted application in the array
        await currentUser.save()


        //to the client to make a get request tot he applications/index route
        res.redirect(`/users/${currentUser._id}/foods`)

    } catch (err) {
        console.log(err)
        res.send('Error deleting food, click terminal!')
    }
})

router.get('/:foodId', async function (req, res) {
    try {
        const currentUser = await UserModel.findById(req.session.user._id)
        const food = currentUser.pantry.id(req.params.foodId)
        console.log(food)
        res.render('foods/show.ejs', {
            item: food
        })
    } catch (err) {
        console.log(err)
        res.send('error and show page check your terminal!')
    }
})

router.post('/', async (req, res) => {
    try {
        const currentUser = await UserModel.findById(req.session.user._id)
        currentUser.pantry.push(req.body)
        await currentUser.save()
        console.log(currentUser)
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect(`/`)
    }
})

module.exports = router;
