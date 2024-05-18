const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const path = require('path')

const apiRouter = require('./routes/apiRouter')

const connectToDatabase = require('./database/connect')
const cors = require('./middlewares/cors');
const pagesRouter = require('./routes/pages');

const app = express()
const PORT = 3000

connectToDatabase()

app.use(
	cors,
	bodyParser.json(),
	cookieParser(),
	express.static(path.join(__dirname, 'public')),
	apiRouter,
	pagesRouter
)

app.listen(PORT)
