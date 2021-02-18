const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/User')
const normalize = require('normalize-url')
const gravatar = require('gravatar')

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public

exports.authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			username: user.username,
			email: user.email,
			avatar: user.avatar,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error('Invalid email or password')
	}
})

// @desc Register a new user
// @route POST /api/users/signup
// @access Public

exports.registerUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body

	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400).json({ message: 'This user already exists' })
	}

	const avatar = normalize(
		gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm',
		}),
		{ forceHttps: true }
	)

	const user = await User.create({
		username,
		email,
		password,
		avatar,
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			avatar: user.avatar,
			token: generateToken(user._id),
		})
	} else {
		res.status(400).json({ message: 'Invalid user data' })
	}
})
