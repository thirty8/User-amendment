import React, { useState, useEffect } from "react";
import Label from "../components/comp/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import axios from 'axios'
import swal from 'sweetalert'
import { API_SERVER } from "../../../../../../../../config/constant";
const host = window.location.host;


function Branch_Creation({data, validationRules,activeStep, formValues, setFormValues, formErrors, setFormErrors, handleClose, handleShow, show_Second}) {
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
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows([...rows, { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "" }]);
  };

  useEffect(() => {
    setRows([...rows, { col1: "", col2: "", col3: "", col4: "", col5: "", col6: "" }]);
  },[])
  const handleChange = (event, rowIndex, colIndex) => {
    const newRows = [...rows];
    newRows[rowIndex][`col${colIndex}`] = event.target.value;
    setRows(newRows);
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
      <div className="border rounded">
        <div>
        <form onSubmit={handleSubmit} className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-2xl">

            {/* Branch Zone */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Branch Zone" />
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

            {/* Branch Description */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Branch Description" required={true} />
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

            {/* Address 1 */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Address 1" required={true} />
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

            {/* Address 2 */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Address 2" />
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

            {/* Address 3 */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Address 3" />
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

            {/* Telephone */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Telephone"
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

            {/* Contact Person*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Contact Person" required={true} />
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

            {/* Branch Manager */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Branch Manager" required={true} />
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
          </div>
          {/* **************************************** */}

          {/* Second Side */}
          {/* Second Side */}
          {/* Second Side */}
          <div className="w-full max-w-2xl">
            

            
            {/* Clearing code */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Clearing Code" required={true} />
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

            {/* Branch Short Code */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Branch Short Code" />
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

            {/* Swift Code */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Swift Code" />
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

            {/* Region */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Region" required={true} />
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

            {/* Branch Type */}
            <div class="w-full max-w-xl mt-2">
              <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                  <Label label="Branch Type" />
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
                    <option value="Lo">Lo...</option>
                    <option value="Node">Node</option>
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

            {/* EFT */}
            <div class="w-full max-w-xl mt-2">
              <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                  <Label label="EFT" />
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
                    <option value="Lo">Lo...</option>
                    <option value="Node">Node</option>
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

            {/* Fax Number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Fax Number"
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

            {/* Date Opened */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Date Opened"
                    required={true}
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
        
        {/* <div className="border text-center" style={{background:
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`,}}>
            <div>Branch Limit SetUp</div>
        </div> */}

<div>
      <button onClick={addRow}>Add Row</button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50" style={{background:
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
              Currency</th>
            <th
            scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
            >
              Insurance Limit</th>
            <th
            scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
            >
              Max Credit Limit</th>
            <th
            scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
            >
              Min Dr Limit</th>
            <th
            scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
            >
              Max Floor Lim</th>
            <th
            scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
            >
              Min FLoor Lim</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                {/* <input  
                  className="w-full px-2 py-1 rounded border-gray-400"
                  type="text"
                  value={row.col1}
                  onChange={(event) => handleChange(event, rowIndex, 1)}
                /> */}
                  <ListOfValue 
                  data={data.title} 
                  inputWidth="90%" 
                  value={formValues.title}
                    onChange={(value) =>
                      setFormValues((prevFormValues) => ({
                        ...prevFormValues,
                        title: value
                      }))
                    }
                />
              </td>
              <td>
                <input
                  className="w-full px-2 py-1 rounded border-gray-900"
                  type="text"
                  value={row.col2}
                  onChange={(event) => handleChange(event, rowIndex, 2)}
                />
              </td>
              <td>
                <input
                  className="w-full px-2 py-1 rounded border-gray-900"
                  type="text"
                  value={row.col3}
                  onChange={(event) => handleChange(event, rowIndex, 2)}
                />
              </td>
              <td>
                <input
                  className="w-full px-2 py-1 rounded border-gray-900"
                  type="text"
                  value={row.col4}
                  onChange={(event) => handleChange(event, rowIndex, 2)}
                />
              </td>
              <td>
                <input
                  className="w-full px-2 py-1 rounded border-gray-900"
                  type="text"
                  value={row.col5}
                  onChange={(event) => handleChange(event, rowIndex, 2)}
                />
              </td>
              <td>
                <input
                  className="w-full px-2 py-1 rounded border-gray-900"
                  type="text"
                  value={row.col6}
                  onChange={(event) => handleChange(event, rowIndex, 2)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        

      </div> 
    </div>
  );
}

export default Branch_Creation;