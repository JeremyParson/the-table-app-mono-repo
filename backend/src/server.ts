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
import path from "path";

const app: Express.Application = Express();
createIoInstance(app, process.env.SOCKET_PORT);

// Used for POST data extraction
app.use(
  Express.urlencoded({
    extended: true,
  })
);

let prefix = '';

app.use(methodOverride("_method"));
app.use(cors())
app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:3000`);
  res.setHeader("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
if (process.env.NODE_ENV === "production") {
  app.use(Express.static(path.join(__dirname, 'build')))
  prefix = '/api'
}

// Middleware
import defineUser from "./middleware/defineCurrentUser"
app.use(defineUser)

import routeLog from "./middleware/routeLog"
app.use(routeLog)

// Routes
app.use(`${prefix}/campaigns`, campaigns);
app.use(`${prefix}/characters`, characters);
app.use(`${prefix}/handouts`, handouts);
app.use(`${prefix}/auth`, authentication);
app.use(`${prefix}/user`, user);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

