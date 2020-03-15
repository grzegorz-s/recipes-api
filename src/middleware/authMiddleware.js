import jwt from "jsonwebtoken";
const jwtKey = "secret_jwt_key_stored_in_env";

export const isAuthenticated = (req, res, next) => {
  // TODO create function and move as middleware
  // save decoded user to express-session?
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) return res.status(403).json({success: false, message: "Must be loged in to execute this action"});
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtKey);
  } catch (error) {
    res.status(403).json({success: false, message: "Your session is expired. Please login in."});
    return;
  }

  next();

  console.log({decodedToken});
};