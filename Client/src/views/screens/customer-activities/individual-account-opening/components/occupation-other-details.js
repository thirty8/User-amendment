import React, { useState, useEffect } from "react";
import Label from "../../../../../components/others/Label/Label";
import axios from "axios";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../config/constant";
import ListOfValue from "./comp/ListOfValue";
import InputField from "./comp/InputField";
import { Modal, Button } from "@mantine/core";
// import { formatDate } from "../helpers/date_formater";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../helpers/date_formater";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
const host = window.location.host;

function Occupation_other_details({
  data,
  validationRules,
  activeStep,
  formValues,
  setFormValues,
  formErrors,
  setFormErrors,
  handleClose,
  handleShow,
  show_Second,
  formData,
  setFormData,
  handleChange,
  message,
  handleCheckValueClick,
  isModalOpen,
  closeModal,
  displayValidData,
  handleBlurValidation,
  handleSubmitValidation,
  dynamicNumber,
  setDynamicNumber,
  isLoading,
  userExists,
  userDataValidation,
  isValid,
  typeOfAccount,

  saveDataNewForm,

  add_new_relation,
  handleInputChange,
  handleCheckboxChange,
  handleSubmitNewRelation,
  setAddNewRelation,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // axios.get(API_SERVER + '/get-unique-ref').then(response => {
    //       setRelationNo(response.data[0].unique_ref);
    //       // console.log(response.data[0].unique_ref,":::Batch")
    //       console.log(relationNo,"::::::::::::::::::::Batch")
    //   });
    const response = await axios.get(API_SERVER + "/get-unique-ref");
    setRelationNo(response.data[0].unique_ref);
    console.log(response.data[0].unique_ref, "::::::::::::::::::::Batch");

    const formValuesFields = {
      relationNo: response.data[0].unique_ref,
      firstName,
      middleName,
      surname,
      email,
      dob,
      phoneNumber,
      gender,
      tinNumber,
      id_number,
      issuing_auth,
      issuing_date,
      idExpiryDate,
      issuingPlace,
      houseNumber,
      streetName,
      locationGp,
      risk,
    };
    const newTableData = [...tableData, formValues, formValuesFields];
    console.log("Form data saved :::", formValues, formValuesFields);
    setTableData(newTableData);
    setAnothertableData(newTableData);
    localStorage.setItem("get User Data", JSON.stringify(newTableData));

    console.log(userData, "::::: get User Data");
    swal({
      title: "Success",
      text: "Data has been added to the table",
      icon: "success",
      confirmButtonText: "OK",
    });
    setFirstName("");
    setMiddleName("");
    setSurname("");
    setGender("");
    setEmail("");
    setDob("");
    setPhoneNumber("");
    setTinNumber("");
    setId_number("");
    setIssuing_auth("");
    setIssuingDate("");
    setIdExpiryDate("");
    setIssuingPlace("");
    setHouseNumber("");
    setStreetName("");
    setLocationGp("");
    setRisk("");
    setFormValues("");
  };

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

  const residentOpions = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

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
                  id={"nationalID"}
                  type="text"
                  name="NATIONAL_ID_V"
                  value={
                    add_new_relation.NATIONAL_ID_V ||
                    saveDataNewForm.nationalID ||
                    ""
                  }
                  // onChange={(e) => setDynamicNumber(e.target.value)}
                  onChange={(e) =>
                    handleInputChange("NATIONAL_ID_V", e.target.value)
                  }
                  onBlur={handleBlurValidation}
                />

                {isLoading && isValid == false && (
                  <div className="ml-2">validating...</div>
                )}
              </div>
            </div>
            {/* <div className="text-left -ml-5 border rounded px-1 py-0">
                  <button className="" onClick={handleCheckValueClick}>Ve</button>
                </div> */}

            <Modal
              opened={isModalOpen && userExists}
              onClose={() => {
                closeModal();
                setDynamicNumber("");
              }}
              title="Validation Result"
              size="lg"
            >
              <>
                <div>
                  {/* First Tab */}
                  {/* First Tab */}
                  <div className="flex items-center justify-center space-x-20">
                    {/* Gender */}
                    <div class="w-full max-w-xl mt-2">
                      <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
                        <div class="md:w-1/3 text-right">
                          <Label
                            label="Gender"
                            required={true}
                            fontSize="85%"
                          />
                        </div>

                        <div>
                          <div>
                            {genderOptions.map((option) => (
                              <label
                                key={option.value}
                                className="inline-flex items-center mr-4"
                              >
                                <input
                                  id="gender"
                                  type="radio"
                                  name="P_gender"
                                  value={option.value}
                                  checked={
                                    userDataValidation.gender === option.value
                                  }
                                  onChange={() =>
                                    handleChange("P_gender", option.value)
                                  }
                                  onKeyDown={(e) => {
                                    switchFocus(e, "firstname");
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      const input =
                                        document.getElementById("firstname");
                                      input.focus();
                                    }
                                  }}
                                />{" "}
                                {option.label}
                              </label>
                            ))}
                          </div>

                          {formData.P_gender === "Other" && (
                            <div class="md:flex md:items-center  mb-1 ">
                              <div class="">
                                <Label label="Others" fontSize="85%" />
                              </div>
                              <div class=" ">
                                <InputField
                                  // label="Others"
                                  inputWidth="220px"
                                  type="text"
                                  name="P_otherGender"
                                  placeholder={"Please Specify"}
                                  value={formData.P_otherGender}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* End */}

                  {/* Second */}
                  {/* Second Tab */}
                  <div className="flex items-center justify-center space-x-20 -mt-[10px]">
                    {/* First Name */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                        <div class="md:w-1/3 text-right">
                          <Label
                            label="First Name"
                            required={true}
                            fontSize="85%"
                          />
                        </div>
                        <div className="md:w-2/3 md:ml-[2px]">
                          <InputField
                            id={"firstname"}
                            inputWidth="300px"
                            type="text"
                            name="P_fname"
                            value={userDataValidation.first_name}
                            onChange={(e) =>
                              handleChange("P_fname", e.target.value)
                            }
                            onKeyPress={(e) => {
                              switchFocus(e, "Middle");
                            }}
                            onBlur={(e) => {
                              if (e.target.value === "") {
                                // setOnBlurErrorFirstName("Please enter First name");
                              } else {
                                // Clear the error message if the value is valid
                                // clearError("P_fname");
                                // setErrorTest("P_fname")
                                // setOnBlurErrorFirstName("")
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* End */}

                  {/* Third Tab */}
                  <div className="flex items-center justify-center space-x-20 -mt-[10px]">
                    {/* Surname */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                        <div class="md:w-1/3 text-right">
                          <Label
                            label="Surname"
                            required={true}
                            fontSize="85%"
                          />
                        </div>
                        <div className="md:w-2/3 md:ml-[2px]">
                          <InputField
                            id="Surname"
                            inputWidth="300px"
                            name="P_sname"
                            value={userDataValidation.surname}
                            onChange={(e) =>
                              handleChange("P_sname", e.target.value)
                            }
                            onKeyPress={(e) => {
                              switchFocus(e, "shortName");
                            }}
                            onBlur={(e) => {
                              if (e.target.value === "") {
                                // setOnBlurErrorSurname("Please enter surname");
                              } else {
                                // Clear the error message if the value is valid
                                // clearError("P_fname");
                                // setErrorTest("P_fname")
                                // setOnBlurErrorSurname("")
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fourth Tab */}
                  <div className="flex items-center justify-center space-x-20 -mt-[10px]">
                    {/* Full Name */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                        <div class="md:w-1/3 text-right">
                          <Label label="Full Name" fontSize="85%" />
                        </div>
                        <div className="md:w-2/3 md:ml-[2px]">
                          <InputField
                            id="fullname"
                            inputWidth="300px"
                            value={`${userDataValidation.first_name ?? ""} ${
                              formData.P_mname ?? ""
                            } ${userDataValidation.surname ?? ""}`}
                            onKeyPress={(e) => {
                              switchFocus(e, "preferredname");
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fifth Tab */}
                  <div className="flex items-center justify-center space-x-20 -mt-[10px]">
                    {/*Date Of Birth*/}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                        <div class="md:w-1/3 text-right">
                          <Label
                            label="Date Of Birth"
                            required={true}
                            fontSize="85%"
                          />
                        </div>
                        <div class="md:w-2/3 md:ml-[2px]">
                          <InputField
                            id="dob"
                            name="P_dob"
                            inputWidth="300px"
                            // type={'date'}
                            placeholder="dd/mm/yyyy"
                            value={userDataValidation.date_of_birth}
                            onChange={(e) => {
                              handleChange("P_dob", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sixth Tab */}
                  <div className="flex items-center justify-center space-x-20 -mt-[10px]">
                    {/* Country */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                        <div class="md:w-1/3 text-right">
                          <Label
                            label="Country"
                            required={true}
                            fontSize="85%"
                          />
                        </div>
                        <div className="md:w-2/3 ">
                          <ListOfValue
                            id={"Country"}
                            inputWidth="300px"
                            data={country}
                            value={userDataValidation.residence_country}
                            onChange={(value) => {
                              handleChange("P_country", value);
                              setTimeout(() => {
                                const input = document.getElementById("region");
                                input.focus();
                              }, 0);
                            }}
                            onKeyDown={(e) => {
                              switchFocus(e, "region");
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const input = document.getElementById("region");
                                input.focus();
                              }
                            }}
                            onBlur={(value) => {
                              if (value === "") {
                                // setOnBlurErrorCountry("Please select a Country");
                              } else {
                                // Clear the error message if the value is valid
                                // clearError("P_fname");
                                // setErrorTest("P_fname")
                                // setOnBlurErrorCountry("")
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* County / Region */}
                  </div>

                  {/* End */}
                </div>
              </>

              <Button
                onClick={() => {
                  closeModal();
                  setDynamicNumber("");
                }}
                variant="light"
              >
                Close
              </Button>
            </Modal>
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
                value={add_new_relation.OVERRIDE_CODE_v}
                onChange={(e) =>
                  handleInputChange("OVERRIDE_CODE_v", e.target.value)
                }
                onKeyDown={(e) => {
                  switchFocus(e, "dateissued");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("dateissued");
                    input.focus();
                  }
                }}
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
                value={add_new_relation.district_v}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    P_Curr_addr_region: value,
                  }));
                  handleInputChange("district_v", value);
                  setTimeout(() => {
                    const input = document.getElementById("district");
                    input.focus();
                  }, 0);
                  const getSubCounty = () => {
                    axios
                      .post(
                        API_SERVER + "/api/get-subcounty-details",
                        {
                          code: "SCU",
                          county: value,
                        },
                        { headers }
                      )
                      .then(function (response) {
                        setSubCounty(response.data);
                      });
                  };

                  getSubCounty();
                }}
                // onChange={(value) => handleChange('district_v', value)}
                onKeyDown={(e) => {
                  switchFocus(e, "district");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("district");
                    input.focus();
                  }
                }}
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
                value={add_new_relation.region_v}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, P_Curr_addr_city: value }));
                  handleInputChange("region_v", value);
                  setTimeout(() => {
                    const input = document.getElementById("district");
                    input.focus();
                  }, 0);

                  const getWard = () => {
                    axios
                      .post(
                        API_SERVER + "/api/get-ward-details",
                        {
                          code: "SCW",
                          subCounty: value,
                        },
                        { headers }
                      )
                      .then(function (response) {
                        //  localStorage.setItem("getCountry", JSON.stringify(response.data));
                        //  console.log("getCountry :", response.data);
                        setWard(response.data);
                      });
                  };

                  getWard();
                }}
                // onChange={(value) => handleChange('P_district', value)}
                onKeyDown={(e) => {
                  switchFocus(e, "district");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("district");
                    input.focus();
                  }
                }}
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
                value={add_new_relation.location_v}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    P_Curr_addr_location: value,
                  }));
                  handleInputChange("location_v", value);
                  setTimeout(() => {
                    const input = document.getElementById("subLocation");
                    input.focus();
                  }, 0);

                  // getWard();
                }}
                // onChange={(value) => handleChange('P_district', value)}
                onKeyDown={(e) => {
                  switchFocus(e, "subLocation");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("subLocation");
                    input.focus();
                  }
                }}
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
                value={add_new_relation.sublocation_v}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    P_Curr_addr_nearestlandmark: value,
                  }));
                  handleInputChange("sublocation_v", value);
                  setTimeout(() => {
                    const input = document.getElementById("dateissued");
                    input.focus();
                  }, 0);
                }}
                // onChange={(value) => handleChange('P_district', value)}
                onKeyDown={(e) => {
                  switchFocus(e, "dateissued");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("dateissued");
                    input.focus();
                  }
                }}
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
                  add_new_relation.NIN_dateissued_v
                    ? new Date(add_new_relation.NIN_dateissued_v)
                    : null
                }
                // onChange={handleStartDateChange}
                onChange={(date) =>
                  setAddNewRelation({
                    ...add_new_relation,
                    NIN_dateissued_v: formatDate(date.toISOString(), true),
                  })
                }
                className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
                onKeyDown={(e) => {
                  switchFocus(e, "dateexpired");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("dateexpired");
                    input.focus();
                  }
                }}
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
                  add_new_relation.nin_expiry_v
                    ? new Date(add_new_relation.nin_expiry_v)
                    : null
                }
                // onChange={handleStartDateChange}
                onChange={(date) =>
                  setAddNewRelation({
                    ...add_new_relation,
                    nin_expiry_v: formatDate(date.toISOString(), true),
                  })
                }
                className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                dateFormat="dd-MM-yyyy"
                placeholderText="dd-mm-yyyy"
                onKeyDown={(e) => {
                  switchFocus(e, "tin_v");
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("tin_v");
                    input.focus();
                  }
                }}
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
                value={add_new_relation.tin_v}
                onChange={(e) => handleInputChange("tin_v", e.target.value)}
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
                value={add_new_relation.ID_type_v}
                onChange={(value) => handleInputChange("ID_type_v", value)}
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
                value={add_new_relation.ID_issued_authority_v}
                onChange={(e) =>
                  handleInputChange("ID_issued_authority_v", e.target.value)
                }
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
                value={add_new_relation.id_nO_v}
                onChange={(e) => handleInputChange("id_nO_v", e.target.value)}
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
                value={add_new_relation.id_issue_at_v}
                onChange={(e) =>
                  handleInputChange("id_issue_at_v", e.target.value)
                }
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
                selected={
                  add_new_relation.ID_date_issued_v
                    ? new Date(add_new_relation.ID_date_issued_v)
                    : null
                }
                // onChange={handleStartDateChange}
                onChange={(date) =>
                  setAddNewRelation({
                    ...add_new_relation,
                    ID_date_issued_v: formatDate(date.toISOString(), true),
                  })
                }
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
                selected={
                  add_new_relation.ID_expirydate_v
                    ? new Date(add_new_relation.ID_expirydate_v)
                    : null
                }
                // onChange={handleStartDateChange}
                onChange={(date) =>
                  setAddNewRelation({
                    ...add_new_relation,
                    ID_expirydate_v: formatDate(date.toISOString(), true),
                  })
                }
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

export default Occupation_other_details;
