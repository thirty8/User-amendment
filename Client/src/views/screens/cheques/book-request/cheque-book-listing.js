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
import TabsComponent from "../../../../components/others/tab-component/tab-component";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function ChequeBookMaintenance() {
  const [myObj, setMyObj] = useState({
    account_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  // format amount
  function formatNumber(num) {
    if (num === undefined || num === " " || isNaN(num) || num === ".00") {
      return "";
    } else {
      const numberString = num?.toString();
      const decimalIndex = numberString?.indexOf(".");

      if (decimalIndex === -1) {
        // Number has no decimal places
        const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ".00";
        return formatted;
      } else {
        // Number has decimal places, format the whole number
        const integerPart = numberString?.substr(0, decimalIndex);
        const decimalPart = numberString?.substr(decimalIndex);
        const formattedInteger = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedInteger + decimalPart;
      }
    }
  }

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

  // fetch main data
  const fetchData = async () => {
    return await axios.post(
      API_SERVER + "/api/cheque-book-listing",
      {
        fetch_data: "true",
        acct_link: myObj ? myObj?.account_number : "",
      },
      { headers }
    );
  };
  // fetch used cheque
  const fetchUsedCheque = async () => {
    return await axios.post(
      API_SERVER + "/api/cheque-book-listing",
      {
        fetch_used_cheque_data: "true",
        acct_link: myObj ? myObj?.account_number : "",
      },
      { headers }
    );
  };
  // fetch stopped cheque
  const fetchStoppedCheque = async () => {
    return axios.post(
      API_SERVER + "/api/cheque-book-listing",
      {
        fetch_stopped_cheque_data: "true",
        acct_link: myObj ? myObj?.account_number : "",
      },
      { headers }
    );
  };

  // account name
  const getAccountName = async () => {
    return await axios.post(
      API_SERVER + "/api/cheque-book-maintenance",
      {
        get_account_name: "true",
        acct_link: myObj ? myObj?.account_number : "",
      },
      { headers }
    );
  };
  //    fetch data
  useEffect(() => {
    const arr = [];
    const arr2 = [];
    const arr3 = [];
    async function gh() {
      setLoading(true);
      await Promise.all([fetchData(), fetchUsedCheque(), fetchStoppedCheque()]).then((response) => {
        response[0]?.data?.map((i) => {
          arr.push([
            i?.requisition_no,
            formatDate(i?.requisition_date),
            i?.leaves_no,
            i?.start_no,
            i?.end_page,
            i?.branch,
            i?.status,
            i?.posted_by,
          ]);
        });

        response[1]?.data?.map((i) => {
          arr2.push([i?.cheque_number, formatDate(i?.date_presented), i?.trans_no]);
        });

        response[2]?.data?.map((i) => {
          arr3.push([
            i?.cheque_no,
            formatDate(i?.date_stopped),
            formatNumber(i?.amount),
            i?.branch_used,
          ]);
        });

        setData1(arr);
        setData2(arr2);
        setData3(arr3);
      });
      setLoading(false);
    }
    gh();
  }, []);

  // handleRefresh function
  const handleRefresh = () => {
    setFetch(!fetch);
    setMyObj({
      account_number: "",
      account_descrp: "",
    });
  };

  useEffect(() => {
    const arr = [];
    const arr2 = [];
    const arr3 = [];
    async function gh() {
      setLoading(true);
      await Promise.all([fetchData(), fetchUsedCheque(), fetchStoppedCheque()]).then((response) => {
        response[0]?.data?.map((i) => {
          arr.push([
            i?.requisition_no,
            formatDate(i?.requisition_date),
            i?.leaves_no,
            i?.start_no,
            i?.end_page,
            i?.branch,
            i?.status,
            i?.posted_by,
          ]);
        });

        response[1]?.data?.map((i) => {
          arr2.push([i?.cheque_number, formatDate(i?.date_presented), i?.trans_no]);
        });

        response[2]?.data?.map((i) => {
          arr3.push([
            i?.cheque_no,
            formatDate(i?.date_stopped),
            formatNumber(i?.amount),
            i?.branch_used,
          ]);
        });

        setData1(arr);
        setData2(arr2);
        setData3(arr3);
      });
      setLoading(false);
    }
    gh();
  }, [fetch]);

  // handleFetch function
  const handleFetch = () => {
    const arr = [];
    const arr2 = [];
    const arr3 = [];
    async function gh() {
      setLoading(true);
      await Promise.all([
        fetchData(),
        fetchUsedCheque(),
        fetchStoppedCheque(),
        getAccountName(),
      ]).then((response) => {
        response[0]?.data?.map((i) => {
          arr.push([
            i?.requisition_no,
            formatDate(i?.requisition_date),
            i?.leaves_no,
            i?.start_no,
            i?.end_page,
            i?.branch,
            i?.status,
            i?.posted_by,
          ]);
        });

        response[1]?.data?.map((i) => {
          arr2.push([i?.cheque_number, formatDate(i?.date_presented), i?.trans_no]);
        });

        response[2]?.data?.map((i) => {
          arr3.push([
            i?.cheque_no,
            formatDate(i?.date_stopped),
            formatNumber(i?.amount),
            i?.branch_used,
          ]);
        });

        setData1(arr);
        setData2(arr2);
        setData3(arr3);
        setMyObj((prev) => ({
          ...prev,
          ["account_descrp"]: response[3]?.data[0]?.acct_desc,
        }));
      });
      setLoading(false);
    }
    gh();
  };

  // account number on key down
  const handleKeyAccountNumber = async (e) => {
    if (e.key === "Enter") {
      handleFetch();
    }
  };

  // close form
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

  //   USED CHEQUES COMPONENT
  function UsedChequeComponent({ data }) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-[60%]">
          <CustomTable
            headers={["Cheque No", "Date Used", "Trans No"]}
            data={data}
            load={loading}
            rowsPerPage={4}
          />
        </div>
      </div>
    );
  }

  //   STOPPED CHEQUES COMPONENT

  function StoppedChequeComponent({ data }) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-[60%]">
          <CustomTable
            headers={["Cheque No", "Date Stopped", "Amount", "Branch Stopped"]}
            data={data}
            load={loading}
            rowsPerPage={4}
            style={{ columnAlignRight: [3] }}
          />
        </div>
      </div>
    );
  }

  // data for items
  const tabsData = [
    {
      value: "default",
      label: "USED CHEQUES",
      component: <UsedChequeComponent data={data2} />,
    },
    {
      value: "tab-2",
      label: "STOPPED CHEQUES",
      component: <StoppedChequeComponent data={data3} />,
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-center border rounded p-5">
        <div className="w-[80%] flex">
          <div className="w-[40%]">
            <InputField
              label={"Account No"}
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
          <div className="w-[60%]">
            <InputField
              inputWidth={"80%"}
              disabled={true}
              noMarginRight={true}
              value={myObj ? myObj?.account_descrp : ""}
            />
          </div>
        </div>
      </div>
      {/* buttons  */}
      <div className="flex justify-end space-x-3 mt-4">
        <ButtonComponent
          label={"Fetch"}
          buttonIcon={CustomButtons["fetch"]?.icon}
          buttonBackgroundColor={CustomButtons["fetch"]?.bgColor}
          buttonHeight={"30px"}
          buttonWidth={"80px"}
          onClick={handleFetch}
        />
        <ButtonComponent
          label={"Refresh"}
          buttonIcon={CustomButtons["refresh"]?.icon}
          buttonBackgroundColor={CustomButtons["refresh"]?.bgColor}
          buttonHeight={"30px"}
          buttonWidth={"100px"}
          onClick={handleRefresh}
        />
        <ButtonComponent
          label={"Exit"}
          buttonIcon={CustomButtons["exit"]?.icon}
          buttonBackgroundColor={CustomButtons["exit"]?.bgColor}
          buttonHeight={"30px"}
          buttonWidth={"70px"}
          onClick={handleExitClick}
        />
      </div>
      {/* table   */}
      <div className="mt-4">
        <CustomTable
          headers={[
            "Requisition No",
            "Requisition Date",
            "Leaves No",
            "Start No",
            "End Page",
            "Branch",
            "Status",
            "Posted By",
          ]}
          data={data1}
          load={loading}
          rowsPerPage={5}
        />
      </div>

      <div className="mt-3">
        <TabsComponent tabsData={tabsData} />
      </div>
    </div>
  );
}

export default ChequeBookMaintenance;
