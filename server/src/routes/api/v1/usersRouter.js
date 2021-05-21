import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/:id", async(req, res) => {
  const userId = req.params.id
  const user = await User.query().findById(userId)
  if(!user){
    res.json({errors: `Could not find user with id: ${userId}`})
    return res.status(404)
  }
  user.posts = await user.$relatedQuery("posts")
  return res.status(200).json({user: user})
})

export default usersRouter;
