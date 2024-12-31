import React, { useState, useEffect } from "react";
import InputField from "../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../../components/others/customtable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import CustomButtons from "../../../../components/others/CustomButtons";
import UntaggedStoppedCheque2 from "./components/untagged-stopped-cheque-modal";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import ModalComponent from "../../../../components/others/Modal/modal";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function UntaggedStoppedCheque() {
  const [openChequeReqScreen, setOpenChequeReqScreen] = useState(false);
  const [branch, setBranch] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stopRef, setStopRef] = useState("");
  const [myObj, setMyObj] = useState({
    account_number: "",
    account_name: "",
    branch_code: "",
  });
  const [fetch, setFetch] = useState(false);

  const handleBtnClick = (stop_ref) => {
    setOpenChequeReqScreen(true);
    setStopRef(stop_ref);
  };
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

  // convert date to yy/mm/dd
  function formatDateToYMD(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  async function getBranch() {
    return await axios.post(
      API_SERVER + "/api/get-code-details",
      { code: "BRA", key: "posting" },
      {
        headers,
      }
    );
  }
  //    fetch data
  useEffect(() => {
    const runFunc = async () => {
      try {
        const mainRes = await Promise.all([fetchData(), getBranch()]);
        if (mainRes.length > 0) {
          setFilteredData(mainRes[0]);
          setBranch(mainRes[1]?.data);
        }
      } catch (err) {
        console.log("error caught here :" + err);
      }
    };
    runFunc();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const arr = [];
    await axios
      .post(
        API_SERVER + "/api/untagged-stopped-cheque",
        {
          fetch_data: "true",
          acct_link: myObj ? myObj?.account_number : "",
          account_name: myObj ? myObj?.account_name : "",
          branch_code: myObj ? myObj.branch_code : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          response?.data?.forEach((i) => {
            arr.push([
              i?.record_id,
              i?.acct_link,
              i?.account_descrp,
              i?.amount_on_cheque,
              i?.cheque_reference_number,
              i?.cheque_reference_number_end,
              formatDate(i?.date_stopped),

              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonComponent
                  buttonIcon={CustomButtons["next"]?.icon}
                  buttonHeight={"24px"}
                  onClick={() => handleBtnClick(i?.stop_ref)}
                />{" "}
              </div>,
            ]);
          });
        }
      });
    setLoading(false);
    return arr;
  };

  // handleRefresh function
  const handleRefresh = () => {
    setFetch(!fetch);
    setMyObj({
      account_number: "",
      account_name: "",
      branch_code: "",
      account_descrp: "",
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetch]);

  useEffect(() => {
    fetchData();
  }, [myObj?.branch_code]);

  // handleFetch function
  const handleFetch = () => {
    fetchData();
    getAccountName();
  };

  // account name
  const getAccountName = async () => {
    await axios
      .post(
        API_SERVER + "/api/untagged-stopped-cheque",
        {
          get_account_name: "true",
          acct_link: myObj ? myObj?.account_number : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          setMyObj((prev) => ({
            ...prev,
            ["account_descrp"]: response?.data[0]?.acct_desc,
          }));
        } else {
          setMyObj((prev) => ({ ...prev, ["account_descrp"]: "" }));
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleKeyAccountNumber = async (e) => {
    if (e.key === "Enter") {
      fetchData();
      getAccountName();
    }
  };

  // account name
  const handleKeyAccountName = async (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  return (
    <div>
      <div className="mt-1 mb-2 pb-1">
        <ActionButtons
          onRefreshClick={handleRefresh}
          onFetchClick={handleFetch}
          displayOk={"none"}
          displayNew={"none"}
          displayDelete={"none"}
          displayView={"none"}
          displayCancel={"none"}
          displayHelp={"none"}
          displayReject={"none"}
          displayAuthorise={"none"}
        />
      </div>

      <div className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white ">
        <div style={{ width: "100%" }} className="wrapper rounded border-2">
          {/* account number and branch   */}
          <div style={{ display: "flex", justifyContent: "space-between" }} className="p-2">
            <div style={{ flex: 0.7, paddingLeft: "20px" }} className="pt-2">
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ flex: 0.4 }}>
                  <InputField
                    label={"Account No."}
                    labelWidth={"25%"}
                    inputWidth={"67%"}
                    onChange={(e) =>
                      setMyObj((prev) => ({
                        ...prev,
                        ["account_number"]: e.target.value,
                      }))
                    }
                    onKeyDown={handleKeyAccountNumber}
                    value={myObj ? myObj?.account_number : ""}
                  />
                </div>
                {/* account name   */}
                <div style={{ flex: 0.6, paddingLeft: "10px" }}>
                  <InputField
                    inputWidth={"80%"}
                    disabled={true}
                    noMarginRight={true}
                    value={myObj ? myObj?.account_descrp : ""}
                  />
                </div>
              </div>
            </div>
            <div style={{ flex: 0.3 }} className="pt-2">
              <ListOfValue
                label={"Branch"}
                labelWidth={"20%"}
                inputWidth={"60%"}
                onChange={(value) => {
                  setMyObj((prev) => ({ ...prev, ["branch_code"]: value }));
                }}
                value={myObj ? myObj?.branch_code : ""}
                data={branch}
              />
            </div>
          </div>

          {/* account name   */}
          <div style={{ display: "flex" }} className="p-2">
            <div style={{ flex: 0.7, paddingLeft: "20px" }} className="pb-2">
              <InputField
                label={"Account Name"}
                labelWidth={"9.8%"}
                inputWidth={"76.2%"}
                onChange={(e) =>
                  setMyObj((prev) => ({
                    ...prev,
                    ["account_name"]: e.target.value,
                  }))
                }
                value={myObj ? myObj?.account_name : ""}
                onKeyDown={handleKeyAccountName}
              />
            </div>
          </div>
        </div>

        <div></div>
      </div>

      {/* table   */}
      <div>
        <CustomTable
          headers={[
            "Record ID",
            "Account Number",
            "Account Name",
            "Amount",
            "Cheque Stop",
            "Range",
            "Date Stopped",
            "Action",
          ]}
          data={filteredData}
          load={loading}
          rowsPerPage={10}
        />
      </div>

      {/* new screen opened when arrow button is clicked    */}
      {openChequeReqScreen && (
        <ModalComponent
          closable={false}
          width={"70%"}
          open={openChequeReqScreen}
          content={
            <UntaggedStoppedCheque2
              stopRef={stopRef}
              formatDateToYMD={formatDateToYMD}
              handleClose={() => setOpenChequeReqScreen(false)}
            />
          }
        />
      )}
    </div>
  );
}

export default UntaggedStoppedCheque;
