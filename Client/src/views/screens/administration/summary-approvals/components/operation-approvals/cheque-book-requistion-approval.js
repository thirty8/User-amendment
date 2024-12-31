import React, { useState, useEffect } from "react";
import DocumentViewing from "../../../../../../components/others/DocumentViewing";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import InputField from "../../../../../../components/others/Fields/InputField";
import Swal from "sweetalert2";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../../components/others/CustomButtons";
import AccountSummary from "../../../../../../components/others/AccountSummary";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import ModalLoader from "../../../../../../components/others/ModalLoader";
import ModalComponent from "../../../../../../components/others/Modal/modal";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ChequeBookRequisitionApproval({ batchNo, setShowModal }) {
  const [accountDetails, setAccountDetails] = useState({});
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [myObj, setMyObj] = useState({});
  const [loading, setLoading] = useState(false);

  // format date
  function formatDate(dateString) {
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

    const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    const year = originalDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate?.toUpperCase();
  }

  useEffect(() => {
    // get account details
    async function fetchData() {
      setLoading(true);
      await axios
        .post(
          API_SERVER + "/api/cheque-book-request-approval",
          {
            fetch_all_details: "true",
            batch_number: batchNo,
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response?.data?.length > 0) {
            setMyObj(response?.data[0]);
          }
          setLoading(false);
        })
        .catch((err) => `error caught on page load: ${err}`);
    }

    fetchData();
  }, []);

  // format amount
  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === ".00") {
      return "";
    } else {
      const numberString = num.toString();
      const decimalIndex = numberString.indexOf(".");

      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString.substr(0, decimalIndex);
        const decimalPart = numberString.substr(decimalIndex);
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

  const handleSubmit = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // const ipAddress = localStorage.getItem("ipAddress");
    Swal.fire({
      text: "Are you sure you want to approve this transaction?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Processing...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        axios
          .post(
            API_SERVER + "/api/cheque-book-request-approval",
            {
              approveReq: "true",
              acct_link: myObj ? myObj?.acct_link : "",
              no_of_leaves: myObj ? parseInt(myObj?.number_of_books) : 0,
              batch_number: myObj ? myObj?.requisition_no : "",
              total_charges_v: myObj ? myObj?.charge : "",
              username_v: userInfo?.id,
              global_bra_v: userInfo?.branchCode,
              form_code_v: "SDRT",
              // terminal_v: ipAddress,
            },
            { headers }
          )
          .then((response) => {
            if (response?.data?.length > 0) {
              Swal.showLoading();
              const code = response?.data[0]?.RESPONSE_CODE;
              const mess = response?.data[0]?.RESPONSE_MESS;
              Swal.fire({
                text: mess,
                icon: code === "000" ? "success" : "error",
              }).then((result) => {
                if (result.isConfirmed && code === "000") {
                  setMyObj("");
                  setShowModal(false);
                }
              });
            }
          })
          .catch((err) => {
            console.log(`error caught in approve procedure : ${err}`);
          });
      }
    });
  };

  // reject
  const handleReject = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // const ipAddress = localStorage.getItem("ipAddress");
    Swal.fire({
      text: "Are you sure you want to reject this transaction?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Processing...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        axios
          .post(
            API_SERVER + "/api/cheque-book-request-approval",
            {
              rejectReq: "true",
              acct_link: myObj ? myObj?.acct_link : "",
              batch_number: myObj ? myObj?.requisition_no : "",
              username_v: userInfo?.id,
              global_bra_v: userInfo?.branchCode,
              // terminal_v: ipAddress,
            },
            { headers }
          )
          .then((response) => {
            if (response?.data?.length > 0) {
              Swal.close();
              const code = response?.data[0]?.RESPONSE_CODE;
              const mess = response?.data[0]?.RESPONSE_MESS;
              Swal.fire({
                text: mess,
                icon: code === "000" ? "success" : "error",
              }).then((result) => {
                if (result.isConfirmed && code === "000") {
                  setMyObj("");
                  setShowModal(false);
                }
              });
            }
          })
          .catch((err) => {
            console.log(`error caught in reject procedure : ${err}`);
            Swal.close();
          });
      }
    });
  };

  function handleDocumentNo() {
    if (
      myObj?.cheque_book_type === "" ||
      myObj?.cheque_book_type === null ||
      myObj?.cheque_book_type === undefined
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
        .catch((err) => console.log("error here:" + err));
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  return (
    <div style={{ zoom: 0.9 }}>
      {loading ? (
        <div className="flex justify-center w-full pt-[100px] pb-[100px]">
          <ModalLoader />
        </div>
      ) : (
        <div className="mx-4">
          <div>
            {sweetAlertConfirmed && (
              <ModalComponent
                open={sweetAlertConfirmed}
                onClose={() => setSweetAlertConfirmed(false)}
                width={"55%"}
                content={
                  <div>
                    <DocumentViewing documentID={myObj ? myObj?.cheque_book_type : ""} />
                  </div>
                }
              />
            )}

            <ActionButtons
              displayFetch={"none"}
              displayOk={"none"}
              displayCancel={"none"}
              displayRefresh={"none"}
              displayView={"none"}
              displayHelp={"none"}
              displayDelete={"none"}
              displayNew={"none"}
              onAuthoriseClick={handleSubmit}
              onRejectClick={handleReject}
            />
          </div>

          <hr className="my-[3px] mt-3" />
          {/* start of body  */}

          <div className="bg-white flex justify-end py-[10px] mb-2">
            <div>
              <InputField
                label={"Request ID"}
                labelWidth={"35%"}
                inputWidth={"60%"}
                disabled={true}
                textAlign={"center"}
                value={myObj ? myObj?.requisition_no : ""}
              />
            </div>
            <div className="">
              <InputField
                label={"Request Date"}
                labelWidth={"40%"}
                inputWidth={"60%"}
                disabled={true}
                value={myObj ? formatDate(myObj?.posting_date) : ""}
                textAlign={"center"}
              />
            </div>
          </div>
          {/* </div> */}
          <hr className="my-[3px] mb-3" />

          {/* new  data  */}
          <div className="flex space-x-3">
            <div className=" w-[70%]">
              <div className="w-full rounded border-2 px-1 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <InputField
                      label={"Account Number"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      disabled={true}
                      value={myObj ? myObj?.acct_link : ""}
                    />
                  </div>

                  <div className="" title={myObj?.account_desc || ""}>
                    <InputField
                      noMarginRight={true}
                      disabled={true}
                      inputWidth={"98.5%"}
                      value={
                        myObj?.account_desc
                          ? myObj.account_desc.length > 45
                            ? myObj.account_desc.substring(0, 44) + "...."
                            : myObj.account_desc
                          : ""
                      }
                    />
                  </div>
                  {/* row 2  */}
                  <div className="">
                    <InputField
                      label={"Book Style"}
                      id={"book_style"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      disabled={true}
                      value={
                        myObj && Object.keys(myObj)?.length > 0 && myObj?.leaves_no === 25
                          ? "25 - SMALL"
                          : myObj && Object.keys(myObj)?.length > 0 && myObj?.leaves_no === 50
                          ? "50 - LARGE"
                          : ""
                      }
                    />
                  </div>
                  <div className="">
                    <InputField
                      label={"Number of Leaves"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      id={"number_of_leaves"}
                      disabled={true}
                      value={myObj ? myObj?.leaves_no : ""}
                    />
                  </div>

                  {/* third row  */}
                  <div className="">
                    <InputField
                      label={"Number of Books"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      id={"number_of_books"}
                      disabled={true}
                      value={myObj ? myObj?.number_of_books : ""}
                    />
                  </div>
                  <div className="">
                    <InputField
                      label={"Delivery Channel"}
                      labelWidth={"34.9%"}
                      inputWidth={"58.3%"}
                      disabled={true}
                      value={myObj ? myObj?.delivery_channel : ""}
                    />
                  </div>

                  {/* fourth row  */}
                  {myObj?.delivery_channel?.toLowerCase()?.includes("branch") && (
                    <div>
                      <InputField
                        label={"Delivery Branch"}
                        id={"delivery_branch"}
                        labelWidth={"34.9%"}
                        inputWidth={"58.3%"}
                        disabled={true}
                        value={
                          myObj && Object.keys(myObj)?.length > 0
                            ? `${myObj?.delivery_branch} - ${myObj?.branch_desc}`
                            : ""
                        }
                      />
                    </div>
                  )}
                </div>

                {/* full width here  */}
                {myObj?.delivery_channel?.toLowerCase()?.includes("courrier") && (
                  <div className="mt-4">
                    <InputField
                      label={"Address"}
                      labelWidth={"17%"}
                      inputWidth={"79.5%"}
                      value={myObj ? myObj?.courrier_address : ""}
                      disabled={true}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-3 mt-4">
                  <span className="w-[50%]">
                    {" "}
                    <InputField
                      label={"Document Number"}
                      id={"document_number"}
                      name={"document_number"}
                      labelWidth={"33.3%"}
                      inputWidth={"57.8%"}
                      type={"number"}
                      value={
                        myObj
                          ? myObj?.cheque_book_type === "null"
                            ? ""
                            : myObj?.cheque_book_type
                          : ""
                      }
                      disabled={true}
                    />
                  </span>
                  <span>
                    <ButtonComponent
                      label={"View Doc"}
                      buttonWidth={"100px"}
                      type={"button"}
                      buttonIcon={CustomButtons["viewDoc"]?.icon}
                      buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                      buttonHeight={"26px"}
                      buttonColor={"white"}
                      onClick={handleDocumentNo}
                    />
                  </span>
                </div>

                <div className="flex items-center space-x-3 mt-3">
                  <span className="w-[50%]">
                    {" "}
                    <InputField
                      label={"Total Charge"}
                      id={"total_charge"}
                      labelWidth={"33.3%"}
                      inputWidth={"57.8%"}
                      disabled={true}
                      textAlign={"right"}
                      value={
                        myObj?.charge === null ? "0.00" : formatNumber(myObj?.charge?.toString())
                      }
                    />
                  </span>
                  <span className="invisible">
                    <ButtonComponent label={"View Doc"} buttonWidth={"100px"} type={"button"} />
                  </span>
                </div>
              </div>
            </div>

            {/* account summary  */}
            <div className="w-[30%] ps-4" style={{ zoom: 0.9 }}>
              <AccountSummary
                accountNumber={myObj ? myObj?.acct_link : ""}
                setAccountDetails={setAccountDetails}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChequeBookRequisitionApproval;
