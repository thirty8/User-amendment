import React, { useState, useEffect } from "react";
import Label from "../../../../../components/others/Label/Label";
import axios from "axios";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "./comp/InputField";
import ListOfValue from "./comp/ListOfValue";
import Phone_number from "./comp/Phone_number";
const host = window.location.host;

function Shares() {
  const [relationship, setRelationship] = useState("");
  const [iDType, setIDType] = useState("");

  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  ////// // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const genderOptions = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const maritalStatus = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Divorce', label: 'Divorce' }
  ];

  useEffect(() => {
    const getCountry = () => {
      axios
        .post(
          API_SERVER + "/api/get-code-details",
          {
            code: "HRD",
          },
          { headers }
        )
        .then(function (response) {
          //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          //  console.log("getCountry :", response.data);
          setIDType(response.data);
        });
    };

    getCountry();
  }, []);

  useEffect(() => {
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
    getRelationships();
  }, []);

  return (
    <div className="bg-white">
      {/* First Tab */}
      <form
      //onSubmit={handleSubmitNextOfKin}
      >
        <div className="flex items-center justify-center space-x-20">
          {/* Full Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Full Name" fontSize="85%" required={true} />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin"
                  // value={nextOfKingData.p_next_of_kin}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin("p_next_of_kin", e.target.value)
                  // }
                />
              </div>
            </div>
          </div>

          {/* Relation Type */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Gender" required={true} fontSize="85%" />
              </div>
              <div className="ml-5">
                <div>
                  {genderOptions.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        id="gender"
                        type="radio"
                        name="P_gender"
                        value={option.value}
                        // checked={formData.P_gender === option.value}
                        // onChange={() => handleChange('P_gender', option.value)}
                        // onKeyDown={(e)=>{switchFocus(e,"firstname")
                        // if (e.key === "Enter"){
                        //   e.preventDefault();
                        //   const input = document.getElementById("firstname");
                        //   input.focus()
                        // }
                        // }}
                      />{" "}
                      {option.label}
                    </label>
                  ))}
                </div>

                {/* {formData.P_gender === 'Other' && (
                    <div class="md:flex md:items-center  mb-1 ">
                      <div class="">
                        <Label label="Others" fontSize="85%" />
                      </div>
                      <div class=" ">
                        <InputField
                        // label="Others"
                         inputWidth='220px'
                         type="text"
                         name="P_otherGender" 
                         placeholder={'Please Specify'}
                         value={formData.P_otherGender}
                         onChange={handleChange}
                        />
                      </div>
                    </div>
                  )} */}
              </div>
              {/* <div className="md:w-2/3 ">
                <ListOfValue
                  data={relationship}
                  // inputWidth="100%"
                  inputWidth="300px"
                  // value={nextOfKingData.p_next_of_kin_relationship}
                  // onChange={(value) =>
                  //   handleChangeNextOfKin("p_next_of_kin_relationship", value)
                  // }
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* ID Type */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Country" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  data={iDType}
                  inputWidth="300px"
                  // value={nextOfKingData.p_next_of_kin_id_type}
                  // onChange={(value) =>
                  //   handleChangeNextOfKin("p_next_of_kin_id_type", value)
                  // }
                />
              </div>
            </div>
          </div>

          {/* ID Number */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Marital status" required={true} fontSize="85%" />
              </div>
              <div className="ml-5">
                {maritalStatus.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center mr-4"
                  >
                    <input
                      id="marrital"
                      type="radio"
                      name="P_MarritalStatus"
                      value={option.value}
                      // onKeyDown={(e) => {
                      //   switchFocus(e, "preferredLanguage");
                      //   if (e.key === "Enter") {
                      //     e.preventDefault();
                      //     const input =
                      //       document.getElementById("preferredLanguage");
                      //     input.focus();
                      //   }
                      // }}
                      // checked={formData.P_gender === option.value}
                      // onChange={() => handleChange('P_gender', option.value)}
                      // onKeyDown={(e)=>{switchFocus(e,"firstname")
                      // if (e.key === "Enter"){
                      //   e.preventDefault();
                      //   const input = document.getElementById("firstname");
                      //   input.focus()
                      // }
                      // }}
                    />{" "}
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Expiry Date */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Nationality" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <ListOfValue
                  data={iDType}
                  inputWidth="300px"
                  // value={nextOfKingData.p_next_of_kin_id_type}
                  // onChange={(value) =>
                  //   handleChangeNextOfKin("p_next_of_kin_id_type", value)
                  // }
                />
              </div>
            </div>
          </div>

          {/* Relationship */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="ID/Passport No." required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  type={"text"}
                  name="p_next_of_kin_address"
                  // value={nextOfKingData.p_next_of_kin_address}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin(
                  //     "p_next_of_kin_address",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date Of Birth */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Passport Expiry date"
                  required={true}
                  fontSize="85%"
                />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  type={"date"}
                  name="p_next_of_kin_dob"
                  // value={nextOfKingData.p_next_of_kin_dob}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin("p_next_of_kin_dob", e.target.value)
                  // }
                />
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="PIN Number" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                {/* <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_percentshare"
                  value={nextOfKingData.p_next_of_kin_percentshare}
                  onChange={(e) =>
                    handleChangeNextOfKin(
                      "p_next_of_kin_percentshare",
                      e.target.value
                    )
                  }
                /> */}

                <InputField
                  inputWidth="300px"
                  name="Postal address"
                  className="text-right"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date Of Birth */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Postal code" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  type={"text"}
                  // name="p_next_of_kin_dob"
                  // value={nextOfKingData.p_next_of_kin_dob}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin("p_next_of_kin_dob", e.target.value)
                  // }
                />
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Town/ City" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                {/* <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_percentshare"
                  value={nextOfKingData.p_next_of_kin_percentshare}
                  onChange={(e) =>
                    handleChangeNextOfKin(
                      "p_next_of_kin_percentshare",
                      e.target.value
                    )
                  }
                /> */}

                <InputField
                  inputWidth="300px"
                  name="Country"
                  className="text-right"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date Of Birth */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Phone Number" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                {/* <InputField 
                    inputWidth="300px"
                    name="p_next_of_kin_phone"
                    value={nextOfKingData.p_next_of_kin_phone}
                    onChange={(e) => handleChangeNextOfKin('p_next_of_kin_phone', e.target.value)}
                  /> */}
                <Phone_number
                  marginBottom={"8px"}
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(value) =>
                  //   handleChangeNextOfKin("p_next_of_kin_phone", value)
                  // }
                  inputWidth={"84%"}
                />
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Shareholding %" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  textAlign={"right"}
                  name="p_next_of_kin_percentshare"
                  // value={nextOfKingData.p_next_of_kin_percentshare}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin(
                  //     "p_next_of_kin_percentshare",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date Of Birth */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Physical address"
                  required={true}
                  fontSize="85%"
                />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(e) => handleChangeNextOfKin('p_next_of_kin_phone', e.target.value)}
                />
                {/* <Phone_number
                  marginBottom={"8px"}
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(value) =>
                  //   handleChangeNextOfKin("p_next_of_kin_phone", value)
                  // }
                  inputWidth={"84%"}
                /> */}
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Street name" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  textAlign={"right"}
                  name="p_next_of_kin_percentshare"
                  // value={nextOfKingData.p_next_of_kin_percentshare}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin(
                  //     "p_next_of_kin_percentshare",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date Of Birth */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Estate" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(e) => handleChangeNextOfKin('p_next_of_kin_phone', e.target.value)}
                />
                {/* <Phone_number
                  marginBottom={"8px"}
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(value) =>
                  //   handleChangeNextOfKin("p_next_of_kin_phone", value)
                  // }
                  inputWidth={"84%"}
                /> */}
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Hse/L.R No." fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  textAlign={"right"}
                  name="p_next_of_kin_percentshare"
                  // value={nextOfKingData.p_next_of_kin_percentshare}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin(
                  //     "p_next_of_kin_percentshare",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date Of Birth */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Tel Off." fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(e) => handleChangeNextOfKin('p_next_of_kin_phone', e.target.value)}
                />
                {/* <Phone_number
                  marginBottom={"8px"}
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(value) =>
                  //   handleChangeNextOfKin("p_next_of_kin_phone", value)
                  // }
                  inputWidth={"84%"}
                /> */}
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Tel Home" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  textAlign={"right"}
                  name="p_next_of_kin_percentshare"
                  // value={nextOfKingData.p_next_of_kin_percentshare}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin(
                  //     "p_next_of_kin_percentshare",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date Of Birth */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Email" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(e) => handleChangeNextOfKin('p_next_of_kin_phone', e.target.value)}
                />
                {/* <Phone_number
                  marginBottom={"8px"}
                  name="p_next_of_kin_phone"
                  // value={nextOfKingData.p_next_of_kin_phone}
                  // onChange={(value) =>
                  //   handleChangeNextOfKin("p_next_of_kin_phone", value)
                  // }
                  inputWidth={"84%"}
                /> */}
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2 invisible">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Email" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  textAlign={"right"}
                  name="p_next_of_kin_percentshare"
                  // value={nextOfKingData.p_next_of_kin_percentshare}
                  // onChange={(e) =>
                  //   handleChangeNextOfKin(
                  //     "p_next_of_kin_percentshare",
                  //     e.target.value
                  //   )
                  // }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="overflow-x-auto mt-2">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-green-700">
              <th className="px-4 py-1 border text-white">Full Name</th>
              <th className="px-4 py-1 border text-white">Gender</th>
              <th className="px-4 py-1 border text-white">Phone Number</th>
              <th className="px-4 py-1 border text-white">Email</th>
              <th className="px-4 py-1 border text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {tableDataNok.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td>{data.p_next_of_kin}</td>
                <td>{data.p_next_of_kin_id_type}</td>
                <td>{data.p_next_of_kin_id_no}</td>
                <td>{data.p_next_of_kin_phone}</td>
                <td>{data.p_next_of_kin_dob}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Shares;
