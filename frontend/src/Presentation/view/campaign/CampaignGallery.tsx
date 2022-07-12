import React from "react";
import { Link } from "react-router-dom";
import CampaignCard from "./CampaignCard";

type Props = {
  data: Array<Campaign>
}

// Display a grid of campaign cards. Also has a button to create a new campaign
function CampaignGallery(props: Props) {

  const renderCampaigns = () =>
    props.data.map((campaign, i) => (
      <CampaignCard campaign={campaign} key={i} />
    ));

  return (
    <div>
      <h1 className="text-dutch-white text-4xl">Campaigns</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 p-4">{renderCampaigns()}</div>
      <Link className="w-20 h-20 fixed right-6 bottom-6" to='new-campaign'>
        <img src="create-button.svg" />
      </Link>
    </div>
  );
}

export default CampaignGallery;
