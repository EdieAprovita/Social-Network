const router = require('express').Router()
const { protect, checkObjectId } = require('../middlewares/authMiddleware')

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

router.get('/me', (protect, getProfile))
router.get('/all', getAllProfiles)
router.get('/user/:user_id', (checkObjectId, getProfileById))
router.get('/github/:username', githubProfile)
router.post('/create', (protect, updateProfile))
router.put('/experience', (protect, addProfileExperience))
router.put('/education', (protect, addProfileEducation))
router.delete('/delete', (protect, deleteProfile))
router.delete('/experience/_exp_id', (protect, deleteProfileExperience))
router.delete('/education/:edu_id', (protect, deleteEducation))

module.exports = router
