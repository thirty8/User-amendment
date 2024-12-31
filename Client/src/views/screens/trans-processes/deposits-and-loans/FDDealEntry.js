import React, { useState, useEffect } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import AccountSummary from "../../../../components/others/AccountSummary";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import swal from "sweetalert";
import { Modal } from "@mantine/core";
import DocumentViewing from "../../../../components/others/DocumentViewing";
import Header from "../../../../components/others/Header/Header";
import SelectField from "../../../../components/others/Fields/SelectField";
import ButtonType from "../../../../components/others/Button/ButtonType";
import GlobalModal from "./components/Modal";
import RadioButtons from "../../../../components/others/Fields/RadioButtons";
import ImageVerification from "../../../../components/others/ImageVerification";

function FDDealEntry() {
  // states
  const [accountNumber, setAccountNumber] = useState("");
  const [sourceAccount, setSourceAccount] = useState("");
  const [accountDetails, setAccountDetails] = useState({});
  const [quotationNumber, setQuotationNumber] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [generalState, setGeneralState] = useState("");
  const [productTypes, setProductTypes] = useState("");
  const [tenor, setTenor] = useState();
  const [interestRate, setInterestRate] = useState("");
  const [exceptionalRate, setExceptionalRate] = useState();
  const [tolerance, setTolerance] = useState("");
  const [dealAmount, setDealAmount] = useState("");
  const [tax, setTax] = useState("");
  const [schInterestFreq, setSchInterestFreq] = useState("");
  const [intAtMat, setIntAtMat] = useState("");
  const [intBase, setIntBase] = useState("");
  const [maturityDate, setMaturityDate] = useState("");
  const [nextIntDate, setNextIntDate] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [initialSourceAccount, setInitialSourceAccount] = useState("");
  const [dealAmountFocus, setDealAmountFocus] = useState(false);
  const [showSignatureverification, setShowSignatureVerfication] =
    useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [show, setShow] = useState(false);

  //headers
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // date
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = yyyy + "-" + mm + "-" + dd;

  // axios calls

  // on next focus of selection of the lov
  useEffect(
    (e) => {
      if (dealAmountFocus) {
        setTimeout(() => {
          document.getElementById("dealAmount")?.focus();
        }, 1000);
      }
    },
    [dealAmountFocus]
  );

  //
  // useEffect(()=>{

  // }, [])

  useEffect(() => {
    axios
      .get(API_SERVER + "/api/get-quotation-number", {
        headers: headers,
      })
      .then(function (response) {
        setQuotationNumber(response.data[0].get_dealno);
      })
      .catch((err) => {
        console.log(err);
      });

    // product type lov
    axios
      .get(API_SERVER + "/api/get-product-types", { headers: headers })
      .then(function (response) {
        setProductTypes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // sch interest frequencies lov
    axios
      .get(API_SERVER + "/get-sch-interest-freq")
      .then(function (response) {
        setSchInterestFreq(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // functions
  // attach document state
  const handleShowSignatureVerification = () => {
    setShowSignatureVerfication(true);
  };

  // attach/ view doc function
  function handleClick() {
    if (documentNumber === "") {
      swal({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        buttons: "OK",
      }).then((result) => {
        if (result) {
        }
      });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  // HANDLE ON CLICK OF EXIT BUTTON
  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };

  return (
    <div>
      <div>
        <ActionButtons
          displayFetch={"none"}
          onNewClick={() => {
            setGeneralState([]);
            setSourceAccount("");
            setQuotationNumber("");
            setProductTypes("");
            setTenor("");
            setInterestRate("");
            setExceptionalRate("");
            setTolerance("");
            setDealAmount("");
            setTax("");
            setSchInterestFreq("");
            setIntAtMat("");
            setIntBase("");
            setMaturityDate("");
            setNextIntDate("");
            setTaxAmount("");
            setInitialSourceAccount("");
          }}
          onExitClick={() => {
            handleExitClick();
          }}
        />
      </div>

      <Header title={"Fixed Deposit Creation"} headerShade={"headerShade"} />
      <br />
      <div style={{ display: "flex", flex: 1 }}>
        {/* left section */}
        <div
          style={{
            flex: 0.65,
            marginRight: "10px",
          }}
        >
          {/* left side section left hand */}
          <div
            style={{
              display: "flex",
              border: "1px solid #b5b2b1",
              padding: "10px",
              borderRadius: "3px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "50%" }}>
              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Source Account"
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required
                  onChange={(e) => {
                    setInitialSourceAccount(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      setSourceAccount(initialSourceAccount);
                    }
                  }}
                  value={generalState?.accountNumber}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Deal Amount"
                  id={"dealAmount"}
                  labelWidth={"32%"}
                  inputWidth={"70%"}
                  required
                  textAlign={"right"}
                  onChange={(e) => setDealAmount(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      switchFocus(e, "productType");
                    }
                  }}
                />
              </div>

              {/* PRODUCT TYPE AND FUNCTIONS */}
              <div style={{ marginBottom: "10px" }}>
                <ListOfValue
                  label="Product Type"
                  labelWidth={"32%"}
                  inputWidth={"70%"}
                  required
                  id={"productType"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("exceptionalRate");
                      input?.focus();
                    }
                  }}
                  onChange={(value) => {
                    setTimeout(() => {
                      const input = document.getElementById("exceptionalRate");
                      input?.focus();
                    }, 0);

                    // tenor
                    axios
                      .post(
                        API_SERVER + "/api/FDTenor",
                        {
                          productCode: value,
                          currencyCode: "010",
                        },
                        {
                          headers: headers,
                        }
                      )
                      .then(function (response) {
                        setTenor(response?.data?.DEFAULT_TENOR_DAYS);
                      })
                      .then((err) => console.log(err));

                    // interest rates
                    axios
                      .post(
                        API_SERVER + "/api/get-interest-rates",
                        {
                          product_code: value,
                          iso_code: generalState?.isoCode,
                          deal_amount: dealAmount,
                        },
                        {
                          headers: headers,
                        }
                      )
                      .then(function (response) {
                        console.log(response, "here");
                        setInterestRate(response?.data?.INT_RATE);
                        setExceptionalRate(response?.data?.INT_RATE_1);
                        setTolerance(response?.data?.tolerance);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                    console.log(exceptionalRate, "e r");
                    console.log(dealAmount, "deal amount");
                    console.log(tenor, "tenorr");

                    // TAX
                    axios
                      .post(
                        API_SERVER + "/api/getTax",
                        {
                          productCode: value,
                          currencyCode: "010",
                          dealAmount: dealAmount,
                          interestVariance: exceptionalRate,
                          tenor: tenor,
                        },
                        {
                          headers: headers,
                        }
                      )
                      .then(function (response) {
                        console.log(response, "tax");
                        setIntAtMat(response?.data?.INT_AMOUNT);
                        setIntBase(response?.data?.INT_BASE);
                        setTax(response?.data?.STATE_TAX);
                        setTaxAmount(response?.data?.TAX_AMT);
                      })
                      .catch((err) => console.log(err));
                  }}
                  data={productTypes}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Deal Currency"
                  labelWidth={"32%"}
                  inputWidth={"70%"}
                  required
                  id={"dealCurrency"}
                  disabled
                  value={generalState?.isoCode}
                  // data={[{ label: generalState?.isoCode, value: "010" }]}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Beneficiary Cust"
                  labelWidth={"32%"}
                  inputWidth={"70%"}
                  disabled
                  value={generalState?.customer_number}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Interest Acct"
                  labelWidth={"32%"}
                  inputWidth={"70%"}
                  required
                  value={generalState?.accountNumber}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Liquidation Acct"
                  labelWidth={"30%"}
                  inputWidth={"70%"}
                  required
                  value={generalState?.accountNumber}
                />
              </div>
            </div>

            {/* left side section right hand */}
            <div style={{ width: "50%", marginLeft: "20px" }}>
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}
              >
                <div style={{ marginRight: "5px" }}>
                  <ButtonComponent
                    label="ID"
                    // buttonHeight="25px"
                    buttonColor={"white"}
                  />
                </div>

                <div style={{ marginRight: "5px" }}>
                  <ButtonComponent
                    label="NAME"
                    // buttonHeight="25px"
                    onClick={() => setShow(true)}
                    buttonColor={"white"}
                  />

                  <GlobalModal
                    setShowModal={setShow}
                    showModal={show}
                    setState={setGeneralState}
                    setDealAmountFocus={setDealAmountFocus}
                    sourceAccount={sourceAccount}
                  />
                </div>

                <div style={{ width: "100%" }}>
                  <InputField
                    disabled
                    inputWidth={"100%"}
                    noMarginRight={"none"}
                    value={generalState?.accountName}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <ButtonComponent
                  label={"Sig Ver"}
                  // buttonHeight="25px"
                  onClick={() => setShowSignatureVerfication(true)}
                  buttonColor={"white"}
                />

                {showSignatureverification && (
                  <Modal
                    show={showSignatureverification}
                    size="lg"
                    centered
                    style={{ height: "100%" }}
                    className="shadow-md shadow-black"
                  >
                    <div className="flex items-center justify-between mx-2 p-2">
                      <div className="font-extrabold text-black">
                        View Document
                      </div>
                      <div
                        className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                        onClick={() => setShowSignatureVerfication(false)}
                      >
                        x
                      </div>
                    </div>
                    <Modal.Body>
                      <ImageVerification
                        accountNumber={generalState?.accountNumber}
                      />
                    </Modal.Body>
                  </Modal>
                  // 1683042691
                )}
              </div>

              <div style={{ marginBottom: "10px" }}>
                <InputField
                  disabled
                  label={"Tenor"}
                  labelWidth={"10%"}
                  inputWidth={"30%"}
                  value={tenor}
                />
              </div>

              {/* beneficiary cust number */}
              <div style={{ width: "100%", marginBottom: "10px" }}>
                <InputField
                  disabled
                  inputWidth={"100%"}
                  noMarginRight={true}
                  value={generalState?.isoCode}
                />
              </div>

              {/* interest account */}
              <div style={{ width: "100%", marginBottom: "10px" }}>
                <InputField
                  disabled
                  inputWidth={"100%"}
                  noMarginRight={true}
                  value={generalState?.accountName}
                />
              </div>

              {/* liquidation account */}
              <div style={{ width: "100%", marginBottom: "10px" }}>
                <InputField
                  disabled
                  inputWidth={"100%"}
                  noMarginRight={true}
                  value={generalState?.accountName}
                />
              </div>

              <div style={{ width: "100%", marginBottom: "10px" }}>
                <InputField
                  disabled
                  inputWidth={"100%"}
                  noMarginRight={true}
                  value={generalState?.accountName}
                />
              </div>
            </div>
          </div>

          {/* INTERESTS */}
          <Header title={"Interest"} headerShade={true} />
          <div
            style={{
              border: "1px solid #b5b2b1",
              padding: "10px",
              borderRadius: "3px",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ flex: "0.5", marginRight: "10px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <InputField
                    label="Interest Rate(%)"
                    inputWidth={"50%"}
                    labelWidth={"30%"}
                    disabled
                    textAlign={"right"}
                    value={interestRate}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <SelectField
                    label="Interest Type"
                    inputWidth={"50%"}
                    labelWidth={"30%"}
                    defaultValue={"Y"}
                    data={[{ label: "Simple Interest", value: "Y" }]}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <InputField
                    label="Tax (%)"
                    inputWidth={"50%"}
                    labelWidth={"30%"}
                    disabled
                    value={tax}
                    textAlign={"right"}
                  />
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <InputField
                    label="Exceptional Rate(%)"
                    required
                    inputWidth={"50%"}
                    labelWidth={"30%"}
                    id={"exceptionalRate"}
                    value={exceptionalRate}
                    textAlign={"right"}
                    onKeyDown={(e) => {
                      switchFocus(e, "schInterestFreq");
                    }}
                  />
                </div>
              </div>

              <div style={{ flex: "0.5" }}>
                <div style={{ marginBottom: "10px", width: "100%" }}>
                  <ListOfValue
                    label="Sch. Interest Freq"
                    inputWidth={"70%"}
                    labelWidth={"30%"}
                    id="schInterestFreq"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("rollover");
                        input.focus();
                      }
                    }}
                    onChange={(value) => {
                      setTimeout(() => {
                        const input = document.getElementById("rollover");
                        input.focus();
                      }, 0);

                      // getting the dates
                      axios
                        .post(
                          API_SERVER + "/api/getDates",
                          {
                            //  effectiveDate, frequency, tenor
                            effectiveDate: formattedDate,
                            frequency: value,
                            tenor: tenor,
                          },
                          {
                            headers: headers,
                          }
                        )
                        .then(function (response) {
                          setMaturityDate(
                            response.data?.maturityDate?.split("T")[0]
                          ); // splitting the date and removing the T from there
                          setNextIntDate(
                            response.data?.nextInterestDate?.split("T")[0]
                          ); // picking out the first part (date)
                        })
                        .catch((err) => console.log(err));
                    }}
                    data={schInterestFreq}
                  />
                </div>

                <div
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <div style={{ width: "50%" }}>
                    <InputField
                      label="Int At Mat."
                      labelWidth={"30%"}
                      inputWidth={"48%"}
                      disabled
                      textAlign={"right"}
                      value={intAtMat}
                    />
                  </div>
                  <div style={{ width: "50%", color: "red !important" }}>
                    <InputField
                      label="Tolerance"
                      labelWidth={"45%"}
                      inputWidth={"55%"}
                      disabled
                      value={tolerance}
                      textAlign={"right"}
                    />
                  </div>
                </div>

                <div
                  style={{
                    marginBottom: "10px",
                    width: "100%",
                    display: "flex",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {/* tax amount */}
                    <div style={{ width: "50%" }}>
                      <InputField
                        inputWidth={"90%"}
                        disabled
                        noMarginRight={true}
                        value={taxAmount}
                        textAlign={"right"}
                      />
                    </div>
                    <div style={{ width: "50%" }}>
                      <ButtonType
                        type={"checkbox"}
                        label="Tax Waive"
                        inputWidth={"50%"}
                        disabled
                      />
                    </div>
                  </div>

                  {/* <div style={{ width: "50%" }}>
                    <InputField
                      label="Interest Base"
                      inputWidth={"50%"}
                      labelWidth={"50%"}
                      disabled
                      textAlign={"right"}
                      value={intBase}
                    />
                  </div> */}
                </div>

                {/* <div style={{ width: "50%" }}>
                  <InputField
                    label="Int At Mat."
                    labelWidth={"30%"}
                    inputWidth={"70%"}
                    disabled
                    textAlign={"right"}
                    value={intAtMat}
                  />
                </div> */}

                <div style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <ButtonComponent
                      label="View Schedule"
                      // buttonHeight="25px"
                      buttonColor={"white"}
                    />
                  </div>

                  <div style={{ width: "50%" }}>
                    <InputField
                      label="Interest Base"
                      inputWidth={"50%"}
                      labelWidth={"45%"}
                      disabled
                      textAlign={"right"}
                      value={intBase}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right section */}
        <div style={{ flex: 0.35 }}>
          {/* quotation number */}
          <div style={{ marginBottom: "10px" }}>
            <InputField
              label="Quotation Number"
              labelWidth={"50%"}
              inputWidth={"50%"}
              disabled
              value={quotationNumber}
            />
          </div>

          {/* account summary */}
          <Header headerShade={true} title="account summary" />
          <div style={{ marginBottom: "10px" }}>
            <AccountSummary
              accountNumber={generalState?.accountNumber}
              setAccountDetails={setAccountDetails}
              sourceAccount={sourceAccount}
            />
          </div>

          {/* attach file */}
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ marginRight: "5px" }}>
              <InputField
                label="Attach Document"
                labelWidth={"50%"}
                inputWidth={"50%"}
                onChange={(e) => setDocumentNumber(e.target.value)}
              />
            </div>

            <div>
              <ButtonComponent
                label="View Document"
                labelWidth={"50%"}
                inputWidth={"50%"}
                buttonHeight="25px"
                onClick={() => handleClick()}
                buttonColor={"white"}
              />

              {sweetAlertConfirmed && (
                <Modal
                  show={sweetAlertConfirmed}
                  size="lg"
                  centered
                  style={{ height: "100%" }}
                  className="shadow-md shadow-black"
                >
                  <div className="flex items-center justify-between mx-2 p-2">
                    <div className="font-extrabold text-black">
                      View Document
                    </div>
                    <div
                      className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                      onClick={() => setSweetAlertConfirmed(false)}
                    >
                      x
                    </div>
                  </div>
                  <Modal.Body>
                    <DocumentViewing documentID={documentNumber} />
                  </Modal.Body>
                </Modal>
              )}
            </div>
          </div>

          <Header title={"Dates"} headerShade={true} />
          <div
            style={{
              border: "1px solid #b5b2b1",
              padding: "10px",
              borderRadius: "3px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Effective Date"
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  type="date"
                  value={formattedDate}
                  required
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Maturity Date"
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  type="date"
                  value={maturityDate}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <InputField
                  label="Next Int Date"
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  type="date"
                  value={nextIntDate}
                />
              </div>
            </div>
          </div>

          <Header title={"Rollover"} headerShade={true} />
          <div
            style={{
              border: "1px solid #b5b2b1",
              padding: "10px",
              borderRadius: "3px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <div style={{ marginBottom: "10px", width: "50%" }}>
                {/* <SelectField
                  label="Rollover"
                  labelWidth={"31%"}
                  inputWidth={"50%"}
                  id={"rollover"}
                /> */}
                <RadioButtons
                  id={"rollover"}
                  required
                  name="rollover"
                  display={true}
                  display2={true}
                  display3={false}
                  label={"Rollover"}
                  radioButtonsWidth={"70%"}
                  labelWidth={"45%"}
                  radioLabel={"Yes"}
                  radioLabel2={"No"}
                />
              </div>

              <div style={{ marginBottom: "10px", width: "50%" }}>
                {/* <SelectField
                  label="Capitalise"
                  labelWidth={"31%"}
                  inputWidth={"50%"}
                /> */}
                <RadioButtons
                  id={"capitalise"}
                  name={"capitalise"}
                  display={true}
                  display2={true}
                  label={"Capitalise"}
                  radioButtonsWidth={"70%"}
                  labelWidth={"45%"}
                  radioLabel={"Yes"}
                  radioLabel2={"No"}
                  display3={false}
                />
              </div>

              <div style={{ marginBottom: "10px", width: "50%" }}>
                {/* <SelectField
                  label="At Prevailing Rate"
                  labelWidth={"31%"}
                  inputWidth={"50%"}
                /> */}
                <RadioButtons
                  id={"atPrevailingRate"}
                  name={"atPrevailingRate"}
                  display={true}
                  display2={true}
                  display3={false}
                  label={"At Prevailing Rate"}
                  radioButtonsWidth={"50%"}
                  labelWidth={"95%"}
                  radioLabel={"Yes"}
                  radioLabel2={"No"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FDDealEntry;
