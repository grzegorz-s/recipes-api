import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  let decodedToken;
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(403).json({success: false, message: "Must be loged in to execute this action"});

  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    res.status(403).json({success: false, message: "Your session is expired. Please login in."});
    return;
  }

  req.user = decodedToken.dbUser;
  next();
};
