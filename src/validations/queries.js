import joi from "joi";

// eslint-disable-next-line import/prefer-default-export
export const CreateQueriesSchema = joi.object().keys({
  guestName: joi.string().required().min(3),
  email: joi
    .string()
    .required()
    .min(5)
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email"
    ),
  message: joi.string().required().min(6),
});
