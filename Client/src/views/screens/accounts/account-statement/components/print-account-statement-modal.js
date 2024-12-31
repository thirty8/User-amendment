import React, { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../../config/constant";
import Header from "../../../../../components/others/Header/Header";
import CustomButtons from "../../../../../components/others/CustomButtons";
import DocumentViewing from "../../../../../components/DocumentViewing";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import axios from "axios";
import Swal from "sweetalert2";
import Report from "./report";
import ModalLoader from "../../../../../components/others/ModalLoader";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function PrintStatementModal({
  open,
  handleClose,
  batchNumber,
  accountNumber,
}) {
  const [showViewDoc, setShowViewDoc] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportDetails, setReportDetails] = useState({});
  const [allDetails, setAllDetails] = useState({
    document_no: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      async function fetchDataForReport() {
        return await axios.post(
          API_SERVER + "/api/print-account-statement",
          { details: "true", account_number: accountNumber },
          { headers }
        );
      }
      async function fetchAllDetails() {
        return await axios.post(
          API_SERVER + "/api/print-account-statement",
          { openModal: "true", batch_number: batchNumber },
          { headers }
        );
      }
      // 104683

      Promise.all([fetchDataForReport(), fetchAllDetails()]).then(
        (response) => {
          console.log(response, "josh");
          setReportDetails(response[0]?.data[0]);
          setAllDetails(response[1]?.data[0]);
          setLoading(false);
        }
      );
    } catch (err) {
      setLoading(false);

      console.error(`error here : ${err}`);
    }
  }, []);

  console.log(reportDetails, "report");

  const handleTotalPages = (value) => {
    console.log(value);
  };

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
    return formattedDate.toUpperCase();
  }

  return (
    <div>
      <Modal
        opened={open}
        onClose={handleClose}
        trapFocus={false}
        padding={0}
        size={"80%"}
        withCloseButton={false}
      >
        {/* border  */}
        <div>
          <Header
            title={"Print Account Statement"}
            headerShade={true}
            closeIcon={true}
            handleClose={handleClose}
          />
        </div>

        {loading ? (
          <div className=" flex justify-center pt-[50px] pb-[50px]">
            <ModalLoader />
          </div>
        ) : (
          <div>
            <div className="px-5 mb-10">
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

              <div className="flex justify-center" style={{ zoom: 0.9 }}>
                {/* left div  */}
                <div className="w-[98%]">
                  {/* first container   */}
                  <div className=" border border-2 rounded p-3  space-y-4">
                    {/* account and account name  */}
                    <div className="flex space-x-1 justify-center mt-2">
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

                    {/*  statement type  and source doc */}
                    <div className="flex space-x-2">
                      <div className="w-[50%] capitalize">
                        <InputField
                          label={"statement type"}
                          labelWidth={"30%"}
                          inputWidth={"60%"}
                          disabled={true}
                          value={
                            allDetails && allDetails.statement_type
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
                            value={
                              allDetails
                                ? allDetails?.document_no === null
                                  ? ""
                                  : allDetails?.document_no
                                : ""
                            }
                          />
                        </span>
                        <span className="w-[37.5%] ">
                          <ButtonComponent
                            label={"View Document"}
                            buttonHeight={"26px"}
                            buttonIcon={CustomButtons["viewDoc"]?.icon}
                            buttonBackgroundColor={
                              CustomButtons["viewDoc"]?.bgColor
                            }
                            buttonWidth={"170px"}
                            onClick={() => {
                              if (
                                allDetails?.document_no === "" ||
                                allDetails?.document_no === null
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
                                  .catch((err) =>
                                    console.log(`error is :${err}`)
                                  );
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
                              withCloseButton={false}
                            >
                              <DocumentViewing
                                documentID={
                                  allDetails ? allDetails?.document_no : ""
                                }
                              />
                            </Modal>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* no of pages    */}
                    <div className="flex space-x-2">
                      <div className="w-[50%] capitalize">
                        <InputField
                          label={"no of pages"}
                          labelWidth={"30%"}
                          inputWidth={"25%"}
                          disabled={true}
                          textAlign={"center"}
                          value={
                            allDetails
                              ? allDetails?.no_of_pages === null
                                ? ""
                                : allDetails?.no_of_pages
                              : ""
                          }
                        />
                      </div>
                      <div className="w-[50%] invisible">
                        <InputField
                          label={"date of last activity"}
                          labelWidth={"30%"}
                          inputWidth={"59.5%"}
                          disabled={true}
                          textAlign={"center"}
                        />
                      </div>
                    </div>

                    {/* requested by  */}
                    <div className="w-full capitalize">
                      <InputField
                        label={"requested by"}
                        labelWidth={"15%"}
                        inputWidth={"80%"}
                        disabled={true}
                        name={"requested_by"}
                        value={allDetails ? allDetails?.requested_by : ""}
                      />
                    </div>

                    {/* comments  */}
                    <div className="w-full capitalize">
                      <TextAreaField
                        label={"comments"}
                        labelWidth={"15%"}
                        inputWidth={"80%"}
                        disabled={true}
                        name={"requested_by"}
                        value={
                          allDetails
                            ? allDetails?.comments === null
                              ? ""
                              : allDetails?.comments
                            : ""
                        }
                      />
                    </div>

                    {/* approved by and approved date */}
                    <div className="flex space-x-1 justify-center">
                      <div className="w-[50%] capitalize">
                        <InputField
                          label={"approved by"}
                          labelWidth={"30%"}
                          inputWidth={"60%"}
                          disabled={true}
                          value={allDetails ? allDetails?.approved_by : ""}
                        />
                      </div>
                      <div className="w-[50%] capitalize">
                        <InputField
                          label={"approved date"}
                          labelWidth={"22.3%"}
                          inputWidth={"67.5%"}
                          disabled={true}
                          value={
                            allDetails
                              ? formatDate(allDetails?.approval_date)
                              : ""
                          }
                          textAlign={"center"}
                        />
                      </div>
                    </div>

                    <hr />

                    {/* date from and to  */}
                    <div className="flex space-x-2 mb-2">
                      <div className="w-[50%] capitalize">
                        <InputField
                          label={"date from"}
                          labelWidth={"30%"}
                          inputWidth={"40%"}
                          disabled={true}
                          textAlign={"center"}
                          value={
                            allDetails ? formatDate(allDetails?.start_date) : ""
                          }
                        />
                      </div>

                      <div className="w-[50%] capitalize flex space-x-2 items-center ">
                        <span className="w-[62.5%]">
                          <InputField
                            label={"to"}
                            labelWidth={"35.8%"}
                            inputWidth={"57%"}
                            disabled={true}
                            textAlign={"center"}
                            value={
                              allDetails ? formatDate(allDetails?.end_date) : ""
                            }
                          />
                        </span>
                        <span className="w-[37.5%] ">
                          <ButtonComponent
                            label={"Print"}
                            buttonHeight={"26px"}
                            buttonIcon={CustomButtons["print"]?.icon}
                            buttonBackgroundColor={
                              CustomButtons["print"]?.bgColor
                            }
                            buttonWidth={"170px"}
                            onClick={() => {
                              if (
                                allDetails?.acct_link === "" ||
                                allDetails?.acct_link === null
                              ) {
                                axios
                                  .post(
                                    API_SERVER + "/api/get-error-message",
                                    { code: "06017" },
                                    { headers }
                                  )
                                  .then((response) => {
                                    if (response) {
                                      Swal.fire({
                                        text: response?.data,
                                        icon: "error",
                                      });
                                    }
                                  });
                              } else if (
                                allDetails?.start_date === "" ||
                                allDetails?.start_date === null
                              ) {
                                axios
                                  .post(
                                    API_SERVER + "/api/get-error-message",
                                    { code: "05883" },
                                    { headers }
                                  )
                                  .then((response) => {
                                    if (response) {
                                      Swal.fire({
                                        text: response?.data,
                                        icon: "error",
                                      });
                                    }
                                  });
                              } else if (
                                allDetails?.end_date === "" ||
                                allDetails?.end_date === null
                              ) {
                                axios
                                  .post(
                                    API_SERVER + "/api/get-error-message",
                                    { code: "06014" },
                                    { headers }
                                  )
                                  .then((response) => {
                                    if (response) {
                                      Swal.fire({
                                        text: response?.data,
                                        icon: "error",
                                      });
                                    }
                                  });
                              } else {
                                setShowReport(!showReport);
                              }
                            }}
                          />
                        </span>

                        {/* show view doc modal   */}
                        {showReport && (
                          <Report
                            accountNumber={accountNumber}
                            accountName={reportDetails?.account_descrp}
                            currency={reportDetails?.iso_code}
                            product={reportDetails?.product_desc}
                            bookBalance={reportDetails?.post_av_bal}
                            unclearedBalance={reportDetails?.shadow_uncleared}
                            clearedBalance={reportDetails?.shadow_balance_today}
                            start_date={formatDate2(allDetails?.start_date)}
                            end_date={formatDate2(allDetails?.end_date)}
                            balance_brought_forward={reportDetails?.balance}
                            formatDate={formatDate}
                            formatDate2={formatDate2}
                            newTotal={handleTotalPages}
                            showModal={showReport}
                            handleClose={() => setShowReport(false)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* end   */}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default PrintStatementModal;
