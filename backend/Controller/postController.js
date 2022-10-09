import post from '../Schema/post.js';
import user from '../Schema/user.js';
import mongoose from 'mongoose';

export const getAllPost = async(req, res, next) =>{
    let allPost;
    try{
        allPost = await post.find().populate('users');
    }
    catch(error){
        return console.log(error)
    }
    if(!allPost){
        return res.status(404).json({message: "no post found"});
    }
    return res.status(200).json({message: "all post", allPost})
}

export const addPost = async(req, res, next) =>{

    const{title, description, imageUrl, price, address, users} = req.body;
    let userExist;
    try{
        userExist = await user.findById(users);
    }
    catch(error){
        console.log(error);
        return res.status(404).json({message: "invalid user"})
    }
    if(!userExist){
        return res.status(404).json({message: "no user found"});
    }
    const newPost  = new post({
        title,
        description,
        imageUrl,
        price,
        users,
        address,
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await newPost.save({session});
        userExist.posts.push(newPost);
        await userExist.save({session});
        await session.commitTransaction();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "could not add"})
    }
    return res.status(201).json({message: "user post created.", newPost})
}

export const updatePost = async(req, res, next) =>{

    const id = req.params.id;
    const { title, description, imageUrl, price, address } = req.body;
    let postUpdate;
    try{
        postUpdate = await post.findByIdAndUpdate(id, {
            title,
            description,
            imageUrl,
            price,
            address,
        });
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message: "bad request"})
    }
    return res.status(200).json({message: "update success", postUpdate})
}

export const getPostById = async(req, res, next) =>{

    const id = req.params.id;
    let postData;
    try{
      // ---------- .populate('users') ---------- can be useful
        postData = await post.findById(id)
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message: "Bad request"})
    }
    if(!postData){
        return res.status(404).json({message: "no post data found"})
    }
    return res.status(200).json({message: "post found", postData});

}

export const deletePostById = async (req, res, next) =>{

    const id = req.params.id;
    let deletePost;
    try{
        deletePost = await post.findByIdAndDelete(id).populate('users');
        await deletePost.users.posts.pull(deletePost);
        await deletePost.users.save();
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:"bad request"});
    }
    if(!deletePost){
        return res.status(404).json({message: "no post found"});
    }
    return res.status(200).json({message: "delete success", deletePost});
}

export const getUserById = async(req, res, next) =>{
    const id = req.params.id;
    let userDetails;
    try{
        userDetails = await user.findById(id).populate('posts');
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message: "bad request"});
    }
    if(!userDetails){
        return res.status(404).json({ message: "user details not found" });
    }
    return res.status(200).json({message: "details found", userDetails});
}