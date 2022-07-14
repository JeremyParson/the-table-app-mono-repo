import { Server } from "socket.io";
import http from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Campaign } from "./models";
const jwt = require("jsonwebtoken");

type Message = {
    sender: string,
    content: string
    sessionId: string,
    token: string
}

type SessionConnection = {
    sessionId: string,
    token: string
}

export default function createIoInstance(
  app: Express.Application,
  port: string
): Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
  const server = http.createServer(app);
  server.listen(port);
  let io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", (reason) => {
      console.log("a user disconnected");
    });

    socket.on("message", async (message: Message) => {
        if (!await authentication(message)) return console.log("socket user message rejected", message.sessionId);
        console.log('Message sent to session', message.sessionId)
        socket.to(message.sessionId).emit('message', message)
    })

    socket.on("join_session", async (data: SessionConnection) => {
        if (!await authentication(data)) return console.log("socket user denied join", data.sessionId);
        socket.join(data.sessionId);
        console.log("socket user joined room: ", data.sessionId);
    });
  });

  return io;
}

async function authentication (data: SessionConnection | Message): Promise<boolean> {
    try {
        const [method, token] = data.token.split(" ");
        if (method == "Bearer") {
          const result = jwt.verify(token, process.env.JWT_SECRET);
          const { id } = result;
          const campaign = await Campaign.findById(data.sessionId);
          for (let player_id of campaign.players) {
            if (player_id.equals(id)) {
              return true
            }
          }
          return false
        }
      } catch (err) {
        return false
      }
}
