import React, {useState, useEffect  } from 'react';
import AccordionForms from './AccordionForms';
import Individual_account_opening from './individual-account-opening';
import axios from 'axios';
import { API_SERVER } from "../../../../config/constant";
import Account_Details from './account-details';
import Anti_Money_Laundering from './anti-money-laundering';
import Personal_Details from './personal-details';
import Occupation_other_details from './occupation-other-details';
import Mode_Of_Communication from './mode-of-communication';
import Next_Of_King from './next-of-king';
import Current_Address from './current-address';
import Postal_Address from './postal-address';
import Permanent_Address from './permanent-address';
import Office_Postal_Address from './office-postal-address';

function Accordion_address({ accountTypes, setAccountTypes }) {
    const [title, setTitle] = useState([]);
    const [salutation, setSalutation] = useState([]);
    const [idType, setIdType] = useState([]);
    const [city, setCity] = useState([])
    const [country, setCountry] = useState([])
    const [documentRequiredType, setDocumentRequiredType] = useState([])
    const [productGroup, setProductGroup] = useState([])
    const [productSubGroup, setProductSubGroup] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [selectedSubgroup, setSelectedSubgroup] = useState([])
    const [IntroductorySource, setIntroductorySource] = useState([])
    const [activeStep, setActiveStep] = useState(0);
     const [customerSegment, setCustomerSegment] = useState("");
     const [customerSubSegment, setCustomerSubSegment] = useState([]);
     const [sector, setSector] = useState([]);
     const [subSector, setSubSector] = useState([]);
     const [bankNames, setBankNames] = useState([])
     const [relationships, setRelationship] = useState([]);
     const [handleData, setHandleData] = useState("");
     const [productData, setProductData] = useState([]);
     const [active, setActive] = useState(0);
     const [isChecked, setIsChecked] = useState(false);
     
    //  Anti Money Laundering 
    const [sourceOfWealth, setSourceOfWealth] = useState([])
    const [sourceOfFund, setSourceOfFund] = useState([])
    const [transactionType, setTransactionType] = useState([])
  
     const customTheme = JSON.parse(localStorage.getItem("theme"));
  
     const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  
     const validationRules = {
      firstName: { required: true },
      email: { required: true, pattern: /^\S+@\S+$/i }
    };
  
    const [formValues, setFormValues] = useState({ 
      title:'', 
      salutation:'',
      risk_id:'',
      id_type:'',
      city:'',
      country:'',
      accountNumber:''
    });
    const [formErrors, setFormErrors] = useState({});
  
    const [accountDetailsData, setAccountDetailsData] = useState({
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
  
    const [formValueAccountReferees, setFormValueAccountReferees] = useState({
      typeofReferees:'',
      accountNumber:'',
      bankName:'',
      accountName:'',
      residentAddress:'',
      emailAddress:'',
      relationship:'',
      noOfYearsKnown:'',
      phoneNumber:''
    })
  
     // console.log(customTheme);
   
     const [getTheme, setTheme] = useState(customTheme);
     const nextStep = () =>
       setActive((current) => (current < 9 ? current + 1 : current));
     const prevStep = () =>
       setActive((current) => (current > 0 ? current - 1 : current));
  
     useEffect(() => {
      //  axios
      //    .post(API_SERVER + "/get-customer-category", { csType: accountTypes })
      //    .then((res) => {
      //      console.log(res.data, "from Tabs");
      //      if (res.data.length > 0) {
      //        const arr = [];
      //        res.data?.map((i) =>
      //          arr.push({ value: i.actual_code, label: i.description })
      //        );
      //        setCustomerSegment(arr);
      //        console.log(arr,"Cusotmer Segment:::")
      //      }
  
      //      // localStorage.setItem("customerSegment", JSON.stringify(customerSegment))
      //      console.log("customerSegment:::",JSON.stringify(customerSegment))
      //    });
  
       axios.get(API_SERVER + "/get-sector").then((res) => {
         // console.log(res.data , "from Tabs")
         if (res.data.length > 0) {
           const arr = [];
           res.data?.map((i) =>
             arr.push({ value: i.class_code, label: i.description })
           );
           setSector(arr);
         }
  
         // localStorage.setItem("customerSegment", JSON.stringify(customerSegment))
       });
     }, [accountTypes]);
  
     useEffect(() => {
      // async function getCustomersegmentindividual() {
      //   axios.get(API_SERVER + "/get-customer-segment-individual")
      //   .then(function (response) {
      //     setProductGroup(response.data)
      //     console.log(response.data)
      //   });
        
      // }
  
       // Get Customer Segment
       const getCustomersegmentindividual = () => {
         axios
           .get(API_SERVER + "/get-customer-segment-individual")
           .then(function (response) {
            //  console.log("getCustomersegmentindividual :", response.data);
             setCustomerSegment(response.data)
           });
  
         // setShow(false)
       };
  
        // Get Customer Sub Category
        const getCustomerSubsegmentindividual = () => {
          axios
            .get(API_SERVER + "/get-customer-sub-segment-individual")
            .then(function (response) {
              console.log("get Customer Subsegment individual ::::", response.data);
              setCustomerSubSegment(response.data)
            });
   
          // setShow(false)
        };
  
         // Get Bank Names
       const getBankNames = () => {
        axios
          .post(API_SERVER + "/get-code-details", {
            code: "BNC",
          })
          .then(function (response) {
           //  localStorage.setItem("title", JSON.stringify(response.data));
            setBankNames(response.data);
          });
      };
  
       // Relationship
       const getRelationships = () => {
        axios
          .post(API_SERVER + "/get-code-details", {
            code: "RRE",
          })
          .then(function (response) {
           //  localStorage.setItem("title", JSON.stringify(response.data));
            setRelationship(response.data);
          });
      };
  
  
  
       // Get Customer Title
       const getCustomerTitle = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "TIT",
           })
           .then(function (response) {
            //  localStorage.setItem("title", JSON.stringify(response.data));
             setTitle(response.data);
           });
       };
  
       // Get Salutation
       const getSalutation = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "SAL",
           })
           .then(function (response) {
            //  localStorage.setItem("Salutation", JSON.stringify(response.data));
             // console.log("CurrencyAmount :",response.data);
             setSalutation(response.data);
           });
       };
  
       // Get ID Type
       const getIDType = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "HRD",
           })
           .then(function (response) {
            //  localStorage.setItem("getIDType", JSON.stringify(response.data));
             // console.log("getCountry :",response.data);
             setIdType(response.data)
           });
       };
  
       // Get City
       const getCity = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "CTY",
           })
           .then(function (response) {
            //  localStorage.setItem("getCity", JSON.stringify(response.data));
             setCity(response.data)
           });
       };
  
       // Get Country
       const getCountry = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "CON",
           })
           .then(function (response) {
            //  localStorage.setItem("getCountry", JSON.stringify(response.data));
            //  console.log("getCountry :", response.data);
             setCountry(response.data)
           });
       };
  
       // Get Postal Address
       const getPostalAddress = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "CIT",
           })
           .then(function (response) {
             localStorage.setItem(
               "getPostalAddress",
               JSON.stringify(response.data)
             );
           });
       };
  
       // Get Signatory Level
       const getSignatoryLevel = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "APL",
           })
           .then(function (response) {
             localStorage.setItem(
               "getSignatoryLevel",
               JSON.stringify(response.data)
             );
           });
       };
  
       // Get Preferrred Language
       const getPreferredLanguage = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "LNG",
           })
           .then(function (response) {
             localStorage.setItem(
               "PreferrredLanguage",
               JSON.stringify(response.data)
             );
           });
       };
  
       // Get Document Required Type
       const getDocumentRequiredType = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "DRA",
           })
           .then(function (response) {
             setDocumentRequiredType(response.data)
            //  console.log(response.data,":::Document Type")
           });
       };
  
       // Get Product Group
       async function getProductGroup() {
         axios.get(API_SERVER + "/get-product-group").then(function (response) {
           setProductGroup(response.data)
         });
       }
  
       // Get Product Sub Group
       async function getProductSubGroup() {
        
       }
  
       // Get Account Mandate
       const getAccountMandate = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "AMD",
           })
           .then(function (response) {
             localStorage.setItem(
               "AccountMandate",
               JSON.stringify(response.data)
             );
           });
       };
  
       // Get Nature of Ownership
       const getNatureOfOwnership = () => {
         axios
           .post(API_SERVER + "/get-code-details", {
             code: "NOW",
           })
           .then(function (response) {
             localStorage.setItem(
               "NatureOfOwnership",
               JSON.stringify(response.data)
             );
           });
       };
  
       // Get Source of Wealth
       const getSourceofWealth = () => {
        axios
          .post(API_SERVER + "/get-code-details", {
            code: "SOW",
          })
          .then(function (response) {
           //  localStorage.setItem("getCountry", JSON.stringify(response.data));
            // console.log("getSourceofWealth :", response.data);
            const arr = [];
            response.data.map((i)=>{
              const [a , b , c] = Object.values(i)
              const values = [b , a ,c]
              values.pop()
              arr.push([...values , <input type="text" className="border px-2"/>])
              // arr.pop()
              // arr.push(<input type="text" />)
            })
            setSourceOfWealth(arr)
            console.log("getSourceofWealth ::::",arr);
          });
        };
  
  
        // Get Source of fund
       const getSourceofFund = () => {
        axios
          .post(API_SERVER + "/get-code-details", {
            code: "SOF",
          })
          .then(function (response) {
           //  localStorage.setItem("getCountry", JSON.stringify(response.data));
            // console.log("getSourceofWealth :", response.data);
            const arr = [];
            response.data.map((i)=>{
              const [a , b , c] = Object.values(i)
              const values = [b , a ,c]
              values.pop()
              arr.push([...values , <input type="checkbox" className="border"/>])
              // arr.pop()
              // arr.push(<input type="text" />)
            })
            setSourceOfFund(arr)
            console.log("getSourceofWealth ::::",arr);
          });
        };
  
  
        // Get Transaction Type
       const getTransactionType = () => {
        axios
          .post(API_SERVER + "/get-code-details", {
            code: "TRQ",
          })
          .then(function (response) {
           //  localStorage.setItem("getCountry", JSON.stringify(response.data));
            // console.log("getSourceofWealth :", response.data);
            const arr = [];
            response.data.map((i)=>{
              const [a , b , c] = Object.values(i)
              const values = [b , a ,c]
              values.pop()
              arr.push([...values , <input type="checkbox" className="border"/>])
              // arr.pop()
              // arr.push(<input type="text" />)
            })
            setTransactionType(arr)
            console.log("getSourceofWealth ::::",arr);
          });
        };
      
      
  
       // Get introductory source
      //  async function getIntroductorySource() {
      //    axios
      //      .get(API_SERVER + "/get-introductory-source")
      //      .then(function (response) {
      //        setIntroductorySource(response.data)
      //        console.log("Get introductory source::::",JSON.parse(introductorySource))
      //      });
      //   }
  
        async function getIntroductorySource() {
          try {
            const response = await axios.get(API_SERVER + "/get-introductory-source");
            setIntroductorySource(response.data);
          } catch (error) {
            console.error(error);
          }
        }
  
       Promise.all([
         getCustomersegmentindividual(),
         getCustomerSubsegmentindividual(),
         getBankNames(),
         getRelationships(),
         getCustomerTitle(),
         getSalutation(),
         getIDType(),
         getCity(),
         getCountry(),
         getPostalAddress(),
         getSignatoryLevel(),
         getPreferredLanguage(),
         getProductGroup(),
         getProductSubGroup(),
         getDocumentRequiredType(),
         getAccountMandate(),
         getNatureOfOwnership(),
         getIntroductorySource(),
         getSourceofWealth(),
         getSourceofFund(),
         getTransactionType(),
       ])
         .then(function (results) {
           // get currencies
           const getCurrencyAmount = results[0].data;
           localStorage.setItem(
             "getCurrencyAmount",
             JSON.stringify(getCurrencyAmount)
           );
           console.log(getCurrencyAmount);
         })
         .catch(function (error) {
           console.log(error);
         });
     }, []);
   
     const allLovs = {
       customerCategory: [],
       banks:[],
       relationship:[],
       title: [],
       salutation: [],
       id_type: [],
       city: [],
       country: [],
       postalAddress: [],
       signatoryLevel: [],
       preferredLanguage: [],
       productGroup: [],
       productSubGroup: "",
       documentRequiredType: [],
       accountMandate: [],
       natureOfOwnership: [],
       customerSegment: [],
       customerSubSegment:[],
       introductory: [],
       sector:[],
       currencies:"",
       sourceOfWealth
     };
  
    //  Source Of Wealth
    // sourceOfWealth?.map((i) => 
    //  allLovs.sourceOfWealth.push({
    //   value:i.actual_code,
    //   label
    //  })
    // )
  
     const getCustomerCat = JSON.parse(
       localStorage.getItem("getCustomerCategory")
     );
     getCustomerCat?.map((i) =>
       allLovs.customerCategory.push({
         value: i.actual_code,
         label: i.description,
       })
     );
  
     bankNames?.map((i) =>
       allLovs.banks.push(
        {
           value: `${i.actual_code}`, 
           label: `${i.actual_code} - ${i.description}`
          }
        )
     );
  
     relationships?.map((i) =>
       allLovs.relationship.push(
        {
          value: `${i.actual_code}`, 
          label: `${i.actual_code} - ${i.description}`
        }
        )
     );
     
  
    console.log(title,"Title")
     title?.map((i) =>
       allLovs.title.push(
        { 
          value: `${i.actual_code}`, 
          label: `${i.actual_code} - ${i.description}` 
        }
      )
     );
  
    //  const getSalutation = JSON.parse(localStorage.getItem("Salutation"));
     salutation?.map((i) =>
       allLovs.salutation.push(
        { 
          value: i.actual_code, 
          label: `${i.actual_code} - ${i.description}`
        }
      )
     );
  
    //  const getIDType = JSON.parse(localStorage.getItem("getIDType"));
     idType?.map((i) =>
       allLovs.id_type.push(
        { 
          value: i.actual_code, 
          label: `${i.actual_code} - ${i.description}`
        }
      )
     );
  
    //  const getCity = JSON.parse(localStorage.getItem("getCity"));
     city?.map((i) =>
       allLovs.city.push(
        { 
          value: i.actual_code,
          label: `${i.actual_code} - ${i.description}`
        }
      )
     );
  
    //  const getCountry = JSON.parse(localStorage.getItem("getCountry"));
     country?.map((i) =>
       allLovs.country.push(
        { 
          value: i.actual_code, 
          label: `${i.actual_code} - ${i.description}` 
        }
      )
     );
  
     sector?.map((i) =>
     allLovs.sector.push(
      { 
        value: `${i.actual_code} - ${i.description}`, 
        label: i.description 
      }))
  
    //  currencies?.map((i) => 
    //  allLovs.currencies.push({value: i.actual_code, label: i.description}))
  
    // if (customerSegment > 0) {
    //   customerSegment.map((i) =>
    //     allLovs.customerSegment.push(i)
    //   );
    // }
  
    console.log(customerSegment, "customerSegment")
    // customerSegment?.map((i)=> 
    // allLovs.customer_segment.push({value: i.actual_code, label: i.description}))
  
     const getPostalAddress = JSON.parse(
       localStorage.getItem("getPostalAddress")
     );
     getPostalAddress?.map((i) =>
       allLovs.postalAddress.push({ value: i.actual_code, label: i.description })
     );
  
     const getSignatoryLevel = JSON.parse(
       localStorage.getItem("getSignatoryLevel")
     );
     getSignatoryLevel?.map((i) =>
       allLovs.signatoryLevel.push({ value: i.actual_code, label: i.description })
     );
  
     const getPreferredLanguage = JSON.parse(
       localStorage.getItem("PreferrredLanguage")
     );
     getPreferredLanguage?.map((i) =>
       allLovs.preferredLanguage.push({
         value: i.actual_code,
         label: i.description,
       })
     );
  
  
  
  
    ///////////////////// product Group ///////////////////////////
     if (productGroup) {
       productGroup.map((i) =>
         allLovs.productGroup.push(i)
       );
     }
   
     if(productSubGroup){
       allLovs.productSubGroup = productSubGroup
     }
  
  
     if (customerSegment) {
      customerSegment.map((i) =>
        allLovs.customerSegment.push({
          value: `${i.actual_code}`,
          label:`${i.description}`,
        })
      );
    }
  
    // console.log(customerSubSegment, "::::::::::::::::")    
  
    // if(customerSubSegment){
    //   allLovs.customerSubSegment = customerSubSegment
    // }
  
    if (customerSubSegment) {
      customerSubSegment.map((i) =>
        allLovs.customerSubSegment.push({
          value: `${i.actual_code}`,
          label: i.description,
        })
      );
    }
  
    console.log(customerSubSegment, "::::::::::::::::")
  
    //  const getProductSubGroup = JSON.parse(
    //    localStorage.getItem("ProductSubGroup")
    //  );
    //  getProductGroup?.map((i) =>
    //    allLovs.productSubGroup.push({
    //      value: i.actual_code,
    //      label: i.description,
    //    })
    //  );
  
    
     documentRequiredType?.map((i) =>
       allLovs.documentRequiredType.push({
         value: `${i.actual_code} - ${i.description}`,
         label: `${i.actual_code} - ${i.description}`,
       })
     );
  
     const getAccountMandate = JSON.parse(localStorage.getItem("AccountMandate"));
      getAccountMandate?.map((i) =>
        allLovs.accountMandate.push(
          {
            value: i.actual_code,
            label:`${i.actual_code} - ${i.description}`
          }
        )
     );
  
     const getNatureOfOwnership = JSON.parse(
       localStorage.getItem("NatureOfOwnership")
     );
     getNatureOfOwnership?.map((i) =>
       allLovs.natureOfOwnership.push({
         value: i.actual_code,
         label: i.description,
       })
     );
  
    //////////////////////////GET INTRODUCTORY SOURCE///////////////////////////////////////
    if (IntroductorySource) {
      IntroductorySource.map((i) =>
      // console.log("GET INTRODUCTORY SOURCE",i),
      allLovs.introductory.push(i)
      );
      console.log("GET INTRODUCTORY SOURCE:::", allLovs.introductory);
    }
  
     const handleOnChange = {
       myMethod: function () {
         const getProductGroup = JSON.parse(localStorage.getItem("ProductGroup"));
         getProductGroup?.map((i) =>
           allLovs.productGroup.push({
             value: `${i.actual_code} - ${i.description}`,
             label: `${i.actual_code} - ${i.description}`,
           })
         );
         console.log("Hello World!");
       },
  
       bankNames: async function (value){
        console.log(value)
       },
  
       customerSegment_: async function (value) {
        // console.log(value,":::Customer Segment")
         const data = await axios.get(API_SERVER + "/get-customer-segment-individual", {
           segmentCode: value
         });
         if (data.data.length > 0) {
           const response = data.data;
           const arr = [];
           if (response[0].responseCode === "000") {
             
             console.log(response, "jfj");
             response.map((i) => {
               arr.push({ value: i.actual_code, label: i.description });
               // console.log(arr)
             });
           }
           setCustomerSubSegment(arr);
           console.log(arr, "::::Customer Segment")
  
           setAccountDetailsData((prevFormValues) => ({
            ...prevFormValues,
            customerSegment: value
          }))
         }
  
       },
  
  
       customerSubSegment: async function (value){
        console.log(value,'VVVVVVVVVVV')
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          customerSubSegment: value
        }))
       },
       
  
        productGroup: function (value){
        axios
           .post(API_SERVER + "/get-product-sub-group" ,{ 
            productGroup : value.split("-")[0].trim() 
          })
           .then(function (response) {
            console.log(response.data,value.split("-")[0] , "from me")
            setProductSubGroup(response.data);
           });
  
           setAccountDetailsData((prevFormValues) => ({
            ...prevFormValues,
            productGroup: value
          }))
        },
        
        
  
        
  
       sector: async function (value) {
         console.log(value, "mmmmmSector");
         const data = await axios.post(API_SERVER + "/get-sub-sector", {
           sectorClassCode: value,
         });
         if (data.data.length > 0) {
           const response = data.data;
           const arr = [];
          //  console.log(response, "Mannnn");
           response.map((i) => {
             arr.push(
              { 
                value: `${i.actual_code} - ${i.description}`, 
                label: `${i.actual_code} - ${i.description}`
              }
            );
             // console.log(arr)
           });
           setSubSector(arr);
         }
  
         setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          sector: value
        }))
       },
  
       subSector: async function (value){
        console.log(value, "Sub Sector");
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          subSector: value
        }))
       },
  
       
       productSubGroup: async function (value) {
        // setSelectedSubgroup(value)
        //  console.log(value, "mmmmm");
         const data = await axios.post(API_SERVER + "/currencies", {
          type_of_acct: value.split("-")[0].trim()
         });
         if (data.data.length > 0) {
           const response = data.data;
           const arr = [];
          //  console.log(response, "Mannnn");
           response.map((i) => {
             arr.push({ value: i.actual_code, label: i.description });
             // console.log(arr)
           });
           console.log(arr,"Araudiso")
           setCurrencies(arr);
         }else{
          setCurrencies("")
         }
  
         setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          productSubGroup: value
        }))
       },
  
  
       currencies: async function (value) {
        console.log(value)
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          currencies: value
        }))
       },
  
       documentRequiredType: async function(value){
        console.log(value, "Decoment")
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          documentRequiredType: value
        }))
       },
  
       introductorysource: async function(value){
        console.log(value)
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          introductorySource: value
        }))
       }
  
       
  
     };
  
     console.log(currencies, "Currencies")
  
     console.log("accountDetailsData", accountDetailsData)
  
    
  
    if(currencies){
     allLovs.currencies = currencies
    }
  
    //  console.log(subSector, "kkk");
  
     const handleScroll = (e) => {
       console.log("X-axis scroll:", e.target.scrollRight);
     };
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleClick = (index) => {
      setActiveStep(index);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
      
        const errors = {};
        let hasErrors = false;
      
        Object.entries(validationRules).forEach(([field, rules]) => {
          if (rules.required && !formValues[field]) {
            errors[field] = `${field} is required`;
            hasErrors = true;
          } else if (rules.pattern && !rules.pattern.test(formValues[field])) {
            errors[field] = `${field} is not valid`;
            hasErrors = true;
          }
        });
      
        if (hasErrors) {
          setFormErrors(errors);
        } else {
          setFormErrors({});
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      };


  return (
    <div className="App">
      <AccordionForms title="Current Address">
        {/* <Personal_Details
            validationRules={validationRules} 
            formValues={formValues}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setFormValues={setFormValues} 
            formErrors={formErrors} 
            setFormErrors={setFormErrors} 
            handleSubmit={handleSubmit} 
            data={allLovs} 
        /> */}
        <Current_Address
            validationRules={validationRules} 
            formValues={formValues}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setFormValues={setFormValues} 
            formErrors={formErrors} 
            setFormErrors={setFormErrors} 
            handleSubmit={handleSubmit} 
            data={allLovs} 
        />
      </AccordionForms>
      <AccordionForms title="Permanent Address -- if different from above ">
        <Permanent_Address
             validationRules={validationRules} 
             formValues={formValues}
             activeStep={activeStep}
             setActiveStep={setActiveStep}
             setFormValues={setFormValues} 
             formErrors={formErrors} 
             setFormErrors={setFormErrors} 
             handleSubmit={handleSubmit} 
             data={allLovs} 
        />
      </AccordionForms>
      <AccordionForms title="Postal Address">
        {/* <Mode_Of_Communication
             validationRules={validationRules} 
             formValues={formValues}
             activeStep={activeStep}
             setActiveStep={setActiveStep}
             setFormValues={setFormValues} 
             formErrors={formErrors}
             setFormErrors={setFormErrors}
             handleSubmit={handleSubmit} 
             data={allLovs}
        /> */}
        <Postal_Address 
            validationRules={validationRules} 
            formValues={formValues}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setFormValues={setFormValues} 
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            handleSubmit={handleSubmit} 
            data={allLovs}
        />
      </AccordionForms>

      <AccordionForms title="Postal Address (Office)">
        <Office_Postal_Address
             validationRules={validationRules} 
             formValues={formValues}
             activeStep={activeStep}
             setActiveStep={setActiveStep}
             setFormValues={setFormValues} 
             formErrors={formErrors} 
             setFormErrors={setFormErrors} 
             handleSubmit={handleSubmit} 
             data={allLovs} 
        />
      </AccordionForms>
    </div>
  );
}

export default Accordion_address;
