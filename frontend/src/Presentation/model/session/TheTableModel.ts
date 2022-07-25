import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { detailCampaign } from "../../../Data/campaign/DataStore";
import { createHandout } from "../../../Data/handout/DataStore";

export default function TheTableModel(socket: Socket<any, any>) {
  const [campaign, setCampaign] = useState({
    _id: '',
    title: '',
    portrait: '',
    description: '',
    creator: '',
    players: [],
    public: false,
    creationData: '',
    characters: [],
    handouts: [],
  });

  const [handoutValues, setHandoutValues] = useState({
    name: "",
    image: "",
    description: "",
    gm_notes: "",
    players: [],
  });

  const [openCharacters, setOpenCharacters] = useState([])
  const [openHandouts, setOpenHandouts] = useState([])

  const { id } = useParams();

  useEffect(() => {
    getData();
    socket.on("campaign_updated", async () => {
      console.log("Campaign updated");
      const data: any = await detailCampaign(id);
      console.log(data)
      setCampaign(data);
    });
  }, []);

  async function getData() {
    const data: any = await detailCampaign(id);
    setCampaign(data);
  }

  function onHandoutChange(prop: string, value: string | [string]) {
    setHandoutValues({ ...handoutValues, [prop]: value });
  }

  function openHandout (id: string) {
    setOpenHandouts([...openHandouts, id])
  }

  function closeHandout (id: string) {
    setOpenHandouts(openHandouts.filter(v => v != id))
  }

  function openCharacter (id: string) {
    setOpenCharacters([...openCharacters, id])
  }

  function closeCharacter (id: string) {
    setOpenCharacters(openCharacters.filter(v => v != id))
  }

  async function saveHandout() {
    createHandout(
      id,
      handoutValues.name,
      handoutValues.image,
      handoutValues.description,
      handoutValues.gm_notes
    );
    socket.emit("campaign_updated");
  }

  return { ...handoutValues, onHandoutChange, saveHandout, campaign, openCharacters, openHandouts, closeCharacter, openCharacter, openHandout, closeHandout };
}
