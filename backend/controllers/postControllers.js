const express = require('express')
const axios = require('axios')
const asyncHandler = require('express-async-handler')

const Post = require('../models/Post')
const User = require('../models/User')

// @desc Create a post
// @route POST /api/posts
// @access Private

exports.createPost = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findById(id)

		const newPost = new Post({
			text: req.body.text,
			username: user.username,
			avatar: user.avatar,
			user: req.user.id,
		})

		const post = await newPost.save('Post created')

		res.status(200).json(post)
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})

// @desc Get All Posts
// @route GET /api/posts
// @access Private

exports.getAllPosts = asyncHandler(async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 })
		res.status(200).json({ posts })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})

// @desc Get Post By Id
// @route GET /api/posts/:id
// @access Private

exports.getPostById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params
		const post = await Post.findById(id)

		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
			return res.status(404).json({ message: 'Sorry there is not a post found' })
		}

		res.status(200).json(post)
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})

// @desc Delete a Post By Id
// @route DELETE /api/posts/:id
// @access Private

exports.deletePostById = asyncHandler(async (req, res) => {
	try {
		const { id } = req.params
		const post = await Post.findById(id)

		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
			return res.status(404).json({ message: 'Sorry there is not a post found' })
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ message: 'User not authorized!!' })
		}

		await post.remove()
		res.status(200).json({ message: 'Deleted post' })
	} catch (error) {
		res.status(400).json({ message: `${error}`.red })
	}
})
