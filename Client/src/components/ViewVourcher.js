import { useState, useEffect } from "react";

export default function ViewVourcher({ docCode }) {
  useEffect(() => {}, []);

  const image_url = "http://10.203.14.42/imaging/view_j_images-" + docCode;

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
