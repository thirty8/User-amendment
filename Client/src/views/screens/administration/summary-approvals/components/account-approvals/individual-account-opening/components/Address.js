import React, {useEffect, useState} from 'react'
import { Portal, Modal, Button, Footer } from '@mantine/core';
import InputField from '../../individual-account-opening/components/comp/InputField';
import Label from "../../../../../../../../components/others/Label/Label";
import ListOfValue from '../../individual-account-opening/components/comp/ListOfValue';
import axios from 'axios';
import { API_SERVER } from '../../../../../../../../config/constant';

const Address = ({
  setTableDataAddress,
  tableDataAddress,
  usedAddressTypes,
  setUsedAddressTypes,
  refinedData,
  setRefinedData,
}) => {

  const ownerOfPro = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const headers={
    'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'Content-Type': 'application/json'
  };

  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressType, setAddressType] = useState("")
  const [houseType, setHouseType] = useState("");


  const [country, setCountry] = useState()
  const [county, setCounty] = useState()
  const [subCounty, setSubCounty] = useState([])
  const [ward, setWard] = useState([])

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
    const getCounty = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "CUN",
        //   key:'twene'
        },{headers})
        .then(function (response) {
         //  localStorage.setItem("getCountry", JSON.stringify(response.data));
         //  console.log("getCountry :", response.data);
         setCounty(response.data)
        });
    };
  
    getCounty()
  },[])
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // State to manage form inputs
  const [formData, setFormData] = useState({
    p_addressType: '',
    p_houseType: '',
    p_county:'',
    p_house_no: '',
    p_Sub_county:'',
    subCounty: '',
    p_POBoxNo: '',
    p_Stayed_since:'',
    p_Stayed_To:'',
    p_Owner_of_Property:''
  });

   

  // Function to handle form input changes
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });


    console.warn("addressType::::", addressType)
  };

//   const handleInputChange = (name, value, type) => {
//     let formattedValue = value; // Default value if not a date field
  
//     // Check if the input field type is 'date'
//     if (type === 'date') {
//       const parsedDate = new Date(value); // Parse the input date value
//       formattedValue = formatDate(parsedDate); // Format the parsed date
//     }
  
//     setFormData({
//       ...formData,
//       [name]: formattedValue,
//     });
  
