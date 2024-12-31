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
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
import "../../../index.css";


function OTRS2(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme")));
    return (
        <div className="sms_request">
             <form 
                className="d-flex align-items-center justify-content-center"
                style={{ width: "100%", position: "relative" }} >
                    <div className="amount">
                        <br />
                        <div style={{marginBottom: "15px"}}>
                        <InputField 
                        label={"Ordering Inst. A/C 52D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        // marginBottom= "20px"
                        />
                        </div>
                       
                         <div style={{marginBottom: "15px"}}>
                         <InputField 
                        label={"Ordering Inst. Addr52D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        // marginBottom= "20px"
                        />
                         </div>
                      
                         <div style={{marginBottom: "15px"}}>
                         <InputField 
                        label={"Address2. 52D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        // marginBottom= "20px"
                        />
                         </div>
                       
                         <div style={{marginBottom: "15px"}}>
                         <InputField 
                        label={"Address3. 52D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        // marginBottom= "20px"
                        />
                         </div>
                       
                         
                         <InputField 
                        label={"Address4. 52D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        // marginBottom= "20px"
                        />
                        <br />
                        <div style={{marginBottom: "15px"}}>
                        <InputField 
                        label={"Benef. Inst. A/c 58D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        marginBottom= "20px"
                        />
                        </div>
                       
                        <div style={{marginBottom: "15px"}}>
                        <InputField 
                        label={"Benef. Addr 58D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        marginBottom= "20px"
                        />
                        </div>
                       
                        <div style={{marginBottom: "15px"}}>
                        <InputField 
                        label={"Address2. 58D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        marginBottom= "20px"
                        />
                        </div>
                      
                        <div style={{marginBottom: "15px"}}>
                        <InputField 
                        label={"Address3. 58D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        marginBottom= "20px"
                        />
                        </div>
                      
                        <div style={{marginBottom: "15px"}}>
                        <InputField 
                        label={"Address4. 58D"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        marginBottom= "20px"
                        />
                        </div>
                       
                        <div style={{marginBottom: "15px"}}>
                        <ButtonComponent
                        label={"View Swift Details"}
                        buttonColor="white"
                        buttonHeight="25px"
                        />
                        </div>
                      
                    </div>

                </form>

        </div>
    );
}
export default OTRS2;