import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Label from "../../../../../components/others/Label/Label";
import axios from 'axios'
import swal from 'sweetalert'
import {API_SERVER} from '../../../../../config/constant'
import ListOfValue from "./comp/ListOfValue";
import InputField from "./comp/InputField";
const host = window.location.host;




function Personal_Details({hideRadioButtons, selectedOptions, data, validationRules,activeStep, setChecked , formValues, setFormValues,  handleSubmit, formData, handleChange, setFormData, response, error}) {
  const [title, setTitle] = useState([]);
  const [country, setCountry] = useState([])
  const [region, setRegion] = useState(null);
  const [guardianType, setGuardianType] = useState([]);
  const [relationship, setRelationship] = useState([])
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [tinNumber, setTinNumber] = useState('')
  const [id_number, setId_number] = useState('')
  const [issuing_auth, setIssuing_auth] = useState('')
  const [issuing_date, setIssuingDate] = useState('')
  const [idExpiryDate, setIdExpiryDate] = useState('')
  const [issuingPlace, setIssuingPlace] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [streetName, setStreetName] = useState('')
  const [locationGp, setLocationGp] = useState('')
  const [risk, setRisk] = useState('')
  const [relationNo, setRelationNo] = useState('')
  const [showRiskModal, setShowRiskModal]= useState(false)
  const [anothertableData, setAnothertableData] = useState([])
  const [minor, setMinor] = useState("No");
  const [guarantorID, setGuarantorID] = useState('')
  const [health, setHealth] = useState("No");
  const [healthChallengeType, setHealthChallengeType] = useState("");
  const [staff, setStaff] = useState("No")
  const [staffID, setStaffID] = useState("")
  const [language, setLanguage] = useState([])
  const [inputError, setInputError] = useState('')
  const [inputErrorMiddleName, setInputErrorMiddleName] = useState('')
  const [inputErrorSurname, setInputErrorSurname] = useState('')
  const [inputErrorFullName, setInputErrorFullName] = useState('')
  // const [selectedOption,setSelectedOption] = useState([])

  
  const genderOptions = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const minorOpions = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const healthOpions = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const staffOpions = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const staffRelated = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const taxableflag = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const DirectorRelated = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];


  const handleOptionChange = () => {

  }


const headers={
  'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  'Content-Type': 'application/json'
};

useEffect(() => {
  const getTitle = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "TIT",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("title", JSON.stringify(response.data));
        setTitle(response.data);
        // console.log("Is this the Title ?::::",response.data);
      });
  };

  getTitle()
},[])

console.log("Is this the Title ?::::", title)

// [{label: "hajhah" , value: "jksjks"}]


useEffect(() => {
  const getCountry = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "CON",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("getCountry", JSON.stringify(response.data));
       //  console.log("getCountry :", response.data);
        setCountry(response.data)
      });
  };

  getCountry()
},[])


useEffect(() => {
  const getPreferredLanguage = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "LNG",
      },{headers})
      .then(function (response) {
        setLanguage(response.data)
      });
  };

  getPreferredLanguage()
},[])

useEffect(() => {
// Relationship
const getRelationships = () => {
  axios
    .post(API_SERVER + "/api/get-code-details", {
      code: "RRE",
    },{headers})
    .then(function (response) {
     //  localStorage.setItem("title", JSON.stringify(response.data));
      setRelationship(response.data);
    });
};
getRelationships()
},[])

useEffect(() => {
  const getRegion = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "REG",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("title", JSON.stringify(response.data));
       setRegion(response.data);
        // console.log("Is this the Title ?::::",response.data);
      });
  };

 getRegion()
},[])

useEffect(() => {
  const getGuardianType = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "GUA",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("title", JSON.stringify(response.data));
       setGuardianType(response.data);
        // console.log("Is this the Title ?::::",response.data);
      });
  };

  getGuardianType()
},[])



function switchFocus(e, nextFieldId) {
  if (e.key === "Enter") {
    document.getElementById(nextFieldId).focus();
    }
}



