import React, { useState, useEffect } from "react";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ListOfValue from "../components/comp/ListOfValue";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "./comp/InputField";
import Phone_number from "./comp/Phone_number";
import EmailInput from "./comp/EmailInput";
import { Modal, Button, TextInput, Group, MultiSelect } from "@mantine/core";
import DynamicTable from "./comp/DynamicTable";
import { formatDate } from "../helpers/date_formater";

const Corporate_Bank = ({
  data,
  handleChangeCorporateInfo,
  corporate,
  DatePicker,
  isValidKraPin,
  validateKraPin,
  showValidMessage,
  kraPinError,
  errors,
  handleSubmitCorporateData,
  setCorporate,
}) => {
  const [country, setCountry] = useState([]);
  const [language, setLanguage] = useState([]);

  const [associateValues, setAssociateValues] = useState([]);

  const [opened, setOpened] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [contacts, setContacts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdateContact = () => {
    if (editingIndex !== null) {
      const updatedContacts = contacts.map((contact, index) =>
        index === editingIndex ? { fullName, email, mobileNumber } : contact
      );
      setContacts(updatedContacts);
      setEditingIndex(null);
    } else {
      setContacts([...contacts, { fullName, email, mobileNumber }]);
    }

    setFullName("");
    setEmail("");
    setMobileNumber("");
    setOpened(false);
  };

  const handleEdit = (index) => {
    const contact = contacts[index];
    setFullName(contact.fullName);
    setEmail(contact.email);
    setMobileNumber(contact.mobileNumber);
    setEditingIndex(index);
    setOpened(true);
  };

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

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
        });
    };

    getPreferredLanguage();
  }, []);

  const modeOfcom = [
    { value: "M", label: "Mobile" },
    { value: "E", label: "Email" },
    { value: "S", label: "SMS" },
  ];

  const bankSisCom = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  return (
    <div
      className="overflow-auto"
      style={{ maxHeight: "400px", overflowY: "auto" }}
    >
      <div className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-2xl">
            {/* Country */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Country of registration"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <ListOfValue
                    id={"REG_COUNTRY"}
                    data={country}
                    inputWidth={"100%"}
                    name="COUNTRY_OF_REGISTRATION"
                    value={corporate.COUNTRY_OF_REGISTRATION}
                    onChange={(value) => {
                      handleChangeCorporateInfo(
                        "COUNTRY_OF_REGISTRATION",
                        value
                      );
                      setTimeout(() => {
                        const input = document.getElementById("TOWN_CITY");
                        input.focus();
                      }, 0);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "TOWN_CITY");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("TOWN_CITY");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Flat/Villa/House No */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    // label="Flat/Villa/House No"
                    label="Physical address"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id="CORP_PHYSICAL_ADDRESS"
                    inputWidth={"100%"}
                    name="CORP_PHYSICAL_ADDRESS"
                    value={corporate.CORP_PHYSICAL_ADDRESS}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "CORP_PHYSICAL_ADDRESS",
                        e.target.value
                      );
                    }}
                    onKeyPress={(e) => {
                      console.log(
                        document.getElementById("DATE_OFINCORP"),
                        "fighting"
                      );
                      switchFocus(e, "DATE_OFINCORP");
                      setTimeout(() => {
                        if (document.getElementById("DATE_OFINCORP")) {
                          document.getElementById("DATE_OFINCORP");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Postal Address */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Postal Address" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id="CORP_POSTALADDRESS"
                    inputWidth={"100%"}
                    name="CORP_POSTALADDRESS"
                    value={corporate.CORP_POSTALADDRESS}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "CORP_POSTALADDRESS",
                        e.target.value
                      );
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('pri_phone_no'), "fighting")
                      switchFocus(e, "POSTAL_CODE");
                      setTimeout(() => {
                        if (document.getElementById("POSTAL_CODE")) {
                          document.getElementById("POSTAL_CODE");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Location*/}
            {/* Plot number*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Plot number" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id={"plotnumber"}
                    inputWidth={"100%"}
                    name="PLOT_NUMBER"
                    value={corporate.PLOT_NUMBER}
                    onChange={(e) => {
                      handleChangeCorporateInfo("PLOT_NUMBER", e.target.value);
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('pri_phone_no'), "fighting")
                      switchFocus(e, "CORP_COMM_MODE");
                      setTimeout(() => {
                        if (document.getElementById("CORP_COMM_MODE")) {
                          document.getElementById("CORP_COMM_MODE");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Website url */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Website url" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id="WEBSITE_URL"
                    inputWidth={"100%"}
                    name="WEBSITE_URL"
                    value={corporate.WEBSITE_URL}
                    onChange={(e) => {
                      handleChangeCorporateInfo("WEBSITE_URL", e.target.value);
                    }}
                    // onKeyPress={(e) => {
                    //   // console.log(document.getElementById('pri_phone_no'), "fighting")
                    //   switchFocus(e, "CORP_PHONENO");
                    //   setTimeout(() => {
                    //     if (document.getElementById("CORP_PHONENO")) {
                    //       document.getElementById("CORP_PHONENO");
                    //     }
                    //   }, 500);
                    // }}
                  />
                </div>
              </div>
            </div>

            {/* Telephone number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Telephone number"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <Phone_number
                    marginBottom={"8px"}
                    name="TELEPHONE"
                    value={corporate.TELEPHONE || ""}
                    onChange={(value) =>
                      handleChangeCorporateInfo("TELEPHONE", value)
                    }
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('street_name'), "fighting")
                      switchFocus(e, "postal_address");
                      setTimeout(() => {
                        if (document.getElementById("postal_address")) {
                          document.getElementById("postal_address");
                        }
                      }, 500);
                    }}
                    inputWidth={"100%"}
                  />
                </div>
              </div>
            </div>

            {/* Country */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Country" required={true} fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <ListOfValue
                    id={"country"}
                    data={country}
                    inputWidth={"100%"}
                    name="CORP_COUNTRY"
                    value={corporate.CORP_COUNTRY}
                    onChange={(value) => {
                      handleChangeCorporateInfo("CORP_COUNTRY", value);
                      setTimeout(() => {
                        const input = document.getElementById("kenya_r");
                        input.focus();
                      }, 0);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "kenya_r");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("kenya_r");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Email" required={true} fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <EmailInput
                    showIcon={true}
                    type="text"
                    id={"CORP_EMAIL"}
                    inputWidth={"100%"}
                    name="CORP_EMAIL"
                    value={corporate.CORP_EMAIL}
                    onChange={(e) => {
                      handleChangeCorporateInfo("CORP_EMAIL", e.target.value);
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('pri_phone_no'), "fighting")
                      switchFocus(e, "CORP_REQISTERNO");
                      setTimeout(() => {
                        if (document.getElementById("CORP_REQISTERNO")) {
                          document.getElementById("CORP_REQISTERNO");
                        }
                      }, 500);
                    }}
                  />
                  {errors.CORP_EMAIL && (
                    <div
                      className="error-message ml-5"
                      style={{ color: "red" }}
                    >
                      {errors.CORP_EMAIL}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preferred Language */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Preferred Language" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <ListOfValue
                    id={"CORP_PREF_LANG"}
                    data={language}
                    inputWidth={"100%"}
                    name="CORP_PREF_LANG"
                    value={corporate.CORP_PREF_LANG}
                    onChange={(value) => {
                      handleChangeCorporateInfo("CORP_PREF_LANG", value);
                      setTimeout(() => {
                        const input = document.getElementById("BANKSISCOMP");
                        input.focus();
                      }, 0);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "BANKSISCOMP");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("BANKSISCOMP");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Associate company(ies) */}
            {/* Description Of Business */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Description Of Business" fontSize="85%" />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id={"BUSINESSDESC"}
                    inputWidth={"100%"}
                    name="BUSINESSDESC"
                    value={corporate.BUSINESSDESC || ""}
                    onChange={(e) => {
                      handleChangeCorporateInfo("BUSINESSDESC", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Associate company(ies)"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <ListOfValue
                    id={"country"}
                    data={country}
                    inputWidth={"100%"}
                    name="p_associate_company"
                    value={corporate.p_associate_company}
                    onChange={(value) => {
                      handleChangeCorporateInfo("p_associate_company", value);
                      setTimeout(() => {
                        const input = document.getElementById("comp_reg");
                        input.focus();
                      }, 0);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "comp_reg");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("comp_reg");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div> */}
          </div>
          {/* **************************************** */}

          {/* Second Side */}
          {/* Second Side */}
          {/* Second Side */}
          <div className="w-full max-w-2xl">
            {/* Town / City */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Town / City" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id="TOWN_CITY"
                    inputWidth={"100%"}
                    name="TOWN_CITY"
                    value={corporate.TOWN_CITY}
                    onChange={(e) => {
                      handleChangeCorporateInfo("TOWN_CITY", e.target.value);
                    }}
                    onKeyPress={(e) => {
                      console.log(
                        document.getElementById("CORP_PHYSICAL_ADDRESS"),
                        "fighting"
                      );
                      switchFocus(e, "CORP_PHYSICAL_ADDRESS");
                      setTimeout(() => {
                        if (document.getElementById("CORP_PHYSICAL_ADDRESS")) {
                          document.getElementById("CORP_PHYSICAL_ADDRESS");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Date of Incorporation */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center space-x-4 mb-2 ml-4">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Date of Incorporation"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <div className="inline-block">
                    <DatePicker
                      id="DATE_OFINCORP"
                      selected={
                        corporate.DATE_OFINCORP
                          ? new Date(corporate.DATE_OFINCORP)
                          : null
                      }
                      // onChange={handleStartDateChange}
                      onChange={(date) => {
                        // Format the date and get the minor status
                        const formattedDate = formatDate(
                          date.toISOString(),
                          false
                        );

                        // Update state based on the selected date
                        setCorporate({
                          ...corporate,
                          DATE_OFINCORP: formattedDate,
                        });
                      }}
                      onKeyPress={(e) => {
                        console.log(
                          document.getElementById("CORP_POSTALADDRESS"),
                          "fighting"  
                        );
                        switchFocus(e, "CORP_POSTALADDRESS");
                        setTimeout(() => {
                          if (
                            document.getElementById("CORP_POSTALADDRESS")
                          ) {
                            document.getElementById("CORP_POSTALADDRESS");
                          }
                        }, 500);
                      }}
                      className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                    />
                    {/* <DatePicker
                      selected={
                        corporate.DATE_OFINCORP
                          ? new Date(corporate.DATE_OFINCORP)
                          : null
                      }
                      id="date_of_incorp"
                      onChange={(date) =>
                        handleChangeCorporateInfo("DATE_OFINCORP", date)
                      }
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                      // style={{width:"300px"}}
                      className="w-[350px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                    /> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Postal pin */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Postal code" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id="POSTAL_CODE"
                    inputWidth={"100%"}
                    name="POSTAL_CODE"
                    value={corporate.POSTAL_CODE}
                    onChange={(e) => {
                      handleChangeCorporateInfo("POSTAL_CODE", e.target.value);
                    }}
                    onKeyPress={(e) => {
                      console.log(document.getElementById("plotnumber"), "fighting");
                      switchFocus(e, "plotnumber");
                      setTimeout(() => {
                        if (document.getElementById("plotnumber")) {
                          document.getElementById("plotnumber");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Communication Mode */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Communication Mode"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div className="ml-4">
                  {modeOfcom.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        id="CORP_COMM_MODE"
                        type="radio"
                        name="CORP_COMM_MODE"
                        value={option.value}
                        checked={corporate.CORP_COMM_MODE === option.value}
                        onChange={() =>
                          handleChangeCorporateInfo(
                            "CORP_COMM_MODE",
                            option.value
                          )
                        }
                        onKeyDown={(e) => {
                          switchFocus(e, "WEBSITE_URL");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = document.getElementById("WEBSITE_URL");
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

            {/* Primary Phone Number */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Primary Phone Number"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <Phone_number
                    id='CORP_PHONENO'
                    marginBottom={"8px"}
                    name="CORP_PHONENO"
                    value={corporate.CORP_PHONENO || ""}
                    onChange={(value) =>
                      handleChangeCorporateInfo("CORP_PHONENO", value)
                    }
                    // onKeyPress={(e) => {
                    //   // console.log(document.getElementById('street_name'), "fighting")
                    //   switchFocus(e, "postal_address");
                    //   setTimeout(() => {
                    //     if (document.getElementById("postal_address")) {
                    //       document.getElementById("postal_address");
                    //     }
                    //   }, 500);
                    // }}
                    inputWidth={"100%"}
                  />
                </div>
              </div>
            </div>

            {/* KRA Pin */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Fax number" required={true} fontSize="85%" />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <InputField
                    className="text-left"
                    id={"FAX_NUMBER"}
                    type="text"
                    inputWidth={"100%"}
                    name="FAX_NUMBER"
                    value={corporate.FAX_NUMBER || ""}
                    onChange={(e) => {
                      handleChangeCorporateInfo("FAX_NUMBER", e.target.value);
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('street_name'), "fighting")
                      switchFocus(e, "country");
                      setTimeout(() => {
                        if (document.getElementById("country")) {
                          document.getElementById("country");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Tin Number*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="KRA Pin" required={true} fontSize="85%" />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <InputField
                    className="text-right"
                    id={"kenya_r"}
                    type="text"
                    inputWidth={"100%"}
                    name="CORP_TINNO"
                    value={corporate.CORP_TINNO || ""}
                    onChange={(e) => {
                      handleChangeCorporateInfo("CORP_TINNO", e.target.value);
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('street_name'), "fighting")
                      switchFocus(e, "CORP_EMAIL");
                      setTimeout(() => {
                        if (document.getElementById("CORP_EMAIL")) {
                          document.getElementById("CORP_EMAIL");
                        }
                      }, 500);
                    }}
                  />
                  {errors.CORP_TINNO && (
                    <div style={{ font: "red" }} className="ml-5">
                      {errors.CORP_TINNO}
                    </div>
                  )}
                  {/* ...other input fields and validation messages */}
                </div>
              </div>
            </div>

            {/* Company Registration No.*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Company&nbsp;Registration&nbsp;No"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id={"CORP_REQISTERNO"}
                    inputWidth={"100%"}
                    name="CORP_REQISTERNO"
                    value={corporate.CORP_REQISTERNO || ""}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "CORP_REQISTERNO",
                        e.target.value
                      );
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('street_name'), "fighting")
                      switchFocus(e, "CORP_PREF_LANG");
                      setTimeout(() => {
                        if (document.getElementById("CORP_PREF_LANG")) {
                          document.getElementById("CORP_PREF_LANG");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bank's Sist. Comp */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Bank's Sist. Comp" fontSize="85%" />
                </div>
                <div className="ml-4">
                  {bankSisCom.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        id="BANKSISCOMP"
                        type="radio"
                        name="BANKSISCOMP"
                        value={option.value}
                        checked={corporate.BANKSISCOMP === option.value}
                        onChange={() =>
                          handleChangeCorporateInfo("BANKSISCOMP", option.value)
                        }
                        onKeyDown={(e) => {
                          switchFocus(e, "BUSINESSDESC");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input =
                              document.getElementById("BUSINESSDESC");
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
        </div>
      </div>

      {/* Modal */}
      <div>
        {/* <Button onClick={() => setOpened(true)}>Add contact personnel</Button> */}
        <h3 className="uppercase mt-2">contact personnel</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddOrUpdateContact();
          }}
          className="mt-2"
        >
          <div className="border rounded">
            <div className="md:flex justify-center w-full">
              {/* **************************************** */}
              <div className="w-full max-w-2xl">
                {/* Country */}

                {/* Flat/Villa/House No */}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label
                        // label="Flat/Villa/House No"
                        label="Full name"
                        required={true}
                        fontSize="85%"
                      />
                    </div>
                    <div className="md:w-2/3 md:mr-2">
                      <InputField
                        type="text"
                        inputWidth={"100%"}
                        name="PERSONAL_FULLNAME"
                        value={fullName || corporate?.PERSONAL_FULLNAME}
                        onChange={(e) => {
                          handleChangeCorporateInfo(
                            "PERSONAL_FULLNAME",
                            e.target.value
                          );
                          setFullName(e.target.value);
                        }}
                        // onKeyPress={(e) => {
                        //   console.log(
                        //     document.getElementById("date_of_incorp"),
                        //     "fighting"
                        //   );
                        //   switchFocus(e, "date_of_incorp");
                        //   setTimeout(() => {
                        //     if (document.getElementById("date_of_incorp")) {
                        //       document.getElementById("date_of_incorp");
                        //     }
                        //   }, 500);
                        // }}
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label label="Email" required={true} fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 md:mr-2">
                      <EmailInput
                        showIcon={true}
                        type="text"
                        id={"email"}
                        inputWidth={"100%"}
                        name="PERSONAL_EMAIL"
                        value={corporate.PERSONAL_EMAIL}
                        onChange={(e) => {
                          handleChangeCorporateInfo(
                            "PERSONAL_EMAIL",
                            e.target.value
                          );
                        }}
                      />
                      {errors.p_corp_email && (
                        <div
                          className="error-message ml-5"
                          style={{ color: "red" }}
                        >
                          {errors.p_corp_email}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* **************************************** */}

              {/* Second Side */}
              {/* Second Side */}
              {/* Second Side */}
              <div className="w-full max-w-2xl">
                {/* Town / City */}
                <div class="w-full max-w-xl mt-2">
                  <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3 text-right">
                      <Label
                        label="Telephone number"
                        required={true}
                        fontSize="85%"
                      />
                    </div>
                    <div class="md:w-2/3 md:mr-2">
                      <Phone_number
                        marginBottom={"8px"}
                        name="PERSONAL_PHONENUMBER"
                        value={corporate?.PERSONAL_PHONENUMBER || ""}
                        onChange={(value) => {
                          handleChangeCorporateInfo(
                            "PERSONAL_PHONENUMBER",
                            value
                          );
                          // setMobileNumber(e.target.value);
                        }}
                        // onKeyPress={(e) => {
                        //   // console.log(document.getElementById('street_name'), "fighting")
                        //   switchFocus(e, "postal_address");
                        //   setTimeout(() => {
                        //     if (document.getElementById("postal_address")) {
                        //       document.getElementById("postal_address");
                        //     }
                        //   }, 500);
                        // }}
                        inputWidth={"100%"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DynamicTable corporate={corporate} />
          <hr className="mb-5" />
          <div className="flex justify-center">
            <button
              onClick={handleSubmitCorporateData}
              className="w-1/4 px-4 py-2 bg-green-600 text-white hover:bg-green-700 font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Add corporate information
            </button>
          </div>
        </form>

        {/* <div className="flex justify-end">
          <button
            // onClick={() => setShowValidationModal(true)}
            onClick={() => setOpened(true)}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Add contact personnel
          </button>
        </div> */}
      </div>
      {/* Modal */}
    </div>
  );
};

export default Corporate_Bank;
