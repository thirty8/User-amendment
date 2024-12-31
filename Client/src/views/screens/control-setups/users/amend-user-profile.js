import React, { useEffect, useState, useRef } from "react";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import CustomTable from "../../teller-ops/components/CustomTable";
// import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { Modal } from "@mantine/core";
import { headers } from "../../teller-ops/teller/teller-activities";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";

import { GiReceiveMoney } from "react-icons/gi/index.esm";
import Swal from "sweetalert2";
import SelectField from "../../../../components/others/Fields/SelectField";

// import DetailsModal from "../teller/components/ReversalDetails";
function AmendUserProfile() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [statusChange, setStatusChange] = useState(false);
  const [lovs, setLovs] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUserID, setSelectedUserID] = useState("");

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  function formatNumber(num) {
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });
    return formatted;
  }
  function formatDate(value) {
    const eDate = new Date(value);
    const value_date = eDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    return value_date;
  }
  useEffect(() => {
    setMessage("Processing data , Please wait ...");
    axios
      .post(
        API_SERVER + "/api/amend-user-profile",
        {
          key: "block",
          username: JSON.parse(localStorage.getItem("userInfo")).id,
          ...formData,
        },
        { headers }
      )
      .then((res) => {
        console.log({ res });
        setMessage("");
        const arr = [];
        res.data?.map((i) => {
          const [a, b, c, d, e] = i;
          arr.push([
            a,
            b,
            c,
            d,
            e === "N" ? "NO" : "YES",

            <div className="w-full flex justify-center">
              <div
                onClick={() => {
                  setShowModal(true);
                  setSelectedUserID(a);
                  setContent({ transNo: i[1], batchNo: i[0] });
                }}
                className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 stroke-cyan-300 fill-gray-800"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>,
          ]);
        });
        setData(arr);
        // console.log({ res });
      });
    return () => {
      setSelectedUserID("");
    };
  }, [statusChange]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/amend-user-profile",
        { key: "lovs" },
        { headers }
      )
      .then((res) => {
        setLovs(res.data);
        // console.log({ res });
      });
  }, []);

  function handleFilter() {
    setMessage("Processing data , Please wait ...");
    axios
      .post(
        API_SERVER + "/api/amend-user-profile",
        {
          key: "block",
          username: JSON.parse(localStorage.getItem("userInfo")).id,
          ...formData,
        },
        { headers }
      )
      .then((res) => {
        console.log({ res });
        setMessage("");
        const arr = [];
        res.data?.map((i) => {
          const [a, b, c, d, e] = i;
          arr.push([
            a,
            b,
            c,
            d,
            e === "N" ? "NO" : "YES",

            <div className="w-full flex justify-center">
              <div
                onClick={() => {
                  setShowModal(true);
                  setContent({ transNo: i[1], batchNo: i[0] });
                }}
                className="bg-[#87d4d579] rounded py-1  w-[45px] text-center hover:ring-[2px] ring-cyan-300 transition duration-300 ease-in-out flex justify-center items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 stroke-cyan-300 fill-gray-800"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>,
          ]);
        });
        setData(arr);
        // console.log({ res });
      });
  }

  //   console.log(lovs, "ll");
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        // Perform your desired function here
        document.getElementById("filter").click();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    // <></>
    <div className="transform scale-[0.9] -mx-24 -mt-4 ">
      <div className="flex justify-center space-x-3 mb-3 px-3">
        <div className="w-[100%] px-4 py-3 border-2 rounded">
          <div className="flex space-x-4 justify-between ">
            <div className="w-[50%]">
              <InputField
                label={"Full Name"}
                labelWidth={"20%"}
                inputWidth={"50%"}
                value={formData?.fullName}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-[50%]">
              <ListOfValue
                label={"Department"}
                labelWidth={"20%"}
                inputWidth={"50%"}
                data={lovs?.dept}
                value={formData?.dept}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, dept: value }));
                  setStatusChange(!statusChange);
                }}
              />
            </div>
          </div>
          <div className="flex space-x-4 justify-between mt-2">
            <div className="w-[50%]">
              <ListOfValue
                label={"Branch"}
                labelWidth={"20%"}
                inputWidth={"50%"}
                data={lovs?.branch}
                value={formData?.branch}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, branch: value }));
                  setStatusChange(!statusChange);
                }}
              />
            </div>

            <div className="w-[50%]">
              <InputField
                label={"User ID"}
                labelWidth={"20%"}
                inputWidth={"50%"}
                value={formData?.userID}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    userID: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex justify-end mt-2 ">
            <ButtonComponent
              id={"filter"}
              label={"Filter"}
              buttonWidth={"10%"}
              buttonHeight={"30px"}
              onClick={handleFilter}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="px-2">
        <Modal
          size={"80%"}
          opened={showModal}
          trapFocus={false}
          // onHide={handleClose}
          withCloseButton={false}
          padding={0}
          // zIndex={"inherit"}
          centered
          onClose={() => {}}
        >
          <div className="p-0 m-0 ">
            <div
              style={{
                background: "#0580c0",
              }}
              className=" w-full rounded-t shadow"
            >
              <div className=" flex justify-between py-1 px-2 items-center ">
                <div className="text-white font-semibold uppercase tracking-wider">
                  User Profile Update
                </div>

                <svg
                  onClick={() => handleClose()}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  // style={{ padding: "10px" }}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 z-50 cursor-pointer fill-cyan-500 stroke-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            {/* <hr style={{ marginTop: "-10%" }} /> */}
          </div>
          <Details userID={selectedUserID} />
        </Modal>
        <CustomTable
          // title={"Transaction Status"}
          headers={[
            "User ID",
            "Full Name",
            "Branch",
            "Mobile Number",
            "Login Status",

            "Action",
          ]}
          data={data}
          defaultMessage={message}
          rowsPerPage={10}
          style={{ columnAlignRight: [7, 8] }}
        />
      </div>
    </div>
  );
}

