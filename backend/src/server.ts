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
import createIoInstance from "./socket.io";

const app: Express.Application = Express();
createIoInstance(app, process.env.SOCKET_PORT);

// Used for POST data extraction
app.use(
  Express.urlencoded({
    extended: true,
  })
);
app.use(methodOverride("_method"));
app.use(cors())
app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:3000`);
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// Middleware
import defineUser from "./middleware/defineCurrentUser"
app.use(defineUser)

import routeLog from "./middleware/routeLog"
app.use(routeLog)

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

