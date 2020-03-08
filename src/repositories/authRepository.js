import db from "./dbConnect";

const createNewUser = (newUser) => {
  const { username, email, password, created_at } = newUser;

  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, $4)",
      [ username, email, password, created_at ],
      (error) => {
        if (error) {
          reject(error);
          // resolve({status: "error", message: error});
        }

        resolve({ status: "success", message: `${username}, you can log in now.` });
      }
    );
  });
};

export default {
  createNewUser
};
