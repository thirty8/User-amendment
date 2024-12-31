import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { Modal } from "@mantine/core";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../components/others/CustomButtons";
import TextAreaField from "../../../../components/others/Fields/TextArea";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import Report from "./components/report";
import Swal from "sweetalert2";
import DocumentViewing from "../../../../components/DocumentViewing";
import AccountSummary from "../../../../components/others/AccountSummary";

const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const AccountStatementRequest = () => {
  const [statementTypeLOV, setStatementTypeLOV] = useState([]);
  const [requestID, setRequestID] = useState("");
  const [myObj, setMyObj] = useState({
    account_number: "",
    start_date: "",
    end_date: "",
    source_document: "",
    requested_by: "",
    statement_type: "",
  });
  const [accountDetails, setAccountDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewDoc, setShowViewDoc] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [totalPages, setTotalPages] = useState({});
  const [totalCharge, setTotalCharge] = useState({});
  const [reportDetails, setReportDetails] = useState({});
  const [reportData, setReportData] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [totalPages3, setTotalPages3] = useState("");

  //   fetching unique ref and statement type lov
  useEffect(() => {
    try {
      //  request id
      async function getUniqueRef() {
        return await axios.get(API_SERVER + "/api/get-unique-ref", { headers });
      }

      // statement type lov
      async function fetchLOV() {
        return await axios.post(
          API_SERVER + "/api/account-statement-request",
          { lov: "true" },
          { headers }
        );
      }

      Promise.all([getUniqueRef(), fetchLOV()]).then((response) => {
        setRequestID(response[0]?.data[0]);
        setStatementTypeLOV(response[1]?.data);
      });
    } catch (err) {
      console.error("error :" + err);
    }
  }, []);

  //   handle on change
  const handleOnChange = (name, value) => {
    setMyObj((prev) => ({ ...prev, [name]: value }));
  };

  //   clear function
  const handleClear = async () => {
    setAccountDetails("");
    setTotalPages("");
    setTotalCharge("");
    setMyObj("");
  };

  const handleTotalPages = (value) => {
    setTotalPages({ page_no: value });
  };

  // fetch new batch number or requestID
  const fetchNewRequestID = () => {
    axios
      .get(API_SERVER + "/api/get-unique-ref", { headers })
      .then((response) => {
        if (response.data.length > 0) {
          setRequestID(response.data[0]);
        }
      })
      .catch((err) => console.error(`error in fetching unique ref so error is : ${err}`));
  };

  // fetch detals for report
  const fetchReportDetails = async () => {
    await axios
      .post(
        API_SERVER + "/api/print-account-statement",
        { details: "true", account_number: myObj?.account_number },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          setReportDetails(response.data[0]);
        } else {
          return false;
        }
      })
      .catch((err) => console.error("error fetching report details and error is:" + err));
  };

  // fetch account details to show in disabled fields
  const fetchAllDetails = () => {
    axios
      .post(
        API_SERVER + "/api/account-statement-request",
        {
          fetch: "true",
          validation1: "not valid",
          validation2: "not valid",
          user_name: JSON.parse(localStorage.getItem("userInfo"))?.id,
          account_number: myObj?.account_number,
        },
        { headers }
      )
      .then((response) => {
        console.log(response.data, "lexis");
        // console.log(response?.data[0]?.mess1[0]?.menu_users, "lexis");
        if (Object.keys(response?.data)?.length > 0) {
          if (
            (response?.data?.mess1[0]?.menu_users === 0 && response?.data?.mess2[0]?.tb_sp === 1) ||
            (response?.data?.mess1[0]?.menu_users === 1 && response?.data?.mess2[0]?.tb_sp === 0) ||
            (response?.data?.mess1[0]?.menu_users === 1 && response?.data?.mess2[0]?.tb_sp === 1)
          ) {
            axios
              .post(API_SERVER + "/api/get-error-message", { code: "06459" }, { headers })
              .then((response) => {
                if (response) {
                  Swal.fire({
                    text: response?.data,
                    icon: "error",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleClear();
                      const input = document.getElementById("account_number");
                      input?.focus();
                    }
                  });
                }
              });
          } else if (response?.data?.mess3?.length === 0) {
            axios
              .post(API_SERVER + "/api/get-error-message", { code: "06021" }, { headers })
              .then((response) => {
                if (response) {
                  Swal.fire({
                    text: response?.data,
                    icon: "error",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleClear();
                      const input = document.getElementById("account_number");
                      input?.focus();
                    }
                  });
                }
              })
              .catch((err) => console.error("error fetching account details and error is:" + err));
          } else {
            // setAccountDetails(response.data.mess3[0]);
          }
        } else {
          axios
            .post(API_SERVER + "/api/get-error-message", { code: "06021" }, { headers })
            .then((response) => {
              if (response) {
                Swal.fire({
                  text: response?.data,
                  icon: "error",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClear();
                    const input = document.getElementById("account_number");
                    input?.focus();
                  }
                });
              }
            })
            .catch((err) => console.error("error fetching account details and error is:" + err));
        }
      });
  };

  // check available balance

  // console.log({ accountDetails });
  // get balance brought forward

  const getBalance = () => {
    axios
      .post(
        API_SERVER + "/api/account-statement-request",
        {
          procedureType: "balance brought forward",
          // account_number: "004001150818160376",
          // account_number: "004001110312700168",
          account_number: myObj ? myObj?.account_number : "",
          start_date: "20-JAN-10",
          // start_date: "20-JAN-15",
          // start_date: formatDate2(myObj?.start_date),
          start_date: "07-MAR-24",
          // start_date: "07-MAR-24",
          // end_date: formatDate2(myObj?.end_date),
          posted_by: JSON.parse(localStorage.getItem("userInfo"))?.id,
        },
        { headers }
      )
      .then((response) => {
        if (Object.keys(response.data)?.length > 0) {
          setReportDetails((prev) => ({ ...prev, ...response.data }));
        } else {
          return;
        }
      })
      .catch((err) => console.error("error fetching account details and error is:" + err));
  };
  // console.log(reportDetails, "wakasu");

  const triggerModal = () => {
    if (myObj?.start_date !== "" && myObj?.start_date !== null && myObj?.start_date !== undefined) {
      setIsHidden(true);
    }
  };

  useEffect(() => {
    getBalance();
    triggerModal();
  }, [myObj?.start_date, myObj?.end_date]);

  useEffect(() => {
    setIsHidden(false);
  }, [totalPages3]);

  // trigger modal to open

  //    handle on key down
  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      setFetch(!fetch);
      setTotalPages("");
      setMyObj((prev) => ({
        ...prev,
        ["account_on_entered"]: myObj?.account_number,
        overall_total_charge: "",
      }));
      await fetchAllDetails();
      await fetchReportDetails();
    }
  };

  console.log({ myObj });
  //   handle close function
  // const handleClose = () => {
  //   axios
  //     .post(
  //       API_SERVER + "/api/account-statement-request",
  //       {
  //         delete_row: "true",
  //         user_name: JSON.parse(localStorage.getItem("userInfo"))?.id,
  //       },
  //       { headers }
  //     )
  //     .then((response) => {
  //       console.log(response, "ressss");
  //       if (response.data?.length === 0) {
  //         console.log("deleted");
  //       }
  //     })
  //     .catch((err) => console.error(`error here : ${err}`));

  //   setShowModal(false);
  // };
  console.log({ totalPages3 });

  // format date
  function formatDate(dateString) {
    const originalDate = new Date(dateString);
    if (isNaN(originalDate?.getTime())) {
      return ""; // Return empty string for invalid dates
    }

    const formattedDate = originalDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase()
      .replace(/ /g, "-");
    return formattedDate;
  }

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

  useEffect(() => {
    setTotalCharge((prev) => ({
      ...prev,
      totalCharge: formatNumber(parseInt(totalPages?.page_no) * totalCharge?.totalCharges),
    }));
  }, [totalPages?.page_no]);

  // console.log(totalCharge, "total charge");

  //   format date for report
  function formatDate2(dateString) {
    const originalDate = new Date(dateString);

    // Check if the date is valid
    if (isNaN(originalDate?.getTime())) {
      return ""; // Return empty string for invalid dates
    }

    const monthNames = {
      "01": "JAN",
      "02": "FEB",
      "03": "MAR",
      "04": "APR",
      "05": "MAY",
      "06": "JUN",
      "07": "JUL",
      "08": "AUG",
      "09": "SEP",
      10: "OCT",
      11: "NOV",
      12: "DEC",
    };

    // const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    // const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    // const year = originalDate.getFullYear().toString()?.slice(-2);

    // const formattedDate = `${day}-${month}-${year}`;
    // return formattedDate.toUpperCase();
    const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    const year = originalDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate.toUpperCase();
  }

  // focus on statement field lov
  useEffect(() => {
    if (
      Object.keys(accountDetails)?.length > 0 &&
      parseInt(accountDetails?.av_bal) >
        parseInt(totalCharge?.totalCharges === null ? 0 : totalCharge?.totalCharges)
    ) {
      const iD = document.getElementById("statement_type");
      iD?.focus();
    }
  }, [accountDetails]);

  //   open modal
  const toggleModal = () => {
    // if (
    //   myObj?.account_number === "" ||
    //   myObj?.account_number === " " ||
    //   myObj?.account_number === null
    // ) {
    //   axios
    //     .post(
    //       API_SERVER + "/api/get-error-message",
    //       { code: "06017" },
    //       { headers }
    //     )
    //     .then((response) => {
    //       if (response) {
    //         Swal.fire({
    //           text: response?.data,
    //           icon: "error",
    //         }).then((result) => {
    //           if (result.isConfirmed) {
    //             const input = document.getElementById("account_number");
    //             input?.focus();
    //           }
    //         });
    //       }
    //     });
    // } else if (myObj?.start_date === "" || myObj?.start_date === null) {
    //   axios
    //     .post(
    //       API_SERVER + "/api/get-error-message",
    //       { code: "05883" },
    //       { headers }
    //     )
    //     .then((response) => {
    //       if (response) {
    //         Swal.fire({
    //           text: response?.data,
    //           icon: "error",
    //         }).then((result) => {
    //           if (result.isConfirmed) {
    //             const input = document.getElementById("start_date");
    //             input?.focus();
    //           }
    //         });
    //       }
    //     });
    // } else if (myObj?.end_date === "" || myObj?.end_date === null) {
    //   axios
    //     .post(
    //       API_SERVER + "/api/get-error-message",
    //       { code: "06014" },
    //       { headers }
    //     )
    //     .then((response) => {
    //       if (response) {
    //         Swal.fire({
    //           text: response.data,
    //           icon: "error",
    //           allowOutsideClick: false,
    //         }).then((result) => {
    //           if (result.isConfirmed) {
    //             const input = document.getElementById("end_date");
    //             input?.focus();
    //           }
    //         });
    //       }
    //     });
    // } else {
    //   setShowModal(!showModal);
    //   handleTotalPages();
    // }
    setIsHidden(false);
    setShowModal(!showModal);
  };

  // get total charge
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/account-statement-request",
        {
          procedureType: "getTotalCharges",
          db_account_v: myObj?.account_number,
          trans_code_v: myObj?.state_type,
          trans_amount: 0,
          batch_no_v: requestID,
          posted_by_v: JSON.parse(localStorage.getItem("userInfo"))?.id,
          cbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          dbranch: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          app_flag: "N",
          destiC: "A",
          terminal: localStorage.getItem("ipAddress"),
          form_code: "ASCA",
          rate_v: 0,
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "komot");
        if (Object.keys(response.data)?.length > 0) {
          setTotalCharge(response.data);
        }
      })
      .catch((err) => console.error(`error here :${err}`));
  }, [fetch]);

  // console.log("danny", accountDetails);

  // check available balance
  // useEffect(() => {
  //   if (
  //     parseInt(accountDetails?.av_bal) < parseInt(totalCharge?.totalCharges)
  //   ) {
  //     axios
  //       .post(
  //         API_SERVER + "/api/get-error-message",
  //         { code: "07298" },
  //         { headers }
  //       )
  //       .then((response) => {
  //         if (response) {
  //           Swal.fire({
  //             text: response?.data,
  //             icon: "error",
  //           }).then((result) => {
  //             if (result.isConfirmed) {
  //               handleClear();
  //               const input = document.getElementById("account_number");
  //               input?.focus();
  //             }
  //           });
  //         }
  //       })
  //       .catch((err) =>
  //         console.error("error fetching account details and error is:" + err)
  //       );
  //   }
  // }, [accountDetails]);
  console.log({ isHidden });

  // handle submit
  const handleSubmit = () => {
    if (myObj?.requested_by === "") {
      // 06016
      axios
        .post(API_SERVER + "/api/get-error-message", { code: "06016" }, { headers })
        .then((response) => {
          if (response) {
            Swal.fire({
              text: response.data,
              icon: "error",
            }).then((result) => {
              if (result.isConfirmed) {
                const input = document.getElementById("requested_by");
                input?.focus();
              }
            });
          }
        });
    } else {
      axios
        .post(
          API_SERVER + "/api/account-statement-request",
          {
            procedureType: "handleSubmit",
            db_account_v: myObj?.account_number,
            statement_type_v: myObj?.statement_type,
            state_type_v: myObj?.state_type,
            doc_no_v: myObj?.source_document,
            bra_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
            start_date: formatDate(myObj?.start_date),
            // start_date: formatDate2(myObj?.start_date),
            end_date: formatDate(myObj?.end_date),
            // end_date: formatDate2(myObj?.end_date),
            no_of_pages: parseInt(totalPages?.page_no),
            requested_by: JSON.parse(localStorage.getItem("userInfo"))?.id,
            comment_v: myObj?.comments,
            posted_by: myObj?.requested_by,
            terminal: localStorage.getItem("ipAddress"),
          },
          { headers }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            console.log(response, "derrick");
            if (response.data.msg_code === 1) {
              Swal.fire({
                text: response.data.msg_v,
                icon: "error",
              });
            } else if (response.data.msg_code === 0) {
              Swal.fire({
                text: `${response.data.msg_v} with Batch Number : ${response.data.req_no_v}`,
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClear();
                  fetchNewRequestID();
                }
              });
            } else {
              return;
            }
          }
        })
        .catch((err) => console.error(`error here :${err}`));
    }
  };

  // calculate number total charge
  useEffect(() => {
    setMyObj((prev) => ({
      ...prev,
      overall_total_charge: formatNumber(
        parseInt(
          totalPages?.page_no === ""
            ? "0"
            : totalPages?.page_no === null
            ? "0"
            : totalPages?.page_no
        ) * totalCharge?.totalCharges
      ),
    }));
  }, [totalPages?.page_no]);

  // console.log(myObj, "adjetey");

  // console.log(totalCharge, "derrick");

  useEffect(() => {
    if (accountDetails && accountDetails?.summary?.length > 0) {
      setMyObj((prev) => ({
        ...prev,
        ["account_name"]: accountDetails?.summary[0]?.account_name,
      }));
    }
  }, [accountDetails]);

  //  get total number of pages
  // const handleTotalNumberOfPages = () => {
  //   axios
  //     .post(
  //       API_SERVER + "/api/account-statement-request",
  //       {
  //         report: "true",
  //         account_number: "004001100248250119",
  //         // account_number: "004001110312700168",
  //         // account_number: accountNumber,
  //         start_date: "21-FEB-2019",
  //         // start_date: "20-JAN-2018",
  //         end_date: "",
  //         // current_date: currentDate,
  //       },
  //       {
  //         headers,
  //       }
  //     )
  //     .then(function (response) {
  //       // console.log(response, "dennis");
  //       let totalDebit = 0;
  //       let totalCredit = 0;

  //       const arr = [];
  //       response.data?.forEach((i, key) => {
  //         // Add the values to the totals if they are not NaN
  //         const debit = parseFloat(i?.local_equivalent_db);
  //         const credit = parseFloat(i?.local_equivalent_cr);

  //         if (!isNaN(debit)) {
  //           totalDebit += debit;
  //         }

  //         if (!isNaN(credit)) {
  //           totalCredit += credit;
  //         }

  //         arr.push([
  //           <div className="whitespace-nowrap ps-3 text-center">
  //             {formatDate2(i?.voucher_date)}
  //           </div>,
  //           <div className="whitespace-nowrap  text-center">
  //             {formatDate2(i?.value_date)}
  //           </div>,
  //           <div>{i?.transaction_details}</div>,
  //           <div className="text-left">{i?.document_ref}</div>,
  //           <div className="text-right">
  //             {i?.local_equivalent_db === null
  //               ? ""
  //               : i?.local_equivalent_db === " "
  //               ? ""
  //               : formatNumber(parseInt(i?.local_equivalent_db))}
  //           </div>,
  //           <div className="text-right">
  //             {i?.local_equivalent_cr === null
  //               ? ""
  //               : i?.local_equivalent_cr === " "
  //               ? ""
  //               : formatNumber(parseInt(i?.local_equivalent_cr))}
  //           </div>,

  //           <div className="text-right pe-[30px]">
  //             {formatNumber(parseInt(i?.balance))}
  //           </div>,
  //         ]);
  //       });

  //       const balanceBroughtForward = [
  //         <div></div>,
  //         <div></div>,
  //         <div className="uppercase">
  //           {balance_brought_forward ? "Balance brought forward" : ""}
  //         </div>,
  //         <div></div>,
  //         <div></div>,
  //         <div></div>,
  //         <div className="text-right pe-[30px]">
  //           {balance_brought_forward
  //             ? formatNumber(parseFloat(balance_brought_forward))
  //             : ""}
  //         </div>,
  //       ];

  //       const newArray = [
  //         <div></div>,
  //         <div></div>,
  //         <div></div>,
  //         <div
  //           style={{
  //             height: "40px",
  //             display: "grid",
  //             placeItems: "center",
  //             fontWeight: "700",
  //             textDecoration: "underline",
  //           }}
  //         >
  //           Total:
  //         </div>,
  //         <div
  //           style={{
  //             backgroundColor: "#a8ffcf",
  //             height: "40px",
  //             display: "grid",
  //             placeItems: "center",
  //             fontWeight: "700",
  //             borderRadius: "5px",
  //           }}
  //         >
  //           {formatNumber(totalDebit)}
  //         </div>,
  //         <div
  //           style={{
  //             backgroundColor: "#a8ffcf",
  //             height: "40px",
  //             display: "grid",
  //             placeItems: "center",
  //             fontWeight: "700",
  //             borderRadius: "5px",
  //           }}
  //         >
  //           {formatNumber(totalCredit)}
  //         </div>,
  //         <div></div>,
  //       ];

  //       setReportData([balanceBroughtForward, ...arr, newArray]);
  //       // setload(false);
  //     })
  //     .catch((err) => {
  //       // setload(false);
  //       console.error(`error here : ${err}`);
  //     });
  // };

  return (
    <div>
      {/* actions buttons  */}
      <div>
        <ActionButtons
          displayFetch={"none"}
          displayRefresh={"none"}
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayHelp={"none"}
          displayView={"none"}
          displayDelete={"none"}
          displayReject={"none"}
          onNewClick={handleClear}
          // onOkClick={handleSubmit}
          // onOkClick={generatePDF}
        />
      </div>

      {/* border  */}
      <hr className="mt-3" />

      {/* request id  */}
      <div className="flex justify-end pt-2 pb-2 mt-2">
        <div className="w-[25%]">
          <InputField
            label={"Request ID"}
            labelWidth={"30%"}
            inputWidth={"60%"}
            disabled={true}
            value={requestID ? requestID?.unique_ref : ""}
            textAlign={"center"}
          />
        </div>
      </div>

      {/* border  */}
      <hr className="mt-3 mb-4" />

      <div className="flex space-x-4">
        {/* left div  */}
        <div className="w-[75%] ">
          {/* first container   */}
          <div className="border border-2 rounded p-3  space-y-5">
            {/* account and account name  */}
            <div className="flex space-x-1 justify-center pt-[10px] pb-[10px]">
              <div className="w-[50%] capitalize">
                <InputField
                  label={"Account No"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  required={true}
                  type={"number"}
                  name={"account_number"}
                  id={"account_number"}
                  value={myObj ? myObj?.account_number : ""}
                  onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                  onKeyDown={handleEnter}
                />
              </div>
              <div className="w-[50%] capitalize">
                <InputField
                  inputWidth={"93%"}
                  noMarginRight={true}
                  disabled={true}
                  value={myObj ? myObj?.account_name : ""}
                  textAlign={"center"}
                />
              </div>
            </div>

            <hr className="" />

            <div className="flex space-x-2 items-center pt-[10px]">
              <div className="w-[50%] capitalize">
                <ListOfValue
                  label={"statement type"}
                  labelWidth={"30%"}
                  inputWidth={"60%"}
                  id={"statement_type"}
                  required={true}
                  type={"number"}
                  data={statementTypeLOV}
                  value={myObj ? myObj?.statement_type : ""}
                  onChange={(value) => {
                    const selectedOption = statementTypeLOV?.find((i) => i.value === value);
                    const state_type = selectedOption?.label.split("-")[3];
                    handleOnChange("statement_type", value);
                    handleOnChange("state_type", state_type);
                    const input = document.getElementById("source_document");
                    setTimeout(() => {
                      input?.focus();
                    }, 0);
                  }}
                />
              </div>
              <div className="w-[50%] capitalize flex space-x-2 items-center">
                <span className="w-[65%]">
                  <InputField
                    label={"source document"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    name={"source_document"}
                    id={"source_document"}
                    type={"number"}
                    value={myObj ? myObj?.source_document : ""}
                    onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const input = document.getElementById("start_date");
                        input?.focus();
                      }
                    }}
                  />
                </span>
                <span className="w-[35%]">
                  <ButtonComponent
                    label={"View Document"}
                    buttonHeight={"26px"}
                    buttonIcon={CustomButtons["viewDoc"]?.icon}
                    buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                    onClick={() => {
                      if (
                        myObj?.source_document === "" ||
                        myObj?.source_document === " " ||
                        myObj?.source_document === null
                      ) {
                        axios
                          .post(
                            API_SERVER + "/api/get-error-message",
                            { code: "01346" },
                            { headers }
                          )
                          .then((response) => {
                            if (response) {
                              Swal.fire({
                                text: response.data,
                                icon: "error",
                                allowOutsideClick: false,
                              });
                            }
                          })
                          .catch((err) => console.log(`error is :${err}`));
                      } else {
                        setShowViewDoc(true);
                      }
                    }}
                  />
                </span>

                {/* show view doc modal   */}
                {showViewDoc && (
                  <div>
                    <Modal
                      opened={showViewDoc}
                      onClose={() => setShowViewDoc(false)}
                      trapFocus={false}
                      size={"100%"}
                      padding={0}
                    >
                      <DocumentViewing documentID={myObj ? myObj?.source_document : ""} />
                    </Modal>
                  </div>
                )}
              </div>
            </div>

            {/* start date and end date   */}
            <div className="flex space-x-2 items-center">
              <div className="w-[50%] capitalize">
                <InputField
                  label={"start date"}
                  labelWidth={"30%"}
                  inputWidth={"40%"}
                  type={"date"}
                  required={true}
                  name={"start_date"}
                  id={"start_date"}
                  value={myObj ? myObj?.start_date : ""}
                  onChange={(e) => {
                    handleOnChange(e.target.name, e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const input = document.getElementById("end_date");
                      input?.focus();
                    }
                  }}
                />
              </div>
              <div className="w-[50%] capitalize flex space-x-2 items-center">
                <span className="w-[65%]">
                  <InputField
                    label={"end date"}
                    required={true}
                    type={"date"}
                    labelWidth={"35%"}
                    inputWidth={"60%"}
                    name={"end_date"}
                    id={"end_date"}
                    value={myObj ? myObj?.end_date : ""}
                    onChange={(e) => handleOnChange(e.target.name, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const input = document.getElementById("requested_by");
                        input?.focus();
                      }
                    }}
                  />
                </span>
                <span className="w-[35%] invisible">
                  <ButtonComponent
                    label={"Preview State"}
                    buttonHeight={"26px"}
                    buttonWidth={"146px"}
                    onClick={triggerModal}
                  />
                </span>
              </div>
            </div>

            {/* show preview modal  */}
            {/* {showModal && ( */}
            {showModal && (
              <Report
                accountNumber={myObj?.account_number}
                accountName={accountDetails?.account_descrp}
                currency={reportDetails?.iso_code}
                product={reportDetails?.product_desc}
                bookBalance={reportDetails?.post_av_bal}
                unclearedBalance={reportDetails?.shadow_uncleared}
                clearedBalance={reportDetails?.shadow_balance_today}
                start_date={formatDate2(myObj?.start_date)}
                end_date={formatDate2(myObj?.end_date)}
                balance_brought_forward={reportDetails?.balance}
                formatDate={formatDate}
                formatDate2={formatDate2}
                newTotal={handleTotalPages}
                showModal={showModal}
                handleClose={() => {
                  setShowModal(false);
                  setIsHidden(false);
                }}
                isHidden={isHidden}
                setClose={setIsHidden}
                setTotalPages3={setTotalPages3}
              />
            )}

            {/* second modal to hide */}
            {isHidden && (
              <Report
                accountNumber={myObj?.account_number}
                accountName={accountDetails?.account_descrp}
                currency={reportDetails?.iso_code}
                product={reportDetails?.product_desc}
                bookBalance={reportDetails?.post_av_bal}
                unclearedBalance={reportDetails?.shadow_uncleared}
                clearedBalance={reportDetails?.shadow_balance_today}
                start_date={formatDate2(myObj?.start_date)}
                end_date={formatDate2(myObj?.end_date)}
                balance_brought_forward={reportDetails?.balance}
                formatDate={formatDate}
                formatDate2={formatDate2}
                newTotal={handleTotalPages}
                showModal={showModal}
                handleClose={() => {
                  setShowModal(false);
                  setIsHidden(false);
                }}
                isHidden={isHidden}
                setClose={setIsHidden}
                setTotalPages3={setTotalPages3}
              />
            )}

            {/* <PreviewStatementModal
              handleClose={handleClose}
              showModal={showModal}
              account_number={myObj?.account_number}
              start_date={formatDate2(myObj?.start_date)}
              end_date={formatDate2(myObj?.end_date)}
              user_name={JSON.parse(localStorage.getItem("userInfo"))?.id}
              setTotal={setTotalPages}
            /> */}
            {/* ) */}

            <p className="container capitalize text-red-400 text-[15px] w-[50%] px-5">
              Preview to get total number of pages
            </p>

            {/* no of pages date and invisible   */}
            <div className="flex space-x-2 items-center">
              <div className="w-[50%] capitalize flex space-x-2 items-center">
                <span className="w-[65%] ">
                  <InputField
                    label={"no of pages"}
                    labelWidth={"45.5%"}
                    inputWidth={"48.5%"}
                    // value={totalPages ? totalPages?.page_no : ""}
                    value={totalPages3 ? totalPages3 : ""}
                    // readOnly={true}

                    disabled={true}
                    textAlign={"center"}
                  />
                </span>
                <span className="w-[30%]">
                  <ButtonComponent
                    label={"Preview Statement"}
                    buttonWidth={"146px"}
                    buttonHeight={"26px"}
                    onClick={toggleModal}
                  />
                </span>
              </div>
              <div className="w-[50%] capitalize invisible">
                <InputField
                  label={""}
                  labelWidth={"30%"}
                  inputWidth={"40%"}
                  type={"date"}
                  required={true}
                />
              </div>
            </div>

            {/* requested by  */}
            <div className="w-full capitalize">
              <InputField
                label={"requested by"}
                required={true}
                labelWidth={"14.6%"}
                inputWidth={"80.3%"}
                name={"requested_by"}
                id={"requested_by"}
                value={myObj ? myObj?.requested_by : ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value?.toUpperCase())}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const input = document.getElementById("comments");
                    input?.focus();
                  }
                }}
              />
            </div>

            {/* comments */}
            <div className="w-full capitalize pb-[10px]">
              <TextAreaField
                label={"comments"}
                labelWidth={"14.6%"}
                inputWidth={"80.3%"}
                name={"comments"}
                id={"comments"}
                value={myObj ? myObj?.comments : ""}
                onChange={(e) => handleOnChange(e.target.name, e.target.value?.toUpperCase())}
              />
            </div>
          </div>
        </div>
        {/* right side  */}
        {/* account balances  */}
        <div className="w-[25%]">
          <div className="border border-2 rounded">
            <AccountSummary
              accountNumber={myObj ? myObj?.account_on_entered : ""}
              setAccountDetails={setAccountDetails}
            />
          </div>
          {/* <div>
            <Header title={"account balances"} headerShade={true} />
          </div> */}
          <div className="mt-[22px] border border-2 rounded p-3">
            <p className="pt-[10px]">
              <InputField
                label={"Charge Per Page"}
                inputWidth={"65%"}
                labelWidth={"30%"}
                disabled={true}
                value={totalCharge ? formatNumber(totalCharge?.totalCharges) : ""}
                textAlign={"right"}
              />
            </p>

            <p className="pt-3 pb-3">
              <InputField
                label={"Total Charges"}
                inputWidth={"65%"}
                labelWidth={"30%"}
                disabled={true}
                value={myObj ? myObj?.overall_total_charge : ""}
                textAlign={"right"}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatementRequest;
