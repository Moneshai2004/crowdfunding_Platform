// frontend/src/pages/PaymentVerification.js

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tx_ref = query.get("tx_ref");
    const transaction_id = query.get("transaction_id");

    const verifyPayment = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to verify payment");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/payments/verify/${transaction_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert(res.data.message);
        navigate(`/campaigns/${res.data.campaignId}`);
      } catch (error) {
        console.error(error.response.data.message);
        alert(error.response.data.message);
      }
    };

    if (transaction_id) {
      verifyPayment();
    } else {
      alert("No transaction ID found");
      navigate("/");
    }
  }, [location, navigate]);

  return <div>Verifying Payment...</div>;
};

export default PaymentVerification;
