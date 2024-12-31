import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Label from "../../../../../../components/others/Label/Label";
// import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
// import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
// import InputField from "../../../../../../components/others/Fields/InputField";
import ModalLoader from "../../../../../../components/others/ModalLoader";
// import PreviewModal from "./preview-modal";
import { API_SERVER } from "../../../../../../config/constant";
import ListOfValue from "../../components/ListOfValue";
import InputField from "../../components/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { HEADERS } from "../../header_keys";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/x-www-form-urlencoded",
};

function CustomerInfo({
  data,
  customerDetails,
  relationshipType,
  customerNumber,
  customerDataFields
}) {
  const [showModal, setShowModal] = useState(false);
  const [customerCat, setCustomerCat] = useState([]);
  const [segment, setSegment] = useState([]);
  const [subSegment, setSubSegment] = useState([]);
  const [sector, setSector] = useState([]);
  const [subSector, setSubSector] = useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState([]);

  const [selectedSector, setSelectedSector] = useState("");

  const [myObj, setMyObj] = useState({
    CUSTOMER_NUMBER: "",
    CUSTOMER_NAME: "",
    C_TYPE: "",
    TYPE_OF_CUSTOMER: "",
    DECEASED: "",
    WHEREABOUTS_UNKNOWN: "",
    AR_AP_TRACKING: "",
    SECTOR: "",
    SUB_SECTOR: "",
    SUB_SEGMENT: "",
    SEGMENT: "",
    SWIFT_CODE: "",
    MT920: "",
    MT940: "",
  });

  const [prevObj, setPrevObj] = useState({
    CUSTOMER_NUMBER: "",
    CUSTOMER_NAME: "",
    C_TYPE: "",
    TYPE_OF_CUSTOMER: "",
    DECEASED: "",
    WHEREABOUTS_UNKNOWN: "",
    AR_AP_TRACKING: "",
    SECTOR: "",
    SUB_SECTOR: "",
    SUB_SEGMENT: "",
    SEGMENT: "",
    SWIFT_CODE: "",
    MT920: "",
    MT940: "",
  });

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      // setLoading(true); // Set loading to true before the request
      setError(null); // Reset error state

      const data = JSON.stringify({
        customerNumber: customerNumber,
        // searchText: customerDataFields?.CUSTOMER_NUMBER,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://10.203.14.195:3320/api/customer/get-customer-details",
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        setMyObj(response.data); // Set the response data
        // setCustomerData(response.data); // Set the response data
      } catch (error) {
        setError(error); // Set error if the request fails
      } finally {
        // setLoading(false); // Set loading to false after the request
      }
    };

    if (customerNumber) {
      fetchCustomerDetails(); // Fetch customer details only if customerNumber is provided
    }
  }, [customerNumber]);

  console.log("customerData", myObj);

  // const [myObj, setMyObj] = useState({
  //   customerName: "",
  //   customerType: "",
  //   customerCategory: "",
  //   segment: "",
  //   subSegment: "",
  //   sector: "",
  //   subSector: "",
  //   deceased: "",
  //   swift_code: "",
  // });

  const [updatedPrev, setUpdatedPrev] = useState({});

  const [changeColor, setChangeColor] = useState({
    customerName: false,
    segment: false,
    subSegment: false,
    sector: false,
    subSector: false,
  });

  const [time, setTime] = useState("");
  // const [loading, setLoading] = useState(false);

  // current date
  const now = new Date();

  const currentHour = now.getHours();
  const currentMinute = String(now.getMinutes()).padStart(2, "0");
  const currentSecond = String(now.getSeconds()).padStart(2, "0");

  let formattedHour = currentHour % 12 || 12; // Convert 0 to 12
  const ampm = currentHour < 12 ? "AM" : "PM";
  formattedHour = String(formattedHour).padStart(2, "0");

  // Fetch sectors and segments when component mounts
  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "MAS" },
          { headers }
        );
        setSector(response?.data);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    };

    const fetchSegments = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "CSG" },
          { headers }
        );
        setSegment(response?.data);
      } catch (error) {
        console.error("Error fetching segments:", error);
      }
    };

    async function customerCategoryFunc() {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "CRT" },
          { headers }
        );
        setCategory(response?.data);
      } catch (error) {
        console.log("Error fetching category:", error);
      }
    }

    customerCategoryFunc();
    fetchSectors();
    fetchSegments();
  }, []);

  // Fetch subsector based on selected sector
  const fetchSubSector = async (sectorValue) => {
    if (!sectorValue) return; // Ensure sectorValue is defined
    try {
      const response = await axios.post(
        API_SERVER + "/api/member-amendment",
        { code_type: "MAS", sector_code: sectorValue },
        { headers }
      );
      setSubSector(response?.data);
    } catch (error) {
      console.error("Error fetching subsectors:", error);
    }
  };

  // Fetch sub-segment based on selected segment
  const fetchSubSegment = async (segmentValue) => {
    if (!segmentValue) return; // Ensure segmentValue is defined
    try {
      const response = await axios.post(
        API_SERVER + "/api/get-customer-sub-segment-individual",
        { segmentCode: segmentValue },
        { headers }
      );

      // Transform data to format it for Mantine's Select component
      const formattedData = response?.data.map((item) => ({
        label: item.description,
        value: item.actual_code,
      }));

      setSubSegment(formattedData);
      console.log("value:", formattedData);
    } catch (error) {
      console.error("Error fetching sub-segments:", error);
    }
  };

  const safeFilter = (value, item) => {
    return item?.label?.toString().toLowerCase().includes(value?.toLowerCase());
  };

  const formattedTime = `${formattedHour}:${currentMinute}:${currentSecond} ${ampm}`;
  // queries

  // Fetch subsector and sub-segment automatically when SECTOR and SEGMENT values are populated
  useEffect(() => {
    if (myObj.SECTOR) {
      fetchSubSector(myObj.SECTOR);
    }
  }, [myObj.SECTOR]);

  useEffect(() => {
    if (myObj.SEGMENT) {
      fetchSubSegment(myObj.SEGMENT);
    }
  }, [myObj.SEGMENT]);

  // Handle changes in input fields
  const handleOnChange = (name, value) => {
    setMyObj((prev) => ({ ...prev, [name]: value }));

    if (name === "SECTOR") {
      fetchSubSector(value); // Fetch subsector when sector changes
      setMyObj((prev) => ({ ...prev, SUB_SECTOR: "" })); // Reset subsector field
    }

    if (name === "SEGMENT") {
      fetchSubSegment(value); // Fetch sub-segment when segment changes
      setMyObj((prev) => ({ ...prev, SUB_SEGMENT: "" })); // Reset sub-segment field
    }
  };

  console.log(myObj, "myObj");
  console.log(updatedPrev, "updatedPrev");
  // console.log(newObj, "comfort ");
  console.log(prevObj, "prevObj ");
  // console.log(prevObj, myObj, "compare");

  const PreviewModalToggle = () => {
    // check if any key has a value of true
    if (Object.keys(updatedPrev)?.length === 0) {
      Swal.fire({
        text: "No Changes Applied",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
    } else {
      setShowModal(!showModal);
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>; // Loading state
  // }

  return (
    <>
      {loading ? (
        <div className="w-full pt-[50px] flex justify-center">
          <ModalLoader />
        </div>
      ) : (
        <div>
          <div className="w-full flex space-x-4">
            <div className="border border-2 rounded space-y-3 w-[50%] pt-3 pb-3">
              <InputField
                label={"Full Name"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required={true}
                type="text"
                name={"CUSTOMER_NAME"}
                value={myObj?.CUSTOMER_NAME || customerDataFields?.CUSTOMER_NAME}
                // value={customerData?.CUSTOMER_NAME}
                onChange={(e) =>
                  handleOnChange(
                    e.target.name,
                    e.target.value?.toUpperCase()?.trim(),
                    [],
                    true
                  )
                }
                // className={
                //   customerData?.CUSTOMER_NUMBER === "" ||
                //   customerData?.CUSTOMER_NUMBER === prevObj?.CUSTOMER_NUMBER
                //     ? ""
                //     : "editedInputField"
                // }
              />{" "}
              <InputField
                label={"Customer Type"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required={true}
                name={"C_TYPE"}
                disabled={true}
                value={
                  myObj?.C_TYPE === "I"
                    ? "I - PERSONAL"
                    : myObj?.C_TYPE === "C"
                    ? "C - CORPORATE"
                    : ""
                }
              />
              <ListOfValue
                label={"Customer Category"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required={true}
                data={category}
                name={"customerCategory"}
                onChange={(value) => {
                  handleOnChange("customerCategory", value);
                }}
                value={myObj?.TYPE_OF_CUSTOMER}
                className={
                  myObj?.TYPE_OF_CUSTOMER === "" ||
                  myObj?.TYPE_OF_CUSTOMER === prevObj?.TYPE_OF_CUSTOMER
                    ? ""
                    : "editedInputField"
                }
              />
              <ListOfValue
                label={"Segment"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required={true}
                data={segment || []}
                filter={safeFilter}
                onChange={(value) => handleOnChange("SEGMENT", value)}
                value={myObj?.SEGMENT}
                // onChange={(value) => {
                //   handleOnChange("segment", value, segment);
                //   fetchSubSegment("segment", value, "subSegment");
                // }}
                // value={myObj?.segment}
                className={
                  myObj?.SEGMENT === "" || myObj?.SEGMENT === prevObj?.SEGMENT
                    ? ""
                    : "editedInputField"
                }
              />
              <ListOfValue
                label={"Sub Segment"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required={true}
                data={subSegment || []}
                filter={safeFilter}
                onChange={(value) => handleOnChange("SUB_SEGMENT", value)}
                value={myObj?.SUB_SEGMENT}
                // onChange={(value) => {
                //   handleOnChange("SUB_SEGMENT", value, SUB_SEGMENT);
                // }}
                // value={myObj?.SUB_SEGMENT}
                className={
                  myObj?.SUB_SEGMENT === "" ||
                  prevObj?.SUB_SEGMENT === myObj?.SUB_SEGMENT
                    ? ""
                    : "editedInputField"
                }
              />
              <ListOfValue
                label={"Sector"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required={true}
                data={sector || []}
                onChange={(value) => handleOnChange("SECTOR", value)}
                value={myObj?.SECTOR}
                // onChange={(value) => {
                //   handleOnChange("sector", value, sector);
                //   fetchSubSector("sector", value, "subSector");
                // }}
                className={
                  myObj?.SECTOR === "" || prevObj?.SECTOR === myObj?.SECTOR
                    ? ""
                    : "editedInputField"
                }
              />
              <ListOfValue
                label={"Sub Sector"}
                labelWidth={"30%"}
                inputWidth={"50%"}
                required={true}
                data={subSector || []}
                name={"SUB_SECTOR"}
                onChange={(value) => handleOnChange("SUB_SECTOR", value)}
                value={myObj?.SUB_SECTOR}
                // onChange={(value) => {
                //   handleOnChange("subSector", value, subSector);
                // }}
                // value={myObj?.subSector}
                className={
                  myObj?.SUB_SECTOR === "" ||
                  prevObj?.SUB_SECTOR === myObj?.SUB_SECTOR
                    ? ""
                    : "editedInputField"
                }
              />
            </div>

            {/* right  */}
            <div className="border border-2 rounded space-y-3 w-[50%] pt-3 pb-3">
              <InputField
                label={"Swift Code"}
                labelWidth={"30%"}
                inputWidth={"20%"}
                value={myObj?.SWIFT_CODE === "null" ? "" : myObj?.SWIFT_CODE}
                name={"SWIFT_CODE"}
                type={"text"}
                onChange={(e) =>
                  handleOnChange(e.target.name, e.target.value, [], true)
                }
                // className={
                //   customerData?.SWIFT_CODE === "" ||
                //   customerData?.SWIFT_CODE === prevObj?.SWIFT_CODE
                //     ? ""
                //     : "editedInputField"
                // }
              />

              <div className="flex flex-col ">
                {/* deceased  */}
                <div className={`flex items-center mb-2`}>
                  <span className="w-[19.5%] invisible">&nbsp;</span>
                  <span
                    className={`flex items-center space-x-2 ${
                      myObj?.DECEASED === "Y" && changeColor?.DECEASED === true
                        ? "editedInputField rounded w-fit pe-2"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className=" mt-[2px] ms-2"
                      name={"DECEASED"}
                      onChange={(e) => {
                        const newValue = e.currentTarget.checked;
                        handleOnChange(
                          e.target.name,
                          newValue === true ? "Y" : null,
                          [],
                          true
                        );
                      }}
                      checked={myObj?.DECEASED === "Y" ? true : false}
                    />
                    <label className="text-[92%] text-[#5C5C5C]">
                      {relationshipType ? "Out Of Business" : "Deceased"}
                    </label>
                  </span>
                </div>

                {/* whereabouts_unknown   */}
                <div className={`flex items-center mb-2`}>
                  <span className="w-[19.5%] invisible">&nbsp;</span>
                  <span
                    className={`flex items-center space-x-2 ${
                      myObj?.WHEREABOUTS_UNKNOWN === "Y" &&
                      changeColor?.WHEREABOUTS_UNKNOWN === true
                        ? "editedInputField rounded w-fit pe-2"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className=" mt-[2px] ms-2"
                      name={"WHEREABOUTS_UNKNOWN"}
                      onChange={(e) => {
                        const newValue = e.currentTarget.checked;
                        handleOnChange(
                          e.target.name,
                          newValue === true ? "Y" : null,
                          [],
                          true
                        );
                      }}
                      checked={
                        myObj?.WHEREABOUTS_UNKNOWN === "Y" ? true : false
                      }
                    />
                    <label className="text-[92%] text-[#5C5C5C]">
                      Whereabouts Unknown
                    </label>
                  </span>
                </div>

                {/* eligible for ar ap tracking   */}
                <div className={`flex items-center mb-2`}>
                  <span className="w-[19.5%] invisible">&nbsp;</span>
                  <span
                    className={`flex items-center space-x-2 ${
                      myObj?.AR_AP_TRACKING === "Y" &&
                      changeColor?.AR_AP_TRACKING === true
                        ? "editedInputField rounded w-fit pe-2"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className=" mt-[2px] ms-2"
                      name={"AR_AP_TRACKING"}
                      onChange={(e) => {
                        const newValue = e.currentTarget.checked;
                        handleOnChange(
                          e.target.name,
                          newValue === true ? "Y" : null,
                          [],
                          true
                        );
                      }}
                      checked={myObj?.AR_AP_TRACKING === "Y" ? true : false}
                    />
                    <label className="text-[92%] text-[#5C5C5C]">
                      Eligible for AR_AP Tracking
                    </label>
                  </span>
                </div>

                {/* MT920   */}
                <div className={`flex items-center mb-2`}>
                  <span className="w-[19.5%] invisible">&nbsp;</span>
                  <span
                    className={`flex items-center space-x-2 ${
                      myObj?.MT920 === "Y" && changeColor?.MT920 === true
                        ? "editedInputField rounded w-fit pe-2"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className=" mt-[2px] ms-2"
                      name={"MT920"}
                      onChange={(e) => {
                        const newValue = e.currentTarget.checked;
                        handleOnChange(
                          e.target.name,
                          newValue === true ? "Y" : null,
                          [],
                          true
                        );
                      }}
                      checked={myObj?.MT920 === "Y" ? true : false}
                    />
                    <label className="text-[92%] text-[#5C5C5C]">MT920 </label>
                  </span>
                </div>

                {/* MT940   */}
                <div className={`flex items-center mb-2`}>
                  <span className="w-[19.5%] invisible">&nbsp;</span>
                  <span
                    className={`flex items-center space-x-2 ${
                      myObj?.MT940 === "Y" && changeColor?.MT940 === true
                        ? "editedInputField rounded w-fit pe-2"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className=" mt-[2px] ms-2"
                      name={"MT940"}
                      onChange={(e) => {
                        const newValue = e.currentTarget.checked;
                        handleOnChange(
                          e.target.name,
                          newValue === true ? "Y" : null,
                          [],
                          true
                        );
                      }}
                      checked={myObj?.MT940 === "Y" ? true : false}
                    />
                    <label className="text-[92%] text-[#5C5C5C]"> MT940 </label>
                  </span>
                </div>
              </div>

              {/* end  here   */}
            </div>
          </div>

          <hr className="mt-5" />

          <div className="flex items-center justify-between mt-5">
            <button className="border-2 bg-green-300 p-2">Preview changes</button>
            <button className="border-2 bg-blue-300 p-2">Update</button>
          </div>

          {/* {showModal && (
            <PreviewModal
              showModal={showModal}
              setShowModal={setShowModal}
              // changes={newObj}
              // prevChanges={prevObj}
              // prevChanges2={updatedPrev}
              currentTime={time}
              prevChanges={updatedPrev}
              relationshipType={relationshipType}
            />
          )} */}

          {/* button  */}
          {/* <span className="flex justify-start mt-3">
            <ButtonComponent
              label={"Preview Changes"}
              onClick={PreviewModalToggle}
              buttonHeight={"35px"}
              buttonWidth={"140px"}
            />
          </span> */}
        </div>
      )}
    </>
  );
}

export default CustomerInfo;
