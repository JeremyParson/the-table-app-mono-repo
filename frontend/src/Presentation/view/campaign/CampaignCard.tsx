import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  campaign: Campaign
}

// Displays basic campaign info and enables quick edits.
function CampaignCard(props: Props) {
  //
  const [expanded, setExpanded] = useState(false);
  const minimizedView = () => <hr className="my-2"></hr>;

  const expandedView = () => <p>{props.campaign.description}</p>;

  // const handleChange = async (changes) => {
  //   console.log(changes);
  //   // TO-DO Check if the image is 200 thats ok! if 404 hardcode an image
  //   const API_QUERY = `http://localhost:5000/campaigns/${props.campaign._id}`;

  //   await fetch(API_QUERY, {
  //     method: "post",
  //     body: new URLSearchParams(changes),
  //   });
  // };

  return (
    <div className="border-2 border-solid border-black rounded-md p-1 bg-blue-munsell h-fit">
      <h2 className="text-xl">{props.campaign.title}</h2>
      <img src={props.campaign.portrait}></img>
      <h3 className="font-bold">3 Players</h3>
      {expanded ? expandedView() : minimizedView()}
      <button
        className="bg-tea-green px-8 py-2 m-2 rounded-full"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Minimize" : "Expand"}
      </button>
      <button className="bg-tea-green px-8 py-2 m-2 rounded-full">
        <Link to={`/campaign/${props.campaign._id}`}>Open</Link>
      </button>
    </div>
  );
}

export default CampaignCard;
