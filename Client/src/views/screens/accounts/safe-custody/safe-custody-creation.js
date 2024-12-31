import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import AccountSummary from "../../../../components/others/AccountSummary";
import InputField from "../../../../components/others/Fields/InputField";
import Label from "../../../../components/others/Label/Label";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../components/others/customtable";
import Header from "../../../../components/others/Header/Header";
// import SearchModal from "./components/custom-search-modal";
import axios from "axios";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../config/constant";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import CustomButtons from "../../../../components/others/CustomButtons";
import TextAreaField from "../../../../components/others/Fields/TextArea";
import DocumentViewing from "../../../../components/DocumentViewing";

const SafeCustodyCreation = () => {
  const [showModal, setShowModal] = useState(false);
  const [myObj, setMyObj] = useState({
    document_ref: "",
  });
  const [dummy, setDummy] = useState({ funding_ac: "" });
  const [accountDetails, setAccountDetails] = useState({});
  const [typeOfBox, setTypeOfBox] = useState([]);
  const [feesTransaction, setFeesTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [run, setRun] = useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // const handleSelected = async (value) => {
  //   setMyObj((prev) => ({
  //     ...prev,
  //     ["funding_ac_on_entered"]: value?.acct_link,
  //     ["funding_ac"]: value?.acct_link,
  //   }));
  //   setShowModal(false);
  // };

  console.log(myObj, "kofiiii");

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

  // get unique ref
  async function getUniqueRef() {
    await axios
      .get(API_SERVER + "/api/get-unique-ref", { headers })
      .then((response) => {
        if (response?.data?.length > 0) {
          setMyObj((prev) => ({
            ...prev,
            ["batch_no"]: response?.data[0]?.unique_ref,
          }));
        }
      });
  }

  useEffect(() => {
    // get unique ref
    async function getUniqueRef() {
      return await axios.get(API_SERVER + "/api/get-unique-ref", { headers });
    }

    async function getTypeOfBoxLOV() {
      return await axios.post(
        API_SERVER + "/api/safe-custody-creation",
        { type_of_box_lov: "true" },
        {
          headers,
        }
      );
    }

    async function gh() {
      await Promise.all([getUniqueRef(), getTypeOfBoxLOV()]).then(
        (response) => {
          if (response?.length > 0) {
            setMyObj((prev) => ({
              ...prev,
              ["batch_no"]: response[0]?.data[0]?.unique_ref,
            }));
            setTypeOfBox(response[1]?.data);
          }
        }
      );
    }
    gh();
  }, []);

  // focus
  const handleFocus = (id) => {
    const input = document.getElementById(id);
    setTimeout(() => {
      input?.focus();
    });
  };

  const onKeyDownFetchAccDetails = async (e) => {
    setMyObj((prev) => ({
      ...prev,
      account_number_on_entered: e.target.value,
    }));
    await axios
      .post(
        API_SERVER + "/api/safe-custody-creation",
        {
          fetch: "true",
          acct_link: e.target.value,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          const currency_code = response?.data[0]?.currency_code;
          const local_currency = response?.data[0]?.local_currency;
          setMyObj((prev) => ({ ...prev, ...response?.data[0] }));
          if (currency_code != local_currency) {
            axios
              .post(
                API_SERVER + "/api/get-error-message",
                { code: "06107" },
                { headers }
              )
              .then((response) => {
                if (response?.data) {
                  Swal.fire({
                    text: response?.data,
                    icon: "error",
                  }).then(() => {
                    setMyObj((prev) => ({
                      ...prev,
                      account_number: "",
                      account_number_on_entered: "",
                      account_descrp: "",
                    }));
                  });
                }
                handleFocus("account_number");
              })
              .catch((err) => {
                if (err) {
                  console.log("error here:" + err);
                }
              });
          } else {
            return true;
          }
        } else if (response?.data?.length === 0) {
          axios
            .post(
              API_SERVER + "/api/get-error-message",
              { code: "06107" },
              { headers }
            )
            .then((response) => {
              if (response?.data) {
                Swal.fire({
                  text: response?.data,
                  icon: "error",
                }).then(() => {
                  setMyObj((prev) => ({
                    ...prev,
                    account_number: "",
                    account_number_on_entered: "",
                    account_descrp: "",
                  }));
                });
              }
            })
            .catch((err) => {
              if (err) {
                console.log("error here:" + err);
              }
            });
        } else {
          return false;
        }
      })
      .catch((err) =>
        console.log(`error caught in final okay procedure : ${err}`)
      );
  };

  // handle submit
  const handleSubmit = async () => {
    await axios
      .post(
        API_SERVER + "/api/safe-custody-creation",
        {
          procedure: "safe custody",
          acct_link: myObj ? myObj?.account_number_on_entered : "",
          type_of_box: myObj ? myObj?.type_of_box?.trim() : "",
          batch_no: myObj ? myObj?.batch_no : "",
          document_ref: myObj ? myObj?.document_ref : "",
          custody_descrp: myObj ? myObj?.custody_description : "",
          comments_v: myObj ? myObj?.comments : "",
          global_bra: userInfo?.branchCode,
          username: userInfo?.id,
          machine_ip_v: localStorage?.getItem("ipAddress"),
          hostname_v: localStorage?.getItem("ipAddress"),
          form_code: "AEMB",
          global_prog: "REACT",
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "meee");
        if (response?.data?.length > 0) {
          const response_code = response?.data[0]?.RESPONSE_CODE;
          const mess = response?.data[0]?.RESPONSE_MESS;
          Swal.fire({
            text: mess,
            icon: response_code === "0" ? "error" : "success",
          }).then((result) => {
            if (result) {
              if (response_code === "0") {
                return true;
              } else {
                handleNewBtnClick();
                getUniqueRef();
              }
            }
          });
        }
      })
      .catch((err) =>
        console.log(`error caught in final okay procedure : ${err}`)
      );
  };
  //   myObj?.funding_ac_on_entered,
  // handle submit
  // const handleSubmit = async () => {
  //   await axios
  //     .post(
  //       API_SERVER + "/api/close-account-by-draft",
  //       {
  //         okay_procedure: "true",
  //         acct_link: myObj ? myObj?.funding_ac_on_entered : "",
  //         batch_no_v: myObj ? myObj.myObj?.batch_no : "",
  //         currency_code:
  //           accountDetails?.summary?.length > 0
  //             ? accountDetails?.summary[0]?.currency_code
  //             : "",
  //         amount: myObj ? myObj?.draft_amount : "",
  //         total_charges: myObj ? myObj?.total_charges : "",
  //         post_bookbal:
  //           accountDetails?.summary?.length > 0
  //             ? accountDetails?.summary[0]?.post_bookbal?.trim()
  //             : "",
  //         cheque_no: myObj ? myObj?.cheque_no : "",
  //         transaction_details: myObj ? myObj?.transaction_details : "",
  //         purchaser: myObj ? myObj?.purchaser : "",
  //         purchaser_address: myObj ? myObj?.purchaser_address : "",
  //         beneficiary: myObj ? myObj?.beneficiary : "",
  //         beneficiary_address: myObj ? myObj?.beneficiary_address : "",
  //         branch_code: userInfo?.branchCode,
  //         global_bra_v: userInfo?.branchCode,
  //         draftcls_flag: myObj ? myObj?.checked : "",
  //         posted_by: userInfo?.id,
  //         username: userInfo?.id,
  //         machine_ip: localStorage.getItem("ipAddress"),
  //         hostname: localStorage.getItem("ipAddress"),
  //         cheque_acct_link: myObj ? myObj?.cheque_ac : "",
  //         commission_acct_link: myObj ? myObj?.cheque_ac : "",
  //         trans_type: "444",
  //         form_code: "ACDB",
  //         // session_id,
  //         global_prog: "REACT",
  //       },
  //       { headers }
  //     )
  //     .then((response) => {
  //       if (response?.data?.length > 0) {
  //         const response_code = response.data[0]?.RESPONSE_CODE;
  //         const mess = response.data[0]?.RESPONSE_MESS;
  //         Swal.fire({
  //           text: mess,
  //           icon: response_code === "0" ? "error" : "success",
  //         }).then((result) => {
  //           if (result) {
  //             if (response_code === "0") {
  //               return true;
  //             } else {
  //               handleNewBtnClick();
  //               getUniqueRef();
  //             }
  //           }
  //         });
  //       }
  //     })
  //     .catch((err) =>
  //       console.log(`error caught in final okay procedure : ${err}`)
  //     );
  // };

  // initial value for the charges
  // fetch total charges
  // const onCheckClick = () => {
  //   setLoading(true);
  //   try {
  //     async function fetchTotalCharge1() {
  //       return await axios.post(
  //         API_SERVER + "/api/fee-transaction",
  //         {
  //           dbAccount: myObj ? myObj?.funding_ac_on_entered : "",
  //           // dbAccount: "004001210060678158",
  //           // funding_ac
  //           trans_code_v: "CLOSF",
  //           trans_amount: 0,
  //           batch_no_v: myObj ? myObj?.batch_no : "",
  //           posted_by_v: userInfo?.id,
  //           cbranch: userInfo?.branchCode,
  //           dbranch: userInfo?.branchCode,
  //           channel_v: "BRA",
  //           app_flag: "N",
  //           destiC: "A",
  //           form_code: "ACBD",
  //           rate_v: 0,
  //         },
  //         { headers }
  //       );
  //     }

  //     async function fetchTotalCharge2() {
  //       return await axios.post(
  //         API_SERVER + "/api/fee-transaction",
  //         {
  //           dbAccount: myObj ? myObj?.funding_ac_on_entered : "",
  //           // dbAccount: "004001210060678158",
  //           // funding_ac
  //           trans_code_v: "DRAFT",
  //           trans_amount: 0,
  //           batch_no_v: myObj ? myObj?.batch_no : "",
  //           posted_by_v: userInfo?.id,
  //           cbranch: userInfo?.branchCode,
  //           dbranch: userInfo?.branchCode,
  //           channel_v: "BRA",
  //           app_flag: "N",
  //           destiC: "A",
  //           form_code: "ACBD",
  //           rate_v: 0,
  //         },
  //         { headers }
  //       );
  //     }

  //     Promise.all([fetchTotalCharge1(), fetchTotalCharge2()]).then(
  //       (response) => {
  //         if (response?.length > 0) {
  //           setLoading(false);
  //           let totalSum = 0;
  //           let draft_amount = 0;
  //           const totalCharges = response[0]?.data?.totalCharges;
  //           const totalCharges2 = response[1]?.data?.totalCharges;
  //           totalSum += totalCharges + totalCharges2;
  //           // Perform the calculation
  //           const calculatedDraftAmount =
  //             accountDetails?.summary?.length > 0
  //               ? parseFloat(accountDetails?.summary[0]?.post_bookbal?.trim()) -
  //                 totalSum
  //               : 0;

  //           const calculatedDraftAmount2 =
  //             typeof calculatedDraftAmount === "number"
  //               ? calculatedDraftAmount.toFixed(2)
  //               : 0;
  //           draft_amount = formatNumber(calculatedDraftAmount2);
  //           const totalSum2 = totalSum ? formatNumber(totalSum) : 0;

  //           setMyObj((prev) => ({
  //             ...prev,

  //             ["total_charges"]: totalSum,
  //             ["total_charges_formatted"]: totalSum2,
  //             ["draft_amount"]: calculatedDraftAmount2,
  //             ["draft_amount_formatted"]: draft_amount,
  //           }));
  //         } else {
  //           axios
  //             .post(
  //               API_SERVER + "/api/get-error-message",
  //               { code: "00335" },
  //               { headers }
  //             )
  //             .then((response) => {
  //               Swal.fire({
  //                 text: response?.data,
  //                 icon: "error",
  //               }).then(() => {
  //                 setAccountDetails({});
  //                 setMyObj("");
  //               });
  //             });
  //         }
  //       }
  //     );
  //   } catch (err) {
  //     setLoading(false);

  //     console.log(`error caught: ${err}`);
  //   }
  // };

  // get amount in words
  // useEffect(() => {
  //   if (myObj?.checked === "Y") {
  //     axios
  //       .post(
  //         API_SERVER + "/api/close-account-by-draft",
  //         {
  //           get_amount_in_words: "true",
  //           currency_code:
  //             accountDetails?.summary?.length > 0
  //               ? accountDetails?.summary[0]?.currency_code
  //               : "",
  //           amount: myObj ? myObj?.draft_amount : "",
  //           // amount: myObj ? myObj?.draft_amount : 0,
  //         },
  //         { headers }
  //       )
  //       .then((response) => {
  //         console.log(response, "welcome");
  //         if (response?.data?.length > 0) {
  //           setMyObj((prev) => ({
  //             ...prev,
  //             ["amount_in_words"]: response?.data[0]?.amount_in_words,
  //           }));
  //         }
  //       });
  //   }
  // }, [myObj?.checked, myObj?.draft_amount]);

  // cheque amount validation
  // const chequeAmountValidation = () => {
  //   axios
  //     .post(
  //       API_SERVER + "/api/close-account-by-draft",
  //       {
  //         cheque_validation: "true",
  //         acct_link: myObj ? myObj?.cheque_ac : "",
  //         cheque_no: myObj ? myObj?.cheque_no : "",
  //       },
  //       { headers }
  //     )
  //     .then((response) => {
  //       console.log(response, "welcome");
  //       if (response?.data?.length > 0) {
  //         if (response?.data[0]?.RESPONSE_CODE === "000") {
  //           const mess = response?.data[0]?.RESPONSE_MESS;
  //           Swal.fire({
  //             text: mess,
  //             icon: "error",
  //           }).then((result) => {
  //             if (result) {
  //               setMyObj((prev) => ({ ...prev, ["cheque_no"]: "" }));
  //             }
  //           });
  //         } else if (response?.data[0]?.RESPONSE_CODE === "999") {
  //           const mess = response?.data[0]?.RESPONSE_MESS;

  //           setMyObj((prev) => ({ ...prev, ["cheque_no"]: mess }));
  //         } else {
  //           return false;
  //         }
  //       }
  //     });
  // };

  useEffect(() => {
    if (accountDetails && accountDetails?.summary?.length > 0) {
      setMyObj((prev) => ({
        ...prev,
        ["account_descrp_new"]: myObj?.account_descrp,
      }));
      handleFocus("type_of_box");
    }
  }, [accountDetails]);

  //   handle new function
  const handleNewBtnClick = () => {
    setMyObj("");
    setAccountDetails({});
    setFeesTransaction([]);
    setSweetAlertConfirmed(false);
    getUniqueRef();
    setTimeout(() => {
      setMyObj({ type_of_box: "" });
    }, 200);
  };

  function DocumentViewModal() {
    if (
      myObj?.document_ref === "" ||
      myObj?.document_ref === null ||
      myObj?.document_ref === undefined
    ) {
      axios
        .post(
          API_SERVER + "/api/get-error-message",
          { code: "01346" },
          { headers }
        )
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

  // get fees transaction
  async function fetchFeeTransaction(value) {
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/fee-transaction",
        {
          dbAccount: myObj ? myObj?.account_number_on_entered : "",
          trans_code_v: value,
          trans_amount: 0,
          batch_no_v: myObj ? myObj?.batch_no : "",
          posted_by_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
          cbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          dbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          channel_v: "BRA",
          app_flag: "N",
          destiC: "A",
          form_code: "AEMB",
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
        }
      });
  }

  // delete batch
  async function deleteFeeBeforeFetch(value) {
    await axios
      .post(
        API_SERVER + "/api/safe-custody-creation",
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
                myObj?.type_of_box,
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
  console.log(accountDetails, "acc details ");

  console.log({ myObj });

  console.log(loading, "loading");

  return (
    <div>
      {/* buttons  */}
      <div>
        <ActionButtons
          displayCancel={"none"}
          displayAuthorise={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayView={"none"}
          displayReject={"none"}
          displayRefresh={"none"}
          displayFetch={"none"}
          onNewClick={handleNewBtnClick}
          onOkClick={handleSubmit}
          //   onRefreshClick={refreshFunc}
          //   onFetchClick={fetchData}
        />
      </div>

      {/* hr  */}
      <hr className="mt-3" />

      {/* overflow here  */}
      <div>
        <div className="flex justify-end pt-3 px-4 mb-2">
          <div>
            <InputField
              label={"Request ID"}
              labelWidth={"25%"}
              inputWidth={"70%"}
              disabled={true}
              textAlign={"center"}
              value={myObj ? myObj?.batch_no : ""}
            />
          </div>
        </div>
        <hr className="mt-3" />
        {/* <div style={{ overflowY: "hidden" }}> */}
        <div className="flex  space-x-3 mt-3">
          {/* left side   */}
          <div className="w-[70%] border rounded space-y-4 p-2">
            {/* Funding A/C No */}
            <div className="flex items-center space-x-4 pt-1">
              <div className="w-[45%] ">
                <InputField
                  label={"Account No"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  type={"number"}
                  value={myObj ? myObj?.account_number : ""}
                  name={"account_number"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onKeyDownFetchAccDetails(e);
                    }
                  }}
                  required={true}
                />
              </div>

              <div className="w-[45%] flex space-x-4">
                {/* <p className="w-[20%]">
                  <ButtonComponent
                    onClick={() => {
                      setShowModal(true);
                    }}
                    label={"Search"}
                    buttonWidth={"100%"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                  />
                </p> */}

                {/* <SearchModal
                    setShowModal={setShowModal}
                    showModal={showModal}
                    handleSelected={handleSelected}
                  /> */}
                <p className="w-full">
                  <InputField
                    noMarginRight={true}
                    inputWidth={"100%"}
                    disabled={true}
                    value={myObj ? myObj?.account_descrp_new : ""}
                  />
                </p>
              </div>
            </div>

            {/* Currency and Branch*/}
            {/* <div className="flex items-center space-x-4">
              <div className="w-[45%] ">
                <InputField
                  label={"Currency"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled={true}
                />
              </div>
              <div className="w-[45%] ">
                <InputField
                  label={"A/C Branch"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled={true}
                />
              </div>
            </div> */}

            {/* type of box and end date*/}
            <div className="flex items-center space-x-4">
              <div className="w-[45%] ">
                <ListOfValue
                  label={"Type Of Box"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  id={"type_of_box"}
                  required={true}
                  data={typeOfBox}
                  onChange={(value) => {
                    const staff_acc = myObj ? myObj?.staff_by_account : "";
                    setMyObj((prev) => ({
                      ...prev,
                      type_of_box: value,
                    }));
                    if (
                      staff_acc === "N" &&
                      myObj?.account_number_on_entered !== ""
                    ) {
                      // fetchFeeTransaction(value);
                      deleteFeeBeforeFetch(value);
                    }
                  }}
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     // chequeAmountValidation();
                  //   }
                  // }}
                  value={myObj ? myObj?.type_of_box : ""}
                />
              </div>

              {/* hide end date  */}
              <div className="w-[45%] invisible">
                <InputField
                  label={"End Date"}
                  labelWidth={"55%"}
                  inputWidth={"45%"}
                  type={"date"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      end_date: e.target.value,
                    }))
                  }
                  value={myObj ? myObj?.end_date : ""}
                />
              </div>
            </div>

            {/* custody description*/}
            <div className="flex items-center space-x-4">
              <div className="w-full ">
                <TextAreaField
                  label={"Custody Description"}
                  labelWidth={"17.2%"}
                  inputWidth={"72.5%"}
                  required={true}
                  name={"custody_description"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={myObj ? myObj?.custody_description : ""}
                />
              </div>
            </div>

            {/* scan doc  */}
            <div className="flex items-center space-x-4 pt-1">
              <div className="w-[45%] ">
                <InputField
                  label={"Document Ref"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  // type={"number"}
                  value={myObj ? myObj?.document_ref : ""}
                  name={"document_ref"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     if (myObj?.funding_ac === "") {
                  //       axios
                  //         .post(
                  //           API_SERVER + "/api/get-error-message",
                  //           { code: "00103" },
                  //           { headers }
                  //         )
                  //         .then((response) => {
                  //           Swal.fire({
                  //             text: response?.data,
                  //             icon: "error",
                  //           }).then(() => {
                  //             //   setAccountDetails({});
                  //             setMyObj({ [e.target.name]: "" });
                  //           });
                  //         });
                  //     } else {
                  //       // setMyObj((prev) => ({
                  //       //   ...prev,
                  //       //   ["funding_ac_on_entered"]: e.target.value,
                  //       // }));
                  //       // handleSelected({ acct_link: e.target.value });
                  //     }
                  //   }
                  // }}
                  required={true}
                />

                {sweetAlertConfirmed && (
                  <div>
                    <Modal
                      opened={sweetAlertConfirmed}
                      onClose={() => setSweetAlertConfirmed(false)}
                      padding={0}
                      size={"lg"}
                    >
                      <DocumentViewing
                        documentID={myObj ? myObj?.document_ref : ""}
                      />
                    </Modal>
                  </div>
                )}
              </div>

              <div className="w-[45%] flex space-x-4">
                <p className="w-[30%]">
                  <ButtonComponent
                    onClick={DocumentViewModal}
                    label={"View Doc"}
                    buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                    buttonIcon={CustomButtons["viewDoc"]?.icon}
                    buttonWidth={"100px"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                  />
                </p>

                {/* <SearchModal
                    setShowModal={setShowModal}
                    showModal={showModal}
                    handleSelected={handleSelected}
                  /> */}
                <p className="w-[70%] invisible">
                  <InputField
                    noMarginRight={true}
                    inputWidth={"100%"}
                    disabled={true}
                    value={myObj ? myObj?.funding_ac_name : ""}
                  />
                </p>
              </div>
            </div>

            {/* comments*/}
            <div className="flex items-center space-x-4 pb-3">
              <div className="w-full ">
                <TextAreaField
                  label={"Comments"}
                  labelWidth={"17.2%"}
                  inputWidth={"72.5%"}
                  name={"comments"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={myObj ? myObj?.comments : ""}
                />
              </div>
            </div>
          </div>
          {/* right side  */}
          <div className="w-[30%]">
            <div className="border  rounded">
              <AccountSummary
                accountNumber={myObj ? myObj?.account_number_on_entered : ""}
                setAccountDetails={setAccountDetails}
              />
            </div>
          </div>
        </div>

        {/* data table  */}
        <div className="mt-[50px]">
          <Header title={"Charge details"} headerShade={true} />
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
            rowsPerPage={5}
            style={{ columnAlignRight: [5] }}
            load={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default SafeCustodyCreation;
