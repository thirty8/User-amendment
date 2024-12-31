
import "../index.css"
// import "../../../../../../../components/others/Fields/InputField";
// import "../../../../../../../components/others/Fields/ListOfValue";
// import "../../../../../../../components/others/Fields/SelectField";
// import "../../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";

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



function OttDetails(){
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

         //const { t } = useTranslation();

  // const swal = require('sweetalert');

  // function closeModal(formName) {
  //     let userInfo = JSON.parse(localStorage.getItem('userInfo'));

  //     var closedModalName = t(formName.toLowerCase().replace(/\s/g, ''));

  //     if (userInfo.lang.toLowerCase().slice(0, 2) === 'en') {
  //         swal({
  //             title: 'Are you sure?',
  //             text: "You're about to close the '" + closedModalName + "' form",
  //             icon: 'warning',
  //             buttons: ['Cancel', 'Yes, Close Form'],
  //             dangerMode: true
  //         }).then((result) => {
  //             if (result) {
  //                 var minimizedModals = [];
  //                 var formName = localStorage.getItem('formName');
  //                 if (localStorage.getItem('namesOfMinimizedModals')) {
  //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
  //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
  //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
  //                 }
  //                 document.getElementById('globalModalCloseBtn').click();
  //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
  //             }
  //         });
  //     } else if (userInfo.lang.toLowerCase().slice(0, 2) === 'fr') {
  //         swal({
  //             title: 'Es-tu Sûr?',
  //             text: "Vous êtes sur le point de fermer le '" + closedModalName + "' formulaire",
  //             icon: 'warning',
  //             buttons: ['Annuler', 'Oui, Fermer Le Formulaire'],
  //             dangerMode: true
  //         }).then((result) => {
  //             if (result) {
  //                 var minimizedModals = [];
  //                 var formName = localStorage.getItem('formName');
  //                 if (localStorage.getItem('namesOfMinimizedModals')) {
  //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
  //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
  //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
  //                 }
  //                 document.getElementById('globalModalCloseBtn').click();
  //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
  //             }
  //         });
  //     } else if (userInfo.lang.toLowerCase().slice(0, 2) === 'sp') {
  //         swal({
  //             title: 'Estas Seguro?',
  //             text: "Estás a punto de cerrar '" + closedModalName + "' forma",
  //             icon: 'warning',
  //             buttons: ['Cancelar', 'Sí, Cerrar Formulario'],
  //             dangerMode: true
  //         }).then((result) => {
  //             if (result) {
  //                 var minimizedModals = [];
  //                 var formName = localStorage.getItem('formName');
  //                 if (localStorage.getItem('namesOfMinimizedModals')) {
  //                     minimizedModals = JSON.parse(localStorage.getItem('namesOfMinimizedModals'));
  //                     minimizedModals = minimizedModals.filter((e) => e !== formName);
  //                     localStorage.setItem('namesOfMinimizedModals', JSON.stringify(minimizedModals));
  //                 }
  //                 document.getElementById('globalModalCloseBtn').click();
  //                 // alert(localStorage.getItem("namesOfMinimizedModals"));
  //             }
  //         });
  //     }
  // }
    return (
        <div>
            <div className="zoom">

                <Row className="g-2">
                  <Row>
                    <Col md={8}>
                    <div className="achc--payer" style={{background: "", marginRight: "28px", marginLeft: "20px"}}>
            <div className="flex--1" style={{background: ""}}>
                <InputField
                 label={"Treasury Deal Number"}
                 labelWidth={"50%"}
                 inputWidth={"40%"}
                 type="number"
                
                />
            </div>
            <div className="flex--1" style={{background: "", justifyContent: "flex-end"}}>
              
                <InputField 
                 label={"Request Number"}
                 labelWidth={"50%"}
                 inputWidth={"70%"}
                 type="number"
                
                />
            </div>
           </div>
                    </Col>
                    <Col md={4}></Col>
                  </Row>
                </Row>
                {/* <br /> */}
                <Row className="g-2">
                    <Row>
                        {/* Left Card */}
                        <Col md={8}>
                            <br />
           
          {/* <br /> */}
           <Card
                className="bg-light"
                border="light"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }} >
              <Card.Body>
              <div style={{width:"100%",background: "" }}>
              <div className="achc--payers" style={{background: ""}}>
                      <div className="payer--fields" style={{background: ""}}>
                        <div className="flex--1">
                          <div style={{flex: 0.8}}>
                          <InputField
                          label={"Ordering Account"}
                          labelWidth={"35%"}
                          inputWidth={"33%"}
                          type="number"
                          required={true}
                        />
                          </div>
                       
                        
                      
                        
                        </div>
                       
                      </div>
                      
                      <div className="payer--btn" style={{background: ""}}>
                        <ButtonComponent
                          label="Sign Ver"
                          buttonBackgroundColor="rgb(21 163 183)"
                          buttonWidth="50%"
                          buttonHeight="25px"
                          buttonColor="white"
                        />
                      </div>
                    </div>
                    <br />
                    <div className="achc--payer" style={{background: ""}}>
                      <div className="beneficiary-account" style={{background: ""}}>
                        <InputField
                          label={"Branch"}
                          labelWidth={"40%"}
                          inputWidth={"49%"}
                          type="text"
                          disabled={true}
                        />
                      </div>
                      <div className="amount-disabled"></div>
                      <div className="date--flex" style={{background: ""}}>
                        <InputField
                          label={"Account Status"}
                          type="text"
                          required={true}
                          labelWidth={"60%"}
                          inputWidth={"50%"}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: ""}}>
                        <InputField
                          label={"Product"}
                          labelWidth={"30%"}
                          inputWidth={"73%"}
                          type="text"
                          disabled={true}
                        />
                      </div>
                    
                    </div>
                    <br />
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: ""}}>
                        <InputField
                          label={"Customer Address 1"}
                          labelWidth={"30%"}
                          inputWidth={"73%"}
                          type="text"
                          disabled={true}
                        />
                      </div>
                    
                    </div>
                    <br />
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: ""}}>
                        <InputField
                          label={"Customer Address 2"}
                          labelWidth={"30%"}
                          inputWidth={"73%"}
                          type="text"
                          disabled={true}
                        />
                      </div>
                    
                    </div>
                    <br />
                    <div className="achc--payer" style={{background: ""}}>
                      <div className="beneficiary-account" style={{background: ""}}>
                        <InputField
                          label={"Charge Account"}
                          labelWidth={"38%"}
                          inputWidth={"40%"}
                          type="number"
                          required={true}
                        />
                      </div>
                      <div className="space"></div>
                      <div className="date--flex" style={{background: ""}}>
                        <ListOfValue
                          
                        
                          
                          
                          inputWidth={"100%"}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="achc--payer"style={{background: ""}}>
                      <div className="account-name" style={{background: ""}}>
                        <InputField
                          label={"Product"}
                          labelWidth={"30%"}
                          inputWidth={"73%"}
                          type="text"
                          disabled={true}
                        />
                      </div>
                    
                    </div>
                    <br />
                    
                    <div className="achc--payer" style={{background: ""}}>
            <div className="flex--1" style={{background: ""}}>
            <div className="account-name">
                          <SelectField
                          label={"OTT Currency/Amount"}
                          labelWidth={"58%"}
                          inputWidth={"42%"}
                          required={true}
                        />
                          </div> 
                           <div className="doc-number" style={{background: ""}}>
                        <InputField  inputWidth={"80%"} />
                        </div>
            </div>
            <div className="flex--1" style={{background: "", justifyContent: ""}}>
              <div className="account-name" style={{background: ""}}>
              <InputField 
                 label={"Attach Document"}
                 labelWidth={"45%"}
                 inputWidth={"50%"}
                 type="number"
                
                />
              </div>
               <div className="" style={{flex: 0.3}}>
               <ButtonComponent
                          label="View Doc"
                          buttonBackgroundColor= "rgb(21 163 183)"
                          buttonWidth="100%"
                          buttonHeight="25px"
                          buttonColor="white"
                        />
               </div>
            </div>
           </div>
           <br />
           <div className="achc--payer" style={{background: ""}}>
                      <div className="beneficiary-account" style={{background: ""}}>
                        <InputField
                          label={"Value Date"}
                          labelWidth={"40%"}
                          inputWidth={"49%"}
                          type="date"
                          required={true}
                        
                        />
                      </div>
                      <div className="amount-disabled"></div>
                      <div className="date--flex" style={{background: ""}}>
                        <SelectField
                          label={"Priority"}
                          type="text"
                          
                          labelWidth={"50%"}
                          inputWidth={"80%"}
                      
                        />
                      </div>
                    </div>
                    <br />
                    <div className="achc--payer" style={{background: ""}}>
                      <div className="account-name" style={{background: ""}}>
                        <InputField
                          label={"Converted OTT Currency/Amount"}
                          labelWidth={"60%"}
                          inputWidth={"40%"}
                          type="text"
                          disabled={true}
                        
                        />
                      </div>
                      <div className="space" ></div>
                      <div className="date--flex" style={{background: ""}}>
                        <InputField
                          label={"OTT Amount Rate"}
                          type="text"
                          disabled={true}
                          labelWidth={"60%"}
                          inputWidth={"50%"}
                      
                        />
                      </div>
                    </div>
                    <br />
                    <div className="achc--payer" style={{background: ""}}>
                      <div className="account-name" style={{background: ""}}>
                        <InputField
                          label={"Charge Currency/Amount"}
                          labelWidth={"50%"}
                          inputWidth={"65%"}
                          type="text"
                          disabled={true}
                        
                        />
                      </div>
                      <div className="amount-disabled" ></div>
                      <div className="date--flex" style={{background: "", justifyContent: "flex-end"}}>
                      <ButtonComponent
                          label="View Charges"
                          //buttonBackgroundColor={getTheme.theme.navBarColor}
                          buttonWidth="50%"
                          buttonHeight="25px"
                          buttonColor="white"
                        />
                      </div>
                    </div>
                   

                </div>
              </Card.Body>
                </Card>

                        </Col>
                        {/* Right Card */}
                        <Col md={4}>
                            <br />
                            <Card
                className="bg-light"
                border="light"
                style={{
                  boxShadow:
                  "4px 5px 15px -1px rgba(105,105,105,0.75)",
                  background: "red"
                }}
              >
                <Card.Body>
                    <div className="read-only-section" style={{background: ""}}>
                            <header
                className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                style={{
                  background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,

                 //background: getTheme.theme.navBarColor,
                 textAlign: "center",
                 marginLeft: '-25px',
                 marginRight: '-25px',
                 marginTop: '-30px'
                }}
              >
                Ordering Account Balance
              </header> 
              <br />
              <InputField
                      label={"Available Balance"}
                      type="number"
                      labelWidth={"70%"}
                      inputWidth={"70%"}
                      disabled={true}
                      //marginBottom={"30px"}
                    />
                    &nbsp;
                    <InputField
                      label={"Book Balance"}
                      type="number"
                      labelWidth={"70%"}
                      inputWidth={"70%"}
                      disabled={true}
                    />


                    </div>
                </Card.Body>
              </Card>
              <br />
              <Card>
              <Card.Body>
                    <div className="read-only-section" style={{background: ""}}>
                            <header
                className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                style={{
                  background:
                  `url(` +
                  window.location.origin +
                  `/assets/images/headerBackground/` +
                  getTheme.theme.headerImage +
                  `)`,

                  //background: getTheme.theme.navBarColor,
                 textAlign: "center",
                 marginLeft: '-25px',
                 marginRight: '-25px',
                 marginTop: '-30px'
                }}
              >
                Charge Account Balance
              </header> 
              <br />
              <InputField
                      label={"Available Balance"}
                      type="number"
                      labelWidth={"70%"}
                      inputWidth={"70%"}
                      disabled={true}
                     // marginBottom={"30px"}
                    />
                    &nbsp;
                    <InputField
                      label={"Book Balance"}
                      type="number"
                      labelWidth={"70%"}
                      inputWidth={"70%"}
                      disabled={true}
                    />


                    </div>
                </Card.Body>
              </Card>

                        </Col>
                    </Row>
                </Row>
            </div>
        </div>
    );
}
export default OttDetails;