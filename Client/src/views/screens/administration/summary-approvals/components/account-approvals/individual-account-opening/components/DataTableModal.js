import React, {useState} from 'react';
import { Modal } from '@mantine/core';
import { Row } from 'antd';
import {BsArrowRightSquareFill} from 'react-icons/bs'
import {AiOutlineFileSearch} from 'react-icons/ai'
// import AccountListEnquiry from '../../../account-activities/account-enquiry/components/account-list-enquiry';
// import AccountListEnquiry from '../../../account-activities/account-enquiry/components/account-list-enquiry';
import { Tooltip } from '@mantine/core';
import AccountListEnquiry from '../../../../../../account-activities/account-enquiry/components/account-list-enquiry';



const DataTableModal = ({ isOpen, onClose, userData, addValidationData, typeOfAccount }) => {
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [customerNumber, setCustomerNumber] = useState(null);


  const openAnotherModal = (customerNumber) => {
    // Set the customer number in a state variable
    setCustomerNumber(customerNumber);

    console.log("customerNumber", customerNumber)

    // Show the second modal by changing the state that controls its visibility
    setShowSecondModal(true);
  };

 // Filter the userData array to exclude rows with any null values
const filteredData = userData?.filter((i) => Object.values(i).every((value) => value !== null));

  return (
    <div>
    <Modal
      opened={isOpen}
      onClose={onClose}
      trapFocus
      size="xl"
      centered
      withCloseButton
      overlayOpacity={0.6}
      overlayColor="black"
      title="User already created"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          <thead>
            <tr className="bg-sky-700 border-b">
              <th className="p-1 text-white border text-left font-semibold text-sm">Relation Number</th>
              <th className="p-1 text-white border text-left font-semibold text-sm">First Name</th>
              <th className="p-1 text-white border text-left font-semibold text-sm">Last Name</th>
              <th className="p-1 text-white border text-left font-semibold text-sm">Mobile Number</th>
              <th className="p-1 text-white border text-left font-semibold text-sm">Posted By</th>
             <th className="p-1 text-white border text-center font-semibold text-sm">Actions</th> 
            </tr>
          </thead>
          {/* <tbody>
            {userData?.map((i)=><tr className="border-b">
              <td className="p-4">{i?.relation_no}</td>
              <td className="p-4">{i?.first_name}</td>
              <td className="p-4">{i?.last_name}</td>
              <td className="p-4">{i?.mobile1}</td>
              <td className="p-4">{i?.posted_by}</td>
               <td className="p-4">
                <div className="flex justify-center cursor-pointer p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>addValidationData(i)}>
                  <BsArrowRightSquareFill />
                </div>
              </td>
            </tr>
            )}
          </tbody> */}

            {/* {userData?.map((i, index) => ( */}
          {/* <tbody>
            {filteredData?.map((i, index) => (
              <tr className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`} key={index}>
                <td className="p-2">{i?.relation_no ?? ''}</td>
                <td className="p-2">{i?.first_name ?? ''}</td>
                <td className="p-2">{i?.last_name ?? ''}</td>
                <td className="p-2">{i?.mobile1 ?? ''}</td>
                <td className="p-2">{i?.posted_by ?? ''}</td>
                <td className="p-2">
                  <div className="flex justify-center cursor-pointer p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => addValidationData(i)}>
                    <BsArrowRightSquareFill />
                  </div>
                </td>
              </tr>
            ))}
          </tbody> */}

        <tbody>
          {filteredData?.map((i, index) => (
            <tr className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`} key={index}>
              <td className="p-1">{i?.relation_no ?? ''}</td>
              <td className="p-1">{i?.first_name ?? ''}</td>
              <td className="p-1">{i?.last_name ?? ''}</td>
              <td className="p-1">{i?.mobile1 ?? ''}</td>
              <td className="p-1">{i?.posted_by ?? ''}</td>
              {/* <td className="flex justify-center space-x-5 p-2">
                <div className=" cursor-pointer p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => addValidationData(i)}>
                  <BsArrowRightSquareFill />
                </div>

                <div className=" cursor-pointer p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => openAnotherModal(i?.customer_number)}>
                  <AiOutlineFileSearch />
                </div>
              </td> */}

    <td className="flex items-center justify-center space-x-5 p-2">

      <div>
        <Tooltip
          label="Add relation"
          position="left"
          align="left"
          gutter={10}
        
        >
          <div
            className="cursor-pointer p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => addValidationData(i)}
          >
            <BsArrowRightSquareFill />
          </div>
        </Tooltip>
      </div>

      <Tooltip
        label="Make Enquiry"
        position="right"
        align="right"
        gutter={10}
      >
        <div
          className="cursor-pointer p-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => openAnotherModal(i?.customer_number)}
        >
          <AiOutlineFileSearch />
        </div>
      </Tooltip>
    </td>
              


              {/* <td className="p-2">
                <div className="flex justify-center cursor-pointer p-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => openAnotherModal(i?.customer_number)}>
                  
                  Make enquiries
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>


        </table>
      </div>
    </Modal>




    {showSecondModal && (
        // Render the second modal within YourComponent
        <Modal
          opened={showSecondModal}
          onClose={() => setShowSecondModal(false)}
          trapFocus
          size="100%"
          centered
          withCloseButton
          overlayOpacity={0.6}
          overlayColor="black"
          title="Enquiry Screen"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
        >
        
          <div className="modal">
            <div className="modal-content">
              {/* <h2>Customer Number: {customerNumber}</h2> */}
              <AccountListEnquiry matrix={customerNumber} />
              <button className='border px-1 bg-sky-700 text-white' onClick={() => setShowSecondModal(false)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DataTableModal;
