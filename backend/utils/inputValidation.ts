import Joi from "joi";

// --- ID and Date Schemas (Consolidated) ---

const idValidation = Joi.number().integer().positive().required();
const dateOptionalValidation = Joi.date();
const dateRequiredValidation = Joi.date().required();

const usernameValidation = Joi.string().alphanum().min(3).max(20).required();
const emailValidation = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: false },
  })
  .min(5)
  .max(255)
  .required();

const passwordValidation = Joi.string().min(8).max(255).required();

const nameValidation = Joi.string().min(2).max(100).required();

const titleValidation = Joi.string().min(1).max(100).required();

const postContentValidation = Joi.string().min(1).max(1000);

const commentReplyContentValidation = Joi.string().min(1).max(500).required();

const mediaUrlValidation = Joi.string().uri().max(2048).required();

const mediaPathValidation = Joi.string().max(2048).required();

const createUserSchema = Joi.object({
  name: nameValidation.label("Name"),
  username: usernameValidation.label("Username"),
  email: emailValidation.label("Email"),
  password: passwordValidation.label("Password"),
});

export {
  idValidation,
  dateOptionalValidation,
  dateRequiredValidation,
  usernameValidation,
  emailValidation,
  passwordValidation,
  nameValidation,
  titleValidation,
  postContentValidation,
  commentReplyContentValidation,
  mediaUrlValidation,
  mediaPathValidation,
  createUserSchema,
};
