import React from 'react'
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";

const Account_Details = ({data, onChange , accountTypes , setAccountTypes, customerSegment, customerSubSegment, sector, subSector}) => {
    console.log(data.introductorysource, "data.customer_segment")
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
                                <ListOfValue data={data.productGroup} />
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
                                <ListOfValue data={data.productSubGroup} />
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
                                <ListOfValue onChange={onChange.myMethod} />
                            </div>
                        </div>
                    </div>

                    {/* Fx Category */}
                    <div class="w-full max-w-xl mt-2">
                        <div class="md:flex md:items-center mb-2 ml-2">
                            <div class="md:w-1/3">
                                <Label label="Fx Category" required={true} fontSize="85%" />
                            </div>
                            <div class="md:w-2/3 md:mr-3">
                                <SelectField first_option="None" second_option="Female"  />
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
                                <ListOfValue onChange={onChange.customerSegment} data={customerSegment} />
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
                                <ListOfValue onChange={onChange.customerSubSegment} data={customerSubSegment} />
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
                                <ListOfValue data={data.documentRequiredType} />
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
                                <ListOfValue data={data.introductorysource} />
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
                                <ListOfValue data={sector} onChange={onChange.sector}  />
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
                                <ListOfValue data={subSector}  />
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
  )
}

export default Account_Details