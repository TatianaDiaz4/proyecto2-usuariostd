const router = require('express').Router()

const usersServices = require('./users.services')

router.get('/', usersServices.getAllUsers) 
router.post('/', usersServices.postUser) 

router.get('/:id', usersServices.getUserById) 
router.delete('/:id', usersServices.deleteUser) 
router.patch('/:id', usersServices.patchUser) 
router.put('/:id', usersServices.putUser) 

module.exports = router
