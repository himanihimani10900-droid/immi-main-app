import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RazorpayButton from "./RazorPay";
import PaymentQR from "./PaymetQR";

const StudentGuardianVisaApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    familyName: "",
    givenNames: "",
    sex: "",
    dateOfBirth: "",
    passportNumber: "",
    countryOfPassport: "",
    nationalityOfPassportHolder: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    placeOfIssue: "",
    hasNationalIdentityCard: "",
    townCity: "",
    stateProvince: "",
    countryOfBirth: "",
    relationshipStatus: "",
    hasOtherNames: "",
    isCitizenOfPassportCountry: "",
    isCitizenOfOtherCountry: "",
    hasOtherCurrentPassports: "",
    hasOtherIdentityDocuments: "",
    hasHealthExamination: "",
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentQR, setShowPaymentQR] = useState(false); // New state for PaymentQR popup

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (errorMessage) setErrorMessage("");
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "familyName",
      "givenNames",
      "sex",
      "dateOfBirth",
      "passportNumber",
      "countryOfPassport",
      "nationalityOfPassportHolder",
      "dateOfIssue",
      "dateOfExpiry",
      "placeOfIssue",
      "hasNationalIdentityCard",
      "townCity",
      "stateProvince",
      "countryOfBirth",
      "relationshipStatus",
      "hasOtherNames",
      "isCitizenOfPassportCountry",
      "isCitizenOfOtherCountry",
      "hasOtherCurrentPassports",
      "hasOtherIdentityDocuments",
      "hasHealthExamination",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    if (!validateForm()) {
      setErrorMessage("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    const authToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!authToken || !userId) {
      setErrorMessage("Authentication required. Please log in again.");
      setIsSubmitting(false);
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const payload = {
      user_id: userId,
      familyName: formData.familyName,
      givenNames: formData.givenNames,
      sex: formData.sex,
      dateOfBirth: formData.dateOfBirth,
      passportNumber: formData.passportNumber,
      countryOfPassport: formData.countryOfPassport,
      nationality: formData.nationalityOfPassportHolder,
      passportDateOfIssue: formData.dateOfIssue,
      passportDateOfExpiry: formData.dateOfExpiry,
      passportPlaceOfIssue: formData.placeOfIssue,
      hasNationalIDCard: formData.hasNationalIdentityCard === "Yes",
      placeOfBirthTownCity: formData.townCity,
      placeOfBirthStateProvince: formData.stateProvince,
      placeOfBirthCountry: formData.countryOfBirth,
      relationshipStatus: formData.relationshipStatus,
      hasOtherNames: formData.hasOtherNames === "Yes",
      isCitizenOfPassportCountry: formData.isCitizenOfPassportCountry === "Yes",
      hasOtherCitizenship: formData.isCitizenOfOtherCountry === "Yes",
      hasOtherPassports: formData.hasOtherCurrentPassports === "Yes",
      hasOtherIdentityDocs: formData.hasOtherIdentityDocuments === "Yes",
      hasUndertakenHealthExam: formData.hasHealthExamination === "Yes",
    };

    try {
      const response = await fetch(
        "https://immi-backend.up.railway.app/userInfo/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Form submitted successfully:", result);
        setSuccessMessage(
          "Form submitted successfully! Please proceed with payment."
        );
        setIsSubmitted(true);
        setIsSubmitting(false);
        // Show PaymentQR popup immediately after successful submission
        setShowPaymentQR(true);
      } else {
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
        setErrorMessage(
          `Submission failed: ${errorData.message || "Unknown error occurred"}`
        );
        setIsSubmitted(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setIsSubmitted(false);
      setIsSubmitting(false);
    }
  };

  const getInputStyle = (fieldName) => ({
    padding: isMobile ? "8px 12px" : "4px 8px",
    fontSize: isMobile ? "16px" : "12px", // 16px prevents zoom on mobile
    border: errors[fieldName] ? "1px solid #dc3545" : "1px solid #ccc",
    borderRadius: isMobile ? "4px" : "0px",
    backgroundColor: errors[fieldName] ? "#fff5f5" : "#ffffff",
    width: isMobile ? "100%" : "auto",
    boxSizing: isMobile ? "border-box" : "content-box",
  });

  // If form is successfully submitted, show only the payment component
  if (isSubmitted) {
    return (
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          margin: "0 auto",
          backgroundColor: "#e5e5e5",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* PaymentQR Popup */}
        <PaymentQR 
          isOpen={showPaymentQR} 
          onClose={() => setShowPaymentQR(false)} 
        />

        <div
          style={{
            padding: isMobile ? "8px" : "5px",
            backgroundColor: "#e5e5e5",
            flex: "1",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "15px" : "20px",
            maxWidth: isMobile ? "100%" : "1280px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Payment Container */}
          <div
            style={{
              width: isMobile ? "100%" : "980px",
              border: "1px solid #ccc",
              borderRadius: "0px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <header
              style={{
                background: "#072243",
                height: isMobile ? "45px" : "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? "0 12px" : "0 16px",
                color: "white",
                fontSize: isMobile ? "14px" : "12px",
                fontWeight: "bold",
              }}
            >
              <span>
                {isMobile
                  ? "Payment - Guardian Visa"
                  : "Payment - Student Guardian Visa"}
              </span>
              <span>Payment</span>
            </header>

            {/* Progress Bar */}
            <div
              style={{
                height: isMobile ? "25px" : "20px",
                padding: isMobile ? "6px 12px" : "6px 16px",
                backgroundColor: "#f8f9fa",
                borderBottom: "1px solid #dee2e6",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#e0e0e0",
                  height: isMobile ? "12px" : "10px",
                  borderRadius: "0px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#28a745",
                    height: "100%",
                    borderRadius: "0px",
                  }}
                ></div>
              </div>
            </div>

            {/* Payment Content */}
            <div style={{ padding: isMobile ? "16px" : "20px", flex: "1" }}>
              <h2
                style={{
                  fontSize: isMobile ? "18px" : "16px",
                  color: "#0066cc",
                  margin: "0 0 16px 0",
                  fontWeight: "normal",
                }}
              >
                Complete Your Payment
              </h2>

              <div
                style={{
                  fontSize: isMobile ? "14px" : "12px",
                  color: "#333",
                  marginBottom: "20px",
                  lineHeight: "1.4",
                }}
              >
                <strong>Congratulations!</strong> Your visa application form has
                been submitted successfully. Please complete the payment below
                to finalize your application process.
              </div>

              {/* Payment Options */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    border: "2px solid #0066cc",
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "16px" : "14px",
                      color: "#0066cc",
                      margin: "0 0 12px 0",
                    }}
                  >
                    Payment Amount: $620 AUD
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      margin: "0 0 16px 0",
                      color: "#333",
                    }}
                  >
                    Student Guardian Visa Application Fee
                  </p>
                  
                  {/* Payment Buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexDirection: isMobile ? "column" : "row",
                    }}
                  >
                    <button
                      onClick={() => setShowPaymentQR(true)}
                      style={{
                        padding: isMobile ? "12px 20px" : "10px 16px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: isMobile ? "14px" : "12px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Pay with QR Code
                    </button>
                    
                    {/* <RazorpayButton /> */}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: isMobile ? "stretch" : "center",
                  borderTop: "1px solid #dee2e6",
                  paddingTop: "20px",
                  marginTop: "30px",
                  gap: isMobile ? "10px" : "0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: isMobile ? "8px" : "10px",
                    flexDirection: isMobile ? "column" : "row",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSuccessMessage("");
                    }}
                    style={{
                      padding: isMobile ? "12px 16px" : "6px 12px",
                      fontSize: isMobile ? "16px" : "12px",
                      color: "#333",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ccc",
                      borderRadius: "0px",
                      cursor: "pointer",
                      minHeight: isMobile ? "48px" : "auto",
                    }}
                  >
                    ◀ {isMobile ? "Back" : "Back to Form"}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/gov.au/lusc/dashboard")}
                    style={{
                      padding: isMobile ? "12px 16px" : "6px 12px",
                      fontSize: isMobile ? "16px" : "12px",
                      color: "#333",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ccc",
                      borderRadius: "0px",
                      cursor: "pointer",
                      minHeight: isMobile ? "48px" : "auto",
                    }}
                  >
                    {isMobile ? "Dashboard" : "Go to Dashboard"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - only show on desktop/laptop */}
          {!isMobile && (
            <div style={{ width: "260px", height: "fit-content" }}>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "0px",
                  backgroundColor: "#ffffff",
                  marginBottom: "20px",
                }}
              >
                <header
                  style={{
                    background: "#1e3a5f",
                    padding: "8px 16px",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Payment Information
                </header>
                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#333",
                      lineHeight: "1.4",
                    }}
                  >
                    <p>
                      <strong>Application Status:</strong> Form Submitted
                    </p>
                    <p>
                      <strong>Next Step:</strong> Complete Payment
                    </p>
                    <p>
                      <strong>Processing:</strong> After payment completion,
                      your application will be processed within 5-7 business
                      days.
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "0px",
                  backgroundColor: "#ffffff",
                }}
              >
                <header
                  style={{
                    background: "#1e3a5f",
                    padding: "8px 16px",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Help and Support
                </header>
                <div style={{ padding: "16px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#0066cc",
                      fontSize: "12px",
                      textDecoration: "underline",
                      display: "block",
                      marginBottom: "8px",
                      lineHeight: "16px",
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Payment Support
                  </a>
                  <a
                    href="#"
                    style={{
                      color: "#0066cc",
                      fontSize: "12px",
                      textDecoration: "underline",
                      display: "block",
                      marginBottom: "8px",
                      lineHeight: "16px",
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Contact us
                  </a>
                  <a
                    href="#"
                    style={{
                      color: "#0066cc",
                      fontSize: "12px",
                      textDecoration: "underline",
                      display: "block",
                      marginBottom: "8px",
                      lineHeight: "16px",
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Processing times
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original form content - keeping your exact laptop UI, adding mobile responsiveness
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        backgroundColor: "#e5e5e5",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* PaymentQR Popup - can also be shown during form state if needed */}
      <PaymentQR 
        isOpen={showPaymentQR} 
        onClose={() => setShowPaymentQR(false)} 
      />

      {/* Main Content Area */}
      <div
        style={{
          padding: isMobile ? "8px" : "5px",
          backgroundColor: "#e5e5e5",
          flex: "1",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "15px" : "20px",
          maxWidth: isMobile ? "100%" : "1280px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Main Form Container */}
        <div
          style={{
            width: isMobile ? "100%" : "980px",
            border: "1px solid #ccc",
            borderRadius: "0px",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <header
            style={{
              background: "#072243",
              height: isMobile ? "45px" : "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "0 12px" : "0 16px",
              color: "white",
              fontSize: isMobile ? "14px" : "12px",
              fontWeight: "bold",
            }}
          >
            <span>
              {isMobile
                ? "Guardian Visa Application"
                : "Application for a Student Guardian Visa"}
            </span>
            <span>3/22</span>
          </header>

          {/* Progress Bar */}
          <div
            style={{
              height: isMobile ? "25px" : "20px",
              padding: isMobile ? "6px 12px" : "6px 16px",
              backgroundColor: "#f8f9fa",
              borderBottom: "1px solid #dee2e6",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "#e0e0e0",
                height: isMobile ? "12px" : "10px",
                borderRadius: "0px",
              }}
            >
              <div
                style={{
                  width: "14%",
                  backgroundColor: "#0066cc",
                  height: "100%",
                  borderRadius: "0px",
                }}
              ></div>
            </div>
          </div>

          {/* Content Section */}
          <div style={{ padding: isMobile ? "16px" : "20px", flex: "1" }}>
            {/* Error Message */}
            {errorMessage && (
              <div
                style={{
                  border: "1px solid #b10000",
                  margin: "0 0 20px 0",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#b10000",
                    color: "#fff",
                    padding: isMobile ? "8px 12px" : "6px 10px",
                    fontWeight: "bold",
                    fontSize: isMobile ? "14px" : 12,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: isMobile ? "12px" : 10,
                      height: isMobile ? "12px" : 10,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      marginRight: 8,
                      flexShrink: 0,
                    }}
                  />
                  An error has occurred
                </div>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: isMobile ? "15px" : 12,
                    color: "#333",
                    fontSize: isMobile ? "14px" : 12,
                    whiteSpace: "pre-line",
                  }}
                >
                  {errorMessage}
                </div>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                style={{
                  border: "1px solid #28a745",
                  margin: "0 0 20px 0",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    padding: isMobile ? "8px 12px" : "6px 10px",
                    fontWeight: "bold",
                    fontSize: isMobile ? "14px" : 12,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: isMobile ? "12px" : 10,
                      height: isMobile ? "12px" : 10,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      marginRight: 8,
                      flexShrink: 0,
                    }}
                  />
                  Success
                </div>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: isMobile ? "15px" : 12,
                    color: "#333",
                    fontSize: isMobile ? "14px" : 12,
                    whiteSpace: "pre-line",
                  }}
                >
                  {successMessage}
                </div>
              </div>
            )}

            {/* Primary applicant heading */}
            <h2
              style={{
                fontSize: isMobile ? "18px" : "16px",
                color: "#0066cc",
                margin: "0 0 16px 0",
                fontWeight: "normal",
              }}
            >
              Primary applicant
            </h2>

            {/* Privacy Statement */}
            <div
              style={{
                marginBottom: "20px",
                fontSize: isMobile ? "14px" : "12px",
                color: "#333",
                lineHeight: "1.4",
              }}
            >
              <strong>Information:</strong> Entering names incorrectly may
              result in denial of permission to board an aircraft to Australia,
              or result in delays in border processing on arrival in Australia,
              even if the applicant has been granted a visa.
            </div>

            {/* Passport details section */}
            <h3
              style={{
                fontSize: isMobile ? "16px" : "14px",
                color: "#0066cc",
                margin: "20px 0 12px 0",
                fontWeight: "normal",
              }}
            >
              Passport details ℹ️
            </h3>
            <div
              style={{
                fontSize: isMobile ? "14px" : "12px",
                color: "#333",
                marginBottom: "16px",
              }}
            >
              Enter the following details as they appear in the applicant's
              personal passport:
            </div>

            {/* Form Fields */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "16px" : "16px",
              }}
            >
              {/* Family name */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Family name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  <input
                    type="text"
                    value={formData.familyName}
                    onChange={(e) =>
                      handleInputChange("familyName", e.target.value)
                    }
                    style={{
                      ...getInputStyle("familyName"),
                      width: isMobile ? "100%" : "300px",
                      height: isMobile ? "auto" : "20px",
                    }}
                    required
                  />
                  <span
                    style={{
                      fontSize: isMobile ? "16px" : "12px",
                      color: "#0066cc",
                      cursor: "pointer",
                    }}
                  >
                    ℹ️
                  </span>
                </div>
              </div>

              {/* Given names */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Given names <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  <input
                    type="text"
                    value={formData.givenNames}
                    onChange={(e) =>
                      handleInputChange("givenNames", e.target.value)
                    }
                    style={{
                      ...getInputStyle("givenNames"),
                      width: isMobile ? "100%" : "300px",
                      height: isMobile ? "auto" : "20px",
                    }}
                    required
                  />
                  <span
                    style={{
                      fontSize: isMobile ? "16px" : "12px",
                      color: "#0066cc",
                      cursor: "pointer",
                    }}
                  >
                    ℹ️
                  </span>
                </div>
              </div>

              {/* Sex */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Sex <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: isMobile ? "12px" : "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: isMobile ? "8px" : "0",
                    }}
                  >
                    <input
                      type="radio"
                      name="sex"
                      value="Female"
                      checked={formData.sex === "Female"}
                      onChange={(e) => handleInputChange("sex", e.target.value)}
                      required
                      style={{
                        width: isMobile ? "18px" : "auto",
                        height: isMobile ? "18px" : "auto",
                      }}
                    />
                    Female
                  </label>
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: isMobile ? "8px" : "0",
                    }}
                  >
                    <input
                      type="radio"
                      name="sex"
                      value="Male"
                      checked={formData.sex === "Male"}
                      onChange={(e) => handleInputChange("sex", e.target.value)}
                      required
                      style={{
                        width: isMobile ? "18px" : "auto",
                        height: isMobile ? "18px" : "auto",
                      }}
                    />
                    Male
                  </label>
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: isMobile ? "8px" : "0",
                    }}
                  >
                    <input
                      type="radio"
                      name="sex"
                      value="Other"
                      checked={formData.sex === "Other"}
                      onChange={(e) => handleInputChange("sex", e.target.value)}
                      required
                      style={{
                        width: isMobile ? "18px" : "auto",
                        height: isMobile ? "18px" : "auto",
                      }}
                    />
                    Other
                  </label>
                </div>
              </div>

              {/* Date of birth */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Date of birth <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    style={{
                      ...getInputStyle("dateOfBirth"),
                      width: isMobile ? "160px" : "150px",
                      height: isMobile ? "auto" : "20px",
                    }}
                    required
                  />
                  <span style={{ fontSize: isMobile ? "16px" : "12px" }}>
                    📅
                  </span>
                </div>
              </div>

              {/* Passport number */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Passport number <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) =>
                    handleInputChange("passportNumber", e.target.value)
                  }
                  style={{
                    ...getInputStyle("passportNumber"),
                    width: isMobile ? "100%" : "200px",
                    height: isMobile ? "auto" : "20px",
                  }}
                  required
                />
              </div>

              {/* Country of passport */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Country of passport{" "}
                  <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <select
                  value={formData.countryOfPassport}
                  onChange={(e) =>
                    handleInputChange("countryOfPassport", e.target.value)
                  }
                  style={{
                    ...getInputStyle("countryOfPassport"),
                    width: isMobile ? "100%" : "250px",
                    height: isMobile ? "48px" : "28px",
                  }}
                  required
                >
                  <option value="">Select country</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="China">China</option>
                  <option value="Brazil">Brazil</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Russia">Russia</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Denmark">Denmark</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Philippines">Philippines</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
              </div>

              {/* Nationality of passport holder */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Nationality of passport holder{" "}
                  <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <select
                  value={formData.nationalityOfPassportHolder}
                  onChange={(e) =>
                    handleInputChange(
                      "nationalityOfPassportHolder",
                      e.target.value
                    )
                  }
                  style={{
                    ...getInputStyle("nationalityOfPassportHolder"),
                    width: isMobile ? "100%" : "250px",
                    height: isMobile ? "48px" : "28px",
                  }}
                  required
                >
                  <option value="">Select country</option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="China">China</option>
                  <option value="Brazil">Brazil</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Russia">Russia</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Italy">Italy</option>
                  <option value="Spain">Spain</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Denmark">Denmark</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Philippines">Philippines</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                </select>
              </div>

              {/* Date of issue */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Date of issue <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="date"
                    value={formData.dateOfIssue}
                    onChange={(e) =>
                      handleInputChange("dateOfIssue", e.target.value)
                    }
                    style={{
                      ...getInputStyle("dateOfIssue"),
                      width: isMobile ? "160px" : "150px",
                      height: isMobile ? "auto" : "20px",
                    }}
                    required
                  />
                  <span style={{ fontSize: isMobile ? "16px" : "12px" }}>
                    📅
                  </span>
                </div>
              </div>

              {/* Date of expiry */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                  }}
                >
                  Date of expiry <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="date"
                    value={formData.dateOfExpiry}
                    onChange={(e) =>
                      handleInputChange("dateOfExpiry", e.target.value)
                    }
                    style={{
                      ...getInputStyle("dateOfExpiry"),
                      width: isMobile ? "160px" : "150px",
                      height: isMobile ? "auto" : "20px",
                    }}
                    required
                  />
                  <span style={{ fontSize: isMobile ? "16px" : "12px" }}>
                    📅
                  </span>
                </div>
              </div>

              {/* Place of issue / issuing authority */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "flex-start",
                  gap: isMobile ? "6px" : "20px",
                }}
              >
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "12px",
                    color: "#333",
                    fontWeight: "normal",
                    width: isMobile ? "100%" : "150px",
                    marginTop: isMobile ? "0" : "4px",
                  }}
                >
                  Place of issue / issuing authority{" "}
                  <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div style={{ width: isMobile ? "100%" : "auto" }}>
                  <input
                    type="text"
                    value={formData.placeOfIssue}
                    onChange={(e) =>
                      handleInputChange("placeOfIssue", e.target.value)
                    }
                    style={{
                      ...getInputStyle("placeOfIssue"),
                      width: isMobile ? "100%" : "350px",
                      height: isMobile ? "auto" : "20px",
                    }}
                    required
                  />
                  <div
                    style={{
                      fontSize: isMobile ? "12px" : "11px",
                      color: "#666",
                      marginTop: "4px",
                      width: isMobile ? "100%" : "350px",
                    }}
                  >
                    It is strongly recommended that the passport be valid for at
                    least six months.
                  </div>
                </div>
              </div>

              {/* National identity card section */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "14px",
                    color: "#0066cc",
                    margin: "0 0 12px 0",
                    fontWeight: "normal",
                  }}
                >
                  National identity card
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                    marginBottom: "12px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Does this applicant have a national identity card?{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasNationalIdentityCard"
                          value="Yes"
                          checked={formData.hasNationalIdentityCard === "Yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "hasNationalIdentityCard",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        Yes
                      </label>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasNationalIdentityCard"
                          value="No"
                          checked={formData.hasNationalIdentityCard === "No"}
                          onChange={(e) =>
                            handleInputChange(
                              "hasNationalIdentityCard",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        No
                      </label>
                    </div>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>
              </div>

              {/* Place of birth section */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "14px",
                    color: "#0066cc",
                    margin: "0 0 12px 0",
                    fontWeight: "normal",
                  }}
                >
                  Place of birth ℹ️
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                    marginBottom: "12px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Town / City <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.townCity}
                    onChange={(e) =>
                      handleInputChange("townCity", e.target.value)
                    }
                    style={{
                      ...getInputStyle("townCity"),
                      width: isMobile ? "100%" : "300px",
                      height: isMobile ? "auto" : "20px",
                    }}
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                    marginBottom: "12px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    State / Province <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.stateProvince}
                    onChange={(e) =>
                      handleInputChange("stateProvince", e.target.value)
                    }
                    style={{
                      ...getInputStyle("stateProvince"),
                      width: isMobile ? "100%" : "300px",
                      height: isMobile ? "auto" : "20px",
                    }}
                    required
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Country of birth <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <select
                      value={formData.countryOfBirth}
                      onChange={(e) =>
                        handleInputChange("countryOfBirth", e.target.value)
                      }
                      style={{
                        ...getInputStyle("countryOfBirth"),
                        width: isMobile ? "200px" : "250px",
                        height: isMobile ? "48px" : "28px",
                      }}
                      required
                    >
                      <option value="">Select country</option>
                      <option value="Australia">Australia</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="China">China</option>
                      <option value="Brazil">Brazil</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Russia">Russia</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Italy">Italy</option>
                      <option value="Spain">Spain</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Norway">Norway</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Denmark">Denmark</option>
                      <option value="South Korea">South Korea</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Philippines">Philippines</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                    </select>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>
              </div>

              {/* Relationship status */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "14px",
                    color: "#0066cc",
                    margin: "0 0 12px 0",
                    fontWeight: "normal",
                  }}
                >
                  Relationship status
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Relationship status{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <select
                      value={formData.relationshipStatus}
                      onChange={(e) =>
                        handleInputChange("relationshipStatus", e.target.value)
                      }
                      style={{
                        ...getInputStyle("relationshipStatus"),
                        width: isMobile ? "200px" : "200px",
                        height: isMobile ? "48px" : "28px",
                      }}
                      required
                    >
                      <option value="">Select status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="De facto">De facto</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>
              </div>

              {/* Other names / spellings */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "14px",
                    color: "#0066cc",
                    margin: "0 0 12px 0",
                    fontWeight: "normal",
                  }}
                >
                  Other names / spellings
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Is this applicant currently, or have they ever been known by
                    any other names? <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasOtherNames"
                          value="Yes"
                          checked={formData.hasOtherNames === "Yes"}
                          onChange={(e) =>
                            handleInputChange("hasOtherNames", e.target.value)
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        Yes
                      </label>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasOtherNames"
                          value="No"
                          checked={formData.hasOtherNames === "No"}
                          onChange={(e) =>
                            handleInputChange("hasOtherNames", e.target.value)
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        No
                      </label>
                    </div>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>
              </div>

              {/* Citizenship */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "14px",
                    color: "#0066cc",
                    margin: "0 0 12px 0",
                    fontWeight: "normal",
                  }}
                >
                  Citizenship
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                    marginBottom: "12px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Is this applicant a citizen of the selected country of
                    passport? <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="isCitizenOfPassportCountry"
                          value="Yes"
                          checked={
                            formData.isCitizenOfPassportCountry === "Yes"
                          }
                          onChange={(e) =>
                            handleInputChange(
                              "isCitizenOfPassportCountry",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        Yes
                      </label>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="isCitizenOfPassportCountry"
                          value="No"
                          checked={formData.isCitizenOfPassportCountry === "No"}
                          onChange={(e) =>
                            handleInputChange(
                              "isCitizenOfPassportCountry",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        No
                      </label>
                    </div>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Is this applicant a citizen of any other country?{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="isCitizenOfOtherCountry"
                          value="Yes"
                          checked={formData.isCitizenOfOtherCountry === "Yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "isCitizenOfOtherCountry",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        Yes
                      </label>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="isCitizenOfOtherCountry"
                          value="No"
                          checked={formData.isCitizenOfOtherCountry === "No"}
                          onChange={(e) =>
                            handleInputChange(
                              "isCitizenOfOtherCountry",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        No
                      </label>
                    </div>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>
              </div>

              {/* Other passports */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "14px",
                    color: "#0066cc",
                    margin: "0 0 12px 0",
                    fontWeight: "normal",
                  }}
                >
                  Other passports
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Does this applicant have other current passports?{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasOtherCurrentPassports"
                          value="Yes"
                          checked={formData.hasOtherCurrentPassports === "Yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "hasOtherCurrentPassports",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        Yes
                      </label>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasOtherCurrentPassports"
                          value="No"
                          checked={formData.hasOtherCurrentPassports === "No"}
                          onChange={(e) =>
                            handleInputChange(
                              "hasOtherCurrentPassports",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        No
                      </label>
                    </div>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>
              </div>

              {/* Other identity documents */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "14px",
                    color: "#0066cc",
                    margin: "0 0 12px 0",
                    fontWeight: "normal",
                  }}
                >
                  Other identity documents
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Does this applicant have other identity documents?{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasOtherIdentityDocuments"
                          value="Yes"
                          checked={formData.hasOtherIdentityDocuments === "Yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "hasOtherIdentityDocuments",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        Yes
                      </label>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasOtherIdentityDocuments"
                          value="No"
                          checked={formData.hasOtherIdentityDocuments === "No"}
                          onChange={(e) =>
                            handleInputChange(
                              "hasOtherIdentityDocuments",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        No
                      </label>
                    </div>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>
              </div>

              {/* Health examination */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: isMobile ? "16px" : "14px",
                    color: "#0066cc",
                    margin: "0 0 12px 0",
                    fontWeight: "normal",
                  }}
                >
                  Health examination
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "6px" : "20px",
                  }}
                >
                  <label
                    style={{
                      fontSize: isMobile ? "14px" : "12px",
                      color: "#333",
                      fontWeight: "normal",
                      width: isMobile ? "100%" : "150px",
                    }}
                  >
                    Has this applicant undertaken a health examination for an
                    Australian visa in the last 12 months?{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasHealthExamination"
                          value="Yes"
                          checked={formData.hasHealthExamination === "Yes"}
                          onChange={(e) =>
                            handleInputChange(
                              "hasHealthExamination",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        Yes
                      </label>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: isMobile ? "8px" : "0",
                        }}
                      >
                        <input
                          type="radio"
                          name="hasHealthExamination"
                          value="No"
                          checked={formData.hasHealthExamination === "No"}
                          onChange={(e) =>
                            handleInputChange(
                              "hasHealthExamination",
                              e.target.value
                            )
                          }
                          required
                          style={{
                            width: isMobile ? "18px" : "auto",
                            height: isMobile ? "18px" : "auto",
                          }}
                        />
                        No
                      </label>
                    </div>
                    <span
                      style={{
                        fontSize: isMobile ? "16px" : "12px",
                        color: "#0066cc",
                        cursor: "pointer",
                      }}
                    >
                      ℹ️
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "stretch" : "center",
                borderTop: "1px solid #dee2e6",
                paddingTop: "20px",
                marginTop: "30px",
                gap: isMobile ? "10px" : "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "8px" : "10px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <button
                  type="button"
                  onClick={() => navigate("/gov.au/lusc/previous")}
                  style={{
                    padding: isMobile ? "12px 16px" : "6px 12px",
                    fontSize: isMobile ? "16px" : "12px",
                    color: "#333",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ccc",
                    borderRadius: "0px",
                    cursor: "pointer",
                    minHeight: isMobile ? "48px" : "auto",
                  }}
                >
                  ◀ Previous
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    padding: isMobile ? "12px 16px" : "6px 12px",
                    fontSize: isMobile ? "16px" : "12px",
                    color: "#333",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ccc",
                    borderRadius: "0px",
                    cursor: "pointer",
                    minHeight: isMobile ? "48px" : "auto",
                  }}
                >
                  🖨️ Print
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/gov.au/lusc/dashboard")}
                  style={{
                    padding: isMobile ? "12px 16px" : "6px 12px",
                    fontSize: isMobile ? "16px" : "12px",
                    color: "#333",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ccc",
                    borderRadius: "0px",
                    cursor: "pointer",
                    minHeight: isMobile ? "48px" : "auto",
                  }}
                >
                  {isMobile ? "My account" : "Go to my account"}
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: isMobile ? "8px" : "10px",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    padding: isMobile ? "15px 25px" : "6px 12px",
                    fontSize: isMobile ? "16px" : "12px",
                    color: "#fff",
                    backgroundColor: isSubmitting ? "#6c757d" : "#0066cc",
                    border: "1px solid #ccc",
                    borderRadius: "0px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.7 : 1,
                    minHeight: isMobile ? "52px" : "auto",
                    minWidth: isMobile ? "200px" : "auto",
                    fontWeight: isMobile ? "bold" : "normal",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - only show on laptop/desktop, keep your original design */}
        {!isMobile && (
          <div style={{ width: "260px", height: "fit-content" }}>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "0px",
                backgroundColor: "#ffffff",
                marginBottom: "20px",
              }}
            >
              <header
                style={{
                  background: "#1e3a5f",
                  padding: "8px 16px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Related Links
              </header>
              <div style={{ padding: "16px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#0066cc",
                      fontSize: "12px",
                      textDecoration: "underline",
                      display: "block",
                      lineHeight: "16px",
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Students information
                  </a>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#0066cc",
                      fontSize: "12px",
                      textDecoration: "underline",
                      display: "block",
                      lineHeight: "16px",
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Health details
                  </a>
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <a
                    href="#"
                    style={{
                      color: "#0066cc",
                      fontSize: "12px",
                      textDecoration: "underline",
                      display: "block",
                      lineHeight: "16px",
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
                      fontSize: "12px",
                      textDecoration: "underline",
                      display: "block",
                      lineHeight: "16px",
                    }}
                    onClick={(e) => e.preventDefault()}
                  >
                    Processing times
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "0px",
                backgroundColor: "#ffffff",
              }}
            >
              <header
                style={{
                  background: "#1e3a5f",
                  padding: "8px 16px",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Help and Support
              </header>
              <div style={{ padding: "16px" }}>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: "12px",
                    textDecoration: "underline",
                    display: "block",
                    marginBottom: "8px",
                    lineHeight: "16px",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Contact us
                </a>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: "12px",
                    textDecoration: "underline",
                    display: "block",
                    marginBottom: "8px",
                    lineHeight: "16px",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Client service charter
                </a>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: "12px",
                    textDecoration: "underline",
                    display: "block",
                    marginBottom: "8px",
                    lineHeight: "16px",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Client feedback
                </a>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: "12px",
                    textDecoration: "underline",
                    display: "block",
                    marginBottom: "8px",
                    lineHeight: "16px",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  ImmiAccount support
                </a>
                <a
                  href="#"
                  style={{
                    color: "#0066cc",
                    fontSize: "12px",
                    textDecoration: "underline",
                    display: "block",
                    lineHeight: "16px",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  Translation services
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGuardianVisaApplication;
