import joi from "joi";

// eslint-disable-next-line import/prefer-default-export
export const commentSchema = joi.object().keys({
  name: joi.string().required().min(3),
  comment: joi.string().required().min(6),
});
