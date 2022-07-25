import {Router, Request, Response} from "express"
import { User } from "../models";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

const router = Router()

// authenticate user and send JWT Token
router.post("/", async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email })
  console.log(req.body, user != null, bcrypt.compareSync(req.body.password, user.passwordDigest))
  if (
    !user ||
    !(bcrypt.compareSync(req.body.password, user.passwordDigest))
  ) {
    res.status(404).json({
      error: `Could not find a user with the provided email and password`,
    });
  } else {
    const result = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.send(result);
  }
});

// Get user data
router.get("/profile", async (req: Request, res: Response) => {
  try {
    console.log("Get user info")
    const user = await User.findById(req.currentUser._id)
      .populate("characters")
      .populate("campaigns")
    res.json(user)
  } catch (err) {
    res.json({message: 'The server ran into an error'})
  }
  
});

export default router;
