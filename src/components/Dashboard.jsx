// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // PDF Viewer Component
// // Add this component before your Dashboard component
// const GovernmentPagination = ({
//   currentPage = 1,
//   totalResults = 1,
//   resultsPerPage = 10,
//   onPageChange = () => {},
// }) => {
//   const totalPages = Math.ceil(totalResults / resultsPerPage);
//   const startResult = totalResults === 0 ? 0 : (currentPage - 1) * resultsPerPage + 1;
//   const endResult = Math.min(currentPage * resultsPerPage, totalResults);

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '12px 16px',
//       fontSize: '13px',
//       color: '#333',
//       backgroundColor: '#f8f9fa',
//       borderTop: '1px solid #ddd',
//       borderLeft: '1px solid #ddd',
//       borderRight: '1px solid #ddd',
//       borderBottom: '1px solid #ddd',
//     }}>
//       {/* Results text */}
//       <div style={{
//         fontWeight: 'normal',
//         color: '#333'
//       }}>
//         {totalResults === 0
//           ? "No results"
//           : `${startResult} - ${endResult} of ${totalResults} results`
//         }
//       </div>

//       {/* Pagination controls */}
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px'
//       }}>
//         <span style={{
//           color: '#333',
//           fontWeight: 'normal'
//         }}>
//           Page
//         </span>

//         <select
//           value={currentPage}
//           onChange={(e) => onPageChange(parseInt(e.target.value))}
//           style={{
//             padding: '2px 6px',
//             border: '1px solid #ccc',
//             borderRadius: '3px',
//             fontSize: '13px',
//             backgroundColor: 'white',
//             color: '#333',
//             marginRight: '8px'
//           }}
//         >
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//             <option key={page} value={page}>{page}</option>
//           ))}
//         </select>

//         {/* Navigation buttons */}
//         <div style={{
//           display: 'flex',
//           gap: '2px',
//           alignItems: 'center'
//         }}>
//           {/* First/Previous page button */}
//           <button
//             onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//             style={{
//               width: '24px',
//               height: '24px',
//               border: '1px solid #ccc',
//               backgroundColor: currentPage === 1 ? '#f5f5f5' : 'white',
//               color: currentPage === 1 ? '#999' : '#0066cc',
//               cursor: currentPage === 1 ? 'default' : 'pointer',
//               fontSize: '12px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderRadius: '3px',
//             }}
//           >
//             ◀
//           </button>

//           {/* Page numbers */}
//           <button
//             style={{
//               minWidth: '24px',
//               height: '24px',
//               border: '1px solid #ccc',
//               backgroundColor: '#0066cc',
//               color: 'white',
//               fontSize: '12px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderRadius: '3px',
//               padding: '0 6px'
//             }}
//           >
//             {currentPage}
//           </button>

