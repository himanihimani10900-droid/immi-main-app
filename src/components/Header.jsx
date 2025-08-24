/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../public/logoheader.png";

const Header = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(null);
  
  // Get screen size for responsive design
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced responsive helper functions
  const isMobile = screenSize.width <= 480;
  const isSmallMobile = screenSize.width <= 360;
  const isTablet = screenSize.width > 480 && screenSize.width <= 768;
  const isLaptop = screenSize.width > 768 && screenSize.width <= 1024;
  const isDesktop = screenSize.width > 1024;
  const isLargeDesktop = screenSize.width > 1400;
  
  const handleLogout = () => {
    // Clear auth token and user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");

    // Redirect to login page
    window.location.href = "/gov.au/lusc/lgin";
  };

  useEffect(() => {
    const fetchUserDetails = () => {
      // Check if authToken exists
      const authToken = localStorage.getItem("authToken");
      
      if (authToken) {
        try {
          // Get userData from localStorage
          const userData = localStorage.getItem("userData");

          console.log("Raw userData from localStorage:", userData?.email);

          if (userData) {
            const parsedUserData = JSON.parse(userData);
            console.log("Parsed userData:", parsedUserData);
            console.log("User name:", parsedUserData.name);
            setUserDetails(parsedUserData);
          } else {
            console.log("No userData found in localStorage");
            // Check if data might be stored with a different key
            console.log("All localStorage keys:", Object.keys(localStorage));
          }
        } catch (error) {
          console.error("Error parsing userData from localStorage:", error);
        }
      } else {
        // Clear user details if no auth token
        setUserDetails(null);
        console.log("No auth token found");
      }
    };

    fetchUserDetails();
  }, [location.pathname]); // Re-run when route changes

  // Helper functions for responsive values
  const getHeaderHeight = () => {
    if (isSmallMobile) return "65px";
    if (isMobile) return "70px";
    if (isTablet) return "80px";
    return "95px";
  };

  const getHeaderPadding = () => {
    if (isSmallMobile) return "0 8px";
    if (isMobile) return "0 10px";
    if (isTablet) return "0 15px";
    return "0 20px";
  };

  const getLogoHeight = () => {
    if (isSmallMobile) return "40px";
    if (isMobile) return "45px";
    if (isTablet) return "60px";
    return "75px";
  };

  const getImmiAccountFontSize = () => {
    if (isSmallMobile) return "16px";
    if (isMobile) return "18px";
    if (isTablet) return "24px";
    if (isLargeDesktop) return "32px";
    return "30px";
  };

  const getUserDetailsFontSize = () => {
    if (isSmallMobile) return "9px";
    if (isMobile) return "10px";
    if (isTablet) return "12px";
    return "16px";
  };

  const getUserNameFontSize = () => {
    if (isSmallMobile) return "8px";
    if (isMobile) return "9px";
    if (isTablet) return "11px";
    return "16px";
  };

  const getLinkFontSize = () => {
    if (isSmallMobile) return "7px";
    if (isMobile) return "8px";
    if (isTablet) return "11px";
    return "14px";
  };

  const getGapSize = () => {
    if (isSmallMobile) return "3px";
    if (isMobile) return "5px";
    if (isTablet) return "10px";
    return "15px";
  };

  return (
    <header
      style={{
        background: "linear-gradient(to right, #1b3564 20%, #0b6e9d 100%)",
        height: getHeaderHeight(),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: getHeaderPadding(),
        color: "white",
        margin: "0",
        top: "0",
        left: "0",
        right: "0",
        width: "100%",
        boxSizing: "border-box",
        zIndex: "1000",
        flexWrap: "nowrap", // Changed from wrap to nowrap for mobile
        minHeight: getHeaderHeight(),
        position: "relative",
      }}
    >
      {/* Left side - Australian Government Logo - Always on left */}
      <div style={{ 
        display: "flex", 
        alignItems: "center",
        flexShrink: 0,
        justifyContent: "flex-start", // Always align to left
        width: "auto", // Remove 100% width on mobile
        overflow: "hidden",
      }}>
        <img
          src={logo}
          alt="Australian Government Department of Home Affairs"
          style={{
            height: getLogoHeight(),
            marginRight: isMobile ? "0" : "10px",
            maxWidth: "100%",
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontSize: isMobile ? "9px" : "11px",
            lineHeight: "1.2",
            color: "white",
            fontFamily: "poppins",
            display: isMobile ? "none" : "block",
          }}
        >
        </div>
      </div>

      {/* Right side - User info and ImmiAccount - Always on right */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", // Always column for consistency
        alignItems: "flex-end", // Always align to right
        gap: getGapSize(),
        justifyContent: "center",
        flexWrap: "nowrap",
        minWidth: "0",
        overflow: "hidden",
        flexShrink: 1,
      }}>
        {/* User details display - Show first */}
        {userDetails && userDetails.name && (
          <div
            style={{
              fontSize: getUserDetailsFontSize(),
              fontWeight: "400",
              color: "white",
              fontFamily: "Arial, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: getGapSize(),
              flexWrap: "nowrap",
              justifyContent: "flex-end",
              minWidth: "0",
              overflow: "hidden",
              order: 1, // Show first
            }}
          >
            <span style={{ 
              textAlign: "right",
              fontSize: getUserNameFontSize(),
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: isMobile ? "60px" : "none",
              flexShrink: 1,
            }}>
              {isMobile ? 
                (userDetails.name.split(' ')[0].toUpperCase()) : 
                userDetails.name.toUpperCase()
              }
            </span>
            
            {!isMobile && (
              <span style={{ 
                color: "#ccc",
                flexShrink: 0,
              }}>|</span>
            )}
            
            <a
              href="#"
              style={{
                color: "white",
                textDecoration: "underline",
                fontSize: getLinkFontSize(),
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {isMobile ? "Account" : "Manage Account"}
            </a>
            
            <span style={{ 
              color: "#ccc",
              display: isMobile ? "none" : "inline",
              flexShrink: 0,
            }}>|</span>
            
            <a
              href="#"
              onClick={handleLogout}
              style={{
                color: "white",
                textDecoration: "underline",
                fontSize: getLinkFontSize(),
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Logout
            </a>
          </div>
        )}

        {/* ImmiAccount title - Show second */}
        <div
          style={{
            fontSize: getImmiAccountFontSize(),
            fontWeight: "400",
            color: "white",
            fontFamily: "Arial, sans-serif",
            letterSpacing: isSmallMobile ? "0.3px" : "0.5px",
            flexShrink: 0,
            textAlign: "right",
            whiteSpace: "nowrap",
            order: 2, // Show second
          }}
        >
          ImmiAccount
        </div>
      </div>
    </header>
  );
};

export default Header;
