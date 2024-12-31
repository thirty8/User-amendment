// import { List } from "antd";
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
import "../../index.css";
import InputField from "../../../../../../components/others/Fields/InputField";
import DataTable from "../../../../../../components/others/Datatable/DataTable";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import ButtonType from "../../../../../../components/others/Button/ButtonType";


function  ACHCUPLOAD(){
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
    return (
        <div>
            <div className="">
            <br />
                
                   
                   <div  style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-evenly",
              backgroundColor: "",
            }}>
                 <div style={{ backgroundColor: "", flex: 0.4 }}>
                 <InputField 
                     label={"Trans Type"}
                     labelWidth={"30%"}
                     inputWidth={"60%"}
                     disabled={true}
                     type={"text"}
                     value="DIRECT CREDIT TRANSACTION"
                     />
            </div>
            <div className="space"></div>
            <div style={{ backgroundColor: "",flex: 0.3 }}>
                 
                     <ButtonType 
                     label={"Single Transaction"}
                     labelWidth={"50%"}
                     inputWidth={"30%"}
                     type={"checkbox"}
                     />
                     
            </div>
            <div className="space"></div>
            <div style={{ backgroundColor: "",flex: 0.3 }}>
                 <ButtonType 
                     label={"Bulk Transaction"}
                     labelWidth={"50%"}
                     inputWidth={"30%"}
                     type={"checkbox"}
                     />
            </div>
                    
                   </div>
                   &nbsp;
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
              Upload Details
              </header> 
             &nbsp;
                   <Row>
                    <Col md={8}>
                        <DataTable
                        columns={[
                            "BBAN",
                            "Beneficiary Name",
                            "Amount",
                            "Bank Code",
                            "Bank Name"
                        ]}
                        />
                    </Col>
                    {/* Right Side */}
                    <Col md={4}>
                    <Card
                className="bg-light"
                border="light"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
              >
                   <Card.Body>
                  <div
                    className="read-only-section">
                        <ListOfValue 
                        label={"Debit Account"}
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        marginBottom="10px"
                        />
                        <br />
                       <div>

                       <ButtonComponent 
                        label="Sign Ver"
                        buttonHeight="25px"
                        buttonColor="white"
                        // marginBottom="20px"
                        />
                       </div>
                       <br />
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
                 marginLeft: '-26px',
                 marginRight: '-26px',
                 //marginTop: 'px'
                }}
              >
              Debit Account Balance/ Charges
              </header> 
                    
                       <br />
                       <InputField 
                        label={"Avaialable Balance"}
                        labelWidth={"40%"}
                        inputWidth={"60%"}
                        // marginBottom="20px"
                        />
                        <br />
                        <InputField 
                        label={"Proccesing"}
                        labelWidth={"40%"}
                        inputWidth={"60%"}
                        // marginBottom="20px"
                        />
                        <br />
                        <InputField 
                        label={"Tax"}
                        labelWidth={"40%"}
                        inputWidth={"60%"}
                        // marginBottom="20px"
                        />
                        <br />
                        <InputField 
                        label={"Total Charges"}
                        labelWidth={"40%"}
                        inputWidth={"60%"}
                        // marginBottom="20px"
                        />
                        <br />
                        <InputField 
                        label={"Purpose of Transfer"}
                        labelWidth={"40%"}
                        inputWidth={"60%"}
                        // marginBottom="20px"
                        />
                        <br />
                         <div className="account-name" style={{background: ""}}>
                        <div className="achc--payer" style={{background: ""}}>
                        <div className="account-name"style={{background: ""}}>
                        <InputField
                            label={"Attach Doc"}
                            labelWidth={"40%"}
                            inputWidth={"60%"}
                            type="text"
                            
                          />
                        </div>
                        <div className="small-space"></div>
                        <div className="amount-disabled" style={{background: ""}}>
                        <ButtonComponent
                          label="View Doc"
                          //buttonBackgroundColor=getTheme.theme.navBarColor,
                          buttonWidth="100%"
                          buttonHeight="25px"
                          buttonColor="white"
                        />
                        </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                    </Col>
                   </Row>
            </div>

        </div>

    );

}

export default ACHCUPLOAD;