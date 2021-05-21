import express from "express"
import { Post } from "../../../models/index.js"

const postsRouter = new express.Router()

postsRouter.get("/:id", async(req, res) => {
  const postId = req.params.id
  const post = await Post.query().findById(postId)
  if(!post){
    res.json({errors: `Could not find post with id: ${postId}`})
    return res.status(404)
  }
  post.user = await post.$relatedQuery("user")
  return res.status(200).json({post: post})
})

export default postsRouter