import React, { useState, useEffect } from "react";
import Label from "../components/comp/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import axios from 'axios'
import swal from 'sweetalert'
import { API_SERVER } from "../../../../../../../../config/constant";
const host = window.location.host;


function Personal_Address({data, validationRules,activeStep, formValues, setFormValues, formErrors, setFormErrors, handleClose, handleShow, show_Second}) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState('');
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

  

  const handleFirstName = (event) => {
    setFirstName(event.target.value)
  };

  console.log(firstName,"::: firstNamfirstNamee")

  const handleMiddleName = (event) => {
    setMiddleName(event.target.value)
  };

  const handleSurname = (event) => {
    setSurname(event.target.value)
  };

  const handleEmail = (event) => {
    setEmail(event.target.value)
  };

  const handleGender = (event) => {
    setGender(event.target.value)
  };

  const handleDoB = (event) => {
    setDob(event.target.value)
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  };

  const handleTinNumber = (event) => {
    setTinNumber(event.target.value)
  };

  const handleIdNumber = (event) => {
    setId_number(event.target.value)
  };

  const handleIssueAuth = (event) => {
    setIssuing_auth(event.target.value)
  }

  const handleIssuingDate = (event) => {
    setIssuingDate(event.target.value)
  }

  const handleIdExpiryDate = (event) => {
    setIdExpiryDate(event.target.value)
  }

  const handleIssuingPlace = (event) => {
    setIssuingPlace(event.target.value)
  }

  const handleHouseNo = (event) => {
    setHouseNumber(event.target.value)
  }

  const handleStreetName = (event) => {
    setStreetName(event.target.value)
  }

  const handleLocation = (event) => {
    setLocationGp(event.target.value)
  }

  const handleMinorChange = (event) => {
    setMinor(event.target.value);
  };

  const handleGuarantorIDChange = (event) => {
    setGuarantorID(event.target.value);
  };

  const handleHealth = (event) => {
    setHealth(event.target.value);
  };
  
  const handleHealthChallengeType= (event) => {
    setHealthChallengeType(event.target.value);
  };

  const handleStaff= (event) => {
    setStaff(event.target.value);
  };
  
  const handleStaffID= (event) => {
    setHealthChallengeType(event.target.value);
  };

  const handleRisk = (event) => {
    setRisk(event.target.value)
  }

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
  const response = await axios.get(API_SERVER + '/get-unique-ref');
    setRelationNo(response.data[0].unique_ref);
    console.log(response.data[0].unique_ref,"::::::::::::::::::::Batch");

    const formValuesFields = { relationNo:response.data[0].unique_ref, firstName, middleName, surname, email, dob, phoneNumber, gender, tinNumber, id_number, issuing_auth, issuing_date, idExpiryDate, issuingPlace, houseNumber, streetName, locationGp, risk };
    const newTableData = [...tableData, formValues, formValuesFields];
    console.log('Form data saved :::', formValues, formValuesFields);
    setTableData(newTableData);
    setAnothertableData(newTableData)
    localStorage.setItem("get User Data", JSON.stringify(newTableData))
    
    console.log(userData, "::::: get User Data")
    swal({
      title: 'Success',
      text: 'Data has been added to the table',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    setFirstName('');
    setMiddleName('');
    setSurname('');
    setGender('');
    setEmail('');
    setDob('');
    setPhoneNumber('');
    setTinNumber('');
    setId_number('');
    setIssuing_auth('');
    setIssuingDate('');
    setIdExpiryDate('');
    setIssuingPlace('');
    setHouseNumber('');
    setStreetName('');
    setLocationGp('');
    setRisk('');
    setFormValues('');
  };

  const userData = JSON.parse(localStorage.getItem("get User Data"))

  // console.log(anothertableData, " :::::::::::::::anothertableData")
  
  // const [data, setData] = useState()


// const columns = ["Relation No", "first Name", "Surname", "Middle Name", "Gender", "Date of Birth", "Mobile 1", "Mandate Level", "Approver Limit"];

const customTheme = JSON.parse(localStorage.getItem("theme"));

const getTheme = JSON.parse(localStorage.getItem("theme"));
const [randomString, setRandomString] = useState('');

const generateRandomString = () => {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000; // generates a random 5-digit number
  setRisk(randomNumber.toString()); // converts the number to a string and sets it as the state value
};


useEffect(() => {
  const headers={
    'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'Content-Type': 'application/json'
  };
  
  // Relationship
  const getRelationships = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "RRE",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("title", JSON.stringify(response.data));
        setRegion(response.data);
      });
  };
  getRelationships()
  },[])


  return (
    <div>
        {/* First Tab */}
        <div className="flex items-center justify-center space-x-20">
            {/* Title */}
            <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3">
                    <Label label="Title" />
                    </div>
                    <div className="md:w-2/4 ">
                    <ListOfValue 
                    data={data.title} 
                    inputWidth="50%" 
                    value={formValues.title}
                        onChange={(value) =>
                        setFormValues((prevFormValues) => ({
                            ...prevFormValues,
                            title: value
                        }))
                        }
                    />
                    </div>
                </div>
            </div>

            {/* Gender */}
            <div class="w-full max-w-xl mt-2">
              <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                  <Label label="Gender" required={true} />
                </div>
                <div className="relative">
                  <select
                    id="select-field"
                    name="select-field"
                    value={gender}
                    onChange={handleGender}
                    // value={selectedOption}
                    // onChange={handleChange}
                    className="block appearance-none w-full py-1 pl-3 pr-10 leading-tight rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" >-- Select --</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="h-4 w-4 fill-current text-gray-500"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.293 6.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

        </div>


        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* First Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="First Name" required={true} />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    required 
                    value={firstName}
                    onChange={handleFirstName}
                  />
                  {formErrors.firstName && (
                    <div className="error-message">{formErrors.firstName}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Middle Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Middle Name" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text" 
                    value={middleName}
                    onChange={handleMiddleName}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Third Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* Surname */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Surname" required={true} />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text"
                    value={surname}
                    onChange={handleSurname}
                  />
                </div>
              </div>
            </div>

            {/* Short Name*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Short Name"
                    required={true}
                  />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Fourth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* Full Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Full Name" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text"
                    value={surname}
                    onChange={handleSurname}
                  />
                </div>
              </div>
            </div>

            {/* Preferred Name*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Preferred Name" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text" 
                    value={middleName}
                    onChange={handleMiddleName}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Fifth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* Alias*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Alias" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text"
                    value={surname}
                    onChange={handleSurname}
                  />
                </div>
              </div>
            </div>

            {/*Date Of Birth*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Date Of Birth"
                  />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="date"
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Sixth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* Country */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Country" required={true} />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue 
                    data={data.country} 
                    inputWidth="100%" 
                    value={formValues.country}
                    onChange={(value) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        country: value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* County / Region */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="County / Region" required={true} />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue 
                    data={data.country} 
                    inputWidth="100%" 
                    value={formValues.country}
                    onChange={(value) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        country: value
                      }))
                    }
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
                <div class="md:w-1/3">
                  <Label label="District" required={true} />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue 
                    data={data.country} 
                    inputWidth="100%" 
                    value={formValues.country}
                    onChange={(value) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        country: value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Location*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Alias" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text"
                    value={surname}
                    onChange={handleSurname}
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
                  <div class="md:w-1/3">
                      <Label label="Preferred Language" required={true} />
                  </div>
                  <div className="md:w-2/4 ">
                    <ListOfValue 
                    data={data.preferredLanguage}
                    value={formValues.preferredLanguage}
                    onChange={(value) =>
                        setFormValues((prevFormValues) => ({
                            ...prevFormValues,
                            preferredLanguage: value
                        }))
                        }
                    />
                  </div>
              </div>
            </div>

            {/* Minor */}
            <div class="w-full max-w-xl mt-2">
              <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                  <Label label="Minor" required={true} />
                </div>
                <div className="relative">
                  <select
                    id="select-field"
                    name="select-field"
                    value={minor}
                    onChange={handleMinorChange}
                    // value={selectedOption}
                    // onChange={handleChange}
                    className="block appearance-none w-full py-1 pl-3 pr-10 leading-tight rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" >-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="h-4 w-4 fill-current text-gray-500"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.293 6.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

        </div>


        {/* Ninth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* Guardian ID*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Guardian ID"
                    required={true}
                  />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                    disabled={minor === "No"}
                  />
                </div>
              </div>
            </div>

            {/* Guardian Type */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Guardian Type" required={true} />
                </div>
                <div className="md:w-2/4 " disabled={minor === "No"}>
                  <ListOfValue 
                    data={data.country} 
                    inputWidth="100%" 
                    value={formValues.country}
                    disabled={minor === "No"}
                  />
                </div>
              </div>
            </div>

        </div>


         {/* Tenth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
           {/* Health Challenge */}
           <div class="w-full max-w-xl mt-2">
              <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                  <Label label="Health Challenge" required={true} />
                </div>
                <div className="relative">
                  <select
                    id="select-field"
                    name="select-field"
                    value={health}
                    onChange={handleHealth}
                    // value={selectedOption}
                    // onChange={handleChange}
                    className="block appearance-none w-full py-1 pl-3 pr-10 leading-tight rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" >-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="h-4 w-4 fill-current text-gray-500"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.293 6.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Challenge Type */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Health Challenge Type" required={true} />
                </div>
                <div className="md:w-2/4 " disabled={health === "No"}>
                  <ListOfValue 
                    data={data.country} 
                    inputWidth="100%" 
                    value={formValues.country}
                    disabled={health === "No"}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Last Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
           {/* Staff Indicator*/}
           <div class="w-full max-w-xl mt-2">
              <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                  <Label label="Staff Indicator" required={true} />
                </div>
                <div className="relative">
                  <select
                    id="select-field"
                    name="select-field"
                    value={staff}
                    onChange={handleStaff}
                    // value={selectedOption}
                    // onChange={handleChange}
                    className="block appearance-none w-full py-1 pl-3 pr-10 leading-tight rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" >-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="h-4 w-4 fill-current text-gray-500"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.293 6.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          
            {/* Staff ID*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Staff ID"
                    required={true}
                  />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="text"
                    value={staffID}
                    onChange={handleStaffID}
                    disabled={staff === "No"}
                  />
                </div>
              </div>
            </div>

        </div>
    </div>
  );
}

export default Personal_Address;