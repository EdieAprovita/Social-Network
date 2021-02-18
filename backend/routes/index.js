const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	try {
		res.status(200).json({ message: 'API running succesfully!!' })
	} catch (error) {
		res.status(400).json({ message: `${error}` })
	}
})

module.exports = router
