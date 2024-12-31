import React, { useState, useEffect, useRef } from "react";
import InputField from "../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import DocumentViewing from "../../../../components/DocumentViewing";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
// import SelectField from "../../../../components/others/Fields/SelectField";
import SearchModal from "./components/SearchModal";
import CustomTable from "../../../../components/others/customtable";
import axios from "axios";
import ModalComponent from "../../../../components/others/Modal/modal";
import { API_SERVER } from "../../../../config/constant";
import Swal from "sweetalert2";
import CustomButtons from "../../../../components/others/CustomButtons";
import AccountSummary from "../../../../components/others/AccountSummary";
import ChargesModal from "./components/Modal";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import RadioButtons from "../../../../components/others/Fields/RadioButtons";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ChequeBookRequisition() {
  const [accountDetails, setAccountDetails] = useState({});
  const [storedBranch, setStoredBranch] = useState([]);
  const [leavesArray, setLeavesArray] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [allCustomerAccountNumbers, setAllCustomerAccountNumbers] = useState([]);
  const [addressInputField, showAddressInputField] = useState(false);
  const [deliveryBranchInputField, showDeliveryBranchInputField] = useState(true);
  const [myObj, setMyObj] = useState({ channel: "Branch" });
  const [temp, setTemp] = useState({ edit_state: false });
  const [myObject, setMyObject] = useState([]);
  const [newData1, setNewData1] = useState([]);

  const handleClearNew = () => {
    setTemp({ edit_state: false });
    setAllCustomerAccountNumbers([]);
    setAccountDetails("");
    setTimeout(() => {
      setMyObj("");
    }, 100);
    setTimeout(() => {
      setMyObj({
        channel: "Branch",
        book_style: "",
        delivery_branch: "",
        batch_no: "",
      });
    }, 300);
  };

  // on acc number enter
  const handleClear2 = () => {
    setTemp({ edit_state: false });
    setAllCustomerAccountNumbers([]);
    setLeavesArray([]);
    setAccountDetails("");
    setTimeout(() => {
      setMyObj({
        channel: "Branch",
        account_number: "",
        account_number_on_entered: "",
      });
    }, 100);
  };

  const dates = new Date(JSON.parse(localStorage.getItem("userInfo"))?.postingDate);

  // getting request date
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

  const formattedDate = `${day}-${month}-${year}`;

  // handle on change
  const handleChange = (key, value) => {
    setMyObj((prev) => ({ ...prev, [key]: value }));
  };

  function onKeyPress(e) {
    if (e.key === "Enter") {
      handleChange("account_number_on_entered", e.target.value);
      // setAccountNumberChange(e.target.value);
      axios
        .post(
          API_SERVER + "/api/cheque-book-request",
          {
            validation: "true",
            acct_link: e.target.value,
          },
          { headers }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            if (response?.data[0]?.count === 0) {
              axios
                .post(API_SERVER + "/api/get-error-message", { code: "00531" }, { headers })
                .then((response) => {
                  if (response?.data?.length > 0) {
                    const mess = response?.data;
                    Swal.fire({
                      text: mess,
                      icon: "error",
                    }).then(() => {
                      const input = document.getElementById("accountNumber");
                      input?.focus();
                      handleClear2();
                    });
                  }
                });
            } else if (response?.data[0]?.count > 0) {
              handleChange("count", response?.data[0]?.count);
              if (myObject?.length > 0) {
                handleChange("debit_charge_account", "");
              }
            } else {
              return null;
            }
          }
        })
        .catch((err) => console.log(`error caught in account number: ${err}`));
    }
  }

  useEffect(() => {
    if (myObj?.count > 0 && accountDetails && accountDetails?.summary?.length > 0) {
      const input = document.getElementById("book_style");
      input?.focus();
      handleChange("customer_no", accountDetails?.summary[0]?.customer_no);
      handleChange("account_name", accountDetails?.summary[0]?.account_name);
      handleFetchChargeCode();
    } else {
      const input = document.getElementById("account_number");
      input?.focus();
    }
  }, [accountDetails]);

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

  // getting new batch bumber
  const getNewBatchNumber = async () => {
    await axios
      .get(API_SERVER + "/api/get-unique-ref", {
        headers,
      })
      .then((response) => {
        if (response?.data?.length > 0) {
          handleChange("batch_no", response?.data[0]?.unique_ref);
          handleChange("formatted_date", formattedDate);
        }
      })
      .catch((err) => console.log(`error in batch number: ${err}`));
  };

  // get batch number and all branches
  useEffect(() => {
    async function getBatchNumber() {
      return await axios.get(API_SERVER + "/api/get-unique-ref", {
        headers,
      });
    }
    async function getBranch() {
      return await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "BRA" },
        {
          headers,
        }
      );
    }
    Promise.all([getBatchNumber(), getBranch()]).then((response) => {
      handleChange("batch_no", response[0]?.data[0]?.unique_ref);
      setStoredBranch(response[1]?.data);
      handleChange("formatted_date", formattedDate);
    });
  }, []);

  // get all account numbers with one customer number
  useEffect(() => {
    const getAllAccountNumbers = async () => {
      await axios
        .post(
          API_SERVER + "/api/cheque-book-request",
          {
            get_all_customer_numbers: "true",
            customer_no: myObj ? myObj?.customer_no : "",
          },
          { headers }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            setAllCustomerAccountNumbers(response.data);
          }
        })
        .catch((err) => console.log(`error in lov debit charge account : ${err}`));
    };

    getAllAccountNumbers();
  }, [myObj?.customer_no]);

  // fetch charge code
  const handleFetchChargeCode = async () => {
    await axios
      .post(
        API_SERVER + "/api/cheque-book-request",
        {
          fetch_charge_code: "true",
          code: accountDetails?.summary?.length > 0 ? accountDetails?.summary[0]?.cust_type : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          setLeavesArray(response.data);
        }
      })
      .catch((err) => console.log(`error here: ${err}`));
  };

  // delete batch
  async function deleteFeeBeforeFetch(acct_number, value) {
    await axios
      .post(
        API_SERVER + "/api/cheque-book-request",
        {
          delete_batch: "true",
          batch_no_v: myObj ? myObj?.batch_no : "",
        },
        {
          headers,
        }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          if (response?.data[0]?.mess_code === "1") {
            getCharges(acct_number, value);
          }
        }
      })
      .catch((err) => console.log(`error in deleting batch : ${err}`));
  }

  // get fee transaction
  const getCharges = async (acct_number, charge_code) => {
    await axios
      .post(
        API_SERVER + "/api/fee-transaction",
        {
          dbAccount: acct_number,
          trans_code_v: charge_code?.trim(),
          trans_amount: 0,
          batch_no_v: myObj ? myObj?.batch_no : "",
          posted_by_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
          cbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          dbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          channel_v: "BRA",
          app_flag: "N",
          destiC: "A",
          form_code: "SDRQ",
          rate_v: 0,
        },
        {
          headers,
        }
      )
      .then((response) => {
        if (Object.keys(response.data)?.length > 0) {
          const charge = response?.data?.totalCharges?.toFixed(2);
          handleChange("charges", charge);
          handleChange("formatted_charges", formatNumber(charge));
        } else {
          handleChange("charges", "0");
          handleChange("formatted_charges", "0.00");
        }
      })
      .catch((err) => console.log(`error in fees: ${err}`));
  };

  // get total charges
  useEffect(() => {
    const number_of_books = isNaN(myObj?.number_of_books) ? 1 : parseInt(myObj?.number_of_books);
    handleChange("total_charges", number_of_books * myObj?.charges);
    handleChange("formatted_total_charges", formatNumber(number_of_books * myObj?.charges));
  }, [myObj?.number_of_books, myObj?.charges]);

  // new insert function
  const insert = () => {
    // validate required fields
    // check available balance for account numbers
    const total_charges_new = myObj ? parseFloat(myObj?.total_charges) : parseFloat(0);
    const debit_avbal = myObj ? parseFloat(myObj?.debit_charge_account_charge) : parseFloat(0);

    console.log({ total_charges_new, debit_avbal });

    if (
      myObj?.account_number_on_entered === "" ||
      myObj?.account_number_on_entered === undefined ||
      myObj?.account_number_on_entered === null
    ) {
      fetchErrors("05553", "account_number");
    } else if (
      myObj?.number_of_leaves === "" ||
      myObj?.number_of_leaves === undefined ||
      myObj?.number_of_leaves === null
    ) {
      fetchErrors("06703", "number_of_books");
    } else if (
      myObj?.number_of_books === "" ||
      myObj?.number_of_books === undefined ||
      myObj?.number_of_books === null ||
      parseInt(myObj?.number_of_books) === 0
    ) {
      fetchErrors("06702", "number_of_books");
    } else if (
      (myObj?.channel === "Branch" && myObj?.delivery_branch === "") ||
      (myObj?.channel === "Branch" && myObj?.delivery_branch === null) ||
      (myObj?.channel === "Branch" && myObj?.delivery_branch === undefined)
    ) {
      fetchErrors("01308", "delivery_branch");
    } else if (
      (myObj?.channel === "Courrier" && myObj?.address === "") ||
      (myObj?.channel === "Courrier" && myObj?.address === null) ||
      (myObj?.channel === "Courrier" && myObj?.address === undefined)
    ) {
      fetchErrors("07256", "address");
    } else if (
      myObj?.debit_charge_account === "" ||
      myObj?.debit_charge_account === undefined ||
      myObj?.debit_charge_account === null
    ) {
      fetchErrors("06024", "debit_charge_account");
    } else if (total_charges_new > debit_avbal) {
      fetchErrors("06074", null);
    } else {
      if (myObject?.length === 0) {
        setMyObject((prev) => [...prev, myObj]);

        handleClearNew();

        setTimeout(() => {
          getNewBatchNumber();
        }, 450);
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
          setMyObject((prev) => [...prev, myObj]);
          handleClearNew();
          setTimeout(() => {
            getNewBatchNumber();
          }, 450);
        }
      }
    }
  };

  console.log({ dennis: myObj?.batch_no });
  // new update function
  const update = () => {
    // validate required fields
    // check available balance for account numbers
    const total_charges_new = myObj ? parseFloat(myObj?.total_charges) : parseFloat(0);
    const debit_avbal = myObj ? parseFloat(myObj?.debit_charge_account_charge) : parseFloat(0);

    if (
      myObj?.account_number_on_entered === "" ||
      myObj?.account_number_on_entered === undefined ||
      myObj?.account_number_on_entered === null
    ) {
      fetchErrors("05553", "account_number");
    } else if (
      myObj?.number_of_leaves === "" ||
      myObj?.number_of_leaves === undefined ||
      myObj?.number_of_leaves === null
    ) {
      fetchErrors("06703", "number_of_books");
    } else if (
      myObj?.number_of_books === "" ||
      myObj?.number_of_books === undefined ||
      myObj?.number_of_books === null ||
      parseInt(myObj?.number_of_books) === 0
    ) {
      fetchErrors("06702", "number_of_books");
    } else if (
      (myObj?.channel === "Branch" && myObj?.delivery_branch === "") ||
      (myObj?.channel === "Branch" && myObj?.delivery_branch === null) ||
      (myObj?.channel === "Branch" && myObj?.delivery_branch === undefined)
    ) {
      fetchErrors("01308", "delivery_branch");
    } else if (
      (myObj?.channel === "Courrier" && myObj?.address === "") ||
      (myObj?.channel === "Courrier" && myObj?.address === null) ||
      (myObj?.channel === "Courrier" && myObj?.address === undefined)
    ) {
      fetchErrors("07256", "address");
    } else if (
      myObj?.debit_charge_account === "" ||
      myObj?.debit_charge_account === undefined ||
      myObj?.debit_charge_account === null
    ) {
      fetchErrors("06024", "debit_charge_account");
    } else if (total_charges_new > debit_avbal) {
      fetchErrors("06074", null);
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
          setMyObject((prev) => {
            const updatedArray = [...prev];
            updatedArray[temp?.index] = myObj;
            return updatedArray;
          });
          handleClearNew();
          setTimeout(() => {
            getNewBatchNumber();
          }, 450);
        }
      }
    }
  };

  useEffect(() => {
    const arr = [];
    if (myObject?.length > 0) {
      myObject?.map((i, key) => {
        arr.push([
          // i?.batch_no,
          // i?.account_number,
          // i?.account_name,
          i?.debit_charge_account_num,
          i?.debit_charge_account_name,
          i?.number_of_leaves,
          i?.number_of_books,
          i?.channel,
          i?.formatted_total_charges,
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonComponent
              onClick={() => handleEdit(i, key)}
              // onClick={() => handleEdit(myObj2, key)}
              buttonIcon={CustomButtons["edit"]?.icon}
              buttonColor={CustomButtons["edit"]?.bgColor}
            />
          </div>,
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonComponent
              buttonIcon={CustomButtons["delete"]?.icon}
              buttonColor={CustomButtons["delete"]?.bgColor}
              onClick={() => handleRemoveFunc(key)}
              buttonBackgroundColor={"red"}
            />
          </div>,
        ]);
      });
    }
    setNewData1(arr);
  }, [myObject]);

  const handleEdit = (rowData, index) => {
    setTemp((prev) => ({ ...prev, ["edit_state"]: true, ["index"]: index }));
    setMyObj(rowData);

    setTimeout(() => {
      const input = document.getElementById("account_number");
      input?.focus();
    }, 200);
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
        getNewBatchNumber();
      }
    });
  };

  // handle new click on the button
  const handleNewClick = () => {
    handleClearNew();
    setTimeout(() => {
      getNewBatchNumber();
    }, 450);

    setNewData1([]);
    setMyObject([]);
  };

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
          setNewData1([]);
          setMyObject([]);
          getNewBatchNumber();
        }
      });
    }
  }

  function handleSelected(value) {
    handleChange("account_number", value);
    handleSelectFetchDetails(value);
    setShowModal(false);
  }

  console.log(`myObj : ${myObj} and myObject : ${myObject}`);

  // using handle selected to fetch details
  function handleSelectFetchDetails(value) {
    handleChange("account_number_on_entered", value);
    axios
      .post(
        API_SERVER + "/api/cheque-book-request",
        {
          validation: "true",
          acct_link: value,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          if (response?.data[0]?.count === 0) {
            axios
              .post(API_SERVER + "/api/get-error-message", { code: "00531" }, { headers })
              .then((response) => {
                if (response?.data?.length > 0) {
                  const mess = response?.data;
                  Swal.fire({
                    text: mess,
                    icon: "error",
                  }).then(() => {
                    const input = document.getElementById("accountNumber");
                    input?.focus();
                    handleClear2();
                  });
                }
              });
          } else if (response?.data[0]?.count > 0) {
            handleChange("count", response?.data[0]?.count);
          } else {
            return null;
          }
        }
      })
      .catch((err) => console.log(`error caught in account number: ${err}`));
  }

  function handleDocumentNo() {
    if (
      myObj?.document_number === "" ||
      myObj?.document_number === null ||
      myObj?.document_number === undefined
    ) {
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
      setSweetAlertConfirmed(true);
    }
  }

  console.log(myObj, "kofi");
  // show input field on courrier select
  useEffect(() => {
    if (myObj?.channel === "Courrier") {
      handleChange("delivery_branch", "");
      showAddressInputField(true);
      showDeliveryBranchInputField(false);
    }
    if (myObj?.channel === "Branch") {
      handleChange("address", "");
      showDeliveryBranchInputField(true);
      showAddressInputField(false);
    }
  }, [myObj?.channel]);

  //handle onKeyDown on radio buttons
  const handleRadioBtnsOnKeyDown = (e) => {
    e.preventDefault();
    if (e.key === "ArrowUp") {
      setTimeout(() => {
        const input = document.getElementById("number_of_books");
        input?.focus();
      }, 0);
    } else if (e.key === "ArrowDown") {
      if (myObj?.channel === "Branch") {
        setTimeout(() => {
          const input = document.getElementById("delivery_branch");
          input?.focus();
        }, 0);
      }

      if (myObj?.channel === "Courrier") {
        setTimeout(() => {
          const input = document.getElementById("address");
          input?.focus();
        }, 0);
      }
    }
  };

  // final okay
  const handleSubmit = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let ipAddress = localStorage.getItem("ipAddress");

    const myData = myObject?.map((i) => ({
      p_acct_link: i ? i?.debit_charge_account_num?.trim() : "",
      p_num_of_books: i ? parseInt(i?.number_of_books) : "",
      p_leaves_no: i ? i?.number_of_leaves?.trim() : "",
      p_trans_code: i ? i?.charge_code?.trim() : "",
      p_scandoc: i ? i?.document_number : "",
      p_chan: "BB" + userInfo?.id?.trim(),
      p_delivery_channel: i ? i?.channel?.trim() : "",
      p_delivery_branch: i ? i?.delivery_branch?.trim() : "",
      p_delivery_address: i ? i?.address?.trim() : "",
      p_total_charge: i ? parseFloat(i?.total_charges) : "",
    }));

    Swal.fire({
      text: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await axios
      .post(
        API_SERVER + "/api/cheque-book-request",
        {
          okay_procedure: "true",
          cheque_reqdata_v: myData,
          global_bra_v: userInfo?.branchCode,
          terminaL_id: ipAddress,
          username_v: userInfo?.id,
          form_code: "SDRQ",
          machine_ip: ipAddress,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          Swal.close();
          const response_code = response?.data[0]?.RESPONSE_CODE;
          const response_mess = response?.data[0]?.RESPONSE_MESS;
          Swal.fire({
            text: response_mess,
            icon: response_code === "999" ? "error" : "success",
          }).then((result) => {
            if (result.isConfirmed && response_code === "000") {
              setNewData1([]);
              setMyObject([]);
              handleClearNew();
              setTimeout(() => {
                getNewBatchNumber();
              }, 450);
            }
          });
        } else {
          Swal.close();
        }
      })
      .catch((err) => console.log(`error caught in account number: ${err}`));
  };

  // handle errors to fetch all errors
  const fetchErrors = async (error_code, field) => {
    await axios
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
            }, 300);
          });
        }
      });
  };

  // check number of books to accept only number for validation
  function handleWholeNumberInput(value) {
    return /^(?!0{2,})\d+$/.test(value) ? value : "";
  }

  return (
    <div style={{ zoom: 0.97 }}>
      <ChargesModal setShowModal={setShowModal3} showModal={showModal3} />

      {sweetAlertConfirmed && (
        <ModalComponent
          open={sweetAlertConfirmed}
          onClose={() => setSweetAlertConfirmed(false)}
          width={"55%"}
          content={
            <div>
              <DocumentViewing documentID={myObj ? myObj?.document_number : ""} />
            </div>
          }
        />
      )}

      <div>
        <ActionButtons
          displayFetch={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayRefresh={"none"}
          displayReject={"none"}
          displayView={"none"}
          displayHelp={"none"}
          displayDelete={"none"}
          onNewClick={handleNewClick}
          onOkClick={handleSubmit}
        />
      </div>

      <hr className="my-[3px] mt-3" />
      {/* start of body  */}
      {/* REMOVAL OF REQ ID AND REQ DATE  */}
      <div className="bg-white flex justify-end py-[10px] px-4 mb-2">
        <div>
          <InputField
            label={"Request ID"}
            labelWidth={"35%"}
            inputWidth={"60%"}
            disabled={true}
            textAlign={"center"}
            value={myObj ? myObj?.batch_no : ""}
          />
        </div>
        <div className="me-2">
          <InputField
            label={"Request Date"}
            labelWidth={"40%"}
            inputWidth={"60%"}
            disabled={true}
            value={myObj ? myObj?.formatted_date : ""}
            textAlign={"center"}
          />
        </div>
      </div>
      {/* </div> */}
      <hr className="my-[3px] mb-3" />
      {/* pb-5 pb-2 */}

      <div className="h-auto pb-2  px-2 mb-3 bg-white ">
        <div style={{ width: "100%" }} className="wrapper   md:flex">
          {/* left side  */}
          <div className="md:w-[71%] rounded border-2 px-3">
            <div className="w-full mt-1">
              <div className="w-[58%] flex items-center pt-2" style={{ marginBottom: "13px" }}>
                <div className="w-[80%] ">
                  <InputField
                    label={"Account Number"}
                    labelWidth={"34.8%"}
                    inputWidth={"57.5%"}
                    required={true}
                    type={"number"}
                    id={"account_number"}
                    name={"account_number"}
                    value={myObj ? myObj?.account_number : ""}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    onKeyPress={(e) => {
                      onKeyPress(e);
                    }}
                  />
                </div>

                <div className="w-[20%]">
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
              </div>

              <div className="flex items-center w-[100%]" style={{ marginBottom: "13px" }}>
                <div className="w-[100%] ">
                  <InputField
                    label={"Account Name"}
                    labelWidth={"16.1%"}
                    inputWidth={"68.9%"}
                    disabled={true}
                    name={"account_name"}
                    value={myObj ? myObj?.account_name : ""}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-6 items-center w-[100%]" style={{ marginBottom: "13px" }}>
              {/* book style  */}
              <div className="w-1/2">
                <ListOfValue
                  label={"Book Style"}
                  id={"book_style"}
                  labelWidth={"33%"}
                  required={true}
                  inputWidth={"55%"}
                  data={leavesArray}
                  onChange={(value) => {
                    const selected = leavesArray
                      ?.find((i) => i?.value === value)
                      ?.label?.split("-");
                    const selectedVal = selected[0];
                    const charge_code = value?.split("*")[1];
                    handleChange("book_style", value);
                    handleChange("number_of_leaves", selectedVal);
                    handleChange("charge_code", charge_code);
                    if (
                      myObj?.number_of_books === "" ||
                      myObj?.number_of_books === null ||
                      myObj?.number_of_books === undefined
                    ) {
                      handleChange("number_of_books", "1");
                    }

                    deleteFeeBeforeFetch(myObj?.account_number_on_entered, charge_code);

                    setTimeout(() => {
                      const input = document.getElementById("number_of_books");
                      input?.focus();
                    }, 0);
                  }}
                  value={myObj ? myObj?.book_style : ""}
                />
              </div>

              {/* number of leaves  */}
              <div className="w-1/2">
                <InputField
                  label={"Number of Leaves"}
                  labelWidth={"27%"}
                  inputWidth={"42.2%"}
                  id={"number_of_leaves"}
                  disabled={true}
                  value={myObj ? myObj?.number_of_leaves : ""}
                />
              </div>
            </div>

            <div className="" style={{ marginBottom: "13px" }}>
              <InputField
                label={"Number of Books"}
                id={"number_of_books"}
                labelWidth={"16.1%"}
                inputWidth={"15%"}
                type={"text"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (
                      myObj?.number_of_books !== "" ||
                      myObj?.number_of_books !== null ||
                      myObj?.number_of_books !== undefined
                    ) {
                      const input = document.getElementById("delivery_channel_branch");
                      input?.focus();
                    }
                  }
                }}
                name={"number_of_books"}
                onChange={(e) =>
                  handleChange(e.target.name, handleWholeNumberInput(e.target.value))
                }
                required={true}
                value={myObj ? myObj?.number_of_books : ""}
              />
            </div>

            <div style={{ marginBottom: "13px" }}>
              <RadioButtons
                label={"Delivery Channel"}
                labelWidth={"16%"}
                radioLabel={"Branch"}
                id={"delivery_channel_branch"}
                id2={"delivery_channel_courrier"}
                radioLabel2={"Courrier"}
                display={true}
                display2={true}
                value={"Branch"}
                value2={"Courrier"}
                checked={myObj?.channel === "Branch"}
                checked2={myObj?.channel === "Courrier"}
                onChange={(e) => {
                  handleChange("channel", e.target.value);
                }}
                onKeyDown={handleRadioBtnsOnKeyDown}
                display3={false}
                radioButtonsWidth={"25%"}
              />
            </div>

            <div
              style={{
                display: addressInputField ? "flex" : "none",
                alignItems: addressInputField ? "center" : "none",
                width: addressInputField ? "100%" : "0",
                marginBottom: addressInputField ? "13px" : "0px",
              }}
            >
              <div className="w-[100%]">
                <InputField
                  label={"Courrier Address"}
                  labelWidth={"16.1%"}
                  inputWidth={"69%"}
                  name={"address"}
                  id={"address"}
                  type={"text"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (myObj?.channel === "Courrier") {
                        setTimeout(() => {
                          const input = document.getElementById("document_number");
                          input?.focus();
                        }, 0);
                      }
                    }
                  }}
                  onChange={(e) => handleChange(e.target.name, e.target.value?.toUpperCase())}
                  value={myObj ? myObj?.address : ""}
                  required={true}
                />
              </div>
            </div>

            <div className={`space-x-6 flex`} style={{ marginBottom: "13px" }}>
              <div className={` ${deliveryBranchInputField ? "w-1/2" : "hidden"} `}>
                <ListOfValue
                  label={"Delivery Branch"}
                  id={"delivery_branch"}
                  labelWidth={"33%"}
                  inputWidth={"55%"}
                  data={storedBranch}
                  onChange={(value) => {
                    handleChange("delivery_branch", value);
                    setTimeout(() => {
                      var input = document.getElementById("document_number");
                      input.focus();
                    }, 0);
                  }}
                  value={myObj ? myObj?.delivery_branch : ""}
                />
              </div>

              {/* className="w-1/2 flex " */}
              <div
                className={` ${addressInputField ? "w-[58%] flex align-center" : "w-1/2 flex "} `}
              >
                <div className={` ${addressInputField ? "w-[75%]" : "w-[77%]"} `}>
                  <InputField
                    label={"Document Number"}
                    id={"document_number"}
                    name={"document_number"}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    labelWidth={addressInputField ? "31.5%" : "35%"}
                    inputWidth={addressInputField ? "61%" : "55%"}
                    type={"number"}
                    value={myObj ? myObj?.document_number : ""}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("debit_charge_account");
                        input?.focus();
                      }
                    }}
                  />
                </div>

                <div className={`${addressInputField ? "w-[20%]" : "w-[23%]"}`}>
                  <ButtonComponent
                    label={"View Doc"}
                    buttonWidth={"90%"}
                    type={"button"}
                    buttonIcon={CustomButtons["viewDoc"]?.icon}
                    buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                    buttonHeight={"26px"}
                    buttonColor={"white"}
                    marginBottom={"8px"}
                    onClick={handleDocumentNo}
                  />
                </div>
              </div>
            </div>

            <hr className="pt-2 pb-2" />

            {/* --------------------------------- */}
            <div className="flex items-center w-[100%]" style={{ marginBottom: "13px" }}>
              <div className="w-[100%]">
                <ListOfValue
                  label={"Debit Charge Account"}
                  labelWidth={"16%"}
                  inputWidth={"69%"}
                  required={true}
                  id={"debit_charge_account"}
                  data={allCustomerAccountNumbers}
                  onChange={(value) => {
                    const selected = value?.split("*");
                    handleChange("debit_charge_account", value);
                    handleChange("debit_charge_account_num", selected[0]);
                    handleChange("debit_charge_account_name", selected[1]);
                    handleChange("debit_charge_account_charge", selected[2]);
                  }}
                  value={myObj ? myObj?.debit_charge_account : ""}
                />
              </div>
            </div>

            {/* charge code  */}
            <div className="" style={{ marginBottom: "13px" }}>
              <InputField
                label={"Charge Code"}
                labelWidth={"16%"}
                inputWidth={"15%"}
                disabled={true}
                value={myObj ? myObj?.charge_code : ""}
              />
            </div>

            {/* charge per book and total charge  */}
            <div className="flex space-x-6 items-center w-[100%]" style={{ marginBottom: "13px" }}>
              {/* charge per book  */}
              <div className="w-1/2">
                <InputField
                  label={"Charge Per Book"}
                  labelWidth={"32.6%"}
                  inputWidth={"55%"}
                  id={"charge per book"}
                  disabled={true}
                  textAlign={"right"}
                  value={myObj ? myObj?.formatted_charges : ""}
                />
              </div>

              {/* total charge  */}
              <div className="w-1/2">
                <InputField
                  label={"Total Charge"}
                  labelWidth={"27%"}
                  inputWidth={"42.2%"}
                  id={"total_charge"}
                  disabled={true}
                  textAlign={"right"}
                  value={myObj ? myObj?.formatted_total_charges : ""}
                />
              </div>
            </div>
          </div>
          {/* right side  */}
          <div className="w-[29%] px-3">
            <AccountSummary
              accountNumber={myObj ? myObj?.account_number_on_entered : ""}
              setAccountDetails={setAccountDetails}
            />
          </div>
        </div>
      </div>

      <div className="flex mb-2 space-x-9 justify-center">
        <ButtonComponent
          label={temp?.edit_state ? "Update" : "Insert"}
          buttonWidth="8%"
          type={"button"}
          buttonHeight={"30px"}
          buttonColor={"white"}
          buttonIcon={CustomButtons["insert"]?.icon}
          buttonBackgroundColor={CustomButtons["insert"]?.bgColor}
          // onClick={
          //   temp?.edit_state ? () => handleUpdateRow() : () => insertFunction()
          // }
          onClick={
            temp?.edit_state
              ? // ? () => updateRowFunction()
                () => update()
              : // : () => insertFunction()
                () => insert()
          }
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
      </div>

      <div className="mt-3">
        <CustomTable
          headers={[
            // "#",
            // "Request ID",
            "Account Number",
            "Account Name",
            "No. of Leaves",
            "No. of Books",
            "Delivery Channel",
            // "Charge Code",
            "Total Charge",
            "Edit",
            "Delete",
          ]}
          data={newData1}
          style={{ columnAlignRight: [7] }}
          rowsPerPage={3}
        />
      </div>
    </div>
  );
}

export default ChequeBookRequisition;
