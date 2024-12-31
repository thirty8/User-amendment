import React, { useState, useEffect } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import Header from "../../../../../components/others/Header/Header";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import CustomTable from "../../../control-setups/components/CustomTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import { FiXCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import { Loader } from "@mantine/core";

function NostroStatementOutstanding() {
  //HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const acTransHeaders = [
    <div>Document Ref.</div>,
    "Amount",
    "Value Date",
    <div style={{ textAlign: "left" }}>Trans Details</div>,
    "Action",
  ];

  const swiftHeaders = [
    <div>Document Ref.</div>,
    "Amount",
    "Value Date",
    <div style={{ textAlign: "left" }}>Trans Details</div>,
    "Action",
  ];

  const acLowerTransHeaders = [
    "Account No.",
    "Reference",
    "Amount",
    "Value Date",
    "Batch No.",
    "Action",
  ];

  const swiftLowerHeaders = [
    "Account No.",
    "Reference",
    "Amount",
    "Value Date",
    "Batch No.",
    "Action",
  ];

  // FUNCTIONS AND HOOKS
  const [nostroAccounts, setNostroAccounts] = useState([]);
  const [acTransData, setAcTransData] = useState([]);
  const [acTransLowerData, setAcTransLowerData] = useState([]);
  const [swiftData, setSwiftData] = useState([]);
  const [swiftLowerData, setSwiftLowerData] = useState([]);
  const [nostroAccountValue, setNostroAccountValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [documentRef, setDocumentRef] = useState("");
  const [checkedACTransRow, setCheckedACTransRow] = useState(false);
  const [checkedSwiftRow, setCheckedSwiftRow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [pageLoader, setPageLoader] = useState(false);
  const [batchNumber, setBatchNumber] = useState("");

  // ON PAGE LOAD
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/nostro-accounts", { headers: headers })
      .then(function (response) {
        setNostroAccounts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // GET BATCH NUMBER
  const getBatchNumber = () => {
    axios
      .get(API_SERVER + "/api/get-unique-ref", { headers: headers })
      .then(function (response) {
        setBatchNumber(response.data[0]?.unique_ref);
      })
      .catch((err) => console.log(err));
  };

  const acTransLowerSectionCall = () => {
    axios
      .post(
        API_SERVER + "/api/nostro-acTrans-reconciliation",
        {
          username: user,
        },
        { headers: headers }
      )
      .then(function (response) {
        setAcTransLowerData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const swiftLowerSectionCall = () => {
    axios
      .post(
        API_SERVER + "/api/nostro-swift-reconciliation",
        {
          username: user,
        },
        { headers: headers }
      )
      .then(function (response) {
        setSwiftLowerData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // RECONCILIATION FUNCTIONS
  const reconciliationFunctionDB = (
    document_ref,
    account_load,
    trans_no,
    oust
  ) => {
    axios
      .post(
        API_SERVER + "/api/nostro-update-tb-recon-trans-db",
        {
          username: user,
          batch_number: batchNumber,
          document_ref: document_ref,
          account_load: account_load,
          trans_no: trans_no,
          oust: oust,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response, "reco db");

        if (response.data[0].responseCode === "000") {
          console.log("Updated table DB!");
        }
      })
      .catch((err) => console.log(err));
  };

  const reconciliationFunctionCR = (
    document_ref,
    account_load,
    trans_no,
    oust
  ) => {
    axios
      .post(
        API_SERVER + "/api/nostro-update-tb-recon-trans-cr",
        {
          username: user,
          batch_number: batchNumber,
          document_ref: document_ref,
          account_load: account_load,
          trans_no: trans_no,
          oust: oust,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response, "reco cr");

        if (response.data[0].responseCode === "000") {
          console.log("Updated table CR!");
        }
      })
      .catch((err) => console.log(err));
  };

  // UPDATE TABLE MT TABLE
  const updateTableMTTable = (reference) => {
    axios
      .post(
        API_SERVER + "/api/nostro-update-mt-table-in",
        {
          username: user,
          branch: branch,
          reference: reference,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // UPDATE TABLE STATEMENT 61
  const updateStatementHist = (reference, batch_number) => {
    axios
      .post(API_SERVER + "/api/nostro-update-statement-hist", {
        reference: reference,
        batch_number: batch_number,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  // DELETION AFTER OK CLICK UPON SUCCESSFUL RECONCILIATION
  const deleteAcTransRows = () => {
    axios
      .post(
        API_SERVER + "/api/nostro-clear-acTrans-after-ok-press",
        { username: user },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const deleteSwiftRows = () => {
    axios
      .post(
        API_SERVER + "/api/nostro-clear-swift-after-ok-press",
        { username: user },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  // ARRAYS FOR RECONCILIATIONS
  let arr00 = [];
  let arr000 = [];

  // NOSTRO ON OK CLICK TO RECONCILE 👍
  const onNostroOkClick = () => {
    setPageLoader(true);
    axios
      .post(
        API_SERVER + "/api/nostro-ok-click",
        {
          username: user,
        },
        { headers: headers }
      )
      .then(function (response) {
        setPageLoader(false);

        // ❌❌ THE RECONCILIATION - FAILURE ❌❌
        if (response.data[0].responseCode === "100") {
          Swal.fire(
            "ERR - 02093: Reconciliation not balance, please check",
            "",
            "error"
          );
        }

        // ✅✅ THE RECONCILIATION - SUCCESS ✅✅
        if (
          (acTransLowerData?.length > 0 &&
            response.data[0].responseCode === "000") ||
          (swiftLowerData?.length > 0 &&
            response.data[0].responseCode === "000")
        ) {
          acTransLowerData?.map((i) => {
            // return arr00.push(i?.OUST);
            return arr00.push(i);
          });

          swiftLowerData?.map((i) => {
            // return arr000.push(i?.STATE_AMT261);
            return arr000.push(i);
          });

          // INSERTING INTO THE AC TRANS TABLES WITH THE VALUES FROM THE LOWER SECTION
          // UPDATING INTO TABLE - AC TRANS
          for (let i = 0; i < arr00.length; i++) {
            if (parseFloat(arr00[i]?.OUST) < 0) {
              // inserting the value of a negative number into the debit
              reconciliationFunctionDB(
                arr00[i]?.DOCUMENT_REF,
                nostroAccountValue,
                arr00[i]?.TRANS_NO,
                Math.abs(arr00[i]?.OUST)
              );
            } else {
              // inserting the value of a negative number into the credit
              reconciliationFunctionCR(
                arr00[i]?.DOCUMENT_REF,
                nostroAccountValue,
                arr00[i]?.TRANS_NO,
                arr00[i]?.OUST
              );
            }
          }

          // INSERTING INTO THE SWIFT TABLE WITH THE VALUES FROM THE LOWER SECTION
          // UPDATING INTO TABLE - SWIFT
          for (let i = 0; i < arr000.length; i++) {
            if (parseFloat(arr000[i]?.STATE_AMT261) < 0) {
              // inserting the value of a negative number into the debit
              reconciliationFunctionDB(
                arr000[i]?.ACCT_OWN_REF261,
                nostroAccountValue,
                arr000[i]?.TRANS_NO,
                Math.abs(arr000[i]?.STATE_AMT261)
              );
            } else {
              // inserting the value of a negative number into the credit
              reconciliationFunctionCR(
                arr000[i]?.ACCT_OWN_REF261,
                nostroAccountValue,
                arr000[i]?.TRANS_NO,
                arr000[i]?.STATE_AMT261
              );
            }

            // UPDATING MT TABLE
            updateTableMTTable(arr000[i]?.SEND_REF20);
          }

          // UPDATING STATEMENT62_HIST
          for (let j = 0; j < arr00.length; j++) {
            // updateStatementHist(arr00[j]?.DOCUMENT_REF, arr000[i]?.BATCH_NO);
            // using the actranslowertable and swiftlowertable to do the four and five
          }
          // DELETION OF ROWS AFTER CLICKING ON OK
          // deleteAcTransRows();
          // deleteSwiftRows();

          Swal.fire("Transaction Manually Reconciled", "", "success");
        }

        // ❌❌ WHEN NOTHING IS IN THE TABLE TO BE RECONCILED ❌❌
        else if (
          acTransLowerData?.length === 0 ||
          swiftLowerData?.length === 0
        ) {
          Swal.fire("No Transactions to Reconcile", "", "info");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setPageLoader(true);
      });
  };

  // GENERATE BATCH NUMBER UPON CLICKING ON NOSTRO OK CLICK
  useEffect(() => {
    getBatchNumber();
  }, [onNostroOkClick]);

  // HANDLE ON CHANGE OF NOSTRO ACCOUNT
  const onAccountChange = (val) => {
    setLoading(true);
    setCheckedACTransRows(acTransData?.map(() => 0));

    // AC TRANS UPPER SECTION
    axios
      .post(
        API_SERVER + "/api/nostro-outstanding-acTrans-data",
        {
          account_load: val,
          start_date: startDateValue,
          end_date: endDateValue,
          document_ref: documentRef,
        },
        { headers: headers }
      )
      .then(function (response) {
        setAcTransData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // AC TRANS LOWER SECTION
    acTransLowerSectionCall();

    // SWIFT UPPER SECTION
    axios
      .post(
        API_SERVER + "/api/nostro-outstanding-swift-data",
        {
          account_load: val,
          start_date: startDateValue,
          end_date: endDateValue,
          document_ref: documentRef,
        },
        { headers: headers }
      )
      .then(function (response) {
        setSwiftData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // SWIFT LOWER SECTION
    swiftLowerSectionCall();
  };

  // FILTER THE DATA COMING
  const filterData = () => {
    setLoading(true);
    setCheckedACTransRows(acTransData?.map(() => 0));

    // AC TRANS UPPER SECTION
    axios
      .post(
        API_SERVER + "/api/nostro-outstanding-acTrans-data",
        {
          account_load: nostroAccountValue,
          start_date: startDateValue,
          end_date: endDateValue,
          document_ref: documentRef,
        },
        { headers: headers }
      )
      .then(function (response) {
        setAcTransData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // AC TRANS LOWER SECTION
    acTransLowerSectionCall();

    // SWIFT UPPER SECTION
    axios
      .post(
        API_SERVER + "/api/nostro-outstanding-swift-data",
        {
          account_load: nostroAccountValue,
          start_date: startDateValue,
          end_date: endDateValue,
          document_ref: documentRef,
        },
        { headers: headers }
      )
      .then(function (response) {
        setSwiftData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // SWIFT LOWER SECTION
    swiftLowerSectionCall();
  };

  // HANDLE ON CLICK OF EXIT BUTTON
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

  // FORMATTING DATE TO LOOK PRETTY
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase()
      .slice(0, 3);
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    return `${day}-${month}-${year}`;
  }

  // FORMATTING NUMBER TO LOOK PRETTY
  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  // CONSTANTS
  var user = JSON.parse(localStorage.getItem("userInfo")).id;
  var branch = JSON.parse(localStorage.getItem("userInfo")).branch;
  var acTransTotal = 0;
  var acTransLowerTotal = 0;
  var swiftTotal = 0;
  var swiftLowerTotal = 0;
  const countOfSwift = swiftData?.length;
  const countOfLowerSwift = swiftLowerData?.length;
  const countOfLowerAcTrans = acTransLowerData?.length;
  const countOfAcTrans = acTransData?.length;
  var acTransTableRows = [];
  var swiftTableRows = [];
  var swiftLowerTableRows = [];
  var acTransLowerTableRows = [];
  var differenceBetweenACTransAndSwift = 0;
  var differenceBetweenlowerACTransAndLowerSwift = 0;

  const initialCheckedStates = acTransData?.map(() => 0);
  const [checkedACTransRows, setCheckedACTransRows] =
    useState(initialCheckedStates);

  console.log({ checkedACTransRow });
  // AC TRANS UPPER TABLE
  acTransTableRows = acTransData?.map((i, index) => {
    const acTransOutstanding = parseFloat(i?.OUST);
    acTransTotal += acTransOutstanding;

    return [
      <div key={index} style={{ textAlign: "left" }}>
        {i?.DOCUMENT_REF}
      </div>,
      <div style={{ textAlign: "right" }}>{i?.OUST}</div>,
      <div>{formatDate(i?.VALUE_DATE)}</div>,
      <div style={{ textAlign: "left" }}>{i?.TRANSACTION_DETAILS}</div>,
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="checkbox"
          onChange={(e) => {
            acTransLowerSectionCall();
            swiftLowerSectionCall();
            if (e.target.checked === true) {
              setCheckedACTransRow((prev) => ({ ...prev, [index]: true }));
              acTransLowerSectionCall();
              swiftLowerSectionCall();
              axios
                .post(
                  API_SERVER + "/api/nostro-insert-into-acTransLowerTable",
                  {
                    trans_no: i?.TRANS_NO,
                    acct_link: i?.ACCT_LINK,
                    account_description: i?.ACCOUNT_DESCRP,
                    document_ref: i?.DOCUMENT_REF,
                    amount: i?.OUST,
                    value_date: formatDate(i?.VALUE_DATE.split("T")[0]),
                    batch_no: i?.BATCH_NO,
                    username: user,
                  },
                  { headers: headers }
                )
                .then(function (response) {
                  console.log(response, "'jessie'");
                })
                .catch((err) => console.log(err));

              acTransLowerSectionCall();
            } else {
              setCheckedACTransRow((prev) => ({ ...prev, [index]: false }));
            }
          }}
          id={i?.ACCT_LINK}
          onClick={() => {
            acTransLowerSectionCall();
            swiftLowerSectionCall();
          }}
          checked={checkedACTransRow[`${index}`]}
        />
      </div>,
    ];
  });

  // AC TRANS LOWER TABLE
  acTransLowerTableRows = acTransLowerData?.map((i) => {
    const acTransOutstanding = parseFloat(i?.OUST);
    acTransLowerTotal += acTransOutstanding;

    return [
      <div>{i?.ACCT_LINK}</div>,
      <div>{i?.DOCUMENT_REF}</div>,
      <div style={{ textAlign: "right" }}>{i?.OUST}</div>,
      <div>{formatDate(i?.VALUE_DATE)}</div>,
      <div>{i?.BATCH_NO}</div>,
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FiXCircle
          color="red"
          size={20}
          onClick={() => {
            acTransLowerSectionCall();
            swiftLowerSectionCall();

            axios
              .post(
                API_SERVER + "/api/nostro-delete-record-acTransLowerTable",
                {
                  batch_no: i?.BATCH_NO,
                  username: user,
                },
                { headers: headers }
              )
              .then(function (response) {
                console.log(response, "messi-");
              })
              .catch((err) => console.log(err));

            acTransLowerSectionCall();
            swiftLowerSectionCall();
          }}
        />
      </div>,
    ];
  });

  // SWIFT UPPER TABLE
  swiftTableRows = swiftData?.map((i, index) => {
    const swiftOutstanding = parseFloat(i?.OUST);
    swiftTotal += swiftOutstanding;
    return [
      <div style={{ textAlign: "left" }}>{i?.DOCUMENT_REF}</div>,
      <div style={{ textAlign: "right" }}>{i?.OUST}</div>,
      <div>{formatDate(i?.VALUE_DATE)}</div>,
      <div style={{ textAlign: "left" }}>{i?.TRANSACTION_DETAILS}</div>,
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ButtonType
          type={"checkbox"}
          onChange={(e) => {
            if (e.target.checked === true) {
              setCheckedSwiftRow((prev) => ({ ...prev, [index]: true }));

              axios
                .post(
                  API_SERVER + "/api/nostro-insert-into-swiftLowerTable",
                  {
                    trans_no: i?.TRANS_NO,
                    sendRef: i?.DOCUMENT_REF,
                    value_date: formatDate(i?.VALUE_DATE.split("T")[0]),
                    amount: i?.OUST,
                    document_ref: i?.DOCUMENT_REF,
                    batch_no: i?.BATCH_NO,
                    acct_link: i?.ACCT_LINK,
                    username: user,
                  },
                  { headers: headers }
                )
                .then(function (response) {
                  console.log(response, "swift");
                })
                .catch((err) => console.log(err));

              acTransLowerSectionCall();
            } else {
              setCheckedSwiftRow((prev) => ({ ...prev, [index]: false }));
            }
          }}
          id={i?.ACCT_LINK}
          onClick={() => {
            acTransLowerSectionCall();
            swiftLowerSectionCall();
          }}
          checked={checkedSwiftRow[`${index}`]}
        />
      </div>,
    ];
  });

  // SWIFT LOWER TABLE
  swiftLowerTableRows = swiftLowerData?.map((i) => {
    const swiftLowerOutstanding = parseFloat(i?.STATE_AMT261);
    swiftLowerTotal += swiftLowerOutstanding;
    return [
      <div>{i?.ACCT_LINK}</div>,
      <div>{i?.ACCT_OWN_REF261}</div>,
      <div style={{ textAlign: "right" }}>{i?.STATE_AMT261}</div>,
      <div>{formatDate(i?.VALUE_DATE261)}</div>,
      <div>{i?.BATCH_NO}</div>,
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FiXCircle
          color="red"
          size={20}
          onClick={() => {
            acTransLowerSectionCall();
            swiftLowerSectionCall();

            axios
              .post(
                API_SERVER + "/api/nostro-delete-record-swiftLowerTable",
                {
                  username: user,
                  account_ref: i?.ACCT_OWN_REF261,
                },
                { headers: headers }
              )
              .then(function (response) {
                console.log(response, "messi-");
              })
              .catch((err) => console.log(err));

            acTransLowerSectionCall();
            swiftLowerSectionCall();
          }}
        />
      </div>,
    ];
  });

  // THE DIFFERENCES CALCULATION FOR UPPER AND LOWER TABLES HERE
  differenceBetweenACTransAndSwift =
    Math.abs(acTransTotal) - Math.abs(swiftTotal);
  differenceBetweenlowerACTransAndLowerSwift =
    Math.abs(acTransLowerTotal) - Math.abs(swiftLowerTotal);

  return (
    <div style={{ marginBottom: "150px" }}>
      <div>
        {pageLoader ? (
          <div
            style={{
              height: "100vh",
              width: "100%",
              display: "grid",
              placeItems: "center",
              position: "absolute",
            }}
          >
            <div
              style={{
                height: "20vh",
                width: "400px",
                display: "grid",
                placeItems: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
                borderRadius: "10px",
              }}
            >
              <Loader color="blue" type="dots" /> {/* Loading */}
              <div
                style={{
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "500",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPageLoader(false);
                }}
              >
                Cancel
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* ACTION BUTTONS */}
      <div>
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayFetch={"none"}
          displayReject={"none"}
          displayView={"none"}
          onExitClick={handleExitClick}
          onNewClick={() => {
            setNostroAccountValue("");
            setAcTransData([]);
            setSwiftData([]);
            setAcTransLowerData([]);
            setSwiftLowerData([]);
            setStartDateValue("");
            setEndDateValue("");
            setDocumentRef("");
            setCheckedACTransRows(acTransData?.map(() => 0));
          }}
          onRefreshClick={() => {
            acTransLowerSectionCall();
            swiftLowerSectionCall();
          }}
          onOkClick={onNostroOkClick}
          refreshID={"refreshBTN"}
        />
      </div>

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <hr />
      </div>

      {/* USER AND TERMINAL DETAILS */}
      <div>
        <div style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
          <div style={{ width: "30%" }}>
            <InputField
              label={"Terminal ID"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              disabled
              value={ipAddress}
            />
          </div>

          <div style={{ width: "30%" }}>
            <InputField
              label={"Posted By"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              disabled
              value={user}
            />
          </div>
          <div style={{ width: "30%" }}>
            <InputField
              label={"Branch"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              disabled
              value={branch}
            />
          </div>
        </div>

        <div>
          <Header title={"Swift Statements Reconciliation"} headerShade />
        </div>
      </div>

      {/* BODY OF THE NOSTRO STATEMENT */}
      <div
        style={{
          width: "100%",
          display: "flex",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <div style={{ width: "30%" }}>
          <ListOfValue
            label={"Select Account"}
            required
            labelWidth={"30%"}
            inputWidth={"70%"}
            data={nostroAccounts}
            onChange={(value) => {
              Object.keys(checkedACTransRow)?.forEach((i) => {
                setCheckedACTransRow((prev) => ({ ...prev, [i]: false }));
              });

              Object.keys(checkedSwiftRow)?.forEach((i) => {
                setCheckedSwiftRow((prev) => ({ ...prev, [i]: false }));
              });

              setNostroAccountValue(value);
              onAccountChange(value);
            }}
            value={nostroAccountValue}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Document Ref."}
            labelWidth={"30%"}
            inputWidth={"40%"}
            onChange={(e) => setDocumentRef(e.target.value)}
            value={documentRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                filterData();
              }
            }}
          />
        </div>

        <div style={{ width: "40%", display: "flex" }}>
          <div style={{ width: "50%" }}>
            <InputField
              label={"Start Date"}
              type={"date"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              onChange={(e) => setStartDateValue(e.target.value)}
              value={startDateValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // filterData();
                }
              }}
            />
          </div>

          <div style={{ width: "50%" }}>
            <InputField
              label={"End Date"}
              type={"date"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              onChange={(e) => setEndDateValue(e.target.value)}
              value={endDateValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // filterData();
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* UPPER TABLES */}
      <div style={{ display: "flex", width: "100%" }}>
        {/* AC TRANS OUTSTANDING */}
        <div style={{ width: "50%", marginRight: "10px" }}>
          <div style={{ marginBottom: "10px", zoom: "0.82" }}>
            <Header
              headerShade
              title={"Internal Trans Outstanding"}
              // backgroundColor={"#90fca2"}
              // greenShade
            />

            <div
              onMouseOver={acTransLowerSectionCall}
              onMouseLeave={acTransLowerSectionCall}
            >
              <CustomTable
                headers={acTransHeaders}
                data={acTransTableRows}
                load={loading}
                rowsPerPage={10}
                green
              />
            </div>
          </div>
        </div>

        {/* SWIFT STATEMENT OUTSTANDING */}
        <div style={{ width: "50%" }}>
          <div style={{ marginBottom: "10px", zoom: "0.82" }}>
            <Header
              headerShade
              title={"Swift Statement Outstanding"}
              // backgroundColor={"#90fca2"}
              // greenShade
            />

            <div
              onMouseOver={swiftLowerSectionCall}
              onMouseLeave={swiftLowerSectionCall}
            >
              <CustomTable
                headers={swiftHeaders}
                data={swiftTableRows}
                load={loading}
                rowsPerPage={10}
                green
              />
            </div>
          </div>
        </div>
      </div>

      {/* COUNTS, TOTALS AND DIFFERENCES */}
      <div
        style={{
          width: "100%",
          display: "flex",
          padding: "15px",
          borderRadius: "10px",
          // marginBottom: "20px",
          // marginTop: "10px",
        }}
      >
        <div style={{ width: "30%" }}>
          <InputField
            label={"Count"}
            labelWidth={"30%"}
            inputWidth={"30%"}
            textAlign={"right"}
            disabled
            value={countOfAcTrans}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Total"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            textAlign={"right"}
            disabled
            value={formatNumber(acTransTotal)}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Difference"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            labelColor={"red"}
            color={"red"}
            textAlign={"right"}
            disabled
            value={formatNumber(differenceBetweenACTransAndSwift)}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Count"}
            labelWidth={"30%"}
            inputWidth={"30%"}
            textAlign={"right"}
            disabled
            value={countOfSwift}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Total"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            textAlign={"right"}
            disabled
            value={formatNumber(swiftTotal)}
          />
        </div>
      </div>

      {/* LOWER TABLES */}
      <div style={{ display: "flex", width: "100%" }}>
        {/* AC TRANS OUTSTANDING */}
        <div style={{ width: "50%", marginRight: "10px" }}>
          <div
            style={{ marginBottom: "10px", zoom: "0.82" }}
            onMouseOver={acTransLowerSectionCall}
            onMouseLeave={acTransLowerSectionCall}
          >
            <CustomTable
              headers={acLowerTransHeaders}
              data={acTransLowerTableRows}
              load={loading}
              green
            />
          </div>
        </div>

        {/* SWIFT STATEMENT OUTSTANDING */}
        <div style={{ width: "50%" }}>
          <div
            style={{ marginBottom: "5px", zoom: "0.82" }}
            onMouseOver={swiftLowerSectionCall}
            onMouseLeave={swiftLowerSectionCall}
          >
            <CustomTable
              headers={swiftLowerHeaders}
              data={swiftLowerTableRows}
              load={loading}
              green
            />
          </div>
        </div>
      </div>

      {/* COUNTS, TOTALS AND DIFFERENCES - LOWER SECTION */}
      <div
        style={{
          width: "100%",
          display: "flex",
          padding: "15px",
          borderRadius: "10px",
          // marginBottom: "20px",
          // marginTop: "10px",
        }}
      >
        <div style={{ width: "30%" }}>
          <InputField
            label={"Count"}
            labelWidth={"30%"}
            inputWidth={"30%"}
            textAlign={"right"}
            disabled
            value={countOfLowerAcTrans}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Total"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            textAlign={"right"}
            disabled
            value={formatNumber(acTransLowerTotal)}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Difference"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            labelColor={"red"}
            color={"red"}
            textAlign={"right"}
            disabled
            value={formatNumber(differenceBetweenlowerACTransAndLowerSwift)}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Count"}
            labelWidth={"30%"}
            inputWidth={"30%"}
            textAlign={"right"}
            disabled
            value={countOfLowerSwift}
          />
        </div>

        <div style={{ width: "30%" }}>
          <InputField
            label={"Total"}
            labelWidth={"30%"}
            inputWidth={"50%"}
            textAlign={"right"}
            disabled
            value={formatNumber(swiftLowerTotal)}
          />
        </div>
      </div>
    </div>
  );
}

export default NostroStatementOutstanding;
