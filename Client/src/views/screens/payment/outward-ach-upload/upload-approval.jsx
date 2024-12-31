import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import { IoMdSearch } from "react-icons/io";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import ModalComponent from "../inward-ach-acp/components/ModalComponent";
import SearchModal from "../inward-ach-acp/components/SearchModal";

function UploadApproval() {
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
              {/* A/C */}
              <div>
                <InputField
                  label={"A/C"}
                  labelWidth={"20%"}
                  inputWidth={"80%"}
                />
              </div>
              {/* Currency */}
              <div>
                <SelectField
                  label={"Currency"}
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
            style={{ flex: 0.7, backgroundColor: "", padding: "15px 10px" }}
          >
            {/* ID and Debit/Credit */}
            <div className="flex space-x-6 w-full mb-2">
              <div className="w-[60%] flex space-x-2">
                <div className="w-[40%]">
                  <SelectField
                    label={"ID"}
                    labelWidth={"20%"}
                    inputWidth={"80%"}
                  />
                </div>
                <div className="w-[60%]">
                  <InputField disabled={true} inputWidth={"100%"} />
                </div>
              </div>
              <div className="w-[40%]">
                <SelectField
                  label={"Debit/Credit"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                />
              </div>
            </div>
            {/*   Name  & ACH Amount*/}
            <div className="flex space-x-6 w-full mb-2">
              <div className="w-[60%] flex space-x-2">
                <div className="w-[40%]">
                  <SelectField
                    label={"Name"}
                    labelWidth={"20%"}
                    inputWidth={"80%"}
                  />
                </div>
                <div className="w-[60%]">
                  <InputField disabled={true} inputWidth={"100%"} />
                </div>
              </div>
              <div className="w-[40%]">
                <InputField
                  label={"ACH Amount"}
                  labelWidth={"35%"}
                  inputWidth={"60%"}
                  disabled={true}
                  textAlign={"right"}
                />
              </div>
            </div>
          </div>
          {/* right container */}
          <div className="border-2 rounded h-20 mb-2" style={{ flex: "0.30" }}>
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
            <div className="flex w-full mt-4 space-x-2">
              <div className="w-[50%]">
                <InputField
                  label={"Batch No."}
                  labelWidth={"40%"}
                  inputWidth={"30%"}
                  disabled={true}
                />
              </div>
              <div className="w-[50%]">
                <InputField
                  label={"Entry Cnt"}
                  labelWidth={"40%"}
                  inputWidth={"30%"}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className="flex w-full items-center justify-center space-x-2">
          <div
            className="w-full space-x-2 flex"
            style={{ display: "", flex: 0.75, backgroundColor: "" }}
          >
            <div className="w-[20%]">
              <InputField
                label={"Total Debit"}
                labelWidth={"50%"}
                inputWidth={"45%"}
                disabled={true}
                required={true}
              />
            </div>

            {/* Total Credit */}
            <div className="w-[20%]">
              <InputField
                label={"Total Credit"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                required={true}
                disabled={true}
              />
            </div>
            {/* Batch */}
            <div className="w-[20%]">
              <InputField
                label={"Batch"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                disabled={true}
              />
            </div>
            {/* Receiving Banks */}
            <div className="w-[40%]">
              <InputField
                label={"Receiving Banks"}
                labelWidth={"30%"}
                inputWidth={"68%"}
                disabled={true}
              />
            </div>
          </div>
          <div style={{ flex: 0.25 }} className="mb-0">
            <div className="flex space-x-2">
              <div>
                <ButtonComponent
                  label="View Doc"
                  //buttonBackgroundColor=getTheme.theme.navBarColor,
                  buttonWidth="100%"
                  buttonHeight="25px"
                  buttonColor="white"
                />
              </div>
              <div>
                <ButtonComponent
                  label="Check All"
                  //buttonBackgroundColor=getTheme.theme.navBarColor,
                  buttonWidth="100%"
                  buttonHeight="25px"
                  buttonColor="white"
                />
              </div>
              <div>
                <ButtonComponent
                  label="Uncheck All"
                  //buttonBackgroundColor=getTheme.theme.navBarColor,
                  buttonWidth="100%"
                  buttonHeight="25px"
                  buttonColor="white"
                />
              </div>
            </div>
          </div>
        </div>
        <br/>
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
          Direct Credit Upload Approval
        </header>
        &nbsp;
        <DataTable 
        columns={[
          "Batch ID", "Check Ref", "Amount", "Payer Account", "Payer Name",
          "Beneficiary Account",
            "Beneficiary Name",
            "Receiving Bank",
            "Value Date",
        ]}
        />
      </div>
    </div>
  );
}
export default UploadApproval;
