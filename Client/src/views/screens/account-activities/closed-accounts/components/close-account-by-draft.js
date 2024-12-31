// import React, { useState, useEffect } from "react";
// import ScreenBase3 from "../../m/SreenBase3";
// import InnerCards from "../cards/inner-cards";
// import InputField from "../../../../../components/others/Fields/InputField";
// import ButtonType from "../../../../../components/others/Button/ButtonType";
// import CustomTable from "../../../../../components/others/customtable";
// import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
// import AccountSummary from "../../../../../components/others/AccountSummary";
// import { API_SERVER } from "../../../../../config/constant";
// import swal from "sweetalert";
// import axios from "axios";
// import { MDBIcon } from "mdbreact";
// import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";



// function AccountCloseByDraft() {
//   const headers = {
//     "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };


//   const [accountNumber, SetAccountNumber] = useState("");
//   const [accountDetails, setAccountDetails] = useState({});
//   const [branch , setBranch]= useState([]);
//   const [getTheme, setTheme] = useState(
//     JSON.parse(localStorage.getItem("theme"))
//   );

//   useEffect(() => {
//     async function getBranch(){
//       let response= await axios.post(  API_SERVER +"/api/get-code-details", {
//               code: "BRA",
//             }, 
//             {
//               headers,
//             })
//             setBranch(response.data)
//             console.log(response.data)
//           }
//           getBranch()

// }, []);

//   function switchFocus(e, nextFieldId) {
//     if (e.key === "Enter") {
//       document.getElementById(nextFieldId).focus();
//       console.log(document.getElementById(nextFieldId), "component");
//     }
//   }

//   return (
//     <div>
//         <ActionButtons

        
//         />
     
      
//       <ScreenBase3
//         card_div1a={
//           <div>
//             <InnerCards
//               innercarddiv={
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                   }}
//                 >
//                   <div style={{ flex: 0.1 }}></div>
//                   <div style={{ flex: 0.8 }}>
//                     <InputField
//                       label={"Transaction Type"}
//                       labelWidth={"15%"}
//                       disabled={true}
//                       inputWidth={"53%"}
//                     />
//                   </div>
//                   <div style={{ flex: 0.1 }}></div>
//                 </div>
               
//               }
//             />

//             <div style={{ marginTop: "20px" }}>
//               <InnerCards
//                 innercarddiv={
//                   <div>
//                   <div style={{ display: "flex" }}>
//                     <div style={{ flex: "0.7" }}>
//                       <div style={{ display: "flex", marginBottom: "15px" }}>
//                         <div style={{ flex: "0.45" }}>
//                           <InputField
//                             id={"TransferAcct"}
//                             label={" Account Number"}
//                             labelWidth={"45%"}
//                             value={accountNumber}
//                             // type={"number"}
//                             maxLength={"21"}
//                             inputWidth="50%"
//                             onChange={(e) => SetAccountNumber(e.target.value)}
//                             // onKeyDown={Transfer_account_name}
//                             // onKeyPress={(e) => {
//                             //   switchFocus(e, "Creason");
//                             // }}
//                           />
//                         </div>
//                         <div style={{ flex: "0.55" }}>
//                           <InputField
//                             label={"Account Name"}
//                             labelWidth={"23%"}
//                             inputWidth="77%"
//                             disabled={true}
//                             // value={getdata2[0]?.account_descrp}
//                           />
//                         </div>
//                       </div>

//                       <div style={{ display: "flex", marginBottom: "15px" }}>
//                         <div style={{ flex: "0.45" }}>
//                           <InputField
//                             id={"Currency"}
//                             label={"Currency"}
//                             labelWidth={"45%"}
//                             // type={"number"}
//                             maxLength={"21"}
//                             inputWidth="30%"

//                             // onKeyDown={Transfer_account_name}
//                             // onKeyPress={(e) => {
//                             //   switchFocus(e, "Creason");
//                             // }}
//                           />
//                         </div>
//                         <div style={{ flex: "0.55" }}>
//                           <InputField
//                             label={"Branch"}
//                             labelWidth={"23%"}
//                             inputWidth="77%"
//                             disabled={true}
//                             // value={getdata2[0]?.account_descrp}
//                           />
//                         </div>
//                       </div>
//                       <p
//                         style={{
//                           fontSize: "20px",
//                           color: "red",
//                           fontWeight: "bold",
//                           marginBottom: "20px",
//                         }}
//                       >
//                         Do not Add Commission To The Draft Amount
//                       </p>

//                       <div style={{ display: "flex" }} >
//                         <div
//                           style={{
//                             display: "flex",
//                             flex: "0.42",
//                             marginBottom: "15px",
//                           }}
//                           className="space-x-11"
//                         >
//                           <label style={{flex:"0.75"}}>Draft Amount</label>
//                           <ButtonType 
//                             name={"Draft Amount"}
//                             label={"For Account Closure"}
//                             type={"checkbox"}
//                             labelWidth={"70%"}
//                           />
//                         </div>
//                         <div style={{ flex: "0.15 " }}>
//                           <InputField
                            
