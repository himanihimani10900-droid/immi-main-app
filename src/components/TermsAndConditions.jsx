/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/People smiling on a stripey blue background.jpg"; 

const SkillsInDemandVerification = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    acceptTerms: false,
  });

  // Screen size state for responsiveness
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Handle screen resize
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

  // Responsive breakpoints
  const isMobile = screenSize.width <= 480;
  const isTablet = screenSize.width > 480 && screenSize.width <= 768;
  const isLaptop = screenSize.width > 768 && screenSize.width <= 1024;
  const isDesktop = screenSize.width > 1024;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
      {/* Main Content Area */}
      <div
        style={{
          padding: isMobile ? "3px" : isTablet ? "4px" : "5px",
          backgroundColor: "#CCCCCC",
          flex: "1",
          display: "flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          gap: isMobile ? "8px" : isTablet ? "12px" : "15px",
        }}
      >
        {/* Main Form Container */}
        <div
          style={{
            flex: "1",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
            height: "fit-content",
            width: isMobile || isTablet ? "100%" : "auto",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <header
            style={{
              background: "#072243",
              height: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "6px 10px" : isTablet ? "7px 12px" : "8px 15px",
              color: "white",
              fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
              fontWeight: "bold",
              flexWrap: "wrap",
              gap: isMobile ? "4px" : "8px",
            }}
          >
            <span style={{ 
              fontSize: isMobile ? "9px" : isTablet ? "10px" : "12px",
              lineHeight: "1.2"
            }}>
              {isMobile ? "Skills in Demand visa" : "Nomination for a Skills in Demand visa"}
            </span>
            <span style={{ fontSize: isMobile ? "9px" : isTablet ? "10px" : "12px" }}>
              1/17
            </span>
          </header>

          {/* Progress Bar */}
          <div
            style={{
              padding: isMobile ? "6px 10px" : isTablet ? "7px 12px" : "8px 15px",
              backgroundColor: "#f8f9fa",
              borderBottom: "1px solid #dee2e6",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "#e0e0e0",
                height: isMobile ? "6px" : isTablet ? "7px" : "8px",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  width: "6%",
                  backgroundColor: "#0066cc",
                  height: "100%",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          </div>

          {/* Content Section */}
          <div style={{ 
            padding: isMobile ? "12px" : isTablet ? "16px" : "20px",
            maxWidth: "100%",
            boxSizing: "border-box"
          }}>
            {/* Main Heading */}
            <h1
              style={{
                fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
                marginTop: "0",
                marginBottom: isMobile ? "12px" : isTablet ? "14px" : "16px",
                fontWeight: "normal",
                color: "#0066cc",
                lineHeight: "1.3",
              }}
            >
              Terms and Conditions
            </h1>

            {/* Links Section */}
            <div style={{ marginBottom: isMobile ? "15px" : isTablet ? "18px" : "20px" }}>
              <div style={{ marginBottom: isMobile ? "6px" : "8px" }}>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                    textDecoration: "underline",
                    cursor: "pointer",
                    lineHeight: "1.4",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  View Terms and Conditions
                </a>
              </div>
              <div style={{ marginBottom: isMobile ? "12px" : isTablet ? "14px" : "16px" }}>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                    textDecoration: "underline",
                    cursor: "pointer",
                    lineHeight: "1.4",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  View Privacy statement
                </a>
              </div>
            </div>

            {/* Checkbox Section */}
            <div
              style={{
                marginBottom: isMobile ? "15px" : isTablet ? "18px" : "20px",
                display: "flex",
                alignItems: "flex-start",
                gap: isMobile ? "6px" : "8px",
              }}
            >
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  handleInputChange("acceptTerms", e.target.checked)
                }
                style={{
                  marginTop: "2px",
                  cursor: "pointer",
                  width: isMobile ? "14px" : isTablet ? "15px" : "16px",
                  height: isMobile ? "14px" : isTablet ? "15px" : "16px",
                  minWidth: isMobile ? "14px" : isTablet ? "15px" : "16px",
                }}
              />
              <label
                htmlFor="acceptTerms"
                style={{
                  fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                  color: "#333",
                  cursor: "pointer",
                  lineHeight: "1.4",
                  flex: 1,
                }}
              >
                I have read and agree to the terms and conditions
              </label>
            </div>

            {/* Image Section */}
            <div style={{ 
              marginBottom: isMobile ? "15px" : isTablet ? "18px" : "20px",
              textAlign: "center"
            }}>
              <img
                src={image}
                alt="People smiling on a stripey blue background"
                style={{
                  width: "100%",
                  maxWidth: isMobile ? "280px" : isTablet ? "400px" : "500px",
                  height: "auto",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
                onError={(e) => {
                  // Fallback in case the image doesn't load
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
            </div>

            {/* Bottom Buttons Section */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "stretch" : "center",
                borderTop: "1px solid #dee2e6",
                paddingTop: isMobile ? "12px" : isTablet ? "14px" : "15px",
                marginTop: isMobile ? "15px" : isTablet ? "18px" : "20px",
                gap: isMobile ? "10px" : "0",
              }}
            >
              {/* Left side buttons */}
              <div style={{ 
                display: "flex", 
                gap: isMobile ? "8px" : "10px",
                flexWrap: "wrap",
                justifyContent: isMobile ? "center" : "flex-start"
              }}>
                <button
                  type="button"
                  style={{
                    padding: isMobile ? "5px 10px" : isTablet ? "6px 11px" : "6px 12px",
                    fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                    color: "#333",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    minWidth: "fit-content",
                  }}
                >
                  🖨️ Print
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/gov.au/lusc/dashboard")}
                  style={{
                    padding: isMobile ? "5px 10px" : isTablet ? "6px 11px" : "6px 12px",
                    fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                    color: "#333",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    minWidth: "fit-content",
                  }}
                >
                  👤 {isMobile ? "My account" : "Go to my account"}
                </button>
              </div>

              {/* Right side Next button */}
              <button
                type="button"
                onClick={() => navigate("/gov.au/lusc/submit-form")}
                disabled={!formData.acceptTerms}
                style={{
                  padding: isMobile ? "5px 10px" : isTablet ? "6px 11px" : "6px 12px",
                  fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                  color: formData.acceptTerms ? "#fff" : "#666",
                  backgroundColor: formData.acceptTerms ? "#0066cc" : "#e0e0e0",
                  border: "1px solid #ccc",
                  borderRadius: "3px",
                  cursor: formData.acceptTerms ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  minWidth: "fit-content",
                  marginTop: isMobile ? "0" : "0",
                }}
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>

        {/* Related Links Sidebar */}
        <div
          style={{
            width: isMobile || isTablet ? "100%" : "280px",
            height: "fit-content",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Related Links Section */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#ffffff",
              marginBottom: isMobile ? "12px" : isTablet ? "16px" : "20px",
            }}
          >
            <header
              style={{
                background: "#072243",
                padding: isMobile ? "6px 10px" : isTablet ? "7px 12px" : "8px 15px",
                color: "white",
                fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                fontWeight: "bold",
              }}
            >
              Related Links
            </header>

            <div style={{ padding: isMobile ? "10px" : isTablet ? "12px" : "15px" }}>
              <div style={{ marginBottom: isMobile ? "6px" : "8px" }}>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                    textDecoration: "underline",
                    display: "block",
                    marginBottom: isMobile ? "4px" : "6px",
                    lineHeight: "1.4",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Skills in Demand information
                </a>
              </div>
              <div style={{ marginBottom: isMobile ? "6px" : "8px" }}>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                    textDecoration: "underline",
                    display: "block",
                    marginBottom: isMobile ? "4px" : "6px",
                    lineHeight: "1.4",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Visa Pricing Estimator
                </a>
              </div>
              <div>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                    textDecoration: "underline",
                    display: "block",
                    lineHeight: "1.4",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Processing times
                </a>
              </div>
            </div>
          </div>

          {/* Help and Support Section */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#ffffff",
            }}
          >
            <header
              style={{
                background: "#072243",
                padding: isMobile ? "6px 10px" : isTablet ? "7px 12px" : "8px 15px",
                color: "white",
                fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                fontWeight: "bold",
              }}
            >
              Help and Support
            </header>

            <div style={{ padding: isMobile ? "10px" : isTablet ? "12px" : "15px" }}>
              <a
                href="#"
                style={{
                  color: "#0066cc",
                  fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                  textDecoration: "underline",
                  display: "block",
                  marginBottom: isMobile ? "4px" : "6px",
                  lineHeight: "1.4",
                }}
                onClick={(e) => e.preventDefault()}
              >
                Contact us
              </a>
              <a
                href="#"
                style={{
                  color: "#0066cc",
                  fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                  textDecoration: "underline",
                  display: "block",
                  marginBottom: isMobile ? "4px" : "6px",
                  lineHeight: "1.4",
                }}
                onClick={(e) => e.preventDefault()}
              >
                Client service charter
              </a>
              <a
                href="#"
                style={{
                  color: "#0066cc",
                  fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                  textDecoration: "underline",
                  display: "block",
                  marginBottom: isMobile ? "4px" : "6px",
                  lineHeight: "1.4",
                }}
                onClick={(e) => e.preventDefault()}
              >
                Client feedback
              </a>
              <a
                href="#"
                style={{
                  color: "#0066cc",
                  fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                  textDecoration: "underline",
                  display: "block",
                  marginBottom: isMobile ? "4px" : "6px",
                  lineHeight: "1.4",
                }}
                onClick={(e) => e.preventDefault()}
              >
                ImmiAccount support
              </a>
              <a
                href="#"
                style={{
                  color: "#0066cc",
                  fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                  textDecoration: "underline",
                  display: "block",
                  lineHeight: "1.4",
                }}
                onClick={(e) => e.preventDefault()}
              >
                Translation services
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsInDemandVerification;
