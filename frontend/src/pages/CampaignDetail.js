// frontend/src/pages/CampaignDetail.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/campaigns/${id}`
        );
        setCampaign(res.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleContribute = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to contribute");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/payments/initiate",
        { amount: Number(amount), campaignId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.link;
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  if (!campaign) return <div>Loading...</div>;

  return (
    <div>
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>
      <p>Goal: ${campaign.goal}</p>
      <p>Amount Raised: ${campaign.amountRaised}</p>
      <p>
        Creator: {campaign.creator.name} ({campaign.creator.email})
      </p>
      <form onSubmit={handleContribute}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Contribute</button>
      </form>
    </div>
  );
};

export default CampaignDetail;
