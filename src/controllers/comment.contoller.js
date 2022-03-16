import Comment from "../models/comment.models";
import { validate, commentValidation } from "../validations"

export const createComment = async (req, res) => {
    const data = {
        
        ...req.body
    };
    console.log(data);
    const { details: errors } = validate(commentValidation.createCommentSchema, req.body)
    if (errors) return res.status(400).json({ message: `please provide ${errors[0].context.key}` })
    if (req.body === undefined) return res.status(404).json({ message: "data not found" })
    const createdComment = await Comment.create(req.body);
    return res.status(200).json({ message: "successfully created a comment", createdComment })
}
export const findAllComments = async (req, res) => {
    const foundComment = await Comment.find()
    if (!foundComment) return res.status(404).json({ message: "comment not found" })
    return res.status(200).json({ message: "success", foundComment })
}

