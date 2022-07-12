import { useEffect, useState } from "react";
import { getUserInfo } from "../../../Data/user/DataStore";
import { useNavigate } from "react-router-dom";

export default function DashboardModel() {
  const [campaigns, setCampaigns] = useState([]);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  async function getData() {
    const data = await getUserInfo();
    if (data?.campaigns) {
      setCampaigns(data.campaigns);
    }

    if (data?.characters) {
      setCharacters(data.characters);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return { campaigns, characters };
}
