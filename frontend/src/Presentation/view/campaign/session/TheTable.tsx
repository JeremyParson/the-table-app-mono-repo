import { useState } from "react";
import { Socket } from "socket.io-client";
import useModel from "../../../model/session/TheTableModel";

type Params = {
  socket: Socket<any, any>
}

export default function TheTable(params: Params) {
  const {} = useModel(params.socket);
  const [characterDropdown, setCharacterDropdown] = useState(false);
  const [handoutDropdown, setHandoutDropdown] = useState(false);
  return (
    <div className="w-full h-full">
      <header className="absolute left-0 flex">
        <div onMouseLeave={(_e) => setCharacterDropdown(false)}>
          <button
            className="bg-tea-green px-8 py-2 m-2 rounded-full"
            onClick={(_e) => setCharacterDropdown(!characterDropdown)}
          >
            Characters
          </button>
          <ul className={characterDropdown ? "" : "hidden"}>
            <li onClick={(_e) => {}}>Create Character</li>
          </ul>
        </div>
        <div onMouseLeave={(_e) => setHandoutDropdown(false)}>
          <button
            className="bg-tea-green px-8 py-2 m-2 rounded-full"
            onClick={(_e) => setHandoutDropdown(!handoutDropdown)}
          >
            Handouts
          </button>
          <ul className={handoutDropdown ? "" : "hidden"}>
            <li>Create Handout</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
