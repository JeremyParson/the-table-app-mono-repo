import { FormEvent, useState } from "react";
import { Socket } from "socket.io-client";
import useModel from "../../../model/session/TheTableModel";
import { Link } from "react-router-dom";
import CharacterSheet from "./CharacterSheet";
import HandoutSheet from "./HandoutSheet";

type Params = {
  socket: Socket<any, any>;
};

export default function TheTable(params: Params) {
  const {
    image,
    name,
    description,
    gm_notes,
    onHandoutChange,
    saveHandout,
    campaign,
    closeCharacter,
    openCharacter,
    openCharacters,
    openHandouts,
    openHandout,
    closeHandout,
  } = useModel(params.socket);
  const [characterDropdown, setCharacterDropdown] = useState(false);
  const [handoutDropdown, setHandoutDropdown] = useState(false);
  const [displayHandoutForm, setDisplayHandoutForm] = useState(false);

  function handleCreateHandout(e: FormEvent) {
    e.preventDefault();
    setDisplayHandoutForm(false);
    saveHandout();
  }

  return (
    <div className="w-full h-full">
      <div className="relative left-0">
        <header className="flex">
          <div onMouseLeave={(_e) => setCharacterDropdown(false)}>
            <button
              className="bg-tea-green px-8 py-2 m-2 rounded-full"
              onClick={(_e) => setCharacterDropdown(!characterDropdown)}
            >
              Characters
            </button>
            <ul className={characterDropdown ? "" : "hidden"}>
              <li onClick={(_e) => {}}>
                <Link to="new-character">Create Character</Link>
              </li>
              {campaign.characters.map((character, i) => (
                <li key={i} onClick={(e) => openCharacter(character._id)}>
                  {character.name}
                </li>
              ))}
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
              <li onClick={(_e) => setDisplayHandoutForm(true)}>
                Create Handout
              </li>
              {campaign.handouts.map((handout, i) => (
                <li key={i} onClick={(e) => openHandout(handout._id)}>
                  {handout.name}
                </li>
              ))}
            </ul>
          </div>
        </header>
      </div>

      <section
        className={`my-10 bg-tea-green w-1/2 ${
          !displayHandoutForm ? "hidden" : ""
        }`}
      >
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={(e) => handleCreateHandout(e)}
        >
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => onHandoutChange(e.target.name, e.target.value)}
          />
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => onHandoutChange(e.target.name, e.target.value)}
          />
          <img src={image} />
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => onHandoutChange(e.target.name, e.target.value)}
          />
          <label>GM Notes</label>
          <textarea
            name="gm_notes"
            value={gm_notes}
            onChange={(e) => onHandoutChange(e.target.name, e.target.value)}
          />
          <input
            type="submit"
            className="px-8 py-2 m-2 rounded-full bg-blue-munsell"
          />
        </form>
        <button
          className="px-8 py-2 m-2 rounded-full bg-danger"
          onClick={(_e) => setDisplayHandoutForm(false)}
        >
          Cancel
        </button>
      </section>

      <section>
        {openCharacters.map((character, i) => (
          <CharacterSheet
            key={i}
            handleClose={() => closeCharacter(character)}
            character={campaign.characters.filter((v) => v._id == character)[0]}
          />
        ))}
        {openHandouts.map((handout, i) => (
          <HandoutSheet
            key={i}
            handleClose={() => closeHandout(handout)}
            handout={campaign.handouts.filter((v) => v._id == handout)[0]}
          />
        ))}
      </section>
    </div>
  );
}
