// components/QRCodeDisplay.jsx
import React from 'react';
import { FaQrcode, FaDownload, FaCopy } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';

const QRCodeDisplay = ({ qrCode, userName, className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!qrCode) {
    return (
      <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-gray-100'} text-center ${className}`}>
        <FaQrcode className={`mx-auto text-2xl mb-2 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>QR code not available</p>
      </div>
    );
  }

  // Function to download the QR code
  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${qrCode}`;
    link.download = `${userName || 'user'}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to copy the QR code to clipboard
  const copyQRCode = async () => {
    try {
      // Convert base64 to blob
      const response = await fetch(`data:image/png;base64,${qrCode}`);
      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      alert('QR code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy QR code:', err);
      alert('Failed to copy QR code');
    }
  };

  return (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-gray-100'} ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Service QR Code</h3>
        <div className="flex gap-2">
          <button
            onClick={copyQRCode}
            className={`p-2 rounded-full ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'} transition-colors`}
            title="Copy QR Code"
          >
            <FaCopy size={14} />
          </button>
          <button
            onClick={downloadQRCode}
            className={`p-2 rounded-full ${isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'} transition-colors`}
            title="Download QR Code"
          >
            <FaDownload size={14} />
          </button>
        </div>
      </div>
      <div className="bg-white p-3 rounded-lg inline-block">
        <img 
          src={`data:image/png;base64,${qrCode}`} 
          alt="Service QR Code" 
          className="w-48 h-48"
        />
      </div>
      <p className={`mt-3 text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
        Show this QR code to service providers for quick verification
      </p>
    </div>
  );
};

export default QRCodeDisplay;