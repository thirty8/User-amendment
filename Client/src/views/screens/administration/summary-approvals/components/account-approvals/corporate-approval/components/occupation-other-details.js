import React, { useState, useEffect } from "react";
import Label from "../../../../../../../../components/others/Label/Label";
import axios from 'axios'
import swal from 'sweetalert'
import {API_SERVER} from '../../../../../../../../config/constant'
import ListOfValue from "./comp/ListOfValue";
import InputField from "./comp/InputField";
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
  dataApproval,
  selectedData
  
}) {
  const [location, setLocation] = useState(null);
  const [nationality, setNationality] = useState('');
  const [tableData, setTableData] = useState([]);
  const [iDType, setIDType] = useState(false);
  const [occupation, setOccupation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [resident, setResident] = useState('');
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
  const [gender, setGender] = useState('')


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

  const handleResident = (event) => {
    setResident(event.target.value)
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
  // Get Account Mandate
      const getAccountMandate = () => {
        axios
          .post(API_SERVER + "/api/get-code-details", {
            code: "OCC",
          },{headers})
          .then(function (response) {
            setOccupation(response.data)
          });
      };
  
      getAccountMandate()
    },[])

    // console.log("occupation", occupation)

    useEffect(() => {
      const getCountry = () => {
        axios
          .post(API_SERVER + "/api/get-code-details", {
            code: "CON",
          },{headers})
          .then(function (response) {
           //  localStorage.setItem("getCountry", JSON.stringify(response.data));
           //  console.log("getCountry :", response.data);
            setNationality(response.data)
          });
      };
    
      getCountry()
    },[])

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
    

    const residentOpions = [
      { value: 'N', label: 'No' },
      { value: 'Y', label: 'Yes' }
    ];

    function switchFocus(e, nextFieldId) {
      if (e.key === "Enter") {
        document.getElementById(nextFieldId).focus();
        }
    }


  return (
    <div className="bg-white">
      {/* First Tab */}
      <div className="flex items-center justify-center space-x-20">
        {/* Occupation */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Occupation" fontSize="85%" />
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

        {/* Other Occupations */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Other Occupations" fontSize="85%" />
            </div>
            <div className="md:w-2/3 md:ml-[2px]">
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
                    name="P_RESIDENT"
                    value={option.value}
                    checked={formData.P_RESIDENT === option.value}
                    onChange={() => handleChange("P_RESIDENT", option.value)}
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
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={formData.P_Guardian_id}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.NATIONALITY
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Third Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* National ID */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="National ID" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={formData.P_Guardian_id}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.NIN
                    : ""
                }
              />
            </div>
          </div>
        </div>

        {/* Date Issued */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Date Issued" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.ID_ISSUED_AUTHORITY}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.NIN_DATE_ISSUE
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* Date Expiry */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Date Expiry" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={formData.P_Guardian_id} ID_EXPIRY_DATE
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.NIN_EXPIRY_DATE
                    : ""
                }
              />
            </div>
          </div>
        </div>

        {/* ID Type */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Tin" required={true} fontSize="85%" />
            </div>
            <div className="md:w-2/3 ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.TIN}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.TIN
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* ID Number Is Mandatory */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="ID Number" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={formData.P_Guardian_id}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ID_NUMBER
                    : ""
                }
              />
            </div>
          </div>
        </div>

        {/* Date Issued */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="ID Issued At" fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={selectedData.ID_ISSUED_AT}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ID_ISSUED_AT
                    : ""
                }
              />
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
              <Label label="ID Type" required={true} fontSize="85%" />
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
                    ? selectedData.ID_TYPE
                    : ""
                }
              />
            </div>
          </div>
        </div>

        {/* ID Type */}
        {/* Issue Authority */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Issue Authority" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={formData.P_Guardian_id} 
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ID_ISSUED_AUTHORITY
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* Date Expiry */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Date Issued" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={selectedData.ID_ISSUE_DATE}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ID_ISSUE_DATE
                    : ""
                }
              />
            </div>
          </div>
        </div>

        {/* Date Issued */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Date Expiry" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px]">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={selectedData.ID_EXPIRY_DATE}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ID_EXPIRY_DATE
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Occupation_other_details;