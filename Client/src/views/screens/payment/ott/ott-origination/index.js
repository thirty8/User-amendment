import React, { useState } from "react";

import {
  Row,
  Col,
  Button,
  Container,
  Form,
  Modal,
  Card,
} from "react-bootstrap";



import { useTranslation } from 'react-i18next';
import InputField from "../../../../../../components/others/Fields/InputField";
import "../ott-origination/index.css"
import BeneficiaryInfo from "./components/beneficiary-information";
import FxDetails from "./components/fx-details";
import OttDetails from "./components/ott-details";
import Swift from "./components/swift-details";



function OTT(){
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
    const [activeStep, setActiveStep] = useState(0);





    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleClick = (index) => {
        setActiveStep(index);
      };
    const steps = [
        {
          count: 1,
          number: "OTT Details",
          content: (
            <div>
              <OttDetails />
            </div>
          ),
        },
        {
          count: 2,
          number: "Beneficiary Information",
          content: (
            <div>
              <BeneficiaryInfo />
            </div>
          ),
        },
        {
          count: 3,
          number: "Swift Details",
          content: (
            <div>
              <Swift />
            </div>
          ),
        },
        {
          count: 4,
          number: "FX Details",
          content: (
            <div>
              <FxDetails />
            </div>
          ),
        },
       
      ];
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
  const custom = `url(` +
  window.location.origin +
  `/assets/images/headerBackground/` +
  getTheme.theme.headerImage +
`)`;
    return (
        <div className="" style={{zoom: "0.8"}}>
                 {/* <div
            style={{ marginTop: "-15px", textAlign: "center", zoom: "0.85" }}
            centered
          >
            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button
                className="btn btn-secondary"
                style={{
                  background:
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`,
                }}
              >
                <MDBIcon
                  style={{ color: "white", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="file-alt"
                />
                <br />
                New
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button className="btn btn-light" style={{ background: "white" }}>
                <MDBIcon
                  style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="sync"
                />
                <br />
                Refresh
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button className="btn btn-light" style={{ background: "white" }}>
                <MDBIcon
                  style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="calendar-times"
                />
                <br />
                Delete
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button className="btn btn-light" style={{ background: "white" }}>
                <MDBIcon
                  style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="thumbs-up"
                />
                <br />
                Authorise
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button className="btn btn-light" style={{ background: "white" }}>
                <MDBIcon
                  style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="eye"
                />
                <br />
                View
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button
                className="btn btn-secondary"
                style={{
                  background:
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`,
                }}
              >
                <MDBIcon
                  style={{ color: "white", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="check"
                />
                <br />
                Ok
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button className="btn btn-light" style={{ background: "white" }}>
                <MDBIcon
                  style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="ban"
                />
                <br />
                Cancel
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button className="btn btn-light" style={{ background: "white" }}>
                <MDBIcon
                  style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="thumbs-down"
                />
                <br />
                Reject
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button className="btn btn-light" style={{ background: "white" }}>
                <MDBIcon
                  style={{ color: "grey", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="question-circle"
                />
                <br />
                Help
              </button>
            </span>

            <span style={{ paddingLeft: 5, paddingRight: 5 }}>
              <button
                className="btn btn-secondary"
                style={{
                  background:
                    `url(` +
                    window.location.origin +
                    `/assets/images/headerBackground/` +
                    getTheme.theme.headerImage +
                    `)`,
                }}
              >
                <MDBIcon
                  style={{ color: "white", paddingBottom: 5, fontSize: 15 }}
                  fas
                  icon="sign-out-alt"
                />
                <br />
                Exit
              </button>
            </span>
          </div> */}
        {/* <hr /> */}
        <div className="flex--1">
            <div className="space">

            </div>
            <div className="amount" style={{background: ""}}>
                <div className="just-flex">
                    <InputField 
                    label={"Trans Type"}
                    disabled={true}
                    labelWidth={"15%"}
                    inputWidth={"60%"}
                    value={"OTTB OUTWARD TELEGRAPHIC BRA-TRANS"}
                    />
                </div>
            </div>
        </div>
        <br />

                       
                   
        <div className="bg-gray-100 p-2">
        <ul className="stepper rounded mb-4">
          {steps.map((step, index) => (
             <li
             key={step.number}
             className={`stepper__item cursor-pointer flex h-10 items-center justify-center `}
             style={{
               background: index === activeStep ? custom : "",
               color: index === activeStep ? "white" : "",
               border: index < activeStep ? "1px" : "",
               borderRadius: index < activeStep ? "10%" : "",
             }}

             onClick={() => handleClick(index)}
           >
              <div className="flex space-x-5 items-center justify-center">
                <div className="border-2 rounded-full flex justify-center items-center w-7 h-7 p-1 bg-black text-white">
                  {step.count}
                </div>
                <div>{step.number}</div>
              </div>
            </li>
          ))}
        </ul>
        {steps[activeStep].content}
        <div className="flex justify-between mt-4">
          <button
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
              activeStep === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </button>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${
              activeStep === steps.length - 1
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      </div>
                     



      
    );
}
export default OTT;