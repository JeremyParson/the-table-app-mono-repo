import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailCharacter } from "../../../Data/character/DataStore";

export default function CharacterView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter]: any = useState({
    _id: "",
    name: "",
    player: "",
    level: 0,
    experience: 0,
    race: "",
    class: "",
    alignment: "",
    inspiration: 0,

    armorClass: "",
    speed: "",
    initiative: "",

    currentHitPoints: 0,
    hitPointMaximum: 0,
    temporaryHitPoints: 0,
    hitDiceMaximum: "",
    currentHitDice: "",

    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,

    strengthSave: false,
    dexteritySave: false,
    constitutionSave: false,
    intelligenceSave: false,
    wisdomSave: false,
    charismaSave: false,

    skills: "",

    backgroundName: "",
    personalTraits: "",
    ideals: "",
    bonds: "",
    flaws: "",

    bonus: 0,
    proficiencies: "",

    featuresAndTraits: "",

    backstory: "",
    characterImage: "",

    allyName: "",
    allyImage: "",

    treasure: "",

    failedDeathSaves: 0,
    succeededDeathSaves: 0,

    equipment: "",

    campaigns: [],

    gmNotes: "",
    creator: "",
    public: false,
  });

  useEffect(() => {
    getCharacter();
  }, []);

  async function getCharacter() {
    const data = await detailCharacter(id);
    setCharacter(data);
  }

  return (
    <div className="h-3/4 w-full overflow-y-auto rounded-xl bg-blue-munsell p-4">
      <header className="bg-dutch-white rounded-md">
        <h2 className="text-xl">
          <b>{character.name}</b>
        </h2>
        <h3>
          LV. {character.level} {character.race} {character.class}
        </h3>
      </header>

      <b>
        <h3 className="text-md">Hit points and Hit Die</h3>
      </b>
      <section className="grid grid-cols-2">
        <div>
          <p>Hit Points: {character.hitPointMaximum}</p>
          <p>Armor Class: {character.armorClass}</p>
        </div>
        <div>
          <p>Hit Dice: 1d{character.currentHitDice}</p>
          <p>Hit Dice #: 3</p>
        </div>
      </section>

      <b>
        <h3 className="text-md">Abilities</h3>
      </b>
      <section className="grid grid-cols-3">
        <div className="border-2 border-black">
          <p>
            <b>STR</b>
          </p>
          {character.strength} ({Math.floor((character.strength - 10) / 2)})
        </div>
        <div className="border-2 border-black">
          <p>
            <b>DEX</b>
          </p>
          {character.dexterity} ({Math.floor((character.dexterity - 10) / 2)})
        </div>
        <div className="border-2 border-black">
          <p>
            <b>CON</b>
          </p>
          {character.constitution} (
          {Math.floor((character.constitution - 10) / 2)})
        </div>
        <div className="border-2 border-black">
          <p>
            <b>WIS</b>
          </p>
          {character.wisdom} ({Math.floor((character.wisdom - 10) / 2)})
        </div>
        <div className="border-2 border-black">
          <p>
            <b>INT</b>
          </p>
          {character.intelligence} (
          {Math.floor((character.intelligence - 10) / 2)})
        </div>
        <div className="border-2 border-black">
          <p>
            <b>CHA</b>
          </p>
          {character.charisma} ({Math.floor((character.charisma - 10) / 2)})
        </div>
      </section>

      <b>
        <h3 className="text-md">Proficiencies</h3>
      </b>
      <section>{character.proficiencies.split("|").join(" ")}</section>

      <b>
        <h3 className="text-md">Saves</h3>
      </b>
      <section>
        <ul>
          {character.strengthSave ? <li>Strength</li> : null}
          {character.constitutionSave ? <li>Constitution</li> : null}
          {character.dexteritySave ? <li>Dexterity</li> : null}
          {character.intelligenceSave ? <li>Intelligence</li> : null}
          {character.wisdomSave ? <li>Wisdom</li> : null}
          {character.charismaSave ? <li>Charisma</li> : null}
        </ul>
      </section>

      <b>
        <h3 className="text-md">Equipment</h3>
      </b>

      <section>
        <button
          className="bg-tea-green px-8 py-2 m-2 rounded-full"
          onClick={(e) => navigate(-1)}
        >
          Back
        </button>
        <button className="bg-tea-green px-8 py-2 m-2 rounded-full">
          Edit
        </button>
      </section>
    </div>
  );
}
