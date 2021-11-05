import express, { Request, Response } from "express";
import { Order, OrderProduct, OrderStore } from "../models/order";
import verifyAuthToken from "../middleware/verifyAuthToken";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.body.userId);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status as string,
      userId: (req.body.userId as unknown) as number,
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderProduct: OrderProduct = {
    quantity: (req.body.quantity as unknown) as number,
    orderId: (req.body.orderId as unknown) as number,
    productId: (req.body.productId as unknown) as number,
  };

  try {
    const addedProduct = await store.addProduct(orderProduct);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    await store.delete(req.body.orderId as string);
    res.json({ status: "success" });
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:userId", show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/products", verifyAuthToken, addProduct);
  app.delete("/orders", verifyAuthToken, destroy);
};

export default orderRoutes;
