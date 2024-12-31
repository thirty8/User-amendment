import React, {useState, useEffect} from 'react'
import Label from "../../../../../components/others/Label/Label";
import { API_SERVER } from "../../../../../config/constant";
import { Modal } from '@mantine/core';
import {FcPlus} from "react-icons/fc"
import axios from 'axios'
import ListOfValue from './comp/ListOfValue';
import InputField from './comp/InputField';
import DocumentCapture from '../../../../../components/DocumentCapture';
import ImageCapturing from '../../../../../components/ImageCapturing';
import ImageSignatureCapture from '../../../../../../../../components/ImageSignatureCapture';


const Mandate = ({arrayDocs, relationData, ImageVerification, randomNumberString, dataD, custType, storedFormData, handleChangeDocs}) => {
  const [accountMandate, setAccountMandate] = useState([])
  const customTheme = JSON.parse(localStorage.getItem("theme"));
  const getTheme = JSON.parse(localStorage.getItem("theme"));
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageModal, setImageModal] = useState(false)

  const [randonNum, setRandonNum] = useState('')


  const handleDocumentInputClick = () => {
    // setModalVisible(true);
    alert("clicked!!!")
  };
  
  const openModal = (randomNumberString) => {
    setImageModal(true);
    setRandonNum(randomNumberString)
  };

  const closeModal = () => {
    setImageModal(false);
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
          <th className="px-6 py-3 text-center text-xs leading-4 font-bold uppercase tracking-wider" style={{borderRight: '1px solid #ddd'}}>
            SIGNATURE AND IMAGE CAPTURING
          </th>
        </tr>
      </thead>
        <tbody className="bg-white divide-y divide-gray-200">
              {relationData.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-300'}>
                  <td className="text-center">{data.randomNumberString}</td>
                  <td>{data.P_fname}</td>
                  <td>{data.P_mname}</td>
                  <td>{data.P_sname}</td>
                  <td>{data.P_dob}</td>
                  {/* <td>{data.dob_v}</td> */}
                  <td>{data.P_Mobile_comm_no}</td>
                  <td className='flex justify-center'>
                    <div>
                        <button 
                            onClick={()=>openModal(data.randomNumberString)} 
                            className='border text-center text-white border-gray-400 bg-sky-700 px-1'
                        >
                            Image and Signature Verification
                        </button>
                    </div>
                    {/* <input
                      type="button"
                      placeholder='Image and Signature Verification'
                      className="border border-gray-300 rounded px-2 py-[1px]"
                      // value={item.photoSig}
                    //   onChange={(e) => handleInputChange(index, 'photoSig', e.target.value)}
                        onClick={openModal}
                    /> */}
                  </td>
                  {/* <td>
                    <input
                      type="file"
                      className="border border-gray-300 rounded px-2 py-[1px]"
                      // value={item.fingerprint}
                      onChange={(e) => handleInputChange(index, 'fingerprint', e.target.value)}
                    />
                  </td> */}
                </tr>
                ))}
             
        </tbody>
      </table>
      <div className='flex justify-end cursor-pointer'>
        <FcPlus onClick={addRow} className='h-10 w-10'/>
      </div>

      
    </div>

    {imageModal && 
    // <div>Mand</div>
    <Modal 
     opened={imageModal}
     onClose={closeModal}
     size='lg'
    >
     <div>
        {/* <ImageCapturing id={randonNum} /> */}
        <ImageSignatureCapture id={randonNum} />
     </div>
    </Modal>
        // <ImageVerification />
     }

      

        
        {/* {isComponentVisible && <DocumentCapture />} */}
        {/* <Modal opened={isModalVisible} onClose={closeModal} title="Modal Title" size="sm">
          <DocumentCapture />
        <button onClick={closeModal}>Close Modal</button>
        </Modal> */}
      </div>
    </div>
  );
}

export default Mandate