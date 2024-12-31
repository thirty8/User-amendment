import React, { useEffect, useState } from "react";
import Header from "../../../../../../components/others/Header/Header";
import InputField from "../../../../../../components/others/Fields/InputField";
import { BsFilePerson } from "react-icons/bs/index.esm";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { FiEye, FiPlus, FiX } from "react-icons/fi";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import { headers } from "../../../../teller-ops/teller/teller-activities";
import CustomTable from "../../../../control-setups/components/CustomTable";

function CustomerQueueDetails({ customerDetails, onclose }) {
  //   STATES
  const [customerFeedbackTable, setCustomerFeedbackTable] = useState([]);
  const [showBalScreen, setShowBalScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSchedule, setshowSchedule] = useState(false);
  const [currency, setCurrency] = useState("");
  const [product, setProduct] = useState("");
  const [rm, setRm] = useState("");
  const [email, setEmail] = useState("");
  const [facilityNumber, setFacilityNumber] = useState("");
  const [accountClass, setAccountClass] = useState("");

  //   VARIABLES
  // VARIABLES
  const customerFeedbackHeaders = [
    <div style={{ textAlign: "left" }}>Collector Name</div>,
    <div style={{ textAlign: "left" }}>Reason Description</div>,
    <div style={{ textAlign: "left" }}>Feedback Description</div>,
    <div style={{ textAlign: "left" }}>Notes</div>,
    <div>Posting Date</div>,
    <div>Promise Date</div>,
    <div>Action</div>,
  ];

  // FUNCTIONS
  var total =
    parseFloat(customerDetails?.principal) +
    parseFloat(customerDetails?.interest);

  //   FORMAT NUMBER
  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  // FORMAT DATE
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase()
      .slice(0, 3);
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    return `${day}-${month}-${year}`;
  }

  /*
 
      ____    _   _ ____  _____ _____ _____ _____ ____ _____ ____  
     / / /   | | | / ___|| ____|  ___|  ___| ____/ ___|_   _/ ___| 
    / / /    | | | \___ \|  _| | |_  | |_  |  _|| |     | | \___ \ 
   / / /     | |_| |___) | |___|  _| |  _| | |__| |___  | |  ___) |
  /_/_/       \___/|____/|_____|_|   |_|   |_____\____| |_| |____/ 
                                                                   
 
*/
  //   EFFECTS
  useEffect(() => {
    // CUSTOMER CURRENCY
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-curr`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setCurrency(response.data[0]);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER PRODUCT
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-prod`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setProduct(response.data[0]);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER RELATIONS MANAGER
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-rm`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setRm(response.data[0]);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER EMAIL
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-email`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setEmail(response.data[0]);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    // CUSTOMER FACILITY TYPE
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-facility-type`,
        {
          facility_no: customerDetails?.facility_no,
        },
        { headers }
      )
      .then(function (response) {
        setFacilityNumber(response.data[0]);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    //   CUSTOMER ACCOUNT CLASS
    axios
      .post(
        API_SERVER + `/api/get-arrears-customer-account-class`,
        {
          princ_acct: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        setAccountClass(response.data[0]);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });

    //cust table
    axios
      .post(
        API_SERVER + "/api/get-cust-arrears-feedback-table",
        {
          principal_account: customerDetails?.principal_account,
        },
        { headers }
      )
      .then(function (response) {
        console.log(response?.data);
        setCustomerFeedbackTable(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  //   TABLE DATA
  var tableData = customerFeedbackTable?.map((i) => {
    return [
      <div style={{ textAlign: "left" }}>{i?.fullname}</div>,
      <div style={{ textAlign: "left" }}>{i?.reason_desc}</div>,
      <div style={{ textAlign: "left" }}>{i?.feedback_desc}</div>,
      <div style={{ textAlign: "left" }}>{i?.notes}</div>,
      <div>{formatDate(i?.posting_date)}</div>,
      <div>{formatDate(i?.promise_date)}</div>,
      <div className="flex items-center justify-center">
        <ButtonComponent buttonIcon={<FiEye />} buttonWidth={"40px"} />
      </div>,
    ];
  });

  return (
    <div style={{ zoom: 0.95 }}>
      <div className="flex justify-end mb-2" onClick={onclose}>
        <FiX />
      </div>
      <div className="flex">
        {/* LEFT SIDE */}
        <div className="flex-[0.7] space-y-4 border border-[#ccc] rounded-sm p-2 mr-2 pb-4">
          <Header title={"Customer Details"} headerShade />
          <div className="flex">
            <div className="w-1/2">
              <InputField
                label="Principal A/C"
                required
                labelWidth={"30%"}
                inputWidth={"65%"}
                disabled
                value={customerDetails?.principal_account}
              />
            </div>

            <div className="flex items-center w-1/2">
              <div className="w-[47%]">
                <InputField
                  labelWidth={"0%"}
                  inputWidth={"100%"}
                  disabled
                  className={"font-bold"}
                  value={customerDetails?.customer_name}
                />
              </div>

              <div className="w-[50%]">
                <InputField
                  labelWidth={"0%"}
                  inputWidth={"100%"}
                  disabled
                  className={"font-bold !text-orange-400"}
                  value={
                    currency?.currency === "undefined" ? "" : currency?.currency
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <InputField
                label="Product Type"
                labelWidth={"30%"}
                inputWidth={"65%"}
                disabled
                value={product?.product_type}
              />
            </div>

            <div className="w-1/2">
              <InputField
                required
                label="Repayment A/C"
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={customerDetails?.repayment_acct}
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <InputField
                label="Phone No"
                labelWidth={"30%"}
                inputWidth={"65%"}
                disabled
                value={
                  customerDetails?.phone1 === null
                    ? ""
                    : customerDetails?.phone1
                }
              />
            </div>

            <div className="w-1/2">
              <InputField
                label="Phone No 2"
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={
                  customerDetails?.phone2 === null
                    ? ""
                    : customerDetails?.phone2
                }
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <InputField
                label="Email"
                labelWidth={"30%"}
                inputWidth={"65%"}
                disabled
                value={email?.e_mail}
              />
            </div>

            <div className="w-1/2">
              <InputField
                label="Relation Manager"
                labelWidth={"50%"}
                inputWidth={"50%"}
                disabled
                value={rm?.rm}
              />
            </div>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex-[0.3] h-fit">
          <div className="space-y-4 border border-[#ccc] rounded-sm p-2 pb-4">
            <Header title={"Arrears Details"} headerShade />
            <div className="flex">
              <div className="w-1/2">
                <InputField
                  label="Facility Type"
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled
                  className="font-bold !text-red-500 text-center"
                  value={facilityNumber?.facility_no}
                />
              </div>

              <div className="w-1/2">
                <InputField
                  label="Princ In Arr"
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  disabled
                  textAlign={"right"}
                  className="font-bold"
                  value={formatNumber(customerDetails?.principal)}
                />
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <InputField
                  label="Arr Days"
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled
                  textAlign={"right"}
                  value={customerDetails?.overdue_day}
                />
              </div>

              <div className="w-1/2">
                <InputField
                  label="Int In Arr"
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  textAlign={"right"}
                  disabled
                  className="font-bold"
                  value={formatNumber(customerDetails?.interest)}
                />
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <InputField
                  label="Acct Class"
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  disabled
                  className="font-bold text-center"
                  value={accountClass?.account_class}
                />
              </div>

              <div className="w-1/2">
                <InputField
                  label="Total In Arr"
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  textAlign={"right"}
                  className="font-bold !text-red-500"
                  disabled
                  value={formatNumber(total)}
                />
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-end  mt-4"
            style={{ zoom: 0.9 }}
          >
            <ButtonComponent
              label={"View Schedule"}
              buttonHeight={"29px"}
              buttonWidth={"150px"}
              buttonBackgroundColor={"black"}
              buttonIcon={<FiEye />}
              onClick={() => setshowSchedule(true)}
            />

            <div className="ml-4">
              <ButtonComponent
                label={"Assign To Collector"}
                buttonHeight={"29px"}
                buttonWidth={"190px"}
                buttonIcon={<FiPlus />}
                buttonBackgroundColor={"green"}
              />
            </div>

            <div className="ml-4">
              <ButtonComponent
                label={"Customer Exposure"}
                buttonHeight={"29px"}
                buttonWidth={"190px"}
                buttonIcon={<BsFilePerson />}
                onClick={() => setShowBalScreen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <div style={{ zoom: 0.9 }}>
        <Header title="Collector Feedback" headerShade />
        <CustomTable
          data={tableData}
          headers={customerFeedbackHeaders}
          load={loading}
        />
      </div>
    </div>
  );
}

export default CustomerQueueDetails;
