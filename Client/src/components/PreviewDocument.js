import { useState, useEffect } from "react";
import InputField from "./others/Fields/InputField";
import Button from "./others/Button/ButtonComponent";
import { AiOutlineSearch } from "react-icons/ai";

export default function PreviewDocument() {
  const [documentID, setDocumentID] = useState(null);
  const [viewDocument, setViewDocument] = useState(null);

  function handleOnClick() {
    const docID = document.getElementById("docID").value;
    if (docID) {
      setDocumentID(docID);
      const newViewDocument = "http://10.203.14.42/dms/filesearch-" + docID;
      setViewDocument(newViewDocument);
    }
  }

  return (
    <>
      <hr className="mt-2" />
      <div className="flex pull-center mt-1 mb-2">
        <div className="flex" style={{ marginTop: "5px" }}>
          <span
            style={{
              marginTop: "0px",
              fontSize: "14px",
              marginRight: "-11px",
            }}
          >
            Document&nbsp;ID{" "}
          </span>
          <InputField inputWidth={"220px"} id={"docID"} type={"number"} />
          <Button
            buttonIcon={<AiOutlineSearch />}
            onClick={() => handleOnClick()}
            buttonWidth={"35px"}
            lable={"Fetch"}
          />
        </div>
      </div>
      <hr className="mb-2" />
      {documentID ? (
        <iframe
          style={{ height: "550px", marginBottom: "-20px" }}
          width="100%"
          height="auto"
          src={viewDocument}
          title="Browser"
        ></iframe>
      ) : (
        ""
      )}
    </>
  );
}
