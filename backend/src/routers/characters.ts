import { Router, Request, Response } from "express";
import mongoose, {Error} from "mongoose";
import {Character, Campaign} from "../models";

const characters = Router();

// Formats form data
characters.get("/:id", async (req: Request, res: Response, next) => {
  next();
});

// Return a list of every character
characters.get("/", async (req: Request, res: Response) => {
  try {
    const character: Array<Object> = await Character.find();
    res.status(200).send(character);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Get a specific character with ID
characters.get("/:id", async (req: Request, res: Response) => {
  try {
    const character = await Character.findById(req.params.id);
    res.status(200).send(character);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Authentication
characters.use((req, res, next) => {
  if (!req.currentUser) {
    res.status(400).send({ error: "You must be logged in" });
    return
  }
  next();
})

// Create a new character
characters.post("/", async (req: Request, res: Response) => {
  try {
    const character = await Character.create({
      ...req.body,
      creator: req.currentUser._id,
      player: req.currentUser._id
    });
    res.status(201).send(character);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Create a new character in a campaign
characters.post("/:id", async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) return res.status(400).send({ error: "The campaign does not exist" });

    let isPlayer = false;
    for (let player of campaign.players) {
      isPlayer = player.equals(req.currentUser._id)
      if (isPlayer) break;
    }

    if (!isPlayer) return res.status(400).send({ error: "You cannot access this resource" });

    const character = await Character.create({
      ...req.body,
      creator: req.currentUser._id,
      campaigns: [req.params.id]
    });
    res.status(201).send(character);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Authorization
characters.use("/:id", async (req, res, next) => {
  const character = await Character.findById(req.params.id);
  if (!character) return res.json({message: 'You cannot access this resource'})
  const isCreator = req.currentUser._id.equals(character.creator)
  const isOwner = req.currentUser._id.equals(character.player)
  if (!(isOwner || isCreator)) {
    res.status(400).send({ error: "You cannot access this resource" });
    return
  }
  next();
})

// Delete a specific character with ID
characters.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Character.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "character deleted" });
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Update a specific character with ID
characters.patch("/:id", async (req: Request, res: Response) => {
  try {
    await Character.findByIdAndUpdate(req.params.id, req.body);
    const character = await Character.findById(req.params.id);
    res.status(200).send(character);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Duplicate character
characters.copy("/:id", async (req: Request, res: Response) => {
  try {
    Character.findById(req.params.id).exec(
      (err, doc) => {
        doc._id = new mongoose.Types.ObjectId();
        doc.isNew = true;
        doc.save();
      }
    )
    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

export default characters;
