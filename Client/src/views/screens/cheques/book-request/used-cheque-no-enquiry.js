import React, { useEffect, useState } from "react";
import InputField from "../../../../components/others/Fields/InputField";
import CustomTable from "../../../../components/others/customtable";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import CustomButtons from "../../../../components/others/CustomButtons";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const UsedChequeNoEnquiry = () => {
  const [myObj, setMyObj] = useState({ acct_link: "", cheque_no: "" });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);

  const handleChange = (key, value) => {
    setMyObj((prev) => ({ ...prev, [key]: value }));
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
        API_SERVER + "/api/used-cheque-no-enquiry",
        {
          fetch_data: "true",
          cheque_no: myObj?.cheque_no || "",
          acct_link: myObj?.acct_link || "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          response?.data?.map((i) => {
            arr.push([
              i?.acct_link,
              i?.cheque_number,
              i?.trans_no,
              i?.status_flag,
              formatDate(i?.date_presented),
              i?.time_presented,
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
      cheque_no: "",
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetch]);

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

  return (
    <div>
      <div className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white">
        <div style={{ width: "100%" }} className="wrapper rounded border-2 p-5">
          {/* account number and cheque no   */}
          <div style={{ display: "flex", justifyContent: "space-evenly" }} className="p-5">
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
            <div style={{ flex: 0.4, paddingLeft: "20px" }}>
              <InputField
                label={"Cheque No"}
                labelWidth={"22%"}
                inputWidth={"50%"}
                type={"number"}
                onChange={(e) => handleChange("cheque_no", e.target.value)}
                value={myObj ? myObj?.cheque_no : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchData();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* buttons  */}
      <div className="flex justify-end space-x-3 mt-3 mb-3">
        <ButtonComponent
          label={"Fetch"}
          buttonIcon={CustomButtons["fetch"]?.icon}
          buttonBackgroundColor={CustomButtons["fetch"]?.bgColor}
          buttonHeight={"30px"}
          buttonWidth={"80px"}
          onClick={fetchData}
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
      <div>
        <CustomTable
          headers={[
            "Account Number",
            "Cheque No",
            "Trans No",
            "Status Flag",
            "Date Presented",
            "Time Presented",
          ]}
          data={data}
          load={loading}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
};

export default UsedChequeNoEnquiry;
