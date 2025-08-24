import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentComponent = () => {
  const [userTransactions, setUserTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Screen size state for mobile responsiveness only
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

  // Only check for mobile - keep laptop/desktop as original
  const isMobile = screenSize.width <= 768;

  // Get userId from localStorage (you can make this dynamic)
  const userId = localStorage.getItem('userId') || "user_3073a824";

  // Get authToken from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
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

  const fetchUserTransactions = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://immu-backend.up.railway.app/payment/user/${userId}`,
        {
          method: "GET",
          headers: createHeaders(),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        // Handle the specific API response structure
        setTransactionData(data);
        setUserTransactions(data.transactions || []);
      } else if (response.status === 401) {
        console.error("Unauthorized access. Please login again.");
        localStorage.removeItem('authToken');
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/gov.au/lusc/lgin"), 2000);
      } else {
        console.error("Error fetching transactions:", response.statusText);
        setError("Failed to fetch transactions. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load transactions on component mount
  useEffect(() => {
    fetchUserTransactions();
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format amount helper
  const formatAmount = (amount) => {
    return `₹${parseFloat(amount || 0).toFixed(2)}`;
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: isMobile ? "4px 8px" : "2px 8px",
      borderRadius: "0px",
      fontSize: isMobile ? "11px" : "10px",
      fontWeight: "bold",
      textTransform: "uppercase"
    };

    switch (status?.toLowerCase()) {
      case 'paid':
      case 'success':
      case 'completed':
        return { ...baseStyle, backgroundColor: "#d4edda", color: "#155724", border: "1px solid #c3e6cb" };
      case 'failed':
      case 'error':
        return { ...baseStyle, backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" };
      case 'pending':
        return { ...baseStyle, backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeaa7" };
      default:
        return { ...baseStyle, backgroundColor: "#e2e3e5", color: "#383d41", border: "1px solid #d6d8db" };
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "0 auto",
        backgroundColor: "#e5e5e5",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Content Area */}
      <div
        style={{
          padding: isMobile ? "8px" : "5px",
          backgroundColor: "#e5e5e5",
          flex: "1",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "15px" : "20px",
          maxWidth: isMobile ? "100%" : "1280px",
          margin: "0 auto",
          width: "100%"
        }}
      >
        {/* Main Container */}
        <div
          style={{
            width: isMobile ? "100%" : "980px",
            border: "1px solid #ccc",
            borderRadius: "0px",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <header
            style={{
              background: "#072243",
              height: isMobile ? "45px" : "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: isMobile ? "0 12px" : "0 16px",
              color: "white",
              fontSize: isMobile ? "14px" : "12px",
              fontWeight: "bold",
            }}
          >
            <span>Payment History</span>
            <span>Transactions</span>
          </header>

          {/* Content Section */}
          <div style={{ padding: isMobile ? "16px" : "20px", flex: "1" }}>
            
            {/* Error Message */}
            {error && (
              <div
                style={{
                  border: "1px solid #b10000",
                  margin: "0 0 20px 0",
                  borderRadius: isMobile ? "4px" : "0px"
                }}
              >
                <div
                  style={{
                    backgroundColor: "#b10000",
                    color: "#fff",
                    padding: isMobile ? "8px 12px" : "6px 10px",
                    fontWeight: "bold",
                    fontSize: isMobile ? "14px" : 12,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: isMobile ? "12px" : 10,
                      height: isMobile ? "12px" : 10,
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      marginRight: 8,
                      flexShrink: 0,
                    }}
                  />
                  Error
                </div>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: isMobile ? "15px" : 12,
                    color: "#333",
                    fontSize: isMobile ? "14px" : 12,
                  }}
                >
                  {error}
                </div>
              </div>
            )}

            {/* Page Title */}
            <h2 style={{ 
              fontSize: isMobile ? "18px" : "16px", 
              color: "#0066cc", 
              margin: "0 0 16px 0", 
              fontWeight: "normal" 
            }}>
              Payment History
            </h2>

            {/* Loading State */}
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: isMobile ? "30px" : "40px",
                  color: "#666",
                  fontSize: isMobile ? "16px" : "14px"
                }}
              >
                <div>Loading transactions...</div>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                {transactionData && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                      gap: isMobile ? "12px" : "16px",
                      marginBottom: "20px"
                    }}
                  >
                    {/* Total Paid Card */}
                    <div
                      style={{
                        border: "1px solid #28a745",
                        borderRadius: isMobile ? "8px" : "0px",
                        backgroundColor: "#f8fff9"
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#28a745",
                          color: "#fff",
                          padding: isMobile ? "10px 15px" : "6px 10px",
                          fontSize: isMobile ? "14px" : "12px",
                          fontWeight: "bold"
                        }}
                      >
                        Total Paid
                      </div>
                      <div
                        style={{
                          padding: isMobile ? "15px" : "12px",
                          fontSize: isMobile ? "20px" : "18px",
                          fontWeight: "bold",
                          color: "#28a745"
                        }}
                      >
                        {formatAmount(transactionData.total_paid)}
                      </div>
                    </div>

                    {/* Transaction Count Card */}
                    <div
                      style={{
                        border: "1px solid #0066cc",
                        borderRadius: isMobile ? "8px" : "0px",
                        backgroundColor: "#f8fbff"
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#0066cc",
                          color: "#fff",
                          padding: isMobile ? "10px 15px" : "6px 10px",
                          fontSize: isMobile ? "14px" : "12px",
                          fontWeight: "bold"
                        }}
                      >
                        Total Transactions
                      </div>
                      <div
                        style={{
                          padding: isMobile ? "15px" : "12px",
                          fontSize: isMobile ? "20px" : "18px",
                          fontWeight: "bold",
                          color: "#0066cc"
                        }}
                      >
                        {transactionData.transaction_count}
                      </div>
                    </div>

                    {/* User ID Card */}
                    <div
                      style={{
                        border: "1px solid #6c757d",
                        borderRadius: isMobile ? "8px" : "0px",
                        backgroundColor: "#f8f9fa"
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#6c757d",
                          color: "#fff",
                          padding: isMobile ? "10px 15px" : "6px 10px",
                          fontSize: isMobile ? "14px" : "12px",
                          fontWeight: "bold"
                        }}
                      >
                        User ID
                      </div>
                      <div
                        style={{
                          padding: isMobile ? "15px" : "12px",
                          fontSize: isMobile ? "13px" : "12px",
                          fontFamily: "monospace",
                          color: "#6c757d",
                          wordBreak: "break-all"
                        }}
                      >
                        {transactionData.user_id}
                      </div>
                    </div>
                  </div>
                )}

                {/* Refresh Button */}
                <div style={{ marginBottom: "16px" }}>
                  <button
                    onClick={fetchUserTransactions}
                    style={{
                      padding: isMobile ? "10px 16px" : "6px 12px",
                      fontSize: isMobile ? "16px" : "12px",
                      color: "#fff",
                      backgroundColor: "#0066cc",
                      border: "1px solid #ccc",
                      borderRadius: isMobile ? "4px" : "0px",
                      cursor: "pointer",
                      minHeight: isMobile ? "44px" : "auto"
                    }}
                  >
                    🔄 Refresh
                  </button>
                </div>

                {/* Transactions Table/Cards */}
                {userTransactions && userTransactions.length > 0 ? (
                  <>
                    {/* Desktop Table View */}
                    {!isMobile && (
                      <div
                        style={{
                          border: "1px solid #dee2e6",
                          borderRadius: "0px",
                          overflow: "hidden"
                        }}
                      >
                        {/* Table Header */}
                        <div
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderBottom: "1px solid #dee2e6",
                            padding: "10px",
                            display: "grid",
                            gridTemplateColumns: "1fr 100px 80px 120px 100px 1fr",
                            gap: "10px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#333"
                          }}
                        >
                          <div>Payment ID</div>
                          <div>Amount</div>
                          <div>Status</div>
                          <div>Date</div>
                          <div>Currency</div>
                          <div>Order ID</div>
                        </div>

                        {/* Table Rows */}
                        {userTransactions.map((transaction, index) => (
                          <div
                            key={transaction._id || index}
                            style={{
                              borderBottom: index < userTransactions.length - 1 ? "1px solid #dee2e6" : "none",
                              padding: "12px 10px",
                              display: "grid",
                              gridTemplateColumns: "1fr 100px 80px 120px 100px 1fr",
                              gap: "10px",
                              fontSize: "12px",
                              color: "#333",
                              backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9"
                            }}
                          >
                            <div
                              style={{
                                wordBreak: "break-all",
                                color: "#0066cc",
                                fontFamily: "monospace",
                                fontSize: "11px"
                              }}
                            >
                              {transaction.razorpay_payment_id || 'N/A'}
                            </div>
                            <div style={{ fontWeight: "bold", color: "#28a745" }}>
                              {formatAmount(transaction.amount)}
                            </div>
                            <div>
                              <span style={getStatusStyle(transaction.status)}>
                                {transaction.status || 'Unknown'}
                              </span>
                            </div>
                            <div>
                              {formatDate(transaction.timestamp)}
                            </div>
                            <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                              {transaction.currency || 'INR'}
                            </div>
                            <div
                              style={{
                                wordBreak: "break-all",
                                fontFamily: "monospace",
                                color: "#666",
                                fontSize: "11px"
                              }}
                            >
                              {transaction.razorpay_order_id || 'N/A'}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Mobile Card View */}
                    {isMobile && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {userTransactions.map((transaction, index) => (
                          <div
                            key={transaction._id || index}
                            style={{
                              border: "1px solid #dee2e6",
                              borderRadius: "8px",
                              backgroundColor: "#fff",
                              padding: "16px",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                            }}
                          >
                            {/* Amount and Status Row */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "12px"
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  color: "#28a745"
                                }}
                              >
                                {formatAmount(transaction.amount)}
                              </div>
                              <span style={getStatusStyle(transaction.status)}>
                                {transaction.status || 'Unknown'}
                              </span>
                            </div>

                            {/* Transaction Details */}
                            <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                              <strong>Date:</strong> {formatDate(transaction.timestamp)}
                            </div>
                            
                            <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                              <strong>Currency:</strong> {transaction.currency || 'INR'}
                            </div>

                            <div 
                              style={{ 
                                fontSize: "12px", 
                                color: "#0066cc", 
                                fontFamily: "monospace",
                                wordBreak: "break-all",
                                marginBottom: "4px"
                              }}
                            >
                              <strong>Payment ID:</strong> {transaction.razorpay_payment_id || 'N/A'}
                            </div>

                            <div 
                              style={{ 
                                fontSize: "12px", 
                                color: "#666", 
                                fontFamily: "monospace",
                                wordBreak: "break-all"
                              }}
                            >
                              <strong>Order ID:</strong> {transaction.razorpay_order_id || 'N/A'}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* No Transactions State */
                  <div
                    style={{
                      textAlign: "center",
                      padding: isMobile ? "30px 20px" : "40px",
                      border: "1px solid #dee2e6",
                      borderRadius: isMobile ? "8px" : "0px",
                      backgroundColor: "#f8f9fa"
                    }}
                  >
                    <div
                      style={{
                        fontSize: isMobile ? "56px" : "48px",
                        color: "#ccc",
                        marginBottom: "16px"
                      }}
                    >
                      💳
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "18px" : "16px",
                        color: "#666",
                        marginBottom: "8px"
                      }}
                    >
                      No Transactions Found
                    </div>
                    <div
                      style={{
                        fontSize: isMobile ? "14px" : "12px",
                        color: "#888"
                      }}
                    >
                      You haven't made any payments yet.
                    </div>
                  </div>
                )}

                {/* Detailed Transaction Information - Desktop Only */}
                {!isMobile && userTransactions && userTransactions.length > 0 && (
                  <div
                    style={{
                      marginTop: "20px",
                      border: "1px solid #dee2e6",
                      borderRadius: "0px"
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderBottom: "1px solid #dee2e6",
                        padding: "10px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#333"
                      }}
                    >
                      Transaction Details
                    </div>
                    <div style={{ padding: "16px" }}>
                      {userTransactions.map((transaction, index) => (
                        <div
                          key={transaction._id}
                          style={{
                            marginBottom: index < userTransactions.length - 1 ? "16px" : "0",
                            paddingBottom: index < userTransactions.length - 1 ? "16px" : "0",
                            borderBottom: index < userTransactions.length - 1 ? "1px solid #dee2e6" : "none"
                          }}
                        >
                          <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: "8px", fontSize: "12px" }}>
                            <div><strong>Transaction ID:</strong></div>
                            <div style={{ fontFamily: "monospace", color: "#0066cc" }}>{transaction._id}</div>
                            
                            <div><strong>Payment ID:</strong></div>
                            <div style={{ fontFamily: "monospace", color: "#0066cc" }}>{transaction.razorpay_payment_id}</div>
                            
                            <div><strong>Order ID:</strong></div>
                            <div style={{ fontFamily: "monospace", color: "#666" }}>{transaction.razorpay_order_id}</div>
                            
                            <div><strong>Amount:</strong></div>
                            <div style={{ fontWeight: "bold", color: "#28a745" }}>{formatAmount(transaction.amount)} {transaction.currency}</div>
                            
                            <div><strong>Status:</strong></div>
                            <div><span style={getStatusStyle(transaction.status)}>{transaction.status}</span></div>
                            
                            <div><strong>Timestamp:</strong></div>
                            <div>{formatDate(transaction.timestamp)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Navigation Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "stretch" : "center",
                borderTop: "1px solid #dee2e6",
                paddingTop: "20px",
                marginTop: "30px",
                gap: isMobile ? "10px" : "0"
              }}
            >
              <div style={{ 
                display: "flex", 
                gap: isMobile ? "8px" : "10px",
                flexDirection: isMobile ? "column" : "row"
              }}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{
                    padding: isMobile ? "12px 16px" : "6px 12px",
                    fontSize: isMobile ? "16px" : "12px",
                    color: "#333",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ccc",
                    borderRadius: isMobile ? "4px" : "0px",
                    cursor: "pointer",
                    minHeight: isMobile ? "48px" : "auto"
                  }}
                >
                  ◀ Back
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/gov.au/lusc/dashboard")}
                  style={{
                    padding: isMobile ? "12px 16px" : "6px 12px",
                    fontSize: isMobile ? "16px" : "12px",
                    color: "#333",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ccc",
                    borderRadius: isMobile ? "4px" : "0px",
                    cursor: "pointer",
                    minHeight: isMobile ? "48px" : "auto"
                  }}
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - only show on desktop/laptop */}
        {!isMobile && (
          <div style={{ width: "260px", height: "fit-content" }}>
            <div style={{ border: "1px solid #ccc", borderRadius: "0px", backgroundColor: "#ffffff", marginBottom: "20px" }}>
              <header style={{ background: "#1e3a5f", padding: "8px 16px", color: "white", fontSize: "12px", fontWeight: "bold", height: "20px", display: "flex", alignItems: "center" }}>
                Payment Summary
              </header>
              <div style={{ padding: "16px" }}>
                <div style={{ fontSize: "12px", color: "#333", lineHeight: "1.4" }}>
                  {transactionData ? (
                    <>
                      <p><strong>User ID:</strong> {transactionData.user_id}</p>
                      <p><strong>Total Paid:</strong> {formatAmount(transactionData.total_paid)}</p>
                      <p><strong>Transactions:</strong> {transactionData.transaction_count}</p>
                      <p><strong>Last Updated:</strong> {new Date().toLocaleString()}</p>
                    </>
                  ) : (
                    <p>Loading summary...</p>
                  )}
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid #ccc", borderRadius: "0px", backgroundColor: "#ffffff" }}>
              <header style={{ background: "#1e3a5f", padding: "8px 16px", color: "white", fontSize: "12px", fontWeight: "bold", height: "20px", display: "flex", alignItems: "center" }}>
                Help and Support
              </header>
              <div style={{ padding: "16px" }}>
                <a href="#" style={{ color: "#0066cc", fontSize: "12px", textDecoration: "underline", display: "block", marginBottom: "8px", lineHeight: "16px" }} onClick={(e) => e.preventDefault()}>Payment Support</a>
                <a href="#" style={{ color: "#0066cc", fontSize: "12px", textDecoration: "underline", display: "block", marginBottom: "8px", lineHeight: "16px" }} onClick={(e) => e.preventDefault()}>Transaction Issues</a>
                <a href="#" style={{ color: "#0066cc", fontSize: "12px", textDecoration: "underline", display: "block", marginBottom: "8px", lineHeight: "16px" }} onClick={(e) => e.preventDefault()}>Contact us</a>
                <a href="#" style={{ color: "#0066cc", fontSize: "12px", textDecoration: "underline", display: "block", lineHeight: "16px" }} onClick={(e) => e.preventDefault()}>Download Receipt</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
