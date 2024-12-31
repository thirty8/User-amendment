import React, {useEffect, useState} from 'react'
import swal from 'sweetalert';
import axios from 'axios'
import InputField from './comp/InputField';
import ListOfValue from './comp/ListOfValue';
import Label from '../components/comp/InputField'
import { API_SERVER } from '../../../../../../../../config/constant';


const Account_Referees = ({accountReferee, savedData,setAccountReferee, storeDataInSessionStorage ,handleSubmit,storedFormData, data, onChange, formValueAccountReferees, setFormValueAccountReferees, onClick, isLoading, setIsLoading, isPEP, setIsPEP, isBlacklisted, setIsBlacklisted, isDuplicate, setIsDuplicate}) => {
    const [accountNumber, setAccountNumber] = useState('');
    const [bankNames, setBankNames] = useState('');
    const [banks, setBanks] = useState('');
    const [relationships, setRelationship] = useState([]);
    const [relationshipReferees, setRelationshipReferees] = useState([])
    const [accountName, setAccountName] = useState('');
    const [email, setEmail] = useState('');
    const [noOfYears, setNoOfYears] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [resident, setResident] = useState('');
    const [tableData, setTableData] = useState([]);
    const [batchNo, setBatchNo] =useState("");
    const [typeOfReferees, setTypeOfReferees] = useState('')

    const getTheme = JSON.parse(localStorage.getItem("theme"));

const handleTypeOfReferee = (event) => {
  setTypeOfReferees(event.target.value)
//   if(event.target.value === "Account Holder"){
//   swal({
//     title: `${event.target.value}`,
//     text: `Thank you be being an ${event.target.value} `,
//     icon: 'success',
//   });
// } else{
//   swal({
//     title: `${event.target.value}`,
//     text: `Please Provide Other Bank Details for this Referee`,
//     icon: 'warning',
//   });
// }
}

// const headers = {
//   "x-api-key": process.env.REACT_APP_API_KEY,
//   "Content-Type": "application/json",
// };



const headers={
  'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  'Content-Type': 'application/json'
};
     
  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const bankName = (value) => {
    console.log(value)
    setBankNames(value)
  };

  const Relationship = (value) => {
    console.log(value)
    setRelationship(value)
  };

  console.log(relationships, ":::: relationships")

  const handleAccountNameChange = (event) => {
    setAccountName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNoOfYearsChange = (event) => {
    setNoOfYears(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleResidentChange = (event) => {
    setResident(event.target.value);
  };

  const newTableData = []
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (accountNumber.trim() === '' || bankNames.trim() === '' || accountName.trim() === '' || email.trim() === '') {
  //     swal({
  //       title: 'Error',
  //       text: 'Please enter all fields',
  //       icon: 'error',
  //       confirmButtonText: 'OK'
  //     });
  //     return;
  //   }
  //   // axios.get(batchNo).then((response) => {
  //   //     console.log(response.data.batch_no, ":::Batch:::");
  //   //     setBatchNo(response.data.batch_no)
  //   // });
  //   // axios.get(API_SERVER + '/get-unique-ref').then(response => {
  //   //     setBatchNo(response.data[0].unique_ref);
  //   //     console.log(response.data[0].unique_ref,":::Batch")   
  //   // });

  //   const response = await axios.get(API_SERVER + '/api/get-unique-ref', {headers});
  //   setBatchNo(response.data[0].unique_ref);
  //   console.log(response.data[0].unique_ref,"::::::::::::::::::::Batch");

  //   // console.log(response.data[0],":::Batch")

  //   const formValues = { batchNo:response.data[0].unique_ref, accountNumber, bankNames, accountName, email };
  //   // const newTableData = [...tableData, formValues];
  //   newTableData.push(...tableData, formValues)
  //   // localStorage.setItem('formValues', JSON.stringify(formValues));
  //   // console.log('Form data saved to localStorage:', formValues);
  //   setTableData(newTableData);
  //   localStorage.setItem("get Referee Data", JSON.stringify(newTableData))
  //   swal({
  //     title: 'Success',
  //     text: 'Data has been added to the table',
  //     icon: 'success',
  //     confirmButtonText: 'OK'
  //   });
  //   setAccountNumber('');
  //   setAccountName('');
  //   setEmail('');
  //   setBankNames('');
  //   setNoOfYears('');
  //   setPhoneNumber('');
  //   setRelationship('');
  //   setResident('');
  //   setTypeOfReferees('')
  // };


  // const handleDelete = (index) => {
  //   swal({
  //     icon: 'warning',
  //     title: 'Are you sure?',
  //     text: 'You are about to delete this data',
  //     showCancelButton: true,
  //     buttons: ['Cancel', 'Yes, delete it!' ]
  //     // confirmButtonText: 'Yes, delete it!',
  //     // cancelButtonText: 'Cancel',
  //   }).then((result) => {
  //     if ([1]) {
  //       const newData = [...tableData];
  //       newData.splice(index, 1);
  //       setTableData(newData);
  //       swal({
  //         icon: 'success',
  //         title: 'Success',
  //         text: 'Data deleted from table',
  //       });
  //     }
  //   });
  // };

  useEffect(() => {
     // Get Bank Names
     const getBankNames = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "BNC",
        },{headers})
        .then(function (response) {
         //  localStorage.setItem("title", JSON.stringify(response.data));
         setBanks(response.data);
        });
    };

    getBankNames()
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
        //  response.data.map((item) => {
        //   label: item
        //  })
          setRelationshipReferees(response.data);
        });
    };

    getRelationships()
  },[])


 

  const refereesTypes = [
    {value:'A', label:'Account Holder'},
    {value:'O', label:'Other Bank'}
  ]

  const handleChange = (field, value) => {
    setAccountReferee(prevState => ({ ...prevState, [field]: value }));
  };

  // typesOfReferees_v:'',
  // acctno_v:'',
  // bankName_v:'',
  // acctName_v:'',
  // residentAddr_v:'',
  // emailAddr_v:'',
  // relationship_v:'',
  // NoOfYears_v:'',
  // phoneno_v:''


  return (
    <div className='bg-white'>
      <form onSubmit={storeDataInSessionStorage} className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
                  <div className="w-full max-w-xl">
                    {/* Types of Referees */}
                      <div class="w-full max-w-xl mt-2">
                        <div className="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Types Of Referees" />
                          </div>
                          <div>
                             
                            <div className="flex space-x-5">
                              {refereesTypes.map((option) => (
                                <label key={option.value}>
                                  <input
                                    type="radio"
                                    name="typesOfReferees_v"
                                    value={option.value}
                                    checked={accountReferee.typesOfReferees_v === option.value}
                                    onChange={() => handleChange('typesOfReferees_v', option.value)}
                                  />
                                  {' '}
                                  {option.label}
                                </label>
                              ))}
                            </div>
                          </div>
                          </div>
                      </div>

                    {/* Account Number */}
                    <div class="w-full max-w-xl" style={{marginTop:'-4px'}}>
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Account Number" required={true} fontSize="85%" />
                          </div>
                          <div class="md:w-2/3 md:ml-[2px] ">
                            <InputField 
                              inputWidth={'75%'}
                              name="acctno_v"
                              value={accountReferee.acctno_v}
                              onChange={(e) => handleChange('acctno_v', e.target.value)}
                            />
                          </div>
                      </div>
                    </div>
                    
                    {accountReferee.typesOfReferees_v === "O" && (
                      <div>
                      {/* Account Name */}
                        <div class="w-full max-w-xl" style={{marginTop:'-3px'}}>
                          <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3">
                                  <Label label="Account Name" required={true} fontSize="85%" />
                              </div>
                              <div class="md:w-2/3 md:ml-[2px] ">
                                <InputField 
                                    inputWidth={'75%'}
                                    name="acctName_v"
                                    value={accountReferee.acctName_v}
                                    onChange={(e) => handleChange('acctName_v', e.target.value)}
                                  />
                              </div>
                          </div>
                        </div>

                        {/* Bank Name */}
                        <div class="w-full max-w-xl" style={{marginTop:'-3px'}}>
                          <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3">
                                  <Label label="Bank Name" fontSize="85%" />
                              </div>
                              <div className="md:w-2/4 ">
                                  <ListOfValue 
                                    data={banks}
                                    inputWidth="100%"
                                    name="bankName_v"
                                    value={accountReferee.bankName_v}
                                    // onChange={(value) => {setFormData({ ...formData, title_v: value }); console.log("Title:::",value)}}
                                    onChange={(value) => handleChange('bankName_v', value)}
                                  />
                              </div>
                          </div>
                        </div>

                        {/* Resident Address */}
                        <div class="w-full max-w-xl" style={{marginTop:'-1px'}}>
                          <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3">
                                  <Label label="Resident Address" required={true} fontSize="85%" />
                              </div>
                              <div class="md:w-2/3 md:ml-[2px] ">
                                <InputField 
                                    inputWidth={'75%'}
                                    name="residentAddr_v"
                                    value={accountReferee.residentAddr_v}
                                    onChange={(e) => handleChange('residentAddr_v', e.target.value)}
                                  />
                              </div>
                          </div>
                        </div>


                        {/* Email Address */}
                        <div class="w-full max-w-xl" style={{marginTop:'-1px'}}>
                          <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3">
                                  <Label label="Email Address" fontSize="85%" />
                              </div>
                              <div class="md:w-2/3 md:ml-[2px] ">
                                <InputField 
                                    inputWidth={'75%'}
                                    name="emailAddr_v"
                                    value={accountReferee.emailAddr_v}
                                    onChange={(e) => handleChange('emailAddr_v', e.target.value)}
                                />
                              </div>
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div class="w-full max-w-xl" style={{marginTop:'-1px'}}>
                          <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3">
                                  <Label label="Phone Number" required={true} fontSize="85%" />
                              </div>
                              <div class="md:w-2/3 md:ml-[2px] ">
                                <InputField 
                                  inputWidth={'75%'}
                                  name="phoneno_v"
                                  value={accountReferee.phoneno_v}
                                  onChange={(e) => handleChange('phoneno_v', e.target.value)}
                                />
                              </div>
                          </div>
                        </div>

                      </div>
                    )}
                    

                    {/* Relationship */}
                    <div class="w-full max-w-xl" style={{marginTop:'-3px'}}>
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Relationship" fontSize="85%" />
                          </div>
                          <div className="md:w-2/4 ">
                              <ListOfValue 
                                data={relationshipReferees}
                                inputWidth="100%"
                                name="relationship_v"
                                value={accountReferee.relationship_v}
                                // onChange={(value) => {setFormData({ ...formData, title_v: value }); console.log("Title:::",value)}}
                                onChange={(value) => handleChange('relationship_v', value)}
                              />
                          </div>
                      </div>
                    </div>

                    {/* Number of years known */}
                    <div class="w-full max-w-xl" style={{marginTop:'-3px'}}>
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="No of years known" required={true} fontSize="85%" />
                          </div>
                          <div class="md:w-2/3 md:ml-[2px] ">
                             <InputField 
                              inputWidth={'75%'}
                              name="NoOfYears_v"
                              value={accountReferee.NoOfYears_v}
                              onChange={(e) => handleChange('NoOfYears_v', e.target.value)}
                             />
                          </div>
                      </div>
                    </div>

                   

                
                </div>
          {/* **************************************** */}

          

        </div>

        {/* <div className="flex justify-end mr-5">
          <ButtonComponent onClick={onClick} label="Save" buttonBackgroundColor="green" buttonWidth="120px" buttonHeight="30px" />
            {isLoading && <div>Loading...</div>}
            {isPEP && <div>This person is a PEP.</div>}
            {isBlacklisted && <div>This person is blacklisted.</div>}
            {isDuplicate && <div>This person is a duplicate.</div>}
        </div> */}
        <div className='flex justify-end mr-5 mb-2'>
            <button type="submit" className='border p-2 rounded' >Submit</button>
        </div>

      </form>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-sky-700" 
          style={{background: '', zoom:"0.70"}}
            >
            <tr className='text-white'>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                style={{borderRight: '1px solid #ddd'}}
                >
                REFEREE ID
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                style={{borderRight: '1px solid #ddd'}}
                >
                ACCOUNT NUMBER
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                style={{borderRight: '1px solid #ddd'}}
                >
                BANK NAME
                </th>

                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                style={{borderRight: '1px solid #ddd'}}
                >
                FULL NAME
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
                style={{borderRight: '1px solid #ddd'}}
                >
                EMAIL ADDRESS
                </th>
            </tr>
        </thead>
        <tbody>
          {savedData.map((data, index) => (
            <tr key={index}>
              {/* <td>{data.typesOfReferees_v}</td> */}
              <td className='text-center'>1234</td>
              <td className='text-right'>{data.acctno_v}</td>
              <td className='text-right'>{data.bankName_v}</td>
              <td>{data.acctName_v}</td>
              <td>{data.emailAddr_v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Account_Referees