import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Label from "../../../../../../../../components/others/Label/Label";
import axios from 'axios'
import swal from 'sweetalert'
import {API_SERVER} from '../../../../../../../../config/constant'
import ListOfValue from "./comp/ListOfValue";
import InputField from "./comp/InputField";
const host = window.location.host;




function Shares() {


  
  const genderOptions = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const minorOpions = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const healthOpions = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const staffOpions = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const staffRelated = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const taxableflag = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];

  const DirectorRelated = [
    { value: 'N', label: 'No' },
    { value: 'Y', label: 'Yes' }
  ];


  const handleOptionChange = () => {

  }


const headers={
  'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  'Content-Type': 'application/json'
};

useEffect(() => {
  const getTitle = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "TIT",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("title", JSON.stringify(response.data));
        // setTitle(response.data);
        // console.log("Is this the Title ?::::",response.data);
      });
  };

  getTitle()
},[])

// console.log("Is this the Title ?::::", title)

// [{label: "hajhah" , value: "jksjks"}]


useEffect(() => {
  const getCountry = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "CON",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("getCountry", JSON.stringify(response.data));
       //  console.log("getCountry :", response.data);
        // setCountry(response.data)
      });
  };

  getCountry()
},[])


useEffect(() => {
  const getRegion = () => {
    axios
      .post(API_SERVER + "/api/get-code-details", {
        code: "REG",
      },{headers})
      .then(function (response) {
       //  localStorage.setItem("title", JSON.stringify(response.data));
    //    setRegion(response.data);
        // console.log("Is this the Title ?::::",response.data);
      });
  };

 getRegion()
},[])





function switchFocus(e, nextFieldId) {
  if (e.key === "Enter") {
    document.getElementById(nextFieldId).focus();
    }
}






  return (
    <form className="bg-white">
      <div>
        {/* First Tab */}
        <div className="flex items-center justify-center space-x-20">
          {/* Type Of shares */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Type Of shares" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/* Transaction Type */}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Transaction Type" fontSize="85%" />
              </div>

              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>

            </div>
          </div>
        </div>

        {/* Second Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-[10px]">
          {/* Security Type ID */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Security Type ID" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/* Account Name */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Account Name" fontSize="85%" v />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>

        {/* Third Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-[10px]">
          {/* Security */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Security" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/*Certificate Number*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Certificate Number" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>


        {/* Fifth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-[10px]">
          {/* Stop*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Stop" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/*Number of tax lots*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Number of tax lots" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>

        {/* Sixth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-[10px]">
          {/* Reason for reverse */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Reason for reverse" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/* Reason for transfer  */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Reason for transfer" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>

        {/* Seventh Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date of gift */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Date of gift" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/* Share market value per share on date of gift*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Fair&nbsp;market&nbsp;value&nbsp;on&nbsp;date&nbsp;of&nbsp;gift" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>

        {/* Eighth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Date of Death */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Date of death"
                  fontSize="85%"
                />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/* Minor */}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2 ml-2">
            <div class="md:w-1/3 text-right">
                <Label label="Fair&nbsp;market&nbsp;value&nbsp;on&nbsp;date&nbsp;of&nbsp;death" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>

        {/* Ninth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/*Base on level*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Base on level" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/* Cancel post split zero shares */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Cancel&nbsp;post&nbsp;split&nbsp;zero&nbsp;shares" fontSize="85%" />
              </div>

              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>

        {/* Tenth Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Health Challenge */}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Restriction"
                  fontSize="85%"
                />
              </div>

              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/* Date */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label
                  label="Date"
                  fontSize="85%"
                />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>

        {/* Last Tab */}
        <div className="flex items-center justify-center space-x-20 -mt-3">
          {/* Number of shares*/}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Number of shares" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>

          {/* Staff ID*/}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Total&nbsp;no.&nbsp;of&nbsp;shareholders" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                  <InputField 
                    disabled
                    id={"guardianid"}
                    inputWidth="300px"
                    name="P_Guardian_id"
                    // value={formData.P_Guardian_id}  
                  />
                    
                </div>
            </div>
          </div>
        </div>
      </div>
        
    </form>
  );
}

export default Shares;