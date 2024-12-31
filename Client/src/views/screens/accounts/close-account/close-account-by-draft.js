import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import AccountSummary from "../../../../components/others/AccountSummary";
import InputField from "../../../../components/others/Fields/InputField";
import Label from "../../../../components/others/Label/Label";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../components/others/customtable";
import Header from "../../../../components/others/Header/Header";
import SearchModal from "./components/custom-search-modal";
import axios from "axios";
import Swal from "sweetalert2";
import { API_SERVER } from "../../../../config/constant";

const CLoseAccountByDraft = () => {
  const [showModal, setShowModal] = useState(false);
  const [myObj, setMyObj] = useState({
    funding_ac: "",
    funding_ac_name: "",
    checked: false,
  });
  const [dummy, setDummy] = useState({ funding_ac: "" });
  const [accountDetails, setAccountDetails] = useState({});
  const [commisionDetailsData, setCommisionDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSelected = async (value) => {
    setMyObj((prev) => ({
      ...prev,
      ["funding_ac_on_entered"]: value?.acct_link,
      ["funding_ac"]: value?.acct_link,
    }));
    setShowModal(false);
  };

  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === ".00") {
      return "";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf(".");

      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted =
          numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(
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
    //  batch number
    getUniqueRef();
  }, []);

  //   fetch transaction details
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/close-account-by-draft",
        {
          transaction_details: "true",
          acct_link: myObj ? myObj?.funding_ac_on_entered : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          setDummy((prev) => ({
            ...prev,
            ["transaction_details"]: response?.data[0]?.transaction_details,
          }));
        }
      })
      .catch((err) => console.log(`error caught: ${err}`));
  }, [myObj?.funding_ac_on_entered]);

  useEffect(() => {
    if (accountDetails && accountDetails?.summary?.length > 0) {
      axios
        .post(
          API_SERVER + "/api/close-account-by-draft",
          {
            get_cheque_details: "true",
            currency_code:
              accountDetails?.summary?.length > 0
                ? accountDetails?.summary[0]?.currency_code
                : "",
            // branch_code: userInfo?.branchCode,
            branch_code: "001",
          },
          { headers }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            setMyObj((prev) => ({
              ...prev,
              ["cheque_ac"]: response?.data[0]?.ac_no,
              ["cheque_ac_desc"]: response?.data[0]?.account_descrp,
            }));
          } else {
            axios
              .post(
                API_SERVER + "/api/get-error-message",
                { code: "00335" },
                { headers }
              )
              .then((response) => {
                Swal.fire({
                  text: response?.data,
                  icon: "error",
                }).then(() => {
                  setAccountDetails({});
                  setMyObj("");
                });
              });
          }
        })
        .catch((err) => console.log(`error caught: ${err}`));
    }
  }, [accountDetails, myObj?.funding_ac_on_entered]);

  {
    /* -- DR 07346 */
  }
  {
    /* -- BO 07317 */
  }
  {
    /* -- CLOS 07318 */
  }

  // cheque number and check cheque error
  // get_errorcode('00335');

  // if nvl(:two.local_equivalent_cr,0)<0 then
  // 	   msgbox ('ERROR','ERROR',get_errorcode('02279'));
  //   raise form_trigger_failure;
  // elsif :two.issuance_contra is null then
  // 	 msgbox ('ERROR','ERROR',get_errorcode('02280'));
  //       raise form_trigger_failure;
  // elsif :two.bank_chq is null then
  // 	   msgbox ('ERROR','ERROR',get_errorcode('02281'));
  //      raise form_trigger_failure;
  // elsif :two.transaction_details is null then
  // 	msgbox ('ERROR','ERROR',get_errorcode('02064'));
  //     raise form_trigger_failure;
  // elsif :two.purchaser is null then
  // 	msgbox ('ERROR','ERROR',get_errorcode('02282'));

  //   fetch details when acc number is valid
  useEffect(() => {
    if (accountDetails && accountDetails?.summary?.length === 0) {
      axios
        .post(
          API_SERVER + "/api/get-error-message",
          { code: "01349" },
          { headers }
        )
        .then((response) => {
          Swal.fire({
            text: response?.data,
            icon: "error",
          }).then(() => {
            setAccountDetails({});
            setMyObj("");
          });
        });
    } else if (accountDetails && accountDetails?.summary?.length > 0) {
      if (accountDetails?.summary[0]?.status_indicator === "DR") {
        // example : 004001104318100168
        axios
          .post(
            API_SERVER + "/api/get-error-message",
            { code: "07346" },
            { headers }
          )
          .then((response) => {
            Swal.fire({
              text: response?.data,
              icon: "error",
            }).then(() => {
              setAccountDetails({});
              setMyObj("");
            });
          });
      } else if (accountDetails?.summary[0]?.status_indicator === "BO") {
        // example : 004004300426270276
        axios
          .post(
            API_SERVER + "/api/get-error-message",
            { code: "07317" },
            { headers }
          )
          .then((response) => {
            Swal.fire({
              text: response?.data,
              icon: "error",
            }).then(() => {
              setAccountDetails({});
              setMyObj("");
            });
          });
      } else if (accountDetails?.summary[0]?.status_indicator === "CLOS") {
        // example : 004004300423550396
        axios
          .post(
            API_SERVER + "/api/get-error-message",
            { code: "07318" },
            { headers }
          )
          .then((response) => {
            Swal.fire({
              text: response?.data,
              icon: "error",
            }).then(() => {
              setAccountDetails({});
              setMyObj("");
            });
          });
      } else {
        // setting  account name from account number
        setMyObj((prev) => ({
          ...prev,
          ["funding_ac_name"]: accountDetails?.summary[0]?.account_name,
          ["purchaser"]: accountDetails?.summary[0]?.account_name,
          ["transaction_details"]: dummy?.transaction_details,
          ["user_branch"]: `${userInfo?.branchCode} - ${userInfo?.branch}`,
          ["cheque_ac"]: dummy?.ac_no,
          ["cheque_ac_desc"]: dummy?.account_descrp,
        }));
      }
    } else {
      return;
    }
  }, [accountDetails]);

  // console.log(dummy, "bro 2");
  //   useEffect(()=>{

  //   })

  //   myObj?.funding_ac_on_entered,
  // handle submit
  const handleSubmit = async () => {
    await axios
      .post(
        API_SERVER + "/api/close-account-by-draft",
        {
          okay_procedure: "true",
          acct_link: myObj ? myObj?.funding_ac_on_entered : "",
          batch_no_v: myObj ? myObj.myObj?.batch_no : "",
          currency_code:
            accountDetails?.summary?.length > 0
              ? accountDetails?.summary[0]?.currency_code
              : "",
          amount: myObj ? myObj?.draft_amount : "",
          total_charges: myObj ? myObj?.total_charges : "",
          post_bookbal:
            accountDetails?.summary?.length > 0
              ? accountDetails?.summary[0]?.post_bookbal?.trim()
              : "",
          cheque_no: myObj ? myObj?.cheque_no : "",
          transaction_details: myObj ? myObj?.transaction_details : "",
          purchaser: myObj ? myObj?.purchaser : "",
          purchaser_address: myObj ? myObj?.purchaser_address : "",
          beneficiary: myObj ? myObj?.beneficiary : "",
          beneficiary_address: myObj ? myObj?.beneficiary_address : "",
          branch_code: userInfo?.branchCode,
          global_bra_v: userInfo?.branchCode,
          draftcls_flag: myObj ? myObj?.checked : "",
          posted_by: userInfo?.id,
          username: userInfo?.id,
          machine_ip: localStorage.getItem("ipAddress"),
          hostname: localStorage.getItem("ipAddress"),
          cheque_acct_link: myObj ? myObj?.cheque_ac : "",
          commission_acct_link: myObj ? myObj?.cheque_ac : "",
          trans_type: "444",
          form_code: "ACDB",
          // session_id,
          global_prog: "REACT",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          const response_code = response.data[0]?.RESPONSE_CODE;
          const mess = response.data[0]?.RESPONSE_MESS;
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

  // initial value for the charges
  // fetch total charges
  const onCheckClick = () => {
    setLoading(true);
    try {
      async function fetchTotalCharge1() {
        return await axios.post(
          API_SERVER + "/api/fee-transaction",
          {
            dbAccount: myObj ? myObj?.funding_ac_on_entered : "",
            // dbAccount: "004001210060678158",
            // funding_ac
            trans_code_v: "CLOSF",
            trans_amount: 0,
            batch_no_v: myObj ? myObj?.batch_no : "",
            posted_by_v: userInfo?.id,
            cbranch: userInfo?.branchCode,
            dbranch: userInfo?.branchCode,
            channel_v: "BRA",
            app_flag: "N",
            destiC: "A",
            form_code: "ACBD",
            rate_v: 0,
          },
          { headers }
        );
      }

      async function fetchTotalCharge2() {
        return await axios.post(
          API_SERVER + "/api/fee-transaction",
          {
            dbAccount: myObj ? myObj?.funding_ac_on_entered : "",
            // dbAccount: "004001210060678158",
            // funding_ac
            trans_code_v: "DRAFT",
            trans_amount: 0,
            batch_no_v: myObj ? myObj?.batch_no : "",
            posted_by_v: userInfo?.id,
            cbranch: userInfo?.branchCode,
            dbranch: userInfo?.branchCode,
            channel_v: "BRA",
            app_flag: "N",
            destiC: "A",
            form_code: "ACBD",
            rate_v: 0,
          },
          { headers }
        );
      }

      Promise.all([fetchTotalCharge1(), fetchTotalCharge2()]).then(
        (response) => {
          if (response?.length > 0) {
            setLoading(false);
            let totalSum = 0;
            let draft_amount = 0;
            const totalCharges = response[0]?.data?.totalCharges;
            const totalCharges2 = response[1]?.data?.totalCharges;
            totalSum += totalCharges + totalCharges2;
            // Perform the calculation
            const calculatedDraftAmount =
              accountDetails?.summary?.length > 0
                ? parseFloat(accountDetails?.summary[0]?.post_bookbal?.trim()) -
                  totalSum
                : 0;

            const calculatedDraftAmount2 =
              typeof calculatedDraftAmount === "number"
                ? calculatedDraftAmount.toFixed(2)
                : 0;
            draft_amount = formatNumber(calculatedDraftAmount2);
            const totalSum2 = totalSum ? formatNumber(totalSum) : 0;

            setMyObj((prev) => ({
              ...prev,

              ["total_charges"]: totalSum,
              ["total_charges_formatted"]: totalSum2,
              ["draft_amount"]: calculatedDraftAmount2,
              ["draft_amount_formatted"]: draft_amount,
            }));
          } else {
            axios
              .post(
                API_SERVER + "/api/get-error-message",
                { code: "00335" },
                { headers }
              )
              .then((response) => {
                Swal.fire({
                  text: response?.data,
                  icon: "error",
                }).then(() => {
                  setAccountDetails({});
                  setMyObj("");
                });
              });
          }
        }
      );
    } catch (err) {
      setLoading(false);

      console.log(`error caught: ${err}`);
    }
  };

  // fetch all transactions in the CustomTable after the check procedure
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/close-account-by-draft",
        {
          fetch_data: "true",
          batch_no_v: myObj ? myObj?.batch_no : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          const arr = [];
          response?.data?.map((i) => {
            const {
              acct_link,
              account_name,
              transaction_details,
              credit_amount,
              currency,
              // currency_desc,
            } = i;
            arr.push([
              "DRAFT",
              acct_link,
              account_name,
              transaction_details,
              formatNumber(credit_amount),
              currency,
              // currency_desc,
            ]);
          });
          setCommisionDetailsData(arr);
        }
      })
      .catch((err) => console.log(`error caught: ${err}`));
    // }
  }, [myObj?.total_charges_formatted, myObj?.draft_amount_formatted]);

  // get amount in words
  useEffect(() => {
    if (myObj?.checked === "Y") {
      axios
        .post(
          API_SERVER + "/api/close-account-by-draft",
          {
            get_amount_in_words: "true",
            currency_code:
              accountDetails?.summary?.length > 0
                ? accountDetails?.summary[0]?.currency_code
                : "",
            amount: myObj ? myObj?.draft_amount : "",
            // amount: myObj ? myObj?.draft_amount : 0,
          },
          { headers }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            setMyObj((prev) => ({
              ...prev,
              ["amount_in_words"]: response?.data[0]?.amount_in_words,
            }));
          }
        });
    }
  }, [myObj?.checked, myObj?.draft_amount]);

  // cheque amount validation
  const chequeAmountValidation = () => {
    axios
      .post(
        API_SERVER + "/api/close-account-by-draft",
        {
          cheque_validation: "true",
          acct_link: myObj ? myObj?.cheque_ac : "",
          cheque_no: myObj ? myObj?.cheque_no : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          if (response?.data[0]?.RESPONSE_CODE === "000") {
            const mess = response?.data[0]?.RESPONSE_MESS;
            Swal.fire({
              text: mess,
              icon: "error",
            }).then((result) => {
              if (result) {
                setMyObj((prev) => ({ ...prev, ["cheque_no"]: "" }));
              }
            });
          } else if (response?.data[0]?.RESPONSE_CODE === "999") {
            const mess = response?.data[0]?.RESPONSE_MESS;

            setMyObj((prev) => ({ ...prev, ["cheque_no"]: mess }));
          } else {
            return false;
          }
        }
      });
  };

  //   handle new function
  const handleNewBtnClick = () => {
    setMyObj("");
    setAccountDetails({});
    setDummy("");
    setCommisionDetailsData([]);
    setShowModal(false);
  };

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
        {/* <div style={{ overflowY: "hidden" }}> */}
        <div className="flex  space-x-3 mt-3">
          {/* left side   */}
          <div className="w-[70%] border rounded space-y-3 p-2">
            {/* Funding A/C No */}
            <div className="flex items-center space-x-4 pt-1">
              <div className="w-[45%] ">
                <InputField
                  label={"Funding A/C No"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  type={"number"}
                  value={myObj ? myObj?.funding_ac : ""}
                  name={"funding_ac"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (myObj?.funding_ac === "") {
                        axios
                          .post(
                            API_SERVER + "/api/get-error-message",
                            { code: "00103" },
                            { headers }
                          )
                          .then((response) => {
                            Swal.fire({
                              text: response?.data,
                              icon: "error",
                            }).then(() => {
                              //   setAccountDetails({});
                              setMyObj({ [e.target.name]: "" });
                            });
                          });
                      } else {
                        // setMyObj((prev) => ({
                        //   ...prev,
                        //   ["funding_ac_on_entered"]: e.target.value,
                        // }));
                        handleSelected({ acct_link: e.target.value });
                      }
                    }
                  }}
                  required={true}
                />
              </div>

              <div className="w-[45%] flex space-x-4">
                <p className="w-[20%]">
                  <ButtonComponent
                    onClick={() => {
                      setShowModal(true);
                    }}
                    label={"Search"}
                    buttonWidth={"100%"}
                    buttonHeight={"27px"}
                    buttonColor={"white"}
                  />

                  <SearchModal
                    setShowModal={setShowModal}
                    showModal={showModal}
                    handleSelected={handleSelected}
                  />
                </p>
                <p className="w-[80%]">
                  <InputField
                    noMarginRight={true}
                    inputWidth={"100%"}
                    disabled={true}
                    value={myObj ? myObj?.funding_ac_name : ""}
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

            <p className="capitalize text-red-500 ms-[40px]">
              do not add commission to the draft amount
            </p>

            {/* draft  */}
            <div className="flex items-center">
              <div className="w-[50%] flex items-center ">
                <p className="w-[38%] flex flex-end">
                  <Label
                    label={"Draft Amount"}
                    labelWidth={"100%"}
                    required={true}
                  />
                </p>
                <p className="flex items-center">
                  <input
                    type="checkbox"
                    className="me-1"
                    checked={myObj?.checked === "Y" ? true : false}
                    onChange={(e) => {
                      const newValue = e.currentTarget.checked;
                      setMyObj((prev) => ({
                        ...prev,
                        ["checked"]: newValue === true ? "Y" : "N",
                      }));
                      if (newValue === true) {
                        onCheckClick();
                      }
                    }}
                    // onClick={() => {
                    //   if (myObj?.checked === true) {
                    //     alert("hey");
                    //   }
                    // }}
                  />
                  <Label
                    label={"For Account Closure"}
                    labelColor={"teal"}
                    fontSize={"95%"}
                  />
                </p>
              </div>
              <div className="w-[50%] invisible">
                <InputField
                  noMarginRight={true}
                  inputWidth={"95%"}
                  disabled={true}
                />
              </div>
            </div>

            {/* amount and amount desc  */}
            <div className="flex items-center space-x-4">
              <div className="w-[45%] ">
                <InputField
                  label={"Amount"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled={true}
                  textAlign={"right"}
                  value={myObj ? myObj?.draft_amount_formatted : ""}
                />
              </div>
              <div className="w-[45%] invisible">
                <InputField
                  noMarginRight={true}
                  inputWidth={"100%"}
                  disabled={true}
                  value={myObj ? myObj?.amount_in_words : ""}
                />
              </div>
            </div>

            {/* amount in words no*/}
            <div className="flex items-center space-x-4">
              <div className="w-full ">
                <InputField
                  label={"Amount In Words"}
                  labelWidth={"17%"}
                  inputWidth={"72.5%"}
                  disabled={true}
                  value={myObj ? myObj?.amount_in_words : ""}
                />
              </div>
            </div>

            {/* cheque no and branch*/}
            <div className="flex items-center space-x-4">
              <div className="w-[45%] ">
                <InputField
                  label={"Cheque No"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  name={"cheque_no"}
                  type={"number"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      chequeAmountValidation();
                    }
                  }}
                  value={myObj ? myObj?.cheque_no : ""}
                />
              </div>
              <div className="w-[45%] ">
                <InputField
                  label={"User Branch"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled={true}
                  value={myObj ? myObj?.user_branch : ""}
                />
              </div>
            </div>

            <hr className="mt-3" />

            {/* purchaser no*/}
            <div className="flex items-center space-x-4">
              <div className="w-full ">
                <InputField
                  label={"Purchaser"}
                  labelWidth={"17%"}
                  inputWidth={"72.5%"}
                  required={true}
                  name={"purchaser"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={myObj ? myObj?.purchaser : ""}
                />
              </div>
            </div>

            {/* purchaser address*/}
            <div className="flex items-center space-x-4">
              <div className="w-full ">
                <InputField
                  label={"Purchaser Address"}
                  labelWidth={"17%"}
                  inputWidth={"72.5%"}
                  required={true}
                  name={"purchaser_address"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={myObj ? myObj?.purchaser_address : ""}
                />
              </div>
            </div>

            {/* beneficiary*/}
            <div className="flex items-center space-x-4">
              <div className="w-full ">
                <InputField
                  label={"Beneficiary"}
                  labelWidth={"17%"}
                  inputWidth={"72.5%"}
                  required={true}
                  name={"beneficiary"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={myObj ? myObj?.beneficiary : ""}
                />
              </div>
            </div>

            {/* beneficiary address*/}
            <div className="flex items-center space-x-4">
              <div className="w-full ">
                <InputField
                  label={"Beneficiary Address"}
                  labelWidth={"17%"}
                  inputWidth={"72.5%"}
                  required={true}
                  name={"beneficiary_address"}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  value={myObj ? myObj?.beneficiary_address : ""}
                />
              </div>
            </div>

            {/* transaction details*/}
            <div className="flex items-center space-x-4 pb-1">
              <div className="w-full ">
                <InputField
                  label={"Transaction Details"}
                  labelWidth={"17%"}
                  inputWidth={"72.5%"}
                  required={true}
                  name={"transaction_details"}
                  value={myObj ? myObj?.transaction_details : ""}
                  onChange={(e) =>
                    setMyObj((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          {/* right side  */}
          <div className="w-[30%]">
            <div className="border  rounded">
              <AccountSummary
                accountNumber={myObj ? myObj?.funding_ac_on_entered : ""}
                setAccountDetails={setAccountDetails}
              />
            </div>

            <div className="w-full border rounded mt-4 space-y-3 p-3">
              <div className="flex align-center justify-center w-full ">
                <InputField
                  label={"Cheque Account"}
                  labelWidth={"40%"}
                  inputWidth={"55%"}
                  disabled={true}
                  value={myObj ? myObj?.cheque_ac : ""}
                />
              </div>
              <div className="flex align-center justify-center w-full ">
                <InputField
                  label={"Cheque Account Name"}
                  labelWidth={"40%"}
                  inputWidth={"55%"}
                  disabled={true}
                  value={myObj ? myObj?.cheque_ac_desc : ""}
                />
              </div>
              <div className="flex align-center justify-center w-full ">
                <InputField
                  label={"Charges Amount"}
                  labelWidth={"40%"}
                  inputWidth={"55%"}
                  disabled={true}
                  value={myObj ? myObj?.total_charges_formatted : ""}
                  textAlign={"right"}
                />
              </div>

              {/* </div> */}
            </div>

            <div></div>
          </div>
        </div>

        {/* data table  */}
        <div className="mt-2">
          <Header title={"draft - commission details"} headerShade={true} />
          <CustomTable
            headers={[
              "Chg Code",
              "Fee Account",
              "Fee Account Description",
              "Fee Description",
              "Fee Amount Per Book",
              "Currency",
            ]}
            data={commisionDetailsData}
            rowsPerPage={2}
            style={{ columnAlignRight: [5] }}
            load={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CLoseAccountByDraft;
