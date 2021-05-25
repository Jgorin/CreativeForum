import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import multer from "multer"
import S3Wrapper from "../../services/S3Wrapper.js"

const usersRouter = new express.Router();
let upload = multer();

usersRouter.post("/", upload.single('file'), async(req, res) => {
  const { email, password, passwordConfirmation, fileName, username } = req.body;
  try {
    const file = req.file
    const s3FileName = `users/${username}/profile_pictures/${fileName}`
    const response = await S3Wrapper.upload(file, s3FileName)
    const avatar = JSON.stringify(response)
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

usersRouter.patch("/:id/backdrop", upload.single('file'), async(req, res) => {
  const { fileName } = req.body

  try{
    const file = req.file
    const user = await User.query().findById(req.params.id)
    if(user.backdrop != null){
      S3Wrapper.delete(user.backdrop.Key)
    }
    const response = await S3Wrapper.upload(file, `users/${user.username}/backdrops/${fileName}`)
    const backdrop = JSON.stringify(response)
    const updatedUser = await user.$query().patchAndFetchById(user.id, { backdrop: backdrop })
    return res.status(201).json({ backdrop: response })
  }
  catch(error){
    return res.status(400).json({ errors: error })
  }
})

export default usersRouter;
