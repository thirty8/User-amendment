import React from 'react'
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";

const Corporate_Relations = ({data}) => {

    const columns = ["Relation No", "first Name", "Surname", "Middle Name", "Gender", "Date of Birth", "Mobile 1", "Mandate Level"];


  const data_1 = [
    ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "2"],
    ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "1"],
    ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "2"],
   ];
  return (
    <div>
    <div>
      <div className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-2xl">
            {/* Title */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Title" fontSize="85%" />
                  </div>
                  <div className="md:w-2/4 ">
                      <ListOfValue data={data.title} />
                  </div>
              </div>
            </div>

            {/* Salutation */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Salutation" fontSize="85%" />
                  </div>
                  <div className="md:w-2/4 ">
                      <ListOfValue data={data.salutation} />
                  </div>
              </div>
            </div>

            {/* First Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="First Name" required={true} fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Middle Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Middle Name" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Surname */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Surname Name" required={true} fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Email */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Email" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Date Of Birth" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ml-1">
                    <InputField type={"date"} />
                  </div>
              </div>
            </div>

            {/* Gender */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Gender" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:mr-3">
                      <SelectField first_option="Male" second_option="Female"  />
                  </div>
              </div>
            </div>

            {/* Primary Phone Number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Primary Phone Number" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/* Tin Number*/}
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
                      <Label label="ID Type" required={true} fontSize="85%" />
                  </div>
                  <div className="md:w-2/4 ">
                      <ListOfValue data={data.id_type} />
                  </div>
              </div>
            </div>

            {/* ID Number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="ID Number" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/* Issuing Auth */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Issuing Auth" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <input className="risk_label" type="text" />
                  </div>
              </div>
            </div>

            {/* Issuing Date */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Issuing Date" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      {/* <input className="risk_label" type="date" /> */}
                      <InputField type={"date"} />
                  </div>
              </div>
            </div>

            {/* ID Expiry Date */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="ID Expiry Date" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      {/* <input className="risk_label" type="date" /> */}
                      <InputField type={"date"} />
                  </div>
              </div>
            </div>

            {/* Issuing Place */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Issuing Place" required={true} fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Flat/Villa/House No */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Flat/Villa/House No" required={true} fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Street Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Street Name" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

            {/* Country Code */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Country Code" required={true} fontSize="85%" />
                  </div>
                  <div className="md:w-2/4 ">
                      <ListOfValue data={data.country} />
                  </div>
              </div>
            </div>

            {/* Signatory Level */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Signatory Level" required={true} fontSize="85%" />
                  </div>
                  <div className="md:w-2/4 ">
                      <ListOfValue data={data.signatoryLevel} />
                  </div>
              </div>
            </div>

            {/* Approval Limit */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Approval Limit" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:mr-2">
                      <input class="my_inputs" type="text" />
                  </div>
              </div>
            </div>

          </div>

        </div>

        <div className="flex justify-end mr-5">
          <ButtonComponent label="Save" buttonBackgroundColor="green" buttonWidth="120px" buttonHeight="30px" />
        </div>

        
        <DataTable data={data_1} columns={columns} />
      </div>
    </div>
    </div>
  )
}

export default Corporate_Relations