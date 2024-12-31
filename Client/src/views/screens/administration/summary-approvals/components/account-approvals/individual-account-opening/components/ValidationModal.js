import React, { useEffect, useState } from 'react';
import { Modal, TextInput, rem, Loader } from '@mantine/core';
// import { IconAt } from '@tabler/icons-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DataTableModal from './DataTableModal'; // Import DataTableModal
import { API_SERVER } from '../../../../../../../../config/constant';
// import { API_SERVER } from '../../../../../config/constant';

const ValidationModal = ({ isOpen, onClose, setRelationData, setRelData, addValidationData, typeOfAccount }) => {
  const [formData, setFormData] = useState({
    nationalID: '',
    email: '',
    mobileNumber: '',
  });

  const [showDataTableModal, setShowDataTableModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null); // Store user data

  const handleFormSubmit = () => {
    const { nationalID, email, mobileNumber } = formData;

    if (!nationalID && !mobileNumber) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'National ID is mandatory.',
        });
        return;
      }

     // Check if both mandatory fields are empty



    if (nationalID || email || mobileNumber) {
      const data = JSON.stringify({
        NIN: nationalID,
        MOBILE1: mobileNumber,
        MOBILE2: '',
        EMAIL_ADDRESS: email,
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: API_SERVER + '/api/get-multiple-validation',
        headers: {
          'x-api-key': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          'Content-Type': 'application/json',
          'Cookie': 'connect.sid=s%3ApbmeZuSpcr6qmj0HxUvix9jHzt56DwYZ.fioc0TMVHTio7Bi9Zy1ddPQbVTkkANOJAN3p3KYsm1I',
        },
        data: data,
      };

      setLoading(true);

      axios
        .request(config)
        .then((response) => {
          if (response.data.userExists) {
            setShowDataTableModal(true);
            setUserData(response.data.userData); // Set user data
            setRelData(response.data.userData)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'User Does Not Exist',
              text: 'The user you are looking for does not exist.',
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while processing your request.',
          });
          setLoading(false);
        });
    } else {
      setShowDataTableModal(false);
    }
  };

  const clearForm = () => {
    setFormData({
      nationalID: '',
      email: '',
      mobileNumber: '',
    });
    setShowDataTableModal(false);
  };

  useEffect(()=>{if(!isOpen){
  setShowDataTableModal(false)
}
  }, [isOpen])
  return (
    <>
      <Modal
        opened={isOpen}
        onClose={onClose}
        trapFocus
        size="md"
        // centered
        closeOnClickOutside={false}
        overlayOpacity={0.6}
        overlayColor="black"
        title="Validation"
      >
        <div style={{ padding: '16px' }}>
          <TextInput
            size="xs"
            label="National ID"
            placeholder="Enter National ID"
            value={formData.nationalID}
            onChange={(event) =>
              setFormData({ ...formData, nationalID: event.target.value })
            }
            error={!formData.nationalID}
          />
          
          <TextInput
            size="xs"
            label="Mobile number 1"
            placeholder="Enter Mobile number"
            value={formData.mobileNumber}
            onChange={(event) =>
              setFormData({ ...formData, mobileNumber: event.target.value })
            }
            // error={!formData.mobileNumber}
          />

        <TextInput
            size="xs"
            label="Mobile number 2"
            placeholder="Enter Mobile number"
            // value={formData.mobileNumber}
            // onChange={(event) =>
            //   setFormData({ ...formData, mobileNumber: event.target.value })
            // }
            
          />

        <TextInput
            size="xs"
            label="Email"
            placeholder="Enter Email address"
            value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
          />
        </div>
        <div className='flex justify-end space-x-5'>
          <button className='border rounded bg-sky-700 p-1 shadow border-black' onClick={clearForm}>Clear</button>
          <button className='border rounded bg-sky-700 p-1 shadow border-black' onClick={handleFormSubmit}>Submit</button>
        </div>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Loader size={32} />
          </div>
        )}
      </Modal>

      {showDataTableModal && userData && (
        <DataTableModal
          isOpen={showDataTableModal}
          onClose={() => setShowDataTableModal(false)}
          userData={userData} // Pass userData as a prop
          setRelationData={setRelationData}
          addValidationData={addValidationData}
          typeOfAccount={typeOfAccount}
          // setRelData ={setRelData}
        />
      )}
    </>
  );
};

export default ValidationModal;
