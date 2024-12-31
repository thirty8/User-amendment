// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import TimePicker from 'react-time-picker';
// import { MDBIcon } from 'mdb-react-ui-kit';
// import swal from "sweetalert";
// import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
// import { API_SERVER } from '../../../../../../config/constant';
// import axios from "axios";

// const headers = {
//   'x-api-key': process.env.REACT_APP_API_KEY,
//   'Content-Type': 'application/json'
// };
// import UserInformation from './UserInformation';

// const UserCreationForm = () => {

//   const customTheme = JSON.parse(localStorage.getItem("theme"));

//   const headerImage = customTheme.theme.headerImage;
//   const textColor = customTheme.theme.textColor;

//   const [staffID, setStaffID] = useState('');
//   const [department, setDepartment] = useState('');
//   const [staffName, setStaffName] = useState('');
//   const [userID, setUserID] = useState('');
//   const [userType, setUserType] = useState('');
//   const [deviceID, setDeviceID] = useState('');
//   const [branch, setBranch] = useState('');
//   const [timeIn, setTimeIn] = useState('08:00');
//   const [timeOut, setTimeOut] = useState('17:00');
//   const [accessRight, setAccessRight] = useState('');
//   const [authorityCode, setAuthorityCode] = useState('');
//   const [approvalRight, setApprovalRight] = useState('');
//   const [userApprovalLevel, setUserApprovalLevel] = useState('');

//   const handleDepartmentChange = (event) => {
//     setDepartment(event.target.value);
//   };

//   const handleStaffNameChange = (event) => {
//     setStaffName(event.target.value);
//   };

//   const handleUserIDChange = (event) => {
//     setUserID(event.target.value);
//   };

//   const handleUserTypeChange = (selectedOption) => {
//     setUserType(selectedOption);
//   };

//   const handleDeviceIDChange = (event) => {
//     setDeviceID(event.target.value);
//   };

//   const handleBranchChange = (selectedOption) => {
//     setBranch(selectedOption);
//   };

//   const handleTimeInChange = (time) => {
//     setTimeIn(time);
//   };

//   const handleTimeOutChange = (time) => {
//     setTimeOut(time);
//   };

//   const handleStaffIDChange = (selectedOption) => {
//     setUserInformationModal(false);
//     setStaffID(selectedOption);

//     if(selectedOption !== '' || selectedOption !== null || selectedOption !== undefined){
//       document.getElementById("department").disabled = false;
//       document.getElementById("staffName").disabled = false;
//     } else {
//       document.getElementById("department").disabled = true;
//       document.getElementById("staffName").disabled = true;
//     }
//   };

//   const handleAccessRightChange = (selectedOption) => {
//     setAccessRight(selectedOption);
//   };

//   const handleAuthorityCodeChange = (event) => {
//     setAuthorityCode(event.target.value);
//   };

//   const handleApprovalRightChange = (event) => {
//     setApprovalRight(event.target.value);
//   };

