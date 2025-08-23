import React from "react";
import { useNavigate } from "react-router-dom";

const SignupSuccessful = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        backgroundColor: "#f0f0f0",
        minHeight: "content-fit",
        maxWidth: "99vw",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Container */}
      <div
        style={{
          padding: window.innerWidth <= 768 ? "10px" : "20px",
          backgroundColor: "#CCCCCC",
          flex: "1",
        }}
      >
        {/* Single Container with all content */}
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
          {/* Login Successful Header */}
          <header
            style={{
              background: "#1B3564",
              height: "fit-content",
              minHeight: window.innerWidth <= 768 ? "25px" : "20px",
              display: "flex",
              alignItems: "center",
              padding: window.innerWidth <= 768 ? "5px 10px" : "5px 15px",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Login successful
          </header>

          {/* All Content in one container */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: window.innerWidth <= 480 ? "12px" : window.innerWidth <= 768 ? "15px" : "18px",
              height: "fit-content",
            }}
          >
            {/* Information Section with proper border structure */}
            <div
              style={{
                border: "1px solid #bce8f1",
                borderRadius: "4px",
                marginBottom: window.innerWidth <= 768 ? "15px" : "18px",
              }}
            >
              {/* Information Header - Blue background */}
              <div
                style={{
                  background: "#72cef5",
                  borderBottom: "1px solid #bce8f1",
                  padding: window.innerWidth <= 768 ? "5px 10px" : "5px 15px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "black",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                <span>ℹ</span>
                <span>Information</span>
              </div>
              
              {/* Information Content - White background with border */}
              <div
                style={{
                  padding: window.innerWidth <= 768 ? "10px" : "15px",
                  backgroundColor: "#ffffff",
                }}
              >
                <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#333", lineHeight: "1.3" }}>
                  Your ImmiAccount has been created.
                </p>
                {/* <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#333", lineHeight: "1.3" }}>
                  Your username is akshusharmagi@gmail.com.
                </p> */}
                <p style={{ margin: "0", fontSize: "12px", color: "#333", lineHeight: "1.3" }}>
                  You are enabled for app authentication. Each time you log in, you will need to enter the code from your authenticator app. If you are no longer able to use an authenticator app, you can reset your multi-factor authentication on the login page.
                </p>
                 {/* Main Heading */}
            <h1
              style={{
                fontSize: "16px",
                marginTop: "10px",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                fontWeight: "normal",
                color: "#1B3564",
                textAlign: window.innerWidth <= 480 ? "center" : "left",
              }}
            >
              Updating Work and Holiday Visa (462) registration details in ImmiAccount
            </h1>

            <p
              style={{
                marginTop: "0",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
                textAlign: window.innerWidth <= 480 ? "center" : "left",
              }}
            >
              Work and Holiday Visa (462) applications can only be lodged in ImmiAccount in which it was originally created.
            </p>

            <p
              style={{
                marginTop: "0",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
                textAlign: window.innerWidth <= 480 ? "center" : "left",
              }}
            >
              If you select the 'Submit' button, you cannot change any details of your registration until you make a payment. Once the registration status is showing as 'Received', you can update some details as required.
            </p>

            <p
              style={{
                marginTop: "0",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
                textAlign: window.innerWidth <= 480 ? "center" : "left",
              }}
            >
              Make sure your country of passport and date of birth are correct before you submit your registration. You cannot change your country of passport and national ID or create a new registration after it has been submitted.
            </p>

            <p
              style={{
                marginTop: "0",
                marginBottom: window.innerWidth <= 768 ? "15px" : "18px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
                textAlign: window.innerWidth <= 480 ? "center" : "left",
              }}
            >
              For further information about monitoring your registration, see: <a 
                href="#" 
                style={{ color: "#337ab7", textDecoration: "underline" }}
                onClick={(e) => e.preventDefault()}
              >
                After you register
              </a>
            </p>
              </div>
            </div>

           

            {/* Next Button Container */}
            <div
              style={{
                marginTop: window.innerWidth <= 768 ? "15px" : "18px",
                marginBottom: window.innerWidth <= 768 ? "10px" : "12px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "#E5E5E5",
                height: "fit-content",
                minHeight: window.innerWidth <= 480 ? "28px" : window.innerWidth <= 768 ? "28px" : window.innerWidth > 1200 ? "30px" : "28px",
                border: "1px solid #ccc",
                padding: window.innerWidth <= 480 ? "3px 5px" : "3px",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/gov.au/lusc/dashboard")}
                style={{
                  padding: window.innerWidth <= 480 ? "3px 6px" : window.innerWidth <= 768 ? "3px 8px" : window.innerWidth > 1200 ? "4px 12px" : "3px 9px",
                  fontSize: "12px",
                  color: "black",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid black",
                  borderRadius: "3px",
                  cursor: "pointer",
                  height: "fit-content",
                  minHeight: window.innerWidth <= 480 ? "20px" : window.innerWidth <= 768 ? "20px" : window.innerWidth > 1200 ? "22px" : "20px",
                  marginRight: window.innerWidth <= 480 ? "5px" : "10px",
                  whiteSpace: "nowrap",
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccessful;
