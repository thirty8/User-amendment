import React, { useState, useEffect } from "react";

import { API_SERVER } from "../../../../../../config/constant";
import { Modal } from "@mantine/core";
import { FcPlus } from "react-icons/fc";
import axios from "axios";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../../components/others/Fields/InputField";

import PreviewChanges from "../../components/PreviewChanges";
// import { formatDate } from "../../components/accounts/account-details";
import Swal from "sweetalert2";
import { formatDate } from "./account";

const Mandate = ({ customerDetails, customerNumber }) => {
  const [rows, setRows] = useState([]);

  const [formData, setFormData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [changedData, setChangedData] = useState({});
  const [currentChangedField, setCurrentChangedField] = useState("");

  const [updateTimestamp, setUpdateTimestamp] = useState("");
  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = rows.slice(startIndex, endIndex);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [mandate, setMandate] = useState([]);
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
      console.log("fff", response, customerNumber);
      setAccounts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMandate() {
    try {
      const response = await axios.post(
        API_SERVER + "/api/member-amendment",
        {
          key: "accounts",
          subKey: "mandate-lov",
        },
        { headers }
      );

      console.log({ response });
      setMandate(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAccountChange(value) {
    try {
      const response = await axios.post(
        API_SERVER + "/api/member-amendment",
        {
          key: "accounts",
          subKey: "mandate-onChange",
          account_number: value,
        },
        { headers }
      );
      // console.log("fff", response, customerDetails[0]);

      console.log({ response });
      if (response?.data?.responseCode == "000") {
        setFormData({
          originalMandate: response?.data?.responseMessage?.originalMandate,
        });
      }
      Swal.fire({
        icon: response?.data?.responseCode === "405" ? "error" : "success",
        title: "Success",
        text: response?.data?.responseMessage,
      });
    } catch (error) {
      console.log(error);
    }
  }

  
  function handleChange(label, value) {
    setFormData((prev) => ({
      ...prev,
      [label]: value ? value : value == "" ? null : null,
    }));
    const date = new Date();
    setUpdateTimestamp(formatDate(date, true));

    setCurrentChangedField(label);
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchAccounts(), fetchMandate()])
      .then((res) => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <div className="space-y-3 w-[53%]">
        <ListOfValue
          label={"Enter A/C"}
          labelWidth={"30%"}
          inputWidth={"70%"}
          required={true}
          data={accounts}
          onChange={handleAccountChange}
        />
        {/* <InputField
          label={"Account Name"}
          labelWidth={"30%"}
          inputWidth={"70%"}
          disabled={true}
        /> */}
        <InputField
          label={"Original Mandate"}
          labelWidth={"30%"}
          inputWidth={"70%"}
          disabled={true}
        />
        <ListOfValue
          label={"New Mandate"}
          labelWidth={"30%"}
          inputWidth={"70%"}
          required={true}
          data={mandate}
        />
        <div className="flex items-center">
          <div className="w-[65%]">
            <InputField
              label={"Source Document"}
              labelWidth={"45%"}
              inputWidth={"40%"}
              // disabled={true}
              required={true}
            />
          </div>
          <button className="px-5 py-1 whitespace-nowrap text-white bg-blue-500">
            View Document
          </button>
        </div>
        <div className="flex justify-end border-t-2 pt-5">
          <div className="w-[68%] flex justify-between">
            <button
              onClick={() => {
                setShowPreviewModal(true);
              }}
              className="border-2 bg-green-300 p-2"
            >
              Preview Changes
            </button>
            <button className="border-2 bg-blue-300 p-2">
              Update
            </button>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Mandate;
