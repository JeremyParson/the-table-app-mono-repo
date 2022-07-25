import { useContext, useEffect, useState } from "react";
import { getUserInfo } from "../../../Data/user/DataStore";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../Data/user/DataStore";
import { UserReducerContext } from "../../../Presentation/context/UserReducerContext";

export default function DashboardModel() {
  const [campaigns, setCampaigns] = useState([]);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const { setUser } = useContext(UserReducerContext);

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

  async function logout() {
    logoutUser();
    setUser({
      _id: "",
      username: "",
      email: "",
    });
    navigate("/");
  }

  return { campaigns, characters, logout };
}
