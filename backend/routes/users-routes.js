const authroutes = require('express').Router()
const protect = require('../middlewares/authMiddleware')

const {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
} = require('../controllers/userControllers')

//AUTH ROUTES

authroutes.post('/signup', registerUser)
authroutes.post('/login', authUser)
authroutes.get('/profile', (protect, getUserProfile))
authroutes.put('/profile/update', (protect, updateUserProfile))
authroutes.delete('/profile/:id', (protect, deleteUserProfile))

module.exports = authroutes