export default AmendUserProfile;

function Details({
  handleSubmit,
  formData,
  setFormData,
  setBatchNo,
  userID,
  checked,
  setActiveAccountNumber,
  batchNo,
  setDenominationEntries,
  setChecked,
  setThirdPartyEntries,
}) {
  const [response, setResponse] = useState("");
  const [inWords, setInWords] = useState("");
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [details, setDetails] = useState("");
  const [branch, setBranch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [authCode, setAuthCode] = useState([]);
  const [selectedSourceOfFund, setSelectedSourceOfFund] = useState("");
  const [appLevel, setAppLevel] = useState([]);
  const [noAc, setNoAc] = useState(false);
  const [accRight, setAccRight] = useState(false);
  const [valueDate, setValueDate] = useState("");
  const [reference, setReference] = useState("");
  const [narration, setNarration] = useState("CASH DEPOSIT");
  const [narration2, setNarration2] = useState("");
  const [withdrawalBy, setWithdrawalBy] = useState("");
  const [contact, setContact] = useState("");
  const [isThirdParty, setisThirdParty] = useState(false);
  const [accountDetails, setAccountDetails] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [inWord, setInWord] = useState("");
  const [sourceOfFund, setSourceOfFund] = useState("");
  const [ThirdPartyModal, setThirdPartyModal] = useState(false);
  const [denomination, setDenomination] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [validate, setValidate] = useState(false);
  const [validateResponse, setValidateResponse] = useState(false);
  const [prevAmount, setPrevAmount] = useState("");
  const [dummy, setDummy] = useState(false);
  const thirdPartyRef = useRef(null);
  const voucherRef = useRef(null);
  const inputRef = useRef(null);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  console.log({ details });
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/amend-user-profile",
        {
          key: "details",
          userID: userID,
        },
        { headers }
      )
      .then((response) => {
        setDetails(response.data?.details);
        setBranch(response.data?.branch);
        setAuthCode(response.data?.authCode);
        setAppLevel(response.data?.appLevel);
        console.log({ response });
        setSelectedBranch(response.data?.details?.branchcode);
      });
  }, []);

  function formatDate(value) {
    const eDate = new Date(value);
    const value_date = eDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    return value_date;
  }
  return (
    <>
      <AccessRight
        userID={userID}
        accRight={accRight}
        setAccRight={setAccRight}
      />
      <div className="scale-[0.85] -mx-20">
        <ActionButtons displayFetch={"none"} />
        <hr className="my-2" />
        <div className="flex space-x-2">
          <div className="w-[45%] border-2 p-3 rounded">
            <div className="flex mb-[12px]">
              <InputField
                label={"User Name"}
                labelWidth={"35%"}
                inputWidth={"55%"}
                disabled={true}
                value={details?.userid}
              />
              <ButtonComponent label={"User Information"} buttonWidth={"40%"} />
            </div>
            <div className="mb-[12px]">
              <InputField
                label={"Staff ID"}
                labelWidth={"25%"}
                inputWidth={"75%"}
                disabled={true}
                value={details?.staffid}
              />
            </div>
            <div className="mb-[12px] space-y-[12px]">
              <InputField
                label={"Full Name"}
                labelWidth={"25%"}
                inputWidth={"75%"}
                marginBottom={"10px"}
                disabled={true}
                value={details?.fullname}
              />
              <ListOfValue
                label={"Branch"}
                labelWidth={"25%"}
                inputWidth={"75%"}
                marginBottom={"10px"}
                value={selectedBranch}
                data={branch}
                onChange={(value) => {
                  setSelectedBranch(value);
                }}
                required={true}
              />
              <InputField
                label={"Salary A/C"}
                labelWidth={"25%"}
                inputWidth={"75%"}
                marginBottom={"10px"}
                value={details?.salaryac}
                required={true}
              />
              <ListOfValue
                label={"Authority Code"}
                labelWidth={"25%"}
                inputWidth={"75%"}
                marginBottom={"10px"}
                value={details?.authority_code}
                data={authCode}
              />

              <div className="flex">
                <label className="w-[25%] text-right text-[85%] text-gray-800">
                  Approval Right
                </label>
                <div className="flex space-x-7 ml-[20px]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="approvalRight"
                      checked={details?.approval_authority === "Y"}
                      onChange={() => {
                        setDetails((prev) => ({
                          ...prev,
                          approval_authority: "Y",
                        }));
                      }}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="approvalRight"
                      checked={
                        details?.approval_authority === "N" ||
                        details?.approval_authority === "null"
                      }
                      onChange={() => {
                        setDetails((prev) => ({
                          ...prev,
                          approval_authority: "N",
                        }));
                      }}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <ListOfValue
                label={"User Approval Level"}
                labelWidth={"25%"}
                inputWidth={"75%"}
                data={appLevel}
                value={details?.authority_code}
              />

              <InputField
                label={"Float Account"}
                labelWidth={"25%"}
                inputWidth={"75%"}
                value={details?.floatac}
              />
            </div>
          </div>
          <div className="w-[55%] border-2 p-3 rounded">
            <div className="flex mb-[12px] ">
              <InputField
                label={"Date Approved"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                value={details?.dateapp ? formatDate(details?.dateapp) : ""}
                disabled={true}
              />

              <InputField
                label={"Approved By"}
                labelWidth={"47%"}
                inputWidth={"53%"}
                disabled={true}
                value={details?.appby}
              />
            </div>
            <div className="flex mb-[12px] space-x-2">
              <div className="flex w-[50%]">
                <label className="w-[40%] text-right text-[85%] mr-[15px] text-gray-800">
                  EOD User
                </label>
                <div className="flex space-x-7 ml-[20px] w-[50%]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="eodUser"
                      checked={details?.eod_user === "Y"}
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, eod_user: "Y" }));
                      }}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="eodUser"
                      checked={
                        details?.eod_user === "N" ||
                        details?.eod_user === "null"
                      }
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, eod_user: "N" }));
                      }}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-1/2">
                <SelectField
                  label={"Password Expiry Flag"}
                  labelWidth={"47%"}
                  inputWidth={"53%"}
                  value={details?.passwd_expiry_flag}
                  data={[
                    { value: "N", label: "Normal" },
                    { value: "E", label: "Expired" },
                    { value: "", label: "None" },
                  ]}
                  onChange={() => {
                    setDetails((prev) => ({
                      ...prev,
                      passwd_expiry_flag: "N",
                    }));
                  }}
                  // disabled={true}
                />
              </div>
            </div>
            <div className="flex mb-[12px]">
              <div className="w-1/2">
                <InputField
                  label={"Credit Approval Level"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  disabled={true}
                  value={details?.creditapp_level}
                />
              </div>

              <div className="flex w-[50%]">
                <label className="w-[47%] text-right text-[85%] mr-[15px] text-gray-800">
                  Trans Access
                </label>
                <div className="flex space-x-7 ml-[20px] w-[53%]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="trans_enq"
                      checked={details?.trans_enq === "Y"}
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, trans_enq: "Y" }));
                      }}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="trans_enq"
                      checked={
                        details?.trans_enq === "N" ||
                        details?.trans_enq === "null"
                      }
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, trans_enq: "N" }));
                      }}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-[12px]">
              <div className="flex w-[50%]">
                <label className="w-[40%] text-right text-[85%] mr-[15px] text-gray-800">
                  Global User
                </label>
                <div className="flex space-x-7 ml-[20px] w-[50%]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="globalUser"
                      checked={details?.global_flag === "Y"}
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, global_flag: "Y" }));
                      }}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="globalUser"
                      checked={
                        details?.global_flag === "N" ||
                        details?.global_flag === "null"
                      }
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, global_flag: "N" }));
                      }}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex w-[50%]">
                <label className="w-[47%] text-right text-[85%] mr-[15px] text-gray-800">
                  Receive Classified Info
                </label>
                <div className="flex space-x-7 ml-[20px] w-[53%]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="rec_class_info"
                      checked={details?.rec_class_info === "Y"}
                      onChange={() => {
                        setDetails((prev) => ({
                          ...prev,
                          rec_class_info: "Y",
                        }));
                      }}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="rec_class_info"
                      checked={
                        details?.rec_class_info === "N" ||
                        details?.rec_class_info === "null"
                      }
                      onChange={() => {
                        setDetails((prev) => ({
                          ...prev,
                          rec_class_info: "N",
                        }));
                      }}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="w-1/2">
                <SelectField
                  label={"User Status"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  value={details?.user_status}
                  data={[
                    { value: "A", label: "Activate" },
                    { value: "D", label: "Deactivate" },
                    { value: "T", label: "Terminate" },
                    { value: "", label: "None" },
                  ]}
                />
              </div>

              <div className="flex w-[50%]">
                <label className="w-[47%] text-right text-[85%] mr-[15px] text-gray-800">
                  Quorom App Flag
                </label>
                <div className="flex space-x-7 ml-[20px] w-[53%]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="quoromAppFlag"
                      checked={details?.quorum_app_flag === "Y"}
                      onChange={() => {
                        setDetails((prev) => ({
                          ...prev,
                          quorum_app_flag: "Y",
                        }));
                      }}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="quoromAppFlag"
                      checked={
                        details?.quorum_app_flag === "N" ||
                        details?.quorum_app_flag === "null"
                      }
                      onChange={() => {
                        setDetails((prev) => ({
                          ...prev,
                          quorum_app_flag: "N",
                        }));
                      }}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="w-1/2">
                <SelectField
                  label={"Trader Flag"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  data={[
                    { value: "A", label: "Normal" },
                    { value: "D", label: "Locked" },

                    { value: "", label: "None" },
                  ]}
                />
              </div>

              <div className="flex w-[50%]">
                <label className="w-[47%] text-right text-[85%] mr-[15px] text-gray-800">
                  Login Flag
                </label>
                <div className="flex space-x-7 ml-[20px] w-[53%]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="loginFlag"
                      checked={details?.global_flag === "Y"}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="loginFlag"
                      checked={details?.global_flag === "N"}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="w-1/2">
                <SelectField
                  label={"Lock Flag"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  value={details?.lock_flag}
                  data={[
                    { value: "L", label: "Locked" },
                    { value: "U", label: "Normal" },
                    { value: "", label: "None" },
                  ]}
                  onChange={(value) => {
                    setDetails((prev) => ({ ...prev, lock_flag: value }));
                  }}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  label={"Expiry Date"}
                  labelWidth={"47%"}
                  inputWidth={"53%"}
                  type={"date"}
                  // value={new Date(details?.date_expired)
                  //   .toISOString()
                  //   .slice(0, 16)}
                />
              </div>
            </div>
            <div className="flex mb-2">
              <div className="w-1/2">
                <InputField
                  label={"Time In"}
                  labelWidth={"40%"}
                  inputWidth={"50%"}
                  value={details?.time_in}
                  // disabled={true}
                />
              </div>

              <div className="w-1/2">
                <InputField
                  label={"Time Out"}
                  labelWidth={"47%"}
                  inputWidth={"53%"}
                  value={details?.time_out}
                  // type={"date"}
                />
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex w-[50%]">
                <label className="w-[40%] text-right text-[85%] mr-[15px] text-gray-800">
                  Special Access
                </label>
                <div className="flex space-x-7 ml-[20px] w-[50%]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="SpecialAccess"
                      checked={details?.special === "Y"}
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, special: "Y" }));
                      }}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="SpecialAccess"
                      checked={
                        details?.special === "N" || details?.special === "null"
                      }
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, special: "N" }));
                      }}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex w-[50%]">
                <label className="w-[47%] text-right text-[85%] mr-[15px] text-gray-800">
                  Special GL Access
                </label>
                <div className="flex space-x-7 ml-[20px] w-[53%]">
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="Y"
                      value={"Y"}
                      name="specialGl"
                      checked={details?.special_gl === "Y"}
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, special_gl: "Y" }));
                      }}
                    />
                    <label htmlFor="Y" className="text-[85%] text-gray-800">
                      Yes
                    </label>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="radio"
                      id="N"
                      value={"N"}
                      name="specialGl"
                      checked={
                        details?.special_gl === "N" ||
                        details?.special_gl === "null"
                      }
                      onChange={() => {
                        setDetails((prev) => ({ ...prev, special_gl: "N" }));
                      }}
                    />
                    <label htmlFor="N" className="text-[85%] text-gray-800">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-3 mt-2">
          <ButtonComponent
            id={"filter"}
            label={"Approval Items Except"}
            buttonWidth={"20%"}
            buttonHeight={"30px"}
          />
          <ButtonComponent
            id={"filter"}
            label={"Access Right"}
            buttonWidth={"15%"}
            buttonHeight={"30px"}
            onClick={() => {
              setAccRight(true);
            }}
          />
          <ButtonComponent
            id={"filter"}
            label={"Trans. Device Allowed"}
            buttonWidth={"20%"}
            buttonHeight={"30px"}
          />
          <ButtonComponent
            id={"filter"}
            label={"Approval Limit (Except.)"}
            buttonWidth={"20%"}
            buttonHeight={"30px"}
          />
          <ButtonComponent
            id={"filter"}
            label={"Teller Limit (Except.)"}
            buttonWidth={"20%"}
            buttonHeight={"30px"}
          />
        </div>
      </div>
    </>
  );
}

