import React, { useState, useEffect } from "react";
import axios from "axios";
import InputField from "./components/InputField";
import Button from "./components/Button";
import Table from "./components/Table";
import CustomModal from "./components/Modal";
import { Modal } from "@mantine/core";
import ListOfValue from "./components/ListOfValue";
import Member_bio_data from "./data_amendment_forms/bio_data/member_bio_data";
import Identification_details from "./data_amendment_forms/bio_data/identification_details";
import E_services from "./data_amendment_forms/bio_data/e_services";
import Address from "./data_amendment_forms/address_data/address";
import { API_BASE_URL, HEADERS } from "./header_keys";
import Disable_form from "./data_amendment_forms/disable_form/disable_form";
import Account from "./data_amendment_forms/account/account";
import CustomerInfo from "./data_amendment_forms/customer/customer";
import Swal from "sweetalert2";
import Mandate from "./data_amendment_forms/account/mandate";
import ButtonComponent from "../../lending/components/button/ButtonComponent";
import { Skeleton } from "antd";
import Hobby from "./data_amendment_forms/hobby/hobby";
import Corperate from "./data_amendment_forms/corperate/Corperate";

// import { API_SERVER } from "../../../../config/constant";

const StaticAmendment = () => {
  const [opened, setOpened] = useState(false);
  const [openedSecond, setOpenedSecond] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [showBioData, setShowBioData] = useState("");

  const [eServiceResponse, setEserviceResponse] = useState("");

  const [fetchaddress, setFetchaddress] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [customer, setCustomer] = useState(null);

  const [customerNumber, setCustomerNumber] = useState("");

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [sector, setSector] = useState(false);

  const [relationNo, setRelationNo] = useState("");

  const [afterClickEdit, setAfterClickEdit] = useState(false);

  // Function to fetch customer data based on the input
  const fetchCustomer = async () => {
    setLoading(true);
    setError(null);
    setCustomer(null); // Reset previous customer data before fetching new data
    
    try {
      const response = await axios.get(
        `http://10.203.14.195:3320/api/customer/${customerNumber}`,
        {
          headers: HEADERS,
          // Add cache busting parameter to prevent caching
          params: {
            _t: new Date().getTime()
          }
        }
      );
      
      if (response.data) {
        setCustomer(response.data);
        console.log("response", response.data);
        
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Customer data retrieved successfully',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        throw new Error("No customer data found");
      }
    } catch (err) {
      console.error("Error fetching customer:", err);
      setError("Customer not found or error fetching customer data.");
      setCustomer(null);

      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || "Customer not found or error fetching customer data.",
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  console.log("setCustomer", customer, customerNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customerNumber) {
      fetchCustomer();
    } else {
      setError("Please enter a customer number.");
    }
  };

  useEffect(() => {
    // Fetch relation data only when customerNumber is provided
    if (customerNumber) {
      const fetchRelationData = async () => {
        const data = JSON.stringify({
          customer_number: customerNumber,
        });

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://10.203.14.195:3320/api/relation/relation_no",
          headers: {
            "x-api-key":
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "Content-Type": "application/json",
          },
          data: data,
        };

        try {
          const response = await axios.request(config);
          setRelationNo(response.data); // Set relation data in state
        } catch (error) {
          console.error("Error fetching relation data:", error);
          setError("Failed to fetch relation data");
        }
      };

      fetchRelationData();
    }
  }, [customerNumber]);

  console.log(searchResults, "searchResults", searchQuery);

  const handleOpen = () => setOpened(true);
  // const handleClose = () => setOpened(false);

  const handleRowClick = async (relationNo) => {
    // Create the data payload with the selected relationNo
    const data = JSON.stringify({ relationNo });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${API_BASE_URL}/api/get-eservices-data`,
      headers: HEADERS,
      data: data,
    };

    try {
      // Make the Axios request with the relationNo
      const response = await axios.request(config);
      console.log(response.data); // Log the response
      setEserviceResponse(response.data); // Set response data to state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("fetchaddress", fetchaddress);

  const AmendData = [
    { value: "001", label: "001 - Bio data" },
    { value: "002", label: "002 - Customer details" },
    { value: "003", label: "003 - Account data" },
    { value: "004", label: "004 - Mandate" },
    { value: "005", label: "005 - Address data" },
    { value: "006", label: "006 - E-Services " },
    { value: "007", label: "007 - Amend Hobby" },
    { value: "008", label: "008 - Corperate data" },
  ];

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [customerData, setCustomerData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    // Fetch data automatically when customer_number is available or changes
    const fetchData = async () => {
      if (!customerNumber) return; // Don't fetch if customer_number is empty

      let data = JSON.stringify({
        customer_number: customerNumber,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://10.203.14.195:3320/api/relation/relation_data",
        headers: HEADERS,
        data: data,
      };

      try {
        const response = await axios.request(config);
        setCustomerData(response.data); // Set response data to state
        setOriginalData(response.data); // Save the original data for comparison
        // setEditData(response.data[0]);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message); // Set error message to state
        setCustomerData(null); // Clear previous data
      }
    };

    fetchData();
  }, [customerNumber]);

  console.log("Customer details", customerData);

  // The function to fetch customer data based on the customer number
  const editTable = async (relation_no) => {
    if (!relation_no) return; // Don't fetch if customer_number is empty

    let data = JSON.stringify({
      relation_no: relation_no,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://10.203.14.195:3320/api/relation/get_all_relation_datails",
      headers: HEADERS,
      data: data,
    };

    try {
      const response = await axios.request(config);
      // setCustomerData(response.data); // Set response data to state
      // setOriginalData(response.data); // Save the original data for comparison
      setEditData(response.data);
      setAfterClickEdit(true);
      console.log("editData", response);
      setAfterClickEdit(true);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message); // Set error message to state
      setCustomerData(null); // Clear previous data
    }
  };

  // console.log("editData", editData)

  useEffect(() => {
    const toggleModal = async () => {
      try {
        const response = await axios.post(
          API_BASE_URL + "/api/member-amendment",
          {
            customer_number: customerNumber,
            amendment_approval: "true",
          },
          {
            headers: HEADERS, // Pass headers here
          }
        );

        const mess = response.data[0].message;
        const errorMess = response?.data[0]?.message.split("*")[1];

        if (response.data.length > 0) {
          if (mess?.includes("Y")) {
            Swal.fire({
              text: errorMess,
              icon: "error",
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                return true;
              }
            });
          } else {
            // Handle success case
            // setCustomerDetails(details);
            // setShowModal(!showModal);
          }
        }
      } catch (err) {
        console.log(`here: ${err}`);
      }
    };

    toggleModal();
  }, [customerNumber]);


  const [addressData, setAddressData] = useState([]);

  useEffect(() => {
    // Fetch data automatically when customer_number is available or changes
    const fetchData = async () => {
      if (!customerNumber) return; // Don't fetch if customer_number is empty

      let data = JSON.stringify({
        customer_number: customerNumber,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://10.203.14.195:3320/api/address/address_data",
        headers: HEADERS,
        data: data,
      };

      try {
        const response = await axios.request(config);
        setAddressData(response.data); // Set response data to state
        // setOriginalData(response.data); // Save the original data for comparison
        // setEditData(response.data[0]);
        console.log("customer data", response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message); // Set error message to state
        // setCustomerData(null);  // Clear previous data
      }
    };

    fetchData();
  }, [customerNumber]);

  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    // Fetch data automatically when customer_number is available or changes
    const fetchData = async () => {
      if (!customerNumber) return; // Don't fetch if customer_number is empty

      let data = JSON.stringify({
        customer_number: customerNumber,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://10.203.14.195:3320/api/account/account_data",
        headers: HEADERS,
        data: data,
      };

      try {
        const response = await axios.request(config);
        setAccountData(response.data); // Set response data to state
        // setOriginalData(response.data); // Save the original data for comparison
        // setEditData(response.data[0]);
        console.log("customer data", response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message); // Set error message to state
        // setCustomerData(null);  // Clear previous data
      }
    };

    fetchData();
  }, [customerNumber]);

  console.log("editData...", editData);

  console.log("accountData", accountData);

  console.log("addressData", addressData);

  const [responseData, setResponseData] = useState(null);

  const handleAmendRelation = async () => {
    // Get user info from localStorage and parse JSON
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const username = userInfo?.id || 'admin'; // Fallback to 'admin' if not found

    // Handle editData as array - map each item to API request format
    const requests = editData.map(item => ({
      customerNo: item?.CUSTOMER_NUMBER || "",
      rel: item?.RELATION_NO || "",
      bra: item?.BRANCH || "",
      postingDate: new Date().toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-'), // Format: dd-mmm-yyyy
      username: username,
      hostname: "HOST001",
      lastName: item?.LAST_NAME || "",
      surname: item?.SURNAME || "", 
      firstName: item?.FIRST_NAME || "",
      gender: item?.GENDER || "",
      mobile1: item?.MOBILE_1 || "",
      placeOfBirth: item?.PLACE_OF_BIRTH || "",
      emailAddress: item?.EMAIL || "",
      domicileCountry: item?.DOMICILE_COUNTRY || "",
      residenceCountry: item?.RESIDENCE_COUNTRY || "",
      nationality: item?.NATIONALITY || "",
      consolidatedStatement: item?.CONSOLIDATED_STATEMENT || "Y",
      constitutionalCode: item?.CONSTITUTIONAL_CODE || "",
      residentialAddress: item?.RESIDENTIAL_ADDRESS || "",
      aliasName: item?.ALIAS_NAME || "",
      title: item?.TITLE || "",
      suffix: item?.SUFFIX || "",
      dateOfBirth: new Date().toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-'),//item?.DATE_OF_BIRTH || "",
      residenceStatus: item?.RESIDENCE_STATUS || "",
      idType: item?.ID_TYPE || "",
      idNumber: item?.ID_NUMBER || "",
      idIssueDate: item?.ID_ISSUE_DATE || "",
      idIssuedAt: item?.ID_ISSUED_AT || "",
      idExpiryDate: item?.ID_EXPIRY_DATE || "",
      tin: item?.TIN || "",
      idIssuedAuthority: item?.ID_ISSUED_AUTHORITY || "",
      templateId: item?.TEMPLATE_ID || "",
      nin: item?.NIN || "",
      ninExpiryDate: item?.NIN_EXPIRY_DATE || "",
      maritalStatus: item?.MARITAL_STATUS || "",
      mothersFname: item?.MOTHERS_FNAME || "",
      mothersMiName: item?.MOTHERS_MNAME || "",
      mothersMaName: item?.MOTHERS_LNAME || "",
      nextOfKin: item?.NEXT_OF_KIN || "",
      nextOfKinAddress: item?.NEXT_OF_KIN_ADDRESS || "",
      nextOfKinPhone: item?.NEXT_OF_KIN_PHONE || "",
      qualification: item?.QUALIFICATION || "",
      natureOfWork: item?.NATURE_OF_WORK || "",
      preferredAtmLang: item?.PREFERRED_ATM_LANG || "",
      preferredPhoneLang: item?.PREFERRED_PHONE_LANG || "",
      numberOfCars: item?.NUMBER_OF_CARS || 0,
      numberOfDependents: item?.NUMBER_OF_DEPENDENTS || 0
    }));

    console.log("Edit Data", requests);

    try {
      // Make API requests for each item in editData array
      const responses = await Promise.all(
        requests.map(data => {
          const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://10.203.14.195:3320/api/amend-relation",
            headers: {
              "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
              "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
          };
          return axios.request(config);
        })
      );

      setResponseData(responses.map(r => r.data));
      
      // Show success message
      Swal.fire({
        title: "Success!",
        text: "Relations amended successfully",
        icon: "success",
      });
    } catch (err) {
      setError(err.message);
      // Show error message 
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
      });
    }
  };

  console.log("responseData", responseData)

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const [customerDataFields, setCustomerDataFields] = useState([])

const [searchText, setSearchText] = useState('');
  const [searchCustomerResults, setSearchCustomerResults] = useState([]);
  
const handleSearch = async (e) => {
  if (e.key === 'Enter') {
    setLoading(true);
    setError(null); // Clear previous errors
    const data = JSON.stringify({ searchText });
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://10.203.14.195:3320/api/customer/get-customer-details',
      headers: { 
        'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      setSearchCustomerResults(response.data); // Update search results with the fetched data
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }
};

console.log("searchCustomerResults", searchCustomerResults)

const handleCustomerSelection = (customer) => {
  setCustomerDataFields(customer);
};

  {
    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////RENDER FORM COMPONENTS/////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  }

  const renderForm = () => {
    switch (selectedOption) {
      case "001":
        return (
          <Member_bio_data
            showBioData={showBioData}
            customerData={customerData}
            editData={editData}
            setEditData={setEditData}
            // handleEdit={handleEdit}
            originalData={originalData}
            afterClickEdit={afterClickEdit}
            showPreviewModal={showPreviewModal}
            setShowPreviewModal={setShowPreviewModal}
            editTable={editTable}
            setAfterClickEdit={setAfterClickEdit}

            handleAmendRelation={handleAmendRelation}
          />
        );
      case "002":
        return (
          <CustomerInfo
            sector={sector}
            customerNumber={customerNumber}
            customer={customer}
            customerDataFields={customerDataFields}
          />
        );
      // return <Identification_details showBioData={showBioData} />;
      case "003":
        return (
          <Account accountData={accountData} customerNumber={customerNumber} />
        );

      case "004":
        return <Mandate customerNumber={customerNumber} />;
      case "005":
        return (
          <Address
            fetchaddress={fetchaddress}
            addressData={addressData}
            customerData={customerData}
            editTable={editTable}
          />
        );
      case "006":
        return <E_services eServiceResponse={eServiceResponse} />;

        case "007":
        return <Hobby/>;

        case "008":
        return <Corperate/>;

      default:
        return null;
    }
  };
  {
    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////END RENDER FORM COMPONENTS/////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
  }

  const handleAction = () => {
    console.log("Action button clicked!");
    handleClose();
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setOpenedSecond(true); // Open the modal when an option is selected
  };

  const handleClose = () => {
    setOpened(false);
    setSelectedOption(""); // Optional: Reset the selection on close
  };

  const headers = [
    "CUSTOMERNO",
    "CUSTOMER NAME",
    "PHONE NUMBER",
    "TYPE OF CUSTOMER",
  ];

  const showPreview = () => {
    setShowPreviewModal(true);
  };

  const [custNoDetails, setCustNoDetails] = useState(false);

  const handleCloseCust = () => {
    setCustNoDetails(false);
  };

  return (
    <div>
      <Modal
        // title={<span className="uppercase font-semibold">Preview Changes</span>}
        size="60%"
        opened={custNoDetails}
        withCloseButton={false}
        // onClose={() => {
        //   setCustNoDetails(false);
        // }}
        style={{ zoom: "0.80" }}
      >
        <div>
          <div
            style={{
              backgroundColor: "#0580c0",
            }}
            className=" w-full  shadow"
          >
            <div className=" flex justify-between py-[6px] px-2 items-center">
              <div className="text-white font-semibold">SEARCH CUSTOMER</div>

              <svg
                onClick={handleCloseCust}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                // style={{ padding: "10px" }}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer fill-cyan-500 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          {/* <hr style={{ marginTop: "-10%" }} /> */}
        </div>

        <div className="bg-gray-200 rounded-b ">
          <div className="bg-white shadow rounded px-2 pt-1 pb-8   ">
            <div className="rounded p-2 space-y-2 border-2 mb-3 ">
              <div>
                Find a partial value to limit the list , %% to see all values
              </div>
              <div className="border-l-4 border-yellow-500 rounded leading-6  px-3 py-2 bg-yellow-50">
                <span className="font-semibold flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <div>Warning</div>
                </span>{" "}
                Entering % to see all values may take a very long time <br />
                Entering criteria that can be used to reduce the list may be
                significantly faster
              </div>
            </div>
            <div className="">
              <div className="mb-3 flex items-center">
                <InputField
                  label={"Search Customer"}
                  labelWidth={"10%"}
                  inputWidth={"70%"}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  onKeyDown={handleSearch}
                 
                />
                <ButtonComponent
                  label={"Find"}
                  // onClick={handleFind}
                  buttonWidth={"15%"}
                  buttonHeight={"30px"}
                />
              </div>
              <div style={{ maxHeight: "400px", overflow: "auto" }} className>
              

                <table className="w-full text-[90%]  bg-white rounded-sm   even:bg-gray-100  border-spacing-2 border border-gray-400">
                  <thead>
                    <tr
                      className="py-1 uppercase font-semibold text-gray-100  "
                    
                      style={{
                        backgroundColor: "#0580c0",
                      }}
                    >
                      <th className=" px-2 py-2 border border-gray-400">
                        Customer Number
                      </th>
                      <th className=" px-2 py-2 border border-gray-400">
                        Customer Name
                      </th>
                      <th className=" px-2 py-2 border border-gray-400">
                        Sector
                      </th>
                      <th className=" px-2 py-2 border w-32 border-gray-400">
                        Sub Sector
                      </th>
                      <th className=" px-2 py-2 border w-32 border-gray-400">
                        Phone&nbsp;Number
                      </th>
                      <th className=" px-2 py-2 border border-gray-400">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                  {searchCustomerResults.map((customer, index) => (
                    <tr
                   
                  >
                    <td
                      // style={{
                      //   background: getTheme.theme.navBarColor,
                      // }}
                      className="   capitalize px-2 py-1"
                    >
                      {customer?.CUSTOMER_NUMBER}
                    </td>
                    <td
                      // style={{
                      //   background: getTheme.theme.navBarColor,
                      // }}
                      className="   capitalize px-2 py-1"
                    >
                      {customer?.CUSTOMER_NAME}
                    </td>
                    <td className="    px-2 py-1">
                      {customer?.SECTOR}
                    </td>
                    <td className="    px-2 py-1">
                      {customer?.SUB_SECTOR }
                    </td>
                    <td className="    px-2 py-1">
                      {customer?.PHONE1 }
                    </td>
                    <td onClick={handleCustomerSelection(customer)} className="    px-2 py-1">
                      Edit
                    </td>
                  </tr>
                  ))}
                  
                  
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div>
        <div className="flex items-center justify-center mt-2 mb-10">
          <div className="relative border-2 border-blue-400 w-[70%] p-4 rounded-md">
            <h3 className="absolute -top-4 left-4 bg-white px-2 text-sm font-semibold text-blue-400">
              Customer Search
            </h3>
            <div>
              <div className="flex items-center justify-center space-x-4 mb-5">
                <form onSubmit={handleSubmit}>
                  <InputField
                    type="text"
                    placeholder="Search customer"
                    label="Customer No. / Account No"
                    inputWidth="300px"
                    value={customerNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(e);
                      }
                    }}
                  />
                </form>
                <div>
                  <Button
                    onClick={() => setCustNoDetails(true)}
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Search"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <hr className="mb-5" /> */}

        <div className="flex items-center justify-center mt-5">
          <div className="relative border-2 border-blue-400 w-[70%] p-4 bg-gray-50 rounded-md">
            <h3 className="absolute -top-4 left-4 bg-white px-2 text-sm font-semibold text-blue-400">
              Customer Details
            </h3>
            <Disable_form customer={customer} />
          </div>
        </div>

        {/* <hr className="mb-5 mt-5" />

        <hr className="mb-5 mt-5" /> */}

        <div className="flex items-center justify-center mt-10">
          <div className="relative border-2 border-blue-400 w-[70%] p-4 rounded-md">
            <h3 className="absolute -top-4 left-4 bg-white px-2 text-sm font-semibold text-blue-400">
              Amendment Category
            </h3>
            <div className="">
              <ListOfValue
                label="Amend Category Selection"
                inputWidth="300px"
                data={AmendData}
                onChange={handleSelectChange}
              />
            </div>
          </div>
        </div>

        <hr className="mb-5 mt-5" />
      </div>



      {/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////FORM DESIGN MODAL//////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
      <CustomModal
        opened={openedSecond}
        // actionButtonLabel="Amend Data"
        // previewchange="Preview changes"
        withCloseButton={false}
        preview={showPreview}
        onAction={handleAction}
        headerDescription={
          AmendData.find((item) => item.value === selectedOption)?.label ||
          "No selection"
        }
        handleClose={() => {
          setOpenedSecond(false);
          setEditData(false);
        }}
        size="70%"
        style={{ zoom: "0.80" }}
      >
        {renderForm()}
        
      </CustomModal>

      {/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////FORM DESIGN MODAL//////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
    </div>
  );
};

export default StaticAmendment;
