import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  detailCampaign,
  updateCampaign,
} from "../../../Data/campaign/DataStore";

export default function EditCampaignModel() {
  let [values, setValues] = useState({
    title: "",
    portrait: "",
    description: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    getCampaign();
  }, []);

  let [isPublic, setIsPublic] = useState(true);

  async function getCampaign() {
    const data = await detailCampaign(id);
    setValues(data);
  }

  async function saveCampaign() {
    await updateCampaign(id, values);
    navigate(-1);
    console.log("navigate")
  }

  function onChange(prop: string, value: string) {
    setValues({ ...values, [prop]: value });
  }

  
  return { ...values, isPublic, setIsPublic, saveCampaign, onChange };
}
