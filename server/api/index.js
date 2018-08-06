const router = require('express').Router()
module.exports = router

//mounted on '/api/'
router.use('/users', require('./users'))
router.use('/activities', require('./activities'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

