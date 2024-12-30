// frontend/src/pages/Campaigns.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Campaigns.css";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns");
        setCampaigns(res.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="campaigns-container">
      <h2 className="campaigns-title">All Campaigns</h2>
      <ul className="campaigns-list">
        {campaigns.map((campaign) => (
          <li key={campaign._id} className="campaign-item">
            <Link to={`/campaigns/${campaign._id}`} className="campaign-link">
              {campaign.title}
            </Link>
            <span className="campaign-goal"> - Goal: ${campaign.goal}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Campaigns;
