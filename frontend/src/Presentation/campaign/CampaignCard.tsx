import React, { useState } from "react";
import EditableLabel from "../EditableLabel";
import EditableImage from "../EditableImage";
import { Link } from "react-router-dom";

// Displays basic campaign info and enables quick edits.
function CampaignCard(props) {
  //
  const [expanded, setExpanded] = useState(false);
  const minimizedView = () => <hr className="my-2"></hr>;

  const expandedView = () => <p>{props.campaign.description}</p>;

  const handleChange = async (changes) => {
    console.log(changes);
    // TO-DO Check if the image is 200 thats ok! if 404 hardcode an image
    const API_QUERY = `http://localhost:5000/campaigns/${props.campaign._id}`;

    await fetch(API_QUERY, {
      method: "post",
      body: new URLSearchParams(changes),
    });
  };

  return (
    <div className="border-2 border-solid border-black rounded-md p-1 bg-blue-munsell h-fit">
      <EditableImage
        className="object-contain"
        source={props.campaign.portrait}
        name="portrait"
        handleChange={handleChange}
      />
      <EditableLabel
        value={props.campaign.title}
        name="title"
        handleChange={handleChange}
      />
      <h3 className="font-bold">3 Players</h3>
      {expanded ? expandedView() : minimizedView()}
      <button
        className="border-2 rounded-md p-2 bg-tea-green bottom-0 mx-2"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Minimize" : "Expand"}
      </button>
      <button className="border-2 rounded-md p-2 bg-tea-green bottom-0 mx-2">
        <Link to={`/campaign/${props.campaign._id}`}>Open</Link>
      </button>
    </div>
  );
}

export default CampaignCard;
