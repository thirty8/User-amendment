import React, { useEffect, useState } from "react";
import { Portal, Modal, Button, Footer } from "@mantine/core";
import InputField from "../../individual-account-opening/components/comp/InputField";
import Label from "../../../../../components/others/Label/Label";
import ListOfValue from "../../individual-account-opening/components/comp/ListOfValue";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { formatDate } from "../helpers/date_formater";
import swal from "sweetalert";

const CustomHeader = () => {
  return (
    <div
      style={{
        backgroundColor: "lightblue", // Set your desired header background color
        padding: "10px", // Optional: add padding for aesthetics
        width: "100%", // Ensures it covers the full width
        boxSizing: "border-box", // Ensures padding is included in the width calculation
      }}
    >
      <h2 style={{ margin: 0 }}>Add Address</h2>
    </div>
  );
};

const Address = ({
  setTableDataAddress,
  tableDataAddress,
  usedAddressTypes,
  setUsedAddressTypes,
  refinedData,
  setRefinedData,
  setAddNewRelation,
  add_new_relation,
}) => {
  const ownerOfPro = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressType, setAddressType] = useState("");
  const [houseType, setHouseType] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const [country, setCountry] = useState();
  const [county, setCounty] = useState();
  const [subCounty, setSubCounty] = useState([]);
  const [ward, setWard] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
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

    getCountry();
  }, []);

  useEffect(() => {
    const getCounty = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "CUN",
            //   key:'twene'
          },
          { headers }
        )
        .then(function (response) {
          setCounty(response.data);
        });
    };

    getCounty();
  }, []);
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      p_addressType: "",
      p_houseType: "",
      p_house_no: "",
      p_POBoxNo: "",
      p_Stayed_since: "",
      p_Stayed_To: "",
      p_Owner_of_Property: "",
      p_Sub_county: "",
      p_county: "",
    });
    setEditingIndex(null);
  };

  // State to manage form inputs
  const [formData, setFormData] = useState({
    p_addressType: "",
    p_houseType: "",
    p_county: "",
    p_house_no: "",
    p_Sub_county: "",
    subCounty: "",
    p_POBoxNo: "",
    p_Stayed_since: "",
    p_Stayed_To: "",
    p_Owner_of_Property: "",
  });

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate();
  //   const monthIndex = date.getMonth();
  //   const year = date.getFullYear();

  //   // Define month names in the MMM format
  //   const monthNames = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   // Format the date as DD-MMM-YYYY
  //   return `${day}-${monthNames[monthIndex]}-${year}`;
  // };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      const updatedData = tableDataAddress.map((item, index) =>
        index === editingIndex ? formData : item
      );
      setTableDataAddress(updatedData);
    } else {
      setTableDataAddress([...tableDataAddress, formData]);
    }
    closeModal();
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    // setFormData(tableDataAddress[index]);
    setFormData({ ...tableDataAddress[index] });
    openModal();
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this address?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = tableDataAddress.filter((_, i) => i !== index);
        setTableDataAddress(updatedData);
        Swal.fire("Deleted!", "Your address has been deleted.", "success");
      }
    });
  };

  const availableAddressTypes = Array.isArray(addressType)
    ? addressType.filter((type) => !usedAddressTypes.includes(type.code))
    : [];

  useEffect(() => {
    // Relationship
    const getAddressType = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "ADD",
            key: "twene",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("title", JSON.stringify(response.data));
          setAddressType(response.data);
          console.log("setAddressType::", response.data);
        });
    };

    getAddressType();
  }, []);

  useEffect(() => {
    // Relationship
    const getHouseType = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "HOT",
            key: "twene",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("title", JSON.stringify(response.data));
          setHouseType(response.data);
        });
    };
    getHouseType();
  }, []);

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  // State for selected address being edited
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Open modal and set the selected address for editing

  const initialAddressState = {
    PO_ADDRESS1: "", //PO BOX
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
    APPROVAL_FLAG: "",
    POSTED_BY: "",
    POSTING_TERMINAL: "",
    APPROVED_BY: "",
    BRANCH_CODE: "",
    SRL_NO: "",
    E_MAIL: "",
    ADDRESS_ID: "",
    KYC_FLAG: "",
    RENT_PER_ANNUAL: "",
    STAYED_TO: "",
    OWNER_OF_PROPERTY: "N",
    ADDRESS_TYPE: "",
    POSTING_SYS_DATE: "",
    POSTING_SYS_TIME: "",
  };

  // const handleInputChange = (field, value) => {
  //   setAddNewRelation((prevState) => {
  //     const newAddressData = [...prevState.addressData];

  //     // Ensure the currentAddress object exists before modifying it
  //     if (!newAddressData[0]) {
  //       newAddressData[0] = { ...initialAddressState }; // Initialize the first item if it's missing
  //     }

  //     newAddressData[0][field] = value;

  //     return { ...prevState, addressData: newAddressData };
  //   });

  //   // Update the currentAddress state to reflect the addressData change
  //   setCurrentAddress((prevState) => ({
  //     ...prevState,
  //     [field]: value,
  //   }));
  // };

  const handleInputChange = (field, value) => {
    // Update addressData state
    setAddNewRelation((prevState) => {
      const newAddressData = [...prevState.addressData];

      // Ensure the currentAddress object exists before modifying it
      if (!newAddressData[0]) {
        newAddressData[0] = { ...initialAddressState }; // Initialize the first item if it's missing
      }

      newAddressData[0][field] = value; // Update the specific field with the new value

      return { ...prevState, addressData: newAddressData }; // Return updated state
    });

    // Update the currentAddress state to reflect the addressData change
    setCurrentAddress((prevState) => ({
      ...prevState,
      [field]: value, // Set the specific field in the currentAddress
    }));
  };

  const [currentAddress, setCurrentAddress] = useState(initialAddressState);
  const [selectedAddressTypes, setSelectedAddressTypes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setCurrentAddress({ ...currentAddress, [name]: value });
  };

  const [submittedAddressData, setSubmittedAddressData] = useState([]);
  const [submittedAddressDataView, setSubmittedAddressDataView] = useState([]);

  // const handleAddAddress = () => {
  //   // Ensure currentAddress is valid before adding
  //   if (currentAddress) {
  //     setAddNewRelation((prev) => {
  //       const addressValue = currentAddress.ADDRESS_TYPE.split(" - ")[0];
  //       const addressHouseType = currentAddress.HOUSE_TYPE.split(" - ")[0];

  //       // Only append the current address once, without duplicates
  //       const updatedAddressData = [
  //         ...prev.addressData, // Keep existing data
  //         {
  //           ...currentAddress,
  //           ADDRESS_TYPE: addressValue, // Apply transformations
  //           HOUSE_TYPE: addressHouseType,
  //         },
  //       ];

  //       console.log("Updated addressData:", updatedAddressData, addressValue); // Log here

  //       setSubmittedAddressData(updatedAddressData);
  //       setSubmittedAddressDataView(updatedAddressData); // Use the same data for both view and submission
  //       return {
  //         ...prev,
  //         addressData: updatedAddressData,
  //       };
  //     });

  //     setCurrentAddress(initialAddressState); // Reset after adding
  //     setIsModalOpen(false);
  //   }
  // };

  // Function to handle updating an address

  const handleAddAddress = () => {
    // Ensure currentAddress contains valid data before proceeding
    if (
      currentAddress &&
      currentAddress.ADDRESS_TYPE &&
      currentAddress.HOUSE_TYPE
    ) {
      setAddNewRelation((prev) => {
        const updatedAddressData = [...prev.addressData, { ...currentAddress }];

        // Add the selected address type to the list of saved address types
        setSelectedAddressTypes((prevSelected) => [
          ...prevSelected,
          currentAddress.ADDRESS_TYPE,
        ]);

        // Update the submitted data state
        // setSubmittedAddressData(updatedAddressData);
        setSubmittedAddressDataView(updatedAddressData);

        return { ...prev, addressData: updatedAddressData };
      });

      // Reset after adding
      setCurrentAddress(initialAddressState);
      setIsModalOpen(false);
    } else {
      console.log("Current address is incomplete or invalid.");
    }
  };

  // const handleAddAddress = () => {
  //   if (currentAddress) {
  //     setAddNewRelation((prev) => {
  //       const updatedAddressData = [...prev.addressData, { ...currentAddress }];

  //       // Add the selected address type to the list of saved address types
  //       setSelectedAddressTypes((prevSelected) => [
  //         ...prevSelected,
  //         currentAddress.ADDRESS_TYPE,
  //       ]);

  //       // Update the submitted data state
  //       setSubmittedAddressData(updatedAddressData);
  //       setSubmittedAddressDataView(updatedAddressData);

  //       return { ...prev, addressData: updatedAddressData };
  //     });

  //     // Reset after adding
  //     setCurrentAddress(initialAddressState);
  //     setIsModalOpen(false);
  //   }
  // };

  const filteredAddressTypes = availableAddressTypes?.filter(
    (address) => !selectedAddressTypes.includes(address.value)
  );

  // const handleAddAddress = () => {
  //   // Ensure currentAddress is valid before adding
  //   if (currentAddress) {
  //     setAddNewRelation((prev) => {
  //       // Simply keep ADDRESS_TYPE and HOUSE_TYPE as they are, without splitting
  //       const updatedAddressData = [
  //         ...prev.addressData, // Keep existing data
  //         {
  //           ...currentAddress, // No need to split
  //         },
  //       ];

  //       console.log("Updated addressData:", updatedAddressData); // Log updated data

  //       // Update the state with the new address data
  //       setSubmittedAddressData(updatedAddressData);
  //       setSubmittedAddressDataView(updatedAddressData); // Use the same data for both view and submission

  //       return {
  //         ...prev,
  //         addressData: updatedAddressData,
  //       };
  //     });

  //     // Reset currentAddress after adding
  //     setCurrentAddress({ ...initialAddressState });
  //     setIsModalOpen(false);
  //   }
  // };

  const handleUpdateAddress = () => {
    if (currentAddress && editingIndex !== null) {
      setAddNewRelation((prev) => {
        const updatedAddressData = [...prev.addressData];
        updatedAddressData[editingIndex] = { ...currentAddress }; // Update the address at the editing index

        setSubmittedAddressData(updatedAddressData);
        setSubmittedAddressDataView(updatedAddressData);
        return {
          ...prev,
          addressData: updatedAddressData,
        };
      });

      // Reset after updating
      setCurrentAddress(initialAddressState);
      setIsEditMode(false); // Switch back to add mode
      setEditingIndex(null); // Reset the editing index
      setIsModalOpen(false); // Close the modal
    }
  };

  // Function to handle editing an existing address
  const handleEditAddress = (index) => {
    setCurrentAddress(submittedAddressData[index]); // Set the current address to the one being edited
    setIsEditMode(true); // Switch to edit mode
    setEditingIndex(index); // Set the index of the address being edited
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDeleteClick = (index) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this address!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDeleteAddress(index); // Proceed with delete if confirmed
        swal("The address has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your address is safe!");
      }
    });
  };

  // const handleDeleteAddress = (index) => {
  //   setAddNewRelation((prev) => ({
  //     ...prev,
  //     addressData: prev.addressData.filter((_, i) => i !== index), // Filter out the item
  //   }));

  //   setSubmittedAddressData(
  //     (prev) => prev.filter((_, i) => i !== index) // Update filtered submitted data
  //   );

  //   setSubmittedAddressDataView(
  //     (prev) => prev.filter((_, i) => i !== index) // Update filtered view data
  //   );
  // };

  const handleDeleteAddress = (index) => {
    // Capture the ADDRESS_TYPE before updating the state
    const removedAddressType = submittedAddressDataView[index]?.ADDRESS_TYPE;

    if (removedAddressType) {
      // Update addNewRelation state
      setAddNewRelation((prev) => {
        const updatedAddressData = prev.addressData.filter(
          (_, i) => i !== index
        );
        return { ...prev, addressData: updatedAddressData };
      });

      // Update submittedAddressData
      setSubmittedAddressData((prev) => prev.filter((_, i) => i !== index));

      // Update submittedAddressDataView
      setSubmittedAddressDataView((prev) => prev.filter((_, i) => i !== index));

      // Update selectedAddressTypes to make the deleted address type available again
      setSelectedAddressTypes((prevSelected) =>
        prevSelected.filter((type) => type !== removedAddressType)
      );
    } else {
      console.error("Address type not found at index", index);
    }
  };

  return (
    <div>
      {/* Add a container to position the button */}
      <div className="relative">
        {/* Add the button to the top right corner */}

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">
                Address Type
              </th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">
                House Type
              </th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">
                Stayed Since
              </th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">
                Stayed To
              </th>
              <th className="px-6 py-15 bg-sky-700 text-left text-xs leading-4 font-medium text-white uppercase border-r">
                PO Box No
              </th>
              <th className="px-6 py-15 bg-sky-700 text-center text-xs leading-4 font-medium text-white uppercase border-r">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {submittedAddressDataView?.length > 0 ? (
              submittedAddressDataView?.map((address, index) => (
                <tr key={index}>
                  <td>{address.ADDRESS_TYPE}</td>
                  <td>{address.HOUSE_TYPE}</td>
                  <td>{address.STYED_SINCE}</td>
                  <td>{address.STAYED_TO}</td>
                  <td>{address.POSTAL_ZIP_CODE}</td>
                  <td className="flex items-center justify-center space-x-5">
                    <div onClick={() => handleEditAddress(index)}>
                      <BiEdit className="cursor-pointer text-blue-500 w-8 h-8" />
                    </div>
                    <div onClick={() => handleDeleteClick(index)}>
                      <MdDelete className="cursor-pointer text-red-500 w-8 h-8" />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No addresses added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end mt-2">
          <button
            onClick={openModal}
            className=" p-2 bg-blue-500 text-white  px-4 py-2  font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            + Add Address
          </button>
        </div>
      </div>

      <Portal>
        <Modal
          title={<CustomHeader />}
          // title="Add Address"
          opened={isModalOpen}
          onClose={closeModal}
          size="30%"
          transition="rotate-left"
          centered
          overlayOpacity={0.5}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          style={{
            zoom: "75%",
            // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            modal: {
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", // Inline shadow style
            },
            header: {
              backgroundColor: "#f5f5f5", // Set your desired header background color
              padding: "10px", // Optional: add padding for aesthetics
            },
          }}
          className="modal-blur"
        >
          {/* Modal content here */}

          <div>
            <div>
              {/* <div className="text-center text-black uppercase mb-2">001 - Current Address</div> */}
              <hr />

              {/* <div className=" text-black uppercase mb-2">Work Address</div> */}
              {/* First Tab */}
              {/* <div className="flex items-center justify-center space-x-20"> */}
              <div className="">
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label
                        label="Address Type"
                        required={true}
                        fontSize="85%"
                      />
                    </div>
                    <div className="md:w-2/3 ">
                      <ListOfValue
                        data={filteredAddressTypes ?? []} // Use filtered options after save
                        inputWidth="300px"
                        value={
                          currentAddress ? currentAddress.ADDRESS_TYPE : ""
                        }
                        onChange={(value) =>
                          handleSelectChange("ADDRESS_TYPE", value)
                        }
                      />
                      {/* <ListOfValue
                        data={availableAddressTypes ?? []}
                        inputWidth="300px"
                        // value={formData.p_addressType}
                        value={
                          currentAddress ? currentAddress.ADDRESS_TYPE : ""
                        }
                        onChange={(value) =>
                          handleSelectChange("ADDRESS_TYPE", value)
                        }
                      /> */}
                    </div>
                  </div>
                </div>

                {/* House Type */}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label
                        label="House Type"
                        required={true}
                        fontSize="85%"
                      />
                    </div>
                    <div className="md:w-2/3 ">
                      <ListOfValue
                        data={houseType}
                        inputWidth="300px"
                        value={currentAddress ? currentAddress.HOUSE_TYPE : ""}
                        onChange={(value) =>
                          handleSelectChange("HOUSE_TYPE", value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Tab */}
              {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
              <div className=" mt-2.5">
                {/* Flat/Villa/House No */}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Flat/Villa/House No" fontSize="85%" />
                    </div>
                    <div class="md:w-2/3 md:ml-[2px] ">
                      <InputField
                        inputWidth="300px"
                        name="PH_ADDRESS1"
                        value={currentAddress.PH_ADDRESS1}
                        onChange={(e) =>
                          handleInputChange("PH_ADDRESS1", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Building Name */}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Building Name" fontSize="85%" />
                    </div>
                    <div class="md:w-2/3 md:ml-[2px] ">
                      <InputField
                        inputWidth="300px"
                        name="PH_ADDRESS2"
                        value={currentAddress.PH_ADDRESS2}
                        onChange={(e) =>
                          handleInputChange("PH_ADDRESS2", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Tab */}
              {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
              <div className=" mt-2.5">
                {/* Street Name */}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Street Name" fontSize="85%" />
                    </div>
                    <div class="md:w-2/3 md:ml-[2px] ">
                      <InputField
                        inputWidth="300px"
                        name="PH_ADDRESS3"
                        value={currentAddress.PH_ADDRESS3}
                        onChange={(e) =>
                          handleInputChange("PH_ADDRESS3", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Country" fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 ">
                      <ListOfValue
                        inputWidth="300px"
                        data={country}
                        value={currentAddress.COUNTRY_CODE}
                        // onChange={(value) => handleChange('perm_addr_city_v', value)}
                        onChange={(value) => {
                          handleInputChange("COUNTRY_CODE", value);
                          setTimeout(() => {
                            const input =
                              document.getElementById("AddressCounty");
                            input.focus();
                          }, 0);
                        }}
                        // onChange={(value) => handleChange('p_region', value)}
                        onKeyDown={(e) => {
                          switchFocus(e, "AddressCounty");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input =
                              document.getElementById("AddressCounty");
                            input.focus();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fourth Tab */}
              {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
              <div className="mt-2.5">
                {/* City */}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="County" fontSize="85%" required={true} />
                    </div>
                    <div className="md:w-2/3 ">
                      <ListOfValue
                        id={"AddressCounty"}
                        inputWidth="300px"
                        data={county}
                        value={currentAddress.PO_CITY}
                        // onChange={(value) => handleChange('perm_addr_city_v', value)}
                        onChange={(value) => {
                          handleInputChange("PO_CITY", value);
                          setTimeout(() => {
                            const input =
                              document.getElementById("districtSubAddress");
                            input.focus();
                          }, 0);
                          const getSubCounty = () => {
                            axios
                              .post(
                                API_SERVER + "/api/get-subcounty-details",
                                {
                                  code: "SCU",
                                  county: value,
                                },
                                { headers }
                              )
                              .then(function (response) {
                                //  localStorage.setItem("getCountry", JSON.stringify(response.data));
                                //  console.log("getCountry :", response.data);
                                setSubCounty(response.data);
                              });
                          };

                          getSubCounty();
                        }}
                        // onChange={(value) => handleChange('p_region', value)}
                        onKeyDown={(e) => {
                          switchFocus(e, "districtSubAddress");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input =
                              document.getElementById("districtSubAddress");
                            input.focus();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* earest Land Mark*/}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Sub County" fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 ">
                      <ListOfValue
                        id={"districtSubAddress"}
                        inputWidth="300px"
                        data={subCounty}
                        value={currentAddress.PH_CITY}
                        // onChange={(value) => handleChange('perm_addr_city_v', value)}
                        onChange={(value) => {
                          handleInputChange("PH_CITY", value);
                          setTimeout(() => {
                            const input =
                              document.getElementById("wardAddress");
                            input.focus();
                          }, 0);

                          const getWard = () => {
                            axios
                              .post(
                                API_SERVER + "/api/get-ward-details",
                                {
                                  code: "SCW",
                                  subCounty: value,
                                },
                                { headers }
                              )
                              .then(function (response) {
                                //  localStorage.setItem("getCountry", JSON.stringify(response.data));
                                //  console.log("getCountry :", response.data);
                                setWard(response.data);
                              });
                          };

                          getWard();
                        }}
                        // onChange={(value) => handleChange('p_wardAddress', value)}
                        onKeyDown={(e) => {
                          switchFocus(e, "wardAddress");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input =
                              document.getElementById("wardAddress");
                            input.focus();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sixth Tab */}
              {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
              <div className="mt-2.5">
                {/*Phone 2*/}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Ward" fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 ">
                      <ListOfValue
                        id={"wardAddress"}
                        inputWidth="300px"
                        data={ward}
                        value={currentAddress.LOCATION}
                        // onChange={(value) => handleChange('perm_addr_city_v', value)}
                        onChange={(value) => {
                          handleInputChange("LOCATION", value);
                          setTimeout(() => {
                            const input = document.getElementById("nlm");
                            input.focus();
                          }, 0);

                          // getWard();
                        }}
                        // onChange={(value) => handleChange('p_district', value)}
                        onKeyDown={(e) => {
                          switchFocus(e, "nlm");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = document.getElementById("nlm");
                            input.focus();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Nature of Ownership*/}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Nearest Land Mark" fontSize="85%" />
                    </div>
                    <div class="md:w-2/3 md:ml-[2px] ">
                      <InputField
                        id={"nlm"}
                        inputWidth="300px"
                        name="PO_NEAREST_LAND_MARK"
                        value={currentAddress.PO_NEAREST_LAND_MARK}
                        onChange={(e) =>
                          handleInputChange(
                            "PO_NEAREST_LAND_MARK",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Seventh Tab */}
              {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
              <div className="mt-2.5">
                {/*Stayed Since*/}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="PO Box Number" fontSize="85%" />
                    </div>
                    <div class="md:w-2/3 md:ml-[2px] ">
                      <InputField
                        inputWidth="300px"
                        name="PO_ADDRESS1"
                        value={currentAddress.PO_ADDRESS1}
                        onChange={(e) =>
                          handleInputChange("PO_ADDRESS1", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/*Cost Of Accommodation*/}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Owner of Property" fontSize="85%" />
                    </div>
                    <div className="ml-5">
                      {ownerOfPro.map((option) => (
                        <label
                          key={option.value}
                          className="inline-flex items-center mr-4"
                        >
                          <input
                            id="minor"
                            type="radio"
                            name="OWNER_OF_PROPERTY"
                            value={option.value}
                            checked={
                              currentAddress.OWNER_OF_PROPERTY === option.value
                            } // Correctly check if this option is selected
                            onChange={() =>
                              handleInputChange(
                                "OWNER_OF_PROPERTY",
                                option.value
                              )
                            } // Call the function on change
                            onKeyDown={(e) => {
                              switchFocus(e, "Stayed_Since");
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const input =
                                  document.getElementById("Stayed_Since");
                                input.focus();
                              }
                            }}
                          />{" "}
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
              <div className="mt-2.5">
                {/*Phone 2*/}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Stayed Since" fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 md:ml-[30px]">
                      <DatePicker
                        selected={
                          currentAddress.STYED_SINCE
                            ? new Date(currentAddress.STYED_SINCE)
                            : null
                        }
                        // onChange={handleStartDateChange}
                        onChange={(date) =>
                          setCurrentAddress({
                            ...currentAddress,
                            STYED_SINCE: formatDate(date.toISOString(), true),
                          })
                        }
                        className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                        dateFormat="dd-MM-yyyy"
                        placeholderText="dd-mm-yyyy"
                      />
                    </div>
                  </div>
                </div>

                {/* Nature of Ownership*/}
                {currentAddress.OWNER_OF_PROPERTY !== "Y" && (
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Stayed To" fontSize="85%" />
                    </div>
                    <div class="md:w-2/3 md:ml-[30px] ">
                      <DatePicker
                        selected={
                          currentAddress.STAYED_TO
                            ? new Date(currentAddress.STAYED_TO)
                            : null
                        }
                        // onChange={handleStartDateChange}
                        onChange={(date) =>
                          setCurrentAddress({
                            ...currentAddress,
                            STAYED_TO: formatDate(date.toISOString(), true),
                          })
                        }
                        className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                        dateFormat="dd-MM-yyyy"
                        placeholderText="dd-mm-yyyy"
                      />
                    </div>
                  </div>
                </div>
                )}
              </div>

              {/* <div className="flex items-center justify-center space-x-20 -mt-2.5"> */}
              <div className="mt-2.5">
                {/*Phone 2*/}
                {currentAddress.OWNER_OF_PROPERTY !== "Y" && (
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Rent Per Annum" fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 ">
                      <InputField
                        inputWidth="300px"
                        type={"text"}
                        name="RENT_PER_ANNUAL"
                        value={currentAddress.RENT_PER_ANNUAL}
                        onChange={(e) =>
                          handleInputChange("RENT_PER_ANNUAL", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
                )}

                {/* Nature of Ownership*/}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Current value" fontSize="85%" />
                    </div>
                    <div class="md:w-2/3 md:ml-[2px] ">
                      <InputField
                        inputWidth="300px"
                        type={"text"}
                        name="CURRENT_VALUE"
                        value={currentAddress.CURRENT_VALUE}
                        onChange={(e) =>
                          handleInputChange("CURRENT_VALUE", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2.5"></div>
            </div>
          </div>
          <div>
            {/* Modal footer */}
            <Footer align="right">
              <Button onClick={closeModal} variant="light">
                Close
              </Button>
              {/* <Button variant="primary" onClick={handleAddAddress}>
                Submit
              </Button> */}
              <Button
                onClick={isEditMode ? handleUpdateAddress : handleAddAddress}
                variant="light"
              >
                {isEditMode ? "Update Address" : "Save Address"}
              </Button>
            </Footer>
            {/* Your form inputs and logic can go here */}
          </div>
        </Modal>
      </Portal>
    </div>
  );
};

export default Address;
