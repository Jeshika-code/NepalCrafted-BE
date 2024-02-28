const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Calculate expiration time for the cookie
  const expiresIn = process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000; // Convert days to milliseconds

  // Options for the cookie
  const options = {
    expires: new Date(Date.now() + expiresIn),
  
  };

  // Set the token in the cookie and send it back in the response
  res.status(statusCode)
     .cookie("token", token, options,{ sameSite: 'None', secure: true })
     .json({
       success: true,
       user,
       token,
     });
};

module.exports = sendToken;
