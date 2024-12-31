import React, { useState, useEffect } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import CustomTable from "../../../../components/others/customtable";
import InputField from "../../../../components/others/Fields/InputField";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../components/others/CustomButtons";
import PrintStatementModal from "./components/print-account-statement-modal";
import Swal from "sweetalert2";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const PrintAccountStatement = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [allData, setAllData] = useState([]);
  const [checkedObj, setCheckedObj] = useState({});
  const [fetch, setFetch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [load, setLoading] = useState(false);
  const [myObj, setMyObj] = useState({});

  const fetchData = async () => {
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/print-account-statement",
        {
          fetch: "true",
          branch_code: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          account_number: accountNumber,
        },
        { headers }
      )
      .then((response) => {
        const arr = [];
        if (response?.data.length > 0) {
          setLoading(false);
          response?.data.map((i, key) => {
            const {
              requisition_no,
              acct_link,
              account_desc,
              posting_date,
              posted_by,
              approved_by,
            } = i;
            arr.push([
              <div className="flex space-x-3 justify-center items-center">
                <ButtonComponent
                  label={"OK"}
                  buttonWidth={"30px"}
                  onClick={() => {
                    if (checkedObj[key] === true) {
                      handleOk(requisition_no);
                      setCheckedObj((prev) => ({ ...prev, [key]: false }));
                    }
                  }}
                />
                <input
                  type={"checkbox"}
                  key={key}
                  onChange={(e) => {
                    const newValue = e.currentTarget.checked;
                    setCheckedObj((prev) => ({ ...prev, [key]: newValue }));
                  }}
                  checked={checkedObj[key]}
                />
              </div>,
              requisition_no,
              acct_link,
              account_desc,
              formatDate(posting_date),
              posted_by,
              approved_by,
              <div className="flex justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["next"]?.icon}
                  onClick={() => {
                    setMyObj((prev) => ({
                      ...prev,
                      requisition_no,
                      acct_link,
                    }));
                    setShowModal(!showModal);
                  }}
                />
              </div>,
            ]);
          });
        }
        setAllData(arr);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`error here : ${err}`);
        setLoading(false);
        // setLoading(false);
      });
  };

  //   on page load
  useEffect(() => {
    fetchData();
  }, []);

  //   onchange here
  useEffect(() => {
    fetchData();
  }, [checkedObj]);

  //   refresh to reduce count after clicking ok button
  useEffect(() => {
    fetchData();
  }, [fetch]);

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

  // handling okay function in the data table
  const handleOk = async (value) => {
    await axios
      .post(
        API_SERVER + "/api/print-account-statement",
        {
          procedureType: "OK",
          batch_number: value,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data.msg_code === 1) {
          Swal.fire({
            text: response.data.msg_v,
            icon: "success",
            timer: 1500,
          });
        } else {
          console.error(response.data, "error");
        }
      })
      .catch((err) => console.error(`error here : ${err}`));

    // fetch here
    setFetch(!fetch);
  };

  //   refresh
  const refresh = async () => {
    setAccountNumber("");
    setLoading(true);
    await axios
      .post(
        API_SERVER + "/api/print-account-statement",
        {
          fetch: "true",
          branch_code: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          account_number: "",
        },
        { headers }
      )
      .then((response) => {
        const arr = [];
        if (response?.data.length > 0) {
          setLoading(false);

          response?.data.map((i, key) => {
            const {
              requisition_no,
              acct_link,
              account_desc,
              posting_date,
              posted_by,
              approved_by,
            } = i;
            arr.push([
              <div className="flex space-x-3 justify-center items-center">
                <ButtonComponent
                  label={"OK"}
                  buttonWidth={"30px"}
                  onClick={() => {
                    if (checkedObj[key] === true) {
                      handleOk(requisition_no);
                      setCheckedObj((prev) => ({ ...prev, [key]: false }));
                    }
                  }}
                />
                <input
                  type={"checkbox"}
                  key={key}
                  onChange={(e) => {
                    const newValue = e.currentTarget.checked;
                    setCheckedObj((prev) => ({ ...prev, [key]: newValue }));
                  }}
                  checked={checkedObj[key]}
                />
              </div>,
              requisition_no,
              acct_link,
              account_desc,
              formatDate(posting_date),
              posted_by,
              approved_by,
              <div className="flex justify-center">
                <ButtonComponent
                  buttonIcon={CustomButtons["next"]?.icon}
                  onClick={() => {
                    setMyObj((prev) => ({
                      ...prev,
                      requisition_no,
                      acct_link,
                    }));
                    setShowModal(!showModal);
                  }}
                />
              </div>,
            ]);
          });
        }
        setAllData(arr);
      })
      .catch((err) => {
        setLoading(false);

        console.error(`error here : ${err}`);
      })
      .finally(() => setLoading(false));
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
          onFetchClick={fetchData}
          onRefreshClick={refresh}
        />

        <hr className="mt-3" />

        <div className="flex items-center justify-center mb-3 p-3 mt-3">
          <InputField
            label={"Account Number"}
            labelWidth={"35%"}
            inputWidth={"30%"}
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchData();
              }
            }}
          />
        </div>

        <hr />

        {/* table  */}
        <div className="mt-4">
          <CustomTable
            headers={[
              "Mark Printed",
              "Requistion No",
              "Account No",
              "Account Name",
              "Request Date",
              "Posted By",
              "Approved By",
              "Action",
            ]}
            data={allData}
            rowsPerPage={10}
            load={load}
          />
        </div>

        {/* showModal */}
        {showModal && (
          <PrintStatementModal
            open={showModal}
            handleClose={() => setShowModal(false)}
            batchNumber={myObj?.requisition_no}
            accountNumber={myObj?.acct_link}
          />
        )}
      </div>
    </div>
  );
};

export default PrintAccountStatement;
