import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CreateCampaign(props) {
  let [formData, setFormData] = useState({});
  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, ...{ [name]: value } });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/campaigns", {
      method: "post",
      body: new URLSearchParams(formData)
    });
    props.handleFetch()
  };

  return (
    <div>
      <h1 className='text-dutch-white text-4xl'>New Campaign</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className='text-dutch-white'>Campaign Name:</label>
        <input
          name="title"
          type="text"
          placeholder="Name of your campaign"
          onChange={handleInputChange}
        />
        <label className='text-dutch-white'>Campaign Image Link:</label>
        <input
          type="text"
          name="portrait"
          placeholder="Place link here"
          onChange={handleInputChange}
        />
        <div className="w-auto mx-20 my-5">
          {formData.portrait ? (
            <img src={formData.portrait} className="object-contain" />
          ) : (
            <p className='text-dutch-white'>No image</p>
          )}
        </div>
        <label className='text-dutch-white'>System:</label>
        <input
          name="system"
          type="text"
          placeholder="System name"
          defaultValue={"5e"}
          onChange={handleInputChange}
        />
        <label className='text-dutch-white'>Description:</label>
        <textarea
          name="description"
          placeholder="Campaign description"
          onChange={handleInputChange}
        />
        <input type="submit" className="border-2 rounded-md p-1 bg-tea-green my-3 mx-3" />
      </form>
      <Link to="/campaigns" className="text-dutch-white">Cancel</Link>
    </div>
  );
}

export default CreateCampaign;
