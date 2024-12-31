// import { padding } from "@mui/system";
import React,{useState} from "react";
import {
  Row,
  Col,
  Card,
} from "react-bootstrap";
// import InputField from "../../../../components/fields/InputField";
// import ListOfValue from "../../../../components/fields/ListOfValue";
// import SelectField from "../../../../components/fields/SelectField";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../../components/others/Fields/SelectField";
import InputField from "../../../../../../../components/others/Fields/InputField";
import { useTranslation } from 'react-i18next';

function BeneficiaryInfo(){
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")));
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
            <div className="">
                <div className="flex--1" style={{background: ""}}>
                    <div className="doc-number" style={{background: ""}}>
                    <div className="just-flex" style={{background: "" ,padding: "10px 0px"}}>
                    <div  style={{background: "", paddingLeft: "25px"}}>
                   
                     <ListOfValue
                     label="Correspondent BIC"
                     required={true}
                     labelWidth={"40%"}
                     inputWidth={"50%"}
                     />
                    </div>

                    </div>

                    </div>

                    
                </div>
           
                <Row className="g-2">
                    
                    <Col md={6}>
                    <Card
                className="bg-light"
                border="light"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
              >
                <Card.Body >
                <div style={{width:"100%",background: "" }}>
                      <header
                className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                style={{
                 //background: getTheme.theme.navBarColor,
                 background:
                 `url(` +
                 window.location.origin +
                 `/assets/images/headerBackground/` +
                 getTheme.theme.headerImage +
                 `)`,

                 textAlign: "center",
                 marginLeft: '-25px',
                 marginRight: '-25px',
                 marginTop: '-30px'
                }}
              >
                Beneficiary Information
              </header> 
              <br />
              <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Beneficiary Acct 59A"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Beneficiary Name 59A"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Beneficiary Address 259"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Beneficiary Address 359"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Beneficiary Address 459"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <SelectField
                       label= "Sender To Ben Info72"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Sender To Ben Info2"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Sender To Ben Info2"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <SelectField
                       label= "Remit"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       required={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Code 70"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       required={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Remit Information 70"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Remit Information 70"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Interim.Inst A/C56A"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <ListOfValue
                       label= "Intermediary Bank56A"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       
                       />
                       </div> 
                    </div>
                </Card.Body>
                </Card>


                    </Col>
                    <Col md={6}>
                    <Card
                className="bg-light"
                border="light"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
              >
                <Card.Body >
                <div style={{width:"100%",background: "" }}>
                      <header
                className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                style={{
                  background:
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`,

                 //background: "blue",
                 textAlign: "center",
                 marginLeft: '-25px',
                 marginRight: '-25px',
                 marginTop: '-30px'
                }}
              >
                Beneficiary Bank Information
              </header> 
              <br />
              <div className="just-flex"style={{background: ""}}>
                       <ListOfValue
                       label= "Beneficiary Inst."
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       required={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Country"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 
                       <br />
                       <div className="achc--payer" style={{background: ""}}>
                      <div className="account-name" style={{background: ""}}>
                        <InputField
                          label={"Sort/Route No50D"}
                          labelWidth={"60%"}
                          inputWidth={"44%"}
                          type="number"
                          
                        
                        />
                      </div>
                      <div className="space"></div>
                      {/* <div className="amount-disabled" ></div> */}
                      <div className="date--flex" style={{background: ""}}>
                        <InputField
                          label={"Ben Bank A/C57D"}
                          type="number"
                          
                          labelWidth={"50%"}
                          inputWidth={"40%"}
                      
                        />
                      </div>
                    </div>
                    <br />
                    {/* <div style={{flex: 1, background: "red"}}>
                        <div style={{flex: 0.5, background: "blue"}}>
                            
                                <InputField 
                                label="Sort/Route No50D"
                                labelWidth={"10%"}
                                inputWidth={"20%"}
                                />

                        
                        </div>
                        <div style={{flex: 0.5, background: "blue"}}>
                        
                        <InputField 
                                label="Ben Bank A/C57D"
                                labelWidth={"10%"}
                                inputWidth={"20%"}
                                />
                        
                        </div>
                    </div> */}
                    <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Address57D"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Address57D"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Address57D"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Branch"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 

                    </div>
                </Card.Body>
                </Card>
                <br />
                <Card
                className="bg-light"
                border="light"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
              >
                 <Card.Body >
                 <div style={{width:"100%",background: "" }}>
                 <header
                className="text-white text-base py-1 rounded-t font-semibold px-2 uppercase"
                style={{
                  background:
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`,

                 //background: "blue",
                 textAlign: "center",
                 marginLeft: '-25px',
                 marginRight: '-25px',
                 marginTop: '-30px'
                }}
              >
                Intermediary Information
              </header> 
              <br />
              <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Account 56D"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Address 56D"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Address2 56D"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Address3 56D"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
                       </div> 
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Address4 56D"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       disabled={true}
                       />
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

export default BeneficiaryInfo;