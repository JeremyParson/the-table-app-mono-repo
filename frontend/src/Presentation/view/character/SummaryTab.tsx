type Props = {
  character: Character;
};

export default function SummaryTab({ character }: Props) {
  return (
    <div className="h-3/4 overflow-y-auto rounded-xl bg-blue-munsell p-4">
      <header className="bg-dutch-white rounded-md">
        <h2 className="text-xl">
          <b>{character.name}</b>
        </h2>
        <h3>
          LV. {character.level} {character.race} {character.class}
        </h3>
      </header>
    
      <b><h3 className="text-md">Hit points and Hit Die</h3></b>
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

      <b><h3 className="text-md">Abilities</h3></b>
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

      <b><h3 className="text-md">Proficiencies</h3></b>
      <section>
        {character.proficiencies.split('|').join(" ")}
      </section>

      <b><h3 className="text-md">Saves</h3></b>
      <section>
        <ul>
            {character.strengthSave ? <li>Strength</li>: null}
            {character.constitutionSave ? <li>Constitution</li>: null}
            {character.dexteritySave ? <li>Dexterity</li>: null}
            {character.intelligenceSave ? <li>Intelligence</li>: null}
            {character.wisdomSave ? <li>Wisdom</li>: null}
            {character.charismaSave ? <li>Charisma</li>: null}
        </ul>
      </section>
      

      <b><h3 className="text-md">Equipment</h3></b>

      <section></section>
    </div>
  );
}
