import React from "react";
import InputField from "../../../../../components/others/Fields/InputField";

function ChargesDetailsApproval({ data1 }) {
  return (
    <div>
      <br />

      <div className="space-y-4  rounded-md mx-8 p-4">
        <InputField
          label={"Fee"}
          textAlign={"right"}
          labelWidth={"30%"}
          inputWidth={"45%"}
          disabled
          value={data1?.EARLY_FEE_AMOUNT === null ? 0 : data1?.EARLY_FEE_AMOUNT}
        />

        <div className="flex">
          <InputField
            label={"Insurance"}
            textAlign={"right"}
            labelWidth={"60%"}
            inputWidth={"30%"}
            disabled
            value={data1?.INSURANCE === null ? 0 : data1?.INSURANCE}
          />

          <InputField
            textAlign={"right"}
            inputWidth={"50%"}
            value={
              data1?.INSURANCE_AMOUNT === null ? 0 : data1?.INSURANCE_AMOUNT
            }
            disabled
          />
        </div>

        <hr />

        <InputField
          label={"Total Fees Amount"}
          textAlign={"right"}
          labelWidth={"30%"}
          inputWidth={"45%"}
          disabled
          value={
            isNaN(
              parseFloat(data1?.INSURANCE_AMOUNT) +
                parseFloat(data1?.EARLY_FEE_AMOUNT)
            )
              ? 0
              : parseFloat(data1?.INSURANCE_AMOUNT) +
                parseFloat(data1?.EARLY_FEE_AMOUNT)
          }
        />
      </div>
    </div>
  );
}

export default ChargesDetailsApproval;
