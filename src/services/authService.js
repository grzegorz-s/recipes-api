// TODO add some validation
// import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import usersDB from "../repositories/authRepository";
const { createNewUser } = usersDB;

const userRegister = (req, res) => {
  const {
    username,
    password,
    email
  } = req.body;
  const created_at = new Date().toISOString();

  // TODO check if username is taken
  // TODO check if mail already exist in database
  const saltRounds = 10;  
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

const userLogin = (req, res) => {
  console.log("userLogin");
  res.status(200).json({data: "userLogin"});
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