//                             required={false}
//                             inputWidth="80%"
//                             disabled={false}
//                             // type={"date"}
//                             // value={dateOl}
//                           />
//                         </div>
//                         <div style={{ flex: "0.43" }}>
//                           <InputField
                        
//                             required={false}
//                             inputWidth="100%"
//                             labelWidth={"2%"}
//                             disabled={true}
//                             l
//                             // value={level}
//                           />
//                         </div>
//                       </div>

//                       <div style={{ display: "flex" ,marginBottom: "15px",}}>
//                         <div style={{ flex: "0.48" }}>
//                           <InputField
//                             label={"Cheque Number"}nch
//                             labelWidth={"42%"}
//                             required={false}
//                             inputWidth="45%"
//                             disabled={false}
//                             // type={"date"}
//                             // value={dateOpened}
//                           />
//                         </div>
//                         <div style={{ flex: "0.52" }}>
//                           <ListOfValue
//                             label={"Select Branch"}
//                             labelWidth={"40%"}
//                             required={false}
//                             inputWidth="100%"
//                             disabled={false}
//                             data={branch}
//                             // type={"date"}
//                             // value={dateOl}
//                           />
//                         </div>
                       
//                       </div>
//                       <div></div>
//                       <hr />
//                       <div style={{ marginBottom: "15px",  marginTop:"15px"}}>
//                         <InputField label={"Purchaser"} labelWidth={"20%  "} />
//                       </div>

//                       <div style={{ flex: "0.4", marginBottom: "15px" }}>
//                         <InputField
//                           label={"Purchaser Address"}
//                           labelWidth={"20%  "}
//                         />
//                       </div>
//                       <div style={{ flex: "0.4", marginBottom: "15px" }}>
//                         <InputField
//                           label={"Beneficiary"}
//                           labelWidth={"20%  "}
//                         />
//                       </div>
//                       <div style={{ flex: "0.4", marginBottom: "15px" }}>
//                         <InputField
//                           label={"Beneficiary Address"}
//                           labelWidth={"20%  "}
//                         />
//                       </div>
//                       <div style={{ flex: "0.4", marginBottom: "15px" }}>
//                         <InputField
//                           label={"Transaction Details"}
//                           labelWidth={"20%  "}
//                         />
//                       </div>
                      

                      
//                     </div>
//                     <div style={{ flex: "0.3", marginLeft: "15px" }}>
//                       <InnerCards
//                         innercarddiv={
//                           <div>
//                             <AccountSummary
//                               accountNumber={accountNumber}
//                               setAccountDetails={setAccountDetails}
//                             />
//                           </div>
//                         }
//                       />
//                     </div>
//                   </div>
//                        <hr />
//                  <CustomTable
//                   columns={["Charge Code","Fee Account","Fee Account Description","Fees Description","Fee Amount Per Book", "Currency","" ]}
//                   data={[[]]}
//                   /> 
//                   </div>
                  
//                 }
//               />
//             </div>
//           </div>
//         }
//       />
//     </div>
//   );
// }

// export default AccountCloseByDraft;

import React, { useState, useEffect } from "react";
import ScreenBase3 from "../../m/SreenBase3";
import InnerCards from "../cards/inner-cards";
import InputField from "../../../../../components/others/Fields/InputField";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import CustomTable from "../../../../../components/others/customtable";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import AccountSummary from "../../../../../components/others/AccountSummary";
import { API_SERVER } from "../../../../../config/constant";
import swal from "sweetalert";
import axios from "axios";
import { MDBIcon } from "mdbreact";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";



