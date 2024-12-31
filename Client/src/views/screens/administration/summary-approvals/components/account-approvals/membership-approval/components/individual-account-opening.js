import React, { useState, useEffect } from "react";
import Label from "../../../../../../../../components/others/Label/Label";
import ListOfValue from "../../../../../../../../components/others/Fields/ListOfValue";
import axios from 'axios'
import swal from 'sweetalert'
import Risk_analysis_test from "./risk-analysis-test";
import {API_SERVER} from '../../../../../../../../config/constant'
const host = window.location.host;


function Individual_account_opening({data, validationRules,activeStep, formValues, setFormValues, formErrors, setFormErrors, handleClose, handleShow, show_Second}) {
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


  return (
    <div>
      <Risk_analysis_test />
      <div className="border rounded">
        <div>
        <form onSubmit={handleSubmit} className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-2xl">
            {/* Risk ID*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Risk ID" required={true} />
                </div>
                <div class="md:w-2/3 ">
                  <input
                    className="risk_label" 
                    required
                    type="text"
                    value={risk}
                    onChange={handleRisk}
                    onClick={generateRandomString}
                    // onClick={function (e) { 
                    //   e.preventDefault(); 
                    //   setScanDocument(!showScanDocument);
                    // }}
                  />
                </div>
              </div>
            </div>

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

            {/* Salutation */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Salutation" />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue 
                  data={data.salutation} 
                  inputWidth="35%"
                  value={formValues.salutation}
                    onChange={(value) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        salutation: value
                      }))
                    } 
                  />
                  {/* <SearchableDropdown /> */}
                </div>
              </div>
            </div>

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

            {/* Email */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Email" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    class="my_inputs"
                    id="email"
                    name="email"
                    type="text" 
                    required
                    value={email}
                    onChange={handleEmail}
                  />
                  {formErrors.email && (
                    <div className="error-message">{formErrors.email}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Date Of Birth" required={true} />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="date"
                    value={dob}
                    onChange={handleDoB}
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

            {/* Primary Phone Number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Primary Phone Number"
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

            {/* Tin Number*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Tin Number" />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="text"
                    value={tinNumber}
                    onChange={handleTinNumber}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* **************************************** */}

          {/* Second Side */}
          {/* Second Side */}
          {/* Second Side */}
          <div className="w-full max-w-2xl">
            {/* ID Type */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="ID Type" required={true} />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue 
                    data={data.id_type}
                    inputWidth="86%" 
                    value={formValues.id_type}
                    onChange={(value) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        id_type: value
                      }))
                    } 
                  />
                </div>
              </div>
            </div>

            {/* ID Number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="ID Number" required={true} />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="text"
                    value={id_number}
                    onChange={handleIdNumber}
                  />
                </div>
              </div>
            </div>

            {/* Issuing Auth */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Issuing Auth" required={true} />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="text"
                    value={issuing_auth}
                    onChange={handleIssueAuth}
                  />
                </div>
              </div>
            </div>

            {/* Issuing Date */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Issuing Date" required={true} />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="date"
                    value={issuing_date}
                    onChange={handleIssuingDate} 
                  />
                </div>
              </div>
            </div>

            {/* ID Expiry Date */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="ID Expiry Date"
                    required={true}
                  
                  />
                </div>
                <div class="md:w-2/3 ">
                  <input 
                    className="risk_label" 
                    type="date"
                    value={idExpiryDate}
                    onChange={handleIdExpiryDate}  
                  />
                  {/* <InputField type={"date"} /> */}
                </div>
              </div>
            </div>

            {/* Issuing Place */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Issuing Place" required={true} />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text"
                    value={issuingPlace}
                    onChange={handleIssuingPlace} 
                  />
                </div>
              </div>
            </div>

            {/* Flat/Villa/House No */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Flat/Villa/House No"
                    required={true}
                  />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text"
                    value={houseNumber}
                    onChange={handleHouseNo}
                  />
                </div>
              </div>
            </div>

            {/* Street Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Street Name" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text"
                    value={streetName}
                    onChange={handleStreetName}
                  />
                </div>
              </div>
            </div>

            {/* Location / GPRS */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Location / GPRS" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input 
                    className="my_inputs" 
                    type="text"
                    // value={locationName}
                    // onClick={handleGetLocation}
                    value={locationGp}
                    onChange={handleLocation}
                  />
                </div>
              </div>
            </div>

            {/* City */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="City" />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue 
                    data={data.city} 
                    value={formValues.city}
                    onChange={(value) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        city: value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Country Code */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Country Code" required={true} />
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

            <div className='flex justify-end mr-5 mb-2 text-white'>
            <button type="submit" className='border p-2 rounded' style={{background:
            `url(` +
            window.location.origin +
            `/assets/images/headerBackground/` +
            getTheme.theme.headerImage +
            `)`,}}
            >Submit</button>
            </div>

          </div>
        </form>
        </div>

        {/* <div className="flex justify-end mr-5">
          <ButtonComponent
            label="Save"
            buttonBackgroundColor="green"
            buttonWidth="120px"
            buttonHeight="30px"
          />
        </div> */}

        {/* <DataTable rows={rows} columns={columns} /> */}
        {/* <DataTable_Annex rows={rows} columns={columns} /> */}
        {/* <DataTableChris rows={rows} columns={columns} /> */}
        

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50" 
          style={{background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,}}
              >
              <tr>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  RELATION NO
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  FIRST NAME
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  SURNAME
                  </th>

                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  MIDDLE NAME
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  GENDER
                  </th>

                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  DATE OF BIRTH
                  </th>

                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  PRIMARY PHONE NO
                  </th>


                  {/* <th className="px-4 py-2">Actions</th> */}
              </tr> 
          </thead>
        <tbody style={{marginLeft:""}}>
          {userData?.map((data, index) => (
            <tr key={index}>
              <td>{data.relationNo}</td>
              <td>{data.firstName}</td>
              <td>{data.surname}</td>
              <td>{data.middleName}</td>
              <td>{data.gender}</td>
              <td>{data.dob}</td>
              <td>{data.phoneNumber}</td>
              {/* <td>{data.email}</td> */}
              {/* <td className="px-4 py-2">
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      </div> 
    </div>
  );
}

export default Individual_account_opening;