export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    // const token = () => {
    //   return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    //     expiresIn: process.env.JWT_EXPIRES,
    //   });
    // }
    const options = {
      expiresIn: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, // Set httpOnly to true
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      message,
      token,
    });
  };
  