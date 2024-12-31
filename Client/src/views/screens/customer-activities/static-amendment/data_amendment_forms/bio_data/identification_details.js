import React, { useState, useEffect } from "react";

import axios from "axios";
import swal from "sweetalert";
// import { API_SERVER } from "../../../../../config/constant";
// import ListOfValue from "./comp/ListOfValue";
// import InputField from "./comp/InputField";
import { Modal, Button } from "@mantine/core";
// import { formatDate } from "../helpers/date_formater";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Label from "../../../../../../components/others/Label/Label";
import { API_SERVER } from "../../../../../../config/constant";
import ListOfValue from "../../components/ListOfValue";
import InputField from "../../components/InputField";
import { formatDate } from "../../../individual-account-opening/helpers/date_formater";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
const host = window.location.host;

function Identification_details({
  formValues,
  setFormValues,
  message,
  isLoading,
  isValid,

  showBioData,

  editData,
  hasChanged, 
  setEditData
}) {
  const [location, setLocation] = useState(null);
  const [nationality, setNationality] = useState("");
  const [tableData, setTableData] = useState([]);
  const [iDType, setIDType] = useState(false);
  const [occupation, setOccupation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [resident, setResident] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tinNumber, setTinNumber] = useState("");
  const [id_number, setId_number] = useState("");
  const [issuing_auth, setIssuing_auth] = useState("");
  const [issuing_date, setIssuingDate] = useState("");
  const [idExpiryDate, setIdExpiryDate] = useState("");
  const [issuingPlace, setIssuingPlace] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [locationGp, setLocationGp] = useState("");
  const [risk, setRisk] = useState("");
  const [relationNo, setRelationNo] = useState("");
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [anothertableData, setAnothertableData] = useState([]);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState([]);
  const [subCounty, setSubCounty] = useState([]);
  const [county, setCounty] = useState([]);
  const [ward, setWard] = useState([]);

  const [language, setLanguage] = useState([]);

  const [title, setTitle] = useState([]);
  // const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const getTitle = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "TIT",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("title", JSON.stringify(response.data));
          setTitle(response.data);
          // console.log("Is this the Title ?::::",response.data);
        });
    };

    getTitle();
  }, []);

  useEffect(() => {
    const getCountry = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CON",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          //  console.log("getCountry :", response.data);
          setCountry(response.data);
        });
    };

    getCountry();
  }, []);

  useEffect(() => {
    const getCounty = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CUN",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          //  console.log("getCountry :", response.data);
          setCounty(response.data);
        });
    };

    getCounty();
  }, []);

  useEffect(() => {
    const getPreferredLanguage = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "LNG",
          },
          { headers }
        )
        .then(function (response) {
          setLanguage(response.data);
        });
    };

    getPreferredLanguage();
  }, []);

  const maritalStatus = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorce", label: "Divorce" },
  ];

  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const minorOpions = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  console.log(firstName, "::: firstNamfirstNamee");

  const handleMiddleName = (event) => {
    setMiddleName(event.target.value);
  };

  const handleSurname = (event) => {
    setSurname(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleResident = (event) => {
    setResident(event.target.value);
  };

  const handleDoB = (event) => {
    setDob(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleTinNumber = (event) => {
    setTinNumber(event.target.value);
  };

  const handleIdNumber = (event) => {
    setId_number(event.target.value);
  };

  const handleIssueAuth = (event) => {
    setIssuing_auth(event.target.value);
  };

  const handleIssuingDate = (event) => {
    setIssuingDate(event.target.value);
  };

  const handleIdExpiryDate = (event) => {
    setIdExpiryDate(event.target.value);
  };

  const handleIssuingPlace = (event) => {
    setIssuingPlace(event.target.value);
  };

  const handleHouseNo = (event) => {
    setHouseNumber(event.target.value);
  };

  const handleStreetName = (event) => {
    setStreetName(event.target.value);
  };

  const handleLocation = (event) => {
    setLocationGp(event.target.value);
  };

  const handleRisk = (event) => {
    setRisk(event.target.value);
  };

  // useEffect(() => {
  //   setAnothertableData(tableData)
  // }, [])

  ////// // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 

  const userData = JSON.parse(localStorage.getItem("get User Data"));

  // console.log(anothertableData, " :::::::::::::::anothertableData")

  // const [data, setData] = useState()

  // const columns = ["Relation No", "first Name", "Surname", "Middle Name", "Gender", "Date of Birth", "Mobile 1", "Mandate Level", "Approver Limit"];

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const getTheme = JSON.parse(localStorage.getItem("theme"));
  const [randomString, setRandomString] = useState("");

  const generateRandomString = () => {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000; // generates a random 5-digit number
    setRisk(randomNumber.toString()); // converts the number to a string and sets it as the state value
  };

  useEffect(() => {
    // Get Account Mandate
    const getAccountMandate = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "OCC",
          },
          { headers }
        )
        .then(function (response) {
          setOccupation(response.data);
        });
    };

    getAccountMandate();
  }, []);

  // console.log("occupation", occupation)

  useEffect(() => {
    const getCountry = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CON",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          //  console.log("getCountry :", response.data);
          setNationality(response.data);
        });
    };

    getCountry();
  }, []);

  useEffect(() => {
    const getCountry = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "HRD",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          //  console.log("getCountry :", response.data);
          setIDType(response.data);
        });
    };

    getCountry();
  }, []);



  //   const [county, setCounty] = useState()
  // const [subCounty, setSubCounty] = useState([])
  // const [ward, setWard] = useState([])

  useEffect(() => {
    const getCounty = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CUN",
            //   key:'twene'
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          //  console.log("getCountry :", response.data);
          setCounty(response.data);
        });
    };

    getCounty();
  }, []);

  return (
    <div className="bg-white">
      

      {/* Third Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-2.5">
        {/* National ID */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="National ID" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <div className="">
                {/* <h1>User Validation</h1> */}
                <InputField
                  id={"NIN"}
                  type="text" 
                  name="NIN"
                  value={editData?.[0]?.NIN || ""}
                  onChange={(e) => {
                    const newEditData = [...editData];
                    newEditData[0] = {
                      ...newEditData[0],
                      NIN: e.target.value
                    };
                    console.log("newEditData", newEditData)
                    setEditData(newEditData);
                  }}
                  backgroundColor={`${
                    hasChanged("NIN", editData?.[0]?.NIN)
                      ? "rgb(253 224 71)"
                      : "white"
                  }`}
                />

                {isLoading && isValid == false && (
                  <div className="ml-2">validating...</div>
                )}
              </div>
            </div>
            {/* <div className="text-left -ml-5 border rounded px-1 py-0">
                  <button className="" onClick={handleCheckValueClick}>Ve</button>
                </div> */}
          </div>
        </div>

        {/* Serial Number */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Serial Number" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                id={"nationalID"}
                inputWidth="300px"
                name="OVERRIDE_CODE_v"
                // value={add_new_relation.OVERRIDE_CODE_v}
                // onChange={(e) =>
                //   handleInputChange("OVERRIDE_CODE_v", e.target.value)
                // }
                // onKeyDown={(e) => {
                //   switchFocus(e, "dateissued");
                //   if (e.key === "Enter") {
                //     e.preventDefault();
                //     const input = document.getElementById("dateissued");
                //     input.focus();
                //   }
                // }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-20 -mt-2.5">
        {/* District */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="District" required={true} fontSize="85%" />
            </div>
            <div className="md:w-2/3 ">
              <ListOfValue
                id={"region"}
                data={county}
                inputWidth="300px"
                value={showBioData?.DISTRICT}
                // onChange={(value) => {
                //   setFormData((prev) => ({
                //     ...prev,
                //     P_Curr_addr_region: value,
                //   }));
                //   handleInputChange("district_v", value);
                //   setTimeout(() => {
                //     const input = document.getElementById("district");
                //     input.focus();
                //   }, 0);
                //   const getSubCounty = () => {
                //     axios
                //       .post(
                //         API_SERVER + "/api/get-subcounty-details",
                //         {
                //           code: "SCU",
                //           county: value,
                //         },
                //         { headers }
                //       )
                //       .then(function (response) {
                //         setSubCounty(response.data);
                //       });
                //   };

                //   getSubCounty();
                // }}
                // onChange={(value) => handleChange('district_v', value)}
                // onKeyDown={(e) => {
                //   switchFocus(e, "district");
                //   if (e.key === "Enter") {
                //     e.preventDefault();
                //     const input = document.getElementById("district");
                //     input.focus();
                //   }
                // }}
              />
            </div>
          </div>
        </div>

        {/* Division */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Division" required={true} fontSize="85%" />
            </div>
            <div className="md:w-2/3 ">
              <ListOfValue
                data={subCounty}
                id={"district"}
                inputWidth="300px"
                value={showBioData?.REGION}
                // onChange={(value) => {
                //   setFormData((prev) => ({ ...prev, P_Curr_addr_city: value }));
                //   handleInputChange("region_v", value);
                //   setTimeout(() => {
                //     const input = document.getElementById("district");
                //     input.focus();
                //   }, 0);

                //   const getWard = () => {
                //     axios
                //       .post(
                //         API_SERVER + "/api/get-ward-details",
                //         {
                //           code: "SCW",
                //           subCounty: value,
                //         },
                //         { headers }
                //       )
                //       .then(function (response) {
                //         //  localStorage.setItem("getCountry", JSON.stringify(response.data));
                //         //  console.log("getCountry :", response.data);
                //         setWard(response.data);
                //       });
                //   };

                //   getWard();
                // }}
                // onChange={(value) => handleChange('P_district', value)}
                // onKeyDown={(e) => {
                //   switchFocus(e, "district");
                //   if (e.key === "Enter") {
                //     e.preventDefault();
                //     const input = document.getElementById("district");
                //     input.focus();
                //   }
                // }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-20 -mt-2.5">
        {/* Location */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Location" required={true} fontSize="85%" />
            </div>
            <div className="md:w-2/3 md:ml-[2px]">
              <ListOfValue
                data={ward}
                id={"district"}
                inputWidth="300px"
                // value={add_new_relation.location_v}
                // onChange={(value) => {
                //   setFormData((prev) => ({
                //     ...prev,
                //     P_Curr_addr_location: value,
                //   }));
                //   handleInputChange("location_v", value);
                //   setTimeout(() => {
                //     const input = document.getElementById("subLocation");
                //     input.focus();
                //   }, 0);

                //   // getWard();
                // }}
                // // onChange={(value) => handleChange('P_district', value)}
                // onKeyDown={(e) => {
                //   switchFocus(e, "subLocation");
                //   if (e.key === "Enter") {
                //     e.preventDefault();
                //     const input = document.getElementById("subLocation");
                //     input.focus();
                //   }
                // }}
              />
            </div>
          </div>
        </div>

        {/* Sub-Location */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Sub Location" required={true} fontSize="85%" />
            </div>
            <div className="md:w-2/3 md:ml-[2px]">
              <ListOfValue
                data={ward}
                id={"subLocation"}
                inputWidth="300px"
                // value={add_new_relation.SUB_rel_v}
                // onChange={(value) => {
                //   setFormData((prev) => ({
                //     ...prev,
                //     P_Curr_addr_location: value,
                //   }));
                //   handleInputChange("SUB_rel_v", value);
                //   setTimeout(() => {
                //     const input = document.getElementById("dateissued");
                //     input.focus();
                //   }, 0);
                // }}
                // // onChange={(value) => handleChange('P_district', value)}
                // onKeyDown={(e) => {
                //   switchFocus(e, "dateissued");
                //   if (e.key === "Enter") {
                //     e.preventDefault();
                //     const input = document.getElementById("dateissued");
                //     input.focus();
                //   }
                // }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-2.5">
        {/* Date Issued */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Date Issued" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[30px]">
              <DatePicker
                id="dateissued"
                selected={
                  showBioData?.NIN_DATE_ISSUE
                    ? new Date(showBioData?.NIN_DATE_ISSUE)
                    : null
                }
                // // onChange={handleStartDateChange}
                // // onChange={(date) =>
                // //   setAddNewRelation({
                // //     ...add_new_relation,
                // //     NIN_dateissued_v: formatDate(date.toISOString(), true),
                // //   })
                // // }

                // onKeyDown={(e) => {
                //   switchFocus(e, "dateexpired");
                //   if (e.key === "Enter") {
                //     e.preventDefault();
                //     const input = document.getElementById("dateexpired");
                //     input.focus();
                //   }
                // }}
                className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="dd-mm-yyyy"
              />
            </div>
          </div>
        </div>

        {/* Date Expiry */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label
                label="Date Expiry"
                // required={true}
                fontSize="85%"
              />
            </div>
            <div class="md:w-2/3 ml-[30px]">
              <DatePicker
                id="dateexpired"
                selected={
                  showBioData?.NIN_EXPIRY_DATE
                    ? new Date(showBioData?.NIN_EXPIRY_DATE)
                    : null
                }
                onChange={(date) => {
                  const formattedDate = formatDate(
                    date.toISOString(), 
                    false
                  );

                  console.log("formattedDate", formattedDate)

                  // Update editData with the new expiry date
                  setEditData((prevEditData) => {
                    if (!Array.isArray(prevEditData)) {
                      return prevEditData;
                    }
                    return prevEditData.map(item => ({
                      ...item,
                      NIN_EXPIRY_DATE: formattedDate
                    }));
                  });
                }}
                className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="dd-mm-yyyy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-2.5">
        {/* ID Type */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="KRA Pin" required={true} fontSize="85%" />
            </div>
            <div className="md:w-2/3 ">
              <InputField
                id="tin_v"
                inputWidth="300px"
                name="tin_v"
                value={showBioData?.TIN}
                // onChange={(e) => handleInputChange("tin_v", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Date Issued */}
        <div class="w-full max-w-xl mt-2 invisible">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Marrital Status" required={true} fontSize="85%" />
            </div>
            <div class="ml-5">
              {maritalStatus.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    id="gender"
                    type="radio"
                    name="P_MarritalStatus"
                    value={option.value}
                  />{" "}
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-1 text-black font-extrabold">Other Type of ID</div>

      {/* Fourth Tab */}
      <div className="flex items-center justify-center space-x-20">
        {/* ID Type */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="ID Type" fontSize="85%" />
            </div>
            <div className="md:w-2/3 ">
              <ListOfValue
                data={iDType}
                inputWidth="300px"
                // value={add_new_relation.ID_type_v}
                // onChange={(value) => handleInputChange("ID_type_v", value)}
              />
            </div>
          </div>
        </div>

        {/* ID Type */}
        {/* Issue Authority */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label
                label="Issue Authority"
                // required={true}
                fontSize="85%"
              />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                inputWidth="300px"
                name="ID_issued_authority_v"
                // value={add_new_relation.ID_issued_authority_v}
                // onChange={(e) =>
                //   handleInputChange("ID_issued_authority_v", e.target.value)
                // }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-20 -mt-2.5">
        {/* ID Number Is Mandatory */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label
                label="ID Number"
                // required={true}
                fontSize="85%"
              />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                inputWidth="300px"
                name="id_nO_v"
                // value={add_new_relation.id_nO_v}
                // onChange={(e) => handleInputChange("id_nO_v", e.target.value)}
              />
              {message}
            </div>
          </div>
        </div>

        {/* Date Issued */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label
                label="ID Issued At"
                // required={true}
                fontSize="85%"
              />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                inputWidth="300px"
                name="id_issue_at_v"
                // value={add_new_relation.id_issue_at_v}
                // onChange={(e) =>
                //   handleInputChange("id_issue_at_v", e.target.value)
                // }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-2.5">
        {/* Date Expiry */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label
                label="Date Issued"
                // required={true}
                fontSize="85%"
              />
            </div>
            <div class="md:w-2/3 md:ml-[30px]">
            <DatePicker
                // selected={
                //   add_new_relation.ID_date_issued_v
                //     ? new Date(add_new_relation.ID_date_issued_v)
                //     : null
                // }
                // onChange={handleStartDateChange}
                // onChange={(date) =>
                //   setAddNewRelation({
                //     ...add_new_relation,
                //     ID_date_issued_v: formatDate(date.toISOString(), true),
                //   })
                // }
                className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
              />
              {/* <InputField
                inputWidth="300px"
                type={"date"}
                name="ID_date_issued_v"
                value={add_new_relation.ID_date_issued_v}
                onChange={(e) =>
                  handleInputChange("ID_date_issued_v", e.target.value)
                }
              /> */}
            </div>
          </div>
        </div>

        {/* Date Issued */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label
                label="Date Expiry"
                // required={true}
                fontSize="85%"
              />
            </div>
            <div class="md:w-2/3 md:ml-[30px]">
            <DatePicker
                // selected={
                //   add_new_relation.ID_expirydate_v
                //     ? new Date(add_new_relation.ID_expirydate_v)
                //     : null
                // }
                // onChange={handleStartDateChange}
                // onChange={(date) =>
                //   setAddNewRelation({
                //     ...add_new_relation,
                //     ID_expirydate_v: formatDate(date.toISOString(), true),
                //   })
                // }
                className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
              />
              {/* <InputField
                inputWidth="300px"
                type={"date"}
                name="ID_expirydate_v"
                value={add_new_relation.ID_expirydate_v}
                onChange={(e) =>
                  handleInputChange("ID_expirydate_v", e.target.value)
                }
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Identification_details;
