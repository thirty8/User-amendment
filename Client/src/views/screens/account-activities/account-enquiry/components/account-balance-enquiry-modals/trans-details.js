import React from "react";
import { useState, useEffect } from "react";

import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../components/others/Fields/InputField";

function   TransDetails({ transState }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        zoom: 0.9,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <br></br>
      <div
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          display: "grid",
          paddingLeft: "20px",
          padding: "20px",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "40px",
          rowGap: "15px",
          paddingTop: "40px",
        }}
      >
        <InputField
          label={"Trans Number"}
          labelWidth={"35%"}
          inputWidth={"35%"}
          value={transState.transNumber}
          disabled
        />
        <InputField
          label={"Exchange Rate"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={transState.exchangeRate}
        />
        <InputField
          label={"Voucher Number"}
          labelWidth={"35%"}
          inputWidth={"35%"}
          disabled
          value={transState.voucherNumber}
        />
        <InputField
          label={"Terminal ID"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={transState.terminalId}
        />
        <InputField
          label={"Transaction Type"}
          labelWidth={"35%"}
          inputWidth={"35%"}
          disabled
          value={transState.transactionType}
        />
        <InputField
          label={"Contra Account"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={transState.contraAccount}
        />
        <InputField
          label={"Branch"}
          labelWidth={"35%"}
          inputWidth={"35%"}
          disabled
          value={transState.branchCode}
        />
        <InputField
          label={"Posting System Date"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={transState.postingSystemDate}
        />
        <InputField
          label={"Posted By"}
          labelWidth={"35%"}
          inputWidth={"35%"}
          disabled
          value={transState.postingDate}
        />
        <InputField
          label={"Posting System Time"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={transState.postingSysTime}
        />
        <InputField
          label={"Channel"}
          labelWidth={"35%"}
          inputWidth={"35%"}
          disabled
          value={transState.channel}
        />
        <InputField
          label={"Approval System Date"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={transState.approvalSystemDate}
        />
        <InputField
          label={"Approved By"}
          labelWidth={"35%"}
          inputWidth={"35%"}
          disabled
          value={transState.approvedBy}
        />
        <InputField
          label={"Approved System Time"}
          labelWidth={"45%"}
          inputWidth={"35%"}
          disabled
          value={transState.approvalSysTime}
        />
        <div></div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "5px",
          }}
        >
          <div style={{boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",borderRadius:"4px"}}>
          <ButtonComponent
            label={"View Voucher"}
            buttonColor={"white"}
            buttonWidth={"110px"}
            buttonHeight={"27px"}
          />
           </div>
        </div>
      </div>
    </div>
  );
}

export default TransDetails;
