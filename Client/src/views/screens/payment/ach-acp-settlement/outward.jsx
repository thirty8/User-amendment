import React, {useState} from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from 'axios'
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TextAreaField from "../../../../../components/others/Fields/TextArea";

function Outward(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
      return(
        <div>
            <div>
            <div>
          <ActionButtons />
    
          </div>
          <hr />
          <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-evenly",
                  backgroundColor: "",
                  marginBottom: "15px"
                }}
              >
                <div style={{ backgroundColor: "", flex: 0.35}}>
                  <InputField
                   label={"Beneficiary Account"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                 
                   marginBottom="20px"
                  />
                </div>
               
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.4}}>
                  <InputField
                   label={"Cheque Amount"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   type={"number"}
                   marginBottom="20px"
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.35}}>
                <InputField
                   label={"BSL Document Ref"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   required={true}
                   marginBottom="20px"
                  />
                </div>
               
                </div>
                <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-evenly",
                  backgroundColor: "",
                  marginBottom: "15px"
                }}
              >
                <div style={{ backgroundColor: "", flex: 0.35}}>
                  <InputField
                   label={"Beneficiary Name"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   marginBottom="20px"
                   type={"number"}
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.4}}>
                  <InputField
                   label={"Cheque Number"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   
                   marginBottom="20px"
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.35}}>
                  <InputField
                   label={"Value Date"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   type={"date"}
                   marginBottom="20px"
                  />
                </div>
                </div>
                <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-evenly",
                  backgroundColor: "",
                  marginBottom: "15px"
                }}
              >
                <div style={{ backgroundColor: "", flex: 0.35}}>
                  <TextAreaField
                   label={"Transaction Narration"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   marginBottom="20px"
                 
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.4}}>
                <SelectField
                   label={"Currency"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   required= {true}
                   marginBottom="20px"
                  />
                </div>
                <div className="small-space"></div>
                <div style={{ backgroundColor: "", flex: 0.35}}>
                 <SelectField
                   label={"ACH/ACP"}
                   labelWidth={"40%"}
                   inputWidth={"60%"}
                   required= {true}
                   marginBottom="20px"
                  />
                </div>
                </div>
                <hr />
                <div  style={{
                  display: "flex",
                  //flex: 1,
                  justifyContent: "center",
                  backgroundColor: "",
                  marginBottom: "15px",
                 
                }}>
                   <div className="small-space" style={{background:"", paddingRight: "10px"}}>
                   <ButtonComponent
                              label="ACP SET REPORT"
                              //buttonBackgroundColor=getTheme.theme.navBarColor,
                              buttonWidth="100%"
                              buttonHeight="25px"
                              buttonColor="white"
                              marginBottom="25px"
                            
                            />
                   </div>
                   <div className="small-space" style={{background:"", paddingRight: "10px"}}>
                   <ButtonComponent
                              label="ACH SET REPORT"
                              //buttonBackgroundColor=getTheme.theme.navBarColor,
                              buttonWidth="100%"
                              buttonHeight="25px"
                              buttonColor="white"
                              marginBottom="25px"
                            
                            />
                   </div>
                       
                          
                        
                          
                          
                           
                  </div>
                
                  <header
                    className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                    style={{
                      background:
                      `url(` +
                      window.location.origin +
                      `/assets/images/headerBackground/` +
                      getTheme.theme.headerImage +
                      `)`,
    
                     textAlign: "center",
                     marginLeft: '-16px',
                     marginRight: '-16px',
                     //marginTop: 'px'
                    }}
                  >
                  ACH/ACP Outward Settlement
                  </header> 
                  &nbsp;
                  <DataTable
                  columns={[
                    "Entry Date/Time",
                    "Batch ID",
                    "Reference No.", 
                  "Amount", 
                  "Drawer", 
                  "Beneficiary Name",
                  "Receiving Bank",
                  "Value Date",
                   "ACH/ACP", 
                   "View", 
                   "Cheque",
                  
                ]}
                  />
            </div>
        </div>
      );
}
export default Outward;