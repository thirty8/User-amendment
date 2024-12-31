import React, { useState, useEffect } from "react";
import ListOfValue from "../fields/ListOfValue";
import InputField from "../fields/InputField";
import SelectField from "../fields/SelectField";
import Label from "../label/Label";
import DataTable from "../data-table/DataTable";
import HeaderComponent from "../header/HeaderComponent";
import { Radio, Group } from "@mantine/core";
import ButtonComponent from "../button/ButtonComponent";
import TextAreaField from "../fields/TextArea";
import { API_SERVER } from "../../../../../../../../../config/constant";
import axios from "axios";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import CustomTable from "../../../teller-ops/teller/components/CustomTable";

function ArrowStepper({ selectedOption }) {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key": process.env.REACT_APP_API_KEY,
    "Content-Type": "application/json",
  };

  var chargeArr = [
    [
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
    ],
  ];

  var documentArr = [
    [
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex" }}>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
  ];

  var collateralArr = [
    [
      <div>
        <ButtonComponent
          label={"x"}
          // buttonBackgroundColor={"black"}
          background={
            `url(` +
            window.location.origin +
            `/assets/images/headerBackground/` +
            getTheme.theme.headerImage +
            `)`
          }
          buttonHeight={"27px"}
          buttonWidth={"30px"}
          buttonColor={"red"}
        />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonComponent
          label={"..."}
          // buttonBackgroundColor={"black"}
          background={
            `url(` +
            window.location.origin +
            `/assets/images/headerBackground/` +
            getTheme.theme.headerImage +
            `)`
          }
          buttonHeight={"27px"}
          buttonWidth={"30px"}
          buttonColor={"white"}
        />
      </div>,
    ],
  ];

  var guarantorArr = [[]];

  const [lovFacilityTypeCategory, setLovFacilityTypeCategory] = useState([]);
  const [facilityTypeCategory, setFacilityTypeCategory] = useState();

  const [lovLoanProducts, setLovLoanProducts] = useState([]);
  const [loanProducts, setLoanProducts] = useState();

  const [lovInterestType, setLovInterestType] = useState([]);
  const [interestType, setInterestType] = useState();

  const [lovPrincipalRepayFreq, setLovPrincipalRepayFreq] = useState([]);
  const [principalRepayFreq, setPrincipalRepayFreq] = useState();

  const [lovInterestRepayFreq, setLovInterestRepayFreq] = useState([]);
  const [interestRepayFreq, setInterestRepayFreq] = useState();

  const [lovIntroSource, setLovIntroSource] = useState([]);
  const [introSource, setIntroSource] = useState();

  const [lovDealerCode, setLovDealerCode] = useState([]);
  const [dealerCode, setDealerCode] = useState();

  const [lovPurpose, setLovPurpose] = useState([]);
  const [purpose, setPurpose] = useState();

  const [lovSector, setLovSector] = useState([]);
  const [sector, setSector] = useState([]);

  const [lovSubSector, setLovSubSector] = useState([]);
  const [subSector, setSubSector] = useState();

  const [lovStaff, setLovStaff] = useState([]);
  const [staff, setStaff] = useState();

  async function handleSector(value) {
    let response = await axios.post(
      API_SERVER + "/api/get-sub-sector",
      { sector: value },
      {
        headers,
      }
    );
    // response = await response();
    // console.log(response);
    setLovSubSector(response.data);
  }

  useEffect(() => {
    async function getLoanProducts() {
      let response = await fetch(API_SERVER + "/api/get-loan-products", {
        headers,
      });
      response = await response.json();
      setLovLoanProducts(response);
      // console.log(response);
    }

    async function getInterestType() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRT" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovInterestType(response.data);
    }

    async function getPrincipalRepayFreq() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovPrincipalRepayFreq(response.data);
    }

    async function getInterestRepayFreq() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LRP" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovInterestRepayFreq(response.data);
    }

    async function getIntroSource() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "INT" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovIntroSource(response.data);
    }

    async function getPurpose() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "PUR" },
        {
          headers,
        }
      );
      // response = await response();
      // console.log(response);
      setLovPurpose(response.data);
    }

    async function getSector() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "MAS" },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setLovSector(response.data);
    }

    async function getFacilityType() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "LTC" },
        {
          headers,
        }
      );
      // response = await response();
      //  console.log(response);
      setLovFacilityTypeCategory(response.data);
    }

    async function getDealerCode() {
      let response = await fetch(API_SERVER + "/api/get-dealer-code", {
        headers,
      });
      response = await response.json();
      setLovDealerCode(response);
      // console.log(response);
    }

    getLoanProducts();
    getInterestType();
    getPrincipalRepayFreq();
    getIntroSource();
    getInterestRepayFreq();
    getPurpose();
    getDealerCode();
    getSector();
    getFacilityType();
  }, []);

  useEffect(() => {
    async function getStaff() {
      let response = await fetch(API_SERVER + "/api/get-staff", {
        headers,
      });
      response = await response.json();
      setLovStaff(response);
      // console.log(response);
    }

    getStaff();
  }, []);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClick = (index) => {
    setActiveStep(index);
  };

  const steps = [
    {
      count: 1,
      number: "General",
      content: (
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              flex: "0.55",
              padding: "10px",
              border: "none",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              backgroundColor: "white",
              borderRadius: "5px",
              border: "1px solid #cbd4d8",
            }}
          >
            <div
              style={{
                padding: "5px",
                borderRadius: "3px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
              }}
            >
              {selectedOption === "16" ? (
                <div>
                  <ListOfValue
                    label={"Loan Product"}
                    labelWidth={"30%"}
                    inputWidth={"50%"}
                    required
                    lovdata={lovLoanProducts}
                  />
                </div>
              ) : (
                <div>
                  <InputField
                    label={"Source of Payment"}
                    labelWidth={"30%"}
                    inputWidth={"50%"}
                    required
                  />
                </div>
              )}
              <div style={{ marginTop: "-8px" }}>
                <ListOfValue
                  label={"Facility Type Category"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                  lovdata={lovFacilityTypeCategory}
                />
              </div>
              {/* <div style={{ marginTop: "20px" }}>
              <InputField
                label={"Currency"}
                labelWidth={"35%"}
                inputWidth={"15%"}
                required
                disabled
              />
            </div> */}
              <div style={{ marginTop: "-8px" }}>
                <InputField
                  label={"Requested Amount"}
                  labelWidth={"30%"}
                  inputWidth={"20%"}
                  required
                  textAlign={"right"}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  flex: 0.6,
                  padding: "5px",
                  borderRadius: "3px",
                  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                  backgroundColor: "white",
                  height: "130px",
                  border: "0.5px solid #e0dfe0",
                }}
              >
                <div>
                  <InputField
                    label={"Number of Tranches"}
                    labelWidth={"50%"}
                    inputWidth={"17%"}
                    required
                    disabled={selectedOption === "02"}
                  />
                </div>
                <div style={{ marginTop: "-8px" }}>
                  <InputField
                    label={"Reference Number"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    // marginBottom: "-17px",
                    marginTop: "-8px",
                  }}
                >
                  <div style={{ flex: 0.7, marginTop: "-15px" }}>
                    <InputField
                      label={"Disbursement Accounts"}
                      labelWidth={"74%"}
                      inputWidth={"24%"}
                      // fontSize={"85%"}
                      disabled={selectedOption === "02"}
                    />
                  </div>
                  <div style={{ flex: 0.3, marginTop: "-1px" }}>
                    <ButtonComponent
                      label={"Add"}
                      // buttonBackgroundColor={"black"}
                      background={
                        selectedOption === "02"
                          ? "grey"
                          : `url(` +
                            window.location.origin +
                            `/assets/images/headerBackground/` +
                            getTheme.theme.headerImage +
                            `)`
                      }
                      buttonHeight={"29px"}
                      buttonWidth={"110px"}
                      buttonColor={"white"}
                      disabled={selectedOption === "02"}
                    />
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div
              style={{
                padding: "5px",
                borderRadius: "3px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
                marginTop: "10px",
              }}
            >
              <div>
                <ListOfValue
                  label={"Intro Source"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                  lovdata={lovIntroSource}
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <ListOfValue
                  label={"Dealer Code"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  lovdata={lovDealerCode}
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <ListOfValue
                  label={"Purpose"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                  lovdata={lovPurpose}
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <TextAreaField label={"Other Purpose"} labelWidth={"30%"} />
              </div>
            </div>
            <div
              style={{
                padding: "5px",
                borderRadius: "3px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
                marginTop: "10px",
              }}
            >
              <div>
                <ListOfValue
                  label={"Sector"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                  lovdata={lovSector}
                  onChange={handleSector}
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <ListOfValue
                  label={"Sub Sector"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                  lovdata={lovSubSector}
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <ListOfValue
                  label={"Sales/Intro Staff"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                  lovdata={lovStaff}
                />
              </div>
            </div>
            <div
              style={{
                padding: "5px",
                borderRadius: "3px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
                marginTop: "10px",
              }}
            >
              <div style={{}}>
                <InputField
                  label={"Moratorium Period"}
                  labelWidth={"30%"}
                  inputWidth={"20%"}
                  required
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <SelectField
                  label={"With Interest"}
                  labelWidth={"30%"}
                  inputWidth={"20%"}
                  lovdata={[
                    { label: "Yes", value: "Y" },
                    { label: "No", value: "N" },
                  ]}
                />
              </div>
            </div>
            {/* <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Interest Rate"}
                  labelWidth={"30%"}
                  inputWidth={"15%"}
                />
              </div> */}
          </div>
          <div
            style={{
              flex: "0.45",
              padding: "10px",
              border: "none",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              backgroundColor: "#f1f1f6",
              borderRadius: "5px",
              border: "1px solid #cbd4d8",
            }}
          >
            <div
              style={{
                padding: "10px",
                borderRadius: "3px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
                marginBottom: "10px",
              }}
            >
              <div style={{ borderBottom: "1px solid" }}>
                <h6>Loan Plan</h6>
              </div>
              {selectedOption === "16" ? (
                <div style={{ display: "flex", marginBottom: "-22px" }}>
                  <div style={{ flex: 0.65 }}>
                    <InputField
                      label={"Interest Rate P.M / P.A"}
                      labelWidth={"70%"}
                      inputWidth={"30%"}
                      disabled={selectedOption === "02"}
                      // fontSize={"85%"}
                    />
                  </div>
                  <div style={{ flex: 0.35 }}>
                    <InputField
                      inputWidth={"59%"}
                      disabled={selectedOption === "02"}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <div style={{ display: "flex", marginBottom: "-22px" }}>
                <div style={{ flex: 0.65 }}>
                  <InputField
                    label={"Effective Interest Rate (P.M / P.A)"}
                    labelWidth={"70%"}
                    inputWidth={"30%"}
                    // fontSize={"85%"}
                    disabled={selectedOption === "02"}
                  />
                </div>
                <div style={{ flex: 0.35 }}>
                  <InputField inputWidth={"59%"} />
                </div>
              </div>
              <div style={{}}>
                <InputField
                  label={"Tenor (Months)"}
                  labelWidth={"44%"}
                  inputWidth={"20%"}
                  required
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <ListOfValue
                  label={"Interest Type"}
                  labelWidth={"44%"}
                  inputWidth={"45%"}
                  lovdata={lovInterestType}
                  disabled={selectedOption === "02"}
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <ListOfValue
                  label={"Principal Repay Freq."}
                  labelWidth={"44%"}
                  inputWidth={"45%"}
                  lovdata={lovPrincipalRepayFreq}
                  disabled={selectedOption === "02"}
                />
              </div>
              <div style={{ marginTop: "-8px" }}>
                <ListOfValue
                  label={"Interest Repay Freq."}
                  labelWidth={"44%"}
                  inputWidth={"45%"}
                  lovdata={lovInterestRepayFreq}
                  disabled={selectedOption === "02"}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "-22px",
                  marginTop: "-21px",
                }}
              >
                <div style={{ flex: 0.65 }}>
                  <InputField
                    label={"Principal Count / Interest Count"}
                    labelWidth={"70%"}
                    inputWidth={"30%"}
                    disabled={selectedOption === "02"}
                    // fontSize={"85%"}
                  />
                </div>
                <div style={{ flex: 0.35 }}>
                  <InputField
                    inputWidth={"59%"}
                    disabled={selectedOption === "02"}
                  />
                </div>
              </div>
              {selectedOption === "16" ? (
                <div style={{}}>
                  <SelectField
                    label={"Apply Exempt Months"}
                    labelWidth={"44%"}
                    inputWidth={"20%"}
                    lovdata={[
                      { label: "Yes", value: "Y" },
                      { label: "No", value: "N" },
                    ]}
                  />
                </div>
              ) : (
                <div style={{}}>
                  <SelectField
                    label={"Interest Date Option"}
                    labelWidth={"44%"}
                    inputWidth={"45%"}
                    lovdata={[
                      { label: "Fixed Interest Rate", value: "fixed" },
                      { label: "Variable Interest Rate", value: "variable" },
                    ]}
                  />
                </div>
              )}
              <div style={{ marginTop: "-8px" }}>
                <SelectField
                  label={"Last Working Day"}
                  labelWidth={"44%"}
                  inputWidth={"20%"}
                  lovdata={[
                    { label: "Yes", value: "Y" },
                    { label: "No", value: "N" },
                  ]}
                  disabled={selectedOption === "02"}
                />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <div>
                <ButtonComponent
                  label={"Preview Schedule"}
                  // buttonBackgroundColor={"orange"}

                  background={
                    selectedOption === "02"
                      ? "grey"
                      : `url(` +
                        window.location.origin +
                        `/assets/images/headerBackground/` +
                        getTheme.theme.headerImage +
                        `)`
                  }
                  buttonColor={"white"}
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  disabled={selectedOption === "02"}
                />
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              {/* <DataTable columns={["Charges", "%", "Fee Amount"]} /> */}
              <CustomTable
                headers={["Charges", "%", "Fee Amount"]}
                data={chargeArr}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      count: 2,
      number: "Tranches",
      content: (
        <div style={{ padding: "10px" }}>
          {/* <div>
            <HeaderComponent title={"Syndicate Tranches"} />
          </div>
          <br />
          <div style={{ padding: "60px" }}>
            <DataTable
              columns={["Seq. Number", "Narration", "Due Date", "%", "Amount"]}
            />
          </div> */}
          <div
            style={{
              height: "45px",
              width: "100%",
              padding: "10px",
              borderRadius: "3px",
              fontSize: "16px",

              color: "white",
              background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
            }}
          >
            <div>Syndicate Tranches</div>
          </div>
          <div style={{ padding: "60px" }}>
            <div
              style={{
                height: "40px",
                width: "100%",
                display: "flex",
                padding: "10px",
                borderRadius: "3px",
                color: "white",
                background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
              }}
            >
              <div style={{ flex: 0.1, marginLeft: "70px" }}>Seq Number</div>
              <div style={{ flex: 0.4, marginLeft: "270px" }}>Narration</div>
              <div style={{ flex: 0.2 }}>Due Date</div>
              <div style={{ flex: 0.14 }}>%</div>
              <div style={{ flex: 0.1 }}>Amount</div>
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
              <div style={{ marginTop: "3px" }}>
                <ButtonComponent
                  label={"X"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
              <div style={{ marginTop: "-10px", marginRight: "" }}>
                <InputField inputWidth={"120px"} disabled />
              </div>
              <div style={{ marginTop: "-10px" }}>
                <InputField inputWidth={"500px"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"150px"} type={"date"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"100px"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"110px"} />
              </div>
              <div style={{ marginTop: "3px" }}>
                <ButtonComponent
                  label={"+"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginTop: "3px" }}>
                <ButtonComponent
                  label={"X"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
              <div style={{ marginTop: "-10px", marginRight: "" }}>
                <InputField inputWidth={"120px"} disabled />
              </div>
              <div style={{ marginTop: "-10px" }}>
                <InputField inputWidth={"500px"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"150px"} type={"date"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"100px"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"110px"} />
              </div>
              <div style={{ marginTop: "3px" }}>
                <ButtonComponent
                  label={"+"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginTop: "3px" }}>
                <ButtonComponent
                  label={"X"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
              <div style={{ marginTop: "-10px", marginRight: "" }}>
                <InputField inputWidth={"120px"} disabled />
              </div>
              <div style={{ marginTop: "-10px" }}>
                <InputField inputWidth={"500px"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"150px"} type={"date"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"100px"} />
              </div>
              <div style={{ marginTop: "-10px", marginLeft: "-5px" }}>
                <InputField inputWidth={"110px"} />
              </div>
              <div style={{ marginTop: "3px" }}>
                <ButtonComponent
                  label={"+"}
                  buttonBackgroundColor={"#dbdcdc"}
                  buttonColor={"red"}
                  buttonHeight={"27px"}
                  buttonWidth={"40px"}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                border: "0.5px solid #e0dfe0",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
            >
              <div style={{ flex: 0.2 }}>
                <InputField
                  label={"Count"}
                  disabled
                  inputWidth={"95px"}
                  labelWidth={"30%"}
                />
              </div>
              <div style={{ flex: 0.45 }}>
                <InputField
                  label={"Difference (Loan Amount - Total Amount)"}
                  labelWidth={"50%"}
                  inputWidth={"190px"}
                  disabled
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 0.3,
                }}
              >
                <div style={{ flex: 0.65 }}>
                  <InputField
                    label={"Total"}
                    labelWidth={"50%"}
                    inputWidth={"50%"}
                    disabled
                    // fontSize={"85%"}
                  />
                </div>
                <div style={{ flex: 0.35 }}>
                  <InputField inputWidth={"100%"} disabled />
                </div>
              </div>
            </div>
          </div>
          <br />
          {/* <br /> */}
          <div>
            <ButtonComponent
              label={"Add Comments"}
              // buttonBackgroundColor={"black"}
              background={
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`
              }
              buttonHeight={"50px"}
              buttonWidth={"150px"}
              buttonColor={"white"}
            />
          </div>
        </div>
      ),
    },
    {
      count: 3,
      number: "Financials",
      content: (
        <div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 0.6 }}>
              <div>
                {/* <DataTable
                  columns={[
                    "Income Details (Individual)",
                    "Income Amount",
                    "Amount to Consider",
                  ]}
                /> */}
                <div
                  style={{
                    height: "40px",
                    width: "100%",
                    display: "flex",
                    padding: "10px",
                    borderRadius: "3px",
                    color: "white",
                    background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
                  }}
                >
                  <div style={{ flex: 0.5 }}>Income Details (individual)</div>
                  <div style={{ flex: 0.25 }}>Income Amount</div>
                  <div style={{ flex: 0.25 }}>Amount to Consider</div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 0.4 }}>
                    <ListOfValue inputWidth={"300px"} />
                  </div>
                  <div style={{ flex: 0.25 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ flex: 0.3 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ marginTop: "14px", flex: 0.05 }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div style={{ flex: 0.4 }}>
                    <ListOfValue inputWidth={"300px"} />
                  </div>
                  <div style={{ flex: 0.25 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ flex: 0.3 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ marginTop: "14px", flex: 0.05 }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div style={{ flex: 0.4 }}>
                    <ListOfValue inputWidth={"300px"} />
                  </div>
                  <div style={{ flex: 0.25 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ flex: 0.3 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ marginTop: "14px", flex: 0.05 }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div style={{ flex: 0.9 }}></div>
                  <div>
                    <InputField
                      label={"Total Income"}
                      labelWidth={"53%"}
                      inputWidth={"252px"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: 0.4 }}>
              <div>
                {/* <DataTable
                  columns={["Asset Details (Individuals)", "Amount"]}
                /> */}
                <div
                  style={{
                    height: "40px",
                    width: "100%",
                    display: "flex",
                    padding: "10px",
                    borderRadius: "3px",
                    color: "white",
                    background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
                  }}
                >
                  <div style={{ flex: 0.72 }}>Asset Details (individual)</div>
                  <div style={{ flex: 0.25 }}>Amount</div>
                </div>
                <div style={{ display: "flex" }}>
                  <div>
                    <ListOfValue inputWidth={"280px"} />
                  </div>
                  <div>
                    <InputField inputWidth={"150px"} />
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div>
                    <ListOfValue inputWidth={"280px"} />
                  </div>
                  <div>
                    <InputField inputWidth={"150px"} />
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div>
                    <ListOfValue inputWidth={"280px"} />
                  </div>
                  <div>
                    <InputField inputWidth={"150px"} />
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "-25px", display: "flex" }}>
                  <div style={{ flex: 0.4 }}></div>
                  <div style={{ flex: 0.6 }}>
                    <InputField
                      disabled
                      label={"Total Asset"}
                      labelWidth={"34%"}
                      inputWidth={"150px"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 0.6 }}>
              <div>
                {/* <DataTable
                  columns={[
                    "Expenditure and Other Contributions (Individual)",
                    "Amount",
                  ]}
                /> */}
                <div
                  style={{
                    height: "40px",
                    width: "100%",
                    display: "flex",
                    padding: "10px",
                    borderRadius: "3px",
                    color: "white",
                    background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
                  }}
                >
                  <div style={{ flex: 0.79 }}>
                    Expenditure and Other Contributions (individual)
                  </div>
                  {/* <div style={{ flex: 0.25 }}>Income Amount</div> */}
                  <div style={{ flex: 0.21 }}>Amount</div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 0.65 }}>
                    <ListOfValue inputWidth={"530px"} />
                  </div>
                  <div style={{ flex: 0.3 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ marginTop: "14px", flex: 0.05 }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div style={{ flex: 0.65 }}>
                    <ListOfValue inputWidth={"530px"} />
                  </div>
                  <div style={{ flex: 0.3 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ marginTop: "14px", flex: 0.05 }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div style={{ flex: 0.65 }}>
                    <ListOfValue inputWidth={"530px"} />
                  </div>
                  <div style={{ flex: 0.3 }}>
                    <InputField inputWidth={"200px"} />
                  </div>
                  <div style={{ marginTop: "14px", flex: 0.05 }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div style={{ flex: 0.9 }}></div>
                  <div>
                    <InputField
                      label={"Total Expenditure"}
                      labelWidth={"53%"}
                      inputWidth={"252px"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: 0.4 }}>
              <div>
                {/* <DataTable
                  columns={["Liability Details (Individuals)", "Amount"]}
                /> */}
                <div
                  style={{
                    height: "40px",
                    width: "100%",
                    display: "flex",
                    padding: "10px",
                    borderRadius: "3px",
                    color: "white",
                    background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
                  }}
                >
                  <div style={{ flex: 0.72 }}>
                    Liability Details (individual)
                  </div>
                  <div style={{ flex: 0.25 }}>Amount</div>
                </div>
                <div style={{ display: "flex" }}>
                  <div>
                    <ListOfValue inputWidth={"280px"} />
                  </div>
                  <div>
                    <InputField inputWidth={"150px"} />
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div>
                    <ListOfValue inputWidth={"280px"} />
                  </div>
                  <div>
                    <InputField inputWidth={"150px"} />
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "-25px" }}>
                  <div>
                    <ListOfValue inputWidth={"280px"} />
                  </div>
                  <div>
                    <InputField inputWidth={"150px"} />
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <ButtonComponent
                      label={"x"}
                      buttonBackgroundColor={"#dbdcdc"}
                      buttonColor={"red"}
                      buttonHeight={"27px"}
                      buttonWidth={"40px"}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "-25px", display: "flex" }}>
                  <div style={{ flex: 0.4 }}></div>
                  <div style={{ flex: 0.6 }}>
                    <InputField
                      disabled
                      label={"Total Liability:"}
                      labelWidth={"34%"}
                      inputWidth={"150px"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 0.6 }}>
              <div style={{ borderBottom: "1px solid black" }}>
                {/* <DataTable
                  columns={[
                    "Facility Type",
                    "Account Number",
                    "CCY",
                    "Facility Amount",
                    "Installment",
                    "Expiry Date",
                  ]}
                /> */}
                Existing Facilities (This Bank)
              </div>
              <div
                style={{
                  height: "40px",
                  marginTop: "5px",
                  width: "100%",
                  display: "flex",
                  padding: "10px",
                  borderRadius: "3px",
                  color: "white",
                  background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
                }}
              >
                <div style={{ flex: 0.19 }}>Facility Type</div>
                <div style={{ flex: 0.2 }}>Amount Number</div>
                <div style={{ flex: 0.09 }}>CCY</div>
                <div style={{ flex: 0.2 }}>Facility Amount</div>
                <div style={{ flex: 0.15 }}>Installment</div>
                <div style={{ flex: 0.1 }}>Expiry Date</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 0.15 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ flex: 0.1 }}>
                  <InputField inputWidth={"150px"} />
                </div>
                <div style={{ flex: 0.1, marginLeft: "-12px" }}>
                  <InputField inputWidth={"50px"} />
                </div>
                <div style={{ flex: 0.2, marginLeft: "-5px" }}>
                  <InputField inputWidth={"130px"} />
                </div>
                <div style={{ flex: 0.2 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ flex: 0.1 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ marginTop: "14px" }}>
                  <ButtonComponent
                    label={">"}
                    buttonBackgroundColor={"white"}
                    buttonColor={"white"}
                    buttonHeight={"27px"}
                    buttonWidth={"40px"}
                  />
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "-25px" }}>
                <div style={{ flex: 0.15 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ flex: 0.1 }}>
                  <InputField inputWidth={"150px"} />
                </div>
                <div style={{ flex: 0.1, marginLeft: "-12px" }}>
                  <InputField inputWidth={"50px"} />
                </div>
                <div style={{ flex: 0.2, marginLeft: "-5px" }}>
                  <InputField inputWidth={"130px"} />
                </div>
                <div style={{ flex: 0.2 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ flex: 0.1 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ marginTop: "14px" }}>
                  <ButtonComponent
                    label={">"}
                    buttonBackgroundColor={"white"}
                    buttonColor={"white"}
                    buttonHeight={"27px"}
                    buttonWidth={"40px"}
                  />
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "-25px" }}>
                <div style={{ flex: 0.15 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ flex: 0.1 }}>
                  <InputField inputWidth={"150px"} />
                </div>
                <div style={{ flex: 0.1, marginLeft: "-12px" }}>
                  <InputField inputWidth={"50px"} />
                </div>
                <div style={{ flex: 0.2, marginLeft: "-5px" }}>
                  <InputField inputWidth={"130px"} />
                </div>
                <div style={{ flex: 0.2 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ flex: 0.1 }}>
                  <InputField inputWidth={"100px"} />
                </div>
                <div style={{ marginTop: "14px" }}>
                  <ButtonComponent
                    label={">"}
                    buttonBackgroundColor={"white"}
                    buttonColor={"white"}
                    buttonHeight={"27px"}
                    buttonWidth={"40px"}
                  />
                </div>
              </div>
              <div style={{ marginTop: "-20px", display: "flex" }}>
                <div style={{ flex: 0.4 }}></div>
                <div style={{ flex: 0.6 }}>
                  <InputField
                    disabled
                    label={"Total Monthly Installment:"}
                    labelWidth={"43%"}
                    inputWidth={"150px"}
                  />
                </div>
              </div>
            </div>
            <div style={{ flex: 0.4 }}>
              <div style={{ borderBottom: "1px solid black" }}>
                Existing Facilities (Other Bank)
              </div>
              <div
                style={{
                  height: "40px",
                  marginTop: "5px",
                  width: "100%",
                  display: "flex",
                  padding: "10px",
                  borderRadius: "3px",
                  justifyContent: "space-between",
                  color: "white",
                  background: `url(${window.location.origin}/assets/images/headerBackground/${getTheme.theme.headerImage})`,
                }}
              >
                <div></div>
                <div>Bank Code</div>
                <div>Amount Granted</div>
                <div>Monthly Amount</div>
                <div>Date Granted</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "14px" }}>
                  <ButtonComponent
                    label={"+"}
                    buttonBackgroundColor={"white"}
                    buttonColor={"white"}
                    buttonHeight={"27px"}
                    buttonWidth={"30px"}
                  />
                </div>
                <div>
                  <InputField inputWidth={"90px"} />
                </div>
                <div style={{ marginLeft: "-10px" }}>
                  <InputField inputWidth={"90px"} />
                </div>
                <div>
                  <InputField inputWidth={"90px"} />
                </div>
                <div>
                  <InputField type={"date"} inputWidth={"100px"} />
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "-25px" }}>
                <div style={{ marginTop: "14px" }}>
                  <ButtonComponent
                    label={"+"}
                    buttonBackgroundColor={"white"}
                    buttonColor={"white"}
                    buttonHeight={"27px"}
                    buttonWidth={"30px"}
                  />
                </div>
                <div>
                  <InputField inputWidth={"90px"} />
                </div>
                <div style={{ marginLeft: "-10px" }}>
                  <InputField inputWidth={"90px"} />
                </div>
                <div>
                  <InputField inputWidth={"90px"} />
                </div>
                <div>
                  <InputField type={"date"} inputWidth={"100px"} />
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "-25px" }}>
                <div style={{ marginTop: "14px" }}>
                  <ButtonComponent
                    label={"+"}
                    buttonBackgroundColor={"white"}
                    buttonColor={"white"}
                    buttonHeight={"27px"}
                    buttonWidth={"30px"}
                  />
                </div>
                <div>
                  <InputField inputWidth={"90px"} />
                </div>
                <div style={{ marginLeft: "-10px" }}>
                  <InputField inputWidth={"90px"} />
                </div>
                <div>
                  <InputField inputWidth={"90px"} />
                </div>
                <div>
                  <InputField type={"date"} inputWidth={"100px"} />
                </div>
              </div>
              <div style={{ marginTop: "-20px", display: "flex" }}>
                <div style={{ flex: 0.2 }}></div>
                <div style={{ flex: 0.8 }}>
                  <InputField
                    disabled
                    label={"Total Monthly Installment:"}
                    labelWidth={"43%"}
                    inputWidth={"150px"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              border: "2px solid #d6d7d9",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "white",
              width: "35%",
            }}
          >
            <div>
              <InputField
                label={"Total Monthly Income"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
              />
            </div>
            <div>
              <InputField
                label={"Requested Loan Installment"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
              />
            </div>
            <div>
              <InputField
                label={"Total Monthly Expenditure"}
                labelWidth={"50%"}
                inputWidth={"40%"}
                disabled
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      count: 4,
      number: "Employment",
      content: (
        <div>
          <div>
            <HeaderComponent
              title={"Employment Details"}
              backgroundColor={"orange"}
              height={"35px"}
              color={"white"}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <div
              style={{
                flex: 0.6,
                padding: "10px",
                borderRadius: "5px",
                border: "1.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
              }}
            >
              <div>
                <SelectField
                  label={"Employment Category"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <ListOfValue
                  label={"Employment Type"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Employer"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Others"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Position Held"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Employed Since"}
                  labelWidth={"30%"}
                  inputWidth={"25%"}
                  required
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Date of Commencement"}
                  labelWidth={"30%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Date of Exited"}
                  labelWidth={"30%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Address 1"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Address 2"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Email Address"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                />
              </div>
            </div>
            <div
              style={{
                flex: 0.4,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "1.5px solid #d6d7d9",
              }}
            >
              <div>
                <InputField
                  label={"Phone 1"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Phone 2"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div>
                <InputField
                  label={"Location"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div>
                <ListOfValue
                  label={"City"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                  required
                />
              </div>
              {/* <div style={{ display: "flex" }}>
                <div style={{ marginTop: "-5px" }}>
                  <Label label={"Fixed Term Contract"} />
                </div>
                <div style={{ marginLeft: "30px", marginTop: "-15px" }}>
                  <Radio.Group>
                    <Group mt="xs">
                      <Radio value="yes" label="Yes" color={"orange"} />
                      <Radio value="no" label="No" color={"orange"} />
                    </Group>
                  </Radio.Group>
                </div>
              </div> */}
              <div
                style={{
                  display: "flex",
                  marginTop: "-15px",
                  marginBottom: "-15px",
                }}
              >
                <div style={{ marginRight: "45px" }}>
                  <Label label={"Fixed Term Contract"} fontSize={"85%"} />
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div style={{ marginRight: "20px" }}>
                    <ButtonType label={"Yes"} type={"radio"} name={"Y"} />
                  </div>
                  <div>
                    <ButtonType label={"No"} type={"radio"} name={"Y"} />
                  </div>
                </div>
              </div>
              <div>
                <InputField
                  label={"Employment Number"}
                  labelWidth={"35%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Department"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div>
                <InputField
                  label={"Salary Day"}
                  labelWidth={"35%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Fax Number"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <div>
                <InputField
                  label={"Landmark"}
                  labelWidth={"35%"}
                  inputWidth={"55%"}
                />
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div></div>
                <div>
                  <ButtonComponent
                    label={"Save"}
                    // buttonBackgroundColor={"black"}
                    background={
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`
                    }
                    buttonHeight={"40px"}
                    buttonWidth={"100px"}
                    buttonColor={"white"}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <CustomTable
            headers={[
              "Employment Category",
              "Customer Number",
              "Address",
              "Position Held",
              "Employed Since",
              "City",
              "Phone",
              "",
            ]}
          />
        </div>
      ),
    },
    {
      count: 5,
      number: "Guarantors",
      content: (
        <div>
          <div>
            <HeaderComponent
              title={"Guarantors"}
              backgroundColor={"orange"}
              height={"35px"}
              color={"white"}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <div
              style={{
                flex: 0.5,
                padding: "10px",
                borderRadius: "5px",
                border: "1.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
              }}
            >
              <div>
                <SelectField
                  label={"Guarantor Type"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Account with Bank"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Name"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <ListOfValue
                  label={"Guarantor's ID Type"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"ID Number"}
                  labelWidth={"35%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"ID Issue Date"}
                  labelWidth={"35%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"ID Expiry Date"}
                  labelWidth={"35%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <ListOfValue
                  label={"Relation to Borrower"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Date of Incorperation/Birth"}
                  labelWidth={"35%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Place of Birth"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
            </div>
            <div
              style={{
                flex: 0.5,
                padding: "10px",
                borderRadius: "5px",
                border: "1.5px solid #d6d7d9",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
              }}
            >
              <div>
                <InputField
                  label={"Residential Address / Business Location"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Postal / Digital Address"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Residence Since"}
                  labelWidth={"45%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Phone Number"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                  required
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Occupation / Employer"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Residential Address / Business Location"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Employed Since"}
                  labelWidth={"45%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Position"}
                  labelWidth={"45%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"End of Service Benefit"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Guarantor's Net Monthly Income"}
                  labelWidth={"45%"}
                  inputWidth={"25%"}
                />
              </div>
              <div>
                <InputField
                  label={"Email"}
                  labelWidth={"45%"}
                  inputWidth={"50%"}
                />
              </div>
            </div>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <ButtonComponent
                label={"Add Comments"}
                // buttonBackgroundColor={"black"}
                background={
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`
                }
                buttonHeight={"40px"}
                buttonWidth={"150px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Clear"}
                // buttonBackgroundColor={"black"}
                background={
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`
                }
                buttonHeight={"40px"}
                buttonWidth={"100px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Save"}
                // buttonBackgroundColor={"black"}
                background={
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`
                }
                buttonHeight={"40px"}
                buttonWidth={"100px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Send Email"}
                // buttonBackgroundColor={"black"}
                background={
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`
                }
                buttonHeight={"40px"}
                buttonWidth={"150px"}
                buttonColor={"white"}
              />
            </div>
            <div>
              <ButtonComponent
                label={"Send SMS"}
                // buttonBackgroundColor={"black"}
                background={
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`
                }
                buttonHeight={"40px"}
                buttonWidth={"150px"}
                buttonColor={"white"}
              />
            </div>
          </div>
          <br />
          <div>
            {/* <DataTable
              columns={[
                "Guarantor's ID Applicant Number",
                "Guarantor's Name",
                "Postal Address",
                "Guarantor Contact",
              ]}
            /> */}
            <CustomTable
              headers={[
                "",
                "Guarantors ID Applicant No",
                "Guarantors Name",
                "Postal Address",
                "Guarantor Contact",
                "",
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      count: 6,
      number: "Document",
      content: (
        <div>
          <div>
            {/* <DataTable
              columns={[
                "Seq Number",
                "Document Type",
                "Presented Document",
                "Scan Document Number",
                "Scan Date",
                "Document Expiry Date",
                "Mand",
                "Received Date",
              ]}
            /> */}
            <CustomTable
              headers={[
                "Seq Number",
                "Document Type",
                "Presented Document",
                "Scan Document Number",
                "Scan Date",
                "Expiry Date",
                "Mand",
                "Received Date",
                "",
              ]}
              data={documentArr}
            />
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.2 }}></div>
            <div style={{ display: "flex", flex: 0.6, gap: "40px" }}>
              <div>
                <ButtonComponent
                  label={"Add Comments"}
                  // buttonBackgroundColor={"black"}
                  background={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Add Other Documents"}
                  // buttonBackgroundColor={"black"}
                  background={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                  buttonHeight={"40px"}
                  buttonWidth={"200px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Account Creation Document Details"}
                  // buttonBackgroundColor={"black"}
                  background={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                  buttonHeight={"40px"}
                  buttonWidth={"290px"}
                  buttonColor={"white"}
                />
              </div>
            </div>
            <div style={{ flex: 0.2 }}></div>
          </div>
        </div>
      ),
    },
    {
      count: 7,
      number: "Collateral",
      content: (
        <div>
          <div
            style={{
              display: "flex",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              backgroundColor: "white",
            }}
          >
            <div style={{ flex: 0.7 }}>
              <div>
                <ListOfValue
                  label={"Collateral Number"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                />
              </div>
              <div>
                <InputField
                  label={"Total Amount"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
              <div>
                <InputField
                  label={"Collateral Amount"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
              <div>
                <InputField
                  label={"Amount Available to Use"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
              <div>
                <InputField
                  label={"Amount Utilized"}
                  labelWidth={"25%"}
                  inputWidth={"50%"}
                  disabled
                />
              </div>
            </div>
            <div
              style={{
                flex: 0.3,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                height: "120px",
                border: "0.5px solid #e0dfe0",
                marginTop: "35px",
              }}
            >
              <div>
                <InputField
                  label={"Coverage %"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputField
                  label={"Loan Amount"}
                  labelWidth={"35%"}
                  inputWidth={"50%"}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              backgroundColor: "white",
              border: "0.5px solid #e0dfe0",
              marginTop: "15px",
            }}
          >
            <div>
              <InputField
                label={"Loan Percentage Coverage"}
                labelWidth={"55%"}
                inputWidth={"50%"}
                disabled
                required
              />
            </div>
            <div>
              <InputField
                label={"Amount to be Utilized"}
                labelWidth={"55%"}
                inputWidth={"50%"}
                required
              />
            </div>
            <div>
              <InputField
                label={"Amount Available"}
                labelWidth={"55%"}
                inputWidth={"50%"}
                disabled
                required
              />
            </div>
          </div>
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.2 }}></div>
            <div style={{ flex: 0.6, display: "flex", gap: "30px" }}>
              <div>
                <ButtonComponent
                  label={"Add Comments"}
                  // buttonBackgroundColor={"black"}
                  background={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Add Other Comments"}
                  // buttonBackgroundColor={"black"}
                  background={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                  buttonHeight={"40px"}
                  buttonWidth={"200px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Save"}
                  // buttonBackgroundColor={"black"}
                  background={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                  buttonHeight={"40px"}
                  buttonWidth={"100px"}
                  buttonColor={"white"}
                />
              </div>
              <div>
                <ButtonComponent
                  label={"Clear Record"}
                  // buttonBackgroundColor={"black"}
                  background={
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`
                  }
                  buttonHeight={"40px"}
                  buttonWidth={"150px"}
                  buttonColor={"white"}
                />
              </div>
            </div>
            <div style={{ flex: 0.2 }}></div>
          </div>
          <br />
          <div>
            {/* <DataTable
              columns={[
                "Sr. Number",
                "Collateral Number",
                "Collateral Type",
                "Collateral Amount",
                "Loan Amount",
                "Loan % Covered",
                "Amount Utilized",
              ]}
            /> */}
            <CustomTable
              headers={[
                "",
                "Sr No",
                "Collateral Number",
                "Collateral Type",
                "Collateral Amount",
                "Loan Amount",
                "Loan % Covered",
                "Amount Utilized",
                "",
              ]}
              data={collateralArr}
            />
          </div>
        </div>
      ),
    },
    {
      count: 8,
      number: "External Credit Bureau",
      content: (
        <div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                flex: 0.5,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
              }}
            >
              <div>
                <HeaderComponent
                  title={"External Credit Bureau Details"}
                  backgroundColor={"orange"}
                  height={"35px"}
                  color={"white"}
                />
              </div>
              <div style={{ marginTop: "15px" }}>
                <div style={{ borderBottom: "0.5px solid #828083" }}>
                  <h6>Enquiry made within the last 12 months</h6>
                </div>
              </div>
              <div>
                <InputField
                  label={"Number of enquiry made on behalf of this cutomer"}
                  labelWidth={"60%"}
                  inputWidth={"40%"}
                />
              </div>
              <div>
                <InputField
                  label={
                    "Number of banks that have enquired about this customer"
                  }
                  inputWidth={"40%"}
                  labelWidth={"60%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Printed Date"}
                  labelWidth={"60%"}
                  inputWidth={"40%"}
                />
              </div>
              <div>
                <InputField
                  type={"date"}
                  label={"Expiry Date"}
                  labelWidth={"60%"}
                  inputWidth={"40%"}
                />
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <ButtonComponent
                    label={"Add Comments"}
                    // buttonBackgroundColor={"black"}
                    background={
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`
                    }
                    buttonHeight={"40px"}
                    buttonWidth={"150px"}
                    buttonColor={"white"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"New"}
                    // buttonBackgroundColor={"black"}
                    background={
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`
                    }
                    buttonHeight={"40px"}
                    buttonWidth={"100px"}
                    buttonColor={"white"}
                  />
                </div>
                <div>
                  <ButtonComponent
                    label={"Save Credit Bureau"}
                    // buttonBackgroundColor={"black"}
                    background={
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`
                    }
                    buttonHeight={"40px"}
                    buttonWidth={"200px"}
                    buttonColor={"white"}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 0.5,
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                backgroundColor: "white",
                border: "0.5px solid #e0dfe0",
              }}
            >
              <div>
                <HeaderComponent
                  title={"Previous Credit Records"}
                  backgroundColor={"orange"}
                  height={"35px"}
                  color={"white"}
                />
              </div>
              <div>
                <SelectField
                  label={"Received Credit Facility and paid on time"}
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={"Received Credit Facility and didn't pay on time"}
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={
                    "Received Credit Facility that is past due and still outstanding"
                  }
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={
                    "Received Credit Facility that is still outstanding but performing"
                  }
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={"Received Credit Facility that has been written off"}
                  labelWidth={"70%"}
                />
              </div>
              <div>
                <SelectField
                  label={
                    "Received Credit Facility that has been negotiated for settlement"
                  }
                  labelWidth={"70%"}
                />
              </div>
            </div>
          </div>
          <br />
          <div>
            {/* <DataTable
              columns={[
                "Bank Code",
                "Amount Granted",
                "Outstanding Amount",
                "Date Granted",
                "Maturity Date",
                "Status",
                "Type of Facility",
              ]}
            /> */}
            <CustomTable
              headers={[
                "",
                "Bank Code",
                "Amount Granted",
                "Outstanding Amount",
                "Date Granted",
                "Maturity Date",
                "Status",
                "Type of Facility",
                "",
              ]}
            />
          </div>
          <br />
          <div>Debts in the Name of Other Companies</div>
          <div>
            {/* <DataTable
              columns={[
                "Bank Code",
                "Amount Granted",
                "Outstanding Amount",
                "Date Granted",
                "Maturity Date",
                "Status",
                "Type of Facility",
              ]}
            /> */}
            <CustomTable
              headers={[
                "",
                "Bank Code",
                "Amount Granted",
                "Outstanding Amount",
                "Date Granted",
                "Maturity Date",
                "Status",
                "Type of Facility",
                "",
              ]}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 p-2">
      <ul className="stepper rounded mb-4">
        {steps.map((step, index) => (
          <li
            key={step.number}
            className={`stepper__item cursor-pointer flex h-10 items-center justify-center ${
              index === activeStep
                ? "current text-white"
                : index < activeStep
                ? "complete"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="flex space-x-5 items-center justify-center">
              <div className="border-2 rounded-full w-7 h-7 flex justify-center items-center p-1 bg-black text-white">
                {step.count}
              </div>
              <div>{step.number}</div>
            </div>
          </li>
        ))}
      </ul>
      {steps[activeStep].content}
      <div className="flex justify-between mt-4">
        <button
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
            activeStep === 0 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </button>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${
            activeStep === steps.length - 1
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ArrowStepper;
