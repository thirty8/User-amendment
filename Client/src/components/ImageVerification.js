import { useState, useEffect } from "react";

export default function ImageVerification({
  accountNumber,
  id,
  firstName,
  otherName,
  lastName,
  customerID,
}) {
  useEffect(() => {}, []);

  const image_url = "http://10.203.14.169/imaging/getimages-" + accountNumber;

  return (
    <>
      <iframe
        style={{ zoom: "0.7" }}
        width="100%"
        height="700px"
        src={image_url}
        title="Browser"
      ></iframe>
    </>
  );
}