const currentDate = new Date().toISOString().split("T")[0];




  return (
    <form className="bg-white">
      <div>
        {/* First Tab */}
        <div className="flex items-center justify-center space-x-20">
          {/* Title */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Title" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  data={title}
                  inputWidth="300px"
                  value={formData.P_title}
                  // onChange={(value) => {setFormData({ ...formData, title_v: value }); console.log("Title:::",value)}}
                  // onChange={(value) => handleChange('P_title', value)}
                  onChange={(value)=>{
                    handleChange('P_title', value)
                    setTimeout(() => {
                        const input = document.getElementById("gender");
                        input.focus();
                      },0);
                  }}

                  onKeyDown={(e)=>{switchFocus(e,"gender")
                  if (e.key === "Enter"){
                    e.preventDefault();
                    const input = document.getElementById("gender");
                    input.focus()
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
                      <label key={option.value} className="inline-flex items-center mr-4">
                        <input
                          id="gender"
                          type="radio"
                          name="P_gender"
                          value={option.value}
                          checked={formData.P_gender === option.value}
                          onChange={() => handleChange('P_gender', option.value)}
                          onKeyDown={(e)=>{switchFocus(e,"firstname")
                          if (e.key === "Enter"){
                            e.preventDefault();
                            const input = document.getElementById("firstname");
                            input.focus()
                          }
                          }}
                        />{' '}
                        {option.label}
                      </label>
                    ))}
                  </div>

                  {formData.P_gender === 'Other' && (
                    <div class="md:flex md:items-center space-x-7 mb-1 -ml-16">
                      <div class="">
                        <Label label="Others" fontSize="85%" />
                      </div>
                      <div class="md:w-2/3 md:ml-[2px] ">
                        <InputField
                         inputWidth={'100%'}
                         type="text"
                         name="P_otherGender" 
                         placeholder={'Please Specify'}
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
                 name="P_fname"
                 value={formData.P_fname}
                 onChange={(e) => handleChange('P_fname', e.target.value)}
                 onKeyPress={(e) => {
                  switchFocus(e, 'Middle');
                 }}
                />
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
                  name="P_mname"
                  value={formData.P_mname}
                  onChange={(e) => handleChange('P_mname', e.target.value)}
                  onKeyPress={(e) => {
                    switchFocus(e, 'Surname');
                   }}
                  // onChange={handleMiddleName}
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
                name="P_sname"
                value={formData.P_sname}
                onChange={(e) => handleChange('P_sname', e.target.value)}
                onKeyPress={(e) => {
                  switchFocus(e, 'shortName');
                 }}
              />
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
                  name="P_short_name"
                  value={formData.P_short_name}
                  onChange={(e) => handleChange('P_short_name', e.target.value)}
                  onKeyPress={(e) => {
                    switchFocus(e, 'fullname');
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
                  value={`${formData.P_fname ?? ""} ${formData.P_mname ?? ""} ${formData.P_sname ?? ""}`}
                  onKeyPress={(e) => {
                    switchFocus(e, 'preferredname');
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
                  name="P_preferred_name"
                  value={formData.P_preferred_name}
                  onChange={(e) => handleChange('P_preferred_name', e.target.value)}
                  onKeyPress={(e) => {
                    switchFocus(e, 'alias');
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
                  name="P_alias"
                  value={formData.P_alias}
                  onChange={(e) => handleChange('P_alias', e.target.value)}
                  onKeyPress={(e) => {
                    switchFocus(e, 'dob');
                  }}
                />
              </div>
            </div>
          </div>

          {/*Date Of Birth*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Date Of Birth" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px]">
                <InputField
                  id="dob"
                  name="P_dob"
                  inputWidth="300px"
                  type={'date'}
                  placeholder="dd/mm/yyyy"
                  value={formData.P_dob}
                  onChange={(e) => {handleChange('P_dob', e.target.value)}}
                  onKeyPress={(e) => {
                    console.log(document.getElementById('Country'), "fighting")
                    switchFocus(e, 'Country');
                    setTimeout(() => {

                      if (document.getElementById('Country')) {
                        document.getElementById('Country');
                      }
                    }, 500);
                  }}
                  min={new Date().toISOString().split('T')[0]}
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
                  inputWidth="300px"
                  data={country}
                  value={formData.P_country}
                  onChange={(value)=>{
                  handleChange('P_country', value)
                  setTimeout(() => {
                      const input = document.getElementById("region");
                      input.focus();
                    },0);
                  }} 
                 onKeyDown={(e)=>{switchFocus(e,"region")
                  if (e.key === "Enter"){
                    e.preventDefault();
                    const input = document.getElementById("region");
                    input.focus()
                  }
                  }}
                 />
              </div>
            </div>
          </div>

          {/* County / Region */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="County" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  id={"region"}
                  data={region}
                  inputWidth="300px"
                  value={formData.P_region}
                  onChange={(value)=>{
                    handleChange('P_region', value)
                    setTimeout(() => {
                        const input = document.getElementById("district");
                        input.focus();
                      },0);
                    }} 
                  // onChange={(value) => handleChange('P_region', value)}
                  onKeyDown={(e)=>{switchFocus(e,"district")
                  if (e.key === "Enter"){
                    e.preventDefault();
                    const input = document.getElementById("district");
                    input.focus()
                  }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Seventh Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* District */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="District" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  data={country}
                  id={"district"}
                  inputWidth="300px"
                  value={formData.P_district}
                  onChange={(value)=>{
                    handleChange('P_district', value)
                    setTimeout(() => {
                        const input = document.getElementById("location");
                        input.focus();
                      },0);
                    }} 
                  // onChange={(value) => handleChange('P_district', value)}
                  onKeyDown={(e)=>{switchFocus(e,"location")
                  if (e.key === "Enter"){
                    e.preventDefault();
                    const input = document.getElementById("location");
                    input.focus()
                  }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Location*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Location" fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField 
                  id={"location"}
                  inputWidth="300px"
                  name="P_location"
                  value={formData.P_location}
                  onChange={(e) => handleChange('P_location', e.target.value)}
                  onKeyDown={(e)=>{switchFocus(e,"preferredLanguage")
                  if (e.key === "Enter"){
                    e.preventDefault();
                    const input = document.getElementById("preferredLanguage");
                    input.focus()
                  }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Eighth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
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
                  value={formData.P_preferred_lang}
                  // onChange={(value) => handleChange('P_preferred_lang', value)}
                  onChange={(value)=>{
                    handleChange('P_preferred_lang', value)
                    setTimeout(() => {
                        const input = document.getElementById("minor");
                        input.focus();
                      },0);
                  }} 

                  onKeyDown={(e)=>{switchFocus(e,"location")
                  if (e.key === "Enter"){
                    e.preventDefault();
                    const input = document.getElementById("location");
                    input.focus()
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
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                      id="minor"
                      type="radio"
                      name="P_minor"
                      value={option.value}
                      checked={formData.P_minor === option.value}
                      onChange={() => handleChange('P_minor', option.value)}
                      onKeyDown={(e)=>{switchFocus(e,"guardianid")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("guardianid");
                        input.focus()
                      }
                      }}
                    />{' '}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ninth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
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
                  name="P_Guardian_id"
                  value={formData.P_Guardian_id}
                  onChange={(e) => handleChange('P_Guardian_id', e.target.value)}
                  className={`${formData.P_minor === 'N' ? 'bg-gray-100' : 'border-gray-300'}`}
                  disabled={formData.P_minor === "N"}

                  // onChange={(value)=>{
                  //   handleChange('P_Guardian_id', value)
                  //   setTimeout(() => {
                  //       const input = document.getElementById("guardiantype");
                  //       input.focus();
                  //     },0);
                  //   }} 

                    onKeyDown={(e)=>{switchFocus(e,"guardiantype")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("guardiantype");
                        input.focus()
                      }
                      }}
                />
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
                  value={formData.P_Guardian_type}
                  // onChange={(value) => handleChange('P_Guardian_type', value)}
                  disabled={formData.P_minor === "N"}
                  className={`${formData.P_minor === 'N' ? 'bg-gray-200' : 'border-gray-300'}`}

                  onChange={(value)=>{
                    handleChange('P_Guardian_type', value)
                    setTimeout(() => {
                        const input = document.getElementById("healthCha");
                        input.focus();
                      },0);
                    }} 

                    onKeyDown={(e)=>{switchFocus(e,"healthCha")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("healthCha");
                        input.focus()
                      }
                      }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tenth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
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
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                    id="healthCha"
                      type="radio"
                      name="P_health_challenge"
                      value={option.value}
                      checked={formData.P_health_challenge === option.value}
                      onChange={() => handleChange('P_health_challenge', option.value)}
                    />{' '}
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
                <Label label="Person&nbsp;With&nbsp;Disability&nbsp;Type" fontSize="85%" />
              </div>
              <div className="md:w-2/3 " >
                <ListOfValue
                  data={country}
                  inputWidth="300px"
                  value={formValues.P_health_challenge_type}
                  onChange={(value) => handleChange('P_health_challenge_type', value)}
                  disabled={formData.P_health_challenge === "N"}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Last Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Staff Indicator*/}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Staff Indicator" fontSize="85%" />
              </div>

              <div>
                {staffOpions.map((option) => (
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="P_staff_indicator"
                      value={option.value}
                      // checked={formData.P_staff_indicator === option.value || (formData.P_staff_indicator === '' && option.value === 'N')}
                      // checked={formData.P_staff_indicator === option.value || formData.P_staff_indicator === '' && option.value === 'N'}
                      checked={formData.P_staff_indicator === option.value}
                      onChange={() => handleChange('P_staff_indicator', option.value)}
                    />{' '}
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
                  name="P_staff_id"
                  value={formData.P_staff_id}
                  onChange={(e) => handleChange('P_staff_id', e.target.value)}
                  className={`${formData.P_staff_indicator === 'N' ? 'bg-gray-200' : 'border-gray-300'}`}
                  disabled={formData.P_staff_indicator === "N"}
                />
              </div>
            </div>
          </div>
        </div>


      {!hideRadioButtons && (
      <div>
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Director Related*/}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
              <div class="md:w-1/3 text-right" hidden={selectedOptions === "option1"}>
                <Label label="Director Related" fontSize="85%" />
              </div>

              <div hidden={selectedOptions === "option1"}>
                {DirectorRelated.map((option) => (
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="P_director_related"
                      value={option.value}
                      checked={formData.P_director_related === option.value}
                      onChange={() => handleChange('P_director_related', option.value)}
                    />{' '}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Staff Related*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center space-x-5 mb-2 ml-2">
              <div class="md:w-1/3 text-right" hidden={selectedOptions === "option1"}>
                <Label label="Staff Related" fontSize="85%" />
              </div>
              <div hidden={selectedOptions === "option1"}>
                {staffRelated.map((option) => (
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="P_staff_related"
                      value={option.value}
                      checked={formData.P_staff_related === option.value}
                      onChange={() => handleChange('P_staff_related', option.value)}
                    />{' '}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}




        
      </div>
      {/* <button type="submit" className="border p-2 text-black">
        Push to Temp
      </button> */}



        
    </form>
  );
}

export default Personal_Details;