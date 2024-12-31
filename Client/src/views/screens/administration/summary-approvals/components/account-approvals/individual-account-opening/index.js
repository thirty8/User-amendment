import React, { useState, useEffect } from "react";
import MyTabs from "./components/xplus-tabs";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import { Modal, Text, Checkbox } from "@mantine/core";
import swal from "sweetalert";
// import ImageVerification from "../../../../components/ImageVerification";
import ValidationModal from "./components/ValidationModal";
import { API_SERVER } from "../../../../../../../config/constant";
import ImageVerification from "../../../../../../../components/ImageVerification";

function IndividualAccountOpening({
  accountTypes,
  setAccountTypes,
  storeBatchNo,
  storeDescription,
  rejectedApproval,
}) {
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
  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (isNaN(date)) {
      return "1-Oct-2023";
    }

    const formattedDate = `${date.getDate()}-${formatMonth(
      date.getMonth()
    )}-${date.getFullYear()}`;
    return formattedDate;
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END HANDLING DATE FUNCTION ///////////////////////////////////////////////////////////////
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
  /////////////////////////// CALL ALL DATA IN TEMP(Temporal Tables) BEFORE GOING FOR APPROVAL WHEN CUSTOMER ACCOUNT WAS REJECTED //////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [storeAllDataFromTemp, setStoreAllDataFromTemp] = useState("");
  useEffect(() => {
    const fetchDataCustomerNumber = async () => {
      try {
        const response = await axios.post(
          // API_SERVER + "/api/get-approval-test",
          API_SERVER + "/api/get-approval-test_1",
          {
            CUSTOMER_NUMBER: storeBatchNo,
          },
          {
            headers: {
              "x-api-key":
                "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setStoreAllDataFromTemp(response.data);
        setRelationData(response.data?.relationData)
        console.log("response.data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataCustomerNumber();
  }, []);

  console.log("setStoreAllDataFromTemp", storeAllDataFromTemp);
  console.log("relationData", relationData);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////END CALL ALL DATA IN TEMP(Temporal Tables) BEFORE GOING FOR APPROVAL WHEN CUSTOMER ACCOUNT WAS REJECTED //////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// CALL CURRENCY CODESC ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// SHAREHOLDER STATE ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END OF SHAREHOLDERS ////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// NEXT OF KIN STATE //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [allNextOfKingData, setAllNextOfKingData] = useState([]);
  const [tableDataNok, setTableDataNok] = useState([]);
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////// END NEXT OF KIN STATE //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [amlData, setAmlData] = useState({
    p_risk_code: "",
    p_pep: "",
    p_no_withdrawal_month: "",
    p_no_deposit_month: "",
    p_amt_withdrawal_month: "",
    p_amt_deposit_month: "",
  });

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
          P_mobile_comm_no: "",
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
      P_mobile_comm_no: selectedData.P_mobile_comm_no,
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// END THIS FUNCTION HANDLES, ONCLICK ON A ROW IN THE TABLE TO EDIT THE NEW RELATION YOU JUST ENTERED //////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// THIS FUNCTION HANDLES, ONCLICK ON A THE EDIT BUTTON /////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        P_country: formData.P_country, // Country is Mandatory
        P_region: formData.P_region,
        P_district: formData.P_district,
        P_location: formData.P_location,
        P_preferred_lang: formData.P_preferred_lang,
        P_minor: formData.P_minor,
        P_Guardian_id: formData.P_Guardian_id,
        P_Guardian_type: formData.P_Guardian_type,
        P_health_challenge: formData.P_health_challenge,
        P_health_challenge_type: formData.P_health_challenge_type,
        P_staff_indicator: formData.P_staff_indicator,
        P_staff_id: formData.P_staff_id,
        P_OCCUPATION: formData.P_OCCUPATION,
        P_OTHER_OCCUPATION: formData.P_OTHER_OCCUPATION,
        P_RESIDENT: formData.P_RESIDENT,
        P_nATIONALITY: formData.P_nATIONALITY,
        P_NATIONAL_ID: formData.P_NATIONAL_ID,
        P_NIN_dateissued: formData.P_NIN_dateissued,
        P_nin_expiry: formData.P_nin_expiry,
        P_ID_type: formData.P_ID_type,
        P_id_nO: formData.P_id_nO,
        P_id_issue_at: formData.P_id_issue_at,
        P_ID_issued_authority: formData.P_ID_issued_authority,
        P_ID_date_issued: formData.P_ID_date_issued,
        P_ID_expirydate: formData.P_ID_expirydate,

        P_mobile_comm_no: formData.P_mobile_comm_no,
        P_home_phone_type: formData.P_home_phone_type,
        P_Home_phone_no: formData.P_Home_phone_no,
        P_office_phone_type: formData.P_office_phone_type,
        P_office_phone_no: formData.P_office_phone_no,
        P_Office_email: formData.P_Office_email,
        P_home_email: formData.P_home_email,
        P_enable_IB: formData.P_enable_IB,
        P_enable_MB: formData.P_enable_MB,
        P_enable_ussd: formData.P_enable_ussd,
        P_enable_smsalert: formData.P_enable_smsalert,
        P_enable_emailalert: formData.P_enable_emailalert,
        P_mobile_bankphoneno: formData.P_mobile_bankphoneno,
        P_Mobile_bankemail: formData.P_Mobile_bankemail,
        P_NOK_fullname: formData.P_NOK_fullname,
        P_NOK_ID_type: formData.P_NOK_ID_type,
        P_NOK_id_number: formData.P_NOK_id_number,
        P_NOK_expirydate: formData.P_NOK_expirydate,
        P_NOK_IssueDate: formData.P_NOK_IssueDate,
        P_NOK_relationship: formData.P_NOK_relationship,
        P_NOK_Percent_share: formData.P_NOK_Percent_share,
        P_Nok_Relation_type: formData.P_Nok_Relation_type,
        P_Curr_addr_region: formData.P_Curr_addr_region,
        P_Curr_addr_hse_typ: formData.P_Curr_addr_hse_typ,
        P_Curr_addr_flat_hse_no: formData.P_Curr_addr_flat_hse_no,
        P_Curr_addr_building_name: formData.P_Curr_addr_building_name,
        P_Curr_addr_streetname: formData.P_Curr_addr_streetname,
        P_Curr_addr_location: formData.P_Curr_addr_location,
        P_Curr_addr_city: formData.P_Curr_addr_city,
        P_Curr_addr_nearestlandmark: formData.P_Curr_addr_nearestlandmark,
        P_Curr_addr_natureownship: formData.P_Curr_addr_natureownship,
        P_Curr_addr_stayedsince: formData.P_Curr_addr_stayedsince,
        P_Curr_addr_costaccomodation: formData.P_Curr_addr_costaccomodation,
        P_Curr_addr_currentalue: formData.P_Curr_addr_currentalue,
        P_Curr_addr_balancemortgage: formData.P_Curr_addr_balancemortgage,
        P_Curr_addr_attention_party: formData.P_Curr_addr_attention_party,
      };
      setRelationData(updatedData);
      setUserData((prev) => ({ ...prev, relationdets: updatedData }));
      setSelectedRowIndex(null);
      setFormData({
        P_title: "",
        P_fname: "",
        P_mname: "",
        P_sname: "",
        P_gender: "",
        P_dob: "",
        P_mobile_comm_no: "",
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
        P_mobile_comm_no: "",
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// THIS FUNCTION HANDLES, ONCLICK ON A THE EDIT BUTTON /////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// THIS FUNCTION HANDLES DELETE ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// END FUNCTION HANDLES DELETE ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// HANDLE ACCOUNT ONCHANGE FUNCTION //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [acMandate, setAcMandate] = useState("");
  const handleAccountMandate = (value) => {
    setAcMandate(value);
  };

  // console.warn(acMandate)

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
    setUserData((prev) => ({ ...prev, documents: newarr }));
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

  ////////////////////////////////////////////////////////////////////

  // const handleSubmit = async (event) => {
  //   event.preventDefault(); // Prevents the default form submission

  //   if((relationData.length < parseFloat(numRows)) && typeOfAccount === "JT"){

  //   console.log("relationData::::::::::::::::", relationData)
  //    // Validation: Check if required fields are empty

  //    const response = await axios.get(API_SERVER +'/api/get-relation-no' ,  { headers: {
  //     'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  //     'Content-Type': 'application/json'
  //   }},)
  //   console.log(response ,"ppp")
  //    const randomNumber =  response.data?.GET_RELATIONO;
  //   //  const randomNumber =  'response.data?.GET_RELATIONO '
  //    console.log(randomNumber  , "pppppqqqqp")
  //   //  const randomNumber = responseData;

  //    // Define an object to map field names to error messages
  //     const fieldErrors = {
  //       P_title: 'Title is Mandatory',
  //       P_gender: 'Gender is Mandatory',
  //       P_fname: 'First name is Mandatory',
  //       P_sname: 'Surname is Mandatory',
  //       P_dob: 'Date of birth is Mandatory',
  //       P_country: 'Country is Mandatory',
  //       P_region: 'County is Mandatory',
  //       P_district: 'Sub-County is Mandatory',
  //       P_location: 'Ward is Mandatory',
  //       P_preferred_lang: "Preferred Language is Mandatory",
  //       P_RESIDENT:'Resident is Mandatory',
  //       P_nATIONALITY:'Nationality is Mandatory',
  //       SERIAL_NO_V: 'SERIAL NO is Mandatory',
  //       P_NIN_dateissued: 'Date Issued is Mandatory',
  //       P_nin_expiry: 'Date Expiry is Mandatory',
  //       P_tin: 'Kenyan Revenue Authority Pin is Mandatory',
  //       // Add more fields and error messages as needed
  //     };

  //     // Flag to track if there are any missing required fields
  //     let hasErrors = false;

  //     // Check each field for missing data and display the corresponding error message
  //     for (const field in fieldErrors) {
  //       if (!formData[field]) {
  //         // alert(fieldErrors[field]);
  //         // Display the error message using SweetAlert
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Validation Error',
  //           text: fieldErrors[field],
  //         });
  //         hasErrors = true;
  //         break; // Stop checking once the first error is found
  //       }
  //     }

  //     // If there are missing required fields, prevent form submission
  //     if (hasErrors) {
  //       return;
  //     }

  //   const formattedDate = formatDateDoB(formData.P_dob); // Format the date
  //   const formattedDateIssue = formatDate(formData.P_ID_date_issued); // Format the date P_ID_date_issued
  //   const formattedP_NIN_dateissued = formatDate(formData.P_NIN_dateissued); // Format the date P_NIN_dateissued P_NIN_dateissued
  //   const formattedP_NOK_IssueDate = formatDate(nextOfKingData.P_NOK_IssueDate); // Format the date P_NIN_dateissued P_NOK_IssueDate
  //   const formattedP_NOK_expirydate = formatDate(nextOfKingData.P_NOK_expirydate); // Format the date P_NIN_dateissued P_NOK_expirydate P_nin_expiry
  //   const formattedP_nin_expiry = formatDate(formData.P_nin_expiry); // Format the date P_nin_expiry
  //   const formattedP_ID_expirydate = formatDate(formData.P_ID_expirydate); // Format the date P_ID_expirydate

  //   const updatedFormData = {
  //     ...formData,
  //     P_dob: formattedDate, // Update dob_v with the formatted date
  //     P_ID_date_issued: formattedDateIssue, // Update ID_date_issued_v with the formatted date
  //     P_NIN_dateissued: formattedP_NIN_dateissued,
  //     P_NOK_IssueDate: formattedP_NOK_IssueDate,
  //     P_NOK_expirydate: formattedP_NOK_expirydate,
  //     P_nin_expiry: formattedP_nin_expiry,
  //     P_ID_expirydate: formattedP_ID_expirydate,
  //     // randomNumberString
  //     randomNumberString: randomNumber
  //   };

  //   const getUpdatedFormData = qs.stringify(updatedFormData);

  //   // relationData.push(formData)
  //   relationData.push(updatedFormData)

  //   try {

  //     // sessionStorage.setItem('formData', JSON.stringify(getUpdatedFormData));

  //     const newFormData = { ...updatedFormData }; // Create a copy of form data
  //     // const newFormDataUpdate = { ...getUpdatedFormData }; // Create a copy of form data

  //     setStoredFormData((prevStoredFormData) => [
  //       ...prevStoredFormData,
  //       newFormData
  //     ]);

  //   ////////////////////////////////////////////////////////////////////////////////////

  //     if (typeOfAccount === 'JT' && relationData.length !== numRows) {
  //       setShowPopup(true);
  //       Swal.fire({
  //         icon: 'info',
  //         title: '',
  //         text: 'Add another Relation',
  //       });
  //     } else {
  //       setShowPopup(false);
  //     }

  //   /////////////////////////////////////////////////////////////////////////////////////

  //   setTableDataAddress([])
  //   setUsedAddressTypes("")

  //     // Clear form fields
  //     setFormData({
  //     P_title:'',
  //     P_gender: '', // Gender is Mandatory
  //     P_fname: '', // Tin Number is Mandatory
  //     P_mname: '',
  //     P_sname: '', // Surname is Mandatory
  //     P_short_name: '',
  //     P_alias: '',
  //     P_tin: '', // Tin Number is Mandatory
  //     P_preferred_name: '',
  //     P_dob: '',
  //     P_country: '', // Country is Mandatory
  //     P_region: '',
  //     P_district: '',
  //     P_location: '',
  //     P_preferred_lang: '',
  //     P_minor: '',
  //     P_Guardian_id: '',
  //     P_Guardian_type: '',
  //     P_health_challenge: '',
  //     P_health_challenge_type: '',
  //     P_staff_indicator: '',
  //     P_staff_id: '',
  //     P_OCCUPATION: '',
  //     P_OTHER_OCCUPATION: '',
  //     P_RESIDENT: '',
  //     P_nATIONALITY: '',
  //     P_NATIONAL_ID: '',
  //     P_NIN_dateissued: '',
  //     P_nin_expiry: '',
  //     P_ID_type: '',
  //     P_id_nO: '',
  //     P_id_issue_at: '',
  //     P_ID_issued_authority: '',
  //     P_ID_date_issued: '',
  //     P_ID_expirydate: '',
  //     P_Mobile_comm_no: '+254',
  //     P_home_phone_type: '',
  //     P_Home_phone_no: '+254',
  //     P_office_phone_type: '',
  //     P_office_phone_no: '+254',
  //     P_Office_email: '',
  //     P_home_email: '',
  //     P_enable_IB: '',
  //     P_enable_MB: '',
  //     P_enable_ussd: '',
  //     P_enable_smsalert: '',
  //     P_enable_emailalert: '',
  //     P_mobile_bankphoneno: '+254',
  //     P_Mobile_bankemail: '',
  //     P_NOK_fullname: '',
  //     P_NOK_ID_type: '',
  //     P_NOK_id_number: '',
  //     P_NOK_expirydate: '',
  //     P_NOK_IssueDate: '',
  //     P_NOK_relationship: '',
  //     P_NOK_Percent_share: '',
  //     P_Nok_Relation_type: '',
  //     P_Curr_addr_region: '',
  //     P_Curr_addr_hse_typ: '',
  //     P_Curr_addr_flat_hse_no: '',
  //     P_Curr_addr_building_name: '',
  //     P_Curr_addr_streetname: '',
  //     P_Curr_addr_location: '',
  //     P_Curr_addr_city: '',
  //     P_Curr_addr_nearestlandmark: '',
  //     P_Curr_addr_natureownship: '',
  //     P_Curr_addr_stayedsince: '',
  //     P_Curr_addr_costaccomodation: '',
  //     P_Curr_addr_currentalue: '',
  //     P_Curr_addr_balancemortgage: '',
  //     P_Curr_addr_attention_party: '',
  //     P_Perm_addr_region: '',
  //     P_perm_addr_hse_typ: '',
  //     P_perm_addr_flat_hse_no: '',
  //     P_perm_addr_building_name: '',
  //     P_perm_addr_streetname: '',
  //     P_perm_addr_location: '',
  //     P_perm_addr_city: '',
  //     P_perm_addr_nearestlandmark: '',
  //     P_perm_addr_natureownship: '',
  //     P_perm_addr_stayedsince: '',
  //     P_perm_addr_costaccomodation: '',
  //     P_perm_addr_currentalue: '',
  //     P_perm_addr_balancemortgage: '',
  //     P_perm_addr_attention_party: '',
  //     P_type_of_c: '',
  //     P_OVERRIDE_CODE: '',
  //     P_SUB_rel: '',
  //     P_rel_dedup: '',
  //     p_channel: '',
  //     p_pterm_id: '',
  //     p_pip: '',
  //     username: '',
  //     hostname: ''
  //     });

  //     setTableDataAddress([]);

  //     // console.log('storedFormData:::', storedFormData)
  //     // Handle the response data here
  //   } catch (error) {
  //     // console.log('Error storing form data:', error);

  //   }

  // } else {
  //   Swal.fire('Exceed')
  // }
  // };

  // ////////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////
  const [finalRelation, setFinalRelation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission

    if (relationData.length < parseFloat(numRows) && typeOfAccount === "JT") {
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

      setFinalRelation(randomNumber);
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
      };

      const getUpdatedFormData = qs.stringify(updatedFormData);

      // relationData.push(formData)
      relationData.push(updatedFormData);

      try {
        // sessionStorage.setItem('formData', JSON.stringify(getUpdatedFormData));

        const newFormData = { ...updatedFormData }; // Create a copy of form data
        // const newFormDataUpdate = { ...getUpdatedFormData }; // Create a copy of form data

        setStoredFormData((prevStoredFormData) => [
          ...prevStoredFormData,
          newFormData,
        ]);

        ////////////////////////////////////////////////////////////////////////////////////

        if (typeOfAccount === "JT" && relationData.length !== numRows) {
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
          P_mobile_comm_no: "+254",
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
    } else if (typeOfAccount === "ID") {
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

      setFinalRelation(randomNumber);
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
      };

      const getUpdatedFormData = qs.stringify(updatedFormData);

      // relationData.push(formData)
      relationData.push(updatedFormData);

      try {
        // sessionStorage.setItem('formData', JSON.stringify(getUpdatedFormData));

        const newFormData = { ...updatedFormData }; // Create a copy of form data
        // const newFormDataUpdate = { ...getUpdatedFormData }; // Create a copy of form data

        setStoredFormData((prevStoredFormData) => [
          ...prevStoredFormData,
          newFormData,
        ]);

        ////////////////////////////////////////////////////////////////////////////////////

        if (typeOfAccount === "JT" && relationData.length !== numRows) {
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

  console.log("finalRelation::: ", finalRelation);

  // ////////////////////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////////////////

  // typesOfReferees_v:'',
  // acctno_v:'',
  // bankName_v:'',
  // acctName_v:'',
  // residentAddr_v:'',
  // emailAddr_v:'',
  // relationship_v:'',
  // NoOfYears_v:'',
  // phoneno_v:''
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

  // const checkValueInDatabase = async () => {
  //   try {
  //     const dynamicNumber = formData.P_NATIONAL_ID;

  //     // Simulating the response data with an object containing id_number
  //     const response = { data: { id_number: dynamicNumber } };

  //     if (response.data.id_number) {
  //       setMessage(`ID Number: ${response.data.id_number}`);
  //     } else {
  //       setMessage("No data found");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setMessage("Internal Server Error");
  //   }
  // };

  // This function will be called when the button is clicked
  const handleCheckValueClick = () => {
    if (formData.P_NATIONAL_ID) {
      checkValueInDatabase();
    }
  };

  //  useEffect(() => {
  //   // Define a function to check the value in the database
  //   const checkValueInDatabase = async () => {
  //     try {
  //       const dynamicNumber = formData.P_NATIONAL_ID;

  //       const response = await axios.post(API_SERVER + '/api/get-id-number-validation',

  //          { dynamicNumber: dynamicNumber},

  //         {headers: {
  //           'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  //           'Content-Type': 'application/x-www-form-urlencoded'
  //         },}

  //       );

  //       if (response.status === 200) {
  //         // Value already exists in the database
  //         setMessage(response.data.message);
  //         console.warn(response)
  //       } else {
  //         setMessage("No data found");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setMessage("Internal Server Error");
  //     }
  //   };

  //   // Call the checkValueInDatabase function when formData.P_NATIONAL_ID changes
  //   if (formData.P_NATIONAL_ID) {
  //     checkValueInDatabase();
  //   }
  // }, [formData.P_NATIONAL_ID]);

  // useEffect(() => {
  //   // Define a function to check the value in the database
  //   const checkValueInDatabase = async () => {
  //     try {
  //       const response = await axios.get(API_SERVER + "/api/get-id-number-validation", {
  //         params: {
  //           dynamicNumber: formData.P_NATIONAL_ID,
  //         },
  //         headers: {
  //           'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  //           'Content-Type': 'application/x-www-form-urlencoded'
  //         },
  //       });

  //       console.log("formData.P_NATIONAL_ID==",formData.P_NATIONAL_ID)

  //       if (response.status === 200) {
  //         // Value already exists in the database
  //         setMessage(response.data.message);
  //       } else {
  //         setMessage("No data found");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setMessage("Internal Server Error");
  //     }
  //   };

  //   // Call the checkValueInDatabase function when formData.P_tin changes
  //   if (formData.P_NATIONAL_ID) {
  //     checkValueInDatabase();
  //   }
  // }, [formData.P_NATIONAL_ID]);

  const handleChangeCustomername = (event) => {
    setCustomername(event.target.value);
  };

  // const handleChangeTypeOfAccount = (event) => {
  //   if(event.target.value === "ID"){
  //     setRelationData([])
  //   }
  //   setTypeOfAccount(event.target.value);
  //   setNumRows('');
  // };

  const handleChangeTypeOfAccount = (event) => {
    if (event.target.value === "ID") {
      setRelationData([]);
    }
    setTypeOfAccount(event.target.value);
    setNumRows("");
  };

  // const handleChangeTypeOfAccount = (event) => {
  //   if (event.target.value === "ID") {
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'This action will clear the relation data. Continue?',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, clear data',
  //       cancelButtonText: 'Cancel',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         setRelationData([]);
  //       }
  //     });
  //   } else {
  //     setRelationData([]); // This line clears the relation data immediately if the value is not "ID."
  //   }
  //   setTypeOfAccount(event.target.value);
  //   setNumRows('');
  // };

  console.log("-------------------", typeOfAccount);
  // const handleChangeTypeOfAccount = (event) => {
  //   setTypeOfAccount(event.target.value);
  // };

  const [userData, setUserData] = useState({
    app_flag: "FLAG_VALUE",
    typeofC: "I",
    TYPEOFCUSTOMER: typeOfAccount,
    customername: customername,
    typeofacct: "2",
    legalform: "20",
    currencycode: accountDetailsData.currencies,
    CHANNEL: "BRA",
    armcode: "001",
    introsource: "P1990007", //accountDetailsData.introductorySource, //"P1990007",
    SECTOR: accountDetailsData.sector,
    subSECTOR: "0101", //accountDetailsData.subSector,
    Segment: accountDetailsData.customerSegment,
    subsegment: accountDetailsData.customerSubSegment,
    fxcategory: accountDetailsData.fxcategory,
    acmandate: "003",
    documentreq_type: accountDetailsData.documentRequiredType,
    relationdets: relationData,
    accountrelations: "",
    documents: [
      {
        P_sr_no: "1",
        P_document_code: "587",
        P_mandatory: "N",
        P_doc_no: "334567",
        P_doc_date: "01-AUG-2023",
        P_received_date: "02-SEP-2023",
        P_received: "Y",
      },
    ],
    accountreferee: [
      {
        P_acct_link: "0040023354677554",
        p_bank_name: "002",
        p_fullname: "Godfrey sis",
        p_phone: "0550724745",
        p_email_address: "god@gmail.com",
        p_resident_address: "mz/an 20",
        p_relationship: "004",
        p_relationship_yrs: "20",
        p_referee_status: "O",
      },
    ],
    // aml: antiMoneyLData,
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
    nok: allNextOfKingData,
    address: refinedData,
    branchcode: JSON.parse(localStorage.getItem("userInfo"))?.branchCode,
    date: "23-JUL-2023", //JSON.parse(localStorage.getItem("userInfo"))?.postingDate,
    postedby: JSON.parse(localStorage.getItem("userInfo"))?.id,
    pterm_id: "001",
    pip: "posting",
    hostname: "Name",
  });

  useEffect(() => {
    setUserData((prev) => ({ ...prev, address: refinedData }));
  }, [refinedData]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, acmandate: acMandate }));
  }, [acMandate]);

  const updateTypeOfC = () => {
    setUserData({
      ...userData,
      typeofC: "I", // Update typeofC to 'I'
    });

    console.warn("userData.typeofC:::", userData.typeofC);
  };

  useEffect(() => {
    setUserData((prev) => ({ ...prev, customername }));
  }, [customername]);

  useEffect(() => {
    setUserData((prev) => ({ ...prev, nok: allNextOfKingData }));
  }, [allNextOfKingData]);

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
      productGroup: "2",
      productSubGroup: "220",
      subSECTOR: accountDetailsData.subSector,
      Segment: accountDetailsData.customerSegment,
      subsegment: accountDetailsData.customerSubSegment,
      documentreq_type: accountDetailsData.documentRequiredType,
      currencycode: accountDetailsData.currencies,
      introsource: accountDetailsData.introductorySource,
      armcode: accountDetailsData.relationManager,
      fxcategory: accountDetailsData.fxcategory,
    }));
  }, [accountDetailsData]);

  const handleCheckboxChange = (name, checked) => {
    setConfirmationData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

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

  // const handleFinalChange = (e) => {
  //   e.preventDefault();

  //   if(
  //     userData.TYPEOFCUSTOMER===''
  //     || userData.customername==='' ||
  //     userData.currencycode===''||
  //     // userData.introsource==='' ||
  //     userData.SECTOR===''
  //     || userData.subSECTOR===''
  //     || userData.Segment===''
  //     || userData.subsegment===''
  //     || userData.fxcategory===''
  //     || userData.documentreq_type===''
  //   ){
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'warning',
  //       text: 'Please Fill all required fields',
  //     });
  //   } else{
  //     setShowModal(true); // Show the modal when the form is submitted
  //     // alert("Saved!!!")
  //     const arr = []

  //     savedData.map((item, index) => {
  //       arr.push( {
  //         "P_acct_link": item.acctno_v,
  //         "p_bank_name": item.bankName_v,
  //         "p_fullname": item.acctName_v,
  //         "p_phone": item.phoneno_v,
  //         "p_email_address": item.emailAddr_v,
  //         "p_resident_address": item.residentAddr_v,
  //         "p_relationship": item.relationship_v,
  //         "p_relationship_yrs": item.NoOfYears_v,
  //         "p_referee_status": item.typesOfReferees_v
  //       })
  //     })

  //     setUserData((prev) => ({...prev, accountreferee: arr}))
  //   }
  // }

  // const handleConfirmSave = () => {
  //   setShowModal(false); // Close the modal
  //   // Perform the API call to save data to the database if all checkboxes are checked
  //   if (Object.values(confirmationData).every((value) => value === true)) {
  //     console.log('Data saved to the database:', userData);
  //     saveDataToDatabase(); // Uncomment this line to make the API call when all checkboxes are checked
  //   }
  // };

  const [dummyState, setDumtState] = useState("");

  // const handleConfirmSave = (e) => {
  //   e.preventDefault();
  //   //setShowModal(false); // Close the modal

  //   setAccountDetailsData({
  //     fxcategory:'',
  //     relationManager:'',
  //     productGroup:'',
  //     productSubGroup:'',
  //     currencies:'',
  //     customerSegment:'',
  //     customerSubSegment:'',
  //     documentRequiredType:'',
  //     introductorySource:'',
  //     sector:'',
  //     subSector:''
  //   })

  //   handleClearTable()

  //   // Check if any checkbox is checked
  //   if (Object.values(confirmationData).some((value) => value === true)) {
  //     // Perform the API call to save data to the database if all checkboxes are checked
  //     if (Object.values(confirmationData).every((value) => value === true)) {
  //       console.log('Data saved to the database:', userData);
  //       saveDataToDatabase(); // Uncomment this line to make the API call when all checkboxes are checked
  //       setShowModal(false);
  //     }
  //   } else {
  //     // Show SweetAlert error message if no checkbox is checked
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'Please check all checkboxes before saving!',
  //     });
  //   }

  // };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////  Final Function to open the account for individual //////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        P_id_issue_at: i?.P_id_issue_at === "null" ? "" : i?.P_id_issue_at,
        P_ID_issued_authority:
          i?.P_ID_issued_authority === "null" ? "" : i?.P_ID_issued_authority,
        P_ID_date_issued:
          i?.P_ID_date_issued === "null" ? "" : i?.P_ID_date_issued,
        P_ID_expirydate:
          i?.P_ID_expirydate === "null" ? "" : i?.P_ID_expirydate,

        P_mobile_comm_no:
          i?.P_mobile_comm_no === "null" ? "" : i?.P_mobile_comm_no,
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

      console.log("else:::: ", rels);
      // return

      const apiEndpoint = API_SERVER + "/api/post_prc_account_creation";
      refinedData?.forEach((i) => {
        i["relation_number"] = finalRelation;
      });
      console.log({ refinedData });
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

      console.warn("Final User Data to be saved:::", userData);

      if (Object.values(confirmationData).some((value) => value === true)) {
        if (Object.values(confirmationData).every((value) => value === true)) {
          if (response.data.apiStatus === "Y") {
            console.log("Data saved to the database:", response.data);

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
            setTableDataAddress([]);

            // Update state with the API response data
            setUserDataResponse(response.data);
            setCustmerNumber(response.data.customerno);
            setAccountNumber(response.data.acctno);
            setSettlement(response.data.settlement);

            const responseData = response.data.customerno;
            const valuesArray = responseData
              .split("|")
              .filter((value) => value !== "");

            // Show SweetAlert with the account information
            Swal.fire({
              title: "Member Account Information",
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
                  "x-api-key":
                    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                  "Content-Type": "application/json",
                },
              }
            );

            // ... Other API calls and actions ...
            const wasteHeaders = {
              "x-api-key": "usgnotificationtest",
              "Content-Type": "application/json",
            };

            const baseUrl =
              "http://10.203.14.16:8080/waste/create_notification";
            // "http://10.203.14.16:8384/notification/api/v1.0/waste/create_notification";
            axios
              .post(
                baseUrl,
                {
                  activity_code: "ACTOP",
                  entrySource: "X100",
                  branch: JSON.parse(localStorage.getItem("userInfo"))
                    .branchCode,
                  created_by: JSON.parse(localStorage.getItem("userInfo")).id,
                  device_id: localStorage.getItem("ipAddress"),
                  para1: "",
                  para2: "233550724745",
                  para3: customername,
                  para4: response.data.acctno,
                  para5: response.data.settlement,
                  ref_NO: unique_ref?.data,
                  notify: "Y",
                },
                { headers: wasteHeaders }
              )
              .then((res) => {
                console.log({ SMS: res });
              });
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
      // Handle the error when the request returns a 401 status code
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: "Error",
          text: "Unauthorized: Your request requires authentication.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        // Handle other types of errors
        console.error("An error occurred:", error);
      }
    }
  };
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
            P_mobile_comm_no: `${row?.mobile1}`,
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
          P_mobile_comm_no: `${row?.mobile1}`,
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
        ////////// New Usage ////////////////
        storeDescription={storeDescription}
        rejectedApproval={rejectedApproval}
        storeAllDataFromTemp={storeAllDataFromTemp}
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
          Please confirm before Creating the Member
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
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded shadow"
            >
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

      {/* {typeOfAccount === "ID" ? <ValidationModal isOpen={modalIsOpen} onClose={closeModalValidation} /> : ''}  */}

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
