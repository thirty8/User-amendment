import React, { useState } from 'react';
import Fingerprint2 from 'fingerprintjs2';

const FingerPrintComponent = () => {
  const [fingerprint, setFingerprint] = useState('');

  const generateFingerprint = () => {
    Fingerprint2.get((components) => {
      const values = components.map((component) => component.value);
      const fingerprint = Fingerprint2.x64hash128(values.join(''), 31);
      setFingerprint(fingerprint);
    });
  };

  return (
    <div>
      <button onClick={generateFingerprint}>Generate Fingerprint</button>
      {fingerprint && <p>Your fingerprint: {fingerprint}</p>}
    </div>
  );
};

export default FingerPrintComponent;
