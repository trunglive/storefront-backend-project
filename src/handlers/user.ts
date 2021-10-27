import express, { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, UserStore } from "../models/user";

dotenv.config();

const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, BCRYPT_TOKEN_SECRET } = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.body.id);
  res.json(user);
};

const register = async (req: Request, res: Response) => {
  // @ts-ignore
  const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS));
  const hashPassword = bcrypt.hashSync(req.body.password + BCRYPT_PEPPER, salt);

  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashPassword,
    };

    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const decoded = jwt.verify(token, BCRYPT_TOKEN_SECRET);

    next();
  } catch (error) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", register);
};

export default userRoutes;
