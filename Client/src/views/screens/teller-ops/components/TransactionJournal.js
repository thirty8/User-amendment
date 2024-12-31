import React, { useEffect, useState } from "react";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import InputField from "./inputField";
import ListOfValue from "./ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../../../views/screens/control-setups/components/CustomTable";
// import CustomTable from "./CustomTable";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
// import { headers } from "teller/teller-activities";
import { FiEye, FiLogOut, FiPrinter, FiX } from "react-icons/fi";
import swal from "sweetalert";
import { Modal } from "@mantine/core";
import Header from "../../../../components/others/Header/Header";
import { FileAddFilled } from "@ant-design/icons";
import { BiGridSmall } from "react-icons/bi";

function TransactionJournal({ type }) {
  const [formData, setFormData] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [amountBetween, setAmountBetween] = useState("");
  const [amountAnd, setAmountAnd] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [transType, setTransType] = useState("");
  const [transTypeValue, setTransTypeValue] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [journalData, setJournalData] = useState([]);
  const [denominations, setDenominations] = useState([]);
  const [mandatoryErrorMessage, setMandatoryErrorMessage] = useState("");
  const [showOtherDetailsModal, setShowOtherDetailsModal] = useState(false);
  const [showDenominationModal, setShowDenominationModal] = useState(false);
  const [otherDetailsAccountNumber, setOtherDetailsAccountNumber] =
    useState("");
  const [otherDetailsAmount, setOtherDetailsAmount] = useState("");
  const [otherDetailsCustomerNumber, setOtherDetailsCustomerNumber] =
    useState("");
  const [otherDetailsTransactionDetails, setOtherDetailsTransactionDetails] =
    useState("");
  const [otherDetailsTransNo, setOtherDetailsTransNo] = useState("");
  const [otherDetailsPostingSysTime, setOtherDetailsPostingSysTime] =
    useState("");
  const [loading, setLoading] = useState(false);
  const [transtypeData, setTransTypeData] = useState([]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/vault-activities",
        {
          key: "transJournalVaultLov",
        },
        { headers }
      )
      .then((res) => {
        setTransType(res.data);
      });

    document.getElementById("startDate")?.focus();

    // get mandatory date
    axios
      .get(API_SERVER + "/api/getMandatoryFieldError", { headers: headers })
      .then(function (response) {
        console.log(response.data[0], "messagenger");
        setMandatoryErrorMessage(
          `ERR ${response.data[0].code} - ${response.data[0].err_mesg}`
        );
      })
      .catch((err) => console.log(err));

    //set Date to posting date
    setDate1(postingDate);
    setDate2(postingDate);

    axios
      .get(API_SERVER + "/api/transaction-journal-transaction-types", {
        headers: headers,
      })
      .then(function (response) {
        setTransTypeData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // date formatter
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get individual parts of the date
    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase()
      .slice(0, 3); // Shorten the month name to 3 letters
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    // Combine the parts with hyphens
    return `${month}-${day}-${year}`;
  }

  function formatPostingDate(dateString) {
    const date = new Date(dateString);

    // Get individual parts of the date
    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase();
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    // Combine the parts with hyphens
    return `${day}-${month}-${year}`;
  }

  // number formatter
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  // switch Focus
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId)?.focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  const username = JSON.parse(localStorage.getItem("userInfo"))?.id;
  const postingDate = JSON.parse(
    localStorage.getItem("userInfo")
  ).postingDate.split("T")[0];

  // console.log(date1, "date one");

  const d1 = formatDate(date1);
  const d2 = formatDate(date2);

  const otherItemsPostingDate = formatPostingDate(date1);

  function handleFilter() {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/transaction-journal",
        {
          username: username,
          date1: d1,
          date2: d2,
          amountFrom: amountBetween,
          amountTo: amountAnd,
          batch_number: batchNo,
          transType: transTypeValue,
          acct_link: accountNumber,
        },
        { headers }
      )
      .then((response) => {
        console.log(response, "food");
        setJournalData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });

    if (date1 === "" || date2 === "" || username === "") {
      swal(mandatoryErrorMessage);
    }
  }

  var debitCount = 0;
  var creditCount = 0;

  // denomination
  var demoninationsData = denominations.map((i) => {
    return [
      <div>{i?.denomination_code}</div>,
      <div>{i?.denomination_descrp}</div>,
      <div>{i?.amount}</div>,
      <div>{i.quantity}</div>,
    ];
  });

  console.log(denominations, "dms");

  // journal data in the table
  var journal = Array.isArray(journalData)
    ? journalData?.map((i) => {
        const dbValue = i.local_equivalent_db;
        const crValue = i.local_equivalent_cr;

        if (!isNaN(dbValue)) {
          debitCount++;
        }

        if (!isNaN(crValue)) {
          creditCount++;
        }

        return [
          <div>{i?.batch_no}</div>,
          <div>{i?.trans_no}</div>,
          <div>{i?.acct_link}</div>,
          <div>{i?.account_desc}</div>,
          <div>{i?.currency_code}</div>,
          <div>{i?.transaction_details}</div>,
          <div style={{ textAlign: "right", color: "red" }}>
            {i?.local_equivalent_db === "null"
              ? ""
              : formatNumber(parseInt(i?.local_equivalent_db))}
          </div>,
          <div style={{ textAlign: "right" }}>
            {i?.local_equivalent_cr === "null"
              ? ""
              : formatNumber(parseInt(i?.local_equivalent_cr))}
          </div>,
          <div>{formatDate(i?.value_date)}</div>,
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              onClick={() => {
                setShowOtherDetailsModal(true);
                // isMiniModalOpened(true);
                // onUser click

                axios
                  .post(
                    API_SERVER + "/api/transaction-journal-get-other-details",
                    {
                      batchNo: i?.batch_no,
                      postingDate: otherItemsPostingDate,
                    },
                    { headers: headers }
                  )
                  .then(function (response) {
                    setOtherDetailsAccountNumber(response.data[0]?.acct_link);
                    setOtherDetailsAmount(
                      formatNumber(parseInt(response.data[0]?.amount))
                    );
                    setOtherDetailsCustomerNumber(
                      response.data[0]?.customer_no
                    );
                    setOtherDetailsTransactionDetails(
                      response.data[0]?.transaction_details
                    );
                    setOtherDetailsTransNo(response.data[0]?.trans_no);
                    setOtherDetailsPostingSysTime(
                      response.data[0]?.posting_sys_time
                    );
                  })
                  .catch((err) => swal(err));
              }}
              className="mr-2 bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
            >
              <FiEye size={20} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                onClick={() => {
                  setShowDenominationModal(true);
                  // isMiniModalOpened(true);

                  // onclick of denominations
                  axios
                    .post(
                      API_SERVER +
                        "/api/transaction-journal-get-denomination-breakdown",
                      {
                        batchNo: i?.batch_no,
                        postingDate: otherItemsPostingDate,
                        currency_code: i?.currency_code,
                      },
                      { headers: headers }
                    )
                    .then(function (response) {
                      setDenominations(response.data);
                    })
                    .catch((err) => console.log(err));
                }}
                className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 stroke-cyan-300 fill-gray-800"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>,
        ];
      })
    : [];

  return (
    <div className="my-6 mx-4">
      <div className="bg-gray-200">
        {/* <div className="flex items-center justify-center">
          <hr className=" mt-1 mb-1 w-full" />
        </div> */}
        {type === "T" ? (
          <div
            style={{
              zoom: 0.85,
              // display:
              //   showOtherDetailsModal || showDenominationModal ? "none" : "block",
            }}
            className="flex justify-center space-x-3 bg-white py-2  "
          >
            <div className="rounded-md  w-full p-1 flex justify-center">
              <div className="w-[90%] px-4 py-3  border-2 rounded-md">
                <div className="flex items-center space-x-4 ">
                  <div className=" w-1/2">
                    <InputField
                      label={"Username"}
                      required
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      disabled={true}
                      marginBottom={"8px"}
                      value={JSON.parse(localStorage.getItem("userInfo"))?.id}
                    />
                  </div>
                  <div className="w-1/2">
                    <div className="flex justify-end">
                      <div className="w-[70%] flex space-x-4">
                        <InputField
                          label={"Debit Count"}
                          labelWidth={"50%"}
                          inputWidth={"50%"}
                          disabled={true}
                          marginBottom={"8px"}
                          value={debitCount}
                          textAlign={"right"}
                        />
                        <InputField
                          label={"Credit Count"}
                          labelWidth={"50%"}
                          inputWidth={"50%"}
                          disabled={true}
                          marginBottom={"8px"}
                          value={creditCount}
                          textAlign={"right"}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="font-bold text-gray-500 text-[12px]">
                  FILTERS
                </div>
                <hr className="mt-0 mb-2" />
                <div className="space-y-2 mb-2">
                  <div className="flex space-x-4">
                    <ListOfValue
                      label={"Transaction Type"}
                      dropdownPosition={"bottom"}
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      id="transactionalType"
                      data={transtypeData}
                      // value={formData?.status}
                      value={transTypeValue}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = document.getElementById("startDate");
                          input?.focus();
                        }
                      }}
                      onChange={(value) => {
                        setTransTypeValue(value);
                        setTimeout(() => {
                          const input = document.getElementById("startDate");
                          input?.focus();
                        }, 0);
                      }}
                    />
                    <InputField
                      label={"Batch Number"}
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      value={batchNo}
                      onChange={(e) => {
                        setBatchNo(e.target.value);
                      }}
                    />
                  </div>

                  <div className="flex space-x-5">
                    <InputField
                      label={"Start Date"}
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      id="startDate"
                      type="date"
                      required
                      onChange={(e) => {
                        setDate1(e.target.value);
                        setDate2(e.target.value);
                      }}
                      value={date1}
                      onKeyPress={(e) => {
                        if (e.keyCode === 13) {
                          switchFocus(e, "amountBetween");
                          setDate2(date1);
                        }
                      }}
                    />

                    <InputField
                      label={"End Date"}
                      required
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      type="date"
                      id="endDate"
                      onKeyPress={() => handleFilter()}
                      onChange={(e) => {
                        setDate2(e.target.value);
                      }}
                      value={date2}
                    />
                  </div>
                  <div className="flex space-x-5">
                    <InputField
                      label={"Amount (Between)"}
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      value={amountBetween}
                      id="amountBetween"
                      onChange={(e) => {
                        setAmountBetween(e.target.value);
                      }}
                      textAlign={"right"}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          switchFocus(e, "amountAnd");
                        }
                      }}
                    />

                    {/* search by account number */}
                    <InputField
                      label={"Amount (To)"}
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      value={amountAnd}
                      id="amountAnd"
                      onChange={(e) => {
                        setAmountAnd(e.target.value);
                      }}
                      textAlign={"right"}
                    />
                  </div>

                  <div className="flex space-x-5">
                    <div className="w-1/2">
                      <InputField
                        label={"Account Number"}
                        labelWidth={"38.45%"}
                        inputWidth={"57.8%"}
                        value={accountNumber}
                        id="accountNumber"
                        onChange={(e) => {
                          setAccountNumber(e.target.value);
                        }}
                      />
                    </div>

                    {/* <InputField
                      label={"Account Number"}
                      labelWidth={"40%"}
                      inputWidth={"60%"}
                      value={accountNumber}
                      id="accountNumber"
                      onChange={(e) => {
                        setAccountNumber(e.target.value);
                      }}
                    /> */}
                    <div className="w-1/2 flex space-x-2 justify-end">
                      <ButtonComponent
                        label={"Reset"}
                        buttonWidth={"25%"}
                        buttonHeight={"30px"}
                        onClick={() => {}}
                      />
                      <ButtonComponent
                        label={"Filter"}
                        buttonWidth={"25%"}
                        buttonHeight={"30px"}
                        onClick={handleFilter}
                      />
                    </div>
                  </div>

                  {/* <div style={{ width: "50%" }} className="flex space-x-5">
                    <ButtonComponent
                      label={"Print"}
                      buttonWidth={"25%"}
                      buttonHeight={"30px"}
                      onClick={() => window.print()}
                    />
                  </div> */}
                </div>
              </div>

              {/* Show Other Details */}
              {
                <Modal
                  className=""
                  size={"45%"}
                  opened={showOtherDetailsModal}
                  withCloseButton={false}
                  padding={0}
                  onClose={() => {
                    setShowOtherDetailsModal(false);
                  }}
                  trapFocus={false}
                  centered
                >
                  <div style={{ zoom: 0.95 }}>
                    <div className="flex justify-between bg-blue-600 text-white">
                      Other Details
                      <div
                        onClick={() => {
                          setShowOtherDetailsModal(false);
                        }}
                        className=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17"
                            stroke="#FF8A65"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div style={{ padding: "20px", width: "100%" }}>
                      <div style={{ display: "flex" }}>
                        <div style={{ marginRight: "10px" }}>
                          <ButtonComponent
                            label={"Print"}
                            buttonIcon={<FiPrinter />}
                          />
                        </div>

                        <div style={{ marginRight: "10px" }}>
                          <ButtonComponent
                            label={"View Voucher"}
                            buttonIcon={<FiEye />}
                          />
                        </div>

                        <div style={{ marginRight: "10px" }}>
                          <ButtonComponent
                            label={"Add Voucher"}
                            buttonIcon={<FileAddFilled />}
                          />
                        </div>
                      </div>

                      <br />
                      <hr />
                      <br />

                      {/* body section of other details */}

                      <div style={{ width: "100%", marginBottom: "20px" }}>
                        <InputField
                          label="Account Number"
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          disabled
                          value={otherDetailsAccountNumber}
                        />
                      </div>

                      <div style={{ width: "100%", marginBottom: "20px" }}>
                        <InputField
                          label="Amount"
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          disabled
                          value={
                            otherDetailsAmount === "NaN"
                              ? ""
                              : otherDetailsAmount
                          }
                        />
                      </div>

                      <div style={{ width: "100%", marginBottom: "20px" }}>
                        <InputField
                          label="Customer Number"
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          disabled
                          value={otherDetailsCustomerNumber}
                        />
                      </div>

                      <div style={{ width: "100%", marginBottom: "20px" }}>
                        <InputField
                          label="Transaction Details"
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          disabled
                          value={otherDetailsTransactionDetails}
                        />
                      </div>

                      <div style={{ width: "100%", marginBottom: "20px" }}>
                        <InputField
                          label="Transaction Number"
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          disabled
                          value={otherDetailsTransNo}
                        />
                      </div>

                      <div style={{ width: "100%", marginBottom: "20px" }}>
                        <InputField
                          label="Posting SysTime"
                          labelWidth={"30%"}
                          inputWidth={"70%"}
                          disabled
                          value={otherDetailsPostingSysTime}
                        />
                      </div>
                    </div>
                  </div>
                </Modal>
              }
            </div>

            {/* show denomination modal */}
            <Modal
              className=""
              size={"50%"}
              opened={showDenominationModal}
              withCloseButton={false}
              padding={0}
              onClose={() => {
                setShowDenominationModal(false);
                // isMiniModalOpened(false);
              }}
              trapFocus={false}
              centered
            >
              {/* <Header
                title={"Denomination Breakdown"}
                headerShade
                handleClose={}
                closeIcon={<div>dsj</div>}
              /> */}
              <div className="flex justify-between bg-blue-600 text-white">
                Denomination Breakdown
                <div
                  onClick={() => {
                    setShowDenominationModal(false);
                  }}
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17"
                      stroke="#FF8A65"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className=" mx-5"></div>

              <div style={{ zoom: 0.9 }}>
                <Header title={"Denominations"} />
                <div style={{ zoom: 0.8 }}>
                  <CustomTable
                    headers={[
                      "Denomination",
                      "Denomination Description",
                      "Amount",
                      "Quantity",
                    ]}
                    data={demoninationsData}
                    pagination={false}
                  />
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          <div className="flex justify-center space-x-3 bg-white py-2  ">
            <div className="rounded  w-full p-1 flex justify-center">
              <div className="w-[65%] px-4 py-1  border-2 rounded">
                <div className="flex space-x-4">
                  <InputField
                    label={"Username"}
                    labelWidth={"30%"}
                    inputWidth={"70%"}
                    disabled={true}
                    marginBottom={"8px"}
                    value={JSON.parse(localStorage.getItem("userInfo")).id}
                  />
                  <div className="w-full">&nbsp;</div>
                </div>

                <div className="font-bold text-gray-500 text-[12px]">
                  FILTERS
                </div>
                <hr className="mt-0" />
                <div className="space-y-2 mb-2">
                  <div className="flex space-x-4">
                    <ListOfValue
                      label={"Transaction Type"}
                      labelWidth={"30%"}
                      inputWidth={"70%"}
                      data={transType}
                      value={formData?.transType}
                      onChange={(value) => {
                        setFormData((prev) => ({ ...prev, transType: value }));
                      }}
                    />
                    {/* <div className="w-full">&nbsp;</div> */}
                    <InputField
                      label={"Batch Number"}
                      labelWidth={"30%"}
                      inputWidth={"70%"}
                      value={formData?.batch_number}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          batch_number: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="flex space-x-5">
                    <InputField
                      label={"Amount"}
                      labelWidth={"30%"}
                      inputWidth={"70%"}
                      type={"number"}
                      value={formData?.account_number}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          account_number: e.target.value,
                        }));
                      }}
                    />
                    <InputField
                      label={"Start Date"}
                      labelWidth={"30%"}
                      inputWidth={"70%"}
                    />
                  </div>
                </div>
                <div className="flex space-x-5">
                  <InputField
                    label={"End Date"}
                    labelWidth={"30%"}
                    inputWidth={"70%"}
                  />
                  <div className="flex justify-end w-full">
                    <ButtonComponent
                      label={"Filter"}
                      buttonWidth={"25%"}
                      buttonHeight={"30px"}
                      onClick={handleFilter}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <hr className="my-[6px]" /> */}
        <div className=" w-full bg-white ">
          <div className="min-h-[100px]" style={{ zoom: 0.75 }}>
            <Header title="Transactions" headerShade={true} />
            <CustomTable
              rowsPerPage={10}
              title={"Transaction Status"}
              headers={[
                "Batch Number",
                "Trans Number",
                "Account Number",
                "Account Description",
                "Currency",
                "Transaction Details",
                "Debit",
                "Credit",
                "Value Date",
                "Details",
              ]}
              pagination={false}
              data={journal}
              load={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionJournal;
