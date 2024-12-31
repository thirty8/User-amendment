import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import InputField from "../../../../components/others/Fields/InputField";
import Swal from "sweetalert2";
import LienCreation from "./components/lien-creation-modal";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ModalComponent from "../../../../components/others/Modal/modal";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import CustomTable from "../../../../components/others/customtable";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomButtons from "../../../../components/others/CustomButtons";
const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

export default function LienCancellation() {
  const [branch, setBranch] = useState([]);
  const [formData, setFormData] = useState({});
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [filteredData, setFilteredData] = useState([]);

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
    return await axios.post(
      API_SERVER + "/api/get-code-details",
      { code: "BRA", key: "posting" },
      {
        headers,
      }
    );
  }

  const fetchData = async () => {
    const arr = [];
    await axios
      .post(
        API_SERVER + "/api/lien-cancellation",
        {
          fetch_data: "true",
          account_number: formData ? formData?.account_number : "",
          amount: formData ? formData?.amount : "",
          branch_code: formData ? formData?.branch_code : "",
          global_branch_v: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
        },
        { headers }
      )
      .then((response) => {
        if (response?.data?.length > 0) {
          response?.data?.forEach((i) => {
            arr.push([
              i?.acct_link,
              i?.acct_desc,
              i?.lien_number,
              i?.lien_amount,
              formatDate(i?.expiry_date),
              formatDate(i?.effective_date),
              i?.comments,
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonComponent
                  buttonIcon={CustomButtons["next"]?.icon}
                  buttonHeight={"24px"}
                  onClick={() => {
                    setShowModal(true);
                    setRowData(i);
                  }}
                />{" "}
              </div>,
            ]);
          });
        }
      });
    return arr;
  };

  useEffect(() => {
    const runFunc = async () => {
      setLoading(true);
      try {
        const mainRes = await Promise.all([fetchData(), getBranch()]);
        if (mainRes.length > 0) {
          setFilteredData(mainRes[0]);
          setBranch(mainRes[1]?.data);
        }
      } catch (err) {
        console.log("error caught here :" + err);
      }
      setLoading(false);
    };
    runFunc();
  }, []);

  const handleRefresh = () => {
    setFetch(!fetch);
    setFormData({
      account_number: "",
      amount: "",
      branch_code: "",
      account_descrp: "",
    });
  };

  useEffect(() => {
    fetchMyData();
  }, [fetch]);

  useEffect(() => {
    fetchMyData();
  }, [formData?.branch_code]);

  // handleFetch function
  const handleFetch = () => {
    fetchMyData();
  };

  // account name
  const getAccountName = async () => {
    return await axios.post(
      API_SERVER + "/api/lien-cancellation",
      {
        get_account_name: "true",
        account_number: formData ? formData?.account_number : "",
      },
      { headers }
    );
  };

  const fetchMyData = async () => {
    setLoading(true);
    try {
      const mainRes = await Promise.all([fetchData(), getAccountName()]);
      if (mainRes.length > 0) {
        setFilteredData(mainRes[0]);
        setFormData((prev) => ({
          ...prev,
          ["account_descrp"]: mainRes[1]?.data[0]?.acct_desc,
        }));
      } else {
        setFilteredData([]);
        setFormData((prev) => ({
          ...prev,
          ["account_descrp"]: "",
        }));
      }
    } catch (err) {
      console.log("error caught here :" + err);
    } finally {
      setLoading(false);
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
            <div style={{ flex: 1, paddingLeft: "20px" }} className="pt-2">
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{ flex: 0.4 }}>
                  <InputField
                    label={"Account No"}
                    labelWidth={"40%"}
                    inputWidth={"55%"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ["account_number"]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        fetchMyData();
                      }
                    }}
                    value={formData ? formData?.account_number : ""}
                  />
                </div>
                {/* account name   */}
                <div style={{ flex: 0.5, paddingLeft: "10px" }}>
                  <InputField
                    inputWidth={"98.2%"}
                    disabled={true}
                    noMarginRight={true}
                    value={formData ? formData?.account_descrp : ""}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flex: 1 }} className="p-2 mb-2">
            <div style={{ flex: 0.5, paddingLeft: "20px" }} className="pt-2">
              <ListOfValue
                label={"Branch"}
                labelWidth={"31.5%"}
                inputWidth={"44%"}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, ["branch_code"]: value }));
                }}
                value={formData ? formData?.branch_code : ""}
                data={branch}
              />
            </div>

            <div style={{ flex: 0.5 }} className="pt-2">
              <InputField
                label={"Amount"}
                labelWidth={"31.5%"}
                inputWidth={"44%"}
                type={"number"}
                textAlign={"right"}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, ["amount"]: e.target.value }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchMyData();
                  }
                }}
                value={formData ? formData?.amount : ""}
              />
            </div>
          </div>
        </div>
      </div>

      {/* table   */}
      <div>
        <CustomTable
          headers={[
            "Account No",
            "Account Name",
            "Lien Number",
            "Lien Amount",
            "Expiry Date",
            "Effective Date",
            "Comments",
            "Action",
          ]}
          data={filteredData}
          load={loading}
          rowsPerPage={10}
        />
      </div>

      {/* new screen opened when arrow button is clicked    */}
      {showModal && (
        <ModalComponent
          open={showModal}
          closable={false}
          width={"70%"}
          content={
            <LienCreation
              opened={showModal}
              setToggle={setFetch}
              formData={rowData}
              handleClose={() => setShowModal(false)}
            />
          }
        />
      )}
    </div>
  );
}
