

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Risk_analysis_test({handleClose, handleShow, show_Second}) {

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Risk_analysis_test
      </Button>

      <Modal
        show={show_Second}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Risk Assessment Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className=''>
                Take the Risk Assessment Test !!!
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Generate Risk ID
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Risk_analysis_test;