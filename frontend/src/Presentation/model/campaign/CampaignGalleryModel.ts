import { useEffect, useState } from "react";
import { indexCampaigns } from "../../../Data/campaign/DataStore";

export default function CampaignGalleryModel() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getCampaigns();
  }, []);

  async function getCampaigns() {
    const data = await indexCampaigns();
    setCampaigns(data);
  }

  return {campaigns};
}
