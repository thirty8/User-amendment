import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import CustomTable from "../../../../components/others/customtable";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import CustomButtons from "../../../../components/others/CustomButtons";
import ChequeBookIssuance2 from "./components/cheque-book-issuance-modal";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const ChequeBookIssuance = () => {
  const [myObj, setMyObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState({});
  const [openChequeReqScreen, setOpenChequeReqScreen] = useState(false);
  const [fetch, setFetch] = useState(false);

  const handleChange = (key, value) => {
    setMyObj((prev) => ({ ...prev, [key]: value }));
  };

  const handleBtnClick = (rowData) => {
    setOpenChequeReqScreen(true);
    setRowData({ ...rowData });
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

  const fetchData = async () => {
    setLoading(true);
    const arr = [];
    await axios
      .post(
        API_SERVER + "/api/cheque-book-issuance",
        {
          get_details: "true",
          // acct_link: myObj ? myObj?.account_number : "",
          acct_link: myObj ? myObj?.acct_link : "",
          account_name: myObj ? myObj?.account_name : "",
          global_bra: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
          // global_bra: "012",
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
              // branch_code,
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
    setData(arr);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // handleRefresh function
  const handleRefresh = () => {
    setFetch(!fetch);
    setMyObj({
      acct_link: "",
      account_name: "",
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetch]);

  return (
    <div>
      <div>
        <div className="w-full flex justify-center scale-[0.98] cursor-pointer mb-2">
          {/* action buttons  */}
          <div>
            <ActionButtons
              displayAuthorise={"none"}
              displayCancel={"none"}
              displayReject={"none"}
              displayView={"none"}
              displayHelp={"none"}
              displayDelete={"none"}
              displayNew={"none"}
              displayOk={"none"}
              onFetchClick={fetchData}
              onRefreshClick={handleRefresh}
            />
          </div>
        </div>

        <div className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white ">
          <div style={{ width: "100%" }} className="wrapper rounded border-2">
            {/* account number and branch   */}
            <div style={{ display: "flex", justifyContent: "space-between" }} className="p-5">
              <div style={{ flex: 0.4, paddingLeft: "20px" }}>
                <InputField
                  label={"Account No"}
                  labelWidth={"22%"}
                  inputWidth={"50%"}
                  type={"number"}
                  onChange={(e) => handleChange("acct_link", e.target.value)}
                  value={myObj ? myObj?.acct_link : ""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchData();
                    }
                  }}
                />
              </div>
              <div style={{ flex: 0.53 }}>
                <InputField
                  label={"Account Name"}
                  labelWidth={"17.5%"}
                  inputWidth={"70%"}
                  onChange={(e) => handleChange("account_name", e.target.value?.toUpperCase())}
                  value={myObj ? myObj?.account_name : ""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchData();
                    }
                  }}
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
              "Action",
            ]}
            data={data}
            load={loading}
            rowsPerPage={10}
          />
        </div>

        {/* new screen opened when arrow button is clicked    */}
        {openChequeReqScreen && (
          <ChequeBookIssuance2
            opened={openChequeReqScreen}
            handleClose={() => setOpenChequeReqScreen(false)}
            setToggle={setFetch}
            rowData={rowData}
          />
        )}
      </div>
    </div>
  );
};

export default ChequeBookIssuance;
