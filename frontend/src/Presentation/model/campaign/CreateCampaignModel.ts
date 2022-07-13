import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCampaign } from "../../../Data/campaign/DataStore";

export default function CreateCampaignModel() {
  let [values, setValues] = useState({
    title: "",
    portrait: "",
    description: "",
  });
  
  let [isPublic, setIsPublic] = useState(true)

  async function saveCampaign() {
    await createCampaign(values.title, values.portrait, values.description, isPublic)
    navigate('/dashboard')
  }

  function onChange(prop: string, value: string) {
    setValues({ ...values, [prop]: value });
  }

  const navigate = useNavigate()
  return {...values, isPublic, setIsPublic, saveCampaign, onChange};
}
