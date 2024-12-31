import React, { useState, useEffect } from "react";
import axios from "axios";
import Label from "../../../../../../../../components/others/Label/Label";
import InputField from "../components/comp/InputField";
import ListOfValue from "../components/comp/ListOfValue";
import EmailInput from "../components/comp/EmailInput";
import Phone_number from "../components/comp/Phone_number";
import { API_SERVER } from "../../../../../../../../config/constant";
// import InputField from './comp/InputField'
// import ListOfValue from './comp/ListOfValue'
// import EmailInput from '../comp/EmailInput'
// import Phone_number from './comp/Phone_number'
// import { API_SERVER } from '../../../../../../../../config/constant'

const CorporateBank = ({
  data,
  handleChangeCorporateInfo,
  corporate,
  DatePicker,
  isValidKraPin,
  validateKraPin,
  showValidMessage,
  kraPinError,
  errors,
  dataApproval,
  selectedData
}) => {
  const [country, setCountry] = useState([]);
  const [language, setLanguage] = useState([]);

  console.log("Data Approval Details", dataApproval)

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
    <div>
      <div className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-2xl">
            {/* Flat/Villa/House No */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label
                    label="Flat/Villa/House No"
                    required={true}
                    fontSize="85%"
                  />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    inputWidth={"100%"}
                    name="P_corp_flathseno"
                    value={dataApproval?.corporatDetailData[0]?.NAME_ADDR}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "P_corp_flathseno",
                        e.target.value
                      );
                    }}
                    onKeyPress={(e) => {
                      console.log(
                        document.getElementById("date_of_incorp"),
                        "fighting"
                      );
                      switchFocus(e, "date_of_incorp");
                      setTimeout(() => {
                        if (document.getElementById("date_of_incorp")) {
                          document.getElementById("date_of_incorp");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Street Name */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Street Name" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id={"street_name"}
                    inputWidth={"100%"}
                    name="P_corp_streetname"
                    value={dataApproval?.corporatDetailData[0]?.CUSTOMER_ADDRESS1}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "P_corp_streetname",
                        e.target.value
                      );
                    }}
                    onKeyPress={(e) => {
                      console.log(document.getElementById("minor"), "fighting");
                      switchFocus(e, "minor");
                      setTimeout(() => {
                        if (document.getElementById("minor")) {
                          document.getElementById("minor");
                        }
                      }, 500);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Location*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Location" fontSize="85%" />
                </div>
                <div className="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id={"location"}
                    inputWidth={"100%"}
                    name="P_corp_location"
                    value={dataApproval?.corporatDetailData[0]?.CUSTOMER_ADDRESS2}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "P_corp_location",
                        e.target.value
                      );
                    }}
                    //         onKeyPress={(e) => {
                    //           console.log(document.getElementById('pri_phone_no'), "fighting")
                    //           switchFocus(e, 'pri_phone_no');
                    //           setTimeout(() => {

                    //             if (document.getElementById('pri_phone_no')) {
                    //               document.getElementById('pri_phone_no');
                    //             }
                    //           }, 500);
                    //         }}
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
                    id={"postal_address"}
                    inputWidth={"100%"}
                    name="P_corp_postaladdress"
                    value={dataApproval?.corporatDetailData[0]?.CUSTOMER_ADDRESS3}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "P_corp_postaladdress",
                        e.target.value
                      );
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('pri_phone_no'), "fighting")
                      switchFocus(e, "kenya_r");
                      setTimeout(() => {
                        if (document.getElementById("kenya_r")) {
                          document.getElementById("kenya_r");
                        }
                      }, 500);
                    }}
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
                    name="p_corp_country"
                    value={dataApproval?.corporatDetailData[0]?.COUNTRY}
                    onChange={(value) => {
                      handleChangeCorporateInfo("p_corp_country", value);
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
                    name="p_corp_email"
                    value={dataApproval?.corporatDetailData[0]?.EMAIL}
                    onChange={(e) => {
                      handleChangeCorporateInfo("p_corp_email", e.target.value);
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('pri_phone_no'), "fighting")
                      switchFocus(e, "bank_sist");
                      setTimeout(() => {
                        if (document.getElementById("bank_sist")) {
                          document.getElementById("bank_sist");
                        }
                      }, 500);
                    }}
                  />
                  {/* {errors.p_corp_email && <div className="error-message ml-5" style={{ color: 'red' }}>{errors.p_corp_email}</div>} */}
                  {/* <InputField 
                        type="text"
                        id={'email'}
                        inputWidth={'100%'}
                        name="p_corp_email"
                        value={corporate.p_corp_email}
                        onChange={(e) => {handleChangeCorporateInfo('p_corp_email', e.target.value)}}
                        onKeyPress={(e) => {
                          // console.log(document.getElementById('pri_phone_no'), "fighting")
                          switchFocus(e, 'bank_sist');
                          setTimeout(() => {

                            if (document.getElementById('bank_sist')) {
                              document.getElementById('bank_sist');
                            }
                          }, 500);
                        }}
                      />
                      {errors.p_corp_email && <div className="error-message ml-5">{errors.p_corp_email}</div>} */}
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
                    id={"preferred_lang"}
                    data={language}
                    inputWidth={"100%"}
                    name="p_corp_pref_lang"
                    // value={corporate.p_corp_pref_lang}
                    onChange={(value) => {
                      handleChangeCorporateInfo("p_corp_pref_lang", value);
                      setTimeout(() => {
                        const input = document.getElementById("desc_bus");
                        input.focus();
                      }, 0);
                    }}
                    onKeyDown={(e) => {
                      switchFocus(e, "desc_bus");
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = document.getElementById("desc_bus");
                        input.focus();
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* **************************************** */}

          {/* Second Side */}
          {/* Second Side */}
          {/* Second Side */}
          <div className="w-full max-w-2xl">
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
                      //   selected={corporate.p_date_ofincorp ? new Date(corporate.p_date_ofincorp) : null}
                      id="date_of_incorp"
                      onChange={(date) =>
                        handleChangeCorporateInfo("p_date_ofincorp", date)
                      }
                      dateFormat="dd-MM-yyyy"
                      placeholderText="dd-mm-yyyy"
                      // style={{width:"300px"}}
                      className="w-[350px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                    />
                  </div>
                  {/* <InputField 
                          type="date"
                          name='p_date_ofincorp'
                          id='date_of_incorp'
                          inputWidth={'100%'}
                          value={corporate.p_date_ofincorp}
                          // onChange={(e) => {handleChangeCorporateInfo('p_date_ofincorp', e.target.value)}}
                          onChange={handleChangeCorporateInfo}
                          onKeyPress={(e) => {
                            // console.log(document.getElementById('street_name'), "fighting")
                            switchFocus(e, 'street_name');
                            setTimeout(() => {

                              if (document.getElementById('street_name')) {
                                document.getElementById('street_name');
                              }
                            }, 500);
                          }}
                          // min={new Date().toISOString().split('T')[0]}
                        /> */}
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
                        id="minor"
                        type="radio"
                        name="p_corp_comm_mode"
                        value={option.value}
                        // value={dataApproval?.corporatDetailData[0]?.EMAIL}
                        checked={dataApproval?.corporatDetailData[0]?.EMAIL === option.value}
                        onChange={() =>
                          handleChangeCorporateInfo(
                            "p_corp_comm_mode",
                            option.value
                          )
                        }
                        onKeyDown={(e) => {
                          switchFocus(e, "location");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = document.getElementById("location");
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
                    marginBottom={"8px"}
                    name="p_corp_phoneno"
                    value={dataApproval?.corporatDetailData[0]?.PHONE}
                    onChange={(value) =>
                      handleChangeCorporateInfo("p_corp_phoneno", value)
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
                  {/* <InputField 
                        type="text"
                        id={'pri_phone_no'}
                        inputWidth={'100%'}
                        name="p_corp_phoneno"
                        value={corporate.p_corp_phoneno || ""}
                        onChange={(e) => {handleChangeCorporateInfo('p_corp_phoneno', e.target.value)}}
                        onKeyPress={(e) => {
                          // console.log(document.getElementById('street_name'), "fighting")
                          switchFocus(e, 'postal_address');
                          setTimeout(() => {

                            if (document.getElementById('postal_address')) {
                              document.getElementById('postal_address');
                            }
                          }, 500);
                        }}
                      /> */}
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
                    name="p_corp_tinno"
                    // value={corporate.p_corp_tinno || ""}
                    onChange={(e) => {
                      handleChangeCorporateInfo("p_corp_tinno", e.target.value);
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
                  {/* {errors.p_corp_tinno && <div style={{font:'red'}} className="ml-5">{errors.p_corp_tinno}</div>} */}
                  {/* ...other input fields and validation messages */}
                </div>
              </div>
            </div>

            {/* Fax Number*/}
            {/* <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3 text-right">
                      <Label label="Fax Number" fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 ">
                      <InputField type="text" />
                  </div>
              </div>
            </div> */}

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
                    id={"comp_reg"}
                    inputWidth={"100%"}
                    name="p_corp_reqisterno"
                    // value={corporate.p_corp_reqisterno || ""}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "p_corp_reqisterno",
                        e.target.value
                      );
                    }}
                    onKeyPress={(e) => {
                      // console.log(document.getElementById('street_name'), "fighting")
                      switchFocus(e, "email");
                      setTimeout(() => {
                        if (document.getElementById("email")) {
                          document.getElementById("email");
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
                        id="bank_sist"
                        type="radio"
                        name="p_banksiscomp"
                        value={option.value}
                        // checked={corporate.p_banksiscomp === option.value}
                        checked={dataApproval?.corporatDetailData[0]?.PHONE === option.value}
                        onChange={() =>
                          handleChangeCorporateInfo(
                            "p_banksiscomp",
                            option.value
                          )
                        }
                        onKeyDown={(e) => {
                          switchFocus(e, "preferred_lang");
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input =
                              document.getElementById("preferred_lang");
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

            {/* Description Of Business */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3 text-right">
                  <Label label="Description Of Business" fontSize="85%" />
                </div>
                <div class="md:w-2/3 md:mr-2">
                  <InputField
                    type="text"
                    id={"desc_bus"}
                    inputWidth={"100%"}
                    name="p_businessdesc"
                    value={dataApproval?.corporatDetailData[0]?.BUSINESS_DESCRIPTION}
                    onChange={(e) => {
                      handleChangeCorporateInfo(
                        "p_businessdesc",
                        e.target.value
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-end mr-5">
          <ButtonComponent label="Save" buttonBackgroundColor="green" buttonWidth="120px" buttonHeight="30px" />
        </div> */}
      </div>
    </div>
  );
};

export default CorporateBank;
