import { useState, useEffect } from "react";
import { Stepper, Button, Group, Modal } from "@mantine/core";
import { GiHumanTarget } from "react-icons/gi";
import { SiNike } from "react-icons/si";
import { MdOutlinePersonalInjury } from "react-icons/md";
import Account_Details from "./account-details";
import Account_Mandate from "./account-mandate";
import Account_Referees from "./account-referees";
import Anti_Money_Laundering from "./anti-money-laundering";
import {API_SERVER} from "../../../../../../../../config/constant"
import axios from "axios";
import Swal from "sweetalert2"
import AccordionUsable from "./Accordion";
// import ActionButtons from "../../../../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../../../../components/others/tab-component/tab-component";
import Label from "../../../../../../../../components/others/Label/Label";
import InputField from "./comp/InputField";
import ActionButtons from "./comp/ActionButtons";
import Shares from "./Shares";
import Next_Kin_tab from "./Next_kin_tab";
import {MdArrowDropDownCircle} from 'react-icons/md'
// import { FaSpinner } from 'react-icons/fa';
import { AiOutlineEye } from "react-icons/ai";

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const month = monthNames[d.getMonth()];
  const year = String(d.getFullYear()).slice(-2);

  return `${day} ${month} ${year}`;
}


function MyTabs({
    data, 
    custType, 
    handleCustTypeChange,
    accountReferee, 
    savedData,
    setAccountReferee,
    storeDataInSessionStorage, 
    getaccountReferee,  
    accountTypes, 
    setAccountTypes, 
    handleSubmit, 
    formData, 
    setFormData, 
    handleChange, 
    response, 
    error, 
    apiMsg, 
    customerData, 
    customerDataTable, 
    storedFormData,
    accountDetailsData,
    setAccountDetailsData,

    // Final passage
    handleFinalChange,
    custmerNumber,
    accountNumber,
    settlement,

    customername,
    setCustomername,
    handleChangeCustomername,

    typeOfAccount,
    setTypeOfAccount,
    handleChangeTypeOfAccount,
    handleChangeDocs,

    nextOfKingData,
    tableDataNok,
    allNextOfKingData,
    handleChangeNextOfKin,
    handleSubmitNextOfKin,

    handleClearTable,


    dataApproval,

    fetchDataCustomerNumber,
handleInputChangeCust,
handleKeyPress,
customerNumber,
setCloseModal
  }) {
    const [key, setKey] = useState(localStorage.getItem("activeTab") || "tab1");
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
    const [customerSegment, setCustomerSegment] = useState("");
    const [customerSubSegment, setCustomerSubSegment] = useState([]);
    const [sector, setSector] = useState([]);
    const [subSector, setSubSector] = useState([]);
    const [bankNames, setBankNames] = useState([]);
    const [relationships, setRelationship] = useState([]);
    const [handleData, setHandleData] = useState("");
    const [productData, setProductData] = useState([]);
    const [active, setActive] = useState(0);
    const [isChecked, setIsChecked] = useState(false);

    //  Anti Money Laundering
    const [sourceOfWealth, setSourceOfWealth] = useState([]);
    const [sourceOfFund, setSourceOfFund] = useState([]);
    const [transactionType, setTransactionType] = useState([]);

    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState("");

    const [selectedOptionJoint, setSelectedOptionJoint] =
      useState("individual");
    const [showForm, setShowForm] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState("1");
    const [tableData, setTableData] = useState([]);

    const [formattedDate, setFormattedDate] = useState("");


    const [selectedData, setSelectedData] = useState(null);
    const [selectedDataNOK, setSelectedDataNOK] = useState(null);

    const handleViewClick = (data) => {
      // alert(data)
      setSelectedData(dataApproval.relationData[data]);
    };

    const handleViewClickNOK = (data) => {
      // alert(data)
      setSelectedDataNOK(dataApproval.nextOfKinData[data]);
    };
    console.log(selectedDataNOK,"setSelectedDatasetSelectedData")

    // ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    const [formDataApproval, setFormDataApproval] = useState({
      p_customerno_v: dataApproval.CUSTOMER_NUMBER,
      p_branchcode: dataApproval.BRANCH_CODE,
      p_date: dataApproval.POSTING_SYS_DATE,
      p_postedby: dataApproval.POSTED_BY,
      p_pterm_id: dataApproval.POSTING_TERMINAL,
      p_pip: dataApproval.p_pip,
      p_hostname: dataApproval.POSTED_BY,
      app_type: dataApproval.app_type,
    });

    const [responseMessage, setResponseMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      // This effect will update the form fields whenever dataApproval changes
      // It ensures that form fields always reflect the current dataApproval state
      // This is especially useful when you want to preset the fields or when dataApproval comes from an external source
      const formFields = document.querySelectorAll("[name]");
      formFields.forEach((field) => {
        const fieldName = field.getAttribute("name");
        if (formDataApproval[fieldName] !== undefined) {
          field.value = formDataApproval[fieldName];
        }
      });
    }, [formDataApproval]);

    // const handleInputChangeApproval = (event) => {
    //   const { name, value } = event.target;
    //   setFormDataApproval((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    //   }));
    // };

    const handleInputChangeApproval = (event) => {
      const { name, value } = event.target;
      setFormDataApproval((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmitApproval = async (event) => {
      try {
      event.preventDefault();

      //  Show loading message
        // Swal.fire({
        //   title: "Please wait...",
        //   showConfirmButton: false,
        //   allowOutsideClick: false,
        //   onBeforeOpen: () => {
        //     Swal.showLoading();
        //   },
        // });


        let timerInterval
        Swal.fire({
          title: 'Please wait...',
          html: 'I will close after Account is Approved in <b></b> milliseconds.',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
  
      
      const qs = require("qs");
      let data = qs.stringify({
        p_customerno_v: dataApproval.CUSTOMER_NUMBER,
        p_branchcode: dataApproval.BRANCH_CODE,
        p_date: dataApproval.relationData[0].POSTING_SYS_DATE,
        p_postedby: dataApproval.POSTED_BY,
        p_pterm_id: dataApproval.POSTING_TERMINAL,
        p_pip: dataApproval.p_pip,
        p_hostname: dataApproval.POSTED_BY,
        app_type: dataApproval.app_type,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: API_SERVER + "/api/member_approval",
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
// return console.log('Approval:::',data)
        const response = await axios.request(config);
        const { message, apiStatus } = response.data;

        // Use SweetAlert to show the message
        // Swal.fire({
        //   title: apiStatus === "Y" ? "Success" : "Error",
        //   text: message,
        //   icon: apiStatus === "Y" ? "success" : "error",
        // });
        // Swal.fire({
        //   title: "Success",
        //   text: "Approved",
        //   icon: "Success",
        // });

        
   
        const response1 = await axios.post(
          'http://10.203.14.125:8000/api/create-shareholder',
          {
            // posted_by: dataApproval.relationData[0].POSTED_BY,
            // shareholder_id: dataApproval.relationData[0].CUSTOMER_NUMBER,
            // type_of_ownership: dataApproval.TYPE_OF_CUSTOMER,
            // first_name: dataApproval.relationData[0].FIRST_NAME,
            // middle_name: dataApproval.relationData[0].LAST_NAME,
            // last_name: dataApproval.relationData[0].SURNAME, 
            // bank_code: 'ABC',
            // account_number: dataApproval.ACCT_LINK,  
            // sort_name: 'John Smith',
            // id_type: dataApproval.relationData[0].ID_TYPE, 
            // id_number: "123456",
            // depository: 'DepoX',
            // broker: 'BrokerY',
            // receive_information_via: dataApproval.relationData[0].EMAIL_ADDRESS,
            // address_1: '123 Main Street',
            // title: 'Mr',
            // date_of_entry: dataApproval.EFFECTIVE_DATE,
            // taxable_flag: '1',
            // address_2: 'Apt 456',
            // city: dataApproval.LOCATION,
            // state: dataApproval.LOCATION,
            // postal_code: '12345',
            // country: 'Countryland',
            // phone: '123-456-7890',
            // email: 'john@example.com',
            // status: '1',

            "posted_by": dataApproval.relationData[0].POSTED_BY,
            "shareholder_id": dataApproval.relationData[0].CUSTOMER_NUMBER,
            "type_of_ownership": "Individual",
            "first_name": dataApproval.relationData[0].FIRST_NAME,
            "middle_name": dataApproval.relationData[0].LAST_NAME,
            "last_name": dataApproval.relationData[0].SURNAME,
            "bank_code": "ABC",
            "account_number": dataApproval.ACCT_LINK,
            "sort_name": dataApproval.relationData[0].FIRST_NAME,
            "id_type": "Passport",
            "id_number": "AB123456",
            "depository": "DepoX",
            "broker": "BrokerY",
            "receive_information_via": "Email",
            "address_1": "123 Main Street",
            "title": "Mr.",
            "date_of_entry": "2023-08-07",
            "taxable_flag": "1",
            "address_2": "Apt 456",
            "city": "Cityville",
            "state": "Stateville",
            "postal_code": "12345",
            "country": "Countryland",
            "phone": "123-456-7890",
            "email": "john@example.com",
            "status": "1"
          },
          {
            headers: {
              'x-api-key': 'base64:5OD9CqwOrGpdtuAulon++3DuP1JhllMNspho4cOK4SQ=',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        console.log(JSON.stringify("create-shareholder::::",response1.data));
        sessionStorage.setItem("create-shareholder", JSON.stringify(response1.data))
        // alert(JSON.stringify("create-shareholder::::",response1.data));
     

      // Swal.fire({
      //   title: apiStatus === "Y" ? "Success" : "Error",
      //   text: message,
      //   icon: apiStatus === "Y" ? "success" : "error",
      // });
      Swal.fire({
        title: apiStatus === "Y" ? "Success" : "Error",
        text: message,
        icon: apiStatus === "Y" ? "success" : "error",
      }).then((result) => {
        if (result.isConfirmed) {
          // Close the modal here, for example:
          // closeModalFunction(); // Replace this with the actual function to close the modal
          setCloseModal(false)
        }
      });
      // Swal.fire({
      //   title: "Success",
      //   text: "Approved",
      //   icon: "Success",
      // });

      
      } catch (error) {
        console.error("Error Share:", error);
        alert(error)

        // Show an error message using SweetAlert
        Swal.fire({
          title: "Error",
          text: "An error occurred. Please try again.:", error,
          icon: "error",
        });
      }
    };

    console.log("responseMessage:::", responseMessage);
    console.log("responseMessage:::", {
      p_customerno_v: dataApproval.CUSTOMER_NUMBER,
      p_branchcode: dataApproval.BRANCH_CODE,
      p_date: dataApproval.POSTING_SYS_DATE,
      p_postedby: dataApproval.POSTED_BY,
      p_pterm_id: dataApproval.POSTING_TERMINAL,
      p_pip: dataApproval.p_pip,
      p_hostname: dataApproval.POSTED_BY,
      app_type: dataApproval.app_type,
    });

    // const handleOpenModal = () => {
    //   setIsModalOpen(true);
    // };

    const handleOpenModal = (customerno) => {
      setFormData((prevData) => ({
        ...prevData,
        p_customerno_v: customerno,
      }));
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
      if (selectedNumber === "1") {
        setSelectedOptionJoint("individual");
      }
    }, [selectedNumber]);

    const handleOptionChange = (event) => {
      setSelectedOptionJoint(event.target.value);
      setShowForm(event.target.value === "joint");
      setSelectedNumber("1");
      setTableData([]);
    };

    const handleNumberChange = (event) => {
      setSelectedNumber(event.target.value);
    };

    const handleAddRow = () => {
      if (selectedNumber === "2" && tableData.length === 2) {
        return; // Limit reached, do not add more rows
      }

      setTableData([...tableData, ""]);
    };

    const handleRowChange = (event, index) => {
      const updatedTableData = [...tableData];
      updatedTableData[index] = event.target.value;
      setTableData(updatedTableData);
    };

    useEffect(() => {
      // Update the table rows immediately when the selected number changes
      const newTableData = Array.from(
        { length: parseInt(selectedNumber, 10) },
        () => ""
      );
      setTableData(newTableData);
    }, [selectedNumber]);

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
      accountNumber: "",
    });
    const [formErrors, setFormErrors] = useState({});

    const [formValueAccountReferees, setFormValueAccountReferees] = useState({
      typeofReferees: "",
      accountNumber: "",
      bankName: "",
      accountName: "",
      residentAddress: "",
      emailAddress: "",
      relationship: "",
      noOfYearsKnown: "",
      phoneNumber: "",
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [hideRadioButtons, setHideRadioButtons] = useState(false);

    const handleSelectedOption = (event) => {
      const optionValue = event.target.value;
      if (selectedOptions.includes(optionValue)) {
        setSelectedOptions(
          selectedOptions?.filter((option) => option !== optionValue)
        );
        setHideRadioButtons(false);
      } else {
        setSelectedOptions([...selectedOptions, optionValue]);
        setHideRadioButtons(true);
      }
    };

    // console.log(customTheme);

    const [getTheme, setTheme] = useState(customTheme);
    const nextStep = () =>
      setActive((current) => (current < 9 ? current + 1 : current));
    const prevStep = () =>
      setActive((current) => (current > 0 ? current - 1 : current));

    //  const headers = {
    //   "x-api-key": process.env.REACT_APP_API_KEY,
    //   "Content-Type": "application/json",
    // };

    const headers = {
      "x-api-key":
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "Content-Type": "application/json",
    };

    useEffect(() => {
      axios.get(API_SERVER + "/api/get-sector", { headers }).then((res) => {
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
          .get(API_SERVER + "/api/get-customer-segment-individual", { headers })
          .then(function (response) {
            //  console.log("getCustomersegmentindividual :", response.data);
            setCustomerSegment(response.data);
          });

        // setShow(false)
      };

      // Get Customer Sub Category
      // const getCustomerSubsegmentindividual = () => {
      //   axios
      //     .get(API_SERVER + "/api/get-customer-sub-segment-individual",{headers})
      //     .then(function (response) {
      //       console.log("get Customer Subsegment individual ::::", response.data);
      //       setCustomerSubSegment(response.data)
      //     });

      //   // setShow(false)
      // };

      // Get Bank Names
      const getBankNames = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "BNC",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("title", JSON.stringify(response.data));
            setBankNames(response.data);
          });
      };

      // Relationship
      const getRelationships = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "RRE",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("title", JSON.stringify(response.data));
            setRelationship(response.data);
          });
      };

      // Get Customer Title
      const getCustomerTitle = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "TIT",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("title", JSON.stringify(response.data));
            setTitle(response.data);
          });
      };

      // Get Salutation
      const getSalutation = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "SAL",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("Salutation", JSON.stringify(response.data));
            // console.log("CurrencyAmount :",response.data);
            setSalutation(response.data);
          });
      };

      // Get ID Type
      const getIDType = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "HRD",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("getIDType", JSON.stringify(response.data));
            // console.log("getCountry :",response.data);
            setIdType(response.data);
          });
      };

      // Get City
      const getCity = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "CTY",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("getCity", JSON.stringify(response.data));
            setCity(response.data);
          });
      };

      // Get Country
      const getCountry = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "CON",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("getCountry", JSON.stringify(response.data));
            //  console.log("getCountry :", response.data);
            setCountry(response.data);
          });
      };

      // Get Postal Address
      const getPostalAddress = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "CIT",
            },
            { headers }
          )
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
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "APL",
            },
            { headers }
          )
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
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "LNG",
            },
            { headers }
          )
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
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "DRA",
            },
            { headers }
          )
          .then(function (response) {
            setDocumentRequiredType(response.data);
            //  console.log(response.data,":::Document Type")
          });
      };

      // Get Product Group
      async function getProductGroup() {
        axios
          .get(API_SERVER + "/api/get-product-group", { headers })
          .then(function (response) {
            setProductGroup(response.data);
          });
      }

      // Get Product Sub Group
      async function getProductSubGroup() {}

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
            localStorage.setItem(
              "AccountMandate",
              JSON.stringify(response.data)
            );
          });
      };

      // Get Nature of Ownership
      const getNatureOfOwnership = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "NOW",
            },
            { headers }
          )
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
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "SOW",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("getCountry", JSON.stringify(response.data));
            // console.log("getSourceofWealth :", response.data);
            const arr = [];
            response.data.map((i) => {
              const [a, b, c] = Object.values(i);
              const values = [b, a, c];
              values.pop();
              arr.push([
                ...values,
                <input type="text" className="border px-2" />,
              ]);
              // arr.pop()
              // arr.push(<input type="text" />)
            });
            setSourceOfWealth(arr);
            console.log("getSourceofWealth ::::", arr);
          });
      };

      // Get Source of fund
      const getSourceofFund = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "SOF",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("getCountry", JSON.stringify(response.data));
            // console.log("getSourceofWealth :", response.data);
            const arr = [];
            response.data.map((i) => {
              const [a, b, c] = Object.values(i);
              const values = [b, a, c];
              values.pop();
              arr.push([
                ...values,
                <input type="checkbox" className="border" />,
              ]);
              // arr.pop()
              // arr.push(<input type="text" />)
            });
            setSourceOfFund(arr);
            console.log("getSourceofWealth ::::", arr);
          });
      };

      // Get Transaction Type
      const getTransactionType = () => {
        axios
          .post(
            API_SERVER + "/api/get-code-details",
            {
              code: "TRQ",
            },
            { headers }
          )
          .then(function (response) {
            //  localStorage.setItem("getCountry", JSON.stringify(response.data));
            // console.log("getSourceofWealth :", response.data);
            const arr = [];
            response.data.map((i) => {
              const [a, b, c] = Object.values(i);
              const values = [b, a, c];
              values.pop();
              arr.push([
                ...values,
                <input type="checkbox" className="border" />,
              ]);
              // arr.pop()
              // arr.push(<input type="text" />)
            });
            setTransactionType(arr);
            console.log("getSourceofWealth ::::", arr);
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
          const response = await axios.get(
            API_SERVER + "/api/get-introductory-source",
            { headers }
          );
          setIntroductorySource(response.data);
        } catch (error) {
          console.error(error);
        }
      }

      Promise.all([
        getCustomersegmentindividual(),
        //  getCustomerSubsegmentindividual(),
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
      banks: [],
      relationship: [],
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
      customerSubSegment: [],
      introductory: [],
      sector: [],
      currencies: "",
      sourceOfWealth,
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
      allLovs.banks.push({
        value: `${i.actual_code}`,
        label: `${i.actual_code} - ${i.description}`,
      })
    );

    relationships?.map((i) =>
      allLovs.relationship.push({
        value: `${i.actual_code}`,
        label: `${i.actual_code} - ${i.description}`,
      })
    );

    console.log(title, "Title");
    title?.map((i) =>
      allLovs.title.push({
        value: `${i.actual_code}`,
        label: `${i.actual_code} - ${i.description}`,
      })
    );

    //  const getSalutation = JSON.parse(localStorage.getItem("Salutation"));
    salutation?.map((i) =>
      allLovs.salutation.push({
        value: i.actual_code,
        label: `${i.actual_code} - ${i.description}`,
      })
    );

    //  const getIDType = JSON.parse(localStorage.getItem("getIDType"));
    idType?.map((i) =>
      allLovs.id_type.push({
        value: i.actual_code,
        label: `${i.actual_code} - ${i.description}`,
      })
    );

    //  const getCity = JSON.parse(localStorage.getItem("getCity"));
    city?.map((i) =>
      allLovs.city.push({
        value: i.actual_code,
        label: `${i.actual_code} - ${i.description}`,
      })
    );

    //  const getCountry = JSON.parse(localStorage.getItem("getCountry"));
    country?.map((i) =>
      allLovs.country.push({
        value: i.actual_code,
        label: `${i.actual_code} - ${i.description}`,
      })
    );

    sector?.map((i) =>
      allLovs.sector.push({
        value: `${i.actual_code} - ${i.description}`,
        label: i.description,
      })
    );

    //  currencies?.map((i) =>
    //  allLovs.currencies.push({value: i.actual_code, label: i.description}))

    // if (customerSegment > 0) {
    //   customerSegment.map((i) =>
    //     allLovs.customerSegment.push(i)
    //   );
    // }

    console.log(customerSegment, "customerSegment");
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
      allLovs.signatoryLevel.push({
        value: i.actual_code,
        label: i.description,
      })
    );

    const getPreferredLanguage = JSON.parse(
      localStorage.getItem("PreferrredLanguage")
    );
    getPreferredLanguage?.map((i) =>
      allLovs.preferredLanguage.push({
        value: i.actual_code,
        label: `${i.actual_code} - ${i.description}`,
      })
    );

    ///////////////////// product Group ///////////////////////////
    if (productGroup) {
      productGroup.map((i) => allLovs.productGroup.push(i));
    }

    if (productSubGroup) {
      allLovs.productSubGroup = productSubGroup;
    }

    if (customerSegment) {
      customerSegment.map((i) =>
        allLovs.customerSegment.push({
          value: `${i.actual_code}`,
          label: `${i.description}`,
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

    console.log(customerSubSegment, "::::::::::::::::");

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

    const getAccountMandate = JSON.parse(
      localStorage.getItem("AccountMandate")
    );
    getAccountMandate?.map((i) =>
      allLovs.accountMandate.push({
        value: i.actual_code,
        label: `${i.actual_code} - ${i.description}`,
      })
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

    function switchFocus(e, nextFieldId) {
      if (e.key === "Enter") {
        document.getElementById(nextFieldId).focus();
      }
    }

    const handleOnChange = {
      myMethod: function () {
        const getProductGroup = JSON.parse(
          localStorage.getItem("ProductGroup")
        );
        getProductGroup?.map((i) =>
          allLovs.productGroup.push({
            value: `${i.actual_code} - ${i.description}`,
            label: `${i.actual_code} - ${i.description}`,
          })
        );
        console.log("Hello World!");
      },

      bankNames: async function (value) {
        console.log(value);
      },

      customerSegment_: async function (value) {
        const data = await axios.post(
          API_SERVER + "/api/get-customer-sub-segment-individual",
          {
            segmentCode: value,
          },
          { headers }
        );
        console.log(value, data, ":::Customer Segment");
        setCustomerSubSegment(data?.data);
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          customerSegment: value,
        }));
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
          console.log(arr, "::::Customer Segment");
        }

        setTimeout(() => {
          const input = document.getElementById("subSegment");
          input.focus();
        }, 0);
      },

      customerSubSegment: async function (value) {
        console.log(value, "VVVVVVVVVVV");
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          customerSubSegment: value,
        }));

        setTimeout(() => {
          const input = document.getElementById("RequiredType");
          input.focus();
        }, 0);
      },

      productGroup: function (value) {
        axios
          .post(
            API_SERVER + "/api/get-product-sub-group",
            {
              productGroup: value.split("-")[0].trim(),
            },
            { headers }
          )
          .then(function (response) {
            console.log(response.data, value.split("-")[0], "from me");
            setProductSubGroup(response.data);
          });

        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          productGroup: value,
        }));

        setTimeout(() => {
          const input = document.getElementById("prodSubgroup");
          input.focus();
        }, 0);
      },

      sector: async function (value) {
        const data = await axios.post(
          API_SERVER + "/api/get-sub-sector",
          {
            sector: value.trim(),
          },
          { headers }
        );
        console.log(value, data, "mmmmmSector");
        setSubSector(data.data);

        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          sector: value,
        }));

        setTimeout(() => {
          const input = document.getElementById("subsector");
          input.focus();
        }, 0);
      },

      subSector: async function (value) {
        console.log(value, "Sub Sector");
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          subSector: value,
        }));
      },

      productSubGroup: async function (value) {
        // setSelectedSubgroup(value)
        //  console.log(value, "mmmmm");
        const data = await axios.post(
          API_SERVER + "/api/currencies",
          {
            type_of_acct: value.split("-")[0].trim(),
          },
          { headers }
        );
        if (data.data.length > 0) {
          const response = data.data;
          const arr = [];
          //  console.log(response, "Mannnn");
          response.map((i) => {
            arr.push({ value: i.actual_code, label: i.description });
            //  console.log(arr)
          });
          console.log(arr, "Araudiso");
          setCurrencies(arr);
        } else {
          setCurrencies("");
        }

        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          productSubGroup: value,
        }));

        setTimeout(() => {
          const input = document.getElementById("currency");
          input.focus();
        }, 0);
      },

      currencies: async function (value) {
        console.log(value);
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          currencies: value,
        }));

        setTimeout(() => {
          const input = document.getElementById("select_field");
          input.focus();
        }, 0);
      },

      documentRequiredType: async function (value) {
        //introSource
        console.log(value, "Decoment");
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          documentRequiredType: value,
        }));

        // setTimeout(() => {
        //   const input = document.getElementById("introSource");
        //   input.focus();
        // },0);
      },

      introductorysource: async function (value) {
        console.log(value);
        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          introductorySource: value,
        }));

        setTimeout(() => {
          const input = document.getElementById("sector");
          input.focus();
        }, 0);
      },

      relatioManager: async function (value) {
        // accountDetailsData(value);

        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          relatioManager: value,
        }));
        // Add your logic here to handle the selected value
      },
    };

    console.log(currencies, "Currencies");

    console.log("accountDetailsData", accountDetailsData);

    if (currencies) {
      allLovs.currencies = currencies;
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

    const handleButtonClickError = () => {
      if (!inputValue) {
        setInputError("Input field is required");
      } else {
        setInputError("");
        // do something with the valid input value, such as submitting it to a server
      }
    };

    // const handleSubmit = (event) => {
    //   event.preventDefault();

    //   const errors = {};
    //   let hasErrors = false;

    //   Object.entries(validationRules).forEach(([field, rules]) => {
    //     if (rules.required && !formValues[field]) {
    //       errors[field] = `${field} is required`;
    //       hasErrors = true;
    //     } else if (rules.pattern && !rules.pattern.test(formValues[field])) {
    //       errors[field] = `${field} is not valid`;
    //       hasErrors = true;
    //     }
    //   });

    //   if (hasErrors) {
    //     setFormErrors(errors);
    //   } else {
    //     setFormErrors({});
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   }
    // };

    const tabsData = [
      {
        value: "default",
        label: "Personal Details",
        component: (
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
            dataApproval={dataApproval}
            selectedData={selectedData}
          />
        ),
      },
      {
        value: "tab-2",
        label: "Account Details",
        component: (
          <div>
            <Account_Details
              sector={sector}
              subSector={subSector}
              customerSegment={customerSegment}
              // customerSubSegment={customerSubSegment}
              accountDetailsData={accountDetailsData}
              setAccountDetailsData={setAccountDetailsData}
              accountTypes={accountTypes}
              setAccountTypes={setAccountTypes}
              data={allLovs}
              onChange={handleOnChange}
              custType={custType}
              handleCustTypeChange={handleCustTypeChange}
              dataApproval={dataApproval}
              selectedData={selectedData}
            />
          </div>
        ),
      },

      // {
      //   value: "tab-3",
      //   label: "Shares",
      //   component: (
      //     <div>
      //       <Shares dataApproval={dataApproval} />
      //     </div>
      //   ),
      // },

      {
        value: "tab-4",
        label: "Documents",
        component: (
          <div>
            <Account_Mandate
              data={allLovs}
              custType={custType}
              dataD={data}
              storedFormData={storedFormData}
              handleChangeDocs={handleChangeDocs}
              dataApproval={dataApproval}
            />
          </div>
        ),
      },

      {
        value: "tab-5",
        label: "Next Of Kin ",
        component: (
          <div>
            <Next_Kin_tab
              nextOfKingData={nextOfKingData}
              tableDataNok={tableDataNok}
              allNextOfKingData={allNextOfKingData}
              handleChangeNextOfKin={handleChangeNextOfKin}
              handleSubmitNextOfKin={handleSubmitNextOfKin}
              handleClearTable={handleClearTable}
              dataApproval={dataApproval}
              setSelectedDataNOK={setSelectedDataNOK}
              handleViewClickNOK={handleViewClickNOK}
              selectedDataNOK={selectedDataNOK}
            />
          </div>
        ),
      },

      // { value: 'tab-4', label: 'Account Referees',
      //   component:
      //   <div>
      //       <Account_Referees
      //         handleChange={handleChange}
      //         onChange={handleOnChange}
      //         data={allLovs}
      //         formValueAccountReferees={formValueAccountReferees}
      //         setFormValueAccountReferees={setFormValueAccountReferees}
      //         handleSubmit={handleSubmit}
      //         storedFormData={storedFormData}
      //         storeDataInSessionStorage={storeDataInSessionStorage}
      //         savedData={savedData}
      //         accountReferee={accountReferee}
      //         setAccountReferee={setAccountReferee}
      //       />
      //   </div>
      // },

      {
        value: "tab-6",
        label: "Anti Money Laundering",
        component: (
          <div>
            <Anti_Money_Laundering
              sourceOfWealth={sourceOfWealth}
              sourceOfFund={sourceOfFund}
              transactionType={transactionType}
              data={allLovs}
              handleChange={handleChange}
            />
          </div>
        ),
      },
    ];

    const customerTypeOpions = [
      { value: "I", label: "Individual Account Opening" },
      { value: "J", label: "Joint Account Opening" },
    ];

    const [showTable, setShowTable] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [numRows, setNumRows] = useState(0);
    const [tableDataSmall, setTableDataSmall] = useState([]);
    const [isNumberEntered, setIsNumberEntered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [saveUpdate, setSaveUpdate] = useState(false);
    const [index, setIndex] = useState("");
    const [activeTab, setActiveTab] = useState(tabsData[0].value);

    const handleOptionHeader = (event) => {
      if (event.target.value === "JT") {
        setShowTable(true);
        setShowInput(true);
      } else {
        setShowTable(false);
        setShowInput(false);
      }
    };

    const handleNumRowsChange = (event) => {
      const value = parseInt(event.target.value, 10);
      setNumRows(value);
      setTableDataSmall(Array.from({ length: value }, () => ({})));
      setIsNumberEntered(!Number.isNaN(value));
      setShowPopup(true);
    };

    const handleTableInputChange = (event, rowIndex, fieldName) => {
      const updatedData = [...tableData];
      updatedData[rowIndex][fieldName] = event.target.value;
      setTableDataSmall(updatedData);
    };

    useEffect(() => {
      if (showPopup) {
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    }, [showPopup]);

    const tableRow = (row, rowIndex) => {
      setIndex(row[0]);
      setSaveUpdate(true);
    };

    console.log("customerDataTable::::", customerDataTable);

    const relationData = [];

    return (
      <div className="" style={{ zoom: "0.80" }}>
        <div>
          {/* <div className="">
        <ActionButtons/>
      </div> */}

          <hr />
          <div className="p-1">
            <ActionButtons handleFinalChange={handleFinalChange} handleSubmitApproval={handleSubmitApproval} />
            <hr />
            <div className="border p-2">
              {/* <div className="App">
            <h1>Customer Fetcher</h1>
            <div>
              <label>Enter Customer Number: </label>
              <input
                type="text"
                value={customerNumber}
                onChange={handleInputChangeCust}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button onClick={fetchDataCustomerNumber}>Fetch Data</button>
          
          </div> */}

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex mb-2 space-x-8">
                    <label
                      htmlFor="email"
                      className="w-[54] flex items-center justify-end pr-4 text-right"
                    >
                      Member&nbsp;Account&nbsp;Name
                    </label>
                    <input
                      type="text"
                      id="accountname"
                      className="w-[400px] rounded border-gray-400 border p-[2px]"
                      value={dataApproval.CUSTOMER_NAME}
                      onChange={handleChangeCustomername}
                      readOnly
                      disabled
                    />
                  </div>

                  {/* <div className="flex mb-4">
                    <label htmlFor="email" className="w-[54] flex items-center justify-end pr-4 text-right">Email:</label>
                    <input type="text" id="email" className="w-54 rounded border-gray-400 border p-[2px]" />
                    </div> */}
                  <div className="flex ">
                    <label
                      htmlFor="email"
                      className="w-[54] flex items-center justify-end pr-4 text-right"
                    >
                      Member
                      Category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <select
                      className="p-[2px] W-[10px] border text-sm border-gray-400 rounded"
                      // value={typeOfAccount}
                      value={dataApproval.TYPE_OF_CUSTOMER}
                      disabled
                      // onChange={handleChangeTypeOfAccount}
                    >
                      <option value="ID">INDIVIDUAL</option>
                      <option value="JT">JOINT</option>
                    </select>
                    {/* <input type="text" value={dataApproval.TYPE_OF_CUSTOMER} className="p-[2px] W-[10px] border text-sm border-gray-400 rounded" /> */}
                  </div>

                </div>


                <div className="mx-10">
                  <div className="mb-2">
                    <InputField
                      className=""
                      label="Posted By"
                      name=""
                      labelWidth={"30%"}
                      // value={dataApproval.CUSTOMER_NUMBER}
                      value={
                        dataApproval.relationData?.length > 0
                          ? dataApproval.POSTED_BY
                          : ""
                      }
                      // onChange={handleInputChangeApproval}
                    />
                  </div>
                  
                  <div >
                    <InputField
                      className=""
                      label="Branch"
                      name=""
                      labelWidth={"30%"}
                      // value={dataApproval.CUSTOMER_NUMBER}
                      value={
                        dataApproval.relationData?.length > 0
                          ? dataApproval.BRANCH_CODE
                          : ""
                      }
                      // onChange={handleInputChangeApproval}
                    />
                  </div>
                </div>

                <div className=""> 
                  {/* <button onClick={handleOpenModal}>Approve</button> */}
                  {/* <button onClick={handleSubmitApproval}>Approve</button> */}

                <div className="mx-5">
                  <InputField
                    className=""
                    label="No Of Relation"
                    name=""
                    labelWidth={"30%"}
                    inputWidth={'20%'}
                    // value={dataApproval.CUSTOMER_NUMBER}
                    // value={
                    //   dataApproval.relationData?.length > 0
                    //     ? dataApproval.POSTED_BY
                    //     : ""
                    // }
                    // onChange={handleInputChangeApproval}
                  />
                </div>
                  {/* <button onClick={handleOpenModal}>Approve</button> */}
                  {/* <button onClick={handleSubmitApproval}>Approve</button> */}

                  <Modal
                    opened={isModalOpen}
                    onClose={handleCloseModal}
                    size="sm"
                    title="Member Approval Form"
                  >
                    <div>
                      <form onSubmit={handleSubmitApproval}>
                        <InputField
                          className="mt-2"
                          label="Customer Number"
                          name="p_customerno_v"
                          labelWidth={"30%"}
                          // value={dataApproval.CUSTOMER_NUMBER}
                          value={
                            dataApproval.relationData?.length > 0
                              ? dataApproval.CUSTOMER_NUMBER
                              : ""
                          }
                          onChange={handleInputChangeApproval}
                        />
                        <InputField
                          className="mt-2"
                          label="Branch Code"
                          name="p_branchcode"
                          labelWidth={"30%"}
                          // value={dataApproval.BRANCH_CODE}
                          value={
                            dataApproval.relationData?.length > 0
                              ? dataApproval.BRANCH_CODE
                              : ""
                          }
                          onChange={handleInputChangeApproval}
                        />
                        <InputField
                          className="mt-2"
                          label="p_date"
                          name="p_date"
                          labelWidth={"30%"}
                          // value={dataApproval.relationData[0].POSTING_SYS_DATE}
                          value={
                            dataApproval.relationData?.length > 0
                              ? dataApproval.relationData[0].POSTING_SYS_DATE
                              : ""
                          }
                          onChange={handleInputChangeApproval}
                        />
                        <InputField
                          className="mt-2"
                          label="Posted By"
                          name="p_postedby"
                          labelWidth={"30%"}
                          // value={dataApproval.POSTED_BY}
                          value={
                            dataApproval.relationData?.length > 0
                              ? dataApproval.POSTED_BY
                              : ""
                          }
                          onChange={handleInputChangeApproval}
                        />
                        <InputField
                          className="mt-2"
                          label="p_pterm_id"
                          name="p_pterm_id"
                          labelWidth={"30%"}
                          // value={dataApproval.POSTING_TERMINAL}
                          value={
                            dataApproval.relationData?.length > 0
                              ? dataApproval.POSTING_TERMINAL
                              : ""
                          }
                          onChange={handleInputChangeApproval}
                        />
                        <InputField
                          className="mt-2"
                          label="p_pip"
                          name="p_pip"
                          labelWidth={"30%"}
                          // value={dataApproval.p_pip}
                          value={
                            dataApproval.relationData?.length > 0
                              ? dataApproval.p_pip
                              : ""
                          }
                          onChange={handleInputChangeApproval}
                        />
                        <InputField
                          className="mt-2"
                          label="p_hostname"
                          name="p_hostname"
                          labelWidth={"30%"}
                          // value={dataApproval.p_hostname}
                          value={
                            dataApproval.relationData?.length > 0
                              ? dataApproval.p_hostname
                              : ""
                          }
                          onChange={handleInputChangeApproval}
                        />
                        <InputField
                          className="mt-2"
                          label="app_type"
                          name="app_type"
                          labelWidth={"30%"}
                          // value={dataApproval.app_type}
                          value={
                            dataApproval.relationData?.length > 0
                              ? dataApproval.app_type
                              : ""
                          }
                          onChange={handleInputChangeApproval}
                        />
                        <Button type="submit">Submit</Button>
                      </form>
                    </div>
                  </Modal>
                </div>


                {showInput && (
                  <div className="flex items-center space-x-2">
                    <div>
                      <Label
                        label="Number&nbsp;of&nbsp;Relation"
                        fontSize="85%"
                      />
                    </div>
                    <input
                      type="number"
                      className="mt-2 w-10 p-[1px] border border-gray-300 rounded text-center"
                      placeholder="Enter number of rows"
                      min="0"
                      value={numRows}
                      onChange={handleNumRowsChange}
                    />
                    {showPopup && (
                      <div className="bg-red-500 text-white p-1 mt-1 rounded-md">
                        {`Enter only ${numRows} relation(s)`}
                      </div>
                    )}
                  </div>
                )}

                <div>

                  <div className="flex items-center space-x-5 invisible">
                    <label>
                      <input
                        type="checkbox"
                        value="option1"
                        checked={selectedOptions.includes("option1")}
                        onChange={handleSelectedOption}
                      />
                      Director
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="option2"
                        checked={selectedOptions.includes("option2")}
                        onChange={handleSelectedOption}
                      />
                      Shareholder
                    </label>
                  </div>
                </div>

                <div>
                  <div class="md:flex md:items-center space-x-15 mb-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Member&nbsp;Number" fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 md:ml-[2px]">
                      <InputField
                        id="accountno"
                        inputWidth={"100%"}
                        name="accountno"
                        value={dataApproval.CUSTOMER_NUMBER}
                        disabled
                        style={{ alignText: "center" }}
                        // onChange={(e) => handleChange('sname_v', e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="md:flex md:items-center space-x-15 mb-2">
                    <div class="md:w-1/3 text-right">
                      <Label
                        label="Account&nbsp;Number "
                        fontSize="85%"
                      />
                    </div>
                    <div className="md:w-2/3 md:ml-[2px]">
                      <InputField
                        id="membership"
                        inputWidth={"100%"}
                        name="membership"
                        value={dataApproval.ACCOUNT_NUMBER}
                        disabled
                        style={{ alignText: "center" }}
                        // onChange={(e) => handleChange('sname_v', e.target.value)}
                      />
                    </div>
                  </div>

                  <div class="md:flex md:items-center space-x-15">
                    <div class="md:w-1/3 text-right">
                      <Label
                        label="Settlement&nbsp;Account"
                        fontSize="85%"
                      />
                    </div>
                    <div className="md:w-2/3 md:ml-[2px]">
                      <InputField
                        id="statement"
                        inputWidth={"100%"}
                        name="statement"
                        value={dataApproval.ACCT_LINK_1}
                        disabled
                        style={{ alignText: "center" }}
                        // onChange={(e) => handleChange('sname_v', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-between">
              <div class="w-full max-w-xl mt-2">
                <div className="md:flex md:items-center mb-2 ml-2">
                  <div className="">
                    <div className="flex">
                    <label htmlFor="email" className="w-[54] flex items-center justify-end pr-4 text-right">Customer Category</label>
                    <select
                      className="p-[2px] W-[10px] border text-xs border-gray-300 rounded-md"
                      onChange={handleOptionHeader}
                    >
                      <option value="1">INDIVIDUAL</option>
                      <option value="2">STAFF RELATED</option>
                      <option value="2">SHAREHOLDER</option>
                      <option value="3">JOINT</option>
                      <option value="4">SHAREHOLDER</option>
                      <option value="5">DIRECTOR RELATED</option>
                      <option value="6">SHAREHOLDER RELATED</option>
                    </select>
                  </div>

                
                  </div>

                 
                </div>
              </div>


            </div> */}
          </div>

          <hr />
      <div className="mx-3 my-5">
        <table className="w-full">
            <thead>
                <tr className="bg-green-700">
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Number&nbsp;of&nbsp;People</th>
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Relation&nbsp;Number</th>
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>First&nbsp;Name</th>
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Middle&nbsp;Name</th>
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Surname</th>
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Gender</th>
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Date&nbsp;of&nbsp;Birth</th>
                  
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Phone&nbsp;Number</th>
                  <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Action</th>
                </tr>
            </thead>
          <tbody>
          {dataApproval.relationData?.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No data available
              </td>
            </tr>
          ) : (
            dataApproval.relationData?.map((data, index) => (
              <tr 
                key={index}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
              >
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{data.RELATION_NO}</td>
                <td>{`${data.FIRST_NAME}`}</td>
                <td></td>
                <td>{data.LAST_NAME}</td> 
                <td className="text-center">{data.GENDER}</td> 
                <td>{data.DATE_OF_BIRTH}</td>
                <td>{data.MOBILE1}</td>
                {/* Add more columns here if needed */}
                <td className="flex justify-center">
                  <div className="text-center border p-2 shadow-md cursor-pointer bg-sky-500 rounded-md" onClick={() => handleViewClick(index)}>
                    <AiOutlineEye className="text-white" />
                  </div>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>
          <hr />
        </div>

        {selectedData && (
          <div>
            <TabsComponent
              tabsData={tabsData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        )}
      </div>
    );
  }

export default MyTabs;

