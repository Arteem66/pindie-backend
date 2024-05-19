const allowedCors = [
	'https://pindiefrontsaldnevo.nomoredomainswork.ru',
	'localhost:3000',
	'localhost:27017/pindie'
]

function cors(req, res, next) {
	const { origin } = req.headers

	if (allowedCors.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin)
	}

	next()
}

module.exports = cors