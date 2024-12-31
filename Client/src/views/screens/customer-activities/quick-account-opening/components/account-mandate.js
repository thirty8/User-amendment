import React from 'react'
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";
// import DataTableAnnex from './datatable-annex';

const Account_Mandate = ({data}) => {

  const columns = [
    {
      field: "Number",
      headerName: "Relation No",
      type: "Number",
      width: 130,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "FirstName",
      headerName: "First Name",
      type: "text",
      width: 200,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "Surname",
      headerName: "Surname",
      type: "text",
      width: 200,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "MiddleName",
      headerName: "Middle Name",
      type: "text",
      width: 200,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "Signatorylevels",
      headerName: "Signatory levels",
      type: "text",
      width: 140,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "ApprovalLimit",
      headerName: "Approval Limit",
      type: "text",
      width: 150,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "PhotoSignature",
      headerName: "Photo Signature",
      type: "text",
      width: 100,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "FingerPrint",
      headerName: "Finger Print",
      type: "text",
      width: 160,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
  ];


  const columns_ = [
    {
      field: "SerialNo",
      headerName: "Serial No",
      type: "Number",
      width: 130,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "Description",
      headerName: "Description",
      type: "text",
      width: 200,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "DocumentCode",
      headerName: "Document Code",
      type: "text",
      width: 200,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "DocumentNumber",
      headerName: "Document Number",
      type: "number",
      width: 200,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "MiddleName",
      headerName: "Middle Name",
      type: "text",
      width: 140,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "DocumentDate",
      headerName: "Document Date",
      type: "date",
      width: 150,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "Mandate",
      headerName: "Mandate",
      type: "text",
      width: 100,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
    {
      field: "ReceivedDate",
      headerName: "Received Date",
      type: "date",
      width: 160,
      editable: true,
      headerClassName: "bg-blue-500 text-white uppercase",
      headerAlign: "center",
    },
  ];

  const rows = [];

    
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

        <div className="md:p-5">
          {/* <DataTableAnnex rows={rows} columns={columns} /> */}
        </div>

        <div className="md:p-5">
          {/* <DataTableAnnex rows={rows} columns={columns_} /> */}
        </div>

        {/* <div className="flex justify-end mr-5">
          <ButtonComponent
            label="Save"
            buttonBackgroundColor="green"
            buttonWidth="120px"
            buttonHeight="30px"
          />
        </div> */}
      </div>
    </div>
  );
}

export default Account_Mandate