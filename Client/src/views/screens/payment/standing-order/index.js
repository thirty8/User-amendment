import { useEffect, useState } from "react";

// import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../components/others/Fields/SelectField";
// import OneToMany from "./components/OneToMany";
// import ManyToOne from "./components/ManyToOne";
import OneToOne from "./components/OneToOne";
import Approval from "./components/Approval";
// import ListOfValue from "../components/ListOfValue";
// import CashWithdrawal from "./cash-withdrawal";
// import CashDeposit from "./cash-deposit";
// import ChequeDeposit from "./cheque-deposit";
// import ChequeWithdrawal from "./cheque-withdrawal";
// import InputField from "../components/inputField";
// import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
// import { API_SERVER } from "../../../../../config/constant";
// import AutoReceiptModal from "../components/AutoReceiptModal";
// import SigVerModal from "../components/SigVerModal";
// import MultiCurrencyCashWithdrawal from "./multi-currency-cash-withdrawal";
// import MultiCurrencyCashDeposit from "./multi-currency-cash-deposit";
// import { MDBIcon, MDBRadio } from "mdb-react-ui-kit";
// import axios from "axios";
// import { clippingParents } from "@popperjs/core";
// import CustomModal from "../components/CustomModal";
export default function Origination() {
  const [body, setBody] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [formData, setFormData] = useState({});
  const [cashDepositFormData, setCashDepositFormData] = useState({});
  const [checked, setChecked] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [typeOfInstruction, setTypeOfInstruction] = useState([]);

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [showAutoRModal, setShowAutoRModal] = useState(false);

  function handleInstructionTypeChange(value) {
    // localStorage.setItem("cash", JSON.stringify(value));
    setBody(value);
    console.log("value", { body });
    // setVaryModalSize(true);
  }

  useEffect(() => {
    setTypeOfInstruction([
      { label: "One - To - One", value: "One To One" },
      { label: "One - To - Many", value: "One To Many" },
      { label: "Many - To - One", value: "Many To One" },
    ]);
  }, []);

  useEffect(() => {
    if (body === "One To One") {
      setModalBody(<OneToOne />);

    } else if (body === "One To Many") {
      setModalBody(<OneToMany />);

    } else if (body === "Many To One") {
      setModalBody(<ManyToOne />);
    }

    // }
    else {
      setModalBody("");
    }
  }, [body, checked]);


  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  // useEffect(() => {
  //   async function getBatchNumber() {
  //     const response = await axios.get(API_SERVER + "/api/get-unique-ref", {
  //       headers,
  //     });
  //     console.log(localStorage.getItem("ipAddress"), "IpAdders");
  //     setBatchNo(response.data[0]["unique_ref"]);
  //   }
  //   getBatchNumber();
  // }, [checked]);

  console.log({ body });

  // console.log({ denominationEntries });
  // async function handleSubmit(body) {
  //   if (body === "CAW") {
  //     const {
  //       accountNumber,
  //       amount,
  //       reference,
  //       isThirdParty,
  //       narration,
  //       withdrawalBy,
  //       contact,
  //     } = formData;
  //     // return console.log({ formData });
  //     if (
  //       accountNumber === "" ||
  //       amount === "" ||
  //       isThirdParty === "" ||
  //       narration === "" ||
  //       contact === ""
  //     ) {
  //       swal({
  //         title: "Kindly Fill all required fields",
  //         text: "Kindly fill all required fields",
  //         icon: "warning",
  //         buttons: "OK",
  //         dangerMode: true,
  //       }).then((result) => {
  //         if (result) {
  //           // setShowModal(false);
  //         }
  //       });
  //     } else {
  //       const cashWithdrawalResponse = await axios.post(
  //         API_SERVER + "/api/cash-withdrawal",
  //         {
  //           account_number: formData.accountNumber,
  //           amount: formData.amount,
  //           voucher_date: formData.valueDate,
  //           transaction_details: formData.narration,
  //           username: JSON.parse(localStorage.getItem("userInfo")).id,
  //           approved_by: JSON.parse(localStorage.getItem("userInfo")).id,
  //           machine_id: localStorage.getItem("ipAddress"),
  //           branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
  //           batch_no: batchNo,
  //           document_ref: formData.reference,
  //           narration: formData.narration,
  //           trans_ref: formData.contact,
  //           source_of_funds: null,
  //           form_code: "CAW",
  //         },
  //         { headers }
  //       );
  //       if (cashWithdrawalResponse.data?.responseCode === "000")
  //         swal({
  //           title: "Success",
  //           text:
  //             cashWithdrawalResponse.data.responseMessage +
  //             " with Batch number " +
  //             batchNo,
  //           icon: "success",
  //           buttons: "OK",
  //           // dangerMode: true,
  //         }).then((result) => {
  //           if (result) {
  //             setBatchNoP(batchNo);
  //             setChecked(!checked);
  //             setShowAutoRModal(true);
  //           }
  //         });
  //       // console.log(cashWithdrawalResponse, "llll");
  //     }

  //     console.log(formData);
  //   } else if (body === "CADD") {
  //     const {
  //       accountNumber,
  //       valueDate,
  //       amount,
  //       reference,
  //       isThirdParty,
  //       narration,
  //     } = cashDepositFormData;
  //     // console.log({ accountNumber: cashDepositFormData.accountNumber });
  //     if (
  //       accountNumber === "" ||
  //       valueDate === "" ||
  //       amount === "" ||
  //       isThirdParty === "" ||
  //       narration === ""
  //     ) {
  //       swal({
  //         title: "Kindly Fill all required fields",
  //         text: "Kindly fill all required fields",
  //         icon: "warning",
  //         buttons: "OK",
  //         dangerMode: true,
  //       }).then((result) => {
  //         if (result) {
  //           // setShowModal(false);
  //         }
  //       });
  //     } else {
  //       // return console.log({
  //       //   account_number: cashDepositFormData.accountNumber,
  //       //   amount: cashDepositFormData.amount,
  //       //   voucher_date: cashDepositFormData.valueDate,
  //       //   transaction_details: cashDepositFormData.narration,
  //       //   username: JSON.parse(localStorage.getItem("userInfo")).id,
  //       //   approved_by: JSON.parse(localStorage.getItem("userInfo")).id,
  //       //   machine_id: localStorage.getItem("ipAddress"),
  //       //   branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
  //       //   batch_no: batchNo,
  //       //   document_ref: batchNo,
  //       //   narration: "Cash-Deposit",
  //       //   trans_ref: cashDepositFormData.contact,
  //       //   source_of_funds: cashDepositFormData.selectedSourceOfFund,
  //       //   form_code: "CADD",
  //       // });

  //       const cashDepositResponse = await axios.post(
  //         API_SERVER + "/api/cash-deposit",
  //         {
  //           account_number: cashDepositFormData.accountNumber,
  //           amount: cashDepositFormData.amount,
  //           voucher_date: cashDepositFormData.valueDate,
  //           transaction_details: cashDepositFormData.narration,
  //           username: JSON.parse(localStorage.getItem("userInfo")).id,
  //           approved_by: JSON.parse(localStorage.getItem("userInfo")).id,
  //           machine_id: localStorage.getItem("ipAddress"),
  //           branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
  //           batch_no: batchNo,
  //           document_ref: batchNo,
  //           narration: "Cash-Deposit",
  //           trans_ref: cashDepositFormData.contact,
  //           source_of_funds: null,
  //           form_code: "CADD",
  //         },
  //         { headers }
  //       );
  //       if (cashDepositResponse.data.responseCode === "000") {
  //         const response = await axios.post(
  //           API_SERVER + "/api/denominations",
  //           {
  //             denominations: denominationEntries,
  //             teller_name: JSON.parse(localStorage.getItem("userInfo")).id,
  //             postingDate: `${year}-${month}-${day}`,
  //             branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
  //             batch_no: batchNo,
  //             collection_flag: "I",
  //             currency_code: "010",
  //             accountNumber: cashDepositFormData.accountNumber,
  //           },
  //           { headers }
  //         );
  //         if (response) {
  //           setBatchNoP(batchNo);
  //           setChecked(!checked);
  //           console.log(response.data);
  //           swal({
  //             title: "Success",
  //             text:
  //               cashDepositResponse.data.responseMessage +
  //               " with Batch number " +
  //               batchNo,
  //             icon: "success",
  //             buttons: "OK",
  //           }).then((result) => {
  //             if (result) {
  //               setShowAutoRModal(true);

  //               // const baseUrl = "http://192.168.1.225:8680/notification/api/v1.0/waste/create_notification"
  //               const baseUrl =
  //                 "http://192.168.1.16:8080/waste/create_notification";
  //               axios
  //                 .post(baseUrl, {
  //                   activity_code: "CADEP",
  //                   channel_id: "MOB",
  //                   branch: JSON.parse(localStorage.getItem("userInfo"))
  //                     .branchCode,
  //                   done_by: JSON.parse(localStorage.getItem("userInfo")).id,
  //                   terminal_id: localStorage.getItem("ipAddress"),
  //                   para1: "hubertamarfio@gmail.com",
  //                   para2: cashDepositFormData.contact,
  //                   para3: cashDepositFormData.accountName,
  //                   para4: cashDepositFormData.amount,
  //                   para5: cashDepositFormData.accountNumber,
  //                   para6:
  //                     parseFloat(cashDepositFormData.ledgerBalance) +
  //                     parseFloat(cashDepositFormData.amount),
  //                   para7:
  //                     parseFloat(cashDepositFormData.availableBalance) +
  //                     parseFloat(cashDepositFormData.amount),
  //                   para8: formatDate(),
  //                   para9: batchNo,
  //                   para10: "JGHGH",
  //                 })
  //                 .then((res) => {
  //                   console.log({ SMS: res });
  //                 });
  //             }
  //           });
  //         }

  //         console.log(cashDepositResponse, "llll");
  //       }
  //     }
  //   }
  // }

  function handleNew() {
    setChecked((prev) => !prev);
  }

  // const dates = new Date(
  //   JSON.parse(localStorage.getItem("userInfo")).postingDate
  // );
  // const month = dates.getMonth() + 1; // getMonth() returns a zero-indexed value, so add 1 to get the actual month number
  // const day = dates.getDate();
  // const year = dates.getFullYear();
  return (
    <>


      {/* <div
        className={`bg-gray-200 rounded py-[12px] scale-[0.85]  ${
          body ? "-mx-24 -mt-12" : "-mx-20 -mt-8 "
        } `}
      > */}
      {/* <div className="w-full flex justify-center scale-[0.98] cursor-pointer">
          <div className="flex" style={{ zoom: "0.80" }} centered>
            <div
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
              className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded"
            >
              <div
                onClick={handleNew}
                className="flex flex-col justify-center items-center"
              >
                <MDBIcon
                  style={{ color: "white", paddingTop: "15px", fontSize: 20 }}
                  fas
                  icon="file-alt"
                />

                <p className="text-white text-lg mt-[-3px] font-semibold">
                  New
                </p>
              </div>
            </div>
            <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
              <div className="flex flex-col justify-center items-center">
                <MDBIcon
                  style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                  fas
                  icon="sync"
                />

                <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                  Refresh
                </p>
              </div>
            </div>
            <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
              <div className="flex flex-col justify-center items-center">
                <MDBIcon
                  style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                  fas
                  icon="calendar-times"
                />

                <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                  Delete
                </p>
              </div>
            </div>

            <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[95px]  justify-center rounded">
              <div className="flex flex-col justify-center items-center ">
                <MDBIcon
                  style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                  fas
                  icon="thumbs-up"
                />

                <p className="text-gray-700 px-2 text-lg mt-[-3px] font-semibold">
                  Authorise
                </p>
              </div>
            </div>

            <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
              <div className="flex flex-col justify-center items-center">
                <MDBIcon
                  style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                  fas
                  icon="eye"
                />

                <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                  View
                </p>
              </div>
            </div>

            <div
              onClick={() => handleSubmit(body)}
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
              className=" shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded"
            >
              <div className="flex flex-col justify-center items-center">
                <MDBIcon
                  style={{ color: "white", paddingTop: "15px", fontSize: 20 }}
                  fas
                  icon="check"
                />

                <p className="text-white text-lg mt-[-3px] font-semibold">Ok</p>
              </div>
            </div>

            <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
              <div className="flex flex-col justify-center items-center">
                <MDBIcon
                  style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                  fas
                  icon="ban"
                />

                <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                  Cancel
                </p>
              </div>
            </div>

            <div className="bg-white shadow-sm ml-3 flex flex-col items-center w-[86px]  justify-center rounded">
              <div className="flex flex-col justify-center items-center">
                <MDBIcon
                  style={{ color: "grey", paddingTop: "15px", fontSize: 20 }}
                  fas
                  icon="thumbs-down"
                />

                <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                  Reject
                </p>
              </div>
            </div>

            <div className="bg-white shadow-sm mx-3 flex flex-col items-center w-[86px]  justify-center rounded">
              <div className="flex flex-col justify-center items-center">
                <MDBIcon
                  style={{ color: "grey", fontSize: 20, paddingTop: "15px" }}
                  fas
                  icon="question-circle"
                />

                <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
                  Help
                </p>
              </div>
            </div>
            <div
              // onClick={handleClose}
              className=" flex flex-col items-center w-[86px]  justify-center rounded"
              style={{
                background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <MDBIcon
                  style={{ color: "white", fontSize: 20, paddingTop: "15px" }}
                  fas
                  icon="sign-out-alt"
                />

                <p className="text-white text-lg mt-[-3px] font-semibold">
                  Exit
                </p>
              </div>
            </div>
          </div>
        </div> */}

      {/* -------------------------------- */}
      {/* <hr className="my-[3px] mt-3" /> */}
      {/* 
      <div className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white ">
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            width: "100%",
            padding: "10px",
          }}
          className="wrapper rounded border-2"
        >
          <div style={{ flex: 0.5 }}>
            <SelectField
              label={"Transaction Type"}
              labelWidth={"20%"}
              inputWidth={"50%"}
              onChange={(value) => {
                handleInstructionTypeChange(value);
                setChecked(false);
              }}
              value={body}
              data={typeOfInstruction}
            />
          </div>
        </div>

      </div> */}
      {/* <hr className="my-[8px] " /> */}

      {/* <hr className="my-[3px]" /> */}

      {/* my modals   */}


      {/* <div>{modalBody}</div> */}


      {/* <div> {<OneToOne />} </div> */}
      <div> {<Approval />} </div>




      {/* {modalBody}
      </div> */}
    </>
  );
}
