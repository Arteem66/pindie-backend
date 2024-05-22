// Файл routes/games.js

const gamesRouter = require('express').Router()

const { checkAuth } = require('../middlewares/auth.js')
const {
	findAllGames,
	createGame,
	findGameById,
	updateGame,
	deleteGame,
	checkEmptyFields,
	checkIfCategoriesAvaliable,
	checkIfUsersAreSafe,
	checkIsGameExists,
	checkIsVoteRequest
} = require('../middlewares/games')
const {
	sendAllGames,
	sendGameCreated,
	sendGameById,
	sendGameUpdated,
	sendGameDeleted,
} = require('../controllers/games')

gamesRouter.delete('/games/:id', checkAuth, findGameById, deleteGame, sendGameDeleted)
gamesRouter.put(
	'/games/:id',
	findGameById,
	checkIsVoteRequest,
	checkIfUsersAreSafe,
	checkIfCategoriesAvaliable,
	checkEmptyFields,
	checkAuth,
	updateGame,
	sendGameUpdated
)
gamesRouter.post(
	'/games',
	findAllGames,
	checkIsGameExists,
	checkIfCategoriesAvaliable,
	checkEmptyFields,
	checkAuth,
	createGame,
	sendGameCreated
)
gamesRouter.get('/games/:id', findGameById, sendGameById)
gamesRouter.get('/games', findAllGames, sendAllGames)

module.exports = gamesRouter
