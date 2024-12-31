import React, {useState} from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import InputField from "../../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../../components/others/Fields/SelectField";
import "../../../index.css"


function OTRS(){
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")));
    return(
        <div className="">
        <br />
        <div  style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-evenly",
          backgroundColor: "",
        }}>
              <div style={{ backgroundColor: "", flex: 0.4 }}>
             <SelectField 
                 label={"Details of Charges 71A"}
                 labelWidth={"40%"}
                 inputWidth={"50%"}
                 />
        </div>
        <div style={{ backgroundColor: "", flex: 0.4 }}>
             <SelectField 
                 label={"Bank Operation Code 23B"}
                 labelWidth={"42%"}
                 inputWidth={"50%"}
               
                 />
        </div>

        <div style={{ backgroundColor: "", flex: 0.4 }}>
             <InputField 
                 label={"Sender's Reference.20"}
                 labelWidth={"40%"}
                 inputWidth={"60%"}
                 disabled={true}
               
                 />
        </div>
            </div>
            &nbsp;
            <Card
            
            className="bg-light"
            border="light"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }} 
            >
                <Card.Body>
          <div style={{width:"100%",background: "" }}> 
          <div className="achc--payers" style={{background: ""}}>
          <div className="achc--payer"style={{background: ""}}>
                  <div className="account-name" style={{background: "", marginBottom: "15px"}}>
                    <InputField
                      label={"Sender Institution"}
                      labelWidth={"17%"}
                      inputWidth={"60%"}
                      disabled={true}
                      // marginBottom="20px"
                    />
                  </div>
                </div>
              

          </div>
          <div className="achc--payer"style={{background: "", justifyContent: "space-evenly",marginBottom: "15px"}}>
          <div className="amount">
          <InputField
                      label={"Ordering Cust A/c 50k"}
                      labelWidth={"35%"}
                      inputWidth={"50%"}
                      disabled={true}
                      // marginBottom="20px"
                    />
          </div>
          <div className="amount">
          <SelectField
                      label={"Instruct Code 23E"}
                      labelWidth={"42%"}
                      inputWidth={"50%"}
                      // marginBottom="20px"
                    />
          </div>
          
          <div className="amount">
          <SelectField
                      label={"Trans Type Code 26T"}
                      labelWidth={"38%"}
                      inputWidth={"60%"}
                      // marginBottom="20px"
                    />
          </div>
                   
                    </div>
                    <div className="achc--payer"style={{background: "", justifyContent: "space-between",marginBottom: "15px"}}>
                   <div className="currency" style={{background:""}}>
                   <InputField
                      label={"Customer Address 50k"}
                      labelWidth={"35%"}
                      inputWidth={"50%"}
                      disabled={true}
                      // marginBottom="20px"
                    />
                   </div>
                   <div className="currency"></div>
                   <div className="currency" style={{background: ""}}>
                   <InputField
                      label={"Address 3. 50k"}
                      labelWidth={"38%"}
                      inputWidth={"60%"}
                      // marginBottom="20px"
                    />
                   </div>
                   
                    </div>
                    <div className="achc--payer"style={{background: "", justifyContent: "space-between",marginBottom: "15px"}}>
                   <div className="currency" style={{background:""}}>
                   <InputField
                      label={"Address 2. 50k"}
                      labelWidth={"35%"}
                      inputWidth={"50%"}
                      disabled={true}
                      // marginBottom="20px"
                    />
                   </div>
                   <div className="currency"></div>
                   <div className="currency" style={{background: ""}}>
                   <InputField
                      label={"Address 4. 50k"}
                      labelWidth={"38%"}
                      inputWidth={"60%"}
                      // marginBottom="20px"
                    />
                   </div>
                   
                    </div>
                    <div className="achc--payer"style={{background: "", justifyContent: "space-evenly",marginBottom: "15px"}}>
                    <div className="flex--1" style={{background: ""}}>
        <div className="account-name">
                      <SelectField
                      label={"Sender's Charges 71F"}
                      labelWidth={"50%"}
                      inputWidth={"50%"}
                      required={true}
                      // marginBottom="20px"
                    />
                      </div> 
                       <div className="doc-number" style={{background: ""}}>
                    <InputField  
                    // marginBottom="20px"
                    inputWidth={"70%"} />

                    </div>
        </div>
          <div className="flex--1">
          </div>
          
         <div className="flex--1">
         <div className="account-name">
          <InputField
                      label={"Exchange Rate"}
                      labelWidth={"70%"}
                      inputWidth={"60%"}
                      // marginBottom="20px"
                    />
          </div>
         </div>
                   
                    </div>
                    <div className="achc--payer"style={{background: "", justifyContent: "space-evenly",marginBottom: "15px"}}>
                    <div className="flex--1" style={{background: ""}}>
        <div className="account-name">
                      <InputField
                      label={"Related Ref 21"}
                      labelWidth={"50%"}
                      inputWidth={"50%"}
                      required={true}
                      // marginBottom="20px"
                    />
                      </div> 
                   
        </div>
          <div className="flex--1">
         
          </div>
          
          <div className="flex--1" style={{background: ""}}>
        <div className="account-name">
                      <SelectField
                      label={"Receiver's Charges 71G"}
                      labelWidth={"70%"}
                      inputWidth={"60%"}
                      // marginBottom="20px"
                    />
                      </div> 
                       <div className="doc-number" style={{background: ""}}>
                    <InputField 
                    //  marginBottom="20px" 
                     inputWidth={"90%"} />
                    </div>
        </div>
                   
                    </div>
              
                    <div className="achc--payer"style={{background: "", justifyContent: "space-between",marginBottom: "15px"}}>
                   <div className="currency" style={{background:""}}>
                   <InputField
                      label={"Settled Amount"}
                      labelWidth={"35%"}
                      inputWidth={"60%"}
                      disabled={true}
                      // marginBottom="20px"
                    />
                   </div>
                   <div className="currency"></div>
                   <div className="currency" style={{background: ""}}>
                   <InputField
                      label={"Value Date 32A"}
                      labelWidth={"38%"}
                      inputWidth={"60%"}
                      type="date"
                      disabled={true}
                      // marginBottom="20px"
                    />
                   </div>
                   
                    </div>

                   
                    <div className="achc--payer"style={{background: "", justifyContent: "space-evenly",marginBottom: "15px"}}>
                    <div className="flex--1" style={{background: ""}}>
        <div className="account-name">
                      <SelectField
                      label={"Sender to ReceiverCode Info.72"}
                      labelWidth={"80%"}
                      inputWidth={"70%"}
                      required={true}
                      // marginBottom="20px"
                    />
                      </div> 
                       <div className="doc-number" style={{background: ""}}>
                    <InputField 
                    // marginBottom="20px"
                     inputWidth={"70%"} />
                    </div>
        </div>
          <div className="flex--1">
         
          </div>
          
          <div className="flex--1" style={{background: ""}}>
        <div className="account-name">
                      <InputField
                      label={"Sender to Rec Info. 72"}
                      labelWidth={"70%"}
                      inputWidth={"60%"}
                      // marginBottom="20px"
                    />
                      </div> 
                      
        </div>
                   
                    </div>
                    <div className="achc--payer"style={{background: "", justifyContent: "space-between",marginBottom: "15px"}}>
                   <div className="currency" style={{background:""}}>
                   <InputField
                      label={"Sender to Rec Info. 72"}
                      labelWidth={"35%"}
                      inputWidth={"60%"}
                     
                     
                    />
                   </div>
                   <div className="currency"></div>
                   <div className="currency" style={{background: ""}}>
                   <ListOfValue
                      label={"Sender's Corre A/C53a"}
                      labelWidth={"38%"}
                      inputWidth={"60%"}
                      required={true}
                      // marginBottom= "20px"
                    />
                   </div>
                   
                    </div>
                    <div className="achc--payer"style={{background: "", justifyContent: "space-between",marginBottom: "15px"}}>
                   <div className="currency" style={{background:""}}>
                   <InputField
                      label={"Sender's Corre A/C53a"}
                      labelWidth={"35%"}
                      inputWidth={"60%"}
                      required={true}
                      // marginBottom= "20px"
                     
                    />
                   </div>
                   <div className="currency"></div>
                   <div className="currency" style={{background: ""}}>
                   <ListOfValue
                      label={"Account With Inst. 57a"}
                      labelWidth={"38%"}
                      inputWidth={"60%"}
                      required={true}
                      // marginBottom= "20px"
                    />
                   </div>
                   
                    </div>
                    <div className="achc--payer"style={{background: "", justifyContent: "space-between", marginBottom: "15px"}}>
                   <div className="currency" style={{background:""}}>
                   <InputField
                      label={"A/C Cleaning Code57a"}
                      labelWidth={"35%"}
                      inputWidth={"60%"}
                      required={true}
                      // marginBottom= "20px"
                    />
                   </div>
                   <div className="currency"></div>
                   <div className="currency" style={{background: ""}}>
                   <ListOfValue
                      label={"Ordering Institution52a"}
                      labelWidth={"38%"}
                      inputWidth={"60%"}
                      required={true}
                      // marginBottom= "20px"
                    />
                   </div>
                   
                    </div>
                    <div className="achc--payer"style={{background: ""}}>
                  <div className="account-name" style={{background: ""}}>
                    <InputField
                      label={"Ordering Insti. A/C52a"}
                      labelWidth={"16%"}
                      inputWidth={"60%"}
                     
                    />
                  </div>
                </div>
                 
                    
                 
          </div>
          </Card.Body>
            </Card>
            
    </div>
    );
}

export default OTRS;