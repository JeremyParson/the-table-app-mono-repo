import useModel from "../../../model/session/SessionModel";
import SessionChat from "./SessionChat";
import TheTable from "./TheTable";

export default function Session() {
  const {messages, sendMessage, socket} = useModel();
  return <div className="flex">
    <TheTable socket={socket} />
    <SessionChat messages={messages} sendMessage={sendMessage} />
  </div>;
}
