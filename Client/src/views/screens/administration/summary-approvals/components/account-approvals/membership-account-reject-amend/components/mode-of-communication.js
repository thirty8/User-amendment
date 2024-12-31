import React, { useState, useEffect } from "react";
import Label from "../../../../../../../../components/others/Label/Label";
import axios from 'axios'
import swal from 'sweetalert'
import {API_SERVER} from '../../../../../../../../config/constant'
import InputField from "./comp/InputField";
const host = window.location.host;


function Mode_Of_Communication({selectedData, data, validationRules,activeStep, formValues, setFormValues, formErrors, setFormErrors, handleClose, handleShow, 
  show_Second,
  formData,
  setFormData,
  handleChange,
  dataApproval
}) {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
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
  const response = await axios.get(API_SERVER + '/api/get-unique-ref');
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

const HomePhoneType = [
  { value: 'HPF', label: 'Home Phone 1' },
  { value: 'HPS', label: 'Home Phone 2' }
];

const OfficePhoneType = [
  { value: 'OFF', label: 'Office Phone 1' },
  { value: 'OFS', label: 'Office Phone 2' }
];

const EnableInternetBanking = [
  { value: 'N', label: 'No' },
  { value: 'Y', label: 'Yes' }
];

const EnableMobileBanking = [
  { value: 'N', label: 'No' },
  { value: 'Y', label: 'Yes' }
];

const EnableUSSD = [
  { value: 'N', label: 'No' },
  { value: 'Y', label: 'Yes' }
];

const EnableSMS = [
  { value: 'N', label: 'No' },
  { value: 'Y', label: 'Yes' }
];

const EnableEmailAlert = [
  { value: 'N', label: 'No' },
  { value: 'Y', label: 'Yes' }
];


  return (
    <div>
      <div className="flex items-center justify-center space-x-20">
        {/* Mobile Communication No */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Mobile Comm No" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.MOBILE1}
                value={
                  dataApproval?.relationData?.length > 0
                    ? selectedData?.MOBILE1
                    : ""
                }
              />
            </div>
          </div>
        </div>

        <div class="w-full max-w-xl mt-2">
          <div className="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Home Phone Type" fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.HOME_PHONE_TYPE}
                value={
                  dataApproval?.relationData?.length > 0
                    ? selectedData?.HOME_PHONE_TYPE
                    : ""
                }
              />
            </div>
            {/* <div>
                {HomePhoneType.map((option) => (
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name="P_home_phone_type"
                      value={option.value}
                      checked={formData.P_home_phone_type === option.value}
                      onChange={() => handleChange('P_home_phone_type', option.value)}
                    />{' '}&nbsp;
                    {option.label}
                  </label>
                ))}
              </div> */}
          </div>
        </div>
      </div>

      {/* Second Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* Office Phone Type */}
        <div class="w-full max-w-xl mt-2">
          <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Office Phone Type" fontSize="85%" />
            </div>
            <div>
              {OfficePhoneType.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    type="radio"
                    name="P_office_phone_type"
                    value={option.value}
                    checked={formData.P_office_phone_type === option.value}
                    onChange={() =>
                      handleChange("P_office_phone_type", option.value)
                    }
                  />{" "}
                  &nbsp;
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Office Phone No */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Office Phone No" required={true} fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.WORK_PLACE_PHONE_NUMBER}
                value={
                  dataApproval?.relationData?.length > 0
                    ? selectedData?.WORK_PLACE_PHONE_NUMBER
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Third Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* Office Email */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Office Email" fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.EMAIL_ADDRESS}
                value={
                  dataApproval?.relationData?.length > 0
                    ? selectedData?.EMAIL_ADDRESS
                    : ""
                }
              />
            </div>
          </div>
        </div>

        {/* Home Email */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Home Email" fontSize="85%" />
            </div>
            <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.HOME_EMAIL}
                value={
                  dataApproval?.relationData?.length > 0
                    ? selectedData?.HOME_EMAIL
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* Enable IB */}
        <div class="w-full max-w-xl mt-2">
          <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Enable Internet Banking" fontSize="85%" />
            </div>
            {/* <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.ENABLE_IB}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ENABLE_IB
                    : ""
                }
              />
            </div> */}
            <div>
              {EnableInternetBanking.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    type="radio"
                    name="P_enable_IB"
                    value={
                      dataApproval?.relationData?.length > 0
                        ? selectedData?.ENABLE_IB
                        : ""
                    }
                    // checked={formData.P_enable_IB === option.value}
                    checked={
                      dataApproval?.relationData?.length > 0 &&
                      selectedData?.ENABLE_IB === option.value
                    }
                    onChange={() => handleChange("P_enable_IB", option.value)}
                  />{" "}
                  &nbsp;
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Enable  Mobile B */}
        <div class="w-full max-w-xl mt-2">
          <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Enable Mobile Banking" fontSize="85%" />
            </div>
            {/* <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.ENABLE_MOBILEB}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ENABLE_MOBILEB
                    : ""
                }
              />
            </div> */}
            <div>
              {EnableMobileBanking.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    type="radio"
                    name="P_enable_MB"
                    value={
                      dataApproval?.relationData?.length > 0
                        ? selectedData?.ENABLE_MOBILEB
                        : ""
                    }
                    checked={selectedData?.ENABLE_MOBILEB === option.value}
                    onChange={() => handleChange("P_enable_MB", option.value)}
                  />{" "}
                  &nbsp;
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* Enable USSD */}
        <div class="w-full max-w-xl mt-2">
          <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Enable USSD" fontSize="85%" />
            </div>
            {/* <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.ENABLE_USSD}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ENABLE_USSD
                    : ""
                }
              />
            </div> */}
            <div>
              {EnableUSSD.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    type="radio"
                    name="P_enable_ussd"
                    value={
                      dataApproval?.relationData?.length > 0
                        ? selectedData?.ENABLE_USSD
                        : ""
                    }
                    checked={selectedData?.ENABLE_USSD === option.value}
                    onChange={() => handleChange("P_enable_ussd", option.value)}
                  />{" "}
                  &nbsp;
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Enable SMS Alert */}
        <div class="w-full max-w-xl mt-2">
          <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Enable SMS Alert" fontSize="85%" />
            </div>

            {/* <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.ENAMBE_SMS_ALERT}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ENAMBE_SMS_ALERT
                    : ""
                }
              />
            </div> */}
            <div>
              {EnableSMS.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    type="radio"
                    name="P_enable_smsalert"
                    value={
                      dataApproval?.relationData?.length > 0
                        ? selectedData?.ENAMBE_SMS_ALERT
                        : ""
                    }
                    checked={selectedData?.ENAMBE_SMS_ALERT === option.value}
                    onChange={() =>
                      handleChange("P_enable_smsalert", option.value)
                    }
                  />{" "}
                  &nbsp;
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Six Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* Enable Email Alert */}
        <div class="w-full max-w-xl mt-2">
          <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Enable Email Alert" fontSize="85%" />
            </div>
            {/* <div class="md:w-2/3 md:ml-[2px] ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.ENABLE_EMAIL_ALERT}
                value={
                  dataApproval.relationData?.length > 0
                    ? selectedData.ENABLE_EMAIL_ALERT
                    : ""
                }
              />
            </div> */}
            <div>
              {EnableEmailAlert.map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center mr-4"
                >
                  <input
                    type="radio"
                    name="P_enable_emailalert"
                    value={
                      dataApproval?.relationData?.length > 0
                        ? selectedData?.ENABLE_EMAIL_ALERT
                        : ""
                    }
                    checked={selectedData?.ENABLE_EMAIL_ALERT === option.value}
                    onChange={() =>
                      handleChange("P_enable_emailalert", option.value)
                    }
                  />{" "}
                  &nbsp;
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Bank Phone No */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label
                label="Mobile Bank Phone No"
                required={true}
                fontSize="85%"
              />
            </div>
            <div class="md:w-2/3 ">
              <InputField
                disabled
                id={"guardianid"}
                inputWidth="300px"
                name="P_Guardian_id"
                // value={dataApproval.HOME_PHONE_NO}
                value={
                  dataApproval?.relationData?.length > 0
                    ? selectedData?.HOME_PHONE_NO
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Six Tab */}
      <div className="flex items-center justify-center space-x-20 -mt-3">
        {/* Mobile Bank Email */}
        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label
                label="Mobile Bank Email "
                required={true}
                fontSize="85%"
              />
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

        <div class="w-full max-w-xl mt-2">
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
              <Label label="Home Phone No" required={true} fontSize="85%" />
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
  );
}

export default Mode_Of_Communication;