// Создаём роут для запросов категорий
const categoriesRouter = require('express').Router()
const { checkAuth } = require('../middlewares/auth.js')

// Импортируем вспомогательные функции
const {findAllCategories, createCategory, findCategoryById, updateCategory, deleteCategory, checkIsCategoryExists, checkEmptyName } = require('../middlewares/categories')
const {sendAllCategories, sendCategoriesCreated, sendCategoriesById, sendCategoryUpdated, sendCategoryDeleted} = require('../controllers/categories')

// Обрабатываем GET-запрос с роутом '/categories'
categoriesRouter.delete('/categories/:id', checkAuth, deleteCategory, sendCategoryDeleted)
categoriesRouter.put(
	'/categories/:id',
	checkEmptyName,
	checkAuth,
	updateCategory,
	sendCategoryUpdated
) 
categoriesRouter.post(
	'/categories',
	findAllCategories,
	checkIsCategoryExists,
	checkEmptyName,
	checkAuth,
	createCategory,
	sendCategoriesCreated
)
categoriesRouter.post('/categories/:id',findCategoryById, sendCategoriesById )
categoriesRouter.get('/categories', findAllCategories, sendAllCategories)

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter
