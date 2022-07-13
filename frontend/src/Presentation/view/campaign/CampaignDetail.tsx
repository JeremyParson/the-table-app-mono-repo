import useModel from "../../../Presentation/model/campaign/CampaignDetailModel";

export default function CampaignDetail() {
  const { campaign, creator, players, join, launch } = useModel();
  return (
    <div className="w-full h-[90vh] bg-blue-munsell rounded-lg">
      <header className="flex">
        <img className="object-contain w-1/3" src={campaign.portrait}></img>
        <div>
          <h2 className="text-2xl inline">{campaign.title}</h2>
          <p>Created by {creator.username}</p>
          <h3 className="text-xl inline">Description</h3>
          <p>
            {campaign.description.length
              ? campaign.description
              : "No description."}
          </p>
        </div>
      </header>
      <h3 className="text-xl inline">Players</h3>
      <ul>
        {players.map((player, i) => (
          <li key={i}>{player.username}</li>
        ))}
      </ul>
      <button className="bg-tea-green px-8 py-2 m-2 rounded-full" onClick={(_e => join())}>Join</button>
      <button className="border-tea-green border-2 text-tea-green px-8 py-2 m-2 rounded-full" onClick={(_e => launch())}>Launch</button>
    </div>
  );
}
