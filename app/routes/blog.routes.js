const express = require("express");
const db = require("../models");
const User = db.user;
const Blog = db.blog;
const blogRoute = express.Router();

blogRoute.get("/", async (req, res, next) => {
    let blogs = await Blog.findAll();
    return res.json(blogs);
})

blogRoute.get("/:id", async (req, res, next) => {
    let blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        return res.send({
            message: "Blog was not found!"
        });
    }
    return res.json(blog);
})

blogRoute.post("/", async (req, res, next) => {
    try {
        let user = await User.findByPk(2);

        const blog = await Blog.create({
            userId: user.id,
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        });

        return res.json(blog);
    } catch (error) {
        console.error(error)
        return res.status(500).send();
    }
})

blogRoute.put("/:id", async (req, res, next) => {
    let blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        return res.send({
            message: "Blog was not found!"
        });
    }

    let user = await User.findByPk(2);

    blog.update({
        userId: user.id,
        title: req.body.title,
        content: req.body.content,
        category: req.body.category
    });

    return res.json(blog);
})

blogRoute.delete("/:id", async (req, res, next) => {
    let blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        return res.send({
            message: "Blog was not found!"
        });
    }
    blog.destroy();
    return res.send({
        message: "Blog was deleted successfully!"
    });
})


module.exports = blogRoute;