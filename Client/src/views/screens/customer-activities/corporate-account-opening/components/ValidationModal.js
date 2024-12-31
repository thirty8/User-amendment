import React, { useState } from 'react';
import { Modal, TextInput, Loader } from '@mantine/core';
import Swal from 'sweetalert2';
import axios from 'axios';

const SignatoryDetails = () => {
  const [formData, setFormData] = useState({ nationalID: '', email: '', mobileNumber: '' });
  const [loading, setLoading] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,  // Update the specific field based on the input's name
    }));
  };

  console.log("----",formData)

  // Function to handle form submission
  const handleFormSubmit = () => {
    const { nationalID, mobileNumber } = formData;

    if (!nationalID && !mobileNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'National ID or Mobile Number is required.',
      });
      return;
    }

    let data = JSON.stringify({
      dynamicNumber: nationalID || mobileNumber, // Sending National ID or Mobile Number as dynamicNumber
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://10.203.14.195:3320/api/get-multiple-validation',
      headers: { 
        'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 
        'Content-Type': 'application/json'
      },
      data: data
    };

    setLoading(true);

    axios.request(config)
      .then((response) => {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        // Handle the response...
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'API Error',
          text: 'An error occurred while processing your request.',
        });
      });
  };

  return (
    <div>
      {/* <button
        onClick={() => setShowValidationModal(true)}
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Add Signatory
      </button> */}

      <Modal
        opened={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        title="Validation"
        trapFocus
        size="md"
        closeOnClickOutside={false}
        overlayOpacity={0.6}
        overlayColor="black"
      >
        <div style={{ padding: '16px' }}>
          <TextInput
            size="xs"
            label="National ID"
            placeholder="Enter National ID"
            name="nationalID"  // Add the name attribute
            value={formData.nationalID}
            onChange={handleInputChange}  // Use the generic change handler
            error={!formData.nationalID}
          />
          
          <TextInput
            size="xs"
            label="Mobile number 1"
            placeholder="Enter Mobile number"
            name="mobileNumber"  // Add the name attribute
            value={formData.mobileNumber}
            onChange={handleInputChange}  // Use the generic change handler
          />

          <TextInput
            size="xs"
            label="Email"
            placeholder="Enter Email address"
            name="email"  // Add the name attribute
            value={formData.email}
            onChange={handleInputChange}  // Use the generic change handler
          />
        </div>
        <div className="flex justify-end space-x-5">
          <button className="border rounded bg-sky-700 p-1 shadow border-black" >Clear</button>
          <button className="border rounded bg-sky-700 p-1 shadow border-black" onClick={handleFormSubmit}>Submit</button>
        </div>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Loader size={32} />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SignatoryDetails;
