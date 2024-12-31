import React, { useState, useEffect } from "react";
import DocumentViewing from "../../../../../components/others/DocumentViewing";
import CustomTable from "../../../../../components/others/customtable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import Swal from "sweetalert2";
import { Modal } from "@mantine/core";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../components/others/CustomButtons";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ModalLoader from "../../../../../components/others/ModalLoader";
import Header from "../../../../../components/others/Header/Header";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import AccountSummary from "../../../../../components/others/AccountSummary";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function SafeCustodyLiquidation2({ opened, handleClose, rowData }) {
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [myObj, setMyObj] = useState({});
  const [accountDetails, setAccountDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(rowData, "brooooo");

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
      setLoading(true);
      await axios
        .post(
          API_SERVER + "/api/safe-custody-liquidation",
          {
            fetch_data2: "true",
            requisition_no: rowData?.requisition_no,
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
        .catch((err) => console.log(`error here : ${err}`));
    }

    // }
    fetchData();
  }, []);

  const handleSubmit = () => {
    Swal.fire({
      text: "Are you sure you want to approve this transaction?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        alert("hello");
      }
    });
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
      myObj?.document_no === "" ||
      myObj?.document_no === null ||
      myObj?.document_no === undefined
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
              title={"safe custody liquidation"}
              closeIcon={true}
              handleClose={handleClose}
              headerShade={true}
            />
            {loading ? (
              <div className="flex justify-center pt-[100px] pb-[100px]">
                <ModalLoader />
              </div>
            ) : (
              <div>
                {sweetAlertConfirmed && (
                  <Modal
                    show={sweetAlertConfirmed}
                    size="lg"
                    centered
                    style={{ height: "100%" }}
                    className="shadow-md shadow-black"
                  >
                    <div className="flex items-center justify-between mx-2 p-2">
                      <div className="font-extrabold text-black">
                        View Document
                      </div>
                      <div
                        className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                        onClick={() => setSweetAlertConfirmed(false)}
                      >
                        x
                      </div>
                    </div>
                    <Modal.Body>
                      <DocumentViewing
                        documentID={myObj ? myObj?.document_no : ""}
                      />
                    </Modal.Body>
                  </Modal>
                )}
                <div className="mx-2">
                  {/* buttons  */}
                  <div className="mt-2">
                    <ActionButtons
                      displayCancel={"none"}
                      displayAuthorise={"none"}
                      displayDelete={"none"}
                      displayHelp={"none"}
                      displayView={"none"}
                      displayNew={"none"}
                      displayRefresh={"none"}
                      displayFetch={"none"}
                      onRejectClick={handleReject}
                      onOkClick={handleSubmit}
                      //   onRefreshClick={refreshFunc}
                      //   onFetchClick={fetchData}
                    />
                  </div>

                  {/* hr  */}
                  <hr className="mt-3" />

                  {/* overflow here  */}
                  <div className="pb-[40px]">
                    <div className="flex justify-end pt-3 px-4 mb-2">
                      <div>
                        <InputField
                          label={"Request ID"}
                          labelWidth={"25%"}
                          inputWidth={"70%"}
                          disabled={true}
                          textAlign={"center"}
                          value={myObj ? myObj?.requisition_no : ""}
                        />
                      </div>
                    </div>
                    <hr className="mt-3" />
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
                              value={myObj ? myObj?.acct_link : ""}
                              disabled={true}
                            />
                          </div>

                          <div className="w-[45%] flex space-x-4">
                            <p className="w-full">
                              <InputField
                                noMarginRight={true}
                                inputWidth={"100%"}
                                disabled={true}
                                value={myObj ? myObj?.account_descrp : ""}
                              />
                            </p>
                          </div>
                        </div>

                        {/* type of box and end date*/}
                        <div className="flex items-center space-x-4">
                          <div className="w-[45%] ">
                            <InputField
                              label={"Type Of Box"}
                              labelWidth={"40%"}
                              inputWidth={"60%"}
                              id={"type_of_box"}
                              disabled={true}
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
                            />
                          </div>
                        </div>

                        {/* custody description*/}
                        <div className="flex items-center space-x-4">
                          <div className="w-full ">
                            <TextAreaField
                              label={"Custody Description"}
                              labelWidth={"17%"}
                              inputWidth={"72.5%"}
                              disabled={true}
                              name={"custody_description"}
                              value={myObj ? myObj?.custody_descrp : ""}
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
                              value={myObj ? myObj?.document_no : ""}
                              name={"document_ref"}
                              disabled={true}
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
                                    documentID={myObj ? myObj?.document_no : ""}
                                  />
                                </Modal>
                              </div>
                            )}
                          </div>

                          <div className="w-[45%] flex space-x-4">
                            <p className="w-[30%]">
                              <ButtonComponent
                                onClick={handleDocumentNo}
                                label={"View Doc"}
                                buttonBackgroundColor={
                                  CustomButtons["viewDoc"]?.bgColor
                                }
                                buttonIcon={CustomButtons["viewDoc"]?.icon}
                                buttonWidth={"100px"}
                                buttonHeight={"27px"}
                                buttonColor={"white"}
                              />
                            </p>

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
                              labelWidth={"17%"}
                              inputWidth={"72.5%"}
                              name={"comments"}
                              disabled={true}
                              value={myObj ? myObj?.comments : ""}
                            />
                          </div>
                        </div>
                      </div>
                      {/* right side  */}
                      <div className="w-[30%]">
                        <div className="border rounded">
                          <AccountSummary
                            accountNumber={myObj ? myObj?.acct_link : ""}
                            setAccountDetails={setAccountDetails}
                          />
                        </div>
                      </div>
                    </div>

                    {/* data table 
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
        </div> */}
                  </div>
                </div>{" "}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SafeCustodyLiquidation2;
