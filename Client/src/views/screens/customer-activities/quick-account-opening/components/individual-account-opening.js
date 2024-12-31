import React, { useState, useEffect } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import axios from 'axios'
// import DataTableAnnex from "./datatable-annex";
const host = window.location.host;

const themes = {
  // default color
  defaultColorTheme: {
    backgroundColor: "#fff",
    backgroundImage: `url("http://${host}/assets/purple.jpeg")`,
    headerColor: "#845ef6",
    buttonColor: "#845ef6",
    nextColor: "violet",
  },

  // blue
  theme1: {
    backgroundColor: "#c8d6e8",
    backgroundImage: `url("http://${host}/assets/blue.png")`,
    headerColor: "rgb(21 163 183)",
    buttonColor: "rgb(66, 157, 232)",
    nextColor: "cyan",
  },

  // red
  theme2: {
    backgroundColor: "#facfcf",
    backgroundImage: `url("http://${host}/assets/redwall.jpeg")`,
    headerColor: "#ed716d",
    buttonColor: "#ed716d",
    nextColor: "red",
  },
  // grape or violet
  theme3: {
    backgroundColor: "#f2dcfa",
    backgroundImage: `url("http://${host}/assets/purpr.webp")`,
    headerColor: "#995ead",
    buttonColor: "#c895f5",
    nextColor: "grape",
  },
  // orange
  theme4: {
    backgroundColor: "#faddca",
    backgroundImage: `url("http://${host}/assets/orann.jpeg")`,
    headerColor: "#fc9403",
    buttonColor: "#edaf6d",
    nextColor: "orange",
  },

  // green
  theme5: {
    backgroundColor: "#b1fcb2",
    backgroundImage: `url("http://${host}/assets/leaf.jpeg")`,
    headerColor: "#008000a7",
    buttonColor: "#4eb550",
    nextColor: "green",
  },
};
function Individual_account_opening({data}) {
  const [themeState, setThemeState] = useState(themes.theme1);
  // const [data, setData] = useState()

  //dropzone section
  function defaultColorTheme() {
    setThemeState(themes.defaultColorTheme);
  }

  function themeColor1() {
    setThemeState(themes.theme1);
  }

  function themeColor2() {
    setThemeState(themes.theme2);
  }

  function themeColor3() {
    setThemeState(themes.theme3);
  }

  function themeColor4() {
    setThemeState(themes.theme4);
  }

  function themeColor5() {
    setThemeState(themes.theme5);
  }

  // creating states to be used in the application
  const [permittedBal, setPermittedBal] = useState();
  const [availableBal, setAvailableBal] = useState();
  const [ledgerBal, setLedgerBal] = useState();
  const [accountBranch, setAccountBranch] = useState();
  const [transactionType, setTransactionType] = useState("CADD - CASH DEPOSIT");
  const handleEnter = () => {
    alert("Populate");
  };


const options = {
  responsive: "standard", // Set table responsiveness
  selectableRows: "none", // Disable row selection
  filterType: "checkbox", // Use checkboxes instead of text input for filters
  searchPlaceholder: "Search Employees", // Customize search placeholder text
  elevation: 2, // Set table elevation
  pagination: false, // Hide pagination controls
  downloadOptions: { filename: "employee_list.csv", separator: "," }, // Customize CSV download options
  customHeadRender: (columnMeta, updateDirection) => { // Customize header style
    return (
      <th key={columnMeta.index}>
        <div style={{textAlign: "center", backgroundColor: "lightblue", color: "white", fontWeight: "bold"}}>
          {columnMeta.label}
        </div>
      </th>
    );
  },
  customBodyRender: (value, tableMeta, updateValue) => { // Customize body style
    return (
      <div style={{textAlign: "center"}}>
        {value}
      </div>
    );
  },
  customToolbar: () => { // Customize toolbar
    return (
      <div style={{padding: "10px"}}>
        <span style={{fontWeight: "bold", marginRight: "10px"}}>Employee List</span>
        <button style={{borderRadius: "4px", backgroundColor: "lightblue", color: "white", padding: "8px"}}>
          Add Employee
        </button>
      </div>
    );
  }
};
// const columns = ["Relation No", "first Name", "Surname", "Middle Name", "Gender", "Date of Birth", "Mobile 1", "Mandate Level", "Approver Limit"];

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
    field: "Gender",
    headerName: "Gender",
    type: "text",
    width: 140,
    editable: true,
    headerClassName: "bg-blue-500 text-white uppercase",
    headerAlign: "center",
  },
  {
    field: "DateOfBirth",
    headerName: "Date of Birth",
    type: "date",
    width: 150,
    editable: true,
    headerClassName: "bg-blue-500 text-white uppercase",
    headerAlign: "center",
  },
  {
    field: "Mobile",
    headerName: "Mobile 1",
    type: "number",
    width: 100,
    editable: true,
    headerClassName: "bg-blue-500 text-white uppercase",
    headerAlign: "center",
  },
  {
    field: "MandateLevel",
    headerName: "Mandate Level",
    type: "text",
    width: 160,
    editable: true,
    headerClassName: "bg-blue-500 text-white uppercase",
    headerAlign: "center",
  },
  {
    field: "ApproverLimit",
    headerName: "Approver Limit",
    type: "text",
    width: 160,
    editable: true,
    headerClassName: "bg-blue-500 text-white uppercase",
    headerAlign: "center",
  },
];


const rows = [];


  // const data_1 = [
  //   ["Joe James", "Test Corp", "Yonkers", "NY", "Joe James", "Test Corp", "Yonkers", "2", "20"],
  //   ["John Walsh", "Test Corp", "Hartford", "CT", "Joe James", "Test Corp", "Yonkers", "1", "30"],
  //   ["Bob Herm", "Test Corp", "Tampa", "FL", "Joe James", "Test Corp", "Yonkers", "2", "10"],
  //  ];

  


  return (
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
                <div class="md:w-2/3 ">
                  <input className="risk_label" type="date" />
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
                  <SelectField first_option="Male" second_option="Female" />
                </div>
              </div>
            </div>

            {/* Primary Phone Number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label
                    label="Primary Phone Number"
                    required={true}
                    fontSize="85%"
                  />
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
                  <Label
                    label="ID Expiry Date"
                    required={true}
                    fontSize="85%"
                  />
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
                  <Label
                    label="Flat/Villa/House No"
                    required={true}
                    fontSize="85%"
                  />
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

            {/* Location / GPRS */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Location / GPRS" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <input class="my_inputs" type="text" />
                </div>
              </div>
            </div>

            {/* City */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="City" fontSize="85%" />
                </div>
                <div className="md:w-2/4 ">
                  <ListOfValue data={data.city} />
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
          </div>
        </div>

        {/* <div className="flex justify-end mr-5">
          <ButtonComponent
            label="Save"
            buttonBackgroundColor="green"
            buttonWidth="120px"
            buttonHeight="30px"
          />
        </div> */}

        {/* <DataTableAnnex rows={rows} columns={columns} /> */}
      </div> 
    </div>
  );
}

export default Individual_account_opening;
