/* eslint-disable no-dupe-keys */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Screen size state for mobile responsiveness only
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Only check for mobile - keep laptop/desktop as original
  const isMobile = screenSize.width <= 768;

  const handleNext = () => {
    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Store email in localStorage and navigate
    localStorage.setItem('signupData', JSON.stringify({ email }));
    navigate("/gov.au/lusc/register");
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        backgroundColor: "#f0f0f0",
        minHeight: "content-fit",
        maxWidth: "99vw",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Container */}
      <div
        style={{
          padding: isMobile ? "8px" : (window.innerWidth <= 768 ? "10px" : "20px"),
          backgroundColor: "#CCCCCC",
          flex: "1",
        }}
      >
        {/* Header and Content Container */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: isMobile ? "8px" : "4px",
            marginBottom: isMobile ? "12px" : (window.innerWidth <= 768 ? "10px" : "20px"),
            backgroundColor: "#ffffff",
            maxWidth: isMobile ? "100%" : (window.innerWidth <= 768 ? "100%" : "none"),
            height: "fit-content",
          }}
        >
          {/* Header */}
          <header
            style={{
              background: "#1B3564",
              height: "fit-content",
              minHeight: isMobile ? "45px" : (window.innerWidth <= 768 ? "25px" : "20px"),
              display: "flex",
              alignItems: "center",
              padding: isMobile ? "12px 16px" : (window.innerWidth <= 768 ? "5px 10px" : "5px 15px"),
              color: "white",
              fontSize: isMobile ? "16px" : "13px",
              fontWeight: "bold",
            }}
          >
            Create an ImmiAccount
          </header>

          {/* Content Section */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: isMobile ? "20px" : (window.innerWidth <= 480 ? "12px" : window.innerWidth <= 768 ? "15px" : "18px"),
              height: "fit-content",
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? "18px" : "13px",
                marginTop: "0",
                marginBottom: isMobile ? "16px" : (window.innerWidth <= 768 ? "10px" : "12px"),
                fontWeight: "normal",
                color: "#1B3564",
                textAlign: isMobile ? "left" : (window.innerWidth <= 480 ? "center" : "left"),
                lineHeight: "1.3",
              }}
            >
              Email address
            </h1>

            <p
              style={{
                marginTop: "0",
                marginBottom: isMobile ? "12px" : (window.innerWidth <= 768 ? "6px" : "8px"),
                fontSize: isMobile ? "16px" : "13px",
                color: "#333",
                lineHeight: "1.5",
                textAlign: isMobile ? "left" : (window.innerWidth <= 480 ? "center" : "left"),
              }}
            >
              Enter an email address to be used for account notifications - such as password resets.
            </p>

            <p
              style={{
                marginTop: "0",
                marginBottom: isMobile ? "12px" : (window.innerWidth <= 768 ? "6px" : "8px"),
                fontSize: isMobile ? "16px" : "13px",
                color: "#333",
                lineHeight: "1.5",
                textAlign: isMobile ? "left" : (window.innerWidth <= 480 ? "center" : "left"),
              }}
            >
              A verification code will be sent to this email address.
            </p>

            <p
              style={{
                marginTop: "0",
                marginBottom: isMobile ? "12px" : (window.innerWidth <= 768 ? "10px" : "12px"),
                fontSize: isMobile ? "16px" : "13px",
                color: "#333",
                lineHeight: "1.5",
                textAlign: isMobile ? "left" : (window.innerWidth <= 480 ? "center" : "left"),
              }}
            >
              You will need to enter the verification code on the next screen.
            </p>

            <p
              style={{
                marginTop: "0",
                marginBottom: isMobile ? "16px" : (window.innerWidth <= 768 ? "10px" : "12px"),
                fontSize: isMobile ? "16px" : "13px",
                color: "#000000",
                textAlign: isMobile ? "left" : (window.innerWidth <= 480 ? "center" : "left"),
              }}
            >
              Fields marked <span style={{ color: "#d9534f" }}>*</span> must be completed.
            </p>

            {/* Email Input Section */}
            <div style={{ 
              marginBottom: isMobile ? "16px" : (window.innerWidth <= 768 ? "10px" : "12px"), 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "8px" : (window.innerWidth <= 480 ? "5px" : "8px"),
              flexDirection: isMobile ? "column" : (window.innerWidth <= 768 ? "column" : "row"),
              alignItems: isMobile ? "stretch" : (window.innerWidth <= 768 ? "stretch" : "center"),
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: isMobile ? "16px" : "13px",
                  fontWeight: isMobile ? "bold" : "normal",
                  color: "#333",
                  minWidth: isMobile ? "auto" : (window.innerWidth > 768 ? "100px" : "auto"),
                  textAlign: isMobile ? "left" : (window.innerWidth <= 768 ? "left" : "left"),
                  marginBottom: isMobile ? "8px" : (window.innerWidth <= 768 ? "3px" : "0"),
                }}
              >
                Email address <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "12px" : (window.innerWidth <= 480 ? "5px" : "8px"),
                width: isMobile ? "100%" : (window.innerWidth <= 768 ? "100%" : "auto"),
                height: "fit-content",
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isMobile ? "Enter your email address" : ""}
                  style={{
                    width: isMobile ? "100%" : (window.innerWidth <= 768 ? "calc(100% - 25px)" : window.innerWidth > 1200 ? "500px" : "400px"),
                    padding: isMobile ? "12px 16px" : (window.innerWidth <= 480 ? "4px 6px" : window.innerWidth <= 768 ? "4px 6px" : window.innerWidth > 1200 ? "5px 7px" : "4px 6px"),
                    fontSize: isMobile ? "16px" : "13px", // 16px prevents zoom on iOS
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    height: isMobile ? "auto" : (window.innerWidth <= 480 ? "18px" : window.innerWidth <= 768 ? "18px" : window.innerWidth > 1200 ? "20px" : "18px"),
                    marginLeft: isMobile ? "0" : (window.innerWidth > 768 ? "20px" : "0"),
                    flex: isMobile ? "1" : (window.innerWidth <= 768 ? "1" : "none"),
                    borderRadius: isMobile ? "4px" : "0px",
                    minHeight: isMobile ? "48px" : "auto", // Touch target size
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  style={{
                    width: isMobile ? "24px" : (window.innerWidth <= 480 ? "16px" : window.innerWidth <= 768 ? "16px" : window.innerWidth > 1200 ? "18px" : "16px"),
                    height: isMobile ? "24px" : (window.innerWidth <= 480 ? "16px" : window.innerWidth <= 768 ? "16px" : window.innerWidth > 1200 ? "18px" : "16px"),
                    fontSize: isMobile ? "16px" : "13px",
                    color: "white",
                    backgroundColor: "#1E70BC",
                    border: "1px solid #428bca",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                    minWidth: isMobile ? "44px" : "auto", // Touch target size
                    minHeight: isMobile ? "44px" : "auto", // Touch target size
                  }}
                >
                  ?
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div style={{
                color: "#d9534f",
                fontSize: isMobile ? "14px" : "12px",
                marginBottom: isMobile ? "16px" : "10px",
                textAlign: isMobile ? "left" : (window.innerWidth <= 480 ? "center" : "left"),
                padding: isMobile ? "8px 12px" : "0",
                backgroundColor: isMobile ? "#f8d7da" : "transparent",
                border: isMobile ? "1px solid #f5c6cb" : "none",
                borderRadius: isMobile ? "4px" : "0px",
              }}>
                {error}
              </div>
            )}

            {/* Buttons positioned at opposite ends */}
            <div
              style={{
                marginBottom: isMobile ? "16px" : (window.innerWidth <= 768 ? "10px" : "12px"),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#E5E5E5",
                height: "fit-content",
                minHeight: isMobile ? "60px" : (window.innerWidth <= 480 ? "30px" : window.innerWidth <= 768 ? "30px" : window.innerWidth > 1200 ? "32px" : "30px"),
                border: "1px solid #ccc",
                padding: isMobile ? "8px 12px" : (window.innerWidth <= 480 ? "3px 5px" : "3px"),
                borderRadius: isMobile ? "4px" : "0px",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/gov.au/lusc/login")}
                style={{
                  padding: isMobile ? "5px 25px" : (window.innerWidth <= 480 ? "4px 6px" : window.innerWidth <= 768 ? "4px 8px" : window.innerWidth > 1200 ? "5px 14px" : "4px 11px"),
                  // fontSize: isMobile ? "16px" : "13px",
                  // color: "black",
                  // backgroundColor: "#f5f5f5",
                  // border: "1px solid black",
                  // borderRadius: isMobile ? "6px" : "3px",
                  // cursor: "pointer",
                  // height: "fit-content",
                  // minHeight: isMobile ? "48px" : (window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "22px" : window.innerWidth > 1200 ? "24px" : "22px"),
                  // marginLeft: isMobile ? "0" : (window.innerWidth <= 480 ? "5px" : "10px"),
                  // fontWeight: isMobile ? "600" : "normal",
                  // flex: isMobile ? "1" : "none",
                   border: "1px solid black",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleNext}
                style={{
                  padding: isMobile ? "5px 25px" : (window.innerWidth <= 480 ? "4px 6px" : window.innerWidth <= 768 ? "4px 8px" : window.innerWidth > 1200 ? "5px 14px" : "4px 11px"),
                  // fontSize: isMobile ? "16px" : "13px",
                  // color: isMobile ? "white" : "black",
                  // backgroundColor: isMobile ? "#1B3564" : "#f5f5f5",
                  // border: isMobile ? "1px solid #1B3564" : "1px solid black",
                  // borderRadius: isMobile ? "6px" : "3px",
                  // cursor: "pointer",
                  // height: "fit-content",
                  // minHeight: isMobile ? "48px" : (window.innerWidth <= 480 ? "22px" : window.innerWidth <= 768 ? "22px" : window.innerWidth > 1200 ? "24px" : "22px"),
                  // marginRight: isMobile ? "0" : (window.innerWidth <= 480 ? "5px" : "10px"),
                  // whiteSpace: "nowrap",
                  // fontWeight: isMobile ? "600" : "normal",
                  // flex: isMobile ? "1" : "none",
                  border: "1px solid black",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
