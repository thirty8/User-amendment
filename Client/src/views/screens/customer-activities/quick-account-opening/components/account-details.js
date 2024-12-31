import React, { useEffect, useState } from 'react'
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";

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
    subSector
  }
  ) => {
    const [typesOfReferee, setTypesOfReferee] = useState(localStorage.getItem('typesOfReferee') || '')

    useEffect(() => {
      localStorage.setItem('typesOfReferee', typesOfReferee);
    }, [typesOfReferee])
    
    const handleTypeOfReferee = (event) => {
      setTypesOfReferee(event.target.value)
    }
    // console.log(data.customerSegment, "data.customer_segment")
  return (
    <div>
      <div className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-xl">
            {/* Product Group */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Product Group" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    data={data.productGroup}
                    value={accountDetailsData.productGroup}
                    onChange={onChange.productGroup}
                    
                  />
                </div>
              </div>
            </div>

            {/* Product Sub Group */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Product Sub Group" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    onChange={onChange.productSubGroup}
                    value={accountDetailsData.productSubGroup}
                    data={data.productSubGroup} 
                    inputWidth="80%" />
                </div>
              </div>
            </div>

            {/* Currency */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Currency" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    data={data.currencies} 
                    inputWidth="80%" 
                    onChange={onChange.currencies}
                    value={accountDetailsData.currencies}
                  />
                    
                </div>
              </div>
            </div>

            {/* Fx Category */}
            <div class="w-full max-w-xl mt-2">
              <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                  <Label label="Types Of Referees" />
                  </div>
                  <div className="relative">
                  <select
                      id="select-field"
                      name="select-field"
                      value={typesOfReferee}
                      onChange={handleTypeOfReferee}
                      className="block appearance-none w-full py-1 pl-3 pr-10 leading-tight rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                      {/* <option value="" >-- Select --</option> */}
                      <option value="None">None</option>
                      <option value="Foreign">Foreign</option>
                      <option value="Forex">Forex</option>
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

            {/* Customer Segment */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Customer Segment" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    onChange={onChange.customerSegment_}
                    data={data.customerSegment}
                    value={accountDetailsData.customerSegment}
                  />
                </div>
              </div>
            </div>

            {/* Sub Customer Segment */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Sub Customer Segment" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    onChange={onChange.customerSubSegment}
                    value={accountDetailsData.customerSubSegment}
                    data={data.customerSubSegment}
                    inputWidth="80%"
                  />
                </div>
              </div>
            </div>

            {/* Document Required Type */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Document Required Type" fontSize="85%" />
                </div>
                <div className="md:w-2/3">
                  <ListOfValue
                    data={data.documentRequiredType}
                    onChange={onChange.documentRequiredType}
                    value={accountDetailsData.documentRequiredType}
                    inputWidth="100%"
                  />
                </div>
              </div>
            </div>

            {/* Introductory Source */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Introductory Source" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    data={data.introductory}
                    onChange={onChange.introductorysource}
                    value={accountDetailsData.introductorySource}
                    inputWidth="95%" 
                  />
                </div>
              </div>
            </div>

            {/* Sector */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Sector" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    data={sector} 
                    onChange={onChange.sector}
                    value={accountDetailsData.sector}
                    inputWidth="60%" />
                </div>
              </div>
            </div>

            {/* Sub Sector */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Sub Sector" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue 
                    data={subSector}
                    onChange={onChange.subSector}
                    value={accountDetailsData.subSector}
                    inputWidth="80%"
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