import { Link } from "react-router-dom";
import useModel from "../../model/user/DashboardModel";

import CampaignCard from "../campaign/CampaignCard";
import CharacterCard from "../character/CharacterCard";

export default function Dashboard() {
  const { campaigns, characters } = useModel();
  return (
    <main className="flex overflow-hidden">
      <section className="w-1/2 h-[80vh] rounded-2xl bg-blue-munsell absolute bottom-0">
        <h2 className="text-xl">Campaigns</h2>
        <Link to="new-campaign">
          <p>Create a new campaign</p>
        </Link>
        <Link to='/campaigns'>Find a campaign</Link>
        <div className="overflow-y-scroll h-5/6 grid grid-cols-2">
          {campaigns.map((campaign, i) => (
            <CampaignCard campaign={campaign} key={i} />
          ))}
        </div>
      </section>
      <section className="w-1/2 h-[80vh] rounded-2xl bg-tea-green absolute bottom-0 right-0">
        <h2 className="text-xl">Characters</h2>
        <Link to="new-character">
          <p>Create a new character</p>
        </Link>
        <div className="overflow-y-scroll h-5/6 grid grid-cols-2">
          {characters.map((character, i) => <CharacterCard character={character} key={i}/> )}
        </div>
      </section>
    </main>
  );
}