//           {/* Next/Last page button */}
//           <button
//             onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//             style={{
//               width: '24px',
//               height: '24px',
//               border: '1px solid #ccc',
//               backgroundColor: currentPage === totalPages ? '#f5f5f5' : 'white',
//               color: currentPage === totalPages ? '#999' : '#0066cc',
//               cursor: currentPage === totalPages ? 'default' : 'pointer',
//               fontSize: '12px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               borderRadius: '3px',
//             }}
//           >
//             ▶
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PDFViewer = ({ userEmail, onClose }) => {
//   const [pdfUrl, setPdfUrl] = useState("");
//   const [pdfBlob, setPdfBlob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const isMobile = window.innerWidth <= 768;

//   useEffect(() => {
//     const loadPDF = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const token = localStorage.getItem("authToken");
//         const response = await fetch(
//           `https://immu-backend.up.railway.app/upload/doc/${userEmail}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error(
//             `Failed to load PDF: ${response.status} ${response.statusText}`
//           );
//         }
//         const blob = await response.blob();
//         setPdfBlob(blob);
//         const url = URL.createObjectURL(blob);
//         setPdfUrl(url);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to load PDF");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPDF();

//     return () => {
//       if (pdfUrl) {
//         URL.revokeObjectURL(pdfUrl);
//       }
//     };
//   }, [userEmail]);

//   const downloadPDF = () => {
//     if (!pdfBlob) return;

//     const downloadUrl = URL.createObjectURL(pdfBlob);
//     const a = document.createElement("a");
//     a.href = downloadUrl;
//     a.download = `${userEmail}_document.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(downloadUrl);
//   };

//   const containerStyle = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100vw",
//     height: "100vh",
//     backgroundColor: "white",
//     zIndex: 1000,
//     display: "flex",
//     flexDirection: "column",
//     overflow: "hidden",
//   };

//   const headerStyle = {
//     padding: "12px 16px",
//     borderBottom: "1px solid #ccc",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   };

//   const buttonStyle = {
//     background: "none",
//     border: "none",
//     padding: "6px 10px",
//     fontSize: "14px",
//     cursor: "pointer",
//   };

//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div>Loading PDF...</div>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "red",
//           }}
//         >
//           Error: {error}
//         </div>
//       );
//     }

//     if (isMobile) {
//       // On mobile, only show download option
//       return (
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <button onClick={downloadPDF} style={buttonStyle}>
//             Download PDF
//           </button>
//         </div>
//       );
//     }

//     // Desktop: show embedded PDF
//     return (
//       <div style={{ flex: 1, width: "100%", height: "100%" }}>
//         <iframe
//           src={pdfUrl}
//           style={{
//             width: "100%",
//             height: "100%",
//             border: "none",
//             display: "block",
//           }}
//           title="PDF Viewer"
//         />
//       </div>
//     );
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <h3 style={{ margin: 0 }}>PDF Viewer</h3>
//         <button onClick={onClose} style={buttonStyle}>
//           Close
//         </button>
//       </div>
//       {renderContent()}
//     </div>
//   );
// };

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [userData, setUserData] = useState(null);
//   const [userDataFound, setUserDataFound] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [applications, setApplications] = useState([]);
//   const [documentData, setDocumentData] = useState(null);
//   const [documentLoading, setDocumentLoading] = useState(false);
//   const [documentError, setDocumentError] = useState(null);

// // Add this state to your Dashboard component (after your existing useState declarations):
// const [currentPage, setCurrentPage] = useState(1);
// const [resultsPerPage] = useState(10); // or whatever number you want
// const totalResults = userDataFound && userData ? 1 : 0;
//   // New state for visa details
//   const [visaDetails, setVisaDetails] = useState(null);
//   const [visaDetailsLoading, setVisaDetailsLoading] = useState(false);

//   // PDF Viewer state
//   const [showPDFViewer, setShowPDFViewer] = useState(false);
//   const [showUi, setShowUi] = useState(true);

//   // Get screen size for responsive design
//   const [screenSize, setScreenSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Responsive helper functions
//   const isMobile = screenSize.width <= 480;
//   const isTablet = screenSize.width > 480 && screenSize.width <= 768;
//   const isLaptop = screenSize.width > 768 && screenSize.width <= 1024;
//   const isDesktop = screenSize.width > 1024;

//   // Close PDF handler
//   const closePDFViewer = () => {
//     setShowPDFViewer(false);
//     setShowUi(true);
//   };

//   // Circular Dotted Loader Component
//   const CircularDottedLoader = ({ size = 20, color = "#666" }) => {
//     const loaderStyle = {
//       display: "inline-block",
//       position: "relative",
//       width: `${size}px`,
//       height: `${size}px`,
//     };

//     const dotStyle = {
//       position: "absolute",
//       width: "3px",
//       height: "3px",
//       borderRadius: "50%",
//       backgroundColor: color,
//       animation: "dotRotation 1.2s linear infinite",
//     };

//     const keyframes = `
//       @keyframes dotRotation {
//         0% { transform: rotate(0deg) translateX(${
//           size / 2 - 1.5
//         }px) rotate(0deg); opacity: 1; }
//         50% { opacity: 0.3; }
//         100% { transform: rotate(360deg) translateX(${
//           size / 2 - 1.5
//         }px) rotate(-360deg); opacity: 1; }
//       }
//     `;

//     // Create 8 dots around the circle
//     const dots = Array.from({ length: 8 }, (_, i) => (
//       <div
//         key={i}
//         style={{
//           ...dotStyle,
//           transform: `rotate(${i * 45}deg) translateX(${
//             size / 2 - 1.5
//           }px) rotate(-${i * 45}deg)`,
//           animationDelay: `${i * 0.15}s`,
//         }}
//       />
//     ));

//     return (
//       <>
//         <style>{keyframes}</style>
//         <div style={loaderStyle}>{dots}</div>
//       </>
//     );
//   };

//   // Main Loading Component for full screen
//   const MainLoader = () => (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         fontSize: isMobile ? "14px" : "16px",
//         flexDirection: "column",
//         gap: isMobile ? "12px" : "16px",
//         padding: "20px",
//       }}
//     >
//       <CircularDottedLoader size={isMobile ? 30 : 40} color="#0066cc" />
//       <span>Loading...</span>
//     </div>
//   );

//   // Get authToken from localStorage
//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   // Get user data from localStorage
//   const getUserDataFromLS = () => {
//     try {
//       const storedUserData = localStorage.getItem("userData");
//       if (storedUserData) {
//         return JSON.parse(storedUserData);
//       }
//       return null;
//     } catch (error) {
//       console.error("Error parsing user data from localStorage:", error);
//       return null;
//     }
//   };

//   // Create headers with auth token
//   const createHeaders = () => {
//     const token = getAuthToken();
//     const headers = {
//       "Content-Type": "application/json",
//     };

//     if (token) {
//       headers["Authorization"] = `Bearer ${token}`;
//     }

//     return headers;
//   };

//   // Fetch visa details from new API
//   const fetchVisaDetails = async (userEmail) => {
//     try {
//       setVisaDetailsLoading(true);
//       console.log("Fetching visa details for userEmail:", userEmail);

//       const response = await fetch(
//         `https://immu-backend.up.railway.app/upload/doc/details/${userEmail}`,
//         {
//           method: "GET",
//           headers: createHeaders(),
//         }
//       );

//       console.log("Visa details API response status:", response.status);

//       if (response.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/gov.au/lusc/lgin");
//         return;
//       }

//       if (response.status === 404) {
//         console.log("Visa details not found (404)");
//         setVisaDetails(null);
//         return;
//       }

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Visa details API Response:", data);
//         setVisaDetails(data);
//       } else {
//         const errorText = await response.text();
//         console.error(
//           "Error fetching visa details:",
//           response.status,
//           response.statusText,
//           errorText
//         );
//         setVisaDetails(null);
//       }
//     } catch (error) {
//       console.error("Error fetching visa details:", error);
//       setVisaDetails(null);
//     } finally {
//       setVisaDetailsLoading(false);
//     }
//   };

//   // Convert base64 to blob
//   const base64ToBlob = (base64, contentType = "application/pdf") => {
//     try {
//       // Remove data URL prefix if present
//       const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;

//       // Decode base64
//       const byteCharacters = atob(base64Data);
//       const byteArrays = [];

//       for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//         const slice = byteCharacters.slice(offset, offset + 512);
//         const byteNumbers = new Array(slice.length);

//         for (let i = 0; i < slice.length; i++) {
//           byteNumbers[i] = slice.charCodeAt(i);
//         }

//         const byteArray = new Uint8Array(byteNumbers);
//         byteArrays.push(byteArray);
//       }

//       return new Blob(byteArrays, { type: contentType });
//     } catch (error) {
//       console.error("Error converting base64 to blob:", error);
//       return null;
//     }
//   };

//   // Fetch document details from API with email instead of userId
//   const fetchDocumentDetails = async (userEmail) => {
//     try {
//       setDocumentLoading(true);
//       setDocumentError(null);

//       console.log("Fetching document for userEmail:", userEmail);

//       const response = await fetch(
//         `https://immu-backend.up.railway.app/upload/doc/${userEmail}`,
//         {
//           method: "GET",
//           headers: createHeaders(),
//         }
//       );

//       console.log("Document API response status:", response.status);

//       if (response.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/gov.au/lusc/lgin");
//         return;
//       }

//       if (response.status === 404) {
//         console.log("Document not found (404)");
//         setDocumentData(null);
//         setDocumentError(null); // Don't set error message for 404
//         return;
//       }

//       if (response.ok) {
//         // Get the response as text first since it's a plain base64 string
//         const base64String = await response.text();
//         console.log(
//           "Document API Response (base64 string length):",
//           base64String.length
//         );
//         console.log("First 100 characters:", base64String.substring(0, 100));

//         // Store the base64 string directly
//         setDocumentData({
//           base64Data: base64String,
//           status: "approved", // You might want to get this from another API or set a default
//         });
//         setDocumentError(null);
//       } else {
//         const errorText = await response.text();
//         console.error(
//           "Error fetching document details:",
//           response.status,
//           response.statusText,
//           errorText
//         );
//         setDocumentData(null);
//         setDocumentError(null); // Don't show error message on UI
//       }
//     } catch (error) {
//       console.error("Error fetching document details:", error);
//       setDocumentData(null);
//       setDocumentError(null); // Don't show error message on UI
//     } finally {
//       setDocumentLoading(false);
//     }
//   };

//   // Download PDF function with base64 conversion
//   const downloadPDF = async () => {
//     if (!documentData || !documentData.base64Data) {
//       alert("No document data available");
//       return;
//     }

//     console.log(
//       "Attempting to download PDF with base64 length:",
//       documentData.base64Data.length
//     );

//     try {
//       const blob = base64ToBlob(documentData.base64Data);

//       if (!blob) {
//         throw new Error("Failed to convert base64 to blob");
//       }

//       console.log("Blob created successfully, size:", blob.size);

//       // Create download link
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `document_${userData?.user_id || "user"}.pdf`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       alert("Error downloading PDF: " + error.message);
//     }
//   };

//   // View PDF using integrated viewer
//   const viewPDF = () => {
//     setShowPDFViewer(true);
//     setShowUi(false);
//   };

//   // Updated status display function to handle new API response format
//   const getStatusDisplay = (status) => {
//     const normalizedStatus = status?.toLowerCase();

//     // Handle "visa grant" status specifically
//     if (normalizedStatus === "visa grant" || normalizedStatus === "granted") {
//       return {
//         color: "#22c55e",
//         backgroundColor: "#dcfce7",
//         icon: "✅",
//         text: "Visa Granted",
//       };
//     }

//     switch (normalizedStatus) {
//       case "accepted":
//       case "approved":
//         return {
//           color: "#22c55e",
//           backgroundColor: "#dcfce7",
//           icon: "✅",
//           text: status.charAt(0).toUpperCase() + status.slice(1),
//         };
//       case "rejected":
//       case "denied":
//         return {
//           color: "#ef4444",
//           backgroundColor: "#fee2e2",
//           icon: "❌",
//           text: "Rejected",
//         };
//       case "pending":
//       case "under review":
//         return {
//           color: "#f59e0b",
//           backgroundColor: "#fef3c7",
//           icon: "⏳",
//           text: "Pending",
//         };
//       default:
//         return {
//           color: "#6b7280",
//           backgroundColor: "#f3f4f6",
//           icon: "📄",
//           text: status || "Document Available",
//         };
//     }
//   };

//   // Check if PDF data exists
//   const hasPDFData = () => {
//     return !!(
//       documentData &&
//       documentData.base64Data &&
//       documentData.base64Data.length > 0
//     );
//   };

//   // Fetch user details from API
//   const fetchUserDetails = async () => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         console.error("No auth token found");
//         navigate("/gov.au/lusc/lgin");
//         return;
//       }

//       const lsUserData = getUserDataFromLS();
//       if (!lsUserData || !lsUserData.user_id) {
//         console.error("No user data or user_id found in localStorage");
//         navigate("/gov.au/lusc/lgin");
//         return;
//       }

//       setLoading(true);
//       const response = await fetch(
//         "https://immu-backend.up.railway.app/userInfo/userdetails",
//         {
//           method: "POST",
//           headers: createHeaders(),
//           body: JSON.stringify({
//             user_id: lsUserData.user_id,
//           }),
//         }
//       );

//       if (response.status === 401) {
//         localStorage.removeItem("authToken");
//         navigate("/gov.au/lusc/lgin");
//         return;
//       }

//       if (response.ok) {
//         const data = await response.json();

//         if (data.user_data_found) {
//           setUserDataFound(true);
//           setUserData(lsUserData);
//           // After successful user details fetch, get document details and visa details
//           await fetchDocumentDetails(lsUserData.email);
//           await fetchVisaDetails(lsUserData.email);
//         } else {
//           setUserDataFound(false);
//           setUserData(null);
//         }
//       } else {
//         console.error("Error fetching user details:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initialize component with localStorage data
//   useEffect(() => {
//     const lsUserData = getUserDataFromLS();
//     if (lsUserData) {
//       setUserData(lsUserData);
//     }

//     fetchUserDetails();
//   }, []);

//   // Show loading state with circular dotted loader
//   if (loading) {
//     return <MainLoader />;
//   }

//   return (
//     <>
//       {/* PDF Viewer Modal */}
//       {showPDFViewer && (
//         <PDFViewer userEmail={userData?.email} onClose={closePDFViewer} />
//       )}
//       {showUi && (
//         <div
//           style={{
//             fontFamily: "Arial, sans-serif",
//             margin: "0 auto",
//             backgroundColor: "#f0f0f0",
//             height: "fit-content",
//             width: "100%",
//             maxWidth: "99vw",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           {/* Header Navigation */}
//           <div
//             style={{
//               backgroundColor: "#f8f9fa",
//               borderBottom: "1px solid #dee2e6",
//               padding: isMobile
//                 ? "6px 8px"
//                 : isTablet
//                 ? "8px 12px"
//                 : "8px 16px",
//               display: "flex",
//               alignItems: "center",
//               gap: isMobile ? "8px" : isTablet ? "12px" : "20px",
//               fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//               overflowX: "auto",
//               whiteSpace: "nowrap",
//             }}
//           >
//             <span
//               style={{
//                 color: "#0066cc",
//                 cursor: "pointer",
//                 borderRight: "1px solid #dee2e6",
//                 paddingRight: isMobile ? "8px" : isTablet ? "12px" : "20px",
//                 flexShrink: 0,
//               }}
//             >
//               My applications
//             </span>
//             <span
//               style={{
//                 color: "#333",
//                 cursor: "pointer",
//                 borderRight: "1px solid #dee2e6",
//                 paddingRight: isMobile ? "8px" : isTablet ? "12px" : "20px",
//                 flexShrink: 0,
//               }}
//               // onClick={() => navigate("/gov.au/lusc/payment")}
//             >
//               My payments ▼
//             </span>
//             <span
//               style={{
//                 color: "#333",
//                 cursor: "pointer",
//                 borderRight: "1px solid #dee2e6",
//                 paddingRight: isMobile ? "8px" : isTablet ? "12px" : "20px",
//                 flexShrink: 0,
//               }}
//             >
//               {isMobile ? "Groups" : "Manage groups"}
//             </span>
//             <span
//               style={{
//                 color: "#333",
//                 cursor: "pointer",
//                 borderRight: "1px solid #dee2e6",
//                 paddingRight: isMobile ? "8px" : isTablet ? "12px" : "20px",
//                 flexShrink: 0,
//               }}
//             >
//               {isMobile ? "Links ▼" : "Related links ▼"}
//             </span>
//             <span
//               style={{
//                 color: "#333",
//                 cursor: "pointer",
//                 flexShrink: 0,
//               }}
//             >
//               {isMobile ? "Help ▼" : "Help and support ▼"}
//             </span>
//           </div>

//           {/* Main Container */}
//           <div
//             style={{
//               padding: isMobile ? "8px" : isTablet ? "12px" : "20px",
//               backgroundColor: "#CCCCCC",
//               height: "fit-content",
//             }}
//           >
//             {/* Header and Content Container */}
//             <div
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 marginBottom: isMobile ? "8px" : isTablet ? "12px" : "20px",
//                 backgroundColor: "#ffffff",
//                 width: "100%",
//                 height: "fit-content",
//                 maxWidth: "100%",
//                 boxSizing: "border-box",
//               }}
//             >
//               {/* Header with Logo/Icon and Title */}
//               <header
//                 style={{
//                   background: "#072243",
//                   height: "fit-content",
//                   minHeight: isMobile ? "35px" : isTablet ? "40px" : "45px",
//                   display: "flex",
//                   alignItems: "center",
//                   padding: isMobile
//                     ? "8px 10px"
//                     : isTablet
//                     ? "10px 12px"
//                     : "12px 15px",
//                   color: "white",
//                   fontSize: isMobile ? "11px" : isTablet ? "12px" : "12px",
//                   fontWeight: "bold",
//                   gap: "8px",
//                 }}
//               >
//                 <span style={{ fontSize: isMobile ? "12px" : "14px" }}>📄</span>
//                 <span style={{ flexGrow: 1 }}>My applications summary</span>
//                 {userDataFound && userData && (
//                   <span
//                     style={{
//                       fontSize: isMobile ? "9px" : isTablet ? "10px" : "11px",
//                       textAlign: "right",
//                     }}
//                   >
//                     {isMobile ? userData.name.split(" ")[0] : userData.name}'s
//                     Apps
//                   </span>
//                 )}
//                 <span
//                   style={{
//                     cursor: "pointer",
//                     fontSize: isMobile ? "12px" : "14px",
//                   }}
//                 >
//                   ❓
//                 </span>
//               </header>

//               {/* Content Section */}
//               <div
//                 style={{
//                   backgroundColor: "#ffffff",
//                   padding: isMobile ? "10px" : isTablet ? "12px" : "18px",
//                   height: "fit-content",
//                 }}
//               >
//                 {/* Action Buttons with text below icons */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: isMobile ? "12px" : isTablet ? "18px" : "24px",
//                     marginBottom: isMobile ? "12px" : "16px",
//                     flexWrap: "wrap",
//                     justifyContent: isMobile ? "space-around" : "flex-start",
//                   }}
//                 >
//                   <button
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "none",
//                       color: "#0066cc",
//                       fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//                       cursor: "pointer",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       gap: "4px",
//                       textDecoration: "underline",
//                       padding: "4px",
//                       minWidth: isMobile ? "60px" : "auto",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: isMobile ? "14px" : "16px",
//                         textDecoration: "none",
//                       }}
//                     >
//                       📄
//                     </span>
//                     <span onClick={() => navigate("/gov.au/lusc/new-application")}>
//                       {isMobile ? "New" : "New application"}
//                     </span>
//                   </button>
//                   <button
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "none",
//                       color: "#0066cc",
//                       fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//                       cursor: "pointer",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       gap: "4px",
//                       textDecoration: "underline",
//                       padding: "4px",
//                       minWidth: isMobile ? "60px" : "auto",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: isMobile ? "14px" : "16px",
//                         textDecoration: "none",
//                       }}
//                     >
//                       📥
//                     </span>
//                     <span>{isMobile ? "Import" : "Import application"}</span>
//                   </button>
//                   <button
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "none",
//                       color: "#0066cc",
//                       fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//                       cursor: "pointer",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       gap: "4px",
//                       textDecoration: "underline",
//                       padding: "4px",
//                       minWidth: isMobile ? "60px" : "auto",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontSize: isMobile ? "14px" : "16px",
//                         textDecoration: "none",
//                       }}
//                     >
//                       🔄
//                     </span>
//                     <span>{isMobile ? "Submit" : "Submit applications"}</span>
//                   </button>
//                 </div>

//                 {/* Search and Filters */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: isMobile ? "8px" : isTablet ? "12px" : "16px",
//                     marginBottom: isMobile ? "12px" : "16px",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{
//                       padding: isMobile ? "6px 8px" : "4px 8px",
//                       fontSize: isMobile ? "11px" : "12px",
//                       border: "1px solid black",
//                       borderRadius: "3px",
//                       width: isMobile ? "140px" : isTablet ? "180px" : "200px",
//                       backgroundColor: "#fff",
//                       minWidth: "120px",
//                     }}
//                     placeholder={
//                       userDataFound && userData
//                         ? isMobile
//                           ? `Search ${userData.name.split(" ")[0]}'s apps`
//                           : `Search ${userData.name}'s applications`
//                         : "Search applications"
//                     }
//                   />
//                   <button
//                     style={{
//                       backgroundColor: "#f5f5f5",
//                       border: "1px solid black",
//                       padding: isMobile ? "6px 8px" : "4px 8px",
//                       fontSize: isMobile ? "11px" : "12px",
//                       borderRadius: "3px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     🔍
//                   </button>
//                   <span
//                     style={{
//                       color: "#0066cc",
//                       fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//                       cursor: "pointer",
//                       textDecoration: "underline",
//                     }}
//                   >
//                     {isMobile ? "≡Search" : "≡Advanced search"}
//                   </span>
//                 </div>

//                 {/* List of applications heading */}
//                 <h2
//                   style={{
//                     fontSize: isMobile ? "11px" : "12px",
//                     fontWeight: "bold",
//                     color: "#1B3564",
//                     marginBottom: "8px",
//                     marginTop: "0",
//                   }}
//                 >
//                   {userDataFound && userData
//                     ? isMobile
//                       ? `${userData.name.split(" ")[0]}'s Apps`
//                       : `${userData.name}'s Applications`
//                     : "List of applications"}
//                 </h2>

//                 {/* Sort options */}
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: isMobile ? "6px" : "8px",
//                     marginBottom: isMobile ? "12px" : "16px",
//                     fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//                     color: "#333",
//                     flexWrap: "wrap",
//                   }}
//                 >
//                   <span>Sort by</span>
//                   <select
//                     style={{
//                       fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//                       padding: "2px 4px",
//                       border: "1px solid black",
//                       backgroundColor: "white",
//                       borderRadius: "3px",
//                     }}
//                   >
//                     <option>Last updated</option>
//                   </select>
//                   <button
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "none",
//                       fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//                       cursor: "pointer",
//                       padding: "2px 4px",
//                     }}
//                   >
//                     ↕️
//                   </button>
//                   <button
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "none",
//                       color: "#0066cc",
//                       fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
//                       cursor: "pointer",
//                       textDecoration: "underline",
//                     }}
//                     onClick={fetchUserDetails}
//                   >
//                     🔄Refresh
//                   </button>
//                 </div>

//                 {/* Applications Table - Only show if user data found */}
//                 {userDataFound && userData && (

//                   <div>
//                     <div className="absolute bottom-[27%] left-[4%] font-extrabold">+</div>
//                     <div
//                       style={{
//                         border: "1px solid #ccc",
//                         backgroundColor: "#fff",
//                         overflow: "hidden",
//                         // borderRadius: "4px",
//                         // paddingLeft:"px",
//                       }}
//                     >
//                       <div
//                         style={{
//                           backgroundColor: "#D8EFFD",
//                           padding: isMobile
//                             ? "10px 8px"
//                             : isTablet
//                             ? "10px 10px"
//                             : "8px 12px",
//                           fontSize: isMobile ? "11px" : "12px",
//                           display: "flex",
//                           flexDirection: isMobile ? "column" : "row",
//                           alignItems: isMobile ? "flex-start" : "center",
//                           minHeight: isMobile ? "auto" : "30px",
//                           gap: isMobile ? "8px" : "0",
//                           paddingLeft: isMobile ? "0" : "50px",
//                         }}
//                       >
//                         <div style={{ flex: 1, width: "100%" }}>
//                           <strong
//                             style={{
//                               color: "#0B6B9A",
//                               display: "block",
//                               // marginBottom: "4px",
//                               fontSize: isMobile ? "12px" : "15px",
//                             }}
//                           >
//                             {userData.name.toUpperCase()}
//                             {!isMobile && ` (${userData.phone_number})`}
//                           </strong>
//                           {isMobile && (
//                             <div
//                               style={{
//                                 color: "#333",
//                                 // marginBottom: "4px",
//                                 fontSize: "10px",
//                               }}
//                             >
//                               Phone: {userData.phone_number}
//                             </div>
//                           )}
//                           {/* <div
//                           style={{
//                             color: "#333",
//                             marginBottom: "4px",
//                             fontSize: isMobile ? "10px" : "12px",
//                           }}
//                         >
//                           Email:{" "}
//                           {isMobile
//                             ? userData.email.length > 20
//                               ? userData.email.substring(0, 20) + "..."
//                               : userData.email
//                             : userData.email}
//                         </div> */}

//                           {/* Visa Details Loading and Display */}
//                           {visaDetailsLoading ? (
//                             <div
//                               style={{
//                                 // marginTop: "8px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 // gap: "8px",
//                               }}
//                             >
//                               <CircularDottedLoader
//                                 size={isMobile ? 14 : 16}
//                                 color="#666"
//                               />
//                               <span
//                                 style={{
//                                   color: "#666",
//                                   fontSize: isMobile ? "10px" : "11px",
//                                 }}
//                               >
//                                 Loading visa details...
//                               </span>
//                             </div>
//                           ) : visaDetails ? (
//                             <div
//                               style={{
//                                 marginTop: "8px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: isMobile ? "8px" : "12px",
//                                 flexWrap: "wrap",
//                               }}
//                             >
//                               {visaDetails.visa_type && (
//                                 <div
//                                   style={{
//                                     // display: "flex",
//                                     // alignItems: "center",
//                                     // gap: "4px",
//                                     // padding: "2px 6px",
//                                     // borderRadius: "12px",
//                                     // backgroundColor: "#e0f2fe",
//                                     // color: "#0066cc",
//                                     fontSize: isMobile ? "9px" : "13px",
//                                     fontWeight: "semibold",
//                                     marginTop: "-10px",
//                                   }}
//                                 >
//                                   {/* <span>🛂</span> */}
//                                   <span>
//                                     {visaDetails.visa_type
//                                       .charAt(0)
//                                       .toUpperCase() +
//                                       visaDetails.visa_type
//                                         .slice(1)
//                                         .toLowerCase()}
//                                   </span>
//                                 </div>
//                               )}

//                               {/* Visa Type - using visa_type from API response */}
//                             </div>
//                           ) : null}
//                           {/* Visa Status */}
//                           {visaDetails.status && (
//                             <div
//                               style={{
//                                 // display: "flex",
//                                 // alignItems: "center",
//                                 // gap: "4px",
//                                 // padding: "2px 6px",
//                                 // borderRadius: "12px",
//                                 // backgroundColor: getStatusDisplay(visaDetails.status).backgroundColor,
//                                 // color: getStatusDisplay(visaDetails.status).color,
//                                 // fontSize: isMobile ? "9px" : "10px",
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               {/* <span>{getStatusDisplay(visaDetails.status).icon}</span> */}
//                               <span>
//                                 {getStatusDisplay(visaDetails.status).text}
//                               </span>
//                             </div>
//                           )}

//                           {/* Document Status and PDF Actions */}
//                           {documentLoading ? (
//                             <div
//                               style={{
//                                 marginTop: "8px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "8px",
//                               }}
//                             >
//                               <CircularDottedLoader
//                                 size={isMobile ? 14 : 16}
//                                 color="#666"
//                               />
//                               <span
//                                 style={{
//                                   color: "#666",
//                                   fontSize: isMobile ? "10px" : "11px",
//                                 }}
//                               >
//                                 Loading document...
//                               </span>
//                             </div>
//                           ) : documentData ? (
//                             <div
//                               style={{
//                                 // marginTop: "8px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: isMobile ? "8px" : "12px",
//                                 flexWrap: "wrap",
//                               }}
//                             >
//                               {/* PDF Action Buttons */}
//                               {hasPDFData() && (
//                                 <div
//                                   style={{
//                                     display: "flex",
//                                     gap: isMobile ? "6px" : "8px",
//                                     flexWrap: "wrap",
//                                   }}
//                                 >
//                                   {/* View PDF Button */}
//                                   <button
//                                   onClick={viewPDF}
//                                   style={{
//                                     // backgroundColor: "#0066cc",
//                                     // color: "white",
//                                     // border: "none",
//                                     // padding: isMobile ? "4px 8px" : "6px 10px",
//                                     // borderRadius: "4px",
//                                     // cursor: "pointer",
//                                     // fontSize: isMobile ? "9px" : "10px",
//                                     // display: "flex",
//                                     // alignItems: "center",
//                                     // gap: "4px",
//                                   }}
//                                 >
//                                   <span>📄</span>
//                                   <span>{isMobile ? "View" : "View PDF"}</span>
//                                 </button>
//                                 </div>
//                               )}
//                             </div>
//                           ) : null}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Dashboard;
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// PDF Viewer Component
// Add this component before your Dashboard component
const GovernmentPagination = ({
  currentPage = 1,
  totalResults = 1,
  resultsPerPage = 10,
  onPageChange = () => {},
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startResult =
    totalResults === 0 ? 0 : (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        fontSize: "13px",
        color: "#333",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #ddd",
        borderLeft: "1px solid #ddd",
        borderRight: "1px solid #ddd",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Results text */}
      <div
        style={{
          fontWeight: "normal",
          color: "#333",
        }}
      >
        {totalResults === 0
          ? "No results"
          : `${startResult} - ${endResult} of ${totalResults} results`}
      </div>

      {/* Pagination controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            color: "#333",
            fontWeight: "normal",
          }}
        >
          Page
        </span>

        <select
          value={currentPage}
          onChange={(e) => onPageChange(parseInt(e.target.value))}
          style={{
            padding: "2px 6px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            fontSize: "13px",
            backgroundColor: "white",
            color: "#333",
            marginRight: "8px",
          }}
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>

        {/* Navigation buttons */}
        <div
          style={{
            display: "flex",
            gap: "2px",
            alignItems: "center",
          }}
        >
          {/* First/Previous page button */}
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              width: "24px",
              height: "24px",
              border: "1px solid #ccc",
              backgroundColor: currentPage === 1 ? "#f5f5f5" : "white",
              color: currentPage === 1 ? "#999" : "#0066cc",
              cursor: currentPage === 1 ? "default" : "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "3px",
            }}
          >
            ◀
          </button>

          {/* Page numbers */}
          <button
            style={{
              minWidth: "24px",
              height: "24px",
              border: "1px solid #ccc",
              backgroundColor: "#0066cc",
              color: "white",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "3px",
              padding: "0 6px",
            }}
          >
            {currentPage}
          </button>

          {/* Next/Last page button */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
              width: "24px",
              height: "24px",
              border: "1px solid #ccc",
              backgroundColor: currentPage === totalPages ? "#f5f5f5" : "white",
              color: currentPage === totalPages ? "#999" : "#0066cc",
              cursor: currentPage === totalPages ? "default" : "pointer",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "3px",
            }}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

