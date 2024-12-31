import React, { useEffect, useState } from 'react'
import InputField from "../../../../../../../../components/others/Fields/InputField";
import Label from "../../../../../../../../components/others/Label/Label";
import { API_SERVER } from "../../../../../../../../config/constant";
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
    custType,
    dataApproval,
    selectedData
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

  const fxOptions = [
    { value: 'N', label: 'None' },
    { value: 'FR', label: 'Foreign' },
    { value: 'FX', label: 'Other' }
  ];

  return (
    <div>
      <div className="border rounded bg-white">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-xl">
            {/*  Relation Manager */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Relation Manager"
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
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.GET_RELATION_MANAGER
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Product Group */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Product Group" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={dataApproval.PROD_CODE}
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.TYPE_OF_ACCOUNT
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Product Sub Group */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Product Sub Group" fontSize="85%" />
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
                        ? dataApproval.GET_PROD
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Currency currency */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Currency" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={dataApproval.CURRENCY_CODE}
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.GET_CURRENCY
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Fx Category */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div className="md:flex md:items-center space-x-5 mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="FX Category" />
                </div>
                {/* <div className="md:w-2/3 ">
                  <InputField
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={dataApproval.FX_CATEGORY}
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.FX_CATEGORY
                        : ""
                    }
                  />
                </div> */}

                <div>
                  {fxOptions.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        id="gender"
                        type="radio"
                        name="P_gender"
                        value={
                          dataApproval.relationData?.length > 0
                            ? dataApproval.FX_CATEGORY
                            : ""
                        }
                        checked={dataApproval.FX_CATEGORY === option.value}
                      />{" "}
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer Segment */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Customer Segment" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={dataApproval.SEGMENT}
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.GET_SEGMENT
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Sub Customer Segment */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sub Customer Segment" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={dataApproval.SUB_SEGMENT}
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.GET_SUBSEGMENT
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Document Required Type */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Document Required Type" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}
                    // value={dataApproval.DOCUMENT_REQ_TYPE}
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.GET_DOCUMENT_TYPE
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Introductory Source */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Introductory Source" fontSize="85%" />
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

            {/* Sector */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sector" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={dataApproval.SECTOR}
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.GET_SECTOR
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

            {/* Sub Sector  */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sub Sector" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <InputField
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={dataApproval.SECTORM}
                    value={
                      dataApproval.relationData?.length > 0
                        ? dataApproval.GET_SUBSECTOR
                        : ""
                    }
                  />
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