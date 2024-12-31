import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import Header from "../../../../components/others/Header/Header";
import CustomTable from "../../control-setups/components/CustomTable";
import { API_SERVER } from "./../../../../config/constant";
import axios from "axios";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import { FiChevronRight } from "react-icons/fi";
import { Modal, ScrollArea } from "@mantine/core";
import { AiFillEye } from "react-icons/ai";
import ArrearsCustomerFeedback from "./components/arrears-customer-feedback";
import NewLoanCollectionDetails from "./components/new-loan-collection-details.jsx";

function ArrearsManagement() {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // STATES
  const [loading, setLoading] = useState(true);
  const [showLoanCollectionDetail, setShowLoanCollectionDetail] =
    useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [branches, setBranches] = useState([]);
  const [branchValue, setBranchValue] = useState("");
  const [showArrearsFeedback, setshowArrearsFeedback] = useState(false);
  const [customersInArrears, setCustomersInArrears] = useState([]);
  const [formData, setFormData] = useState({
    account_descrp: "",
    principal_account: "",
  });
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  const userName = userInfo?.id;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const arrMgmtHeaders = [
    <div style={{ textAlign: "left" }}>Principal A/C</div>,
    <div style={{ textAlign: "left" }}>Customer Name</div>,
    <div style={{ textAlign: "left" }}>Branch Name</div>,
    // <div>Arr. Days</div>,
    <div style={{ textAlign: "right" }}>Principal in Arrears</div>,
    <div style={{ textAlign: "right" }}>Interest in Arrears</div>,
    <div style={{ textAlign: "right" }}>Total Arrears Amount </div>,
    <div style={{ textAlign: "right" }}>Days in Arrears </div>,
    <div>Action</div>,
  ];

  //   FUNCTIONS
  // HANDLE ON CLICK OF EXIT BUTTON
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

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  const getCustomersInArrears = () => {
    axios
      .post(
        API_SERVER + "/api/get-customers-in-arrears",
        {
          account_descrp: formData?.account_descrp?.trim(),
          principal_account: formData?.principal_account?.trim(),
          br_code: branchValue,
          username: userName,
        },
        { headers }
      )
      .then(function (response) {
        console.log(response.data, "PPP");
        setCustomersInArrears(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
        setLoading(false);
      });
  };

  // EFFECTS
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/get-arrears-mgt-branches", { headers })
      .then(function (response) {
        console.log(response.data);
        setBranches(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    getCustomersInArrears();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCustomersInArrears();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customersInArrears]);

  // VARIABLES
  var totalPrincInArr = 0;
  var totalIntInArr = 0;
  var totalSumOfTotalAmt = 0;

  var custInArrears = customersInArrears?.map((i) => {
    totalPrincInArr += parseFloat(i?.princ_in_arr);
    totalIntInArr += parseFloat(i?.int_in_arr);
    totalSumOfTotalAmt += parseFloat(i?.total_amount);

    return [
      <div className="text-left">{i?.principal_account}</div>,
      <div className="text-left">{i?.account_descrp}</div>,
      <div className="text-left">{i?.br_description}</div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.princ_in_arr))}
      </div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.int_in_arr))}
      </div>,
      <div className="text-right ">
        {formatNumber(parseFloat(i?.total_amount))}
      </div>,

      <div className="text-right ">{i?.days_in_arr}</div>,
      <div
        className="flex items-center justify-center w-full"
        onClick={() => {
          setShowLoanCollectionDetail(true);
          setCustomerDetails(i);
        }}
      >
        <ButtonComponent buttonWidth={"40px"} buttonIcon={<FiChevronRight />} />
      </div>,
    ];
  });

  return (
    <main className="mb-48">
      <ActionButtons
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayReject={"none"}
        displayView={"none"}
        displayOk={"none"}
        onExitClick={() => handleExitClick()}
        onFetchClick={() => {
          getCustomersInArrears();
        }}
        onNewClick={() => {
          setFormData({
            account_descrp: "",
            principal_account: "",
          });
          setBranchValue("");
        }}
      />

      <br />
      {/* <hr />
      <br /> */}

      <div>
        <div className="space-y-4">
          <div className="border border-[#d6d7d9] p-2 space-y-4 rounded-sm">
            <Header title="Arrears Enquiry" headerShade />
            <div className="pt-4 w-full">
              <InputField
                label={"Principal Account"}
                labelWidth={"15%"}
                inputWidth={"25%"}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    getCustomersInArrears();
                  }
                }}
                onBlur={getCustomersInArrears}
                name="principal_account"
                value={formData?.principal_account}
              />
            </div>

            <div className="flex w-full pb-6">
              <div style={{ width: "50%" }}>
                <InputField
                  label={"Customer Name"}
                  labelWidth={"30%"}
                  inputWidth={"50%"}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      getCustomersInArrears();
                    }
                  }}
                  name="account_descrp"
                  value={formData?.account_descrp}
                  onBlur={getCustomersInArrears}
                />
              </div>

              <div style={{ width: "50%" }}>
                <ListOfValue
                  label={"Branch Name"}
                  labelWidth={"20%"}
                  inputWidth={"50%"}
                  data={branches}
                  onChange={(value) => {
                    setBranchValue(value);
                    getCustomersInArrears();
                  }}
                  value={branchValue}
                  onBlur={getCustomersInArrears}
                  name="br_code"
                />
              </div>
            </div>
          </div>

          {/* <br /> */}
          {/* <hr /> */}
          <div
            style={{ width: "100%" }}
            className="flex justify-start items-center ml-1"
          >
            <ButtonComponent
              label={"Arrears Customer Feedback"}
              buttonHeight={"30px"}
              buttonWidth={"270px"}
              buttonIcon={<AiFillEye />}
              buttonBackgroundColor={"#3b82f6"}
              onClick={() => {
                setshowArrearsFeedback(true);
              }}
            />
          </div>
        </div>
      </div>

      <br />
      <Header title="Customers in Arrears" headerShade />
      <div>
        <CustomTable
          headers={arrMgmtHeaders}
          load={loading}
          data={custInArrears}
          rowsPerPage={8}
        />
        <div className="text-white">
          {loading === false &&
            custInArrears?.push([
              <div>Total</div>,
              <div style={{ textAlign: "left" }}> </div>,
              <div style={{ textAlign: "left" }}> </div>,
              <div></div>,
              <div
                style={{ textAlign: "right", fontWeight: "800", color: "red" }}
              >
                {formatNumber(totalIntInArr)}
              </div>,
              <div
                style={{ textAlign: "right", fontWeight: "800", color: "red" }}
              >
                {formatNumber(totalPrincInArr)}
              </div>,
              <div
                style={{ textAlign: "right", fontWeight: "800", color: "red" }}
              >
                {formatNumber(totalSumOfTotalAmt)}
              </div>,
              <div></div>,
            ])}
        </div>
      </div>

      <Modal
        size={"83%"}
        opened={showLoanCollectionDetail}
        withCloseButton={false}
        padding={0}
        onClose={() => {
          setShowLoanCollectionDetail(false);
        }}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <NewLoanCollectionDetails
          customerDetails={customerDetails}
          onClose={() => setShowLoanCollectionDetail(false)}
          isSupervisor
        />
      </Modal>

      {/* ARREARS CUSTOMER FEEDBACK */}
      <Modal
        size={"70%"}
        opened={showArrearsFeedback}
        withCloseButton={false}
        onClose={() => {
          setshowArrearsFeedback(false);
        }}
        padding={"10px"}
        trapFocus={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <div style={{ zoom: "0.9" }} className="space-y-2">
          <Header
            headerShade
            title={"Arrears Customer Feedback"}
            onClose={() => {
              setshowArrearsFeedback(false);
            }}
          />
          <ArrearsCustomerFeedback
            onClose={() => {
              setshowArrearsFeedback(false);
            }}
          />
        </div>
      </Modal>
    </main>
  );
}

export default ArrearsManagement;
