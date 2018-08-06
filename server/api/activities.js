const router = require('express').Router()
const {Activity} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
    try {
        console.log('hello')
        const newActivity = await Activity.create(req.body);
        console.log(newActivity)
        res.json(newActivity)
    } catch (err) {
        next(err)
    }
})