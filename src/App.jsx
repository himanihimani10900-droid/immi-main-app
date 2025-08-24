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

import immiFavicon from "../public/Group 44 (1).png";
import vevoFavicon from "../public/blueFavicon.png";

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
