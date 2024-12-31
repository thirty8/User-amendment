import React, { useState, useEffect } from "react";
import Label from "../../../../../components/others/Label/Label";
import { API_SERVER } from "../../../../../config/constant";
import { Modal } from "@mantine/core";
import { FcPlus } from "react-icons/fc";
import axios from "axios";
import ListOfValue from "./comp/ListOfValue";
import InputField from "./comp/InputField";
import DocumentCapture from "../../../../../components/DocumentCapture";
import ImageCapturing from "../../../../../components/ImageCapturing";
import Fcapture from "../../../../../components/Fcapture";
import ImageSignatureCapture from "../../../../../components/ImageSignatureCapture";
import ImageSignatureView from "../../../../../components/ImageSignatureView";
import Signatorydetails from "./signatory-details";
import { Checkbox } from "@mantine/core";

const Mandate = ({
  acMandate,
  handleAccountMandate,
  arrayDocs,
  relationData,
  ImageVerification,
  randomNumberString,
  dataD,
  custType,
  storedFormData,
  handleChangeDocs,

  selectedOptionJoint,
  tableData,
  handleSubmit,
  // formData1,
  setFormData,
  handleChange,
  response,
  error,
  customerData,
  customerDataTable,
  // storedFormData={storedFormData}
  selectedOptions,
  hideRadioButtons,
  // randomNumberString={randomNumberString}
  // generateRandomNumberString={generateRandomNumberString}
  handleEdit,
  handleDelete,
  onclickOnrow,
  effective,
  validateInput,
  errors,
  message,
  handleCheckValueClick,
  isModalOpen,
  // closeModal,
  displayValidData,
  setErrorTest,
  clearError,
  setTableDataAddress,
  tableDataAddress,
  usedAddressTypes,
  setUsedAddressTypes,
  handleBlurValidation,
  handleSubmitValidation,
  dynamicNumber,
  setDynamicNumber,
  isLoading,
  userExists,
  userDataValidation,
  isValid,
  typeOfAccount,
  refinedData,
  setRefinedData,
  // relationData={relationData}
  handleRowClick,
  // setRelationData={setRelationData}

  // saveDataFromRelatioDetails={saveDataFromRelatioDetails}
  // setSavedDataFromRelatioDetails={setSavedDataFromRelatioDetails}

  // setApiData={setApiData}
  // onClose={onClose}
  // setShow={setShow}
  // setShowNewUserForm={setShowNewUserForm}

  handleProceed,
  onCloseForRelationValidationForm,
  handleFormSubmit,
  setFormData1,
  formData1,
  loading,
  showApiDataModal,
  saveDataNewForm,
  showNewUserForm,
  showNewUserFormFClose,
  showNewUserFormF,
  apiData,
  toggleModal,
  isOpenRelationDetails,
  show,

  insertedData,

  handleChangeSelect,
  handleApprovalLimitChange,
  handleCheckboxSignatory,

  selectedValue,
  approvalLimit,
  checkboxValues,
  handleSubmitSignatory,
  userExist

}) => {
  const [accountMandate, setAccountMandate] = useState([]);
  const customTheme = JSON.parse(localStorage.getItem("theme"));
  const getTheme = JSON.parse(localStorage.getItem("theme"));
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [fingerModal, setFingerModal] = useState(false);

  const [randonNum, setRandonNum] = useState("");

  const handleDocumentInputClick = () => {
    // setModalVisible(true);
    alert("clicked!!!");
  };

  const openFingerModal = (randomNumberString) => {
    setFingerModal(true);
    setRandonNum(randomNumberString);
  };

  const closeFingerModal = () => {
    setFingerModal(false);
  };

  const openModal = (randomNumberString) => {
    setImageModal(true);
    setRandonNum(randomNumberString);
  };

  const closeModal = () => {
    setImageModal(false);
  };

  const [rows, setRows] = useState([
    // { relationNo: 123, firstName: 'John', surname: 'Doe', middleName: 'A.', signatoryLevels: 'Manager', approveLimit: '$10,000', photoSig: '', fingerprint: '' },
    // { relationNo: 456, firstName: 'Jane', surname: 'Smith', middleName: 'B.', signatoryLevels: 'Supervisor', approveLimit: '$5,000', photoSig: '', fingerprint: '' },
    // Add initial rows as needed
  ]);

  const handleCheckboxChange = (relationNo) => {
    const selectedSet = new Set(selectedRows);

    if (selectedSet.has(relationNo)) {
      selectedSet.delete(relationNo);
    } else {
      selectedSet.add(relationNo);
    }

    setSelectedRows(Array.from(selectedSet));
  };

  const addRow = () => {
    const newRow = {
      relationNo: 789,
      firstName: "",
      surname: "",
      middleName: "",
      signatoryLevels: "",
      approveLimit: "",
      photoSig: "",
      fingerprint: "",
    };

    setRows([...rows, newRow]);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = rows.slice(startIndex, endIndex);

  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",

  // const [selectedValue, setSelectedValue] = useState('');

  const selectLevel = [
    { value: "001", label: "A" },
    { value: "002", label: "B" },
    { value: "003", label: "A or B" },
    { value: "004", label: "A & B" },
  ];

  // const handleChangeSelect = (e) => {
  //   setSelectedValue(e.target.value);
  // };
  // };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    // Get Account Mandate
    const getAccountMandate = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "AMD",
          },
          { headers }
        )
        .then(function (response) {
          setAccountMandate(response.data);
        });
    };

    getAccountMandate();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // const bgColor =
  //   `url(` +
  //   window.location.origin +
  //   `/assets/images/background/` +
  //   customTheme.theme.backgroundImage +
  // `)`;

  const dataData = [];

  const handleInputChange = () => {};

  console.log("dataD::::", dataD);

  return (
    <div>
      <div className="border rounded">
        <div className="mx-5">MANDATE</div>
        <hr />
        <div className="md:flex justify-center w-full my-5">
          {/* **************************************** */}
          <div className="w-full max-w-xl">
            {/* Account Mandate */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Account Mandate" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    data={accountMandate}
                    inputWidth="100%"
                    // value={acMandate}
                    value={typeOfAccount === "SP" ? "001" : acMandate}
                    onChange={handleAccountMandate}
                    disabled={typeOfAccount === "SP"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />

        <div className="md:p-5">
          <div>SIGNATORY | IMAGE</div>
          <hr />
          <hr />
          <table
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-600 dark:text-gray-300"
            style={{ zoom: "0.90" }}
          >
            <thead className="bg-blue-500 dark:bg-blue-900 text-white text-xs uppercase font-medium">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  USER STATUS
                </th>
                <th
                  className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  SIGNATORY
                </th>
                <th
                  className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  RELATION NO
                </th>
                <th
                  className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  FIRST NAME
                </th>
                <th
                  className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  SURNAME
                </th>
                {/* <th
                  className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  MIDDLE NAME
                </th> */}
                <th
                  className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  SIGNATORY LEVELS
                </th>
                <th
                  className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  APPROVE LIMIT
                </th>
                <th
                  className="px-6 py-3 text-center text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  SIGNATURE AND IMAGE CAPTURING
                </th>
                <th
                  className="px-6 py-3 text-center text-xs leading-4 font-bold uppercase tracking-wider"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  IMAGE | SIGNATURE
                </th>
              </tr>
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              style={{ zoom: "0.70" }}
            >
              {insertedData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-300"}
                >
                  <td className="">
                    <div className="flex justify-center text-lg">
                      {data?.isUserExists ? "Exist" : "New"}
                    </div>
                  </td>
                  <td className="">
                    <div className="flex justify-center">
                      {/* <input type="checkbox" onChange={() => setSelectedSignatory(data)} /> */}
                      {/* <input
                        className="p-1"
                        type="checkbox"
                        checked={checkboxValues[data.Relation_no] === "Y"}
                        onChange={(e) =>
                          handleCheckboxSignatory(e, data.Relation_no)
                        }
                      /> */}
                      <input
                        className="p-1"
                        type="checkbox"
                        // Automatically check the checkbox if typeOfAccount is 'ID'
                        checked={
                          typeOfAccount === "SP"
                            ? true
                            : checkboxValues[data.Relation_no] === "Y"
                        }
                        onChange={(e) =>
                          handleCheckboxSignatory(e, data.Relation_no)
                        }
                        // Disable the checkbox if typeOfAccount is 'ID'
                        disabled={typeOfAccount === "SP"}
                      />
                    </div>
                  </td>
                  <td className="text-center text-lg">
                    {data.Relation_no ??
                      data.randomNumberString ??
                      data.relation_no ??
                      data.RELATION_NO ??
                      data.rel_no_v}
                  </td>
                  <td className="text-lg">
                    {data.fname_v ??
                      data.first_name ??
                      data.sname_v ??
                      data.FIRST_NAME}
                  </td>
                  <td className="text-lg">
                    {data.P_sname ??
                      data.last_name ??
                      data.SURNAME ??
                      data.sname_v}
                  </td>
                  {/* <td>{data.P_mname}</td> */}
                  <td>
                    <div className="flex justify-center">
                      {/* <label htmlFor="levelSelect">Select Level: </label> */}
                      <select
                        value={selectedValue[data.Relation_no] || ""}
                        onChange={(e) =>
                          handleChangeSelect(e, data.Relation_no)
                        }
                        disabled={typeOfAccount === 'SP' || data?.isUserExists ? true : false}
                        // className="p-2 border border-gray-600 rounded-md"
                        className={` ${
                          typeOfAccount === 'SP' || data?.isUserExists
                            ? "bg-gray-500 p-2 border border-gray-400 rounded-md cursor-not-allowed"
                            : "p-2 border border-gray-600 rounded-md"
                        } `}
                      >
                        <option value="">Select an option</option>
                        {selectLevel.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div>
                      <ListOfValue
                        data={selectLevel}
                        inputWidth="100%"
                        value={acMandate}
                        onChange={handleAccountMandate}
                      />
                    </div> */}
                  </td>
                  {/* <td>{data.dob_v}</td> */}
                  <td>
                    <div className="flex justify-center">
                      <input
                        type="number"
                        // disabled={data?.isUserExists ? true : false}
                        disabled={typeOfAccount === 'SP' || data?.isUserExists ? true : false}
                        value={approvalLimit[data.Relation_no] || ""}
                        onChange={(e) =>
                          handleApprovalLimitChange(e, data.Relation_no)
                        }
                        className={` ${
                          typeOfAccount === 'SP' || data?.isUserExists
                            ? "bg-gray-500 p-2 border border-gray-400 rounded-md cursor-not-allowed"
                            : "p-2 border border-gray-600 rounded-md"
                        } `}
                      />
                    </div>
                  </td>
                  <td className="">
                    <div
                      className={`${
                        data?.isUserExists
                          ? "cursor-not-allowed flex justify-center bg-gray-700 mx-5 rounded-md"
                          : "flex justify-center bg-sky-700 mx-5 rounded-md"
                      }`}
                    >
                      <button
                        onClick={() =>
                          openModal(
                            data.rel_no_v ??
                              data.RELATION_NO ??
                              data.Relation_no ??
                              data.relation_no ??
                              data.randomNumberString
                          )
                        }
                        className="border text-center text-white border-gray-400 p-5"
                        disabled={data?.isUserExists ? true : false}
                      >
                        IMAGE / SIGNATURE CAPTURE
                      </button>
                    </div>
                  </td>
                  <td className="flex justify-center">
                    <ImageSignatureView
                      id={
                        data.rel_no_v ??
                        data.RELATION_NO ??
                        data.Relation_no ??
                        data.relation_no ??
                        data.randomNumberString
                      }
                    />
                    {/* <button
                      onClick={() => openFingerModal(data.randomNumberString)}
                      className="border text-center text-white border-gray-400 bg-sky-700 px-1"
                    >
                      FINGER PRINT
                    </button> */}
                  </td>

                  <td>
                    {/* <button onClick={() => handleSubmitSignatory(data)} className="bg-sky-700 text-white p-5">
                Submit
              </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {
          imageModal && (
            // <div>Mand</div>
            <Modal
              opened={imageModal}
              onClose={closeModal}
              size="55%"
              title="IMAGE & SIGNATURE CAPTURE"
            >
              <div className="">
                {/* <ImageCapturing id={randonNum} /> */}
                <ImageSignatureCapture id={randonNum} />
              </div>
            </Modal>
          )
          // <ImageVerification />
        }

        {
          fingerModal && (
            // <div>Mand</div>
            <Modal opened={fingerModal} onClose={closeFingerModal} size="2xl">
              <div>
                {/* <Fcapture relationNo={randonNum} /> */}
                <ImageSignatureView id={randonNum} />
              </div>
            </Modal>
          )
          // <ImageVerification />
        }
      </div>

      <hr />
    </div>
  );
};

export default Mandate;
