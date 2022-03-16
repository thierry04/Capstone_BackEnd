import joi from "joi";

export const createCommentSchema = joi.object().keys({
    username: joi.string().required().min(3),
    comment: joi.string().required().min(0),
});

export const updateCommentSchema = joi.object().keys({
    username: joi.string().required().min(3),
    comment: joi.string().required().min(0),
});