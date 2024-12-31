import React, { useState, useEffect } from "react";
import InputField from "../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../../components/others/customtable";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import CustomButtons from "../../../../components/others/CustomButtons";
import ChequeBookMaintenance2 from "./components/cheque-book-maintenance-modal";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ChequeBookMaintenance() {
  const [openChequeReqScreen, setOpenChequeReqScreen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [branch, setBranch] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myObj, setMyObj] = useState({
    account_number: "",
    account_name: "",
    branch_code: "",
  });
  const [fetch, setFetch] = useState(false);

  const generateSequence = async (rowData) => {
    try {
      await axios
        .post(
          API_SERVER + "/api/cheque-book-maintenance",
          {
            generate_sequence: "true",
            request_no_v: rowData?.requisition_no,
            acct_link: rowData?.acct_link,
            num_of_books: parseInt(rowData?.number_of_books),
            global_username: JSON.parse(localStorage.getItem("userInfo"))?.id,
          },
          { headers }
        )
        .then((res) => {
          console.log(res, "response here");
          if (res?.data?.length > 0) {
            const res_code = res?.data[0]?.RESPONSE_CODE;
            // const res_mess = res?.data[0]?.RESPONSE_MESS;
            if (res_code === "000") {
              setOpenChequeReqScreen(true);
              setRowData({ ...rowData });
            }
          }
        });
    } catch (err) {
      console.log(`error generating sequence : ${err}`);
    }
  };
  const handleBtnClick = async (rowData) => {
    // const handleBtnClick = async(rowData) => {
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // if(userInfo?.id ===rowData?.posted_by ){
    //    axios
    //   .post(API_SERVER + "/api/get-error-message", { code: error_code }, { headers })
    //   .then((response) => {
    //     if (response?.data?.length > 0) {
    //       const mess = response?.data;
    //       Swal.fire({
    //         text: mess,
    //         icon: "error",
    //       }).then(() => {
    //         const input = document.getElementById(field);
    //         setTimeout(() => {
    //           input?.focus();
    //         }, 300);
    //       });
    //     }
    //   });

    // }

    await generateSequence(rowData);
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
  async function getBranch() {
    await axios
      .post(
        API_SERVER + "/api/get-code-details",
        { code: "BRA" },
        {
          headers,
        }
      )
      .then((response) => {
        if (response.data?.length > 0) {
          setBranch(response?.data);
        }
      })
      .catch((err) => console.log("error here in lov :" + err));
  }
  //    fetch data
  useEffect(() => {
    fetchData();
    getBranch();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const arr = [];
    await axios
      .post(
        API_SERVER + "/api/cheque-book-maintenance",
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
          response?.data?.map((item) => {
            const {
              requisition_no,
              acct_link,
              account_name,
              leaves_no,
              requisition_date,
              posted_by,
              number_of_books,
              end_page,
              branch_code,
            } = item;

            arr.push([
              requisition_no,
              acct_link,
              account_name,
              leaves_no,
              formatDate(requisition_date),
              posted_by,
              number_of_books,
              end_page,
              branch_code,
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonComponent
                  buttonIcon={CustomButtons["next"]?.icon}
                  buttonHeight={"24px"}
                  onClick={() => handleBtnClick(item)}
                />{" "}
              </div>,
            ]);
          });
        }
      });
    setLoading(false);
    setFilteredData(arr);
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
        API_SERVER + "/api/cheque-book-maintenance",
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
            // "#",
            "Requisition No",
            "Account Number",
            "Account Name",
            "Leaves No",
            "Requisition Date",
            "Posted By",
            "No Of Books",
            "End Page",
            "Branch",
            "Action",
          ]}
          data={filteredData}
          load={loading}
          rowsPerPage={10}
        />
      </div>

      {/* new screen opened when arrow button is clicked    */}
      {openChequeReqScreen && (
        <ChequeBookMaintenance2
          opened={openChequeReqScreen}
          handleClose={() => setOpenChequeReqScreen(false)}
          setToggle={setFetch}
          rowData={rowData}
        />
      )}
    </div>
  );
}

export default ChequeBookMaintenance;
