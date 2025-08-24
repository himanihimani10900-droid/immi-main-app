/* eslint-disable no-dupe-keys */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VevoHeader from "./VevoHeader";
import Footer from "../Footer";

const VisaCheck = () => {
  const navigate = useNavigate();
  const [documentType, setDocumentType] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    referenceType: "",
    visaGrantNumber: "",
    dateOfBirth: "",
    documentNumber: "",
    countryOfDocument: "",
    termsAccepted: false,
  });

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

  // Responsive helper functions
  const isMobile = screenSize.width <= 480;
  const isTablet = screenSize.width > 480 && screenSize.width <= 768;
  const isSmallDesktop = screenSize.width > 768 && screenSize.width <= 1024;

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
    if (errors.documentType) {
      setErrors((prev) => ({ ...prev, documentType: "" }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear visa grant number when reference type changes
    if (field === "referenceType") {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        visaGrantNumber: "",
      }));
      if (errors.visaGrantNumber) {
        setErrors((prev) => ({ ...prev, visaGrantNumber: "" }));
      }
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!documentType) {
      newErrors.documentType = "Please select a document type";
    }

    if (isExpanded) {
      if (!formData.referenceType) {
        newErrors.referenceType = "Please select a reference type";
      }
      if (formData.referenceType && !formData.visaGrantNumber) {
        newErrors.visaGrantNumber = "Please enter the visa grant number";
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Please enter your date of birth";
      }
      if (!formData.documentNumber) {
        newErrors.documentNumber = "Please enter your document number";
      }
      if (!formData.countryOfDocument) {
        newErrors.countryOfDocument = "Please select country of document";
      }
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "Please accept the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    setDocumentType("");
    setIsExpanded(false);
    setFormData({
      referenceType: "",
      visaGrantNumber: "",
      dateOfBirth: "",
      documentNumber: "",
      countryOfDocument: "",
      termsAccepted: false,
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (documentType && !isExpanded) {
      // First submit - expand the form
      setIsExpanded(true);
    } else {
      // Final submit - navigate to visa details page

      navigate(`/gov.au/lusc/userData/${formData.visaGrantNumber}`);
    }
  };

  const getResponsiveStyles = () => ({
    container: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      backgroundColor: "#BEBFC7",
      minHeight: "fit-content",
      display: "flex",
      flexDirection: "column",
    },
    mainContainer: {
      flex: 1,
      padding: isMobile ? "8px" : isTablet ? "10px" : "12px",
      backgroundColor: "#BEBFC7",
      display: "flex",
      alignItems: "flex-start",
    },
    contentBox: {
      backgroundColor: "white",
      border: "1px solid #999",
      width: "100%",
      margin: "0 auto",
      boxShadow: "none",
    },
    blueHeader: {
      backgroundColor: "#072243",
      color: "white",
      padding: isMobile ? "6px 12px" : isTablet ? "7px 13px" : "8px 15px",
      fontSize: isMobile ? "12px" : isTablet ? "13px" : "14px",
      fontWeight: "bold",
      borderBottom: "1px solid #1a365d",
      height: isMobile ? "20px" : isTablet ? "22px" : "25px",
      display: "flex",
      alignItems: "center",
    },
    formContent: {
      padding: isMobile ? "12px 15px" : isTablet ? "13px 17px" : "15px 20px",
      backgroundColor: "#f7f7f7",
      minHeight: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    instructions: {
      marginBottom: isMobile ? "12px" : isTablet ? "13px" : "15px",
      fontSize: isMobile ? "11px" : isTablet ? "11px" : "12px",
      lineHeight: "1.3",
      color: "#000000",
    },
    formRow: {
      display: "flex",
      alignItems: "center",
      fontSize: isMobile ? "11px" : isTablet ? "11px" : "12px",
      marginBottom: isMobile ? "8px" : "10px",
      width: "100%",
      flexWrap: isMobile ? "wrap" : "nowrap",
    },
    fieldLabel: {
      color: "#000000",
      fontWeight: "normal",
      flexShrink: 0,
      width: isMobile
        ? "100%"
        : isTablet
        ? "140px"
        : isSmallDesktop
        ? "150px"
        : "150px",
      textAlign: "left",
      marginBottom: isMobile ? "5px" : "0",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginLeft: isMobile
        ? "0"
        : isTablet
        ? "20px"
        : isSmallDesktop
        ? "100px"
        : "200px",
      width: isMobile ? "100%" : "auto",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    asterisk: {
      color: "red",
      fontSize: isMobile ? "12px" : isTablet ? "13px" : "14px",
      flexShrink: 0,
    },
    inputField: {
      padding: isMobile ? "4px 7px" : isTablet ? "4px 6px" : "4px 7px",
      fontSize: isMobile ? "12px" : isTablet ? "11px" : "12px",
      border: "1px solid #999",
      backgroundColor: "#EFEFEF",
      color: "#000000",
      width: isMobile
        ? "200px"
        : isTablet
        ? "180px"
        : isSmallDesktop
        ? "200px"
        : "240px",
      height: isMobile ? "22px" : isTablet ? "20px" : "22px",
      flexShrink: 0,
      transition: "border-color 0.2s ease",
      lineHeight: "1.2",
      boxSizing: "border-box",
    },
    selectField: {
      padding: isMobile ? "4px 7px" : isTablet ? "4px 6px" : "4px 7px",
      fontSize: isMobile ? "12px" : isTablet ? "11px" : "12px",
      border: "1px solid #999",
      backgroundColor: "#EFEFEF",
      color: "#000000",
      width: isMobile
        ? "200px"
        : isTablet
        ? "180px"
        : isSmallDesktop
        ? "200px"
        : "240px",
      height: isMobile ? "22px" : isTablet ? "20px" : "22px",
      flexShrink: 0,
      transition: "border-color 0.2s ease",
      lineHeight: "1.2",
      boxSizing: "border-box",
    },
    dateInput: {
      padding: isMobile ? "4px 7px" : isTablet ? "4px 6px" : "4px 7px",
      fontSize: isMobile ? "12px" : isTablet ? "11px" : "12px",
      border: "1px solid #999",
      backgroundColor: "#EFEFEF",
      color: "#000000",
      width: isMobile
        ? "180px"
        : isTablet
        ? "160px"
        : isSmallDesktop
        ? "180px"
        : "180px",
      height: isMobile ? "22px" : isTablet ? "20px" : "22px",
      transition: "border-color 0.2s ease",
      lineHeight: "1.2",
      boxSizing: "border-box",
    },
    errorText: {
      color: "red",
      fontSize: isMobile ? "10px" : "11px",
      marginTop: "2px",
      display: "block",
    },
    helpIcon: {
      width: isMobile ? "16px" : isTablet ? "15px" : "16px",
      height: isMobile ? "16px" : isTablet ? "15px" : "16px",
      backgroundColor: "#4285f4",
      border: "1px solid #4285f4",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "10px" : isTablet ? "9px" : "10px",
      color: "white",
      cursor: "help",
      flexShrink: 0,
    },
    termsSection: {
      marginTop: isMobile ? "10px" : "15px",
      marginBottom: isMobile ? "10px" : "15px",
      marginLeft: isMobile
        ? "0"
        : isTablet
        ? "20px"
        : isSmallDesktop
        ? "100px"
        : "200px",
      fontSize: isMobile ? "12px" : isTablet ? "11px" : "12px",
      width: isMobile ? "100%" : "auto",
    },
    termsLink: {
      color: "#0066cc",
      textDecoration: "underline",
      cursor: "pointer",
    },
    checkboxRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
      marginTop: "8px",
      flexWrap: "wrap",
      flexDirection: "column",
    },
    checkboxWrapper: {
      display: "flex",
      alignItems: "flex-start",
      gap: "8px",
    },
    checkbox: {
      marginRight: "5px",
      marginTop: "2px",
    },
    checkboxText: {
      color: "#000000",
      flex: 1,
      lineHeight: "1.3",
    },
    buttonSection: {
      backgroundColor: "#e8e8e8",
      padding: isMobile ? "8px 12px" : isTablet ? "7px 13px" : "8px 15px",
      borderTop: "1px solid #999",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: isMobile ? "40px" : isTablet ? "37px" : "40px",
    },
    button: {
      padding: isMobile ? "6px 12px" : isTablet ? "4px 11px" : "4px 12px",
      fontSize: isMobile ? "12px" : isTablet ? "11px" : "12px",
      backgroundColor: "#f0f0f0",
      cursor: "pointer",
      border: "1px solid gray",
      color: "#000000",
      height: isMobile ? "26px" : isTablet ? "21px" : "22px",
      minWidth: isMobile ? "50px" : isTablet ? "47px" : "50px",
    },
  });

  const styles = getResponsiveStyles();

  const hoverStyles = `
    <style>
      .form-input:hover {
        border-color: #4285f4 !important;
      }
      .form-input:focus {
        border-color: #4285f4 !important;
        outline: none;
        box-shadow: 0 0 3px rgba(66, 133, 244, 0.3);
      }
      .form-input::placeholder {
        color: #666 !important;
        opacity: 1 !important;
      }
      .form-input::-webkit-input-placeholder {
        color: #666 !important;
        opacity: 1 !important;
      }
      .form-input::-moz-placeholder {
        color: #666 !important;
        opacity: 1 !important;
      }
      .form-input:-ms-input-placeholder {
        color: #666 !important;
        opacity: 1 !important;
      }
      .error-input {
        border-color: red !important;
      }
    </style>
  `;

  return (
    <div style={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: hoverStyles }} />
      <VevoHeader />

      <div style={styles.mainContainer}>
        <div style={styles.contentBox}>
          <div style={styles.blueHeader}>Visa holder enquiry</div>

          <div style={styles.formContent}>
            <div style={styles.instructions}>
              <div style={{ margin: "0 0 3px 0" }}>
                Please complete the following details to view your visa
                entitlements.
              </div>
              <div style={{ margin: "0" }}>
                Fields marked * must be completed.
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.fieldLabel}>Document type</div>
              <div style={styles.inputContainer}>
                <div style={styles.inputWrapper}>
                  <div style={styles.asterisk}>*</div>
                  <select
                    value={documentType}
                    onChange={handleDocumentTypeChange}
                    style={{
                      ...styles.selectField,
                      borderColor: errors.documentType
                        ? "red"
                        : styles.selectField.borderColor,
                    }}
                    className="form-input"
                  >
                    <option value="">Please choose a document type</option>
                    <option value="dftta">DFTTA</option>
                    <option value="immicard">ImmiCard</option>
                    <option value="passport">Passport</option>
                    <option value="plo56">PLO56 (M56)</option>
                    <option value="titre">Titre de Voyage</option>
                  </select>
                  <div style={styles.helpIcon}>?</div>
                </div>
                {errors.documentType && (
                  <span style={styles.errorText}>{errors.documentType}</span>
                )}
              </div>
            </div>

            {isExpanded && (
              <>
                <div style={styles.formRow}>
                  <div style={styles.fieldLabel}>Reference type</div>
                  <div style={styles.inputContainer}>
                    <div style={styles.inputWrapper}>
                      <div style={styles.asterisk}>*</div>
                      <select
                        value={formData.referenceType}
                        onChange={(e) =>
                          handleInputChange("referenceType", e.target.value)
                        }
                        style={{
                          ...styles.selectField,
                          borderColor: errors.referenceType
                            ? "red"
                            : styles.selectField.borderColor,
                        }}
                        className="form-input"
                      >
                        <option value="">Please choose a reference type</option>
                        <option value="transaction-ref">
                          Transaction reference number (TRN)
                        </option>
                        <option value="visa-grant-number">
                          Visa Evidence number
                        </option>
                        <option value="passport-number">
                          Visa Grant number
                        </option>
                        <option value="receipt-number">Password</option>
                      </select>
                      <div style={styles.helpIcon}>?</div>
                    </div>
                    {errors.referenceType && (
                      <span style={styles.errorText}>
                        {errors.referenceType}
                      </span>
                    )}
                  </div>
                </div>

                {formData.referenceType && (
                  <div style={styles.formRow}>
                    <div style={styles.fieldLabel}>Visa Grant number</div>
                    <div style={styles.inputContainer}>
                      <div style={styles.inputWrapper}>
                        <div style={styles.asterisk}>*</div>
                        <input
                          type="text"
                          value={formData.visaGrantNumber}
                          onChange={(e) =>
                            handleInputChange("visaGrantNumber", e.target.value)
                          }
                          style={{
                            ...styles.inputField,
                            borderColor: errors.visaGrantNumber
                              ? "red"
                              : styles.inputField.borderColor,
                          }}
                          className="form-input"
                          placeholder=""
                        />
                        <div style={styles.helpIcon}>?</div>
                      </div>
                      {errors.visaGrantNumber && (
                        <span style={styles.errorText}>
                          {errors.visaGrantNumber}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div style={styles.formRow}>
                  <div style={styles.fieldLabel}>Date of birth</div>
                  <div style={styles.inputContainer}>
                    <div style={styles.inputWrapper}>
                      <div style={styles.asterisk}>*</div>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        style={{
                          ...styles.dateInput,
                          borderColor: errors.dateOfBirth
                            ? "red"
                            : styles.dateInput.borderColor,
                        }}
                        className="form-input"
                      />
                      <div style={styles.helpIcon}>?</div>
                    </div>
                    {errors.dateOfBirth && (
                      <span style={styles.errorText}>{errors.dateOfBirth}</span>
                    )}
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.fieldLabel}>Document number</div>
                  <div style={styles.inputContainer}>
                    <div style={styles.inputWrapper}>
                      <div style={styles.asterisk}>*</div>
                      <input
                        type="text"
                        value={formData.documentNumber}
                        onChange={(e) =>
                          handleInputChange("documentNumber", e.target.value)
                        }
                        style={{
                          ...styles.inputField,
                          borderColor: errors.documentNumber
                            ? "red"
                            : styles.inputField.borderColor,
                        }}
                        className="form-input"
                        placeholder=""
                      />
                      <div style={styles.helpIcon}>?</div>
                    </div>
                    {errors.documentNumber && (
                      <span style={styles.errorText}>
                        {errors.documentNumber}
                      </span>
                    )}
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.fieldLabel}>Country of document</div>
                  <div style={styles.inputContainer}>
                    <div style={styles.inputWrapper}>
                      <div style={styles.asterisk}>*</div>
                      <select
                        value={formData.countryOfDocument}
                        onChange={(e) =>
                          handleInputChange("countryOfDocument", e.target.value)
                        }
                        style={{
                          ...styles.selectField,
                          borderColor: errors.countryOfDocument
                            ? "red"
                            : styles.selectField.borderColor,
                        }}
                        className="form-input"
                      >
                        <option value="">Country</option>
                        <option value="australia">Australia</option>
                        <option value="usa">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="canada">Canada</option>
                        <option value="india">India</option>
                        <option value="new-zealand">New Zealand</option>
                        <option value="singapore">Singapore</option>
                      </select>
                      <div style={styles.helpIcon}>?</div>
                    </div>
                    {errors.countryOfDocument && (
                      <span style={styles.errorText}>
                        {errors.countryOfDocument}
                      </span>
                    )}
                  </div>
                </div>

                <div style={styles.termsSection}>
                  <span
                    style={styles.termsLink}
                    onClick={() => console.log("View Terms and Conditions")}
                  >
                    View Terms and Conditions
                  </span>

                  <div style={styles.checkboxRow}>
                    <div style={styles.checkboxWrapper}>
                      <div style={styles.asterisk}>*</div>
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) =>
                          handleInputChange("termsAccepted", e.target.checked)
                        }
                        style={styles.checkbox}
                      />
                      <span style={styles.checkboxText}>
                        I have read and agree to the terms and conditions
                      </span>
                    </div>
                    {errors.termsAccepted && (
                      <span style={styles.errorText}>
                        {errors.termsAccepted}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div style={styles.buttonSection}>
            <button type="button" onClick={handleClear} style={styles.button}>
              Clear
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                ...styles.button,
                minWidth: isMobile ? "55px" : isTablet ? "52px" : "55px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default VisaCheck;
