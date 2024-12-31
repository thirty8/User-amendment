import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Label from "../../../../../components/others/Label/Label";
import axios from "axios";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../config/constant";
import ListOfValue from "./comp/ListOfValue";
import InputField from "./comp/InputField";
import Phone_number from "./comp/Phone_number";
import EmailInput from "./comp/EmailInput";
import { formatDate, formatDateForInput } from "../helpers/date_formater";
// import { RelationContext } from "../../../contextapi/RelationContext";
const host = window.location.host;

function Personal_Details({
  saveDataNewForm,
  clearError,
  setErrorTest,
  errors,
  hideRadioButtons,
  selectedOptions,
  data,
  validationRules,
  activeStep,
  setChecked,
  formValues,
  setFormValues,
  formData,
  handleChange,
  setFormData,
  response,
  error,

  add_new_relation,
  handleInputChange,
  handleCheckboxChange,
  handleSubmitNewRelation,
  setAddNewRelation,
}) {
  const [title, setTitle] = useState([]);
  const [country, setCountry] = useState([]);
  const [subCounty, setSubCounty] = useState([]);
  const [county, setCounty] = useState([]);
  const [ward, setWard] = useState([]);
  const [pwd, setPWD] = useState([]);
  const [region, setRegion] = useState(null);
  const [guardianType, setGuardianType] = useState([]);
  const [relationship, setRelationship] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
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
  const [minor, setMinor] = useState("No");
  const [guarantorID, setGuarantorID] = useState("");
  const [health, setHealth] = useState("No");
  const [healthChallengeType, setHealthChallengeType] = useState("");
  const [staff, setStaff] = useState("No");
  const [staffID, setStaffID] = useState("");
  const [language, setLanguage] = useState([]);
  const [inputError, setInputError] = useState("");
  const [inputErrorMiddleName, setInputErrorMiddleName] = useState("");
  const [inputErrorSurname, setInputErrorSurname] = useState("");
  const [inputErrorFullName, setInputErrorFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [nationality, setNationality] = useState("");
  const [error1, setError1] = useState(null);

  useEffect(() => {
    const getAccountMandate = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          {
            code: "OCC",
          },
          { headers }
        );

        setOccupation(response.data);
      } catch (err) {
        console.error("Error fetching occupation data:", err);
        setError1("Failed to fetch occupation data. Please try again later.");
      } finally {
        // setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    };

    getAccountMandate();
  }, []);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CON",
          },
          { headers }
        );

        setNationality(response.data);
      } catch (err) {
        console.error("Error fetching country data:", err);
        setError1("Failed to fetch country data. Please try again later.");
      } finally {
        // setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    };

    getCountry();
  }, []);

  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const minorOpions = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const healthOpions = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const staffOpions = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const staffRelated = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const taxableflag = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const DirectorRelated = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const maritalStatus = [
    { value: "SINGLE", label: "Single" },
    { value: "MARRIED", label: "Married" },
    { value: "DEVORCE", label: "Divorce" },
  ];

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const getTitle = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          {
            code: "TIT",
          },
          { headers }
        );

        setTitle(response.data);
      } catch (err) {
        console.error("Error fetching title:", err);
        setError1("Failed to fetch title. Please try again later.");
      } finally {
        // setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    };

    getTitle();
  }, []);

  console.log("Is this the Title ?::::", title);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CON",
          },
          { headers }
        );

        setCountry(response.data);
      } catch (err) {
        console.error("Error fetching country data:", err);
        setError1("Failed to fetch country data. Please try again later.");
      } finally {
        // setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    };

    getCountry();
  }, []);

  useEffect(() => {
    const getCounty = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CUN",
          },
          { headers }
        );

        setCounty(response.data);
      } catch (err) {
        console.error("Error fetching county data:", err);
        setError1("Failed to fetch county data. Please try again later.");
      } finally {
        // setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    };

    getCounty();
  }, []);

  useEffect(() => {
    const getPwd = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          {
            code: "PWD",
          },
          { headers }
        );

        setPWD(response.data);
      } catch (err) {
        console.error("Error fetching PWD data:", err);
        setError1("Failed to fetch password data. Please try again later.");
      } finally {
        // setLoading(false); // Ensure loading is set to false regardless of success or failure
      }
    };

    getPwd();
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

  useEffect(() => {
    // Relationship
    const getRelationships = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "RRE",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("title", JSON.stringify(response.data));
          setRelationship(response.data);
        });
    };
    getRelationships();
  }, []);

  useEffect(() => {
    const getRegion = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "REG",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("title", JSON.stringify(response.data));
          setRegion(response.data);
          // console.log("Is this the Title ?::::",response.data);
        });
    };

    getRegion();
  }, []);

  useEffect(() => {
    const getGuardianType = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "GUA",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("title", JSON.stringify(response.data));
          setGuardianType(response.data);
          // console.log("Is this the Title ?::::",response.data);
        });
    };

    getGuardianType();
  }, []);

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  const currentDate = new Date().toISOString().split("T")[0];

  const [onBlurErrorFirstName, setOnBlurErrorFirstName] = useState("");
  const [onBlurErrorSurname, setOnBlurErrorSurname] = useState("");

  const [onBlurErrorCountry, setOnBlurErrorCountry] = useState("");
  const [onBlurErrorGuadianID, setOnBlurErrorGuadianID] = useState("");

  const residentOpions = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <form className="bg-white">
      <div>
        {/* First Tab */}
        <div className="flex items-center justify-center space-x-20">
          {/* Title */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Title" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  data={title}
                  inputWidth="300px"
                  value={add_new_relation.title_v}
                  onChange={(value) => {
                    handleInputChange("title_v", value);
                    setTimeout(() => {
                      const input = document.getElementById("gender");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "gender");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("gender");
                      input.focus();
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Gender" required={true} fontSize="85%" />
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
                        name="gender_v"
                        value={option.value}
                        checked={add_new_relation.gender_v === option.value}
                        onChange={() =>
                          handleInputChange("gender_v", option.value)
                        }
                        onKeyDown={(e) => {
                          switchFocus(e, "firstname");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = document.getElementById("firstname");
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

        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-[10px]">
          {/* First Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="First Name" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  id={"firstname"}
                  inputWidth="300px"
                  type="text"
                  name="fname_v"
                  value={add_new_relation.fname_v || saveDataNewForm?.firstName || ""}
                  onChange={(e) => handleInputChange("fname_v", e.target.value)}
                  onKeyPress={(e) => {
                    switchFocus(e, "Middle");
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      setOnBlurErrorFirstName("Please enter First name");
                    } else {
                      setOnBlurErrorFirstName("");
                    }
                  }}
                />
                {onBlurErrorFirstName && (
                  <div className="error-message ml-5" style={{ color: "red" }}>
                    {onBlurErrorFirstName}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Middle Name" fontSize="85%" v />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  inputWidth="300px"
                  id="Middle"
                  name="mname_v"
                  value={add_new_relation.mname_v}
                  onChange={(e) => handleInputChange("mname_v", e.target.value)}
                  onKeyPress={(e) => {
                    switchFocus(e, "Surname");
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Third Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-[10px]">
          {/* Surname */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Surname" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  id="Surname"
                  inputWidth="300px"
                  name="sname_v"
                  value={add_new_relation.sname_v || saveDataNewForm?.lastName || ""}
                  onChange={(e) => handleInputChange("sname_v", e.target.value)}
                  onKeyPress={(e) => {
                    switchFocus(e, "shortName");
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      setOnBlurErrorSurname("Please enter surname");
                    } else {
                      // Clear the error message if the value is valid
                      // clearError("P_fname");
                      // setErrorTest("P_fname")
                      setOnBlurErrorSurname("");
                    }
                  }}
                />
                {/* {errors.P_sname && <div className="error-message ml-5" style={{ color: 'red' }}>{errors.P_sname}</div>} */}
                {onBlurErrorSurname && (
                  <div className="error-message ml-5" style={{ color: "red" }}>
                    {onBlurErrorSurname}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Short Name*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Short Name" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px]">
                <InputField
                  inputWidth="300px"
                  id="shortName"
                  name="short_name_v"
                  value={add_new_relation.short_name_v}
                  onChange={(e) =>
                    handleInputChange("short_name_v", e.target.value)
                  }
                  onKeyPress={(e) => {
                    switchFocus(e, "fullname");
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
                  value={`${add_new_relation.fname_v ?? ""} ${
                    add_new_relation.mname_v ?? ""
                  } ${add_new_relation.sname_v ?? ""}`}
                  onKeyPress={(e) => {
                    switchFocus(e, "preferredname");
                  }}
                />
              </div>
            </div>
          </div>

          {/* Preferred Name*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Preferred Name" fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  id="preferredname"
                  inputWidth="300px"
                  name="preferred_name_v"
                  value={add_new_relation.preferred_name_v}
                  onChange={(e) =>
                    handleInputChange("preferred_name_v", e.target.value)
                  }
                  onKeyPress={(e) => {
                    switchFocus(e, "alias");
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fifth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-[10px]">
          {/* Alias*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Alias" fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  id="alias"
                  inputWidth="300px"
                  name="alias_v"
                  value={add_new_relation.alias_v}
                  onChange={(e) => handleInputChange("alias_v", e.target.value)}
                  onKeyPress={(e) => {
                    switchFocus(e, "dob");
                  }}
                />
              </div>
            </div>
          </div>

          {/*Date Of Birth*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Date Of Birth" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[30px] ">
                <DatePicker
                  id="dob"
                  selected={add_new_relation.dob_v ? new Date(add_new_relation.dob_v) : null} 
                  // onChange={handleStartDateChange}
                  onChange={(date) => {
                    // Format the date and get the minor status
                    const formattedDate = formatDate(date.toISOString(), false);

                    // Check if the selected date indicates a minor or not
                    const isMinor =
                      new Date(date) >
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      );

                    // Update state based on the selected date
                    setAddNewRelation({
                      ...add_new_relation,
                      dob_v: formattedDate,
                      minor_v: isMinor ? "Y" : "N", // Automatically select Yes for minors
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

        {/*  */}
        <div className="flex items-center justify-center space-x-20 -mt-[10px]">
          {/* Alias*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Phone number" fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <Phone_number
                  marginBottom={"8px"}
                  name="Mobile_comm_no_v"
                  value={
                    add_new_relation.Mobile_comm_no_v ??
                    saveDataNewForm?.mobileNumber1
                  }
                  onChange={(value) =>
                    handleInputChange("Mobile_comm_no_v", value)
                  }
                  inputWidth={"84%"}
                />
              </div>
            </div>
          </div>

          {/*Date Of Birth*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Email" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px]">
                <EmailInput
                  showIcon={true}
                  inputWidth="300px"
                  name="home_email_V"
                  value={add_new_relation.home_email_V}
                  onChange={(e) =>
                    handleInputChange("home_email_V", e.target.value)
                  }
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
                <Label label="Country" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  id={"Country"}
                  inputWidth="300px"
                  data={country}
                  value={add_new_relation.country_v}
                  onChange={(value) => {
                    handleInputChange("country_v", value);
                    setTimeout(() => {
                      const input = document.getElementById("marrital");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "marrital");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("marrital");
                      input.focus();
                    }
                  }}
                  onBlur={(value) => {
                    if (value === "") {
                      setOnBlurErrorCountry("Please select a Country");
                    } else {
                      // Clear the error message if the value is valid
                      // clearError("P_fname");
                      // setErrorTest("P_fname")
                      setOnBlurErrorCountry("");
                    }
                  }}
                />
                {onBlurErrorCountry && (
                  <div className="error-message ml-5" style={{ color: "red" }}>
                    {onBlurErrorCountry}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* County / Region */}
          <div class="w-full max-w-xl mt-2 ">
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
                      id="marrital"
                      type="radio"
                      name="mobile_bankphoneno_V"
                      value={option.value}
                      checked={
                        add_new_relation.mobile_bankphoneno_V === option.value
                      }
                      onChange={() =>
                        handleInputChange("mobile_bankphoneno_V", option.value)
                      }
                      onKeyDown={(e) => {
                        switchFocus(e, "preferredLanguage");
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input =
                            document.getElementById("preferredLanguage");
                          input.focus();
                        }
                      }}
                      // checked={add_new_relation.P_gender === option.value}
                      // onChange={() => handleInputChange('P_gender', option.value)}
                      // onKeyDown={(e)=>{switchFocus(e,"firstname")
                      // if (e.key === "Enter"){
                      //   e.preventDefault();
                      //   const input = document.getElementById("firstname");
                      //   input.focus()
                      // }
                      // }}
                    />{" "}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Eighth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-2.5">
          {/* Preferred Language */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Preferred Language"
                  required={true}
                  fontSize="85%"
                />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  id={"preferredLanguage"}
                  inputWidth="300px"
                  data={language}
                  value={add_new_relation.preferred_lang_v}
                  // onChange={(value) => handleInputChange('preferred_lang_v', value)}
                  onChange={(value) => {
                    handleInputChange("preferred_lang_v", value);
                    setTimeout(() => {
                      const input = document.getElementById("minor");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "minor");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("minor");
                      input.focus();
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Minor */}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Minor" fontSize="85%" />
              </div>

              <div>
                {minorOpions.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center mr-4"
                  >
                    <input
                      id="minor"
                      type="radio"
                      name="minor_v"
                      value={option.value}
                      checked={add_new_relation.minor_v === option.value}
                      onChange={() =>
                        handleInputChange("minor_v", option.value)
                      }
                      onKeyDown={(e) => {
                        switchFocus(e, "guardianid");
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = document.getElementById("guardianid");
                          input.focus();
                        }
                      }}
                    />{" "}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ninth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-2.5">
          {/* Guardian ID*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Guardian ID" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px]">
                <InputField
                  id={"guardianid"}
                  inputWidth="300px"
                  name="Guardian_id_v"
                  value={add_new_relation.Guardian_id_v}
                  onChange={(e) =>
                    handleInputChange("Guardian_id_v", e.target.value)
                  }
                  className={`${
                    add_new_relation.minor_v === "N"
                      ? "bg-gray-100"
                      : "border-gray-300"
                  }`}
                  disabled={add_new_relation.minor_v === "N"}
                  onKeyDown={(e) => {
                    switchFocus(e, "guardiantype");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("guardiantype");
                      input.focus();
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") {
                      setOnBlurErrorGuadianID("Please enter Guadian ID");
                    } else if (e.target.value === "N") {
                      setOnBlurErrorGuadianID("");
                    } else {
                      setOnBlurErrorGuadianID("");
                    }
                  }}
                />
                {onBlurErrorGuadianID && (
                  <div className="error-message ml-5" style={{ color: "red" }}>
                    {onBlurErrorGuadianID}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guardian Type */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Guardian Type" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  id={"guardiantype"}
                  data={guardianType}
                  inputWidth="300px"
                  value={add_new_relation.Guardian_type_v}
                  // onChange={(value) => handleInputChange('Guardian_type_v', value)}
                  disabled={add_new_relation.minor_v === "N"}
                  className={`${
                    add_new_relation.minor_v === "N"
                      ? "bg-gray-200"
                      : "border-gray-300"
                  }`}
                  onChange={(value) => {
                    handleInputChange("Guardian_type_v", value);
                    setTimeout(() => {
                      const input = document.getElementById("healthCha");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "healthCha");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("healthCha");
                      input.focus();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tenth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-2.5">
          {/* Health Challenge */}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Person&nbsp;With&nbsp;Disability"
                  fontSize="85%"
                />
              </div>

              <div>
                {healthOpions.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center mr-4"
                  >
                    <input
                      id="healthCha"
                      type="radio"
                      name="health_challenge_v"
                      value={option.value}
                      checked={
                        add_new_relation.health_challenge_v === option.value
                      }
                      onChange={() =>
                        handleInputChange("health_challenge_v", option.value)
                      }
                    />{" "}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Health Challenge Type */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Person&nbsp;With&nbsp;Disability&nbsp;Type"
                  fontSize="85%"
                />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  data={pwd}
                  inputWidth="300px"
                  value={add_new_relation.health_challenge_type_v}
                  onChange={(value) =>
                    handleInputChange("health_challenge_type_v", value)
                  }
                  disabled={add_new_relation.health_challenge_v === "N"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Last Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-2.5">
          {/* Staff Indicator*/}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Staff Indicator" fontSize="85%" />
              </div>

              <div>
                {staffOpions.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center mr-4"
                  >
                    <input
                      type="radio"
                      name="staff_indicator_v"
                      value={option.value}
                      checked={
                        add_new_relation.staff_indicator_v === option.value
                      }
                      onChange={() =>
                        handleInputChange("staff_indicator_v", option.value)
                      }
                    />{" "}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Staff ID*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Staff ID" fontSize="85%" />
              </div>
              <div class="md:w-2/3  md:ml-[2px]">
                <InputField
                  inputWidth="300px"
                  name="staff_id_v"
                  value={add_new_relation.staff_id_v}
                  onChange={(e) =>
                    handleInputChange("staff_id_v", e.target.value)
                  }
                  className={`${
                    add_new_relation.staff_indicator_v === "N"
                      ? "bg-gray-200"
                      : "border-gray-300"
                  }`}
                  disabled={add_new_relation.staff_indicator_v === "N"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* {!hideRadioButtons && (
          <div>
            <div className="flex items-center justify-center space-x-20 -mt-2.5">
            
              <div class="w-full max-w-xl mt-2">
                <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
                  <div
                    class="md:w-1/3 text-right"
                    hidden={selectedOptions === "option1"}
                  >
                    <Label label="Director Related" fontSize="85%" />
                  </div>

                  <div hidden={selectedOptions === "option1"}>
                    {DirectorRelated.map((option) => (
                      <label
                        key={option.value}
                        className="inline-flex items-center mr-4"
                      >
                        <input
                          type="radio"
                          name="P_director_related"
                          value={option.value}
                          checked={add_new_relation.P_director_related === option.value}
                          onChange={() =>
                            handleInputChange("P_director_related", option.value)
                          }
                        />{" "}
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

             
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center space-x-5 mb-2 ml-2">
                  <div
                    class="md:w-1/3 text-right"
                    hidden={selectedOptions === "option1"}
                  >
                    <Label label="Staff Related" fontSize="85%" />
                  </div>
                  <div hidden={selectedOptions === "option1"}>
                    {staffRelated.map((option) => (
                      <label
                        key={option.value}
                        className="inline-flex items-center mr-4"
                      >
                        <input
                          type="radio"
                          name="P_staff_related"
                          value={option.value}
                          checked={add_new_relation.P_staff_related === option.value}
                          onChange={() =>
                            handleInputChange("P_staff_related", option.value)
                          }
                        />{" "}
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        <div className="flex items-center justify-center space-x-20">
          {/* Occupation */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Occupation" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  data={occupation}
                  inputWidth="300px"
                  value={add_new_relation.OCCUPATION_V}
                  // onChange={(value) => handleInputChange('OCCUPATION_V', value)}

                  onChange={(value) => {
                    handleInputChange("OCCUPATION_V", value);
                    setTimeout(() => {
                      const input = document.getElementById("occupation");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "occupation");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("occupation");
                      input.focus();
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Other Occupations */}
          <div class={`w-full max-w-xl mt-2 `}>
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Other Occupations" fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  id={"occupation"}
                  inputWidth="300px"
                  name="OTHER_OCCUPATION_V"
                  value={add_new_relation.OTHER_OCCUPATION_V}
                  onChange={(e) =>
                    handleInputChange("OTHER_OCCUPATION_V", e.target.value)
                  }
                  disabled={
                    add_new_relation.OCCUPATION_V === "000" ? false : true
                  }
                  onKeyDown={(e) => {
                    switchFocus(e, "resident");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("resident");
                      input.focus();
                    }
                  }}
                />
                {/* {formErrors.firstName && (
                    <div className="error-message">{formErrors.firstName}</div>
                  )} */}
              </div>
            </div>
          </div>
        </div>

        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-2.5">
          {/* Resident */}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Resident" required={true} fontSize="85%" />
              </div>

              <div>
                {residentOpions.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center mr-4"
                  >
                    <input
                      id="resident"
                      type="radio"
                      name="RESIDENT_V"
                      value={option.value}
                      checked={add_new_relation.RESIDENT_V === option.value}
                      onChange={() =>
                        handleInputChange("RESIDENT_V", option.value)
                      }
                      onKeyDown={(e) => {
                        switchFocus(e, "nationality");
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = document.getElementById("nationality");
                          input.focus();
                        }
                      }}
                    />{" "}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Nationality */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Nationality" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  id={"nationality"}
                  data={nationality}
                  inputWidth="300px"
                  value={add_new_relation.nATIONALITY_V}
                  // onChange={(value) => handleInputChange('nATIONALITY_V', value)}

                  onChange={(value) => {
                    handleInputChange("nATIONALITY_V", value);
                    setTimeout(() => {
                      const input = document.getElementById("nationalID");
                      input.focus();
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    switchFocus(e, "nationalID");
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = document.getElementById("nationalID");
                      input.focus();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button type="submit" className="border p-2 text-black">
        Push to Temp
      </button> */}

      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      {/* <div className="bg-sky-500 border mt-5 text-white">
          Shareholder
        </div>
        <div className="flex items-center justify-center space-x-20">
        
          
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="WhatsApp Number" fontSize="85%" />
              </div>
              <div class="md:w-2/3  md:ml-[2px]">
                <InputField 
                  inputWidth="300px"
                  name="P_staff_id"
                />
              </div>
            </div>
          </div>

          
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Taxable Flag" fontSize="85%" />
              </div>
              <div class="md:w-2/3  md:ml-[2px]">
                <div>
                  {taxableflag.map((option) => (
                    <label key={option.value} className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name="P_staff_indicator"
                        // value={option.value}
                        // checked={formData.P_staff_indicator === option.value}
                        // onChange={() => handleChange('P_staff_indicator', option.value)}
                      />{' '}
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}

      {/* <div className="flex items-center justify-center space-x-20  ">
          
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Status" fontSize="85%" />
              </div>
              <div class="md:w-2/3  md:ml-[2px]">
                <InputField 
                  inputWidth={'75%'}
                  name="P_staff_id"
                />
              </div>
            </div>
          </div>

          
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Depository" fontSize="85%" />
              </div>
              <div class="md:w-2/3  md:ml-[2px]">
                <div>
                  {taxableflag.map((option) => (
                    <label key={option.value} className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name="P_staff_indicator"
                        // value={option.value}
                        // checked={formData.P_staff_indicator === option.value}
                        // onChange={() => handleChange('P_staff_indicator', option.value)}
                      />{' '}
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}

      {/* <div className="flex items-center justify-center space-x-20  ">
          
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Broker" fontSize="85%" />
              </div>
              <div class="md:w-2/3  md:ml-[2px]">
                <InputField 
                  inputWidth={'75%'}
                  name="P_staff_id"
                />
              </div>
            </div>
          </div>

          
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Date&nbsp;Of&nbsp;Entry" fontSize="85%" />
              </div>
              <div class="md:w-2/3  md:ml-[2px]">
                <InputField 
                    type={"date"}
                    inputWidth={'75%'}
                    name="P_staff_id"
                />
              </div>
            </div>
          </div>
        </div> */}
    </form>
  );
}

export default Personal_Details;
