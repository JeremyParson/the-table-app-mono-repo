import { Server } from "socket.io";
import http from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Campaign } from "./models";
import { type } from "os";
const jwt = require("jsonwebtoken");

type Message = {
  sender: string;
  content: string;
  sessionId: string;
  token: string;
};

type SessionConnection = {
  sessionId: string;
  token: string;
};

export default function createIoInstance(
  app: Express.Application,
  port: string
): Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> {
  const server = http.createServer(app);
  server.listen(port);
  let io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    // Leave rooms
    socket.on("disconnecting", (reason) => {
      console.log("a user disconnecting");
      socket.rooms.forEach((room) => {
        if (socket.id != room) {
          socket.leave(room);
        }
      });
    });

    // Handle user disconnect
    socket.on("disconnect", (reason) => {
      console.log("a user disconnected");
    });

    // Handle messages sent by user. If it begins with '/' interpret it as a command
    socket.on("message", async (message: Message) => {
      let content = message.content;
      if (content.charAt(0) == "/") {
        if (content.slice(1, 5).toLowerCase() == "roll") {
          let roll = content.slice(5, content.length).trim();
          let [quantity, dice] = roll.split("d");
          let sum = 0;
          let rolls = 0;
          while (rolls != Number(quantity)) {
            rolls += 1;
            sum += Math.ceil(Math.random() * Number(dice));
          }
          message.content += ` [Rolled : ${sum}]`;
        }
      }

      socket.rooms.forEach((room) => {
        if (socket.id != room) {
          io.in(room).emit("message", message);
        }
      });
    });

    socket.on("campaign_updated", async () => {
      socket.rooms.forEach((room) => {
        if (socket.id != room) {
          io.in(room).emit("campaign_updated");
        }
      });
    });

    socket.on("join_session", async (data: SessionConnection) => {
      if (!(await authentication(data)))
        return console.log("socket join room rejected: ", data.sessionId);
      await socket.join(data.sessionId);
      console.log("socket user joined room: ", data.sessionId);
      console.log(socket.rooms);
    });
  });

  return io;
}

async function authentication(
  data: SessionConnection | Message
): Promise<boolean> {
  try {
    const [method, token] = data.token.split(" ");
    if (method == "Bearer") {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = result;
      const campaign = await Campaign.findById(data.sessionId);
      for (let player_id of campaign.players) {
        if (player_id.equals(id)) {
          return true;
        }
      }
      return false;
    }
  } catch (err) {
    return false;
  }
}
