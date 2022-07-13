import useModel from "../../../Presentation/model/character/SelectRaceModel";

type Props = {
  handleRaceSelect: Function;
};

export default function SelectRaceTab(props: Props) {
  const { races, setSelected, detail, setDetail, selectedRace } = useModel();

  function handleSelect() {
    props.handleRaceSelect(selectedRace);
    setDetail(false);
  }

  return (
    <div className="grid h-full overflow-y-scroll">
      <div className="grid grid-cols-3 [grid-area:1/1] text-dutch-white">
        {races.map((race, i) => (
          <div onClick={(_e) => setSelected(race.name)} key={i} className="flex flex-col items-center">
            <h2>{race.name}</h2>
            <div className="w-32 h-32">
                <img className="object-contain" src={`/races/${race.name.toLowerCase()}.png`}/>
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
          <h2 className="text-xl">{selectedRace.name}</h2>
          <h3>
            <b>Speed:</b> {selectedRace.speed}
          </h3>
          <h3>
            <b>Age:</b> {selectedRace.age}
          </h3>
          <h3>
            <b>Size:</b> {selectedRace.size}
          </h3>
          <h3>{selectedRace.size_description}</h3>
          <h3>
            <b>Alignment:</b> {selectedRace.alignment}
          </h3>
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
