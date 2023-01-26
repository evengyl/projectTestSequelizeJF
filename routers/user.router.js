const usersController = require('../controllers/users.controller')

const router = require('express').Router()

router.get('/', usersController.getAll)
router.post('/', usersController.add)
router.get('/:id([0-9]+)', usersController.getById)
router.put('/:id([0-9]+)', usersController.update)
router.delete('/:id([0-9]+)', usersController.delete)
router.post('/:id([0-9]+)', usersController.addFriend)

module.exports = router