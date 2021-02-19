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

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private

exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
		})
	} else {
		res.status(404)
		throw new Error({ message: `User not found ${Error}`.red })
	}
})

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private

exports.updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.username = req.body.username || user.username
		user.email = req.body.email || user.email

		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.status(200).json({
			_id: updatedUser._id,
			username: updatedUser.username,
			email: updatedUser.email,
			token: generateToken(updatedUser._id),
		})
	} else {
		res.status(404)
		throw new Error({ message: `User not found ${Error}`.red })
	}
})

// @desc    Delete user
// @route   DELETE /api/auth/:id
// @access  Private/Admin

exports.deleteUserProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id)

		if (user) {
			await user.remove()
			res.status(200).json({ message: 'User removed' })
		}
	} catch (error) {
		res.status(404).json({ message: `${error}`.red })
	}
})
