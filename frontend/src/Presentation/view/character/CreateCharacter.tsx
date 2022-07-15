import useModel from "../../../Presentation/model/character/CreateCharacterModel";
import SelectRaceTab from "./SelectRaceTab";
import SelectClassTab from "./SelectClassTab";
import AbilityTab from "./AbilityTab";
import SummaryTab from "./SummaryTab";

type Props = {
  forCampaign: string
}

export default function CreateCharacter() {
  const {
    tab,
    setTab,
    onChange,
    name,
    level,
    campaignOptions,
    campaign,
    handleRaceSelect,
    handleClassSelect,
    handleAbilityChange,
    ability_bonuses,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    points,
    values,
    saveCharacter,
    setCampaign
  } = useModel();
  const selected = "bg-dutch-white";

  function renderTab() {
    if (tab == "setup") {
      return (
        <>
          <form className="flex flex-col text-dutch-white">
            <label className="block">Name</label>
            <input
              className="block text-space-cadet"
              type="text"
              name="name"
              value={name}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            ></input>
            <label className="block">Level</label>
            <input
              className="block text-space-cadet"
              type="text"
              name="level"
              value={level}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            ></input>
            <label className="block text-space-cadet">Campaign</label>
            <select
            className="text-space-cadet"
              id="campaign"
              name="campaign"
              size={campaignOptions.length}
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
            >
              <option value='' >None</option>
              {campaignOptions.map((campaign, i) => (
                <option value={campaign._id} key={i}>
                  {campaign.title}
                </option>
              ))}
            </select>
          </form>
        </>
      );
    } else if (tab == "race") {
      return <SelectRaceTab handleRaceSelect={handleRaceSelect} />;
    } else if (tab == "classes") {
      return <SelectClassTab handleClassSelect={handleClassSelect} />;
    } else if (tab == "ability") {
      return (
        <AbilityTab
          handleAbilityChange={handleAbilityChange}
          characterAbilities={
            {strength, dexterity, constitution, intelligence, wisdom, charisma}
          }
          abilityBonuses={ability_bonuses}
          points={points}
        />
      );
    } else if (tab == "summary") {
      return <>
        <SummaryTab character={values}/>
        <button
          className="bg-tea-green px-8 py-2 m-2 rounded-full"
          onClick={(_e) => saveCharacter()}
        >
          Save
        </button>
      </>
    }
  }

  return (
    <main className="w-[70vw] h-[90vh] overflow-hidden m-auto">
      <header>
        <button
          className={tab == "setup" ? selected : ""}
          onClick={(_e) => setTab("setup")}
        >
          Setup
        </button>
        <button
          className={tab == "race" ? selected : ""}
          onClick={(_e) => setTab("race")}
        >
          Race
        </button>
        <button
          className={tab == "classes" ? selected : ""}
          onClick={(_e) => setTab("classes")}
        >
          Classes
        </button>
        <button
          className={tab == "ability" ? selected : ""}
          onClick={(_e) => setTab("ability")}
        >
          Ability
        </button>
        <button
          className={tab == "description" ? selected : ""}
          onClick={(_e) => setTab("description")}
        >
          Description
        </button>
        <button
          className={tab == "summary" ? selected : ""}
          onClick={(_e) => setTab("summary")}
        >
          Summary
        </button>
      </header>

      <main className="h-full flex flex-col items-center flex-shrink-0">{renderTab()}</main>
    </main>
  );
}
