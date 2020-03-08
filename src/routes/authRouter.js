import { Router } from "express";
import authService from "../services/authService";

const authRouter = new Router();

authRouter.post("/register", authService.userRegister);
authRouter.post("/login", authService.userLogin);
authRouter.post("/logout", authService.userLogout);
authRouter.post("/reset-password", authService.userResetPassword);


export default authRouter;