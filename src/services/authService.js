// TODO add some validation
// import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usersDB from "../repositories/authRepository";
const { createNewUser, getUser } = usersDB;

const saltRounds = 10;
const jwtKey = "secret_jwt_key_stored_in_env";
const jwtExpirySeconds = 300;


const hashPassword = (plainTextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        console.log(`Salt: ${salt}`);
  
        return bcrypt.hash(plainTextPassword, salt);
      })
      .then(hash => {
        console.log(`Hash: ${hash}`);

        resolve(hash);
      })
      .catch(err => console.error(err.message));
  });
};

const userRegister = (req, res) => {
  const {
    username,
    password,
    email
  } = req.body;
  const created_at = new Date().toISOString();

  // TODO check if username is taken
  // TODO check if mail already exist in database

  const addUser = async () => {
    const hashedPassword = await hashPassword(password);
    
    const newUser = {
      username,
      email,
      password: hashedPassword,
      created_at
    };
    
    return createNewUser(newUser)
      .then(response => res.status(200).json(response))
      .catch((err) => {
        // TODO work on status codes and errors
        throw err;
      });
  };

  addUser();
};

const userLogin = async (req, res) => {
  const {email, password} = req.body;
  const user = await getUser(email);
  if (!user.length) res.status(401).json({success: false, message: "User not found"});

  const {email: dbUser, password: dbPassword} = user[0];
  const passwordMatches = await bcrypt.compare(password, dbPassword);

  if (!passwordMatches) res.status(401).json({success: false, message: "Passwords do not match"});
  
  // Create JWT toke
  const token = jwt.sign({ dbUser }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds
  });
  
  // res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
  res.status(200);
  res.json({succes: true, message: "success", token: token});
  // set the cookie as the token string, with a similar max age as the token
  // here, the max age is in milliseconds, so we multiply by 1000
  
  return res;
};

const userLogout = (req, res) => {
  console.log("userLogout");
  res.status(200).json({data: "userLogout"});
};

const userResetPassword = (req, res) => {
  console.log("userResetPassword");
  res.status(200).json({data: "userResetPassword"});
};


export default {
  userRegister,
  userLogin,
  userLogout,
  userResetPassword,
};
