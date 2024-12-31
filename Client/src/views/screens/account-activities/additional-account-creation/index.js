import React,{useState, useEffect} from "react";
import MyTabs from "./components/xplus-tabs";
import {API_SERVER} from "../../../../config/constant"
import axios from 'axios'
import qs from 'qs';
import Swal from 'sweetalert2';
import { Modal, Text, Checkbox } from '@mantine/core';
import swal from "sweetalert";

function Create_Additional_Account({ accountTypes, setAccountTypes }) {
  const [customerData, setCustomerData] = useState('')
  const [customerDataTable, setCustomerDataTable] = useState('')
  const [storedFormData, setStoredFormData] = useState([]);
  const [custType, setCustType] = useState('');
  const [data, setData] = useState('');



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${formatMonth(date.getMonth())}-${date.getFullYear()}`;
    return formattedDate;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////


  const [sharesData, setSharesData] = useState({
    p_certicate_id: '', 
    p_type_of_share: '', 
    p_transaction_type: '', 
    p_security_type_id: '', 
    p_security: '', 
    p_certificate_no: '', 
    p_no_shares: '', 
    p_restriction: '', 
    p_stop: '', 
    p_no_of_tax_lots: '', 
    p_reason_for_reverse: '', 
    p_reason_for_transfer: '', 
    p_date_of_gift: '', 
    p_fair_market_valdate_gift: '', 
    p_date_of_death: '', 
    p_fair_market_valdate_death: '', 
    p_base_on_level: '', 
    p_cancel_split_zeroshares: '', 
    p_total_no_shares: '', 
    p_date: '', 
    p_total_no_of_shareholders: ''
  });

  /////////////////////////////////////////////////////////////////////////

  const [nextOfKingData, setNextOfKingData] = useState({
    p_next_of_kin:'', 
    p_next_of_kin_address:'',
    p_next_of_kin_phone:'', 
    p_next_of_kin_id_type:'', 
    p_next_of_kin_id_no:'',
    p_next_of_kin_id_expdate:'', 
    p_next_of_kin_relationship:'', 
    p_next_of_kin_dob:'',
    p_next_of_kin_percentshare:''
  });

  const [tableDataNok, setTableDataNok] = useState([]);

  const [allNextOfKingData, setAllNextOfKingData] = useState([]); // New state

  const handleChangeNextOfKin = (name, value) => {
    setNextOfKingData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  const handleSubmitNextOfKin = (e) => {
    e.preventDefault();

    if (!nextOfKingData.p_next_of_kin || !nextOfKingData.p_next_of_kin_address || !nextOfKingData.p_next_of_kin_phone || !nextOfKingData.p_next_of_kin_id_type) {
      window.alert('Please fill out all fields.');
        } else{

          const formattedDatep_next_of_kin_dob = formatDate(nextOfKingData.p_next_of_kin_dob)
          const formattedDatep_next_of_kin_id_expdate = formatDate(nextOfKingData.p_next_of_kin_id_expdate)

            const newData = {
                p_next_of_kin:nextOfKingData.p_next_of_kin, 
                p_next_of_kin_address:nextOfKingData.p_next_of_kin_address,
                p_next_of_kin_phone:nextOfKingData.p_next_of_kin_phone, 
                p_next_of_kin_id_type:nextOfKingData.p_next_of_kin_id_type, 
                p_next_of_kin_id_no:nextOfKingData.p_next_of_kin_id_no,
                p_next_of_kin_id_expdate:formattedDatep_next_of_kin_id_expdate, 
                p_next_of_kin_relationship:nextOfKingData.p_next_of_kin_relationship, 
                p_next_of_kin_dob:formattedDatep_next_of_kin_dob,
                p_next_of_kin_percentshare:nextOfKingData.p_next_of_kin_percentshare
              };

        setAllNextOfKingData((prevAllData) => [...prevAllData, newData]); // Store in new state
        setTableDataNok((prevTableData) => [...prevTableData, nextOfKingData]);
        setNextOfKingData({
            p_next_of_kin:'',
            p_next_of_kin_address:'',
            p_next_of_kin_phone:'',
            p_next_of_kin_id_type:'',
            p_next_of_kin_id_no:'',
            p_next_of_kin_id_expdate:'',
            p_next_of_kin_relationship:'',
            p_next_of_kin_dob:'',
            p_next_of_kin_percentshare:'',
        });
      };
    }

    console.log("The next of king=====", allNextOfKingData)

    const handleClearTable = () => {
      setAllNextOfKingData([]);
      setTableDataNok([]);
    };



  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  

  
  // const [AccountReferees, setAccountReferees] = useState({
  //   typeofReferees_v: '',
  //   acctno_v: '',
  //   bank_Name_v: '',
  //   account_Name_v: '',
  //   residentaddress_v:'',
  //   emailaddress_v:'',
  //   relationship_v:'',
  //   no_of_years_known_v: '',
  //   phoneno_v:''
  // })
  const [formData, setFormData] = useState({
      // title_v: "001",
      // gender_v: "F",
      // fname_v: "four",
      // mname: "Middle",
      // sname: "Surname",
      // short_name: "JDS",
      // alias: "JD",
      // tin: "123456789",
      // preferred_name: "Johnny",
      // dob: "01-MAY-1990",
      // country: "USA",
      // region: "California",
      // district: "XYZ",
      // location: "ABC",
      // preferred_lang: "English",
      // minor: "Y",
      // Guardian_id: "987654321",
      // Guardian_type: "001",
      // health_challenge: "N",
      // health_challenge_type: "",
      // staff_indicator: "N",
      // staff_id: "",
      // OCCUPATION: "Engineer",
      // OTHER_OCCUPATION: "",
      // RESIDENT: "Y",
      // nATIONALITY: "American",
      // NATIONAL_ID: "987654321",
      // NIN_dateissued: "15-JAN-2010",
      // nin_expiry: "15-JAN-2030",
      // ID_type: "001",
      // id_nO: "1234567",
      // id_issue_at: "USA",
      // ID_issued_authority: "Government",
      // ID_date_issued: "01-JAN-2010",
      // ID_expirydate: "01-JAN-2030",
      // Mobile_comm_no: "0550724745",
      // home_phone_type: "Landline",
      // Home_phone_no: "987654321",
      // office_phone_type: "",
      // office_phone_no: "",
      // Office_email: "john.doe@example.com",
      // home_email: "john.doe@example.com",
      // enable_IB: "Y",
      // enable_MB: "Y",
      // enable_ussd: "N",
      // enable_smsalert: "Y",
      // enable_emailalert: "Y",
      // mobile_bankphoneno: "",
      // Mobile_bankemail: "",
      // NOK_fullname: "Jane Smith",
      // NOK_ID_type: "ID Card",
      // NOK_id_number: "7654321",
      // NOK_expirydate: "01-MAY-2030",
      // NOK_IssueDate: "",
      // NOK_relationship: "Spouse",
      // NOK_Percent_share: "",
      // Nok_Relation_type: "West",
      // Curr_addr_region: "Apartment",
      // Curr_addr_flat_hse_no: "A1",
      // Curr_addr_building_name: "Sunset Towers",
      // Curr_addr_streetname: "Main Street",
      // Curr_addr_location: "City Center",
      // Curr_addr_city: "Los Angeles",
      // Curr_addr_nearestlandmark: "",
      // Curr_addr_natureownship: "",
      // Curr_addr_stayedsince: "",
      // Curr_addr_costaccomodation: "2000",
      // Curr_addr_currentalue: "500000",
      // Curr_addr_balancemortgage: "250000",
      // Curr_addr_attention_party: "John Doe",
      // Perm_addr_region: "East",
      // perm_addr_hse_typ: "House",
      // perm_addr_flat_hse_no: "",
      // perm_addr_building_name: "",
      // perm_addr_streetname: "Park Avenue",
      // perm_addr_location: "Residential Area",
      // perm_addr_city: "New York",
      // perm_addr_nearestlandmark: "",
      // perm_addr_natureownship: "",
      // perm_addr_stayedsince: "",
      // perm_addr_costaccomodation: "3000",
      // perm_addr_currentalue: "800000",
      // perm_addr_balancemortgage: "",
      // perm_addr_attention_party: ""

   
    // title_v:'',
    // gender_v: '', // Gender is Mandatory
    // fname_v: '', // Tin Number is Mandatory
    // mname_v: '', 
    // sname_v: '', // Surname is Mandatory
    // short_name_v: '',
    // alias_v: '',
    // tin_v: '', // Tin Number is Mandatory
    // preferred_name_v: '',
    // dob_v: '',
    // country_v: '', // Country is Mandatory
    // region_v: '',
    // district_v: '',
    // location_v: '',
    // preferred_lang_v: '',
    // minor_v: '',
    // Guardian_id_v: '',
    // Guardian_type_v: '',
    // health_challenge_v: '',
    // health_challenge_type_v: '',
    // staff_indicator_v: '',
    // staff_id_v: '',
    // staff_related_v:'',
    // director_related_v: '',
    // OCCUPATION_V: '',
    // OTHER_OCCUPATION_V: '',
    // RESIDENT_V: '',
    // nATIONALITY_V: '',
    // NATIONAL_ID_V: '',
    // NIN_dateissued_v: '',
    // nin_expiry_v: '',
    // ID_type_v: '',
    // id_nO_v: '',
    // id_issue_at_v: '',
    // ID_issued_authority_v: '',
    // ID_date_issued_v: '',
    // ID_expirydate_v: '',
    // Mobile_comm_no_v: '',
    // home_phone_type_v: '',
    // Home_phone_no_v: '',
    // office_phone_type_v: '',
    // office_phone_no_v: '',
    // Office_email_v: '',
    // home_email: '',
    // enable_IB_V: '',
    // enable_MB_V: '',
    // enable_ussd_V: '',
    // enable_smsalert_V: '',
    // enable_emailalert_V: '',
    // mobile_bankphoneno_V: '',
    // Mobile_bankemail_v: '',
    // NOK_fullname_v: '',
    // NOK_ID_type_v: '',
    // NOK_id_number_v: '',
    // NOK_expirydate_v: '',
    // NOK_IssueDate_v: '',
    // NOK_relationship_v: '',
    // NOK_Percent_share_v: '',
    // Nok_Relation_type_v: '',
    // Curr_addr_region_v: '',
    // Curr_addr_hse_typ_v: '',
    // Curr_addr_flat_hse_no_v: '',
    // Curr_addr_building_name_v: '',
    // Curr_addr_streetname_v: '',
    // Curr_addr_location_v: '',
    // Curr_addr_city_v: '',
    // Curr_addr_nearestlandmark_v: '',
    // Curr_addr_natureownship_v: '',
    // Curr_addr_stayedsince_v: '',
    // Curr_addr_costaccomodation_v: '',
    // Curr_addr_current_value_v: '',
    // Curr_addr_balancemortgage_v: '',
    // Curr_addr_attention_party_v: '',
    // Perm_addr_region_v: '',
    // perm_addr_hse_typ_v: '',
    // perm_addr_flat_hse_no_v: '',
    // perm_addr_building_name_v: '',
    // perm_addr_streetname_v: '',
    // perm_addr_location_v: '',
    // perm_addr_city_v: '',
    // perm_addr_nearestlandmark_v: '',
    // perm_addr_natureownship_v: '',
    // perm_addr_stayedsince_v: '',
    // perm_addr_costaccomodation_v: '',
    // perm_addr_current_value_v: '',
    // perm_addr_balancemortgage_v: '',
    // perm_addr_attention_party_v: '',
    // type_of_c_v: '',
    // OVERRIDE_CODE_v: '',
    // SUB_rel_v: '',
    // rel_dedup_v: '',
    // p_channel: '',
    // p_pterm_id: '',
    // p_pip: '',
    // username_v: '',
    // hostname_v: '',
    // ...AccountReferees
    // Add other input parameters here
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const [accountDetailsData, setAccountDetailsData] = useState({
    fxcategory:'',
    relationManager:'',
    productGroup:'',
    productSubGroup:'',
    currencies:'',
    customerSegment:'',
    customerSubSegment:'',
    documentRequiredType:'',
    introductorySource:'',
    sector:'',
    subSector:''
  })

  const [accountReferee, setAccountReferee] = useState({
    typesOfReferees_v:'O',
    acctno_v:'',
    bankName_v:'',
    acctName_v:'',
    residentAddr_v:'',
    emailAddr_v:'',
    relationship_v:'',
    NoOfYears_v:'',
    phoneno_v:''
  })


  // console.log('Account Details:::', accountDetailsData)

  sessionStorage.setItem('accountDetailsData', JSON.stringify(accountDetailsData));

  // useEffect(() => {
  //   if (custType) {
  //     fetchData();
  //   }
  // }, [custType]);

  const handleCustTypeChange = (value) => {
    setAccountDetailsData((prev)=>({...prev , documentRequiredType: value}))
    setCustType(value);
    if (custType) {
      fetchData();
    }

    setTimeout(() => {
      const input = document.getElementById("introSource");
      input.focus();
    },0);
  };

  const[arrayDocs, setArrayDocs] = useState('')

  const handleChangeDocs = (e, index, alphabet) => {
    const newarr = [...arrayDocs]
   
    newarr.map((i, key)=>{
      if(key === index){
        if(alphabet === "a"){
          i.P_doc_no = e.target.value
        // setArrayDocs((prev) => ([...prev, {...prev[key], P_doc_no:e.target.value}]))
      } else if(alphabet === "b"){
        i.P_doc_date = formatDate(e.target.value)
        // setArrayDocs((prev) => ([...prev, {...prev[key], P_doc_date:e.target.value}]))
      } else if(alphabet === "c"){
        i.P_received_date = formatDate(e.target.value)
        
      } else if(alphabet === "d"){
        i.P_received = e.target.checked ? 'Y' : 'N'
      }  
    }
    })
    setArrayDocs(newarr)
    setUserData((prev) => ({...prev, documents: newarr}))
  }

  console.log("arrayDocs:::", arrayDocs)


  const fetchData = async () => {
    try {
      const data = {
        cust_type: custType,
      };

      const response = await fetch(API_SERVER + '/api/documents/user', {
        method: 'POST',
        headers: {
          'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("My Document:::",JSON.stringify(responseData));

      const arr = [];
      responseData.responseMessage.map((item) => {
        arr.push({
          "P_sr_no": item.sr_no,
          "P_document_code": item.doc_code,
          "P_mandatory": item.mandate,
          "P_doc_no": "",
          "P_doc_date": "",
          "P_received_date": "",
          "P_received": ""
        })
      })
      setArrayDocs(arr)
      setData(responseData.responseMessage);
    } catch (error) {
      // console.log(error);
    }
  };



  const handleChange = (name, value) => {
    if (name === 'P_fname') { // Replace 'fieldName' with the actual name of the input field
      value = value.replace(/\d/g, ''); // Remove all digits from the input value
    }
    if (name === 'P_mname') { // Replace 'fieldName' with the actual name of the input field
      value = value.replace(/\d/g, ''); // Remove all digits from the input value
    }
    if (name === 'P_dob') {
      const currentDate = new Date();
      const selectedDate = new Date(value);

      if (selectedDate > currentDate) {
        // If the selected date is in the future, clear the input field and show a SweetAlert message
        Swal.fire({
          icon: 'error',
          title: 'Invalid Date',
          text: 'Please select a date in the past or present.',
        });
        value = '';
      } else {
        const yearsDifference = currentDate.getFullYear() - selectedDate.getFullYear();
        if (yearsDifference <= 18) {
          // If the user is 18 years old or younger, show an alert indicating they are a minor
          Swal.fire({
            icon: 'info',
            title: 'Minor Alert',
            text: 'You are a minor. Please make sure your Guardian ID and Type is Provided !!!',
          });
        }
      }
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    // setAccountReferees((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value
    // }));
    console.log("Value:::ddddddd", formData)
  };
  
  console.log("Value:::accountDetailsData", accountDetailsData)
  const [relationData, setRelationData] = useState([])


const formatMonth = (month) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return monthNames[month];
};

const formatDateDoB = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  if (inputDate > currentDate) {
    throw new Error("Cannot format a future date.");
  }

  const formattedDate = `${inputDate.getDate()}-${formatMonth(inputDate.getMonth())}-${inputDate.getFullYear()}`;
  return formattedDate;
};





console.log("relationData::::::::::::::::", relationData)

const handleSubmit = async (event) => {
  event.preventDefault(); // Prevents the default form submission

   // Validation: Check if required fields are empty

   if (!formData.P_title || !formData.P_fname || !formData.P_sname || !formData.P_gender ||!formData.P_tin || !formData.P_dob || !formData.P_country || !formData.P_region || !formData.P_district || !formData.P_location ||
    !formData.P_preferred_lang || !formData.P_minor || !formData.P_OCCUPATION || !formData.P_RESIDENT || !formData.P_nATIONALITY || 
    !formData.P_NATIONAL_ID || !formData.P_NIN_dateissued || !formData.P_nin_expiry || !formData.P_ID_type || !formData.P_id_nO ||
    
    !formData.P_id_issue_at || !formData.P_ID_issued_authority || !formData.P_ID_date_issued || !formData.P_ID_expirydate || !formData.P_Mobile_comm_no
    // ||!formData.P_home_phone_type ||!formData.P_Home_phone_no || !formData.P_office_phone_type ||!formData.P_office_phone_no

    ||!formData.P_Office_email || !formData.P_home_email || !formData.P_enable_IB || !formData.P_enable_MB || !formData.P_enable_ussd ||
    !formData.P_enable_smsalert || !formData.P_enable_emailalert || !formData.P_mobile_bankphoneno || !formData.P_Mobile_bankemail

    // !formData.P_NOK_fullname || !formData.P_NOK_ID_type || !formData.P_NOK_id_number || !formData.P_NOK_expirydate || !formData.P_NOK_IssueDate ||
    // !formData.P_NOK_relationship
    
    // !formData.P_Curr_addr_region || !formData.P_Curr_addr_hse_typ || !formData.P_Curr_addr_flat_hse_no
    // ||!formData.P_Curr_addr_building_name || !formData.P_Curr_addr_streetname || !formData.P_Curr_addr_location || !formData.P_Curr_addr_city
    // || !formData.P_Curr_addr_nearestlandmark || !formData.P_Curr_addr_natureownship || !formData.P_Curr_addr_stayedsince || !formData.P_Curr_addr_costaccomodation
    // || !formData.P_Curr_addr_currentalue || !formData.P_Curr_addr_balancemortgage || !formData.P_Curr_addr_attention_party

    ) {
    alert('Please fill in all required fields');
    return;
  }
  


  const formattedDate = formatDateDoB(formData.P_dob); // Format the date
  const formattedDateIssue = formatDate(formData.P_ID_date_issued); // Format the date P_ID_date_issued
  const formattedP_NIN_dateissued = formatDate(formData.P_NIN_dateissued); // Format the date P_NIN_dateissued P_NIN_dateissued
  const formattedP_NOK_IssueDate = formatDate(nextOfKingData.P_NOK_IssueDate); // Format the date P_NIN_dateissued P_NOK_IssueDate
  const formattedP_NOK_expirydate = formatDate(nextOfKingData.P_NOK_expirydate); // Format the date P_NIN_dateissued P_NOK_expirydate P_nin_expiry
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
  };

  const getUpdatedFormData = qs.stringify(updatedFormData);

  // relationData.push(formData)
  relationData.push(updatedFormData)

  try {

    sessionStorage.setItem('formData', JSON.stringify(getUpdatedFormData));

    const newFormData = { ...updatedFormData }; // Create a copy of form data
    // const newFormDataUpdate = { ...getUpdatedFormData }; // Create a copy of form data

    setStoredFormData((prevStoredFormData) => [
      ...prevStoredFormData,
      newFormData
    ]);


    // Clear form fields
    setFormData({
    P_title:'',
    P_gender: '', // Gender is Mandatory
    P_fname: '', // Tin Number is Mandatory
    P_mname: '', 
    P_sname: '', // Surname is Mandatory
    P_short_name: '',
    P_alias: '',
    P_tin: '', // Tin Number is Mandatory
    P_preferred_name: '',
    P_dob: '',
    P_country: '', // Country is Mandatory
    P_region: '',
    P_district: '',                                 
    P_location: '',
    P_preferred_lang: '',
    P_minor: '',
    P_Guardian_id: '',
    P_Guardian_type: '',
    P_health_challenge: '',
    P_health_challenge_type: '',
    P_staff_indicator: '',
    P_staff_id: '',
    P_OCCUPATION: '',
    P_OTHER_OCCUPATION: '',
    P_RESIDENT: '',
    P_nATIONALITY: '',
    P_NATIONAL_ID: '',
    P_NIN_dateissued: '',
    P_nin_expiry: '',
    P_ID_type: '',
    P_id_nO: '',
    P_id_issue_at: '',
    P_ID_issued_authority: '',
    P_ID_date_issued: '',
    P_ID_expirydate: '',
    P_Mobile_comm_no: '',
    P_home_phone_type: '',
    P_Home_phone_no: '',
    P_office_phone_type: '',
    P_office_phone_no: '',
    P_Office_email: '',
    P_home_email: '',
    P_enable_IB: '',
    P_enable_MB: '',
    P_enable_ussd: '',
    P_enable_smsalert: '',
    P_enable_emailalert: '',
    P_mobile_bankphoneno: '',
    P_Mobile_bankemail: '',
    P_NOK_fullname: '',
    P_NOK_ID_type: '',
    P_NOK_id_number: '',
    P_NOK_expirydate: '',
    P_NOK_IssueDate: '',
    P_NOK_relationship: '',
    P_NOK_Percent_share: '',
    P_Nok_Relation_type: '',
    P_Curr_addr_region: '',
    P_Curr_addr_hse_typ: '',
    P_Curr_addr_flat_hse_no: '',
    P_Curr_addr_building_name: '',
    P_Curr_addr_streetname: '',
    P_Curr_addr_location: '',
    P_Curr_addr_city: '',
    P_Curr_addr_nearestlandmark: '',
    P_Curr_addr_natureownship: '',
    P_Curr_addr_stayedsince: '',
    P_Curr_addr_costaccomodation: '',
    P_Curr_addr_currentalue: '',
    P_Curr_addr_balancemortgage: '',
    P_Curr_addr_attention_party: '',
    P_Perm_addr_region: '',
    P_perm_addr_hse_typ: '',
    P_perm_addr_flat_hse_no: '',
    P_perm_addr_building_name: '',
    P_perm_addr_streetname: '',
    P_perm_addr_location: '',
    P_perm_addr_city: '',
    P_perm_addr_nearestlandmark: '',
    P_perm_addr_natureownship: '',
    P_perm_addr_stayedsince: '',
    P_perm_addr_costaccomodation: '',
    P_perm_addr_currentalue: '',
    P_perm_addr_balancemortgage: '',
    P_perm_addr_attention_party: '',
    P_type_of_c: '',
    P_OVERRIDE_CODE: '',
    P_SUB_rel: '',
    P_rel_dedup: '',
    p_channel: '',
    p_pterm_id: '',
    p_pip: '',
    username: '',
    hostname: ''
    });


    // console.log('storedFormData:::', storedFormData)
    // Handle the response data here
  } catch (error) {
    // console.log('Error storing form data:', error);

  }
};


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
    alert('Please fill in all the fields.');
    return;
  }

  // Create a copy of the current data
  const newData = { ...accountReferee };

  // Add the new data to the savedData array
  setSavedData((prevData) => [...prevData, newData]);

  // Validation passed, store data in sessionStorage
  sessionStorage.setItem('accountReferees', JSON.stringify(accountReferee));

  // Reset the form fields
  setAccountReferee({
    typesOfReferees_v: '',
    acctno_v: '',
    bankName_v: '',
    acctName_v: '',
    residentAddr_v: '',
    emailAddr_v: '',
    relationship_v: '',
    NoOfYears_v: '',
    phoneno_v: '',
  });
};




useEffect(() => {
    sessionStorage.setItem('savedData', JSON.stringify(savedData));
  }, [savedData]);

  useEffect(() => {
    const storedDataReferee = sessionStorage.getItem('savedData');
    if (storedDataReferee) {
      setSavedData(JSON.parse(storedDataReferee));
    }
  }, []);

// const getaccountReferee = JSON.parse(sessionStorage.getItem('accountReferees'));

// console.log("getsession:::", savedData)


  const getStoredData = () => {
    const storedData = sessionStorage.getItem('formData');
    if (storedData) {
      return JSON.parse(storedData);
    }


    return null;
  };

  useEffect(() => {
    setStoredFormData(getStoredData() || []);
  }, []);

  useEffect(() => {
    // Update local storage whenever stored form data changes
    sessionStorage.setItem('formData', JSON.stringify(storedFormData));
  }, [storedFormData]);


  // const storedFormData = getStoredData();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const FinalDataToDatabase = {
  anotherData:{
    data, savedData, ...formData
  },
  formData,
  savedData,
  data
}


const BasicData = sessionStorage.getItem('formData');

const [amlData, setAmlData] = useState({
  p_risk_code:"",
  p_pep: "",
  p_no_withdrawal_month: "20",
  p_no_deposit_month: "12",
  p_amt_withdrawal_month: "200",
  p_amt_deposit_month: "20000"
})

// console.log('BasicData from SessionStorage:::', formData)

//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
const [userDataResponse, setUserDataResponse] = useState('')

const [custmerNumber, setCustmerNumber] = useState('')
const [accountNumber, setAccountNumber] = useState('')
const [settlement , setSettlement] = useState('')

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

  const [customername, setCustomername] = useState('');
  const [typeOfAccount, setTypeOfAccount] = useState('');


  const handleChangeCustomername = (event) => {
    setCustomername(event.target.value);
  };

  const handleChangeTypeOfAccount = (event) => {
    console.log("-------------------",typeOfAccount)
    setTypeOfAccount(event.target.value);
  };


  const [userData, setUserData] = useState({
  "app_flag": "FLAG_VALUE",
  "typeofC": "I",
  "TYPEOFCUSTOMER": typeOfAccount,
  "customername": customername,
  "typeofacct": "2",
  "legalform": "20",
  "currencycode": accountDetailsData.currencies,
  "CHANNEL": "BRA",
  "armcode": "001",
  "introsource":"P1990007",
  "SECTOR": accountDetailsData.sector,
  "subSECTOR": "0101",
  "Segment": accountDetailsData.customerSegment,
  "subsegment": accountDetailsData.customerSubSegment,
  "fxcategory": accountDetailsData.fxcategory,
  "acmandate": "003",
  "documentreq_type": accountDetailsData.documentRequiredType,
  "relationdets":relationData,
  "accountrelations": "",
  "documents": [
    {
      "P_sr_no": "1",
      "P_document_code": "587",
      "P_mandatory": "N",
      "P_doc_no": "334567",
      "P_doc_date": "01-AUG-2023",
      "P_received_date": "02-SEP-2023",
      "P_received": "Y"
    }
  ],
  "accountreferee": [
    {
      "P_acct_link": "0040023354677554",
      "p_bank_name": "002",
      "p_fullname": "Godfrey sis",
      "p_phone": "0550724745",
      "p_email_address": "god@gmail.com",
      "p_resident_address": "mz/an 20",
      "p_relationship": "004",
      "p_relationship_yrs": "20",
      "p_referee_status": "O"
    }
  ],
  "aml": [
    // amlData
    {
      "p_risk_code": "",
      "p_pep": "",
      "p_no_withdrawal_month ": "20",
      "p_no_deposit_month": "12",
      "p_amt_withdrawal_month": "200",
      "p_amt_deposit_month": "20000"
    }
  ],
  "sourceofwealth": "",
  "sourceoffund": "",
  "transtype": "",
  "nok":allNextOfKingData,
  "branchcode": "001",
  "date": "01-JUL-2023",
  "postedby": "John",
  "pterm_id": "001",
  "pip": "posting",
  "hostname": "Name"

  })

   useEffect(() => {
    setUserData((prev)=> ({...prev, 
      customername,
    }))
  },[customername])


  useEffect(() => {
    setUserData((prev)=> ({...prev, 
      nok:allNextOfKingData,
    }))
  },[allNextOfKingData])


  useEffect(() => {
    setUserData((prev)=> ({...prev, 
      TYPEOFCUSTOMER: typeOfAccount,
    }))
  },[typeOfAccount])

  useEffect(() => {
    setUserData((prev)=> ({...prev, 
      SECTOR: accountDetailsData.sector,
      Segment: accountDetailsData.customerSegment,
      subsegment: accountDetailsData.customerSubSegment,
      documentreq_type: accountDetailsData.documentRequiredType,
      currencycode: accountDetailsData.currencies,
      introsource: accountDetailsData.introductorySource,
      armcode: accountDetailsData.relationManager,
      fxcategory:accountDetailsData.fxcategory,
    }))
  },[accountDetailsData])
  

  const handleCheckboxChange = (name, checked) => {
    setConfirmationData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };


const handleFinalChange = (e) => {
  e.preventDefault();

  // "app_flag": "FLAG_VALUE",
  // "typeofC": "I",
  // "TYPEOFCUSTOMER": typeOfAccount,
  // "customername": customername,
  // "typeofacct": "2",
  // "legalform": "20",
  // "currencycode": accountDetailsData.currencies,
  // "CHANNEL": "BRA",
  // "armcode": "001",
  // "introsource":"P1990007",
  // "SECTOR": accountDetailsData.sector,
  // "subSECTOR": "0101",
  // "Segment": accountDetailsData.customerSegment,
  // "subsegment": accountDetailsData.customerSubSegment,
  // "fxcategory": accountDetailsData.fxcategory,
  // "acmandate": "003",
  // "documentreq_type": accountDetailsData.documentRequiredType,
  // "relationdets":relationData,
  // "accountrelations": "",
  // "documents": [
  //   {
  //     "P_sr_no": "1",
  //     "P_document_code": "587",
  //     "P_mandatory": "N",
  //     "P_doc_no": "334567",
  //     "P_doc_date": "01-AUG-2023",
  //     "P_received_date": "02-SEP-2023",
  //     "P_received": "Y"
  //   }
  // ],
  // "accountreferee": [
  //   {
  //     "P_acct_link": "0040023354677554",
  //     "p_bank_name": "002",
  //     "p_fullname": "Godfrey sis",
  //     "p_phone": "0550724745",
  //     "p_email_address": "god@gmail.com",
  //     "p_resident_address": "mz/an 20",
  //     "p_relationship": "004",
  //     "p_relationship_yrs": "20",
  //     "p_referee_status": "O"
  //   }
  // ],
  // "aml": [
  //   // amlData
  //   {
  //     "p_risk_code": "",
  //     "p_pep": "",
  //     "p_no_withdrawal_month ": "20",
  //     "p_no_deposit_month": "12",
  //     "p_amt_withdrawal_month": "200",
  //     "p_amt_deposit_month": "20000"
  //   }
  // ],
  // "sourceofwealth": "",
  // "sourceoffund": "",
  // "transtype": "",
  // "branchcode": "001",
  // "date": "01-JUL-2023",
  // "postedby": "John",
  // "pterm_id": "001",
  // "pip": "posting",
  // "hostname": "Name"


  if(
    userData.TYPEOFCUSTOMER==='' || userData.customername==='' || 
    userData.currencycode===''|| userData.introsource==='' ||
    userData.SECTOR==='' || userData.subSECTOR==='' || userData.Segment==='' || userData.subsegment==='' || userData.fxcategory==='' || 
    userData.documentreq_type===''
  ){
    Swal.fire({
      icon: 'warning',
      title: 'warning',
      text: 'Please Fill all required fields',
    });
  } else{
    setShowModal(true); // Show the modal when the form is submitted
    // alert("Saved!!!")
    const arr = []
  
    savedData.map((item, index) => {
      arr.push( {
        "P_acct_link": item.acctno_v,
        "p_bank_name": item.bankName_v,
        "p_fullname": item.acctName_v,
        "p_phone": item.phoneno_v,
        "p_email_address": item.emailAddr_v,
        "p_resident_address": item.residentAddr_v,
        "p_relationship": item.relationship_v,
        "p_relationship_yrs": item.NoOfYears_v,
        "p_referee_status": item.typesOfReferees_v
      })
    })
  
    setUserData((prev) => ({...prev, accountreferee: arr}))
  }

  //   setShowModal(true); // Show the modal when the form is submitted
  // // alert("Saved!!!")
  // const arr = []

  // savedData.map((item, index) => {
  //   arr.push( {
  //     "P_acct_link": item.acctno_v,
  //     "p_bank_name": item.bankName_v,
  //     "p_fullname": item.acctName_v,
  //     "p_phone": item.phoneno_v,
  //     "p_email_address": item.emailAddr_v,
  //     "p_resident_address": item.residentAddr_v,
  //     "p_relationship": item.relationship_v,
  //     "p_relationship_yrs": item.NoOfYears_v,
  //     "p_referee_status": item.typesOfReferees_v
  //   })
  // })

  // setUserData((prev) => ({...prev, accountreferee: arr}))
}

// const handleConfirmSave = () => {
//   setShowModal(false); // Close the modal
//   // Perform the API call to save data to the database if all checkboxes are checked
//   if (Object.values(confirmationData).every((value) => value === true)) { 
//     console.log('Data saved to the database:', userData);
//     saveDataToDatabase(); // Uncomment this line to make the API call when all checkboxes are checked
//   }
// };


const handleConfirmSave = (e) => {
  e.preventDefault();
  //setShowModal(false); // Close the modal
 
  setAccountDetailsData({
    fxcategory:'',
    relationManager:'',
    productGroup:'',
    productSubGroup:'',
    currencies:'',
    customerSegment:'',
    customerSubSegment:'',
    documentRequiredType:'',
    introductorySource:'',
    sector:'',
    subSector:''
  })

  handleClearTable()

  // Check if any checkbox is checked
  if (Object.values(confirmationData).some((value) => value === true)) {
    // Perform the API call to save data to the database if all checkboxes are checked
    if (Object.values(confirmationData).every((value) => value === true)) {
      console.log('Data saved to the database:', userData);
      saveDataToDatabase(); // Uncomment this line to make the API call when all checkboxes are checked
      setShowModal(false);
    }
  } else {
    // Show SweetAlert error message if no checkbox is checked
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please check all checkboxes before saving!',
    });
  }
  
};


/////////////////////////////////////

const saveDataToDatabase = async () => {
  try {
    const apiEndpoint = API_SERVER + "/api/post_prc_account_creation"; // Replace with your API endpoint
    const response = await axios.post(apiEndpoint, userData, {
      headers: {
        'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        'Content-Type': 'application/json',
      },
    });
    console.log('Data saved to the database:', response.data);
    setUserDataResponse(response.data);

    setCustmerNumber(response.data.customerno);
    setAccountNumber(response.data.acctno);
    setSettlement(response.data.settlement);

    if (response.data.apiStatus === "Y") {
      // ... your existing code ...

      // Show SweetAlert with the account number, settlement, and customerno
      Swal.fire({
        title: 'Member Account Information',
        html: `
          <div>
            <p>Account Number: <strong>${response.data.acctno}</strong></p>
            <p>Settlement Account: <strong>${response.data.settlement}</strong></p>
            <p>Member Number: <strong>${response.data.customerno}</strong></p>
          </div>
        `,
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }else{
      Swal.fire({
        title: 'Error',
        text: `${response.data.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
   

    if(response.data.apiStatus === "Y"){

      const unique_ref = await axios.get(
        API_SERVER + "/api/get-unique-reference",
        {
          headers: {
          'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          'Content-Type': 'application/json',
        }
      },
      );
      
      const baseUrl =
        "http://10.203.14.16:8080/waste/create_notification";
      axios
        .post(baseUrl, {
          activity_code: "ACTOP",
          channel_id: "REACT",
          branch: JSON.parse(localStorage.getItem("userInfo"))
            .branchCode,
          done_by: JSON.parse(localStorage.getItem("userInfo")).id,
          terminal_id: localStorage.getItem("ipAddress"),
          para1: "",
          para2: "233550724745",
          para3: customername,
          para4: accountNumber,
          para5: settlement,
          ref_no: unique_ref?.data,
        }) 
        .then((res) => {
          console.log({ SMS: res });
        });

    }
    
  } catch (error) {
    console.log('Error:', error);
  }
};


