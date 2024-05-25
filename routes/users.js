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
	checkEmptyNameAndEmailAndPassword,
	checkEmptyNameAndEmail,
	hashPassword,
	// checkIfUsersAreSafe,
} = require('../middlewares/users')
const {
	sendAllUsers,
	sendUserCreated,
	sendUserById,
	sendUserUpdated,
	sendUserDeleted,
	sendMe
} = require('../controllers/users')

// routes/users.js
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete(
  "/users/:id",
  checkAuth,
  deleteUser,
  sendUserDeleted
);
usersRouter.get('/me', checkAuth, sendMe)
usersRouter.get('/users/:id', findUserById, sendUserById)
usersRouter.get('/users', findAllUsers, sendAllUsers)

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter
