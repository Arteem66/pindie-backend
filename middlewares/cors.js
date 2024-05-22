const allowedCors = [
	'https://pindiefrontsaldnevo.nomoredomainswork.ru',
	'localhost:3000',
	'localhost:3001',
	'localhost:27017/pindie'
]

function cors(req, res, next) {
	const { origin } = req.headers

	if (allowedCors.includes(origin)) {
		res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
		res.header(
			'Access-Control-Allow-Headers',
			'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
		)
	}

	next()
}

module.exports = cors