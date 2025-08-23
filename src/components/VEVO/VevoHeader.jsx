/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import logo from "../../../public/logoheader.png";

const VevoHeader = () => {
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

  // Enhanced responsive helper functions
  const isMobile = screenSize.width <= 480;
  const isSmallMobile = screenSize.width <= 360;
  const isTablet = screenSize.width > 480 && screenSize.width <= 768;
  const isLaptop = screenSize.width > 768 && screenSize.width <= 1024;
  const isDesktop = screenSize.width > 1024;
  const isLargeDesktop = screenSize.width > 1400;

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

  const getVevoFontSize = () => {
    if (isSmallMobile) return "16px";
    if (isMobile) return "18px";
    if (isTablet) return "24px";
    if (isLargeDesktop) return "32px";
    return "30px";
  };

  const getHelpLinkFontSize = () => {
    if (isSmallMobile) return "10px";
    if (isMobile) return "11px";
    if (isTablet) return "12px";
    return "14px";
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
        flexWrap: "nowrap",
        minHeight: getHeaderHeight(),
        position: "relative",
      }}
    >
      {/* Left side - Australian Government Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          justifyContent: "flex-start",
          width: "auto",
          overflow: "hidden",
        }}
      >
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
      </div>

      {/* Right side - VEVO title and Help link */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "5px",
          justifyContent: "center",
          flexWrap: "nowrap",
          minWidth: "0",
          overflow: "hidden",
          flexShrink: 1,
        }}
      >
        {/* Help link */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            order: 1,
          }}
        >
          <span
            style={{
              fontSize: getHelpLinkFontSize(),
              color: "white",
            }}
          >
            🏠
          </span>
          <a
            href="#"
            style={{
              color: "white",
              textDecoration: "underline",
              fontSize: getHelpLinkFontSize(),
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Help [on]
          </a>
        </div>

        {/* VEVO title */}
        <div
          style={{
            fontSize: getVevoFontSize(),
            fontWeight: "400",
            color: "white",
            fontFamily: "Arial, sans-serif",
            letterSpacing: isSmallMobile ? "0.3px" : "0.5px",
            flexShrink: 0,
            textAlign: "right",
            whiteSpace: "nowrap",
            order: 2,
          }}
        >
          VEVO for Visa Holders
        </div>
      </div>
    </header>
  );
};

export default VevoHeader;
