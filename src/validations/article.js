import joi from "joi";

export const createArticleSchema = joi.object().keys({
  title: joi.string().required().min(3),
  content: joi.string().required().min(6),
});

export const updateArticleSchema = joi.object().keys({
  title: joi.string().required().min(3),
  content: joi.string().required().min(6),
});
