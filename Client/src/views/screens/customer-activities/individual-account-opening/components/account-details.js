import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import { API_SERVER } from "../../../../../config/constant";
import axios from "axios";
import ListOfValue from "./comp/ListOfValue";
import { Switch, Radio, Group } from "@mantine/core";

const Account_Details = ({
  data,
  onChange,
  accountDetailsData,
  setAccountDetailsData,
  accountTypes,
  setAccountTypes,
  customerSegment,
  customerSubSegment,
  sector,
  subSector,
  handleCustTypeChange,
  custType,
  currencies,
  handleRadioChangeMember,
}) => {
  const [typesOfReferee, setTypesOfReferee] = useState(
    localStorage.getItem("typesOfReferee") || ""
  );
  const [documentRequiredType, setDocumentRequiredType] = useState([]);
  const [formValues, setFormValues] = useState([]);

  const [switchValue, setSwitchValue] = useState(false); // State for the Switch component

  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  // Data for the Switch component
  const switchData = [
    { value: true, label: "FOSA" },
    { value: false, label: "BOSA" },
  ];

  const ownerOfPro = [
    { value: "220", label: "Member" },
    { value: "Y", label: "Non-Member" },
  ];

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    localStorage.setItem("typesOfReferee", typesOfReferee);
  }, [typesOfReferee]);

  const handleTypeOfReferee = (event) => {
    setTypesOfReferee(event.target.value);
  };

  useEffect(() => {
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
    getDocumentRequiredType();
  }, []);
  console.log(subSector, "data.customer_segment");

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_SERVER + "/api/arm", { headers });
        setOptions(response.data);
        console.log("Relation:::", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeRelation = (name, value) => {
    // accountDetailsData(value);

    setAccountDetailsData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Add your logic here to handle the selected value
  };

  const combinedOptions = [
    ...custType,
    ...accountDetailsData.documentRequiredType,
  ];

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  // Handle switch change
  const handleSwitchChange = (checked) => {
    setSwitchValue(checked);
    if(checked == true){
      setAccountDetailsData((prev) => ({ ...prev, saccoMember: "FOSA" }));
      // setAccountDetailsData("FOSA")
    } else {
      // setAccountDetailsData((prev) => ({ ...prev, saccoMember: "BOSA" }));
      setAccountDetailsData((prev) => ({ ...prev, saccoMember: "BOSA", memberType: "M" }));
    }

    // Clear memberType state if switched to BOSA (false)
    if (!checked) {
      setAccountDetailsData((prev) => ({
        ...prev,
        memberType: "", // Clear memberType when switching back to BOSA
      }));
    }
  };

  console.log("accountDetailsData", accountDetailsData);

  return (
    <div>
      <div className="border rounded bg-white">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-xl">
            {/* Switch for FOSA/BOSA */}
            <div className="flex items-center space-x-2 mt-5">
              <div className="w-full max-w-xl mb-4 ml-2 invisible">
                <Switch
                  checked={switchValue}
                  onChange={(event) =>
                    handleSwitchChange(event.currentTarget.checked)
                  }
                  size="xl"
                  onLabel="FOSA"
                  offLabel="BOSA"
                  defaultChecked={false} // Default should be BOSA
                />
              </div>

              {/* Radio buttons for Member/Non-member */}

              {!switchValue && (
                <div className="w-full max-w-xl mb-4 ml-2">
                  <Group>
                    <Radio
                      value="member"
                      label="Member"
                      checked={accountDetailsData.memberType === "M"}
                      onChange={() =>
                        setAccountDetailsData((prev) => ({
                          ...prev,
                          memberType: "M",
                        }))
                      }
                    />
                    <Radio
                      value="non-member"
                      label="Non-member"
                      checked={accountDetailsData.memberType === "non-member"}
                      onChange={() =>
                        setAccountDetailsData((prev) => ({
                          ...prev,
                          memberType: "non-member",
                        }))
                      }
                    />
                  </Group>
                </div>
              )}
            </div>

            {/* Product Group */}
            {/* {switchValue && ( */}
            {accountDetailsData.memberType !== "M" && (
              <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3 text-right">
                    <Label label="Product Group" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 ">
                    <ListOfValue
                      id={"prodgroup"}
                      inputWidth="100%"
                      data={data.productGroup}
                      value={accountDetailsData.productGroup}
                      onChange={onChange.productGroup}
                      disabled={accountDetailsData.sacco === "220"}
                      // onChange={(value)=>{(
                      //   {onChange.productGroup}
                      //   setTimeout(() => {
                      //       const input = document.getElementById("prodgroup");
                      //       input.focus();
                      //     },0);
                      // )}}

                      onKeyDown={(e) => {
                        switchFocus(e, "prodSubgroup");
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = document.getElementById("prodSubgroup");
                          input.focus();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Product Sub Group */}
            {accountDetailsData.memberType !== "M" && (
              <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3 text-right">
                    <Label label="Product Sub Group" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 ">
                    <ListOfValue
                      id={"prodSubgroup"}
                      onChange={onChange.productSubGroup}
                      value={accountDetailsData.productSubGroup}
                      data={data.productSubGroup}
                      inputWidth="100%"
                      disabled={accountDetailsData.sacco === "220"}
                      onKeyDown={(e) => {
                        switchFocus(e, "currency");
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = document.getElementById("currency");
                          input.focus();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Currency currency */}
            {accountDetailsData.memberType !== "M" && (
              <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
                <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3 text-right">
                    <Label label="Currency" fontSize="85%" />
                  </div>
                  <div className="md:w-2/3 ">
                    <ListOfValue
                      id={"currency"}
                      data={data.currencies}
                      inputWidth="100%"
                      onChange={onChange.currencies}
                      value={accountDetailsData.currencies}
                      // value={"010"}
                      onKeyDown={(e) => {
                        switchFocus(e, "custSeg");
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = document.getElementById("custSeg");
                          input.focus();
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Fx Category */}
            {/* <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div className="md:flex md:items-center mb-2 ml-10">
                <div class="md:w-1/3 text-right">
                  <Label label="Fx Category" fontSize="85%" />
                </div>
                <div className="relative">
                  <select
                    id="select_field"
                    name="fxcategory"
                    value={accountDetailsData.fxcategory}
                    onChange={(e) =>
                      handleChangeRelation("fxcategory", e.target.value)
                    }
                    className="block appearance-none w-[200px] py-[3px] leading-tight rounded-[3px] border-[1px] border-[#d1cccc] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      switchFocus(e, "custSeg");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("custSeg");
                        input.focus();
                      }
                    }}
                  >
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
            </div> */}

            {/* Customer Segment */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Customer Segment" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id={"custSeg"}
                    inputWidth="100%"
                    onChange={onChange.customerSegment_}
                    data={data.customerSegment}
                    value={accountDetailsData.customerSegment}
                    onKeyDown={(e) => {
                      switchFocus(e, "subSegment");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("subSegment");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sub Customer Segment */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sub Customer Segment" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id={"subSegment"}
                    onChange={onChange.customerSubSegment}
                    value={accountDetailsData.customerSubSegment}
                    data={data.customerSubSegment}
                    inputWidth="100%"
                    onKeyDown={(e) => {
                      switchFocus(e, "sector");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("sector");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sector */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sector" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id={"sector"}
                    data={sector}
                    onChange={onChange.sector}
                    value={accountDetailsData.sector}
                    inputWidth="100%"
                    onKeyDown={(e) => {
                      switchFocus(e, "subsector");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("subsector");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sub Sector  */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Sub Sector" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id={"subsector"}
                    data={subSector}
                    onChange={onChange.subSector}
                    value={accountDetailsData.subSector}
                    inputWidth="100%"
                    onKeyDown={(e) => {
                      switchFocus(e, "RequiredType");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("RequiredType");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Document Required Type */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Document Required Type" fontSize="85%" />
                </div>
                <div className="md:w-2/3">
                  <ListOfValue
                    id={"RequiredType"}
                    data={documentRequiredType}
                    // onChange={onChange.documentRequiredType}
                    onChange={handleCustTypeChange}
                    // value={accountDetailsData.documentRequiredType}
                    value={custType}
                    // value={combinedOptions}
                    inputWidth="100%"
                    onKeyDown={(e) => {
                      switchFocus(e, "introSource");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("introSource");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Introductory Source */}
            <div class="w-full max-w-xl" style={{ marginTop: "-2px" }}>
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Introductory Source" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id={"introSource"}
                    data={data.introductory}
                    onChange={onChange.introductorysource}
                    value={accountDetailsData.introductorySource}
                    inputWidth="100%"
                    onKeyDown={(e) => {
                      switchFocus(e, "rm");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("rm");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/*  Relation Manager */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Relation Manager"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    id="rm"
                    data={options}
                    inputWidth="100%"
                    value={accountDetailsData.relationManager}
                    // value={formValues.id_type}
                    loading={loading}
                    // onChange={handleChangeRelation}
                    // onChange={(value) => handleChangeRelation('relationManager', value)}
                    // disabled={loading}

                    onChange={(value) => {
                      handleChangeRelation("relationManager", value);
                      // setTimeout(() => {
                      //   const input = document.getElementById("prodgroup");
                      //   input.focus();
                      // }, 0);
                    }}
                    // onKeyDown={(e) => {
                    //   switchFocus(e, "prodgroup");
                    //   if (e.key === "Enter") {
                    //     e.preventDefault();
                    //     const input = document.getElementById("prodgroup");
                    //     input.focus();
                    //   }
                    // }}
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
  );
};

export default Account_Details;
