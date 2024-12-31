import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import { IoMdSearch } from "react-icons/io";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import ModalComponent from "../inward-ach-acp/components/ModalComponent";
import SearchModal from "../inward-ach-acp/components/SearchModal";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import DataTable from "../../../../../components/others/Datatable/DataTable";

function CancelAchcApp() {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const headers = {
    "x-api-key": process.env.REACT_APP_API_KEY,
    "Content-Type": "application/json",
  };
  return (
    <div>
      <div>
        <div>
          <ActionButtons />
        </div>
        {/* <hr /> */}
        <div style={{ display: "flex", marginTop: "15px" }}>
          <div style={{ display: "", flex: 0.95, backgroundColor: "" }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "space-around",
                marginTop: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <InputField
                    label={"Select Transaction"}
                    labelWidth={"40%"}
                    inputWidth={"60%"}
                    disabled={true}
                    required={true}
                  />
                </div>
                <div>
                  <ModalComponent
                    textColor={"white"}
                    buttonBackgroundColor={"rgb(21 163 183)"}
                    buttonWidth={"80%"}
                    text={<IoMdSearch size={20} />}
                    modalBody={<SearchModal header={"Search Transactions"} />}
                  />
                </div>
              </div>
              {/* Currency */}
              <div>
                <SelectField
                  label={"Currency"}
                  labelWidth={"30%"}
                  inputWidth={"65%"}
                />
              </div>
              {/* Debit/Credit */}
              <div>
                <SelectField
                  label={"Debit/Credit"}
                  labelWidth={"40%"}
                  inputWidth={"65%"}
                />
              </div>
            </div>
          </div>
        </div>
        {/* left and right sides */}
        <div
          style={{
            display: "flex",
            flex: 1,
            background: "",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          {/* left container */}
          <div
            div
            style={{ flex: 0.65, backgroundColor: "", padding: "15px 10px" }}
          >
            {/* ACH Amount & A/C */}
            <div className="flex space-x-6 w-full mb-2">
              <div className="w-[40%]">
                <InputField
                  label={"ACH Amount"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  textAlign={"right"}
                />
              </div>
              <div className="w-[60%] flex space-x-2">
                <div className="w-[40%]">
                  <SelectField
                    label={"A/C"}
                    labelWidth={"20%"}
                    inputWidth={"80%"}
                  />
                </div>
                <div className="w-[60%]">
                  <InputField inputWidth={"100%"} />
                </div>
              </div>
            </div>
            {/* Total Credit & Name */}
            <div className="flex space-x-6 w-full mb-2">
              <div className="w-[40%]">
                <InputField
                  label={"Total Credit"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  textAlign={"right"}
                  disabled={true}
                />
              </div>
              <div className="w-[60%] flex space-x-2">
                <div className="w-[40%]">
                  <SelectField
                    label={"Name"}
                    labelWidth={"20%"}
                    inputWidth={"80%"}
                  />
                </div>
                <div className="w-[60%]">
                  <InputField inputWidth={"100%"} />
                </div>
              </div>
            </div>
            {/* Add to Batch*/}
            <div className="flex space-x-6 w-full mb-2">
              <div className="w-[30%]">
                {/* <InputField
                  label={"Total Debit"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  textAlign={"right"}
                  disabled={true}
                /> */}
              </div>
              <div className="w-[60%] flex space-x-2">
                <div className="w-[80%]">
                  <SelectField
                    label={"Add to Batch"}
                    labelWidth={"37%"}
                    inputWidth={"50%"}
                  />
                </div>
                <div className="w-[50%]">
                  {/* <InputField inputWidth={"100%"} /> */}
                </div>
              </div>
            </div>
          </div>
          {/* right container */}
          <div className="border-2 rounded h-20 mb-2" style={{ flex: "0.35" }}>
            {/*  Entry & Value Date*/}
            <div className="flex items-center mb-4 space-x-6 justify-center w-full">
              <div className="">
                <ButtonType
                  name={"date"}
                  label={"Entry Date"}
                  labelWidth={""}
                  type={"radio"}
                />
              </div>
              <div className="">
                <ButtonType
                  name={"date"}
                  label={"Value Date"}
                  labelWidth={""}
                  type={"radio"}
                />
              </div>
            </div>
            {/* From & End */}
            <div className="flex w-full space-x-2">
              <div className="">
                <InputField
                  label={"From"}
                  type={"date"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                />
              </div>
              <div className="">
                <InputField
                  label={"End"}
                  type={"date"}
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                />
              </div>
            </div>
            <div className="flex w-full mt-4 mb-2">
              <InputField
                label={"Receiving Bank"}
                labelWidth={"30%"}
                inputWidth={"70%"}
                disabled={true}
              />
            </div>
            <div className="flex w-full space-x-2">
              <div className="w-[45%]">
                <InputField
                  label={"Entry hash"}
                  disabled={true}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                />
              </div>
              <div className="w-[10%]">
                <InputField disabled={true} inputWidth={"100%"} />
              </div>
              <div className="w-[45%]">
                <InputField
                  label={"Batch"}
                  disabled={true}
                  inputWidth={"70%"}
                  labelWidth={"30%"}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div
          style={{
            display: "flex",
            //flex: 1,
            justifyContent: "end",
            backgroundColor: "",
            marginBottom: "15px",
          }}
        >
          <div
            className="small-space"
            style={{ background: "", paddingRight: "10px" }}
          >
            <ButtonComponent
              label="Check All"
              //buttonBackgroundColor=getTheme.theme.navBarColor,
              buttonWidth="100%"
              buttonHeight="25px"
              buttonColor="white"
              marginBottom="25px"
            />
          </div>
          <div
            className="small-space"
            style={{ background: "", paddingRight: "10px" }}
          >
            <ButtonComponent
              label="Uncheck All"
              //buttonBackgroundColor=getTheme.theme.navBarColor,
              buttonWidth="100%"
              buttonHeight="25px"
              buttonColor="white"
              marginBottom="25px"
            />
          </div>
        </div>
        <header
          className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
          style={{
            background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,

            textAlign: "center",
            marginLeft: "-16px",
            marginRight: "-16px",
            //marginTop: 'px'
          }}
        >
          Direct Credit Cancellation Approval
        </header>
        &nbsp;
        <DataTable 
        columns={[
            "Reference",
            "Amount",
            "Payer Account",
            "Payer",
            "Beneficiary Name",
            "Receiving Bank",
            "Posted By",
        ]}
        />
      </div>
    </div>
  );
}
export default CancelAchcApp;
