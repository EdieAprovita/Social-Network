const router = require('express').Router()
const protect = require('../middlewares/authMiddleware')

const {
	createPost,
	getAllPosts,
	getPostById,
	deletePostById,
	likePost,
	unlikePost,
	commentPost,
	deleteCommentPost,
} = require('../controllers/postControllers')

//POST ROUTES

router.post('/create', (protect, createPost))
router.post('/comment/:id', (protect, commentPost))
router.get('/all', (protect, getAllPosts))
router.get('/:id', (protect, getPostById))
router.put('/like/:id', (protect, likePost))
router.put('/unlike/:id', (protect, unlikePost))
router.delete('/:id', (protect, deletePostById))
router.delete('/comment/:id/:comment_id', (protect, deleteCommentPost))

module.exports = router
