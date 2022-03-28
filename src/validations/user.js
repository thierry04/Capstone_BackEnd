import joi from "joi";

export const CreateSchema = joi.object().keys({
  userName: joi.string().required().min(3),
  email: joi
    .string()
    .required()
    .min(5)
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email"
    ),
  password: joi
    .string()
    .required()
    .min(6)
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, "password"),
});

export const UpdateSchema = joi.object().keys({
  userName: joi.string().min(3),
  email: joi
    .string()
    .required()
    .min(5)
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email"
    ),
  password: joi
    .string()
    .required()
    .min(6)
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, "password"),
});

export const LoginSchema = joi.object().keys({
  email: joi
    .string()
    .required()
    .min(5)
    .pattern(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email"
    ),
  password: joi
    .string()
    .required()
    .min(6)
    .pattern(/^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/, "password"),
});
