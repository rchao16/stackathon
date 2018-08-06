const router = require('express').Router()
const {Activity} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
    try {
        
        const newActivity = await Activity.create(req.body);
        res.json(newActivity)
    } catch (err) {
        next(err)
    }
})