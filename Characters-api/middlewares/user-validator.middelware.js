import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export const userValidator = (req, res, next) => {
  const userData = req.body;

  const { error } = userSchema.validate(userData);

  if (error) return res.status(400).json({ msg: error.details[0].message });

  next();
};
