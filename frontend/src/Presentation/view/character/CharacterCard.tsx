import { Link } from "react-router-dom";

type Props = {
  character: Character;
};

export default function CharacterCard(props: Props) {
  return (
    <div className="border-2 border-solid border-black rounded-md p-1 h-fit">
      <h2 className="text-xl">{props.character.name}</h2>
      <h3>
        LV. {props.character.level} {props.character.race} {props.character.class}
      </h3>
      <h3>Stats</h3>
      <div className="grid grid-cols-3">
        <h4>STR {props.character.strength || "-"}</h4>
        <h4>DEX {props.character.dexterity || "-"}</h4>
        <h4>CON {props.character.constitution || "-"}</h4>
        <h4>WIS {props.character.wisdom || "-"}</h4>
        <h4>CHA {props.character.charisma || "-"}</h4>
        <h4>INT {props.character.intelligence || "-"}</h4>
      </div>
      <div>
        <button className="bg-blue-munsell px-8 py-2 m-2 rounded-full">
          <Link to={`/character/${props.character._id}`}>View</Link>
        </button>
        <button className="bg-blue-munsell px-8 py-2 m-2 rounded-full">
          Edit
        </button>
      </div>
    </div>
  );
}
