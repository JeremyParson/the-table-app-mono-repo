import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserReducerContext } from "../../../Presentation/context/UserReducerContext";
import {
  detailCampaign,
  joinCampaign,
  deleteCampaign
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

  const {user} = useContext(UserReducerContext)
  const [displayGMOptions, setDisplayGMOptions] = useState(false)

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
    setDisplayGMOptions(data.creator == user._id)
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
    navigate(`/session/${campaign._id}`)
  }

  async function destroy () {
    await deleteCampaign(id)
    navigate('/dashboard')
  }

  return { campaign, players, creator, join, launch, displayGMOptions, destroy };
}
