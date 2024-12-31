import React, { useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiEye } from "react-icons/fi";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import { Modal } from "antd";
import DocumentViewing from "../../../../../components/DocumentViewing";

function PaymentReasonApproval({ data1 }) {
  // STATES AND VARIABLES
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);

  return (
    <div className="space-y-4">
      <br />
      <div className="flex items-center w-full gap-2">
        {/* ATTACH DOCUMENT */}
        <div className="w-[80%]">
          <InputField
            label={"Attach Document"}
            labelWidth={"130%"}
            inputWidth={"80%"}
            required
            disabled
            value={data1?.DOCUMENT_ID}
          />
        </div>
        <div className="w-1/2" style={{ zoom: "0.9" }}>
          <ButtonComponent
            label={"View Document"}
            buttonHeight={"29px"}
            buttonBackgroundColor={"#070269"}
            buttonWidth={"180px"}
            fontSize={"95%"}
            buttonIcon={<FiEye />}
            // onClick={() => setSweetAlertConfirmed(true)}
          />
        </div>
      </div>
      <hr />

      {/* REASON */}
      <TextAreaField
        inputWidth={"55%"}
        labelWidth={"33%"}
        inputheight={"70px"}
        label={"Reason"}
        value={data1?.REASON}
        required
        disabled
      />

      {/* MODAL */}
      <Modal
        opened={sweetAlertConfirmed}
        size="lg"
        centered
        style={{ height: "100%" }}
        className="shadow-md shadow-black"
        closeOnClickOutside
        onClose={() => setSweetAlertConfirmed(false)}
      >
        <DocumentViewing documentID={data1?.DOCUMENT_ID} />
      </Modal>
    </div>
  );
}

export default PaymentReasonApproval;
