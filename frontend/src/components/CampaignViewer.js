import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ViewerSideBar from "./ViewerSideBar";
import ViewerNavigationBar from "./ViewerNavigationBar";
import ResourceViewer from "./ResourceViewer";
import CharacterPage from "./CharacterPage";

export default function CampaignViewer(props) {
  let [campaignData, setCampaignData] = useState({});
  let [tab, setTab] = useState(null);
  let [pages, setPages] = useState([]);
  let [keyCount, setKeyCount] = useState(0);
  const params = useParams();

  const handleNavbarChange = (tab) => {
    if (tab === "Resources") {
      setTab(
        <ResourceViewer
          handleCreateCharacter={handleCreateCharacter}
          campaignData={campaignData}
          handleCharacterSelect={handleCharacterSelect}
        />
      );
    }
  };

  const handleCharacterSelect = (character) => {
    setPages([...pages, character]);
  };

  const handleCreateCharacter = async () => {
    const response = await fetch("http://localhost:5000/characters", {
      method: "post",
      body: new URLSearchParams({ campaign: params.id }),
    });
    const json = await response.json();
    console.log(json);
    await handleFetch();
  };

  const handleFetch = async () => {
    const response = await fetch(
      `http://localhost:5000/campaigns/${params.id}`
    );
    const json = await response.json();
    console.log("Campaign viewer data:", json);
    setCampaignData(json);
  };

  const renderPages = () =>
    pages.map((data, i) => {
      return <CharacterPage key={i} />;
    });

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="w-3/5 h-full bg-black">{renderPages()}</div>
      <ViewerSideBar campaignData={campaignData}>
        <ViewerNavigationBar handleChange={handleNavbarChange} />
        {tab}
      </ViewerSideBar>
    </div>
  );
}
