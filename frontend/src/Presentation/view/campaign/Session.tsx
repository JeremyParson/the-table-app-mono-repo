import useModel from "../../../Presentation/model/campaign/SessionModel";
import SessionChat from "./session/SessionChat";
import TheTable from "./session/ThtTable";

export default function Session() {
  const {messages, sendMessage} = useModel();
  return <div className="flex">
    <TheTable />
    <SessionChat messages={messages} sendMessage={sendMessage} />
  </div>;
}
