// TODO: add some validation
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usersDB from "../repositories/authRepository";
const { createNewUser, getUser } = usersDB;

const saltRounds = 10;
const jwtExpirySeconds = 300;


const hashPassword = (plainTextPassword) => {
  return new Promise((resolve) => {
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

  // TODO: check if username is taken
  // TODO: check if mail already exist in database

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
        // TODO: work on status codes and errors
        throw err;
      });
  };

  addUser();
};

const userLogin = async (req, res) => {
  const {email, password} = req.body;
  const user = await getUser(email);
  if (!user.length) {
    res.status(401).json({success: false, message: "User not found"});
    
    return;
  }

  const {email: dbUser, password: dbPassword} = user[0];
  const passwordMatches = await bcrypt.compare(password, dbPassword);

  if (!passwordMatches) res.status(401).json({success: false, message: "Password does not match"});
  
  const token = jwt.sign({ dbUser }, process.env.JWT_KEY, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds
  });
  
  res.status(200);
  res.json({succes: true, message: "success", token: token});
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
