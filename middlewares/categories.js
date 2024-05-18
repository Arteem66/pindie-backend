// Файл middlewares/categories.js

// Импортируем модель
const categories = require('../models/category')
const { merge } = require('../routes/auth')

const findAllCategories = async (req, res, next) => {
	// По GET-запросу на эндпоинт /categories найдём все документы категорий
	req.categoriesArray = await categories.find({})
	next()
}

const findCategoryById = async(req,res,next) => {
	try{
		req.category = await categories.findById(req.params.id)
		next()
	}
	catch{
		res.setHeader("Content-Type","application/json")
		res.status(400).send(JSON.stringify({message:"Категория не найдена"}))
	}
}

const createCategory = async(req, res, next) => {
	try{
		req.category = await categories.create(req.body)
		next()
	}catch{
		res.setHeader("Content-Type","application/json")
		res.status(400).send(JSON.stringify({message : "Ошибка создания категории"}))
	}
}

const updateCategory = async(req,res,next) => {
	try{
		req.category = await categories.findByIdAndUpdate(req.params.id, req.body)
		next()
	}
	catch{
		res.status(400).send(JSON.stringify({message:"Ошибка обновления категории"}))
	}
}

const deleteCategory = async(req,res,next) => {
	try{
		req.category = await categories.findByIdAndDelete(req.params.id)
		next()
	}
	catch{
		res.setHeader("Content-Type","application/json")
		res.status(400).send(JSON.stringify({message:"Ошибка удаления категории"}))
	}
}

const checkEmptyName = async(req,res,next) => {
	if (!req.body.name){
		res.setHeader("Content-Type","application/json")
		res.status(400).send(JSON.stringify({message:"Введите название категории"}))
	}else{
		next()
	}
}

const checkIsCategoryExists = (req,res,next) => {
	const isInArray = req.categoriesArray.find((category) => {
		return req.body.name === category.name
	})
	if (isInArray){
		res.setHeader('Content-Type', 'application/json')
		res
			.status(400)
			.send(JSON.stringify({ message: 'Категория с таким названием уже существует' }))
	}else{
		next()
	}
}


// Экспортируем функцию поиска всех категорий
module.exports = {
	findAllCategories,
	findCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
	checkEmptyName,
	checkIsCategoryExists
}
