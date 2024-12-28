// frontend/src/pages/Campaigns.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div>
      <h2>All Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id}>
            <Link to={`/campaigns/${campaign._id}`}>{campaign.title}</Link> -
            Goal: ${campaign.goal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Campaigns;
