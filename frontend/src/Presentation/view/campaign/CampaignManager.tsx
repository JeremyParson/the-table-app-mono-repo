import React, { useEffect, useState } from "react";
import CampaignGallery from "./CampaignGallery";
import { Routes, Route } from "react-router-dom";
import CreateCampaign from "./CreateCampaign";

type Props = {

}

// Displays the CampaignGallery or CreateCampaign Page
function CampaignManager(_props: Props) {
  return (
    <div className="flex flex-col items-center">
      <Routes>
        <Route path="/" element={<CampaignGallery />} />
        <Route
          path="/new-campaign"
          element={
            <CreateCampaign />
          }
        />
      </Routes>
    </div>
  );
}

export default CampaignManager;