const PDFViewer = ({ userEmail, onClose }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `https://immu-backend.up.railway.app/upload/doc/${userEmail}`,
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
    padding: "12px 16px",
    borderBottom: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    padding: "6px 10px",
    fontSize: "14px",
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
      // On mobile, only show download option
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

    // Desktop: show embedded PDF
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
        <h3 style={{ margin: 0 }}>PDF Viewer</h3>
        <button onClick={onClose} style={buttonStyle}>
          Close
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(null);
  const [userDataFound, setUserDataFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [documentData, setDocumentData] = useState(null);
  const [documentLoading, setDocumentLoading] = useState(false);
  const [documentError, setDocumentError] = useState(null);

  // Add this state to your Dashboard component (after your existing useState declarations):
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10); // or whatever number you want
  const totalResults = userDataFound && userData ? 1 : 0;

  // New state for visa details
  const [visaDetails, setVisaDetails] = useState(null);
  const [visaDetailsLoading, setVisaDetailsLoading] = useState(false);

  // New state for visa status
  const [visaStatus, setVisaStatus] = useState("processing"); // Default status
  const [visaStatusLoading, setVisaStatusLoading] = useState(false);

  // New state for detailed user info
  const [userInfo, setUserInfo] = useState(null);

  // PDF Viewer state
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [showUi, setShowUi] = useState(true);

  // Get screen size for responsive design
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
  const isLaptop = screenSize.width > 768 && screenSize.width <= 1024;
  const isDesktop = screenSize.width > 1024;

  // Close PDF handler
  const closePDFViewer = () => {
    setShowPDFViewer(false);
    setShowUi(true);
  };

  // Circular Dotted Loader Component
  const CircularDottedLoader = ({ size = 20, color = "#666" }) => {
    const loaderStyle = {
      display: "inline-block",
      position: "relative",
      width: `${size}px`,
      height: `${size}px`,
    };

    const dotStyle = {
      position: "absolute",
      width: "3px",
      height: "3px",
      borderRadius: "50%",
      backgroundColor: color,
      animation: "dotRotation 1.2s linear infinite",
    };

    const keyframes = `
      @keyframes dotRotation {
        0% { transform: rotate(0deg) translateX(${
          size / 2 - 1.5
        }px) rotate(0deg); opacity: 1; }
        50% { opacity: 0.3; }
        100% { transform: rotate(360deg) translateX(${
          size / 2 - 1.5
        }px) rotate(-360deg); opacity: 1; }
      }
    `;

    // Create 8 dots around the circle
    const dots = Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        style={{
          ...dotStyle,
          transform: `rotate(${i * 45}deg) translateX(${
            size / 2 - 1.5
          }px) rotate(-${i * 45}deg)`,
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ));

    return (
      <>
        <style>{keyframes}</style>
        <div style={loaderStyle}>{dots}</div>
      </>
    );
  };

  // Main Loading Component for full screen
  const MainLoader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: isMobile ? "14px" : "16px",
        flexDirection: "column",
        gap: isMobile ? "12px" : "16px",
        padding: "20px",
      }}
    >
      <CircularDottedLoader size={isMobile ? 30 : 40} color="#0066cc" />
      <span>Loading...</span>
    </div>
  );

  // Get authToken from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Get user data from localStorage
  const getUserDataFromLS = () => {
    try {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        return JSON.parse(storedUserData);
      }
      return null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
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

  // Fetch visa status from API
  const fetchVisaStatus = async (userEmail) => {
    try {
      setVisaStatusLoading(true);
      console.log("Fetching visa status for userEmail:", userEmail);

      const response = await fetch(
        `https://immu-backend.up.railway.app/upload/doc/details/${userEmail}`,
        {
          method: "GET",
          headers: createHeaders(),
        }
      );

      console.log("Visa status API response status:", response.status);

      if (response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/gov.au/lusc/lgin");
        return;
      }

      if (response.status === 404) {
        console.log(
          "Visa status not found (404) - keeping default processing status"
        );
        setVisaStatus("processing");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Visa status API Response:", data);
        if (data.status) {
          setVisaStatus(data.status);
        } else {
          setVisaStatus("processing");
        }
      } else {
        const errorText = await response.text();
        console.error(
          "Error fetching visa status:",
          response.status,
          response.statusText,
          errorText
        );
        setVisaStatus("processing");
      }
    } catch (error) {
      console.error("Error fetching visa status:", error);
      setVisaStatus("processing");
    } finally {
      setVisaStatusLoading(false);
    }
  };
  const fetchVisaType = async (userId) => {
    try {
      setVisaDetailsLoading(true);
      console.log("Fetching visa type for userId:", userId);

      const response = await fetch(
        `https://immu-backend.up.railway.app/userInfo/SvisaType/${userId}`,
        {
          method: "GET",
          headers: createHeaders(),
        }
      );

      console.log("Visa type API response status:", response.status);

      if (response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/gov.au/lusc/lgin");
        return;
      }

      if (response.status === 404) {
        console.log("Visa type not found (404)");
        setVisaDetails(null);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Visa type API Response:", data);
        setVisaDetails(data);
      } else {
        const errorText = await response.text();
        console.error(
          "Error fetching visa type:",
          response.status,
          response.statusText,
          errorText
        );
        setVisaDetails(null);
      }
    } catch (error) {
      console.error("Error fetching visa type:", error);
      setVisaDetails(null);
    } finally {
      setVisaDetailsLoading(false);
    }
  };
  // Function to generate random reference number
  // const generateReferenceNumber = () => {
  //   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let result = "";
  //   for (let i = 0; i < 8; i++) {
  //     result += characters.charAt(
  //       Math.floor(Math.random() * characters.length)
  //     );
  //   }
  //   return result;
  // };

  // Function to get or generate reference number from localStorage
  // Function to generate random reference number
  const generateReferenceNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "ECP";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // Function to get or generate reference number from localStorage
  const getOrGenerateReferenceNumber = () => {
    const userId = userData?.id || "default";
    const storageKey = `referenceNumber_${userId}`;

    let referenceNumber = localStorage.getItem(storageKey);

    if (!referenceNumber) {
      referenceNumber = generateReferenceNumber();
      localStorage.setItem(storageKey, referenceNumber);
    }

    return referenceNumber;
  };

  // Function to get application type
  const getApplicationType = () => {
    if (visaDetails && visaDetails.visa_type) {
      return (
        visaDetails.visa_type.charAt(0).toUpperCase() +
        visaDetails.visa_type.slice(1).toLowerCase()
      );
    }
    return "My Health Declarations"; // Default as shown in image
  };

  // Format date function for display (DD MMM YYYY format)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }); // Returns format like "19 Jul 2025"
  };

  // Original format date function (if still needed elsewhere)
  // const formatDate = (dateString) => {
  //   if (!dateString) return '';
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('en-GB', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric'
  //   }); // Returns format like "19/07/2025"
  // };

  // Format date function (if not already exists)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // Returns format like "07/08/2025"
  };

  // Convert base64 to blob
  const base64ToBlob = (base64, contentType = "application/pdf") => {
    try {
      // Remove data URL prefix if present
      const base64Data = base64.includes(",") ? base64.split(",")[1] : base64;

      // Decode base64
      const byteCharacters = atob(base64Data);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    } catch (error) {
      console.error("Error converting base64 to blob:", error);
      return null;
    }
  };

  // Fetch document details from API with email instead of userId
  const fetchDocumentDetails = async (userEmail) => {
    try {
      setDocumentLoading(true);
      setDocumentError(null);

      console.log("Fetching document for userEmail:", userEmail);

      const response = await fetch(
        `https://immu-backend.up.railway.app/upload/doc/${userEmail}`,
        {
          method: "GET",
          headers: createHeaders(),
        }
      );

      console.log("Document API response status:", response.status);

      if (response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/gov.au/lusc/lgin");
        return;
      }

      if (response.status === 404) {
        console.log("Document not found (404)");
        setDocumentData(null);
        setDocumentError(null); // Don't set error message for 404
        return;
      }

      if (response.ok) {
        // Get the response as text first since it's a plain base64 string
        const base64String = await response.text();
        console.log(
          "Document API Response (base64 string length):",
          base64String.length
        );
        console.log("First 100 characters:", base64String.substring(0, 100));

        // Store the base64 string directly
        setDocumentData({
          base64Data: base64String,
          status: "approved", // You might want to get this from another API or set a default
        });
        setDocumentError(null);
      } else {
        const errorText = await response.text();
        console.error(
          "Error fetching document details:",
          response.status,
          response.statusText,
          errorText
        );
        setDocumentData(null);
        setDocumentError(null); // Don't show error message on UI
      }
    } catch (error) {
      console.error("Error fetching document details:", error);
      setDocumentData(null);
      setDocumentError(null); // Don't show error message on UI
    } finally {
      setDocumentLoading(false);
    }
  };

  // Download PDF function with base64 conversion
  const downloadPDF = async () => {
    if (!documentData || !documentData.base64Data) {
      alert("No document data available");
      return;
    }

    console.log(
      "Attempting to download PDF with base64 length:",
      documentData.base64Data.length
    );

    try {
      const blob = base64ToBlob(documentData.base64Data);

      if (!blob) {
        throw new Error("Failed to convert base64 to blob");
      }

      console.log("Blob created successfully, size:", blob.size);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `document_${userData?.user_id || "user"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error downloading PDF: " + error.message);
    }
  };

  // View PDF using integrated viewer
  const viewPDF = () => {
    setShowPDFViewer(true);
    setShowUi(false);
  };

  // Updated status display function
  const getStatusDisplay = (status) => {
    const normalizedStatus = status?.toLowerCase();

    // Handle "visa grant" status specifically
    if (normalizedStatus === "visa grant" || normalizedStatus === "granted") {
      return {
        color: "#22c55e",
        backgroundColor: "#dcfce7",
        icon: "✅",
        text: "Granted",
      };
    }

    switch (normalizedStatus) {
      case "accepted":
      case "approved":
        return {
          color: "#22c55e",
          backgroundColor: "#dcfce7",
          icon: "✅",
          text: status.charAt(0).toUpperCase() + status.slice(1),
        };
      case "rejected":
      case "denied":
        return {
          color: "#ef4444",
          backgroundColor: "#fee2e2",
          icon: "❌",
          text: "Rejected",
        };
      case "pending":
      case "under review":
        return {
          color: "#f59e0b",
          backgroundColor: "#fef3c7",
          icon: "⏳",
          text: "Pending",
        };
      case "processing":
        return {
          color: "#3b82f6",
          backgroundColor: "#dbeafe",
          icon: "🔄",
          text: "Processing",
        };
      default:
        return {
          color: "#6b7280",
          backgroundColor: "#f3f4f6",
          icon: "📄",
          text: status || "Processing",
        };
    }
  };
// Function to format the submitted_date from "07-August-2025" format to "07 Aug 2025"
const formatSubmittedDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    // Parse the date from "DD-Month-YYYY" format
    const date = new Date(dateString.replace(/-/g, ' '));
    
    // Format to "DD MMM YYYY"
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting submitted date:', error);
    return dateString; // Return original if parsing fails
  }
};

// Keep your existing utility functions
// const generateReferenceNumber = () => {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let result = 'ECP';
//   for (let i = 0; i < 6; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// };

// const getOrGenerateReferenceNumber = () => {
//   const userId = userData?.id || userInfo?.user_id || 'default';
//   const storageKey = `referenceNumber_${userId}`;
  
//   let referenceNumber = localStorage.getItem(storageKey);
  
//   if (!referenceNumber) {
//     referenceNumber = generateReferenceNumber();
//     localStorage.setItem(storageKey, referenceNumber);
//   }
  
//   return referenceNumber;
// };

// const getApplicationType = () => {
//   if (visaDetails && visaDetails.visa_type) {
//     return visaDetails.visa_type
//       .charAt(0)
//       .toUpperCase() + visaDetails.visa_type.slice(1).toLowerCase();
//   }
//   return "My Health Declarations";
// };

// Keep your existing formatDate function for DOB
// const formatDate = (dateString) => {
//   if (!dateString) return '';
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-GB', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric'
//   });
// };

  // Check if PDF button should be shown
  const shouldShowPDFButton = () => {
    const normalizedStatus = visaStatus?.toLowerCase();
    return (
      (normalizedStatus === "visa grant" ||
        normalizedStatus === "granted" ||
        normalizedStatus === "immi refusal" ||
        normalizedStatus === "refusal") &&
      hasPDFData()
    );
  };
  const hasPDFData = () => {
    return !!(
      documentData &&
      documentData.base64Data &&
      documentData.base64Data.length > 0
    );
  };

  // Format date function
  // const formatDate = (dateString) => {
  //   if (!dateString) return "N/A";
  //   try {
  //     const date = new Date(dateString);
  //     return date.toLocaleDateString("en-AU", {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //     });
  //   } catch (error) {
  //     console.error("Error formatting date:", error);
  //     return dateString;
  //   }
  // };

  // Fetch user details from API
  const fetchUserDetails = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No auth token found");
        navigate("/gov.au/lusc/lgin");
        return;
      }

      const lsUserData = getUserDataFromLS();
      if (!lsUserData || !lsUserData.user_id) {
        console.error("No user data or user_id found in localStorage");
        navigate("/gov.au/lusc/lgin");
        return;
      }

      setLoading(true);
      const response = await fetch(
        "https://immu-backend.up.railway.app/userInfo/userdetails",
        {
          method: "POST",
          headers: createHeaders(),
          body: JSON.stringify({
            user_id: lsUserData.user_id,
          }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/gov.au/lusc/lgin");
        return;
      }

      if (response.ok) {
        const data = await response.json();

        if (data.user_data_found) {
          setUserDataFound(true);
          setUserData(lsUserData);

          // Set the detailed user info from API response
          if (data.user_info) {
            setUserInfo(data.user_info);
          }

          // After successful user details fetch, get document details, visa type, and visa status
          await fetchDocumentDetails(lsUserData.email);
          await fetchVisaType(lsUserData.user_id);
          await fetchVisaStatus(lsUserData.email);
        } else {
          setUserDataFound(false);
          setUserData(null);
          setUserInfo(null);
        }
      } else {
        console.error("Error fetching user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize component with localStorage data
  useEffect(() => {
    const lsUserData = getUserDataFromLS();
    if (lsUserData) {
      setUserData(lsUserData);
    }

    fetchUserDetails();
  }, []);

  // Show loading state with circular dotted loader
  if (loading) {
    return <MainLoader />;
  }

  return (
    <>
      {/* PDF Viewer Modal */}
      {showPDFViewer && (
        <PDFViewer userEmail={userData?.email} onClose={closePDFViewer} />
      )}
      {showUi && (
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            margin: "0 auto",
            backgroundColor: "#f0f0f0",
            height: "fit-content",
            width: "100%",
            maxWidth: "99vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header Navigation */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              borderBottom: "1px solid #dee2e6",
              padding: isMobile
                ? "6px 8px"
                : isTablet
                ? "8px 12px"
                : "8px 16px",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : isTablet ? "12px" : "20px",
              fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                color: "#0066cc",
                cursor: "pointer",
                borderRight: "1px solid #dee2e6",
                paddingRight: isMobile ? "8px" : isTablet ? "12px" : "20px",
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
                paddingRight: isMobile ? "8px" : isTablet ? "12px" : "20px",
                flexShrink: 0,
              }}
              // onClick={() => navigate("/gov.au/lusc/payment")}
            >
              My payments ▼
            </span>
            <span
              style={{
                color: "#333",
                cursor: "pointer",
                borderRight: "1px solid #dee2e6",
                paddingRight: isMobile ? "8px" : isTablet ? "12px" : "20px",
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
                paddingRight: isMobile ? "8px" : isTablet ? "12px" : "20px",
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
              padding: isMobile ? "8px" : isTablet ? "12px" : "20px",
              backgroundColor: "#CCCCCC",
              height: "fit-content",
            }}
          >
            {/* Header and Content Container */}
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: isMobile ? "8px" : isTablet ? "12px" : "20px",
                backgroundColor: "#ffffff",
                width: "100%",
                height: "fit-content",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              {/* Header with Logo/Icon and Title */}
              <header
                style={{
                  background: "#072243",
                  height: "fit-content",
                  minHeight: isMobile ? "35px" : isTablet ? "40px" : "45px",
                  display: "flex",
                  alignItems: "center",
                  padding: isMobile
                    ? "8px 10px"
                    : isTablet
                    ? "10px 12px"
                    : "12px 15px",
                  color: "white",
                  fontSize: isMobile ? "11px" : isTablet ? "12px" : "12px",
                  fontWeight: "bold",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: isMobile ? "12px" : "14px" }}>📄</span>
                <span style={{ flexGrow: 1 }}>My applications summary</span>
                {userDataFound && userData && (
                  <span
                    style={{
                      fontSize: isMobile ? "9px" : isTablet ? "10px" : "11px",
                      textAlign: "right",
                    }}
                  >
                    {isMobile ? userData.name.split(" ")[0] : userData.name}'s
                    Apps
                  </span>
                )}
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  ❓
                </span>
              </header>

              {/* Content Section */}
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: isMobile ? "10px" : isTablet ? "12px" : "18px",
                  height: "fit-content",
                }}
              >
                {/* Action Buttons with text below icons */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "12px" : isTablet ? "18px" : "24px",
                    marginBottom: isMobile ? "12px" : "16px",
                    flexWrap: "wrap",
                    justifyContent: isMobile ? "space-around" : "flex-start",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#0066cc",
                      fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      textDecoration: "underline",
                      padding: "4px",
                      minWidth: isMobile ? "60px" : "auto",
                    }}
                  >
                    <span
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        textDecoration: "none",
                      }}
                    >
                      📄
                    </span>
                    <span onClick={() => navigate("/gov.au/lusc/new-application")}>
                      {isMobile ? "New" : "New application"}
                    </span>
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#0066cc",
                      fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      textDecoration: "underline",
                      padding: "4px",
                      minWidth: isMobile ? "60px" : "auto",
                    }}
                  >
                    <span
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        textDecoration: "none",
                      }}
                    >
                      📥
                    </span>
                    <span>{isMobile ? "Import" : "Import application"}</span>
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#0066cc",
                      fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      textDecoration: "underline",
                      padding: "4px",
                      minWidth: isMobile ? "60px" : "auto",
                    }}
                  >
                    <span
                      style={{
                        fontSize: isMobile ? "14px" : "16px",
                        textDecoration: "none",
                      }}
                    >
                      🔄
                    </span>
                    <span>{isMobile ? "Submit" : "Submit applications"}</span>
                  </button>
                </div>

                {/* Search and Filters */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "8px" : isTablet ? "12px" : "16px",
                    marginBottom: isMobile ? "12px" : "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: isMobile ? "6px 8px" : "4px 8px",
                      fontSize: isMobile ? "11px" : "12px",
                      border: "1px solid black",
                      borderRadius: "3px",
                      width: isMobile ? "140px" : isTablet ? "180px" : "200px",
                      backgroundColor: "#fff",
                      minWidth: "120px",
                    }}
                    placeholder={
                      userDataFound && userData
                        ? isMobile
                          ? `Search ${userData.name.split(" ")[0]}'s apps`
                          : `Search ${userData.name}'s applications`
                        : "Search applications"
                    }
                  />
                  <button
                    style={{
                      backgroundColor: "#f5f5f5",
                      border: "1px solid black",
                      padding: isMobile ? "6px 8px" : "4px 8px",
                      fontSize: isMobile ? "11px" : "12px",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    🔍
                  </button>
                  <span
                    style={{
                      color: "#0066cc",
                      fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {isMobile ? "≡Search" : "≡Advanced search"}
                  </span>
                </div>

                {/* List of applications heading */}
                <h2
                  style={{
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: "bold",
                    color: "#1B3564",
                    marginBottom: "8px",
                    marginTop: "0",
                  }}
                >
                  {userDataFound && userData
                    ? isMobile
                      ? `${userData.name.split(" ")[0]}'s Apps`
                      : `${userData.name}'s Applications`
                    : "List of applications"}
                </h2>

                {/* Sort options */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "6px" : "8px",
                    marginBottom: isMobile ? "12px" : "16px",
                    fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                    color: "#333",
                    flexWrap: "wrap",
                  }}
                >
                  <span>Sort by</span>
                  <select
                    style={{
                      fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                      padding: "2px 4px",
                      border: "1px solid black",
                      backgroundColor: "white",
                      borderRadius: "3px",
                    }}
                  >
                    <option>Last updated</option>
                  </select>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                      cursor: "pointer",
                      padding: "2px 4px",
                    }}
                  >
                    ↕️
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#0066cc",
                      fontSize: isMobile ? "10px" : isTablet ? "11px" : "12px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={fetchUserDetails}
                  >
                    🔄Refresh
                  </button>
                </div>

                {/* Applications Table - Only show if user data found */}
                {userDataFound && userData && (
                  <div>
                    {/* <div className="absolute bottom-[27%] left-[4%] font-extrabold">
      +
    </div> */}
                    <div
                      style={{
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        overflow: "hidden",
                        // borderRadius: "4px",
                        // paddingLeft:"px",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#D8EFFD",
                          padding: isMobile
                            ? "10px 8px"
                            : isTablet
                            ? "10px 10px"
                            : "8px 12px",
                          fontSize: isMobile ? "11px" : "12px",
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          alignItems: isMobile ? "flex-start" : "center",
                          minHeight: isMobile ? "auto" : "30px",
                          gap: isMobile ? "8px" : "0",
                          paddingLeft: isMobile ? "20px" : "50px",
                        }}
                      >
                        <div style={{ flex: 1, width: "100%" }}>
                          <strong
                            style={{
                              color: "#0B6B9A",
                              display: "block",
                              fontSize: isMobile ? "12px" : "15px",
                            }}
                          >
                            {userData.name.toUpperCase()}
                            {/* Changed from phone_number to dateOfBirth */}
                            {!isMobile &&
                              userInfo &&
                              userInfo.dateOfBirth &&
                              ` ( ${formatDate(userInfo.dateOfBirth)})`}
                          </strong>
                          {/* Changed from phone to DOB for mobile */}
                          {isMobile && userInfo && userInfo.dateOfBirth && (
                            <div
                              style={{
                                color: "#333",
                                fontSize: "10px",
                              }}
                            >
                              DOB: {formatDate(userInfo.dateOfBirth)}
                            </div>
                          )}

                          {/* Visa Type Loading and Display - New functionality */}
                          {visaDetailsLoading ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <CircularDottedLoader
                                size={isMobile ? 14 : 16}
                                color="#666"
                              />
                              <span
                                style={{
                                  color: "#666",
                                  fontSize: isMobile ? "10px" : "11px",
                                }}
                              >
                                Loading visa type...
                              </span>
                            </div>
                          ) : visaDetails ? (
                            <div
                              style={{
                                marginTop: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: isMobile ? "8px" : "12px",
                                flexWrap: "wrap",
                              }}
                            >
                              {visaDetails.visa_type && (
                                <div
                                  style={{
                                    fontSize: isMobile ? "9px" : "13px",
                                    fontWeight: "semibold",
                                    marginTop: "-10px",
                                  }}
                                >
                                  <span>
                                    {visaDetails.visa_type
                                      .charAt(0)
                                      .toUpperCase() +
                                      visaDetails.visa_type
                                        .slice(1)
                                        .toLowerCase()}
                                  </span>
                                </div>
                              )}
                            </div>
                          ) : null}

                          {/* Visa Status Display with Loading - New functionality */}
                          {visaStatusLoading ? (
                            <div
                              style={{
                                marginTop: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <CircularDottedLoader
                                size={isMobile ? 14 : 16}
                                color="#666"
                              />
                              <span
                                style={{
                                  color: "#666",
                                  fontSize: isMobile ? "10px" : "11px",
                                }}
                              >
                                Loading visa status...
                              </span>
                            </div>
                          ) : (
                            <div
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              <span>{getStatusDisplay(visaStatus).text}</span>
                            </div>
                          )}

                          {/* PDF Button - Only show for specific statuses - New functionality */}

                          {/* Document Status Loading Indicator - New functionality */}
                          {documentLoading && (
                            <div
                              style={{
                                marginTop: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <CircularDottedLoader
                                size={isMobile ? 14 : 16}
                                color="#666"
                              />
                              <span
                                style={{
                                  color: "#666",
                                  fontSize: isMobile ? "10px" : "11px",
                                }}
                              >
                                Loading document...
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional div with reference number, type, and dates - matching the image */}
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderTop: "none",
                        backgroundColor: "#fff",
                        padding: isMobile ? "8px 12px" : "10px 15px",
                        paddingLeft: isMobile ? "20px" : "50px",
                        fontSize: isMobile ? "11px" : "12px",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        justifyContent: isMobile
                          ? "flex-start"
                          : "space-between",
                        alignItems: isMobile ? "flex-start" : "center",
                        color: "#333",
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                        gap: isMobile ? "4px" : "0",
                      }}
                    >
                      {/* Left side - Reference and Type */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isMobile ? "flex-start" : "flex-start",
                          gap: isMobile ? "4px" : "4px",
                        }}
                      >
                        <span
                          style={{
                            color: "#666",
                            fontSize: isMobile ? "10px" : "11px",
                          }}
                        >
                          <strong>Reference No:</strong>{" "}
                          {getOrGenerateReferenceNumber()}
                        </span>
                        <span
                          style={{
                            color: "#666",
                            fontSize: isMobile ? "10px" : "11px",
                          }}
                        >
                          <strong>Type:</strong> {getApplicationType()}
                        </span>
                      </div>

                      {/* Right side - Dates */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isMobile ? "flex-start" : "flex-end",
                          gap: "4px",
                          paddingRight: isMobile ? "20px" : "400px",
                          fontWeight: "bold",
                        }}
                      >
                        {/* Date submitted - using submitted_date from API */}
                        {userInfo && userInfo.submitted_date && (
                          <div
                            style={{
                              color: "#666",
                              fontSize: isMobile ? "10px" : "11px",
                            }}
                          >
                            <strong>Date submitted:</strong>{" "}
                            {formatSubmittedDate(userInfo.submitted_date)}
                          </div>
                        )}

                        {/* Last updated date - using submitted_date as fallback */}
                        {userInfo && userInfo.submitted_date && (
                          <div
                            style={{
                              color: "#666",
                              fontSize: isMobile ? "10px" : "11px",
                            }}
                          >
                            <strong>Last updated:</strong>{" "}
                            {formatSubmittedDate(userInfo.submitted_date)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* PDF Button moved outside - with your styling */}
                    {shouldShowPDFButton() && (
                      <div>
                        <button
                          onClick={viewPDF}
                          style={{
                            border: "1px solid #ccc",
                            fontSize: isMobile ? "10px" : "12px",
                            // marginTop: "-10px",
                          }}
                        >
                          {/* <span>📄</span> */}
                          <span>{isMobile ? "View PDF" : "View Document"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
