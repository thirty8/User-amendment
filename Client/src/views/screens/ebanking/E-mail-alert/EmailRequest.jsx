import React, { useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";

export default function EmailRequest() {
  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    // scale-[0.85] -mx-20 -mt-4
    <div className="bg-gray-200 rounded scale-[0.85] -mx-20 -mt-4 ">
      <div className="w-full bg-white rounded">
        <ActionButtons
          displayFetch={"none"}
          displayRefresh={"none"}
          displayDelete={"none"}
          displayAuthorise={"none"}
          displayView={"none"}
          displayHelp={"none"}
          displayCancel={"none"}
          displayReject={"none"}
        />
      </div>
      <hr className="my-[3px]" />

      <div className={"rounded h-auto pb-2 pt-2 px-4 bg-white"}>
        <div
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,
          }}
          className="text-white py-1 px-3 mb-3"
        >
          Email Alert Request
        </div>
        <div className="flex w-[80%] mb-3">
          <InputField
            label="Account Number"
            labelWidth="30%"
            inputWidth="65%"
            required
          />
          <InputField disabled inputWidth={"100%"} />
        </div>
        <div className="mb-3">
          <InputField
            label="E-mail Address"
            labelWidth={"12%"}
            inputWidth={"50%"}
            required
          />
        </div>
        <div className="">
          <InputField
            label="Confirm E-mail"
            labelWidth={"12%"}
            inputWidth={"50%"}
            required
          />
        </div>
      </div>
    </div>
  );
}
