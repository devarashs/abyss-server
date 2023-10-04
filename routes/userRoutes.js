import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          abyssBalance: user.abyssBalance,
          isCreator: user.isCreator,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isCreator: user.isCreator,
      abyssBalance: 1024,
      token: generateToken(user),
    });
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@chill-hub.net") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await user.deleteOne({ _id: user._id });
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/profile/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await User.findById(req.user._id);
    if (user.email === "admin@chill-hub.net") {
      res.status(666).send({
        message: "You Cant Change The MotherShip Email Address : ) </3",
      });
    } else if (user) {
      if (req.body.type === "email") user.email = req.body.value;
      if (req.body.type === "password")
        user.password = bcrypt.hashSync(req.body.value, 8);
      if (req.body.type === "name") user.name = req.body.value;

      const updatedUser = await user.save();
      res.send({
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        abyssBalance: user.abyssBalance,
        isCreator: user.isCreator,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

export default userRouter;
