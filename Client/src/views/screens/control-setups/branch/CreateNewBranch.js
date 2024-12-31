import React, { useState, useEffect } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonType from "../../../../components/others/Button/ButtonType";
import Label from "../../../../components/others/Label/Label";
import CustomTable from "../components/CustomTable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import Header from "../../../../components/others/Header/Header";
import swal from "sweetalert";

function CreateNewBranch() {
  // useStates
  const [branchZone, setBranchZone] = useState([]);
  const [branchZoneVal, setBranchZoneVal] = useState("");
  const [clearingCode, setClearingCode] = useState([]);
  const [clearingCodeVal, setClearingCodeVal] = useState("");
  const [region, setRegion] = useState([]);
  const [regionVal, setRegionVal] = useState("");
  const [branchManagers, setBranchManagers] = useState([]);
  const [branchManagersVal, setBranchManagersVal] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyVal, setCurrencyVal] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [branchDescription, setBranchDescription] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [telephone, setTelephone] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [branchEmail, setBranchEmail] = useState("");
  const [branchShortCode, setBranchShortCode] = useState("");
  const [swiftCode, setBranchSwiftCode] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [dateOpened, setDateOpened] = useState("");
  const [insuranceLimit, setInsuranceLimit] = useState("");
  const [maxCreditLimit, setMaxCreditLimit] = useState("");
  const [minDrLimit, setMinDrLimit] = useState("");
  const [maxFloorLimit, setMaxFloorLimit] = useState("");
  const [minFloorLimit, setMinFloorLimit] = useState("");
  const [loginBranch, setLoginBranch] = useState("");
  const [errFieldMesg, setErrFieldMesg] = useState("");

  // values for fields
  const [clearingCodeVals, setClearingCodeVals] = useState("");
  const [branchTypeVal, setBranchTypeVal] = useState(1);
  const [eftVal, setEftVal] = useState(1);

  //headers
  const apiHeader = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  var headers = [
    "Currency",
    "Insurance Limit",
    "Max Credit Limit",
    "Min Dr Limit",
    "Max Floor Limit",
    "Min Floor Limit",
  ];

  // focus on next input field
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  // on page load
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/createBank/branchFieldError", {
        headers: apiHeader,
      })
      .then(function (response) {
        setErrFieldMesg(
          `ERR - ${response.data[0].code}: ${response.data[0].err_mesg}`,
          "error for field"
        );
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(API_SERVER + "/api/branchEnquiry/branchZone", { headers: apiHeader })
      .then(function (response) {
        setBranchZone(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/createBank/clearingCode", { headers: apiHeader })
      .then(function (response) {
        setClearingCode(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/createBank/region", { headers: apiHeader })
      .then(function (response) {
        setRegion(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(API_SERVER + "/api/get-currency", { headers: apiHeader })
      .then(function (response) {
        setCurrency(response.data);
      })
      .catch((err) => console.log(err));

    const userLoginBranch = JSON.parse(localStorage.getItem("userInfo"));

    setLoginBranch(userLoginBranch.branchCode, "branch diid");

    axios
      .post(
        API_SERVER + "/api/createBank/get-branch-managers",
        {
          globalBranchCode: loginBranch,
        },
        { headers: apiHeader }
      )
      .then(function (response) {
        setBranchManagers(response.data);
      })
      .catch((err) => console.log(err, "brr"));
  }, []);

  // arrays
  var arr = [
    [
      <div style={{ width: "100%" }}>
        <ListOfValue
          inputWidth={"100%"}
          data={currency}
          id={"currency"}
          value={currencyVal}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const input = document.getElementById("insuranceLimit");
              input.focus();
            }
          }}
          onChange={(value) => {
            setCurrencyVal(value);
            setTimeout(() => {
              const input = document.getElementById("insuranceLimit");
              input.focus();
            }, 0);
          }}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          onChange={(e) => setInsuranceLimit(e.target.value)}
          value={insuranceLimit}
          id={"insuranceLimit"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              switchFocus(e, "maxCreditLimit");
            }
          }}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          onChange={(e) => setMaxCreditLimit(e.target.value)}
          value={maxCreditLimit}
          id={"maxCreditLimit"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              switchFocus(e, "minDrLimit");
            }
          }}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          onChange={(e) => setMinDrLimit(e.target.value)}
          value={minDrLimit}
          id="minDrLimit"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              switchFocus(e, "maxFloorLimit");
            }
          }}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          onChange={(e) => setMaxFloorLimit(e.target.value)}
          value={maxFloorLimit}
          id={"maxFloorLimit"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              switchFocus(e, "minFloorLimit");
            }
          }}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          onChange={(e) => setMinFloorLimit(e.target.value)}
          value={minFloorLimit}
          id={"minFloorLimit"}
        />
      </div>,
    ],

    [
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
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
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
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
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
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
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} />
      </div>,
    ],
  ];

  // data from localstorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const username = userInfo.id;
  const key1 = userInfo.id;
  const key2 = userInfo.id;
  const key3 = userInfo.id;

  const ipAddress = localStorage.getItem("ipAddress");

  const lastLogin = localStorage.getItem("lastLogin");

  const comment = userInfo.responseMessage;

  return (
    <div>
      <div>
        <ActionButtons
          displayFetch={"none"}
          // on press of New
          onNewClick={() => {
            setBranchZoneVal("");
            setRegionVal("");
            setClearingCodeVal("");
            setBranchManagersVal("");
            setBranchCode("");
            setBranchDescription("");
            setAddress1("");
            setAddress2("");
            setAddress3("");
            setTelephone("");
            setContactPerson("");
            setBranchEmail("");
            setBranchShortCode("");
            setBranchSwiftCode("");
            setFaxNumber("");
            setDateOpened("");
            setCurrencyVal("");
            setInsuranceLimit("");
            setMaxCreditLimit("");
            setMinDrLimit("");
            setMaxFloorLimit("");
            setMinFloorLimit("");
          }}
          onOkClick={() => {
            // validations
            // 1. if a required field is left unfilled
            if (
              branchDescription.trim() === "" ||
              address1.trim() === "" ||
              telephone.trim() === "" ||
              contactPerson.trim() === "" ||
              branchEmail.trim() === "" ||
              branchZoneVal.trim() === "" ||
              branchManagersVal.trim() === "" ||
              clearingCodeVal.trim() === "" ||
              regionVal.trim() === "" ||
              dateOpened.trim() === ""
            ) {
              swal(errFieldMesg);
            } else {
              // get branch code and populate into branch code field
              axios
                .post(API_SERVER + "/api/get-fd-branch-code", {
                  headers: headers,
                })
                .then(function (response) {
                  console.log(response.data);
                  setBranchCode(response.data[0]?.code_generated);
                })
                .catch((err) => {
                  console.log(err);
                });
            }

            // if (currencyVal !== "") {
            //   currencyVal === branchCode;
            // }

            // USER AUDIT ACTION
            axios
              .post(
                API_SERVER + "/api/user-audit-action",
                {
                  username: username,
                  ipAddress: ipAddress,
                  key1: key1,
                  key2: key2,
                  key3: key3,
                  lastLogin: lastLogin,
                  comment: comment,
                  formCode: "AAFF",
                },
                { headers: headers }
              )
              .then(function (response) {
                console.log(response.data);
              })
              .catch((err) => {
                console.log(err);
              });

            // final creation of  a fixed deposit deal
            // axios
            //   .post(
            //     API_SERVER + "/api/fixed-deposit-deal-entry",
            //     {
            //       //
            //     },
            //     { headers: headers }
            //   )
            //   .then(function (response) {
            //     console.log(response.data);
            //   })
            //   .catch((err) => {
            //     console.log(err);
            //   });
          }}
        />
      </div>

      {/* body */}
      <div>
        <div style={{ marginBottom: "10px" }}>
          <Header title="BRANCH DETAILS" headerShade={true} />
        </div>
        <div style={{ width: "100%", display: "flex" }}>
          {/* left side */}
          <div style={{ width: "50%", marginRight: "50px" }}>
            <div style={{ marginBottom: "10px" }}>
              <InputField
                label="Branch Description"
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
                value={branchDescription}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    switchFocus(e, "branchZone");
                  }
                }}
                onChange={(e) => setBranchDescription(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <ListOfValue
                label="Branch Zone"
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
                data={branchZone}
                id="branchZone"
                value={branchZoneVal}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("address1");
                    input.focus();
                  }
                }}
                onChange={(value) => {
                  setBranchZoneVal(value);
                  setTimeout(() => {
                    const input = document.getElementById("address1");
                    input.focus();
                  }, 0);
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <InputField
                label="Address 1"
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
                value={address1}
                id={"address1"}
                onChange={(e) => setAddress1(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    switchFocus(e, "address2");
                  }
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <InputField
                label="Address 2"
                labelWidth={"30%"}
                inputWidth={"70%"}
                value={address2}
                id={"address2"}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    switchFocus(e, "address3");
                  }
                }}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <InputField
                label="Address 3"
                labelWidth={"30%"}
                inputWidth={"70%"}
                value={address3}
                id={"address3"}
                onChange={(e) => setAddress3(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    switchFocus(e, "telephone");
                  }
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                width: "100%",
              }}
            >
              <div style={{ width: "50%", marginRight: "10px" }}>
                <InputField
                  label="Telephone"
                  labelWidth={"64%"}
                  inputWidth={"36%"}
                  required
                  type="number"
                  value={telephone}
                  id={"telephone"}
                  onChange={(e) => setTelephone(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      switchFocus(e, "contactPerson");
                    }
                  }}
                />
              </div>

              <div style={{ width: "50%" }}>
                <InputField
                  label="Contact Person"
                  labelWidth={"50%"}
                  inputWidth={"50%"}
                  required
                  value={contactPerson}
                  id={"contactPerson"}
                  onChange={(e) => setContactPerson(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      switchFocus(e, "branchEmail");
                    }
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <InputField
                label="Branch Email"
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
                value={branchEmail}
                id="branchEmail"
                onChange={(e) => setBranchEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    switchFocus(e, "branchManager");
                  }
                }}
              />
            </div>
          </div>

          {/* right side */}
          <div style={{ width: "50%" }}>
            <div style={{ marginBottom: "10px" }}>
              <InputField
                disabled
                label="Branch Code"
                labelWidth={"29%"}
                inputWidth={"30%"}
                value={branchCode}
                id={"branchCode"}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <ListOfValue
                label="Branch Manager"
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
                data={branchManagers}
                id={"branchManager"}
                value={branchManagersVal}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("clearingCode");
                    input.focus();
                  }
                }}
                onChange={(value) => {
                  setBranchManagersVal(value);
                  setTimeout(() => {
                    const input = document.getElementById("clearingCode");
                    input.focus();
                  }, 0);
                }}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <ListOfValue
                label="Clearing Code"
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
                data={clearingCode}
                id={"clearingCode"}
                value={clearingCodeVal}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("branchShortCode");
                    input.focus();
                  }
                }}
                onChange={(value) => {
                  setClearingCodeVal(value);
                  setTimeout(() => {
                    const input = document.getElementById("branchShortCode");
                    input.focus();
                  }, 0);
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                width: "100%",
              }}
            >
              <div style={{ width: "50%", marginRight: "10px" }}>
                <InputField
                  label="Branch Short Code"
                  labelWidth={"65%"}
                  inputWidth={"35%"}
                  value={branchShortCode}
                  id={"branchShortCode"}
                  onChange={(e) => setBranchShortCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      switchFocus(e, "swiftCode");
                    }
                  }}
                />
              </div>

              <div style={{ width: "50%" }}>
                <InputField
                  label="Swift Code"
                  labelWidth={"50%"}
                  inputWidth={"50%"}
                  value={swiftCode}
                  id={"swiftCode"}
                  onChange={(e) => setBranchSwiftCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      switchFocus(e, "region");
                    }
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <ListOfValue
                label="Region"
                labelWidth={"30%"}
                inputWidth={"70%"}
                required
                data={region}
                id={"region"}
                value={regionVal}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("faxNumber");
                    input.focus();
                  }
                }}
                onChange={(value) => {
                  setRegionVal(value);
                  setTimeout(() => {
                    const input = document.getElementById("faxNumber");
                    input.focus();
                  }, 0);
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "70%",
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <Label label="Branch Type" fontSize="85%" labelWidth={"43%"} />

                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "30px" }}>
                    <ButtonType
                      label="Local"
                      type="radio"
                      name="branchType"
                      value={1}
                      onChange={() => {
                        setBranchTypeVal(1);
                      }}
                      checked={branchTypeVal === 1}
                    />
                  </div>

                  <div>
                    <ButtonType
                      label="Node"
                      type="radio"
                      name="branchType"
                      value={0}
                      onChange={() => {
                        setBranchTypeVal(0);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "30%",
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <Label label="EFT" fontSize="85%" labelWidth={"30%"} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: "30px" }}>
                    <ButtonType
                      label="Yes"
                      type="radio"
                      name="eft"
                      value={1}
                      onChange={() => {
                        setEftVal(1);
                      }}
                      checked={eftVal === 1}
                    />
                  </div>

                  <div>
                    <ButtonType
                      label="No"
                      type="radio"
                      name="eft"
                      value={0}
                      onChange={() => {
                        setEftVal(0);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                width: "100%",
              }}
            >
              <div style={{ width: "50%", marginRight: "10px" }}>
                <InputField
                  label="Fax Number"
                  labelWidth={"65%"}
                  inputWidth={"35%"}
                  // type="number"
                  value={faxNumber}
                  id={"faxNumber"}
                  onChange={(e) => setFaxNumber(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      switchFocus(e, "dateOpened");
                    }
                  }}
                />
              </div>

              <div style={{ width: "50%" }}>
                <InputField
                  label="Date Opened"
                  labelWidth={"50%"}
                  inputWidth={"50%"}
                  required
                  id={"dateOpened"}
                  type="date"
                  value={dateOpened}
                  onChange={(e) => setDateOpened(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      switchFocus(e, "currency");
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* input to be passed */}
        <Header title="BRANCH LIMIT" headerShade={true} />
        <CustomTable headers={headers} data={arr} />
      </div>
    </div>
  );
}

export default CreateNewBranch;
