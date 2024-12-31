import React, { useState } from 'react';
import ScanningComponent from './ScanningComponent';

function ScanningComponentUsage() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const handleScan = (data) => {
    setScanResult(data);
    setShowScanner(false); // Hide scanner after successful scan
  };

  const handleError = (err) => {
    console.error(err);
    setShowScanner(false); // Hide scanner after error
  };

  const openScanner = () => {
    setShowScanner(true);
  };

  return (
    <div>
      <button onClick={openScanner}>Scan QR Code</button>
      {showScanner && (
        <ScanningComponent onScan={handleScan} onError={handleError} />
      )}
      {scanResult && (
        <div>
          <h2>Scan result:</h2>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
}

export default ScanningComponentUsage;
