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
  const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
  const pepperedPassword = `${req.headers.password}${BCRYPT_PEPPER}`;
  const hashPassword = bcrypt.hashSync(pepperedPassword, salt);

  try {
    const user: User = {
      firstname: req.headers.firstname as string,
      lastname: req.headers.lastname as string,
      username: req.headers.username as string,
      password: hashPassword as string,
    };

    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const foundUser = await store.login(req.headers.username as string);
    if (!foundUser) {
      return res.status(400).send("Username is wrong");
    }

    const pepperedPassword = `${req.headers.password}${BCRYPT_PEPPER}`;
    const validPassword = bcrypt.compareSync(
      pepperedPassword,
      foundUser.password
    );
    if (!validPassword) {
      return res.status(400).send("Password is wrong");
    }

    const token = jwt.sign(
      { username: foundUser.username },
      BCRYPT_TOKEN_SECRET as string
    );
    res.header("auth-token", token).send({ token });
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
  app.post("/users/register", register);
  app.post("/users/login", login);
};

export default userRoutes;
