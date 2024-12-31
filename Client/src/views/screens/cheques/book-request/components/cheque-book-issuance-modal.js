import React, { useState, useEffect } from "react";
import DocumentViewing from "../../../../../components/DocumentViewing";
import CustomTable from "../../../../../components/others/customtable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import Swal from "sweetalert2";
import ModalComponent from "../../../../../components/others/Modal/modal";
import { Modal } from "@mantine/core";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../components/others/CustomButtons";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ModalLoader from "../../../../../components/others/ModalLoader";
import Header from "../../../../../components/others/Header/Header";
import AccountSummary from "../../../../../components/others/AccountSummary";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ChequeBookIssuance({ opened, handleClose, rowData, setToggle }) {
  const [accountDetails, setAccountDetails] = useState([]);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [myObj, setMyObj] = useState({ cheque_book_type: "" });
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState([]);

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
    // get  details
    async function fetchData() {
      return await axios.post(
        API_SERVER + "/api/cheque-book-issuance",
        {
          fetch_screen_two_details: "true",
          batch_number: rowData?.requisition_no,
        },
        {
          headers,
        }
      );
    }
    // get cheque range
    async function getRange() {
      return await axios.post(
        API_SERVER + "/api/cheque-book-maintenance",
        {
          fetch_cheque_range: "true",
          batch_number: rowData?.requisition_no,
          acct_link: rowData?.acct_link,
        },
        {
          headers,
        }
      );
    }
    async function gh() {
      setLoading(true);
      await Promise.all([fetchData(), getRange()]).then((response) => {
        const arr = [];

        response[1]?.data?.map((i) => {
          arr.push([
            i?.request_id,
            i?.acct_link,
            i?.start_page,
            i?.end_page,
            // <div className="flex justify-center">
            //   <div>
            //     <InputField
            //       noMarginRight={true}
            //       inputWidth={"100%"}
            //       value={i?.start_page || ""}
            //       disabled={true}
            //       textAlign={"center"}
            //     />
            //   </div>
            // </div>,
            // <div className="flex justify-center">
            //   <div>
            //     <InputField
            //       noMarginRight={true}
            //       inputWidth={"100%"}
            //       disabled={true}
            //       value={i?.end_page || ""}
            //       textAlign={"center"}
            //     />
            //   </div>
            // </div>,
          ]);
        });

        setMyObj(response[0]?.data[0]);
        setMyData(arr);
      });
      setLoading(false);
    }
    gh();
  }, []);

  // final okay
  const handleSubmit = async () => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    Swal.fire({
      text: "Processing...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await axios
      .post(
        API_SERVER + "/api/cheque-book-issuance",
        {
          handle_procedure: "true",
          acct_link: myObj ? myObj?.acct_link : "",
          global_bra: userInfo?.branchCode,
          global_username: userInfo?.id,
          batch_number: myObj ? myObj?.requisition_no : "",
          host_name_v: localStorage.getItem("ipAddress"),
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
            icon: response_code !== "1" ? "error" : "success",
          }).then((result) => {
            if (result.isConfirmed && response_code === "1") {
              setMyObj("");
              setMyData([]);
              setToggle(false);
              handleClose();
            }
          });
        } else {
          Swal.close();
        }
      })
      .catch((err) => console.log(`error caught in account number: ${err}`));
  };

  // reject
  const handleReject = () => {
    Swal.fire({
      text: "Are you sure you want to reject this transaction?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        alert("bro");
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
        .catch((err) => {
          if (err) {
            console.log("error here:" + err);
          }
        });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={handleClose}
        trapFocus={false}
        withCloseButton={false}
        padding={0}
        size={"75%"}
      >
        <div style={{ zoom: 0.92 }}>
          <div>
            <Header
              title={"Cheque book issuance"}
              closeIcon={true}
              handleClose={handleClose}
              headerShade={true}
            />
            {loading ? (
              <div className="flex justify-center pt-[100px] pb-[100px]">
                <ModalLoader />
              </div>
            ) : (
              <div className="mx-4">
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
                <div className="p-1">
                  <ActionButtons
                    displayFetch={"none"}
                    displayAuthorise={"none"}
                    displayCancel={"none"}
                    displayRefresh={"none"}
                    displayView={"none"}
                    displayHelp={"none"}
                    displayDelete={"none"}
                    displayNew={"none"}
                    displayReject={"none"}
                    onOkClick={handleSubmit}
                    onExitClick={handleClose}
                    // onRejectClick={handleReject}
                  />
                </div>
                <hr className="my-[3px] mt-3" />
                {/* start of body  */}
                <div className="bg-white flex justify-end py-[10px] px-4 mb-2">
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
                  <div className="me-2">
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
                <hr className="my-[3px] mb-3" />
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
                            value={myObj ? myObj?.address : ""}
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
                            labelWidth={"34.2%"}
                            inputWidth={"57.2%"}
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
                    </div>
                  </div>

                  {/* account summary  */}
                  <div className="w-[30%] ps-4" style={{ zoom: 0.92 }}>
                    <AccountSummary
                      accountNumber={myObj ? myObj?.acct_link : ""}
                      setAccountDetails={setAccountDetails}
                    />
                  </div>
                </div>
                <div className="pt-5 mb-5">
                  <CustomTable
                    headers={["S / No", "Account No", "Start Page", "End Page"]}
                    // data={dd}
                    data={myData}
                    rowsPerPage={5}
                  />
                </div>{" "}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ChequeBookIssuance;
