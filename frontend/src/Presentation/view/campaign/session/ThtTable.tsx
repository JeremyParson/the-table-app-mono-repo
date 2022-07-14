import useModel from "../../../../Presentation/model/campaign/TheTableModel";

export default function TheTable() {
  const {} = useModel();
  return (
    <div className="w-full h-full">
      <header className="absolute left-0 flex">
        <div>
          <button className="bg-tea-green px-8 py-2 m-2 rounded-full">Characters</button>
          <ul className="hidden">
            <li>Create Character</li>
          </ul>
        </div>
        <div>
          <button className="bg-tea-green px-8 py-2 m-2 rounded-full">Handouts</button>
          <ul className="hidden">
            <li>Create Handout</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
