import React, { useState, useEffect } from "react";
import Label from "../../../../../components/others/Label/Label";
import axios from "axios";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "./comp/InputField";
import ListOfValue from "./comp/ListOfValue";
import Phone_number from "./comp/Phone_number";
import { Modal, Button } from "@mantine/core";
import { formatDate } from "../helpers/date_formater";
import DatePicker from "react-datepicker";
const host = window.location.host;

function Next_Kin_tab({
  nextOfKingData,
  tableDataNok,
  handleClearTable,
  handleChangeNextOfKin,
  handleSubmitNextOfKin,

  modalOpenedNok,
  nextofkinmodal,
  nextofkinclosemodal,

  handleEditNok,
  handleDeleteNok,
  editMode,
}) {
  const [relationship, setRelationship] = useState("");
  const [iDType, setIDType] = useState("");

  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  ////// // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const getCountry = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "HRD",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          //  console.log("getCountry :", response.data);
          setIDType(response.data);
        });
    };

    getCountry();
  }, []);

  useEffect(() => {
    // Relationship
    const getRelationships = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "RRE",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("title", JSON.stringify(response.data));
          setRelationship(response.data);
        });
    };
    getRelationships();
  }, []);

  return (
    <div className="bg-white">
      <div className="overflow-x-auto mt-2 relative">
        <table
          className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-600 dark:text-gray-300"
          style={{ zoom: "0.90" }}
        >
          <thead className="bg-blue-500 dark:bg-blue-900 text-white text-xs uppercase font-medium">
            <tr className="">
              <th className="px-4 py-1 border text-white">Next of Kin Name</th>
              <th className="px-4 py-1 border text-white">
                Next of Kin ID Type
              </th>
              <th className="px-4 py-1 border text-white">
                Next of Kin ID Number
              </th>
              <th className="px-4 py-1 border text-white">
                Next of Kin Phone Number
              </th>
              <th className="px-4 py-1 border text-white">
                Next of Kin Date Of Birth
              </th>

              <th className="px-4 py-1 border text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableDataNok?.length > 0 ? (
              tableDataNok.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-1 border">{data.NEXT_OF_KIN}</td>
                  <td className="px-4 py-1 border">
                    {data.NEXT_OF_KIN_ID_TYPE}
                  </td>
                  <td className="px-4 py-1 border text-center">
                    {data.NEXT_OF_KIN_ID_NO}
                  </td>
                  <td className="px-4 py-1 border text-center">
                    {data.NEXT_OF_KIN_PHONE}
                  </td>
                  <td className="px-4 py-1 border">
                    {formatDate(data.NEXT_OF_KIN_DOB)}
                  </td>
                  <td className="px-4 py-1 border space-x-2">
                    <div className=" flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditNok(index)}
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNok(index)}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Button to open modal */}
        {/* <div className="mt-4 flex justify-end">
          <Button color="green" onClick={() => setModalOpened(true)}>
            Add Next of Kin
          </Button>


          modalOpenedNok
nextofkinmodal
nextofkinclosemodal
        </div> */}

        <div className="flex justify-end mt-4">
          <button
            onClick={nextofkinmodal}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Add Next of Kin
          </button>
        </div>

        {/* Modal component */}
        <Modal
          opened={modalOpenedNok}
          onClose={nextofkinclosemodal}
          title="Add Next of Kin"
          size="40%"
        >
          <div className="flex justify-center">
            {/* Modal content goes here */}
            <form onSubmit={handleSubmitNextOfKin}>
              {/* <div className="flex items-center justify-center space-x-20"> */}
              {/* Full Name */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3 align-text-right">
                    <Label label="Full Name" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px] ">
                    <InputField
                      inputWidth="300px"
                      name="p_next_of_kin"
                      value={nextOfKingData.p_next_of_kin}
                      onChange={(e) =>
                        handleChangeNextOfKin("p_next_of_kin", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Relation Type */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label
                      label="Relationship"
                      required={true}
                      fontSize="85%"
                    />
                  </div>
                  <div className="md:w-2/3 ">
                    <ListOfValue
                      data={relationship}
                      // inputWidth="100%"
                      inputWidth="300px"
                      value={nextOfKingData.p_next_of_kin_relationship}
                      onChange={(value) =>
                        handleChangeNextOfKin(
                          "p_next_of_kin_relationship",
                          value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* Second Tab */}
              {/* <div className="flex items-center justify-center space-x-20 -mt-3"> */}
              {/* ID Type */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label label="ID Type" required={true} fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 ">
                    <ListOfValue
                      data={iDType}
                      inputWidth="300px"
                      value={nextOfKingData.p_next_of_kin_id_type}
                      onChange={(value) =>
                        handleChangeNextOfKin("p_next_of_kin_id_type", value)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* ID Number */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label label="ID Number" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px] ">
                    <InputField
                      inputWidth="300px"
                      name="p_next_of_kin_id_no"
                      value={nextOfKingData.p_next_of_kin_id_no}
                      onChange={(e) =>
                        handleChangeNextOfKin(
                          "p_next_of_kin_id_no",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* Third Tab */}
              {/* <div className="flex items-center justify-center space-x-20 -mt-3"> */}
              {/* Expiry Date */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label label="Expiry Date" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:ml-[30px] ">
                    <DatePicker
                      selected={
                        nextOfKingData.p_next_of_kin_id_expdate
                          ? new Date(nextOfKingData.p_next_of_kin_id_expdate)
                          : null
                      }
                      onChange={(date) =>
                        handleChangeNextOfKin(
                          "p_next_of_kin_id_expdate",
                          date ? date.toISOString().split("T")[0] : null // Format the date to 'YYYY-MM-DD' or set null if no date is selected
                        )
                      }
                      className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                    />
                    {/* <InputField
                      inputWidth="300px"
                      type={"date"}
                      name="p_next_of_kin_id_expdate"
                      value={nextOfKingData.p_next_of_kin_id_expdate}
                      onChange={(e) =>
                        handleChangeNextOfKin(
                          "p_next_of_kin_id_expdate",
                          e.target.value
                        )
                      }
                    /> */}
                  </div>
                </div>
              </div>

              {/* Relationship */}
              <div class="w-full max-w-xl mt-2 ">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label label="Address" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px] ">
                    <InputField
                      inputWidth="300px"
                      type={"text"}
                      name="p_next_of_kin_address"
                      value={nextOfKingData.p_next_of_kin_address}
                      onChange={(e) =>
                        handleChangeNextOfKin(
                          "p_next_of_kin_address",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* Fourth Tab */}
              {/* <div className="flex items-center justify-center space-x-20 -mt-3"> */}
              {/* Date Of Birth */}
              <div class="w-full max-w-xl mt-2 ">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label
                      label="Date of Bith"
                      required={true}
                      fontSize="85%"
                    />
                  </div>
                  <div class="md:w-2/3 md:ml-[30px] ">
                    <DatePicker
                      selected={
                        nextOfKingData.p_next_of_kin_dob
                          ? new Date(nextOfKingData.p_next_of_kin_dob)
                          : null
                      }
                      onChange={(date) =>
                        handleChangeNextOfKin(
                          "p_next_of_kin_dob",
                          date ? date.toISOString().split("T")[0] : null // Format the date to 'YYYY-MM-DD' or set null if no date is selected
                        )
                      }
                      className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                    />
                    {/* <InputField
                      inputWidth="300px"
                      type={"date"}
                      name="p_next_of_kin_dob"
                      value={nextOfKingData.p_next_of_kin_dob}
                      onChange={(e) =>
                        handleChangeNextOfKin(
                          "p_next_of_kin_dob",
                          e.target.value
                        )
                      }
                    /> */}
                  </div>
                </div>
              </div>

              {/* % Shared */}
              <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label
                      label="Percentage Shared"
                      required={true}
                      fontSize="85%"
                    />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px] ">
                    <InputField
                      inputWidth="300px"
                      name="P_NOK_Percent_share"
                      value={nextOfKingData.p_next_of_kin_percentshare}
                      onChange={(e) => {
                        let inputValue = e.target.value.replace("%", "");
                        let numericValue = parseFloat(inputValue);

                        if (
                          isNaN(numericValue) ||
                          numericValue < 0 ||
                          numericValue > 100
                        ) {
                          // Handle invalid input (not a number or out of range)
                          return;
                        }

                        handleChangeNextOfKin(
                          "p_next_of_kin_percentshare",
                          numericValue
                        );
                      }}
                      className="text-right"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/*  */}
              {/* Date Of Birth */}
              <div class="w-full max-w-xl mt-2 ">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label
                      label="Phone Number"
                      required={true}
                      fontSize="85%"
                    />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px] ">
                    <Phone_number
                      marginBottom={"8px"}
                      name="p_next_of_kin_phone"
                      value={nextOfKingData.p_next_of_kin_phone}
                      onChange={(value) =>
                        handleChangeNextOfKin("p_next_of_kin_phone", value)
                      }
                      inputWidth={"84%"}
                    />
                  </div>
                </div>
              </div>

              {/* % Shared */}
              <div class="w-full max-w-xl mt-2 invisible">
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                    <Label
                      label="Percentage Shared"
                      required={true}
                      fontSize="85%"
                    />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px] ">
                    <InputField
                      inputWidth="300px"
                      textAlign={"right"}
                      name="p_next_of_kin_percentshare"
                      value={nextOfKingData.p_next_of_kin_percentshare}
                      onChange={(e) =>
                        handleChangeNextOfKin(
                          "p_next_of_kin_percentshare",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
                >
                  {editMode ? "Update" : "Add"} Next of Kin
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Next_Kin_tab;
