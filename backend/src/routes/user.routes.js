import express from "express";
import { userLogin, userRegister } from "../controller/user.controller.js";

const app = express.Router();

app.post("/register", userRegister);
app.post("/login", userLogin);

export default app;
