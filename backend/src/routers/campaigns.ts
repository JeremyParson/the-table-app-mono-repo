import { Router, Request, Response } from "express";
import headers from "../middleware/headers";
import { Campaign } from "../models";

const campaigns = Router();

// Returns a list of all campaigns
campaigns.get("/", async (req: Request, res: Response) => {
  try {
    const campaigns: Array<Object> = await Campaign.find();
    res.send(campaigns);
  } catch (error) {
    res.status(500).send({ error: "The server ran into an error" });
  }
});

// Returns specific campaign of ID
campaigns.get("/:id", async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate("characters")
      .populate("handouts");
    res.status(200).send(campaign);
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Authentication
campaigns.use((req, res, next) => {
  if (!req.currentUser) {
    res.status(400).send({ error: "You must be logged in" });
    return
  }
  next();
})

// Create a new campaign
campaigns.post("/", async (req: Request, res: Response) => {
  try {
    let campaign = await Campaign.create({
      ...req.body,
      creator: req.currentUser._id,
      players: [req.currentUser._id],
    });
    console.log(campaign);
    res.status(201).send(campaign);
  } catch (error) {
    res.status(500).send({ error: "The server ran into an error" });
  }
});

// Authorization
campaigns.use("/:id", async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!req.currentUser._id.equals(campaign.creator)) {
    res.status(400).send({ error: "You cannot access this resource" });
    return
  }
  next();
})

// Update a specific campaign with ID
campaigns.put("/:id", headers, async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    await campaign.update(req.body);
    res.status(200).send({ status: "ok" });
  } catch (error) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

// Deletes specific campaign of ID
campaigns.delete("/:id", async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    await campaign.delete();
    res.status(200).send({ status: "ok!" });
  } catch (e) {
    res.status(500).send({ error: "Server ran into an error" });
  }
});

export default campaigns;
