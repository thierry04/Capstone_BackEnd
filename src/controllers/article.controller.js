import { response } from "express";
import articleModels from "../models/article.models";
import Article from "../models/article.models";

export const createArticle =async(req, res)=>{
    const data = {
        ...req.body
    };
    console.log(req.body);
    if(req.body === undefined) return res.status(404).json({message:"data not found"})
    const createdArticle = await Article.create(data);
    console.log(createdArticle,'====');
    return res.status(200).json({message:"successfully created an article", createdArticle})
}

export const findArticle = async(req, res)=>{
    const foundArticle = await Article.find()
    if (!foundArticle) return res.status(404).json({message:"article not found"})
    return res.status(200).json({message:"success",foundArticle})
}

export const findOneArticle = async(req, res)=>{
    const _id = req.params.id
    const findOneArticle = await Article.findOne({_id})
    if(!findOneArticle) return res.status(404).json({message:"one article not found"})
    return res.status(200).json({message:"success",findOneArticle})
}

export const UpdateArticle = async (req, res) => {
    const _id = req.params.id
    const foundOneArticle = await Article.findOne({ _id })
    if (!foundOneArticle) return res.status(404).json({ message: "one article not found" })
    const data = {title:req.body.title || foundOneArticle.title, content:req.body.content || foundOneArticle.content}
    const updateOneArticle = await Article.findOneAndUpdate({ _id },data)
    if (!updateOneArticle) return res.status(404).json({ message: "one article not found" })
    const updated = await Article.findOne({_id})
    return res.status(200).json({ message: "success", updated})
}

export const DeleteArticle = async (req, res) => {
    const _id = req.params.id
    const foundOneArticle = await Article.findOne({ _id })
    if (!foundOneArticle) return res.status(404).json({ message: "one article not found" })
    await Article.findOneAndDelete({ _id})
    return res.status(200).json({ message: "Article successfully deleted" })
}