//   const handleUserApprovalLevelChange = (event) => {
//     setUserApprovalLevel(event.target.value);
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (
//       staffID === "" ||
//       userID === "" ||
//       userType === "" ||
//       deviceID === "" ||
//       branch === "" ||
//       accessRight === "" ||
//       authorityCode === "" ||
//       approvalRight === ""
//       // || userApprovalLevel === ""
//     ) {
//       swal({
//         title: "Active Fields Are Required",
//         text: "Please fill all the active fields",
//         icon: "warning",
//         button: "Ok",
//       }).then((result) => {
//         // Do something here..
//         document.getElementById("saveBTN").disabled = false;
//       });
//     } else {
//       // handle form submit here...
//       try {
//         const response = await axios.post(API_SERVER + "/api/create-user", {
//           staffID : staffID,
//           department : department,
//           staffName : staffName,
//           userID : userID,
//           userType : userType,
//           deviceID : deviceID,
//           branch : branch,
//           timeIn : timeIn,
//           timeOut : timeOut,
//           accessRight : accessRight,
//           authorityCode : authorityCode,
//           approvalRight : approvalRight,
//           userApprovalLevel : userApprovalLevel,
//         }, { headers });

//         if (response) {
//           if (response.data[0].responseCode === "000") {
//             swal({
//               title: "User Creation Successful",
//               text: "The user you created has been sent for Approval",
//               icon: "success",
//               button: "Ok",
//             }).then((result) => {
//               if (result) {
//                 setStateChangeOfMenus(true);
//                 document.getElementById("saveBTN").disabled = false;
//                 document.getElementById("minimizeModal").click();
//               }
//             });
//           }
//         } else {
//           alert("Something went wrong...");
//         }
//       } catch (e) {
//         alert(e);
//       }
//     }

//   };

//   const staffIDOptions = [
//     { value: 'staff1', label: 'Staff 1' },
//     { value: 'staff2', label: 'Staff 2' },
//     { value: 'staff3', label: 'Staff 3' }
//   ];

//   const userTypeOptions = [
//     { value: 'admin', label: 'Admin' },
//     { value: 'employee', label: 'Employee' },
//     { value: 'guest', label: 'Guest' }
//   ];

//   const branchOptions = [
//     { value: 'branch1', label: 'Branch 1' },
//     { value: 'branch2', label: 'Branch 2' },
//     { value: 'branch3', label: 'Branch 3' }
//   ];

//   const accessRightOptions = [
//     { value: 'full', label: 'Full' },
//     { value: 'limited', label: 'Limited' },
//     { value: 'none', label: 'None' }
//   ];

//   const authorityCodeOptions = [
//     { value: 'code1', label: 'Code 1' },
//     { value: 'code2', label: 'Code 2' },
//     { value: 'code3', label: 'Code 3' }
//   ];

//   const approvalRightOptions = [
//     { value: 'approved', label: 'Approved' },
//     { value: 'pending', label: 'Pending' },
//     { value: 'rejected', label: 'Rejected' }
//   ];

//   const userApprovalLevelOptions = [
//     { value: 'level1', label: 'Level 1' },
//     { value: 'level2', label: 'Level 2' },
//     { value: 'level3', label: 'Level 3' }
//   ];

//     const [showUserInformationModal, setUserInformationModal] = useState(false);

//     const UserInformationModal = ({ showModal, setShowModal }) => {

//       if(staffID){

//       const handleClose = () => setShowModal(false);
//       const handleShow = () => setShowModal(true);

//        return (
//          <>
//            <Modal
//            size="md"
//            className="headModal modal"
//            show={showModal}
//            centered
//            // onHide={handleClose}
//            >
//           <Modal.Header style={{ background: `url(` + window.location.origin + `/assets/images/headerBackground/` + headerImage + `)` }}>
//           <div className="w-full -mb-4 flex justify-between ">
//             <Modal.Title
//               style={{
//                 fontSize: "14.5px",
//                 color: "white",
//                 padding: "10px"
//               }}
//             >
//               <p><MDBIcon style={{ color: "white", fontSize: "15px" }} fas icon="user-alt" />&nbsp; User Information</p>
//             </Modal.Title>
//             <svg
//               onClick={handleClose}
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               style={{ padding: "10px" }}
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-11 h-11 cursor-pointer fill-cyan-500 stroke-white"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//         </Modal.Header>

//              <Modal.Body style={{ background: "white" }}>

//                 <UserInformation />

//              </Modal.Body>
//            </Modal>
//          </>
//        );
//      } else {
//         return null;
//      }

//     }

//   return (
//     <>

//     <UserInformationModal name="User Information" showModal={showUserInformationModal} setShowModal={setUserInformationModal} />

//     <Form className='space-y-3 -mt-4 mb-2' style={{ zoom: "0.9" }}>
//       <Form.Group as={Row}>
//         <Form.Label style={{ color: textColor }} column sm="3">Staff ID:</Form.Label>
//         <Col sm="9">
//           <Select id="staffID" styles={{
//         control: (provided) => ({
//           ...provided,
//           minHeight: '1px', // Change the height value as needed
//           maxHeight: "35px",
//           fontSize: '13px', // Change the font size as needed
//         })
//       }}  options={staffIDOptions} value={staffID} onChange={handleStaffIDChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label column sm="3">Department:</Form.Label>
//         <Col sm="9">
//           <Form.Control id="department" size="sm" disabled type="text" value={department} onChange={handleDepartmentChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label column sm="3">Staff Name:</Form.Label>
//         <Col sm="8">
//           <Form.Control size="sm" id="staffName" disabled type="text" value={staffName} onChange={handleStaffNameChange} />
//         </Col>
//         <Col sm="1">
//           <Button size="sm" onClick={function (e) { e.preventDefault(); setUserInformationModal(!showUserInformationModal); }} id="userInfoBTN" style={{ textAlign: "center", marginLeft: "-17px", maxHeight: "29px", background: `url(` + window.location.origin + `/assets/images/headerBackground/` + headerImage + `)` }} variant="variant"><MDBIcon style={{ color: "white", fontSize: "17px", marginRight: "-5px", marginLeft: "-6px", }} fas icon="info-circle" /></Button>
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label style={{ color: textColor }} column sm="3">User ID:</Form.Label>
//         <Col sm="9">
//           <Form.Control size="sm" id="userID" type="text" value={userID} onChange={handleUserIDChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label style={{ color: textColor }} column sm="3">User Type:</Form.Label>
//         <Col sm="9">
//           <Select id="userType" styles={{
//         control: (provided) => ({
//           ...provided,
//           minHeight: '1px', // Change the height value as needed
//           maxHeight: "35px",
//           fontSize: '13px', // Change the font size as needed
//         })
//       }}  options={userTypeOptions} value={userType} onChange={handleUserTypeChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label style={{ color: textColor }} column sm="3">Device ID:</Form.Label>
//         <Col sm="9">
//           <Form.Control size="sm" id="deviceID" type="text" value={deviceID} onChange={handleDeviceIDChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label style={{ color: textColor }} column sm="3">Branch:</Form.Label>
//         <Col sm="9">
//           <Select styles={{
//         control: (provided) => ({
//           ...provided,
//           minHeight: '1px', // Change the height value as needed
//           maxHeight: "35px",
//           fontSize: '13px', // Change the font size as needed
//         })
//       }}  options={branchOptions} id="branch" value={branch} onChange={handleBranchChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group style={{ paddingLeft: "0px", paddingRight: "0px", marginTop: "17px" }} as={Row}>
//         <Form.Label column sm="3">Time In :</Form.Label>
//         <Col sm="4">
//           <TimePicker value={timeIn} id="timeIn" onChange={handleTimeInChange} />
//         </Col>
//         <Col sm="1" className="text-center">
//           to
//         </Col>
//         <Col sm="4">
//           <TimePicker value={timeOut} id="timeOut" onChange={handleTimeOutChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label style={{ color: textColor }} column sm="3">Access Right:</Form.Label>
//         <Col sm="9">
//           <Select styles={{
//         control: (provided) => ({
//           ...provided,
//           minHeight: '1px', // Change the height value as needed
//           maxHeight: "35px",
//           fontSize: '13px', // Change the font size as needed
//         })
//       }}  options={accessRightOptions} id="accessRight" value={accessRight} onChange={handleAccessRightChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label style={{ color: textColor }} column sm="3">Authority Code:</Form.Label>
//           <Col sm="9">
//           <Select id="authorityCode" styles={{
//           control: (provided) => ({
//             ...provided,
//             minHeight: '1px', // Change the height value as needed
//             maxHeight: "35px",
//             fontSize: '13px', // Change the font size as needed
//           })
//         }}  options={authorityCodeOptions} value={authorityCode} onChange={handleAuthorityCodeChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label style={{ color: textColor }} column sm="3">Approval Right:</Form.Label>
//         <Col sm="9">
//           <Select id="approvalRight" styles={{
//         control: (provided) => ({
//           ...provided,
//           minHeight: '1px', // Change the height value as needed
//           maxHeight: "35px",
//           fontSize: '13px', // Change the font size as needed
//         })
//       }}  options={approvalRightOptions} value={approvalRight} onChange={handleApprovalRightChange} />
//         </Col>
//       </Form.Group>

//       <Form.Group as={Row}>
//         <Form.Label column sm="3">Approval Level:</Form.Label>
//         <Col sm="9">
//           <Select id="userApprovalLevel" styles={{
//         control: (provided) => ({
//           ...provided,
//           minHeight: '1px', // Change the height value as needed
//           maxHeight: "35px",
//           fontSize: '13px', // Change the font size as needed
//         })
//       }}  options={userApprovalLevelOptions} value={userApprovalLevel} onChange={handleUserApprovalLevelChange} />
//         </Col>
//       </Form.Group>

//       <Button id="submitUserCreationForm" onClick={handleSubmit} type="button" style={{ display: "none" }}>Submit</Button>
//     </Form>
//     </>
//   );
// };

// export default UserCreationForm;

import React, { useEffect, useState, useRef } from "react";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { FiChevronRight, FiX } from "react-icons/fi";
import { Modal } from "@mantine/core";
import Header from "../../../../../../components/others/Header/Header";
import CustomTable from "../../../../../../components/others/customtable";
import { MDBIcon } from "mdb-react-ui-kit";
import ButtonType from "../../../../../../components/others/Button/ButtonType";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";

function UserCreationForm() {
  //headers
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const headerImage = customTheme.theme.headerImage;

  const limitHeaders = [
    "Currency",
    "Max Credit Limit",
    "Max Debit Limit",
    "Max Floor Limit",
    "Min Floor Limit",
  ];

  const accessListingHeaders = ["Code", "Description"];

  //refs
  const thirdPartyRef = useRef(null);

  // states
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [staffName, setStaffName] = useState("");
  const [approvalRight, setApprovalRight] = useState("");
  const [department, setDepartment] = useState("");
  const [tellerRole, setTellerRole] = useState("");
  const [showDeviceId, setShowDeviceId] = useState(true);
  const [accessRightGranted, setAccessRightGranted] = useState(false);
  const [isTeller, setIsTeller] = useState(false);
  const [isVaultCustodian, setIsVaultCustodian] = useState(false);
  const [accessRights, setAccessRights] = useState([]);
  const [authorityCode, setAuthorityCodes] = useState([]);
  const [branch, setBranch] = useState([]);
  const [tellerLimitData, setTellerLimitData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalListing, setShowModalListing] = useState(false);
  const [accessListings, setAccessListings] = useState([]);
  const [hideModal, setHideModal] = useState(false);
  const [okShow, setOkShow] = useState(false);
  const [branchLabel, setBranchLabel] = useState("");
  const [accessRightLabel, setAccessRightLabel] = useState("");

  // functions
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleShowListing = () => setShowModalListing(true);
  const handleCloseListing = () => setShowModalListing(false);
  const handleOkShow = () => setOkShow(true);
  const handleCancelOkShow = () => setOkShow(false);

  // APIs
  useEffect(() => {
    // get users-personal-info
    axios
      .post(API_SERVER + "/api/getUserID", { key: 1 }, { headers: headers })
      .then(function (response) {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // get-access-rights
    axios
      .get(API_SERVER + "/api/get-user-access-right", { headers: headers })
      .then(function (response) {
        setAccessRights(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // get-authority-codes
    axios
      .get(API_SERVER + "/api/get-user-authority-code", { headers: headers })
      .then(function (response) {
        setAuthorityCodes(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // get-approval-group
    axios
      .get(API_SERVER + "/api/get-user-approval-level", { headers: headers })
      .then(function (response) {
        setApprovalRight(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // get-user-branch
    axios
      .get(API_SERVER + "/api/get-user-branch", { headers: headers })
      .then(function (response) {
        setBranch(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // data for table
  const arr0 = tellerLimitData?.map((i) => {
    return [...Object.values(i)];
  });

  const arr1 = accessListings?.map((i) => {
    return [...Object.values(i)];
  });

  console.log(tellerLimitData, "teller limit data");

  return (
    <div>
      <ActionButtons
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayReject={"none"}
        displayHelp={"none"}
        displayDelete={"none"}
        displayView={"none"}
      />
      <hr style={{ margin: "10px" }} />
      <div>
        <div style={{ marginBottom: "20px" }}>
          <ListOfValue
            label="Staff ID"
            labelWidth={"30%"}
            inputWidth={"70%"}
            required
            data={users}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTimeout(() => {
                  if (thirdPartyRef.current) {
                    thirdPartyRef.current.focus();
                  }
                }, 0);
              }
            }}
            onChange={(value) => {
              setUserId(value);

              axios
                .post(
                  API_SERVER + "/api/getUserID",
                  { key: 2, staff_id: value },
                  { headers: headers }
                )
                .then(function (response) {
                  setUserDetails(response.data);
                  setStaffName(response.data[0].name);
                  setDepartment(response.data[0].department);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <InputField
            label="Department"
            ref={thirdPartyRef}
            labelWidth={"30%"}
            inputWidth={"70%"}
            value={
              department === "null" || department === null ? "" : department
            }
            disabled
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <InputField
            label="Staff Name"
            labelWidth={"30%"}
            inputWidth={"70%"}
            disabled
            value={staffName}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <InputField
            label="User ID"
            labelWidth={"30%"}
            inputWidth={"70%"}
            disabled
            required
            value={userId}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <SelectField
            label="User Type"
            labelWidth={"30%"}
            inputWidth={"70%"}
            disabled
            required
            data={[{ label: "Core Banking User", value: "Y" }]}
            onChange={(value) => {
              if (value === "Y") {
                setShowDeviceId(false);
              }
            }}
          />
        </div>

        {showDeviceId && (
          <div style={{ marginBottom: "20px" }}>
            <InputField
              label="Device ID"
              labelWidth={"30%"}
              inputWidth={"70%"}
              disabled
              required
            />
          </div>
        )}

        <div style={{ marginBottom: "20px" }}>
          <ListOfValue
            label="Branch"
            labelWidth={"30%"}
            inputWidth={"70%"}
            required
            data={branch}
            onChange={(event) => {
              setBranchLabel(event);
            }}
          />
        </div>

        <div style={{ display: "flex", width: "100%", marginBottom: "20px" }}>
          <div style={{ width: "60%" }}>
            <InputField
              label="Time In"
              labelWidth={"85%"}
              defaultValue={"0:00"}
            />
          </div>

          <div style={{ width: "40%", paddingLeft: "10px" }}>
            <InputField label="To" labelWidth={"80%"} defaultValue={"23:59"} />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <div style={{ width: "90%", marginRight: "10px" }}>
              <ListOfValue
                label="Access Right"
                labelWidth={"52%"}
                inputWidth={"100%"}
                required
                data={authorityCode}
                onChange={(value) => {
                  setAccessRightLabel(value);
                  // checking if person is teller
                  if (value === 12 || value === "12") {
                    setIsTeller(true);
                  } else {
                    setIsTeller(false);
                  }

                  if (value === 15 || value === "15") {
                    setIsVaultCustodian(true);
                  } else {
                    setIsVaultCustodian(false);
                  }

                  axios
                    .post(
                      API_SERVER + "/api/get-access-form-listing",
                      { access_code: value },
                      { headers: headers }
                    )
                    .then(function (response) {
                      setAccessListings(response.data);
                    });

                  //get-teller-role
                  axios
                    .post(
                      API_SERVER + "/api/get-teller-role",
                      { access_code: value },
                      {
                        headers: headers,
                      }
                    )
                    .then(function (response) {
                      setTellerRole(response.data);
                      console.log(value, "the custodian val");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
            </div>

            <div style={{ width: "10%" }}>
              <ButtonComponent
                label={<FiChevronRight />}
                onClick={handleShowListing}
              />

              {showModalListing && (
                <Modal
                  className=""
                  size={"lg"}
                  opened={showModalListing}
                  withCloseButton={false}
                  padding={0}
                  onClose={handleCloseListing}
                  trapFocus={false}
                  centered
                >
                  <div style={{ zoom: "0.8" }}>
                    <Header
                      headerShade
                      title={"Access Form Listing"}
                      closeIcon={<FiX color={"white"} />}
                      handleClose={handleCloseListing}
                    />

                    <div>
                      <CustomTable headers={accessListingHeaders} data={arr1} />
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        </div>

        {(isTeller && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div style={{ width: "90%", marginRight: "10px" }}>
              <ListOfValue
                label="Teller Role"
                labelWidth={"52%"}
                inputWidth={"100%"}
                required
                data={tellerRole}
                onChange={(value) => {
                  axios
                    .post(
                      API_SERVER + "/api/get-teller-limit",
                      { teller_role: value },
                      { headers: headers }
                    )
                    .then(function (response) {
                      setTellerLimitData(response.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
            </div>

            <div style={{ width: "10%" }}>
              <ButtonComponent
                label={<FiChevronRight />}
                onClick={() => {
                  handleShow();
                  setHideModal(true);
                }}
              />

              {showModal && (
                <Modal
                  className=""
                  size={"50%"}
                  opened={showModal}
                  withCloseButton={false}
                  padding={0}
                  onClose={handleClose}
                  trapFocus={false}
                  centered
                >
                  <div style={{ zoom: "0.8" }}>
                    <Header
                      title={"Teller Limits"}
                      closeIcon={<FiX color={"white"} />}
                      handleClose={() => {
                        handleClose();
                        setHideModal(false);
                      }}
                      headerShade
                    />

                    <div>
                      <CustomTable headers={limitHeaders} data={arr0} />
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          </div>
        )) ||
          (isVaultCustodian && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ width: "90%", marginRight: "10px" }}>
                <ListOfValue
                  label="Teller Role"
                  labelWidth={"52%"}
                  inputWidth={"100%"}
                  required
                  data={tellerRole}
                  onChange={(value) => {
                    axios
                      .post(
                        API_SERVER + "/api/get-teller-limit",
                        { teller_role: value },
                        { headers: headers }
                      )
                      .then(function (response) {
                        setTellerLimitData(response.data);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                />
              </div>

              <div style={{ width: "10%" }}>
                <ButtonComponent
                  label={<FiChevronRight />}
                  onClick={handleShow}
                />

                {showModal && (
                  <Modal
                    className=""
                    size={"lg"}
                    opened={showModal}
                    withCloseButton={false}
                    padding={0}
                    onClose={handleClose}
                    trapFocus={false}
                    centered
                  >
                    <div style={{ zoom: "0.8" }}>
                      <Header
                        title={"Teller Limits"}
                        closeIcon={<FiX color={"white"} />}
                        handleClose={handleClose}
                        headerShade
                      />

                      <div>
                        <CustomTable headers={limitHeaders} data={arr0} />
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
            </div>
          ))}

        <div style={{ marginBottom: "20px" }}>
          <ListOfValue
            label="Authority Code"
            labelWidth={"30%"}
            inputWidth={"70%"}
            required
            data={accessRights}
            defaultValue={"70"}
          />
        </div>

        {isTeller === false && (
          <div style={{ marginBottom: "20px" }}>
            <SelectField
              label="Approval Right"
              labelWidth={"30%"}
              inputWidth={"70%"}
              required
              data={[
                { label: "Yes", value: "Y" },
                { label: "No", value: "N" },
              ]}
              onChange={() => setAccessRightGranted(true)}
            />
          </div>
        )}

        {isTeller === false && (
          <div style={{ marginBottom: "20px" }}>
            <ListOfValue
              label="Approval Level"
              labelWidth={"30%"}
              inputWidth={"70%"}
              data={approvalRight}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCreationForm;
