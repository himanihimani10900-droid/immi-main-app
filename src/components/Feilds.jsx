// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const NewApplication = () => {
//   const navigate = useNavigate();
//   const [expandedSection, setExpandedSection] = useState(null);

//   const toggleSection = (section) => {
//     setExpandedSection(expandedSection === section ? null : section);
//   };

//   // Function to handle main field clicks (category headers)
//   const handleMainFieldClick = async (fieldName) => {
//     console.log("Clicked main field:", fieldName);

//     // Call API
//     try {
//       const response = await fetch("/api/application-main-field-click", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//         body: JSON.stringify({
//           fieldName: fieldName,
//           user_id: localStorage.getItem("userId"),
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("API Response:", data);
//       } else {
//         console.error("API Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Network Error:", error);
//     }

//     // Navigate after API call
//     navigate("/gov.au/lusc/verify-user");
//   };

//   // Function to handle dropdown field clicks
//   const handleFieldClick = async (fieldName) => {
//     console.log("Clicked field:", fieldName);

//     // Call API
//     try {
//       const response = await fetch("/api/application-field-click", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fieldName: fieldName,
//           timestamp: new Date().toISOString(),
//           userId: "current-user-id", // You can replace this with actual user ID
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("API Response:", data);
//       } else {
//         console.error("API Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Network Error:", error);
//     }

//     // Navigate after API call
//     navigate("/gov.au/lusc/verify-user");
//   };

//   return (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         margin: "0 auto",
//         backgroundColor: "#f0f0f0",
//         minHeight: "100vh",
//         maxWidth: "99vw",
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* Header Navigation */}
//       <div
//         style={{
//           backgroundColor: "#f8f9fa",
//           borderBottom: "1px solid #dee2e6",
//           padding: "8px 16px",
//           display: "flex",
//           alignItems: "center",
//           gap: "20px",
//           fontSize: "12px",
//         }}
//       >
//         <span
//           style={{
//             color: "#0066cc",
//             cursor: "pointer",
//             borderRight: "1px solid #dee2e6",
//             paddingRight: "20px",
//           }}
//         >
//           My applications
//         </span>
//         <span
//           style={{
//             color: "#333",
//             cursor: "pointer",
//             borderRight: "1px solid #dee2e6",
//             paddingRight: "20px",
//           }}
//         >
//           My payments ▼
//         </span>
//         <span
//           style={{
//             color: "#333",
//             cursor: "pointer",
//             borderRight: "1px solid #dee2e6",
//             paddingRight: "20px",
//           }}
//         >
//           Manage groups
//         </span>
//         <span
//           style={{
//             color: "#333",
//             cursor: "pointer",
//             borderRight: "1px solid #dee2e6",
//             paddingRight: "20px",
//           }}
//         >
//           Related links ▼
//         </span>
//         <span style={{ color: "#333", cursor: "pointer" }}>
//           Help and support ▼
//         </span>
//       </div>

//       {/* Main Container */}
//       <div
//         style={{
//           padding: window.innerWidth <= 768 ? "10px" : "20px",
//           backgroundColor: "#CCCCCC",
//           flex: "1",
//         }}
//       >
//         {/* Header and Content Container */}
//         <div
//           style={{
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             marginBottom: window.innerWidth <= 768 ? "10px" : "20px",
//             backgroundColor: "#ffffff",
//             maxWidth: window.innerWidth <= 768 ? "100%" : "none",
//             height: "fit-content",
//           }}
//         >
//           {/* Header */}
//           <header
//             style={{
//               background: "#072243",
//               height: "fit-content",
//               minHeight: window.innerWidth <= 768 ? "25px" : "20px",
//               display: "flex",
//               alignItems: "center",
//               padding: window.innerWidth <= 768 ? "5px 10px" : "5px 15px",
//               color: "white",
//               fontSize: "12px",
//               fontWeight: "bold",
//               gap: "8px",
//             }}
//           >
//             <span style={{ fontSize: "14px" }}>📄</span>
//             <span>New application</span>
//           </header>

