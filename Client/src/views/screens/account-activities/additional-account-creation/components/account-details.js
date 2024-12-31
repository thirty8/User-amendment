import React, { useEffect, useState } from 'react'
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import { API_SERVER } from "../../../../../config/constant";
import axios from 'axios';
import ListOfValue from './comp/ListOfValue';

const Account_Details = (
  {
    data, 
    onChange,
    accountDetailsData,
    setAccountDetailsData,  
    accountTypes, 
    setAccountTypes, 
    customerSegment, 
    customerSubSegment,
    sector, 
    subSector,
    handleCustTypeChange,
    custType
  }
  ) => {
    const [typesOfReferee, setTypesOfReferee] = useState(localStorage.getItem('typesOfReferee') || '')
    const [documentRequiredType, setDocumentRequiredType] = useState([])
    const [formValues, setFormValues] = useState([])
    

    // const headers = {
    //   "x-api-key": process.env.REACT_APP_API_KEY,
    //   "Content-Type": "application/json",
    // };

   

   

   

    const headers={
      'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      'Content-Type': 'application/json'
    };

    useEffect(() => {
      localStorage.setItem('typesOfReferee', typesOfReferee);
    }, [typesOfReferee])
    
    const handleTypeOfReferee = (event) => {
      setTypesOfReferee(event.target.value)
    }

    useEffect(() => {
      // Get Document Required Type
     const getDocumentRequiredType = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "DRA",
        },{headers})
        .then(function (response) {
          setDocumentRequiredType(response.data)
         //  console.log(response.data,":::Document Type")
        });
    };
    getDocumentRequiredType()
    },[])
    console.log(subSector, "data.customer_segment");

    const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get( API_SERVER + '/api/arm', {headers});
        setOptions(response.data);
        console.log("Relation:::", response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangeRelation = (name, value) => {
    // accountDetailsData(value);

    setAccountDetailsData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Add your logic here to handle the selected value
  };

  const combinedOptions = [
    ...custType,
    ...accountDetailsData.documentRequiredType
  ];

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      }
  }

  return (
    <div>

      <div className="border rounded bg-white">




        <div className="md:flex justify-center w-full">
         
            
          {/* **************************************** */}
          <div className="w-full max-w-xl">

            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Customer ID" fontSize="85%"/>
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    inputWidth="30%" 
                   
                  />
                </div>
              </div>
            </div>

            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Source Branch" fontSize="85%"/>
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    inputWidth="100%" 
                   
                  />
                </div>
              </div>
            </div>


            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Account Name" fontSize="85%"/>
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    inputWidth="100%" 
                   
                  />
                </div>
              </div>
            </div>
            
             {/*  Relation Manager */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Relation Manager" required={true} fontSize="85%"/>
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    data={options}
                    inputWidth="100%" 
                    value={accountDetailsData.relationManager}
                    // value={formValues.id_type}
                    loading={loading}
                    // onChange={handleChangeRelation}
                    // onChange={(value) => handleChangeRelation('relationManager', value)}
                    // disabled={loading}

                    onChange={(value)=>{
                      handleChangeRelation('relationManager', value)
                      setTimeout(() => {
                          const input = document.getElementById("prodgroup");
                          input.focus();
                        },0);
                    }}
  
                    onKeyDown={(e)=>{switchFocus(e,"prodgroup")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("prodgroup");
                      input.focus()
                    }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Product Group */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Product Group" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id={"prodgroup"}
                    inputWidth="100%"
                    data={data.productGroup}
                    value={accountDetailsData.productGroup}
                    onChange={onChange.productGroup}

                    // onChange={(value)=>{(
                    //   {onChange.productGroup}
                    //   setTimeout(() => {
                    //       const input = document.getElementById("prodgroup");
                    //       input.focus();
                    //     },0);
                    // )}}
  
                    onKeyDown={(e)=>{switchFocus(e,"prodSubgroup")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("prodSubgroup");
                      input.focus()
                    }
                    }}
                    
                  />
                </div>
              </div>
            </div>

            {/* Product Sub Group */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Product Sub Group" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    id={"prodSubgroup"}
                    onChange={onChange.productSubGroup}
                    value={accountDetailsData.productSubGroup}
                    data={data.productSubGroup} 
                    inputWidth="100%"
                    onKeyDown={(e)=>{switchFocus(e,"currency")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("currency");
                      input.focus()
                    }
                    }}
                  />
                </div>
              </div>
            </div>

            

            {/* Fx Category */}
            <div className='flex items-center justify-center space-x-3 ml-[120px]'>

              {/* Currency currency */}
              <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3 text-right">
                    <Label label="Currency" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 ">
                    <ListOfValue 
                      id={"currency"}
                      data={data.currencies} 
                      inputWidth="200px" 
                      onChange={onChange.currencies}
                      value={accountDetailsData.currencies}
                      onKeyDown={(e)=>{switchFocus(e,"select_field")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("select_field");
                        input.focus()
                      }
                      }}
                    />
                      
                  </div>
                </div>
              </div>


              <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                <div className="md:flex md:items-center space-x-2 mb-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Fx&nbsp;Category" fontSize="85%" />
                    </div>
                    <div className="relative">
                    <select
                        id="select_field"
                        name="fxcategory"
                        value={accountDetailsData.fxcategory}
                        onChange={(e) => handleChangeRelation('fxcategory', e.target.value)}
                        className="block appearance-none w-[100px] py-[3px] leading-tight rounded-[3px] border-[1px] border-[#d1cccc] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        onKeyDown={(e)=>{switchFocus(e,"custSeg")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("custSeg");
                        input.focus()
                      }
                      }}
                    >
                        {/* <option value="" >-- Select --</option> */}
                        <option value="N">None</option>
                        <option value="FR">Foreign</option>
                        <option value="FX">Forex</option>
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

            {/* Account Mandate */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Account Mandate" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                  id={"custSeg"}
                    inputWidth="100%"
                    onChange={onChange.customerSegment_}
                    data={data.customerSegment}
                    value={accountDetailsData.customerSegment}
                    onKeyDown={(e)=>{switchFocus(e,"subSegment")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("subSegment");
                      input.focus()
                    }
                  }}
                  />
                </div>
              </div>
            </div>


            {/* PC Code */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="PC Code" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                  id={"custSeg"}
                    inputWidth="100%"
                    onChange={onChange.customerSegment_}
                    data={data.customerSegment}
                    value={accountDetailsData.customerSegment}
                    onKeyDown={(e)=>{switchFocus(e,"subSegment")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("subSegment");
                      input.focus()
                    }
                  }}
                  />
                </div>
              </div>
            </div>

            {/* Customer Segment */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Customer Segment" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                  id={"custSeg"}
                    inputWidth="100%"
                    onChange={onChange.customerSegment_}
                    data={data.customerSegment}
                    value={accountDetailsData.customerSegment}
                    onKeyDown={(e)=>{switchFocus(e,"subSegment")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("subSegment");
                      input.focus()
                    }
                  }}
                  />
                </div>
              </div>
            </div>

            {/* Sub Customer Segment */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sub Customer Segment" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id={"subSegment"}
                    onChange={onChange.customerSubSegment}
                    value={accountDetailsData.customerSubSegment}
                    data={data.customerSubSegment}
                    inputWidth="100%"
                    onKeyDown={(e)=>{switchFocus(e,"RequiredType")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("RequiredType");
                      input.focus()
                    }
                  }}
                  />
                </div>
              </div>
            </div>

            {/* Document Required Type */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Document Required Type" fontSize="85%" />
                </div>
                <div className="md:w-2/3">
                  <ListOfValue
                    id={"RequiredType"}
                    data={documentRequiredType}
                    // onChange={onChange.documentRequiredType}
                    onChange={handleCustTypeChange}
                    // value={accountDetailsData.documentRequiredType}
                    value={custType}
                    // value={combinedOptions}
                    inputWidth="100%"
                    onKeyDown={(e)=>{switchFocus(e,"introSource")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("introSource");
                      input.focus()
                    }
                  }}
                  />
                </div>
              </div>
            </div>

            {/* Introductory Source */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Introductory Source" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    id={"introSource"}
                    data={data.introductory}
                    onChange={onChange.introductorysource}
                    value={accountDetailsData.introductorySource}
                    inputWidth="100%" 
                    onKeyDown={(e)=>{switchFocus(e,"sector")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("sector");
                      input.focus()
                    }
                  }}
                  />
                </div>
              </div>
            </div>

            {/* Sector */}
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sector" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    id={"sector"}
                    data={sector} 
                    onChange={onChange.sector}
                    value={accountDetailsData.sector}
                    inputWidth="100%"
                    onKeyDown={(e)=>{switchFocus(e,"subsector")
                    if (e.key === "Enter"){
                      e.preventDefault();
                      const input = document.getElementById("subsector");
                      input.focus()
                    }
                  }} 
                  />
                </div>
              </div>
            </div>

            {/* Sub Sector  */} 
            <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sub Sector" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    id={"subsector"}
                    data={subSector}
                    onChange={onChange.subSector}
                    value={accountDetailsData.subSector}
                    inputWidth="100%"
                  />
                </div>
              </div>
            </div>




