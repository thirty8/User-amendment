import React, { useState, useEffect } from "react";
import Label from "../../../../../../../../components/others/Label/Label";
import axios from 'axios'
import swal from 'sweetalert'
import {API_SERVER} from '../../../../../../../../config/constant'
import Permanent_Address from "./permanent-address";
import InputField from "./comp/InputField";
import ListOfValue from "./comp/ListOfValue";
const host = window.location.host;


function Current_Address({selectedData, data, validationRules,activeStep, formValues, setFormValues, formErrors, setFormErrors, handleClose, handleShow, 
  show_Second,
  formData,
  setFormData,
  handleChange,
  dataApproval
}) {
  const [houseType, setHouseType] = useState(null);
  const [region, setRegion] = useState('');
  const [tableData, setTableData] = useState([]);
  const [city, setCity] = useState('');
  const [natureOfOwnership, setNatureOfOwnership] = useState('');
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

  
  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  const headers={
    'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'Content-Type': 'application/json'
  };


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
  // Relationship
  const getRegion = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "REG",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("title", JSON.stringify(response.data));
        setRegion(response.data);
      });
  };
  getRegion()
  },[])

  useEffect(() => {
    // Relationship
    const getCity = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "CTY",
        },{headers})
        .then(function (response) {
         //  localStorage.setItem("title", JSON.stringify(response.data));
          setCity(response.data);
        });
    };
    getCity()
    },[])


    useEffect(() => {
      // Relationship
      const getNatureOfOwnerShip = () => {
        axios
          .post(API_SERVER + "/api/get-code-details", {
            code: "NOO",
          },{headers})
          .then(function (response) {
           //  localStorage.setItem("title", JSON.stringify(response.data));
            setNatureOfOwnership(response.data);
          });
      };
      getNatureOfOwnerShip()
      },[])


      useEffect(() => {
        // Relationship
        const getHouseType = () => {
          axios
            .post(API_SERVER + "/api/get-code-details", {
              code: "HOT",
            },{headers})
            .then(function (response) {
             //  localStorage.setItem("title", JSON.stringify(response.data));
              setHouseType(response.data);
            });
        };
        getHouseType()
        },[])

  return (
    <div className="bg-white">
      <div>
        <div className="text-center text-black uppercase mb-2">
          Current Address
        </div>
        <hr />
        {/* First Tab */}
        <div className="flex items-center justify-center space-x-20">
          {/* Region */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="County" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={dataApproval.REGION}
                  value={
                    dataApproval.relationData?.length > 0
                      ? dataApproval.REGION
                      : ""
                  }
                />
              </div>
            </div>
          </div>

          {/* House Type */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="House Type" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                  value={
                    dataApproval.relationData?.length > 0
                      ? dataApproval.REGION
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Flat/Villa/House No */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Flat/Villa/House No" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/* Building Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Building Name" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={dataApproval.BUILDING_NAME}
                  value={
                    dataApproval.relationData?.length > 0
                      ? selectedData.BUILDING_NAME
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Third Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Street Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Street Name" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                  value={
                    dataApproval.relationData?.length > 0
                      ? selectedData.STREET_NAME
                      : ""
                  }
                />
              </div>
            </div>
          </div>

          {/* Location*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Warb" fontSize="85%" required={true} />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={dataApproval.LOCATION}
                  value={
                    dataApproval.relationData?.length > 0
                      ? selectedData.LOCATION
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* City */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Sub County" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={dataApproval.CITY}
                  value={
                    dataApproval.relationData?.length > 0
                      ? selectedData.CITY
                      : ""
                  }
                />
              </div>
            </div>
          </div>

          {/* earest Land Mark*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Nearest Land Mark" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sixth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/*Phone 2*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Attention Party" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/* Nature of Ownership*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Nature of Ownership"
                  required={true}
                  fontSize="85%"
                />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Seventh Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/*Stayed Since*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Stayed Since" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/*Cost Of Accommodation*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Cost Of Accommodation" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Eighth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/*Current Value */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Current Value" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/* Balance Mortgage */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Balance Mortgage" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div>
        <div className="text-center text-black uppercase mb-2">
          Permanent Address
        </div>
        <hr />
        {/* First Tab */}
        <div className="flex items-center justify-center space-x-20">
          {/* Region */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="County" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  value={dataApproval.REGION}
                />
              </div>
            </div>
          </div>

          {/* House Type */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="House Type" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Flat/Villa/House No */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Flat/Villa/House No" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/* Building Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Building Name" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Third Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Street Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Street Name" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  value={dataApproval.STREET_NAME}
                />
              </div>
            </div>
          </div>

          {/* Location*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Warb" fontSize="85%" required={true} />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* City */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Sub County" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/* earest Land Mark*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Nearest Land Mark" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sixth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/*Phone 2*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Attention Party" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/* Nature of Ownership*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Nature of Ownership"
                  required={true}
                  fontSize="85%"
                />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Seventh Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/*Stayed Since*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Stayed Since" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/*Cost Of Accommodation*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Cost Of Accommodation" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Eighth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/*Current Value */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Current Value" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>

          {/* Balance Mortgage */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Balance Mortgage" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  disabled
                  id={"guardianid"}
                  inputWidth="300px"
                  name="P_Guardian_id"
                  // value={formData.P_Guardian_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Current_Address;