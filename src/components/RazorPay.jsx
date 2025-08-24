/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RazorPay = () => {
  const [loading, setLoading] = useState(false);
  const [userTransactions, setUserTransactions] = useState(null);
  const [userId] = useState(localStorage.getItem('userId')); // You can make this dynamic
  const [amount, setAmount] = useState(5.0); // Default amount
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();

  // Get authToken from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  // Create headers with auth token
  const createHeaders = () => {
    const token = getAuthToken();
    const headers = {
      "Content-Type": "application/json",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    return headers;
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Countdown effect for success popup
  useEffect(() => {
    let timer;
    if (showSuccessPopup && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showSuccessPopup && countdown === 0) {
      navigate("/gov.au/lusc/dashboard");
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showSuccessPopup, countdown, navigate]);

  // Fetch user transactions using native fetch with auth token
  const fetchUserTransactions = async () => {
    try {
      const response = await fetch(
        `https://immu-backend.up.railway.app/payment/user/${userId}`,
        {
          method: "GET",
          headers: createHeaders(),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setUserTransactions(data);
      } else if (response.status === 401) {
        console.error("Unauthorized access. Please login again.");
        localStorage.removeItem('authToken');
        navigate("/gov.au/lusc/lgin");
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Load transactions on component mount
  useEffect(() => {
    fetchUserTransactions();
  }, []);

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again.");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      alert("Authentication required. Please login again.");
      navigate("/gov.au/lusc/lgin");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://immu-backend.up.railway.app/payment/pay",
        {
          method: "POST",
          headers: createHeaders(),
          body: JSON.stringify({
            amount: parseFloat(amount),
            currency: "INR",
            user_id: userId,
          }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem('authToken');
        alert("Session expired. Please login again.");
        navigate("/gov.au/lusc/lgin");
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { order_id, currency, amount: orderAmount } = await response.json();

      const options = {
        key: "rzp_test_y7QL8rNOwvE7FE",
        amount: orderAmount * 100,
        currency: currency,
        name: "Student Guardian Visa",
        description: "Visa Application Payment",
        order_id: order_id,
        handler: async function (paymentResponse) {
          try {
            const verifyRes = await fetch(
              "https://immu-backend.up.railway.app/payment/verify",
              {
                method: "POST",
                headers: createHeaders(),
                body: JSON.stringify({
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                }),
              }
            );

            if (verifyRes.status === 401) {
              localStorage.removeItem('authToken');
              alert("Session expired. Please login again.");
              navigate("/gov.au/lusc/lgin");
              return;
            }

            if (verifyRes.ok) {
              const verifyData = await verifyRes.json();
              setShowSuccessPopup(true);
              setCountdown(10);
              await fetchUserTransactions();
            } else {
              throw new Error("Verification failed");
            }
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Visa Application",
        },
        theme: {
          color: "#0066cc",
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong: " + error.message);
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && parseFloat(value) >= 0)) {
      setAmount(value === "" ? "" : parseFloat(value));
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    navigate("/gov.au/lusc/dashboard");
  };

  return (
    <div
      style={{
        border: "1px solid #28a745",
        backgroundColor: "#f8fff9",
        borderRadius: "0px",
        margin: "20px 0"
      }}
    >
      {/* Header matching the form style */}
      <div
        style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "6px 10px",
          fontWeight: "bold",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#fff",
            marginRight: 8,
            flexShrink: 0,
          }}
        />
        Payment Required
      </div>

      {/* Content area */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ fontSize: "12px", color: "#333", marginBottom: "12px" }}>
          Your form has been submitted successfully. Please complete the payment to finalize your visa application.
        </div>

        {/* Payment section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Amount input */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <label style={{ fontSize: "12px", color: "#333", fontWeight: "normal", width: "100px" }}>
              Amount (₹) <span style={{ color: "#ff0000" }}>*</span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              min="1"
              step="0.01"
              placeholder="Enter amount"
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                border: "1px solid #ccc",
                borderRadius: "0px",
                backgroundColor: "#ffffff",
                width: "120px",
                height: "20px"
              }}
            />
          </div>

          {/* Payment button */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "100px" }}></div> {/* Spacer to align with input */}
            <button
              onClick={handlePayment}
              disabled={loading || !amount || amount <= 0}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                color: "#fff",
                backgroundColor: loading || !amount || amount <= 0 ? "#6c757d" : "#28a745",
                border: "1px solid #ccc",
                borderRadius: "0px",
                cursor: loading || !amount || amount <= 0 ? "not-allowed" : "pointer",
                opacity: loading || !amount || amount <= 0 ? 0.7 : 1
              }}
            >
              {loading ? "Processing..." : `💳 Pay ₹${amount || 0}`}
            </button>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #28a745",
              borderRadius: "0px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              maxWidth: "400px",
              width: "90%",
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "6px 10px",
                fontWeight: "bold",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  marginRight: 8,
                  flexShrink: 0,
                }}
              />
              Payment Successful
            </div>

            {/* Content */}
            <div style={{ padding: "20px" }}>
              {/* Success Icon */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#28a745",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 16px",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </span>
              </div>

              <div
                style={{
                  color: "#333",
                  marginBottom: "12px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}
              >
                Payment Completed Successfully!
              </div>

              <div
                style={{
                  color: "#666",
                  marginBottom: "16px",
                  fontSize: "12px",
                }}
              >
                Your payment of ₹{amount} has been processed. Your visa application is now complete.
              </div>

              <div
                style={{
                  color: "#888",
                  fontSize: "11px",
                  marginBottom: "16px",
                }}
              >
                Redirecting to dashboard in {countdown} seconds...
              </div>

              <button
                onClick={closeSuccessPopup}
                style={{
                  padding: "6px 12px",
                  fontSize: "12px",
                  backgroundColor: "#0066cc",
                  color: "white",
                  border: "none",
                  borderRadius: "0px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Continue to Dashboard ▶
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RazorPay;