{/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

   

            <div className='flex items-center justify-center ml-[120px]'>

              {/* Currency currency */}
              <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                <div className="md:flex md:items-center space-x-2 mb-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Freq&nbsp;of&nbsp;Statement" fontSize="85%" />
                    </div>
                    <div className="relative">
                    <select
                        id="select_field"
                        name="fxcategory"
                        value={accountDetailsData.fxcategory}
                        onChange={(e) => handleChangeRelation('fxcategory', e.target.value)}
                        className="block appearance-none w-[200px] py-[3px] leading-tight rounded-[3px] border-[1px] border-[#d1cccc] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        onKeyDown={(e)=>{switchFocus(e,"custSeg")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("custSeg");
                        input.focus()
                      }
                      }}
                    >
                        {/* <option value="" >-- Select --</option> */}
                        <option value="N">None</option>
                        <option value="FR">Foreign</option>
                        <option value="FX">Forex</option>
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


              <div class="md:flex md:items-center mb-2">
                {/* <div class="md:w-1/3">
                  <Label label="Member&nbsp;Number" fontSize="85%" />
                </div> */}
                <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  label="Start Date"
                  labelWidth={'30%'}
                  id="accountno"
                  inputWidth={'200px'}
                  name="accountno"
                  type={'date'}
                  // value={custmerNumber}
                  style={{alignText:'center'}}
                  // onChange={(e) => handleChange('sname_v', e.target.value)}
                />
                </div>
              </div>


              <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                <div className="md:flex md:items-center mb-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Statement" fontSize="85%" />
                    </div>
                    <div className="relative">
                    <select
                        id="select_field"
                        name="fxcategory"
                        value={accountDetailsData.fxcategory}
                        onChange={(e) => handleChangeRelation('fxcategory', e.target.value)}
                        className="block appearance-none w-[150px] py-[3px] leading-tight rounded-[3px] border-[1px] border-[#d1cccc] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        onKeyDown={(e)=>{switchFocus(e,"custSeg")
                      if (e.key === "Enter"){
                        e.preventDefault();
                        const input = document.getElementById("custSeg");
                        input.focus()
                      }
                      }}
                    >
                        {/* <option value="" >-- Select --</option> */}
                        <option value="N">None</option>
                        <option value="FR">Foreign</option>
                        <option value="FX">Forex</option>
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

         

          </div>
          {/* **************************************** */}

          
        </div>

        <div className="flex justify-end mr-5">
          {/* <ButtonComponent label="Save" buttonBackgroundColor="green" buttonWidth="120px" buttonHeight="30px" /> */}
        </div>
      </div>
    </div>
  );
}

export default Account_Details