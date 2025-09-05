import { color } from "framer-motion";
import React, { useState, useEffect } from "react";

const PDFViewer = ({ userEmail, onClose }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const isMobile = screenSize.width <= 768;

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `https://immi-backend.up.railway.app/upload/doc/${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to load PDF: ${response.status} ${response.statusText}`
          );
        }
        const blob = await response.blob();
        setPdfBlob(blob);
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load PDF");
      } finally {
        setLoading(false);
      }
    };

    loadPDF();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [userEmail]);

  const downloadPDF = () => {
    if (!pdfBlob) return;

    const downloadUrl = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${userEmail}_document.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "white",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const headerStyle = {
    padding: isMobile ? "8px 12px" : "12px 16px",
    borderBottom: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    padding: isMobile ? "4px 8px" : "6px 10px",
    fontSize: isMobile ? "12px" : "14px",
    cursor: "pointer",
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Loading PDF...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
          }}
        >
          Error: {error}
        </div>
      );
    }

    if (isMobile) {
      return (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button onClick={downloadPDF} style={buttonStyle}>
            Download PDF
          </button>
        </div>
      );
    }

    return (
      <div style={{ flex: 1, width: "100%", height: "100%" }}>
        <iframe
          src={pdfUrl}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
          title="PDF Viewer"
        />
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={{ margin: 0, fontSize: isMobile ? "14px" : "16px" }}>
          PDF Viewer
        </h3>
        <button onClick={onClose} style={buttonStyle}>
          Close
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

const ShowPdf = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("View applications");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showPdf, setShowPdf] = useState(false);
  const [showApiPdfViewer, setShowApiPdfViewer] = useState(false);

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

  // Get user data from localStorage
  const getUserData = () => {
    try {
      const data = localStorage.getItem("userData");
      if (data) {
        return JSON.parse(data);
      }

      const fallbackData = {
        name: "John Doe",
        email: "john.doe@email.com",
      };
      return fallbackData;
    } catch (error) {
      console.error("Error getting user data:", error);
      return {
        name: "John Doe",
        email: "john.doe@email.com",
      };
    }
  };

  useEffect(() => {
    const userDataFromLS = getUserData();
    setUserData(userDataFromLS);
  }, []);

  const loadPDF = async () => {
    try {
      setLoading(true);
      setError(null);

      const userDataFromLS = getUserData();

      if (!userDataFromLS || !userDataFromLS.email) {
        setError("User data not found");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pdfContent = `data:text/html,<html><body style="font-family: Arial; padding: 20px; background: white;"><div style="text-align: center; margin-bottom: 30px;"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24'%3E%3Cpath fill='%23072243' d='M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5v4.5h4.5L13 3.5z'/%3E%3C/svg%3E" style="margin-bottom: 20px;"/><h1 style="color: #072243; margin-bottom: 20px;">VISA GRANT NOTIFICATION</h1></div><div style="line-height: 1.6; color: #333;"><p><strong>Dear ${
        userDataFromLS.name
      },</strong></p><p>We are pleased to inform you that your visa application has been <strong>APPROVED</strong>.</p><div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #28a745;"><h3 style="color: #072243; margin-top: 0;">Application Details:</h3><p><strong>Applicant Name:</strong> ${
        userDataFromLS.name
      }</p><p><strong>Email Address:</strong> ${
        userDataFromLS.email
      }</p><p><strong>Application Reference:</strong> 1234567890123456</p><p><strong>Visa Type:</strong> Temporary Skill Shortage (subclass 482)</p><p><strong>Grant Date:</strong> 20 August 2024</p><p><strong>Validity Period:</strong> 4 years from grant date</p></div><p>This visa allows you to:</p><ul><li>Live and work in Australia for the specified period</li><li>Travel to and from Australia multiple times</li><li>Include eligible family members in your application</li></ul><p style="margin-top: 30px;"><strong>Important:</strong> Please keep this document safe as proof of your visa grant. You may be required to present this document when traveling.</p><p style="margin-top: 20px;">For more information, visit our website or contact our office.</p><div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #072243; text-align: center; color: #666;"><p><strong>Department of Home Affairs</strong><br/>Australian Government<br/>Generated on: ${new Date().toLocaleDateString()}</p></div></div></body></html>`;
      setPdfUrl(pdfContent);
      setShowPdf(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleImmiAcknowledgementClick = () => {
    const userDataFromLS = getUserData();
    if (userDataFromLS?.email) {
      setShowApiPdfViewer(true);
    } else {
      alert("User email not found");
    }
  };

  const menuItems = [
    
    "Application home",
    "Messages",
    "Update details",
    "Visa grant details",
  ];

  const actionItems = ["View applications", "Biometrics collection"];

  const handleMenuClick = (item) => {
    // Removed functionality - buttons are no longer clickable
  };

  const handleBackToDashboard = () => {
    console.log("Navigate to dashboard");
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return today.toLocaleDateString("en-GB", options);
  };

  // If API PDF viewer is open, show it
  if (showApiPdfViewer) {
    return (
      <PDFViewer
        userEmail={userData?.email}
        onClose={() => setShowApiPdfViewer(false)}
      />
    );
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#CCCCCC",
        minHeight: "fit-content",
        height: "fit-content",
        width: "100%",
        padding: "0 20px", // 20px gap from left and right
        boxSizing: "border-box",
      }}
    >
      {/* Top Navigation Bar */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          padding: isMobile ? "6px 8px" : isTablet ? "8px 12px" : "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "6px" : isTablet ? "8px" : "12px",
          fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          width: "100%",
          boxSizing: "border-box",
          marginLeft: "-20px",
          marginRight: "-20px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <span
          style={{
            color: "#0066cc",
            cursor: "pointer",
            borderRight: "1px solid #dee2e6",
            paddingRight: isMobile ? "6px" : isTablet ? "8px" : "12px",
            flexShrink: 0,
          }}
        >
          My applications
        </span>
        <span
          style={{
            color: "#333",
            cursor: "pointer",
            borderRight: "1px solid #dee2e6",
            paddingRight: isMobile ? "6px" : isTablet ? "8px" : "12px",
            flexShrink: 0,
          }}
        >
          My payments ▼
        </span>
        <span
          style={{
            color: "#333",
            cursor: "pointer",
            borderRight: "1px solid #dee2e6",
            paddingRight: isMobile ? "6px" : isTablet ? "8px" : "12px",
            flexShrink: 0,
          }}
        >
          {isMobile ? "Groups" : "Manage groups"}
        </span>
        <span
          style={{
            color: "#333",
            cursor: "pointer",
            borderRight: "1px solid #dee2e6",
            paddingRight: isMobile ? "6px" : isTablet ? "8px" : "12px",
            flexShrink: 0,
          }}
        >
          {isMobile ? "Links ▼" : "Related links ▼"}
        </span>
        <span
          style={{
            color: "#333",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {isMobile ? "Help ▼" : "Help and support ▼"}
        </span>
      </div>

      {/* Main Container */}
      <div
        style={{
          width: "100%",
          height: "fit-content",
          backgroundColor: "#CCCCCC",
          marginTop: "10px",
          boxSizing: "border-box",
        }}
      >
        {/* Main Header */}
        <header
          style={{
            background: "#072243",
            padding: isMobile
              ? "8px 12px"
              : isTablet
              ? "10px 16px"
              : "12px 20px",
            color: "white",
            fontSize: isMobile ? "10px" : isTablet ? "11px" : "13px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ wordBreak: "break-word" }}>
            Application for a Visitor Short Stay Visa Reference Number:
            ECPXJY8B2
          </div>
        </header>

        {/* Content Area */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            minHeight: "fit-content",
            height: "fit-content",
            backgroundColor: "white",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: isMobile ? "100%" : isTablet ? "240px" : "280px",
              backgroundColor: "white",
              height: "fit-content",
              borderRight: isMobile ? "none" : "1px solid #e0e0e0",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                padding: isMobile ? "12px" : isTablet ? "16px" : "20px",
              }}
            >
              <h4  style={{
                paddingLeft: "12px" ,
                marginBottom:"30px",
                color: "#072243",
                fontSize: isMobile ? "14px" : isTablet ? "16px" : "14px",

              }}>
                Menu
              </h4>
              {/* Main Menu Items */}
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    cursor: "default",
                    backgroundColor: "transparent",
                    color: "#333",
                    fontSize: isMobile ? "11px" : isTablet ? "12px" : "13px",
                    fontWeight: "600",
                    borderRadius: "3px",
                    // marginBottom: "4px",
                    padding: "4px 8px",
                    borderLeft: "3px solid transparent",
                    lineHeight: "1.4",
                  }}
                >
                  {item}
                </div>
              ))}

              {/* Actions Section */}
              <div
                style={{
                  marginTop: "20px",
                  borderTop: "1px solid #ddd",
                  paddingTop: "16px",
                }}
              >
                <div
                  style={{
                    padding: "4px 8px",
                    fontSize: isMobile ? "9px" : "10px",
                    fontWeight: "bold",
                    color: "#666",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  ACTIONS
                </div>
                {actionItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      cursor: "default",
                      backgroundColor: "transparent",
                      color: "#333",
                      fontSize: isMobile ? "11px" : isTablet ? "12px" : "13px",
                      fontWeight: "600",
                      borderRadius: "3px",
                      marginBottom: "4px",
                      padding: "3px 8px",
                      borderLeft: "3px solid transparent",
                      lineHeight: "1.4",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              flex: "1",
              padding: isMobile ? "12px" : isTablet ? "16px" : "20px",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              boxSizing: "border-box",
              minWidth: 0,
            }}
          >
            {/* Messages Heading */}
            <h2
              style={{
                fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
                fontWeight: "bold",
                color: "#072243",
                marginBottom: isMobile ? "12px" : "8px",
                marginTop: "0",
              }}
            >
              Messages
            </h2>

            {/* Correspondence Notice */}
            <div
              style={{
                borderRadius: "4px",
                // padding: isMobile ? "10px" : isTablet ? "12px" : "16px",
                fontSize: isMobile ? "11px" : isTablet ? "12px" : "14px",
                lineHeight: "1.6",
                marginBottom: isMobile ? "16px" : "10px",
                backgroundColor: "transparent",
              }}
            >
              Correspondence for this application is currently being sent to the
              primary applicant at the following email address:{" "}
              <strong>
                <a
                  href={`mailto:${userData?.email || "user@email.com"}`}
                  style={{ color: "#856404", textDecoration: "underline" }}
                >
                  {userData?.email || "user@email.com"}
                </a>
              </strong>
              <br />
              Please check your spam filter if you have not received any
              correspondence.
            </div>
            <h2 style={{ color: "#072243" }}>List of Correspondence</h2>
            {/* Correspondence Table */}
            <div
              style={{
                backgroundColor: "white",
                marginBottom: "20px",
                width: "100%",
              }}
            >
              {/* Table Header Row */}
              <div
                style={{
                  display: isMobile ? "none" : "grid",
                  gridTemplateColumns: "2fr 1fr 2fr",
                  backgroundColor: "#767B8D",
                  fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                <div style={{ padding: "8px" }}>Correspondence Title</div>
                <div style={{ padding: "8px" }}>Date sent</div>
                <div style={{ padding: "8px" }}>Email</div>
              </div>

              {/* IMMI Grant Notification Row */}
              <div
                style={{
                  display: isMobile ? "block" : "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 2fr",
                  backgroundColor: "white",
                  fontSize: isMobile ? "11px" : isTablet ? "12px" : "13px",
                  marginBottom: isMobile ? "12px" : "8px",
                  padding: isMobile ? "8px" : "4px 0",
                  border: isMobile ? "1px solid #eee" : "none",
                  borderRadius: isMobile ? "4px" : "0",
                }}
              >
                <div
                  style={{
                    color: "#333",
                    fontWeight: "normal",
                    padding: "4px 8px",
                  }}
                >
                  {isMobile && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "10px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Correspondence
                    </span>
                  )}
                  IMMI Grant Notification
                </div>

                <div style={{ color: "#333", padding: "4px 8px" }}>
                  {isMobile && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "10px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Date sent
                    </span>
                  )}
                  {getCurrentDate()}
                </div>

                <div style={{ color: "#333", padding: "4px 8px" }}>
                  {isMobile && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "10px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Email
                    </span>
                  )}
                  {userData?.email || "user@email.com"}
                </div>
              </div>

              {/* IMMI Acknowledgement Row - Clickable */}

              <div
                style={{
                  display: isMobile ? "block" : "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 2fr",
                  backgroundColor: "white",
                  fontSize: isMobile ? "11px" : isTablet ? "12px" : "13px",
                  marginBottom: isMobile ? "12px" : "8px",
                  cursor: "pointer",
                  padding: isMobile ? "8px" : "4px 0",
                  border: isMobile ? "1px solid #eee" : "none",
                  borderRadius: isMobile ? "4px" : "0",
                }}
                onClick={handleImmiAcknowledgementClick}
              >
                <div
                  style={{
                    color: "#0066cc",
                    fontWeight: "normal",
                    textDecoration: "underline",
                    padding: "4px 8px",
                    marginTop: "-20px",
                  }}
                >
                  {isMobile && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "10px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Correspondence
                    </span>
                  )}
                  IMMI Acknowledgement of Application Received
                </div>

                <div
                  style={{
                    color: "#333",
                    padding: "4px 8px",
                    marginTop: "-20px", // Added this line
                  }}
                >
                  {isMobile && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "10px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Date sent
                    </span>
                  )}
                  {getCurrentDate()}
                </div>

                <div
                  style={{
                    color: "#333",
                    padding: "4px 8px",
                    marginTop: "-20px", // Added this line
                  }}
                >
                  {isMobile && (
                    <span
                      style={{
                        color: "#666",
                        fontSize: "10px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Email
                    </span>
                  )}
                  {userData?.email || "user@email.com"}
                </div>
              </div>
            </div>

            {/* Show PDF Content */}
            {showPdf && (
              <div style={{ marginTop: "20px", width: "100%" }}>
                <button
                  onClick={() => setShowPdf(false)}
                  style={{
                    padding: isMobile ? "8px 12px" : "10px 16px",
                    backgroundColor: "#0066cc",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: isMobile ? "11px" : "12px",
                    marginBottom: "16px",
                  }}
                >
                  ← Back to Messages
                </button>
                <div
                  style={{
                    height: isMobile ? "400px" : isTablet ? "500px" : "600px",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {loading && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: isMobile ? "12px" : "16px",
                      }}
                    >
                      Loading PDF document...
                    </div>
                  )}

                  {error && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        flexDirection: "column",
                        gap: "16px",
                        color: "#d32f2f",
                        fontSize: isMobile ? "12px" : "14px",
                      }}
                    >
                      <div>⚠️ Error loading document: {error}</div>
                    </div>
                  )}

                  {!loading && !error && pdfUrl && (
                    <iframe
                      src={pdfUrl}
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "4px",
                      }}
                      title="Visa Grant Document"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPdf;
