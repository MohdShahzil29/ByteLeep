import express from "express";
import { userLogin, userRegister } from "../controller/user.controller.js";
import { authenticateUser, isAdmin } from "../middlewares/Auth.js";

const app = express.Router();

app.post("/register", userRegister);
app.post("/login", userLogin);
//protected User route auth
app.get("/user-auth", authenticateUser, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
app.get("/admin-auth", authenticateUser, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default app;
