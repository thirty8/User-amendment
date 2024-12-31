import React, { useEffect, useState } from "react";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import CustomTable from "../../../control-setups/components/CustomTable";
import Header from "../../../../../components/others/Header/Header";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiChevronRight } from "react-icons/fi";
import { Modal, ScrollArea } from "@mantine/core";
import CollectorsNote from "./collectors-note";

function ArrearsMonitoryDetail() {
  // HEADERS
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const tableHeaders = [
    <div>Facility No</div>,
    <div>Principal A/C</div>,
    <div style={{ textAlign: "left" }}>Customer Name</div>,
    <div style={{ textAlign: "left" }}>Branch Name</div>,
    <div>Contact No.</div>,
    <div style={{ textAlign: "right" }}>Days in Arr.</div>,
    <div style={{ textAlign: "right" }}>Principal in Arr.</div>,
    <div style={{ textAlign: "right" }}>Interest in Arr.</div>,
    <div style={{ textAlign: "right" }}>Total Amount</div>,
    <div>Action</div>,
  ];

  //   STATE
  const [loading, setLoading] = useState(false);
  const [arrearsDetails, setArrearsDetails] = useState([]);
  const [arrDetailsModal, setarrDetailsModal] = useState(false);
  const [customerArrearsData, setCustomerArrearsData] = useState({});
  const [formData, setFormData] = useState({
    facility_no: "",
    acct_desc: "",
    principal_acct: "",
    days_in_arr_less: "",
    days_in_arr_greater: "",
  });
  const [branchCodeList, setBranchCodeList] = useState([]);
  const [branchCodeValue, setBranchCodeValue] = useState("");

  //   EFFECTS
  useEffect(() => {
    axios
      .get(API_SERVER + "/api/get-arrears-monitory-branches", {
        headers: headers,
      })
      .then(function (response) {
        setBranchCodeList(response.data);
      })
      .catch((err) => console.log(err));

    getAllArrearsMonitoryDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   APIS
  const getAllArrearsMonitoryDetails = () => {
    setLoading(true);
    axios
      .post(
        API_SERVER + "/api/get-arrears-monitory-details", // url
        {
          facility_no: formData?.facility_no,
          acct_desc: formData?.acct_desc,
          principal_acct: formData?.principal_acct,
          br_code: branchCodeValue,
          days_in_arr_less: formData?.days_in_arr_less,
          days_in_arr_greater: formData?.days_in_arr_greater,
        }, //payload
        {
          headers: headers,
        } // headers
      )
      .then(function (response) {
        setArrearsDetails(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
        setLoading(false);
      });
  };

  //   FUNCTIONS
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  THE TABLE DATA
  var arrearsDetailsData = arrearsDetails?.map((i) => {
    return [
      <div>{i?.facility_no}</div>,
      <div>{i?.principal_account}</div>,
      <div style={{ textAlign: "left" }}>{i?.account_descrp}</div>,
      <div style={{ textAlign: "left" }}>{i?.br_description}</div>,
      <div>{i?.phone1}</div>,
      <div style={{ textAlign: "right" }}>{i?.days_in_arr}</div>,
      <div style={{ textAlign: "right" }}>{i?.princ_in_arr}</div>,
      <div style={{ textAlign: "right" }}>{i?.int_in_arr}</div>,
      <div style={{ textAlign: "right" }}>{i?.total_amount}</div>,
      <div
        style={{
          display: "grid",
          placeItems: "center",
        }}
        onClick={() => {
          setCustomerArrearsData(i);
          setarrDetailsModal(true);
          console.log(i, "CUSTOMER");
        }}
      >
        <ButtonComponent buttonIcon={<FiChevronRight />} buttonWidth={"30px"} />
      </div>,
    ];
  });

  return (
    <div>
      <div>
        <ActionButtons
          displayAuthorise={"none"}
          displayCancel={"none"}
          displayDelete={"none"}
          displayHelp={"none"}
          displayReject={"none"}
          displayView={"none"}
          displayRefresh={"none"}
          displayOk={"none"}
          onFetchClick={getAllArrearsMonitoryDetails}
          onNewClick={() => {
            setFormData({
              facility_no: "",
              acct_desc: "",
              principal_acct: "",
              days_in_arr_less: "",
              days_in_arr_greater: "",
            });
            setBranchCodeValue("");
            getAllArrearsMonitoryDetails();
          }}
        />
        <br />
        <hr />
        <br />
      </div>

      <Header headerShade title="Collections" />
      <hr />
      <Header headerShade title={"Search Criteria"} />
      <br />
      <div style={{ display: "flex" }}>
        <div className="space-y-4" style={{ width: "50%" }}>
          <InputField
            inputWidth={"40%"}
            labelWidth={"40%"}
            label={"Customer Name"}
            name={"acct_desc"}
            onChange={handleChange}
            value={formData?.acct_desc}
          />
          <InputField
            inputWidth={"40%"}
            labelWidth={"40%"}
            label={"Facility No"}
            name={"facility_no"}
            onChange={handleChange}
            value={formData?.facility_no}
          />

          <InputField
            inputWidth={"40%"}
            labelWidth={"40%"}
            label={"Days in Arrs <"}
            name={"days_in_arr_less"}
            onChange={handleChange}
            value={formData?.days_in_arr_less}
          />
        </div>
        <div className="space-y-4" style={{ width: "50%" }}>
          <InputField
            inputWidth={"30%"}
            labelWidth={"40%"}
            label={"Principal Account"}
            name={"principal_acct"}
            onChange={handleChange}
            value={formData?.principal_acct}
          />
          <ListOfValue
            inputWidth={"30%"}
            labelWidth={"40%"}
            label={"Branch Name"}
            data={branchCodeList}
            onChange={(value) => setBranchCodeValue(value)}
            value={branchCodeValue}
          />
          <InputField
            inputWidth={"30%"}
            labelWidth={"40%"}
            label={"Days in Arrs >"}
            name={"days_in_arr_greater"}
            onChange={handleChange}
            value={formData?.days_in_arr_greater}
          />
        </div>
      </div>
      <br />
      <br />

      <div style={{ zoom: 0.9 }}>
        <Header headerShade title={"Details"} />
        <CustomTable
          headers={tableHeaders}
          data={arrearsDetailsData}
          load={loading}
          rowsPerPage={10}
        />
      </div>

      <br />
      <br />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div></div>
        <div style={{ marginRight: "10px" }}>
          <ButtonComponent
            buttonWidth={"120px"}
            buttonHeight={"30px"}
            label={"Print Report"}
          />
        </div>
      </div>

      <Modal
        opened={arrDetailsModal}
        withCloseButton={false}
        size={"75%"}
        padding={0}
        scrollAreaComponent={ScrollArea.Autosize}
        onClose={() => setarrDetailsModal(false)}
      >
        <div style={{ zoom: 0.9 }}>
          <CollectorsNote
            userDetails={customerArrearsData}
            closeModal={() => setarrDetailsModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default ArrearsMonitoryDetail;