function AccountCloseByDraft() {
  const headers = {
    "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };


  const [accountNumber, SetAccountNumber] = useState("");
  const [accountDetails, setAccountDetails] = useState({});
  const [branch , setBranch]= useState([]);
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  useEffect(() => {
    //this is the view used to display the lov branch
    async function getBranch(){
      let response= await axios.post(  API_SERVER +"/api/get-code-details", {
              code: "BRA",
            }, 
            {
              headers,
            })
            setBranch(response.data)
            console.log(response.data)
          }
          getBranch()

}, []);
const handleExitClick = () => {
  if (document.getElementById("exitBTN1")) {
    const exitBTN = document.getElementById("exitBTN1");
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    exitBTN.dispatchEvent(clickEvent);
  }
};

  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
      console.log(document.getElementById(nextFieldId), "component");
    }
  }

  return (
    <div>
        <ActionButtons

        
        />
     
      
      <ScreenBase3
        card_div1a={
          <div>
            <InnerCards
              innercarddiv={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ flex: 0.1 }}></div>
                  <div style={{ flex: 0.8 }}>
                    <InputField
                      label={"Transaction Type"}
                      labelWidth={"15%"}
                      disabled={true}
                      inputWidth={"53%"}
                    />
                  </div>
                  <div style={{ flex: 0.1 }}></div>
                </div>
               
              }
            />

            <div style={{ marginTop: "20px" }}>
              <InnerCards
                innercarddiv={
                  <div>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "0.7" }}>
                      <div style={{ display: "flex", marginBottom: "15px" }}>
                        <div style={{ flex: "0.45" }}>
                          <InputField
                            id={"TransferAcct"}
                            label={" Account Number"}
                            labelWidth={"45%"}
                            value={accountNumber}
                            // type={"number"}
                            maxLength={"21"}
                            inputWidth="50%"
                            onChange={(e) => SetAccountNumber(e.target.value)}
                            // onKeyDown={Transfer_account_name}
                            // onKeyPress={(e) => {
                            //   switchFocus(e, "Creason");
                            // }}
                          />
                        </div>
                        <div style={{ flex: "0.55" }}>
                          <InputField
                            label={"Account Name"}
                            labelWidth={"23%"}
                            inputWidth="77%"
                            disabled={true}
                            // value={getdata2[0]?.account_descrp}
                          />
                        </div>
                      </div>

                      <div style={{ display: "flex", marginBottom: "15px" }}>
                        <div style={{ flex: "0.45" }}>
                          <InputField
                            id={"Currency"}
                            label={"Currency"}
                            labelWidth={"45%"}
                            // type={"number"}
                            maxLength={"21"}
                            inputWidth="30%"

                            // onKeyDown={Transfer_account_name}
                            // onKeyPress={(e) => {
                            //   switchFocus(e, "Creason");
                            // }}
                          />
                        </div>
                        <div style={{ flex: "0.55" }}>
                          <InputField
                            label={"Branch"}
                            labelWidth={"23%"}
                            inputWidth="77%"
                            disabled={true}
                            // value={getdata2[0]?.account_descrp}
                          />
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: "20px",
                          color: "red",
                          fontWeight: "bold",
                          marginBottom: "20px",
                        }}
                      >
                        Do not Add Commission To The Draft Amount
                      </p>

                      <div style={{ display: "flex" }} >
                        <div
                          style={{
                            display: "flex",
                            flex: "0.42",
                            marginBottom: "15px",
                          }}
                          className="space-x-11"
                        >
                          <label style={{flex:"0.75"}}>Draft Amount</label>
                          <ButtonType 
                            name={"Draft Amount"}
                            label={"For Account Closure"}
                            type={"checkbox"}
                            labelWidth={"70%"}
                          />
                        </div>
                        <div style={{ flex: "0.15 " }}>
                          <InputField
                            
                            required={false}
                            inputWidth="80%"
                            disabled={false}
                            // type={"date"}
                            // value={dateOl}
                          />
                        </div>
                        <div style={{ flex: "0.43" }}>
                          <InputField
                        
                            required={false}
                            inputWidth="100%"
                            labelWidth={"2%"}
                            disabled={true}
                            l
                            // value={level}
                          />
                        </div>
                      </div>

                      <div style={{ display: "flex" ,marginBottom: "15px",}}>
                        <div style={{ flex: "0.48" }}>
                          <InputField
                            label={"Cheque Number"}nch
                            labelWidth={"42%"}
                            required={false}
                            inputWidth="45%"
                            disabled={false}
                            // type={"date"}
                            // value={dateOpened}
                          />
                        </div>
                        <div style={{ flex: "0.52" }}>
                          <ListOfValue
                            label={"Select Branch"}
                            labelWidth={"40%"}
                            required={false}
                            inputWidth="100%"
                            disabled={false}
                            data={branch}
                            // type={"date"}
                            // value={dateOl}
                          />
                        </div>
                       
                      </div>
                      <div></div>
                      <hr />
                      <div style={{ marginBottom: "15px",  marginTop:"15px"}}>
                        <InputField label={"Purchaser"} labelWidth={"20%  "} />
                      </div>

                      <div style={{ flex: "0.4", marginBottom: "15px" }}>
                        <InputField
                          label={"Purchaser Address"}
                          labelWidth={"20%  "}
                        />
                      </div>
                      <div style={{ flex: "0.4", marginBottom: "15px" }}>
                        <InputField
                          label={"Beneficiary"}
                          labelWidth={"20%  "}
                        />
                      </div>
                      <div style={{ flex: "0.4", marginBottom: "15px" }}>
                        <InputField
                          label={"Beneficiary Address"}
                          labelWidth={"20%  "}
                        />
                      </div>
                      <div style={{ flex: "0.4", marginBottom: "15px" }}>
                        <InputField
                          label={"Transaction Details"}
                          labelWidth={"20%  "}
                        />
                      </div>
                      

                      
                    </div>
                    <div style={{ flex: "0.3", marginLeft: "15px" }}>
                      <InnerCards
                        innercarddiv={
                          <div>
                            <AccountSummary
                              accountNumber={accountNumber}
                              setAccountDetails={setAccountDetails}
                            />
                          </div>
                        }
                      />
                    </div>
                  </div>
                       <hr />
                 <CustomTable
                  columns={["Charge Code","Fee Account","Fee Account Description","Fees Description","Fee Amount Per Book", "Currency","" ]}
                  data={[[]]}
                  /> 
                  </div>
                  
                }
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default AccountCloseByDraft;
