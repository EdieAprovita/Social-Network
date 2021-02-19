const router = require('express').Router()
const protect = require('../middlewares/authMiddleware')

const {
	getAllProfiles,
	getProfile,
	getProfileById,
	updateProfile,
	deleteProfile,
	addProfileExperience,
	addProfileEducation,
	deleteEducation,
	deleteProfileExperience,
	githubProfile,
} = require('../controllers/profileControllers')

router.get('/profiles/me', (protect, getProfile))
router.get('/profiles')
