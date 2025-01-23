import express from "express";
import {
  authCheck,
  Login,
  Logout,
  signUp,
} from "../controller/userController.js";
import { protectRoute } from "../middleware/protectRoute.js";
const authRoute = express.Router();

authRoute.route("/signup").post(signUp);

authRoute.route("/login").post(Login);

authRoute.route("/logout").post(Logout);
authRoute.route("/authCheck").get(protectRoute, authCheck);

export default authRoute;
