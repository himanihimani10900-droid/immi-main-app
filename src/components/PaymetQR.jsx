import React from 'react';
import { useNavigate } from 'react-router-dom';
import QrCode from "../assets/QRCODE.jpg"
const PaymentQR = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/gov.au/lusc/dashboard');
    onClose(); // Close the popup after navigation
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur Background Overlay - removed onClick */}
      <div className="absolute inset-0 bg-blur-lg bg-opacity-50 backdrop-blur-sm"></div>
      
      {/* Popup Content */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 z-10">
        {/* Close Button - commented out as requested */}
        {/* <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment QR Code</h2>
          <p className="text-gray-600">Scan the QR code below to complete your payment</p>
        </div>

        {/* QR Code Container */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
            {/* You can replace this div with your QR code image */}
            <div className="w-48 h-48 bg-white rounded flex items-center justify-center">
              {/* Add your QR code image here */}
              <img
                src={QrCode}
                alt="Payment QR Code"
                className="w-full h-full object-contain"
              />
              {/* Fallback placeholder */}
              {/* <div className="text-gray-400 text-center">
                <div className="w-32 h-32 border-2 border-gray-300 rounded mx-auto mb-2"></div>
                <p className="text-sm">QR Code Here</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Open your payment app and scan the QR code
          </p>
          <p className="text-xs text-gray-500">
            Complete the payment and click continue below
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-[#1B3564] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-10"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentQR;
