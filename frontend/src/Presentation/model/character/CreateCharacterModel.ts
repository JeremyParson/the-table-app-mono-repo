import { useEffect, useState } from "react";
import { getUserInfo } from "../../../Data/user/DataStore";
import { createCharacter } from "../../../Data/character/DataStore";

export default function CreateCharacterModel() {
  const [values, setValues] = useState({
    _id: '',
    player: '',
    campaigns: [],
    creator: '',
    name: "",
    level: 0,
    experience: 0,
    race: "",
    class: "",
    alignment: "",
    inspiration: 0,
    age: "",
    size: "",

    armorClass: "",
    speed: "",
    initiative: "",

    currentHitPoints: 0,
    hitPointMaximum: 0,
    temporaryHitPoints: 0,
    hitDiceMaximum: "",
    currentHitDice: "",

    points: 20,
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8,
    charisma: 8,
    ability_bonuses: [],

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

    campaign: "",

    gmNotes: "",
    public: true,
  });

  const [campaignOptions, setCampaignOptions] = useState([]);

  const [tab, setTab] = useState("setup");

  useEffect(() => {
    setup();
  }, []);

  async function setup() {
    const { campaigns } = await getUserInfo();
    setCampaignOptions(campaigns);
  }

  async function saveCharacter () {
    await createCharacter(values)
  }

  function onChange(prop: string, value: string | number) {
    setValues({ ...values, [prop]: value });
  }

  function handleRaceSelect(selectedRace: Race) {
    setValues({
      ...values,
      ...{
        race: selectedRace.name,
        speed: selectedRace.speed,
        size: selectedRace.size,
        age: selectedRace.age,
        ability_bonuses: selectedRace.ability_bonuses,
      },
    });
  }

  function handleClassSelect(selectedClass: SelectedClass) {
    console.log(selectedClass);
    var skills = selectedClass.selected_proficiencies;
    skills.push(...selectedClass.starting_proficiencies.map((v) => v.index));
    setValues({
      ...values,
      ...{
        class: selectedClass.name,
        hitDiceMaximum: String(selectedClass.hit_die),
        currentHitDice: String(selectedClass.hit_die),
        strengthSave:
          selectedClass.saving_throws.filter((v) => v.index == "str").length !==
          0,
        dexteritySave:
          selectedClass.saving_throws.filter((v) => v.index == "dex").length !==
          0,
        constitutionSave:
          selectedClass.saving_throws.filter((v) => v.index == "con").length !==
          0,
        intelligenceSave:
          selectedClass.saving_throws.filter((v) => v.index == "int").length !==
          0,
        wisdomSave:
          selectedClass.saving_throws.filter((v) => v.index == "wis").length !==
          0,
        charismaSave:
          selectedClass.saving_throws.filter((v) => v.index == "cha").length !==
          0,
        proficiencies: skills.join("|"),
      },
    });
  }

  function handleAbilityChange(ability: string, value: number, inc: number) {
    if (values.points == 0 && inc == -1) return;
    if (value < 8) return;
    setValues({
      ...values,
      points: values.points + inc,
      [ability]: value,
    });
  }

  return {
    ...values,
    values,
    tab,
    setTab,
    onChange,
    campaignOptions,
    handleRaceSelect,
    handleAbilityChange,
    handleClassSelect,
    saveCharacter
  };
}
