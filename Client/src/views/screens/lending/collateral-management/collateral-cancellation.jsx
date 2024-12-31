import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";

export default function CollateralCancellation() {
  const [getTheme, setGetTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  return (
    <div className="bg-white rounded py-[12px] scale-[0.85] -mx-20 -mt-8 ">
      <ActionButtons/>
      {/* my body goes here  */}
      <hr className="my-[3px] mt-3" />
      <div className="rounded h-auto pb-2 pt-2 px-2 bg-white ">
        <div
          style={{ width: "100%" }}
          className="wrapper rounded border-2 py-2 px-3 mb-3"
        >
          <ListOfValue
            label={"Customer Number"}
            labelWidth={"14.5%"}
            required
          />
        </div>
        <div
          style={{ width: "100%" }}
          className="wrapper rounded border-2 flex"
        >
          {/* left side  */}
          <div className="w-[75%] rounded py-2 px-3 md:mr-2 md:mb-0">
            <div className="mb-2">
              <ListOfValue
                label={"Collateral Number"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                required
              />
            </div>
            <div className="mb-2">
              <ListOfValue
                label={"Collateral Type"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                required
              />
            </div>
            <div className="mb-2 flex items-center space-x-4">
              <div className="w-1/2">
                <InputField
                  label={"Collateral Description"}
                  labelWidth={"41%"}
                  inputWidth={"59%"}
                  required
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"Number of shares"}
                  labelWidth={"30%"}
                  inputWidth={"20%"}
                />
              </div>
            </div>
            {/* <div className="mb-2">
              <InputField label={"Collateral Description"} labelWidth={"20%"}
              inputWidth={"60%"} required/>
            </div> */}
            <div className="mb-2">
              <ListOfValue
                label={"Pledged Account"}
                labelWidth={"20%"}
                inputWidth={"60%"}
              />
            </div>
            <div className="mb-2">
              <InputField
                label={"Company"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                disabled
              />
            </div>
            <div className="mb-[28px]">
              <InputField
                label={"Collateral Location"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                disabled
              />
            </div>
            <div className="mb-2">
              <InputField
                label={"Collateral Currency"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                disabled
                required
              />
            </div>
            <div className="mb-2 flex items-center space-x-4">
              <div className="w-1/2">
                <InputField
                  label={"Estimated Market"}
                  labelWidth={"41%"}
                  inputWidth={"39%"}
                  disabled
                  required
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"Coverage Value"}
                  labelWidth={"30%"}
                  inputWidth={"29%"}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mb-2 flex items-center space-x-4">
              <div className="w-1/2">
                <InputField
                  label={"Available Value"}
                  labelWidth={"41%"}
                  inputWidth={"39%"}
                  disabled
                  required
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"Realizability Value"}
                  labelWidth={"30%"}
                  inputWidth={"29%"}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="mb-2 flex items-center space-x-4">
              <div className="w-1/2">
                <InputField
                  label={"Review Date"}
                  labelWidth={"41%"}
                  inputWidth={"39%"}
                  disabled
                  required
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"Expiry Date"}
                  labelWidth={"30%"}
                  inputWidth={"29%"}
                  disabled
                />
              </div>
            </div>
            <div className="mb-2">
              <InputField
                label={"Closure Reason"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                required
              />
            </div>
          </div>
          {/* right side  */}
          <div className="w-[25%] py-2 rounded px-4 ">
            <ButtonComponent label={"Attach Document"} />
          </div>
        </div>
      </div>
    </div>
  );
}
