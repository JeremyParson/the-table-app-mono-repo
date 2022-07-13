import { Router, Request, Response } from "express";
import { User } from "../models";
import { Error } from "mongoose";
import * as bcrypt from "bcrypt";

const router = Router();

// Get basic user info
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    const {username} = user
    res.json({username}).status(200);
  } catch (err) {
    res.status(500);
  }
});

// Index all users of admins only
router.get("/", async (req: Request, res: Response) => {
  try {
    if (!req.currentUser || req.currentUser.role !== "admin") {
      return res
        .status(404)
        .json({ message: "Only admins can access this route." });
    }

    const users = await User.find();
    res.json(users).status(200);
  } catch (err) {
    res.status(500);
  }
});

// Register a new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const passwordDigest = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
      ...req.body,
      passwordDigest,
      role: "user",
    });
    user.save();
    res.json(user).status(200);
    console.log("Account created")
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      res.json({ message: "validation failed" }).status(400);
    }
    res.status(500).json({ message: "The server ran into an error." });
    console.log("Account creation failed")
  }
});

// Authentication
router.use((req, res, next) => {
  if (!req.currentUser) {
    res.status(400).send({ error: "You must be logged in" });
    return;
  }
  next();
});

// Authorization
router.use("/:id", async (req, res, next) => {
  if (req.currentUser.role != 'admin') {
    res.status(400).send({ error: "You cannot access this resource" });
    return;
  }
  next();
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({message: 'User deleted'}).status(200);
    } catch (err) {
        res.json({ message: "The server ran into an error" }).status(400);
    }
})

export default router;