//     console.warn("addressType::::", addressType)
//   };

  // Function to format date to "DD-MMM-YYYY" format
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const options = { day: '2-digit', month: 'short', year: 'numeric' };
  //   return date.toLocaleDateString('en-US', options);
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    // Define month names in the MMM format
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    // Format the date as DD-MMM-YYYY
    return `${day}-${monthNames[monthIndex]}-${year}`;
  };
  

  // const [refinedData, setRefinedData] = useState([])

  const handleSubmit = () => {
    // Check if the selected address type is in usedAddressTypes
    if (usedAddressTypes.includes(formData.P_addressType)) {
      // Display a message to inform the user that the address type is already used
      alert('This address type has already been used.');
    } else {
      // Add the form data to the table data based on Address Type
      const newEntry = { ...formData };

      setTableDataAddress([...tableDataAddress, newEntry]);
      setRefinedData([...refinedData, 
        {...newEntry , 
        p_addressType: newEntry.p_addressType.split('-')[0], 
        p_houseType: newEntry.p_houseType.split('-')[0],
        p_Stayed_since: formatDate(newEntry.p_Stayed_since),
        p_Stayed_To: formatDate(newEntry.p_Stayed_To)
      }
      ]
        );

     
      

      // Clear the form data
      setFormData({
        p_addressType: '',
        p_houseType: '',
        p_house_no: '',
        p_Curr_addr_building_name: '',
        p_Sub_county:'',
        p_POBoxNo: '',
        p_Stayed_since:'',
        p_Stayed_To:''
      });

      // Mark the selected address type as used
      setUsedAddressTypes([...usedAddressTypes, formData.p_addressType]);

      // Close the modal
      closeModal();
    }
  };

  console.warn("tableDataAddress::::", tableDataAddress)
  console.warn("P_houseType::::", refinedData)
  console.log("'''''''",refinedData)
  

  // Function to filter available address types
  // const availableAddressTypes = addressType.filter(
  //   (type) => !usedAddressTypes.includes(type.code)
  // );

  const availableAddressTypes = Array.isArray(addressType)
  ? addressType.filter((type) => !usedAddressTypes.includes(type.code))
  : [];

  

  useEffect(() => {
     // Relationship
     const getAddressType = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "ADD",
          key:"twene"
        },{headers})
        .then(function (response) {
         //  localStorage.setItem("title", JSON.stringify(response.data));
          setAddressType(response.data);
          console.log('setAddressType::',response.data);
        });
    };

    getAddressType()
  },[])


  useEffect(() => {
    // Relationship
    const getHouseType = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "HOT",
          key:"twene"
        },{headers})
        .then(function (response) {
         //  localStorage.setItem("title", JSON.stringify(response.data));
          setHouseType(response.data);
        });
    };
    getHouseType()
  },[])

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      }
  }

  return (
    <div>
      {/* Add a container to position the button */}
      <div className="relative">
        {/* Add the button to the top right corner */}
        <button
         onClick={openModal}
          className="absolute top-[-50px] right-5 p-2 bg-blue-500 text-white rounded-full"
        >
          + Add Address
        </button>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">Address Type</th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">House No</th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">Stayed Since</th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">Stayed To</th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">House Type</th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">PO Box No</th>
            </tr>
          </thead>
          <tbody>
            {tableDataAddress?.map((data, index) => (
              <tr key={data.code} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-300'}>
                <td>{data.p_addressType}</td>
                <td>{data.p_house_no}</td>
                <td>{data.p_Stayed_since}</td>
                <td>{data.p_Stayed_To}</td>
                <td>{data.p_houseType}</td>
                <td>{data.p_POBoxNo}</td>
              </tr>
            ))}
        </tbody>
        </table>
      </div>

      <Portal>
        <Modal
          title="Add Address"
          opened={isModalOpen}
          onClose={closeModal}
          size="50%"
          transition="rotate-left"
          centered
        >
          {/* Modal content here */}

          <div>
        <div>
        {/* <div className="text-center text-black uppercase mb-2">001 - Current Address</div> */}
        <hr/>

        {/* <div className=" text-black uppercase mb-2">Work Address</div> */}
        {/* First Tab */}
        {/* <div className="flex items-center justify-center space-x-20"> */}
        <div className="">
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Address Type" required={true} fontSize="85%"/>
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    data={availableAddressTypes ?? []}
                    inputWidth="300px" 
                    value={formData.p_addressType}
                    onChange={(value) => handleInputChange('p_addressType', value)}
                  />
                </div>
              </div>
            </div>

            {/* House Type */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="House Type" required={true} fontSize="85%"/>
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    data={houseType}
                    inputWidth="300px"
                    value={formData.p_houseType}
                    onChange={(value) => handleInputChange('p_houseType', value)}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Second Tab */}
        {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
        <div className=" mt-2.5">
            {/* Flat/Villa/House No */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Flat/Villa/House No" fontSize="85%" />
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth="300px"
                    name="p_house_no"
                    value={formData.p_house_no}
                    onChange={(e) => handleInputChange('p_house_no', e.target.value)}
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
                    inputWidth="300px"
                    name="perm_addr_building_name_v"
                    // value={formData.perm_addr_building_name_v}
                    // onChange={(e) => handleChange('perm_addr_building_name_v', e.target.value)}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Third Tab */}
        {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
        <div className=" mt-2.5">
            {/* Street Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Street Name" fontSize="85%"/>
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth="300px"
                    name="perm_addr_streetname_v"
                    // value={formData.perm_addr_streetname_v}
                    // onChange={(e) => handleChange('perm_addr_streetname_v', e.target.value)}
                  />
                </div>
              </div>
            </div>


            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Country" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    inputWidth="300px"
                    data={country}
                    // value={formData.perm_addr_city_v}
                    // onChange={(value) => handleChange('perm_addr_city_v', value)}
                    onChange={(value)=>{
                      // handleInputChange('p_Curr_addr_country', value)
                      setTimeout(() => {
                          const input = document.getElementById("AddressCounty");
                          input.focus();
                      },0);
                      }} 
                      // onChange={(value) => handleChange('p_region', value)}
                      onKeyDown={(e)=>{switchFocus(e,"AddressCounty")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("AddressCounty");
                        input.focus()
                      }
                    }}

                  />
                </div>
              </div>
            </div>

            

        </div>


        {/* Fourth Tab */}
        {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
        <div className="mt-2.5">
            {/* City */}
           <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="County"
                    fontSize="85%"
                    required={true}
                  />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                  id={"AddressCounty"}
                    inputWidth="300px"
                    data={county} 
                    value={formData.p_county}
                    // onChange={(value) => handleChange('perm_addr_city_v', value)}
                    onChange={(value)=>{
                      handleInputChange('p_county', value)
                      setTimeout(() => {
                          const input = document.getElementById("districtSubAddress");
                          input.focus();
                      },0);
                      const getSubCounty = () => {
                        axios
                          .post(API_SERVER + "/api/get-subcounty-details", {
                            code: "SCU",
                            county: value
                          },{headers})
                          .then(function (response) {
                           //  localStorage.setItem("getCountry", JSON.stringify(response.data));
                           //  console.log("getCountry :", response.data);
                           setSubCounty(response.data)
                          });
                      };
                      
                        getSubCounty()
                      }} 
                      // onChange={(value) => handleChange('p_region', value)}
                      onKeyDown={(e)=>{switchFocus(e,"districtSubAddress")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("districtSubAddress");
                        input.focus()
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* earest Land Mark*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sub County" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    id={'districtSubAddress'}
                    inputWidth="300px"
                    data={subCounty} 
                    value={formData.p_Sub_county}
                    // onChange={(value) => handleChange('perm_addr_city_v', value)}
                    onChange={(value)=>{
                      handleInputChange('p_Sub_county', value)
                        setTimeout(() => {
                          const input = document.getElementById("wardAddress");
                          input.focus();
                        },0);
  
                        const getWard = () => {
                          axios
                            .post(API_SERVER + "/api/get-ward-details", {
                              code: "SCW",
                              subCounty: value
                            },{headers})
                            .then(function (response) {
                             //  localStorage.setItem("getCountry", JSON.stringify(response.data));
                             //  console.log("getCountry :", response.data);
                             setWard(response.data)
                            });
                        };
  
                        getWard();
                      }} 
                    // onChange={(value) => handleChange('p_wardAddress', value)}
                    onKeyDown={(e)=>{switchFocus(e,"wardAddress")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("wardAddress");
                      input.focus()
                    }
                    }}
                  />
                </div>
              </div>
            </div>

        </div>



        {/* Sixth Tab */}
        {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
        <div className="mt-2.5">
            {/*Phone 2*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Ward"
                    fontSize="85%"
                  />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id={"wardAddress"} 
                    inputWidth="300px"
                    data={ward}
                    // value={formData.perm_addr_city_v}
                    // onChange={(value) => handleChange('perm_addr_city_v', value)}
                    onChange={(value)=>{
                      // handleChange('p_Curr_addr_location', value)
                      setTimeout(() => {
                          const input = document.getElementById("nlm");
                          input.focus();
                        },0);
  
                        // const getWard = () => {
                        //   axios
                        //     .post(API_SERVER + "/api/get-ward-details", {
                        //       code: "SCW",
                        //       county: value
                        //     },{headers})
                        //     .then(function (response) {
                        //      //  localStorage.setItem("getCountry", JSON.stringify(response.data));
                        //      //  console.log("getCountry :", response.data);
                        //      setWard(response.data)
                        //     });
                        // };
  
                        // getWard();
                      }} 
                    // onChange={(value) => handleChange('p_district', value)}
                    onKeyDown={(e)=>{switchFocus(e,"nlm")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("nlm");
                      input.focus()
                    }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Nature of Ownership*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Nearest Land Mark" fontSize="85%"/>
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField
                    id={"nlm"}
                    inputWidth="300px"
                    // name="perm_addr_streetname_v"
                    // value={formData.perm_addr_streetname_v}
                    // onChange={(e) => handleChange('perm_addr_streetname_v', e.target.value)}
                  />
                </div>
              </div>
            </div>

        </div>


        {/* Seventh Tab */}
        {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
        <div className="mt-2.5">
            {/*Stayed Since*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="PO Box Number"
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField
                    inputWidth="300px"
                    name="p_POBoxNo"
                    value={formData.p_POBoxNo}
                    onChange={(e) => handleInputChange('p_POBoxNo', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/*Cost Of Accommodation*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Owner of Property"
                    fontSize="85%"
                  />
                </div>
                <div className='ml-5'>
                  {ownerOfPro.map((option) => (
                    <label key={option.value} className="inline-flex items-center mr-4">
                      <input
                        id="minor"
                        type="radio"
                        name="p_Owner_of_Property"
                        value={option.value}
                        checked={formData.p_Owner_of_Property === option.value}
                        onChange={() => handleInputChange('p_Owner_of_Property', option.value)}
                        onKeyDown={(e)=>{switchFocus(e,"Stayed_Since")
                        if (e.key === "Enter"){
                          e.preventDefault();
                          const input = document.getElementById("Stayed_Since");
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



        {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
        <div className="mt-2.5">
            {/*Phone 2*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Stayed Since"
                    fontSize="85%"
                  />
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    id={'Stayed_Since'}
                    inputWidth="300px"
                    type={'date'}
                    name="p_Stayed_since"
                    // data={city} 
                    value={formData.p_Stayed_since}
                    onChange={(e) => handleInputChange('p_Stayed_since', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Nature of Ownership*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Stayed To" fontSize="85%"/>
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth="300px"
                    type={'date'}
                    name="p_Stayed_To"
                    value={formData.p_Stayed_To}
                    onChange={(e) => handleInputChange('p_Stayed_To', e.target.value)}
                  />
                </div>
              </div>
            </div>

        </div>



        {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
        <div className="mt-2.5">
            {/*Phone 2*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Rent Per Annum"
                    fontSize="85%"
                  />
                </div>
                <div className="md:w-2/3 ">
                  <InputField 
                    inputWidth="300px"
                    type={'text'}
                    disabled={formData.p_Owner_of_Property === 'N' ? false : true}
                    // data={city} 
                    // value={formData.perm_addr_city_v}
                    // onChange={(value) => handleChange('perm_addr_city_v', value)}
                  />
                </div>
              </div>
            </div>

            {/* Nature of Ownership*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Current value" fontSize="85%"/>
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth="300px"
                    type={'text'}
                    disabled={formData.p_Owner_of_Property === 'Y' ? false : true}
                    // name="perm_addr_streetname_v"
                    // value={formData.perm_addr_streetname_v}
                    // onChange={(e) => handleChange('perm_addr_streetname_v', e.target.value)}
                  />
                </div>
              </div>
            </div>

        </div>



        {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
        <div className="mt-2.5">
            {/*Phone 2*/}
            {/* <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Balance Mortgage"
                    fontSize="85%"
                  />
                </div>
                <div className="md:w-2/3 ">
                  <InputField 
                    inputWidth="300px"
                    type={'text'}
                    // data={city} 
                    // value={formData.perm_addr_city_v}
                    // onChange={(value) => handleChange('perm_addr_city_v', value)}
                  />
                </div>
              </div>
            </div> */}

            {/* Nature of Ownership*/}
            {/* <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Attention Party" fontSize="85%"/>
                </div>
                <div class="md:w-2/3 md:ml-[2px] ">
                  <InputField 
                    inputWidth="300px"
                    type={'text'}
                    // name="perm_addr_streetname_v"
                    // value={formData.perm_addr_streetname_v}
                    // onChange={(e) => handleChange('perm_addr_streetname_v', e.target.value)}
                  />
                </div>
              </div>
            </div> */}

        </div>

      </div>
    </div>
          <div>
            {/* Modal footer */}
          <Footer align="right">
            <Button onClick={closeModal} variant="light">
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
          </Footer>
            {/* Your form inputs and logic can go here */}
          </div>
        </Modal>
      </Portal>
    </div>
  )
}

export default Address