import { useState, useEffect } from "react";

export default function DocumentCapture({}) {
  useEffect(() => {}, []);

  const document_capture_url = "http://10.203.14.169/dms/scan/";

  return (
    <>
      <iframe
        width="100%"
        height="auto"
        src={document_capture_url}
        title="Browser"
      ></iframe>
          
    </>
  );
}
