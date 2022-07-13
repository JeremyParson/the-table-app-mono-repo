import useModel from "../../../Presentation/model/character/SelectClassModel";
import ProficiencySelector from "./ProficiencySelector";

type Props = {
  handleClassSelect: Function;
};

export default function SelectClassTab(props: Props) {
  const { classes, setSelected, detail, setDetail, selectedClass, handleProficiencySelect, selected_proficiencies } = useModel();

  function handleSelect() {
    const {hit_die, proficiencies, name, saving_throws} = selectedClass
    props.handleClassSelect({
      name,
      hit_die,
      starting_proficiencies: proficiencies,
      selected_proficiencies,
      saving_throws
    });
    setDetail(false);
  }

  return (
    <div className="grid h-full overflow-y-scroll">
      <div className="grid grid-cols-3 [grid-area:1/1] text-dutch-white">
        {classes.map((_class, i) => (
          <div
            onClick={(_e) => setSelected(_class.name)}
            key={i}
            className="flex flex-col items-center"
          >
            <h2>{_class.name}</h2>
            <div className="w-32 h-32">
              <img
                className="object-contain"
                src={`/classes/${_class.name.toLowerCase()}.png`}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={`bg-black [grid-area:1/1] bg-opacity-50 flex items-center justify-center ${
          detail ? "" : "hidden"
        }`}
      >
        <div className="w-5/6 h-5/6 bg-tea-green overflow-y-scroll rounded-xl">
          <h2 className="text-xl">{selectedClass.name}</h2>
          <p>
            <b>Hit Dice:</b> {selectedClass.hit_die}
          </p>
          <h3 className="text-md">
            <b>Choose Proficiencies: </b>
          </h3>
          <form>
            {selectedClass.proficiency_choices.map((prof, i) => (
              <ProficiencySelector data={prof} handleProficiencySelect={handleProficiencySelect} key={i} index={i}/>
            ))}
          </form>
          <button
            className="border-danger border-2 text-danger px-8 py-2 m-2 rounded-full"
            onClick={(_e) => setDetail(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-munsell px-8 py-2 m-2 rounded-full"
            onClick={(_e) => handleSelect()}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
