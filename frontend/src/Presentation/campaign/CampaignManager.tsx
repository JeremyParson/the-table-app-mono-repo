import React, { useEffect, useState } from "react";
import CampaignGallery from "./CampaignGallery";
import { Routes, Route } from "react-router-dom";
import CreateCampaign from "./CreateCampaign";

type Props = {

}

// Displays the CampaignGallery or CreateCampaign Page
function CampaignManager(_props: Props) {
  let [campaignData, setCampaignData] = useState([]);

  const fetchCampaigns = async () => {
    const response = await fetch("http://localhost:5000/campaigns");
    const data = await response.json();
    setCampaignData(data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Routes>
        <Route path="/" element={<CampaignGallery data={campaignData} />} />
        <Route
          path="/new-campaign"
          element={
            <CreateCampaign data={campaignData} handleFetch={fetchCampaigns} />
          }
        />
      </Routes>
    </div>
  );
}

export default CampaignManager;
