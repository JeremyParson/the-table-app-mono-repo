// Environment
require("dotenv").config();
import Express from "express";
import cors from "cors";
import methodOverride from "method-override";
import campaigns from "./routers/campaigns";
import characters from "./routers/characters";
import handouts from "./routers/handouts";
import user from "./routers/user";
import authentication from "./routers/authentication";

const app: Express.Application = Express();

// Used for POST data extraction
app.use(
  Express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
app.use(cors())
app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:${process.env.REACT_APP_PORT}`);
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// Middleware
import defineUser from "./middleware/defineCurrentUser"
app.use(defineUser)

// Routes
app.use("/campaigns", campaigns);
app.use("/characters", characters);
app.use("/handouts", handouts);
app.use("/auth", authentication);
app.use("/user", user);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
