const axios = require('axios')
const asyncHandler = require('express-async-handler')
const normalize = require('normalize-url')
const axios = require('axios')

const Post = require('../models/Post')
const User = require('../models/User')
const Profile = require('../models/Profile')

// @desc Get current users profile
// @route GET /api/profile/me
// @access Private

exports.getProfile = asyncHandler(async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		})

		if (!profile) {
			return res.status(400).json({ message: 'There is no profile for this user' })
		}

		res.status(200).json(profile.populate('User', ['username', 'avatar']))
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})

// @desc Create or update user profile
// @route POST /api/profile
// @access Private

exports.updateProfile = asyncHandler(async (req, res) => {
	const {
		company,
		location,
		website,
		bio,
		skills,
		status,
		githubusername,
		youtube,
		twitter,
		instagram,
		linkedin,
		facebook,
	} = req.body

	const profileFields = {
		user: req.user.id,
		company,
		location,
		website: website === '' ? '' : normalize(website, { forceHttps: true }),
		bio,
		skills: Array.isArray(skills)
			? skills
			: skills.split(',').map(skill => ' ' + skill.trim()),
		status,
		githubusername,
	}

	const socialFields = {
		youtube,
		twitter,
		instagram,
		linkedin,
		facebook,
	}

	for (const [key, value] of Object.entries(socialFields)) {
		if (value && value.length > 0)
			socialFields[key] = normalize(value, { forceHttps: true })
	}
	profileFields.social = socialFields

	try {
		let profile = await Profile.findOneAndUpdate(
			{ user: req.user.id },
			{ $set: profileFields },
			{ new: true, upsert: true }
		)

		res.status(200).json(profile)
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})

// @desc Get all profiles
// @route GET /api/profile
// @access Public

exports.getAllProfiles = asyncHandler(async (req, res) => {
	try {
		const profiles = await Profile.find().populate('User', ['username', 'avatar'])
		res.status(200).json(profiles)
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})

// @desc Get  profile by Id
// @route GET /api/profile/user/:user_id
// @access Public

exports.getProfileById = asyncHandler(async(req,res) => {
    try {
        const profile = await Profile.findOne({
            user:req.params.user_id,
        }).populate("User", ["username","avatar"])

        if(!profile) 
        return res.status(400).json({message: "Profile not found!"})
    } catch (error) {
        
    }
})