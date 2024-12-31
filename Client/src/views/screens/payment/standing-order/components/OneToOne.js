import React, { useState, useEffect, useRef } from "react";
import ScreenBase from "../../../../../account-activities/account-blockage/components/ScreenBase";
import InputField from "../../../../../../../components/others/Fields/InputField";
import DataTable from "../../../../../../../components/others/Datatable/DataTable";
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import ButtonType from "../../../../../../../components/others/Button/ButtonType";
import TextAreaField from "./../../../../../../components/others/Fields/TextArea";
import SelectField from "./../../../../../../components/others/Fields/SelectField";
import { Select } from "@mantine/core";

import Label from "../../../../../../../components/others/Label/Label";
import CustomTable from "../../../../../teller-ops/teller/components/CustomTable";
import { BiAddToQueue } from "react-icons/bi";
import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import { API_SERVER } from "../../../../../../../config/constant";
import Header from "../../../../../../../components/others/Header/Header";
const headers = {
  "x-api-key": process.env.REACT_APP_API_KEY,
  "Content-Type": "application/json",
};

export default function OneToMany() {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const [selectedOption, setSelectedOption] = useState("internal");
  const [selectedOption2, setSelectedOption2] = useState("infinite");
  const [selectedOption3, setSelectedOption3] = useState("EOD");
  const [debitBranch, setDebitBranch] = useState([]);
  const [bankCode, setBankCode] = useState([]);
  const [branchCode, setBranchCode] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [finiteState, setFiniteState] = useState(false);
  const [intraDayState, setIntraDayState] = useState(false);

  // setting all LOVs
  useEffect(() => {
    async function getAllLOVS() {
      const allListOfValues = axios
        .post(
          API_SERVER + "/api/standingOrderLOVs",
          {
            debitBranch: "debitBranch",
            bankCode: "BNC",
            branchCode: "branchCode",
            frequency: "PRD",
          },
          { headers }
        )
        .then((response) => {
          console.log(response.data, "data");
          setDebitBranch(response.data.debitBranch);
          setBankCode(response.data.bankCode);
          setBranchCode(response.data.branchCode);
          setFrequency(response.data.frequency);
        });
    }

    getAllLOVS();
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleOptionChangeProcessingTries = (e) => {
    setSelectedOption2(e.target.value);
  };

  const handleOptionChangeProcessingTimes = (e) => {
    setSelectedOption3(e.target.value);
  };

  // intraDay hours and minutes
  const intraDayHours = [
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
  ];

  const intraDayMinutes = [
    { label: "00", value: "00" },
    { label: "15", value: "15" },
    { label: "30", value: "30" },
    { label: "45", value: "45" },
  ];


  const nextFieldRef = useRef(null);





  return (
    <div style={{ zoom: 0.9 }}>



      {/* <div
        style={{
          display: "flex",
          marginLeft: "8px",
          // justifyContent: "center",
          fontWeight: "bold",
          marginBottom: "5px",
        }}
      >
        {" "}
        Origination <span style={{ marginLeft: "4px" }}>/</span>{" "}
        <span style={{ marginLeft: "4px" }}> One To One</span>
      </div> */}


      <div
        style={{ display: "", flex: 1, alignItems: "center" }}
        className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white "
      >
        {/* <hr className="mt-3 mb-3 text-primary"/>

        
         */}

        <div
          style={{ display: "flex", width: "100%", padding: "10px" }}
          className="wrapper rounded border-2"
        >
          {/* left container for ordering bban  */}
          <div style={{ flex: 1 }}>
            {/* order number */}

            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
              }}
            >
              <div style={{ flex: 0.27 }}>
                <InputField
                  label={"Order Batch No."}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                  disabled={true}
                />
              </div>

              <div style={{ flex: 0.2 }}>
                <InputField
                  label={"Order No."}
                  labelWidth={"34%"}
                  inputWidth={"66%"}
                  disabled={true}
                />
              </div>
            </div>
            <hr className="m-0 p-0" />

            <div
              style={{
                display: "flex",
                flex: 1,
                marginBottom: "15px",
                marginTop: "12px",
              }}
            >
              <div style={{ flex: 0.31, background: "" }}>
                <InputField
                  label={"Ordering BBAN"}
                  labelWidth={"37.5%"}
                  inputWidth={"51%"}
                  requi={true}
                  ref={nextFieldRef}
                // onChange={}
                />
              </div>
              <div style={{ flex: 0.11 }}>
                <ButtonComponent
                  label={"Search"}
                  // labelWidth={"30%"}
                  buttonWidth={"85%"}
                // requi={true}
                // onChange={}
                />
              </div>{" "}
              <div style={{ flex: 0.4, background: "" }}>
                <InputField inputWidth={"97%"} disabled={true} noMarginRight={true} />
              </div>
              <div style={{ flex: 0.006 }}></div>
              <div style={{ flex: 0.1, background: "" }}>
                <ButtonComponent
                  label={"Sign Ver"}
                  // labelWidth={"30%"}
                  buttonWidth={"90%"}
                  required={true}
                // onChange={}
                />
              </div>{" "}
            </div>

            {/*--------------------default ------------------------------------- */}
            {/* default    */}

            {/* debit branch    */}
            {/* <div
              style={{ flex: 1, marginBottom: "15px", alignItems: "center" }}
            >
              <div style={{ flex: 0.4 }}>
                <ListOfValue
                  label={"Debit branch"}
                  labelWidth={"12%"}
                  required={true}
                  inputWidth={"21.2%"}
                />
              </div>

              <div></div>
            </div> */}

            {/* internal and external radio buttons  */}
            {/* <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
              <div style={{ flex: 0.13 }}></div>

              <div style={{ flex: 0.1 }}>
                <ButtonType
                  label={"INTERNAL"}
                  labelWidth={"20%"}
                  name={"internal"}
                  type={"radio"}
                  fontWeight={"bold"}
                  checked={selectedOption === "internal"}
                  value1={"internal"}
                  onChange={handleOptionChange}
                />
              </div>
              <div style={{ flex: 0.05 }}></div>
              <div>
                <ButtonType
                  label={"EXTERNAL"}
                  labelWidth={"20%"}
                  name={"internal"}
                  type={"radio"}
                  fontWeight={"bold"}
                  value1={"external"}
                  checked={selectedOption === "external"}
                  onChange={handleOptionChange}
                />
              </div>
            </div> */}

            {/*--------------------default ------------------------------------- */}

            {/* ----------------------------------------------- */}
            {/* stylish    */}

            <div
              style={{
                display: "flex",
                flex: 1,
                // marginBottom: "5px",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 0.31, background: "" }}>
                <ListOfValue
                  label={"Debit branch"}
                  labelWidth={"37.5%"}
                  inputWidth={"51%"}
                  required={true}
                  data={debitBranch}
                />
              </div>
              <div style={{ flex: 0.6, background: "" }}>
                <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                  {/* <div style={{ flex: 0.15 }}></div> */}

                  <div style={{ flex: 0.1, background: "" }}>
                    <ButtonType
                      label={"INTERNAL"}
                      labelWidth={"20%"}
                      name={"internal"}
                      type={"radio"}
                      fontWeight={"bold"}
                      checked={selectedOption === "internal"}
                      value1={"internal"}
                      onChange={handleOptionChange}
                    />
                  </div>
                  <div style={{ flex: 0.08, background: "" }}></div>
                  <div style={{ flex: 0.1, background: "", marginLeft: "2px" }}>
                    <ButtonType
                      label={"EXTERNAL"}
                      labelWidth={"20%"}
                      name={"internal"}
                      type={"radio"}
                      fontWeight={"bold"}
                      value1={"external"}
                      checked={selectedOption === "external"}
                      onChange={handleOptionChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ----------------------------------------------- */}
          </div>

          {/* right container order batch no  */}
          {/* <div style={{ flex: 0.22 }}>
            <div style={{ marginBottom: "15px" }}>
              <InputField
                label={"Order Batch No."}
                labelWidth={"43%"}
                inputWidth={"58%"}
              />
            </div>
            <div>
              <InputField
                label={"Order No."}
                labelWidth={"43%"}
                inputWidth={"58%"}
              />
            </div>
          </div> */}
        </div>
      </div>

      {/* beneficiary details and instruction details    */}
      <div
        style={{ display: "flex", flex: 1, alignItems: "center" }}
        className="rounded h-auto pb-2 pt-2 px-2 mb-2 bg-white "
      >
        {/* ------------------------left------------------------------------------- */}
        <div style={{ flex: 0.6 }}>
          <div
            style={{ width: "100%", padding: "" }}
            className="wrapper rounded border-2"
          >
            {/* <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                color: "white",
                paddingLeft: "10px",
                flex: 1,
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
            >
              Beneficiary Details
            </span> */}
            <Header headerShade={true} title={"Beneficiary Details"} />

            <div style={{ padding: "4px 10px 10px 10px" }}>
              <div
                style={{
                  background: "",
                  marginTop: "5px",
                  marginBottom: "15px",
                }}
              >
                <ListOfValue
                  label={"Bank Code"}
                  labelWidth={"19%"}
                  inputWidth={"43%"}
                  data={bankCode}
                />
              </div>

              <div style={{ background: "", marginBottom: "15px" }}>
                <ListOfValue
                  label={"Branch Code"}
                  labelWidth={"19%"}
                  inputWidth={"43%"}
                  data={branchCode}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  background: "",
                  marginBottom: "15px",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 0.5, background: "" }}>
                  <InputField
                    label={"BBAN (Banks Customer)"}
                    labelWidth={"38%"}
                    inputWidth={"53.5%"}
                    required={true}
                  />
                </div>
                <div style={{ flex: 0.5, background: "" }}>
                  <div style={{ display: "flex", flex: 1 }}>
                    <div style={{ flex: 0.1, background: "" }}>
                      <div style={{ flex: 1 }}>
                        <ButtonComponent label={"Search"} buttonWidth={"100%"} />
                      </div>
                    </div>
                    <div style={{ flex: 0.9, background: "" }}>
                      <div style={{ flex: 1 }} className="ms-2">
                        <InputField inputWidth={"100%"} disabled={true} noMarginRight={true} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ background: "", marginBottom: "15px" }}>
                <InputField
                  label={"BBAN (Ex. Customer)"}
                  labelWidth={"19%"}
                  inputWidth={"26.7%"}
                  disabled={true}
                />
              </div>

              <div style={{ background: "", marginBottom: "15px" }}>
                <InputField
                  label={"A/C Name (Ex. Customer)"}
                  labelWidth={"19.5%"}
                  inputWidth={"81%"}
                  disabled={true}
                />
              </div>

              <div style={{ background: "", marginBottom: "15px" }}>
                <TextAreaField
                  label={"Narration"}
                  labelWidth={"19.3%"}
                  inputWidth={"80%"}
                  required={true}
                  rows={2}
                  cols={2}
                />
              </div>

              <div
                style={{
                  background: "",
                  display: "flex",
                  flex: 1,
                  marginBottom: "33px",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 0.5, background: "" }}>
                  <InputField
                    label={"Attach Doc"}
                    labelWidth={"37.5%"}
                    inputWidth={"54%"}
                    required={true}
                  />
                </div>
                <div style={{ flex: 0.44 }} className="">
                  <ButtonComponent label={"View Doc"} buttonWidth={"100px"} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------space--------------- */}
        <div style={{ flex: 0.0125 }}></div>

        {/* ------------------------right------------------------------------------- */}

        <div style={{ flex: 0.3875 }}>
          <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
            <div
              style={{ width: "100%", padding: "" }}
              className="wrapper rounded border-2 "
            >
              {/* <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  color: "white",
                  paddingLeft: "10px",
                  flex: 1,
                  background:
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`,
                }}
              >
                Instruction Details
              </span> */}
              <Header headerShade={true} title={"Instruction Details"} />

              <div style={{ padding: "4px 10px 10px 10px" }}>
                <div
                  style={{
                    background: "",
                    display: "flex",
                    flex: 1,
                    marginTop: "5px",
                    marginBottom: "15px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 0.7 }}>
                    <InputField
                      label={"Standing Amount"}
                      labelWidth={"40%"}
                      inputWidth={"55%"}
                      type={"number"}
                      required={true}
                    />
                  </div>
                  <div style={{ flex: 0.02 }}></div>
                  <div style={{ flex: 0.28 }}>
                    <ButtonType
                      label={"Available Balance"}
                      labelWidth={"70%"}
                      name={"availableBalance"}
                      type={"checkbox"}
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: "",
                    display: "flex",
                    flex: 1,
                    marginBottom: "15px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 0.7 }}>
                    <InputField
                      label={"Charge Account"}
                      labelWidth={"40%"}
                      inputWidth={"55%"}
                      type={"number"}
                      required={true}
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: "",
                    flex: 1,
                    marginBottom: "15px",
                  }}
                >
                  <InputField
                    label={"Charge A/C Name"}
                    labelWidth={"27.5%"}
                    inputWidth={"68%"}
                    disabled={true}
                  />
                </div>

                <div
                  style={{
                    background: "",
                    display: "flex",
                    flex: 1,
                    marginBottom: "15px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 0.7 }}>
                    <InputField
                      label={"Start Date"}
                      labelWidth={"40%"}
                      inputWidth={"55%"}
                      type={"date"}
                      required={true}
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: "",
                    display: "flex",
                    flex: 1,
                    marginBottom: "15px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 0.7 }}>
                    <InputField
                      label={"End Date"}
                      labelWidth={"40%"}
                      inputWidth={"55%"}
                      type={"date"}
                    />
                  </div>
                </div>

                <div
                  style={{
                    background: "",
                    flex: 1,
                    marginBottom: "15px",
                  }}
                >
                  <ListOfValue
                    label={"Frequency"}
                    labelWidth={"27.5%"}
                    inputWidth={"68%"}
                    required={true}
                    data={frequency}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div style={{ flex: 0.28, background: "" }}>
                    <Label
                      label={"Processing tries"}
                      labelWidth={"100%"}
                      fontSize={"85%"}
                    />
                  </div>
                  <div style={{ flex: 0.72, background: "", paddingLeft: "20px" }}>
                    <div
                      style={{ display: "flex", flex: 1, alignItems: "center" }}
                    >
                      <div style={{ flex: 0.3 }}>
                        <ButtonType
                          label={"Infinite"}
                          labelWidth={"100%"}
                          type={"radio"}
                          checked={selectedOption2 === "infinite"}
                          value1={"infinite"}
                          name={"processing tries"}
                          onChange={handleOptionChangeProcessingTries}
                          onClick={() => setFiniteState(false)}
                        />{" "}
                      </div>
                      <div style={{ flex: 0.3 }}>
                        <ButtonType
                          label={"Finite"}
                          labelWidth={"100%"}
                          type={"radio"}
                          checked={selectedOption2 === "finite"}
                          value1={"finite"}
                          name={"processing tries"}
                          onChange={handleOptionChangeProcessingTries}
                          onClick={() => setFiniteState(true)}
                        />{" "}
                      </div>

                      <div
                        style={{
                          display: finiteState ? "block" : "none",
                          flex: 0.3,
                        }}
                      >
                        <InputField
                          label={"No."}
                          labelWidth={"30%"}
                          inputWidth={"40%"}
                          type={"number"}
                        />
                      </div>
                    </div>
                  </div>
                </div>



                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    // marginBottom: "15px",
                  }}
                >
                  <div style={{ flex: 0.28, background: "" }}>
                    <Label
                      label={"Processing times"}
                      labelWidth={"100%"}
                      fontSize={"85%"}
                    />
                  </div>
                  <div style={{ flex: 0.72, background: "", paddingLeft: "20px" }}>
                    <div
                      style={{ display: "flex", flex: 1, alignItems: "center" }}
                    >
                      <div style={{ flex: 0.3 }}>
                        <ButtonType
                          label={"EOD"}
                          labelWidth={"100%"}
                          type={"radio"}
                          checked={selectedOption3 === "EOD"}
                          value1={"EOD"}
                          name={"processing times"}
                          onChange={handleOptionChangeProcessingTimes}
                          onClick={() => setIntraDayState(false)}
                        />{" "}
                      </div>
                      <div style={{ flex: 0.3 }}>
                        <ButtonType
                          label={"IntraDay"}
                          labelWidth={"100%"}
                          type={"radio"}
                          checked={selectedOption3 === "IntraDay"}
                          value1={"IntraDay"}
                          name={"processing times"}
                          onChange={handleOptionChangeProcessingTimes}
                          onClick={() => setIntraDayState(true)}
                        />{" "}
                      </div>
                      <div
                        style={{
                          display: intraDayState ? "block" : "none",
                          flex: 0.4,
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <SelectField
                            inputWidth={"90%"}
                            data={intraDayHours}
                          />
                          <span className="ms-1 me-2">:</span>
                          <SelectField
                            inputWidth={"90%"}
                            data={intraDayMinutes}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --------------------------------------- */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* insert button   */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ButtonComponent label={"Insert"} buttonIcon={<BiAddToQueue />} />
      </div>

      {/* table  */}
      <div style={{ marginTop: "10px" }}>
        <CustomTable
          headers={[
            "Order No",
            "Acount Number",
            "Account Name",
            "Due Amount",
            "Beneficiary Account",
            "Due To Start",
            "Frequency",
            "Action",
          ]}
        />
      </div>
    </div>
  );
}
