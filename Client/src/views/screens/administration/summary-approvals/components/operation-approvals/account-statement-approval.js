import React, { useState, useEffect } from "react";
import { Modal } from "@mantine/core";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../../components/others/CustomButtons";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import Header from "../../../../../../components/others/Header/Header";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import Report from "../../../../accounts/account-statement/components/report";
// import PreviewStatementModal from "../account-statement-request/components/preview-statement-modal";
import Swal from "sweetalert2";
import DocumentViewing from "../../../../../../components/DocumentViewing";
import ModalLoader from "../../../../../../components/others/ModalLoader";

const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const AccountRequestApproval = ({ batch_number }) => {
  const [accountDetails, setAccountDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showViewDoc, setShowViewDoc] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [totalPages, setTotalPages] = useState({});
  const [reportDetails, setReportDetails] = useState({});
  const [totalCharge, setTotalCharge] = useState({});
  const [allDetails, setAllDetails] = useState({
    start_date: "",
    end_date: "",
    document_no: "",
  });
  const [overallCharge, setOverallCharge] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch all details with batch number
    setLoading(true);
    async function fetchAllDetails() {
      await axios
        .post(
          API_SERVER + "/api/account-statement-request-approval",
          { fetch: "true", batch_number: batch_number },
          { headers }
        )
        .then((response) => {
          if (response?.data.length > 0) {
            setAllDetails(response.data[0]);
            setFetch(!fetch);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(`error occured : ${err}`);
        });
    }

    fetchAllDetails();
  }, []);

  useEffect(() => {
    const fetchReportDetails = async () => {
      await axios
        .post(
          API_SERVER + "/api/print-account-statement",
          {
            details: "true",
            account_number: allDetails ? allDetails?.acct_link : "",
          },
          { headers }
        )
        .then((response) => {
          if (response?.data.length > 0) {
            setReportDetails(response.data[0]);
          } else {
            return false;
          }
        })
        .catch((err) => console.error("error fetching report details and error is:" + err));
    };

    fetchReportDetails();
  }, [allDetails]);

  const handleTotalPages = (value) => {
    console.log(value);
  };

  //   clear function
  const handleClear = async () => {
    setAccountDetails("");
    setTotalPages("");
    setTotalCharge("");
    setAllDetails("");
  };

  // //   handle close function
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
  //         return;
  //       }
  //     })
  //     .catch((err) => console.log(`error here : ${err}`));

  //   setShowModal(false);
  // };

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
    if (isNaN(num)) {
      return "";
    }

    const formatted = num?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  useEffect(() => {
    setTotalCharge((prev) => ({
      ...prev,
      totalCharge: formatNumber(parseInt(totalPages?.page_no) * totalCharge?.totalCharges),
    }));
  }, [accountDetails]);

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

    const day = ("0" + originalDate.getDate())?.slice(-2); // Ensures leading zero if needed
    const month = monthNames[("0" + (originalDate.getMonth() + 1))?.slice(-2)];
    const year = originalDate.getFullYear().toString()?.slice(-2);

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate?.toUpperCase();
  }

  //   open modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // get total charge
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/account-statement-request",
        {
          procedureType: "getTotalCharges",
          db_account_v: allDetails ? allDetails?.acct_link : "",
          trans_code_v: "TEST",
          trans_amount: 0,
          batch_no_v: "TEST",
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
        if (Object.keys(response.data).length > 0) {
          setTotalCharge(response?.data);
        }
      })
      .catch((err) => console.log(`error here :${err}`));
  }, [fetch]);

  // handle submit
  const handleSubmit = () => {
    Swal.fire({
      text: "Are you sure you want to authorise?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "No",
      cancelButtonColor: "red",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            API_SERVER + "/api/account-statement-request-approval",
            {
              procedureType: "approve",
              db_account_v: allDetails?.account_number,
              statement_type_v: allDetails?.statement_type,
              state_type_v: allDetails?.state_type,
              doc_no_v: allDetails?.source_document,
              bra_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
              start_date: formatDate(allDetails?.start_date),
              // start_date: formatDate2(allDetails?.start_date),
              end_date: formatDate(allDetails?.end_date),
              // end_date: formatDate2(allDetails?.end_date),
              no_of_pages: allDetails?.no_of_pages,
              requested_by: JSON.parse(localStorage.getItem("userInfo"))?.id,
              posted_by: allDetails?.requested_by,
              terminal: localStorage.getItem("ipAddress"),
              req_no_v: allDetails?.requisition_no,
            },
            { headers }
          )
          .then((response) => {
            if (response.data?.length > 0) {
              if (response?.data?.msg_code === 1) {
                Swal.fire({
                  text: response?.data.msg_v,
                  icon: "error",
                });
              } else if (response?.data.msg_code === 0) {
                Swal.fire({
                  text: response?.data.msg_v,
                  icon: "success",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleClear();
                  }
                });
              } else {
                return;
              }
            } else {
              return;
            }
          })
          .catch((err) => console.error(`error here :${err}`));
      }
    });
  };

  // calculate number total charge
  useEffect(() => {
    setOverallCharge(
      parseInt(
        allDetails?.no_of_pages === ""
          ? "1"
          : allDetails?.no_of_pages === null
          ? "1"
          : allDetails?.no_of_pages
      ) * totalCharge?.totalCharges
    );
  }, [totalCharge]);

  return (
    <div className="px-5" style={{ zoom: 0.8 }}>
      {loading ? (
        <div className="flex justify-center pt-[50px]">
          <div>
            <ModalLoader />
          </div>
        </div>
      ) : (
        <div>
          {/* actions buttons  */}
          <div>
            <ActionButtons
              displayFetch={"none"}
              displayRefresh={"none"}
              displayCancel={"none"}
              displayDelete={"none"}
              displayHelp={"none"}
              displayView={"none"}
              displayNew={"none"}
              displayReject={"none"}
              displayOk={"none"}
              onAuthoriseClick={handleSubmit}
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
                value={allDetails ? allDetails?.requisition_no : ""}
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
              <div className=" border border-2 rounded p-3  space-y-4">
                {/* account and account name  */}
                <div className="flex space-x-1 justify-center">
                  <div className="w-[50%] capitalize">
                    <InputField
                      label={"Account No"}
                      labelWidth={"30%"}
                      inputWidth={"60%"}
                      name={"account_number"}
                      id={"account_number"}
                      disabled={true}
                      value={allDetails ? allDetails?.acct_link : ""}
                    />
                  </div>
                  <div className="w-[50%] capitalize">
                    <InputField
                      inputWidth={"93%"}
                      noMarginRight={true}
                      disabled={true}
                      value={allDetails ? allDetails?.account_desc : ""}
                      textAlign={"center"}
                    />
                  </div>
                </div>

                {/* product and date opened   */}
                <div className="flex space-x-2">
                  <div className="w-[50%] capitalize">
                    <InputField
                      label={"product"}
                      labelWidth={"30%"}
                      inputWidth={"60%"}
                      disabled={true}
                      value={
                        allDetails && allDetails?.prod_code && allDetails?.product_desc
                          ? `${allDetails?.prod_code} - ${allDetails?.product_desc}`
                          : ""
                      }
                    />
                  </div>
                  <div className="w-[50%] capitalize">
                    <InputField
                      label={"date opened"}
                      labelWidth={"30%"}
                      inputWidth={"59.5%"}
                      disabled={true}
                      value={allDetails ? formatDate(allDetails?.date_opened) : ""}
                      textAlign={"center"}
                    />
                  </div>
                </div>

                {/* currency and date of last activity   */}
                <div className="flex space-x-2">
                  <div className="w-[50%] capitalize">
                    <InputField
                      label={"currency"}
                      labelWidth={"30%"}
                      inputWidth={"60%"}
                      disabled={true}
                      value={
                        allDetails && allDetails.currency_desc && allDetails.currency_code
                          ? `${allDetails?.currency_code} - ${allDetails?.currency_desc}`
                          : ""
                      }
                    />
                  </div>
                  <div className="w-[50%] capitalize">
                    <InputField
                      label={"date of last activity"}
                      labelWidth={"30%"}
                      inputWidth={"59.5%"}
                      disabled={true}
                      value={allDetails ? formatDate(allDetails?.date_of_last_activity) : ""}
                      textAlign={"center"}
                    />
                  </div>
                </div>
              </div>

              <div className=" border border-2 rounded p-3  space-y-4 mt-4">
                {/* statement type and source document   */}
                <div className="flex space-x-2 items-center">
                  <div className="w-[50%] capitalize">
                    <InputField
                      label={"statement type"}
                      labelWidth={"30%"}
                      inputWidth={"60%"}
                      id={"statement_type"}
                      disabled={true}
                      value={
                        allDetails && allDetails.statement_type && allDetails.statement_type_desc
                          ? `${allDetails?.statement_type} - ${allDetails?.statement_type_desc}`
                          : ""
                      }
                    />
                  </div>
                  <div className="w-[50%] capitalize flex space-x-2 items-center">
                    <span className="w-[62.5%]">
                      <InputField
                        label={"source document"}
                        labelWidth={"35.8%"}
                        inputWidth={"57%"}
                        name={"source_document"}
                        disabled={true}
                        value={allDetails ? allDetails?.document_no : ""}
                      />
                    </span>
                    <span className="w-[37.5%]">
                      <ButtonComponent
                        label={"View Document"}
                        buttonHeight={"26px"}
                        buttonIcon={CustomButtons["viewDoc"]?.icon}
                        buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                        onClick={() => {
                          if (allDetails?.document_no === "" || allDetails?.document_no === null) {
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
                          <DocumentViewing documentID={allDetails ? allDetails?.document_no : ""} />
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
                      inputWidth={"35%"}
                      name={"start_date"}
                      id={"start_date"}
                      disabled={true}
                      value={allDetails ? formatDate(allDetails?.start_date) : ""}
                    />
                  </div>
                  <div className="w-[50%] capitalize flex space-x-2 items-center">
                    <span className="w-[62.5%]">
                      <InputField
                        label={"end date"}
                        labelWidth={"36%"}
                        inputWidth={"57%"}
                        name={"end_date"}
                        disabled={true}
                        id={"end_date"}
                        value={allDetails ? formatDate(allDetails?.end_date) : ""}
                      />
                    </span>
                    <span className="w-[37.5%] invisible">
                      <ButtonComponent
                        label={"Preview Statement"}
                        buttonHeight={"26px"}
                        buttonWidth={"146px"}
                        onClick={toggleModal}
                      />
                    </span>
                  </div>
                </div>

                {/* show preview modal  */}
                {showModal && (
                  <Report
                    accountNumber={allDetails?.acct_link}
                    accountName={allDetails?.account_desc}
                    currency={allDetails?.iso_code}
                    product={allDetails?.product_desc}
                    bookBalance={reportDetails?.post_av_bal}
                    unclearedBalance={reportDetails?.shadow_uncleared}
                    clearedBalance={reportDetails?.shadow_balance_today}
                    start_date={formatDate2(allDetails?.start_date)}
                    end_date={formatDate2(allDetails?.end_date)}
                    balance_brought_forward={reportDetails?.balance}
                    formatDate={formatDate}
                    formatDate2={formatDate2}
                    newTotal={handleTotalPages}
                    showModal={showModal}
                    handleClose={() => {
                      setShowModal(false);
                    }}
                  />
                )}

                {/* {showModal && ( */}
                {/* <PreviewStatementModal
              handleClose={handleClose}
              showModal={showModal}
              account_number={allDetails?.acct_link}
              start_date={formatDate2(allDetails?.start_date)}
              end_date={formatDate2(allDetails?.end_date)}
              user_name={JSON.parse(localStorage.getItem("userInfo"))?.id}
              setTotal={setTotalPages}
            /> */}
                {/* ) */}

                {/* no of pages date and invisible   */}
                <div className="flex space-x-2 items-center">
                  <div className="w-[50%] capitalize flex space-x-2 items-center">
                    <span className="w-[62%] bg-red- ">
                      <InputField
                        label={"no of pages"}
                        labelWidth={"49%"}
                        inputWidth={"44%"}
                        value={allDetails ? allDetails?.no_of_pages : ""}
                        disabled={true}
                        textAlign={"center"}
                      />
                    </span>
                    <span className="w-[30%]">
                      <ButtonComponent
                        label={"Preview Statement"}
                        buttonHeight={"26px"}
                        buttonWidth={"146px"}
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
                    labelWidth={"15%"}
                    inputWidth={"79.5%"}
                    disabled={true}
                    name={"requested_by"}
                    value={allDetails ? allDetails?.posted_by : ""}
                  />
                </div>

                {/* comments */}
                <div className="w-full capitalize">
                  <TextAreaField
                    label={"comments"}
                    labelWidth={"15%"}
                    inputWidth={"79.5%"}
                    disabled={true}
                    name={"comments"}
                    value={
                      allDetails ? (allDetails?.comments === null ? "" : allDetails?.comments) : ""
                    }
                  />
                </div>
              </div>
            </div>
            {/* right side  */}
            {/* account balances  */}
            <div className="w-[25%] border border-2 rounded">
              <div>
                <Header title={"account balances"} headerShade={true} />
              </div>
              <div className="p-12">
                <div className=" mt-[20px]">
                  <span className="capitalize text-blue-500 flex justify-center">
                    {" "}
                    account balance
                  </span>
                  <span className="capitalize flex justify-center mt-2">
                    <InputField
                      inputWidth={"100%"}
                      disabled={true}
                      noMarginRight={true}
                      value={allDetails ? allDetails?.av_bal : ""}
                      textAlign={"center"}
                    />
                  </span>
                </div>

                <div className=" mt-[30px]">
                  <span className="capitalize text-blue-500 flex justify-center"> charge</span>
                  <span className="capitalize flex justify-center mt-2">
                    <InputField
                      inputWidth={"100%"}
                      disabled={true}
                      noMarginRight={true}
                      value={totalCharge ? formatNumber(totalCharge?.totalCharges) : ""}
                      textAlign={"center"}
                    />
                  </span>
                </div>

                <div className=" mt-[30px]">
                  <span className="capitalize text-blue-500 flex justify-center">
                    {" "}
                    total charge
                  </span>
                  <span className="capitalize flex justify-center mt-2">
                    <InputField
                      inputWidth={"100%"}
                      disabled={true}
                      noMarginRight={true}
                      value={totalCharge ? formatNumber(overallCharge) : ""}
                      textAlign={"center"}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountRequestApproval;
