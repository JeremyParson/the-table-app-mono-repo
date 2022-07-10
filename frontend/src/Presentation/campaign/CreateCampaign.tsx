import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  data: Array<Campaign>,
  handleFetch: Function
}

function CreateCampaign(props: Props) {
  let [formData, setFormData] = useState({
    portrait: ''
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, ...{ [name]: value } });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
        <label className='text-dutch-white'>Campaign Name:</label>
        <input
          name="title"
          type="text"
          placeholder="Name of your campaign"
          onChange={(e) => handleInputChange(e)}
        />
        <label className='text-dutch-white'>Campaign Image Link:</label>
        <input
          type="text"
          name="portrait"
          placeholder="Place link here"
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
        />
        <label className='text-dutch-white'>Description:</label>
        <textarea
          name="description"
          placeholder="Campaign description"
          onChange={(e) => handleInputChange(e)}
        />
        <input type="submit" className="border-2 rounded-md p-1 bg-tea-green my-3 mx-3" />
      </form>
      <Link to="/campaigns" className="text-dutch-white">Cancel</Link>
    </div>
  );
}

export default CreateCampaign;
