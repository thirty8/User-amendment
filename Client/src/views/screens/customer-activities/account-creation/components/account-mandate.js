import React from 'react'
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";

const Account_Mandate = ({data}) => {

  const columns = ["Relation No", "first Name", "Surname", "Middle Name", "Signatory levels", "Approval Limit", "Photo Signature", "finger Print"];

  const columns_ = ["Serial No", "Description", "Document Code", "Document Number", "Middle Name", "Document Date", "Mandate", "Received Date"];

  const data_1 = [
    ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "NY"],
    ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "NY"],
   ];

   const data_ = [
    ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", `${<InputField />}`],
   ]

   
    const options = {
      filterType: 'checkbox',
    };

    
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
                                <Label label="Account Mandate" fontSize="85%" />
                            </div>
                            <div className="md:w-2/3 ">
                                <ListOfValue data={data.accountMandate} />
                            </div>
                        </div>
                    </div>

                
                </div>

        </div>

        <div className='md:p-5'>
          <DataTable data_1={data_1} columns={columns} options={options} />
        </div>

        <div className='md:p-5'>
          <DataTable data={data_} columns={columns_} options={options} />
        </div>

        <div className="flex justify-end mr-5">
          <ButtonComponent label="Save" buttonBackgroundColor="green" buttonWidth="120px" buttonHeight="30px" />
        </div>

      
      </div>
    </div>
  )
}

export default Account_Mandate