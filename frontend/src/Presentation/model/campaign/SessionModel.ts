import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { UserReducerContext } from "../../../Presentation/context/UserReducerContext";

export default function SessionModel() {
  const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL);
  const [isConnected, setIsConnected] = useState(null);
  const [messages, setMessages]: any = useState([]);
  const { user } = useContext(UserReducerContext);

  const { id } = useParams();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      setIsConnected(false);
    });

    socket.on("message", (message: Message) => {
      setMessages((prevMessages: any) => [...prevMessages, message]);
    });

    socket.emit("join_session", {
      sessionId: id,
      token: `Bearer ${localStorage.getItem("token")}`,
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
      socket.off("disconnect");
    };
  }, []);

  function sendMessage(message: any) {
    console.log("send message");
    socket.emit("message", {
      sessionId: id,
      content: message,
      token: `Bearer ${localStorage.getItem("token")}`,
      sender: user.username,
    });
  }

  return { isConnected, socket, messages, sendMessage };
}
