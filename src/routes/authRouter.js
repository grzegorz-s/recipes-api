
import { Router } from "express";
import authService from "../services/authService";

const authRouter = new Router();

authRouter.get("/register", authService.userRegister);
authRouter.get("/login", authService.userLogin);
authRouter.get("/logout", authService.userLogout);
authRouter.get("/reset-password", authService.userResetPassword);


export default authRouter;