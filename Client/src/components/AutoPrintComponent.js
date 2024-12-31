import React, { useRef, useEffect } from 'react';

function AutoPrintComponent(props) {
  const { content } = props;
  const contentRef = useRef(null);

  useEffect(() => {
    const printContent = () => {
      window.print();
    };
    
    // Wait for the component to mount before triggering the print
    if (contentRef.current) {
      contentRef.current.addEventListener('load', printContent);
    }

    // Remove the event listener when the component is unmounted
    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('load', printContent);
      }
    };
  }, []);

  return (
    <div>
      {/* Render the content to be printed */}
      <iframe
        title="print-content"
        style={{ display: 'none' }}
        ref={contentRef}
        srcDoc={`<!DOCTYPE html>
          <html>
            <head>
              <title>Print Content</title>
              <style>
                @media print {
                  /* Define print styles here */
                }
              </style>
            </head>
            <body>
              {/* Render the content to be printed */}
              ${content}
            </body>
          </html>`}
      />
    </div>
  );
}

export default AutoPrintComponent;
