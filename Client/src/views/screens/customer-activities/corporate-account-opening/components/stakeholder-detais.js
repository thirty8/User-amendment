import React, { useEffect, useState } from "react";
import { Modal, TextInput, Loader, Button, Select, Radio } from "@mantine/core";
import Swal from "sweetalert2";
import axios from "axios";
// import NewUserFormModal from "./NewUserFormModal";
// import DataTableModal from "./DataTableModal";
import { API_SERVER } from "../../../../../config/constant";
import DataTableModal from "./DataTableModal";
import NewUserFormModal from "./NewUserFormModal";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import "../../styles/modal/customer_modal.css";
import ListOfValue from "./comp/ListOfValue";
import AccordionUsable from "./Accordion";
import InputField from "./comp/InputField";
import Label from "../../../../../components/others/Label/Label";
import RoleSelection from "./comp/RoleSelection";
import { formatDate } from "../helpers/date_formater";

const Stakeholderdetails = ({
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
  handleRowClick,
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

  stakeholder,
  showNewUserFormStakeholders,
  showNewUserFormFCloseStakeholder,
  handleFormSubmitStakeholder,

  selectedStakeholderType,
  handleStakeholderTypeChange,

  activeState,
  selectedRole,
  setSelectedRole,
  handleActiveStateChange,

  add_new_relation,
  handleInputChange,
  handleCheckboxChange,
  insertedData,
  handleSubmitNewRelation,
  setAddNewRelation,

  roles,
  handleCheckboxChangeStakeholder,
  handleDirectorStatusChange,
  handleInputChangeStakeholder,
  handleSubmitStakeholder,

  selectedRoles,
  setSelectedRoles,
  directorStatus,
  setDirectorStatus,
  inputValues,
  setInputValues,
  loadingStakeholder,
  setLoadingStakeholder,
  errorStakeholder,
  setErrorStakeholder,
  success,
  setSuccess,
  relationNo,
  setRelationNo,
  custNo,
  setCustNo,
}) => {
  const clearForm = () => {
    setFormData1({ nationalID: "", email: "", mobileNumber: "" });
  };

  console.log("saved data", activeState);

  // const roles = [
  //   { name: "Director", label: "Director" },
  //   { name: "SoleProprietor", label: "Sole Proprietor" },
  //   { name: "Partner", label: "Partner" },
  //   { name: "Shareholder", label: "Shareholder" },
  //   { name: "Others", label: "Others" },
  // ];

  return (
    <div>
      {/* <div
        //   className="mt-4 mb-4"
        className="overflow-x-auto shadow-lg sm:rounded-lg mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >
        
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-blue-500 dark:bg-blue-900 text-white text-xs uppercase font-medium">
            <tr className="">
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                No.&nbsp;Of&nbsp;Signatory
              </th>
              <th
                className="p-1 font-bold text-sm text-white"
                style={{ border: "1px solid white" }}
              >
                Signatory ID
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
            {relationData?.filter((i) => i?.source == "Stakeholderdetails")
              .length > 0 ? (
              relationData
                ?.filter((i) => i?.source == "Stakeholderdetails")
                .map((data, index) => (
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
                        data.RELATION_NO}
                    </td>
                    <td>
                      {data.P_fname ?? data.first_name ?? data.FIRST_NAME}
                    </td>
                    <td>
                      {data.P_mname == "null"
                        ? ""
                        : data.P_mname ?? data.surname}
                    </td>
                    <td>
                      {data.P_sname ??
                        data.last_name ??
                        data.LAST_NAME ??
                        data.SURNAME}
                    </td>
                    <td className="text-center">
                      {data.P_gender ?? data.gender === "M"
                        ? "M - MALE"
                        : "F - FEMALE" ?? data.GENDER === "M"
                        ? "M - MALE"
                        : "F - FEMALE"}
                    </td>
                    <td>
                      {data.P_dob ?? data.date_of_birth ?? data.DATE_OF_BIRTH}
                    </td>
                    <td>{data.P_Mobile_comm_no ?? data.MOBILE1}</td>
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
                            handleRowClick(index);
                          }}
                          className={` ${
                            data?.isSelected ? "text-gray-500" : "text-blue-500"
                          } w-5 h-5`}
                        />
                      </div>
                      <div className="cursor-pointer border p-1 shadow-md rounded">
                        <MdDelete
                          onClick={() => handleDelete(index)}
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
      </div> */}

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
                          // handleRowSelect(data.RELATION_NO);
                        }}
                        className={` ${
                          data?.isSelected ? "text-gray-500" : "text-blue-500"
                        } w-5 h-5`}
                      />
                    </div>
                    <div className="cursor-pointer border p-1 shadow-md rounded">
                      <MdDelete
                        onClick={() => handleDelete(data.RELATION_NO)}
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
        <div className="flex justify-end">
          <button
            onClick={toggleModal}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Add Stakeholder
          </button>
        </div>

        {/* Modal Overlay */}
        {isOpenRelationDetails && (
          <div className="modal-overlay" onClick={toggleModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              {/* <h3 className="mb-5 font-semibold">Stakeholder</h3> */}
              <div className="text-lg font-semibold mb-4 text-white text-center uppercase bg-blue-700">
                Validate Stakeholder
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

                <TextInput
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
                />

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
                    onClick={handleFormSubmitStakeholder}
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

              <Select
                label="Stakeholder type"
                data={[
                  { value: "001", label: "001 - Director" },
                  { value: "002", label: "002 - Sole Proprietor" },
                  { value: "003", label: "003 - Partner" },
                  { value: "004", label: "004 - Shareholder" },
                  { value: "005", label: "005 - Other" },
                ]}
                onChange={(option) => handleStakeholderTypeChange(option)}
                // value={
                //   apiData?.userData?.[0]?.gender ?? apiData?.userData?.GENDER
                // }
                // disabled
                size="sm"
                mt="md"
              />

              {/* <label label="Status" className="mr-4 mt-2">Status</label> Add margin-right to create space between label and radios */}
              {selectedStakeholderType === "001" && (
                <Radio.Group
                  label="Status"
                  value={activeState}
                  onChange={handleActiveStateChange}
                  className="flex items-center mt-4" // Flex container for the radio buttons
                >
                  <Radio value="active" label="Active" className="" />{" "}
                  {/* Add margin-right to separate radio buttons */}
                  <Radio value="non-active" label="Non-Active" />
                </Radio.Group>
              )}

              {activeState === "active" && (
                <div className="-mb-4">
                  <Select
                    label="Role"
                    required={true}
                    inputWidth="300px"
                    data={[
                      { value: "001", label: "001 - Manager" },
                      { value: "002", label: "002 - Team Lead" },
                      { value: "003", label: "003 - Developer" },
                      { value: "004", label: "004 - Analyst" },
                      { value: "005", label: "005 - Other" },
                    ]}
                    // onChange={(option) => setSelectedRole(option.value)}
                  />
                </div>
              )}

              {selectedStakeholderType === "004" && (
                <div className=" mt-5 mb-1">
                  <TextInput
                    label={"Percentage of Shares"}
                    inputWidth="300px"
                    required={true}
                  />
                </div>
              )}

              {selectedStakeholderType === "005" && (
                <div className="mt-5 mb-1">
                  <TextInput
                    label={"Other Stakeholder Type"}
                    inputWidth="300px"
                    required={true}
                  />
                </div>
              )}

              {/* <TextInput
                label="Limit on signatory"
                // value={
                //   apiData?.userData?.[0]?.dormicile_country ??
                //   apiData?.userData?.DORMICILE_COUNTRY
                // }
                size="sm"
                mt="md"
              /> */}
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
                // onClick={() => handleProceed("Stakeholderdetails")}
                onClick={handleProceed}
                variant="outline"
                type="submit"
                color="blue"
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>

      {stakeholder && (
        <Modal
          opened={showNewUserFormStakeholders}
          // onClose={showNewUserFormFCloseStakeholder}
          withCloseButton={false}
          // title="STAKEHOLDER DETAILS"
          trapFocus
          size="75%"
          closeOnClickOutside={false}
          overlayOpacity={0.6}
          overlayColor="white"
          style={{
            zoom: "75%",
          }}
        >
          <div className="flex bg-blue-900 items-center justify-between mb-2 rounded-md">
            <div className=" text-white font-bold p-2 px-2 rounded-md uppercase">
            STAKEHOLDER DETAILS
            </div>
            <div
              className=" text-white font-bold p-2 px-2 rounded-md uppercase cursor-pointer"
              onClick={showNewUserFormFCloseStakeholder}
            >
              X
            </div>
          </div>
          <RoleSelection
            roles={roles}
            add_new_relation={add_new_relation}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            // roles={roles}
            handleCheckboxChangeStakeholder={handleCheckboxChangeStakeholder}
            handleDirectorStatusChange={handleDirectorStatusChange}
            handleInputChangeStakeholder={handleInputChangeStakeholder}
            handleSubmitStakeholder={handleSubmitStakeholder}
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
            directorStatus={directorStatus}
            setDirectorStatus={setDirectorStatus}
            inputValues={inputValues}
            setInputValues={setInputValues}
            loadingStakeholder={loadingStakeholder}
            setLoadingStakeholder={setLoadingStakeholder}
            errorStakeholder={errorStakeholder}
            setErrorStakeholder={setErrorStakeholder}
            success={success}
            setSuccess={setSuccess}
            relationNo={relationNo}
            setRelationNo={setRelationNo}
            custNo={custNo}
            setCustNo={setCustNo}
          />

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
            source={"Stakeholderdetails"}
            add_new_relation={add_new_relation}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmitNewRelation={handleSubmitNewRelation}
            setAddNewRelation={setAddNewRelation}
          />
        </Modal>
      )}
    </div>
  );
};

export default Stakeholderdetails;
