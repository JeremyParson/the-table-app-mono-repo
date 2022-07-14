import { useContext, useEffect, useRef, useState } from "react";
import { UserReducerContext } from "../../../../Presentation/context/UserReducerContext";

type Props = {
  messages: [Message];
  sendMessage: Function;
};

export default function SessionChat(props: Props) {
  const [message, setMessage] = useState("");
  const bottomRef = useRef(null);
  const { user } = useContext(UserReducerContext);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.messages]);

  function handleMessage(message: string) {
    if (!message.length) return;
    props.sendMessage(message);
    setMessage("");
  }

  return (
    <div className="flex flex-col items-end bg-blue-munsell w-64 h-[91vh] absolute right-0">
      <section className="overflow-y-scroll overflow-x-hidden h-5/6 w-full">
        {props.messages.map((message, i) => (
          <div
            key={i}
            className={`rounded-xl w-9/12 px-2 m-1 relative ${
              user.username == message.sender
                ? "left-1/4 bg-dutch-white"
                : "left-0 bg-tea-green"
            }`}
          >
            <h2>
              <b>{message.sender}</b>
            </h2>
            <p>{message.content}</p>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </section>
      <section className="mb-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className="bg-tea-green px-8 py-2 m-2 rounded-full"
          onClick={(_e) => handleMessage(message)}
        >
          Send
        </button>
      </section>
    </div>
  );
}
