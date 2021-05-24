import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import multer from "multer"
import S3Wrapper from "../../services/S3Wrapper.js"
//server/src/routes/services/S3Wrapper.js

const usersRouter = new express.Router();
let upload = multer();

usersRouter.post("/", upload.single('file'), async(req, res) => {
  const { email, password, passwordConfirmation, fileName, username } = req.body;
  try {
    const file = req.file
    const response = await S3Wrapper.upload(file, fileName)
    const avatar = response.Location
    const persistedUser = await User.query().insertAndFetch({ username, email, password, avatar });
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
