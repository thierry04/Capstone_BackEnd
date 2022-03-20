import bcryptjs, {genSalt} from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.models";
import {validate, userValidation} from "../validations/index"

export const createUser = async (req, res) => {
    const{email} = req.body;
    const foundEmail = await User.findOne({email})
    if(foundEmail) return res.status(400).json({message:"email already exists"})
    const data = {
        ...req.body
    };
    const {details: errors} = validate(userValidation.CreateSchema, data)
    if(errors)return res.status(400).json({message:`please provide ${errors[0].context.key}`})
    if (req.body === undefined) return res.status(404).json({ message: "data not found" })
    const salt = await genSalt(5);
    const hash = await bcryptjs.hash(data.password, salt);
    // const hash = await encryptPassword(data.password)
    const createdUser = await User.create({
        ...data,
        password:hash
    });
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
    try {
        const _id = req.params.id
        const findOneUser = await User.findOne({ _id })
        if (!findOneUser)
            return res.status(404).json({message:"Profile does not exist"});
        const data = { ...req.body };
        const { details: errors } = validate(userValidate.UpdateSchema, data);
        if(errors) return res.status(400).json({message:`please provide ${errors[0].context.key}`})
        const salt= await genSalt(5);
        const hash = await bcryptjs.hash(data.password, salt);
        const dataUpdate = {
            userName: data.userName || findOneUser.userName,
            email: findOneUser.email,
            password: hash || findOneUser.password,
        };
        const updateProfile = await updatedProfile(
            { id: req.params.id },
            dataUpdate
        );
        return Response.success(
            res,
            200,
            'your profile has been updated successfully',
            updateProfile
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"internal server error"});
    }
}

export const DeleteUser = async (req, res) => {
    const _id = req.params.id
    const foundOneUser = await User.findOne({ _id })
    if (!foundOneUser) return res.status(404).json({ message: "user not found" })
    await User.findOneAndDelete({ _id })
    return res.status(200).json({ message: "User successfully deleted" })

}

export const login = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(400).json({message:"email has not bee signedup"});
    const { details: errors } = validate(userValidation.LoginSchema, req.body)
    if (errors) return res.status(400).json({ message: `please provide ${errors[0].context.key}` })
    const validPass = await bcryptjs.compare(password, user.password);
    if(!validPass)return res.status(400).json({mesage:"invalid password"})
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({message:"logged in successfuly",user, token})
}
