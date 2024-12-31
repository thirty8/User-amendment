import React, { useState, useEffect } from "react";
import Label from "../../../../../../../../components/others/Label/Label";
import axios from 'axios'
import swal from 'sweetalert'
import {API_SERVER} from '../../../../../../../../config/constant'
import InputField from "./comp/InputField";
import ListOfValue from "./comp/ListOfValue";
import { AiOutlineEye } from "react-icons/ai";


function Next_Kin_tab({selectedDataNOK, handleViewClickNOK, dataApproval, nextOfKingData, tableDataNok, handleClearTable, handleChangeNextOfKin, handleSubmitNextOfKin}) {

  const [relationship, setRelationship] = useState('');
  const [iDType, setIDType] = useState('');


  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  const headers={
    'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'Content-Type': 'application/json'
  };

 

  

////// // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





useEffect(() => {
  const getCountry = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "HRD",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("getCountry", JSON.stringify(response.data));
       //  console.log("getCountry :", response.data);
        setIDType(response.data)
      });
  };

  getCountry()
},[])


useEffect(() => {
  // Relationship
  const getRelationships = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "RRE",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("title", JSON.stringify(response.data));
        setRelationship(response.data);
      });
  };
  getRelationships()
  },[])



  return (
    <div className="bg-white">
      <div className="overflow-x-auto mt-2 mb-5 border">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-sky-700">
              <th className="px-4 py-1 border text-white">Next of Kin Name</th>
              <th className="px-4 py-1 border text-white">
                Next of Kin ID Type
              </th>
              <th className="px-4 py-1 border text-white">
                Next of Kin ID Number
              </th>
              <th className="px-4 py-1 border text-white">
                Next of Kin Phone Number
              </th>
              <th className="px-4 py-1 border text-white">
                Next of Kin Date Of Bith
              </th>
              <th className="px-4 py-1 border text-white">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {dataApproval.nextOfKinData?.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100 m-2" : "bg-white m-2"}
              >
                <td className="">{data.NEXT_OF_KIN}</td>
                <td>{data.NEXT_OF_KIN_ID_TYPE_DESC}</td>
                <td className="text-center">{data.NEXT_OF_KIN_ID_NO}</td>
                <td className="text-center">{data.NEXT_OF_KIN_PHONE}</td>
                <td>{data.NEXT_OF_KIN_DOB}</td>
                <td className="flex justify-center">
                  <div className="text-center border p-2 shadow-md cursor-pointer bg-sky-500 rounded-md">
                    <AiOutlineEye
                      className="text-white"
                      onClick={() => handleViewClickNOK(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* First Tab */}
      <form onSubmit={handleSubmitNextOfKin}>
        <div className="flex items-center justify-center space-x-20">
          {/* Full Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Full Name" fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin"
                  // value={selectedDataNOK.NEXT_OF_KIN}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN
                      : ""
                  }
                  // onChange={(e) => handleChangeNextOfKin('p_next_of_kin', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Relation Type */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Relationship" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  data={relationship}
                  // inputWidth="100%"
                  inputWidth="300px"
                  // value={nextOfKingData.p_next_of_kin_relationship}
                  // value={selectedDataNOK.NEXT_OF_KIN_RELATIONSHIP}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_RELATIONSHIP
                      : ""
                  }
                  onChange={(value) =>
                    handleChangeNextOfKin("p_next_of_kin_relationship", value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* ID Type */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="ID Type" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <ListOfValue
                  data={iDType}
                  inputWidth="300px"
                  // value={nextOfKingData.p_next_of_kin_id_type}
                  // value={selectedDataNOK.NEXT_OF_KIN_ID_TYPE}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_ID_TYPE
                      : ""
                  }
                  onChange={(value) =>
                    handleChangeNextOfKin("p_next_of_kin_id_type", value)
                  }
                />
              </div>
            </div>
          </div>

          {/* ID Number */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="ID Number" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_id_no"
                  // value={nextOfKingData.p_next_of_kin_id_no}
                  // value={selectedDataNOK.NEXT_OF_KIN_ID_NO}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_ID_NO
                      : ""
                  }
                  onChange={(e) =>
                    handleChangeNextOfKin("p_next_of_kin_id_no", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Third Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Expiry Date */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Expiry Date" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  type={"text"}
                  name="p_next_of_kin_id_expdate"
                  // value={selectedDataNOK.NEXT_OF_KIN_ID_EXPDATE}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_ID_NO
                      : ""
                  }
                  onChange={(e) =>
                    handleChangeNextOfKin(
                      "p_next_of_kin_id_expdate",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Relationship */}
          <div class="w-full max-w-xl mt-2 ">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label label="Address" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  type={"text"}
                  name="p_next_of_kin_address"
                  // value={selectedDataNOK.NEXT_OF_KIN_ADDRESS}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_ADDRESS
                      : ""
                  }
                  onChange={(e) =>
                    handleChangeNextOfKin(
                      "p_next_of_kin_address",
                      e.target.value
                    )
                  }
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
              <div class="md:w-1/3">
                <Label label="Date of Bith" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  type={"text"}
                  name="p_next_of_kin_dob"
                  // value={selectedDataNOK.NEXT_OF_KIN_DOB}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_DOB
                      : ""
                  }
                  onChange={(e) =>
                    handleChangeNextOfKin("p_next_of_kin_dob", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label
                  label="Percentage Shared"
                  required={true}
                  fontSize="85%"
                />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_percentshare"
                  // value={selectedDataNOK.NEXT_OF_KIN_PERCENTSHARE}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_PERCENTSHARE
                      : ""
                  }
                  onChange={(e) =>
                    handleChangeNextOfKin(
                      "p_next_of_kin_percentshare",
                      e.target.value
                    )
                  }
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
              <div class="md:w-1/3">
                <Label label="Phone Number" required={true} fontSize="85%" />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  name="p_next_of_kin_phone"
                  // value={selectedDataNOK.NEXT_OF_KIN_PHONE}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_PHONE
                      : ""
                  }
                  onChange={(e) =>
                    handleChangeNextOfKin("p_next_of_kin_phone", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* % Shared */}
          <div class="w-full max-w-xl mt-2 invisible">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3">
                <Label
                  label="Percentage Shared"
                  required={true}
                  fontSize="85%"
                />
              </div>
              <div class="md:w-2/3 md:ml-[2px] ">
                <InputField
                  inputWidth="300px"
                  textAlign={"right"}
                  name="p_next_of_kin_percentshare"
                  // value={nextOfKingData.p_next_of_kin_percentshare}
                  value={
                    dataApproval.nextOfKinData?.length > 0
                      ? selectedDataNOK?.NEXT_OF_KIN_PERCENTSHARE
                      : ""
                  }
                  onChange={(e) =>
                    handleChangeNextOfKin(
                      "p_next_of_kin_percentshare",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-end">
          <button
                type="submit"
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
                Submit
          </button>
        </div> */}
      </form>

      {/* <div className="overflow-x-auto mt-2">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-green-700">
              <th className="px-4 py-1 border text-white">Next of Kin Name</th>
              <th className="px-4 py-1 border text-white">Next of Kin ID Type</th>
              <th className="px-4 py-1 border text-white">Next of Kin ID Number</th>
              <th className="px-4 py-1 border text-white">Next of Kin Phone Number</th>
              <th className="px-4 py-1 border text-white">Next of Kin Date Of Bith</th>
            </tr>
          </thead>
          <tbody>
            {dataApproval.nextOfKinData?.map((data, index) => (
              <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
                <td>{data.NEXT_OF_KIN}</td>
                <td>{data.NEXT_OF_KIN_ID_TYPE_DESC}</td>
                <td className="text-center">{data.NEXT_OF_KIN_ID_NO}</td>
                <td className="text-center">{data.NEXT_OF_KIN_PHONE}</td>
                <td>{data.NEXT_OF_KIN_DOB}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default Next_Kin_tab;