import React from "react";
import { Link } from "react-router-dom";
import CampaignCard from "./CampaignCard";
import useModel from "../../model/campaign/CampaignGalleryModel";

// Display a grid of campaign cards. Also has a button to create a new campaign
function CampaignGallery() {
  const { campaigns } = useModel();
  const renderCampaigns = () =>
    campaigns.map((campaign, i) => (
      <CampaignCard campaign={campaign} key={i} />
    ));

  return (
    <div>
      <h1 className="text-dutch-white text-4xl">Campaigns</h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 p-4">
        {renderCampaigns()}
      </div>
    </div>
  );
}

export default CampaignGallery;
