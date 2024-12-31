import React, { useState, useEffect } from "react";
import axios from "axios";
import Label from "../../../../components/others/Label/Label";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
import { MDBIcon } from "mdb-react-ui-kit";
import Account_Details from "../individual-account-opening/components/account-details";
import { API_SERVER } from "../../../../config/constant";
import swal from "sweetalert";
import qs from "qs";
import { Modal, Button } from "react-bootstrap";
// import Risk_analysis_test from "./components/risk-analysis-test";
import Risk_analysis_test from "../individual-account-opening/components/risk-analysis-test";
import ImageCapturing from "../../../../components/ImageCapturing";
import ImageVerification from "../../../../components/ImageVerification";
import InputField from "../individual-account-opening/components/comp/InputField";
import ActionButtons from "./components/comp/ActionButtons";
// import SelectField from "../../../../../components/others/Fields/SelectField";
const host = window.location.host;

function QuickAccountOpening({ data, accountTypes, setAccountTypes }) {
  const [title, setTitle] = useState([]);
  const [salutation, setSalutation] = useState([]);
  const [idType, setIdType] = useState([]);
  const [city, setCity] = useState([]);
  const [country, setCountry] = useState([]);
  const [documentRequiredType, setDocumentRequiredType] = useState([]);
  const [productGroup, setProductGroup] = useState([]);
  const [productSubGroup, setProductSubGroup] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedSubgroup, setSelectedSubgroup] = useState([]);
  const [IntroductorySource, setIntroductorySource] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  //  const [customerSegment, setCustomerSegment] = useState("");
  const [customerSubSegment, setCustomerSubSegment] = useState([]);
  const [sector, setSector] = useState([]);
  const [subSector, setSubSector] = useState([]);
  const [bankNames, setBankNames] = useState([]);
  const [relationships, setRelationship] = useState([]);
  const [handleData, setHandleData] = useState("");
  const [productData, setProductData] = useState([]);
  const [active, setActive] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  //  Quick Account Opening
  // const [effective, SetEffective] = useState(
  //   new Date().toISOString().substr(0, 10)
  // );
  const [isValidDate, setIsValidDate] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  // Define state variables for form inputs
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [riskCategory, setRiskCategory] = useState("");
  const [productCode, setProductCode] = useState("");
  const [subProduct, setSubProduct] = useState("");
  const [accountCurrency, setAccountCurrency] = useState("");
  const [customerSegment, setCustomerSegment] = useState("");
  const [subCustomerSegment, setSubCustomerSegment] = useState("");
  const [quickaccount, setQuickAccount] = useState("");
  const [effective, setEffective] = useState("");
  const [armcode, setArmcode] = useState([]);
  const [isImageCapturing, setIsImageCapturing] = useState(false);
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);

  //  Anti Money Laundering
  const [sourceOfWealth, setSourceOfWealth] = useState([]);
  const [sourceOfFund, setSourceOfFund] = useState([]);
  const [transactionType, setTransactionType] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [signature, setSignature] = useState(null);
  const [riskDetails, setRiskDetails] = useState([]);

  // PEP Evanluation
  const [nameScreen, setNameScreen] = useState([]);
  const [location, setLocation] = useState([]);
  const [customerTypePEP, setCustomerTypePEP] = useState([]);
  const [productPEP, setProductPEP] = useState([]);
  const [channelPEP, setChannelPEP] = useState([]);
  const [randomString, setRandomString] = useState("");

  const [relationNo, setRelationNo] = useState("");

  const [imageAccount, setImageAccount] = useState("");
  const [getFirstName, setGetFirstName] = useState("");
  const [getMiddleName, setGetMiddleName] = useState("");
  const [getLastName, setGetLastName] = useState("");
  const [createdCustomerID, setCreatedCustomerID] = useState("");


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          API_SERVER + "/api/get-effective-date",
          { headers }
        );
        const data = response.data[0].effective_date;
        setEffective(data.substring(0, 10));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const handleKeyDown = (event) => {
    // Get today's date and format it to yyyy-mm-dd
    const today = new Date().toISOString().split("T")[0];

    // Display SweetAlert notification if future date is entered
    if (dateOfBirth > today) {
      // Display SweetAlert notification if future date is selected
      swal({
        icon: "error",
        title: "Oops...",
        text: "Please Do Not Select Future Date",
      });
      setDateOfBirth("");
    } else {
      // Check if the selected date is a valid date
      const isValid = !isNaN(new Date(dateOfBirth).getTime());

      if (!isValid) {
        setIsValidDate(false);
      } else {
        setIsValidDate(true);
      }
      // setDate(selectedDate);
      setDateOfBirth(dateOfBirth);
    }
  };

  const handleBlur = () => {
    // Check if the selected date is a valid date
    const isValid = !isNaN(new Date(dateOfBirth).getTime());

    if (!isValid) {
      // Display SweetAlert notification if invalid date is entered
      swal({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid date!",
      });
      setDateOfBirth("");
      setIsValidDate(true);
    } else {
      setIsValidDate(true);
    }
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleImageCapturing = () => {
    setIsImageCapturing(true);
  };

  const handleSweetAlertConfirmed = () => {
    setSweetAlertConfirmed(false);
  };

  const closeImageCapturing = () => {
    setIsImageCapturing(false);
  };

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  const handleInputClick = () => {
    setShowModal(true);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleSignatureChange = (event) => {
    setSignature(event.target.files[0]);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const customTheme = JSON.parse(localStorage.getItem("theme"));

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const validationRules = {
    firstName: { required: true },
    email: { required: true, pattern: /^\S+@\S+$/i },
  };

  const [formValues, setFormValues] = useState({
    title: "",
    salutation: "",
    risk_id: "",
    id_type: "",
    city: "",
    country: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [accountDetailsData, setAccountDetailsData] = useState({
    productGroup: "",
    subprod: "",
    currencies: "",
    customerSegment: "",
    sub_segment: "",
    sector: "",
    sub_sector: "",
    armcode: "",
  });

  const [formValueAccountReferees, setFormValueAccountReferees] = useState({
    typeofReferees: "",
    bankName: "",
    accountName: "",
    residentAddress: "",
    emailAddress: "",
    relationship: "",
    noOfYearsKnown: "",
    phoneNumber: "",
  });

  // console.log(customTheme);
   const headers = {
     "x-api-key":
       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
     "Content-Type": "application/json",
   };






  
  console.log({ showModal });
  useEffect(() => {
    setAccountDetailsData((prev) => ({ ...prev, fname: firstName }));
    setAccountDetailsData((prev) => ({ ...prev, lname: lastName }));
    setAccountDetailsData((prev) => ({ ...prev, oname: middleName }));
    setAccountDetailsData((prev) => ({ ...prev, DOB: dateOfBirth }));
    setAccountDetailsData((prev) => ({ ...prev, personlphone: phoneNumber }));
    setAccountDetailsData((prev) => ({ ...prev, risk_code: randomString }));
  }, [firstName, lastName, middleName, dateOfBirth, phoneNumber, randomString]);
  // 'risk_code': 'K07',
  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      fname,
      lname,
      oname,
      DOB,
      personlphone,
      risk_code,
      sub_sector,
      subprod,
      sub_segment,
      armcode,
    } = accountDetailsData;
    const value_date = new Date(DOB)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");
    axios
      .post(
        API_SERVER + "/api/create-account-quick",
        {
          cust_type: "I",
          CUSTOMER_cat: "",
          title: "Mr",
          fname,
          lname,
          oname,
          tin_v: "0098766",
          DOB: value_date,
          sufix_v: "test4",
          place_ofbirth: "Acrra",
          country_residence: "GHA",
          staff_cat: "",
          risk_code,
          reason: "text4",
          company_name: "text4",
          contitution_code: "text4",
          corp_tin: "text4",
          date_of_corp: "02-MAR-2022",
          domiciel_coun: "text4",
          residence_status: "",
          prefer_lang: "English",
          approval_panel: "text4",
          sex_v: "M",
          nationality: "Ghanaian",
          homeaddr: "NA MZ 181",
          homeaddr1: "text4",
          workaddr: "test4",
          city: "ccrqa",
          subprod,
          username: "UNIONADMIN",
          posted_by_v: "text4",
          sub_sector,
          sub_segment,
          doctype: "100",
          docid: `'${Math.floor(Math.random() * 10000)}'`,
          doc_expirydate: "02-MAR-2022",
          personlphone,
          mandate: "text5",
          email: "godfy@gmail.com",
          issueauth: "text4",
          issuedte: "02-MAR-2022",
          sig: "",
          pic: "",
          fing: "",
          NO_DB_TRANS: "2",
          TOTAL_DB_TRANS: "100",
          NO_CR_TRANS: "1",
          TOTAL_CR_TRANS: "500",
          doc_ref: "test4",
          PROOF_ADDRESS: "",
          SOURCE_OF_FUNDS: "test4",
          OCCUPATION: "test4",
          NATURE_OF_BUSINESS: "test4",
          armcode,
          source_of_worth: "test4",
          worth_val: "test4",
          rfid: "test4",
          kycdoc: "",
          terminal: "test4",
          approval: "P",
          para3: "BRA",
        },
        { headers }
      )
      .then((response) => {
        // console.log(response.data.created_acct_no);
        setImageAccount(response.data.created_acct_no);
        setQuickAccount(response.data);
        setGetFirstName(accountDetailsData.fname);
        setGetMiddleName(accountDetailsData.oname);
        setGetLastName(accountDetailsData.lname);
        setCreatedCustomerID(response.data.created_customer_no);
        swal({
          title: "Success",
          text: `Account Created succesfully for ${accountDetailsData.fname}
               ACCOUNT NUMBER : ${response.data.created_acct_no}
               CUSTOMER ID : ${response.data.created_customer_no}`,
          icon: "success",
          buttons: "OK",
        }).then((result) => {
          if (result) {
            setFirstName("");
            setMiddleName("");
            setLastName("");
            setDateOfBirth("");
            setPhoneNumber("");
            setRandomString("");
            setQuickAccount((prev) => ({
              ...prev,
              // created_customer_no: "",
              // created_acct_no: "",
            }));
            setAccountDetailsData((prev) => ({
              ...prev,
              productGroup: "",
              subprod: "",
              sub_segment: "",
              sub_sector: "",
              currencies: "",
              sector: "",
              customerSegment: "",
              armcode: "",
            }));
          }

          // setSweetAlertConfirmed(true);
        });
      })
      .catch((error) => console.error(error));
  };

  console.log("Quick", quickaccount);
  console.log("response.data.created_acct_no", imageAccount);
  console.log("response.data.created_acct_no", getFirstName);
  console.log("response.data.created_acct_no", getLastName);
  console.log("response.data.created_acct_no", createdCustomerID);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  };


  const generateRandomString = () => {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return randomNumber.toString();
  };


  const handleSaveChanges = () => {
    const randomString = generateRandomString();
    console.log(`Generated random string: ${randomString}`);
    setRandomString(randomString);
    // props.onSave(randomString);
    handleClose();

    swal({
      icon: "success",
      title: "Risk Code Generated",
      text: randomString,
    });
  };

  return (
    <>
<div>
  <ActionButtons />
</div>
      <div
        // style={{ zoom: "0.85" }}
        className="-mb-5"
      >
        <form onSubmit={handleSubmit}>
          
          <div className="border rounded">
            <div>
              <div className="border p-2 m-1 bg-white">
                <div className="flex justify-end">

                <div>   
                  <div class="md:flex md:items-center space-x-15 mb-2">
                    <div class="md:w-1/3">
                      <Label label="Member&nbsp;Number" fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 md:ml-[2px]">
                    <InputField
                      id="accountno"
                      inputWidth={'100%'}
                      name="accountno"
                      // value={custmerNumber}
                      disabled
                      style={{alignText:'center'}}
                      // onChange={(e) => handleChange('sname_v', e.target.value)}
                    />
                    </div>
                  </div>

                  <div class="md:flex md:items-center space-x-15 mb-2">
                    <div class="md:w-1/3">
                      <Label label="Account&nbsp;&nbsp;&nbsp;Number " fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 md:ml-[2px]">
                    <InputField
                      id="membership"
                      inputWidth={'100%'}
                      name="membership"
                      // value={accountNumber}
                      disabled
                      style={{alignText:'center'}}
                      // onChange={(e) => handleChange('sname_v', e.target.value)}
                    />
                    </div>
                  </div>

                  <div class="md:flex md:items-center space-x-15">
                    <div class="md:w-1/3">
                      <Label label="Settlement&nbsp;Account&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 md:ml-[2px]">
                    <InputField
                      id="statement"
                      inputWidth={'100%'}
                      name="statement"
                      // value={settlement}
                      disabled
                      style={{alignText:'center'}}
                      // onChange={(e) => handleChange('sname_v', e.target.value)}
                    />
                    </div>
                  </div>

                </div>  

                  {/* <div>
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                        <div class="md:w-1/3">
                          <Label label="Customer ID" />
                        </div>
                        <div className="md:w-2/3 md:mr-2">
                          <input
                            className="my_inputs bg-gray-300"
                            value={quickaccount.created_customer_no}
                            type="text"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                        <div class="md:w-1/3">
                          <Label label="Account No" />
                        </div>
                        <div className="md:w-2/3 md:mr-2">
                          <input
                            className="my_inputs bg-gray-300"
                            value={quickaccount.created_acct_no}
                            type="text"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="md:flex ">
              {/*  */}
              <div className="md:flex md:justify-center w-full">
                {/* **************************************** */}
                <div className="w-full max-w-2xl">
                  

                  

                  

                  

                  

                 

                  <hr className="" />

                  <div className="">
                    <div className="border rounded bg-white shadow-lg shadow-black">
                      <div className="md:flex justify-center w-full">
                      
                          
                        {/* **************************************** */}
                        <div className="w-full max-w-xl">

                          {/* Effective Date */}
                          <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Effective Date" />
                              </div>
                              <div class="md:w-2/3 ">
                                <InputField
                                  className="risk_label text-center bg-gray-200"
                                  type="text"
                                  id="effectiveDate"
                                  value={effective}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>

                          {/* First Name */}
                          <div class="w-full max-w-xl ">
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="First Name" required={true} />
                              </div>
                              <div className="md:w-2/3 md:mr-2">
                                <InputField
                                  inputWidth={'100%'}
                                  type="text"
                                  id="firstName"
                                  onKeyDown={(e) => switchFocus(e, "middleName")}
                                  value={firstName}
                                  onChange={(e) => {
                                    setFirstName(e.target.value);
                                  }}
                                  
                                />
                              </div>
                            </div>
                          </div>


                          {/* Middle Name */}
                          <div class="w-full max-w-xl ">
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Middle Name" />
                              </div>
                              <div className="md:w-2/3 md:mr-2">
                                <InputField
                                  inputWidth={'100%'}
                                  type="text"
                                  onKeyDown={(e) => switchFocus(e, "lastName")}
                                  id="middleName"
                                  value={middleName}
                                  onChange={(e) => setMiddleName(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>


                          {/* Last Name */}
                          <div class="w-full max-w-xl ">
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Last Name" required={true} />
                              </div>
                              <div className="md:w-2/3 md:mr-2">
                                <InputField
                                  inputWidth={'100%'}
                                  type="text"
                                  onKeyDown={(e) => switchFocus(e, "dateOfBirth")}
                                  id="lastName"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                              
                                />
                              </div>
                            </div>
                          </div>

                          {/* Date Of Birth */}
                          <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Date of birth " required={true} />
                              </div>
                              <div class="md:w-2/3 ">
                                <InputField
                                  inputWidth={'100%'}
                                  type="date"
                                  // onKeyDown={(e)=>switchFocus(e,"phoneNumber")}
                                  id="dateOfBirth"
                                  // value={dateOfBirth}
                                  // onChange={(e) => setDateOfBirth(e.target.value)}
                                  // required
                                  // max={today}
                                  // onKeyDown={handleKeyDown}
                                  // onBlur={handleBlur}
                                />
                              </div>
                            </div>
                          </div>

                           {/* Phone Number */}
                          <div class="w-full max-w-xl ">
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Phone Number" required={true} />
                              </div>
                              <div class="md:w-2/3 ">
                                <InputField
                                  inputWidth={'100%'}
                                  // onKeyDown={(e) => switchFocus(e, "product code")}
                                  type="text"
                                  id="phoneNumber"
                                  // value={phoneNumber}
                                  // onChange={(e) => setPhoneNumber(e.target.value)}
                              
                                />
                              </div>
                            </div>
                          </div>
                          {/*  Relation Manager */}
                          <div class="w-full max-w-xl mt-2">
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Relation Manager" required={true} fontSize="85%"/>
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue
                                  // data={options}
                                  inputWidth="100%" 
                                  // value={accountDetailsData.relationManager}
                                  // value={formValues.id_type}
                                  // loading={loading}
                                  // onChange={handleChangeRelation}
                                  // onChange={(value) => handleChangeRelation('relationManager', value)}
                                  // disabled={loading}

                                  // onChange={(value)=>{
                                  //   handleChangeRelation('relationManager', value)
                                  //   setTimeout(() => {
                                  //       const input = document.getElementById("prodgroup");
                                  //       input.focus();
                                  //     },0);
                                  // }}
                
                                  // onKeyDown={(e)=>{switchFocus(e,"prodgroup")
                                  // if (e.key === "Enter"){
                                  //   e.preventDefault();
                                  //   const input = document.getElementById("prodgroup");
                                  //   input.focus()
                                  // }
                                  // }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Product Group */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Product Group" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue
                                  id={"prodgroup"}
                                  inputWidth="100%"
                                  // data={data.productGroup}
                                  // value={accountDetailsData.productGroup}
                                  // onChange={onChange.productGroup}

                                  // onChange={(value)=>{(
                                  //   {onChange.productGroup}
                                  //   setTimeout(() => {
                                  //       const input = document.getElementById("prodgroup");
                                  //       input.focus();
                                  //     },0);
                                  // )}}
                
                                  // onKeyDown={(e)=>{switchFocus(e,"prodSubgroup")
                                  // if (e.key === "Enter"){
                                  //   e.preventDefault();
                                  //   const input = document.getElementById("prodSubgroup");
                                  //   input.focus()
                                  // }
                                  // }}
                                  
                                />
                              </div>
                            </div>
                          </div>

                          {/* Product Sub Group */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Product Sub Group" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue 
                                  id={"prodSubgroup"}
                                  // onChange={onChange.productSubGroup}
                                  // value={accountDetailsData.productSubGroup}
                                  // data={data.productSubGroup} 
                                  inputWidth="100%"
                                  // onKeyDown={(e)=>{switchFocus(e,"currency")
                                  // if (e.key === "Enter"){
                                  //   e.preventDefault();
                                  //   const input = document.getElementById("currency");
                                  //   input.focus()
                                  // }
                                  // }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Currency currency */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Currency" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue 
                                  id={"currency"}
                                  // data={data.currencies} 
                                  inputWidth="100%"   
                                  // onChange={onChange.currencies}
                                  // value={accountDetailsData.currencies}
                                  // onKeyDown={(e)=>{switchFocus(e,"select_field")
                                  // if (e.key === "Enter"){
                                  //   e.preventDefault();
                                  //   const input = document.getElementById("select_field");
                                  //   input.focus()
                                  // }
                                  // }}
                                />
                                  
                              </div>
                            </div>
                          </div>

                          {/* Fx Category */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div className="md:flex md:items-center mb-2 ml-10">
                                <div class="md:w-1/3 text-right">
                                  <Label label="Fx Category" fontSize="85%" />
                                </div>
                                <div className="relative">
                                <select
                                    id="select_field"
                                    name="fxcategory"
                                    // value={accountDetailsData.fxcategory}
                                    // onChange={(e) => handleChangeRelation('fxcategory', e.target.value)}
                                    className="block appearance-none w-[200px] py-[3px] leading-tight rounded-[3px] border-[1px] border-[#d1cccc] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                  //   onKeyDown={(e)=>{switchFocus(e,"custSeg")
                                  // if (e.key === "Enter"){
                                  //   e.preventDefault();
                                  //   const input = document.getElementById("custSeg");
                                  //   input.focus()
                                  // }
                                  // }}
                                >
                                    {/* <option value="" >-- Select --</option> */}
                                    <option value="N">None</option>
                                    <option value="FR">Foreign</option>
                                    <option value="FX">Forex</option>
                                  </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg
                                    className="h-4 w-4 fill-current text-gray-500"
                                    viewBox="0 0 20 20"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M15.293 6.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                </div>
                                </div>
                            </div>
                          </div>

                          {/* Customer Segment */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right ">
                                <Label label="Customer Segment" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue
                                id={"custSeg"}
                                  inputWidth="100%"
                                //   onChange={onChange.customerSegment_}
                                //   data={data.customerSegment}
                                //   value={accountDetailsData.customerSegment}
                                //   onKeyDown={(e)=>{switchFocus(e,"subSegment")
                                //   if (e.key === "Enter"){
                                //     e.preventDefault();
                                //     const input = document.getElementById("subSegment");
                                //     input.focus()
                                //   }
                                // }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Sub Customer Segment */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Sub Customer Segment" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue
                                  id={"subSegment"}
                                //   onChange={onChange.customerSubSegment}
                                //   value={accountDetailsData.customerSubSegment}
                                //   data={data.customerSubSegment}
                                  inputWidth="100%"
                                //   onKeyDown={(e)=>{switchFocus(e,"RequiredType")
                                //   if (e.key === "Enter"){
                                //     e.preventDefault();
                                //     const input = document.getElementById("RequiredType");
                                //     input.focus()
                                //   }
                                // }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Document Required Type */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Document Required Type" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3">
                                <ListOfValue
                                  id={"RequiredType"}
                                  // data={documentRequiredType}
                                  // onChange={onChange.documentRequiredType}
                                //   onChange={handleCustTypeChange}
                                //   // value={accountDetailsData.documentRequiredType}
                                //   value={custType}
                                //   // value={combinedOptions}
                                  inputWidth="100%"
                                //   onKeyDown={(e)=>{switchFocus(e,"introSource")
                                //   if (e.key === "Enter"){
                                //     e.preventDefault();
                                //     const input = document.getElementById("introSource");
                                //     input.focus()
                                //   }
                                // }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Introductory Source */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Introductory Source" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue 
                                  id={"introSource"}
                                //   data={data.introductory}
                                //   onChange={onChange.introductorysource}
                                //   value={accountDetailsData.introductorySource}
                                  inputWidth="100%" 
                                //   onKeyDown={(e)=>{switchFocus(e,"sector")
                                //   if (e.key === "Enter"){
                                //     e.preventDefault();
                                //     const input = document.getElementById("sector");
                                //     input.focus()
                                //   }
                                // }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Sector */}
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Sector" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue 
                                  id={"sector"}
                                //   data={sector} 
                                //   onChange={onChange.sector}
                                //   value={accountDetailsData.sector}
                                  inputWidth="100%"
                                //   onKeyDown={(e)=>{switchFocus(e,"subsector")
                                //   if (e.key === "Enter"){
                                //     e.preventDefault();
                                //     const input = document.getElementById("subsector");
                                //     input.focus()
                                //   }
                                // }} 
                                />
                              </div>
                            </div>
                          </div>

                          {/* Sub Sector  */} 
                          <div class="w-full max-w-xl" style={{marginTop:'-2px'}}>
                            <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3 text-right">
                                <Label label="Sub Sector" fontSize="85%" />
                              </div>
                              <div className="md:w-2/3 ">
                                <ListOfValue 
                                  id={"subsector"}
                                  // data={subSector}
                                  // onChange={onChange.subSector}
                                  // value={accountDetailsData.subSector}
                                  inputWidth="100%"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* **************************************** */}
                      </div>

                      <div className="flex justify-end mr-5">
                        {/* <ButtonComponent label="Save" buttonBackgroundColor="green" buttonWidth="120px" buttonHeight="30px" /> */}
                      </div>
                    </div>
                  </div>

                  {/* <Account_Details /> */}
                </div>
                {/* <div className="w-full" zoom="0.50px">
                  <ImageCapturing id={relationNo} />
                </div>
                {sweetAlertConfirmed && (
                  // <Modal show={true} >
                  //   // modal content goes here
                  // </Modal>

                  <Modal
                    show={sweetAlertConfirmed}
                    size="md"
                    centered
                    style={{ height: "95%" }}
                    className="shadow-md shadow-black"
                  >
                    <div className="flex items-center justify-between mx-2">
                      <div className="font-extrabold text-black">
                        Image Capturing
                      </div>
                      <div
                        className="border rounded-full px-2 bg-red-400 text-white cursor-pointer"
                        onClick={handleSweetAlertConfirmed}
                      >
                        x
                      </div>
                    </div>
                    <Modal.Body>
                      <ImageVerification accountNumber={imageAccount} />
                      <div className="flex justify-center">
                        <div>
                          <div>
                            Customer's Name :{" "}
                            <span className="font-extrabold text-black text-lg">
                              {getFirstName} {getMiddleName} {getLastName}
                            </span>
                          </div>
                          <div>
                            Customer ID :{" "}
                            <span className="font-extrabold text-black text-lg">
                              {createdCustomerID}
                            </span>
                          </div>
                          <div>
                            Account Number :{" "}
                            <span className="font-extrabold text-black text-lg">
                              {imageAccount}
                            </span>{" "}
                          </div>
                          <div>
                            Reference No :{" "}
                            <span className="font-extrabold text-black text-lg">
                              {relationNo}
                            </span>{" "}
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleSweetAlertConfirmed}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                )} */}
                {/* <div>Mandate</div> */}
                {/* <div className="flex flex-col items-center space-y-4">
                <div className="w-40 h-40 rounded-full overflow-hidden">
                  {avatar ? (
                    <img src={URL.createObjectURL(avatar)} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 11a3 3 0 100-6 3 3 0 000 6z" />
                      <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18.75A8.75 8.75 0 1118.75 10 8.76 8.76 0 0110 18.75z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <label className="flex flex-col items-center space-y-1">
                  <span className="text-gray-500 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleImageCapturing}>Image & Signature Capturing</span>
                 
                  <div >
                    <Modal show={isImageCapturing} size="xl" centered style={{height:'95%'}} className="shadow-md shadow-black">
                        <div className="flex items-center justify-between mx-2">
                          <div className="font-extrabold text-black">Image Capturing</div>
                          <div className="border rounded-full px-2 bg-red-400 text-white cursor-pointer" onClick={closeImageCapturing}>x</div>
                        </div>
                      <Modal.Body>
                      </Modal.Body>
                      <Modal.Footer> 
                        <Button onClick={closeImageCapturing}>Close</Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </label>
              </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuickAccountOpening;
