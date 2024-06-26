const users = require('../models/user')
const bcrypt = require('bcryptjs')

const findAllUsers = async (req, res, next) => {
	console.log('GET /api/users')
	req.usersArray = await users.find({}, { password: 0 })
	next()
}

const findUserById = async (req, res, next) => {
	console.log('GET /api/users/:id')
	try {
		req.user = await users.findById(req.params.id, { password: 0 })
		next()
	} catch (error) {
		res.status(404).send('User not found')
	}
}

// middlewares/users.js
const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const updateUser = async (req, res, next) => {
	try {
		// В метод передаём id из параметров запроса и объект с новыми свойствами
		req.user = await users.findByIdAndUpdate(req.params.id, req.body)
		next()
	} catch (error) {
		res.setHeader('Content-Type', 'application/json')
		res
			.status(400)
			.send(JSON.stringify({ message: 'Ошибка обновления пользователя' }))
	}
}

const deleteUser = async (req, res, next) => {
	try {
		// В метод передаём id из параметров запроса и объект с новыми свойствами
		req.user = await users.findByIdAndDelete(req.params.id, req.body)
		next()
	} catch (error) {
		res.setHeader('Content-Type', 'application/json')
		res
			.status(400)
			.send(JSON.stringify({ message: 'Ошибка обновления пользователя' }))
	}
}

const checkIsUserExists = async (req, res, next) => {
	const isInArray = req.usersArray.find(user => {
		return req.body.email === user.email
	})
	if (isInArray) {
		res.setHeader('Content-Type', 'application/json')
		res
			.status(400)
			.send(
				JSON.stringify({ message: 'Пользователь с таким email уже существует' })
			)
	} else {
		next()
	}
}

const checkIfUsersAreSafe = async (req, res, next) => {
	if (!req.body.users) {
		next()
		return
	}
	if (req.body.users.length - 1 === req.game.users.length) {
		next()
		return
	} else {
		res.setHeader('Content-Type', 'application/json')
		res.status(400).send(
			JSON.stringify({
				message:
					'Нельзя удалять пользователей или добавлять больше одного пользователя',
			})
		)
	}
}

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
	if (!req.body.username || !req.body.email || !req.body.password) {
		res.setHeader('Content-Type', 'application/json')
		res
			.status(400)
			.send(JSON.stringify({ message: 'Введите имя, email и пароль' }))
	} else {
		next()
	}
}

const checkEmptyNameAndEmail = async (req, res, next) => {
	if (!req.body.username || !req.body.email) {
		res.setHeader('Content-Type', 'application/json')
		res.status(400).send(JSON.stringify({ message: 'Введите имя и email' }))
	} else {
		next()
	}
}

// middlewares/users.js

const hashPassword = async (req, res, next) => {
  try {
    // Создаём случайную строку длиной в десять символов
    const salt = await bcrypt.genSalt(10);
    // Хешируем пароль
    const hash = await bcrypt.hash(req.body.password, salt);
    // Полученный в запросе пароль подменяем на хеш
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

// Экспортируем функцию поиска всех пользователей
module.exports = {
	findAllUsers,
	findUserById,
	createUser,
	updateUser,
	deleteUser,
	checkIsUserExists,
	checkIfUsersAreSafe,
	checkEmptyNameAndEmailAndPassword,
	checkEmptyNameAndEmail,
	hashPassword,
}
