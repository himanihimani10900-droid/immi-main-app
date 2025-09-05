import React, { useState, useEffect } from "react";
const PDFViewer = ({ userId }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `https://immi-backend.up.railway.app/upload/doc/user_9e3b7669`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `Failed to load PDF: ${response.status} ${response.statusText}`
          );
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load PDF");
      } finally {
        setLoading(false);
      }
    };
    loadPDF();
    // Cleanup function to revoke object URL
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [userId]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-gray-600">Loading PDF...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <iframe
        src={pdfUrl}
        width="100%"
        height="600px"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
};
export default PDFViewer;
