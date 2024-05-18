//Создаём роут для запросов пользователей
const usersRouter = require('express').Router()
const { checkAuth } = require('../middlewares/auth.js')

// Импортируем вспомогательные функции
const {
	findAllUsers,
	createUser,
	findUserById,
	updateUser,
	deleteUser,
	checkIsUserExists,
	checkIfUsersAreSafe,
	checkEmptyNameAndEmailAndPassword,
	checkEmptyNameAndEmail,
	hashPassword,
} = require('../middlewares/users')
const {
	sendAllUsers,
	sendUserCreated,
	sendUserById,
	sendUserUpdated,
	sendUserDeleted,
	sendMe
} = require('../controllers/users')

// Обрабатываем GET-запрос с роутом '/users'
usersRouter.delete('/users/:id', checkAuth, findUserById, deleteUser, sendUserDeleted)

usersRouter.post('/users', findAllUsers, createUser, sendUserCreated)

usersRouter.put(
	'/users/:id',
	checkEmptyNameAndEmail,
	checkIfUsersAreSafe,
	checkAuth,
	updateUser,
	sendUserUpdated
)
usersRouter.get('/me', checkAuth, sendMe)
usersRouter.get('/users/:id', findUserById, sendUserById)
usersRouter.get('/users', findAllUsers, sendAllUsers)

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter
