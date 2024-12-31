import React, { useState, useEffect } from "react";
import Label from "../../../../../components/others/Label/Label";
import axios from 'axios'
import swal from 'sweetalert'
import {API_SERVER} from '../../../../../config/constant'
import InputField from "./comp/InputField";
import ListOfValue from "./comp/ListOfValue";
const host = window.location.host;


function Next_Of_King({data, validationRules,activeStep, formValues, setFormValues, formErrors, setFormErrors, handleClose, handleShow, 
  show_Second,
  formData,
  setFormData,
  handleChange,
}) {
  const [location, setLocation] = useState(null);
  const [relationship, setRelationship] = useState('');
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iDType, setIDType] = useState('');
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

  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  const headers={
    'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'Content-Type': 'application/json'
  };

  // useEffect(() => {
  //   const getCountry = () => {
  //     axios
  //       .post(API_SERVER + "/api/get-code-details", {
  //         code: "HRD",
  //       },{headers})
  //       .then(function (response) {
  //        //  localStorage.setItem("getCountry", JSON.stringify(response.data));
  //        //  console.log("getCountry :", response.data);
  //         setIDType(response.data)
  //       });
  //   };
  
  //   getCountry()
  // },[])
  

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
  const getCountry = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "HRD",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("getCountry", JSON.stringify(response.data));
       //  console.log("getCountry :", response.data);
        setIDType(response.data)
      });
  };

  getCountry()
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



  return (
    <div className="bg-white">
       {/* First Tab */}
       <div className="flex items-center justify-center space-x-20">

            {/* Full Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Full Name" fontSize="85%" />
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth={'75%'} 
                    name="P_NOK_fullname"
                    value={formData.P_NOK_fullname}
                    onChange={(e) => handleChange('P_NOK_fullname', e.target.value)}
                  />
                </div>
              </div>
            </div>


            {/* Relation Type */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Relation Type" required={true} fontSize="85%" />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue 
                    data={relationship}
                    inputWidth="100%" 
                    value={formData.P_Nok_Relation_type}
                    onChange={(value) => handleChange('P_Nok_Relation_type', value)}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* ID Type */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="ID Type" required={true} fontSize="85%" />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue
                    data={iDType}
                    inputWidth="100%" 
                    value={formData.P_NOK_ID_type}
                    onChange={(value) => handleChange('P_NOK_ID_type', value)}
                  />
                </div>
              </div>
            </div>

            {/* ID Number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="ID Number"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth={'75%'} 
                    name="P_NOK_id_number"
                    value={formData.P_NOK_id_number}
                    onChange={(e) => handleChange('P_NOK_id_number', e.target.value)}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Third Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* Expiry Date */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Expiry Date"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth={'75%'} 
                    type={"date"}
                    name="P_NOK_expirydate"
                    value={formData.P_NOK_expirydate}
                    onChange={(e) => handleChange('P_NOK_expirydate', e.target.value)}
                  />
                  
                </div>
              </div>
            </div>

            {/* Relationship */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Relationship"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth={'75%'} 
                    type={"text"}
                    name="P_NOK_relationship"
                    value={formData.P_NOK_relationship}
                    onChange={(e) => handleChange('P_NOK_relationship', e.target.value)}
                  />
                </div>
              </div>
            </div>

        </div>


        
        {/* Fourth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
            {/* Date Of Birth */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Issuing Date"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth={'75%'}
                    type={'date'}
                    name="P_NOK_IssueDate"
                    value={formData.P_NOK_IssueDate}
                    onChange={(e) => handleChange('P_NOK_IssueDate', e.target.value)}
                  />
                  
                </div>
              </div>
            </div>

            {/* % Shared */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Percentage Shared"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  {/* <InputField 
                    inputWidth={'75%'}
                    name="P_NOK_Percent_share"
                    value={formData.P_NOK_Percent_share}
                    onChange={(e) => handleChange('P_NOK_Percent_share', e.target.value)}
                    className="text-right"
                    type="number"
                  /> */}

                  <InputField
                    inputWidth={'75%'}
                    name="P_NOK_Percent_share"
                    value={formData.P_NOK_Percent_share}
                    onChange={(e) => {
                      let inputValue = e.target.value.replace('%', '');
                      let numericValue = parseFloat(inputValue);
                  
                      if (isNaN(numericValue) || numericValue < 0 || numericValue > 100) {
                        // Handle invalid input (not a number or out of range)
                        return;
                      }
                  
                      // onChange(numericValue + '%');

                      handleChange('P_NOK_Percent_share', numericValue + '%');
                    }}
                    className="text-right"
                    type="number"
                  />

                </div>
              </div>
            </div>

        </div>



        

        
    </div>
  );
}

export default Next_Of_King;