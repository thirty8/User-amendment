import { useState, useEffect } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { GiHumanTarget } from "react-icons/gi";
import { SiNike } from "react-icons/si";
import { MdOutlinePersonalInjury } from "react-icons/md";
import Account_Details from "./account-details";
import Account_Mandate from "./account-mandate";
import Account_Referees from "./account-referees";
import Anti_Money_Laundering from "./anti-money-laundering";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import AccordionUsable from "./Accordion";
// import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
// import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import Label from "../../../../../components/others/Label/Label";
import InputField from "./comp/InputField";
import ActionButtons from "./comp/ActionButtons";
import Shares from "./Shares";
import Next_Kin_tab from "./Next_kin_tab";
import Mandate from "./Mandate";
import { MdEdit, MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

import Corporate_Bank from "./corporate-bank";
import Director from "./Director";
// import Signatorydetais from "./stakeholder-detais";
import Directordetails from "./signatory-details";
import Shareholderdetails from "./shareholder-details";
import Stakeholderdetails from "./stakeholder-detais";
import TabsComponent from "./comp/tab-component";

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
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

  handleClearNew,

  formDataShares,
  handleSubmitShares,
  handleChangeShares,

  relationData,
  handleRowClick,
  handleEdit,
  handleDelete,
  onclickOnrow,

  effective,
  ImageVerification,

  handleNumRowsChange,
  numRows,
  tableDataSmall,
  isNumberEntered,

  showPopup,
  setShowPopup,
  validateInput,
  randomNumberString,

  arrayDocs,
  docsId,

  handleChangeAML,
  amlData,
  errors,
  updateTypeOfC,
  message,

  handleCheckValueClick,
  isModalOpen,
  closeModal,
  displayValidData,
  acMandate,
  handleAccountMandate,
  currencies,
  setErrorTest,
  clearError,
  handleRadioChangeMember,
  setTableDataAddress,
  tableDataAddress,
  usedAddressTypes,
  setUsedAddressTypes,
  // generateRandomNumberString
  handleBlurValidation,
  handleSubmitValidation,
  dynamicNumber,
  setDynamicNumber,
  isLoading,
  userExists,
  userDataValidation,
  setModalIsOpen,
  isValid,

  // handleChangeCorporateInfo,
  // isValidKraPin

  DatePicker,
  handleChangeCorporateInfo,
  isValidKraPin,
  validateKraPin,
  showValidMessage,
  corporate,
  kraPinError,
  refinedData,
  setRefinedData,

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

  showOtherModal,
  showOtherModalClose,
  setOtherModal,

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

  handleSubmitCorporateData,
  setCorporate,

  handleChangeSelect,
  handleApprovalLimitChange,
  handleCheckboxSignatory,
  selectedValue,
  approvalLimit,
  checkboxValues,
  handleSubmitSignatory,

  createAccount,


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
setCustNo
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
  // const [currencies, setCurrencies] = useState([]);
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

  const [selectedOptionJoint, setSelectedOptionJoint] = useState("individual");
  const [showForm, setShowForm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("1");
  const [tableData, setTableData] = useState([]);

  const [formattedDate, setFormattedDate] = useState("");

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

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };

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

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    axios.get(API_SERVER + "/api/get-sector", { headers }).then((res) => {
      if (res.data.length > 0) {
        const arr = [];
        res.data?.map((i) =>
          arr.push({ value: i.class_code, label: i.description })
        );
        setSector(arr);
      }
    });
  }, [accountTypes]);

  useEffect(() => {
    // Get Customer Segment
    const getCustomersegmentindividual = () => {
      axios
        .get(API_SERVER + "/api/get-customer-segment-individual", { headers })
        .then(function (response) {
          setCustomerSegment(response.data);
        });
    };

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
          localStorage.setItem("AccountMandate", JSON.stringify(response.data));
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
          const arr = [];
          response.data.map((i) => {
            const [a, b, c] = Object.values(i);
            const values = [b, a, c];
            values.pop();
            arr.push([
              ...values,
              <input type="text" className="border px-2" />,
            ]);
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
          const arr = [];
          response.data.map((i) => {
            const [a, b, c] = Object.values(i);
            const values = [b, a, c];
            values.pop();
            arr.push([...values, <input type="checkbox" className="border" />]);
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
          const arr = [];
          response.data.map((i) => {
            const [a, b, c] = Object.values(i);
            const values = [b, a, c];
            values.pop();
            arr.push([...values, <input type="checkbox" className="border" />]);
          });
          setTransactionType(arr);
          console.log("getSourceofWealth ::::", arr);
        });
    };

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

  salutation?.map((i) =>
    allLovs.salutation.push({
      value: i.actual_code,
      label: `${i.actual_code} - ${i.description}`,
    })
  );

  idType?.map((i) =>
    allLovs.id_type.push({
      value: i.actual_code,
      label: `${i.actual_code} - ${i.description}`,
    })
  );

  city?.map((i) =>
    allLovs.city.push({
      value: i.actual_code,
      label: `${i.actual_code} - ${i.description}`,
    })
  );

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

  const getPostalAddress = JSON.parse(localStorage.getItem("getPostalAddress"));
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

  if (customerSubSegment) {
    customerSubSegment.map((i) =>
      allLovs.customerSubSegment.push({
        value: `${i.actual_code}`,
        label: i.description,
      })
    );
  }

  documentRequiredType?.map((i) =>
    allLovs.documentRequiredType.push({
      value: `${i.actual_code} - ${i.description}`,
      label: `${i.actual_code} - ${i.description}`,
    })
  );

  const getAccountMandate = JSON.parse(localStorage.getItem("AccountMandate"));
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
    IntroductorySource.map((i) => allLovs.introductory.push(i));
  }

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////

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
      // console.log(value, data, "mmmmmSector");
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
      // console.log(value, "Sub Sector");
      setAccountDetailsData((prevFormValues) => ({
        ...prevFormValues,
        subSector: value,
      }));
    },

    productSubGroup: async function (value) {
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
      // console.log(value, "Decoment");
      setAccountDetailsData((prevFormValues) => ({
        ...prevFormValues,
        documentRequiredType: value,
      }));
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
      setAccountDetailsData((prevFormValues) => ({
        ...prevFormValues,
        relatioManager: value,
      }));
      // Add your logic here to handle the selected value
    },
  };

  if (currencies) {
    allLovs.currencies = currencies;
  }

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

  const tabsData = [
    {
      value: "default",
      label: "Corporate Information",
      component: (
        <Corporate_Bank
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
          randomNumberString={randomNumberString}
          // generateRandomNumberString={generateRandomNumberString}
          handleEdit={handleEdit}
          onclickOnrow={onclickOnrow}
          effective={effective}
          validateInput={validateInput}
          handleChangeCorporateInfo={handleChangeCorporateInfo}
          isValidKraPin={isValidKraPin}
          validateKraPin={validateKraPin}
          showValidMessage={showValidMessage}
          corporate={corporate}
          DatePicker={DatePicker}
          kraPinError={kraPinError}
          errors={errors}

          handleSubmitCorporateData={handleSubmitCorporateData}
          setCorporate={setCorporate}
        />
      ),
    },

    {
      value: "tab-1",
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
            handleRadioChangeMember={handleRadioChangeMember}
            // currencies={currencies}
          />
        </div>
      ),
    },
    // {
    //   value: "tab-1",
    //   label: "Relation Details",
    //   component: (
    //     <AccordionUsable
    //       selectedOptionJoint={selectedOptionJoint}
    //       tableData={tableData}
    //       handleSubmit={handleSubmit}
    //       formData={formData}
    //       setFormData={setFormData}
    //       handleChange={handleChange}
    //       response={response}
    //       error={error}
    //       customerData={customerData}
    //       customerDataTable={customerDataTable}
    //       storedFormData={storedFormData}
    //       selectedOptions={selectedOptions}
    //       hideRadioButtons={hideRadioButtons}
    //       // randomNumberString={randomNumberString}
    //       // generateRandomNumberString={generateRandomNumberString}
    //       handleEdit={handleEdit}
    //       handleDelete={handleDelete}
    //       onclickOnrow={onclickOnrow}
    //       effective={effective}
    //       validateInput={validateInput}
    //       errors={errors}
    //       message={message}
    //       handleCheckValueClick={handleCheckValueClick}
    //       isModalOpen={isModalOpen}
    //       closeModal={closeModal}
    //       displayValidData={displayValidData}
    //       setErrorTest={setErrorTest}
    //       clearError={clearError}
    //       setTableDataAddress={setTableDataAddress}
    //       tableDataAddress={tableDataAddress}
    //       usedAddressTypes={usedAddressTypes}
    //       setUsedAddressTypes={setUsedAddressTypes}
    //       handleBlurValidation={handleBlurValidation}
    //       handleSubmitValidation={handleSubmitValidation}
    //       dynamicNumber={dynamicNumber}
    //       setDynamicNumber={setDynamicNumber}
    //       isLoading={isLoading}
    //       userExists={userExists}
    //       userDataValidation={userDataValidation}
    //       isValid={isValid}
    //       typeOfAccount={typeOfAccount}
    //       refinedData={refinedData}
    //       setRefinedData={setRefinedData}
    //     />
    //   ),
    // },
    {
      value: "tab-2",
      label: "Stakeholder Type",
      component: (
        <Stakeholderdetails
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
          relationData={relationData}
          handleRowClick={handleRowClick}
          // setRelationData={setRelationData}

          // saveDataFromRelatioDetails={saveDataFromRelatioDetails}
          // setSavedDataFromRelatioDetails={setSavedDataFromRelatioDetails}

          // setApiData={setApiData}
          // onClose={onClose}
          // setShow={setShow}
          // setShowNewUserForm={setShowNewUserForm}

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
          showOtherModal={showOtherModal}
          showOtherModalClose={showOtherModalClose}
          setOtherModal={setOtherModal}
          stakeholder={stakeholder}
          showNewUserFormStakeholders={showNewUserFormStakeholders}
          showNewUserFormFCloseStakeholder={showNewUserFormFCloseStakeholder}
          handleFormSubmitStakeholder={handleFormSubmitStakeholder}
          selectedStakeholderType={selectedStakeholderType}
          handleStakeholderTypeChange={handleStakeholderTypeChange}
          activeState={activeState}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          handleActiveStateChange={handleActiveStateChange}

          add_new_relation={add_new_relation}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}

          insertedData={ insertedData}

          handleSubmitNewRelation={handleSubmitNewRelation}
          setAddNewRelation={setAddNewRelation}


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
      ),
    },
    // {
    //   value: "tab-3",
    //   label: "Directors",
    //   component: (
    //     <div>
    //       <Directordetails

    //       selectedOptionJoint={selectedOptionJoint}
    //       tableData={tableData}
    //       handleSubmit={handleSubmit}
    //       formData={formData}
    //       setFormData={setFormData}
    //       handleChange={handleChange}
    //       response={response}
    //       error={error}
    //       customerData={customerData}
    //       customerDataTable={customerDataTable}
    //       storedFormData={storedFormData}
    //       selectedOptions={selectedOptions}
    //       hideRadioButtons={hideRadioButtons}
    //       // randomNumberString={randomNumberString}
    //       // generateRandomNumberString={generateRandomNumberString}
    //       handleEdit={handleEdit}
    //       handleDelete={handleDelete}
    //       onclickOnrow={onclickOnrow}
    //       effective={effective}
    //       validateInput={validateInput}
    //       errors={errors}
    //       message={message}
    //       handleCheckValueClick={handleCheckValueClick}
    //       isModalOpen={isModalOpen}
    //       closeModal={closeModal}
    //       displayValidData={displayValidData}
    //       setErrorTest={setErrorTest}
    //       clearError={clearError}
    //       setTableDataAddress={setTableDataAddress}
    //       tableDataAddress={tableDataAddress}
    //       usedAddressTypes={usedAddressTypes}
    //       setUsedAddressTypes={setUsedAddressTypes}
    //       handleBlurValidation={handleBlurValidation}
    //       handleSubmitValidation={handleSubmitValidation}
    //       dynamicNumber={dynamicNumber}
    //       setDynamicNumber={setDynamicNumber}
    //       isLoading={isLoading}
    //       userExists={userExists}
    //       userDataValidation={userDataValidation}
    //       isValid={isValid}
    //       typeOfAccount={typeOfAccount}
    //       refinedData={refinedData}
    //       setRefinedData={setRefinedData}
    //       relationData={relationData}
    //       handleRowClick={handleRowClick}
    //       // setRelationData={setRelationData}

    //       // saveDataFromRelatioDetails={saveDataFromRelatioDetails}
    //       // setSavedDataFromRelatioDetails={setSavedDataFromRelatioDetails}

    //       // setApiData={setApiData}
    //       // onClose={onClose}
    //       // setShow={setShow}
    //       // setShowNewUserForm={setShowNewUserForm}

    //       handleProceed={handleProceed}
    //       onCloseForRelationValidationForm={onCloseForRelationValidationForm}
    //       handleFormSubmit={handleFormSubmit}
    //       setFormData1={setFormData1}
    //       formData1={formData1}
    //       loading={loading}
    //       showApiDataModal={showApiDataModal}
    //       saveDataNewForm={saveDataNewForm}
    //       showNewUserForm={showNewUserForm}
    //       showNewUserFormFClose={showNewUserFormFClose}
    //       showNewUserFormF={showNewUserFormF}
    //       apiData={apiData}
    //       toggleModal={toggleModal}
    //       isOpenRelationDetails={isOpenRelationDetails}
    //       show={show}
    //       />
    //       {/* <Director
    //         // formData={formData}
    //         relationData={relationData}
    //       /> */}
    //     </div>
    //   ),
    // },

    // {
    //   value: "tab-5",
    //   label: "Shareholder",
    //   component: (
    //     <div>
    //       <Shareholderdetails

    // selectedOptionJoint={selectedOptionJoint}
    // tableData={tableData}
    // handleSubmit={handleSubmit}
    // formData={formData}
    // setFormData={setFormData}
    // handleChange={handleChange}
    // response={response}
    // error={error}
    // customerData={customerData}
    // customerDataTable={customerDataTable}
    // storedFormData={storedFormData}
    // selectedOptions={selectedOptions}
    // hideRadioButtons={hideRadioButtons}
    // // randomNumberString={randomNumberString}
    // // generateRandomNumberString={generateRandomNumberString}
    // handleEdit={handleEdit}
    // handleDelete={handleDelete}
    // onclickOnrow={onclickOnrow}
    // effective={effective}
    // validateInput={validateInput}
    // errors={errors}
    // message={message}
    // handleCheckValueClick={handleCheckValueClick}
    // isModalOpen={isModalOpen}
    // closeModal={closeModal}
    // displayValidData={displayValidData}
    // setErrorTest={setErrorTest}
    // clearError={clearError}
    // setTableDataAddress={setTableDataAddress}
    // tableDataAddress={tableDataAddress}
    // usedAddressTypes={usedAddressTypes}
    // setUsedAddressTypes={setUsedAddressTypes}
    // handleBlurValidation={handleBlurValidation}
    // handleSubmitValidation={handleSubmitValidation}
    // dynamicNumber={dynamicNumber}
    // setDynamicNumber={setDynamicNumber}
    // isLoading={isLoading}
    // userExists={userExists}
    // userDataValidation={userDataValidation}
    // isValid={isValid}
    // typeOfAccount={typeOfAccount}
    // refinedData={refinedData}
    // setRefinedData={setRefinedData}
    // relationData={relationData}
    // handleRowClick={handleRowClick}
    // // setRelationData={setRelationData}

    // // saveDataFromRelatioDetails={saveDataFromRelatioDetails}
    // // setSavedDataFromRelatioDetails={setSavedDataFromRelatioDetails}

    // // setApiData={setApiData}
    // // onClose={onClose}
    // // setShow={setShow}
    // // setShowNewUserForm={setShowNewUserForm}

    // handleProceed={handleProceed}
    // onCloseForRelationValidationForm={onCloseForRelationValidationForm}
    // handleFormSubmit={handleFormSubmit}
    // setFormData1={setFormData1}
    // formData1={formData1}
    // loading={loading}
    // showApiDataModal={showApiDataModal}
    // saveDataNewForm={saveDataNewForm}
    // showNewUserForm={showNewUserForm}
    // showNewUserFormFClose={showNewUserFormFClose}
    // showNewUserFormF={showNewUserFormF}
    // apiData={apiData}
    // toggleModal={toggleModal}
    // isOpenRelationDetails={isOpenRelationDetails}
    // show={show}
    //       />
    //       {/* <Director
    //         // formData={formData}
    //         relationData={relationData}
    //       /> */}
    //     </div>
    //   ),
    // },

    {
      value: "tab-4",
      label: "Mandate / Signatory",
      component: (
        <div>
          <Mandate
            data={allLovs}
            custType={custType}
            dataD={data}
            storedFormData={storedFormData}
            handleChangeDocs={handleChangeDocs}
            // randomNumberString={randomNumberString}
            ImageVerification={ImageVerification}
            relationData={relationData}
            randomNumberString={randomNumberString}
            arrayDocs={arrayDocs}
            acMandate={acMandate}
            handleAccountMandate={handleAccountMandate}
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
            // storedFormData={storedFormData}
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
            // relationData={relationData}
            handleRowClick={handleRowClick}
            // setRelationData={setRelationData}

            // saveDataFromRelatioDetails={saveDataFromRelatioDetails}
            // setSavedDataFromRelatioDetails={setSavedDataFromRelatioDetails}

            // setApiData={setApiData}
            // onClose={onClose}
            // setShow={setShow}
            // setShowNewUserForm={setShowNewUserForm}

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

            insertedData={ insertedData}


            handleChangeSelect={handleChangeSelect}
            handleApprovalLimitChange={handleApprovalLimitChange}
            handleCheckboxSignatory={handleCheckboxSignatory}
            selectedValue={selectedValue}
            approvalLimit={approvalLimit}
            checkboxValues={checkboxValues}
            handleSubmitSignatory={handleSubmitSignatory}
          />
        </div>
      ),
    },

    // {
    //   value: "tab-5",
    //   label: "Stakeholder Information",
    //   component: (
    //     <div>
    //       <Shares
    //       // nextOfKingData={nextOfKingData}
    //       // tableDataNok={tableDataNok}
    //       // allNextOfKingData={allNextOfKingData}
    //       // handleChangeNextOfKin={handleChangeNextOfKin}
    //       // handleSubmitNextOfKin={handleSubmitNextOfKin}
    //       // handleClearTable={handleClearTable}
    //       />
    //     </div>
    //   ),
    // },

    // {
    //   value: "tab-6",
    //   label: "Account Details",
    //   component: (
    //     <div>
    //       <Account_Details
    //         sector={sector}
    //         subSector={subSector}
    //         customerSegment={customerSegment}
    //         // customerSubSegment={customerSubSegment}
    //         accountDetailsData={accountDetailsData}
    //         setAccountDetailsData={setAccountDetailsData}
    //         accountTypes={accountTypes}
    //         setAccountTypes={setAccountTypes}
    //         data={allLovs}
    //         onChange={handleOnChange}
    //         custType={custType}
    //         handleCustTypeChange={handleCustTypeChange}
    //         handleRadioChangeMember={handleRadioChangeMember}
    //         // currencies={currencies}
    //       />
    //     </div>
    //   ),
    // },

    {
      value: "tab-7",
      label: "Documents",
      component: (
        <div>
          <Account_Mandate
            data={allLovs}
            custType={custType}
            dataD={data}
            storedFormData={storedFormData}
            handleChangeDocs={handleChangeDocs}
            // randomNumberString={randomNumberString}
            randomNumberString={randomNumberString}
            arrayDocs={arrayDocs}
            docsId={docsId}
          />
        </div>
      ),
    },

    {
      value: "tab-8",
      label: "Anti Money Laundering",
      component: (
        <div>
          <Anti_Money_Laundering
            sourceOfWealth={sourceOfWealth}
            sourceOfFund={sourceOfFund}
            transactionType={transactionType}
            data={allLovs}
            handleChange={handleChange}
            handleChangeAML={handleChangeAML}
            amlData={amlData}
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
  const [saveUpdate, setSaveUpdate] = useState(false);
  const [index, setIndex] = useState("");
  const [activeTab, setActiveTab] = useState(tabsData[0].value);

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

  function getDisplayOkValue(relationData, numRows, typeOfAccount) {
    if (relationData.length !== parseFloat(numRows) || typeOfAccount === "ID") {
      return "";
    } else {
      return "none";
    }
  }

  return (
    <div className="">
      <div>
        <hr />
        <div className="p-1">
        <ActionButtons
          createAccount={createAccount}
            handleFinalChange={handleFinalChange}
            onNewClick={handleClearNew}
            updateTypeOfC={updateTypeOfC}
            displayOk={
              relationData.length !== parseFloat(numRows) &&
              typeOfAccount === "JT"
                ? "none"
                : ""
            }
            // displayOk={relationData.length !== parseFloat(numRows) ? "none" : typeOfAccount === "ID"}
          />
          <hr />
          <div className="border p-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex mb-2">
                  <Label
                    label="Registered Name"
                    required={true}
                    fontSize="85%"
                  />
                  <input
                    type="text"
                    id="accountname"
                    className="w-[505px] rounded border-gray-400 border p-[2px]"
                    value={customername}
                    onChange={handleChangeCustomername}
                    autoComplete="off"
                  />
                </div>
                <div className="flex">
                  <Label
                    label="Company type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                    fontSize="85%"
                  />
                  <select
                    style={{ padding: "1px", height: "-5px" }}
                    className="W-[10px] border text-sm border-gray-400 rounded"
                    value={typeOfAccount}
                    onChange={handleChangeTypeOfAccount}
                  >
                    <option value="SP">SOLE PROPRIETORSHIP</option>
                    <option value="LC">LIMITED COMPANY</option>
                    <option value="PT">PARTINERSHIP</option>
                    <option value="CH">CHAMA</option>
                    <option value="NG">NGO</option>
                    <option value="OT">OTHERS</option>
                  </select>

                  {typeOfAccount === "OT" && (
                    <div class="md:flex md:items-center ml-8 -space-x-3 mb-2 ">
                      <div className="md:w-1/3 text-right">
                        <Label
                          label="Other&nbsp;Company&nbsp;"
                          fontSize="85%"
                        />
                      </div>
                      <div className="md:w-2/3 md:ml-[2px]">
                        <InputField
                          id="membership"
                          inputWidth={"100%"}
                          name="membership"
                          style={{ alignText: "center" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {typeOfAccount === "LC" ||
              typeOfAccount === "PT" ||
              typeOfAccount === "NG" ? (
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
                    // value={numRows}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setModalIsOpen(true);
                      }
                    }}
                    onChange={handleNumRowsChange}
                  />
                  {showPopup && (
                    <div className="bg-red-500 text-white p-1 mt-1 rounded-md">
                      {`Enter only ${numRows} relation(s)`}
                    </div>
                  )}
                </div>
              ) : null}

              <div>
                <div class="md:flex md:items-center space-x-15 mb-2">
                  <div className="md:w-1/3 text-right">
                    <Label label="Member&nbsp;ID" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 md:ml-[2px]">
                    <InputField
                      id="accountno"
                      inputWidth={"100%"}
                      name="accountno"
                      value={custmerNumber}
                      disabled
                      style={{ alignText: "center" }}
                    />
                  </div>
                </div>

                <div class="md:flex md:items-center space-x-15 mb-2 mr-15 ">
                  <button
                    className="border bg-red-500 px-5 text-white"
                    onClick={() => setModalIsOpen(true)}
                  >
                    Validate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        {apiMsg && <p className="text-red-500">{apiMsg}</p>}
      </div>

      <hr />

      {/* <div className="mt-4 mb-4">
     
        {relationData.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-green-700">
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
              {relationData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-sky-300"}
                  // onClick={() => handleRowClick(index)}
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.randomNumberString}</td>
                  <td>{data.P_fname}</td>
                  <td>{data.P_mname == "null" ? "" : data.P_mname}</td>
                  <td>{data.P_sname}</td>
                  <td className="text-center">{data.P_gender}</td>
                  <td>{data.P_dob}</td>
                  <td>{data.P_Mobile_comm_no}</td>
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
              ))}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div> */}

      <hr />
      <TabsComponent
        tabsData={tabsData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

export default MyTabs;
