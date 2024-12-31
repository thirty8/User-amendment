import React, { useEffect, useState } from 'react';

function PendingDevelopment({approvalTitle}) {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prevBlink) => !prevBlink);
    }, 500); // Change the blinking speed by adjusting the interval in milliseconds

    return () => {
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // minHeight: '100vh',
        flexDirection: 'column',
      }}
    >

      <br />
      
      {/* <img
        src="https://clipart-library.com/images/BiaGeAMi8.gif"
        alt="Under Construction"
        style={{ width: '30%' }}
      /> */}

      <br /><br />

      <p style={{ animation: isBlinking ? 'blink 1s infinite' : 'none' }}>
        Sorry... the <b>{approvalTitle}</b> screen is currently pending development!
      </p>

      <br /><br />

      <style>
        {`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        `}
      </style>
    </div>
  );
}

export default PendingDevelopment;
