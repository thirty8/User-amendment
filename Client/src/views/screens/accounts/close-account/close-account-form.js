import React, { useState, useEffect } from "react";
// import { Viewer } from "@mescius/activereportsjs-react";
import * as ActiveReportsDesigner from "@grapecity/activereports";

// const { PaletteColorUtility, FlexDV } = ActiveReportsDesigner;
import { Viewer } from "@grapecity/activereports-react";

// import "@mescius/activereportsjs/pdfexport";
// import "@mescius/activereportsjs/htmlexport";
// import "@mescius/activereportsjs/tabulardataexport";
// import { FontStore } from "@mescius/activereportsjs/core";
import AccountSummary from "../../../../components/others/AccountSummary";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../components/others/Fields/SelectField";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import TextAreaField from "../../../../components/others/Fields/TextArea";
import { API_SERVER } from "../../../../config/constant";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import SearchModal from "../../cheques/book-request/components/SearchModal";
import Swal from "sweetalert2";
import axios from "axios";

// import DocumentViewing from "../../../../components/DocumentViewing";
import DocumentViewing from "../../../../components/DocumentViewing";
// import DocumentViewing from "../../../../components/DocumentCapture";

import { Modal } from "@mantine/core";
import CustomButtons from "../../../../components/others/CustomButtons";
import ErrorModal from "./components/error-modal2";
import ErrorModal2 from "./components/error-modal2";
import ModalComponent from "../../../../components/others/Modal/modal";

