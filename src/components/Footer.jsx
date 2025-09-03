import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #ccc",
          paddingTop: "15px",
          paddingLeft: "20px",
          paddingBottom: "15px",
          fontSize: "14px", // Decreased from 13px
          color: "#666",
          backgroundColor: "#f0f0f0",
          marginTop: "-0px",
          height:"content-fit"
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <a
            href="#"
            style={{
              color: "#1B3564",
              textDecoration: "underline",
              fontSize: "11px", // Decreased from 11px
            }}
          >
            Accessibility
          </a>
          <span>|</span>
          <a
            href="#"
            style={{
              color: "#1B3564",
              textDecoration: "underline",
              fontSize: "11px", // Decreased from 11px
            }}
          >
            Copyright & Disclaimer
          </a>
          <span>|</span>
          <a
            href="#"
            style={{
              color: "#1B3564",
              textDecoration: "underline",
              fontSize: "11px", // Decreased from 10px
            }}
          >
            Online Security
          </a>
          <span>|</span>
          <a
            href="#"
            style={{
              color: "#1B3564",
              fontSize: "11px", // Decreased from 11px
              textDecoration: "underline",
            }}
          >
            Privacy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
