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

export default function ChequeBookEnquiryNumber() {
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

  console.log(formatDate("2024-05-24"), "derrick");

  const fetchData = async () => {
    setLoading(true);
    const arr = [];
    await axios
      .post(
        API_SERVER + "/api/cheque-book-enquiry",
        {
          cheque_number_enquiry_data: "true",
          cheque_no: myObj ? myObj?.cheque_no : "",
          start_date: "",
          end_date: "",
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
      cheque_no: "",
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetch]);

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
        <div className="w-[50%] p-5">
          <p className="w-full">
            <InputField
              label={"Cheque No"}
              labelWidth={"30%"}
              inputWidth={"40%"}
              type={"number"}
              onChange={(e) => handleOnChange("cheque_no", e.target.value)}
              value={myObj ? myObj?.cheque_no : ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchData();
                }
              }}
            />
          </p>
        </div>
      </div>

      {/* buttons  */}
      <div className="flex justify-end space-x-3 mt-3">
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
            "Branch",
            "No Of Pages",
            "No of Books",
            "Start No",
            "End Page",
            "Posted By",
          ]}
          load={loading}
          data={data}
          rowsPerPage={10}
        />
      </div>
    </div>
  );
}
