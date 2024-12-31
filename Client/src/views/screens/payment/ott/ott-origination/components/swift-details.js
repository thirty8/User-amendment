import React, {useState} from "react";
//import { useTranslation } from 'react-i18next';
import {
    Row,
    Col,
    Button,
    Container,
    Form,
    Modal,
    Card,
  } from "react-bootstrap";
  import "../index.css";
//   import "../../../../../../../components/others/Fields/InputField";
// import "../../../../../../../components/others/Fields/ListOfValue";
// import "../../../../../../../components/others/Fields/SelectField";
// import "../../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue"

function Swift(){
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
        <div className="sms_request">
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
                marginLeft: '-28px',
                 marginRight: '-28px',
                 marginTop: '-30px'
                }}
              >
                Settlement Bank Charges
              </header> 
              <br />
              <Row className="g-2">
                <Row>
                    <Col md={6}>
                        <div className="just-flex"style={{background: ""}}>
                       <SelectField 
                       label= "Details of Charges 71A"
                       labelWidth={"50%"}
                       inputWidth={"100%"}
                       required={true}
                      
                       />
                       </div>
                       <br />

                       <div className="flex--1" style={{background: ""}}>
                       <div style={{flex: 0.5, background: ""}}>
                          <SelectField
                          label={"Instructed Amount 33B"}
                          labelWidth={"67%"}
                          inputWidth={"33%"}
                          required={true}
                          
                        />
                          </div> 
                           <div style={{flex: 0.5, background: ""}}>
                        <InputField  inputWidth={"100%"} />
                        </div>
                       </div>
                       <br />
                       <div className="just-flex"style={{background: ""}}>
                       <InputField
                       label= "Sender's A/C53B"
                       labelWidth={"50%"}
                       inputWidth={"97%"}
                       />
                       </div>   
                       <br />
                    </Col>
                    <Col md={6}>
                    <div className="flex--1" style={{background: ""}}>
                       <div className="amount">
                          <SelectField
                          label={"Receiver's Charges 71G"}
                          labelWidth={"67%"}
                          inputWidth={"33%"}
                          required={true}
                        />
                          </div> 
                           <div className="amount">
                        <InputField  inputWidth={"100%"} />
                        </div>

                       </div>
                       <br />
                       <div className="flex--1" style={{background: ""}}>
                       <div className="amount">
                          <SelectField
                          label={"Sender's Charges 71F"}
                          labelWidth={"67%"}
                          inputWidth={"33%"}
                          required={true}
                        />
                          </div> 
                           <div style={{flex: 0.5, background: ""}}>
                        <InputField  inputWidth={"100%"} />
                        </div>

                       </div>
                       <br />
                    
                    <div className="just-flex"style={{background: ""}}>
                       <ListOfValue 
                       label= "Sender's A/C53B"
                       labelWidth={"50%"}
                       inputWidth={"100%"}
                       required={true}
                       />
                       </div>
                    </Col>
                </Row>
              </Row>
        </div>
    );
}
export default Swift;