function AccessRight({ userID, accRight, setAccRight }) {
  const [accessRight, setAccessRight] = useState([]);
  const [showTransition, setShowTransition] = useState(false);
  const [accessRLov, setAccessRLov] = useState([]);
  const [selectedAccessR, setselectedAccessR] = useState([]);

  function handleRemove(index) {
    const arr = accessRight?.filter((element, i) => i !== index);

    setAccessRight(arr);
  }
  function handleAdd() {
    setShowTransition(!showTransition);
    if (showTransition) {
      // console.log(
      //   accessRight?.filter((i) => {
      //     console.log(i[0], selectedAccessR.split("-")[0], "gh");
      //     return i[0] == selectedAccessR.split("-")[0];
      //   }, "jo")
      // );
      if (
        accessRight.filter((i) => {
          return i[0] == selectedAccessR.split("-")[0];
        })?.length > 0
      ) {
        axios
          .post(
            API_SERVER + "/api/get-error-message",
            {
              code: "07354",
            },
            { headers }
          )
          .then((res) => {
            Swal.fire({
              allowOutsideClick: false,
              icon: "warning",
              html: `<div class="text-[16px]">${res.data}</div>`,
            });
          });

        return;
      }
      const arr = [...accessRight];
      arr.push([
        selectedAccessR.split("-")[0],
        selectedAccessR.split("-")[1],
        <div className="flex justify-center">
          <div
            onClick={() => {
              handleRemove();
            }}
            className={` rounded py-1 bg-[#d5878779] ring-[#e82f88] hover:ring-[2px]  w-[40px] text-center  transition duration-300 ease-in-out flex justify-center items-center `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 stroke-[#e82f88]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
              />
            </svg>
          </div>
        </div>,
      ]);
      setAccessRight(arr);
    }
  }
  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/amend-user-profile",
        {
          key: "accessRight",
          userID: userID,
        },
        { headers }
      )
      .then((response) => {
        setAccessRLov(response?.data[0]);
        const arr = [];
        response?.data[1]?.map((i, key) => {
          arr.push([
            ...i,
            <div className="flex justify-center">
              <div
                onClick={() => {
                  handleRemove(key);
                }}
                className={` rounded py-1 bg-[#d5878779] ring-[#e82f88] hover:ring-[2px]  w-[40px] text-center  transition duration-300 ease-in-out flex justify-center items-center `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 stroke-[#e82f88]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                  />
                </svg>
              </div>
            </div>,
          ]);
        });

        setAccessRight(arr);
      });
  }, []);
  return (
    <>
      <Modal
        size={"50%"}
        opened={accRight}
        trapFocus={false}
        // onHide={handleClose}
        withCloseButton={false}
        padding={0}
        // zIndex={"inherit"}
        centered
        onClose={() => {}}
      >
        <div className="p-0 m-0 ">
          <div
            style={{
              background: "#0580c0",
            }}
            className=" w-full rounded-t shadow"
          >
            <div className=" flex justify-between py-1 px-2 items-center ">
              <div className="text-white font-semibold uppercase tracking-wider">
                User Access Right
              </div>

              <svg
                onClick={() => setAccRight(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                // style={{ padding: "10px" }}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 z-50 cursor-pointer fill-cyan-500 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          {/* <hr style={{ marginTop: "-10%" }} /> */}
        </div>
        <div className="scale-[0.85] -mx-[48px] min-h-[200px]">
          <div className="flex justify-end items-center mb-4">
            <div
              className={`absolute top-0 text-black left-0  w-[70%] transition duration-150 ease-in-out transform ${
                showTransition ? "translate-x-0" : "translate-x-[40%] invisible"
              }`}
            >
              <ListOfValue
                label={"Pick Access Right"}
                labelWidth={"50%"}
                inputWidth={"50%"}
                value={selectedAccessR}
                onChange={(value) => {
                  setselectedAccessR(value);
                }}
                data={accessRLov}
              />
            </div>
            <ButtonComponent
              label={!showTransition ? "Add Access Right" : "Done"}
              buttonWidth={"20%"}
              onClick={() => handleAdd()}
            />
          </div>
          <CustomTable
            data={accessRight}
            headers={["Access Code", "Description", "Action"]}
          />
        </div>
      </Modal>
    </>
  );
}
