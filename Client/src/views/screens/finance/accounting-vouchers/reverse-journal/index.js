import React, { useEffect, useState } from "react";
import Header from "../../../../../components/others/Header/Header";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../teller-ops/components/CustomTable";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import CustomButtons from "../../../../../components/others/CustomButtons";
import { Modal } from "@mantine/core";
import ReverseJournalDetails from "./components/reversalJournalModal";
import swal from "sweetalert";
import OverlayLoader from "../../../../../components/others/OverlayLoader";

function ReverseJournal() {
  const headers = {
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  const [voucherDetails, setVoucherDetails] = useState([]);
  const [reversalModal, setReversalModal] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [valueDate, setValueDate] = useState("");
  const [batch, setBatch] = useState("");
  const [voucher, setVoucher] = useState("");
  const [amount, setAmount] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [batchAmount, setBatchAmount] = useState("");
  const [valuedate, setValuedate] = useState("");
  const [scanDoc, setScanDoc] = useState("");
  const [transactionDetails, setTransactionDetails] = useState("");
  const [currency, setCurrency] = useState("");
  const [voucherType, setVoucherType] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [details, setDetails] = useState([]);

  function formatNumber(num) {
    const numericInput = String(num).replace(/[^0-9.-]/g, "");
    // Convert the input to a number and check if it's valid
    const number = parseFloat(numericInput);
    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
    if (formatted === "NaN") {
      return " ";
    } else {
      return formatted;
    }
  }

  const NumberWithoutCommas = (number) => {
    const formattedNumber = String(number).replace(/,/g, "");
    return Number(formattedNumber);
  };

  function formatDate(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return (
      inputDate.getDate() +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }

  useEffect(() => {
    setValueDate("");
    setBatch("");
    setVoucher("");
    setAmount("");
    async function getVoucherDetails() {
      let arr = [];
      await axios
        .post(API_SERVER + "/api/get-reverse-journal-vouchers", {}, { headers })
        .then((res) => {
          if (res.data.length > 0) {
            res.data.map((i) => {
              arr.push([
                i.voucher_number,
                i.batch_no,
                i.value_date,
                i.batch_desc,
                formatNumber(i.batch_amount),
                i.trans_count,
                i.user_name,
                <div className="flex items-center justify-center">
                  <ButtonComponent
                    buttonIcon={CustomButtons["next"].icon}
                    onClick={() => {
                      setPostLoader(true);
                      setVoucherType(i[0]);
                      fetVoucherDetails(
                        i.voucher_number,
                        i.batch_no,
                        i.batch_amount,
                        i.value_date,
                        i.batch_desc
                      );
                    }}
                  />
                </div>,
              ]);
            });
            setVoucherDetails(arr);
          }
        });
    }
    getVoucherDetails();
  }, [refresh]);

  async function fetVoucherDetails(
    voucher,
    batch,
    batchAmount,
    valDate,
    transdetails
  ) {
    let response = await axios.post(
      API_SERVER + "/api/get-ALL-VOUCHERS-DETAILS",
      {
        voucherType: voucher,
        batchNumber: batch,
      },
      { headers }
    );
    if (response) {
      let arr = [];
      setBatchNumber(batch);
      setBatchAmount(formatNumber(batchAmount));
      setValuedate(valDate);
      setTransactionDetails(transdetails);
      setDetails(response.data);
      response.data?.map((a) => {
        arr.push([
          a.account_description,
          a.acct_link,
          formatNumber(a.local_equivalent_cr),
          formatNumber(a.local_equivalent_db),
          a.branch,
          a.transaction_details,
          a.scan_doc_id,
        ]);
      });
      setTransactions(arr);
      setCurrency(response.data[0]?.currency);
      setPostLoader(false);
      setReversalModal(true);
    } else {
      swal("ERR - 06077", "No Data Loaded", {
        icon: "error",
      });
    }
  }

  async function fetchVouchers() {
    let arr = [];
    axios
      .post(
        API_SERVER + "/api/get-reverse-journal-vouchers",
        {
          key: "f",
          voucherType: voucher,
          batchNumber: batch,
          batchAmount: NumberWithoutCommas(amount),
          valueDate: valueDate ? formatDate(valueDate) : "",
        },
        { headers }
      )
      .then((res) => {
        if (res.data.length > 0) {
          res.data.map((i) => {
            arr.push([
              i.voucher_number,
              i.batch_no,
              i.value_date,
              i.batch_desc,
              formatNumber(i.batch_amount),
              i.trans_count,
              i.user_name,
              <div className="flex items-center justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["next"].icon}
                  onClick={() => {
                    // setReversalModal(true);
                    fetVoucherDetails(
                      i.voucher_number,
                      i.batch_no,
                      i.batch_amount,
                      i.value_date,
                      i.batch_desc
                    );
                  }}
                />
              </div>,
            ]);
          });
          setVoucherDetails(arr);
        } else {
          swal({
            icon: "error",
            title: "ERR - 05707",
            text: "No data found",
          });
        }
      });
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
  return (
    <div className="p-1">
      <div className="mb-1">
        <Header title={"Filters"} headerShade={true} />
      </div>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        className=" p-2 rounded-sm"
      >
        <OverlayLoader
          postLoader={postLoader}
          // color={"#0580c0"}
          textColor={true}
          displayText={"Loading..."}
        />
        <div className="flex mb-[15px] w-full">
          <div className="w-1/2">
            <InputField
              label={"Batch Number"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              onChange={(e) => setBatch(e.target.value)}
              value={batch}
            />
          </div>
          <div className="w-1/2">
            <SelectField
              label={"Voucher Type"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              data={[
                { label: "Journal", value: "JRNL" },
                { label: "Payment", value: "PYMT" },
                { label: "Receipt", value: "RCPT" },
              ]}
              onChange={(value) => setVoucher(value)}
              value={voucher}
            />
          </div>
        </div>
        <div className="flex mb-[15px] w-full">
          <div className="w-1/2">
            <InputField
              label={"Amount"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => {
                if (amount) {
                  setAmount(formatNumber(amount));
                }
              }}
              value={amount}
            />
          </div>
          <div className="w-1/2">
            <InputField
              label={"Value Date"}
              labelWidth={"25%"}
              inputWidth={"50%"}
              type={"date"}
              onChange={(e) => setValueDate(e.target.value)}
              value={valueDate}
            />
          </div>
        </div>
        <div className="flex mb-[15px] w-full">
          <div className="w-1/2">
            {/* <InputField
              label={"Transaction Details"}
              labelWidth={"25%"}
              inputWidth={"50%"}
            /> */}
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>
      <div className="flex gap-2 justify-end my-4">
        <ButtonComponent
          label={"Fetch"}
          buttonWidth={"55px"}
          onClick={() => fetchVouchers()}
        />
        <ButtonComponent
          label={"Refresh"}
          buttonWidth={"65px"}
          onClick={() => setRefresh(!refresh)}
        />
        <ButtonComponent
          label={"Exit"}
          buttonWidth={"50px"}
          onClick={handleExitClick}
        />
      </div>
      <hr className="border border-b-gray-200 mb-3" />
      <div>
        <Header title={"Transactions"} headerShade={true} />
        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
          className="rounded-sm"
        >
          <CustomTable
            rowsPerPage={10}
            style={{ columnAlignRight: [5] }}
            headers={[
              "Voucher Type",
              "Batch Number",
              "Value Date",
              "Transaction Details",
              "Amount",
              "Count",
              "Posted By",
              "Action",
            ]}
            data={voucherDetails}
          />
        </div>
      </div>
      {reversalModal ? (
        <Modal
          opened={reversalModal}
          size="85%"
          padding={0}
          style={{ margin: 0, padding: 0 }}
          withCloseButton={false}
          closeOnClickOutside={false}
          transitionProps={"mounted"}
          onClose={() => setReversalModal(false)}
        >
          <ReverseJournalDetails
            batchNumber={batchNumber}
            batchAmount={batchAmount}
            valuedate={valuedate}
            details={details}
            transactionDetails={transactionDetails}
            transactions={transactions}
            currency={currency}
            voucherType={voucherType}
            setReversalModal={setReversalModal}
          />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}

export default ReverseJournal;
