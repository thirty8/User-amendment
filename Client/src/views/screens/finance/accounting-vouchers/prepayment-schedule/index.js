import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import CustomTable from "../../../teller-ops/components/CustomTable";
import SelectField from "../../../../../components/others/Fields/SelectField";
import Header from "../../../../../components/others/Header/Header";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import CustomButtons from "../../../../../components/others/CustomButtons";
import { Modal } from "@mantine/core";
import PrepaymentScheduleManual from "./components/prepaymentScheduleManual";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import swal from "sweetalert";
import OverlayLoader from "../../../../../components/others/OverlayLoader";

function PrepaymentSchedule() {
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [frequencyLov, setFrequencyLov] = useState([]);
  const [FREQUENCY, setFREQUENCY] = useState("");
  const [PREPAYMENT_ACCT, setPREPAYMENT_ACCT] = useState("");
  const [EXPENSE_ACCOUNT, setEXPENSE_ACCOUNT] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [batchNum, setBatchNum] = useState(false);
  const [prepaymentData, setPrepaymentData] = useState([]);
  const [prepaymentAccountDetails, setPrepaymentAccountDetails] = useState([]);
  const [expenseAccountDetails, setExpenseAccountDetails] = useState([]);
  const [prepaymentDataSchedule, setPrepaymentDataSchedule] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [tickCheckbox, setTickCheckbox] = useState(false);
  const [loading, setloading] = useState(false);
  const [fetchData1, setFetchData1] = useState(false);
  const [postLoader, setpostLoader] = useState(false);

  function formatNumber(num) {
    const number = parseFloat(num);

    if (isNaN(number)) {
      return ""; // Return an empty string for invalid input
    }

    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
  };

  useEffect(() => {
    async function getFrequency() {
      try {
        let response = await axios.get(API_SERVER + "/api/get-frequency", {
          headers,
        });
        setFrequencyLov(response.data);
      } catch (error) {
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }

    async function getCreditAccounts() {
      try {
        axios
          .post(
            API_SERVER + "/api/get-prepayment-credit-account",
            {},
            {
              headers,
            }
          )
          .then((response) => {
            setPrepaymentAccountDetails(response.data);
          });
      } catch (error) {
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }

    getFrequency();
    getCreditAccounts();
    getDebitAccounts("010");
  }, []);

  async function getDebitAccounts(cur) {
    try {
      axios
        .post(
          API_SERVER + "/api/get-prepayment-debit-account",
          { currency: cur },
          { headers }
        )
        .then((response) => {
          setExpenseAccountDetails(response.data);
        });
    } catch (error) {
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  async function getPrepaymentSchedule() {
    try {
      setloading(true);
      let arr = [];
      await axios
        .post(
          API_SERVER + "/api/get-prepayment-schedule",
          {
            PREPAYMENT_ACCT: PREPAYMENT_ACCT,
            EXPENSE_ACCOUNT: EXPENSE_ACCOUNT,
            FREQUENCY: FREQUENCY,
            paymentID: paymentID,
          },
          { headers }
        )
        .then((response) => {
          // console.log(response.data);
          response.data?.map((i) => {
            arr.push([
              i.pre_seq,
              i.prepayment_account,
              i.expense_account,
              i.frequency,
              i.start_date,
              formatNumber(i.doc_amt),
              i.branch_code,
              i.doc_descrp,
              i.posted_by,
              i.flag_message,
              <div className="flex justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["next"].icon}
                  onClick={() => {
                    if (i.flag_message === "NEW") {
                      swal(
                        "ERR-07083",
                        "Cannot perform this action.Changes are pending.Contact your supervisor for action.",
                        "error"
                      );
                    } else {
                      setFetchData1(true);
                      fetchPrepaymentSchedule(i.pre_seq, "", "");
                    }
                  }}
                />
              </div>,
            ]);
          });
          setloading(false);
          setPrepaymentData(arr);
        });
    } catch (error) {
      setloading(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  async function getPrepaymentScheduleRefresh() {
    try {
      let arr = [];
      setEXPENSE_ACCOUNT("");
      setFREQUENCY("");
      setPREPAYMENT_ACCT("");
      setPaymentID("");
      setloading(true);
      await axios
        .post(
          API_SERVER + "/api/get-prepayment-schedule",
          {
            PREPAYMENT_ACCT: "",
            EXPENSE_ACCOUNT: "",
            FREQUENCY: "",
            paymentID: "",
          },
          { headers }
        )
        .then((response) => {
          // console.log(response.data);
          response.data?.map((i) => {
            arr.push([
              i.pre_seq,
              i.prepayment_account,
              i.expense_account,
              i.frequency,
              i.start_date,
              formatNumber(i.doc_amt),
              i.branch_code,
              i.doc_descrp,
              i.posted_by,
              i.flag_message,
              <div className="flex justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["next"].icon}
                  onClick={() => {
                    if (i.flag_message === "NEW") {
                      swal(
                        "ERR-07083",
                        "Cannot perform this action.Changes are pending.Contact your supervisor for action.",
                        "error"
                      );
                    } else {
                      setFetchData1(true);
                      fetchPrepaymentSchedule(i.pre_seq, "", "");
                    }
                  }}
                />
              </div>,
            ]);
          });
          setPrepaymentData(arr);
          setloading(false);
        });
    } catch (error) {
      setloading(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  useEffect(() => {
    getPrepaymentSchedule();
  }, []);

  function fetchPrepaymentSchedule(batchNumber, due, status) {
    try {
      // alert(batchNumber);
      let arr = [];
      axios
        .post(
          API_SERVER + "/api/get-prepayment-schedule-details-manual",
          { batch_no: batchNumber, due: due, statusFlag: status },
          { headers }
        )
        .then((response) => {
          if (response.data.length > 0) {
            setBatchNum(batchNumber);
            response.data?.map((i, index) => {
              arr.push([
                i.schedule_id,
                i.acct_link1,
                i.acct_link2,
                formatNumber(i.due_amount),
                i.due_date,
                i.payment_id,
                i.frequency,
                i.doc_descrp,
                i.payment_flag,
                <div className="flex justify-center">
                  <ButtonType
                    type={"checkbox"}
                    id={"checkbox" + index}
                    name={"checkboxx"}
                    checked={tickCheckbox[`${index}`]}
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        setTickCheckbox((prev) => ({ ...prev, [index]: true }));
                      } else {
                        setTickCheckbox((prev) => ({
                          ...prev,
                          [index]: false,
                        }));
                      }
                    }}
                  />
                </div>,
              ]);
            });
            setPrepaymentDataSchedule(arr);
            setFetchData1(false);
            setshowModal(true);
          } else {
            setFetchData1(false);
            swal({
              title: "ERR - 06077",
              icon: "error",
              text: "No data found",
            });
          }
          // }
        });
    } catch (error) {
      setFetchData1(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

  const today = new Date();
  const day = today.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    today
  );
  const year = today.getFullYear();
  const todayDate = `${day}-${month}-${year}`;

  function clearCheckboxes() {
    const arr = { ...tickCheckbox };
    Object.keys(arr).forEach((i) => {
      arr[`${i}`] = false;
    });
    setTickCheckbox(arr);
    // setshowModal(false);
  }

  return (
    <div>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="w-full" style={{ padding: "10px" }}>
          <div
            className="pt-3"
            style={{ display: "flex", flex: 1, marginBottom: "15px" }}
          >
            <div style={{ flex: 0.5 }}>
              <ListOfValue
                label={"Prepayment Account"}
                labelWidth={"25%"}
                inputWidth={"65%"}
                onChange={(value) => {
                  setPREPAYMENT_ACCT(value);
                  const curr_act = prepaymentAccountDetails.find(
                    (i) => i["value"] === value
                  );
                  getDebitAccounts(curr_act?.currency);
                }}
                data={prepaymentAccountDetails}
                value={PREPAYMENT_ACCT}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <ListOfValue
                label={"Expense Account"}
                labelWidth={"25%"}
                inputWidth={"65%"}
                onChange={(value) => {
                  setEXPENSE_ACCOUNT(value);
                }}
                data={expenseAccountDetails}
                value={EXPENSE_ACCOUNT}
              />
            </div>
          </div>
          <div style={{ display: "flex", flex: 1, marginBottom: "15px" }}>
            <div style={{ flex: 0.5 }}>
              <ListOfValue
                label={"Frequency"}
                labelWidth={"25%"}
                inputWidth={"65%"}
                data={frequencyLov}
                onChange={(value) => {
                  setFREQUENCY(value);
                }}
                value={FREQUENCY}
              />
            </div>
            <div style={{ flex: 0.5 }}>
              <InputField
                label={"Payment ID"}
                labelWidth={"25%"}
                inputWidth={"65%"}
                onChange={(e) => {
                  setPaymentID(e.target.value);
                }}
                value={paymentID}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getPrepaymentSchedule();
                    // alert(paymentID);
                  }
                }}
              />
            </div>
          </div>
          <hr style={{ marginBottom: "15px" }} />
          <OverlayLoader
            postLoader={fetchData1 || postLoader}
            // color={"#0580c0"}
            textColor={true}
            displayText={fetchData1 ? "Fetching data..." : "Loading..."}
          />
          <div className="flex justify-end gap-2 mb-3">
            <ButtonComponent
              label={"Fetch"}
              buttonHeight={"30px"}
              buttonWidth={"55px"}
              onClick={() => getPrepaymentSchedule()}
            />
            <ButtonComponent
              label={"Refresh"}
              buttonHeight={"30px"}
              buttonWidth={"65px"}
              onClick={getPrepaymentScheduleRefresh}
            />
            <ButtonComponent
              label={"Exit"}
              buttonHeight={"30px"}
              buttonWidth={"45px"}
              onClick={handleExitClick}
            />
          </div>
          {showModal && (
            <Modal
              className="p-0 m-0"
              opened={showModal}
              size="95%"
              padding={0}
              withCloseButton={false}
              transitionProps={"mounted"}
              closeOnClickOutside={false}
              onClose={() => setshowModal(false)}
              trapFocus={false}
            >
              <PrepaymentScheduleManual
                setshowModal={setshowModal}
                prepaymentDataSchedule={prepaymentDataSchedule}
                setPrepaymentDataSchedule={setPrepaymentDataSchedule}
                tickCheckbox={tickCheckbox}
                clearCheckboxes={clearCheckboxes}
                batchNum={batchNum}
                setTickCheckbox={setTickCheckbox}
              />
            </Modal>
          )}
          <div
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: "3px",
              backgroundColor: "#ffffff",
              zoom: 0.95,
            }}
          >
            <div>
              <Header
                title={"Prepayment Summary Transaction"}
                headerShade={true}
                fontWeight={"500"}
              />
            </div>
            <div style={{ zoom: 0.9 }}>
              <CustomTable
                headers={[
                  "Payment ID",
                  "Prepayment Account",
                  "Expense Account",
                  "Frequency",
                  "Start Date",
                  "Amount",
                  "Branch Code",
                  "Narration",
                  "Posted By",
                  "Flag Message",
                  "Action",
                ]}
                loading={{ status: loading, message: "Processing Data..." }}
                data={prepaymentData}
                rowsPerPage={10}
                style={{ columnAlignRight: [6] }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrepaymentSchedule;
