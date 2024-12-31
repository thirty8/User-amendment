import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import swal from "sweetalert";
import Label from "../../../../../../components/others/Label/Label";
import { API_SERVER } from "../../../../../../config/constant";
import ListOfValue from "../../components/ListOfValue";
import InputField from "../../components/InputField";
import Phone_number from "../../components/Phone_number";
import EmailInput from "../../components/EmailInput";
import Identification_details from "./identification_details";
import { formatDate } from "../../../individual-account-opening/helpers/date_formater";
import PreviewChanges from "../../components/PreviewChanges";
import { Modal } from "@mantine/core";
import { BiEdit } from "react-icons/bi";
// import { RelationContext } from "../../../contextapi/RelationContext";
const host = window.location.host;

function Member_bio_data({
  showBioData,
  customerData,
  handleEdit,
  editData,
  setEditData,
  originalData,
  afterClickEdit,
  editTable,

  showPreviewModal,
  setShowPreviewModal,
  setAfterClickEdit,

  handleAmendRelation
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

  // const [afterClickEdit, setAfterClickEdit] = useState(false);

  // const [showPreviewModal, setShowPreviewModal] = useState(false);

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

  // const hasChanged = (key, value) => {
  //   console.log("originalData", originalData)
  //   return originalData && originalData[0] && value !== originalData[0][key];
  // };

  const hasChanged = (key, value) => {
    if (originalData && originalData[0] && originalData[0][key] !== undefined) {
      return value !== originalData[0][key];
    }
    return false;
  };

  const handleClose = () => {
    setAfterClickEdit(false);

  }

  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-600 dark:text-gray-300">
        <thead className="bg-blue-500 dark:bg-blue-900 text-white text-xs uppercase font-medium">
          <tr>
            <th
              className="p-1 font-bold text-sm text-white"
              style={{ border: "1px solid white" }}
            >
              No.&nbsp;Of&nbsp;Relation
            </th>
            <th
              className="p-1 font-bold text-sm text-white"
              style={{ border: "1px solid white" }}
            >
              Relation ID
            </th>
            <th
              className="p-1 font-bold text-sm text-white"
              style={{ border: "1px solid white" }}
            >
              First&nbsp;Name
            </th>
            <th
              className="p-1 font-bold text-sm text-white"
              style={{ border: "1px solid white" }}
            >
              Surname
            </th>
            <th
              className="p-1 font-bold text-sm text-white"
              style={{ border: "1px solid white" }}
            >
              Gender
            </th>
            <th
              className="p-1 font-bold text-sm text-white"
              style={{ border: "1px solid white" }}
            >
              Phone&nbsp;Number
            </th>
            <th
              className="p-1 font-bold text-sm text-white"
              style={{ border: "1px solid white" }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customerData?.length > 0 ? (
            customerData?.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-sky-300"}
              >
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{data?.RELATION_NO}</td>
                <td>{data?.FIRST_NAME}</td>
                <td>{data?.SURNAME}</td>
                <td>{data?.GENDER == "M" ? "MALE" : "FEMALE"}</td>
                <td className="text-center">{data?.MOBILE1}</td>
                <td className="flex justify-center">
                  <BiEdit
                    onClick={() => {
                      editTable(data?.RELATION_NO)
                    }}
                    // className={` ${
                    //   data?.isSelected ? "text-gray-500" : "text-blue-500"
                    // } w-5 h-5`}
                    className="w-5 h-5 text-blue-500 cursor-pointer"
                  />
                  {/* <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => editTable(data?.RELATION_NO)}
                  >
                    Edit
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <hr className="my-2" />

      {/* {afterClickEdit && ( */}
      <Modal
        size="70%"
        opened={afterClickEdit}
        onClose={() => setAfterClickEdit(false)}
        withCloseButton={false}
        style={{ zoom: "0.80" }}
      >
        <div className="flex bg-blue-900 items-center justify-between mb-6 rounded-md">
          <div className=" text-white font-bold p-2 px-2 rounded-md uppercase">
            {/* STATIC DATA AMENDMENT */}
            BIO DATA
          </div>
          <div
            className=" text-white font-bold p-2 px-2 rounded-md uppercase cursor-pointer rounded-full"
            onClick={handleClose}
          >
            x
          </div>
        </div>
        <form className="bg-white mt-5">
          {Array.isArray(editData) &&
            editData?.map((data, index) => (
              <div key={index}>
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
                          id="SUFFIX"
                          inputWidth="300px"
                          backgroundColor={`${hasChanged("SUFFIX", data.SUFFIX)
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
                          value={data?.SUFFIX || ""}
                          // onChange={(value) =>
                          //   setEditData({ ...editData, SUFFIX: value })
                          // }
                          onChange={(value) =>
                            setEditData((prevData) => {
                              const updatedData = [...prevData];
                              updatedData[index] = { ...data, SUFFIX: value };
                              return updatedData;
                            })
                          }
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
                              id="gender"
                              className={`inline-flex items-center mr-4 ${hasChanged("GENDER", data.GENDER)
                                  ? "bg-yellow-300"
                                  : "bg-white"
                                }`}
                            >
                              <input
                                id="GENDER"
                                type="radio"
                                name={`gender_v_${index}`} // unique name for each iteration
                                value={option.value}
                                checked={data.GENDER === option.value}
                                onChange={(e) =>
                                  setEditData((prevData) => {
                                    const updatedData = [...prevData];
                                    updatedData[index] = {
                                      ...data,
                                      GENDER: e.target.value,
                                    };
                                    return updatedData;
                                  })
                                }
                                style={{
                                  backgroundColor: hasChanged(
                                    "GENDER",
                                    data.GENDER
                                  )
                                    ? "yellow"
                                    : "white",
                                }}
                              />{" "}
                              {option.label}
                            </label>
                          ))}
                          
                        </div>

                    
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
                        <Label
                          label="First Name"
                          required={true}
                          fontSize="85%"
                        />
                      </div>
                      <div className="md:w-2/3 md:ml-[2px]">
                        <InputField
                          id="FIRST_NAME"
                          inputWidth="300px"
                          type="text"
                          name={`fname_v_${index}`}
                          value={data.FIRST_NAME || ""}
                          onChange={(e) =>
                            setEditData((prevData) => {
                              const updatedData = [...prevData];
                              updatedData[index] = {
                                ...data,
                                FIRST_NAME: e.target.value,
                              };
                              return updatedData;
                            })
                          }
                          backgroundColor={`${hasChanged("FIRST_NAME", data.FIRST_NAME)
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
                        />
                        
                        {onBlurErrorFirstName && (
                          <div
                            className="error-message ml-5"
                            style={{ color: "red" }}
                          >
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
                          id="LAST_NAME"
                          name="mname_v"
                          value={data?.LAST_NAME || ""}
                          onChange={(e) =>
                            setEditData((prevData) => {
                              const updatedData = [...prevData];
                              updatedData[index] = {
                                ...data,
                                LAST_NAME: e.target.value,
                              };
                              return updatedData;
                            })
                          }
                        
                          backgroundColor={`${hasChanged("LAST_NAME", data.LAST_NAME)
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
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
                          id="SURNAME"
                          inputWidth="300px"
                          name="sname_v"
                          value={data?.SURNAME || ""}
                          onChange={(e) =>
                            setEditData((prevData) => {
                              const updatedData = [...prevData];
                              updatedData[index] = {
                                ...data,
                                SURNAME: e.target.value,
                              };
                              return updatedData;
                            })
                          }
                          backgroundColor={`${hasChanged("SURNAME", data.SURNAME)
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
                        />
                        {/* {errors.P_sname && <div className="error-message ml-5" style={{ color: 'red' }}>{errors.P_sname}</div>} */}
                        {onBlurErrorSurname && (
                          <div
                            className="error-message ml-5"
                            style={{ color: "red" }}
                          >
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
                          value={`${editData?.FIRST_NAME ?? ""} ${editData?.LAST_NAME_NAME ?? ""
                            } ${editData?.SURNAME ?? ""}`}
                        //   onKeyPress={(e) => {
                        //     switchFocus(e, "preferredname");
                        //   }}
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
                        //   value={add_new_relation.preferred_name_v}
                        //   onChange={(e) =>
                        //     handleInputChange("preferred_name_v", e.target.value)
                        //   }
                        //   onKeyPress={(e) => {
                        //     switchFocus(e, "alias");
                        //   }}
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
                        //   value={add_new_relation.alias_v}
                        //   onChange={(e) => handleInputChange("alias_v", e.target.value)}
                        //   onKeyPress={(e) => {
                        //     switchFocus(e, "dob");
                        //   }}
                        />
                      </div>
                    </div>
                  </div>

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
                      <div class="md:w-2/3 md:ml-[30px] ">
                        <DatePicker
                          key={index}
                          id="DATE_OF_BIRTH"
                          selected={
                            data.DATE_OF_BIRTH
                              ? new Date(data.DATE_OF_BIRTH)
                              : null
                          }
                          onChange={(date) => {
                            const formattedDate = formatDate(
                              date.toISOString(),
                              false
                            );
                            const isMinor =
                              new Date(date) >
                              new Date(
                                new Date().setFullYear(
                                  new Date().getFullYear() - 18
                                )
                              );

                              console.log("formattedDate", formattedDate)

                            // Update the specific item in editData based on the index
                            setEditData((prevEditData) =>
                              prevEditData.map((item, i) =>
                                i === index
                                  ? {
                                    ...item,
                                    DATE_OF_BIRTH: formattedDate,
                                    minor_v: isMinor ? "Y" : "N",
                                  }
                                  : item
                              )
                            );
                          }}
                          className={`w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none ${hasChanged("DATE_OF_BIRTH", data.DATE_OF_BIRTH)
                              ? "bg-yellow-300"
                              : "bg-white"
                            }`}
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
                          key={index} // Use unique keys for each item
                          marginBottom={"8px"}
                          name="Mobile_comm_no_v"
                          id={`MOBILE1_${index}`} // Unique ID for each component
                          value={data.MOBILE1 || ""}
                          onChange={(value) =>
                            setEditData(
                              editData.map((item, i) =>
                                i === index ? { ...item, MOBILE1: value } : item
                              )
                            )
                          }
                          backgroundColor={`${hasChanged("MOBILE1", data.MOBILE1)
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
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
                          key={index} // Unique key for each item in the array
                          showIcon={true}
                          inputWidth="300px"
                          name="home_email_V"
                          id={`EMAIL_ADDRESS_${index}`} // Unique ID for each EmailInput component
                          value={data?.EMAIL_ADDRESS || ""} // Changed from EMAIL_ADDRESS to EMAIL
                          onChange={(e) =>
                            setEditData(
                              editData.map((item, i) =>
                                i === index
                                  ? { ...item, EMAIL_ADDRESS: e.target.value }
                                  : item
                              )
                            )
                          }
                          backgroundColor={`${hasChanged("EMAIL_ADDRESS", data.EMAIL_ADDRESS)
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
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
                          value={data?.DORMICILE_COUNTRY || ""}
                          backgroundColor={`${hasChanged(
                            "DORMICILE_COUNTRY",
                            data.DORMICILE_COUNTRY
                          )
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
                          onChange={(value) =>
                            setEditData((prevData) => {
                              const updatedData = [...prevData];
                              updatedData[index] = { ...data, DORMICILE_COUNTRY: value };
                              return updatedData;
                            })
                          }
                       
                        />
                        {onBlurErrorCountry && (
                          <div
                            className="error-message ml-5"
                            style={{ color: "red" }}
                          >
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
                        <Label
                          label="Marrital Status"
                          required={true}
                          fontSize="85%"
                        />
                      </div>

                      <div class="ml-5">
                        {maritalStatus.map((option) => (
                          <label
                            key={option.value}
                            id="MARITAL_STATUS"
                            className={`inline-flex items-center mr-4 ${hasChanged(
                              "MARITAL_STATUS",
                              data.MARITAL_STATUS
                            )
                                ? "bg-yellow-300"
                                : "bg-white"
                              }`}
                          >
                            <input
                              id="MARITAL_STATUS"
                              type="radio"
                              name="MARITAL_STATUS"
                              value={option.value}
                              checked={
                                data?.MARITAL_STATUS === option.value
                              }
                              // onChange={(e) =>
                              //   setEditData({
                              //     ...editData,
                              //     MARITAL_STATUS: e.target.value,
                              //   })
                              // }
                              onChange={(e) =>
                                setEditData((prevData) => {
                                  const updatedData = [...prevData];
                                  updatedData[index] = {
                                    ...data,
                                    MARITAL_STATUS: e.target.value,
                                  };
                                  return updatedData;
                                })
                              }
                              style={{
                                backgroundColor: hasChanged(
                                  "GENDER",
                                  data.MARITAL_STATUS
                                )
                                  ? "yellow"
                                  : "white",
                              }}
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
                          value={data?.PREFERED_LANG || ""}
                          backgroundColor={`${hasChanged("PREFERED_LANG", data?.PREFERED_LANG)
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
                          onChange={(value) =>
                            setEditData((prevData) => {
                              const updatedData = [...prevData];
                              updatedData[index] = { ...data, PREFERED_LANG: value };
                              return updatedData;
                            })
                          }
                        // onChange={(value) =>
                        //   setEditData({ ...editData, PREFERED_LANG: value })
                        // }
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
                              checked={data?.minor_v === option.value}
                              // onChange={(value) =>
                              //   setEditData({ ...editData, minor_v: value })
                              // }
                              onChange={(e) =>
                                setEditData((prevData) => {
                                  const updatedData = [...prevData];
                                  updatedData[index] = {
                                    ...data,
                                    MARITAL_STATUS: e.target.value,
                                  };
                                  return updatedData;
                                })
                              }
                              style={{
                                backgroundColor: hasChanged(
                                  "GENDER",
                                  data.MARITAL_STATUS
                                )
                                  ? "yellow"
                                  : "white",
                              }}
                            //   onKeyDown={(e) => {
                            //     switchFocus(e, "guardianid");
                            //     if (e.key === "Enter") {
                            //       e.preventDefault();
                            //       const input = document.getElementById("guardianid");
                            //       input.focus();
                            //     }
                            //   }}
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
                        <Label
                          label="Guardian ID"
                          required={true}
                          fontSize="85%"
                        />
                      </div>
                      <div class="md:w-2/3 md:ml-[2px]">
                        <InputField
                          id={"guardianid"}
                          inputWidth="300px"
                          name="Guardian_id_v"
                          value={showBioData?.GUARDIAN_ID}
                        
                          disabled={editData?.minor_v === "N"}
                       
                        />
                        {onBlurErrorGuadianID && (
                          <div
                            className="error-message ml-5"
                            style={{ color: "red" }}
                          >
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
                        <Label
                          label="Guardian Type"
                          required={true}
                          fontSize="85%"
                        />
                      </div>
                      <div className="md:w-2/3 ">
                        <ListOfValue
                          id={"guardiantype"}
                          data={guardianType}
                          inputWidth="300px"
                          value={showBioData?.GUARDIAN_TYPE}
                          //   // onChange={(value) => handleInputChange('Guardian_type_v', value)}
                          disabled={editData?.minor_v === "N"}
                      
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
                              id="PERSON_WITH_DISABILITY"
                              type="radio"
                              name="health_challenge_v"
                              value={option.value}
                              checked={
                                editData?.PERSON_WITH_DISABILITY ===
                                option.value
                              }
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  PERSON_WITH_DISABILITY: e.target.value,
                                })
                              }
                              disabled={true}
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
                          //   value={add_new_relation.health_challenge_type_v}
                          //   onChange={(value) =>
                          //     handleInputChange("health_challenge_type_v", value)
                          //   }
                          // disabled={showBioData?.HEALTH_CHALLENGE === "N"}
                          disabled={true}
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
                                editData?.STAFF_CATEGORY === option.value
                              }
                            //   onChange={() =>
                            //     handleInputChange("staff_indicator_v", option.value)
                            //   }
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
                          value={showBioData?.STAFF_ID}
                      
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                          value={editData?.OCCUPATION}
                       
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
                          value={editData?.OTHER_OCCUPATION}
                          //   onChange={(e) =>
                          //     handleInputChange("OTHER_OCCUPATION_V", e.target.value)
                          //   }
                          disabled={
                            showBioData?.PROFESSION === "000" ? false : true
                          }
                    
                        />
                       
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
                        <Label
                          label="Resident"
                          required={true}
                          fontSize="85%"
                        />
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
                              checked={
                                showBioData?.RESIDENCE_STATUS === option.value
                              }
                            //   onChange={() =>
                            //     handleInputChange("RESIDENT_V", option.value)
                            //   }
                            //   onKeyDown={(e) => {
                            //     switchFocus(e, "nationality");
                            //     if (e.key === "Enter") {
                            //       e.preventDefault();
                            //       const input = document.getElementById("nationality");
                            //       input.focus();
                            //     }
                            //   }}
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
                        <Label
                          label="Nationality"
                          required={true}
                          fontSize="85%"
                        />
                      </div>
                      <div className="md:w-2/3 ">
                        <ListOfValue
                          id={"nationality"}
                          data={nationality}
                          inputWidth="300px"
                          value={editData?.NATIONALITY || ""}
                          backgroundColor={`${hasChanged("NATIONALITY", editData.NATIONALITY)
                              ? "rgb(253 224 71)"
                              : "white"
                            }`}
                          onChange={(value) =>
                            setEditData({ ...editData, NATIONALITY: value })
                          }
                        //   // onChange={(value) => handleInputChange('nATIONALITY_V', value)}

                        //   onChange={(value) => {
                        //     handleInputChange("nATIONALITY_V", value);
                        //     setTimeout(() => {
                        //       const input = document.getElementById("nationalID");
                        //       input.focus();
                        //     }, 0);
                        //   }}
                        //   onKeyDown={(e) => {
                        //     switchFocus(e, "nationalID");
                        //     if (e.key === "Enter") {
                        //       e.preventDefault();
                        //       const input = document.getElementById("nationalID");
                        //       input.focus();
                        //     }
                        //   }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-5" />

                <Identification_details
                  editData={editData}
                  hasChanged={hasChanged}
                  setEditData={setEditData}
                />
              </div>
            ))}

            <hr />
        </form>


        <div className="flex items-center justify-between p-2">
          <button className="border-2 bg-green-300 text-white p-2">Preview</button>
          <div className="flex space-x-2">
          <button className="border-2 bg-green-600 text-white p-2" >New</button>
          <button className="border-2 bg-blue-700 text-white p-2" onClick={handleAmendRelation}>Update</button>
          </div>
        </div>
      </Modal>

      {/* <Modal
        title={<span className="uppercase font-semibold">Preview Changes</span>}
        size={"60%"}
        opened={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
        }}
      >
        <PreviewChanges
        // changedData={changedData}
        // updateTimestamp={updateTimestamp}
        />
      </Modal> */}
    </div>
  );
}

export default Member_bio_data;
