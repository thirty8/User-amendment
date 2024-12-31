import React, { useEffect, useState } from "react";
import { Modal, TextInput, Loader, Button, Select } from "@mantine/core";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import axios from "axios";
// import NewUserFormModal from "./NewUserFormModal";
// import DataTableModal from "./DataTableModal";
import { API_SERVER } from "../../../../../config/constant";
import AccordionUsable from "./Accordion";
import DataTableModal from "../../corporate-account-opening/components/DataTableModal";
import NewUserFormModal from "../../corporate-account-opening/components/NewUserFormModal";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import "../../styles/modal/customer_modal.css";
import { formatDate } from "../helpers/date_formater";

const Relationdetails = ({
  handleBlurValidation,
  dynamicNumber,
  userDataValidation,
  isValid,
  typeOfAccount,
  setDynamicNumber,
  isLoading,
  userExists,
  refinedData,
  setRefinedData,
  handleSubmitValidation,
  setTableDataAddress,
  usedAddressTypes,
  setUsedAddressTypes,
  tableDataAddress,
  clearError,
  setErrorTest,
  displayValidData,
  closeModal,
  isModalOpen,
  handleCheckValueClick,
  message,
  errors,
  validateInput,
  handleNumRowsChange,
  effective,
  onclickOnrow,
  handleEdit,
  handleDelete,
  generateRandomNumberString,
  hideRadioButtons,
  selectedOptions,
  storedFormData,
  accountTypes,
  setAccountTypes,
  selectedOptionJoint,
  tableData,
  handleSubmit,
  formData,
  setFormData,
  handleChange,
  customerDataTable,
  customerData,
  response,
  error,
  // handleRowClick,
  // relationData,
  // setRelationData

  handleProceed,
  onCloseForRelationValidationForm,
  handleFormSubmit,
  setFormData1,
  formData1,
  loading,
  saveDataNewForm,
  showApiDataModal,
  showNewUserForm,
  showNewUserFormFClose,
  showNewUserFormF,
  apiData,
  toggleModal,
  isOpenRelationDetails,
  show,
  relationData,

  toggleModalClose,

  add_new_relation,
  handleInputChange,
  handleCheckboxChange,
  handleSubmitNewRelation,
  setAddNewRelation,

  insertedData,
  handleRowSelect,
  isButtonDisabled,
}) => {
  // const [formData1, setFormData1] = useState({
  //   nationalID: "",
  //   email: "",
  //   mobileNumber: "",
  // });

  const [showDataTableModal, setShowDataTableModal] = useState(false);

  const [userData, setUserData] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const [htmlTableData, setHtmlTableData] = useState([]); // State to hold HTML table data

  // const [relationData, setRelationData] = useState([]);

  const clearForm = () => {
    setFormData1({ nationalID: "", email: "", mobileNumber: "" });
  };

  console.log("saved data", saveDataNewForm);

  // const handleAddDataToHtmlTable = (userData) => {
  //   setHtmlTableData((prevData) => [...prevData, ...userData]); // Append new data to existing data
  //   // setRelationData((prevData) => [...prevData, ...userData])
  //   setShowApiDataModal(false); // Close the modal after adding data
  // };

  // useEffect(() => {
  //   setRelationData(htmlTableData);
  // }, [htmlTableData]);

  // console.log(
  //   "relationData in relation details",
  //   apiData,
  //   htmlTableData,
  //   relationData
  // );

  return (
    <div>
      <div
        //   className="mt-4 mb-4"
        className="overflow-x-auto shadow-lg sm:rounded-lg mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >
        {/* {relationData?.length > 0 ? ( */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-blue-500 dark:bg-blue-900 text-white text-xs uppercase font-medium">
            <tr className="">
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                No.&nbsp;Of&nbsp;Relation
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                Relation ID
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                First&nbsp;Name
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                Middle&nbsp;Name
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                Surname
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                Gender
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                Date&nbsp;of&nbsp;Birth
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                Phone&nbsp;Number
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {insertedData?.length > 0 ? (
              insertedData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-sky-300"}
                  // onClick={() => handleRowClick(index)}
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">
                    {data.Relation_no ??
                      data.randomNumberString ??
                      data.relation_no ??
                      data.RELATION_NO ??
                      data.rel_no_v}
                    {/* {data.Relation_no ??
                      data.randomNumberString ??
                      data.relation_no ??
                      data.RELATION_NO} */}
                  </td>
                  <td>
                    {data.fname_v ??
                      data.first_name ??
                      data.sname_v ??
                      data.FIRST_NAME}
                  </td>
                  <td>
                    {data.P_mname == "null"
                      ? ""
                      : data.mname_v ?? data.LAST_NAME}
                  </td>
                  <td>
                    {data.P_sname ??
                      data.last_name ??
                      data.SURNAME ??
                      data.sname_v}
                  </td>
                  <td className="text-center">
                    {data.P_gender ?? data.gender_v === "M"
                      ? "M - MALE"
                      : "F - FEMALE" ?? data.GENDER === "M"
                      ? "M - MALE"
                      : "F - FEMALE"}
                  </td>
                  <td>
                    {data.P_dob ??
                      formatDate(data.date_of_birth, false) ??
                      formatDate(data.dob_v, false) ??
                      formatDate(data.DATE_OF_BIRTH, false)}
                  </td>
                  <td>
                    {data.P_Mobile_comm_no ??
                      data.MOBILE1 ??
                      data.Mobile_comm_no_v}
                  </td>
                  <td className="flex items-center justify-center space-x-3 text-center">
                    <div
                      className={`${
                        data?.isSelected
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }  border p-1 shadow-md rounded`}
                    >
                      <BiEdit
                        onClick={() => {
                          if (data?.isSelected) {
                            return;
                          }
                          // handleRowClick(index);
                          handleRowSelect(data.RELATION_NO);
                        }}
                        className={` ${
                          data?.isSelected ? "text-gray-500" : "text-blue-500"
                        } w-5 h-5`}
                      />
                    </div>
                    <div className="cursor-pointer border p-1 shadow-md rounded">
                      <MdDelete
                        onClick={() =>
                          handleDelete(
                            data.Relation_no ??
                              data.randomNumberString ??
                              data.relation_no ??
                              data.RELATION_NO ??
                              data.rel_no_v,
                            data.cust_no_v ?? data.CUSTOMER_NUMBER
                          )
                        }
                        className="cursor-pointer text-red-500 w-5 h-5"
                      />
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
      </div>

      <div>
        {/* Button to trigger the modal */}
        {/* <button onClick={toggleModal} className="open-modal-btn">
          Open Modal
        </button> */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (insertedData?.length == 1 && typeOfAccount == "ID") {
                return;
              }
              toggleModal();
            }}
            disabled={isButtonDisabled}
            // onClick={}
            className={`${
              (insertedData?.length == 1 && typeOfAccount == "ID") ||
              isButtonDisabled
                ? "bg-blue-400 text-gray-300 hover:cursor-not-allowed"
                : " bg-blue-600 text-white hover:bg-blue-700"
            } px-4 py-2  font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"`}
          >
            Add Relationship Detail
          </button>
        </div>

        {/* Modal Overlay */}
        {isOpenRelationDetails && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <div className="text-lg font-semibold mb-4 text-white text-center uppercase bg-blue-700">
                Validate customer
              </div>
              <span className="close-modal" onClick={toggleModal}>
                &times;
              </span>
              <div>
                <TextInput
                  size="xs"
                  label="First Name"
                  placeholder="First Name"
                  value={formData1.firstName}
                  onChange={(event) =>
                    setFormData1({
                      ...formData1,
                      firstName: event.target.value,
                    })
                  }
                />
                <TextInput
                  size="xs"
                  label="Last Name"
                  placeholder="Last Name"
                  value={formData1.lastName}
                  onChange={(event) =>
                    setFormData1({
                      ...formData1,
                      lastName: event.target.value,
                    })
                  }
                />
                <label className="text-sm">Date of Birth</label> <br />
                <DatePicker
                  label="Date of Birth"
                  id="dob"
                  selected={
                    formData1.dateOfBirth
                      ? new Date(formData1.dateOfBirth)
                      : null
                  }
                  // onChange={handleStartDateChange}
                  onChange={(date) => {
                    // Format the date and get the minor status
                    const formattedDate = formatDate(date.toISOString(), false);

                    // Check if the selected date indicates a minor or not
                    const isMinor =
                      new Date(date) >
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() - 18)
                      );

                    // Update state based on the selected date
                    setFormData1({
                      ...formData1,
                      dateOfBirth: formattedDate,
                      minor_v: isMinor ? "Y" : "N", // Automatically select Yes for minors
                    });
                  }}
                  className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                  dateFormat="dd-MM-yyyy"
                  placeholderText="dd-mm-yyyy"
                />
                {/* <TextInput
                  size="xs"
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  value={formData1.dateOfBirth}
                  onChange={(event) =>
                    setFormData1({
                      ...formData1,
                      dateOfBirth: event.target.value,
                    })
                  }
                /> */}
                <TextInput
                  size="xs"
                  label="National ID"
                  placeholder="Enter National ID"
                  value={formData1.nationalID}
                  onChange={(event) =>
                    setFormData1({
                      ...formData1,
                      nationalID: event.target.value,
                    })
                  }
                  error={!formData1.nationalID}
                />
                <TextInput
                  size="xs"
                  label="Mobile Number 1"
                  placeholder="Enter Mobile Number"
                  value={formData1.mobileNumber}
                  onChange={(event) =>
                    setFormData1({
                      ...formData1,
                      mobileNumber: event.target.value,
                    })
                  }
                />
                <TextInput
                  size="xs"
                  label="Mobile Number 2"
                  placeholder="Enter Mobile Number"
                  value={formData1.mobileNumber2}
                  onChange={(event) =>
                    setFormData1({
                      ...formData1,
                      mobileNumber2: event.target.value,
                    })
                  }
                />
                <TextInput
                  size="xs"
                  label="Email"
                  placeholder="Enter Email Address"
                  value={formData1.email}
                  onChange={(event) =>
                    setFormData1({ ...formData1, email: event.target.value })
                  }
                />
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" color="red" onClick={clearForm}>
                    Clear
                  </Button>
                  <Button
                    onClick={handleFormSubmit}
                    variant="outline"
                    type="submit"
                    color="blue"
                  >
                    Proceed...
                  </Button>
                </div>
              </div>

              {loading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Loader size={32} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div
        // className={`fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg transform transition-transform duration-500 translate-x-0`}
        className={`fixed top-10 right-0 w-1/3 h-[90%] bg-white shadow-lg transform transition-transform duration-500 ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 100000000 }}
      >
        <div className="flex flex-col h-full">
          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-lg font-semibold mb-4 text-white text-center uppercase bg-blue-700">
              This Customer Exist
            </div>
            <form>
              <TextInput
                label="First Name"
                value={
                  apiData?.userData?.[0]?.first_name ??
                  apiData?.userData?.FIRST_NAME
                }
                disabled
                size="sm"
                mt="md"
              />

              <TextInput
                label="Last Name"
                value={
                  apiData?.userData?.[0]?.last_name ??
                  apiData?.userData?.LAST_NAME
                }
                disabled
                size="sm"
                mt="md"
              />

              <TextInput
                label="Date of Birth"
                value={
                  apiData?.userData?.[0]?.date_of_birth ??
                  apiData?.userData?.DATE_OF_BIRTH
                }
                disabled
                size="sm"
                mt="md"
              />

              <TextInput
                label="National ID"
                value={apiData?.userData?.[0]?.nin ?? apiData?.userData?.NIN}
                disabled
                size="sm"
                mt="md"
              />

              <TextInput
                label="Mobile Number"
                value={
                  apiData?.userData?.[0]?.mobile1 ?? apiData?.userData?.MOBILE1
                }
                disabled
                size="sm"
                mt="md"
              />

              <TextInput
                label="Email Address"
                value={
                  apiData?.userData?.[0]?.email_address ??
                  apiData?.userData?.EMAIL_ADDRESS
                }
                disabled
                size="sm"
                mt="md"
              />

              <Select
                label="Gender"
                data={[
                  { value: "M", label: "Male" },
                  { value: "F", label: "Female" },
                  { value: "O", label: "Other" },
                ]}
                value={
                  apiData?.userData?.[0]?.gender ?? apiData?.userData?.GENDER
                }
                disabled
                size="sm"
                mt="md"
              />

              <TextInput
                label="Address"
                value={apiData?.userData?.[0]?.address || ""}
                disabled
                size="sm"
                mt="md"
              />

              <TextInput
                label="Country"
                value={
                  apiData?.userData?.[0]?.dormicile_country ??
                  apiData?.userData?.DORMICILE_COUNTRY
                }
                disabled
                size="sm"
                mt="md"
              />
            </form>
          </div>

          {/* Modal Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                color="red"
                onClick={onCloseForRelationValidationForm}
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceed}
                variant="outline"
                type="submit"
                color="blue"
              >
                Use This details...
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* {showDataTableModal && (
        <DataTableModal
          isOpen={showDataTableModal}
          onClose={() => setShowDataTableModal(false)}
          userData={userData}
        />
      )} */}

      {showNewUserForm && (
        <Modal
          opened={showNewUserFormF}
          // onClose={showNewUserFormFClose}
          // title="Relation Details"
          withCloseButton={false}
          trapFocus
          size="75%"
          closeOnClickOutside={false}
          overlayOpacity={0.6}
          overlayColor="black"
          classNames={{
            header: "lightblue",
          }}
          style={{
            zoom: "75%",
            // backgroundColor: 'lightblue',
          }}
        >
          <div className="flex bg-blue-900 items-center justify-between mb-2 rounded-md">
            <div className=" text-white font-bold p-2 px-2 rounded-md uppercase">
              Relationship Details
            </div>
            <div
              className=" text-white font-bold p-2 px-2 rounded-md uppercase cursor-pointer"
              onClick={showNewUserFormFClose}
            >
              X
            </div>
          </div>
          <AccordionUsable
            selectedOptionJoint={selectedOptionJoint}
            tableData={tableData}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            response={response}
            error={error}
            customerData={customerData}
            customerDataTable={customerDataTable}
            storedFormData={storedFormData}
            selectedOptions={selectedOptions}
            hideRadioButtons={hideRadioButtons}
            // randomNumberString={randomNumberString}
            // generateRandomNumberString={generateRandomNumberString}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            onclickOnrow={onclickOnrow}
            effective={effective}
            validateInput={validateInput}
            errors={errors}
            message={message}
            handleCheckValueClick={handleCheckValueClick}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            displayValidData={displayValidData}
            setErrorTest={setErrorTest}
            clearError={clearError}
            setTableDataAddress={setTableDataAddress}
            tableDataAddress={tableDataAddress}
            usedAddressTypes={usedAddressTypes}
            setUsedAddressTypes={setUsedAddressTypes}
            handleBlurValidation={handleBlurValidation}
            handleSubmitValidation={handleSubmitValidation}
            dynamicNumber={dynamicNumber}
            setDynamicNumber={setDynamicNumber}
            isLoading={isLoading}
            userExists={userExists}
            userDataValidation={userDataValidation}
            isValid={isValid}
            typeOfAccount={typeOfAccount}
            refinedData={refinedData}
            setRefinedData={setRefinedData}
            saveDataNewForm={saveDataNewForm}
            showNewUserFormFClose={showNewUserFormFClose}
            toggleModalClose={toggleModalClose}
            add_new_relation={add_new_relation}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmitNewRelation={handleSubmitNewRelation}
            setAddNewRelation={setAddNewRelation}
            handleRowSelect={handleRowSelect}
          />
        </Modal>
      )}
    </div>
  );
};

export default Relationdetails;
