import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useModel from "../../model/campaign/CreateCampaignModel";

function CreateCampaign() {
  const {
    title,
    portrait,
    description,
    isPublic,
    setIsPublic,
    saveCampaign,
    onChange,
  } = useModel();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    saveCampaign();
  }

  return (
    <div>
      <h1 className="text-dutch-white text-4xl">New Campaign</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
        <label className="text-dutch-white">Campaign Name:</label>
        <input
          name="title"
          value={title}
          type="text"
          placeholder="Name of your campaign"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <label className="text-dutch-white">Campaign Image Link:</label>
        <input
          type="text"
          name="portrait"
          value={portrait}
          placeholder="Place link here"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <div className="w-auto mx-20 my-5">
          {portrait ? (
            <img src={portrait} className="object-contain" />
          ) : (
            <p className="text-dutch-white">No image</p>
          )}
        </div>
        <label className="text-dutch-white">System:</label>
        <label className="text-dutch-white">Description:</label>
        <textarea
          name="description"
          placeholder="Campaign description"
          value={description}
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <input
          type="submit"
          className="border-2 rounded-md p-1 bg-tea-green my-3 mx-3"
        />
      </form>
      <Link to="/dashboard" className="text-dutch-white">
        Cancel
      </Link>
    </div>
  );
}

export default CreateCampaign;
