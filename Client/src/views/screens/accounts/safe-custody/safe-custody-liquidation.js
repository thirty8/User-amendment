import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import CustomTable from "../../../../components/others/customtable";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import Swal from "sweetalert2";
import CustomButtons from "../../../../components/others/CustomButtons";
import SafeCustodyLiquidation2 from "./components/safe-custody-liquidation-modal";

const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

const SafeCustodyLiquidation = () => {
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
    const userInfo = JSON.parse(localStorage?.getItem("userInfo"));
    // console.log(`yooo    ${rowData?.posted_by} === ${userInfo?.id}`);
    // console.log(`yooo    ${rowData?.posted_by?.includes("UNIONADMIN")}`);

    // if (rowData?.posted_by === userInfo?.id) {
    if (rowData?.posted_by?.includes(userInfo?.id)) {
      axios
        .post(
          API_SERVER + "/api/get-error-message",
          { code: "01337" },
          { headers }
        )
        .then((response) => {
          if (response?.data) {
            Swal.fire({
              text: response?.data,
              icon: "error",
            }).then((result) => {
              if (result) {
              }
            });
          }
        })
        .catch((err) => {
          if (err) {
            console.log("error here:" + err);
          }
        });
    } else {
      // setSweetAlertConfirmed(true);
      setOpenChequeReqScreen(true);
      setRowData({ ...rowData });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const arr = [];
    await axios
      .post(
        API_SERVER + "/api/safe-custody-liquidation",
        {
          fetch_data: "true",
          acct_link: myObj ? myObj?.acct_link : "",
          requisition_no: myObj ? myObj?.requisition_no : "",
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
              i?.posted_by,
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ButtonComponent
                  buttonIcon={CustomButtons["next"]?.icon}
                  buttonHeight={"24px"}
                  onClick={() => handleBtnClick(i)}
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
      requisition_no: "",
    });
  };
  useEffect(() => {
    fetchData();
  }, [fetch]);

  console.log(myObj, "here");

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
            <div
              style={{ display: "flex", justifyContent: "space-evenly" }}
              className="p-5"
            >
              <div style={{ flex: 0.4, paddingLeft: "20px" }}>
                <InputField
                  label={"Requisition No"}
                  labelWidth={"22%"}
                  inputWidth={"50%"}
                  type={"number"}
                  onChange={(e) =>
                    handleChange("requisition_no", e.target.value)
                  }
                  value={myObj ? myObj?.requisition_no : ""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchData();
                    }
                  }}
                />
              </div>
              <div style={{ flex: 0.4 }}>
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
            </div>
          </div>
        </div>

        {/* table   */}
        <div>
          <CustomTable
            headers={[
              // "#",
              "Requisition No",
              "Account Number",
              "Account Name",
              "Posted By",
              "Action",
            ]}
            data={data}
            load={loading}
            rowsPerPage={10}
          />
        </div>

        {/* new screen opened when arrow button is clicked    */}
        {openChequeReqScreen && (
          <SafeCustodyLiquidation2
            opened={openChequeReqScreen}
            handleClose={() => setOpenChequeReqScreen(false)}
            rowData={rowData}
          />
        )}
      </div>
    </div>
  );
};

export default SafeCustodyLiquidation;
