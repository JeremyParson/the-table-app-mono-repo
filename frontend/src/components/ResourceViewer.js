import React from "react";
import CharacterCard from "./CharacterCard";

// Render a
export default function ResourceViewer(props) {
  const { handleCharacterSelect, handleCreateCharacter, campaignData } = props;

  const renderCharacters = () => {
    if (!campaignData["characters"]) return [];
    let temp = campaignData.characters.map((character, i) => (
      <CharacterCard key={i} onClick={(e) => handleCharacterSelect(character)}>Character</CharacterCard>
    ));
    return temp;
  };

  return (
    <div>
      <div className="">
        <hr />
        <h3>Characters</h3>
        <div className="grid grid-cols-2 mt-4 mb-4">
          {campaignData["characters"] ? (
            renderCharacters()
          ) : (
            <p>No Characters</p>
          )}
        </div>

        <button className="bg-white" onClick={() => handleCreateCharacter()}>
          Create Character
        </button>
        <hr />
      </div>
      <div className="">
        <h3>Handouts</h3>
        <button className="bg-white">Create Handout</button>
        <hr />
      </div>
    </div>
  );
}
