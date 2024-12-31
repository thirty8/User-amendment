import React, { useEffect, useState } from "react";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../components/others/CustomButtons";
import CustomTable from "../../../teller-ops/components/CustomTable";
import Header from "../../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import PayableScheduleModal from "./components/payable-schedule-modal";
import { Modal } from "@mantine/core";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import { message } from "antd";
import swal from "sweetalert";
import OverlayLoader from "../../../../../components/others/OverlayLoader";

function PayableSchedule() {
  const [payableScheduleData, setPayableScheduleData] = useState([]);
  const [frequencyLov, setFrequencyLov] = useState([]);
  const [payableData, setPayableData] = useState([]);
  const [APaccount, setAPaccount] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [beneficiaryAcct, setBeneficiaryAcct] = useState("");
  const [frequency, setFrequency] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [narration, setNarration] = useState("");
  const [payableID, setPayableID] = useState("");
  const [tickCheckbox, setTickCheckbox] = useState(false);
  const [loading, setloading] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [fetchData, setFetchData] = useState(false);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

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

  function clearCheckboxes() {
    const arr = { ...tickCheckbox };
    Object.keys(arr).forEach((i) => {
      arr[`${i}`] = false;
    });
    setTickCheckbox(arr);
    // setshowModal(false);
  }

  const fetchPayableSchedule = (payable_id) => {
    try {
      setFetchData(true);
      let arr = [];
      axios
        .post(
          API_SERVER + "/api/get-payable-schedule-details-manual",
          { payableID: payable_id, due: "", status: "" },
          { headers }
        )
        .then((response) => {
          if (response.data.length > 0) {
            response.data?.map((i, index) => {
              setPayableID(i.payble_id);
              arr.push([
                i.payment_id,
                i.ap_accct,
                i.expense_acct,
                formatNumber(i.due_amount),
                i.frequency,
                i.due_date,
                i.doc_descrp,
                i.status,
                <div className="flex justify-center items-center">
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
            setPayableData(arr);
            setFetchData(false);
            setshowModal(true);
          } else {
            setFetchData(false);
            swal({
              title: "ERR - 06077",
              icon: "error",
              text: "No data found",
            });
          }
          // }
        });
    } catch (error) {
      setFetchData(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  };

  async function getPayableScheduleDetailsManual(refresh) {
    try {
      setloading(true);
      let arr = [];
      await axios
        .post(
          API_SERVER + "/api/get-payable-details-manual",
          {
            beneficiaryAcct: beneficiaryAcct,
            frequency: frequency,
            invoiceNumber: invoiceNumber,
            narration: narration,
          },
          {
            headers,
          }
        )
        .then((response) => {
          response.data?.map((i) => {
            arr.push([
              i.beneficiary_acct,
              i.posting_date,
              i.invoice_number,
              i.expense_reference,
              formatNumber(i.taxable_amount),
              i.frequency,
              i.narration,
              <div className="flex justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["next"].icon}
                  onClick={() => fetchPayableSchedule(i.expense_reference)}
                />
              </div>,
            ]);
          });
          setloading(false);
          setPayableScheduleData(arr);
        });
    } catch (error) {
      setloading(false);
      setPostLoader(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
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

  async function Refresh() {
    try {
      setBeneficiaryAcct("");
      setFrequency("");
      setInvoiceNumber("");
      setNarration("");
      setloading(true);
      // setPostLoader(true);

      let arr = [];
      await axios
        .post(
          API_SERVER + "/api/get-payable-details-manual",
          {
            beneficiaryAcct: "",
            frequency: "",
            invoiceNumber: "",
            narration: "",
          },
          {
            headers,
          }
        )
        .then((response) => {
          response.data?.map((i) => {
            arr.push([
              i.beneficiary_acct,
              i.posting_date,
              i.invoice_number,
              i.expense_reference,
              formatNumber(i.taxable_amount),
              i.frequency,
              i.narration,
              <div className="flex justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["next"].icon}
                  onClick={() => fetchPayableSchedule(i.expense_reference)}
                />
              </div>,
            ]);
          });
          setloading(false);
          // setPostLoader(false);
          setPayableScheduleData(arr);
        });
    } catch (error) {
      setPostLoader(false);
      setloading(false);
      swal({ icon: "error", title: "Error", text: error.message });
    }
  }

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

    async function getApAccount() {
      try {
        let response = await axios.get(API_SERVER + "/api/get-apaccount", {
          headers,
        });
        setAPaccount(response.data);
      } catch (error) {
        swal({ icon: "error", title: "Error", text: error.message });
      }
    }
    getPayableScheduleDetailsManual();
    getFrequency();
    getApAccount();
  }, []);
  return (
    <div>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          borderRadius: "3px",
          backgroundColor: "#ffffff",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            color: "white",
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
            height: "25px",
            fontSize: "1.1em",
            paddingLeft: "10px",
            alignItems: "center",
          }}
        >
          <span>Payable Schedule</span>
        </div>
        <div style={{ padding: "10px" }}>
          {/* <hr /> */}
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.5 }}>
              <div style={{ marginBottom: "15px" }}>
                <ListOfValue
                  label={"Beneficiary Account"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  data={APaccount}
                  onChange={(value) => setBeneficiaryAcct(value)}
                  value={beneficiaryAcct}
                />
              </div>
              <div className="mb-4">
                <ListOfValue
                  label={"Frequency"}
                  labelWidth={"20%"}
                  inputWidth={"64%"}
                  data={frequencyLov}
                  onChange={(value) => setFrequency(value)}
                  value={frequency}
                />
              </div>
              {/* </div> */}
              {/* </div> */}
              <div style={{ marginBottom: "15px" }}></div>
            </div>
            <div style={{ flex: 0.4 }}>
              <div style={{ marginBottom: "15px" }}>
                <InputField
                  label={"Invoice Number"}
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  value={invoiceNumber}
                />
              </div>
              <div className="mb-4">
                <InputField
                  label={"Narration"}
                  labelWidth={"25%"}
                  inputWidth={"65%"}
                  onChange={(e) => setNarration(e.target.value)}
                  value={narration}
                />
              </div>
            </div>
            <div style={{ flex: 0.1 }}></div>
          </div>
          <hr style={{ margin: "10px 0" }} />
          <OverlayLoader
            postLoader={postLoader || fetchData}
            // color={"#0580c0"}
            textColor={true}
            displayText={postLoader ? "Loading..." : "Fetching Data..."}
          />

          <div
            className="mb-3"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <ButtonComponent
              label={"Fetch"}
              buttonHeight={"30px"}
              buttonWidth={"55px"}
              margin={"5px"}
              onClick={() => getPayableScheduleDetailsManual()}
            />
            <ButtonComponent
              label={"Refresh"}
              buttonHeight={"30px"}
              buttonWidth={"75px"}
              margin={"5px"}
              onClick={Refresh}
            />
            <ButtonComponent
              label={"Exit"}
              buttonHeight={"30px"}
              buttonWidth={"45px"}
              margin={"5px"}
              onClick={handleExitClick}
            />
          </div>
          <div>
            <Header title={"Payable Summary Transaction"} headerShade={true} />
          </div>
          <CustomTable
            headers={[
              "Beneficiary Account",
              "Posting Date",
              "Invoice Number",
              "Payable ID",
              "Taxable Amount",
              "Frequency",
              "Narration",
              "Action",
            ]}
            loading={{ status: loading, message: "Processing Data..." }}
            data={payableScheduleData}
            rowsPerPage={10}
            style={{ columnAlignRight: [5] }}
          />
        </div>
        {showModal && (
          <Modal
            className="p-0 m-0"
            opened={showModal}
            size="90%"
            padding={0}
            withCloseButton={false}
            closeOnClickOutside={false}
            transitionProps={"mounted"}
            onClose={() => setshowModal(false)}
          >
            <PayableScheduleModal
              setshowModal={setshowModal}
              payableData={payableData}
              setPayableData={setPayableData}
              payableID={payableID}
              tickCheckbox={tickCheckbox}
              setTickCheckbox={setTickCheckbox}
              clearCheckboxes={clearCheckboxes}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default PayableSchedule;