// console.log("Response:::::::::::", userDataResponse)

// console.log("CustmerNumber:::::::::::", custmerNumber)
// console.log("AccountNumber:::::::::::", accountNumber)
// console.log("Settlement:::::::::::", settlement)





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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

        handleClearTable={handleClearTable}
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
          <Text className="font-bold" size="md">Please confirm before Create the Member</Text>
        <hr />
        
        <form className="mt-4">
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <label htmlFor="checkbox1" className="flex-shrink-0 font-semibold">
        {`Signature(s) and Photo(s) Sighted ?`}
      </label>
      <div className="flex-shrink-0">
        <Checkbox
          id="checkbox1"
          checked={confirmationData.checkbox1}
          onChange={(event) =>
            handleCheckboxChange("checkbox1", event.currentTarget.checked)
          }
        />
      </div>
    </div>

    <hr className="border-gray-300" />

    <div className="flex items-center justify-between">
      <label htmlFor="checkbox2" className="flex-shrink-0 font-semibold">
        {`Expired Document(s)/Certificate(s) Checked ?`}
      </label>
      <div className="flex-shrink-0">
        <Checkbox
          id="checkbox2"
          checked={confirmationData.checkbox2}
          onChange={(event) =>
            handleCheckboxChange("checkbox2", event.currentTarget.checked)
          }
        />
      </div>
    </div>

    <hr className="border-gray-300" />

    <div className="flex items-center justify-between">
      <label htmlFor="checkbox3" className="flex-shrink-0 font-semibold">
        {`ID's Expiry Date(s) Checked ?`}
      </label>
      <div className="flex-shrink-0">
        <Checkbox
          id="checkbox3"
          checked={confirmationData.checkbox3}
          onChange={(event) =>
            handleCheckboxChange("checkbox3", event.currentTarget.checked)
          }
        />
      </div>
    </div>

    <hr className="border-gray-300" />

    <div className="flex items-center justify-between">
      <label htmlFor="checkbox4" className="flex-shrink-0 font-semibold">
        {`Account Signatory's Checked ?`}
      </label>
      <div className="flex-shrink-0">
        <Checkbox
          id="checkbox4"
          checked={confirmationData.checkbox4}
          onChange={(event) =>
            handleCheckboxChange("checkbox4", event.currentTarget.checked)
          }
        />
      </div>
    </div>

    <hr className="border-gray-300" />

    <div className="flex items-center justify-between">
      <label htmlFor="checkbox5" className="flex-shrink-0 font-semibold">
        {`Proof Of Address Verified ?`}
      </label>
      <div className="flex-shrink-0">
        <Checkbox
          id="checkbox5"
          checked={confirmationData.checkbox5}
          onChange={(event) =>
            handleCheckboxChange("checkbox5", event.currentTarget.checked)
          }
        />
      </div>
    </div>

    <hr className="border-gray-300" />

    <div className="flex items-center justify-between">
      <label htmlFor="checkbox6" className="flex-shrink-0 font-semibold">
        {`Contact Number(s) Verified ?`}
      </label>
      <div className="flex-shrink-0">
        <Checkbox
          id="checkbox6"
          checked={confirmationData.checkbox6}
          onChange={(event) =>
            handleCheckboxChange("checkbox6", event.currentTarget.checked)
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
      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded shadow"
    >
      Return
    </button>

    <button
      onClick={handleConfirmSave}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow"
    >
      Save
    </button>
  </div>
</form>

      </Modal>
    </div>  
    );
}

export default Create_Additional_Account;





