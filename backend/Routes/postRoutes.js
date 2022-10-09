import express from 'express';
import { addPost, deletePostById, getAllPost, getPostById, getUserById, updatePost } from '../Controller/postController.js';

const postRouter = express.Router();

postRouter.get("/", getAllPost);
postRouter.post("/add", addPost);
postRouter.patch("/update/:id", updatePost);
postRouter.get("/:id", getPostById);
postRouter.delete("/:id", deletePostById);
postRouter.get("/user/:id", getUserById);


export default postRouter;