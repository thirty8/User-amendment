import React, {useState, useEffect} from 'react'
import Label from "../../../../../components/others/Label/Label";
import { API_SERVER } from "../../../../../config/constant";
import { Modal } from '@mantine/core';
import {FcPlus} from "react-icons/fc"
import axios from 'axios'
import ListOfValue from './comp/ListOfValue';
import InputField from './comp/InputField';
import DocumentCapture from '../../../../../components/DocumentCapture';


const Account_Mandate = ({dataD, custType, storedFormData, handleChangeDocs}) => {
  const [accountMandate, setAccountMandate] = useState([])
  const customTheme = JSON.parse(localStorage.getItem("theme"));
  const getTheme = JSON.parse(localStorage.getItem("theme"));
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDocumentInputClick = () => {
    // setModalVisible(true);
    alert("clicked!!!")
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  const [rows, setRows] = useState([
    // { relationNo: 123, firstName: 'John', surname: 'Doe', middleName: 'A.', signatoryLevels: 'Manager', approveLimit: '$10,000', photoSig: '', fingerprint: '' },
    // { relationNo: 456, firstName: 'Jane', surname: 'Smith', middleName: 'B.', signatoryLevels: 'Supervisor', approveLimit: '$5,000', photoSig: '', fingerprint: '' },
    // Add initial rows as needed
  ]);

  const handleCheckboxChange = (relationNo) => {
    const selectedSet = new Set(selectedRows);

    if (selectedSet.has(relationNo)) {
      selectedSet.delete(relationNo);
    } else {
      selectedSet.add(relationNo);
    }

    setSelectedRows(Array.from(selectedSet));
  };

  const addRow = () => {
    const newRow = {
      relationNo: 789,
      firstName: '',
      surname: '',
      middleName: '',
      signatoryLevels: '',
      approveLimit: '',
      photoSig: '',
      fingerprint: '',
    };

    setRows([...rows, newRow]);
  };



//   const [dataA, setDataA] = useState([
//     { 
//       Tick: <input type='checkbox' />, 
//       RelationNo: '', 
//       FirstName: '', 
//       Surname: '', 
//       MiddleName: '', 
//       SignatoryLevels: '', 
//       ApproveLimit: '', 
//       PhotoSig: 
//       <div 
//     style={{background:
//       `url(` +
//       window.location.origin +
//       `/assets/images/headerBackground/` +
//       getTheme.theme.headerImage +
//             `)`,}} className='rounded text-white text-center cursor-pointer'>PhotoSig</div>, 
//       FingerPrint: 
//       <div style={{background:
//       `url(` +
//       window.location.origin +
//       `/assets/images/headerBackground/` +
//       getTheme.theme.headerImage +
//       `)`,}} className='rounded text-white text-center cursor-pointer'>PhotoSig</div> 
//     },

//     { 
//       Tick: <input type='checkbox' />, 
//       RelationNo: '', 
//       FirstName: '', 
//       Surname: '', 
//       MiddleName: '', 
//       SignatoryLevels: '', 
//       ApproveLimit: '', 
//       PhotoSig: <div 
//     style={{background:
//       `url(` +
//       window.location.origin +
//       `/assets/images/headerBackground/` +
//       getTheme.theme.headerImage +
//             `)`,}} className='rounded text-white text-center cursor-pointer'>PhotoSig</div>, 
//       FingerPrint: <div style={{background:
//       `url(` +
//       window.location.origin +
//       `/assets/images/headerBackground/` +
//       getTheme.theme.headerImage +
//       `)`,}} className='rounded text-white text-center cursor-pointer'>PhotoSig</div> 
//     },

//     { 
//       Tick: <input type='checkbox' />, 
//       RelationNo: '', 
//       FirstName: '', 
//       Surname: '', 
//       MiddleName: '', 
//       SignatoryLevels: '', 
//       ApproveLimit: '', 
//       PhotoSig: <div 
//     style={{background:
//       `url(` +
//       window.location.origin +
//       `/assets/images/headerBackground/` +
//       getTheme.theme.headerImage +
//             `)`,}} className='rounded text-white text-center cursor-pointer'>PhotoSig</div>, 
//       FingerPrint: <div style={{background:
//       `url(` +
//       window.location.origin +
//       `/assets/images/headerBackground/` +
//       getTheme.theme.headerImage +
//       `)`,}} className='rounded text-white text-center cursor-pointer'>PhotoSig</div> 
//     },
  
//   ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = rows.slice(startIndex, endIndex);

  // const headers = {
  //   "x-api-key": process.env.REACT_APP_API_KEY,
  //   "Content-Type": "application/json",
  // };

  const headers={
    'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'Content-Type': 'application/json'
  };

  useEffect(() => {
// Get Account Mandate
    const getAccountMandate = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "AMD",
        },{headers})
        .then(function (response) {
          setAccountMandate(response.data)
        });
    };

    getAccountMandate()
  },[])



  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // const bgColor =
  //   `url(` +
  //   window.location.origin +
  //   `/assets/images/background/` +
  //   customTheme.theme.backgroundImage +
  // `)`;




  const dataData = []

  const handleInputChange = () => {

  }
  

  console.log("dataD::::", dataD)


  

    
  return (
    <div>
      <div className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          <div className="w-full max-w-xl">
            {/* Account Mandate */}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                <div class="md:w-1/3">
                  <Label label="Account Mandate" fontSize="85%" />
                </div>
                <div className="md:w-2/3 ">
                  <ListOfValue
                    data={accountMandate} 
                    inputWidth="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

    <div className='md:p-5'>
      <table className="min-w-full divide-y divide-gray-200">
      <thead style={{background: '', zoom:"0.70"}} className='text-white bg-sky-700'>
        <tr>
          {/* <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            TICK
          </th> */}
          <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            RELATION NO
          </th>
          <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            FIRST NAME
          </th>
          <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            SURNAME
          </th>
          <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            MIDDLE NAME
          </th>
          <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            SIGNATORY LEVELS
          </th>
          <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            APPROVE LIMIT
          </th>
          <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            PHOTO / SIG
          </th>
          <th className="px-6 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            FINGER PRINT
          </th>
        </tr>
      </thead>
        <tbody className="bg-white divide-y divide-gray-200">
              {storedFormData.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-sky-300'}>
                  <td className="text-center">1033627845</td>
                  <td>{data.P_fname}</td>
                  <td>{data.P_mname}</td>
                  <td>{data.P_sname}</td>
                  <td>{data.P_dob}</td>
                  {/* <td>{data.dob_v}</td> */}
                  <td>{data.P_Mobile_comm_no}</td>
                  <td>
                    <input
                      type="file"
                      className="border border-gray-300 rounded px-2 py-[1px]"
                      // value={item.photoSig}
                      onChange={(e) => handleInputChange(index, 'photoSig', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="file"
                      className="border border-gray-300 rounded px-2 py-[1px]"
                      // value={item.fingerprint}
                      onChange={(e) => handleInputChange(index, 'fingerprint', e.target.value)}
                    />
                  </td>
                </tr>
                ))}
             
        </tbody>
      </table>
      <div className='flex justify-end cursor-pointer'>
        <FcPlus onClick={addRow} className='h-10 w-10'/>
      </div>
    </div>


        <div className="md:p-5">
        <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-sky-700" 
                style={{background: '',zoom:"0.70"}}
                  >
                  <tr>
                  <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs text-white font-bold uppercase tracking-wider"
                      style={{borderRight: '1px solid #ddd'}}
                      >
                      Checked
                      </th>
                      <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs text-white font-bold uppercase tracking-wider"
                      style={{borderRight: '1px solid #ddd'}}
                      >
                      S/No
                      </th>
                      <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                      style={{borderRight: '1px solid #ddd'}}
                      >
                      Description
                      </th>
                      <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                      style={{borderRight: '1px solid #ddd'}}
                      >
                      Doc.Code
                      </th>

                      <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                      style={{borderRight: '1px solid #ddd'}}
                      >
                      Document No
                      </th>
                      <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs text-white font-bold uppercase tracking-wider"
                      style={{borderRight: '1px solid #ddd'}}
                      >
                      Doc Date
                      </th>

                      <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs text-white font-bold uppercase tracking-wider"
                      style={{borderRight: '1px solid #ddd'}}
                      >
                      Mandate
                      </th>

                      <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs text-white font-bold uppercase tracking-wider"
                      style={{borderRight: '1px solid #ddd'}}
                      >
                      Received Date
                      </th>

                      {/* <th className="px-4 py-2">Actions</th> */}
                  </tr> 
              </thead>
            {dataD.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6" style={{textAlign: 'center', fontWeight:'18px'}}>Sorry, No Matching Records found</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {dataD.map((item, index) => (
                    <tr key={item.sr_no} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-sky-300'} >
                      <td className='text-center'>
                        <input type="checkbox" onChange={(e) => handleChangeDocs(e, index, 'd')}  name="" id="" />
                      </td>
                      <td className='text-center'>{item.sr_no}</td>
                      <td>{item.description}</td>
                      <td className='text-center'>{item.doc_code}</td>
                      <td className='text-center border w-10 py-1'><InputField type='text' onChange={(e) => handleChangeDocs(e, index, 'a')} /></td>
                      <td className='text-center border w-10 py-1'><InputField type='date' onChange={(e) => handleChangeDocs(e, index, 'b')} /></td>
                      <td className='text-center'>{item.mandate}</td>
                      <td className='text-center border w-10 py-1'><InputField type='date' onChange={(e) => handleChangeDocs(e, index, 'c')} /></td>
                    </tr>
                  ))}
                </tbody>
              )}
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div>
              Showing {startIndex + 1}-{endIndex > totalItems ? totalItems : endIndex} of {totalItems} items
            </div>
            {/* <div className='flex space-x-3'>
              <button disabled={currentPage === 1} onClick={handlePrevPage}>Prev</button>
              <button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
            </div> */}
          </div>
        </div>
        {/* {isComponentVisible && <DocumentCapture />} */}
        <Modal opened={isModalVisible} onClose={closeModal} title="Modal Title" size="sm">
          <DocumentCapture />
        <button onClick={closeModal}>Close Modal</button>
        </Modal>
      </div>
    </div>
  );
}

export default Account_Mandate