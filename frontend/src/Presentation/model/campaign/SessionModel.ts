import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

type Message = {
    sender: string,
    content: string
}

export default function SessionModel() {
  const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL);
  const [isConnected, setIsConnected] = useState(null);

  const [messages, setMessages] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", (reason) => {
      setIsConnected(false);
    });

    socket.on("message", (data: Message) => {
        setMessages([...messages, data])
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
  return { isConnected, socket, messages };
}
