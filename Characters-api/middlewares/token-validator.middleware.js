import { verifyAccessToken } from "../const/jwt.const.js";
import { AuthModel } from "../models/auth.models.js";

export const tokenValidator = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) throw new Error();

    const token = authorizationHeader.split(" ")[1];

    const { userId } = verifyAccessToken(token);

    console.log(userId);

    await AuthModel.getUserById(userId);
    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};
