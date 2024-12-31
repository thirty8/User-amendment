import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Label from "../components/comp/InputField";
import axios from 'axios'
import swal from 'sweetalert'
// import {API_SERVER} from '../../../../../config/constant'
import ListOfValue from "./comp/ListOfValue";
import InputField from "./comp/InputField";
const host = window.location.host;




function Shares({effective, formData, formDataShares, handleSubmitShares, handleChangeShares}) {


  





  return (
    <form className="bg-white" onSubmit={handleSubmitShares}>
      <div>
        <div className="flex items-center justify-center">
        <div>
        {/* Type Of shares */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Effective Date" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                //   inputWidth={'75%'}
                  inputWidth="300px"
                  id="Middle"
                  disabled
                  value={effective}
                //   onChange={(e) => handleChangeShares('P_mname', e.target.value)}
                //   onKeyPress={(e) => {
                //     switchFocus(e, 'Surname');
                //    }}
                  // onChange={handleMiddleName}
                  name="P_TYPE_OF_SHARE"
                  // value={formDataShares.P_TYPE_OF_SHARE}
                  // onChange={handleChangeShares}
                />
              </div>
            </div>
          </div>



          {/* Transaction Type */}
          <div class="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Member Full Name" fontSize="85%" />
              </div>

              <div className="md:w-2/3 ">
                <InputField
                //   inputWidth={'75%'}
                  inputWidth="300px"
                  id="Middle"
                //   value={formData.P_mname}
                //   onChange={(e) => handleChangeShares('P_mname', e.target.value)}
                //   onKeyPress={(e) => {
                //     switchFocus(e, 'Surname');
                //    }}
                  // onChange={handleMiddleName}
                  name="P_TRANSACTION_TYPE"
                  value={`${formData.P_fname ?? ""} ${formData.P_mname ?? ""} ${formData.P_sname ?? ""}`}
                  // onChange={handleChangeShares}
                  disabled
                />
              </div>

            </div>
          </div>



          {/* Security Type ID */}
          <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Shares To Issue" fontSize="85%" />
              </div>
              <div className="md:w-2/3 ">
                <InputField
                //   inputWidth={'75%'}
                  inputWidth="300px"
                  id="Middle"
                  textAlign={'right'}
                //   value={formData.P_mname}
                //   onChange={(e) => handleChangeShares('P_mname', e.target.value)}
                //   onKeyPress={(e) => {
                //     switchFocus(e, 'Surname');
                //    }}
                  // onChange={handleMiddleName}
                  name="P_SECURITY_TYPE_ID"
                  // value={formDataShares.P_SECURITY_TYPE_ID}
                  // onChange={handleChangeShares}
                />
              </div>
            </div>
          </div>

           {/* Account Name */}
           <div class="w-full max-w-xl mt-2">
            <div class="md:flex md:items-center mb-2 ml-2">
              <div class="md:w-1/3 text-right">
                <Label label="Share Amount" fontSize="85%" v />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                //   inputWidth={'75%'}
                  inputWidth="300px"
                  id="Middle"
                  name="P_mname"
                  textAlign={'right'}
                //   value={formData.P_mname}
                //   onChange={(e) => handleChangeShares('P_mname', e.target.value)}
                //   onKeyPress={(e) => {
                //     switchFocus(e, 'Surname');
                //    }}
                  // onChange={handleMiddleName}
                />
              </div>
            </div>
          </div>

        </div>
        </div>

        


      
        
      </div>

        {/* <div className="">
          <button className="border border-gray-300 bg-sky-700 p-2" type="submit">Submit</button>
        </div> */}
    </form>
  );
}

export default Shares;