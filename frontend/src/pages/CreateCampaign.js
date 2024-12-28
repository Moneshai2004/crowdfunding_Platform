// frontend/src/pages/CreateCampaign.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    endDate: "",
    category: "Wind Turbine",
  });

  const navigate = useNavigate();

  const { title, description, goal, endDate, category } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to create a campaign");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/campaigns",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Campaign created successfully!");
      navigate(`/campaigns/${res.data._id}`);
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Create a New Campaign</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Goal:</label>
          <input
            type="number"
            name="goal"
            value={goal}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={category} onChange={onChange} required>
            <option value="Wind Turbine">Wind Turbine</option>
            <option value="Hybrid System">Hybrid System</option>
            <option value="Solar Panel">Solar Panel</option>
            <option value="Biomass Generator">Biomass Generator</option>
          </select>
        </div>
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
