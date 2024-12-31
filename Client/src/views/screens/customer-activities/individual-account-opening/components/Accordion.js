import React, { useState, useEffect } from "react";
import AccordionForms from "./AccordionForms";
import Individual_account_opening from "./individual-account-opening";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import Account_Details from "./account-details";
import Anti_Money_Laundering from "./anti-money-laundering";
import Personal_Details from "./personal-details";
import Occupation_other_details from "./occupation-other-details";
import Mode_Of_Communication from "./mode-of-communication";
import Next_Of_King from "./next-of-king";
import Label from "../../../../../components/others/Label/Label";
import Current_Address from "./current-address";
import InputField from "./comp/InputField";
import { Modal, Button } from "@mantine/core";

function AccordionUsable({
  handleBlurValidation,
  dynamicNumber,
  userDataValidation,
  isValid,
  typeOfAccount,
  setDynamicNumber,
  isLoading,
  userExists,
  refinedData,
  setRefinedData,
  handleSubmitValidation,
  setTableDataAddress,
  usedAddressTypes,
  setUsedAddressTypes,
  tableDataAddress,
  clearError,
  setErrorTest,
  displayValidData,
  closeModal,
  isModalOpen,
  handleCheckValueClick,
  message,
  errors,
  validateInput,
  handleNumRowsChange,
  effective,
  onclickOnrow,
  handleEdit,
  handleDelete,
  generateRandomNumberString,
  hideRadioButtons,
  selectedOptions,
  storedFormData,
  accountTypes,
  setAccountTypes,
  selectedOptionJoint,
  tableData,
  handleSubmit,
  formData,
  setFormData,
  handleChange,
  customerDataTable,
  customerData,
  response,
  error,

  saveData,

  saveDataNewForm,

  toggleModalClose,

  add_new_relation,
  handleInputChange,
  handleCheckboxChange,
  handleSubmitNewRelation,
  setAddNewRelation,
  handleRowSelect
}) {
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
  const [dataIntoLocalStorage, setDataIntoLocalStorage] = useState([]);
  const [opened, setOpened] = useState(false);

  const [occupation, setOccupation] = useState([]);

  const [language, setLanguage] = useState([]);

  const [selectTableData, setSelectTableData] = useState("");

  //  Anti Money Laundering
  const [sourceOfWealth, setSourceOfWealth] = useState([]);
  const [sourceOfFund, setSourceOfFund] = useState([]);
  const [transactionType, setTransactionType] = useState([]);

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

  const [accountDetailsData, setAccountDetailsData] = useState({
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
    //     .post(API_SERVER + "/api/get-customer-sub-segment-individual",{headers})
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
          setLanguage(response.data);
          // localStorage.setItem(
          //   "PreferrredLanguage",
          //   JSON.stringify(response.data)
          // );
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
            arr.push([...values, <input type="checkbox" className="border" />]);
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
            arr.push([...values, <input type="checkbox" className="border" />]);
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
      //getCustomerSubsegmentindividual(),
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
        console.log("getCurrencyAmount", results);
        // get currencies
        //  const getCurrencyAmount = results[0]?.data;
        //  localStorage.setItem(
        //    "getCurrencyAmount",
        //    JSON.stringify(getCurrencyAmount)
        //  );
        //  console.log("getCurrencyAmount", getCurrencyAmount);
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
      label: i.description,
    })
  );

  console.log("preferredLanguage::::", getPreferredLanguage);

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

    bankNames: async function (value) {
      console.log(value);
    },

    customerSegment_: async function (value) {
      // console.log(value,":::Customer Segment")
      const data = await axios.get(
        API_SERVER + "/api/get-customer-segment-individual",
        {
          segmentCode: value,
        },
        { headers }
      );
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
        console.log(arr, "::::Customer Segment");

        setAccountDetailsData((prevFormValues) => ({
          ...prevFormValues,
          customerSegment: value,
        }));
      }
    },

    customerSubSegment: async function (value) {
      console.log(value, "VVVVVVVVVVV");
      setAccountDetailsData((prevFormValues) => ({
        ...prevFormValues,
        customerSubSegment: value,
      }));
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
    },

    sector: async function (value) {
      console.log(value, "mmmmmSector");
      const data = await axios.post(
        API_SERVER + "/api/get-sub-sector",
        {
          sectorClassCode: value,
        },
        { headers }
      );
      if (data.data.length > 0) {
        const response = data.data;
        const arr = [];
        //  console.log(response, "Mannnn");
        response.map((i) => {
          arr.push({
            value: `${i.actual_code} - ${i.description}`,
            label: `${i.actual_code} - ${i.description}`,
          });
          // console.log(arr)
        });
        setSubSector(arr);
      }

      setAccountDetailsData((prevFormValues) => ({
        ...prevFormValues,
        sector: value,
      }));
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
          // console.log(arr)
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
    },

    currencies: async function (value) {
      console.log(value);
      setAccountDetailsData((prevFormValues) => ({
        ...prevFormValues,
        currencies: value,
      }));
    },

    documentRequiredType: async function (value) {
      console.log(value, "Decoment");
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

  // const handleSubmit = (event) => {
  //     event.preventDefault();

  //     const errors = {};
  //     let hasErrors = false;

  //     Object.entries(validationRules).forEach(([field, rules]) => {
  //       if (rules.required && !formValues[field]) {
  //         errors[field] = `${field} is required`;
  //         hasErrors = true;
  //       } else if (rules.pattern && !rules.pattern.test(formValues[field])) {
  //         errors[field] = `${field} is not valid`;
  //         hasErrors = true;
  //       }
  //     });

  //     if (hasErrors) {
  //       setFormErrors(errors);
  //     } else {
  //       setFormErrors({});
  //       setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     }
  //   };

  useEffect(() => {
    // Get Account Mandate
    const getAccountMandate = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "OCC",
          },
          { headers }
        )
        .then(function (response) {
          setOccupation(response.data);
        });
    };

    getAccountMandate();
  }, []);

  const [arrA, setArrA] = useState([]);
  const [saveUpdate, setSaveUpdate] = useState(false);
  const [index, setIndex] = useState("");

  const [checked, setChecked] = useState(true);

  // const datata = customerDataTable[0]

  const dataArray = customerDataTable;

  const tableRow = (row, rowIndex) => {
    setIndex(row[0]);
    setSaveUpdate(true);
  };

  const updateRow = () => {
    axios.post("http://10.203.14.195:3020/api/casa/act/create/rt").then();
  };

  // console.log("dataIntoLocalStorage Accordion:::",datata)

  const formatKey = (key) => {
    return key
      .replace(/^P_/, "") // Remove the 'P_' prefix
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  };

  // const getDescription = (value) => {
  //   const description = title.find((item) => item.value === value);
  //   return description ? description.label : value;
  // };
  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const maritalStatus = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorce", label: "Divorce" },
  ];

  const minorOpions = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const healthOpions = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const DirectorRelated = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const staffRelated = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const descriptionMappings = {
    P_title: title,
    P_gender: genderOptions,
    P_country: country,
    P_language: language,
    P_occupation: occupation,
    P_minor: minorOpions,
    P_marital: maritalStatus,
    P_health: healthOpions,
    P_director: DirectorRelated,
    P_staff: staffRelated,
  };

  const getDescription = (key, value) => {
    const mapping = descriptionMappings[key];
    if (mapping) {
      const description = mapping.find((item) => item.value === value);
      return description ? description.label : value;
    }
    return value;
  };

  const renderTable = (data) => {
    const entries = Object.entries(data);
    const tables = [];

    for (let i = 0; i < entries.length; i += 10) {
      const chunk = entries.slice(i, i + 10);
      tables.push(
        <table className="border-collapse border border-gray-400 m-2" key={i}>
          <thead>
            <tr>
              <th className="border border-gray-400 px-2 py-1">Field Names</th>
              <th className="border border-gray-400 px-2 py-1">Value</th>
            </tr>
          </thead>
          <tbody>
            {chunk.map(([key, value], index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-2 py-1">
                  {formatKey(key)}
                </td>
                <td className="border border-gray-400 px-2 py-1">
                  {getDescription(key, value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return tables;
  };

  return (
    <div className="App">
      {/* <div>
      {storedFormData.length > 0 ? (
        <table>
          <thead>
              <tr className="bg-green-700">
                <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Relation&nbsp;Number</th>
                <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>First&nbsp;Name</th>
                <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Middle&nbsp;Name</th>
                <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Surname</th>
                <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Gender</th>
                <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Date&nbsp;of&nbsp;Birth</th>
                
                <th className="p-1 font-bold text-sm text-white" style={{border:'1px solid white'}}>Phone&nbsp;Number</th>
              </tr>
          </thead>
          <tbody>
            {storedFormData.map((data, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-sky-300'}>
                <td className="text-center">123456</td>
                <td>{data.P_fname}</td>
                <td>{data.P_mname}</td>
                <td>{data.P_sname}</td>
                <td className="text-center">{data.P_gender}</td>
                <td>{data.P_dob}</td>
                <td>{data.P_Mobile_comm_no}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p></p>
      )}

      </div> */}
      <AccordionForms title="Member Bio Data" isInitiallyExpanded={true}>
        <Personal_Details
          validationRules={validationRules}
          formData={formData}
          setFormData={setFormData}
          formValues={formValues}
          activeStep={activeStep}
          handleChange={handleChange}
          setActiveStep={setActiveStep}
          setFormValues={setFormValues}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          handleSubmit={handleSubmit}
          data={JSON.stringify(allLovs)}
          setChecked={setChecked}
          selectedOptions={selectedOptions}
          hideRadioButtons={hideRadioButtons}
          errors={errors}
          setErrorTest={setErrorTest}
          clearError={clearError}
          saveData={saveData}
          // saveDataFromRelatioDetails={saveDataFromRelatioDetails}

          saveDataNewForm={saveDataNewForm}
          // getPreferredLanguage={getPreferredLanguage}
          add_new_relation={add_new_relation}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmitNewRelation={handleSubmitNewRelation}

          setAddNewRelation={setAddNewRelation}
        />
      </AccordionForms>
      <AccordionForms title="Identification Details">
        <Occupation_other_details
          validationRules={validationRules}
          formValues={formValues}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setFormValues={setFormValues}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          handleSubmit={handleSubmit}
          data={allLovs}
          //  getPreferredLanguage={getPreferredLanguage}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          message={message}
          handleCheckValueClick={handleCheckValueClick}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          displayValidData={displayValidData}
          handleBlurValidation={handleBlurValidation}
          handleSubmitValidation={handleSubmitValidation}
          dynamicNumber={dynamicNumber}
          setDynamicNumber={setDynamicNumber}
          isLoading={isLoading}
          userExists={userExists}
          userDataValidation={userDataValidation}
          isValid={isValid}
          typeOfAccount={typeOfAccount}
          saveDataNewForm={saveDataNewForm}

          

          add_new_relation={add_new_relation}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmitNewRelation={handleSubmitNewRelation}

          setAddNewRelation={setAddNewRelation}
        />
      </AccordionForms>
      <AccordionForms title="E - Service">
        <Mode_Of_Communication
          validationRules={validationRules}
          formValues={formValues}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setFormValues={setFormValues}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          handleSubmit={handleSubmit}
          data={allLovs}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
          handleBlurValidation={handleBlurValidation}
          isModalOpen={isModalOpen}
          dynamicNumber={dynamicNumber}
          setDynamicNumber={setDynamicNumber}
          isLoading={isLoading}
          userExists={userExists}
          userDataValidation={userDataValidation}
          saveDataNewForm={saveDataNewForm}



          add_new_relation={add_new_relation}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmitNewRelation={handleSubmitNewRelation}
          setAddNewRelation={setAddNewRelation}
        />
      </AccordionForms>

      {/* <AccordionForms title="Next Of Kin">
        <Next_Of_King
             validationRules={validationRules} 
             formValues={formValues}
             activeStep={activeStep}
             setActiveStep={setActiveStep}
             setFormValues={setFormValues} 
             formErrors={formErrors} 
             setFormErrors={setFormErrors} 
             handleSubmit={handleSubmit} 
             data={allLovs} 

             formData={formData}
             setFormData={setFormData}
             handleChange={handleChange}
        />
      </AccordionForms> */}

      <AccordionForms title="Address">
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
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          setTableDataAddress={setTableDataAddress}
          tableDataAddress={tableDataAddress}
          usedAddressTypes={usedAddressTypes}
          setUsedAddressTypes={setUsedAddressTypes}
          refinedData={refinedData}
          setRefinedData={setRefinedData}
          setAddNewRelation={setAddNewRelation}
          add_new_relation={add_new_relation}
        />
      </AccordionForms>

      {/* <div class="w-full max-w-xl mt-2">
        <div>
          <div class="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3">
              <Label label="Comment" />
            </div>
            <div className="md:w-2/3 md:mr-2">
              <InputField inputWidth={'100%'} />
            
            </div>
          </div>

          
        </div>
      </div> */}

      {!onclickOnrow ? (
        <div
          className={`flex justify-center mr-2 mb-2 mt-2 ${
            onclickOnrow ? "hidden" : "Save"
          } `}
        >
          <div
            className="border p-2 rounded-lg bg-green-700 text-white cursor-pointer"
            // onClick={(e)=>saveUpdate ? updateRow() : handleSubmit(e)}
            // onClick={(e) => {
            //   // generateRandomNumberString();
            //   handleSubmit(e);
            //   // setOpened(true);
            // }}
            onClick={handleSubmitNewRelation}
          >
            Save Relation Details
          </div>
        </div>
      ) : (
        <div className="flex justify-end mr-2 mb-2 mt-2">
          <div
            className="border p-2 rounded-lg bg-green-700 text-white cursor-pointer"
            // onClick={(e)=>saveUpdate ? updateRow() : handleSubmit(e)}
            onClick={handleEdit}
          >
            Edit
          </div>
        </div>
      )}
      {/* <table className="min-w-full divide-y divide-gray-200">
         
          <thead className="bg-sky-700" 
          style={{zoom:"0.85"}}
            
  
              >
              <tr className='text-center'>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  Relation No
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  First Name
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  Surname
                  </th>

                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  Middle Name 
                  </th>
                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  Gender
                  </th>

                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  Date Of Birth
                  </th>

                  <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                  style={{borderRight: '1px solid #ddd'}}
                  >
                  Phone Number
                  </th>

            
              </tr> 
          </thead>
        <tbody className="bg-gray-200">
         
            {Array.isArray(dataArray) && dataArray.length > 0 ? (
              dataArray.map((row, rowIndex) => (
                <tr key={rowIndex} onClick={() => tableRow(row, rowIndex)}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={cellIndex === 0 || cellIndex === 4 || cellIndex === 5 || cellIndex === 6 ? 'text-center' : ''}>
                      {cellIndex === 5 ? new Date(cell).toLocaleDateString() : cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className=''>
                <td colSpan="7" className="text-center">No data available</td>
              </tr>
            )}
        </tbody>
      </table> */}

      {/* <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Data"
      >
       
        <div className="mb-4">
          <p className="font-bold mb-2">Type of Account: <span className="font-normal">{typeOfAccount}</span></p>
          {typeOfAccount === 'OT' && (
            <p className="font-bold mb-2">Other Account Type: <span className="font-normal">{otherAccountType}</span></p>
          )}
          <div className="space-y-2">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-bold">{key}:</span>
                <span className="font-normal">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            color="gray"
            onClick={() => setOpened(false)}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button
          // onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Modal> */}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirm Data"
        size="100%"
      >
        {/* <div className="flex flex-wrap">
          {renderTable(formData)}
        </div> */}
        <div className="grid grid-cols-2 gap-4">{renderTable(formData)}</div>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            color="gray"
            onClick={() => setOpened(false)}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            //onClick={handleSave}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default AccordionUsable;
