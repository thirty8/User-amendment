import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../components/others/customtable";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import Swal from "sweetalert2";
import { Modal } from "@mantine/core";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../../components/others/CustomButtons";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

export default function ChequeBookEnquiryIssuance() {
  const [data, setMyData] = useState([]);
  const [myObj, setMyObj] = useState({});
  const [branch, setBranch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);

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

  // these api's fetch the same from the cheque enquiry requistion and it uses the same filters so its okay
  async function getBranch() {
    await axios
      .post(API_SERVER + "/api/cheque-book-enquiry", { get_branch_lov: "true" }, { headers })
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
        API_SERVER + "/api/cheque-book-enquiry",
        {
          issuance_data: "true",
          acct_link: myObj ? myObj?.account_number : "",
          // posted_by: myObj ? myObj?.posted_by : "",
          batch_number: myObj ? myObj?.batch_number : "",
          branch_code: myObj ? myObj.branch_code : "",
          start_date: myObj ? formatDate(myObj?.start_date) : "",
          end_date: myObj ? formatDate(myObj?.end_date) : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          response?.data?.map((i) => {
            arr.push([
              i?.requisition_no,
              i?.acct_link,
              i?.account_descrp,
              formatDate(i?.requisition_date),
              formatDate(i?.date_of_issue),
              i?.branch_desc,
              i?.leaves_no,
              i?.number_of_books,
              i?.start_no,
              i?.end_page,
              i?.posted_by,
            ]);
          });
        }
      });
    setLoading(false);
    setMyData(arr);
  };

  const handleRefresh = () => {
    setFetch(!fetch);
    setMyObj({
      account_number: "",
      start_date: "",
      end_date: "",
      branch_code: "",
      batch_number: "",
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetch]);

  const fetchData2 = async (value) => {
    setLoading(true);
    const arr = [];
    await axios
      .post(
        API_SERVER + "/api/cheque-book-enquiry",
        {
          requisition_data: "true",
          acct_link: myObj ? myObj?.account_number : "",
          // posted_by: myObj ? myObj?.posted_by : "",
          batch_number: myObj ? myObj?.batch_number : "",
          branch_code: value ? value : "",
          start_date: myObj ? formatDate(myObj?.start_date) : "",
          end_date: myObj ? formatDate(myObj?.end_date) : "",
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          response?.data?.map((i) => {
            arr.push([
              i?.requisition_no,
              i?.acct_link,
              i?.account_descrp,
              formatDate(i?.requisition_date),
              i?.branch_desc,
              i?.leaves_no,
              i?.number_of_books,
              i?.posted_by,
            ]);
          });
        }
      });
    setLoading(false);
    setMyData(arr);
  };

  const handleOnChange = (key, value) => {
    setMyObj((prev) => ({ ...prev, [key]: value }));
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

  return (
    <div>
      <div className="w-full flex justify-center border rounded p-4">
        <div className="w-full space-y-5">
          <div className="w-full flex justify-between">
            <p className="w-[50%]">
              <InputField
                label={"Account No"}
                labelWidth={"30%"}
                inputWidth={"40%"}
                onChange={(e) => handleOnChange("account_number", e.target.value)}
                value={myObj ? myObj?.account_number : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchData();
                  }
                }}
              />
            </p>
            <p className="w-[50%]">
              <InputField
                label={"Requisition No"}
                labelWidth={"30%"}
                inputWidth={"40%"}
                onChange={(e) => handleOnChange("batch_number", e.target.value)}
                value={myObj ? myObj?.batch_number : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchData();
                  }
                }}
              />
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="w-[50%]">
              <InputField
                label={"Start Date"}
                labelWidth={"30%"}
                inputWidth={"40%"}
                type={"date"}
                onChange={(e) => handleOnChange("start_date", e.target.value)}
                value={myObj ? myObj?.start_date : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchData();
                  }
                }}
              />
            </p>
            <p className="w-[50%]">
              <InputField
                label={"End Date"}
                labelWidth={"30%"}
                inputWidth={"40%"}
                type={"date"}
                onChange={(e) => handleOnChange("end_date", e.target.value)}
                value={myObj ? myObj?.end_date : ""}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchData();
                  }
                }}
              />
            </p>
          </div>
          <div className="w-full flex justify-between">
            <p className="w-[50%]">
              <ListOfValue
                label={"Branch Code"}
                labelWidth={"30%"}
                inputWidth={"40%"}
                onChange={(value) => {
                  handleOnChange("branch_code", value);
                  fetchData2(value);
                }}
                data={branch}
                value={myObj ? myObj?.branch_code : ""}
              />
            </p>
            <p className="w-[50%] invisible">
              <InputField label={"Requisition No"} labelWidth={"30%"} inputWidth={"40%"} />
            </p>
          </div>
        </div>
      </div>

      {/* buttons  */}
      <div className="flex justify-end space-x-3 mt-3">
        <ButtonComponent
          label={"Print"}
          buttonIcon={CustomButtons["print"]?.icon}
          buttonBackgroundColor={CustomButtons["print"]?.bgColor}
          buttonHeight={"30px"}
          buttonWidth={"80px"}
        />
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

      {/* table  */}
      <div className="mt-4">
        <CustomTable
          headers={[
            "Req No",
            "Account No",
            "Account Name",
            "Req Issued",
            "Date Issued",
            "Branch",
            "No Of Pages",
            "No of Books",
            "Start No",
            "End Page",
            "Posted By",
          ]}
          load={loading}
          data={data}
          rowsPerPage={9}
        />
      </div>
    </div>
  );
}
