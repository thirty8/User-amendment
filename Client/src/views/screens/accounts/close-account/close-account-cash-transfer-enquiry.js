import React, { useState, useEffect } from "react";
import InputField from "../../../../components/others/Fields/InputField";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import { API_SERVER } from "../../../../config/constant";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import axios from "axios";
import CustomTable from "../../../../components/others/customtable";
import ClosedAccountReceipt from "./components/receipt";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const CLoseAccountCashTransferEnquiry = () => {
  const [allData, setAllData] = useState([]);
  const [load, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [load2, setLoading2] = useState(false);
  const [myObj, setMyObj] = useState({});
  const [receiptDetails, setReceiptDetails] = useState({});

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

  const fetchData = async () => {
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/close-account-cash-transfer-enquiry",
        {
          fetch: "true",
          reference_no: myObj ? myObj?.reference_no : "",
          acct_link: myObj ? myObj?.account_number : "",
          global_bra: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
        },
        { headers }
      )
      .then((response) => {
        const arr = [];
        if (response.data.length > 0) {
          response?.data.map((i, key) => {
            const {
              reference_no,
              batch_no,
              clse_acct,
              close_acct_desc,
              transfer_acct,
              transfer_acct_desc,
              transfer_currency_desc,
              transfer_amount,
              posted_by,
              posting_date,
              app_flag,
            } = i;
            arr.push([
              <div className="flex space-x-3 justify-center items-center">
                <ButtonComponent
                  label={"Print Voucher"}
                  buttonWidth={"100%"}
                  onClick={() => {
                    fetchReceiptDetails(batch_no);
                  }}
                />
              </div>,

              reference_no,
              `${clse_acct} - ${close_acct_desc}`,
              `${transfer_acct} - ${transfer_acct_desc}`,
              transfer_currency_desc,
              <p className="text-right">{formatNumber(transfer_amount)}</p>,
              formatDate(posting_date),
            ]);
          });
        }
        setAllData(arr);
      })
      .catch((err) => {
        console.log(`error here : ${err}`);
        // setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const refreshFunc = async () => {
    setReceiptDetails({});
    setMyObj("");
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/close-account-cash-transfer-enquiry",
        {
          fetch: "true",
          reference_no: "",
          acct_link: "",
          global_bra: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          const arr = [];
          response?.data.map((i) => {
            const {
              reference_no,
              batch_no,
              clse_acct,
              close_acct_desc,
              transfer_acct,
              transfer_acct_desc,
              transfer_currency_desc,
              transfer_amount,
              posted_by,
              posting_date,
              app_flag,
            } = i;
            arr.push([
              <div className="flex space-x-3 justify-center items-center">
                <ButtonComponent
                  label={"Print Voucher"}
                  buttonWidth={"100%"}
                  onClick={() => {
                    fetchReceiptDetails(batch_no);
                  }}
                />
              </div>,

              reference_no,
              `${clse_acct} - ${close_acct_desc}`,
              `${transfer_acct} - ${transfer_acct_desc}`,
              transfer_currency_desc,
              <p className="text-right">{formatNumber(transfer_amount)}</p>,
              formatDate(posting_date),
            ]);
          });
          setAllData(arr);
        }
      })
      .catch((err) => {
        console.log(`error here : ${err}`);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  //   on page load
  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchReceiptDetails = async (batch_no) => {
    setShowModal(true);
    setLoading2(true);
    await axios
      .post(
        API_SERVER + "/api/close-account-cash-transfer-enquiry",
        {
          print_voucher: "true",
          batch_number: batch_no,
        },
        { headers }
      )
      .then((response) => {
        console.log({ response });
        if (response?.data?.length > 0) {
          setLoading2(false);
          setReceiptDetails(response?.data[0]);
        }
      })
      .catch((err) => {
        console.log(`error with receipt details : ${err}`);
        setLoading2(false);
      });
  };

  return (
    <div>
      <div>
        <ActionButtons
          displayCancel={"none"}
          displayAuthorise={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayView={"none"}
          displayNew={"none"}
          displayReject={"none"}
          displayOk={"none"}
          onRefreshClick={refreshFunc}
          onFetchClick={fetchData}
        />

        <hr className="mt-3" />

        <div className="flex items-center justify-between mb-3 p-3 mt-3">
          <div className="w-[50%]">
            <InputField
              label={"Reference No"}
              labelWidth={"35%"}
              inputWidth={"40%"}
              name={"reference_no"}
              value={myObj ? myObj?.reference_no : ""}
              onChange={(e) =>
                setMyObj((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchData();
                }
              }}
            />
          </div>

          <div className="w-[50%]">
            <InputField
              label={"Closed Account"}
              labelWidth={"35%"}
              inputWidth={"40%"}
              name={"account_number"}
              value={myObj ? myObj?.account_number : ""}
              onChange={(e) =>
                setMyObj((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchData();
                }
              }}
            />
          </div>
        </div>

        <hr />

        {/* table  */}
        <div className="mt-4">
          <CustomTable
            headers={[
              "Print",
              "Reference No",
              "Close Account",
              "Transfer Account",
              "Currency",
              "Transfer Amount",
              "Posting Date",
            ]}
            data={allData}
            rowsPerPage={10}
            load={load}
          />
        </div>

        {/* receipt */}
        {showModal && (
          <ClosedAccountReceipt
            showModal={showModal}
            handleClose={() => setShowModal(false)}
            errorLoader={load2}
            receiptDetails={receiptDetails}
            formatNumber={formatNumber}
          />
        )}
      </div>
    </div>
  );
};

export default CLoseAccountCashTransferEnquiry;
