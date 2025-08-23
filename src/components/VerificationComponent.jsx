/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: 'individual',
    familyName: '',
    givenNames: '',
    phone: '',
    mobilePhone: ''
  });
  const [errors, setErrors] = useState({});

  // Screen size state for input field responsiveness only
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

  // Only check for mobile for input fields
  const isMobile = screenSize.width <= 768;

  useEffect(() => {
    // Check if email data exists, if not redirect back
    const existingData = localStorage.getItem('signupData');
    if (!existingData) {
      navigate("/gov.au/lusc/signup");
    }
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.familyName.trim()) {
      newErrors.familyName = "Family name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      return;
    }

    // Merge with existing data
    const existingData = JSON.parse(localStorage.getItem('signupData') || '{}');
    const updatedData = {
      ...existingData,
      ...formData
    };
    
    localStorage.setItem('signupData', JSON.stringify(updatedData));
    navigate("/gov.au/lusc/create-account");
  };

  // Helper function to get responsive input width - ONLY change for input fields
  const getInputWidth = () => {
    if (isMobile) {
      return "calc(100% - 25px)"; // Mobile responsive width
    }
    return window.innerWidth <= 768 ? "calc(100% - 20px)" : window.innerWidth > 1200 ? "400px" : "320px";
  };

  // Helper function to get responsive input font size - ONLY for inputs
  const getInputFontSize = () => {
    return isMobile ? "16px" : "13px"; // 16px prevents zoom on mobile
  };

  // Helper function to get responsive input padding - ONLY for inputs
  const getInputPadding = () => {
    if (isMobile) {
      return "8px 12px";
    }
    return window.innerWidth <= 480 ? "3px 5px" : window.innerWidth <= 768 ? "3px 5px" : window.innerWidth > 1200 ? "4px 6px" : "3px 5px";
  };

  // Helper function to get responsive input height - ONLY for inputs
  const getInputHeight = () => {
    if (isMobile) {
      return "auto";
    }
    return window.innerWidth <= 480 ? "16px" : window.innerWidth <= 768 ? "16px" : window.innerWidth > 1200 ? "18px" : "16px";
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
          padding: window.innerWidth <= 768 ? "10px" : "20px",
          backgroundColor: "#CCCCCC",
          flex: "1",
        }}
      >
        {/* Header and Content Container */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: window.innerWidth <= 768 ? "10px" : "20px",
            backgroundColor: "#ffffff",
            maxWidth: window.innerWidth <= 768 ? "100%" : "none",
            height: "fit-content",
          }}
        >
          {/* Header */}
          <header
            style={{
              background: "#1B3564",
              height: "fit-content",
              minHeight: window.innerWidth <= 768 ? "25px" : "20px",
              display: "flex",
              alignItems: "center",
              padding: window.innerWidth <= 768 ? "5px 10px" : "5px 15px",
              color: "white",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            Create an ImmiAccount
          </header>

          {/* Content Section */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: window.innerWidth <= 480 ? "12px" : window.innerWidth <= 768 ? "15px" : "18px",
              height: "fit-content",
            }}
          >
            {/* Services Required Section */}
            <h1
              style={{
                fontSize: "13px",
                marginTop: "0",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                fontWeight: "normal",
                color: "#1B3564",
                textAlign: window.innerWidth <= 480 ? "center" : "left",
              }}
            >
              Services Required
            </h1>

            <p
              style={{
                marginTop: "0",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                fontSize: "13px",
                color: "#000000",
                textAlign: window.innerWidth <= 480 ? "center" : "left",
              }}
            >
              Fields marked <span style={{ color: "#d9534f" }}>*</span> must be completed.
            </p>

            {/* Service Type Selection */}
            <div style={{ 
              marginBottom: window.innerWidth <= 768 ? "15px" : "18px", 
              height: "fit-content",
            }}>
              <p
                style={{
                  marginTop: "0",
                  marginBottom: window.innerWidth <= 768 ? "8px" : "10px",
                  fontSize: "13px",
                  color: "#333",
                  textAlign: window.innerWidth <= 480 ? "center" : "left",
                }}
              >
                What type of online services do you need? <span style={{ color: "#d9534f" }}>*</span>
              </p>

              {/* Radio Button Options - Now in same line */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: window.innerWidth <= 768 ? "15px" : "30px",
                flexWrap: window.innerWidth <= 480 ? "wrap" : "nowrap",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <input
                    type="radio"
                    id="individual"
                    name="serviceType"
                    value="individual"
                    checked={formData.serviceType === 'individual'}
                    onChange={(e) => handleInputChange('serviceType', e.target.value)}
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  <label
                    htmlFor="individual"
                    style={{
                      fontSize: "13px",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Individual
                  </label>
                  <button
                    type="button"
                    style={{
                      width: "14px",
                      height: "14px",
                      fontSize: "10px",
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
                    }}
                  >
                    ?
                  </button>
                </div>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <input
                    type="radio"
                    id="organisation"
                    name="serviceType"
                    value="organisation"
                    checked={formData.serviceType === 'organisation'}
                    onChange={(e) => handleInputChange('serviceType', e.target.value)}
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  <label
                    htmlFor="organisation"
                    style={{
                      fontSize: "13px",
                      color: "#333",
                      cursor: "pointer",
                    }}
                  >
                    Organisation (including agents)
                  </label>
                  <button
                    type="button"
                    style={{
                      width: "14px",
                      height: "14px",
                      fontSize: "10px",
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
                    }}
                  >
                    ?
                  </button>
                </div>
              </div>
            </div>

            {/* New User Details Section */}
            <h2
              style={{
                fontSize: "13px",
                marginTop: window.innerWidth <= 768 ? "15px" : "18px",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                fontWeight: "normal",
                color: "#1B3564",
                textAlign: window.innerWidth <= 480 ? "center" : "left",
              }}
            >
              New User Details
            </h2>

            {/* Family Name Input */}
            <div style={{ 
              marginBottom: window.innerWidth <= 768 ? "10px" : "12px", 
              display: "flex", 
              alignItems: "center", 
              gap: window.innerWidth <= 480 ? "5px" : "8px",
              flexDirection: window.innerWidth <= 768 ? "column" : "row",
              alignItems: window.innerWidth <= 768 ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: window.innerWidth > 768 ? "100px" : "auto",
                  textAlign: window.innerWidth <= 768 ? "left" : "left",
                  marginBottom: window.innerWidth <= 768 ? "3px" : "0",
                }}
              >
                Family name <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: window.innerWidth <= 480 ? "5px" : "8px",
                width: window.innerWidth <= 768 ? "100%" : "auto",
                height: "fit-content",
              }}>
                <input
                  type="text"
                  value={formData.familyName}
                  onChange={(e) => handleInputChange('familyName', e.target.value)}
                  style={{
                    width: getInputWidth(),
                    padding: getInputPadding(),
                    fontSize: getInputFontSize(),
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    height: getInputHeight(),
                    marginLeft: window.innerWidth > 768 ? "20px" : "0",
                    flex: window.innerWidth <= 768 ? "1" : "none",
                    minHeight: isMobile ? "44px" : "auto", // Touch target only on mobile
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  style={{
                    width: window.innerWidth <= 480 ? "14px" : window.innerWidth <= 768 ? "14px" : window.innerWidth > 1200 ? "16px" : "14px",
                    height: window.innerWidth <= 480 ? "14px" : window.innerWidth <= 768 ? "14px" : window.innerWidth > 1200 ? "16px" : "14px",
                    fontSize: "10px",
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
                  }}
                >
                  ?
                </button>
              </div>
            </div>

            {/* Error message for family name */}
            {errors.familyName && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: window.innerWidth > 768 ? "120px" : "0",
              }}>
                {errors.familyName}
              </div>
            )}

            {/* Given Names Input */}
            <div style={{ 
              marginBottom: window.innerWidth <= 768 ? "10px" : "12px", 
              display: "flex", 
              alignItems: "center", 
              gap: window.innerWidth <= 480 ? "5px" : "8px",
              flexDirection: window.innerWidth <= 768 ? "column" : "row",
              alignItems: window.innerWidth <= 768 ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: window.innerWidth > 768 ? "100px" : "auto",
                  textAlign: window.innerWidth <= 768 ? "left" : "left",
                  marginBottom: window.innerWidth <= 768 ? "3px" : "0",
                }}
              >
                Given names
              </label>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: window.innerWidth <= 480 ? "5px" : "8px",
                width: window.innerWidth <= 768 ? "100%" : "auto",
                height: "fit-content",
              }}>
                <input
                  type="text"
                  value={formData.givenNames}
                  onChange={(e) => handleInputChange('givenNames', e.target.value)}
                  style={{
                    width: getInputWidth(),
                    padding: getInputPadding(),
                    fontSize: getInputFontSize(),
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    height: getInputHeight(),
                    marginLeft: window.innerWidth > 768 ? "20px" : "0",
                    flex: window.innerWidth <= 768 ? "1" : "none",
                    minHeight: isMobile ? "44px" : "auto", // Touch target only on mobile
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  style={{
                    width: window.innerWidth <= 480 ? "14px" : window.innerWidth <= 768 ? "14px" : window.innerWidth > 1200 ? "16px" : "14px",
                    height: window.innerWidth <= 480 ? "14px" : window.innerWidth <= 768 ? "14px" : window.innerWidth > 1200 ? "16px" : "14px",
                    fontSize: "10px",
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
                  }}
                >
                  ?
                </button>
              </div>
            </div>

            {/* Phone Input */}
            <div style={{
              marginBottom: window.innerWidth <= 768 ? "10px" : "12px", 
              display: "flex", 
              alignItems: "center", 
              gap: window.innerWidth <= 480 ? "5px" : "8px",
              flexDirection: window.innerWidth <= 768 ? "column" : "row",
              alignItems: window.innerWidth <= 768 ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: window.innerWidth > 768 ? "100px" : "auto",
                  textAlign: window.innerWidth <= 768 ? "left" : "left",
                  marginBottom: window.innerWidth <= 768 ? "3px" : "0",
                }}
              >
                Phone <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  width: isMobile ? "100%" : (window.innerWidth <= 768 ? "100%" : window.innerWidth > 1200 ? "400px" : "320px"),
                  padding: getInputPadding(),
                  fontSize: getInputFontSize(),
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  height: getInputHeight(),
                  marginLeft: window.innerWidth > 768 ? "20px" : "0",
                  minHeight: isMobile ? "44px" : "auto", // Touch target only on mobile
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error message for phone */}
            {errors.phone && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: window.innerWidth > 768 ? "120px" : "0",
              }}>
                {errors.phone}
              </div>
            )}

            {/* Mobile Phone Input */}
            <div style={{ 
              marginBottom: window.innerWidth <= 768 ? "10px" : "12px", 
              display: "flex", 
              alignItems: "center", 
              gap: window.innerWidth <= 480 ? "5px" : "8px",
              flexDirection: window.innerWidth <= 768 ? "column" : "row",
              alignItems: window.innerWidth <= 768 ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: window.innerWidth > 768 ? "100px" : "auto",
                  textAlign: window.innerWidth <= 768 ? "left" : "left",
                  marginBottom: window.innerWidth <= 768 ? "3px" : "0",
                }}
              >
                Mobile phone
              </label>
              
              <input
                type="tel"
                value={formData.mobilePhone}
                onChange={(e) => handleInputChange('mobilePhone', e.target.value)}
                style={{
                  width: isMobile ? "100%" : (window.innerWidth <= 768 ? "100%" : window.innerWidth > 1200 ? "400px" : "320px"),
                  padding: getInputPadding(),
                  fontSize: getInputFontSize(),
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  height: getInputHeight(),
                  marginLeft: window.innerWidth > 768 ? "20px" : "0",
                  minHeight: isMobile ? "44px" : "auto", // Touch target only on mobile
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Buttons positioned at opposite ends */}
            <div
              style={{
                marginTop: window.innerWidth <= 768 ? "15px" : "18px",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#E5E5E5",
                height: "fit-content",
                minHeight: window.innerWidth <= 480 ? "28px" : window.innerWidth <= 768 ? "28px" : window.innerWidth > 1200 ? "30px" : "28px",
                border: "1px solid #ccc",
                padding: window.innerWidth <= 480 ? "3px 5px" : "3px",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/gov.au/lusc/signup")}
                style={{
                  padding: window.innerWidth <= 480 ? "3px 8px" : window.innerWidth <= 768 ? "3px 10px" : window.innerWidth > 1200 ? "4px 12px" : "3px 9px",
                  fontSize: "13px",
                  color: "black",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid black",
                  borderRadius: "3px",
                  cursor: "pointer",
                  height: "fit-content",
                  minHeight: window.innerWidth <= 480 ? "20px" : window.innerWidth <= 768 ? "20px" : window.innerWidth > 1200 ? "22px" : "20px",
                  marginLeft: window.innerWidth <= 480 ? "5px" : "10px",
                }}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                type="button"
                style={{
                  padding: window.innerWidth <= 480 ? "3px 6px" : window.innerWidth <= 768 ? "3px 8px" : window.innerWidth > 1200 ? "4px 12px" : "3px 9px",
                  fontSize: "13px",
                  color: "black",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid black",
                  borderRadius: "3px",
                  cursor: "pointer",
                  height: "fit-content",
                  minHeight: window.innerWidth <= 480 ? "20px" : window.innerWidth <= 768 ? "20px" : window.innerWidth > 1200 ? "22px" : "20px",
                  marginRight: window.innerWidth <= 480 ? "5px" : "10px",
                  whiteSpace: "nowrap",
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

export default VerificationCode;
