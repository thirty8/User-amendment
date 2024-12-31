import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MDBIcon } from 'mdb-react-ui-kit';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

function UserInformation({ setUserInformation }) {

const customTheme = JSON.parse(localStorage.getItem('theme'));

const headerImage =`url(` + window.location.origin + `/assets/images/background/` + customTheme.theme.headerImage + `)`;

  return (
    <>
    <div style={{ zoom: "0.9", marginTop: "-7px", marginBottom: "-15px" }}>
      
      <Form className='space-y-0 -mt-2 mb-2'>

        <Form.Group as={Row}>
            <Form.Label style={{ color: headerImage }} column sm="3">First Name :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>MOHAMED</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label style={{ color: headerImage }} column sm="3">Middle Name :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>SAHID</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label style={{ color: headerImage }} column sm="3">Last Name :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>SESAY</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label style={{ color: headerImage }} column sm="3">Title :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>INTERNAL</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label style={{ color: headerImage }} column sm="3">Country :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>Sierra Leone (SLE)</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">City :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>Freetown</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Unit :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>&nbsp;</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Salary Account :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>004001100000020135 (ABDUL UNION15831)</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Manager's ID :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>&nbsp;</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Phone Number :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>&nbsp;</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Mobile :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>07835481</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Phone Ext. :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>&nbsp;</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Pager :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>&nbsp;</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Address :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>&nbsp;</p>
            </Col>
        </Form.Group>

        <Form.Group as={Row}>
            <Form.Label column sm="3">Email :</Form.Label>
            <Col sm="9">
                <p style={{ padding: "5px", background: "whitesmoke" }}>messay@rokelbank.sl</p>
            </Col>
        </Form.Group>

        </Form>
    </div>
    </>
  );
}

export default UserInformation;
