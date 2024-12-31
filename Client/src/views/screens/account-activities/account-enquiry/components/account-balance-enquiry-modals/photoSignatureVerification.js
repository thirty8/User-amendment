import { useState, useEffect } from "react";

export default function PhotoSignatureVerification({ relationNo }) {
  useEffect(() => {}, []);

  const image_url = " http://10.203.14.42/imaging/viewimage_main-" + relationNo;

  return (
    <>
      <iframe
        width="100%"
        height="500px"
        src={image_url}
        title="Browser"
      ></iframe>
    </>
  );
}
