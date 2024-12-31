import React from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../../components/others/Fields/SelectField";
import "../../../index.css";

function OTRDetails(){
    return(
        <div className="">
            <Row className="g-2">
                
                <Row>
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
            <div style={{width:"100%",background: "", }}>
            
            <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: "", marginBottom: "15px"}}>
                        <ListOfValue
                          label={"Payer BBAN"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                          requires={true} 
                          // marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: "",marginBottom: "15px"}}>
                        <InputField
                          label={"Account Description"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                          disabled={true}
                          // marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: "",marginBottom: "15px"}}>
                        <InputField
                          label={"Product"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                         disabled={true}
                        //  marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer" style={{background: ""}}>
                      <div className="beneficiary-account" style={{background: "",marginBottom: "15px"}}>
                        <SelectField
                          label={"OTT Currency"}
                          labelWidth={"38%"}
                          inputWidth={"50%"}
                          type="text"
                          // marginBottom={"20px"}
                        />
                      </div>
                      <div className="amount-disabled"></div>
                      <div className="date--flex" style={{background: "",marginBottom: "15px"}}>
                        <InputField
                          label={"OTT Amount"}
                          type="text"
                          required={true}
                          labelWidth={"60%"}
                          inputWidth={"50%"}
                          // marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer" style={{background: ""}}>
                      <div className="beneficiary-account" style={{background: "",marginBottom: "15px"}}>
                        <InputField
                          label={"Customer Rate"}
                          labelWidth={"38%"}
                          inputWidth={"49%"}
                          type="text"
                          // marginBottom={"20px"}
                        />
                      </div>
                      <div className="amount-disabled"></div>
                      <div className="date--flex" style={{background: "",marginBottom: "15px"}}>
                        <InputField
                          label={"Value Date"}
                          type="date"
                          required={true}
                          labelWidth={"60%"}
                          inputWidth={"50%"}
                          // marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: "",marginBottom: "15px"}}>
                        <ListOfValue
                          label={"Receiving Bank"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                         required={true}
                        //  marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: "",marginBottom: "15px"}}>
                        <ListOfValue
                          label={"A/C With Inst. 58a"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                         required={true}
                        //  marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: "",marginBottom: "15px"}}>
                        <InputField
                          label={"A/C Clear code 58a"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                         required={true}
                        //  marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: "",marginBottom: "15px"}}>
                        <InputField
                          label={"Purpose of Transfer"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                         required={true}
                        //  marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: "",marginBottom: "15px"}}>
                        <InputField
                          label={"Info. 72"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                          // marginBottom={"20px"}
                        />
                      </div>
                    </div>
                    <div className="achc--payers" style={{background: "",marginBottom: "15px"}}>
                      <div className="payer--fields" style={{background: ""}}>
                        <div className="flex--1">
                          <div style={{flex: 0.8}}>
                          <InputField
                          label={"Attach Document"}
                          labelWidth={"34%"}
                          inputWidth={"33%"}
                          type="text"
                          
                        />
                          </div>
                       
                        
                      
                        
                        </div>
                       
                      </div>
                      
                      <div className="payer--btn" style={{background: ""}}>
                        <ButtonComponent
                          label="View Document"
                          //buttonBackgroundColor=getTheme.theme.navBarColor
                          buttonWidth="50%"
                          buttonHeight="25px"
                          buttonColor="white"
                        />
                      </div>
                    </div>
                  


            </div>
        
            </Card.Body>
            </Card> 
                </Row>
            </Row>

        </div>
    );

}
export default OTRDetails;