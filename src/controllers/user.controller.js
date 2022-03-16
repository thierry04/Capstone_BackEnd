import { response } from "express";
import userModels from "../models/article.models";
import User from "../models/user.models";

export const createUser = async (req, res) => {
    const data = {
        ...req.body
    };
    console.log(req.body);
    if (req.body === undefined) return res.status(404).json({ message: "data not found" })
    const createdUser = await User.create(data);
    console.log(createdUser, '====');
    return res.status(200).json({ message: "successfully created a user", createdUser })
}

export const findUser = async(req,res)=>{
    
    try
    {
        const foundUser = await User.find()
        if(!foundUser) return res.status(404).json({message:"user not found"})
        return res.status(200).json({message:"success",foundUser}) 
    }
    catch(error){
        console.log(error)
    }
}

export const findOneUser = async(req,res)=>{
    const _id = req.params.id
    const findOneUser = await User.findOne({_id})
    if(!findOneUser) return res.status(404).json({message:"user not found"})
    return res.status(200).json({message:"success", findOneUser})
}
export const updateUser = async (req,res)=>{
    const _id = req.params.id
    const foundOneUser = await User.findOne({_id})
    if (!foundOneUser) return res.status(404).json({message:"one user not found"})
    const data = { username: req.body.username || foundOneUser.username, email: req.body.email || foundOneUser.email, password: req.body.password || foundOneUser.password }
    const updateOneUser = await User.findOneAndUpdate({_id},data)
    if (!updateOneUser) return res.status(404).json({message:"one user not found"})
    const updated = await User.findOne({ _id })
    return res.status(200).json({ message: "success", updated })
}
export const DeleteUser = async (req, res) => {
    const _id = req.params.id
    const foundOneUser = await User.findOne({ _id })
    if (!foundOneUser) return res.status(404).json({ message: "user not found" })
    await User.findOneAndDelete({ _id })
    return res.status(200).json({ message: "User successfully deleted" })
}
