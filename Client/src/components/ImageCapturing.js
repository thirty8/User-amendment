import { useState, useEffect } from "react";

export default function ImageCapturing({ id }) {
  useEffect(() => {}, []);

  alert(id);

  const image_url = "http://10.203.14.42/imaging/capture-" + id;

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
