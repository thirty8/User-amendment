import React, { useState, useEffect, useContext } from "react";
import MyTabs from "./components/xplus-tabs";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import { Modal, Text, Checkbox } from "@mantine/core";
import swal from "sweetalert";
import ImageVerification from "../../../../components/ImageVerification";
import ValidationModal from "./components/ValidationModal";
import { formatDate } from "./helpers/date_formater";
// import { RelationContext } from "../../contextapi/RelationContext";

function IndividualAccountOpening({ accountTypes, setAccountTypes }) {
  const [customerData, setCustomerData] = useState("");
  const [customerDataTable, setCustomerDataTable] = useState("");
  const [storedFormData, setStoredFormData] = useState([]);
  const [custType, setCustType] = useState("");
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tableDataAddress, setTableDataAddress] = useState([]);
  const [usedAddressTypes, setUsedAddressTypes] = useState([]);

  const [currencies, setCurrencies] = useState([]);

  const [refinedData, setRefinedData] = useState([]);

  const [relationData, setRelationData] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [isOpenRelationDetails, setIsOpenRelationDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [showApiDataModal, setShowApiDataModal] = useState(false);
  const [saveDataNewForm, setSavedDataNewForm] = useState(null);

  const [modalOpenedNok, setModalOpenedNok] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null); // To keep track of the row being edited

  const [insertedData, setInsertedData] = useState([]);

  // const {
  //   add_new_relation,
  //   handleInputChange,
  //   handleCheckboxChangep,
  //   handleSubmitAddNewRelation,
  // } = useContext(RelationContext);

  const nextofkinmodal = () => {
    setModalOpenedNok(true);
  };

  const nextofkinclosemodal = () => {
    setModalOpenedNok(false);
  };

  console.warn("refinedAddressData:::", refinedData);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// API HEADERS ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// HANDLING DATE FUNCTION /////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END HANDLING DATE FUNCTION /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////FUNCTION TO HANDLE FORM SUBMITION BY VALIDATIN THE NATIONAL_ID FIELD FROM RELATION DETAILS COMPONENT ////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData1, setFormData1] = useState({
    nationalID: "",
    email: "",
    mobileNumber: "",
  });

  console.log("formData1", formData1, saveDataNewForm);

  // Function to toggle the modal
  const toggleModal = () => {
    // setIsOpen(!isOpen);
    setIsOpenRelationDetails(!isOpenRelationDetails);
  };

  const toggleModalClose = () => {
    // setIsOpen(!isOpen);
    setIsOpenRelationDetails(false);
  };

  const showNewUserFormF = () => {
    setShowNewUserForm(true);
  };

  const showNewUserFormFClose = () => {
    setShowNewUserForm(false);
  };

  // const handleFormSubmit = () => {
  //   const { nationalID, mobileNumber } = formData1;

  //   // Save all input data to state
  //   const formDataToSave = {
  //     firstName: formData1.firstName,
  //     lastName: formData1.lastName,
  //     dateOfBirth: formData1.dateOfBirth,
  //     nationalID: formData1.nationalID,
  //     mobileNumber1: formData1.mobileNumber,
  //     mobileNumber2: formData1.mobileNumber2,
  //     email: formData1.email,
  //   };

  //   if (!nationalID && !mobileNumber) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Validation Error",
  //       text: "National ID or Mobile Number is required.",
  //     });
  //     return;
  //   }

  //   const data = JSON.stringify({
  //     dynamicNumber: nationalID || mobileNumber,
  //   });

  //   const config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: API_SERVER + "/api/get-multiple-validation",
  //     headers: {
  //       "x-api-key":
  //         "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   setLoading(true);

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setLoading(false);
  //       const data = response.data;
  //       setApiData(data);
  //       if (data && data.userExists) {
  //         // setShowApiDataModal(true);
  //         setShow(true);
  //       } else {
  //         setSavedDataNewForm(formDataToSave);
  //         showNewUserFormF();
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       Swal.fire({
  //         icon: "error",
  //         title: "API Error",
  //         text: "An error occurred while processing your request.",
  //       });
  //     });
  // };
  const handleFormSubmit = () => {
    const { nationalID, mobileNumber } = formData1;

    // Save all input data to state
    const formDataToSave = {
      firstName: formData1.firstName,
      lastName: formData1.lastName,
      dateOfBirth: formData1.dateOfBirth,
      nationalID: formData1.nationalID,
      mobileNumber1: formData1.mobileNumber,
      mobileNumber2: formData1.mobileNumber2,
      email: formData1.email,
    };

    if (!nationalID && !mobileNumber) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "National ID or Mobile Number is required.",
      });
      return;
    }

    const data = JSON.stringify({
      dynamicNumber: nationalID || mobileNumber,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API_SERVER + "/api/get-multiple-validation",
      headers: {
        "x-api-key":
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "Content-Type": "application/json",
      },
      data: data,
    };

    setLoading(true);

    axios
      .request(config)
      .then((response) => {
        setLoading(false);
        const data = response.data;
        setApiData(data);
        if (data && data.userExists) {
          // User exists, show the existing user data modal or any relevant action
          setShow(true);
        } else {
          // User does not exist, ask for confirmation to proceed
          Swal.fire({
            icon: "warning",
            title: "User Not Found",
            text: "This user does not exist. Do you want to proceed to capture the details?",
            showCancelButton: true,
            confirmButtonText: "Yes, proceed",
            cancelButtonText: "No, cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              // User confirmed, save the new user's data and show the form
              setSavedDataNewForm(formDataToSave);
              showNewUserFormF();
            }
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "API Error",
          text: "An error occurred while processing your request.",
        });
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////END OF FUNCTION TO HANDLE FORM SUBMITION BY VALIDATIN THE NATIONAL_ID FIELD FROM RELATION DETAILS COMPONENT /////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////FUNCTION TO ADD DATA FROM RELATION DETAILS COMPONENT ////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const onCloseForRelationValidationForm = () => {
    setShow(false);
  };

  // const handleProceed = () => {
  //   // Extract userData
  //   let userData = apiData?.userData;

  //   // Handle if userData is an object
  //   if (userData && !Array.isArray(userData)) {
  //     userData = [userData]; // Convert object to array
  //   }

  //   // Check if userData exists and is an array
  //   if (Array.isArray(userData) && userData.length > 0) {
  //     console.log("user data", userData);
  //     // Append new data to existing relationData
  //     setRelationData((prevRelationData) => [
  //       ...prevRelationData, // Spread previous data
  //       ...userData.map((row) => ({
  //         randomNumberString: row?.relation_no ?? row?.RELATION_NO,
  //         P_title: row?.suffix ?? row?.SUFFIX,
  //         P_gender: row?.gender ?? row?.GENDER, // Gender is MandatoryP_fname: row?.first_name, // First Name is MandatoryP_mname: row?.other_name,
  //         P_fname: row?.fname ?? row?.FIRST_NAME ?? row?.first_name,
  //         P_mname: row?.other_name,
  //         P_sname: row?.surname ?? row?.SURNAME, // Surname is MandatoryP_short_name: "",
  //         P_alias: row?.alias_name,
  //         P_tin: row?.tin ?? row?.TIN, // Tin Number is MandatoryP_preferred_name: "",
  //         P_dob:
  //           formatDate(row?.date_of_birth) ?? formatDate(row?.DATE_OF_BIRTH), //validationDate1,
  //         P_country: row?.dormicile_country ?? row?.DORMICILE_COUNTRY, // Country is MandatoryP_region: "",
  //         P_district: "",
  //         P_location: row?.location,
  //         P_preferred_lang: "",
  //         P_minor: row?.minor,
  //         P_Guardian_id: row?.guardian_id,
  //         P_Guardian_type: row?.guardian_type,
  //         P_health_challenge: "N", //row?.h_challenge_type,P_health_challenge_type: "001", //row?.health_challenge,P_staff_indicator: row?.staff_category,
  //         P_staff_id: row?.staff_id,
  //         P_OCCUPATION: row?.profession,
  //         P_OTHER_OCCUPATION: "",
  //         P_RESIDENT: "",
  //         P_nATIONALITY: row?.nationality,
  //         P_NATIONAL_ID: row?.nin,
  //         P_NIN_dateissued: formatDate(row?.nin_date_issue), //validationDate2,
  //         P_nin_expiry: formatDate(row?.nin_date_issue), //validationDate3,
  //         P_ID_type: "",
  //         P_id_nO: "0000000001",
  //         P_id_issue_at: "",
  //         P_ID_issued_authority: "",
  //         P_ID_date_issued: "",
  //         P_ID_expirydate: "",
  //         P_Mobile_comm_no: `${row?.mobile1}`,
  //         P_home_phone_type: "",
  //         P_Home_phone_no: "",
  //         P_office_phone_type: "",
  //         P_office_phone_no: "",
  //         P_Office_email: "",
  //         P_home_email: "",
  //         P_enable_IB: "",
  //         P_enable_MB: "",
  //         P_enable_ussd: "",
  //         P_enable_smsalert: "",
  //         P_enable_emailalert: "",
  //         P_mobile_bankphoneno: "",
  //         P_Mobile_bankemail: "",
  //         P_NOK_fullname: "",
  //         P_NOK_ID_type: "",
  //         P_NOK_id_number: "",
  //         P_NOK_expirydate: "",
  //         P_NOK_IssueDate: "",
  //         P_NOK_relationship: "",
  //         P_NOK_Percent_share: "",
  //         P_Nok_Relation_type: "",
  //         P_Curr_addr_region: "",
  //         P_Curr_addr_hse_typ: "",
  //         P_Curr_addr_flat_hse_no: "",
  //         P_Curr_addr_building_name: "",
  //         P_Curr_addr_streetname: "",
  //         P_Curr_addr_location: "",
  //         P_Curr_addr_city: "",
  //         P_Curr_addr_nearestlandmark: "",
  //         P_Curr_addr_natureownship: "",
  //         P_Curr_addr_stayedsince: "",
  //         P_Curr_addr_costaccomodation: "",
  //         P_Curr_addr_currentalue: "",
  //         P_Curr_addr_balancemortgage: "",
  //         P_Curr_addr_attention_party: "",
  //         P_Perm_addr_region: "",
  //         P_perm_addr_hse_typ: "",
  //         P_perm_addr_flat_hse_no: "",
  //         P_perm_addr_building_name: "",
  //         P_perm_addr_streetname: "",
  //         P_perm_addr_location: "",
  //         P_perm_addr_city: "",
  //         P_perm_addr_nearestlandmark: "",
  //         P_perm_addr_natureownship: "",
  //         P_perm_addr_stayedsince: "",
  //         P_perm_addr_costaccomodation: "",
  //         P_perm_addr_currentalue: "",
  //         P_perm_addr_balancemortgage: "",
  //         P_perm_addr_attention_party: "",
  //         P_type_of_c: "",
  //         P_OVERRIDE_CODE: "",
  //         P_SUB_rel: "",
  //         P_rel_dedup: "",
  //         p_channel: "",
  //         p_pterm_id: "",
  //         p_pip: "",
  //         username: "",
  //         hostname: "",
  //       })),
  //     ]);
  //     onCloseForRelationValidationForm(); // Close the modal if this is used for modal visibility
  //   }

  //   // Close the modalssetIsOpenRelationDetails(false);
  //   setShowApiDataModal(false); // Close the specific API data modal
  //   toggleModal();
  // };

  // console.log("user relation data", insertedData[0]?.CUSTOMER_NUMBER);
  console.log("user relation data", insertedData);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// END OF FUNCTION TO ADD DATA FROM RELATION DETAILS COMPONENT /////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// CALL EFFECTIVE DATE (BUSINESS DATE) ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [effective, setEffective] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API_SERVER + "/api/get-effective-date",
          { headers }
        );
        const data = response.data[0].effective_date;

        // Parse the date and reformat it as dd Month yyyy
        const parsedDate = new Date(data);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const formattedDate = `${parsedDate.getDate()} - ${
          monthNames[parsedDate.getMonth()]
        } - ${parsedDate.getFullYear()}`;

        setEffective(formattedDate);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END OF CALL EFFECTIVE DATE (BUSINESS DATE) /////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// CALL CURRENCY CODESC ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const getCurrencyData = async () => {
      try {
        const response = await axios.get(API_SERVER + "/api/currencies", {
          headers,
        });
        if (response.data.length > 0) {
          const arr = response.data.map((item) => ({
            value: item.actual_code,
            label: item.description,
          }));
          console.log("CURRENCY", arr);
          setCurrencies(arr);
        } else {
          setCurrencies([]); // Set an empty array if there are no currencies
        }
      } catch (error) {
        console.error("Error fetching currency data:", error);
        // Handle error state or logging here
      }
    };

    getCurrencyData();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////// SHAREHOLDER STATE ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END OF SHAREHOLDERS ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// NEXT OF KIN STATE //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [allNextOfKingData, setAllNextOfKingData] = useState([]);
  const [tableDataNok, setTableDataNok] = useState([]);
  // const [nextOfKingData, setNextOfKingData] = useState({
  //   p_next_of_kin: "",
  //   p_next_of_kin_address: "",
  //   p_next_of_kin_phone: "",
  //   p_next_of_kin_id_type: "",
  //   p_next_of_kin_id_no: "",
  //   p_next_of_kin_id_expdate: "",
  //   p_next_of_kin_relationship: "",
  //   p_next_of_kin_dob: "",
  //   p_next_of_kin_percentshare: "",
  // });

  const [nextOfKingData, setNextOfKingData] = useState({
    p_next_of_kin: "",
    p_next_of_kin_relationship: "",
    p_next_of_kin_id_type: "",
    p_next_of_kin_id_no: "",
    p_next_of_kin_id_expdate: "",
    p_next_of_kin_address: "",
    p_next_of_kin_dob: "",
    p_next_of_kin_percentshare: "",
    p_next_of_kin_phone: "",
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END NEXT OF KIN STATE //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// HANDLE CHANGE FOR NEXT OF KIN //////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleChangeNextOfKin = (name, value) => {
    setNextOfKingData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END OF HANDLE CHANGE FOR NEXT OF KIN ///////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// FUNCTION TO SUBMIT NEXT OF KIN INFO TO THE TABLE IN THE FORM ///////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const handleSubmitNextOfKin = (e) => {
  //   e.preventDefault();

  //   if (
  //     !nextOfKingData.p_next_of_kin ||
  //     !nextOfKingData.p_next_of_kin_address ||
  //     !nextOfKingData.p_next_of_kin_phone ||
  //     !nextOfKingData.p_next_of_kin_id_type
  //   ) {
  //     window.alert("Please fill out all fields.");
  //   } else {
  //     const formattedDatep_next_of_kin_dob = formatDate(
  //       nextOfKingData.p_next_of_kin_dob
  //     );
  //     const formattedDatep_next_of_kin_id_expdate = formatDate(
  //       nextOfKingData.p_next_of_kin_id_expdate
  //     );

  //     const newData = {
  //       p_next_of_kin: nextOfKingData.p_next_of_kin,
  //       p_next_of_kin_address: nextOfKingData.p_next_of_kin_address,
  //       p_next_of_kin_phone: nextOfKingData.p_next_of_kin_phone,
  //       p_next_of_kin_id_type: nextOfKingData.p_next_of_kin_id_type,
  //       p_next_of_kin_id_no: nextOfKingData.p_next_of_kin_id_no,
  //       p_next_of_kin_id_expdate: formattedDatep_next_of_kin_id_expdate,
  //       p_next_of_kin_relationship: nextOfKingData.p_next_of_kin_relationship,
  //       p_next_of_kin_dob: formattedDatep_next_of_kin_dob,
  //       p_next_of_kin_percentshare: nextOfKingData.p_next_of_kin_percentshare,
  //     };

  // if (editMode) {
  //   setTableDataNok((prevTableData) =>
  //     prevTableData.map((item, index) =>
  //       index === currentIndex ? newData : item
  //     )
  //   );
  // } else {
  //   setTableDataNok((prevTableData) => [...prevTableData, newData]);
  // }

  //     setNextOfKingData({
  //       p_next_of_kin: "",
  //       p_next_of_kin_address: "",
  //       p_next_of_kin_phone: "",
  //       p_next_of_kin_id_type: "",
  //       p_next_of_kin_id_no: "",
  //       p_next_of_kin_id_expdate: "",
  //       p_next_of_kin_relationship: "",
  //       p_next_of_kin_dob: "",
  //       p_next_of_kin_percentshare: "",
  //     });
  //     setEditMode(false);
  //     nextofkinclosemodal(); // Close the modal after submitting
  //   }
  // };

  const handleSubmitNextOfKin = (e) => {
    e.preventDefault();

    console.log(
      "Next of Kin Data:",
      nextOfKingData,
      insertedData[0]?.CUSTOMER_NUMBER
    ); // Check the data before submitting

    const data = JSON.stringify({
      customer_number: insertedData[0]?.CUSTOMER_NUMBER, // Add your customer number dynamically if needed
      next_of_kin: nextOfKingData.p_next_of_kin,
      next_of_kin_address: nextOfKingData.p_next_of_kin_address,
      next_of_kin_phone: nextOfKingData.p_next_of_kin_phone,
      next_of_kin_id_type: nextOfKingData.p_next_of_kin_id_type,
      next_of_kin_id_no: nextOfKingData.p_next_of_kin_id_no,
      next_of_kin_id_expdate: formatDate(
        nextOfKingData.p_next_of_kin_id_expdate
      ),
      next_of_kin_relationship: nextOfKingData.p_next_of_kin_relationship,
      next_of_kin_dob: formatDate(nextOfKingData.p_next_of_kin_dob, true),
      next_of_kin_percentshare: nextOfKingData.p_next_of_kin_percentshare,
    });

    console.log("Next of Kin:", data);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://10.203.14.195:3320/api/add-NextOfKin",
      headers: {
        "x-api-key":
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("API Response:", response.data);

        // Update the tableDataNok state with the new next of kin data
        setTableDataNok((prevData) => [...prevData, ...response.data.data]);

        // Display SweetAlert success message
        Swal.fire({
          title: "Success!",
          text: "Next of Kin added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // You can close the modal or reset the form here
        nextofkinclosemodal();
      })
      .catch((error) => {
        console.log(error);

        // Display error message
        Swal.fire({
          title: "Error!",
          text: "There was an issue adding the Next of Kin.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  console.log("TableDataNok", tableDataNok);

  // const handleSubmitNextOfKin = (e) => {
  //   e.preventDefault();

  //   console.log("Next of Kin Data:", nextOfKingData); // Check the data before submitting

  //   const data = JSON.stringify({
  //     customer_number: "123456", // Add your customer number dynamically if needed
  //     next_of_kin: nextOfKingData.p_next_of_kin,
  //     next_of_kin_address: nextOfKingData.p_next_of_kin_address,
  //     next_of_kin_phone: nextOfKingData.p_next_of_kin_phone,
  //     next_of_kin_id_type: nextOfKingData.p_next_of_kin_id_type,
  //     next_of_kin_id_no: nextOfKingData.p_next_of_kin_id_no,
  //     next_of_kin_id_expdate: formatDate(nextOfKingData.p_next_of_kin_id_expdate),
  //     next_of_kin_relationship: nextOfKingData.p_next_of_kin_relationship,
  //     next_of_kin_dob: formatDate(nextOfKingData.p_next_of_kin_dob, true),
  //     next_of_kin_percentshare: nextOfKingData.p_next_of_kin_percentshare,
  //   });

  //   console.log("Next of Kin:", data);

  //   const config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: "http://10.203.14.195:3320/api/add-NextOfKin",
  //     headers: {
  //       "x-api-key":
  //         "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       // You can close the modal or reset the form here
  //       nextofkinclosemodal();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleEditNok = (index) => {
  //   setEditMode(true);
  //   setCurrentIndex(index);
  //   setNextOfKingData(tableDataNok[index]);
  //   nextofkinmodal(); // Open modal for editing
  // };

  const handleEditNok = (index) => {
    const data = tableDataNok[index];

    // Convert dates to the format YYYY-MM-DD
    const formattedData = {
      ...data,
      p_next_of_kin_id_expdate: formatDate(data.p_next_of_kin_id_expdate),
      p_next_of_kin_dob: formatDate(data.p_next_of_kin_dob),
    };

    setEditMode(true);
    setCurrentIndex(index);
    setNextOfKingData(formattedData);
    nextofkinmodal(); // Open modal for editing
  };

  const handleDeleteNok = (index) => {
    setTableDataNok((prevTableData) =>
      prevTableData.filter((_, i) => i !== index)
    );
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END OF FUNCTION TO SUBMIT NEXT OF KIN INFO TO THE TABLE IN THE FORM ////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// FUNCTION TO HANDLE CLEAR TABLES WHEN ACCOUNT IS CREATED ////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleClearTable = () => {
    setAllNextOfKingData([]);
    setTableDataNok([]);
    setRelationData([]);
    setData("");
    setUserData({
      typeofC: "I", // Update typeofC to 'I'
      TYPEOFCUSTOMER: typeOfAccount,
      app_flag: "FLAG_VALUE",
      CHANNEL: "BRA",
      pip: "posting",
      typeofacct: "2",
      legalform: "20",
      acmandate: "003",
      relationdets: relationData,
      branchcode: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
      date: "23-JUL-2023", //JSON.parse(localStorage.getItem("userInfo"))?.postingDate,
      postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
      pterm_id: "001",
      hostname: "Name",
      aml: [
        {
          p_risk_code: "",
          p_pep: "",
          "p_no_withdrawal_month ": "20",
          p_no_deposit_month: "12",
          p_amt_withdrawal_month: "200",
          p_amt_deposit_month: "20000",
        },
      ],
      sourceofwealth: "",
      sourceoffund: "",
      transtype: "",
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END OF FUNCTION TO HANDLE CLEAR TABLES WHEN ACCOUNT IS CREATED /////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// FUNCTION TO HANDLE NEW AFTER THE ACCOUNT IS CREATED. (IF THE USER WANT TO CREATE NEW CUSTOMER)//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleClearNew = () => {
    // Display a SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear the data",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirmed, proceed with clearing the data
        setUserData({
          ...userData,
          typeofC: "I", // Update typeofC to 'I'
        });
        setAllNextOfKingData([]);
        setTableDataNok([]);
        setRelationData([]);
        setData("");
        // setUserData({});
        setCustomername("");
        setCustmerNumber("");
        setAccountNumber("");
        setSettlement("");
        setAllNextOfKingData([]);
        setTableDataNok([]);
        setRelationData([]);
        setData("");
        // setUserData({});
        setCustomername("");
        setCustmerNumber("");
        setAccountNumber("");
        setSettlement("");
        setFormData({
          P_title: "",
          P_gender: "", // Gender is Mandatory
          P_fname: "", // Tin Number is Mandatory
          P_mname: "",
          P_sname: "", // Surname is Mandatory
          P_short_name: "",
          P_alias: "",
          P_tin: "", // Tin Number is Mandatory
          P_preferred_name: "",
          P_dob: "",
          P_country: "", // Country is Mandatory
          P_region: "",
          P_district: "",
          P_location: "",
          P_preferred_lang: "",
          P_minor: "",
          P_Guardian_id: "",
          P_Guardian_type: "",
          P_health_challenge: "",
          P_health_challenge_type: "",
          P_staff_indicator: "",
          P_staff_id: "",
          P_OCCUPATION: "",
          P_OTHER_OCCUPATION: "",
          P_RESIDENT: "",
          P_nATIONALITY: "",
          P_NATIONAL_ID: "",
          P_NIN_dateissued: "",
          P_nin_expiry: "",
          P_ID_type: "",
          P_id_nO: "",
          P_id_issue_at: "",
          P_ID_issued_authority: "",
          P_ID_date_issued: "",
          P_ID_expirydate: "",
          P_Mobile_comm_no: "",
          P_home_phone_type: "",
          P_Home_phone_no: "",
          P_office_phone_type: "",
          P_office_phone_no: "",
          P_Office_email: "",
          P_home_email: "",
          P_enable_IB: "",
          P_enable_MB: "",
          P_enable_ussd: "",
          P_enable_smsalert: "",
          P_enable_emailalert: "",
          P_mobile_bankphoneno: "",
          P_Mobile_bankemail: "",
          P_NOK_fullname: "",
          P_NOK_ID_type: "",
          P_NOK_id_number: "",
          P_NOK_expirydate: "",
          P_NOK_IssueDate: "",
          P_NOK_relationship: "",
          P_NOK_Percent_share: "",
          P_Nok_Relation_type: "",
          P_Curr_addr_region: "",
          P_Curr_addr_hse_typ: "",
          P_Curr_addr_flat_hse_no: "",
          P_Curr_addr_building_name: "",
          P_Curr_addr_streetname: "",
          P_Curr_addr_location: "",
          P_Curr_addr_city: "",
          P_Curr_addr_nearestlandmark: "",
          P_Curr_addr_natureownship: "",
          P_Curr_addr_stayedsince: "",
          P_Curr_addr_costaccomodation: "",
          P_Curr_addr_currentalue: "",
          P_Curr_addr_balancemortgage: "",
          P_Curr_addr_attention_party: "",
          P_Perm_addr_region: "",
          P_perm_addr_hse_typ: "",
          P_perm_addr_flat_hse_no: "",
          P_perm_addr_building_name: "",
          P_perm_addr_streetname: "",
          P_perm_addr_location: "",
          P_perm_addr_city: "",
          P_perm_addr_nearestlandmark: "",
          P_perm_addr_natureownship: "",
          P_perm_addr_stayedsince: "",
          P_perm_addr_costaccomodation: "",
          P_perm_addr_currentalue: "",
          P_perm_addr_balancemortgage: "",
          P_perm_addr_attention_party: "",
          P_type_of_c: "",
          P_OVERRIDE_CODE: "",
          P_SUB_rel: "",
          P_rel_dedup: "",
          p_channel: "",
          p_pterm_id: "",
          p_pip: "",
          username: "",
          hostname: "",
        });
      } else {
        // If the user did not confirm, do nothing
        // You can add additional code here if needed
      }
    });
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// FUNCTION TO HANDLE NEW AFTER THE ACCOUNT IS CREATED. (IF THE USER WANT TO CREATE NEW CUSTOMER)//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [onclickOnrow, setOnclickOnRow] = useState(false);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// THIS FUNCTION HANDLES, ONCLICK ON A ROW IN THE TABLE TO EDIT THE NEW RELATION YOU JUST ENTERED //////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [selectedItem, setSelectedItem] = useState(null);
  // Function to handle row selection and open modal

  const handleRowSelect = (item) => {
    console.log("Selected item:", item);
    setSelectedItem(item);

    // Make API call to fetch additional relation data
    const fetchData = async () => {
      try {
        let data = JSON.stringify({
          relation_no: item || "", // You can adjust the key as needed
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://10.203.14.195:3320/api/relation/get-all-relation",
          headers: {
            "x-api-key":
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "Content-Type": "application/json",
          },
          data: data,
        };

        const response = await axios.request(config);
        const responseData = response.data;

        console.log(
          "API response data:",
          responseData,
          responseData.relationData[0].FIRST_NAME
        );

        // Populate the form fields with both item data and API response
        setAddNewRelation({
          ...add_new_relation,
          // If addresses exist, map them into the state
          title_v: responseData.relationData[0].SUFFIX || "", // TITLE OF THE RELATION
          gender_v: responseData.relationData[0].GENDER || "", // GENDER OF THE RELATION
          fname_v: responseData.relationData[0].FIRST_NAME || "", // FIRST NAME OF THE RELATION
          mname_v: responseData.relationData[0].LAST_NAME || "", // MIDDLE NAME OF THE RELATION
          sname_v: responseData.relationData[0].SURNAME || "", // SURNAME OF THE RELATION
          short_name_v: "", // SHORT NAME OF THE RELATION
          alias_v: "", // ALIAS OF THE RELATION
          tin_v: responseData.relationData[0].TIN || "", // TIN NUMBER OF THE RELATION
          preferred_name_v: "", // PREFERRED NAME OF THE RELATION
          dob_v: formatDate(responseData.relationData[0].DATE_OF_BIRTH) || "", // DATE OF BIRTH OF THE RELATION
          country_v: responseData.relationData[0].DORMICILE_COUNTRY || "", // COUNTRY OF ORIGIN THE RELATION
          region_v: responseData.relationData[0].REGION || "", //////////////////////////// INSERT DIVISION THE RELATION
          district_v: responseData.relationData[0].DISTRICT || "", // DISTRICT IN THE RELATION'S REGION
          location_v: "", // LOCATION OF THE RELATION
          preferred_lang_v: responseData.relationData[0].PREFERED_LANG || "", // PREFERRED LANGUAGE OF THE RELATION
          minor_v: responseData.relationData[0].MINOR || "", // IS THE RELATION A MINOR ?
          Guardian_id_v: responseData.relationData[0].GUARDIAN_ID || "", // IF THE RELATION IS A MINOR THEN PROVIDE THE GUARDIAN ID
          Guardian_type_v: responseData.relationData[0].GUARDIAN_TYPE || "", // PROVIDE THE GUARDIAN TYPE IF THE RELATION IS A MINOR
          health_challenge_v:
            responseData.relationData[0].HEALTH_CHALLENGE || "", // DOES THE RELATION HAS ANY HEALTH CHALLENGE ?
          health_challenge_type_v:
            responseData.relationData[0].H_CHALLENGE_TYPE || "", // IF YES THEN CHOOSE THE TYPE
          staff_indicator_v: responseData.relationData[0].STAFF_CATEGORY || "", // IS THE RELATION A STAFF OF THE BANK ? Y OR N
          staff_id_v: responseData.relationData[0].STAFF_ID || "", // IF Y (YES) THEN PROVIDE THE STAFF ID
          OCCUPATION_V: responseData.relationData[0].PROFESSION || "", // OCCUPATION OR TYPE OF WORK OF THE RELATION
          OTHER_OCCUPATION_V: "", // OTHER OCCUPATION IF THE RELATION'S OCCUPATION IS NOT LISTED IN THE LIST OF VALUE (LOV)
          RESIDENT_V: responseData.relationData[0].RESIDENCE_STATUS || "", // IS THE RELATION A RESIDENT ?
          nATIONALITY_V: "", // IF YES THEN CHOOSE THE COUNTRY
          NATIONAL_ID_V: responseData.relationData[0].NIN || "", // ENTER NATIONAL IDENTIFICATION NUMBER
          NIN_dateissued_v: responseData.relationData[0].NIN_DATE_ISSUE || "", // DATE THE ID CARD WAS GIVEN TO THE RELATION
          nin_expiry_v: responseData.relationData[0].NIN_EXPIRY_DATE || "", // DATE THE ID CARD WILL EXPIRE
          ID_type_v: "", // WHAT IS THE TYPE OF ID
          id_nO_v: "", // OTHER ID NUMBER
          id_issue_at_v: "", // PLACE OTHER ID WAS ISSUED
          ID_issued_authority_v: "", //AUTHORITY THAT ISSUES THE OTHER ID
          ID_date_issued_v: "", // OTHER ID DATE ISSUED
          ID_expirydate_v: "", // OTHER ID DATE EXPIRED
          Mobile_comm_no_v: responseData.relationData[0].MOBILE1 || "", // MOBILE NUMBER OF THE RELATION
          home_phone_type_v: "", // HOME PHONE TYPE OF THE RELATION
          Home_phone_no_v: "", // HOME PHONE NUMBER OF THE RELATION
          office_phone_type_v: "", // OFFICE PHONE TYPE OF THE RELATION
          office_phone_no_v: "", // HOME PHONE NUMBER OF THE RELATION
          Office_email_v: "", // OFFICE EMAIL OF THE RELATION
          home_email_V: responseData.relationData[0].EMAIL_ADDRESS || "", // EMAIL OF THE RELATION
          mobile_bankphoneno_V: "", /////////////////////// STORE MARRITAL STATUS
          Mobile_bankemail_v: "",
          type_of_c_v: "I", // TYPE OF CUSTOMER
          OVERRIDE_CODE_v: "", //////////////////////////// SAVE THE SERIAL NUMBER FOR THE NATIONAL ID NUMBER
          SUB_rel_v: "", ///////////////////////////////// SAVE SUB-LOCATION OF THE LOCATION
          rel_dedup_v: "E",
          p_channel: "",
          p_pterm_id: "",
          p_pip: "",
          cust_no_v: item.CUSTOMER_NUMBER || "", // PASS CUSTOMER NUMBER IF IT WILL BE REUSED AGAIN ELSE PROCEDURE SHOULD RETURN IT
          rel_no_v: "", // RELATION NUMBER
          username_v: "", //
          hostname_v: "",
          P_FLAG: "",
          P_POSTING_BRANCH: "",
          P_POSTED_BY: "", // THE CUSTOMER SERVICE PROVIDER DETAILS SHOULD BE ADDED HERE (NAME)
          P_POSTING_TERMINAL: "",
          P_ACCT_LINK: "",
          P_SMS_ALERT: responseData.eServicesData[0].SMS_ALERT, // Default "No" eServicesData
          P_EMAIL_ALERT: responseData.eServicesData[0].EMAIL_ALERT, // Default "No"
          P_E_STATEMENT: responseData.eServicesData[0].E_STATEMENT, // Default "No"
          P_INTERNET_BANKING: responseData.eServicesData[0].INTERNET_BANKING, // Default "No"
          P_MOBILE_BANKING: responseData.eServicesData[0].MOBILE_BANKING, // Default "No"
          P_ATM_SERVICES: responseData.eServicesData[0].ATM_SERVICES, // Default "No"
          P_ATM_SERVICES_CLOB: [
            {
              accountNumber: "",
              serviceCode: "",
            },
          ], // SERVICECODE IS THE CARD_TYPE IN THE TABLE
          P_SERVICE_CODE: "",
          P_STATEMENT_FREQ: "", // THIS IS EITHER DAILY, WEEKLY, MONTHLY, QUARTERLY, STATE_DATE(START DATE)
          P_CARD_TYPE: "",
          P_DAILY: "N", // Default "No"
          P_WEEKLY: "N", // Default "No"
          P_MONTHLY: "N", // Default "No"
          P_QUARTERLY: "N", // Default "No"
          P_STATE_DATE: "",
          P_END_DATE: "",
          addressData: item.ADDRESSES
            ? item.ADDRESSES.map((address) => ({
                // street: address.street || "",
                // city: address.city || "",
                // country: address.country || "",
                PO_ADDRESS1: address.ADDRESS_TYPE, //PO BOX
                PO_ADDRESS2: "",
                PO_CITY: "", //COUNTY
                STATE: "",
                POSTAL_ZIP_CODE: "",
                COUNTRY_CODE: "",
                PO_ATTENTION_PARTY: "",
                PO_NEAREST_LAND_MARK: "",
                HOUSE_TYPE: "",
                PH_ADDRESS1: "",
                PH_ADDRESS2: "",
                PH_ADDRESS3: "",
                LOCATION: "", // WARD
                PH_CITY: "", // SUB COUNTY
                PH_NEAREST_LAND_MARK: "",
                FAX_NO: "",
                PHONE1: "",
                PHONE2: "",
                NATURE_OF_OWNERSHIP: "",
                STYED_SINCE: "",
                COST_OF_ACCOM: "",
                CURRENT_VALUE: "",
                BALANCE_MORTGUAGE: "",
                PH_ATTENTION_PARTY: "",
                APPROVAL_FLAG: "Y",
                POSTED_BY: "",
                POSTING_TERMINAL: "",
                APPROVED_BY: "",
                BRANCH_CODE: "",
                SRL_NO: "",
                E_MAIL: "",
                ADDRESS_ID: "",
                KYC_FLAG: "Y",
                RENT_PER_ANNUAL: "",
                STAYED_TO: "",
                OWNER_OF_PROPERTY: "",
                ADDRESS_TYPE: "",
                POSTING_SYS_DATE: "",
                POSTING_SYS_TIME: "",
              }))
            : [], // If no addresses, set to an empty array
        });

        // Open the modal
        showNewUserFormF();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Trigger the API call after selecting the row
  };

  // const handleRowSelect = (item) => {
  //   console.log("item", item);
  //   setSelectedItem(item);

  //   // Populate the form fields with the selected item's data
  // setAddNewRelation({
  //   ...add_new_relation,
  //   // If addresses exist, map them into the state
  //   title_v: "", // TITLE OF THE RELATION
  //   gender_v: item.GENDER || "", // GENDER OF THE RELATION
  //   fname_v: item.FIRST_NAME || "", // FIRST NAME OF THE RELATION
  //   mname_v: "", // MIDDLE NAME OF THE RELATION
  //   sname_v: item.SURNAME || "", // SURNAME OF THE RELATION
  //   short_name_v: "", // SHORT NAME OF THE RELATION
  //   alias_v: "", // ALIAS OF THE RELATION
  //   tin_v: item.TIN_NUMBER || "", // TIN NUMBER OF THE RELATION
  //   preferred_name_v: "", // PREFERRED NAME OF THE RELATION
  //   dob_v: item.DATE_OF_BIRTH || "", // DATE OF BIRTH OF THE RELATION
  //   country_v: item.COUNTRY || "", // COUNTRY OF ORIGIN THE RELATION
  //   region_v: "", //////////////////////////// INSERT DIVISION THE RELATION
  //   district_v: "", // DISTRICT IN THE RELATION'S REGION
  //   location_v: "", // LOCATION OF THE RELATION
  //   preferred_lang_v: "", // PREFERRED LANGUAGE OF THE RELATION
  //   minor_v: "N", // IS THE RELATION A MINOR ?
  //   Guardian_id_v: "", // IF THE RELATION IS A MINOR THEN PROVIDE THE GUARDIAN ID
  //   Guardian_type_v: "", // PROVIDE THE GUARDIAN TYPE IF THE RELATION IS A MINOR
  //   health_challenge_v: "", // DOES THE RELATION HAS ANY HEALTH CHALLENGE ?
  //   health_challenge_type_v: "", // IF YES THEN CHOOSE THE TYPE
  //   staff_indicator_v: "", // IS THE RELATION A STAFF OF THE BANK ? Y OR N
  //   staff_id_v: "", // IF Y (YES) THEN PROVIDE THE STAFF ID
  //   OCCUPATION_V: "", // OCCUPATION OR TYPE OF WORK OF THE RELATION
  //   OTHER_OCCUPATION_V: "", // OTHER OCCUPATION IF THE RELATION'S OCCUPATION IS NOT LISTED IN THE LIST OF VALUE (LOV)
  //   RESIDENT_V: "", // IS THE RELATION A RESIDENT ?
  //   nATIONALITY_V: "", // IF YES THEN CHOOSE THE COUNTRY
  //   NATIONAL_ID_V: "", // ENTER NATION IDENTIFICATION NUMBER
  //   NIN_dateissued_v: "", // DATE THE ID CARD WAS GIVEN TO THE RELATION
  //   nin_expiry_v: "", // DATE THE ID CARD WILL EXPIRE
  //   ID_type_v: "", // WHAT IS THE TYPE OF ID
  //   id_nO_v: "", // OTHER ID NUMBER
  //   id_issue_at_v: "", // PLACE OTHER ID WAS ISSUED
  //   ID_issued_authority_v: "", //AUTHORITY THAT ISSUES THE OTHER ID
  //   ID_date_issued_v: "", // OTHER ID DATE ISSUED
  //   ID_expirydate_v: "", // OTHER ID DATE EXPIRED
  //   Mobile_comm_no_v: item.MOBILE_NUMBER || "", // MOBILE NUMBER OF THE RELATION
  //   home_phone_type_v: "", // HOME PHONE TYPE OF THE RELATION
  //   Home_phone_no_v: "", // HOME PHONE NUMBER OF THE RELATION
  //   office_phone_type_v: "", // OFFICE PHONE TYPE OF THE RELATION
  //   office_phone_no_v: "", // HOME PHONE NUMBER OF THE RELATION
  //   Office_email_v: "", // OFFICE EMAIL OF THE RELATION
  //   home_email_V: item.EMAIL || "", // EMAIL OF THE RELATION
  //   mobile_bankphoneno_V: "", /////////////////////// STORE MARRITAL STATUS
  //   Mobile_bankemail_v: "",
  //   type_of_c_v: "I", // TYPE OF CUSTOMER
  //   OVERRIDE_CODE_v: "", //////////////////////////// SAVE THE SERIAL NUMBER FOR THE NATIONAL ID NUMBER
  //   SUB_rel_v: "", ///////////////////////////////// SAVE SUB-LOCATION OF THE LOCATION
  //   rel_dedup_v: "E",
  //   p_channel: "",
  //   p_pterm_id: "",
  //   p_pip: "",
  //   cust_no_v: item.CUSTOMER_NUMBER || "", // PASS CUSTOMER NUMBER IF IT WILL BE REUSED AGAIN ELSE PROCEDURE SHOULD RETURN IT
  //   rel_no_v: "", // RELATION NUMBER
  //   username_v: "", //
  //   hostname_v: "",
  //   P_FLAG: "",
  //   P_POSTING_BRANCH: "",
  //   P_POSTED_BY: "", // THE CUSTOMER SERVICE PROVIDER DETAILS SHOULD BE ADDED HERE (NAME)
  //   P_POSTING_TERMINAL: "",
  //   P_ACCT_LINK: "",
  //   P_SMS_ALERT: "N", // Default "No"
  //   P_EMAIL_ALERT: "N", // Default "No"
  //   P_E_STATEMENT: "N", // Default "No"
  //   P_INTERNET_BANKING: "N", // Default "No"
  //   P_MOBILE_BANKING: "N", // Default "No"
  //   P_ATM_SERVICES: "N", // Default "No"
  //   P_ATM_SERVICES_CLOB: [{ accountNumber: "", serviceCode: "" }], // SERVICECODE IS THE CARD_TYPE IN THE TABLE
  //   P_SERVICE_CODE: "",
  //   P_STATEMENT_FREQ: "", // THIS IS EITHER DAILY, WEEKLY, MONTHLY, QUARTERLY, STATE_DATE(START DATE)
  //   P_CARD_TYPE: "",
  //   P_DAILY: "N", // Default "No"
  //   P_WEEKLY: "N", // Default "No"
  //   P_MONTHLY: "N", // Default "No"
  //   P_QUARTERLY: "N", // Default "No"
  //   P_STATE_DATE: "",
  //   P_END_DATE: "",
  //   addressData: item.ADDRESSES
  //     ? item.ADDRESSES.map((address) => ({
  //         // street: address.street || "",
  //         // city: address.city || "",
  //         // country: address.country || "",
  //         PO_ADDRESS1: address.PO_ADDRESS1, //PO BOX
  //         PO_ADDRESS2: "",
  //         PO_CITY: "", //COUNTY
  //         STATE: "",
  //         POSTAL_ZIP_CODE: "",
  //         COUNTRY_CODE: "",
  //         PO_ATTENTION_PARTY: "",
  //         PO_NEAREST_LAND_MARK: "",
  //         HOUSE_TYPE: "",
  //         PH_ADDRESS1: "",
  //         PH_ADDRESS2: "",
  //         PH_ADDRESS3: "",
  //         LOCATION: "", // WARD
  //         PH_CITY: "", // SUB COUNTY
  //         PH_NEAREST_LAND_MARK: "",
  //         FAX_NO: "",
  //         PHONE1: "",
  //         PHONE2: "",
  //         NATURE_OF_OWNERSHIP: "",
  //         STYED_SINCE: "",
  //         COST_OF_ACCOM: "",
  //         CURRENT_VALUE: "",
  //         BALANCE_MORTGUAGE: "",
  //         PH_ATTENTION_PARTY: "",
  //         APPROVAL_FLAG: "Y",
  //         POSTED_BY: "",
  //         POSTING_TERMINAL: "",
  //         APPROVED_BY: "",
  //         BRANCH_CODE: "",
  //         SRL_NO: "",
  //         E_MAIL: "",
  //         ADDRESS_ID: "",
  //         KYC_FLAG: "Y",
  //         RENT_PER_ANNUAL: "",
  //         STAYED_TO: "",
  //         OWNER_OF_PROPERTY: "",
  //         ADDRESS_TYPE: "",
  //         POSTING_SYS_DATE: "",
  //         POSTING_SYS_TIME: "",
  //       }))
  //     : [], // If no addresses, set to an empty array
  // });

  //   // Open the modal
  //   // setShowModal(true);
  //   showNewUserFormF();
  // };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// END THIS FUNCTION HANDLES, ONCLICK ON A ROW IN THE TABLE TO EDIT THE NEW RELATION YOU JUST ENTERED //////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// THIS FUNCTION HANDLES, ONCLICK ON A THE EDIT BUTTON /////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// THIS FUNCTION HANDLES, ONCLICK ON A THE EDIT BUTTON /////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// THIS FUNCTION HANDLES DELETE ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const handleDelete = (selectedIndex) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "This action cannot be undone.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "Cancel",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const updatedData = relationData.filter(
  //         (i, key) => key !== selectedIndex
  //       );
  //       setRelationData(updatedData);
  //       console.log("-_-_-_-_-_-_-_-_-", updatedData, selectedIndex);
  //     }
  //   });
  // };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// END FUNCTION HANDLES DELETE ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // const [accountDetailsData, setAccountDetailsData] = useState({
  //   // sacco:'',
  //   fxcategory: "",
  //   relationManager: "",
  //   productGroup: "",
  //   productSubGroup: "",
  //   currencies: "010",
  //   customerSegment: "",
  //   customerSubSegment: "",
  //   documentRequiredType: "",
  //   introductorySource: "",
  //   sector: "",
  //   subSector: "",
  //   memberType: "M",
  //   saccoMember: "BOSA",
  // });

  const [accountDetailsData, setAccountDetailsData] = useState({
    fxcategory: "",
    relationManager: "",
    productGroup: "",
    productSubGroup: "",
    currencies: "010",
    customerSegment: "",
    customerSubSegment: "",
    documentRequiredType: "", // Initialized as an array
    introductorySource: "",
    sector: "",
    subSector: "",
    memberType: "M",
    saccoMember: "BOSA",
  });

  const [accountReferee, setAccountReferee] = useState({
    typesOfReferees_v: "O",
    acctno_v: "",
    bankName_v: "",
    acctName_v: "",
    residentAddr_v: "",
    emailAddr_v: "",
    relationship_v: "",
    NoOfYears_v: "",
    phoneno_v: "",
  });

  sessionStorage.setItem(
    "accountDetailsData",
    JSON.stringify(accountDetailsData)
  );

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// HANDLE RADIO ONCHANGE FUNCTION //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleRadioChangeMember = (e) => {
    const selectedValue = e.target.value;
    setAccountDetailsData({ ...accountDetailsData, sacco: selectedValue });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// HANDLE CUSTTYPE ONCHANGE FUNCTION ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleCustTypeChange = (value) => {
    setAccountDetailsData((prev) => ({ ...prev, documentRequiredType: value }));
    setCustType(value);
    if (value) {
      fetchData(value);
    }

    setTimeout(() => {
      const input = document.getElementById("introSource");
      input.focus();
    }, 0);
  };

  // const handleCustTypeChange = (value) => {
  //   setAccountDetailsData((prev) => ({
  //     ...prev,
  //     documentRequiredType: [...prev.documentRequiredType, value], // Append the new value to the array
  //   }));
  //   setCustType(value);

  //   if (value) {
  //     fetchData(value);
  //   }

  //   setTimeout(() => {
  //     const input = document.getElementById("introSource");
  //     input.focus();
  //   }, 0);
  // };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// HANDLE ACCOUNT ONCHANGE FUNCTION //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [acMandate, setAcMandate] = useState("");
  const handleAccountMandate = (value) => {
    setAcMandate(value);
  };

  console.warn("mandate", acMandate);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// THE DOCUMENT SECTION //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [arrayDocs, setArrayDocs] = useState("");
  const [docsId, setDocID] = useState("");

  const handleChangeDocs = (e, index, alphabet) => {
    const newarr = [...arrayDocs];

    newarr.map((i, key) => {
      if (key === index) {
        if (alphabet === "a") {
          i.P_doc_no = e.target.value;
          setDocID(i.P_doc_no);
          // setArrayDocs((prev) => ([...prev, {...prev[key], P_doc_no:e.target.value}]))
        } else if (alphabet === "b") {
          i.P_doc_date = formatDate(e.target.value);
          // setArrayDocs((prev) => ([...prev, {...prev[key], P_doc_date:e.target.value}]))
        } else if (alphabet === "c") {
          i.P_received_date = formatDate(e.target.value);
        } else if (alphabet === "d") {
          i.P_received = e.target.checked ? "Y" : "N";
        }
      }
    });
    setArrayDocs(newarr);
    setUserData((prev) => ({ ...prev, p_documents: newarr }));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// END OF DOCUMENT SECTION /////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// GET DOCUMENTS ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const fetchData = async (val) => {
    try {
      const data = {
        cust_type: val,
      };

      const response = await fetch(API_SERVER + "/api/documents/user", {
        method: "POST",
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("My Document:::", JSON.stringify(responseData));

      const arr = [];
      responseData.responseMessage.map((item) => {
        arr.push({
          P_sr_no: item.sr_no,
          P_document_code: item.doc_code,
          P_mandatory: item.mandate,
          P_doc_no: "",
          P_doc_date: "",
          P_received_date: "",
          P_received: "",
        });
      });
      setArrayDocs(arr);
      setData(responseData.responseMessage);
    } catch (error) {
      // console.log(error);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// END GET DOCUMENTS ///////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Define a state for error messages
  const [errors, setErrors] = useState({});

  // Function to set an error message in the state
  const setErrorTest = (fieldName, errorMessage) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  // Function to clear an error message from the state
  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// FUNCTION TO VALIDATE MY INPUT FIELDS ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleChange = (name, value) => {
    if (name === "P_fname") {
      // Replace 'fieldName' with the actual name of the input field
      value = value.replace(/\d/g, ""); // Remove all digits from the input value
      if (value.trim() === "") {
        setErrorTest("P_fname", "Please enter First name");
      } else {
        // Clear the error message if the value is valid
        clearError("P_fname");
      }
    }

    if (name === "P_mname") {
      // Replace 'fieldName' with the actual name of the input field
      value = value.replace(/\d/g, ""); // Remove all digits from the input value
    }

    if (name === "P_sname") {
      // Replace 'fieldName' with the actual name of the input field
      value = value.replace(/\d/g, ""); // Remove all digits from the input value
      if (value.trim() === "") {
        setErrorTest("P_sname", "Please enter Surname");
      } else {
        // Clear the error message if the value is valid
        clearError("P_sname");
      }
    }

    if (name === "P_dob") {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      if (selectedDate > currentDate) {
        // If the selected date is in the future, clear the input field and show a SweetAlert message
        Swal.fire({
          icon: "error",
          title: "Invalid Date",
          text: "Please select a date in the past or present.",
        });
        value = "";
      } else {
        const yearsDifference =
          currentDate.getFullYear() - selectedDate.getFullYear();
        if (yearsDifference <= 18) {
          // If the user is 18 years old or younger, show an alert indicating they are a minor
          Swal.fire({
            icon: "info",
            // title: 'Minor Alert',
            text: "INF-00634 : This is a minor",
          });
        }
      }
    }
    // Convert the date to the required format before updating formData
    if (name === "p_date_ofincorp") {
      value = formatDate(value);
    }
    // Validation for p_corp_tinno field
    // Add validation here for p_corp_tinno
    if (name === "p_corp_tinno") {
      // Basic validation: Check if the value is not empty
      if (value.trim() === "") {
        setErrorTest("p_corp_tinno", "Please enter a KRA PIN");
      } else if (value.length < 11) {
        setErrorTest(
          "p_corp_tinno",
          "KRA PIN shouldn't be less than 11 digits"
        );
      } else if (value.length > 11) {
        setErrorTest("p_corp_tinno", "KRA PIN must be up to 11 digits");
      } else if (value.length === 11) {
        setErrorTest("p_corp_tinno", "Valid PIN");
        clearError("p_corp_tinno");
      } else {
        // Clear the error message if the value is valid
        clearError("p_corp_tinno");
      }
    }

    // Validation for P_Office_email field
    if (name === "P_Office_email") {
      // Basic validation: Check if the value is not empty
      if (value.trim() === "") {
        setErrorTest("P_Office_email", "Please enter an email address");
      } else if (!isValidEmail(value)) {
        setErrorTest("P_Office_email", "Invalid email format");
        console.log("Work !!!");
      } else {
        // Clear the error message if the value is valid
        clearError("P_Office_email");
      }
    }

    // Validation for P_home_email field
    if (name === "P_home_email") {
      // Basic validation: Check if the value is not empty
      if (value.trim() === "") {
        setErrorTest("P_home_email", "Please enter an email address");
      } else if (!isValidEmail(value)) {
        setErrorTest("P_home_email", "Invalid email format");
        console.log("Work !!!");
      } else {
        // Clear the error message if the value is valid
        clearError("P_home_email");
      }
    }

    // For other fields, directly update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// END VALIDATIONS ON MY INPUT FIELDS //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Function to validate email format
  const isValidEmail = (email) => {
    // Use a regular expression to check email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // console.log("Value:::accountDetailsData", accountDetailsData)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// DATE FUNCTION //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const formatMonth = (month) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthNames[month];
  };

  // const formatDateDoB = (dateString) => {
  //   const inputDate = new Date(dateString);
  //   const currentDate = new Date();

  //   if (inputDate > currentDate) {
  //     throw new Error("Cannot format a future date.");
  //   }

  //   const formattedDate = `${inputDate.getDate()}-${formatMonth(
  //     inputDate.getMonth()
  //   )}-${inputDate.getFullYear()}`;
  //   return formattedDate;
  // };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// END DATE FUNCTION ///////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [randomNumberString, setRandomNumberString] = useState("");

  useEffect(() => {
    generateRandomNumberString();
  }, []);

  const generateRandomNumberString = () => {
    const randomNumbers = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    setRandomNumberString(randomNumbers);
  };

  // const generateRandomNumber = () => {
  //   const length = 12; // Desired length of the random number
  //   let randomNumber = '';

  //   for (let i = 0; i < length; i++) {
  //     const digit = Math.floor(Math.random() * 10); // Generate a random digit
  //     randomNumber += digit.toString(); // Append the digit to the random number
  //   }

  //   return randomNumber;
  // };

  //////////////////////////////////////////////////////////////////
  const [responseData, setResponseData] = useState(null);

  async function generateRandomNumber() {
    const data = JSON.stringify({
      email: "godfreyKt@gmail.com",
      password: "123456",
      name: "Godfrey Kwame",
    });

    try {
      const response = await axios.get(API_SERVER + "/api/get-relation-no", {
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
      });
      console.log(response, "ppp");
      return response.data?.GET_RELATIONO;
    } catch (e) {
      console.log(e);
    }
    return;
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////
  const [finalRelation, setFinalRelation] = useState("");

  console.log("finalRelation::: ", finalRelation);

  const [savedData, setSavedData] = useState([]);

  const storeDataInSessionStorage = (event) => {
    event.preventDefault();

    // Perform basic validations
    if (
      !accountReferee.typesOfReferees_v ||
      !accountReferee.acctno_v
      // !accountReferee.bankName_v
      // !accountReferee.acctName_v ||
      // !accountReferee.residentAddr_v ||
      // !accountReferee.emailAddr_v ||
      // !accountReferee.relationship_v ||
      // !accountReferee.NoOfYears_v ||
      // !accountReferee.phoneno_v
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    // Create a copy of the current data
    const newData = { ...accountReferee };

    // Add the new data to the savedData array
    setSavedData((prevData) => [...prevData, newData]);

    // Validation passed, store data in sessionStorage
    sessionStorage.setItem("accountReferees", JSON.stringify(accountReferee));

    // Reset the form fields
    setAccountReferee({
      typesOfReferees_v: "",
      acctno_v: "",
      bankName_v: "",
      acctName_v: "",
      residentAddr_v: "",
      emailAddr_v: "",
      relationship_v: "",
      NoOfYears_v: "",
      phoneno_v: "",
    });
  };

  useEffect(() => {
    sessionStorage.setItem("savedData", JSON.stringify(savedData));
  }, [savedData]);

  useEffect(() => {
    const storedDataReferee = sessionStorage.getItem("savedData");
    if (storedDataReferee) {
      setSavedData(JSON.parse(storedDataReferee));
    }
  }, []);

  // const getaccountReferee = JSON.parse(sessionStorage.getItem('accountReferees'));

  // console.log("getsession:::", savedData)

  const getStoredData = () => {
    const storedData = sessionStorage.getItem("formData");
    if (storedData) {
      return JSON.parse(storedData);
    }

    return null;
  };

  // useEffect(() => {
  //   setStoredFormData(getStoredData() || []);
  // }, []);

  // useEffect(() => {
  //   // Update local storage whenever stored form data changes
  //   sessionStorage.setItem('formData', JSON.stringify(storedFormData));
  // }, [storedFormData]);

  // const storedFormData = getStoredData();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const FinalDataToDatabase = {
    anotherData: {
      data,
      savedData,
      ...formData,
    },
    formData,
    savedData,
    data,
  };

  const BasicData = sessionStorage.getItem("formData");

  // console.log('BasicData from SessionStorage:::', formData)

  //////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  const [userDataResponse, setUserDataResponse] = useState("");

  const [custmerNumber, setCustmerNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [settlement, setSettlement] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    // Add more checkboxes as needed
  });

  const [customername, setCustomername] = useState("");
  const [typeOfAccount, setTypeOfAccount] = useState("ID");
  const [tableDataSmall, setTableDataSmall] = useState([]);
  const [numRows, setNumRows] = useState(1);
  const [isNumberEntered, setIsNumberEntered] = useState(false);

  const [showInput, setShowInput] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // const handleOptionHeader = (event) => {
  // if (event.target.value === 'JT') {
  //   setShowTable(true);
  //   setShowInput(true);
  // } else {
  //   setShowTable(false);
  //   setShowInput(false);
  // }

  // const handleNumRowsChange = (event) => {
  //   const value = parseInt(event.target.value, 10);
  //   setNumRows(value);
  //   setTableDataSmall(Array.from({ length: value }, () => ({})));
  //   setIsNumberEntered(!Number.isNaN(value));
  //   setShowPopup(true);
  // };

  const handleNumRowsChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    if (!isNaN(inputValue) && inputValue > 0) {
      setNumRows(inputValue);
    }
  };

  // const validateInput = () => {
  //   if (typeOfAccount === 'JT' && relationData.length !== numRows) {
  //     setShowPopup(true);
  //     Swal.fire({
  //       icon: 'info',
  //       title: '',
  //       text: 'Add another Relation',
  //     });
  //   } else {
  //     setShowPopup(false);
  //   }
  // };
  // };
  const [message, setMessage] = useState("");
  const [displayValidData, setDisplayValidData] = useState("");

  // Define a function to check the value in the database
  const checkValueInDatabase = async () => {
    try {
      const dynamicNumber = formData.P_NATIONAL_ID;

      const response = await axios.post(
        API_SERVER + "/api/get-id-number-validation",
        { dynamicNumber: dynamicNumber },
        {
          headers: {
            "x-api-key":
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log("get-id-number-validation", response.data);
      if (response.status === 200) {
        // Value already exists in the database
        // setMessage(response.data.data);
        setMessage("User Exist");

        setTimeout(() => {
          setMessage("");
        }, 5000);
        setIsModalOpen(true);
        // console.warn(response.data[0])
        setDisplayValidData(response.data[0]);
      } else {
        setMessage("Valid User");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Internal Server Error");
    }
  };

  const [dynamicNumber, setDynamicNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userExists, setUserExists] = useState("");
  const [userDataValidation, setUserDataValidation] = useState({});
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to close the modal
  const closeModal = () => {
    setUserExists(false);
    setIsModalOpen(false);
  };

  const [isValid, setIsValid] = useState(false);

  const handleBlurValidation = async () => {
    if (dynamicNumber.trim() === "") return;

    setIsLoading(true);

    const data = JSON.stringify({
      dynamicNumber: dynamicNumber,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API_SERVER + "/api/get-user-data",
      headers: {
        "x-api-key":
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoading(false);
        const responseData = response.data;
        if (responseData.userExists) {
          setUserExists(true);
          setIsValid(false);
          setUserDataValidation(responseData.userData);
          console.warn("responseData.userData =", responseData.userData);
        } else {
          setIsValid(true);
          setUserExists(false);
          setFormData((prev) => ({ ...prev, P_NATIONAL_ID: dynamicNumber }));
        }
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  const handleSubmitValidation = () => {
    // You can submit the data with a flag 'Y' if the user exists
    // For now, let's just log the flag
    console.log(userExists ? "Y" : "N");
  };

  // This function will be called when the button is clicked
  const handleCheckValueClick = () => {
    if (formData.P_NATIONAL_ID) {
      checkValueInDatabase();
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const handleChangeCustomername = (event) => {
  //   setCustomername(event.target.value);
  // };
  const handleChangeCustomername = (event) => {
    const value = event.target.value;
    setCustomername(value);

    // Disable the button if the input is empty
    setIsButtonDisabled(value.trim() === "");
  };

  // const handleChangeTypeOfAccount = (event) => {
  //   if (event.target.value === "ID") {
  //     setRelationData([]);
  //   }
  //   setTypeOfAccount(event.target.value);
  //   setNumRows("");
  // };

  useEffect(() => {
    if (typeOfAccount === "ID") {
      setAcMandate("001"); // Automatically set mandate to "001" if ID
    }
  }, [typeOfAccount]);

  const handleChangeTypeOfAccount = (event) => {
    const selectedType = event.target.value;

    // Check if switching to Individual and if there are multiple rows in the table
    if (selectedType === "ID" && insertedData.length > 1) {
      // Notify the user they cannot switch to Individual
      swal({
        title: "Cannot Switch to Individual",
        text: "INFO - 002333: You cannot switch to Individual account while there are multiple rows. Please delete extra rows.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      return; // Prevent the change
    }

    // If selected type is Joint, prompt the user to add more relation details
    if (selectedType === "JTT") {
      swal({
        title: "Switching to Joint Account",
        text: "INFO - 002334: Please make sure to add more than one relation detail.",
        icon: "info",
        buttons: true,
      });
    }

    // If selected type is ID, clear relationData
    if (selectedType === "ID") {
      setRelationData([]); // Clear the data for Individual account
    }

    // Update the account type and reset number of rows
    setTypeOfAccount(selectedType);
    setNumRows(""); // Reset number of rows
  };

  console.log("...", typeOfAccount);

  console.log("-------------------", typeOfAccount);

  // const [userData, setUserData] = useState({
  //   app_flag: "FLAG_VALUE",
  //   typeofC: "I",
  //   TYPEOFCUSTOMER: typeOfAccount,
  //   customername: customername,
  //   typeofacct: "2",
  //   legalform: "20",
  //   currencycode: accountDetailsData.currencies,
  //   CHANNEL: "BRA",
  //   armcode: "001",
  //   introsource: "P1990007", //accountDetailsData.introductorySource, //"P1990007",
  //   SECTOR: accountDetailsData.sector,
  //   subSECTOR: "0101", //accountDetailsData.subSector,
  //   Segment: accountDetailsData.customerSegment,
  //   subsegment: accountDetailsData.customerSubSegment,
  //   fxcategory: accountDetailsData.fxcategory,
  //   acmandate: "003",
  //   documentreq_type: accountDetailsData.documentRequiredType,
  //   relationdets: relationData,
  //   accountrelations: "",
  //   documents: [
  //     {
  //       P_sr_no: "1",
  //       P_document_code: "587",
  //       P_mandatory: "N",
  //       P_doc_no: "334567",
  //       P_doc_date: "01-AUG-2023",
  //       P_received_date: "02-SEP-2023",
  //       P_received: "Y",
  //     },
  //   ],
  //   accountreferee: [
  //     {
  //       P_acct_link: "0040023354677554",
  //       p_bank_name: "002",
  //       p_fullname: "Godfrey sis",
  //       p_phone: "0550724745",
  //       p_email_address: "god@gmail.com",
  //       p_resident_address: "mz/an 20",
  //       p_relationship: "004",
  //       p_relationship_yrs: "20",
  //       p_referee_status: "O",
  //     },
  //   ],
  //   // aml: antiMoneyLData,
  //   aml: [
  //     {
  //       p_risk_code: "",
  //       p_pep: "",
  //       p_no_withdrawal_month: "20",
  //       p_no_deposit_month: "12",
  //       p_amt_withdrawal_month: "200",
  //       p_amt_deposit_month: "20000",
  //     },
  //   ],
  //   sourceofwealth: "",
  //   sourceoffund: "",
  //   transtype: "",
  //   nok: allNextOfKingData,
  //   address: refinedData,
  //   branchcode: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
  //   date: "23-JUL-2023", //JSON.parse(localStorage.getItem("userInfo"))?.postingDate,
  //   postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
  //   pterm_id: "001",
  //   pip: "posting",
  //   hostname: "Name",
  // });

  useEffect(() => {
    setUserData((prev) => ({ ...prev, address: refinedData }));
  }, [refinedData]);

  // const updateTypeOfC = () => {
  //   setUserData({
  //     ...userData,
  //     typeofC: "I", // Update typeofC to 'I'
  //   });

  //   console.warn("userData.typeofC:::", userData.typeofC);
  // };

  useEffect(() => {
    setUserData((prev) => ({ ...prev, nok: allNextOfKingData }));
  }, [allNextOfKingData]);

  // useEffect(() => {
  //   setUserData((prev) => ({ ...prev, nok: allNextOfKingData }));
  // }, [allNextOfKingData]);

  // useEffect(() => {
  //   setUserData((prev)=> ({...prev,
  //     aml:antiMoneyLData,
  //   }))
  // },[antiMoneyLData])

  // useEffect(() => {
  //   setUserData((prev) => ({
  //     ...prev,
  //     SECTOR: accountDetailsData.sector,
  //     productGroup: "2",
  //     productSubGroup: "220",
  //     subSECTOR: accountDetailsData.subSector,
  //     Segment: accountDetailsData.customerSegment,
  //     subsegment: accountDetailsData.customerSubSegment,
  //     documentreq_type: accountDetailsData.documentRequiredType,
  //     currencycode: accountDetailsData.currencies,
  //     introsource: accountDetailsData.introductorySource,
  //     armcode: accountDetailsData.relationManager,
  //     fxcategory: accountDetailsData.fxcategory,
  //   }));
  // }, [accountDetailsData]);

  // const handleCheckboxChange = (name, checked) => {
  //   setConfirmationData((prevData) => ({
  //     ...prevData,
  //     [name]: checked,
  //   }));
  // };

  const handleFinalChange = (e) => {
    e.preventDefault();

    const emptyFields = [];

    if (userData.TYPEOFCUSTOMER === "") {
      emptyFields.push("Type of Customer");
    }

    if (userData.customername === "") {
      emptyFields.push("Member Account Name");
    }

    if (userData.currencycode === "") {
      emptyFields.push("Currency Code");
    }

    // Add more conditions for other required fields

    if (emptyFields.length > 0) {
      // Construct the alert message with the list of empty fields
      const alertMessage = `${emptyFields.join(", ")} Is Mandatory`;

      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: alertMessage,
      });
    } else {
      setShowModal(true); // Show the modal when the form is submitted

      const arr = [];

      savedData.map((item, index) => {
        arr.push({
          P_acct_link: item.acctno_v,
          p_bank_name: item.bankName_v,
          p_fullname: item.acctName_v,
          p_phone: item.phoneno_v,
          p_email_address: item.emailAddr_v,
          p_resident_address: item.residentAddr_v,
          p_relationship: item.relationship_v,
          p_relationship_yrs: item.NoOfYears_v,
          p_referee_status: item.typesOfReferees_v,
        });
      });

      setUserData((prev) => ({ ...prev, accountreferee: arr }));
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////  Final Function to open the account for individual //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////// End of Function ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [formDataShares, setFormDataShares] = useState({
    CUSTOMER_NUMBER: "",
    ACCOUNT_ID: "004002",
    CERTICATE_ID: "0040023",
    P_TYPE_OF_SHARE: "Issued shares",
    P_TRANSACTION_TYPE: "",
    P_SECURITY_TYPE_ID: "Ordinary shares",
    P_SECURITY: "",
    P_CERTIFICATE_NO: "",
    P_NO_SHARES: "",
    P_RESTRICTION: "",
    P_STOP: "",
    P_NO_OF_TAX_LOTS: "",
    P_REASON_FOR_REVERSE: "",
    P_REASON_FOR_TRANSFER: "",
    P_DATE_OF_GIFT: "",
    P_FAIR_MARKET_VALDATE_GIFT: "",
    P_DATE_OF_DEATH: "",
    P_FAIR_MARKET_VALDATE_DEATH: "",
    P_BASE_ON_LEVEL: "",
    P_CANCEL_SPLIT_ZEROSHARES: "",
    P_TOTAL_NO_SHARES: "",
    P_DATE: "",
    P_TOTAL_NO_OF_SHAREHOLDERS: "",
    POSTED_BY: "",
    POSTING_DATE: "",
    ISSUE_DATE: "",
    STATUS: "",
    SUBMITTED: "",
    APPROVED_BY: "",
    APPROVAL_DATE: "",
    AMENDED_DATE: "",
    AMENDED_BY: "",
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// Function to handle shares //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmitShares = async (e) => {
    console.log("Shares::: == ", formDataShares);

    e.preventDefault();

    try {
      let data = JSON.stringify(formDataShares);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3320/api/insertFormData",
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify("Shares::: == ", response.data));

      // Reset the form fields
      setFormDataShares({
        // CUSTOMER_NUMBER: '',
        ACCOUNT_ID: "",
        CERTICATE_ID: "",
        P_TYPE_OF_SHARE: "",
        P_TRANSACTION_TYPE: "",
        P_SECURITY_TYPE_ID: "",
        P_SECURITY: "",
        P_CERTIFICATE_NO: "",
        P_NO_SHARES: "",
        P_RESTRICTION: "",
        P_STOP: "",
        P_NO_OF_TAX_LOTS: "",
        P_REASON_FOR_REVERSE: "",
        P_REASON_FOR_TRANSFER: "",
        P_DATE_OF_GIFT: "",
        P_FAIR_MARKET_VALDATE_GIFT: "",
        P_DATE_OF_DEATH: "",
        P_FAIR_MARKET_VALDATE_DEATH: "",
        P_BASE_ON_LEVEL: "",
        P_CANCEL_SPLIT_ZEROSHARES: "",
        P_TOTAL_NO_SHARES: "",
        P_DATE: "",
        P_TOTAL_NO_OF_SHAREHOLDERS: "",
        POSTED_BY: "",
        POSTING_DATE: "",
        ISSUE_DATE: "",
        STATUS: "",
        SUBMITTED: "",
        APPROVED_BY: "",
        APPROVAL_DATE: "",
        AMENDED_DATE: "",
        AMENDED_BY: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// End of Function to handle shares ///////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleChangeShares = (e) => {
    const { name, value } = e.target;
    setFormDataShares((prevData) => ({ ...prevData, [name]: value }));
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// Validation Modal //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModalValidation = () => {
    setModalIsOpen(false);
  };

  const [relData, setRelData] = useState("");
  console.log({ relData, relationData }, "gh");

  const addValidationData = async (row) => {
    if (
      relationData.length === parseFloat(numRows) &&
      typeOfAccount === "PRE"
    ) {
      Swal.fire({
        title: "Info",
        text: "To add any more relations, you must increase the number of relation.",
        icon: "info",
      });
      return;
    } else if (relationData.length === 1 && typeOfAccount === "ID") {
      Swal.fire({
        title: "Info",
        text: "Individual details cannot exceed 1",
        icon: "info",
      });
      return;
    }

    if (typeOfAccount === "I") {
      const response = await axios.post(
        API_SERVER + "/api/get-individual-validation",
        { relation_no: row?.relation_no },
        {
          headers: {
            "x-api-key":
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "Content-Type": "application/json",
          },
        }
      );

      // const validationDate1 = formatDate(row?.date_of_birth)
      const validationDate1 = formatDate(row?.date_of_birth);
      const validationDate2 = formatDate(row?.nin_date_issue);
      const validationDate3 = formatDate(row?.nin_date_issue);

      // return console.log({row , response} , "people")

      if (response.data[0] === 0) {
        setRelationData((prev) => [
          ...prev,
          {
            randomNumberString: row?.relation_no,
            P_title: row?.suffix,
            P_gender: row?.gender, // Gender is Mandatory
            P_fname: row?.first_name, // Tin Number is Mandatory
            P_mname: row?.other_name,
            P_sname: row?.surname, // Surname is Mandatory
            P_short_name: "",
            P_alias: row?.alias_name,
            P_tin: row?.tin, // Tin Number is Mandatory
            P_preferred_name: "",
            P_dob: validationDate1,
            P_country: row?.dormicile_country, // Country is Mandatory
            P_region: "",
            P_district: "",
            P_location: row?.location,
            P_preferred_lang: "",
            P_minor: row?.minor,
            P_Guardian_id: row?.guardian_id,
            P_Guardian_type: row?.guardian_type,
            P_health_challenge: "N", //row?.h_challenge_type,
            P_health_challenge_type: "001", //row?.health_challenge,
            P_staff_indicator: row?.staff_category,
            P_staff_id: row?.staff_id,
            P_OCCUPATION: row?.profession,
            P_OTHER_OCCUPATION: "",
            P_RESIDENT: "",
            P_nATIONALITY: row?.nationality,
            P_NATIONAL_ID: row?.nin,
            P_NIN_dateissued: validationDate2,
            P_nin_expiry: validationDate3,
            P_ID_type: "",
            P_id_nO: "0000000001",
            P_id_issue_at: "",
            P_ID_issued_authority: "",
            P_ID_date_issued: "",
            P_ID_expirydate: "",
            P_Mobile_comm_no: `${row?.mobile1}`,
            P_home_phone_type: "",
            P_Home_phone_no: "",
            P_office_phone_type: "",
            P_office_phone_no: "",
            P_Office_email: "",
            P_home_email: "",
            P_enable_IB: "",
            P_enable_MB: "",
            P_enable_ussd: "",
            P_enable_smsalert: "",
            P_enable_emailalert: "",
            P_mobile_bankphoneno: "",
            P_Mobile_bankemail: "",
            P_NOK_fullname: "",
            P_NOK_ID_type: "",
            P_NOK_id_number: "",
            P_NOK_expirydate: "",
            P_NOK_IssueDate: "",
            P_NOK_relationship: "",
            P_NOK_Percent_share: "",
            P_Nok_Relation_type: "",
            P_Curr_addr_region: "",
            P_Curr_addr_hse_typ: "",
            P_Curr_addr_flat_hse_no: "",
            P_Curr_addr_building_name: "",
            P_Curr_addr_streetname: "",
            P_Curr_addr_location: "",
            P_Curr_addr_city: "",
            P_Curr_addr_nearestlandmark: "",
            P_Curr_addr_natureownship: "",
            P_Curr_addr_stayedsince: "",
            P_Curr_addr_costaccomodation: "",
            P_Curr_addr_currentalue: "",
            P_Curr_addr_balancemortgage: "",
            P_Curr_addr_attention_party: "",
            P_Perm_addr_region: "",
            P_perm_addr_hse_typ: "",
            P_perm_addr_flat_hse_no: "",
            P_perm_addr_building_name: "",
            P_perm_addr_streetname: "",
            P_perm_addr_location: "",
            P_perm_addr_city: "",
            P_perm_addr_nearestlandmark: "",
            P_perm_addr_natureownship: "",
            P_perm_addr_stayedsince: "",
            P_perm_addr_costaccomodation: "",
            P_perm_addr_currentalue: "",
            P_perm_addr_balancemortgage: "",
            P_perm_addr_attention_party: "",
            P_type_of_c: "",
            P_OVERRIDE_CODE: "",
            P_SUB_rel: "",
            P_rel_dedup: "",
            p_channel: "",
            p_pterm_id: "",
            p_pip: "",
            username: "",
            hostname: "",
          },
        ]);
        closeModalValidation();
      } else {
        Swal.fire("Error");
      }
    } else {
      const validationDate1 = formatDate(row?.date_of_birth);
      const validationDate2 = formatDate(row?.nin_date_issue);
      const validationDate3 = formatDate(row?.nin_date_issue);
      console.log({ row, response }, "people");

      setRelationData((prev) => [
        ...prev,
        {
          randomNumberString: row?.relation_no,
          // P_fname: row?.first_name,
          // P_mname: row?.other_name,
          // P_sname: row?.surname,
          // P_gender: row?.gender,
          // P_dob: validationDate1,
          // P_Mobile_comm_no: row?.mobile1,

          isSelected: true,
          P_title: row?.suffix,
          P_gender: row?.gender, // Gender is Mandatory
          P_fname: row?.first_name, // Tin Number is Mandatory
          P_mname: row?.other_name,
          P_sname: row?.surname, // Surname is Mandatory
          P_short_name: "",
          P_alias: row?.alias_name,
          P_tin: row?.tin, // Tin Number is Mandatory
          P_preferred_name: "",
          P_dob: validationDate1,
          P_country: row?.dormicile_country, // Country is Mandatory
          P_region: "",
          P_district: "",
          P_location: row?.location,
          P_preferred_lang: "",
          P_minor: row?.minor,
          P_Guardian_id: row?.guardian_id,
          P_Guardian_type: row?.guardian_type,
          P_health_challenge: "N", //row?.h_challenge_type,
          P_health_challenge_type: "001", //row?.health_challenge,
          P_staff_indicator: row?.staff_category,
          P_staff_id: row?.staff_id,
          P_OCCUPATION: row?.profession,
          P_OTHER_OCCUPATION: "",
          P_RESIDENT: "",
          P_nATIONALITY: row?.nationality,
          P_NATIONAL_ID: row?.nin,
          P_NIN_dateissued: validationDate2,
          P_nin_expiry: validationDate3,
          P_ID_type: "",
          P_id_nO: "0000000001",
          P_id_issue_at: "",
          P_ID_issued_authority: "",
          P_ID_date_issued: "",
          P_ID_expirydate: "",
          P_Mobile_comm_no: `${row?.mobile1}`,
          P_home_phone_type: "",
          P_Home_phone_no: "",
          P_office_phone_type: "",
          P_office_phone_no: "",
          P_Office_email: "",
          P_home_email: "",
          P_enable_IB: "",
          P_enable_MB: "",
          P_enable_ussd: "",
          P_enable_smsalert: "",
          P_enable_emailalert: "",
          P_mobile_bankphoneno: "",
          P_Mobile_bankemail: "",
          P_NOK_fullname: "",
          P_NOK_ID_type: "",
          P_NOK_id_number: "",
          P_NOK_expirydate: "",
          P_NOK_IssueDate: "",
          P_NOK_relationship: "",
          P_NOK_Percent_share: "",
          P_Nok_Relation_type: "",
          P_Curr_addr_region: "",
          P_Curr_addr_hse_typ: "",
          P_Curr_addr_flat_hse_no: "",
          P_Curr_addr_building_name: "",
          P_Curr_addr_streetname: "",
          P_Curr_addr_location: "",
          P_Curr_addr_city: "",
          P_Curr_addr_nearestlandmark: "",
          P_Curr_addr_natureownship: "",
          P_Curr_addr_stayedsince: "",
          P_Curr_addr_costaccomodation: "",
          P_Curr_addr_currentalue: "",
          P_Curr_addr_balancemortgage: "",
          P_Curr_addr_attention_party: "",
          P_Perm_addr_region: "",
          P_perm_addr_hse_typ: "",
          P_perm_addr_flat_hse_no: "",
          P_perm_addr_building_name: "",
          P_perm_addr_streetname: "",
          P_perm_addr_location: "",
          P_perm_addr_city: "",
          P_perm_addr_nearestlandmark: "",
          P_perm_addr_natureownship: "",
          P_perm_addr_stayedsince: "",
          P_perm_addr_costaccomodation: "",
          P_perm_addr_currentalue: "",
          P_perm_addr_balancemortgage: "",
          P_perm_addr_attention_party: "",
          P_type_of_c: "",
          P_OVERRIDE_CODE: "",
          P_SUB_rel: "",
          P_rel_dedup: "",
          p_channel: "",
          p_pterm_id: "",
          p_pip: "",
          username: "",
          hostname: "",
        },
      ]);
      closeModalValidation();
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////NEW DATA PROPS PASSING FROM MyTabs///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [anti_money, setAnti_money] = useState({
    p_risk_code: "",
    p_pep: "",
    p_no_withdrawal_month: "",
    p_no_deposit_month: "",
    p_amt_withdrawal_month: "",
    p_amt_deposit_month: "",
  });

  console.log("anti_money", anti_money);

  const handleChangeAntiMoney = (e) => {
    const { name, value } = e.target;
    // Save the changed value to the corresponding state property
    setAnti_money((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Initialize state for the form input fields
  const [add_new_relation, setAddNewRelation] = useState({
    title_v: "", // TITLE OF THE RELATION
    gender_v: "", // GENDER OF THE RELATION
    fname_v: "", // FIRST NAME OF THE RELATION
    mname_v: "", // MIDDLE NAME OF THE RELATION
    sname_v: "", // SURNAME OF THE RELATION
    short_name_v: "", // SHORT NAME OF THE RELATION
    alias_v: "", // ALIAS OF THE RELATION
    tin_v: "", // TIN NUMBER OF THE RELATION
    preferred_name_v: "", // PREFERRED NAME OF THE RELATION
    dob_v: "", // DATE OF BIRTH OF THE RELATION
    country_v: "", // COUNTRY OF ORIGIN THE RELATION
    region_v: "", //////////////////////////// INSERT DIVISION THE RELATION
    district_v: "", // DISTRICT IN THE RELATION'S REGION
    location_v: "", // LOCATION OF THE RELATION
    sublocation_v: "", // SUB LOCATION
    preferred_lang_v: "", // PREFERRED LANGUAGE OF THE RELATION
    minor_v: "N", // IS THE RELATION A MINOR ?
    Guardian_id_v: "", // IF THE RELATION IS A MINOR THEN PROVIDE THE GUARDIAN ID
    Guardian_type_v: "", // PROVIDE THE GUARDIAN TYPE IF THE RELATION IS A MINOR
    health_challenge_v: "", // DOES THE RELATION HAS ANY HEALTH CHALLENGE ?
    health_challenge_type_v: "", // IF YES THEN CHOOSE THE TYPE
    staff_indicator_v: "", // IS THE RELATION A STAFF OF THE BANK ? Y OR N
    staff_id_v: "", // IF Y (YES) THEN PROVIDE THE STAFF ID
    OCCUPATION_V: "", // OCCUPATION OR TYPE OF WORK OF THE RELATION
    OTHER_OCCUPATION_V: "", // OTHER OCCUPATION IF THE RELATION'S OCCUPATION IS NOT LISTED IN THE LIST OF VALUE (LOV)
    RESIDENT_V: "", // IS THE RELATION A RESIDENT ?
    nATIONALITY_V: "", // IF YES THEN CHOOSE THE COUNTRY
    NATIONAL_ID_V: "", // ENTER NATION IDENTIFICATION NUMBER
    NIN_dateissued_v: "", // DATE THE ID CARD WAS GIVEN TO THE RELATION
    nin_expiry_v: "", // DATE THE ID CARD WILL EXPIRE
    ID_type_v: "", // WHAT IS THE TYPE OF ID
    id_nO_v: "", // OTHER ID NUMBER
    id_issue_at_v: "", // PLACE OTHER ID WAS ISSUED
    ID_issued_authority_v: "", //AUTHORITY THAT ISSUES THE OTHER ID
    ID_date_issued_v: "", // OTHER ID DATE ISSUED
    ID_expirydate_v: "", // OTHER ID DATE EXPIRED
    Mobile_comm_no_v: "", // MOBILE NUMBER OF THE RELATION
    home_phone_type_v: "", // HOME PHONE TYPE OF THE RELATION
    Home_phone_no_v: "", // HOME PHONE NUMBER OF THE RELATION
    office_phone_type_v: "", // OFFICE PHONE TYPE OF THE RELATION
    office_phone_no_v: "", // HOME PHONE NUMBER OF THE RELATION
    Office_email_v: "", // OFFICE EMAIL OF THE RELATION
    home_email_V: "", // EMAIL OF THE RELATION
    mobile_bankphoneno_V: "", /////////////////////// STORE MARRITAL STATUS
    Mobile_bankemail_v: "",
    type_of_c_v: "I", // TYPE OF CUSTOMER
    OVERRIDE_CODE_v: "", //////////////////////////// SAVE THE SERIAL NUMBER FOR THE NATIONAL ID NUMBER
    SUB_rel_v: "", ///////////////////////////////// SAVE SUB-LOCATION OF THE LOCATION
    rel_dedup_v: "E",
    p_channel: "",
    p_pterm_id: "",
    p_pip: "",
    cust_no_v: "", // PASS CUSTOMER NUMBER IF IT WILL BE REUSED AGAIN ELSE PROCEDURE SHOULD RETURN IT
    rel_no_v: "", // RELATION NUMBER
    username_v: "", //
    hostname_v: "",
    P_FLAG: "",
    P_POSTING_BRANCH: "",
    P_POSTED_BY: "", // THE CUSTOMER SERVICE PROVIDER DETAILS SHOULD BE ADDED HERE (NAME)
    P_POSTING_TERMINAL: "",
    P_ACCT_LINK: "",
    P_SMS_ALERT: "N", // Default "No"
    P_EMAIL_ALERT: "N", // Default "No"
    P_E_STATEMENT: "N", // Default "No"
    P_INTERNET_BANKING: "N", // Default "No"
    P_MOBILE_BANKING: "N", // Default "No"
    P_ATM_SERVICES: "N", // Default "No"
    P_ATM_SERVICES_CLOB: [{ accountNumber: "", serviceCode: "" }], // SERVICECODE IS THE CARD_TYPE IN THE TABLE
    P_SERVICE_CODE: "",
    P_STATEMENT_FREQ: "", // THIS IS EITHER DAILY, WEEKLY, MONTHLY, QUARTERLY, STATE_DATE(START DATE)
    P_CARD_TYPE: "",
    P_DAILY: "N", // Default "No"
    P_WEEKLY: "N", // Default "No"
    P_MONTHLY: "N", // Default "No"
    P_QUARTERLY: "N", // Default "No"
    P_STATE_DATE: "",
    P_END_DATE: "",
    addressData: [
      // KEY TO INSERT THE ADDRESS DETAILS INTO THE ADDRESS TABLE
    ],
  });

  // State to manage the customer's account number if required
  const [custNo, setCustNo] = useState(""); // Tracks whether same customer or new customer

  // General handle change function for both normal inputs and select fields
  const handleInputChange = (eOrName, value) => {
    if (typeof eOrName === "object" && eOrName.target) {
      // This is a native input event, extract name and value from e.target
      const { name, value } = eOrName.target;
      setAddNewRelation((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // This is a select component, name is passed as eOrName and value is passed as the second argument
      setAddNewRelation((prevState) => ({
        ...prevState,
        [eOrName]: value,
      }));
    }
  };

  console.log("add_new_relation", add_new_relation);

  // Function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAddNewRelation((prevState) => ({
      ...prevState,
      [name]: checked ? "Y" : "N", // Set 'Y' for checked, 'N' for unchecked
    }));
  };

  let saveCustNo;
  let jointCustNo;

  const handleSubmitNewRelation = async (e) => {
    e.preventDefault();

    // List of mandatory fields
    const mandatoryFields = {
      fname_v: "First Name",
      sname_v: "Surname",
      dob_v: "Date of Birth",
      country_v: "Country",
      gender_v: "Gender",
      tin_v: "TIN Number",
      Mobile_comm_no_v: "Mobile Number",
      home_email_V: "Email",
      mobile_bankphoneno_V: "Marrital status",
      preferred_lang_v: "Preferred Language",
      minor_v: "Minor",
      // Guardian_id_v: "Guardian ID",
      NATIONAL_ID_V: "National identification number",
      OVERRIDE_CODE_v: "Serial Number",
    };

    // Check for missing mandatory fields
    const missingFields = Object.keys(mandatoryFields).filter(
      (field) => !add_new_relation[field]
    );

    if (missingFields.length > 0) {
      // Show a SweetAlert error for missing mandatory fields
      const missingFieldNames = missingFields.map(
        (field) => mandatoryFields[field]
      );
      Swal.fire({
        icon: "error",
        title: "Missing Required Fields",
        text: `Please fill out the following fields: ${missingFieldNames.join(
          ", "
        )}`,
      });
      return;
    }

    // Show a preview of the entered data to the user
    // Show a preview of the entered data to the user in a 2x2 grid
    const previewHtml = `
          <div style="
            display: grid; 
            grid-template-columns: auto auto; 
            gap: 15px; 
            font-family: Arial, sans-serif; 
            font-size: 14px; 
            line-height: 1.6; 
            border: 1px solid #ccc; 
            border-radius: 8px; 
            padding: 10px; 
            background-color: #f9f9f9; 
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            zoom: 0.70
          ">
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>First Name:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.fname_v || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Surname:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.sname_v || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Date of Birth:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.dob_v || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Country:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.country_v == "KEN"
                ? "KEN - KENYA"
                : "GHA - GHANA" || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Gender:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.gender_v == "M"
                ? "M - MALE"
                : "F - FEMALE" || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>TIN Number:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.tin_v || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Mobile Number:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.Mobile_comm_no_v || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Email:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.home_email_V || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Marital Status:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.mobile_bankphoneno_V || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Preferred Language:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.preferred_lang_v == "ENG"
                ? "ENG - ENGLISH"
                : "" || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Minor Status:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.minor_v == "Y" ? "MINOR" : "NOT MINOR"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Guardian ID:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.Guardian_id_v || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>National ID Number:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555; border-bottom: 1px solid #eee;">${
              add_new_relation.NATIONAL_ID_V || "N/A"
            }</div>
            
            <div style="text-align: right; padding-right: 10px; color: #333; font-weight: bold;"><strong>Serial Number:</strong></div>
            <div style="text-align: left; padding-left: 10px; color: #555;">${
              add_new_relation.OVERRIDE_CODE_v || "N/A"
            }</div>
          </div>
    `;

    const confirm = await Swal.fire({
      title: `<div className="text-sm font-normal">Preview Data</div>`,
      html: previewHtml,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Edit",
    });

    if (!confirm.isConfirmed) {
      return; // If user chooses to edit, stop the form submission
    }

    if (typeOfAccount == "JTT" && insertedData?.length > 0) {
      jointCustNo = insertedData[0]?.CUSTOMER_NUMBER;

      console.log("Joint Relation", jointCustNo)
    }
    // Dynamically assign the customer number if required
    // const finalCustNo = custNo !== "" ? custNo : add_new_relation.cust_no_v;

    // Update state with the final customer number before submitting
    setAddNewRelation((prevState) => ({
      ...prevState,
      cust_no_v: jointCustNo,
    }));

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://10.203.14.195:3320/api/add-relation",
      headers: {
        "x-api-key":
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(add_new_relation), // Pass the form data as JSON
    };

    try {
      // Make the API call using Axios
      const response = await axios.request(config);
      console.log("MAKE API CALL", response.data);

      const data = [{ ...response.data.insertedData[0], isUserExists: false }];

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Relation Added Successfully",
        text: "The relation has been added to the database.",
      });

      if (typeOfAccount == "JTT") {
        jointCustNo = data?.CUSTOMER_NUMBER;
      }

      if (typeOfAccount == "ID") {
        saveCustNo = data?.CUSTOMER_NUMBER;
      }
      // Set the insertedData state with the data returned from the API
      setInsertedData((prev) => [...prev, ...data]);

      // Clear the form fields
      setAddNewRelation({
        title_v: "",
        gender_v: "",
        fname_v: "",
        mname_v: "",
        sname_v: "",
        short_name_v: "",
        alias_v: "",
        tin_v: "",
        preferred_name_v: "",
        dob_v: "",
        country_v: "",
        region_v: "",
        district_v: "",
        location_v: "",
        preferred_lang_v: "",
        minor_v: "N",
        Guardian_id_v: "",
        Guardian_type_v: "",
        health_challenge_v: "",
        health_challenge_type_v: "",
        staff_indicator_v: "",
        staff_id_v: "",
        OCCUPATION_V: "",
        OTHER_OCCUPATION_V: "",
        RESIDENT_V: "",
        nATIONALITY_V: "",
        NATIONAL_ID_V: "",
        NIN_dateissued_v: "",
        nin_expiry_v: "",
        ID_type_v: "",
        id_nO_v: "",
        id_issue_at_v: "",
        ID_issued_authority_v: "",
        ID_date_issued_v: "",
        ID_expirydate_v: "",
        Mobile_comm_no_v: "",
        home_phone_type_v: "",
        Home_phone_no_v: "",
        office_phone_type_v: "",
        office_phone_no_v: "",
        Office_email_v: "",
        home_email_V: "",
        mobile_bankphoneno_V: "",
        Mobile_bankemail_v: "",
        type_of_c_v: "I",
        OVERRIDE_CODE_v: "",
        SUB_rel_v: "",
        rel_dedup_v: "E",
        p_channel: "",
        p_pterm_id: "",
        p_pip: "",
        cust_no_v: "",
        rel_no_v: "",
        username_v: "",
        hostname_v: "",
        P_FLAG: "",
        P_POSTING_BRANCH: "",
        P_POSTED_BY: "",
        P_POSTING_TERMINAL: "",
        P_ACCT_LINK: "",
        P_SMS_ALERT: "N",
        P_EMAIL_ALERT: "N",
        P_E_STATEMENT: "N",
        P_INTERNET_BANKING: "N",
        P_MOBILE_BANKING: "N",
        P_ATM_SERVICES: "N",
        P_ATM_SERVICES_CLOB: [{ accountNumber: "", serviceCode: "" }],
        P_SERVICE_CODE: "",
        P_STATEMENT_FREQ: "",
        P_CARD_TYPE: "",
        P_DAILY: "N",
        P_WEEKLY: "N",
        P_MONTHLY: "N",
        P_QUARTERLY: "N",
        P_STATE_DATE: "",
        P_END_DATE: "",
        addressData: [],
      });
      showNewUserFormFClose();
      toggleModalClose();
    } catch (error) {
      console.error("API error:", error);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "API Error",
        text: "You were trying to save an in complete data. can you go through again to make sure all mandatory fields are entered.",
        // text: 'There was a problem while adding the relation. Please try again later.',
      });
    }
  };

  console.log("Cutomer number", saveCustNo);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////END OF NEW DATA PROPS PASSING FROM MyTabs///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [userExist, setUserExist] = useState(false);

  const handleProceed = () => {
    // Extract userData
    let userData = apiData?.userData;

    // Ensure userData is always an array
    if (userData && !Array.isArray(userData)) {
      userData = [userData];
    }

    // Proceed only if userData exists and is a non-empty array
    if (Array.isArray(userData) && userData.length > 0) {
      console.log(
        "user data",
        userData.map((row) => ({
          title_v: row?.suffix ?? row?.SUFFIX,
          gender_v: row?.gender,
          rel_no_v: row?.relation_no,
          mname_v: row?.last_name,
          sname_v: row?.surname ?? row?.SURNAME,
        }))
      );

      // Append the new userData to existing insertedData state
      const newInsertedData = userData.map((row) => ({
        title_v: row?.suffix ?? row?.SUFFIX,
        gender_v: row?.gender,
        isUserExists: true,
        fname_v: row?.first_name ?? row?.FIRST_NAME ?? "",
        mname_v: row?.last_name ?? "",
        sname_v: row?.surname ?? row?.SURNAME,
        short_name_v: "",
        alias_v: row?.alias_name ?? "",
        tin_v: row?.tin ?? "",
        preferred_name_v: "",
        dob_v: row?.date_of_birth ?? row?.DATE_OF_BIRTH ?? "",
        country_v: row?.dormicile_country ?? "",
        region_v: row?.region ?? "",
        district_v: row?.district ?? "",
        location_v: row?.location ?? "",
        preferred_lang_v: row?.prefered_lang ?? "",
        minor_v: "N",
        Guardian_id_v: "",
        Guardian_type_v: "",
        health_challenge_v: "",
        health_challenge_type_v: "",
        staff_indicator_v: row?.staff_category ?? "N",
        staff_id_v: row?.staff_id ?? "",
        OCCUPATION_V: row?.profession ?? "",
        OTHER_OCCUPATION_V: "",
        RESIDENT_V: row?.residence_status ?? "",
        nATIONALITY_V: row?.nationality ?? "",
        NATIONAL_ID_V: row?.nin ?? "",
        NIN_dateissued_v: "",
        nin_expiry_v: "",
        ID_type_v: row?.id_type ?? "",
        id_nO_v: row?.id_number ?? "",
        id_issue_at_v: row?.id_issued_at ?? "",
        ID_issued_authority_v: row?.id_issued_authority ?? "",
        ID_date_issued_v: row?.id_issue_date ?? "",
        ID_expirydate_v: row?.id_expiry_date ?? "",
        Mobile_comm_no_v: row?.mobile1 ?? "",
        home_phone_type_v: "",
        Home_phone_no_v: row?.line_phone ?? "",
        office_phone_type_v: "",
        office_phone_no_v: row?.work_place_phone_number ?? "",
        Office_email_v: "",
        home_email_V: row?.email_address ?? "",
        mobile_bankphoneno_V: "",
        Mobile_bankemail_v: "",
        type_of_c_v: row?.relationship_type ?? "I",
        OVERRIDE_CODE_v: "",
        SUB_rel_v: "",
        rel_dedup_v: "E",
        p_channel: "",
        p_pterm_id: "",
        p_pip: "",
        cust_no_v: row?.customer_number ?? "", // CUSTOMER NUMBER
        rel_no_v: row?.relation_no, // RELATION NUMBER
        username_v: "",
        hostname_v: "",
        P_FLAG: "",
        P_POSTING_BRANCH: "",
        P_POSTED_BY: "",
        P_POSTING_TERMINAL: "",
        P_ACCT_LINK: "",
        P_SMS_ALERT: "N",
        P_EMAIL_ALERT: "N",
        P_E_STATEMENT: "N",
        P_INTERNET_BANKING: "N",
        P_MOBILE_BANKING: "N",
        P_ATM_SERVICES: "N",
        P_ATM_SERVICES_CLOB: [{ accountNumber: "", serviceCode: "" }],
        P_SERVICE_CODE: "",
        P_STATEMENT_FREQ: "",
        P_CARD_TYPE: "",
        P_DAILY: "N",
        P_WEEKLY: "N",
        P_MONTHLY: "N",
        P_QUARTERLY: "N",
        P_STATE_DATE: "",
        P_END_DATE: "",
        addressData: [], // Address details (if any)
      }));

      // Update the state with new inserted data
      setInsertedData((prevInsertedData) => [
        ...prevInsertedData,
        ...newInsertedData,
      ]);

      // Prepare data for API call
      const relationNumber = userData[0]?.relation_no; // Adjust according to your logic
      const customerNumber = userData[0]?.customer_number; // Adjust according to your logic

      console.log("user data", relationNumber, jointCustNo, customerNumber);

      // Call the API with axios
      let data = JSON.stringify({
        relationNo: relationNumber, // Use the state value for relation number
        custNo: jointCustNo, // Use the state value for customer number
        flag: "A",
        postingBranch: "001",
        postedBy: "admin",
        postingDate: "09-09-2023",
        postingSysdate: "",
        postingTerminal: "001",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://10.203.14.195:3320/api/add-cust-relation-link",
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // Handle success logic
          Swal.fire({
            title: "Success!",
            text: "Customer relation added successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });

          setUserExist(true);

          // Close modals after success
          onCloseForRelationValidationForm();
          setIsOpenRelationDetails(false);
          setShowApiDataModal(false);
          toggleModal();
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "There was an error adding the customer relation.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  useEffect(() => {
    // setUserExist(true)
    console.log("User exists:", userExist);
  }, [userExist]);

  const [responseMessage, setResponseMessage] = useState("");

  // const handleDelete = async (relationNumber) => {
  //   // console.log("relation_no", relationNumber)
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       const response = await axios.delete(
  //         `http://10.203.14.195:3320/api/relation/${relationNumber}`,
  //         {
  //           headers: {
  //             "x-api-key":
  //               "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       // Show success message
  //       Swal.fire({
  //         icon: "success",
  //         title: "Deleted!",
  //         text: response.data.message,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });

  //       // Update the insertedData state to remove the deleted item
  //       setInsertedData((prevData) => {
  //         const updatedData = prevData.filter(
  //           (data) => data.RELATION_NO !== relationNumber
  //         );
  //         console.log("relation_no", updatedData);
  //         return updatedData;
  //       });
  //     } catch (error) {
  //       // Show error message
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error!",
  //         text: error.response
  //           ? error.response.data.message
  //           : "An error occurred.",
  //         confirmButtonText: "Okay",
  //       });
  //     }
  //   }
  // };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////FUNCTION TO INSERT SIGNATORIES///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleDelete = async (relationNumber, customerNumber) => {
    console.log("delete", relationNumber, customerNumber);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Prepare request payload
        const data = JSON.stringify({
          relationNo: relationNumber,
          customerNo: customerNumber,
        });

        // Set up the config for the request
        const config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: "http://10.203.14.195:3320/api/delete-relation",
          headers: {
            "x-api-key":
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "Content-Type": "application/json",
          },
          data: data,
        };

        // Make the DELETE request
        const response = await axios.request(config);

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });

        // Update the insertedData state to remove the deleted item
        setInsertedData((prevData) => {
          const updatedData = prevData.filter(
            (data) => data.RELATION_NO !== relationNumber
          );
          return updatedData;
        });
      } catch (error) {
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.response
            ? error.response.data.message
            : "An error occurred.",
          confirmButtonText: "Okay",
        });
      }
    }
  };

  const [selectedValue, setSelectedValue] = useState({});
  const [approvalLimit, setApprovalLimit] = useState({});
  const [checkboxValues, setCheckboxValues] = useState({}); // For tracking checkbox Y/N values

  // Handle select change
  const handleChangeSelect = (e, index) => {
    setSelectedValue((prev) => ({
      ...prev,
      [index]: e.target.value,
    }));
  };

  // Handle input change for approval limit
  const handleApprovalLimitChange = (e, index) => {
    setApprovalLimit((prev) => ({
      ...prev,
      [index]: e.target.value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxSignatory = (e, index) => {
    setCheckboxValues((prev) => ({
      ...prev,
      [index]: e.target.checked ? "Y" : "N",
    }));
  };

  console.log({ selectedValue, approvalLimit, checkboxValues });

  // Handle form submit
  //  const handleSubmitSignatory = (data) => {
  //   console.log("datat", data)
  //   const formattedData = {
  //     customer_no: data.cust_no_v,
  //     acct_link: data.acct_link || "",
  //     relation_no: data.Relation_no ?? data.randomNumberString ?? data.relation_no ?? data.RELATION_NO ?? data.rel_no_v,
  //     signatory: checkboxValues[data.Relation_no], // Use checkbox value (Y or N)
  //     signatory_level: selectedValue[data.Relation_no], // Use selected value for signatory level
  //     posted_by: "admin", // Assuming static value
  //     posting_date: "03-10-2024", // Static date, but you can make it dynamic
  //     approved_by: "manager", // Static approver
  //     approval_date: "03-10-2024", // Static approval date
  //     approver_lim: approvalLimit[data.Relation_no], // Approval limit from input field
  //     approver_state: "APP", // Assuming static
  //   };

  //   console.log("formattedData", formattedData)

  //   // Axios call to send the data
  //   axios
  //     .post("http://10.203.14.195:3320/api/add-signatory", formattedData, {
  //       headers: {
  //         "x-api-key":
  //           "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log("API response:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("API error:", error);
  //     });
  // };

  const handleSubmitSignatory = async (data) => {
    console.log("datat", data);

    const formattedData = {
      customer_no: data.cust_no_v,
      acct_link: data.acct_link || "", // Ensure it's always an empty string if undefined
      relation_no:
        data.Relation_no ??
        data.randomNumberString ??
        data.relation_no ??
        data.RELATION_NO ??
        data.rel_no_v,
      signatory: checkboxValues[data.Relation_no], // Use checkbox value (Y or N)
      signatory_level: selectedValue[data.Relation_no], // Use selected value for signatory level
      posted_by: "admin", // Assuming static value
      posting_date: "03-10-2024", // Static date, but you can make it dynamic
      approved_by: "manager", // Static approver
      approval_date: "03-10-2024", // Static approval date
      approver_lim: approvalLimit[data.Relation_no], // Approval limit from input field
      approver_state: "APP", // Assuming static
    };

    console.log("formattedData", formattedData);

    // Axios call to send the data
    axios
      .post("http://10.203.14.195:3320/api/add-signatory", formattedData, {
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("API response:", response.data);

        // Check if the response message indicates success
        if (response.data.message === "Data inserted successfully") {
          // Show success alert
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Data saved successfully!",
            confirmButtonText: "OK",
          });

          setInsertedData([]);
        } else {
          // Handle failure case if needed
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.error || "Something went wrong!",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        console.error("API error:", error);
        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while saving the data!",
          confirmButtonText: "OK",
        });
      });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////END OF FUNCTION TO INSERT SIGNATORIES////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////FUNCTION TO CREATE ACCOUNT FOR A SACCO MEMBER////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //saveCustNo
  const [userData, setUserData] = useState({
    p_app_flag: "Y",
    p_typeofC: "I",
    p_TYPEOFCUSTOMER: typeOfAccount,
    p_customername: customername,
    p_typeofacct: "",
    p_legalform: "",
    p_currencycode: accountDetailsData.currencies,
    p_CHANNEL: "BRA",
    p_armcode: "",
    p_introsource: accountDetailsData.introductorySource,
    p_SECTOR: accountDetailsData.sector,
    p_subSECTOR: "",
    p_Segment: "",
    p_subsegment: "",
    p_fxcategory: "",
    p_acmandate: "SELF",
    p_documentreq_type: "002",
    p_relationdets: "",
    P_cor_det: "",
    p_documents: [],
    p_accountreferee: "",
    p_aml: [
      anti_money,
      // {
      //   p_risk_code: "",
      //   p_pep: "",
      //   p_no_withdrawal_month: "20",
      //   p_no_deposit_month: "12",
      //   p_amt_withdrawal_month: "200",
      //   p_amt_deposit_month: "20000",
      // },
    ],
    p_sourceofwealth: "{}",
    p_sourceoffund: "{}",
    p_transtype: "{}",
    p_nok_kin: "{}",
    p_address: "{}",
    p_branchcode: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
    p_date: formatDate(
      JSON.parse(localStorage.getItem("userInfo"))?.postingDate
    ),
    p_postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
    p_pterm_id: "TERM123",
    p_pip: "192.168.1.1",
    p_hostname: JSON.parse(localStorage.getItem("userInfo"))?.id,
    p_member_type: "M",
    p_customerno: insertedData[0]?.CUSTOMER_NUMBER,
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const createAccount = async () => {
  //   // Prepare the summary data
  //   const summaryData = `
  //     <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc; font-size: 14px;">
  //       <thead>
  //         <tr style="background-color: #f2f2f2;">
  //           <th style="border: 1px solid #ccc; padding: 4px; text-transform: uppercase; text-align: right;">Field</th>
  //           <th style="border: 1px solid #ccc; padding: 4px; text-transform: uppercase; text-align: left;">Value</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Account Type</td>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
  //             ${userData.p_typeofC === "I" ? "I - INDIVIDUAL" : "C - CORPORATE"}
  //           </td>
  //         </tr>
  //         <tr>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Customer Name</td>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
  //             ${userData.p_customername}
  //           </td>
  //         </tr>
  //         <tr>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Currency Code</td>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
  //             ${userData.p_currencycode === "010" ? "010 - KENYAN SHILLING" : ""}
  //           </td>
  //         </tr>
  //         <tr>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Sector</td>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
  //             ${userData.p_SECTOR}
  //           </td>
  //         </tr>
  //         <tr>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Member Type</td>
  //           <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">

  //             ${userData.p_member_type === "M" ? "M - MEMBER" : "N - NON-MEMBER"}
  //           </td>
  //         </tr>
  //         <!-- Add more fields as needed -->
  //       </tbody>
  //     </table>
  //   `;

  //   // Show the summary for confirmation
  //   const confirmation = await Swal.fire({
  //     title: "Please Confirm Your Details",
  //     html: summaryData,
  //     icon: "info",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, create it!",
  //     cancelButtonText: "No, cancel!",
  //     width: "600px", // Set a specific width
  //   });

  //   // Check if the user confirmed
  //   if (!confirmation.isConfirmed) {
  //     Swal.fire({
  //       title: "Cancelled",
  //       text: "Account creation has been cancelled.",
  //       icon: "info",
  //       confirmButtonText: "OK",
  //     });
  //     return; // Exit the function if the user cancels
  //   }

  //   // If confirmed, proceed with the account creation
  //   const data = JSON.stringify(userData);

  //   console.log("Account Data", data);

  //   const config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: "http://10.203.14.195:3320/api/create-account",
  //     headers: {
  //       "x-api-key":
  //         "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   try {
  //     setUserExist(false);
  //     const response = await axios.request(config);
  //     setResponse(response.data);
  //     console.log("userExist 1",JSON.stringify(response.data));

  //     // Check api_status before proceeding
  //     if (response.data.api_status === "Y") {

  //       //  setAccountDetailsData("")
  //       // Split acctno_settle into lines, and create table rows
  //       const acctnoLines = response.data.acctno_settle.split("|"); // Split by '|'
  //       const acctnoRows = acctnoLines
  //         .map((line) => {
  //           const [label, value] = line.split(":"); // Split by ':'
  //           return `
  //           <tr>
  //             <td style="text-align: right; font-weight: bold; border: 1px solid #ccc; padding: 4px;">${label
  //               .trim()
  //               .toLowerCase()}</td>
  //             <td style="text-align: left; border: 1px solid #ccc; padding: 4px;">${
  //               value ? value.trim() : ""
  //             }</td>
  //           </tr>
  //         `;
  //         })
  //         .join("");

  //         // setUserExist(false)

  //       // Construct the full HTML for SweetAlert
  //       const accountDetails = `
  //         <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc; font-size: 14px;">
  //           <thead>
  //             <tr style="background-color: #f2f2f2;"> <!-- Add background color -->
  //               <th style="text-align: right; font-weight: bold; border: 1px solid #ccc; padding: 4px; text-transform: uppercase;">Description</th>
  //               <th style="text-align: left; font-weight: bold; border: 1px solid #ccc; padding: 4px; text-transform: uppercase;">Account Number</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             ${acctnoRows}
  //             <tr>
  //               <td style="text-align: right; font-weight: bold; border: 1px solid #ccc; padding: 4px;">${
  //                 response.data.api_msg.split(":")[0]
  //               }</td>
  //               <td style="text-align: left; border: 1px solid #ccc; padding: 4px;">${
  //                 response.data.api_msg.split(":")[1] || ""
  //               }</td>
  //             </tr>
  //           </tbody>
  //         </table>
  //       `;

  //       await handleSubmitSignatory(insertedData[0])

  //       console.log("userExist", acctnoRows)

  //       // handleSubmitSignatory(data)

  //       setData("")

  //       setTableDataNok([])

  //       setAcMandate("")

  //       setCustomername("")

  //       updateTypeOfC()

  //       // Show SweetAlert with styled response and aligned content
  //       Swal.fire({
  //         title: "Account Created Successfully!",
  //         html: accountDetails,
  //         icon: "success",
  //         confirmButtonText: "OK",
  //         customClass: {
  //           popup: "formatted-swal",
  //         },
  //         width: "600px", // Set a specific width
  //         padding: "10px", // Optional padding
  //       });
  //     } else {
  //       // Handle case where api_status is not 'Y'
  //       Swal.fire({
  //         title: "Account Creation Failed!",
  //         text:
  //           response.data.api_msg ||
  //           "An error occurred during account creation.",
  //         icon: "error",
  //         confirmButtonText: "Try Again",
  //       });
  //     }
  //   } catch (error) {
  //     setError(error);
  //     console.error(error);

  //     // Show error in SweetAlert
  //     Swal.fire({
  //       title: "Error!",
  //       text: "An error occurred while creating the account.",
  //       icon: "error",
  //       confirmButtonText: "Try Again",
  //     });
  //   }
  // };

  const createAccount = async () => {
    // Prepare the summary data
    const summaryData = `
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc; font-size: 14px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="border: 1px solid #ccc; padding: 4px; text-transform: uppercase; text-align: right;">Field</th>
            <th style="border: 1px solid #ccc; padding: 4px; text-transform: uppercase; text-align: left;">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Account Type</td>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
              ${userData.p_typeofC === "I" ? "I - INDIVIDUAL" : "C - CORPORATE"}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Customer Name</td>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
              ${userData.p_customername}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Currency Code</td>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
              ${
                userData.p_currencycode === "010" ? "010 - KENYAN SHILLING" : ""
              }
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Sector</td>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
              ${userData.p_SECTOR}
            </td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Member Type</td>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
              ${
                userData.p_member_type === "M" ? "M - MEMBER" : "N - NON-MEMBER"
              }
            </td>
          </tr>
          <!-- Add more fields as needed -->
        </tbody>
      </table>
    `;

    // Show the summary for confirmation
    const confirmation = await Swal.fire({
      title: "Please Confirm Your Details",
      html: summaryData,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "No, cancel!",
      width: "600px", // Set a specific width
    });

    // Check if the user confirmed
    if (!confirmation.isConfirmed) {
      Swal.fire({
        title: "Cancelled",
        text: "Account creation has been cancelled.",
        icon: "info",
        confirmButtonText: "OK",
      });
      return; // Exit the function if the user cancels
    }

    try {
      // Proceed with the account creation
      const data = JSON.stringify(userData);

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://10.203.14.195:3320/api/create-account",
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
        data: data,
      };

      setUserExist(false);
      const response = await axios.request(config);
      setResponse(response.data);

      // Check api_status before proceeding
      if (response.data.api_status === "Y") {
        // Split acctno_settle into lines, and create table rows
        const acctnoLines = response.data.acctno_settle.split("|"); // Split by '|'
        const acctnoRows = acctnoLines
          .map((line) => {
            const [label, value] = line.split(":"); // Split by ':'
            return `
                    <tr>
                        <td style="text-align: right; font-weight: bold; border: 1px solid #ccc; padding: 4px;">${label
                          .trim()
                          .toLowerCase()}</td>
                        <td style="text-align: left; border: 1px solid #ccc; padding: 4px;">${
                          value ? value.trim() : ""
                        }</td>
                    </tr>
                `;
          })
          .join("");

        // Construct the full HTML for SweetAlert
        const accountDetails = `
                <table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc; font-size: 14px;">
                    <thead>
                        <tr style="background-color: #f2f2f2;"> <!-- Add background color -->
                            <th style="text-align: right; font-weight: bold; border: 1px solid #ccc; padding: 4px; text-transform: uppercase;">Description</th>
                            <th style="text-align: left; font-weight: bold; border: 1px solid #ccc; padding: 4px; text-transform: uppercase;">Account Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${acctnoRows}
                        <tr>
                            <td style="text-align: right; font-weight: bold; border: 1px solid #ccc; padding: 4px;">${
                              response.data.api_msg.split(":")[0]
                            }</td>
                            <td style="text-align: left; border: 1px solid #ccc; padding: 4px;">${
                              response.data.api_msg.split(":")[1] || ""
                            }</td>
                        </tr>
                    </tbody>
                </table>
            `;

        setData("");
        setTableDataNok([]);
        setAcMandate("");
        setCustomername("");
        updateTypeOfC();

        // Show SweetAlert with styled response and aligned content
        await Swal.fire({
          title: "Account Created Successfully!",
          html: accountDetails,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            popup: "formatted-swal",
          },
          width: "600px", // Set a specific width
          padding: "10px", // Optional padding
        });

        // Proceed with signatory submission
        await handleSubmitSignatory(insertedData[0]);

        // Additional actions after account creation
      } else {
        // Handle case where api_status is not 'Y'
        Swal.fire({
          title: "Account Creation Failed!",
          text:
            response.data.api_msg ||
            "An error occurred during account creation.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      setError(error);
      console.error(error);

      // Show error in SweetAlert
      Swal.fire({
        title: "Error!",
        text: "An error occurred while creating the account.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      p_SECTOR: accountDetailsData.sector,
      p_typeofacct: "", // PRODUCT
      p_legalform: "", // SUB PRODUCT
      p_subSECTOR: accountDetailsData.subSector,
      p_Segment: accountDetailsData.customerSegment,
      p_subsegment: accountDetailsData.customerSubSegment,
      p_documentreq_type: accountDetailsData.documentRequiredType,
      p_currencycode: accountDetailsData.currencies,
      p_introsource: accountDetailsData.introductorySource,
      p_armcode: accountDetailsData.relationManager,
      fxcategory: "",
      p_member_type: accountDetailsData.memberType,
      p_customerno: insertedData[0]?.CUSTOMER_NUMBER,
      p_aml: [
        anti_money,
        // {
        //   p_risk_code: "",
        //   p_pep: "",
        //   p_no_withdrawal_month: "20",
        //   p_no_deposit_month: "12",
        //   p_amt_withdrawal_month: "200",
        //   p_amt_deposit_month: "20000",
        // },
      ],
    }));
    console.log("accountDetailsData", accountDetailsData.documentRequiredType);
  }, [accountDetailsData]);

  const updateTypeOfC = () => {
    setUserData({
      ...userData,
      typeofC: "I", // Update typeofC to 'I'
    });

    console.warn("userData.typeofC:::", userData.p_typeofC);
  };

  useEffect(() => {
    setUserData((prev) => ({ ...prev, p_acmandate: acMandate }));
  }, [acMandate]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, p_customername: customername }));
    // console.log("customername",customername)
  }, [customername]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, p_TYPEOFCUSTOMER: typeOfAccount }));
  }, [typeOfAccount]);

  return (
    <div>
      <MyTabs
        // handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        // AccountReferees={AccountReferees}
        handleChange={handleChange}
        response={response}
        error={error}
        customerData={customerData}
        customerDataTable={customerDataTable}
        storedFormData={storedFormData}
        storeDataInSessionStorage={storeDataInSessionStorage}
        savedData={savedData}
        accountReferee={accountReferee}
        setAccountReferee={setAccountReferee}
        handleCustTypeChange={handleCustTypeChange}
        custType={custType}
        data={data}
        accountDetailsData={accountDetailsData}
        setAccountDetailsData={setAccountDetailsData}
        //// Final
        handleFinalChange={handleFinalChange}
        userDataResponse={userDataResponse}
        custmerNumber={custmerNumber}
        accountNumber={accountNumber}
        settlement={settlement}
        customername={customername}
        setCustomername={setCustomername}
        handleChangeCustomername={handleChangeCustomername}
        typeOfAccount={typeOfAccount}
        setTypeOfAccount={setTypeOfAccount}
        handleChangeTypeOfAccount={handleChangeTypeOfAccount}
        handleChangeDocs={handleChangeDocs}
        nextOfKingData={nextOfKingData}
        tableDataNok={tableDataNok}
        allNextOfKingData={allNextOfKingData}
        handleChangeNextOfKin={handleChangeNextOfKin}
        handleSubmitNextOfKin={handleSubmitNextOfKin}
        // handleChangeAML={handleChangeAML}
        // amlData={amlData}

        handleClearTable={handleClearTable}
        handleClearNew={handleClearNew}
        //////
        formDataShares={formDataShares}
        handleSubmitShares={handleSubmitShares}
        handleChangeShares={handleChangeShares}
        relationData={relationData}
        // handleRowClick={handleRowClick}
        // handleEdit={handleEdit}
        handleDelete={handleDelete}
        onclickOnrow={onclickOnrow}
        effective={effective}
        ImageVerification={ImageVerification}
        handleNumRowsChange={handleNumRowsChange}
        numRows={numRows}
        tableDataSmall={tableDataSmall}
        isNumberEntered={isNumberEntered}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        generateRandomNumberString={generateRandomNumberString}
        randomNumberString={randomNumberString}
        arrayDocs={arrayDocs}
        docsId={docsId}
        // validateInput={validateInput}
        errors={errors}
        updateTypeOfC={updateTypeOfC}
        message={message}
        handleCheckValueClick={handleCheckValueClick}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        displayValidData={displayValidData}
        acMandate={acMandate}
        handleAccountMandate={handleAccountMandate}
        currencies={currencies}
        setErrorTest={setErrorTest}
        clearError={clearError}
        handleRadioChangeMember={handleRadioChangeMember}
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
        setModalIsOpen={setModalIsOpen}
        isValid={isValid}
        refinedData={refinedData}
        setRefinedData={setRefinedData}
        setRelationData={setRelationData}
        addValidationData={addValidationData}
        ////////////////////////////////////
        handleProceed={handleProceed}
        onCloseForRelationValidationForm={onCloseForRelationValidationForm}
        handleFormSubmit={handleFormSubmit}
        setFormData1={setFormData1}
        formData1={formData1}
        loading={loading}
        showApiDataModal={showApiDataModal}
        saveDataNewForm={saveDataNewForm}
        showNewUserForm={showNewUserForm}
        showNewUserFormFClose={showNewUserFormFClose}
        showNewUserFormF={showNewUserFormF}
        apiData={apiData}
        toggleModal={toggleModal}
        isOpenRelationDetails={isOpenRelationDetails}
        show={show}
        modalOpenedNok={modalOpenedNok}
        nextofkinmodal={nextofkinmodal}
        nextofkinclosemodal={nextofkinclosemodal}
        handleEditNok={handleEditNok}
        handleDeleteNok={handleDeleteNok}
        editMode={editMode}
        toggleModalClose={toggleModalClose}
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////NEW DATA PROPS PASSING FROM MyTabs///////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        add_new_relation={add_new_relation}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmitNewRelation={handleSubmitNewRelation}
        setAddNewRelation={setAddNewRelation}
        insertedData={insertedData}
        handleRowSelect={handleRowSelect}
        handleChangeSelect={handleChangeSelect}
        handleApprovalLimitChange={handleApprovalLimitChange}
        handleCheckboxSignatory={handleCheckboxSignatory}
        selectedValue={selectedValue}
        approvalLimit={approvalLimit}
        checkboxValues={checkboxValues}
        handleSubmitSignatory={handleSubmitSignatory}
        createAccount={createAccount}
        anti_money={anti_money}
        handleChangeAntiMoney={handleChangeAntiMoney}
        isButtonDisabled={isButtonDisabled}
        userExist={userExist}
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////END NEW DATA PROPS PASSING FROM MyTabs///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      />

      <ValidationModal
        isOpen={modalIsOpen}
        onClose={closeModalValidation}
        setRelationData={setRelationData}
        addValidationData={addValidationData}
        setRelData={setRelData}
        typeOfAccount={typeOfAccount}
      />
    </div>
  );
}

export default IndividualAccountOpening;