function CloseAccount() {
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [accountnumber, setAccountNumber] = useState("");
  const [accountnumberEnter, setAccountNumberEnter] = useState("");
  const [accountname, setAccountName] = useState("");
  const [accountName2, setAccountName2] = useState("");
  const [accountnumber2, setAccountNumber2] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [getToken, setToken] = useState("");
  const [closureReason, setClosureReason] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [reason, setReason] = useState([]);
  const [sreason, setSreason] = useState("");
  const [sreason2, setSreason2] = useState("");
  const [reasonDesc, setReasonDesc] = useState("");
  const [clsType, setclsType] = useState("");
  const [uniqueRef, setUniqueRef] = useState("");
  const [disableTransferAcc, setDisableTransferAcc] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [referenceNum, setReferenceNum] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [activeReportModal, setActiveReportModal] = useState(false);
  const [fieldsObj, setFieldsObj] = useState({
    transfer_type: true,
    transfer_acctlink: true,
    reason: true,
    source_document: true,
  });

  const fetchReportDetails = async () => {
    setLoading(true);
    await axios
      .get(API_SERVER + `/api/get-account-report/${accountnumberEnter}`, { headers })
      .then((response) => {
        if (response) {
          console.log(response, "mario");
        }
      });
    setLoading(false);
  };
  const proceedFunction = async () => {
    const newObj = {};
    Object.keys(fieldsObj)?.length > 0 &&
      Object.entries(fieldsObj)?.forEach(([key]) => {
        newObj[key] = false;
      });
    setFieldsObj(newObj);
    setErrorModal(false);
    setActiveReportModal(true);
    await fetchReportDetails();
  };

  const cancelFunction = () => {
    setErrorModal(false);
  };

  useEffect(() => {
    async function getReason() {
      await axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CLO",
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response.data.length > 0) {
            setReason(response?.data);
          }
        })
        .catch((err) => {
          console.log("error in lov:" + err);
        });
    }

    getReason();
  }, []);

  const handleClear = () => {
    setAccountName("");
    setAccountNumber("");
    setAccountNumber2("");
    setAccountName2("");
    setclsType("");
    setAccountNumberEnter("");
    setShowInputField(false);
    setClosureReason(false);
    setSweetAlertConfirmed(false);
    setClosureReason("");
    setToken("");
    setSreason("");
    setSreason2("");
    setReferenceNum("");
    setReasonDesc("");
    setAccountDetails([]);
  };

  // for reference input field only
  const handleClear2 = () => {
    setAccountName("");
    setAccountNumber("");
    setAccountNumber2("");
    setAccountName2("");
    setclsType("");
    setAccountNumberEnter("");
    // setShowInputField(false);
    setClosureReason(false);
    setSweetAlertConfirmed(false);
    setClosureReason("");
    setToken("");
    setSreason("");
    setSreason2("");
    setReasonDesc("");
    // setReferenceNum("")
    setAccountDetails([]);
  };

  // 001202402201055805
  // clear all details when acct number is not valid
  // clear fields when validation is 100 meaning there might be more than one error /
  const clearAcctValidation = () => {
    setAccountNumber("");
    setAccountNumber2("");
    setAccountNumberEnter("");
    setAccountName("");
    setErrorData([]);
    setAccountDetails([]);
  };

  const handleNewClick = () => {
    handleClear();
  };

  async function handleOkClick() {
    await axios
      .post(
        API_SERVER + "/api/close-account",
        {
          procedure: "close account",
          acct_link: accountnumber,
          cls_type: clsType,
          mandate: closureReason === true ? sreason2 : reasonDesc,
          document_no: getToken,
          transf_acct_v: accountnumber2,
          currency_code:
            accountDetails?.summary?.length > 0 ? accountDetails?.summary[0]?.currency_code : "",
          naration: "",
          global_bra: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          username: JSON.parse(localStorage.getItem("userInfo"))?.id,
          terminal: localStorage.getItem("ipAddress"),
          machine_ip: localStorage.getItem("ipAddress"),
          // sess_id: localStorage.getItem("ipAddress"),
          frmcode: "SCLA",
          global_prog: "React",
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        if (response?.data?.length > 0) {
          if (response?.data[0]?.RESPONSE_CODE === "999") {
            const mess = response?.data[0]?.RESPONSE_MESS;
            Swal.fire({
              text: mess,
              icon: "error",
            });
          } else if (response?.data[0]?.RESPONSE_CODE === "000") {
            const mess = response?.data[0]?.RESPONSE_MESS;
            const regex = /WITH REF\. (\d+)/;
            // Extracting the number from the string
            const matches = mess?.match(regex);
            // If there are matches, the first one will be the number
            const refNum = matches ? matches[0] : null;
            setReferenceNum(refNum?.split(".")[1]);
            Swal.fire({
              text: mess,
              icon: "success",
            }).then((result) => {
              if (result) {
                handleClear2();
              }
            });
          } else {
            return false;
          }
        }
      })
      .catch((err) => console.log("error in okay procedure:", +err));
  }

  function handleSelected(value) {
    setAccountNumber(value);
    setAccountNumberEnter(value);
    handleSelectFetchDetails(value);
    setShowModal(false);
  }

  function handleSelected2(value) {
    setAccountNumber2(value);
    handleSelectFetchTransferAccDetails(value);
    setShowModal2(false);
  }

  async function handleSelectFetchDetails(value) {
    try {
      await axios
        .post(
          API_SERVER + "/api/close-account",
          {
            acct_link_validation: "true",
            acct_link: value,
          },
          { headers }
        )
        .then((response) => {
          // error 1
          if (response?.data[0]?.RESPONSE_CODE === "000" && response?.data?.length > 0) {
            Swal.fire({
              text: response?.data[0]?.RESPONSE_MESS,
              icon: "error",
            }).then((result) => {
              if (result) {
                clearAcctValidation();
                const input = document.getElementById("accountNumber");
                input?.focus();
              }
            });
            // error 2 for more errors
          } else if (response?.data[0]?.RESPONSE_CODE === "100" && response?.data?.length > 0) {
            const filteredData = Object.keys(response?.data[0]?.RESPONSE_MESS[0])
              ?.map((i) => {
                const value = response.data[0]?.RESPONSE_MESS[0][i];
                if (value !== "" && value !== null && value !== undefined) {
                  return { [i]: value };
                }
              })
              .filter((i) => i !== undefined && i !== null && i !== "");

            setErrorModal(true);
            setErrorData(filteredData);
            const input = document.getElementById("accountNumber");
            input?.focus();
          } else if (response?.data[0]?.RESPONSE_CODE === "999" && response?.data?.length > 0) {
            return true;
          } else {
            return;
          }
        });
    } catch (error) {
      console.log(`error here bro: ${error}`);
    }
  }

  // handle closure account and tranfer account validation
  async function handleSelectFetchTransferAccDetails(value) {
    // e.persist();
    await axios
      .post(
        API_SERVER + "/api/close-account",
        {
          transferAcc: "true",
          transf_acct_v: value,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data.length > 0) {
          if (value === accountnumber) {
            axios
              .post(API_SERVER + "/api/get-error-message", { code: "06113" }, { headers })
              .then((response) => {
                if (response?.data) {
                  Swal.fire({
                    text: response.data,
                    icon: "error",
                  }).then((result) => {
                    if (result) {
                      setAccountNumber2("");
                      setAccountName2("");
                    }
                  });
                }
              })
              .catch((err) => console.log("error here:" + err));
          } else if (
            response?.data[0]?.currency_code != accountDetails?.summary[0]?.currency_code
          ) {
            axios
              .post(API_SERVER + "/api/get-error-message", { code: "06126" }, { headers })
              .then((response) => {
                if (response?.data) {
                  Swal.fire({
                    text: response?.data,
                    icon: "error",
                  }).then((result) => {
                    if (result) {
                      setAccountNumber2("");
                      setAccountName2("");
                    }
                  });
                }
              })
              .catch((err) => console.log("error here:" + err));
          } else {
            setAccountName2(response.data[0]?.account_descrp);
            const input = document.getElementById("reason");
            input?.focus();
          }
        } else {
          axios
            .post(API_SERVER + "/api/get-error-message", { code: "06127" }, { headers })
            .then((response) => {
              if (response?.data) {
                Swal.fire({
                  text: response.data,
                  icon: "error",
                }).then((result) => {
                  if (result) {
                    setAccountNumber2("");
                    setAccountName2("");
                  }
                });
              }
            })
            .catch((err) => console.log("error here:" + err));
        }
      });
  }

  // handle enter account number
  // on account number key down to check validations
  async function onAccountNumberKeyDown(e) {
    e.persist();
    try {
      if (e.key === "Enter") {
        //  show account name
        // setAccountNumberEnter(e.target.value);
        setAccountNumberEnter(accountnumber);
        await axios
          .post(
            API_SERVER + "/api/close-account",
            {
              acct_link_validation: "true",
              acct_link: e.target.value,
              // global_bra: "004",
              // global_bra: "008",
              // global_bra: "001",
              // global_bra: "000",
              // {acct_link: 004009110949770160,global_bra:009 } with more than one error
              // {acct_link: 004001210060678158,global_bra:001 } with no error
              global_bra: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
            },
            { headers }
          )
          .then((response) => {
            console.log(response, "torso");
            // error 1
            if (response?.data[0]?.RESPONSE_CODE === "000" && response?.data?.length > 0) {
              Swal.fire({
                text: response?.data[0]?.RESPONSE_MESS,
                icon: "error",
              }).then((result) => {
                if (result) {
                  clearAcctValidation();
                  const input = document.getElementById("accountNumber");
                  input?.focus();
                }
              });
              // error 2 for more errors
            } else if (response?.data[0]?.RESPONSE_CODE === "100" && response?.data?.length > 0) {
              const filteredData = Object.keys(response?.data[0]?.RESPONSE_MESS[0])
                ?.map((i) => {
                  const value = response.data[0]?.RESPONSE_MESS[0][i];
                  if (value !== "" && value !== null && value !== undefined) {
                    return { [i]: value };
                  }
                })
                .filter((i) => i !== undefined && i !== null && i !== "");

              setErrorModal(true);
              setErrorData(filteredData);
              const input = document.getElementById("accountNumber");
              input?.focus();
            } else if (response?.data[0]?.RESPONSE_CODE === "999" && response?.data?.length > 0) {
              return true;
            } else {
              return;
            }
          });
      } else {
        return;
      }
    } catch (error) {
      console.log(`error here bro: ${error}`);
    }
  }

  async function transferAccountFunc(e) {
    e.persist();
    setAccountNumber2(e.target.value);
    if (e.key === "Enter") {
      await axios
        .post(
          API_SERVER + "/api/close-account",
          {
            transferAcc: "true",
            transf_acct_v: e.target.value,
          },
          { headers }
        )
        .then((response) => {
          if (response?.data.length > 0) {
            if (e.target.value === accountnumber) {
              axios
                .post(API_SERVER + "/api/get-error-message", { code: "06113" }, { headers })
                .then((response) => {
                  if (response?.data) {
                    Swal.fire({
                      text: response.data,
                      icon: "error",
                    }).then((result) => {
                      if (result) {
                        setAccountNumber2("");
                        setAccountName2("");
                      }
                    });
                  }
                })
                .catch((err) => console.log("error here:" + err));
            } else if (
              response?.data[0]?.currency_code != accountDetails?.summary[0]?.currency_code
            ) {
              axios
                .post(API_SERVER + "/api/get-error-message", { code: "06126" }, { headers })
                .then((response) => {
                  if (response?.data) {
                    Swal.fire({
                      text: response?.data,
                      icon: "error",
                    }).then((result) => {
                      if (result) {
                        setAccountNumber2("");
                        setAccountName2("");
                      }
                    });
                  }
                })
                .catch((err) => console.log("error here:" + err));
            } else {
              setAccountName2(response.data[0]?.account_descrp);
              const input = document.getElementById("reason");
              input?.focus();
            }
          } else {
            axios
              .post(API_SERVER + "/api/get-error-message", { code: "06127" }, { headers })
              .then((response) => {
                if (response?.data) {
                  Swal.fire({
                    text: response.data,
                    icon: "error",
                  }).then((result) => {
                    if (result) {
                      setAccountNumber2("");
                      setAccountName2("");
                    }
                  });
                }
              })
              .catch((err) => console.log("error here:" + err));
          }
        });
    }
  }

  // account number change
  useEffect(() => {
    if (accountDetails && accountDetails?.summary?.length > 0) {
      setAccountName(accountDetails?.summary[0]?.account_name);
      const input = document.getElementById("transferType");
      input?.focus();
    }
  }, [accountDetails]);

  // document ref
  function DocumentViewModal() {
    if (getToken === "") {
      axios
        .post(API_SERVER + "/api/get-error-message", { code: "01346" }, { headers })
        .then((response) => {
          if (response?.data) {
            Swal.fire({
              text: response?.data,
              icon: "error",
            }).then((result) => {
              if (result) {
              }
            });
          }
        })
        .catch((err) => {
          if (err) {
            console.log("error here:" + err);
          }
        });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  const handleSelectChange = async (value) => {
    setAccountNumber2("");
    setAccountName2("");
    setclsType(value);
    // setSelectedOption(value);
    if (value === "C") {
      setShowInputField(true);
      setDisableTransferAcc(true);
      // setTransAcct("");
      await axios
        .post(
          API_SERVER + "/api/close-account",
          {
            choosenType: value ? value : "",
            iso_code: accountDetails?.summary?.length ? accountDetails?.summary[0]?.currency : "",
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            setAccountNumber2(response?.data[0]?.closure_contra);
            setAccountName2(response?.data[0]?.account_desc);
            const input = document.getElementById("reason");
            input?.focus();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAccountNumber2("");
      setAccountName2("");
      setShowInputField(false);
      setDisableTransferAcc(false);
    }
  };

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  // const handlePhoneNumberChange = (e) => {
  //   const inputValue = e.target.value.slice(0, 22);
  //   // remove any non-numeris characters
  //   const numericValue = inputValue?.replace(/\D/g, "");
  //   setAccountNumber(numericValue);
  // };

  // useEffect(() => {
  //   if (
  //     accountDetails &&
  //     accountDetails?.summary?.length > 0 &&
  //     dummyData &&
  //     Object.keys(dummyData)?.length > 0
  //   ) {
  //     const input = document.getElementById("transferType");
  //     input?.focus();

  //     setAccountName(
  //       accountDetails.summary?.length > 0
  //         ? accountDetails?.summary[0]?.account_name
  //         : ""
  //     );
  //     setdateOpened(formatDate(getdata[0]?.date_opened));
  //     setdateOl(formatDate(getdata[0]?.date_of_last_activity));
  //     setLevel(getdata[0]?.level_identifier);
  //   } else {
  //     const input = document.getElementById("accountNumber");
  //     input?.focus();
  //   }
  // }, [accountDetails, dummyData]);
  const reportSettings = {
    ReportName: "Account_closure_confirmation_report", // The name of your report
    ReportParams: [
      {
        Name: "account_number", // Parameter name as defined in the report
        Value: accountnumberEnter, // Value of the parameter, as an array of ParameterVariant[]
      },
    ],
    //   ResourceLocator: {
    //     BasePath: "/reports/",
    //     ResourceStreamLocator: (resourceName) => {
    //         console.log("Fetching resource:", resourceName);
    //         // Custom logic to retrieve the resource, e.g., an image or subreport
    //         return fetch(`http://example.com/resources/${resourceName}`);
    //     }
    // }
  };

  return (
    <div>
      <div className="pb-2">
        <ActionButtons
          displayFetch={"none"}
          displayDelete={"none"}
          displayAuthorise={"none"}
          displayView={"none"}
          displayCancel={"none"}
          displayReject={"none"}
          displayHelp={"none"}
          displayRefresh={"none"}
          onNewClick={handleNewClick}
          onOkClick={handleOkClick}
        />
      </div>

      <hr className="mt-3 mb-2 border-1"></hr>

      <div className="flex space-x-5  mt-5">
        {/* left side  */}
        <div className="space-y-5 w-[70%] border rounded px-2">
          <div className="flex pt-5 items-center space-x-3">
            <div className="w-[45%]">
              <InputField
                label={"Account Number"}
                id={"accountNumber"}
                type={"number"}
                labelWidth={"40%"}
                inputWidth={"56%"}
                required={true}
                disabled={false}
                value={accountnumber}
                maxLength={22}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                  // handlePhoneNumberChange(e);
                }}
                onKeyDown={onAccountNumberKeyDown}
              />
            </div>
            <div className="w-[8%]">
              <ButtonComponent
                onClick={() => {
                  setShowModal(true);
                }}
                label="Search"
                buttonWidth="100%"
                buttonHeight="27px"
                buttonColor="white"
              />
            </div>

            <SearchModal
              setShowModal={setShowModal}
              showModal={showModal}
              handleSelected={handleSelected}
            />
            <div className="w-[43%] bg-pink-400">
              <InputField
                noMarginRight={true}
                inputWidth={"100%"}
                required={false}
                disabled={true}
                value={accountname}
              />
            </div>
          </div>
          <div className="flex pb-3">
            <div className="w-[45%]">
              <SelectField
                label={"Transfer Type"}
                required={true}
                labelWidth={"40%"}
                inputWidth={"56%"}
                id={"transferType"}
                onChange={(value) => {
                  setclsType(value);
                  handleSelectChange(value);
                  const input = document.getElementById("TransferAcct");
                  // const input2 = document.getElementById("TransferAcct");
                  if (value === "A") {
                    setTimeout(() => {
                      input?.focus();
                    }, 0);
                  }
                  // else {
                  //   setTimeout(() => {
                  //     input2?.focus();
                  //   }, 0);
                  // }
                }}
                data={[
                  { label: "Cash", value: "C" },
                  { label: "Account", value: "A" },
                ]}
                value={clsType}
                disabled={fieldsObj?.transfer_type}
              />
            </div>

            {showInputField && (
              <div className="w-[43%]">
                <InputField
                  label={"Reference Number"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled={true}
                  value={referenceNum}
                />
              </div>
            )}
          </div>
          <hr className="mt-3 mb-2 border-1 ml-3 mr-3"></hr>
          {/* error modal  */}
          {errorModal && (
            <ErrorModal
              showModal={errorModal}
              handleClose={() => {
                setErrorModal(false);
                clearAcctValidation();
                const input = document.getElementById("accountNumber");
                input?.focus();
              }}
              data={errorData}
              acct_link={accountnumberEnter}
              proceedFunction={proceedFunction}
              cancelFunction={cancelFunction}
            />
          )}
          {/* account closure confirmation report */}
          {activeReportModal && (
            <ModalComponent
              open={activeReportModal}
              onClose={() => setActiveReportModal(false)}
              width={"80%"}
              content={
                loading ? (
                  <div className="animate-pulse">loading...</div>
                ) : (
                  <div id="viewer-host">
                    <Viewer
                      report={{ Uri: "/ActiveReport/account_closure_2.json" }}
                      theme="ActiveReports"
                    />
                  </div>
                )
              }
            />
          )}
          <div className="flex pt-5 items-center space-x-3">
            <div className="w-[45%]">
              <InputField
                id={"TransferAcct"}
                label={"Transfer Account Number"}
                labelWidth={"40%"}
                inputWidth={"56%"}
                type={"number"}
                required={true}
                // disabled={disableTransferAcc}
                disabled={fieldsObj?.transfer_acctlink || disableTransferAcc}
                // value={transAcct ? transAcct : accountnumber2}
                value={accountnumber2}
                onKeyDown={transferAccountFunc}
                onChange={(e) => {
                  setAccountNumber2(e.target.value);
                }}

                // label={"Account Number"}
                // id={"accountNumber"}
                // type={"number"}
                // labelWidth={"40%"}
                // inputWidth={"56%"}
                // required={true}
                // disabled={false}
                // value={accountnumber}
                // maxLength={22}
                // onChange={(e) => {
                //   setAccountNumber(e.target.value);
                //   // handlePhoneNumberChange(e);
                // }}
                // onKeyDown={onAccountNumberKeyDown}
              />
            </div>
            <div className="w-[8%]">
              <ButtonComponent
                onClick={() => {
                  setShowModal2(true);
                }}
                label="Search"
                buttonWidth="100%"
                buttonHeight="27px"
                buttonColor="white"
              />
            </div>

            <SearchModal
              setShowModal={setShowModal2}
              showModal={showModal2}
              handleSelected={handleSelected2}
            />
            <div className="w-[43%]">
              <InputField
                noMarginRight={true}
                inputWidth={"100%"}
                required={false}
                disabled={true}
                value={accountName2}
              />
            </div>
          </div>
          {/* last div   */}
          <div className="space-y-3">
            {/* <div className="flex space-x-3">
              <div className="w-[45%]">
                <InputField
                  id={"TransferAcct"}
                  label={"Transfer Account Number"}
                  labelWidth={"40%"}
                  inputWidth={"56%"}
                  type={"number"}
                  required={true}
                  disabled={disableTransferAcc}
                  // value={transAcct ? transAcct : accountnumber2}
                  value={accountnumber2}
                  onKeyDown={transferAccountFunc}
                  onChange={(e) => {
                    setAccountNumber2(e.target.value);
                  }}
                />
              </div>
              <div className="w-[52%]">
                <InputField
                  noMarginRight={true}
                  inputWidth={"100%"}
                  disabled={true}
                  value={accountName2}
                />
              </div>
            </div> */}

            <div className="w-[55%]">
              <ListOfValue
                id={"reason"}
                label={"Reason"}
                labelWidth={"32.5%"}
                inputWidth={"62%"}
                required={true}
                data={reason}
                value={sreason}
                onChange={(value) => {
                  const setSelectedOption = reason
                    ?.find((i) => i?.value === value)
                    ?.label?.split("-")[1];
                  setSreason(value);
                  setSreason2("");
                  setReasonDesc(setSelectedOption);
                  if (value === "999") {
                    setReasonDesc("");
                    const input = document.getElementById("Creason");
                    setTimeout(() => {
                      input?.focus();
                    }, 0);
                    setClosureReason(true);
                  } else {
                    const input = document.getElementById("sourceDoc");
                    setTimeout(() => {
                      input?.focus();
                    }, 0);
                    setClosureReason(false);
                  }
                }}
                onKeyPress={(e) => {
                  switchFocus(e, "reason");
                }}
                disabled={fieldsObj?.reason}
              />
            </div>

            <div className="pt-2">
              <TextAreaField
                id={"Creason"}
                label={"Closure Reason"}
                labelWidth={"18%"}
                inputWidth={"78%"}
                required={true}
                rows={2}
                disabled={closureReason ? false : true}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const input = document.getElementById("sourceDoc");
                    input?.focus();
                  }
                }}
                onChange={(e) => {
                  if (closureReason == true) {
                    setSreason2(e.target.value);
                  } else {
                    setSreason2("");
                  }
                }}
                value={sreason2}
              />
            </div>
          </div>
          <div className="flex items-center pb-5 space-x-3">
            <div className="w-[45%]">
              <InputField
                id={"sourceDoc"}
                label={"Source Document"}
                labelWidth={"40%"}
                inputWidth={"56%"}
                onChange={(e) => {
                  setToken(e.target.value);
                }}
                value={getToken}
                disabled={fieldsObj?.source_document}
              />
            </div>
            <div className="w-[8%]">
              <ButtonComponent
                onClick={DocumentViewModal}
                label={"View Doc"}
                buttonIcon={CustomButtons["viewDoc"]?.icon}
                buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                inputWidth={"30px"}
                buttonHeight={"26px"}
              />
              {sweetAlertConfirmed && (
                <Modal
                  opened={sweetAlertConfirmed}
                  onClose={() => setSweetAlertConfirmed(false)}
                  size="lg"
                  centered
                  style={{ height: "100%" }}
                  className="shadow-md shadow-black"
                >
                  <div className="flex items-center justify-between mx-2 p-2">
                    <div className="font-extrabold text-black">View Document</div>
                    <div
                      className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                      // onClick={() => setSweetAlertConfirmed(false)}
                    >
                      x
                    </div>
                  </div>
                  <Modal.Body>
                    {/* <ImageVerification accountNumber={imageAccount} /> */}
                    <DocumentViewing documentID={getToken} />
                  </Modal.Body>
                  {/* <Modal.Footer>
            <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
          </Modal.Footer> */}
                </Modal>
              )}
            </div>
          </div>
        </div>

        {/* right side account summary   */}
        <div className="w-[30%]">
          <div className="border rounded">
            <AccountSummary
              accountNumber={accountnumberEnter}
              setAccountDetails={setAccountDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CloseAccount;
