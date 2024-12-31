import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../../components/others/customtable";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import SearchModal from "../../../../components/others/SearchModal";
import DocumentViewing from "../../../../components/DocumentViewing";
import ImageVerification from "../../../../components/ImageVerification";
import ModalComponent from "../../../../components/others/Modal/modal";
import Swal from "sweetalert2";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import AccountSummary from "../../../../components/others/AccountSummary";
import CustomButtons from "../../../../components/others/CustomButtons";
const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const SinglePayment = () => {
  const [myObj, setMyObj] = useState({
    transtype_code: "",
    currency_code: "",
    show_debit_acc_details: false,
    show_credit_acc_details: false,
  });
  const [myObject, setMyObject] = useState([]);
  const [showViewDoc, setShowViewDoc] = useState(false);
  const [showSignVer, setShowSignVer] = useState(false);
  const [disableCurrency, setDisableCurrency] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [accountDetails, setAccountDetails] = useState([]);
  const [newData, setNewData] = useState([]);
  const [temp, setTemp] = useState({ edit_state: false });
  const [storedCurrencies, setStoredCurrencies] = useState([]);
  const [storedTransTypes, setStoredTransTypes] = useState([]);

  const handleOnChange = (key, value) => {
    setMyObj((prev) => ({ ...prev, [key]: value }));
  };

  // convert date to yy/mm/dd
  function formatDateToYMD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const dates = new Date(JSON.parse(localStorage.getItem("userInfo"))?.postingDate);

  // getting effective date
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const date = new Date(dates);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const effectiveDate = `${day}-${month}-${year}`;

  // get batch number and all currencies
  useEffect(() => {
    async function getBatchNumber() {
      return await axios.get(API_SERVER + "/api/get-unique-ref", {
        headers,
      });
    }
    async function getCurrencies() {
      return await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "CUR" },
        {
          headers,
        }
      );
    }
    async function getTransTypes() {
      return await axios.post(
        API_SERVER + "/api/single-payment",
        { trans_type_lov: "true" },
        {
          headers,
        }
      );
    }
    Promise.all([getBatchNumber(), getCurrencies(), getTransTypes()]).then((response) => {
      handleOnChange("batch_no", response[0]?.data[0]?.unique_ref);
      handleOnChange("effective_date", effectiveDate);
      setStoredCurrencies(response[1]?.data);
      setStoredTransTypes(response[2]?.data);
    });
  }, []);

  // getting new batch bumber
  const getNewBatchNumber = async () => {
    await axios
      .get(API_SERVER + "/api/get-unique-ref", {
        headers,
      })
      .then((response) => {
        if (response?.data?.length > 0) {
          handleOnChange("batch_no", response?.data[0]?.unique_ref);
          handleOnChange("effective_date", effectiveDate);
        }
      })
      .catch((err) => console.log(`error in batch number: ${err}`));
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
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString?.substr(0, decimalIndex);
        const decimalPart = numberString?.substr(decimalIndex);
        const formattedInteger = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

  function handleDocumentNo() {
    if (myObj?.doc_ref === "" || myObj?.doc_ref === null || myObj?.doc_ref === undefined) {
      axios
        .post(API_SERVER + "/api/get-error-message", { code: "01346" }, { headers })
        .then((response) => {
          if (response?.data) {
            Swal.fire({
              text: response?.data,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          if (err) {
            console.log("error here:" + err);
          }
        });
    } else {
      setShowViewDoc(true);
    }
  }

  function handleSignVerification() {
    if (myObj?.debit_bban === "" || myObj?.debit_bban === null || myObj?.debit_bban === undefined) {
      axios
        .post(API_SERVER + "/api/get-error-message", { code: "01230" }, { headers })
        .then((response) => {
          if (response?.data) {
            Swal.fire({
              text: response?.data,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          if (err) {
            console.log("error here:" + err);
          }
        });
    } else {
      setShowSignVer(true);
    }
  }

  console.log(myObj, "single payment");

  //   handle credit bban on key down
  async function onCreditBbanKeyDown(lov, e, value) {
    setMyObj((prev) => ({
      ...prev,
      bban_on_entered: lov === true ? value : e.target.value,
      show_debit_acc_details: false,
      show_credit_acc_details: true,
    }));

    await axios
      .post(
        API_SERVER + "/api/single-payment",
        {
          credit_bban_validation: "true",
          credit_bban: lov === true ? value : e.target.value,
          debit_bban: myObj?.debit_bban || "",
          trans_type_v: myObj?.transtype_code || "",
          currency_code_v: myObj?.currency_code || "",
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "res");
        if (response?.data?.length > 0) {
          const data = response?.data[0];
          if (data?.RESPONSE_CODE === "999") {
            Swal.fire({
              text: data?.RESPONSE_MESS,
              icon: "error",
            }).then(() => {
              handleOnChange("credit_bban", "");
              handleOnChange("credit_bban_ac_name", "");
              const input = document.getElementById("credit_bban");
              input?.focus();
            });
          } else if (data?.RESPONSE_CODE === "100") {
            Swal.fire({
              text: data?.RESPONSE_MESS,
              icon: "info",
            });
            // .then(() => {
            //   const ac_name =
            //     accountDetails?.data?.summary?.length > 0
            //       ? accountDetails?.data?.summary[0]?.account_name
            //       : "";
            //   console.log(ac_name, "ac name");
            //   handleOnChange("credit_bban_ac_name", ac_name);
            // });
          } else {
            return;
          }
        }
      })
      .catch((err) => console.log(`error caught in credit bban: ${err}`));
  }

  //  for credit bban
  function handleSelected(value) {
    setMyObj((prev) => ({
      ...prev,
      credit_bban: value?.accountNumber,
      credit_bban_ac_name: value?.accountName,
    }));
    onCreditBbanKeyDown(true, null, value?.accountNumber);
    setShowModal(false);
  }

  //   handle debit bban on key down
  async function onDebitBbanKeyDown(lov, e, value) {
    setMyObj((prev) => ({
      ...prev,
      bban_on_entered: lov === true ? value : e.target.value,
      show_debit_acc_details: true,
      show_credit_acc_details: false,
    }));

    await axios
      .post(
        API_SERVER + "/api/single-payment",
        {
          debit_bban_validation: "true",
          debit_bban: lov === true ? value : e.target.value,
          credit_bban: myObj?.credit_bban || "",
          trans_type_v: myObj?.transtype_code || "",
          currency_code_v: myObj?.currency_code || "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          const data = response?.data[0];
          if (data?.RESPONSE_CODE === "999") {
            Swal.fire({
              text: data?.RESPONSE_MESS,
              icon: "error",
            }).then(() => {
              setMyObj((prev) => ({
                ...prev,
                debit_bban: "",
                bban_on_entered: "",
                debit_bban_ac_name: "",
              }));
              const input = document.getElementById("debit_bban");
              input?.focus();
            });
          } else if (data?.RESPONSE_CODE === "100") {
            Swal.fire({
              text: data?.RESPONSE_MESS,
              icon: "info",
            });
          } else {
            return;
          }
        }
      })
      .catch((err) => console.log(`error caught in debit bban: ${err}`));
  }

  //  for debit bban
  function handleSelected2(value) {
    setMyObj((prev) => ({
      ...prev,
      debit_bban: value?.accountNumber,
      debit_bban_ac_name: value?.accountName,
      show_debit_acc_details: true,
      show_credit_acc_details: false,
    }));
    onDebitBbanKeyDown(true, null, value?.accountNumber);
    setShowModal2(false);
  }

  // handle errors to fetch all errors
  const fetchErrors = async (error_code, field) => {
    return await axios
      .post(API_SERVER + "/api/get-error-message", { code: error_code }, { headers })
      .then((response) => {
        if (response?.data?.length > 0) {
          const mess = response?.data;
          Swal.fire({
            text: mess,
            icon: "error",
          }).then(() => {
            const input = document.getElementById(field);
            setTimeout(() => {
              input?.focus();
            }, 100);
          });
        }
      });
  };

  useEffect(() => {
    if (accountDetails && accountDetails?.summary?.length > 0) {
      if (myObj?.show_debit_acc_details === true) {
        setMyObj((prev) => ({
          ...prev,
          debit_bban_ac_name: accountDetails?.summary[0]?.account_name,
          debit_bban_curr: accountDetails?.summary[0]?.currency,
        }));
      } else if (myObj?.show_credit_acc_details === true) {
        setMyObj((prev) => ({
          ...prev,
          credit_bban_ac_name: accountDetails?.summary[0]?.account_name,
          credit_bban_curr: accountDetails?.summary[0]?.currency,
        }));
      } else {
        return;
      }
    }
  }, [accountDetails]);

  console.log(accountDetails, "accountDetails");

  //    amount validation
  const handleAmount = (e) => {
    if (myObj?.debit_bban === "" || myObj?.debit_bban_ac_name === "") {
      fetchErrors("05877", "debit_bban");
    } else {
      const post_bookbal = parseFloat(
        accountDetails?.summary?.length > 0 ? accountDetails?.summary[0]?.post_bookbal : 0
      );
      const amount =
        e.target.value === "" || isNaN(e.target.value) ? 0 : parseFloat(e.target.value);

      const unauth_od = accountDetails?.summary[0]?.unauth_od;
      if (post_bookbal - amount < 0 && unauth_od === "N") {
        fetchErrors("01237", "amount");
        handleOnChange("amount", "");
      }
    }
  };

  // validating credit and debit account to make sure they are not the same
  // const validateBothAccNumbers = () => {
  //   if (
  //     myObj?.debit_bban?.length > 5 &&
  //     myObj?.credit_bban?.length > 5 &&
  //     myObj?.debit_bban === myObj?.credit_bban
  //   ) {
  //     return axios
  //       .post(API_SERVER + "/api/get-error-message", { code: "01235" }, { headers })
  //       .then((response) => {
  //         if (response?.data) {
  //           Swal.fire({
  //             text: response?.data,
  //             icon: "error",
  //           }).then(() => {
  //             setMyObj((prev) => ({
  //               ...prev,
  //               debit_bban: "",
  //               debit_bban_ac_name: "",
  //             }));
  //           });
  //         }
  //       });
  //   }
  // };

  function handleRemoveAll() {
    if (myObject?.length !== 0) {
      Swal.fire({
        text: "Are you sure you want to delete all records from the table?",
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: "No",
        cancelButtonColor: "red",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            setMyObj((prev) => ({
              batch_no: prev?.batch_no,
              effective_date: prev?.effective_date,
              currency_code: prev?.currency_code,
              show_debit_acc_details: false,
              show_credit_acc_details: false,
              total_debit: "0.00",
              total_credit: "0.00",
            }));
            setNewData([]);
            setMyObject([]);
            setAccountDetails([]);
          }, 100);
        }
      });
    }
  }

  // insert function
  const handleInsert = () => {
    if (
      myObj?.transtype_code === "" ||
      myObj?.transtype_code === undefined ||
      myObj?.transtype_code === null
    ) {
      fetchErrors("06183", "transtype_code");
    }
    if (
      myObj?.currency_code === "" ||
      myObj?.currency_code === undefined ||
      myObj?.currency_code === null
    ) {
      fetchErrors("01589", "currency_code");
    }
    if (
      myObj?.credit_bban === "" ||
      myObj?.credit_bban_ac_name === "" ||
      myObj?.credit_bban === undefined ||
      myObj?.credit_bban === null
    ) {
      fetchErrors("06509", "credit_bban");
    } else if (
      myObj?.debit_bban === "" ||
      myObj?.debit_bban_ac_name === "" ||
      myObj?.debit_bban === undefined ||
      myObj?.debit_bban === null
    ) {
      fetchErrors("05877", "debit_bban");
    }

    if (
      myObj?.debit_bban?.length > 5 &&
      myObj?.credit_bban?.length > 5 &&
      myObj?.debit_bban === myObj?.credit_bban
    ) {
      fetchErrors("01235", "debit_bban");
    } else if (myObj?.amount === "" || myObj?.amount === undefined || myObj?.amount === null) {
      fetchErrors("01237", "amount");
    } else if (
      myObj?.value_date === "" ||
      myObj?.value_date === undefined ||
      myObj?.value_date === null
    ) {
      fetchErrors("01751", "value_date");
    } else if (
      myObj?.cr_narration === "" ||
      myObj?.cr_narration === undefined ||
      myObj?.cr_narration === null
    ) {
      fetchErrors("02324", "cr_narration");
    } else if (
      myObj?.db_narration === "" ||
      myObj?.db_narration === undefined ||
      myObj?.db_narration === null
    ) {
      fetchErrors("02324", "db_narration");
    } else {
      if (myObject?.length === 0) {
        setMyObject((prev) => [...prev, myObj]);
        setDisableCurrency(true);
        // setTimeout(() => {
        setMyObj((prev) => ({
          db_amt: prev?.db_amt,
          cr_amt: prev?.cr_amt,
          batch_no: prev?.batch_no,
          effective_date: prev?.effective_date,
          currency_code: prev?.currency_code,
          show_debit_acc_details: false,
          show_credit_acc_details: false,
        }));
        // }, 100);
      }

      if (myObject?.length > 0) {
        const exists = myObject?.find((i) => {
          return Object.entries(i).every(([key, value]) => {
            return myObj.hasOwnProperty(key) && myObj[key] === value;
          });
        });

        if (exists) {
          Swal.fire({
            text: "Record Already Exists",
            icon: "error",
          });
        } else {
          setDisableCurrency(true);
          setMyObject((prev) => [...prev, myObj]);
          // setTimeout(() => {
          setMyObj((prev) => ({
            db_amt: prev?.db_amt,
            cr_amt: prev?.cr_amt,
            batch_no: prev?.batch_no,
            effective_date: prev?.effective_date,
            currency_code: prev?.currency_code,
            show_debit_acc_details: false,
            show_credit_acc_details: false,
          }));
          // }, 100);
        }
      }
    }
  };

  console.log(newData, "my object");

  //  update function
  const handleUpdate = () => {
    if (
      myObj?.transtype_code === "" ||
      myObj?.transtype_code === undefined ||
      myObj?.transtype_code === null
    ) {
      fetchErrors("06183", "transtype_code");
    }
    if (
      myObj?.currency_code === "" ||
      myObj?.currency_code === undefined ||
      myObj?.currency_code === null
    ) {
      fetchErrors("01589", "currency_code");
    }
    if (
      myObj?.credit_bban === "" ||
      myObj?.credit_bban_ac_name === "" ||
      myObj?.credit_bban === undefined ||
      myObj?.credit_bban === null
    ) {
      fetchErrors("06509", "credit_bban");
    } else if (
      myObj?.debit_bban === "" ||
      myObj?.debit_bban_ac_name === "" ||
      myObj?.debit_bban === undefined ||
      myObj?.debit_bban === null
    ) {
      fetchErrors("05877", "debit_bban");
    }

    if (
      myObj?.debit_bban?.length > 5 &&
      myObj?.credit_bban?.length > 5 &&
      myObj?.debit_bban === myObj?.credit_bban
    ) {
      fetchErrors("01235", "debit_bban");
    } else if (myObj?.amount === "" || myObj?.amount === undefined || myObj?.amount === null) {
      fetchErrors("01237", "amount");
    } else if (
      myObj?.value_date === "" ||
      myObj?.value_date === undefined ||
      myObj?.value_date === null
    ) {
      fetchErrors("01751", "value_date");
    } else if (
      myObj?.cr_narration === "" ||
      myObj?.cr_narration === undefined ||
      myObj?.cr_narration === null
    ) {
      fetchErrors("02324", "cr_narration");
    } else if (
      myObj?.db_narration === "" ||
      myObj?.db_narration === undefined ||
      myObj?.db_narration === null
    ) {
      fetchErrors("02324", "db_narration");
    } else {
      if (myObject?.length > 0) {
        const exists = myObject?.find((i) => {
          return Object.entries(i).every(([key, value]) => {
            return myObj.hasOwnProperty(key) && myObj[key] === value;
          });
        });

        if (exists) {
          Swal.fire({
            text: "Record Already Exists",
            icon: "error",
          });
        } else {
          setDisableCurrency(true);
          // setMyObject((prev) => [...prev, myObj]);
          setMyObject((prev) => {
            const updatedArray = [...prev];
            updatedArray[temp?.index] = myObj;
            return updatedArray;
          });
          setTemp({ edit_state: false });
          setAccountDetails([]);
          // setTimeout(() => {
          setMyObj((prev) => ({
            db_amt: prev?.db_amt,
            cr_amt: prev?.cr_amt,
            batch_no: prev?.batch_no,
            effective_date: prev?.effective_date,
            currency_code: prev?.currency_code,
            show_debit_acc_details: false,
            show_credit_acc_details: false,
          }));
        }
      }
    }
  };

  const handleNewClick = () => {
    setTimeout(() => {
      setMyObj({
        show_debit_acc_details: false,
        show_credit_acc_details: false,
      });
      setDisableCurrency(false);
      setMyObject([]);
      setNewData([]);
      getNewBatchNumber();
      setAccountDetails([]);
    }, 100);
  };

  useEffect(() => {
    const arr = [];
    if (myObject?.length > 0) {
      myObject?.map((i, key) => {
        const debitData = [
          i?.debit_bban || "",
          i?.debit_bban_ac_name || "",
          i?.doc_ref || "",
          i?.db_narration || "",
          i?.debit_bban_curr || "",
          formatNumber(i?.db_amt || 0),
          "",
          <div className="flex justify-around ">
            <ButtonComponent
              onClick={() => handleEdit(i, key)}
              buttonIcon={CustomButtons["edit"]?.icon}
              buttonColor={CustomButtons["edit"]?.bgColor}
            />
            <ButtonComponent
              buttonIcon={CustomButtons["delete"]?.icon}
              buttonColor={CustomButtons["delete"]?.bgColor}
              onClick={() => handleRemoveFunc(key)}
              buttonBackgroundColor={"red"}
            />
          </div>,
        ];
        const creditData = [
          i?.credit_bban || "",
          i?.credit_bban_ac_name || "",
          i?.doc_ref || "",
          i?.cr_narration || "",
          i?.credit_bban_curr || "",
          "",
          formatNumber(i?.cr_amt || 0),
          <div className="flex justify-around ">
            <ButtonComponent
              onClick={() => handleEdit(i, key)}
              buttonIcon={CustomButtons["edit"]?.icon}
              buttonColor={CustomButtons["edit"]?.bgColor}
            />
            <ButtonComponent
              buttonIcon={CustomButtons["delete"]?.icon}
              buttonColor={CustomButtons["delete"]?.bgColor}
              onClick={() => handleRemoveFunc(key)}
              buttonBackgroundColor={"red"}
            />
          </div>,
        ];

        return arr.push(debitData, creditData);
      });
    }

    const totalAmount = myObject
      ?.filter((i) => i?.db_amt)
      ?.map((i) => parseFloat(isNaN(i?.db_amt) ? 0 : i?.db_amt))
      ?.reduce((acc, currentValue) => acc + currentValue, 0);

    setNewData([...arr]);
    // this total is for credit and debit
    setMyObj((prev) => ({
      ...prev,
      total_debit: formatNumber(totalAmount || 0),
      total_credit: formatNumber(totalAmount || 0),
    }));
  }, [myObject]);

  console.log(myObject, "object");

  const handleEdit = (rowData, index) => {
    setTemp((prev) => ({ ...prev, edit_state: true, index: index }));
    setMyObj(rowData);

    setTimeout(() => {
      const input = document.getElementById("account_number");
      input?.focus();
    }, 100);
  };

  // handle remove record
  const handleRemoveFunc = (index) => {
    Swal.fire({
      text: "Are you sure you want to delete this record from the table?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Record has been deleted successfully",
          icon: "success",
          timer: 2000,
        });
        setMyObject((prev) => {
          const updatedArray = [...prev];
          updatedArray?.splice(index, 1);
          return updatedArray;
        });
      }
    });
  };

  const handleSubmit = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const myData = myObject?.map((i) => ({
      p_trans_sys_code: i ? i?.transtype_code?.trim() : "",
      p_debit_bban_v: i ? i?.debit_bban?.trim() : "",
      p_credit_bban_v: i ? i?.credit_bban?.trim() : "",
      p_amount_v: i ? parseFloat(i?.amount).toFixed(2) : "",
      p_scan_doc_v: i ? i?.doc_ref?.trim() : "",
      p_value_date_v: i ? i?.value_date?.trim() : "",
      p_debit_narration_v: i ? i?.db_narration?.trim() : "",
      p_credit_narration_v: i ? i?.cr_narration?.trim() : "",
    }));

    console.log(myData, "torsco");

    // Swal.fire({
    //   text: "Processing...",
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    await axios
      .post(
        API_SERVER + "/api/single-payment",
        {
          okay_procedure: "true",
          p_data_v: myData,
          currency_code_v: myObj?.currency_code || "",
          batch_no_v: myObj?.batch_no || "",
          debit_total_v: isNaN(parseFloat(myObj?.total_debit))
            ? 0
            : Number(parseFloat(myObj?.total_debit).toFixed(2)),
          credit_total_v: isNaN(parseFloat(myObj?.total_credit))
            ? 0
            : Number(parseFloat(myObj?.total_credit).toFixed(2)),
          username_v: userInfo?.id,
          form_code_v: "TTBP",
          global_branch_v: userInfo?.branchCode,
          global_prog_v: "React",
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "twas");
        if (response?.data?.length > 0) {
          const response_code = response?.data[0]?.RESPONSE_CODE;
          const response_mess = response?.data[0]?.RESPONSE_MESS;
          Swal.fire({
            text: response_mess,
            icon: response_code === "999" ? "error" : "success",
          }).then((result) => {
            if (result.isConfirmed && response_code === "000") {
              setTimeout(() => {
                setMyObj({
                  show_debit_acc_details: false,
                  show_credit_acc_details: false,
                });
                setDisableCurrency(false);
                setMyObject([]);
                setNewData([]);
                getNewBatchNumber();
                setAccountDetails([]);
              }, 100);
            }
          });
        } else {
          // Swal.close();
        }
      })
      .catch((err) => console.log(`error caught in final procedure: ${err}`));
  };

  return (
    <div className="max-h-screen overflow-auto">
      <ActionButtons
        displayAuthorise={"none"}
        displayView={"none"}
        displayFetch={"none"}
        displayCancel={"none"}
        displayRefresh={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayReject={"none"}
        onNewClick={handleNewClick}
        onOkClick={handleSubmit}
      />
      <hr className="mt-1" />

      {/* view doc  */}
      {showViewDoc && (
        <ModalComponent
          open={showViewDoc}
          onClose={() => setShowViewDoc(false)}
          width={"55%"}
          content={
            <div>
              <DocumentViewing documentID={myObj ? myObj?.doc_ref : ""} />
            </div>
          }
        />
      )}

      {/* sign verification  */}
      {showSignVer && (
        <ModalComponent
          open={showSignVer}
          onClose={() => setShowSignVer(false)}
          width={"55%"}
          content={
            <div>
              <ImageVerification accountNumber={myObj ? myObj?.debit_bban : ""} />
            </div>
          }
        />
      )}

      <div className="flex justify-end me-2 py-3">
        <div>
          <InputField
            label={"Batch No"}
            labelWidth={"20%"}
            inputWidth={"65%"}
            textAlign={"center"}
            value={myObj?.batch_no || ""}
            disabled
          />
        </div>
        <div className="ps-2">
          <InputField
            label={"Effective Date"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            textAlign={"center"}
            value={myObj?.effective_date || ""}
            disabled
          />
        </div>
      </div>
      <hr />

      <div className="flex w-full space-x-3 mt-1">
        {/* left  */}
        <div className="w-[71%] border-2 rounded p-2 space-y-3">
          <div className="w-[65%] pt-1">
            <ListOfValue
              label={"Trans Type"}
              labelWidth={"27.5%"}
              inputWidth={"52%"}
              onChange={(value) => {
                const label = storedTransTypes
                  ?.find((i) => i?.value === value)
                  ?.label?.split("-")[1]
                  ?.trim();
                handleOnChange("transtype_code", value);
                handleOnChange("cr_narration", label);
                handleOnChange(
                  "voucher_date",
                  formatDateToYMD(JSON.parse(localStorage.getItem("userInfo"))?.postingDate)
                );
              }}
              value={myObj?.transtype_code || ""}
              data={storedTransTypes}
              required
            />
          </div>
          <div className="w-[65%]">
            <ListOfValue
              label={"Currency"}
              labelWidth={"27.5%"}
              inputWidth={"52%"}
              onChange={(value) => handleOnChange("currency_code", value)}
              value={myObj?.currency_code || ""}
              data={storedCurrencies}
              disabled={disableCurrency}
              required
            />
          </div>

          {/* credit bban  */}
          <div className="flex items-center space-x-3">
            <div className="w-[45%]">
              <InputField
                label={"Credit BBAN"}
                id={"credit_bban"}
                type={"number"}
                labelWidth={"40%"}
                inputWidth={"56%"}
                required
                value={myObj?.credit_bban || ""}
                // onBlur={validateBothAccNumbers}
                onChange={(e) => {
                  handleOnChange("credit_bban", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onCreditBbanKeyDown(false, e, null);
                  }
                }}
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
            <div className="w-[43%]">
              <InputField
                noMarginRight={true}
                inputWidth={"100%"}
                disabled
                value={myObj?.credit_bban_ac_name || ""}
              />
            </div>
          </div>

          {/* debit bban  */}
          <div className="flex items-center space-x-3">
            <div className="w-[45%]">
              <InputField
                label={"Debit BBAN"}
                id={"debit_bban"}
                type={"number"}
                labelWidth={"40%"}
                inputWidth={"56%"}
                required
                value={myObj?.debit_bban || ""}
                // onBlur={validateBothAccNumbers}
                onChange={(e) => {
                  handleOnChange("debit_bban", e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onDebitBbanKeyDown(false, e, null);
                  }
                }}
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
                disabled
                value={myObj?.debit_bban_ac_name || ""}
              />
            </div>
          </div>

          {/* amount, sign ver and doc ref  */}
          <div className="flex items-center space-x-3">
            <div className="w-[54.2%]">
              <div className="flex w-full space-x-3 items-center">
                <div className="w-[80%]">
                  <InputField
                    label={"Amount"}
                    labelWidth={"42.3%"}
                    inputWidth={"50%"}
                    type={"number"}
                    onChange={(e) => {
                      setMyObj((prev) => ({
                        ...prev,
                        amount: e.target.value,
                        db_amt: e.target.value,
                        cr_amt: e.target.value,
                      }));
                      // handleOnChange("amount", e.target.value);
                      // handleOnChange("db_amt", e.target.value);
                      // handleOnChange("cr_amt", e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAmount(e);
                      }
                    }}
                    // onBlur={(e) => handleAmount(e)}
                    value={myObj?.amount || ""}
                    required
                  />
                </div>
                <div className="w-[20%]">
                  <ButtonComponent
                    onClick={handleSignVerification}
                    label={"Sign Ver"}
                    buttonWidth={"100%"}
                    buttonBackgroundColor={CustomButtons?.sigVer?.bgColor}
                    buttonIcon={CustomButtons?.sigVer?.icon}
                  />{" "}
                </div>
              </div>
            </div>
            <div className="w-[43.1%]">
              <div className="flex w-full space-x-3 items-center">
                <div className="w-[75%]">
                  <InputField
                    label={"Doc Ref"}
                    labelWidth={"35.8%"}
                    inputWidth={"55%"}
                    onChange={(e) => handleOnChange("doc_ref", e.target.value)}
                    value={myObj?.doc_ref || ""}
                  />
                </div>
                <div className="w-[25%]">
                  <ButtonComponent
                    onClick={handleDocumentNo}
                    label={"View Doc"}
                    buttonWidth={"100%"}
                    buttonBackgroundColor={CustomButtons?.viewDoc?.bgColor}
                    buttonIcon={CustomButtons?.viewDoc?.icon}
                    on
                  />{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-[54.2%]">
              <div className="flex w-full space-x-3 items-center">
                <div className="w-[80%]">
                  <InputField
                    label={"Value Date"}
                    labelWidth={"42.3%"}
                    inputWidth={"50%"}
                    onChange={(e) => handleOnChange("value_date", e.target.value)}
                    value={myObj?.value_date || ""}
                    required
                    type={"date"}
                  />
                </div>
                <div className="w-[20%] invisible">
                  <ButtonComponent
                    label={"Sign Ver"}
                    buttonWidth={"100%"}
                    buttonBackgroundColor={CustomButtons?.sigVer?.bgColor}
                    buttonIcon={CustomButtons?.sigVer?.icon}
                  />{" "}
                </div>
              </div>
            </div>
            <div className="w-[43.1%]">
              <div className="flex w-full space-x-3 items-center">
                <div className="w-[75%]">
                  <InputField
                    label={"Voucher Date"}
                    labelWidth={"35.8%"}
                    inputWidth={"55%"}
                    onChange={(e) => handleOnChange("voucher_date", e.target.value)}
                    value={myObj?.voucher_date || ""}
                    type={"date"}
                  />
                </div>
                <div className="w-[25%] invisible">
                  <ButtonComponent
                    label={"View Doc"}
                    buttonWidth={"100%"}
                    buttonBackgroundColor={CustomButtons?.viewDoc?.bgColor}
                    buttonIcon={CustomButtons?.viewDoc?.icon}
                  />{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <InputField
              label={"Cr Narration"}
              labelWidth={"17.8%"}
              inputWidth={"78.5%"}
              onChange={(e) => handleOnChange("cr_narration", e.target.value?.toUpperCase())}
              value={myObj?.cr_narration || ""}
              required
            />
          </div>
          <div className="w-full pb-1">
            <InputField
              label={"Db Narration"}
              labelWidth={"17.8%"}
              inputWidth={"78.5%"}
              onChange={(e) => handleOnChange("db_narration", e.target.value?.toUpperCase())}
              value={myObj?.db_narration || ""}
              required
            />
          </div>
        </div>
        {/* right */}
        <div className="w-[29%] rounded">
          <AccountSummary
            accountNumber={myObj?.bban_on_entered || ""}
            setAccountDetails={setAccountDetails}
          />
        </div>
      </div>

      {/* buttons  */}
      <div className="flex mt-3 mb-2 space-x-9 justify-center">
        <ButtonComponent
          // label={"Insert"}
          label={temp?.edit_state ? "Update" : "Insert"}
          buttonWidth="8%"
          type={"button"}
          buttonHeight={"30px"}
          buttonColor={"white"}
          buttonIcon={CustomButtons["insert"]?.icon}
          buttonBackgroundColor={CustomButtons["insert"]?.bgColor}
          onClick={temp?.edit_state ? handleUpdate : handleInsert}
        />

        <ButtonComponent
          label={"Remove All"}
          buttonWidth="10%"
          type={"button"}
          buttonHeight={"30px"}
          buttonColor={"white"}
          buttonIcon={CustomButtons["removeAll"]?.icon}
          buttonBackgroundColor={CustomButtons["removeAll"]?.bgColor}
          onClick={handleRemoveAll}
        />
        {/* <ButtonComponent
          label={"Save Amendment"}
          buttonWidth="13%"
          type={"button"}
          buttonHeight={"30px"}
          buttonColor={"white"}
          buttonIcon={CustomButtons["save"]?.icon}
          buttonBackgroundColor={CustomButtons["save"]?.bgColor}
        /> */}
      </div>

      <div className="pt-1">
        <CustomTable
          headers={[
            "Account No",
            "Name",
            "Ref No",
            "Narration",
            "Currency",
            "Amount Db",
            "Amount Cr",
            "Action",
          ]}
          data={newData}
          rowsPerPage={6}
          load={newData?.length === 0 ? false : null}
        />
      </div>

      {/* totals  */}
      <div className="flex justify-end mb-5 mt-3 pe-5">
        <div className="flex w-[40%] space-x-8">
          <InputField
            label={"Total Debit"}
            inputWidth={"100%"}
            disabled
            textAlign={"right"}
            color={"red"}
            fontWeight={"bold"}
            value={myObj?.total_debit || "0.00"}
          />
          <InputField
            label={"Total Credit"}
            inputWidth={"100%"}
            disabled
            textAlign={"right"}
            color={"teal"}
            fontWeight={"bold"}
            value={myObj?.total_credit || "0.00"}
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePayment;
