/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VevoHeader from "./VevoHeader";
import Footer from "../Footer";

// Three Dot Loader Component
const DotLoader = () => {
  const [dotCount, setDotCount] = useState(1);
  const [visaData, setVisaData] = useState({});

  useEffect(() => {
    // Set current date and time when component mounts
    const now = new Date();
    const currentDateTime = now.toLocaleString(); // "8/23/2025, 1:28:00 PM"
    
    setVisaData(prevData => ({
      ...prevData,
      currentDateTime: currentDateTime
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev < 3 ? prev + 1 : 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      fontWeight: "bold",
      fontSize: "16px",
      color: "#666",
      textAlign: "center",
      paddingTop: "20px",
      paddingBottom: "20px",
      letterSpacing: "2px"
    }}>
      Loading{".".repeat(dotCount)}
    </div>
  );
};

const VisaDetails = () => {
  const { visaGrantNumber } = useParams();
  const navigate = useNavigate();

  const [visaData, setVisaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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

  const isMobile = screenSize.width <= 480;
  const isTablet = screenSize.width > 480 && screenSize.width <= 768;

  // PDF Download Function
  const downloadPDF = () => {
    if (!visaData || !visaData.file_data) {
      alert('No PDF file available for download.');
      return;
    }

    try {
      const base64Data = visaData.file_data;
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = visaData.filename || `visa-details-${visaData.visaGrantNumber || 'document'}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF file. Please try again.');
    }
  };

  // Navigate to Send Email
  const handleSendEmail = () => {
    navigate(`/gov.au/lusc/mailSendtoEmail/${visaGrantNumber}`);
  };

  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://immi-backend.up.railway.app/visa/visa_user_details/${visaGrantNumber}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch visa details`);
        }

        const data = await response.json();
        setVisaData(data);
      } catch (err) {
        console.error('Error fetching visa details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (visaGrantNumber) {
      fetchVisaDetails();
    } else {
      setError('Visa Grant Number is missing from URL parameters.');
      setLoading(false);
    }
  }, [visaGrantNumber]);

  const getResponsiveStyles = () => {
    const fontSize = isMobile ? "11px" : isTablet ? "12px" : "12px";
    const cellHorizGap = isMobile ? "16px" : isTablet ? "24px" : "32px";
    const cellVertGap = "0.5px";
    const btnPadding = "1px 3px 1px 3px";

    return {
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
        padding: isMobile ? "4px" : isTablet ? "8px" : "16px",
        backgroundColor: "#BEBFC7",
      },
      contentBox: {
        backgroundColor: "white",
        border: "1px solid #999",
        margin: "0 auto",
        boxShadow: "none",
      },
      blueHeader: {
        backgroundColor: "#072243",
        color: "white",
        padding: isMobile ? "8px 12px" : isTablet ? "10px 15px" : "12px 20px",
        fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
      },
      loadingContainer: {
        padding: "40px 20px",
        textAlign: "center",
        fontSize: "16px",
        color: "#666",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      errorContainer: {
        padding: "40px 20px",
        textAlign: "center",
        fontSize: "16px",
        color: "#d32f2f",
        backgroundColor: "#ffebee",
        border: "1px solid #f8bbd9",
        margin: "20px",
        borderRadius: "4px",
      },
      infoSection: {
        backgroundColor: "#024DA1",
        color: "white",
        margin: isMobile ? "10px 10px 0 10px" : "15px 20px 0 20px",
        padding: isMobile ? "8px 12px" : "10px 15px",
        fontSize,
        lineHeight: "1.4",
        display: "flex",
        alignItems: "center",
      },
      infoIcon: {
        backgroundColor: "white",
        color: "#024DA1",
        borderRadius: "50%",
        width: "16px",
        height: "16px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        marginRight: "8px",
        flexShrink: 0,
      },
      buttonRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "6px 2px" : "8px 6px",
        flexWrap: "wrap",
        gap: "8px",
        borderBottom: "none",
      },
      buttonContainer: {
        margin: isMobile ? "10px" : "15px 20px",
        border: "1px solid #999",
        backgroundColor: "white",
      },
      newEnquiryBtn: {
        padding: btnPadding,
        fontSize,
        backgroundColor: "#f0f0f0",
        border: "1px solid #999",
        cursor: "pointer",
        marginLeft: "0px",
        marginRight: "4px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
      },
      rightButtons: {
        display: "flex",
        gap: "8px",
        alignItems: "center",
        flexWrap: "wrap",
      },
      actionBtn: {
        padding: btnPadding,
        fontSize,
        backgroundColor: "#f0f0f0",
        border: "1px solid #999",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
      },
      actionBtnDisabled: {
        padding: btnPadding,
        fontSize,
        backgroundColor: "#e0e0e0",
        border: "1px solid #ccc",
        cursor: "not-allowed",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        opacity: 0.6,
      },
      detailsTable: {
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: `${cellHorizGap} ${cellVertGap}`,
        margin: "0",
        fontSize,
        fontFamily: "Arial, sans-serif",
      },
      tableRow: {},
      labelCell: {
        padding: isMobile ? "3px 0px" : "4px 0px",
        width: isMobile ? "36%" : "25%",
        verticalAlign: "top",
        textAlign: "left",
        fontWeight: "normal",
        fontSize,
        fontFamily: "Arial, sans-serif",
        backgroundColor: "transparent",
      },
      valueCell: {
        padding: isMobile ? "3px 0px" : "4px 0px",
        verticalAlign: "top",
        lineHeight: "1.2",
        fontWeight: "normal",
        fontSize,
        fontFamily: "Arial, sans-serif",
      },
      link: {
        color: "#0066cc",
        textDecoration: "underline",
        cursor: "pointer",
        fontWeight: "normal",
        fontSize,
      },
      conditionItem: {
        marginBottom: "8px",
        lineHeight: "1.4",
      },
      conditionCode: {
        fontWeight: "normal",
        marginBottom: "2px",
        fontSize,
        fontFamily: "Arial, sans-serif",
      },
      conditionDescription: {
        marginBottom: "4px",
        fontWeight: "normal",
        fontSize,
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.4",
      },
      conditionDetails: {
        marginBottom: "4px",
        fontWeight: "normal",
        fontSize,
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.4",
      },
      regulationsLink: {
        color: "#0066cc",
        textDecoration: "underline",
        cursor: "pointer",
        fontWeight: "normal",
        fontSize,
        fontFamily: "Arial, sans-serif",
      },
    };
  };

  const styles = getResponsiveStyles();

  // Function to render visa conditions with proper formatting
  const renderVisaConditions = (conditions) => {
    if (!conditions || !Array.isArray(conditions)) return null;

    return conditions.map((condition, index) => {
      // Parse the combined condition text
      const combinedText = `${condition.code} ${condition.description} ${condition.details} ${condition.reference}`;
      
      return (
        <div key={index}>
          {/* 8101 - No work condition */}
          <div style={styles.conditionItem}>
            <div style={styles.conditionCode}>8101 - No work:</div>
            <div style={styles.conditionDescription}>
              You must not work in Australia.
            </div>
            <div style={styles.conditionDetails}>
              This means when in Australia, you must not do{" "}
              <span style={{ textDecoration: "underline" }}>work</span>{" "}
              that a person would normally get paid for.
            </div>
          </div>
          
          {/* 8201 - Maximum 3 months study condition */}
          <div style={styles.conditionItem}>
            {/* <div style={styles.conditionCode}>8201 - Maximum 3 months study:</div> */}
            {/* <div style={styles.conditionDescription}>
              While in Australia, you must not engage, for more than 3 months, in any studies or training.
            </div>
            <div style={{ marginTop: "4px" }}>
              <span>See the </span>
              <a
                href="#"
                style={styles.regulationsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Regulations
              </a>
            </div> */}
          </div>
          
          {/* 8558 - Non Resident condition */}
          {/* <div style={styles.conditionItem}>
            <div style={styles.conditionCode}>8558 - Non Resident:</div>
            <div style={styles.conditionDescription}>
              Cannot stay for more than 12 months in any 18 month period.
            </div>
          </div> */}
        </div>
      );
    });
  };

  // Function to parse and format visa conditions text
  const parseVisaConditionsText = (conditionsText) => {
    if (!conditionsText) return null;

    // Split by condition codes (8101, 8201, 8558, etc.)
    const conditionPattern = /(\d{4}\s*-[^:]*:)/g;
    const parts = conditionsText.split(conditionPattern).filter(part => part.trim());
    
    const conditions = [];
    let currentCondition = null;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      
      if (conditionPattern.test(part)) {
        // This is a condition code
        if (currentCondition) {
          conditions.push(currentCondition);
        }
        currentCondition = {
          code: part,
          description: "",
          details: "",
          reference: ""
        };
      } else if (currentCondition && part) {
        // This is condition content
        const lines = part.split('\n').map(line => line.trim()).filter(line => line);
        
        for (const line of lines) {
          if (line.includes('See the') && line.includes('Regulations')) {
            currentCondition.reference = line;
            currentCondition.referenceLink = extractLinkFromText(line);
          } else if (!currentCondition.description) {
            currentCondition.description = line;
          } else {
            currentCondition.details += (currentCondition.details ? ' ' : '') + line;
          }
        }
      }
    }
    
    if (currentCondition) {
      conditions.push(currentCondition);
    }

    return conditions;
  };

  // Function to extract links from text
  const extractLinkFromText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = text.match(urlRegex);
    return match ? match[0] : null;
  };

  // Loading state with three-dot loader
  if (loading) {
    return (
      <div style={styles.container}>
        <VevoHeader />
        <div style={styles.mainContainer}>
          <div style={styles.contentBox}>
            <div style={styles.blueHeader}>Visa details</div>
            <div style={styles.loadingContainer}>
              <DotLoader />
              <div style={{ 
                marginTop: "10px", 
                fontSize: "14px", 
                color: "#999",
                textAlign: "center"
              }}>
                Fetching data for visa grant number: {visaGrantNumber}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={styles.container}>
        <VevoHeader />
        <div style={styles.mainContainer}>
          <div style={styles.contentBox}>
            <div style={styles.blueHeader}>Visa details</div>
            <div style={styles.errorContainer}>
              <div style={{ fontWeight: "bold", marginBottom: "10px" }}>Error Loading Visa Details</div>
              <div>{error}</div>
              <button
                style={{
                  ...styles.newEnquiryBtn,
                  marginTop: "20px",
                  padding: "8px 16px",
                }}
                onClick={() => navigate("/gov.au/lusc/visaCheck")}
              >
                Try New Enquiry
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Success state with data
  if (!visaData) {
    return null;
  }

  return (
    <div style={styles.container}>
      <VevoHeader />

      <div style={styles.mainContainer}>
        <div style={styles.contentBox}>
          <div style={styles.blueHeader}>Visa details</div>

          <div style={styles.infoSection}>
            <span style={styles.infoIcon}>i</span>
            <span>Information</span>
          </div>

          <div style={{
            ...styles.infoSection,
            backgroundColor: "#e3f2fd",
            color: "black",
            border: "1px solid #2196f3",
            borderLeft: "4px solid #2196f3",
            margin: isMobile ? "0 10px 0 10px" : "0 20px 0 20px"
          }}>
            <span>
              The entitlements associated with your current 'in-effect' visa
              are displayed below. If you believe these details are not
              correct, please contact the Department. Please note that visa
              application status and visa grants that are not yet in effect
              will not be shown below.
            </span>
          </div>

          <div style={styles.buttonContainer}>
            <div style={styles.buttonRow}>
              <button
                style={styles.newEnquiryBtn}
                onClick={() => navigate("/gov.au/lusc/visaCheck")}
              >
                New enquiry
              </button>
              <div style={styles.rightButtons}>
                <button 
                  style={visaData?.file_data ? styles.actionBtn : styles.actionBtnDisabled}
                  onClick={downloadPDF}
                  disabled={!visaData?.file_data}
                  title={visaData?.file_data ? "Download PDF" : "No PDF available"}
                >
                  View as PDF
                </button>
                <button 
                  style={styles.actionBtn}
                  onClick={handleSendEmail}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>

          <table style={styles.detailsTable}>
            <tbody>
            
              {visaData.currentDateTime && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Current date and time</td>
                  <td style={styles.valueCell}>{visaData.currentDateTime}</td>
                </tr>
              )}
              {visaData.familyName && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Family name</td>
                  <td style={styles.valueCell}>{visaData.familyName}</td>
                </tr>
              )}
              {visaData.visaDescription && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa description</td>
                  <td style={styles.valueCell}>{visaData.visaDescription}</td>
                </tr>
              )}
              {visaData.documentNumber && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Document number</td>
                  <td style={styles.valueCell}>{visaData.documentNumber}</td>
                </tr>
              )}
              {visaData.countryOfPassport && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Country of Passport</td>
                  <td style={styles.valueCell}>{visaData.countryOfPassport}</td>
                </tr>
              )}
              {visaData.visaClass && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa class / subclass</td>
                  <td style={styles.valueCell}>{visaData.visaClass}</td>
                </tr>
              )}
              {visaData.visaStream && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa stream</td>
                  <td style={styles.valueCell}>{visaData.visaStream}</td>
                </tr>
              )}
              {visaData.visaApplicant && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa applicant</td>
                  <td style={styles.valueCell}>{visaData.visaApplicant}</td>
                </tr>
              )}
              {visaData.visaGrantDate && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa grant date</td>
                  <td style={styles.valueCell}>{visaData.visaGrantDate}</td>
                </tr>
              )}
              {visaData.visaExpiryDate && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa expiry date</td>
                  <td style={styles.valueCell}>{visaData.visaExpiryDate}</td>
                </tr>
              )}
              {visaData.location && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Location</td>
                  <td style={styles.valueCell}>{visaData.location}</td>
                </tr>
              )}
              {visaData.visaStatus && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa status</td>
                  <td style={styles.valueCell}>{visaData.visaStatus}</td>
                </tr>
              )}
              {visaData.visaGrantNumber && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa grant number</td>
                  <td style={styles.valueCell}>{visaData.visaGrantNumber}</td>
                </tr>
              )}
              {visaData.entriesAllowed && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Entries allowed</td>
                  <td style={styles.valueCell}>{visaData.entriesAllowed}</td>
                </tr>
              )}
              {visaData.mustNotArriveAfter && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Must not arrive after</td>
                  <td style={styles.valueCell}>{visaData.mustNotArriveAfter}</td>
                </tr>
              )}
              {visaData.periodOfStay && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Period of stay</td>
                  <td style={styles.valueCell}>{visaData.periodOfStay}</td>
                </tr>
              )}
              {visaData.workEntitlements && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Work entitlements</td>
                  <td style={styles.valueCell}>{visaData.workEntitlements}</td>
                </tr>
              )}
              {(visaData.workplaceRights || visaData.workplaceRightsLink) && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Workplace rights</td>
                  <td style={styles.valueCell}>
                    {visaData.workplaceRights}
                    {visaData.workplaceRightsLink && (
                      <>
                        <br />
                        <a
                          href={visaData.workplaceRightsLink}
                          style={styles.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {visaData.workplaceRightsLink}
                        </a>
                      </>
                    )}
                  </td>
                </tr>
              )}
              {visaData.studyEntitlements && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Study entitlements</td>
                  <td style={styles.valueCell}>{visaData.studyEntitlements}</td>
                </tr>
              )}
              {/* Updated Visa Conditions Section */}
              {visaData.visaConditions && visaData.visaConditions.length > 0 && (
                <tr style={styles.tableRow}>
                  <td style={styles.labelCell}>Visa condition(s)</td>
                  <td style={styles.valueCell}>
                    {renderVisaConditions(visaData.visaConditions)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={styles.buttonContainer}>
            <div style={styles.buttonRow}>
              <button
                style={styles.newEnquiryBtn}
                onClick={() => navigate("/gov.au/lusc/visaCheck")}
              >
                New enquiry
              </button>
              <div style={styles.rightButtons}>
                <button 
                  style={visaData?.file_data ? styles.actionBtn : styles.actionBtnDisabled}
                  onClick={downloadPDF}
                  disabled={!visaData?.file_data}
                  title={visaData?.file_data ? "Download PDF" : "No PDF available"}
                >
                  View as PDF
                </button>
                <button 
                  style={styles.actionBtn}
                  onClick={handleSendEmail}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisaDetails;