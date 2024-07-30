import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  try {
    var decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
  } catch(err) {
    // err
    console.log(err)
  }
  // const decoded = jwt.verify(token, "MYSECRET");
  // console.log(decoded)
  req.user = await User.findById(decoded.id);

  next();
});
