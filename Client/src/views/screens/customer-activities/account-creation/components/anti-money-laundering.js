import React, { useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";

const Anti_Money_Laundering = ({data}) => {
  return (
    <div>
      <div className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-2xl">
            {/* Nature of Business */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Nature of Business " fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Annual Income*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Tin Number" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/* Occupation */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Occupation" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Position Held */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Position Held" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Nature of Ownership */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Nature of Ownership"  fontSize="85%" />
                  </div>
                  <div className="md:w-2/3">
                      <ListOfValue data={data.natureOfOwnership} />
                  </div>
              </div>
            </div>
            
            {/* Number of Staff */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Number of Staff" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/* Number of Branches */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Number of Branches" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/* Share Capital*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Share Capital" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/*Total Wealth*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Total Wealth" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/*No of Withdrawal per Month*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="No of Withdrawal per Month" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/*Amount of Withdrawal per Month*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Amount Withdrawals per Month" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/*No of Deposits per Month*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="No of Deposits per Month" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/*Amount Deposits per Month*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Amount Deposits per Month" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>
          
          </div>
          {/* **************************************** */}


          {/* Second Side */}
          {/* Second Side */}
          {/* Second Side */}
          <div className="w-full max-w-2xl">
            <div className='border md:ml-5 md:p-2 bg-[#15A3B7] text-white md:mt-1'>
              Source of Wealth
            </div>
            <div className='border md:ml-5 md:p-2'>
              {/* Description */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3">
                        <Label label="Description"  fontSize="85%" />
                    </div>
                    <div className="md:w-2/3">
                        <ListOfValue />
                    </div>
                </div>
              </div>

              {/* Description */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3">
                        <Label label="Description"  fontSize="85%" />
                    </div>
                    <div className="md:w-2/3">
                        <ListOfValue />
                    </div>
                </div>
              </div>

              {/* Description */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3">
                        <Label label="Description"  fontSize="85%" />
                    </div>
                    <div className="md:w-2/3">
                        <ListOfValue />
                    </div>
                </div>
              </div>


            </div>


                <div className='border md:ml-5 md:p-2 bg-[#15A3B7] text-white md:mt-1'>
                    Source of Fund
                </div>

                <div className='border md:ml-5 md:p-2'>
                    
                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                        <input type="checkbox" className="my_inputs_Source_of_fund" />
                        <label className="my_labels_Source_of_fund">Business Sales</label>
                    </div>

                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                        <input type="checkbox" className="my_inputs_Source_of_fund" />
                        <label className="my_labels_Source_of_fund">Proceeds from Estate</label>
                    </div>

                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                        <input type="checkbox" className="my_inputs_Source_of_fund" />
                        <label className="my_labels_Source_of_fund">Salary</label>
                    </div>

                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                        <input type="checkbox" className="my_inputs_Source_of_fund" />
                        <label className="my_labels_Source_of_fund">Commissions</label>
                    </div>
                  
                </div>


                <div className='border md:ml-5 md:p-2 bg-[#15A3B7] text-white md:mt-1'>
                    Transaction Type
                </div>

                <div className='border md:ml-5 md:p-2'>

                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                        <input type="checkbox" className="my_inputs_Source_of_fund" />
                        <label className="my_labels_Source_of_fund">Inward Transfers</label>
                    </div>
                  
                </div>

          </div>

        </div>

      
      </div>
    </div>
  )
}

export default Anti_Money_Laundering