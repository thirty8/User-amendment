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
  import "../index.css"

import { useTranslation } from 'react-i18next';
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";


function FxDetails(){
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
            <div className="sms_request">
                <form 
                className="d-flex align-items-center justify-content-center"
                style={{ width: "100%", height: "70vh", position: "relative" }} >
                    <div className="amount">
                        <div style={{marginBottom: "15px"}}>
                        <ListOfValue 
                        label="FX Class"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        // marginBottom={"30px"}
                        />

                        </div>
                        <div style={{marginBottom: "15px"}}>
                        <ListOfValue 
                        label="FX Group"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        // marginBottom={"30px"}
                        />
                        </div>
                       
                        <div style={{marginBottom: "15px"}}>
                        <ListOfValue
                        label="FX Sub Group"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        // marginBottom={"30px"}
                        />
                            </div>
                       
                        <div style={{marginBottom: "15px"}}>
                        <ListOfValue 
                        label="Destination"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        // marginBottom={"30px"}
                        />

                        </div>
                       

                        <ListOfValue 
                        label="Payment Type"
                        labelWidth={"30%"}
                        inputWidth={"70%"}
                        required={true}
                        />

                    </div>

                </form>
            </div>
        </div>
    );

}

export default FxDetails;