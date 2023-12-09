import jwt from "jsonwebtoken";
import { UserOperations } from "../model/userModel.js";

export const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const { sub } = jwt.decode(
      token,
      process.env.SECRET_KEY,
      (error, _) => {
        if (error) {
          return res.status(498).json({ message: "Invalid token" });
        }
      }
    );

    const user = await UserOperations.find({ email: sub });

    if (user[0].admin) {
      next();
    } else {
      return res.status(401).json({ message: "You need admin access" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error: " + error.message });
  }
};
