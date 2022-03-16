import Query from "../models/query.model";
import { validate, queryValidation } from "../validations"

export const createQuery = async (req, res) => {
    const data = {
        ...req.body
    };
    const { details: errors } = validate(queryValidation.CreateQueriesSchema, req.body)
    if (errors) return res.status(400).json({ message: `please provide ${errors[0].context.key}` })
    if (req.body === undefined) return res.status(404).json({ message: "data not found" })
    const createdArticle = await Query.create(data);
    if(!createdArticle.name) return res.status(400).json({message:"it does not work"})
    console.log(createdArticle, '====');
    return res.status(200).json({ message: "successfully created an query", createdArticle })
}
export const findAllQueries = async(req,res)=>{
    const foundQuery = await Query.find()
    if (!foundQuery) return res.status(404).json({ message: "query not found" })
    return res.status(200).json({ message: "success", foundQuery })
}

export const findOneQuery = async(req, res)=>{
    const _id = req.params.id
    const findOneQuery = await Query.findOne({ _id })
    if (!findOneQuery) return res.status(404).json({ message: "one query not found" })
    return res.status(200).json({ message: "success", findOneQuery })
}

export const updateQuery = async(req, res)=>{
    const _id = req.params.id
    const foundOneQuery = await Query.findOne({ _id })
    if (!foundOneQuery) return res.status(404).json({ message: "one query not found" })
    const data = { name: req.body.name || foundOneQuery.name, phone: req.body.phone || foundOneQuery.phone, query:req.body.query || foundOneQuery.query, email:req.body.email || foundOneQuery.email }
    const { details: errors } = validate(queryValidation.CreateQueriesSchema, req.body)
    if (errors) return res.status(400).json({ message: `please provide ${errors[0].context.key}` })
    const updateOneQuery = await Query.findOneAndUpdate({ _id }, data)
    if (!updateOneQuery) return res.status(404).json({ message: "one query not found" })
    const updated = await Query.findOne({ _id })
    return res.status(200).json({ message: "success", updated })
}

export const deleteQuery = async(req,res)=>{
    const _id = req.params.id
    const foundOneQuery = await Query.findOne({ _id })
    if (!foundOneQuery) return res.status(404).json({ message: "one query not found" })
    await Query.findOneAndDelete({ _id })
    return res.status(200).json({ message: "query successfully deleted" })
}