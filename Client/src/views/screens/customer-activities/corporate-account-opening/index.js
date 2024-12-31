import React, { useState, useEffect } from "react";
import MyTabs from "./components/xplus-tabs";
import { API_SERVER } from "../../../../config/constant";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import { Modal, Text, Checkbox } from "@mantine/core";
import ImageVerification from "../../../../components/ImageVerification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ValidationModal from "./components/ValidationModal";
import CryptoJS from "crypto-js";

function IndividualAccountOpening({ accountTypes, setAccountTypes }) {
  const [customerData, setCustomerData] = useState("");
  const [customerDataTable, setCustomerDataTable] = useState("");
  const [storedFormData, setStoredFormData] = useState([]);
  const [custType, setCustType] = useState("");
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const [relationData, setRelationData] = useState([]);

  const [tableDataAddress, setTableDataAddress] = useState([]);
  const [usedAddressTypes, setUsedAddressTypes] = useState([]);

  const [refinedData, setRefinedData] = useState([]);

  const [finalRelation, setFinalRelation] = useState("");

  const [apiData, setApiData] = useState(null);
  const [isOpenRelationDetails, setIsOpenRelationDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [showApiDataModal, setShowApiDataModal] = useState(false);
  const [saveDataNewForm, setSavedDataNewForm] = useState(null);

  // Update the array in place
  // const updatedTableDataAddress = tableDataAddress.map(item => {
  //   // Iterate over each property of the object
  //   Object.keys(item).forEach(key => {
  //     // Check if the property value matches the pattern with a regular expression
  //     const match = item[key].match(/(\d+) -/);
  //     if (match) {
  //       // Extract the numeric part and trim any extra spaces
  //       item[key] = match[1].trim();
  //     }
  //   });

  //   return item;
  // });

  // // Now updatedTableDataAddress contains the modified data
  // console.log("updatedTableDataAddress:::", updatedTableDataAddress);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const formattedDate = `${date.getDate()}-${formatMonth(date.getMonth())}-${date.getFullYear()}`;
  //   return formattedDate;
  // };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (isNaN(date)) {
      return "1-May-2023";
    }

    const formattedDate = `${date.getDate()}-${formatMonth(
      date.getMonth()
    )}-${date.getFullYear()}`;
    return formattedDate;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////

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

  // Function to toggle the modal
  const toggleModal = () => {
    // setIsOpen(!isOpen);
    setIsOpenRelationDetails(!isOpenRelationDetails);
  };

  const showNewUserFormF = () => {
    setShowNewUserForm(true);
  };

  const showNewUserFormFClose = () => {
    setShowNewUserForm(false);
  };

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
      url: "http://10.203.14.195:3320/api/get-multiple-validation",
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
          // setShowApiDataModal(true);
          setShow(true);
        } else {
          setSavedDataNewForm(formDataToSave);
          showNewUserFormF();
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

  const [stakeholder, setStakeholder] = useState(false);
  const [selectedStakeholderType, setSelectedStakeholderType] = useState("");
  const [activeState, setActiveState] = useState("non-active"); // 'active' or 'non-active'
  const [selectedRole, setSelectedRole] = useState("");

  // Handler function to update selected stakeholder type
  const handleStakeholderTypeChange = (selectedOption) => {
    console.log("Selected", selectedOption);
    setSelectedStakeholderType(selectedOption);

    if (selectedOption === "001") {
      setActiveState("active");
    } else {
      setActiveState("non-active");
    }
  };

  // Handler function to update active state from radio buttons
  const handleActiveStateChange = (value) => {
    setActiveState(value);
  };

  const showNewUserFormStakeholders = () => {
    setStakeholder(true);
  };

  const showNewUserFormFCloseStakeholder = () => {
    setStakeholder(false);
  };

  const handleFormSubmitStakeholder = () => {
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
      url: "http://10.203.14.195:3320/api/get-multiple-validation",
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
          // setShowApiDataModal(true);
          setShow(true);
        } else {
          setSavedDataNewForm(formDataToSave);
          showNewUserFormStakeholders();
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

  // const handleProceed = (source) => {
  //   console.log("source", source);
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
  //         source,
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
        isUserExists:true,
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

      console.log("user data", relationNumber, jointCustNo);

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
  console.log("user relation data", relationData);

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////// END OF FUNCTION TO ADD DATA FROM RELATION DETAILS COMPONENT /////////////////////////////////////
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

  useEffect(() => {
    const getCurrencyData = async () => {
      const data = await axios.get(API_SERVER + "/api/currencies", { headers });
      if (data.data.length > 0) {
        const response = data.data;
        const arr = [];
        //  console.log(response, "Mannnn");
        response.map((i) => {
          arr.push({ value: i.actual_code, label: i.description });
          //  console.log(arr)
        });
        console.warn(arr, "Araudiso");
        setCurrencies(arr);
      } else {
        setCurrencies("");
      }
    };
    getCurrencyData();
  }, []);

  const [sharesData, setSharesData] = useState({
    p_certicate_id: "",
    p_type_of_share: "",
    p_transaction_type: "",
    p_security_type_id: "",
    p_security: "",
    p_certificate_no: "",
    p_no_shares: "",
    p_restriction: "",
    p_stop: "",
    p_no_of_tax_lots: "",
    p_reason_for_reverse: "",
    p_reason_for_transfer: "",
    p_date_of_gift: "",
    p_fair_market_valdate_gift: "",
    p_date_of_death: "",
    p_fair_market_valdate_death: "",
    p_base_on_level: "",
    p_cancel_split_zeroshares: "",
    p_total_no_shares: "",
    p_date: "",
    p_total_no_of_shareholders: "",
  });

  /////////////////////////////////////////////////////////////////////////

  const [nextOfKingData, setNextOfKingData] = useState({
    p_next_of_kin: "",
    p_next_of_kin_address: "",
    p_next_of_kin_phone: "",
    p_next_of_kin_id_type: "",
    p_next_of_kin_id_no: "",
    p_next_of_kin_id_expdate: "",
    p_next_of_kin_relationship: "",
    p_next_of_kin_dob: "",
    p_next_of_kin_percentshare: "",
  });

  const [tableDataNok, setTableDataNok] = useState([]);

  const [amlData, setAmlData] = useState({
    p_risk_code: "",
    p_pep: "",
    p_no_withdrawal_month: "",
    p_no_deposit_month: "",
    p_amt_withdrawal_month: "",
    p_amt_deposit_month: "",
  });

  const [allNextOfKingData, setAllNextOfKingData] = useState([]); // New state
  // const [antiMoneyLData, setAntiMoneyLData] = useState([]); // New state

  // setAntiMoneyLData((prevAllData) => [...prevAllData, amlData]);

  // const handleChangeAML = (name, value) => {
  //   setAmlData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value
  //   }));
  // }

  const handleChangeNextOfKin = (name, value) => {
    setNextOfKingData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitNextOfKin = (e) => {
    e.preventDefault();

    if (
      !nextOfKingData.p_next_of_kin ||
      !nextOfKingData.p_next_of_kin_address ||
      !nextOfKingData.p_next_of_kin_phone ||
      !nextOfKingData.p_next_of_kin_id_type
    ) {
      window.alert("Please fill out all fields.");
    } else {
      const formattedDatep_next_of_kin_dob = formatDate(
        nextOfKingData.p_next_of_kin_dob
      );
      const formattedDatep_next_of_kin_id_expdate = formatDate(
        nextOfKingData.p_next_of_kin_id_expdate
      );

      const newData = {
        p_next_of_kin: nextOfKingData.p_next_of_kin,
        p_next_of_kin_address: nextOfKingData.p_next_of_kin_address,
        p_next_of_kin_phone: nextOfKingData.p_next_of_kin_phone,
        p_next_of_kin_id_type: nextOfKingData.p_next_of_kin_id_type,
        p_next_of_kin_id_no: nextOfKingData.p_next_of_kin_id_no,
        p_next_of_kin_id_expdate: formattedDatep_next_of_kin_id_expdate,
        p_next_of_kin_relationship: nextOfKingData.p_next_of_kin_relationship,
        p_next_of_kin_dob: formattedDatep_next_of_kin_dob,
        p_next_of_kin_percentshare: nextOfKingData.p_next_of_kin_percentshare,
      };

      setAllNextOfKingData((prevAllData) => [...prevAllData, newData]); // Store in new state
      setTableDataNok((prevTableData) => [...prevTableData, nextOfKingData]);
      setNextOfKingData({
        p_next_of_kin: "",
        p_next_of_kin_address: "",
        p_next_of_kin_phone: "",
        p_next_of_kin_id_type: "",
        p_next_of_kin_id_no: "",
        p_next_of_kin_id_expdate: "",
        p_next_of_kin_relationship: "",
        p_next_of_kin_dob: "",
        p_next_of_kin_percentshare: "",
      });
    }
  };

  console.log("The next of king=====", allNextOfKingData);

  const handleClearTable = () => {
    setAllNextOfKingData([]);
    setTableDataNok([]);
    setRelationData([]);
    setData("");
    setUserData({});
  };

  const handleClearNew = () => {
    setAllNextOfKingData([]);
    setTableDataNok([]);
    setRelationData([]);
    setData("");
    setUserData({});
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
  };

  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [onclickOnrow, setOnclickOnRow] = useState(false);

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
    const selectedData = relationData[index];
    setOnclickOnRow(true);
    setFormData({
      P_title: selectedData.P_title,
      P_gender: selectedData.P_gender, // Gender is Mandatory
      P_fname: selectedData.P_fname, // Tin Number is Mandatory
      P_mname: selectedData.P_mname,
      P_sname: selectedData.P_sname, // Surname is Mandatory
      P_short_name: selectedData.P_short_name,
      P_alias: selectedData.P_alias,
      P_tin: selectedData.P_tin, // Tin Number is Mandatory
      P_preferred_name: "",
      P_dob: selectedData.P_dob,
      P_country: selectedData.P_country, // Country is Mandatory
      P_region: selectedData.P_region,
      P_district: selectedData.P_district,
      P_location: selectedData.P_location,
      P_preferred_lang: selectedData.P_preferred_lang,
      P_minor: selectedData.P_minor,
      P_Guardian_id: selectedData.P_Guardian_id,
      P_Guardian_type: selectedData.P_Guardian_type,
      P_health_challenge: selectedData.P_health_challenge,
      P_health_challenge_type: selectedData.P_health_challenge_type,
      P_staff_indicator: selectedData.P_staff_indicator,
      P_staff_id: selectedData.P_staff_id,
      P_OCCUPATION: selectedData.P_OCCUPATION,
      P_OTHER_OCCUPATION: selectedData.P_OTHER_OCCUPATION,
      P_RESIDENT: selectedData.P_RESIDENT,
      P_nATIONALITY: selectedData.P_nATIONALITY,
      P_NATIONAL_ID: selectedData.P_NATIONAL_ID,
      P_NIN_dateissued: selectedData.P_NIN_dateissued,
      P_nin_expiry: selectedData.P_nin_expiry,
      P_ID_type: selectedData.P_ID_type,
      P_id_nO: selectedData.P_id_nO,
      P_id_issue_at: selectedData.P_id_issue_at,
      P_ID_issued_authority: selectedData.P_ID_issued_authority,
      P_ID_date_issued: selectedData.P_ID_date_issued,
      P_ID_expirydate: selectedData.P_ID_expirydate,
      P_Mobile_comm_no: selectedData.P_Mobile_comm_no,
      P_home_phone_type: selectedData.P_home_phone_type,
      P_Home_phone_no: selectedData.P_Home_phone_no,
      P_office_phone_type: selectedData.P_office_phone_type,
      P_office_phone_no: selectedData.P_office_phone_no,
      P_Office_email: selectedData.P_Office_email,
      P_home_email: selectedData.P_home_email,
      P_enable_IB: selectedData.P_enable_IB,
      P_enable_MB: selectedData.P_enable_MB,
      P_enable_ussd: selectedData.P_enable_ussd,
      P_enable_smsalert: selectedData.P_enable_smsalert,
      P_enable_emailalert: selectedData.P_enable_emailalert,
      P_mobile_bankphoneno: selectedData.P_mobile_bankphoneno,
      P_Mobile_bankemail: selectedData.P_Mobile_bankemail,
      P_NOK_fullname: selectedData.P_NOK_fullname,
      P_NOK_ID_type: selectedData.P_NOK_ID_type,
      P_NOK_id_number: selectedData.P_NOK_id_number,
      P_NOK_expirydate: selectedData.P_NOK_expirydate,
      P_NOK_IssueDate: selectedData.P_NOK_IssueDate,
      P_NOK_relationship: selectedData.P_NOK_relationship,
      P_NOK_Percent_share: selectedData.P_NOK_Percent_share,
      P_Nok_Relation_type: selectedData.P_Nok_Relation_type,
      P_Curr_addr_region: selectedData.P_Curr_addr_region,
      P_Curr_addr_hse_typ: selectedData.P_Curr_addr_hse_typ,
      P_Curr_addr_flat_hse_no: selectedData.P_Curr_addr_flat_hse_no,
      P_Curr_addr_building_name: selectedData.P_Curr_addr_building_name,
      P_Curr_addr_streetname: selectedData.P_Curr_addr_streetname,
      P_Curr_addr_location: selectedData.P_Curr_addr_location,
      P_Curr_addr_city: selectedData.P_Curr_addr_city,
      P_Curr_addr_nearestlandmark: selectedData.P_Curr_addr_nearestlandmark,
      P_Curr_addr_natureownship: selectedData.P_Curr_addr_natureownship,
      P_Curr_addr_stayedsince: selectedData.P_Curr_addr_stayedsince,
      P_Curr_addr_costaccomodation: selectedData.P_Curr_addr_costaccomodation,
      P_Curr_addr_currentalue: selectedData.P_Curr_addr_currentalue,
      P_Curr_addr_balancemortgage: selectedData.P_Curr_addr_balancemortgage,
      P_Curr_addr_attention_party: selectedData.P_Curr_addr_attention_party,
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
  };

  const handleEdit = () => {
    setOnclickOnRow(false);
    if (selectedRowIndex !== null) {
      const updatedData = [...relationData];
      updatedData[selectedRowIndex] = {
        ...updatedData[selectedRowIndex],
        P_title: formData.P_title,
        P_fname: formData.P_fname,
        P_mname: formData.P_mname,
        P_sname: formData.P_sname,
        P_gender: formData.P_gender,
        P_dob: formData.P_dob,
        P_Mobile_comm_no: formData.P_Mobile_comm_no,
      };
      setRelationData(updatedData);
      setSelectedRowIndex(null);
      setFormData({
        P_title: "",
        P_fname: "",
        P_mname: "",
        P_sname: "",
        P_gender: "",
        P_dob: "",
        P_Mobile_comm_no: "",
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
    }
  };

  const handleDelete = (selectedIndex) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = relationData.filter(
          (i, key) => key !== selectedIndex
        );
        setRelationData(updatedData);
        console.log("-_-_-_-_-_-_-_-_-", updatedData, selectedIndex);
      }
    });
  };

  const [accountDetailsData, setAccountDetailsData] = useState({
    // sacco:'',
    fxcategory: "",
    relationManager: "",
    productGroup: "2",
    productSubGroup: "220",
    currencies: "010",
    customerSegment: "",
    customerSubSegment: "",
    documentRequiredType: "",
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

  // console.log('Account Details:::', accountDetailsData)

  sessionStorage.setItem(
    "accountDetailsData",
    JSON.stringify(accountDetailsData)
  );

  // useEffect(() => {
  //   if (custType) {
  //     fetchData();
  //   }
  // }, [custType]);

  const handleCustTypeChange = (value) => {
    setAccountDetailsData((prev) => ({ ...prev, documentRequiredType: value }));
    setCustType(value);
    if (custType) {
      fetchData(value);
    }

    setTimeout(() => {
      const input = document.getElementById("introSource");
      input.focus();
    }, 0);
  };

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

  console.log("arrayDocs:::", arrayDocs);
  console.log("arrayDocs:::", docsId);

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

  const handleChange = (name, value) => {
    if (name === "P_fname") {
      // Replace 'fieldName' with the actual name of the input field
      value = value.replace(/\d/g, ""); // Remove all digits from the input value
    }
    if (name === "P_mname") {
      // Replace 'fieldName' with the actual name of the input field
      value = value.replace(/\d/g, ""); // Remove all digits from the input value
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // setAccountReferees((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value
    // }));
    console.log("Value:::ddddddd", formData);
  };

  console.log("Value:::accountDetailsData", accountDetailsData);

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

  const formatDateDoB = (dateString) => {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    if (inputDate > currentDate) {
      throw new Error("Cannot format a future date.");
    }

    const formattedDate = `${inputDate.getDate()}-${formatMonth(
      inputDate.getMonth()
    )}-${inputDate.getFullYear()}`;
    return formattedDate;
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // const [corporate, setCorporate] = useState([])

  // const [corporate, setCorporate] = useState({
  //   P_corp_flathseno: "",
  //   P_corp_streetname: "",
  //   P_corp_location: "",
  //   P_corp_postaladdress: "",
  //   p_corp_country: "",
  //   p_corp_email: "",
  //   p_corp_pref_lang: "",
  //   p_date_ofincorp: "",
  //   p_corp_comm_mode: "",
  //   p_corp_phoneno: "",
  //   p_corp_tinno: "",
  //   p_corp_reqisterno: "",
  //   p_banksiscomp: "",
  //   p_businessdesc: "",

  //   p_country_of_registration: "",
  //   p_corp_physical_address:"",
  //   p_town_city: "",
  //   p_postal_code: "",
  //   p_postal_address: "",
  //   p_plot_number: "",
  //   p_website_url: "",
  //   p_telephone: "",
  //   p_fax_number: "",
  //   p_associate_company: "",

  //   p_personal_fullname: "",
  //   p_personal_email: "",
  //   p_personal_phonenumber: "",
  // });

  const [corporate, setCorporate] = useState({
    CUSTOMER_NAME: "UPDATE NAME",
    CORP_FLATHSENO: "",
    CORP_STREETNAME: "",
    CORP_LOCATION: "",
    CORP_POSTALADDRESS: "",
    CORP_COUNTRY: "",
    CORP_EMAIL: "",
    CORP_PREF_LANG: "",
    DATE_OFINCORP: "",
    CORP_COMM_MODE: "",
    CORP_PHONENO: "",
    CORP_TINNO: "",
    BANKSISCOMP: "",
    BUSINESSDESC: "",
    COUNTRY_OF_REGISTRATION: "",
    CORP_PHYSICAL_ADDRESS: "",
    TOWN_CITY: "",
    POSTAL_CODE: "",
    POSTAL_ADDRESS: "",
    PLOT_NUMBER: "",
    WEBSITE_URL: "",
    TELEPHONE: "",
    FAX_NUMBER: "",
    PERSONAL_FULLNAME: "",
    PERSONAL_EMAIL: "",
    PERSONAL_PHONENUMBER: "",
    CORP_REQISTERNO: "",
  });

  const [isValidKraPin, setIsValidKraPin] = useState(false);
  const [showValidMessage, setShowValidMessage] = useState(false);

  const [kraPinError, setKraPinError] = useState("");

  // const handleChangeCorporateInfo = (name, value) => {
  // // Convert the date to the required format before updating formData
  // if (name === "p_date_ofincorp") {
  //   value = formatDate(value);
  // }

  //   setCorporate((prevCorporate) => ({
  //     ...prevCorporate,
  //     [name]: value
  //   }));
  // }

  // Define a state for error messages
  const [errors, setErrors] = useState({});

  // Function to set an error message in the state
  const setErrorTest = (fieldName, errorMessage) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    // setTimeout(() => {
    //   clearError(fieldName);
    // }, 10000);
  };

  // Function to clear an error message from the state
  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const handleChangeCorporateInfo = (name, value) => {
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

    // Validation for p_corp_email field
    if (name === "p_corp_email") {
      // Basic validation: Check if the value is not empty
      if (value.trim() === "") {
        setErrorTest("p_corp_email", "Please enter an email address");
      } else if (!isValidEmail(value)) {
        setErrorTest("p_corp_email", "Invalid email format");
      } else {
        // Clear the error message if the value is valid
        clearError("p_corp_email");
      }
    }

    // For other fields, directly update formData
    setCorporate((prevCorporate) => ({
      ...prevCorporate,
      [name]: value,
    }));
  };

  const [customerNumber, setCustomerNumber] = useState("");

  const handleSubmitCorporateData = async (e) => {
    e.preventDefault();

    const data = JSON.stringify(corporate);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://10.203.14.195:3320/api/add-corporate-info",
      headers: {
        "x-api-key":
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("Response:", response.data); // Log the response data

      if (response.data.success) {
        const customerNumber = response.data.CUSTOMER_NUMBER;

        // Show success alert
        Swal.fire({
          title: "Success!",
          text: `Corporate information added successfully. Customer Number: ${customerNumber}`,
          icon: "success",
        });

        // Store the customer number in the parent state for use in other components
        setCustomerNumber(customerNumber);

        setCorporate({
          CUSTOMER_NAME: "UPDATE NAME",
          CORP_FLATHSENO: "",
          CORP_STREETNAME: "",
          CORP_LOCATION: "",
          CORP_POSTALADDRESS: "",
          CORP_COUNTRY: "",
          CORP_EMAIL: "",
          CORP_PREF_LANG: "",
          DATE_OFINCORP: "",
          CORP_COMM_MODE: "",
          CORP_PHONENO: "",
          CORP_TINNO: "",
          BANKSISCOMP: "",
          BUSINESSDESC: "",
          COUNTRY_OF_REGISTRATION: "",
          CORP_PHYSICAL_ADDRESS: "",
          TOWN_CITY: "",
          POSTAL_CODE: "",
          POSTAL_ADDRESS: "",
          PLOT_NUMBER: "",
          WEBSITE_URL: "",
          TELEPHONE: "",
          FAX_NUMBER: "",
          PERSONAL_FULLNAME: "",
          PERSONAL_EMAIL: "",
          PERSONAL_PHONENUMBER: "",
          CORP_REQISTERNO: "",
        });
      } else {
        // Handle case where success is not true
        Swal({
          title: "Error!",
          text: "Failed to add corporate information.",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error:", err); // Log the error
      Swal({
        title: "Error!",
        text: "An error occurred while adding corporate information.",
        icon: "error",
      });
    }
  };

  console.log("customerNumber", customerNumber)

  // const handleSubmitCorporateData = async (e) => {
  //   e.preventDefault();

  //   const data = JSON.stringify(corporate);

  //   const config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'http://10.203.14.195:3320/api/add-corporate-info',
  //     headers: {
  //       'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  //       'Content-Type': 'application/json',
  //     },
  //     data: data,
  //   };

  //   try {
  //     const response = await axios.request(config);
  //     console.log('Response:', response.data); // Log the response data
  //   } catch (err) {
  //     console.error('Error:', err); // Log the error
  //   }
  // };

  //   const handleChangeCorporateInfo = (name, value) => {
  //     // Function to encrypt data
  //     const encryptData = (data) => {
  //       const secretKey = "your-secret-key"; // Replace with your secret key
  //       return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  //     };

  //     // Function to decrypt data
  // const decryptData = (encryptedData) => {
  //   const secretKey = "your-secret-key"; // Replace with your secret key
  //   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  //   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // };

  //     // Convert the date to the required format before updating formData
  //     if (name === "p_date_ofincorp") {
  //       value = formatDate(value);
  //     }
  //     // Validation for p_corp_tinno field
  //     if (name === "p_corp_tinno") {
  //       if (value.trim() === "") {
  //         setErrorTest("p_corp_tinno", "Please enter a KRA PIN");
  //       } else if (value.length < 11) {
  //         setErrorTest("p_corp_tinno", "KRA PIN shouldn't be less than 11 digits");
  //       } else if (value.length > 11) {
  //         setErrorTest("p_corp_tinno", "KRA PIN must be up to 11 digits");
  //       } else if (value.length === 11) {
  //         setErrorTest("p_corp_tinno", "Valid PIN");
  //         clearError("p_corp_tinno");
  //       } else {
  //         clearError("p_corp_tinno");
  //       }
  //     }

  //     // Validation for p_corp_email field
  //     if (name === "p_corp_email") {
  //       if (value.trim() === "") {
  //         setErrorTest("p_corp_email", "Please enter an email address");
  //       } else if (!isValidEmail(value)) {
  //         setErrorTest("p_corp_email", "Invalid email format");
  //       } else {
  //         clearError("p_corp_email");
  //       }
  //     }

  //     // For other fields, directly update formData
  //     setCorporate((prevCorporate) => {
  //       const updatedCorporate = {
  //         ...prevCorporate,
  //         [name]: value,
  //       };

  //       // Encrypt and save the updated data to sessionStorage
  //       const encryptedData = encryptData(updatedCorporate);
  //       sessionStorage.setItem("corporateData", encryptedData);

  //       return updatedCorporate;
  //     });
  //   };

  //   // Load data from sessionStorage on component mount
  // useEffect(() => {
  //   const encryptedData = sessionStorage.getItem("corporateData");
  //   if (encryptedData) {
  //     const decryptedData = decryptData(encryptedData);
  //     setCorporate(decryptedData);
  //   }
  // }, []);

  // Load data from sessionStorage on component mount
  // useEffect(() => {
  //   const encryptedData = sessionStorage.getItem("corporateData");
  //   if (encryptedData) {
  //     const decryptedData = decryptData(encryptedData);
  //     setCorporate(decryptedData);
  //   }
  // }, []);

  // Function to validate email format
  const isValidEmail = (email) => {
    // Use a regular expression to check email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Function to validate KRA PIN
  const validateKraPin = (pin) => {
    const kraPinPattern = /^[0-9]{11}$/; // 11 digits
    return kraPinPattern.test(pin);
  };

  useEffect(() => {
    // Cleanup the message after 5 seconds if it's still showing
    if (showValidMessage) {
      const timer = setTimeout(() => {
        setShowValidMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showValidMessage]);

  console.table("corporate", corporate);
  ////////////////////////////////////////////////////////////////////////////////////////////////

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
      const response = await axios.get(
        "http://localhost:3320/api/get-relation-no",
        {
          headers: {
            "x-api-key":
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response, "ppp");
      return response.data?.GET_RELATIONO;
    } catch (e) {
      console.log(e);
    }
    return;
  }

  // ////////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = async (event, source) => {
    event.preventDefault(); // Prevents the default form submission

    if (relationData.length < parseFloat(numRows) && typeOfAccount === "LC") {
      console.log("relationData::::::::::::::::", relationData);
      // Validation: Check if required fields are empty

      const response = await axios.get(API_SERVER + "/api/get-relation-no", {
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
      });
      console.log(response, "ppp");
      const randomNumber = response.data?.GET_RELATIONO;
      //  const randomNumber =  'response.data?.GET_RELATIONO '
      console.log(randomNumber, "pppppqqqqp");
      //  const randomNumber = responseData;

      // Define an object to map field names to error messages
      const fieldErrors = {
        P_title: "Title is Mandatory",
        P_gender: "Gender is Mandatory",
        P_fname: "First name is Mandatory",
        P_sname: "Surname is Mandatory",
        P_dob: "Date of birth is Mandatory",
        P_country: "Country is Mandatory",
        // P_region: 'County is Mandatory',
        // P_district: 'Sub-County is Mandatory',
        // P_location: 'Ward is Mandatory',
        P_preferred_lang: "Preferred Language is Mandatory",
        P_RESIDENT: "Resident is Mandatory",
        P_nATIONALITY: "Nationality is Mandatory",
        SERIAL_NO_V: "SERIAL NO is Mandatory",
        P_NIN_dateissued: "Date Issued is Mandatory",
        P_nin_expiry: "Date Expiry is Mandatory",
        P_tin: "Kenyan Revenue Authority Pin is Mandatory",
        // Add more fields and error messages as needed
      };

      // Flag to track if there are any missing required fields
      let hasErrors = false;

      // Check each field for missing data and display the corresponding error message
      for (const field in fieldErrors) {
        if (!formData[field]) {
          // alert(fieldErrors[field]);
          // Display the error message using SweetAlert
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: fieldErrors[field],
          });
          hasErrors = true;
          break; // Stop checking once the first error is found
        }
      }

      // If there are missing required fields, prevent form submission
      if (hasErrors) {
        return;
      }

      const formattedDate = formatDateDoB(formData.P_dob); // Format the date
      const formattedDateIssue = formatDate(formData.P_ID_date_issued); // Format the date P_ID_date_issued
      const formattedP_NIN_dateissued = formatDate(formData.P_NIN_dateissued); // Format the date P_NIN_dateissued P_NIN_dateissued
      const formattedP_NOK_IssueDate = formatDate(
        nextOfKingData.P_NOK_IssueDate
      ); // Format the date P_NIN_dateissued P_NOK_IssueDate
      const formattedP_NOK_expirydate = formatDate(
        nextOfKingData.P_NOK_expirydate
      ); // Format the date P_NIN_dateissued P_NOK_expirydate P_nin_expiry
      const formattedP_nin_expiry = formatDate(formData.P_nin_expiry); // Format the date P_nin_expiry
      const formattedP_ID_expirydate = formatDate(formData.P_ID_expirydate); // Format the date P_ID_expirydate

      const updatedFormData = {
        ...formData,
        P_dob: formattedDate, // Update dob_v with the formatted date
        P_ID_date_issued: formattedDateIssue, // Update ID_date_issued_v with the formatted date
        P_NIN_dateissued: formattedP_NIN_dateissued,
        P_NOK_IssueDate: formattedP_NOK_IssueDate,
        P_NOK_expirydate: formattedP_NOK_expirydate,
        P_nin_expiry: formattedP_nin_expiry,
        P_ID_expirydate: formattedP_ID_expirydate,
        // randomNumberString
        randomNumberString: randomNumber,
        source,
      };

      // const getUpdatedFormData = qs.stringify(updatedFormData);

      // relationData.push(formData)
      relationData.push(updatedFormData);

      console.log("on click on save:", relationData);

      try {
        // sessionStorage.setItem('formData', JSON.stringify(getUpdatedFormData));

        const newFormData = { ...updatedFormData }; // Create a copy of form data
        // const newFormDataUpdate = { ...getUpdatedFormData }; // Create a copy of form data

        setStoredFormData((prevStoredFormData) => [
          ...prevStoredFormData,
          newFormData,
        ]);

        ////////////////////////////////////////////////////////////////////////////////////

        if (typeOfAccount === "LC" && relationData.length !== numRows) {
          setShowPopup(true);
          Swal.fire({
            icon: "info",
            title: "",
            text: "Add another Relation",
          });
        } else {
          setShowPopup(false);
        }

        /////////////////////////////////////////////////////////////////////////////////////

        setTableDataAddress([]);
        setUsedAddressTypes("");

        // Clear form fields
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
          P_Mobile_comm_no: "+254",
          P_home_phone_type: "",
          P_Home_phone_no: "+254",
          P_office_phone_type: "",
          P_office_phone_no: "+254",
          P_Office_email: "",
          P_home_email: "",
          P_enable_IB: "",
          P_enable_MB: "",
          P_enable_ussd: "",
          P_enable_smsalert: "",
          P_enable_emailalert: "",
          P_mobile_bankphoneno: "+254",
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

        setTableDataAddress([]);

        // console.log('storedFormData:::', storedFormData)
        // Handle the response data here
      } catch (error) {
        // console.log('Error storing form data:', error);
      }
    } else if (typeOfAccount === "SP") {
      console.log("relationData::::::::::::::::", relationData);
      // Validation: Check if required fields are empty

      const response = await axios.get(API_SERVER + "/api/get-relation-no", {
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/json",
        },
      });
      console.log(response, "ppp");
      const randomNumber = response.data?.GET_RELATIONO;
      //  const randomNumber =  'response.data?.GET_RELATIONO '
      console.log(randomNumber, "pppppqqqqp");
      //  const randomNumber = responseData;

      setFinalRelation(randomNumber);

      // Define an object to map field names to error messages
      const fieldErrors = {
        P_title: "Title is Mandatory",
        P_gender: "Gender is Mandatory",
        P_fname: "First name is Mandatory",
        P_sname: "Surname is Mandatory",
        P_dob: "Date of birth is Mandatory",
        P_country: "Country is Mandatory",
        // P_region: 'County is Mandatory',
        // P_district: 'Sub-County is Mandatory',
        // P_location: 'Ward is Mandatory',
        P_preferred_lang: "Preferred Language is Mandatory",
        P_RESIDENT: "Resident is Mandatory",
        P_nATIONALITY: "Nationality is Mandatory",
        SERIAL_NO_V: "SERIAL NO is Mandatory",
        P_NIN_dateissued: "Date Issued is Mandatory",
        P_nin_expiry: "Date Expiry is Mandatory",
        P_tin: "Kenyan Revenue Authority Pin is Mandatory",
        // Add more fields and error messages as needed
      };

      // Flag to track if there are any missing required fields
      let hasErrors = false;

      // Check each field for missing data and display the corresponding error message
      for (const field in fieldErrors) {
        if (!formData[field]) {
          // alert(fieldErrors[field]);
          // Display the error message using SweetAlert
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: fieldErrors[field],
          });
          hasErrors = true;
          break; // Stop checking once the first error is found
        }
      }

      // If there are missing required fields, prevent form submission
      if (hasErrors) {
        return;
      }

      const formattedDate = formatDateDoB(formData.P_dob); // Format the date
      const formattedDateIssue = formatDate(formData.P_ID_date_issued); // Format the date P_ID_date_issued
      const formattedP_NIN_dateissued = formatDate(formData.P_NIN_dateissued); // Format the date P_NIN_dateissued P_NIN_dateissued
      const formattedP_NOK_IssueDate = formatDate(
        nextOfKingData.P_NOK_IssueDate
      ); // Format the date P_NIN_dateissued P_NOK_IssueDate
      const formattedP_NOK_expirydate = formatDate(
        nextOfKingData.P_NOK_expirydate
      ); // Format the date P_NIN_dateissued P_NOK_expirydate P_nin_expiry
      const formattedP_nin_expiry = formatDate(formData.P_nin_expiry); // Format the date P_nin_expiry
      const formattedP_ID_expirydate = formatDate(formData.P_ID_expirydate); // Format the date P_ID_expirydate

      const updatedFormData = {
        ...formData,
        P_dob: formattedDate, // Update dob_v with the formatted date
        P_ID_date_issued: formattedDateIssue, // Update ID_date_issued_v with the formatted date
        P_NIN_dateissued: formattedP_NIN_dateissued,
        P_NOK_IssueDate: formattedP_NOK_IssueDate,
        P_NOK_expirydate: formattedP_NOK_expirydate,
        P_nin_expiry: formattedP_nin_expiry,
        P_ID_expirydate: formattedP_ID_expirydate,
        // randomNumberString
        randomNumberString: randomNumber,
        source,
      };

      const getUpdatedFormData = qs.stringify(updatedFormData);

      // relationData.push(formData)
      relationData.push(updatedFormData);

      console.log("on click on save:", relationData);

      try {
        // sessionStorage.setItem('formData', JSON.stringify(getUpdatedFormData));

        const newFormData = { ...updatedFormData }; // Create a copy of form data
        // const newFormDataUpdate = { ...getUpdatedFormData }; // Create a copy of form data

        setStoredFormData((prevStoredFormData) => [
          ...prevStoredFormData,
          newFormData,
        ]);

        ////////////////////////////////////////////////////////////////////////////////////

        if (typeOfAccount === "LC" && relationData.length !== numRows) {
          setShowPopup(true);
          Swal.fire({
            icon: "info",
            title: "",
            text: "Add another Relation",
          });
        } else {
          setShowPopup(false);
        }

        /////////////////////////////////////////////////////////////////////////////////////

        setTableDataAddress([]);
        setUsedAddressTypes("");

        // Clear form fields
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
          P_Mobile_comm_no: "+254",
          P_home_phone_type: "",
          P_Home_phone_no: "+254",
          P_office_phone_type: "",
          P_office_phone_no: "+254",
          P_Office_email: "",
          P_home_email: "",
          P_enable_IB: "",
          P_enable_MB: "",
          P_enable_ussd: "",
          P_enable_smsalert: "",
          P_enable_emailalert: "",
          P_mobile_bankphoneno: "+254",
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

        setTableDataAddress([]);

        // console.log('storedFormData:::', storedFormData)
        // Handle the response data here
      } catch (error) {
        // console.log('Error storing form data:', error);
      }
    } else {
      Swal.fire({
        title: "Info",
        text: "To add any more relations, you must increase the number of relation.",
        icon: "info",
      });
    }
  };

  // ////////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////

  const [savedData, setSavedData] = useState([]);

  const storeDataInSessionStorage = (event) => {
    event.preventDefault();

    // Perform basic validations
    if (!accountReferee.typesOfReferees_v || !accountReferee.acctno_v) {
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

  const getStoredData = () => {
    const storedData = sessionStorage.getItem("formData");
    if (storedData) {
      return JSON.parse(storedData);
    }

    return null;
  };

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

  const handleNumRowsChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    if (!isNaN(inputValue) && inputValue > 0) {
      setNumRows(inputValue);
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

  const handleChangeCustomername = (event) => {
    setCustomername(event.target.value);
  };

  // const handleChangeTypeOfAccount = (event) => {
  //   if (event.target.value === "SP") {
  //     setRelationData([]);
  //   }
  //   setTypeOfAccount(event.target.value);
  //   setNumRows("");
  // };

  const handleChangeTypeOfAccount = (event) => {
    const selectedType = event.target.value;

    // Check if switching to Individual and if there are multiple rows in the table
    if (selectedType === "SP" && insertedData.length > 1) {
      // Notify the user they cannot switch to Individual
      Swal.fire({
        title: "Cannot Switch to SOLE PROPRIETOR",
        text: "INFO - 002333: You cannot switch to SOLE PROPRIETOR account while there are multiple rows. Please delete extra rows.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      return; // Prevent the change
    }

    // If selected type is Joint, prompt the user to add more relation details
    if (selectedType === "LC") {
      Swal.fire({
        title: "Switching to Limited Company",
        text: "INFO - 002334: Please make sure to add more than one relation detail.",
        icon: "info",
        buttons: true,
      });
    }

    // If selected type is ID, clear relationData
    if (selectedType === "SP") {
      setRelationData([]); // Clear the data for Individual account
    }

    // Update the account type and reset number of rows
    setTypeOfAccount(selectedType);
    setNumRows(""); // Reset number of rows
  };

  console.log("-------------------", typeOfAccount);
  // const handleChangeTypeOfAccount = (event) => {
  //   setTypeOfAccount(event.target.value);
  // };

  // const [userData, setUserData] = useState({
  //   app_flag: "FLAG_VALUE",
  //   typeofC: "C",
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
  //   corporateDetails: [
  //     {
  //       P_corp_flathseno: "Na",
  //       P_corp_streetname: "Name",
  //       P_corp_location: "Kasoa",
  //       P_corp_postaladdress: "Addre",
  //       p_corp_country: "GHA",
  //       p_corp_email: "GODREY@MAIL.COM",
  //       p_corp_pref_lang: "ENG",
  //       p_date_ofincorp: "05-JUL-1999",
  //       p_corp_comm_mode: "YE",
  //       p_corp_phoneno: "0550724745",
  //       p_corp_tinno: "345677776",
  //       p_corp_reqisterno: "34567777644",
  //       p_banksiscomp: "N",
  //       p_businessdesc: "RESDF",
  //     },
  //   ],
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
  //       "p_no_withdrawal_month ": "20",
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
  //   branchcode: "001",
  //   date: "01-JUL-2023",
  //   postedby: "John",
  //   pterm_id: "001",
  //   pip: "posting",
  //   hostname: "Name",
  // });

  useEffect(() => {
    setUserData((prev) => ({ ...prev, address: refinedData }));
  }, [refinedData]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, customername }));
  }, [customername]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, nok: allNextOfKingData }));
  }, [allNextOfKingData]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, corporateDetails: [corporate] }));
  }, [corporate]);

  // useEffect(() => {
  //   setUserData((prev)=> ({...prev,
  //     aml:antiMoneyLData,
  //   }))
  // },[antiMoneyLData])

  useEffect(() => {
    setUserData((prev) => ({ ...prev, TYPEOFCUSTOMER: typeOfAccount }));
  }, [typeOfAccount]);

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      SECTOR: accountDetailsData.sector,
      Segment: accountDetailsData.customerSegment,
      subsegment: accountDetailsData.customerSubSegment,
      documentreq_type: accountDetailsData.documentRequiredType,
      currencycode: accountDetailsData.currencies,
      introsource: accountDetailsData.introductorySource,
      armcode: accountDetailsData.relationManager,
      fxcategory: accountDetailsData.fxcategory,
    }));
  }, [accountDetailsData]);

  // const handleCheckboxChange = (name, checked) => {
  //   setConfirmationData((prevData) => ({
  //     ...prevData,
  //     [name]: checked,
  //   }));
  // };

  // Function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAddNewRelation((prevState) => ({
      ...prevState,
      [name]: checked ? "Y" : "N", // Set 'Y' for checked, 'N' for unchecked
    }));
  };

  const handleFinalChange = (e) => {
    e.preventDefault();

    if (
      userData.TYPEOFCUSTOMER === "" ||
      userData.customername === "" ||
      userData.currencycode === "" ||
      // userData.introsource==='' ||
      userData.SECTOR === "" ||
      userData.subSECTOR === "" ||
      userData.Segment === "" ||
      userData.subsegment === "" ||
      userData.fxcategory === "" ||
      userData.documentreq_type === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "warning",
        text: "Please Fill all required fields",
      });
    } else {
      setShowModal(true); // Show the modal when the form is submitted
      // alert("Saved!!!")
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

  const [dummyState, setDumtState] = useState("");

  const saveDataToDatabase = async (e) => {
    e.preventDefault();
    try {
      const rels = relationData.map((i) => ({
        randomNumberString:
          i?.randomNumberString === "null" ? "" : i?.randomNumberString,
        P_title: i?.P_title === "null" ? "" : i?.P_title,
        P_gender: i?.P_gender === "null" ? "" : i?.P_gender, // Gender is Mandatory
        P_fname: i?.P_fname === "null" ? "" : i?.P_fname, // Tin Number is Mandatory
        P_mname: i?.P_mname === "null" ? "" : i?.P_mname,
        P_sname: i?.P_sname === "null" ? "" : i?.P_sname, // Surname is Mandatory
        P_short_name: i?.P_short_name === "null" ? "" : i?.P_short_name,
        P_alias: i?.P_alias === "null" ? "" : i?.P_alias,
        P_tin: i?.P_tin === "null" ? "" : i?.P_tin, // Tin Number is Mandatory

        P_preferred_name:
          i?.P_preferred_name === "null" ? "" : i?.P_preferred_name,
        P_dob: i?.P_dob === "null" ? "" : i?.P_dob,
        P_country: i?.P_country === "null" ? "" : i?.P_country, // Country is Mandatory
        P_region: i?.P_region === "null" ? "" : i?.P_region,
        P_district: i?.P_district === "null" ? "" : i?.P_district,
        P_location: i?.P_location === "null" ? "" : i?.P_location,
        P_preferred_lang:
          i?.P_preferred_lang === "null" ? "" : i?.P_preferred_lang,
        P_minor: i?.P_minor === "null" ? "" : i?.P_minor,
        P_Guardian_id: i?.P_Guardian_id === "null" ? "" : i?.P_Guardian_id,
        P_Guardian_type:
          i?.P_Guardian_type === "null" ? "" : i?.P_Guardian_type,
        P_health_challenge:
          i?.P_health_challenge === "null" ? "" : i?.P_health_challenge,
        P_health_challenge_type:
          i?.P_health_challenge_type === "null"
            ? ""
            : i?.P_health_challenge_type,
        P_staff_indicator:
          i?.P_staff_indicator === "null" ? "" : i?.P_staff_indicator,
        P_staff_id: i?.P_staff_id === "null" ? "" : i?.P_staff_id,

        P_OCCUPATION: i?.P_OCCUPATION === "null" ? "" : i?.P_OCCUPATION,
        P_OTHER_OCCUPATION:
          i?.P_OTHER_OCCUPATION === "null" ? "" : i?.P_OTHER_OCCUPATION,
        P_RESIDENT: i?.P_RESIDENT === "null" ? "" : i?.P_RESIDENT,
        P_nATIONALITY: i?.P_nATIONALITY === "null" ? "" : i?.P_nATIONALITY,
        P_NATIONAL_ID: i?.P_NATIONAL_ID === "null" ? "" : i?.P_NATIONAL_ID,
        // P_NATIONAL_ID: '0000000001',
        P_NIN_dateissued:
          i?.P_NIN_dateissued === "null" ? "" : i?.P_NIN_dateissued,
        P_nin_expiry: i?.P_nin_expiry === "null" ? "" : i?.P_nin_expiry,
        P_ID_type: i?.P_ID_type === "null" ? "" : i?.P_ID_type,
        P_id_nO: i?.P_id_nO === "null" ? "" : i?.P_id_nO,
        // P_id_nO: '987654321',
        P_id_issue_at: i?.P_id_issue_at === "null" ? "" : i?.P_id_issue_at,
        P_ID_issued_authority:
          i?.P_ID_issued_authority === "null" ? "" : i?.P_ID_issued_authority,
        P_ID_date_issued:
          i?.P_ID_date_issued === "null" ? "" : i?.P_ID_date_issued,
        P_ID_expirydate:
          i?.P_ID_expirydate === "null" ? "" : i?.P_ID_expirydate,

        P_Mobile_comm_no:
          i?.P_Mobile_comm_no === "null" ? "" : i?.P_Mobile_comm_no,
        P_home_phone_type:
          i?.P_home_phone_type === "null" ? "" : i?.P_home_phone_type,
        P_Home_phone_no:
          i?.P_Home_phone_no === "null" ? "" : i?.P_Home_phone_no,
        P_office_phone_type:
          i?.P_office_phone_type === "null" ? "" : i?.P_office_phone_type,
        P_office_phone_no:
          i?.P_office_phone_no === "null" ? "" : i?.P_office_phone_no,
        P_Office_email: i?.P_Office_email === "null" ? "" : i?.P_Office_email,
        P_home_email: i?.P_home_email === "null" ? "" : i?.P_home_email,
        P_enable_IB: i?.P_enable_IB === "null" ? "" : i?.P_enable_IB,
        P_enable_MB: i?.P_enable_MB === "null" ? "" : i?.P_enable_MB,
        P_enable_ussd: i?.P_enable_ussd === "null" ? "" : i?.P_enable_ussd,
        P_enable_smsalert:
          i?.P_enable_smsalert === "null" ? "" : i?.P_enable_smsalert,
        P_enable_emailalert:
          i?.P_enable_emailalert === "null" ? "" : i?.P_enable_emailalert,
        P_mobile_bankphoneno:
          i?.P_mobile_bankphoneno === "null" ? "" : i?.P_mobile_bankphoneno,
        P_Mobile_bankemail:
          i?.P_Mobile_bankemail === "null" ? "" : i?.P_Mobile_bankemail,
        P_NOK_fullname: i?.P_NOK_fullname === "null" ? "" : i?.P_NOK_fullname,
        P_NOK_ID_type: i?.P_NOK_ID_type === "null" ? "" : i?.P_NOK_ID_type,
        P_NOK_id_number:
          i?.P_NOK_id_number === "null" ? "" : i?.P_NOK_id_number,
        P_NOK_expirydate:
          i?.P_NOK_expirydate === "null" ? "" : i?.P_NOK_expirydate,
        P_NOK_IssueDate:
          i?.P_NOK_IssueDate === "null" ? "" : i?.P_NOK_IssueDate,
        P_NOK_relationship:
          i?.P_NOK_relationship === "null" ? "" : i?.P_NOK_relationship,

        P_NOK_Percent_share:
          i?.P_NOK_Percent_share === "null" ? "" : i?.P_NOK_Percent_share,
        P_Nok_Relation_type:
          i?.P_Nok_Relation_type === "null" ? "" : i?.P_Nok_Relation_type,
        P_Curr_addr_region:
          i?.P_Curr_addr_region === "null" ? "" : i?.P_Curr_addr_region,
        P_Curr_addr_hse_typ:
          i?.P_Curr_addr_hse_typ === "null" ? "" : i?.P_Curr_addr_hse_typ,
        P_Curr_addr_flat_hse_no:
          i?.P_Curr_addr_flat_hse_no === "null"
            ? ""
            : i?.P_Curr_addr_flat_hse_no,
        P_Curr_addr_building_name:
          i?.P_Curr_addr_building_name === "null"
            ? ""
            : i?.P_Curr_addr_building_name,
        P_Curr_addr_streetname:
          i?.P_Curr_addr_streetname === "null" ? "" : i?.P_Curr_addr_streetname,
        P_Curr_addr_location:
          i?.P_Curr_addr_location === "null" ? "" : i?.P_Curr_addr_location,
        P_Curr_addr_city:
          i?.P_Curr_addr_city === "null" ? "" : i?.P_Curr_addr_city,
        P_Curr_addr_nearestlandmark:
          i?.P_Curr_addr_nearestlandmark === "null"
            ? ""
            : i?.P_Curr_addr_nearestlandmark,
        P_Curr_addr_natureownship:
          i?.P_Curr_addr_natureownship === "null"
            ? ""
            : i?.P_Curr_addr_natureownship,
        P_Curr_addr_stayedsince:
          i?.P_Curr_addr_stayedsince === "null"
            ? ""
            : i?.P_Curr_addr_stayedsince,
        P_Curr_addr_costaccomodation:
          i?.P_Curr_addr_costaccomodation === "null"
            ? ""
            : i?.P_Curr_addr_costaccomodation,
        P_Curr_addr_currentalue:
          i?.P_Curr_addr_currentalue === "null"
            ? ""
            : i?.P_Curr_addr_currentalue,
        P_Curr_addr_balancemortgage:
          i?.P_Curr_addr_balancemortgage === "null"
            ? ""
            : i?.P_Curr_addr_balancemortgage,
        P_Curr_addr_attention_party:
          i?.P_Curr_addr_attention_party === "null"
            ? ""
            : i?.P_Curr_addr_attention_party,

        P_Perm_addr_region:
          i?.P_Perm_addr_region === "null" ? "" : i?.P_Perm_addr_region,
        P_perm_addr_hse_typ:
          i?.P_perm_addr_hse_typ === "null" ? "" : i?.P_perm_addr_hse_typ,
        P_perm_addr_flat_hse_no:
          i?.P_perm_addr_flat_hse_no === "null"
            ? ""
            : i?.P_perm_addr_flat_hse_no,
        P_perm_addr_building_name:
          i?.P_perm_addr_building_name === "null"
            ? ""
            : i?.P_perm_addr_building_name,
        P_perm_addr_streetname:
          i?.P_perm_addr_streetname === "null" ? "" : i?.P_perm_addr_streetname,
        P_perm_addr_location:
          i?.P_perm_addr_location === "null" ? "" : i?.P_perm_addr_location,
        P_perm_addr_city:
          i?.P_perm_addr_city === "null" ? "" : i?.P_perm_addr_city,
        P_perm_addr_nearestlandmark:
          i?.P_perm_addr_nearestlandmark === "null"
            ? ""
            : i?.P_perm_addr_nearestlandmark,
        P_perm_addr_natureownship:
          i?.P_perm_addr_natureownship === "null"
            ? ""
            : i?.P_perm_addr_natureownship,
        P_perm_addr_stayedsince:
          i?.P_perm_addr_stayedsince === "null"
            ? ""
            : i?.P_perm_addr_stayedsince,
        P_perm_addr_costaccomodation:
          i?.P_perm_addr_costaccomodation === "null"
            ? ""
            : i?.P_perm_addr_costaccomodation,
        P_perm_addr_currentalue:
          i?.P_perm_addr_currentalue === "null"
            ? ""
            : i?.P_perm_addr_currentalue,
        P_perm_addr_balancemortgage:
          i?.P_perm_addr_balancemortgage === "null"
            ? ""
            : i?.P_perm_addr_balancemortgage,
        P_perm_addr_attention_party:
          i?.P_perm_addr_attention_party === "null"
            ? ""
            : i?.P_perm_addr_attention_party,
        P_type_of_c: i?.P_type_of_c === "null" ? "" : i?.P_type_of_c,
        P_OVERRIDE_CODE:
          i?.P_OVERRIDE_CODE === "null" ? "" : i?.P_OVERRIDE_CODE,
        P_SUB_rel: i?.P_SUB_rel === "null" ? "" : i?.P_SUB_rel,
        P_rel_dedup: i?.P_rel_dedup === "null" ? "" : i?.P_rel_dedup,
        p_channel: i?.p_channel === "null" ? "" : i?.p_channel,
        p_pterm_id: i?.p_pterm_id === "null" ? "" : i?.p_pterm_id,
        p_pip: i?.p_pip === "null" ? "" : i?.p_pip,
        username: i?.username === "null" ? "" : i?.username,
        hostname: i?.hostname === "null" ? "" : i?.hostname,
      }));

      // const apiEndpoint = API_SERVER + '/api/post_prc_account_creation';
      // const response = await axios.post(apiEndpoint, {...userData , relationdets: rels }, {
      //   headers: {
      //     'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      //     'Content-Type': 'application/json',
      //   },
      // });

      const apiEndpoint = API_SERVER + "/api/post_prc_account_creation";
      refinedData?.forEach((i) => {
        i["relation_number"] = finalRelation;
      });
      console.log({ refinedData });
      console.log({ userData });
      const response = await axios.post(
        apiEndpoint,
        { ...userData, relationdets: rels, address: refinedData },
        {
          headers: {
            "x-api-key":
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "Content-Type": "application/json",
          },
        }
      );

      if (Object.values(confirmationData).some((value) => value === true)) {
        if (Object.values(confirmationData).every((value) => value === true)) {
          if (response.data.apiStatus === "Y") {
            console.log("Data saved to the database:", response.data);

            // return
            setCorporate({
              P_corp_flathseno: "",
              P_corp_streetname: "",
              P_corp_location: "",
              P_corp_postaladdress: "",
              p_corp_country: "",
              p_corp_email: "",
              p_corp_pref_lang: "",
              p_date_ofincorp: "",
              p_corp_comm_mode: "",
              p_corp_phoneno: "",
              p_corp_tinno: "",
              p_corp_reqisterno: "",
              p_banksiscomp: "",
              p_businessdesc: "",
            });

            // Clear the table and fields
            setAccountDetailsData({
              fxcategory: "",
              relationManager: "",
              productGroup: "",
              productSubGroup: "",
              currencies: "",
              customerSegment: "",
              customerSubSegment: "",
              documentRequiredType: "",
              introductorySource: "",
              sector: "",
              subSector: "",
            });
            handleClearTable();

            // Update state with the API response data
            setUserDataResponse(response.data);
            setCustmerNumber(response.data.customerno);
            setAccountNumber(response.data.acctno);
            setSettlement(response.data.settlement);

            Swal.fire({
              title: "Corporate Account Information",
              html: `
              <div>
                <p> <strong class="font-mono">MEMBER ID:${
                  response.data.customerno
                }</strong></p>
                <p><strong class="font-mono">SHARED CAPITAL:${
                  response.data.SHARED_CAPITAL
                }</strong></p>
                <p> <strong>${response.data?.BENEVOLENT_ACCOUNTS?.map(
                  (i) => `<div class="font-mono"> ${i} </div>`
                )}</strong></p>
              </div>
            `,
              icon: "info",
              confirmButtonText: "OK",
            });

            setShowModal(false);

            // Perform additional actions when apiStatus is Y
            const unique_ref = await axios.get(
              API_SERVER + "/api/get-unique-reference",
              {
                headers: {
                  "x-api-key": "your-api-key",
                  "Content-Type": "application/json",
                },
              }
            );

            // ... Other API calls and actions ...
            const wasteHeaders = {
              "x-api-key": "usgnotificationtest",
              "Content-Type": "application/json",
            };

            // const baseUrl =
            //   "http://10.203.14.16:8080/waste/create_notification";
            //   // "http://10.203.14.16:8384/notification/api/v1.0/waste/create_notification";
            // axios
            //   .post(
            //     baseUrl,
            //      {
            //     activity_code: "ACTOP",
            //     entrySource: "REACT",
            //     branch: JSON.parse(localStorage.getItem("userInfo"))
            //       .branchCode,
            //     created_by: JSON.parse(localStorage.getItem("userInfo")).id,
            //     device_id: localStorage.getItem("ipAddress"),
            //     para1: "",
            //     para2: "233550724745",
            //     para3: customername,
            //     para4: response.data.acctno,
            //     para5: response.data.settlement,
            //     ref_no: unique_ref?.data,
            //     notify:"Y"
            //   }
            //   ,{headers:wasteHeaders})
            //   .then((res) => {
            //     console.log({ SMS: res });
            //   });
          } else {
            // Show error message if apiStatus is not Y
            Swal.fire({
              title: "Error",
              text: `${response.data.message}`,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      } else {
        // Show SweetAlert error message if no checkbox is checked
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please check all checkboxes before saving!",
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

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

  const handleChangeShares = (e) => {
    const { name, value } = e.target;
    setFormDataShares((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validation Modal ///////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModalValidation = () => {
    setModalIsOpen(false);
    console.log("Close modal");
  };

  const [relData, setRelData] = useState("");
  console.log({ relData, relationData }, "gh");

  const addValidationData = async (row) => {
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

      const validationDate1 = formatDate(row?.date_of_birth);

      // return console.log({row , response} , "people")

      if (response.data[0] === 0) {
        setRelationData((prev) => [
          ...prev,
          {
            randomNumberString: row?.relation_no,
            P_fname: row?.first_name,
            P_mname: row?.other_name,
            P_sname: row?.surname,
            P_gender: row?.gender,
            P_dob: validationDate1,
            P_Mobile_comm_no: row?.mobile1,
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
          P_NATIONAL_ID: "",
          P_NIN_dateissued: validationDate2,
          P_nin_expiry: validationDate3,
          P_ID_type: "",
          P_id_nO: "",
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
  const toggleModalClose = () => {
    // setIsOpen(!isOpen);
    setIsOpenRelationDetails(false);
  };

  const [insertedData, setInsertedData] = useState([]);

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
    type_of_c_v: "C", // TYPE OF CUSTOMER
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

  let jointCustNo;


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const [formDataStakeholder, setFormDataStakeholder] = useState({
  //   relationNo: '',
  //   custNo: '',
  //   directorStatus: '',
  //   soleProprietor: '',
  //   partner: '',
  //   sharedPercentage: '',
  //   director: '',
  //   otherDetails: '',
  //   stakeholderType: '',
  //   shareholder: ''
  // });

  // const roles = [
  //   { name: 'Director', label: 'Director' },
  //   { name: 'Shareholder', label: 'Shareholder' },
  //   { name: 'Others', label: 'Others' },
  // ];

  const roles = [
    { name: "Director", label: "Director" },
    { name: "SoleProprietor", label: "Sole Proprietor" },
    { name: "Partner", label: "Partner" },
    { name: "Shareholder", label: "Shareholder" },
    { name: "Others", label: "Others" },
  ];

// State to keep track of which roles are selected
const [selectedRoles, setSelectedRoles] = useState({});
// State to keep track of the active status for 'Director'
const [directorStatus, setDirectorStatus] = useState("");
// State to manage input fields dynamically
const [inputValues, setInputValues] = useState({});
// State for loading state
const [loadingStakeholder, setLoadingStakeholder] = useState(false);
// State for error message
const [errorStakeholder, setErrorStakeholder] = useState(null);
// State for success message
const [success, setSuccess] = useState(null);
// State for relation number and customer number
const [relationNo, setRelationNo] = useState("123456"); // Update this if you have a dynamic source
const [custNo, setCustNo] = useState("CUST001"); // Update this if you have a dynamic source

const [saveRelationNumber, setSaveRelationNumber] = useState("")

// Handle checkbox change
const handleCheckboxChangeStakeholder = (event) => {
  const { name, checked } = event.target;
  setSelectedRoles((prevRoles) => ({
    ...prevRoles,
    [name]: checked,
  }));

  // Reset specific role details if unchecked
  if (!checked) {
    setInputValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[name];
      return updatedValues;
    });
  }
};

// Handle radio button change for 'Director'
const handleDirectorStatusChange = (event) => {
  setDirectorStatus(event.target.value);
  if (event.target.value !== "active") {
    setInputValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues["DirectorActiveDetails"];
      return updatedValues;
    });
  }
};

// Handle input change for dynamically shown fields
const handleInputChangeStakeholder = (role, value) => {
  setInputValues((prevValues) => ({
    ...prevValues,
    [role]: value,
  }));
};

// Function to handle form submission
const handleSubmitStakeholder = async (saveRelationNumber) => {
  setLoadingStakeholder(true);
  setErrorStakeholder(null);
  setSuccess(null);

  // Prepare data for submission
  const data = {
    relation_no: saveRelationNumber, // Use the dynamic state
    cust_no: customerNumber,         // Use the dynamic state
    director_status: directorStatus === "active" ? "Active" : "Non-Active",
    sole_proprietor: selectedRoles["SoleProprietor"] ? "Y" : "N",
    partner: selectedRoles["Partner"] ? "Y" : "N",
    shared_percentage: inputValues["ShareholderDetails"] || "0", // Default to "0" if no input
    director: selectedRoles["Director"] ? "Y" : "N",
    otherDetails: inputValues["OthersDetails"] || "", // Optional details
    stakeholder_type: "STK01", // You can change this to a dynamic value if needed
    shareholder: selectedRoles["Shareholder"] ? "Y" : "N",
  };

  // Log the data to check if all values are set correctly
  console.log("Data to be sent:", data, saveRelationNumber);

  // Axios request configuration
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://10.203.14.195:3320/api/add-stakeholder",
    headers: {
      "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios.request(config);
    setSuccess("Stakeholder added successfully!");
    console.log("Stakeholder added successfully", response.data);

    setSelectedRoles({});
    setDirectorStatus("");
    setInputValues({});
  } catch (error) {
    setError("An error occurred while adding the stakeholder.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
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


      // setSaveRelationNumber(response.data.rel_no_v)
      // const data = response.data.insertedData;
      const data = [{...response.data.insertedData[0] , isUserExists:false}];
      

      console.log("show customer number passed", data,data[0]?.RELATION_NO)
      // setSaveRelationNumber(data?.RELATION_NO)


      handleSubmitStakeholder(data[0]?.RELATION_NO)

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Relation Added Successfully",
        text: "The relation has been added to the database.",
      });

      if (typeOfAccount == "JTT") {
        jointCustNo = data?.CUSTOMER_NUMBER;
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


  // useEffect to update cust_no_v whenever customerNumber changes
  useEffect(() => {
    if (customerNumber) {
      setAddNewRelation((prevState) => ({
        ...prevState,
        cust_no_v: customerNumber, // Update cust_no_v with the new customer number
      }));
    }
  }, [customerNumber]); // Runs every time customerNumber changes setSaveRelationNumber


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////END OF NEW DATA PROPS PASSING FROM MyTabs///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


  const [acMandate, setAcMandate] = useState("");
  const handleAccountMandate = (value) => {
    setAcMandate(value);
  };

  useEffect(() => {
    if (typeOfAccount === "SP") {
      setAcMandate("001"); // Automatically set mandate to "001" if ID
    }
  }, [typeOfAccount]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////FUNCTION TO CREATE ACCOUNT FOR A SACCO MEMBER////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //saveCustNo
  const [userData, setUserData] = useState({
    p_app_flag: "N",
    p_typeofC: "C",
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
    p_acmandate: "",
    p_documentreq_type: "",
    p_relationdets: "",
    P_cor_det: "",
    p_documents: [],
    p_accountreferee: "",
    p_aml: [
      // anti_money
      {
        p_risk_code: "",
        p_pep: "",
        p_no_withdrawal_month: "20",
        p_no_deposit_month: "12",
        p_amt_withdrawal_month: "200",
        p_amt_deposit_month: "20000",
      },
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
    p_customerno: insertedData[0]?.CUSTOMER_NUMBER || customerNumber,
  });

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
            <td style="border: 1px solid #ccc; padding: 4px; text-align: right;">Customer Number</td>
            <td style="border: 1px solid #ccc; padding: 4px; text-align: left;">
              ${userData.p_customerno}
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
              ${userData.p_currencycode === "010" ? "010 - KENYAN SHILLING" : ""}
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
            
              ${userData.p_member_type === "M" ? "M - MEMBER" : "N - NON-MEMBER"}
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

    // If confirmed, proceed with the account creation
    const data = JSON.stringify(userData);

    console.log("Account Data", data);

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

    try {
      // setUserExist(false);
      const response = await axios.request(config);
      setResponse(response.data);
      console.log(JSON.stringify(response.data));

      // Check api_status before proceeding
      if (response.data.api_status === "Y") {
        

      //  await handleSubmitSignatory(insertedData[0])
        //  setAccountDetailsData("")
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

          // setUserExist(false)

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

        // console.log("userExist", userExist)

        // handleSubmitSignatory(data)

        setData("")

        // setTableDataNok([])

        setAcMandate("")

        setCustomername("")

        updateTypeOfC()
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

        // // Show SweetAlert with styled response and aligned content
        // Swal.fire({
        //   title: "Account Created Successfully!",
        //   html: accountDetails,
        //   icon: "success",
        //   confirmButtonText: "OK",
        //   customClass: {
        //     popup: "formatted-swal",
        //   },
        //   width: "600px", // Set a specific width
        //   padding: "10px", // Optional padding
        // });
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
      p_customerno: insertedData[0]?.CUSTOMER_NUMBER || customerNumber,
      p_aml: [
        // anti_money
        {
          p_risk_code: "",
          p_pep: "",
          p_no_withdrawal_month: "20",
          p_no_deposit_month: "12",
          p_amt_withdrawal_month: "200",
          p_amt_deposit_month: "20000",
        },
      ]
    }));
    console.log("accountDetailsData", accountDetailsData.documentRequiredType);
  }, [accountDetailsData]);

  const updateTypeOfC = () => {
    setUserData({
      ...userData,
      typeofC: "C", // Update typeofC to 'I'
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

  useEffect(() => {
    if (typeOfAccount === "SP") {
      setAcMandate("001"); // Automatically set mandate to "001" if ID
    }
  }, [typeOfAccount]);


  return (
    <div>
      <MyTabs
        handleSubmit={handleSubmit}
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
        // Final
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
        handleRowClick={handleRowClick}
        handleEdit={handleEdit}
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

        handleChangeCorporateInfo={handleChangeCorporateInfo}
        isValidKraPin={isValidKraPin}
        validateKraPin={validateKraPin}
        showValidMessage={showValidMessage}
        corporate={corporate}
        DatePicker={DatePicker}
        kraPinError={kraPinError}
        errors={errors}
        setTableDataAddress={setTableDataAddress}
        tableDataAddress={tableDataAddress}
        setUsedAddressTypes={setUsedAddressTypes}
        usedAddressTypes={usedAddressTypes}
        setModalIsOpen={setModalIsOpen}
        handleBlurValidation={handleBlurValidation}
        isModalOpen={isModalOpen}
        userDataValidation={userDataValidation}
        setDynamicNumber={setDynamicNumber}
        currencies={currencies}
        refinedData={refinedData}
        setRefinedData={setRefinedData}
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
        stakeholder={stakeholder}
        showNewUserFormStakeholders={showNewUserFormStakeholders}
        showNewUserFormFCloseStakeholder={showNewUserFormFCloseStakeholder}
        handleFormSubmitStakeholder={handleFormSubmitStakeholder}
        selectedStakeholderType={selectedStakeholderType}
        handleStakeholderTypeChange={handleStakeholderTypeChange}
        activeState={activeState}
        handleActiveStateChange={handleActiveStateChange}
        closeModal={closeModal}
        setSelectedRole={setSelectedRole}
        add_new_relation={add_new_relation}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        insertedData={insertedData}
        handleSubmitNewRelation={handleSubmitNewRelation}
        setAddNewRelation={setAddNewRelation}
        handleSubmitCorporateData={handleSubmitCorporateData}
        setCorporate={setCorporate}



        handleChangeSelect={handleChangeSelect}
        handleApprovalLimitChange={handleApprovalLimitChange}
        handleCheckboxSignatory={handleCheckboxSignatory}
        selectedValue={selectedValue}
        approvalLimit={approvalLimit}
        checkboxValues={checkboxValues}
        handleSubmitSignatory={handleSubmitSignatory}

        createAccount={createAccount}

        acMandate={acMandate}
        handleAccountMandate={handleAccountMandate}




        roles={roles}
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

      {/* Modal */}
      <Modal
        opened={showModal}
        onClose={() => setShowModal(false)}
        overlayOpacity={0.75}
        size="md"
        padding="md"
        title="Confirm Data"
      >
        <hr />
        <Text className="font-bold" size="md">
          Please confirm before Create the Member
        </Text>
        <hr />

        <form className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="checkbox1"
                className="flex-shrink-0 font-semibold"
              >
                {`Signature(s) and Photo(s) Sighted ?`}
              </label>
              <div className="flex-shrink-0">
                <Checkbox
                  id="checkbox1"
                  checked={confirmationData.checkbox1}
                  onChange={(event) =>
                    handleCheckboxChange(
                      "checkbox1",
                      event.currentTarget.checked
                    )
                  }
                />
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex items-center justify-between">
              <label
                htmlFor="checkbox2"
                className="flex-shrink-0 font-semibold"
              >
                {`Expired Document(s)/Certificate(s) Checked ?`}
              </label>
              <div className="flex-shrink-0">
                <Checkbox
                  id="checkbox2"
                  checked={confirmationData.checkbox2}
                  onChange={(event) =>
                    handleCheckboxChange(
                      "checkbox2",
                      event.currentTarget.checked
                    )
                  }
                />
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex items-center justify-between">
              <label
                htmlFor="checkbox3"
                className="flex-shrink-0 font-semibold"
              >
                {`ID's Expiry Date(s) Checked ?`}
              </label>
              <div className="flex-shrink-0">
                <Checkbox
                  id="checkbox3"
                  checked={confirmationData.checkbox3}
                  onChange={(event) =>
                    handleCheckboxChange(
                      "checkbox3",
                      event.currentTarget.checked
                    )
                  }
                />
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex items-center justify-between">
              <label
                htmlFor="checkbox4"
                className="flex-shrink-0 font-semibold"
              >
                {`Account Signatory's Checked ?`}
              </label>
              <div className="flex-shrink-0">
                <Checkbox
                  id="checkbox4"
                  checked={confirmationData.checkbox4}
                  onChange={(event) =>
                    handleCheckboxChange(
                      "checkbox4",
                      event.currentTarget.checked
                    )
                  }
                />
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex items-center justify-between">
              <label
                htmlFor="checkbox5"
                className="flex-shrink-0 font-semibold"
              >
                {`Proof Of Address Verified ?`}
              </label>
              <div className="flex-shrink-0">
                <Checkbox
                  id="checkbox5"
                  checked={confirmationData.checkbox5}
                  onChange={(event) =>
                    handleCheckboxChange(
                      "checkbox5",
                      event.currentTarget.checked
                    )
                  }
                />
              </div>
            </div>

            <hr className="border-gray-300" />

            <div className="flex items-center justify-between">
              <label
                htmlFor="checkbox6"
                className="flex-shrink-0 font-semibold"
              >
                {`Contact Number(s) Verified ?`}
              </label>
              <div className="flex-shrink-0">
                <Checkbox
                  id="checkbox6"
                  checked={confirmationData.checkbox6}
                  onChange={(event) =>
                    handleCheckboxChange(
                      "checkbox6",
                      event.currentTarget.checked
                    )
                  }
                />
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Add more checkboxes with the same format */}
            {/* ... */}
          </div>

          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded shadow">
              Return
            </button>

            <button
              // onClick={handleConfirmSave}
              onClick={saveDataToDatabase}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow"
            >
              Save
            </button>
            {/* handleEdit */}
          </div>
        </form>
      </Modal>

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
