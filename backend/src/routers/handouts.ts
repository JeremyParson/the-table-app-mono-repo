import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import {Handout, Campaign} from "../models";

const handouts = Router();

// Returns a list of all handouts
handouts.get("/", async (req: Request, res: Response) => {
  try {
    const handouts = await Handout.find();
    res.status(200).send(handouts);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Returns specific handout of ID
handouts.get("/:id", async (req: Request, res: Response) => {
  try {
    const handout = await Handout.findById(req.params.id);
    res.status(200).send(handout);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Authentication
handouts.use((req, res, next) => {
  if (!req.currentUser) {
    res.status(400).send({ error: "You must be logged in" });
    return
  }
  next();
})

// Create a new handout
handouts.post("/:id", async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) return res.status(400).json({error: "The campaign does not exist"})
    if (!campaign.creator.equals(req.currentUser._id)) return res.status(400).json({error: "You cannot access this resource"})
    const handout = await Handout.create({
      ...req.body,
      campaign: req.params.id,
      creator: req.currentUser._id
    });
    res.status(201).send(handout);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Authorization
handouts.use("/:id", async (req, res, next) => {
  const handout = await Handout.findById(req.params.id);
  if (!req.currentUser._id.equals(handout.creator)) {
    res.status(400).send({ error: "You cannot access this resource" });
    return
  }
  next();
})

// Deletes specific handout of ID
handouts.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Handout.findByIdAndDelete(req.params.id);
    res.status(200).send({ status: "handout deleted" });
  } catch (e) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Duplicate handout
handouts.copy("/:id", async (req: Request, res: Response) => {
    try {
      Handout.findById(req.params.id).exec(
        (err, doc) => {
          doc._id = new mongoose.Types.ObjectId();
          doc.isNew = true;
          doc.save();
        }
      )
      res.status(200).send({ status: "handout duplicated" });
    } catch (error) {
      res.status(500).send({ error: "Server ran into an error" });
    }
  });

export default handouts;
