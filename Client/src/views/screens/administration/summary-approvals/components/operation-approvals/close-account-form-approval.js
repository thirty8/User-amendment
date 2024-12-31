import React, { useState, useEffect } from "react";
// import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import AccountSummary from "../../../../../../components/others/AccountSummary";
import InputField from "../../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import { API_SERVER } from "../../../../../../config/constant";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import Swal from "sweetalert2";
import axios from "axios";
import DocumentViewing from "../../../../../../components/DocumentViewing";
// import DocumentViewing from "../../../../../../components/others/DocumentViewing";
import { Modal } from "react-bootstrap";
import CustomButtons from "../../../../../../components/others/CustomButtons";
import ModalLoader from "../../../../../../components/others/ModalLoader";
// import ErrorModal from "./components/error-modal";

function CloseAccountApproval({ accountNumber }) {
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [accountnumber, setAccountNumber] = useState("");
  const [accountnumberEnter, setAccountNumberEnter] = useState("");
  const [accountname, setAccountName] = useState("");
  const [accountName2, setAccountName2] = useState("");
  const [accountnumber2, setAccountNumber2] = useState("");
  const [getToken, setToken] = useState("");
  const [closureReason, setClosureReason] = useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [reason, setReason] = useState([]);
  const [sreason, setSreason] = useState("");
  const [sreason2, setSreason2] = useState("");
  const [reasonDesc, setReasonDesc] = useState("");
  const [clsType, setclsType] = useState("");
  const [uniqueRef, setUniqueRef] = useState("");
  const [disableTransferAcc, setDisableTransferAcc] = useState(false);
  const [showInputField, setShowInputField] = useState(false);
  const [referenceNum, setReferenceNum] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [myObj, setMyObj] = useState({});
  const [accountDetails, setAccountDetails] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      await axios
        .post(
          API_SERVER + "/api/close-account-approval",
          {
            fetch: "true",
            // acct_link: "004001210060678158",
            acct_link: accountNumber,
          },
          {
            headers,
          }
        )
        .then((response) => {
          if (response?.data.length > 0) {
            setLoading(false);
            setMyObj(response?.data[0]);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("error in lov:" + err);
        });
    }

    fetchData();
  }, []);

  // document ref
  function DocumentViewModal() {
    if (getToken === "") {
      axios
        .post(API_SERVER + "/api/get-error-message", { code: "01346" }, { headers })
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

  // submit
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

  return (
    <div>
      {loading ? (
        <div className="flex justify-center w-full pt-[100px] pb-[100px]">
          <ModalLoader />
        </div>
      ) : (
        <div className="mx-2">
          <div className="pb-2">
            <ActionButtons
              displayFetch={"none"}
              displayDelete={"none"}
              displayNew={"none"}
              displayView={"none"}
              displayCancel={"none"}
              displayOk={"none"}
              displayHelp={"none"}
              displayRefresh={"none"}
              onAuthoriseClick={handleSubmit}
              onRejectClick={handleReject}
            />
          </div>

          <hr className="mt-3 mb-2 border-1"></hr>

          <div className="flex space-x-5  mt-5">
            {/* left side  */}
            <div className="space-y-5 w-[65%] border rounded px-3 ">
              <div className="flex pt-5">
                <div className="w-[54%]">
                  <InputField
                    label={"Account Number"}
                    id={"accountNumber"}
                    type={"number"}
                    labelWidth={"42%"}
                    inputWidth={"50%"}
                    disabled={true}
                    value={myObj ? myObj?.account_number : ""}
                  />
                </div>
                <div className="w-[43%]">
                  <InputField
                    noMarginRight={true}
                    inputWidth={"100%"}
                    required={false}
                    disabled={true}
                    value={myObj ? myObj?.account_desc : ""}
                  />
                </div>
              </div>

              <div className="flex pb-3">
                <div className="w-[54%]">
                  <InputField
                    label={"Transfer Type"}
                    labelWidth={"42%"}
                    inputWidth={"50%"}
                    id={"transferType"}
                    disabled={true}
                    value={
                      Object.keys(myObj)?.length > 0 && myObj?.cls_type === "C"
                        ? "C - Cash"
                        : Object.keys(myObj)?.length > 0 && myObj?.cls_type === "A"
                        ? "A - Account"
                        : ""
                    }
                  />
                </div>

                {/* {showInputField && ( */}
                <div className="w-[43%] invisible">
                  <InputField
                    label={"Reference Number"}
                    labelWidth={"40%"}
                    inputWidth={"60%"}
                    disabled={true}
                    value={referenceNum}
                  />
                </div>
                {/* )} */}
              </div>

              <hr className="mt-3 mb-2 border-1 ml-3 mr-3"></hr>

              {/* last div   */}
              <div className="space-y-3 pt-2">
                <div className="flex">
                  <div className="w-[54%]">
                    <InputField
                      id={"TransferAcct"}
                      label={"Transfer Account Number"}
                      labelWidth={"42%"}
                      inputWidth={"50%"}
                      disabled={true}
                      value={myObj ? myObj?.balance_contra : ""}
                    />
                  </div>
                  <div className="w-[43%]">
                    <InputField
                      noMarginRight={true}
                      inputWidth={"100%"}
                      disabled={true}
                      value={myObj ? myObj?.balance_contra_desc : ""}
                    />
                  </div>
                </div>

                {/* <div className="pt-2">
              <InputField
                id={"reason"}
                label={"Reason"}
                labelWidth={"22.7%"}
                inputWidth={"71.3%"}
                disabled={true}
      
              />
            </div> */}

                <div className="pt-2">
                  <TextAreaField
                    id={"Creason"}
                    label={"Closure Reason"}
                    labelWidth={"22.7%"}
                    inputWidth={"71.5%"}
                    rows={2}
                    disabled={true}
                    value={myObj ? myObj?.reason_desc : ""}
                  />
                </div>
              </div>

              <div className="flex items-center pb-5">
                <div className="w-[54%]">
                  <InputField
                    id={"sourceDoc"}
                    label={"Source Document"}
                    labelWidth={"42%"}
                    inputWidth={"50%"}
                    disabled={true}
                    value={myObj ? myObj?.document_no : ""}
                  />
                </div>
                <div className="w-[43%]">
                  <ButtonComponent
                    onClick={DocumentViewModal}
                    label={"View Doc"}
                    buttonIcon={CustomButtons["viewDoc"]?.icon}
                    buttonBackgroundColor={CustomButtons["viewDoc"]?.bgColor}
                    inputWidth={"30px"}
                    buttonHeight={"26px"}
                  />
                  {sweetAlertConfirmed && (
                    <Modal
                      show={sweetAlertConfirmed}
                      size="lg"
                      centered
                      style={{ height: "100%" }}
                      className="shadow-md shadow-black"
                    >
                      <div className="flex items-center justify-between mx-2 p-2">
                        <div className="font-extrabold text-black">View Document</div>
                        <div
                          className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                          onClick={() => setSweetAlertConfirmed(false)}
                        >
                          x
                        </div>
                      </div>
                      <Modal.Body>
                        {/* <ImageVerification accountNumber={imageAccount} /> */}
                        <DocumentViewing documentID={myObj ? myObj?.document_no : ""} />
                      </Modal.Body>
                      {/* <Modal.Footer>
            <Button onClick={() => setSweetAlertConfirmed(false)}>Close</Button>
          </Modal.Footer> */}
                    </Modal>
                  )}
                </div>
              </div>
            </div>

            {/* right side account summary   */}
            <div className="w-[35%] scale-[0.98]">
              <div className="border rounded">
                <AccountSummary
                  accountNumber={Object.keys(myObj)?.length > 0 ? myObj?.account_number : ""}
                  setAccountDetails={setAccountDetails}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CloseAccountApproval;
