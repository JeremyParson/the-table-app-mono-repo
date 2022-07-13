import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  detailCampaign,
  joinCampaign,
} from "../../..//Data/campaign/DataStore";
import { getUser } from "../../../Data/user/DataStore";

export default function CampaignDetailModel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign]: any = useState({
    _id: "",
    description: "",
    portrait: "",
    title: "",
    players: [],
    creator: "",
  });

  const [players, setPlayers] = useState([]);
  const [creator, setCreator] = useState({
    username: "",
  });

  useEffect(() => {
    getCampaignData();
  }, []);

  async function getCampaignData() {
    const data: any = await detailCampaign(id);
    setCampaign(data);
    let temp = [];
    for (let playerId of data.players) temp.push(await getUser(playerId));
    setPlayers(temp);
    setCreator(await getUser(data.creator));
  }

  async function join() {
    const response = await joinCampaign(id);
    if (response?.error) return;
    console.log(response)
    setCampaign({...campaign, 'players': response.players});
    navigate(0)
  }

  async function launch() {
    navigate(`/session//${campaign._id}`)
  }

  return { campaign, players, creator, join, launch };
}
