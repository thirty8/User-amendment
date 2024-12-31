import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { API_SERVER } from "../../../../../../config/constant";
import { Spin } from "antd";
import { Modal } from "@mantine/core";
import Swal from "sweetalert2";
// import PreviewChanges from "../PreviewChanges";
import ListOfValue from "../../components/ListOfValue";
import InputField from "../../components/InputField";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import PreviewChanges from "../../components/PreviewChanges";
// import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";

export function formatDate(inputDate, addTime) {
  if (inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Combine into desired format
    const formattedDate = `? ${year}-${month}-${day} ${hours}:${minutes}:${seconds}
        : ${year}-${month}-${day}`;

    return formattedDate;
  }
}

const Account = ({
  data,
  onChange,
  accountDetailsData,
  setAccountDetailsData,
  accountTypes,
  setAccountTypes,
  customerSegment,
  customerSubSegment,

  handleCustTypeChange,
  // custType,
  currencies,
  handleRadioChangeMember,
  customerDetails = ["082269"],
  customerNumber,
}) => {
  const [typesOfReferee, setTypesOfReferee] = useState(
    localStorage.getItem("typesOfReferee") || ""
  );
  const [documentRequiredType, setDocumentRequiredType] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState([]);
  const [formData, setFormData] = useState({});
  const [previousData, setPreviousData] = useState({});
  const [changedData, setChangedData] = useState({});
  const [sector, setSector] = useState([]);
  const [subSector, setSubSector] = useState([]);
  const [devMethod, setDevMethod] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [currentChangedField, setCurrentChangedField] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateTimestamp, setUpdateTimestamp] = useState("");
  const [loaderMsg, setLoaderMsg] = useState("Loading Data... Please wait");

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  async function sectorFunc() {
    const response = await axios.post(
      API_SERVER + "/api/get-code-details",
      { code: "MAS" },
      { headers }
    );

    setSector(response?.data);
  }
  //  sub sector
  async function subSectorFunc(sector_code) {
    const response = await axios.post(
      API_SERVER + "/api/member-amendment",
      {
        code_type: "MAS",
        sector_code,
      },
      { headers }
    );
    console.log({ sector_code, response });
    setSubSector(response?.data);
  }

  async function fetchAccounts() {
    try {
      const response = await axios.post(
        API_SERVER + "/api/member-amendment",
        {
          key: "accounts",
          subKey: "get-accounts",
          customer_number: customerNumber,
        },
        { headers }
      );
      console.log("fff", response, customerDetails[0]);
      setAccounts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDeliveryMethod() {
    try {
      const response = await axios.post(
        API_SERVER + "/api/member-amendment",
        {
          key: "accounts",
          subKey: "get-lovs",

          lov: "deliveryMethod",
        },
        { headers }
      );

      console.log({ response });
      setDevMethod(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClearFields() {
    setSelectedAccount("");
    setFormData({
      account_name: "",
      address_1: "",
      overdrawn_limit: "",
      lien_amount: "",
      shadow_balance_today: "",
      shadow_uncleared: "",
      combined_shadow_balance: "", // nvl(SHADOW_BALANCE_TODAY,0) + nvl(SHADOW_UNCLEARED,0)
      currency: "", // CURRENCY_CODE || ' - ' || GET_CURRDESC(CURRENCY_CODE)
      customer_number: "",
      trans_count: "",
      memo1: "",
      memo2: "",
      memo3: "",
      date_opened: "",
      lien_expiring_date: "",
      date_of_last_activity: "",
      credit_interest_ac: "",
      isic: "",
      cumulative_interest: "",
      debit_rate: "",
      credit_rate: "",
      od_interest_amount: "",
      od_expiring_date: "",
      status: "", // STATUS_INDICATOR || '-' || GET_STATUSDESC('${account_number}')
      arm_1: "",
      institute_class: "",
      short_name: "",
      legal_form: "",
      debit_interest_ac: "",
      credit_interest_prod_code: "",
      debit_interest_prod_code: "",
      next_frequency_date: "",
      last_statement_date: "",
      interest_next_statement_frequency: "",
      statement_frequency: "",
      interest_statement_frequency: "",
      number_of_statement_required: "",
      delivery_method: "",
      type_of_acct: "",
      product: "", // PROD_CODE || ' - ' || GET_PRODUCTDESC(PROD_CODE)
      branch: "", // BRANCH_CODE || ' - ' || GET_BRANCHDESC(BRANCH_CODE)
      statement_cnt: "",
      sector: "",
      sub_sector: "",
      form: "", // cash_flag as form
      cheque_allowed: "", // chq_flag as cheque_allowed
      view_flag: "",
    });
  }

  async function handleSave() {
    try {
      // console.log("jjjj");
      setLoading(true);
      setLoaderMsg("Saving Changes ... Please wait");
      const response = await axios.post(
        API_SERVER + "/api/member-amendment",
        {
          key: "accounts",
          subKey: "save",
          branch: JSON.parse(localStorage.getItem("userInfo")).branchCode,
          username: JSON.parse(localStorage.getItem("userInfo")).id,
          // customer_number: customerDetails[0],
          formData,
        },
        { headers }
      );
      setLoading(false);
      setLoaderMsg("Loading Data ... Please wait");
      // console.log({ response });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response?.data,
      });
      handleClearFields();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!" + error?.toString(),
      });
      console.log({ error }, "llll");
    }
  }

  async function fetchAccountDetails(account_number) {
    try {
      // console.log("jjjj");
      setLoading(true);
      const response = await axios.post(
        API_SERVER + "/api/member-amendment",
        {
          key: "accounts",
          subKey: "get-accountDetails",
          customer_number: customerNumber,
          account_number,
        },
        { headers }
      );
      setLoading(false);
      console.log({ response });
      setFormData(response.data);
      setPreviousData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function initialFetches() {
    try {
      // setLoading(true);
      await Promise.all([
        sectorFunc(),
        subSectorFunc(),
        fetchAccounts(),
        fetchDeliveryMethod(),
      ]);

      // setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    initialFetches();
  }, []);
  console.log(subSector, "data.customer_segment");

  useEffect(() => {
    if (
      Object.keys(formData)?.length > 0 &&
      Object.keys(previousData)?.length > 0 &&
      formData[currentChangedField] !== previousData[currentChangedField]
    ) {
      setChangedData((prev) => ({
        ...prev,
        [currentChangedField]: previousData[currentChangedField],
      }));
    } else {
      const changedBackUp = changedData;
      delete changedBackUp[currentChangedField];
      setChangedData(changedBackUp);
    }
  }, [formData]);

  console.log({ formData, previousData });

  function handleChange(label, value) {
    setFormData((prev) => ({
      ...prev,
      [label]: value ? value : value == "" ? null : null,
    }));
    const date = new Date();
    setUpdateTimestamp(formatDate(date, true));

    setCurrentChangedField(label);
  }

  console.log({ formData });
  return (
    <Spin
      spinning={loading}
      size="large"
      tip={
        <span className="font-semibold mt-3 animate-pulse flex  items-center justify-center">
          <span>{loaderMsg}</span>
        </span>
      }
    >
      <Modal
        title={<span className="uppercase font-semibold">Preview Changes</span>}
        size={"60%"}
        opened={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
        }}
      >
        <PreviewChanges
          changedData={changedData}
          updateTimestamp={updateTimestamp}
        />
      </Modal>
      <div className="flex justify-center">
        <div className=" w-[85%] ">
          {/* Top section */}
          <div className="flex  pb-2">
            <div className="w-[67%] space-y-2">
              <ListOfValue
                labelWidth={"20%"}
                inputWidth={"71.5%"}
                label={"Enter A/c Number"}
                required={true}
                data={accounts}
                value={selectedAccount}
                onChange={(value) => {
                  console.log("value", value);
                  if (!value) {
                    handleClearFields();
                    return;
                  }
                  setSelectedAccount(value);
                  fetchAccountDetails(value);
                }}
              />
              <InputField
                labelWidth={"20%"}
                inputWidth={"71.5%"}
                label={"Account Name"}
                value={formData?.account_name}
                onChange={(e) => {
                  handleChange("account_name", e.target.value);
                }}
              />
              <InputField
                labelWidth={"20%"}
                inputWidth={"71.5%"}
                label={"Product"}
                value={formData?.product}
                disabled={true}
              />
              <InputField
                labelWidth={"20%"}
                inputWidth={"71.5%"}
                label={"Currency code"}
                value={formData?.currency}
                disabled={true}
              />
              <InputField
                labelWidth={"20%"}
                inputWidth={"71.5%"}
                label={"Source Branch"}
                value={formData?.branch}
                disabled={true}
              />
            </div>
            <div className="w-[33%] space-y-2">
              <InputField
                labelWidth={"40%"}
                inputWidth={"55%"}
                label={"Date Opened"}
                value={
                  formData?.date_opened && formatDate(formData?.date_opened)
                }
                disabled={true}
              />
              <InputField
                labelWidth={"40%"}
                inputWidth={"55%"}
                label={"Date of Last Activity"}
                value={
                  formData?.date_of_last_activity &&
                  formatDate(formData?.date_of_last_activity)
                }
                disabled={true}
              />
              <InputField
                labelWidth={"40%"}
                inputWidth={"55%"}
                label={"Transaction Count"}
                disabled={true}
              />
              <SelectField
                labelWidth={"40%"}
                inputWidth={"55%"}
                label={"FX Category"}
                disabled={true}
                data={[
                  {
                    label: "NONE",
                    value: null,
                  },
                  {
                    label: "FOREIGN",
                    value: "FC",
                  },
                  {
                    label: "FOREX",
                    value: "FX",
                  },
                ]}
              />
            </div>
          </div>
          {/* Middle section */}
          <div>
            <div className="flex border-y-2 border-gray-300 mb-2 py-2 ">
              <div className="w-[30%] space-y-2">
                <InputField
                  labelWidth={"48%"}
                  inputWidth={"53%"}
                  label={"Short Name"}
                  value={formData?.short_name}
                  onChange={(e) => {
                    handleChange("short_name", e.target.value);
                  }}
                />
                <InputField
                  labelWidth={"48%"}
                  inputWidth={"53%"}
                  label={"Credit Rate"}
                  disabled={true}
                  textAlign={"right"}
                  value={formData?.credit_rate}
                />
                <InputField
                  labelWidth={"48%"}
                  inputWidth={"53%"}
                  label={"Debit Rate"}
                  disabled={true}
                  textAlign={"right"}
                  value={formData?.debit_rate}
                />
              </div>
              <div className="w-[33%] space-y-2">
                <SelectField
                  labelWidth={"43%"}
                  inputWidth={"55%"}
                  label={"View Flag"}
                  value={formData?.view_flag}
                  onChange={(value) => {
                    handleChange("view_flag", value);
                  }}
                  data={[
                    {
                      label: "Hide Balance",
                      value: "B",
                    },
                    {
                      label: "Hide Name & Balance",
                      value: "F",
                    },
                    {
                      label: "Show Everything",
                      value: "Y",
                    },
                  ]}
                />
                <InputField
                  labelWidth={"43%"}
                  inputWidth={"55%"}
                  type={"number"}
                  label={"Credit Interest A/C"}
                  value={formData?.credit_interest_ac}
                  onChange={(e) => {
                    handleChange("credit_interest_ac", e.target.value);
                  }}
                />
                <InputField
                  labelWidth={"43%"}
                  inputWidth={"55%"}
                  type={"number"}
                  label={"Debit Interest A/C"}
                  value={formData?.debit_interest_ac}
                  onChange={(e) => {
                    handleChange("debit_interest_ac", e.target.value);
                  }}
                />
              </div>
              <div className=" flex-grow  space-y-2">
                <InputField
                  labelWidth={"48%"}
                  inputWidth={"50%"}
                  label={"Account Status"}
                  disabled={true}
                  value={formData?.status}
                />
                <InputField
                  labelWidth={"48%"}
                  inputWidth={"50%"}
                  label={"Credit Interest Prod Code"}
                  value={formData?.credit_interest_prod_code}
                  onChange={(e) => {
                    handleChange("credit_interest_prod_code", e.target.value);
                  }}
                />
                <InputField
                  labelWidth={"48%"}
                  inputWidth={"50%"}
                  label={"Debit Interest Prod Code"}
                  value={formData?.debit_interest_prod_code}
                  onChange={(e) => {
                    handleChange("debit_interest_prod_code", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          {/* Bottom section */}
          <div className="flex  pb-2">
            <div className="w-[67%] space-y-2">
              <ListOfValue
                labelWidth={"20%"}
                inputWidth={"71.5%"}
                label={"Sector"}
                data={sector}
                value={formData?.sector}
                onChange={(value) => {
                  setSelectedSector(value);
                  handleChange("sector", value);
                  subSectorFunc(value);
                }}
              />
              <ListOfValue
                labelWidth={"20%"}
                inputWidth={"71.5%"}
                data={subSector}
                value={formData?.sub_sector}
                label={"Sub Sector"}
                onChange={(value) => {
                  handleChange("sub_sector", value);
                }}
              />
              <ListOfValue
                labelWidth={"20%"}
                inputWidth={"71.5%"}
                data={devMethod}
                value={formData?.delivery_method}
                label={"Delivery Method"}
                onChange={(value) => {
                  handleChange("delivery_method", value);
                }}
              />

              <div className="flex  w-full ">
                <div className=" w-[50%]">
                  <InputField
                    labelWidth={"40%"}
                    inputWidth={"45%"}
                    label={"Institute Class"}
                    value={formData?.institute_class}
                    onChange={(e) => {
                      handleChange("institute_class", e.target.value);
                    }}
                  />
                </div>
                <div className="  w-[50%]">
                  <InputField
                    type={"date"}
                    labelWidth={"30%"}
                    inputWidth={"52.5%"}
                    label={"Last Statement Date"}
                    value={formData?.last_statement_date}
                    onChange={(e) => {
                      handleChange("last_statement_date", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex  ">
                <InputField
                  labelWidth={"40%"}
                  inputWidth={"45%"}
                  label={"Isic"}
                  value={formData?.isic}
                  onChange={(e) => {
                    handleChange("isic", e.target.value);
                  }}
                />
                <InputField
                  type={"date"}
                  labelWidth={"30%"}
                  inputWidth={"52.5%"}
                  label={"Next Statement Date"}
                  value={formData?.next_statement_date}
                  onChange={(e) => {
                    handleChange("next_statement_date", e.target.value);
                  }}
                />
              </div>
              <div className=" ">
                <SelectField
                  labelWidth={"20%"}
                  inputWidth={"22.5%"}
                  value={formData?.statement_frequency}
                  onChange={(value) => {
                    handleChange("statement_frequency", value);
                  }}
                  label={"Statement Frequency"}
                  data={[
                    {
                      label: "Daily",
                      value: "01",
                    },
                    {
                      label: "Weekly",
                      value: "02",
                    },
                    {
                      label: "Bi Weekly",
                      value: "03",
                    },
                    {
                      label: "Monthly",
                      value: "04",
                    },
                    {
                      label: "Quaterly",
                      value: "05",
                    },
                    {
                      label: "Half Yearly",
                      value: "06",
                    },
                    {
                      label: "Yearly",
                      value: "11",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="w-[33%] space-y-2">
              <SelectField
                labelWidth={"40%"}
                inputWidth={"55%"}
                label={"Cash Allowed"}
                value={formData?.cash_allowed}
                onChange={(value) => {
                  handleChange("cash_allowed", value);
                }}
                data={[
                  {
                    label: "Credit Not Allowed",
                    value: "C",
                  },
                  {
                    label: "Debit Not Allowed",
                    value: "D",
                  },
                  {
                    label: "Normal",
                    value: "N",
                  },
                ]}
              />

              <SelectField
                labelWidth={"40%"}
                inputWidth={"55%"}
                label={"Cheque Allowed"}
                value={formData?.cheque_allowed}
                onChange={(value) => {
                  handleChange("cheque_allowed", value);
                }}
                data={[
                  {
                    label: "Credit Not Allowed",
                    value: "C",
                  },
                  {
                    label: "Debit Not Allowed",
                    value: "D",
                  },
                  {
                    label: "Normal",
                    value: "N",
                  },
                ]}
              />
              <SelectField
                labelWidth={"40%"}
                inputWidth={"55%"}
                value={formData?.interest_statement_frequency}
                onChange={(value) => {
                  handleChange("interest_statement_frequency", value);
                }}
                label={"Int. Statement Frequency"}
                data={[
                  {
                    label: "Daily",
                    value: "1",
                  },
                  {
                    label: "Weekly",
                    value: "2",
                  },
                  {
                    label: "Bi Weekly",
                    value: "3",
                  },
                  {
                    label: "Monthly",
                    value: "4",
                  },
                  {
                    label: "Quaterly",
                    value: "5",
                  },
                  {
                    label: "Half Yearly",
                    value: "06",
                  },
                  {
                    label: "Yearly",
                    value: "11",
                  },
                ]}
              />

              <InputField
                labelWidth={"40%"}
                inputWidth={"55%"}
                label={"Next Int. Statement Freq."}
                type={"date"}
                value={formData?.next_interest_statement_frequency}
                onChange={(value) => {
                  handleChange("next_interest_statement_frequency", value);
                }}
              />

              <InputField
                labelWidth={"40%"}
                inputWidth={"55%"}
                textAlign={"right"}
                label={"No. of Statement Required "}
                value={formData?.number_of_statement_required}
                onChange={(e) => {
                  handleChange("number_of_statement_required", e.target.value);
                }}
              />

              <InputField
                labelWidth={"40%"}
                inputWidth={"55%"}
                label={"Statement Copies to be printed"}
                value={formData?.statement_cnt}
                onChange={(e) => {
                  handleChange("statement_cnt", e.target.value);
                }}
              />
            </div>
          </div>
          <hr className="mt-2 mb-2" />
          <div className="flex justify-between">
            <button
              onClick={() => {
                setShowPreviewModal(true);
              }}
              className="border-2 bg-green-300 p-2"
            >
              Preview Changes
            </button>
            <button
              onClick={handleSave}
              className="border-2 bg-blue-300 p-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Account;
