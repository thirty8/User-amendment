import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

function ScanningComponent(props) {
  const [scanResult, setScanResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      props.onScan(data); // Pass scan result to parent component
    }
  };

  const handleError = (err) => {
    console.error(err);
    props.onError(err); // Pass error to parent component
  };

  const openScanner = () => {
    setScanResult('');
  };

  return (
    <>
      {!scanResult && (
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      )}
      {scanResult && (
        <div>
          <p>Scan result:</p>
          <p>{scanResult}</p>
        </div>
      )}
    </>
  );
}

export default ScanningComponent;
