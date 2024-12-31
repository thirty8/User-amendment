import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { MDBIcon } from 'mdb-react-ui-kit';
import swal from "sweetalert";
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { API_SERVER } from '../../../../../config/constant';
import axios from "axios";

const headers = {
  'x-api-key': process.env.REACT_APP_API_KEY,
  'Content-Type': 'application/json'
};
import DataTable from '../../../../../components/others/Datatable/DataTable'

const UpdateSignatureOrImage = () => {

  const customTheme = JSON.parse(localStorage.getItem('theme'));

  const headerImage = customTheme.theme.headerImage;
  const textColor = customTheme.theme.textColor;

  const [getTheme, setTheme] = useState(customTheme); 

  const [accountNumber, setAccountNumber] = useState('');
  const [name, setName] = useState('');
  const [sourceDocument, setSourceDocument] = useState('');
  const [mandate, setMandate] = useState('');

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const handleNameChange = (selectedOption) => {
    setName(selectedOption);
  };

  const handleSourceDocumentChange = (event) => {
    setSourceDocument(event.target.value);
  };

  const handleMandateChange = (event) => {
    setMandate(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      accountNumber === "" ||
      mandate === "" ||
      sourceDocument === ""
    ) {
      swal({
        title: "Active Fields Are Required",
        text: "Please fill all the active fields",
        icon: "warning",
        button: "Ok",
      }).then((result) => {
        // Do something here..
        document.getElementById("saveBTN").disabled = false;
      });
    } else {
      // handle form submit here...
      try {
        const response = await axios.post(API_SERVER + "/api/create-user", {
          department : department,
          userType : userType,
          deviceID : deviceID,
          userApprovalLevel : userApprovalLevel,
        }, { headers });

        if (response) {
          if (response.data[0].responseCode === "000") {
            swal({
              title: "User Creation Successful",
              text: "The user you created has been sent for Approval",
              icon: "success",
              button: "Ok",
            }).then((result) => {
              if (result) {
                setStateChangeOfMenus(true);
                document.getElementById("saveBTN").disabled = false;
                document.getElementById("minimizeModal").click();
              }
            });
          }
        } else {
          alert("Something went wrong...");
        }
      } catch (e) {
        alert(e);
      }
    }

  };

  const mandateOptions = [    
    { value: 'mandate1', label: 'Mandate 1' },    
    { value: 'mandate2', label: 'Mandate 2' },    
    { value: 'mandate3', label: 'Mandate 3' },    
    { value: 'mandate4', label: 'Mandate 4' }  
  ];

  const userApprovalLevelOptions = [
    { value: 'level1', label: 'Level 1' },
    { value: 'level2', label: 'Level 2' },
    { value: 'level3', label: 'Level 3' }
  ];


  const data = [];

  const columns = ['Relation No.', 'Name', 'Mandate Category', 'Approver Limit'];

  return (
    <>

        {/* <div>
        <p  style={{ padding: "5px", marginTop: "-8px", fontSize: "14px", color: "white", background: `url(` + window.location.origin + `/assets/images/headerBackground/` + getTheme.theme.headerImage + `)` }}>Signature / Image</p>
        </div> */}


        <Form className='space-y-4 -mt-6 -mb-1' style={{ zoom: "1", padding: "25px" }}>

          <Form.Group as={Row}>
            <Form.Label column sm="3">Account No. :</Form.Label>
            <Col sm="9">
              <Form.Control id="accountNumber" size="sm" type="text" value={accountNumber} onChange={handleAccountNumberChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">Name :</Form.Label>
            <Col sm="9">
              <Form.Control id="name" size="sm" disabled type="text" value={name} onChange={handleNameChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">Mandate :</Form.Label>
            <Col sm="9">
              <Select id="userType" styles={{ 
            control: (provided) => ({ 
              ...provided, 
              minHeight: '1px', // Change the height value as needed
              maxHeight: "35px",
              fontSize: '13px', // Change the font size as needed
            }) 
          }}  options={mandateOptions} value={mandate} onChange={handleMandateChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="3">Soure Doc. :</Form.Label>
            <Col sm="9">
              <Form.Control id="sourceDocument" size="sm" type="file" value={sourceDocument} onChange={handleSourceDocumentChange} />
            </Col>
          </Form.Group>

          <Button id="updateSignatureOrImageCaptureForm" onClick={handleSubmit} type="button" style={{ display: "none" }}>Submit</Button>
        </Form>


        <div>
            <p  style={{ padding: "5px", fontSize: "14px", color: "white", background: `url(` + window.location.origin + `/assets/images/headerBackground/` + getTheme.theme.headerImage + `)` }}>Customer Relation</p>
        </div>

        <div style={{ zoom: "0.85", marginBottom: "-25px", marginTop: "-4px" }}>
            <DataTable title={''} data={data} dataProcessingInfo={'Processing data please wait...'} rowsPerPage={5} tableCellFontSize={14} columns={columns} />
        </div>
    </>
  );
};

export default UpdateSignatureOrImage;