/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VevoHeader from "./VevoHeader";
import Footer from "../Footer";

const SendMail = () => {
  const { visaGrantNumber } = useParams();
  const navigate = useNavigate();

  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [userName, setUserName] = useState(""); // Dynamic name
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false); // New state for success message

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
  const isSmallDesktop = screenSize.width > 768 && screenSize.width <= 1024;

  // Fetch visa data to get the dynamic name
  useEffect(() => {
    const fetchVisaData = async () => {
      try {
        const response = await fetch(
          `https://immi-backend.up.railway.app/visa/visa_user_details/${visaGrantNumber}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserName(data.familyName || "N/A");
        } else {
          setUserName("N/A");
        }
      } catch (err) {
        console.error('Error fetching visa data:', err);
        setUserName("N/A");
      } finally {
        setLoading(false);
      }
    };

    if (visaGrantNumber) {
      fetchVisaData();
    } else {
      setLoading(false);
    }
  }, [visaGrantNumber]);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccess(false); // Reset success state

    if (!recipientEmail) {
      setError("Recipient email is required.");
      return;
    }

    if (!senderEmail) {
      setError("Your email address is required.");
      return;
    }

    try {
      setSending(true);
      
      const response = await fetch('https://immi-backend.up.railway.app/email/send', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: recipientEmail,
          visaGrantNumber: visaGrantNumber,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to send email');
      }

      // Show success message instead of browser alert
      setShowSuccess(true);
      
      // Clear form fields
      setRecipientEmail("");
      setSenderEmail("");
      
      // Auto-hide success message and navigate after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        navigate(`/gov.au/lusc/userData/${visaGrantNumber}`);
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleCancel = () => {
    navigate(`/gov.au/lusc/userData/${visaGrantNumber}`);
  };

  const getResponsiveStyles = () => {
    const fontSize = isMobile ? "11px" : isTablet ? "12px" : "12px";
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
      // Success message styles
      successContainer: {
        margin: isMobile ? "10px 10px 0 10px" : "15px 20px 0 20px",
        animation: "slideDown 0.3s ease-out",
      },
      successHeader: {
        backgroundColor: "#28a745", // Green color
        color: "white",
        padding: isMobile ? "8px 12px" : "10px 15px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: isMobile ? "11px" : "12px",
        lineHeight: "1.4",
      },
      successIcon: {
        backgroundColor: "white",
        color: "#28a745",
        borderRadius: "50%",
        width: "16px",
        height: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        flexShrink: 0,
      },
      successText: {
        backgroundColor: "#d4edda", // Light green background
        color: "#155724", // Dark green text
        padding: isMobile ? "8px 12px" : "10px 15px",
        fontSize: isMobile ? "11px" : "12px",
        lineHeight: "1.3",
        border: "1px solid #28a745",
        borderTop: "none",
      },
      warningContainer: {
        margin: isMobile ? "10px 10px 0 10px" : "15px 20px 0 20px",
      },
      warningHeader: {
        backgroundColor: "#f4c430",
        padding: isMobile ? "8px 12px" : "10px 15px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: isMobile ? "11px" : "12px",
        lineHeight: "1.4",
      },
      warningIcon: {
        backgroundColor: "#000",
        color: "#f4c430",
        borderRadius: "50%",
        width: "16px",
        height: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: "bold",
        flexShrink: 0,
      },
      warningText: {
        backgroundColor: "white",
        padding: isMobile ? "8px 12px" : "10px 15px",
        fontSize: isMobile ? "11px" : "12px",
        lineHeight: "1.3",
        border: "1px solid #f4c430",
        borderTop: "none",
      },
      formContent: {
        padding: isMobile ? "12px 15px" : isTablet ? "13px 17px" : "15px 20px",
        backgroundColor: "#f7f7f7",
        minHeight: "auto",
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
      nameDisplay: {
        marginLeft: isMobile
          ? "0"
          : isTablet
          ? "20px"
          : isSmallDesktop
          ? "100px"
          : "200px",
        paddingLeft: "8px",
        fontSize: isMobile ? "12px" : isTablet ? "11px" : "12px",
        fontWeight: "bold",
        color: "#000000",
        fontFamily: "Arial, sans-serif",
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
      errorText: {
        color: "red",
        fontSize: isMobile ? "10px" : "11px",
        marginTop: "2px",
        marginLeft: isMobile
          ? "0"
          : isTablet
          ? "20px"
          : isSmallDesktop
          ? "100px"
          : "200px",
        paddingLeft: "8px",
      },
    };
  };

  const styles = getResponsiveStyles();

  return (
    <div style={styles.container}>
      {/* Add CSS animation for slide down effect */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      
      <VevoHeader />
      
      <div style={styles.mainContainer}>
        <div style={styles.contentBox}>
          
          {/* Header */}
          <div style={styles.blueHeader}>
            Create email
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div style={styles.successContainer}>
              <div style={styles.successHeader}>
                <div style={styles.successIcon}>✓</div>
                <strong>Success</strong>
              </div>
              <div style={styles.successText}>
                Email sent successfully! You will be redirected shortly.
              </div>
            </div>
          )}

          {/* Warning Section - Only show if no success message */}
          {!showSuccess && (
            <div style={styles.warningContainer}>
              <div style={styles.warningHeader}>
                <div style={styles.warningIcon}>!</div>
                <strong>Warning</strong>
              </div>
              <div style={styles.warningText}>
                Protect your identity! You are sending your personal information and the Department cannot guarantee its security once you press 'Send Email'.
              </div>
            </div>
          )}

          {/* Form Content */}
          <div style={styles.formContent}>
            <div style={styles.instructions}>
              <div style={{ margin: "0 0 3px 0" }}>
                Please ensure that you have the recipient's permission before sending this email.
              </div>
              <div style={{ margin: "0" }}>
                Fields marked * must be completed.
              </div>
            </div>

            <form onSubmit={handleSendEmail}>
              {/* Recipient Email */}
              <div style={styles.formRow}>
                <div style={styles.fieldLabel}>Recipient email address</div>
                <div style={styles.inputContainer}>
                  <div style={styles.asterisk}>*</div>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    style={styles.inputField}
                    required
                    disabled={showSuccess} // Disable input when success is shown
                  />
                </div>
                {error && recipientEmail === "" && (
                  <div style={styles.errorText}>Recipient email is required.</div>
                )}
              </div>

              {/* Sender Email */}
              <div style={styles.formRow}>
                <div style={styles.fieldLabel}>Your email address</div>
                <div style={styles.inputContainer}>
                  <div style={styles.asterisk}>*</div>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    style={styles.inputField}
                    required
                    disabled={showSuccess} // Disable input when success is shown
                  />
                </div>
                {error && senderEmail === "" && (
                  <div style={styles.errorText}>Your email address is required.</div>
                )}
              </div>

              {/* Your Name */}
              <div style={styles.formRow}>
                <div style={styles.fieldLabel}>Your name</div>
                <div style={styles.nameDisplay}>
                  {loading ? 'Loading...' : userName}
                </div>
              </div>

              {/* General Error Message */}
              {error && recipientEmail !== "" && senderEmail !== "" && (
                <div style={{
                  ...styles.errorText,
                  marginBottom: "15px",
                  marginTop: "10px"
                }}>
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Buttons */}
          <div style={styles.buttonSection}>
            <button 
              type="button" 
              onClick={handleCancel}
              style={styles.button}
              disabled={showSuccess} // Disable when success is shown
            >
              Cancel
            </button>
            
            <button 
              type="submit" 
              disabled={sending || loading || showSuccess}
              onClick={handleSendEmail}
              style={{
                ...styles.button,
                backgroundColor: (sending || loading || showSuccess) ? '#e0e0e0' : '#f0f0f0',
                cursor: (sending || loading || showSuccess) ? 'not-allowed' : 'pointer',
                opacity: (sending || loading || showSuccess) ? 0.6 : 1,
                minWidth: isMobile ? "70px" : isTablet ? "65px" : "70px",
              }}
            >
              {sending ? 'Sending...' : showSuccess ? 'Sent!' : 'Send Email'}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SendMail;