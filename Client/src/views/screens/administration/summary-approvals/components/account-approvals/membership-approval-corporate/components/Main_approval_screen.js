import React, { useState } from 'react';
import { Modal, Button } from '@mantine/core';

const Main_approval_screen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const tableData = [
        {
          recordId: 1,
          customerId: 'C001',
          accountNumber: 'ACCT001',
          customerName: 'John Doe',
          dateOpened: '2023-07-31',
          accountType: 'Savings',
          postedBy: 'Admin',
        },
        // Add more data here if needed
      ];

      const handleViewDetails = (data) => {
        setSelectedAccount(data);
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };

  return (
    <div>
        <table className="w-full border-collapse table-auto">
        <thead className='bg-sky-700'>
          <tr>
            <th className="border text-left px-4 py-2">Record ID</th>
            <th className="border text-left px-4 py-2">Customer ID</th>
            <th className="border text-left px-4 py-2">Account Number</th>
            <th className="border text-left px-4 py-2">Customer Name</th>
            <th className="border text-left px-4 py-2">Date Opened</th>
            <th className="border text-left px-4 py-2">Account Type</th>
            <th className="border text-left px-4 py-2">Posted By</th>
            <th className="border text-left px-4 py-2">View Account Details</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={data.recordId} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              {/* Table rows */}
              <td className="border px-4 py-1">{data.recordId}</td>
              <td className="border px-4 py-1">{data.customerId}</td>
              <td className="border px-4 py-1">{data.accountNumber}</td>
              <td className="border px-4 py-1">{data.customerName}</td>
              <td className="border px-4 py-1">{data.dateOpened}</td>
              <td className="border px-4 py-1">{data.accountType}</td>
              <td className="border px-4 py-1">{data.postedBy}</td>
              <td className="border px-4 py-1 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                  onClick={() => handleViewDetails(data)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    <Modal
        opened={isModalVisible}
        onClose={closeModal}
        title="Account Details"
        size="sm"
      >
        {selectedAccount && (
          <div>
            <p>Record ID: {selectedAccount.recordId}</p>
            <p>Customer ID: {selectedAccount.customerId}</p>
            <p>Account Number: {selectedAccount.accountNumber}</p>
            <p>Customer Name: {selectedAccount.customerName}</p>
            <p>Date Opened: {selectedAccount.dateOpened}</p>
            <p>Account Type: {selectedAccount.accountType}</p>
            <p>Posted By: {selectedAccount.postedBy}</p>
          </div>
        )}
        <Button
          variant="light"
          onClick={closeModal}
          className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </Button>
      </Modal>
    </div>
   
  )
}

export default Main_approval_screen