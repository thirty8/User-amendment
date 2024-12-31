import React, { useState } from "react";
import { Modal, Radio, Group, Button, Text } from "@mantine/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { formatDate } from "../helpers/date_formater";

function E_services({
  add_new_relation,
  setAddNewRelation,
  eServiceResponse
}) {
  const [selectedServices, setSelectedServices] = useState({
    smsAlert: "",
    emailAlert: "N",
    internetBanking: "N",
    mobileBanking: "N",
    atmServices: "N",
    eStatement: "N",
  });

  // Function to handle radio selection change
  const handleFrequencyChange = (e) => {
    const { value } = e.target;
    setAddNewRelation((prevState) => ({
      ...prevState,
      P_SERVICE_CODE: value, // Update frequency in state
    }));
  };

  console.log("add_new_relation", add_new_relation);

  const frequencyOptions = [
    { label: "Daily", value: "001" },
    { label: "Weekly", value: "002" },
    { label: "Monthly", value: "003" },
    { label: "Quarterly", value: "004" },
  ];

  const [atmServiceOptions, setAtmServiceOptions] = useState([
    { label: "Debit Local Card", value: "001", selected: false },
    { label: "Deposit Visa Card", value: "002", selected: false },
    { label: "Visa Prepaid Card", value: "003", selected: false },
    { label: "Deposit Credit Card", value: "004", selected: false },
  ]);

  // const [atmServiceOptions, setAtmServiceOptions] = useState({
  //   // withdraw: false,
  //   // deposit: false,
  //   // balanceCheck: false,
  //   // checkbookRequest: false,
  //   // cardReplacement: false,
  //   // miniStatement: false,

  //   debitLocalCard: false,
  //   depositVisaCard: false,
  //   visaPrepaidCard: false,
  //   depositCreditCard: false,
  // });

  const [eStatementFrequency, setEStatementFrequency] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleServiceChange = (event) => {
    const { name, checked } = event.target;
    setSelectedServices((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    if (name === "eStatement" && checked) {
      setPopupVisible(true);
    } else if (name === "eStatement" && !checked) {
      setPopupVisible(false);
    }
  };

  // const handleFrequencyChange = (event) => {
  //   setEStatementFrequency(event.target.value);
  // };
  // Function to handle start date change
//   const handleStartDateChange = (date) => {
//     setAddNewRelation((prevState) => ({
//       ...prevState,
//       P_STATE_DATE: formatDate(date.toISOString(), true), // Update start date in state
//     }));
//   };

//   // Function to handle end date change
//   const handleEndDateChange = (date) => {
//     setAddNewRelation((prevState) => ({
//       ...prevState,
//       P_END_DATE: formatDate(date.toISOString(), true), // Update end date in state
//     }));
//   };

  // const handleAtmServiceOptionsChange = (event) => {
  //   const { name, checked } = event.target;
  //   setAtmServiceOptions((prevState) => ({
  //     ...prevState,
  //     [name]: checked,
  //   }));
  // };

//   const handleAtmServiceOptionsChange = (index) => {
//     setAtmServiceOptions((prevOptions) => {
//       const updatedOptions = [...prevOptions];
//       updatedOptions[index].selected = !updatedOptions[index].selected; // Toggle selected state

//       // Update P_ATM_SERVICES_CLOB based on selection
//       const selectedServices = updatedOptions
//         .filter((option) => option.selected)
//         .map((option) => ({
//           accountNumber: "", // Set the account number as needed
//           serviceCode: option.value, // Use the service value
//         }));

//       setAddNewRelation((prevState) => ({
//         ...prevState,
//         P_ATM_SERVICES_CLOB: selectedServices, // Update the state
//       }));

//       return updatedOptions;
//     });
//   };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Select Alert Service</h3>
      <div className="grid grid-cols-6 gap-4 mb-2">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="P_SMS_ALERT"
              checked={eServiceResponse[0]?.SMS_ALERT === "Y"}
            //   onChange={handleCheckboxChange}
              className="mr-2"
            />
            SMS Alert
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="P_EMAIL_ALERT"
              checked={eServiceResponse[0]?.EMAIL_ALERT === "Y"}
            //   onChange={handleCheckboxChange}
              className="mr-2"
            />
            Email Alert
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="P_E_STATEMENT"
              checked={eServiceResponse[0]?.E_STATEMENT === "Y"}
            //   onChange={handleCheckboxChange}
              className="mr-2"
            />
            E-Statement
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="P_INTERNET_BANKING"
              checked={eServiceResponse[0]?.INTERNET_BANKING === "Y"}
            //   onChange={handleCheckboxChange}
              className="mr-2"
            />
            Internet Banking
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="P_MOBILE_BANKING"
              checked={eServiceResponse[0]?.MOBILE_BANKING === "Y"}
            //   onChange={handleCheckboxChange}
              className="mr-2"
            />
            Mobile Banking
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="P_ATM_SERVICES"
              checked={eServiceResponse[0]?.ATM_SERVICES === "Y"}
            //   onChange={handleCheckboxChange}
              className="mr-2"
            />
            ATM Services
          </label>
        </div>
      </div>

      <hr />

      {/* Show ATM Service Options in a Table */}
      <div className="grid grid-cols-2 gap-6 mt-2">
        {/* ATM Services */}
        {eServiceResponse[0]?.ATM_SERVICES === "Y" && (
          <div className="border border-gray-300 p-4">
            <h4 className="text-md font-bold mb-2">Select ATM Services</h4>
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Service</th>
                  <th className="border-b px-4 py-2 text-left">Select</th>
                </tr>
              </thead>
              <tbody>
                {atmServiceOptions.map((option, index) => (
                  <tr key={option.value}>
                    <td className="border-b px-4 py-2">
                      {option.label.toUpperCase()}
                    </td>
                    <td className="border-b px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        // checked={option.selected}
                        // onChange={() => handleAtmServiceOptionsChange(index)}
                        className="mx-auto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* E-Statement Settings */}
        {eServiceResponse[0]?.E_STATEMENT === "Y" && (
          <div className="border border-gray-300 p-4">
            <h4 className="text-md font-bold mb-2">E-Statement Settings</h4>
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Service</th>
                  <th className="border-b px-4 py-2 text-left">Select</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b px-4 py-2 text-left">Frequency</td>
                  <td className="border-b px-4 py-2">
                    <Group direction="column" spacing="xs">
                      {frequencyOptions.map((option) => (
                        <Radio
                          key={option.value}
                          type="radio"
                          label={option.label}
                          value={option.value}
                          checked={
                            eServiceResponse.P_SERVICE_CODE === option.value
                          }
                          onChange={handleFrequencyChange}
                        />
                      ))}
                    </Group>
                  </td>
                </tr>
                <tr>
                  <td className="border-b px-4 py-2 text-left">Start Date</td>
                  <td className="border-b px-4 py-2">
                    <DatePicker
                      // selected={eServiceResponse.P_STATE_DATE}
                    //   selected={
                    //     eServiceResponse.P_STATE_DATE
                    //       ? new Date(eServiceResponse.P_STATE_DATE)
                    //       : null
                    //   }
                    //   onChange={handleStartDateChange}
                      className="border border-gray-300 p-2 rounded-md"
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border-b px-4 py-2 text-left">End Date</td>
                  <td className="border-b px-4 py-2">
                    <DatePicker
                    //   selected={
                    //     eServiceResponse.P_END_DATE
                    //       ? new Date(eServiceResponse.P_END_DATE)
                    //       : null
                    //   }
                    //   // selected={eServiceResponse.P_END_DATE}
                    //   onChange={handleEndDateChange}
                      className="border border-gray-300 p-2 rounded-md"
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default E_services;