//           {/* Content Section */}
//           <div
//             style={{
//               backgroundColor: "#ffffff",
//               padding:
//                 window.innerWidth <= 480
//                   ? "12px"
//                   : window.innerWidth <= 768
//                   ? "15px"
//                   : "18px",
//               height: "fit-content",
//             }}
//           >
//             {/* Application Types List - All fields with orange border */}
//             <div
//               style={{
//                 marginBottom: window.innerWidth <= 768 ? "15px" : "18px",
//               }}
//             >
//               {/* 482 - Skills in Demand */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "482" ? "2px solid #e86d1a" : "none",
//                     borderRadius: expandedSection === "482" ? "4px" : "0",
//                     paddingLeft: expandedSection === "482" ? "8px" : "0",
//                     paddingRight: expandedSection === "482" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("482 - Skills in Demand");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("482");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>
//                     482 - Skills in Demand
//                   </span>
//                 </div>
//                 {expandedSection === "482" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Nomination for a Skills in Demand Visa (482)"
//                         )
//                       }
//                     >
//                       Nomination for a Skills in Demand Visa (482)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Skills in Demand Visa (482)")
//                       }
//                     >
//                       Skills in Demand Visa (482)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Skills in Demand Visa - Subsequent Entrant (482)"
//                         )
//                       }
//                     >
//                       Skills in Demand Visa - Subsequent Entrant (482)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Air & Sea Crew */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "air-sea"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius: expandedSection === "air-sea" ? "4px" : "0",
//                     paddingLeft: expandedSection === "air-sea" ? "8px" : "0",
//                     paddingRight: expandedSection === "air-sea" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Air & Sea Crew");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("air-sea");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Air & Sea Crew</span>
//                 </div>
//                 {expandedSection === "air-sea" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Maritime Crew Visa (988)")
//                       }
//                     >
//                       Maritime Crew Visa (988)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* APEC */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "apec" ? "2px solid #e86d1a" : "none",
//                     borderRadius: expandedSection === "apec" ? "4px" : "0",
//                     paddingLeft: expandedSection === "apec" ? "8px" : "0",
//                     paddingRight: expandedSection === "apec" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("APEC");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("apec");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>APEC</span>
//                 </div>
//                 {expandedSection === "apec" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("APEC Business Travel Card")
//                       }
//                     >
//                       APEC Business Travel Card
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Citizenship */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "citizenship"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius:
//                       expandedSection === "citizenship" ? "4px" : "0",
//                     paddingLeft:
//                       expandedSection === "citizenship" ? "8px" : "0",
//                     paddingRight:
//                       expandedSection === "citizenship" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Citizenship");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("citizenship");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Citizenship</span>
//                 </div>
//                 {expandedSection === "citizenship" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Australian citizenship by conferral")
//                       }
//                     >
//                       Australian citizenship by conferral
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Australian citizenship by descent")
//                       }
//                     >
//                       Australian citizenship by descent
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Evidence of Australian citizenship")
//                       }
//                     >
//                       Evidence of Australian citizenship
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Family */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "family"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius: expandedSection === "family" ? "4px" : "0",
//                     paddingLeft: expandedSection === "family" ? "8px" : "0",
//                     paddingRight: expandedSection === "family" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Family");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("family");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Family</span>
//                 </div>
//                 {expandedSection === "family" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Sponsorship for a Family Member (870)"
//                         )
//                       }
//                     >
//                       Sponsorship for a Family Member (870)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Sponsorship for a Partner to Migrate to Australia (300,309/100,820/801)"
//                         )
//                       }
//                     >
//                       Sponsorship for a Partner to Migrate to Australia
//                       (300,309/100,820/801)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Stage 1 - Partner or Prospective Marriage Visa (300,309/100,820/801)"
//                         )
//                       }
//                     >
//                       Stage 1 - Partner or Prospective Marriage Visa
//                       (300,309/100,820/801)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Stage 2 - Permanent Partner Visa Assessment (100,801)"
//                         )
//                       }
//                     >
//                       Stage 2 - Permanent Partner Visa Assessment (100,801)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Sponsored Parent (Temporary) Visa (870)"
//                         )
//                       }
//                     >
//                       Sponsored Parent (Temporary) Visa (870)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Health */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "health"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius: expandedSection === "health" ? "4px" : "0",
//                     paddingLeft: expandedSection === "health" ? "8px" : "0",
//                     paddingRight: expandedSection === "health" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Health");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("health");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Health</span>
//                 </div>
//                 {expandedSection === "health" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() => handleFieldClick("My Health Declarations")}
//                     >
//                       My Health Declarations
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Labour Agreement */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "labour"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius: expandedSection === "labour" ? "4px" : "0",
//                     paddingLeft: expandedSection === "labour" ? "8px" : "0",
//                     paddingRight: expandedSection === "labour" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Labour Agreement");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("labour");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Labour Agreement</span>
//                 </div>
//                 {expandedSection === "labour" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Request for a Labour Agreement (482, 186)"
//                         )
//                       }
//                     >
//                       Request for a Labour Agreement (482, 186)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Family violence notification */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "family-violence"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius:
//                       expandedSection === "family-violence" ? "4px" : "0",
//                     paddingLeft:
//                       expandedSection === "family-violence" ? "8px" : "0",
//                     paddingRight:
//                       expandedSection === "family-violence" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Family violence notification");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("family-violence");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>
//                     Family violence notification
//                   </span>
//                 </div>
//                 {expandedSection === "family-violence" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Notification of Family Violence - Secondary Applicant"
//                         )
//                       }
//                     >
//                       Notification of Family Violence - Secondary Applicant
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Continue with the same pattern for all remaining sections... */}
//               {/* I'll include just a few more examples to show the pattern, but you should apply this to ALL sections */}

