type Props = {
  handleAbilityChange: Function;
  characterAbilities: { [key: string]: number };
  abilityBonuses: any[];
  points: number;
};

export default function AbilityTab(props: Props) {
  function increase(ability: string) {
    props.handleAbilityChange(
      ability,
      props.characterAbilities[ability] + 1,
      -1
    );
  }

  function decrease(ability: string) {
    props.handleAbilityChange(
      ability,
      props.characterAbilities[ability] - 1,
      1
    );
  }

  return (
    <>
      <h2 className="text-4xl text-tea-green">You have {props.points} points</h2>
      <div className="grid h-full overflow-hidden grid-cols-3">
        <section className="bg-tea-green rounded-xl flex items-center flex-col justify-center">
          <h3>
            <b>Strength</b>
          </h3>
          <p className="text-5xl">{props.characterAbilities.strength} ({Math.floor((props.characterAbilities.strength - 10) / 2)})</p>
          <button onClick={(_e) => increase("strength")}>Up</button>
          <button onClick={(_e) => decrease("strength")}>Down</button>
        </section>

        <section className="bg-tea-green rounded-xl flex items-center flex-col justify-center">
          <h3>
            <b>Dexterity</b>
          </h3>
          <p className="text-5xl">{props.characterAbilities.dexterity} ({Math.floor((props.characterAbilities.dexterity - 10) / 2)})</p>
          <button onClick={(_e) => increase("dexterity")}>Up</button>
          <button onClick={(_e) => decrease("dexterity")}>Down</button>
        </section>

        <section className="bg-tea-green rounded-xl flex items-center flex-col justify-center">
          <h3>
            <b>Constitution</b>
          </h3>
          <p className="text-5xl">{props.characterAbilities.constitution} ({Math.floor((props.characterAbilities.constitution - 10) / 2)})</p>
          <button onClick={(_e) => increase("constitution")}>Up</button>
          <button onClick={(_e) => decrease("constitution")}>Down</button>
        </section>

        <section className="bg-tea-green rounded-xl flex items-center flex-col justify-center">
          <h3>
            <b>Intelligence</b>
          </h3>
          <p className="text-5xl">{props.characterAbilities.intelligence} ({Math.floor((props.characterAbilities.intelligence - 10) / 2)})</p>
          <button onClick={(_e) => increase("intelligence")}>Up</button>
          <button onClick={(_e) => decrease("intelligence")}>Down</button>
        </section>

        <section className="bg-tea-green rounded-xl flex items-center flex-col justify-center">
          <h3>
            <b>Wisdom</b>
          </h3>
          <p className="text-5xl">{props.characterAbilities.wisdom} ({Math.floor((props.characterAbilities.wisdom - 10) / 2)})</p>
          <button onClick={(_e) => increase("wisdom")}>Up</button>
          <button onClick={(_e) => decrease("wisdom")}>Down</button>
        </section>

        <section className="bg-tea-green rounded-xl flex items-center flex-col justify-center">
          <h3>
            <b>Charisma</b>
          </h3>
          <p className="text-5xl">{props.characterAbilities.charisma} ({Math.floor((props.characterAbilities.charisma - 10) / 2)})</p>
          <button onClick={(_e) => increase("charisma")}>Up</button>
          <button onClick={(_e) => decrease("charisma")}>Down</button>
        </section>
      </div>
    </>
  );
}
