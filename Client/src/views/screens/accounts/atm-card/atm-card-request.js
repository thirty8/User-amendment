import React, { useState, useEffect } from "react";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import AccountSummary from "../../../../components/others/AccountSummary";
import InputField from "../../../../components/others/Fields/InputField";
import SelectField from "../../../../components/others/Fields/SelectField";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import TextAreaField from "../../../../components/others/Fields/TextArea";
import { API_SERVER } from "../../../../config/constant";
import Header from "../../../../components/others/Header/Header";
import CustomTable from "../../../../components/others/customtable";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import Swal from "sweetalert2";
import swal from "sweetalert";
import axios from "axios";
// import DocumentViewing from "../../../../components/DocumentViewing";
import DocumentViewing from "../../../../components/DocumentViewing";
// import DocumentViewing from "../../../../components/DocumentCapture";

import { Modal } from "@mantine/core";
import CustomButtons from "../../../../components/others/CustomButtons";
// import ErrorModal from "./components/error-modal";

const AtmCardRequest = () => {
  const [myObj, setMyObj] = useState({});
  const [branchLOV, setBranchLOV] = useState([]);
  const [atmLOV, setATMLov] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feesTransaction, setFeesTransaction] = useState([]);
  const [accountDetails, setAccountDetails] = useState([]);
  const [run, setRun] = useState(false);
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    handleFocus("acct_link");
    async function getBranch() {
      return await axios.post(
        API_SERVER + "/api/atm-card-request",
        { branch_lov: "true" },
        { headers }
      );
    }
    async function getATM() {
      return await axios.post(
        API_SERVER + "/api/atm-card-request",
        { atm_lov: "true" },
        { headers }
      );
    }
    async function getBatchNumber() {
      return await axios.get(API_SERVER + "/api/get-unique-ref", { headers });
    }

    async function gh() {
      await Promise.all([getBranch(), getATM(), getBatchNumber()]).then(
        (response) => {
          setBranchLOV(response[0]?.data);
          setATMLov(response[1]?.data);
          handleOnChange("batch_no", response[2]?.data[0]?.unique_ref);

          // console.log(response[2]?.data[0]?.unique_ref, "bro");
        }
      );
    }
    gh();
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(API_SERVER + "/api/get-unique-ref", { headers })
  //     .then((response) => {
  //       if (response?.data?.length > 0) {
  //         handleOnChange("batch_no", response?.data[0]?.unique_ref);
  //         console.log(response?.data[0]?.unique_ref, "dennis");
  //       }
  //     })
  //     .catch((err) => console.log("error in fetching batch number:" + err));
  // }, []);

  const handleOnChange = (key, value) => {
    setMyObj((prev) => ({ ...prev, [key]: value }));
  };

  // format amount
  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === ".00") {
      return "";
    } else {
      const numberString = num?.toString();
      const decimalIndex = numberString?.indexOf(".");

      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted =
          numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString?.substr(0, decimalIndex);
        const decimalPart = numberString?.substr(decimalIndex);
        const formattedInteger = integerPart?.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        return formattedInteger + decimalPart;
      }
    }
  }

  const onKeyDownAccNum = async (e) => {
    handleOnChange("account_number_on_entered", e.target.value);

    async function fetchAccDetails() {
      await axios
        .post(
          API_SERVER + "/api/atm-card-request",
          { fetch: "true", acct_link: e.target.value },
          { headers }
        )
        .then((response) => {
          console.log(response, "torsco");
          if (response?.data?.length > 0) {
            const count = response?.data[0]?.count;
            if (count > 0) {
              axios
                .post(
                  API_SERVER + "/api/get-error-message",
                  { code: "06345" },
                  { headers }
                )
                .then((response) => {
                  if (response?.data) {
                    Swal.fire({
                      text: response?.data,
                      icon: "error",
                    }).then(() => {
                      setAccountDetails({});
                      setMyObj((prev) => ({
                        ...prev,
                        account_number_on_entered: "",
                        acct_link: "",
                        account_name: "",
                      }));
                    });
                  }
                });
            } else if (response?.data?.length === 0) {
              axios
                .post(
                  API_SERVER + "/api/get-error-message",
                  { code: "06021" },
                  { headers }
                )
                .then((response) => {
                  if (response?.data) {
                    Swal.fire({
                      text: response?.data,
                      icon: "error",
                    }).then(() => {
                      setAccountDetails({});
                      setMyObj((prev) => ({
                        ...prev,
                        account_number_on_entered: "",
                        acct_link: "",
                        account_name: "",
                      }));
                    });
                  }
                });
            } else {
              //   setRun(!run);
              // setLoading(true);
              // const charge = response[1]?.data[0]?.totalCharges?.toFixed(2);
              const data = response?.data[1];
              setMyObj((prev) => ({
                ...prev,
                acct_link: data?.accts,
                account_name: data?.account_descrp,
                // charges: charge,
                // formatted_charges: formatNumber(charge),
              }));
              handleFocus("name_on_card");
            }
          }
        })
        .catch((err) => console.log(`error : ${err}`));
      // }
      // async function feeTransaction() {
      //   return await axios.post(
      //     API_SERVER + "/api/fee-transaction",
      //     {
      //       dbAccount: e.target.value,
      //       trans_code_v: "CDFE",
      //       trans_amount: 0,
      //       batch_no_v: myObj ? myObj?.batch_no : "",
      //       posted_by_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
      //       cbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      //       dbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      //       channel_v: "BRA",
      //       app_flag: "N",
      //       destiC: "A",
      //       form_code: "ATAA",
      //       rate_v: 0,
      //     },
      //     {
      //       headers,
      //     }
      //   );
      // }

      //         if (response?.data?.length > 0) {
      //           const count = response[0]?.data[0]?.count;
      //           if (count > 0) {
      //             axios
      //             .post(
      //               API_SERVER + "/api/get-error-message",
      //               { code: "06345" },
      //               { headers }
      //             )
      //             .then(() => {
      //               setAccountDetails({});
      //               setMyObj((prev) => ({
      //                 ...prev,
      //                 account_number_on_entered: "",
      //                 acct_link: "",
      //                 account_name: "",
      //               }));
      //             });
      //           } else if (response[1]?.data?.length === 0) {
      //             axios
      //             .post(
      //                 API_SERVER + "/api/get-error-message",
      //                 { code: "06021" },
      //                 { headers }
      //               )
      //               .then(() => {
      //                 setAccountDetails({});
      //                 setMyObj((prev) => ({
      //                   ...prev,
      //                   account_number_on_entered: "",
      //                   acct_link: "",
      //                   account_name: "",
      //                 }));
      //               });
      //             } else {
      //               setRun(!run);
      //             setLoading(true);
      //             const charge = response[1]?.data[0]?.totalCharges?.toFixed(2);
      //             const data = response[0]?.data[1];
      //             setMyObj((prev) => ({
      //               ...prev,
      //               acct_link: data?.accts,
      //               account_name: data?.account_descrp,
      //               charges: charge,
      //               formatted_charges: formatNumber(charge),
      //             }));
      //           }
      //         }
      //       }
      //     );
      //   }
      //   // }
      //   gh();
    }
    fetchAccDetails();
    // }
  };

  // useEffect(() => {
  //   async function runFunc() {
  //     let sum = 0;
  //     const arr = [];
  //     await axios
  //       .post(
  //         API_SERVER + "/api/atm-card-request",
  //         { get_fees: "true", batch_no: myObj ? myObj?.batch_no : "" },
  //         { headers }
  //       )
  //       .then((response) => {
  //         if (response?.data?.length > 0) {
  //           response?.data?.map((i) => {
  //             sum += i?.credit_amount;
  //             arr.push([
  //               "SDFE",
  //               i?.acct_link,
  //               i?.account_name,
  //               i?.transaction_details,
  //               formatNumber(i?.credit_amount),
  //               i?.currency,
  //             ]);
  //           });

  //           arr.push([
  //             "",
  //             "",
  //             "",
  //             <span className="font-semibold text-right">Total</span>,
  //             <span className="font-semibold">{formatNumber(sum)}</span>,
  //             "",
  //           ]);

  //           const input = document.getElementById("name_on_card");
  //           input?.focus();
  //         }
  //         setFeesTransaction(arr);
  //         setLoading(false);
  //       })
  //       .catch((err) => console.log("error in fees:" + err));
  //   }

  //   runFunc();
  // }, [run]);

  // get fees transaction
  async function fetchFeeTransaction(value) {
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/fee-transaction",
        {
          dbAccount: myObj ? myObj?.account_number_on_entered : "",
          trans_code_v: value?.trim(),
          trans_amount: 0,
          batch_no_v: myObj ? myObj?.batch_no : "",
          posted_by_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
          cbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          dbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          channel_v: "BRA",
          app_flag: "N",
          destiC: "A",
          form_code: "ATAA",
          rate_v: 0,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response, "eric");
        if (Object.keys(response)?.data?.length > 0) {
          setRun(!run);
          const charge = response?.data?.totalCharges?.toFixed(2);
          setMyObj((prev) => ({
            ...prev,
            charges: charge,
            formatted_charges: formatNumber(charge),
          }));
          handleFocus("branch");
        }
      });
  }

  // delete batch
  async function deleteFeeBeforeFetch(value) {
    await axios
      .post(
        API_SERVER + "/api/atm-card-request",
        {
          delete_batch: "true",
          batch_no: myObj ? myObj?.batch_no : "",
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response, "hubert");
        if (response?.data?.length > 0) {
          if (response?.data[0]?.mess_code === "1") {
            fetchFeeTransaction(value);
          }
        }
      })
      .catch((err) => console.log(`error in deleting batch : ${err}`));
  }

  useEffect(() => {
    async function runFunc() {
      let sum = 0;
      const arr = [];
      await axios
        .post(
          API_SERVER + "/api/atm-card-request",
          { get_fees: "true", batch_no: myObj ? myObj?.batch_no : "" },
          { headers }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            response?.data?.map((i) => {
              sum += i?.credit_amount;
              arr.push([
                myObj?.atm_card_type,
                // "SCCHG",
                i?.acct_link,
                i?.account_name,
                i?.transaction_details,
                formatNumber(i?.credit_amount),
                i?.currency,
              ]);
            });

            arr.push([
              "",
              "",
              "",
              <span className="font-semibold text-right">Total</span>,
              <span className="font-semibold">{formatNumber(sum)}</span>,
              "",
            ]);

            // const input = document.getElementById("name_on_card");
            // input?.focus();
          }
          setLoading(false);
          setFeesTransaction(arr);
        })
        .catch((err) => console.log("error in fees:" + err));
    }

    runFunc();
  }, [run, loading]);

  const handleFocus = (id) => {
    const input = document.getElementById(id);
    setTimeout(() => {
      input?.focus();
    });
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
          // onNewClick={handleNewClick}
          // onOkClick={handleOkClick}
        />
      </div>

      <hr className="mt-3 mb-2 border-1"></hr>

      <div className="flex justify-end py-[10px] mb-2">
        <div className="me-2">
          <InputField
            label={"Request ID"}
            labelWidth={"35%"}
            inputWidth={"60%"}
            disabled={true}
            value={myObj ? myObj?.batch_no : ""}
            textAlign={"center"}
          />
        </div>
      </div>

      <hr className="mt-3 mb-2 border-1"></hr>

      <div className="flex space-x-5  mt-5">
        {/* left side  */}
        <div className="space-y-5 w-[70%] border rounded ">
          <div className="flex pt-5">
            <div className="w-[54%]">
              <InputField
                label={"Account Number"}
                id={"acct_link"}
                type={"number"}
                labelWidth={"37%"}
                inputWidth={"56%"}
                required={true}
                disabled={false}
                value={myObj ? myObj?.acct_link : ""}
                maxLength={22}
                onChange={(e) => handleOnChange("acct_link", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onKeyDownAccNum(e);
                  }
                }}
              />
            </div>
            <div className="w-[43%]">
              <InputField
                noMarginRight={true}
                inputWidth={"100%"}
                required={false}
                disabled={true}
                value={myObj ? myObj?.account_name : ""}
              />
            </div>
          </div>

          <hr className="mt-3 mb-2 border-1 ml-3 mr-3"></hr>
          <div className="">
            <InputField
              label={"Card Display Name"}
              labelWidth={"20%"}
              inputWidth={"75%"}
              required={true}
              id={"name_on_card"}
              onChange={(e) =>
                handleOnChange("name_on_card", e.target.value?.toUpperCase())
              }
              value={myObj ? myObj?.name_on_card : ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFocus("atm_card_type");
                }
              }}
            />
          </div>

          <div className="flex">
            <div className="w-[54%]">
              <ListOfValue
                label={"ATM Card Type"}
                required={true}
                labelWidth={"37%"}
                inputWidth={"56%"}
                id={"atm_card_type"}
                data={atmLOV}
                onChange={(value) => {
                  handleOnChange("atm_card_type", value);
                  deleteFeeBeforeFetch(value);
                }}
                value={myObj ? myObj?.atm_card_type : ""}
              />
            </div>
            {/* <div className="w-[43%]">
              <ListOfValue
                label={"Delivery Branch"}
                required={true}
                labelWidth={"27%"}
                inputWidth={"70%"}
                id={"transferType"}
                //   value={accountname}
              />
            </div> */}

            {/* {showInputField && (
              <div className="w-[43%]">
                <InputField
                  label={"Reference Number"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled={true}
                  // value={referenceNum}
                />
              </div>
            )} */}
          </div>

          <div className="flex pb-5">
            <div className="w-[54%]">
              <ListOfValue
                label={"Delivery Branch"}
                required={true}
                id={"branch"}
                labelWidth={"37%"}
                inputWidth={"56%"}
                onChange={(value) => handleOnChange("branch_value", value)}
                value={myObj ? myObj?.branch_value : ""}
                data={branchLOV}
              />
            </div>
          </div>

          {/* error modal  */}
          {/* {errorModal && (
          <ErrorModal
            showModal={errorModal}
            handleClose={() => {
              setErrorModal(false);
              clearAcctValidation();
              const input = document.getElementById("accountNumber");
              input?.focus();
            }}
            data={errorData}
          />
        )} */}
        </div>

        {/* right side account summary   */}
        <div className="w-[30%]">
          <div className="border rounded">
            <AccountSummary
              accountNumber={myObj ? myObj?.account_number_on_entered : ""}
              setAccountDetails={setAccountDetails}
            />
          </div>
        </div>
      </div>
      {/* data table  */}
      <div className="mt-[30px]">
        <Header title={"Fees details"} headerShade={true} />
        <CustomTable
          headers={[
            "Chg Code",
            "Fee Account",
            "Fee Account Description",
            "Fee Description",
            "Fee Amount Per Book",
            "Currency",
          ]}
          data={feesTransaction}
          rowsPerPage={4}
          style={{ columnAlignRight: [5] }}
          load={loading}
        />
      </div>
    </div>
  );
};

export default AtmCardRequest;