//               {/* Refugee & Humanitarian */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "refugee"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius: expandedSection === "refugee" ? "4px" : "0",
//                     paddingLeft: expandedSection === "refugee" ? "8px" : "0",
//                     paddingRight: expandedSection === "refugee" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Refugee & Humanitarian");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("refugee");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>
//                     Refugee & Humanitarian
//                   </span>
//                 </div>
//                 {expandedSection === "refugee" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Global Special Humanitarian Proposal (202)"
//                         )
//                       }
//                     >
//                       Global Special Humanitarian Proposal (202)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Global Special Humanitarian Visa (202)"
//                         )
//                       }
//                     >
//                       Global Special Humanitarian Visa (202)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Resident Return */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "resident-return"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius:
//                       expandedSection === "resident-return" ? "4px" : "0",
//                     paddingLeft:
//                       expandedSection === "resident-return" ? "8px" : "0",
//                     paddingRight:
//                       expandedSection === "resident-return" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Resident Return");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("resident-return");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Resident Return</span>
//                 </div>
//                 {expandedSection === "resident-return" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Resident Return Visa (155,157)")
//                       }
//                     >
//                       Resident Return Visa (155,157)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Skilled */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "skilled"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius: expandedSection === "skilled" ? "4px" : "0",
//                     paddingLeft: expandedSection === "skilled" ? "8px" : "0",
//                     paddingRight: expandedSection === "skilled" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Skilled");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("skilled");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Skilled</span>
//                 </div>
//                 {expandedSection === "skilled" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Nomination for a Skilled Employer Sponsored Regional (Provisional) Visa (494)"
//                         )
//                       }
//                     >
//                       Nomination for a Skilled Employer Sponsored Regional
//                       (Provisional) Visa (494)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Skilled Employer Sponsored Regional (Provisional) Visa (494)"
//                         )
//                       }
//                     >
//                       Skilled Employer Sponsored Regional (Provisional) Visa
//                       (494)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Skilled Regional (Provisional) (Subsequent Entrant) Visa (491, 494)"
//                         )
//                       }
//                     >
//                       Skilled Regional (Provisional) (Subsequent Entrant) Visa
//                       (491, 494)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Permanent Residence (Skilled Regional) Visa (191)"
//                         )
//                       }
//                     >
//                       Permanent Residence (Skilled Regional) Visa (191)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Employer Nomination for a Permanent Position (186,187)"
//                         )
//                       }
//                     >
//                       Employer Nomination for a Permanent Position (186,187)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Permanent Employer Sponsored or Nominated Visa (186,187)"
//                         )
//                       }
//                     >
//                       Permanent Employer Sponsored or Nominated Visa (186,187)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("National Innovation visa (858)")
//                       }
//                     >
//                       National Innovation visa (858)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Hong Kong and New Zealand Stream - Skilled Independent Visa (189)"
//                         )
//                       }
//                     >
//                       Hong Kong and New Zealand Stream - Skilled Independent
//                       Visa (189)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Skilled Regional Visa (887)")
//                       }
//                     >
//                       Skilled Regional Visa (887)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Business Innovation and Investment Visa (Permanent) (888)"
//                         )
//                       }
//                     >
//                       Business Innovation and Investment Visa (Permanent) (888)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Business Innovation and Investment Visa (Renewal) (188)"
//                         )
//                       }
//                     >
//                       Business Innovation and Investment Visa (Renewal) (188)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Business Innovation and Investment Visa (Subsequent Entrant) (188)"
//                         )
//                       }
//                     >
//                       Business Innovation and Investment Visa (Subsequent
//                       Entrant) (188)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Provisional Skilled Regional Visa (Renewal) (489)"
//                         )
//                       }
//                     >
//                       Provisional Skilled Regional Visa (Renewal) (489)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Provisional Skilled Regional Visa (Subsequent Entrant) (489)"
//                         )
//                       }
//                     >
//                       Provisional Skilled Regional Visa (Subsequent Entrant)
//                       (489)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Standard Business Sponsorship */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "business-sponsorship"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius:
//                       expandedSection === "business-sponsorship" ? "4px" : "0",
//                     paddingLeft:
//                       expandedSection === "business-sponsorship" ? "8px" : "0",
//                     paddingRight:
//                       expandedSection === "business-sponsorship" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Standard Business Sponsorship");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("business-sponsorship");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>
//                     Standard Business Sponsorship
//                   </span>
//                 </div>
//                 {expandedSection === "business-sponsorship" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Standard Business Sponsorship (482, 494)"
//                         )
//                       }
//                     >
//                       Standard Business Sponsorship (482, 494)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Standard Business Sponsorship Renewal (482, 494)"
//                         )
//                       }
//                     >
//                       Standard Business Sponsorship Renewal (482, 494)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Status Resolution */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "status-resolution"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius:
//                       expandedSection === "status-resolution" ? "4px" : "0",
//                     paddingLeft:
//                       expandedSection === "status-resolution" ? "8px" : "0",
//                     paddingRight:
//                       expandedSection === "status-resolution" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Status Resolution");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("status-resolution");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Status Resolution</span>
//                 </div>
//                 {expandedSection === "status-resolution" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() => handleFieldClick("Bridging visa E (050)")}
//                     >
//                       Bridging visa E (050)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Student */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "student"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius: expandedSection === "student" ? "4px" : "0",
//                     paddingLeft: expandedSection === "student" ? "8px" : "0",
//                     paddingRight: expandedSection === "student" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Student");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("student");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Student</span>
//                 </div>
//                 {expandedSection === "student" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Student Guardian Visa (590)")
//                       }
//                     >
//                       Student Guardian Visa (590)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() => handleFieldClick("Student Visa (500)")}
//                     >
//                       Student Visa (500)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Student Visa (Subsequent Entrant) (500)"
//                         )
//                       }
//                     >
//                       Student Visa (Subsequent Entrant) (500)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Temporary Work (Activity) */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "temporary-work"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius:
//                       expandedSection === "temporary-work" ? "4px" : "0",
//                     paddingLeft:
//                       expandedSection === "temporary-work" ? "8px" : "0",
//                     paddingRight:
//                       expandedSection === "temporary-work" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Temporary Work (Activity)");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("temporary-work");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>
//                     Temporary Work (Activity)
//                   </span>
//                 </div>
//                 {expandedSection === "temporary-work" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Sponsorship for Temporary Activities (403, 407, 408)"
//                         )
//                       }
//                     >
//                       Sponsorship for Temporary Activities (403, 407, 408)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Temporary Activity Visa (408)")
//                       }
//                     >
//                       Temporary Activity Visa (408)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Temporary Work - International Relations Visa (403)"
//                         )
//                       }
//                     >
//                       Temporary Work - International Relations Visa (403)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Temporary Work - Short Stay Specialist Visa (400)"
//                         )
//                       }
//                     >
//                       Temporary Work - Short Stay Specialist Visa (400)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Temporary Work and Activity Visas (Subsequent Entrant) (403, 407, 408)"
//                         )
//                       }
//                     >
//                       Temporary Work and Activity Visas (Subsequent Entrant)
//                       (403, 407, 408)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Training Nomination (407)")
//                       }
//                     >
//                       Training Nomination (407)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() => handleFieldClick("Training Visa (407)")}
//                     >
//                       Training Visa (407)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Temporary Graduate Visa (485)")
//                       }
//                     >
//                       Temporary Graduate Visa (485)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Temporary Graduate (Subsequent Entrant) Visa (485)"
//                         )
//                       }
//                     >
//                       Temporary Graduate (Subsequent Entrant) Visa (485)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Visa pre-application registration */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "visa-registration"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius:
//                       expandedSection === "visa-registration" ? "4px" : "0",
//                     paddingLeft:
//                       expandedSection === "visa-registration" ? "8px" : "0",
//                     paddingRight:
//                       expandedSection === "visa-registration" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Visa pre-application registration");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("visa-registration");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>
//                     Visa pre-application registration
//                   </span>
//                 </div>
//                 {expandedSection === "visa-registration" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Registration - Pacific Engagement Visa (192)"
//                         )
//                       }
//                     >
//                       Registration - Pacific Engagement Visa (192)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Registration - Pacific Engagement Visa (192) - Tuvalu Treaty Stream"
//                         )
//                       }
//                     >
//                       Registration - Pacific Engagement Visa (192) - Tuvalu
//                       Treaty Stream
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Registration - Mobility Arrangement for Talented Early-professionals Scheme (MATES) (403)"
//                         )
//                       }
//                     >
//                       Registration - Mobility Arrangement for Talented
//                       Early-professionals Scheme (MATES) (403)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick(
//                           "Registration - Work and Holiday Visa (462)"
//                         )
//                       }
//                     >
//                       Registration - Work and Holiday Visa (462)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Visitor */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "visitor"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius: expandedSection === "visitor" ? "4px" : "0",
//                     paddingLeft: expandedSection === "visitor" ? "8px" : "0",
//                     paddingRight: expandedSection === "visitor" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Visitor");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("visitor");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>Visitor</span>
//                 </div>
//                 {expandedSection === "visitor" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() => handleFieldClick("eVisitor (651)")}
//                     >
//                       eVisitor (651)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() => handleFieldClick("Visitor Visa (600)")}
//                     >
//                       Visitor Visa (600)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() => handleFieldClick("Transit Visa (771)")}
//                     >
//                       Transit Visa (771)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Medical Treatment Visa (602)")
//                       }
//                     >
//                       Medical Treatment Visa (602)
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Working Holiday Maker */}
//               <div>
//                 <div
//                   style={{
//                     padding: "4px 0",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     fontSize: "12px",
//                     color: "#333",
//                     backgroundColor: "transparent",
//                     border:
//                       expandedSection === "working-holiday"
//                         ? "2px solid #e86d1a"
//                         : "none",
//                     borderRadius:
//                       expandedSection === "working-holiday" ? "4px" : "0",
//                     paddingLeft:
//                       expandedSection === "working-holiday" ? "8px" : "0",
//                     paddingRight:
//                       expandedSection === "working-holiday" ? "8px" : "0",
//                     gap: "8px",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleMainFieldClick("Working Holiday Maker");
//                   }}
//                 >
//                   <span
//                     style={{
//                       backgroundColor: "#072243",
//                       color: "white",
//                       borderRadius: "50%",
//                       width: "18px",
//                       height: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "10px",
//                       fontWeight: "bold",
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleSection("working-holiday");
//                     }}
//                   >
//                     &gt;
//                   </span>
//                   <span style={{ fontWeight: "bold" }}>
//                     Working Holiday Maker
//                   </span>
//                 </div>
//                 {expandedSection === "working-holiday" && (
//                   <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Work and Holiday Visa (462)")
//                       }
//                     >
//                       Work and Holiday Visa (462)
//                     </div>
//                     <div
//                       style={{
//                         padding: "2px 0",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         color: "#333",
//                         backgroundColor: "transparent",
//                       }}
//                       onClick={() =>
//                         handleFieldClick("Working Holiday Visa (417)")
//                       }
//                     >
//                       Working Holiday Visa (417)
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Cancel Button */}
//             <div
//               style={{
//                 marginTop: window.innerWidth <= 768 ? "15px" : "18px",
//                 marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 backgroundColor: "#E5E5E5",
//                 height: "fit-content",
//                 minHeight:
//                   window.innerWidth <= 480
//                     ? "28px"
//                     : window.innerWidth <= 768
//                     ? "28px"
//                     : window.innerWidth > 1200
//                     ? "30px"
//                     : "28px",
//                 border: "1px solid #ccc",
//                 padding: window.innerWidth <= 480 ? "3px 5px" : "3px",
//               }}
//             >
//               <button
//                 type="button"
//                 onClick={() => navigate("/gov.au/lusc/dashboard")}
//                 style={{
//                   padding:
//                     window.innerWidth <= 480
//                       ? "3px 8px"
//                       : window.innerWidth <= 768
//                       ? "3px 10px"
//                       : window.innerWidth > 1200
//                       ? "4px 12px"
//                       : "3px 9px",
//                   fontSize: "12px",
//                   color: "black",
//                   backgroundColor: "#f5f5f5",
//                   border: "1px solid black",
//                   borderRadius: "3px",
//                   cursor: "pointer",
//                   height: "fit-content",
//                   minHeight:
//                     window.innerWidth <= 480
//                       ? "20px"
//                       : window.innerWidth <= 768
//                       ? "20px"
//                       : window.innerWidth > 1200
//                       ? "22px"
//                       : "20px",
//                   marginLeft: window.innerWidth <= 480 ? "5px" : "10px",
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewApplication;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewApplication = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Function to handle main category field clicks (API call only, no navigation)
  const handleFieldClick = async (fieldName) => {
    console.log("Selected field:", fieldName);

    try {
      const response = await fetch(
        "https://immu-backend.up.railway.app/userInfo/SvisaType",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            fieldName: fieldName,
            user_id: localStorage.getItem("userId"),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
      } else {
        console.error("API Error:", response.statusText);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }

    // NO navigation here - just API call
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        maxWidth: "99vw",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header Navigation */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #dee2e6",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "12px",
        }}
      >
        <span
          style={{
            color: "#0066cc",
            cursor: "pointer",
            borderRight: "1px solid #dee2e6",
            paddingRight: "20px",
          }}
        >
          My applications
        </span>
        <span
          style={{
            color: "#333",
            cursor: "pointer",
            borderRight: "1px solid #dee2e6",
            paddingRight: "20px",
          }}
        >
          My payments ▼
        </span>
        <span
          style={{
            color: "#333",
            cursor: "pointer",
            borderRight: "1px solid #dee2e6",
            paddingRight: "20px",
          }}
        >
          Manage groups
        </span>
        <span
          style={{
            color: "#333",
            cursor: "pointer",
            borderRight: "1px solid #dee2e6",
            paddingRight: "20px",
          }}
        >
          Related links ▼
        </span>
        <span style={{ color: "#333", cursor: "pointer" }}>
          Help and support ▼
        </span>
      </div>

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
              background: "#072243",
              height: "fit-content",
              minHeight: window.innerWidth <= 768 ? "25px" : "20px",
              display: "flex",
              alignItems: "center",
              padding: window.innerWidth <= 768 ? "5px 10px" : "5px 15px",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "14px" }}>📄</span>
            <span>New application</span>
          </header>

          {/* Content Section */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding:
                window.innerWidth <= 480
                  ? "12px"
                  : window.innerWidth <= 768
                  ? "15px"
                  : "18px",
              height: "fit-content",
            }}
          >
            {/* Application Types List */}
            <div
              style={{
                marginBottom: window.innerWidth <= 768 ? "15px" : "18px",
              }}
            >
              {/* 482 - Skills in Demand */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "482" ? "2px solid #e86d1a" : "none",
                    borderRadius: expandedSection === "482" ? "4px" : "0",
                    paddingLeft: expandedSection === "482" ? "8px" : "0",
                    paddingRight: expandedSection === "482" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("482 - Skills in Demand");
                    toggleSection("482");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    482 - Skills in Demand
                  </span>
                </div>
                {expandedSection === "482" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Nomination for a Skills in Demand Visa (482)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Skills in Demand Visa (482)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Skills in Demand Visa - Subsequent Entrant (482)
                    </div>
                  </div>
                )}
              </div>

              {/* Air & Sea Crew */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "air-sea"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius: expandedSection === "air-sea" ? "4px" : "0",
                    paddingLeft: expandedSection === "air-sea" ? "8px" : "0",
                    paddingRight: expandedSection === "air-sea" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Air & Sea Crew");
                    toggleSection("air-sea");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Air & Sea Crew</span>
                </div>
                {expandedSection === "air-sea" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Maritime Crew Visa (988)
                    </div>
                  </div>
                )}
              </div>

              {/* APEC */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "apec" ? "2px solid #e86d1a" : "none",
                    borderRadius: expandedSection === "apec" ? "4px" : "0",
                    paddingLeft: expandedSection === "apec" ? "8px" : "0",
                    paddingRight: expandedSection === "apec" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("APEC");
                    toggleSection("apec");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>APEC</span>
                </div>
                {expandedSection === "apec" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      APEC Business Travel Card
                    </div>
                  </div>
                )}
              </div>

              {/* Citizenship */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "citizenship"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius:
                      expandedSection === "citizenship" ? "4px" : "0",
                    paddingLeft:
                      expandedSection === "citizenship" ? "8px" : "0",
                    paddingRight:
                      expandedSection === "citizenship" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Citizenship");
                    toggleSection("citizenship");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Citizenship</span>
                </div>
                {expandedSection === "citizenship" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Australian citizenship by conferral
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Australian citizenship by descent
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Evidence of Australian citizenship
                    </div>
                  </div>
                )}
              </div>

              {/* Family */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "family"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius: expandedSection === "family" ? "4px" : "0",
                    paddingLeft: expandedSection === "family" ? "8px" : "0",
                    paddingRight: expandedSection === "family" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Family");
                    toggleSection("family");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Family</span>
                </div>
                {expandedSection === "family" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Sponsorship for a Family Member (870)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Sponsorship for a Partner to Migrate to Australia
                      (300,309/100,820/801)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Stage 1 - Partner or Prospective Marriage Visa
                      (300,309/100,820/801)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Stage 2 - Permanent Partner Visa Assessment (100,801)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Sponsored Parent (Temporary) Visa (870)
                    </div>
                  </div>
                )}
              </div>

              {/* Health */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "health"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius: expandedSection === "health" ? "4px" : "0",
                    paddingLeft: expandedSection === "health" ? "8px" : "0",
                    paddingRight: expandedSection === "health" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Health");
                    toggleSection("health");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Health</span>
                </div>
                {expandedSection === "health" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      My Health Declarations
                    </div>
                  </div>
                )}
              </div>

              {/* Labour Agreement */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "labour"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius: expandedSection === "labour" ? "4px" : "0",
                    paddingLeft: expandedSection === "labour" ? "8px" : "0",
                    paddingRight: expandedSection === "labour" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Labour Agreement");
                    toggleSection("labour");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Labour Agreement</span>
                </div>
                {expandedSection === "labour" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Request for a Labour Agreement (482, 186)
                    </div>
                  </div>
                )}
              </div>

              {/* Family violence notification */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "family-violence"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius:
                      expandedSection === "family-violence" ? "4px" : "0",
                    paddingLeft:
                      expandedSection === "family-violence" ? "8px" : "0",
                    paddingRight:
                      expandedSection === "family-violence" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Family violence notification");
                    toggleSection("family-violence");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    Family violence notification
                  </span>
                </div>
                {expandedSection === "family-violence" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Notification of Family Violence - Secondary Applicant
                    </div>
                  </div>
                )}
              </div>

              {/* Refugee & Humanitarian */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "refugee"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius: expandedSection === "refugee" ? "4px" : "0",
                    paddingLeft: expandedSection === "refugee" ? "8px" : "0",
                    paddingRight: expandedSection === "refugee" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Refugee & Humanitarian");
                    toggleSection("refugee");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    Refugee & Humanitarian
                  </span>
                </div>
                {expandedSection === "refugee" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Global Special Humanitarian Proposal (202)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Global Special Humanitarian Visa (202)
                    </div>
                  </div>
                )}
              </div>

              {/* Resident Return */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "resident-return"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius:
                      expandedSection === "resident-return" ? "4px" : "0",
                    paddingLeft:
                      expandedSection === "resident-return" ? "8px" : "0",
                    paddingRight:
                      expandedSection === "resident-return" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Resident Return");
                    toggleSection("resident-return");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Resident Return</span>
                </div>
                {expandedSection === "resident-return" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Resident Return Visa (155,157)
                    </div>
                  </div>
                )}
              </div>

              {/* Skilled */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "skilled"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius: expandedSection === "skilled" ? "4px" : "0",
                    paddingLeft: expandedSection === "skilled" ? "8px" : "0",
                    paddingRight: expandedSection === "skilled" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Skilled");
                    toggleSection("skilled");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Skilled</span>
                </div>
                {expandedSection === "skilled" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Nomination for a Skilled Employer Sponsored Regional
                      (Provisional) Visa (494)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Skilled Employer Sponsored Regional (Provisional) Visa
                      (494)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Skilled Regional (Provisional) (Subsequent Entrant) Visa
                      (491, 494)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Permanent Residence (Skilled Regional) Visa (191)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Employer Nomination for a Permanent Position (186,187)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Permanent Employer Sponsored or Nominated Visa (186,187)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      National Innovation visa (858)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Hong Kong and New Zealand Stream - Skilled Independent
                      Visa (189)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Skilled Regional Visa (887)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Business Innovation and Investment Visa (Permanent) (888)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Business Innovation and Investment Visa (Renewal) (188)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Business Innovation and Investment Visa (Subsequent
                      Entrant) (188)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Provisional Skilled Regional Visa (Renewal) (489)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Provisional Skilled Regional Visa (Subsequent Entrant)
                      (489)
                    </div>
                  </div>
                )}
              </div>

              {/* Standard Business Sponsorship */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "business-sponsorship"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius:
                      expandedSection === "business-sponsorship" ? "4px" : "0",
                    paddingLeft:
                      expandedSection === "business-sponsorship" ? "8px" : "0",
                    paddingRight:
                      expandedSection === "business-sponsorship" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Standard Business Sponsorship");
                    toggleSection("business-sponsorship");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    Standard Business Sponsorship
                  </span>
                </div>
                {expandedSection === "business-sponsorship" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Standard Business Sponsorship (482, 494)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Standard Business Sponsorship Renewal (482, 494)
                    </div>
                  </div>
                )}
              </div>

              {/* Status Resolution */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "status-resolution"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius:
                      expandedSection === "status-resolution" ? "4px" : "0",
                    paddingLeft:
                      expandedSection === "status-resolution" ? "8px" : "0",
                    paddingRight:
                      expandedSection === "status-resolution" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Status Resolution");
                    toggleSection("status-resolution");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Status Resolution</span>
                </div>
                {expandedSection === "status-resolution" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Bridging visa E (050)
                    </div>
                  </div>
                )}
              </div>

              {/* Student */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "student"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius: expandedSection === "student" ? "4px" : "0",
                    paddingLeft: expandedSection === "student" ? "8px" : "0",
                    paddingRight: expandedSection === "student" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Student");
                    toggleSection("student");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Student</span>
                </div>
                {expandedSection === "student" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Student Guardian Visa (590)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Student Visa (500)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Student Visa (Subsequent Entrant) (500)
                    </div>
                  </div>
                )}
              </div>

              {/* Temporary Work (Activity) */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "temporary-work"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius:
                      expandedSection === "temporary-work" ? "4px" : "0",
                    paddingLeft:
                      expandedSection === "temporary-work" ? "8px" : "0",
                    paddingRight:
                      expandedSection === "temporary-work" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Temporary Work (Activity)");
                    toggleSection("temporary-work");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    Temporary Work (Activity)
                  </span>
                </div>
                {expandedSection === "temporary-work" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Sponsorship for Temporary Activities (403, 407, 408)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Temporary Activity Visa (408)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Temporary Work - International Relations Visa (403)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Temporary Work - Short Stay Specialist Visa (400)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Temporary Work and Activity Visas (Subsequent Entrant)
                      (403, 407, 408)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Training Nomination (407)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Training Visa (407)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Temporary Graduate Visa (485)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Temporary Graduate (Subsequent Entrant) Visa (485)
                    </div>
                  </div>
                )}
              </div>

              {/* Visa pre-application registration */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "visa-registration"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius:
                      expandedSection === "visa-registration" ? "4px" : "0",
                    paddingLeft:
                      expandedSection === "visa-registration" ? "8px" : "0",
                    paddingRight:
                      expandedSection === "visa-registration" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Visa pre-application registration");
                    toggleSection("visa-registration");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    Visa pre-application registration
                  </span>
                </div>
                {expandedSection === "visa-registration" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Registration - Pacific Engagement Visa (192)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Registration - Pacific Engagement Visa (192) - Tuvalu
                      Treaty Stream
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Registration - Mobility Arrangement for Talented
                      Early-professionals Scheme (MATES) (403)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Registration - Work and Holiday Visa (462)
                    </div>
                  </div>
                )}
              </div>

              {/* Visitor */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "visitor"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius: expandedSection === "visitor" ? "4px" : "0",
                    paddingLeft: expandedSection === "visitor" ? "8px" : "0",
                    paddingRight: expandedSection === "visitor" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Visitor");
                    toggleSection("visitor");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>Visitor</span>
                </div>
                {expandedSection === "visitor" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      eVisitor (651)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Visitor Visa (600)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Transit Visa (771)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Medical Treatment Visa (602)
                    </div>
                  </div>
                )}
              </div>

              {/* Working Holiday Maker */}
              <div>
                <div
                  style={{
                    padding: "4px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#333",
                    backgroundColor: "transparent",
                    border:
                      expandedSection === "working-holiday"
                        ? "2px solid #e86d1a"
                        : "none",
                    borderRadius:
                      expandedSection === "working-holiday" ? "4px" : "0",
                    paddingLeft:
                      expandedSection === "working-holiday" ? "8px" : "0",
                    paddingRight:
                      expandedSection === "working-holiday" ? "8px" : "0",
                    gap: "8px",
                  }}
                  onClick={() => {
                    handleFieldClick("Working Holiday Maker");
                    toggleSection("working-holiday");
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#072243",
                      color: "white",
                      borderRadius: "50%",
                      width: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    &gt;
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    Working Holiday Maker
                  </span>
                </div>
                {expandedSection === "working-holiday" && (
                  <div style={{ paddingLeft: "26px", marginBottom: "4px" }}>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Work and Holiday Visa (462)
                    </div>
                    <div
                      style={{
                        padding: "2px 0",
                        cursor: "pointer",
                        fontSize: "12px",
                        color: "#333",
                        backgroundColor: "transparent",
                      }}
                      onClick={() => navigate("/gov.au/lusc/verify-user")}
                    >
                      Working Holiday Visa (417)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cancel Button */}
            <div
              style={{
                marginTop: window.innerWidth <= 768 ? "15px" : "18px",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#E5E5E5",
                height: "fit-content",
                minHeight:
                  window.innerWidth <= 480
                    ? "28px"
                    : window.innerWidth <= 768
                    ? "28px"
                    : window.innerWidth > 1200
                    ? "30px"
                    : "28px",
                border: "1px solid #ccc",
                padding: window.innerWidth <= 480 ? "3px 5px" : "3px",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/gov.au/lusc/dashboard")}
                style={{
                  padding:
                    window.innerWidth <= 480
                      ? "3px 8px"
                      : window.innerWidth <= 768
                      ? "3px 10px"
                      : window.innerWidth > 1200
                      ? "4px 12px"
                      : "3px 9px",
                  fontSize: "12px",
                  color: "black",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid black",
                  borderRadius: "3px",
                  cursor: "pointer",
                  height: "fit-content",
                  minHeight:
                    window.innerWidth <= 480
                      ? "20px"
                      : window.innerWidth <= 768
                      ? "20px"
                      : window.innerWidth > 1200
                      ? "22px"
                      : "20px",
                  marginLeft: window.innerWidth <= 480 ? "5px" : "10px",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewApplication;
