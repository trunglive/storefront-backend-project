import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, UserStore } from "../models/user";

dotenv.config();

const { TOKEN_SECRET } = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.body.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    jwt.verify(token, TOKEN_SECRET);
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }

  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
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
    const decoded = jwt.verify(token, TOKEN_SECRET);

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
  app.post("/users", verifyAuthToken, create);
};

export default userRoutes;
