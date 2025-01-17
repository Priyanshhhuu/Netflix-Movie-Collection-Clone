import express from "express";
import { Login, Logout, signUp } from "../controller/userController.js";

const authRoute = express.Router();

authRoute.route("/signup").post(signUp);

authRoute.route("/login").post(Login);

authRoute.route("/logout").post(Logout);

export default authRoute;
