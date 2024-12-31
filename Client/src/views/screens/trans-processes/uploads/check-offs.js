
//Karen's check off oringinal
// import React, { useEffect, useState } from "react";
// import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
// import InputField from "../../../../components/others/Fields/InputField";
// import axios from "axios";
// import { API_SERVER } from "../../../../config/constant";
// import Header from "../../../../components/others/Header/Header";
// import GlobalModal from "./components//modal";
// import ButtonWColor from "./components/button";
// import { AiOutlineEye } from "react-icons/ai";
// import fileImg from "../../../../assets/images/file1.png";
// import uploadImg from "../../../../assets/images/upload.png";
// import excelfile from "../../../../assets/images/excel.png";
// import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
// import { FileUploader } from "react-drag-drop-files";
// import Swal from "sweetalert2";
// import { Modal } from '@mantine/core';
// import CustomTable from "../../teller-ops/components/CustomTable";

// // this sceen is being replicated from SALARY UPLOAD

// function CheckOffs() {
//   const [getBatchNumber, setBatchNumber] = useState("");
//   const [showModal1, setShowModal1] = useState(false);
//   const [form, setForm] = useState("");
//   const [modalKey, setModalKey] = useState("");
//   const [currencyCode, setCurrencyCode] = useState("010");
//   const [uploadedFile, setUploadedFile] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [progress, setProgress] = useState("");
//   const [result, setResult] = useState({});

//   const [debitAccount, setDebitAccount] = useState("");
//   const [amount, setAmount] = useState("");
//   const [totalTrans, setTotalTrans] = useState("");
//   const [failedTrans, setfailedTrans] = useState("");
//   const [batch, setBatch] = useState("");
//   const [file, setFile] = useState(null);



//   const headers = {
//     "x-api-key":
//       "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//     "Content-Type": "application/json",
//   };

//   function fetchBatchNumber() {
//     axios
//       .get(API_SERVER + "/api/get-unique-ref", {
//         headers: headers,
//       })
//       .then(function (response) {
//         setBatchNumber(response.data[0]?.unique_ref);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   useEffect(() => {
//     fetchBatchNumber();
//   }, []);


//   const fileTypes = ["CSV","XLS", "XLSX"];
// //function for dragging and dropping files

// const handleChange = (file) => {
//     console.log(file.name,'ppppss')

//     setFile(file);
//     console.log(file,"ppppppp")
//   };
// //

//   function onChanges(file) {
//     // Handle the file selection
//     if (file) {
//       const selectedFile = file;
//       setUploadedFile({
//         name: selectedFile.name,
//         size: `${selectedFile.size / 1000} KB`,
//       });
//       console.log(selectedFile,"ppppppp")

//       // Prepare the FormData object
//       let data = new FormData();
//       data.append("referenceNumber", getBatchNumber);
//       data.append("userId", "CIBUSER1");
//       data.append("customerNumber", "052900");
//       data.append("file", selectedFile);

//       // Axios config
//       let config = {
//         method: "post",
//         maxBodyLength: Infinity,
       
//         // url: "https://test.slcb.com:8443/ibank/api/v2.2/corporate/uploadBulkNew2",
//         url:"http://10.203.14.16:8181/ibank/api/v2.0/test/corporate/uploadBulkNew2",
//         // url: "http://192.168.1.28:8080/corporate/uploadBulkNew2",
//         // url: "http://192.168.1.137:8080/corporate/uploadBulkNew2",
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         data: data,
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setProgress(`Upload progress: ${percentCompleted}%`);
//           console.log(`Upload progress: ${percentCompleted}%`);
//         },
//       };

//       // Make the request
//       axios
//         .request(config)
//         .then((response) => {
//           if (response?.data?.responseCode !== "000") {
//             Swal.fire({
//               title: "Error",
//               text: response?.data?.message,
//               icon: "error",
//             });
//           }
//           console.log("Response:", JSON.stringify(response.data));
//           setResult(response.data.data);

//           console.log(
//             response.data.data?.uploadInfo?.uploadDetails?.debitAccount,
//             "answer"
//           );

//           setDebitAccount(
//             response.data.data?.uploadInfo?.uploadDetails?.debitAccount
//           );
//           setAmount(response.data.data?.uploadInfo?.uploadDetails?.totalAmount);
//           setTotalTrans(response.data.data?.uploadInfo?.uploadData?.length);
//           setfailedTrans(response.data.data?.validationErrors?.length);
//           setBatch( response.data.data?.uploadInfo?.uploadDetails?.referenceNumber)

//         })
//         .catch((error) => {
//           console.log("Error:", error);
//         });
//     }

//     // Reset the file input value to ensure it triggers the next time
//     // e.target.value = "";
//   }


// //   function onChanges(e) {
// //     // Handle the file selection
// //     if (e.target.files.length > 0) {
// //       const selectedFile = e.target.files[0];
// //       console.log(e.target.files[0],'pppppp')
// //       setUploadedFile({
// //         name: selectedFile.name,
// //         size: `${selectedFile.size / 1000} KB`,
// //       });

// //       // Prepare the FormData object
// //       let data = new FormData();
// //       data.append("referenceNumber", getBatchNumber);
// //       data.append("userId", "Eddie");
// //       data.append("customerNumber", "01333");
// //       data.append("file", selectedFile);

// //       // Axios config
// //       let config = {
// //         method: "post",
// //         maxBodyLength: Infinity,
// //         url: "https://test.slcb.com:8443/ibank/api/v2.2/corporate/uploadBulkNew2",
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //         data: data,
// //         onUploadProgress: (progressEvent) => {
// //           const percentCompleted = Math.round(
// //             (progressEvent.loaded * 100) / progressEvent.total
// //           );
// //           setProgress(`Upload progress: ${percentCompleted}%`);
// //           console.log(`Upload progress: ${percentCompleted}%`);
// //         },
// //       };

// //       // Make the request
// //       axios
// //         .request(config)
// //         .then((response) => {
// //           if (response?.data?.responseCode !== "000") {
// //             Swal.fire({
// //               title: "Error",
// //               text: response?.data?.message,
// //               icon: "error",
// //             });
// //           }
// //           console.log("Response:", JSON.stringify(response.data));
// //           setResult(response.data.data);

// //           console.log(
// //             response.data.data?.uploadInfo?.uploadDetails?.debitAccount,
// //             "answer"
// //           );

// //           setDebitAccount(
// //             response.data.data?.uploadInfo?.uploadDetails?.debitAccount
// //           );
// //           setAmount(response.data.data?.uploadInfo?.uploadDetails?.totalAmount);
// //           setTotalTrans(response.data.data?.uploadInfo?.uploadData?.length);
// //           setfailedTrans(response.data.data?.validationErrors?.length);
// //           setBatch( response.data.data?.uploadInfo?.uploadDetails?.referenceNumber)

// //         })
// //         .catch((error) => {
// //           console.log("Error:", error);
// //         });
// //     }

// //     // Reset the file input value to ensure it triggers the next time
// //     e.target.value = "";
// //   }
//   console.log(result?.uploadInfo?.uploadDetails?.debitAccount, "answer1");

//   console.log(debitAccount, "debitAccount");
//   console.log(amount, "amount");
//   console.log(totalTrans, "totalTrans");
//   console.log(failedTrans, "failedTrans");

//   return (
    
//     <div>
//               <Modal opened={showModal} onClose={() => { setShowModal(false) }} size={"80%"}>


//   <Header title={"Debit Details"}
//   headerShade={true}/>
//   <div className="flex w-full justify-center items-center p-4" >
//   <div 
            
//             style={{
//             //   marginTop:"20px",
//               padding: "10px",
//               border: "2px solid #dfdce6",
//               borderRadius: "12px",
//               // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//               width: "80%",
//               display: "flex",
              
            
              
//             }}
//           >
           
//             <div className="">
//               <div className="bg-white rounded-lg flex-grow-0 border-2 border-black-100 p-2  ">
//                 <img src={excelfile} className="w-[25px]" />
//               </div>
//             </div>

//             <div className="flex flex-col pl-5 w-full">
//               <div className="flex justify-between">
//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Batch Number
//                   </span>
//                   <span className="text-gray-400">{getBatchNumber}</span>
//                 </div>

//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Debit Account Number
//                   </span>
//                   <span className="text-gray-400">{debitAccount}</span>
//                 </div>

//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Total Amount
//                   </span>
//                   <span className="text-gray-400">{amount}</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Total Trans
//                   </span>
//                   <span className="text-gray-400">{totalTrans}</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Failed Trans
//                   </span>
//                   <span className="text-gray-400">{failedTrans}</span>
//                 </div>
//               </div>

//               <br />

//               <div className="flex justify-end  w-full text-sm">
                
//                 <div className="flex space-x-2">
//                   <div className="text-gray-400 text-sm">
//                     {" "}
//                     {uploadedFile?.name}
//                   </div>
//                   <div className="text-gray-400 text-sm ">
//                     {" "}
//                     {uploadedFile?.size}
//                   </div>
//                 </div>
//               </div>
//             </div>
           
//           </div>
//           </div>
//           <div  className="pt-10">
//             <CustomTable
//             headers={["Account Name", "Credit Account", "Amount", "Bank", "Trans Description"]}
//             data={result?.uploadInfo?.uploadData?.map((i)=>[
//                 i?.name, i?.accountNumber, i?.amount, i?.bank, i?.transDescription
//             ])}
            
//             />
//           </div>
                
//                 </Modal>

//       <div className="mb-6">
        
//         <ActionButtons
//           displayCancel={"none"}
//           displayDelete={"none"}
//           displayFetch={"none"}
//           displayHelp={"none"}
//           displayRefresh={"none"}
//           displayReject={"none"}
//           displayAuthorise={"none"}
//           displayView={"none"}
//           // onExitClick={() => setIsChecked(!isChecked)}
//         />
//       </div>
//       <Header title={"Transacton Description"} headerShade={true} />

//       <div
//         style={{
//           padding: "20px",
//           border: "2px solid #dfdce6",
//           borderRadius: "5px",
//           boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//           marginTop: "10px",
//           marginBottom: "10px",
//         }}
//       >
//         <div className="bg-white flex w-full px-4 justify-between">
//           {/* Batch, Trans Desc and Currency */}

//           <div className="flex ">
//             {/* "w-[35%]" */}
//             <span
//               className="font-bold text-gray-500 pr-2"
//               style={{ whiteSpace: "nowrap" }}
//             >
//               Batch Number :
//             </span>
//             <span className="text-gray-400">{getBatchNumber}</span>
//           </div>

//           <div>
//             <span
//               className="font-bold text-gray-500 pr-2"
//               style={{ whiteSpace: "nowrap" }}
//             >
//               Trans Description :
//             </span>
//             <span className="text-gray-400">SAL-SALARY TRANSACTIONS</span>
//           </div>

//           <div>
//             <span
//               className="font-bold text-gray-500 pr-2"
//               style={{ whiteSpace: "nowrap" }}
//             >
//               Currency :
//             </span>
//             <span className="text-gray-400">KES-Kenya Shillings</span>
//           </div>

//           <div>
//             <div>
//               <button
//                 className="bg-black flex items-center justify-center space-x-1 text-gray-100 rounded px-3 py-[5.5px]"
//                 onClick={() => {
//                   setShowModal1(true);
//                   setForm("View Exceptions");
//                   setModalKey("viewExceptionsFees");
//                 }}
//               >
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="32"
//                   height="32"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <path
//                     d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15"
//                     stroke="#FF8A65"
//                     stroke-width="1.5"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   ></path>
//                 </svg>

//                 <span>View Exceptions</span>
//               </button>
//               {/* <ButtonWColor
//                                 buttonIcon={<AiOutlineEye />}
//                                 buttonColor={"white"}
//                                 label={"View Exceptions"}
//                                 buttonHeight={"25px"}
//                                 buttonBackgroundColor={"#d8392b"}
//                                 onClick={() => {
//                                     setShowModal1(true);
//                                     setForm("View Exceptions");
//                                     setModalKey("viewExceptionsFees");
//                                 }}
//                             /> */}
//               <GlobalModal
//                 showModal1={showModal1}
//                 setShowModal1={setShowModal1}
//                 setForm={setForm}
//                 modalKey={modalKey}
//                 form={form}
//                 batch={getBatchNumber}
//                 currency_CODE={currencyCode}
//                 // InvalidAccountData={InvalidAccountData}
//               />
//             </div>
//           </div>
//         </div>

//         <div></div>
//       </div>

//       {/* <Header
//                 title={"FILE UPLOAD"}
//                 headerShade={true}



//             /> */}
//       <div className="mb-10 bg-gray-200 py-2 px-2 font-semibold">FILE UPLOAD</div>
     

//       <div className=" bg-white items-center  w-[80%] px-4  mx-auto">
//       {/* <div className="pt-10 bg-white flex flex-col items-center   justify-center w-full px-4 ">
//         <div 
//           onClick={() => {
//             document?.getElementById("upload").click();
//           }}
//           className="group cursor-pointer hover:border-gray-300 border-[2px] transition-colors border-dashed"
//           style={{
//             marginTop: "20px",
//             padding: "10px",
//             // border: "2px dashed #dfdce6",
//             borderRadius: "12px",
//             // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//             width: "80%",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <div className="flex flex-col  justify-center items-center py-3">
//             <div className="relative ">
//               <img src={fileImg} className="w-[60px]" />

//               <div className="bg-black rounded-full right-[-3px] bottom-[-8px] absolute p-[4px]">
//                 <img src={uploadImg} className="w-[20px]" />
//               </div>
//             </div>
//             <div className="flex pt-4">
//               <input
//                 type="file"
//                 id="upload"
//                 className="hidden"
//                 onChange={onChanges}
//               />
//               <span
//                 className="font-weight: 600 text-gray-500 pr-2 hover:cursor-pointer group-hover:text-blue-600 transition-all delay-200 duration-300 underline underline-offset-2"
//                 style={{ whiteSpace: "nowrap" }}
//               >
//                 Click to Upload
//               </span>
              
//               <span className="text-gray-400 "> or drag and drop</span>
//             </div>
//             <div className="text-gray-400 "> Maximum file size 50MB</div>

//           </div>
//         </div>
//         </div> */}

//         <FileUploader handleChange={onChanges}
//          onDrop={onChanges} 
//          name="file" types={fileTypes}
//              children={<div className="group cursor-pointer hover:border-gray-300 border-[2px] transition-colors border-dashed w-[100%] mx-auto "
//                 style={{
//                   marginTop: "20px",
//                   padding: "10px",
//                   borderRadius: "12px",
//                 }}>
//                      <div className="flex flex-col justify-center items-center space-y-1 ">
//                         <div className="relative  pt-2">
//               <img src={fileImg} className="w-[60px]" />

//               <span className="bg-black rounded-full left-[35px] bottom-[-8px] absolute p-[4px] w-[25px]">
//                 <img src={uploadImg} className="w-[20px]" />
//               </span>
//             </div>
//                      <div className="pt-2">
//                      <span
//                 className="font-weight: 600 text-gray-500 pr-2 hover:cursor-pointer group-hover:text-blue-600 transition-all delay-200 duration-300 underline underline-offset-2"
//                 style={{ whiteSpace: "nowrap" }}
//               >
                
//                 Click to Upload
//               </span>
//               <span className="text-gray-400 "> or drag and drop</span>
//                      </div>
//               <div className="text-gray-400 "> Maximum file size 50MB</div>
//                      </div>
//                      </div>}
//               />
//         {/* <FileUploader handleChange={handleChange} onDrop={()=>document?.getElementById("upload").click()} name="file" types={fileTypes}
             
//               /> */}

//         {uploadedFile && (
//           <div
//             onClick={() => setShowModal(true)}
//             className="relative "
//             style={{
//               marginTop: "20px",
//               padding: "10px",
//               border: "2px solid #dfdce6",
//               borderRadius: "12px",
//               // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
//               width: "100%",
//               display: "flex",
//               justifyContent: "start",
//             }}
//           >
//             <span
//               className="absolute -right-10"
//               onClick={(e) => {
//                 e.stopPropagation()
//                 setUploadedFile("");
//               }}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="28"
//                 height="28"
//                 viewBox="0 0 24 24"
//                 fill="none"
//               >
//                 <path
//                   d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82ZM19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Zm-5.57 9.61h-3.33c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.33c.41 0 .75.34.75.75s-.34.75-.75.75Zm.84-4h-5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5c.41 0 .75.34.75.75s-.34.75-.75.75Z"
//                   fill="#f47373"
//                 ></path>
//               </svg>
//             </span>

//             <div className="">
//               <div className="bg-white rounded-lg flex-grow-0 border-2 border-black-100 p-2  ">
//                 <img src={excelfile} className="w-[25px]" />
//               </div>
//             </div>

//             <div className="flex flex-col pl-5 w-full">
//               <div className="flex justify-between">
//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Batch Number
//                   </span>
//                   <span className="text-gray-400">{batch}</span>
//                 </div>

//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Debit Account Number
//                   </span>
//                   <span className="text-gray-400">{debitAccount}</span>
//                 </div>

//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Total Amount
//                   </span>
//                   <span className="text-gray-400">{amount}</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Total Trans
//                   </span>
//                   <span className="text-gray-400">{totalTrans}</span>
//                 </div>
//                 <div className="flex flex-col">
//                   <span
//                     className="font-bold text-orange-300 pr-2"
//                     style={{ whiteSpace: "wrap" }}
//                   >
//                     Failed Trans
//                   </span>
//                   <span className="text-gray-400">{failedTrans}</span>
//                 </div>
//               </div>

//               <br />

//               <div className="flex justify-between  w-full text-sm">
//                 <span>{progress}</span>
//                 <div className="flex space-x-2">
//                   <div className="text-gray-400 text-sm">
//                     {" "}
//                     {uploadedFile?.name}
//                   </div>
//                   <div className="text-gray-400 text-sm ">
//                     {" "}
//                     {uploadedFile?.size}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <br />
//     </div>
//   );
// }

// export default CheckOffs;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { API_SERVER } from "../../../../config/constant";
// import Header from "../../../../components/others/Header/Header";
// import GlobalModal from "./components//modal";
// import ButtonWColor from "./components/button";
// import { AiOutlineEye } from "react-icons/ai";
// import fileImg from "../../../../assets/images/file1.png";
// import uploadImg from "../../../../assets/images/upload.png";
// import excelfile from "../../../../assets/images/excel.png";
// import ButtonComponent 
// import { FileUploader } from "react-drag-drop-files";
// import Swal from "sweetalert2";
// import { Modal } from '@mantine/core';
// import CustomTable from "../../teller-ops/components/CustomTable";

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//salary approval screen
// import React, { useState, useEffect, useMemo } from "react";
// import InputField from "../../../../components/others/Fields/InputField";
// import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
// import Header from "../../../../components/others/Header/Header";
// import CustomTable from "../../teller-ops/components/CustomTable";
// import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
// import { API_SERVER } from "../../../../config/constant";
// import swal from "sweetalert";
// import { AiOutlineEye } from "react-icons/ai";
// import axios from "axios";
// import TextAreaField from "../../../../components/others/Fields/TextArea";
// import CustomModal from "../../cheques/counter-cheques/component/customModal";

// function BatchPostingApprovals({ batchNo, amount, setShowModal }) {
//   const headers = useMemo(() => {
//     return {
//       // 'x-api-key': process.env.REACT_APP_API_KEY,
//       "x-api-key":
//         "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//       "Content-Type": "application/json",
//     };
//   }, []);

//   // format numbers
//   function formatNumber(num) {
//     if (isNaN(num)) {
//       return "";
//     }
//     const formatted = Number(num).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//     });
//     return formatted;
//   }

//   const [transactionDetails, setTransactionDetails] = useState([]);
//   const [transactionDetailsData, setTransactionDetailsData] = useState([]);
//   const [narration, setNarration] = useState(" ");
//   const [postingChannel, setPostingChannel] = useState(" ");
//   const [postingCurrency, setPostingCurrency] = useState(" ");
//   const [module, setModule] = useState(" ");
//   const [approvalDate, setApprovalDate] = useState(" ");
//   const [transactionType, setTransactionType] = useState(" ");
//   const [totalAmount, setTotalAmount] = useState(" ");
//   const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
//   const [form, setForm] = useState("");
//   const [showModal1, setShowModal1] = useState(false);

//   useEffect(() => {
//     setTotalAmount(amount);
//     async function getVoucherDetails() {
//       await axios
//         .post(
//           API_SERVER + "/api/getBatchPostingApprovalDetails",
//           {
//             batchNumber: batchNo,
//           },
//           { headers }
//         )
//         .then((response) => {
//           if (response.data.length > 0) {
//             setNarration(response.data[0]?.narration);
//             setPostingChannel(response.data[0]?.channel);
//             setPostingCurrency(response.data[0]?.currency_code);
//             setModule(response.data[0]?.form_code);
//             setApprovalDate(response.data[0]?.posting_date);
//             setTransactionType(response.data[0]?.voucher_number);
//             let arr = [];
//             setTransactionDetails(response.data);
//             response.data?.map((i) => {
//               return arr.push([
//                 i.account_name,
//                 i.account_number,
//                 i.scan_doc_id,
//                 i.transaction_details,
//                 i.local_equivalent_db,
//                 i.local_equivalent_cr,
//                 i.branch,
//               ]);
//             });
//             setTransactionDetailsData(arr);
//           }
//         });
//     }
//     getVoucherDetails();
//   }, [amount, batchNo, headers]);

//   const totalAmountDebit = transactionDetailsData.reduce(
//     (total, row) => total + row[4],
//     0
//   );
//   const totalAmountCredit = transactionDetailsData.reduce(
//     (total, row) => total + row[5],
//     0
//   );

//   const tableDataWithTotals = [
//     ...transactionDetailsData.map((row) => [
//       row[0], // Account Name
//       row[1], // Account Number
//       row[2], // Scan Document
//       row[3], // Narration
//       formatNumber(parseInt(row[4])), // Amount Debit - Apply formatting here
//       formatNumber(parseInt(row[5])), // Amount Credit - Apply formatting here
//       row[6], // Branch
//     ]),
//     [
//       "", // Account Name for the total row (you can set it to an empty string or any label you prefer)
//       "", // Account Number for the total row
//       "", // Scan Document for the total row
//       "Total", // Label for the total row
//       formatNumber(totalAmountDebit), // Total Amount Debit - Apply formatting here
//       formatNumber(totalAmountCredit), // Total Amount Credit - Apply formatting here
//       "", // Branch for the total row
//     ],
//   ];

//   function handleClick1() {
//     if (transactionDetails[0]?.scan_doc_id === "") {
//       swal({
//         title: "ERR - 01346",
//         text: "A Valid Document ID is required",
//         icon: "warning",
//         buttons: "OK",
//       }).then((result) => {
//         if (result) {
//         }
//       });
//     } else {
//       // setSweetAlertConfirmed(true);
//       setShowModal1(true);
//       setForm("View Document");
//     }
//   }

//   function AuthoriseBatchPosting(){
//     swal({
//       icon:"info",
//       title:"Are you sure you want to approve this transaction ?",
//       text:"",
//       buttons:true,
//       animation:true,
//     }).then((result)=>{
//       if(result){
      
//          axios.post(API_SERVER + "/api/approve_batch_posting",{
//             batchNumber:batchNo,
//             approvedBy : JSON.parse(localStorage.getItem("userInfo")).id,
//             approvalDate:JSON.parse(localStorage.getItem("userInfo")).postingDate,
//             branchCode:JSON.parse(localStorage.getItem("userInfo")).branchCode,
//             terminalId : localStorage.getItem("ipAddress"),
         
//         },{
//           headers
//         }).then((response)=>{
//             if(response.data.responseCode==="000"){
//               swal({
//                 icon:"success",
//                 title: response.data.responseMessage,
//               }).then((result)=>{
//                 setShowModal(false)
//               })
//             }else{
//               swal({
//                 icon:"error",
//                 title: response.data.responseMessage,
//               })
//             }
//         })

//       }
//     })
//   }

//   return (
//     <div className="p-2" style={{ zoom: 0.9 }}>
//       <ActionButtons
//         onAuthoriseClick={AuthoriseBatchPosting}
//         displayView={"none"}
//         displayRefresh={"none"}
//         displayOk={"none"}
//         displayNew={"none"}
//         displayHelp={"none"}
//         displayFetch={"none"}
//         displayDelete={"none"}
//         displayCancel={"none"}
//         onExitClick={() => setShowModal(false)}
//       />
//       <hr className="my-3" />
//       <div className="flex items-center mb-3">
//         <div style={{ flex: 0.5 }}>
//           <InputField
//             label={"Batch Number"}
//             labelWidth={"30%"}
//             inputWidth={"50%"}
//             disabled={true}
//             value={batchNo}
//           />
//         </div>
//         <div style={{ flex: 0.5 }}>
//           <InputField
//             label={"Currency"}
//             labelWidth={"30%"}
//             inputWidth={"46%"}
//             disabled={true}
//             value={transactionDetails[0]?.currency}
//           />
//         </div>
//       </div>
//       <div className="flex items-center mb-3">
//         <div style={{ flex: 0.5 }}>
//           <InputField
//             label={"Value Date"}
//             labelWidth={"30%"}
//             inputWidth={"50%"}
//             disabled={true}
//             value={transactionDetails[0]?.value_date}
//           />
//         </div>
//         <div style={{ flex: 0.5 }}>
//           <div style={{ display: "flex", flex: 1 }}>
//             <div style={{ flex: 0.8 }}>
//               <InputField
//                 label={"Scan Document ID"}
//                 labelWidth={"37.5%"}
//                 inputWidth={"58%"}
//                 disabled={true}
//                 value={transactionDetails[0]?.scan_doc_id}
//               />
//             </div>
//             <div className="ml-1" style={{ flex: 0.2 }}>
//               <ButtonComponent
//                 // label={"View Doc"}
//                 // buttonWidth={"20%"}
//                 buttonIcon={<AiOutlineEye />}
//                 buttonHeight={"27px"}
//                 // buttonBackgroundColor={"#d8392b"}
//                 type={"button"}
//                 buttonColor={"white"}
//                 onClick={handleClick1}
//               />
//             </div>
//           </div>

//           <CustomModal
//             showModal1={showModal1}
//             setShowModal1={setShowModal1}
//             form={form}
//             setForm={setForm}
//             documentNo={transactionDetails[0]?.scan_doc_id}
//             batchNumber={batchNo}
//           />
//         </div>
//       </div>
//       <div className="flex items-center mb-3">
//         <div style={{ flex: 0.5 }}>
//           <TextAreaField
//             label={"Narration"}
//             disabled={true}
//             labelWidth={"30%"}
//             inputWidth={"50%"}
//             value={narration}
//           />
//         </div>
//       </div>
//       <hr className="my-2" />
//       <div className="mb-4 flex items-center justify-end">
//         {/* <ButtonComponent label={"Check Accounts Balances"} /> */}
//       </div>
//       <div className="mb-1">
//         <Header headerShade={true} title={"TRANSACTION DETAILS"} />
//       </div>
//       <CustomTable
//         headers={[
//           "Account Name",
//           "Account Number",
//           "Scan Document",
//           "Narration",
//           "Amount Debit",
//           "Amount Credit",
//           "Branch",
//         ]}
//         data={tableDataWithTotals}
//         style={{
//           headerAlignRight: [5, 6],
//           headerAlignLeft: [1, 4, 7],
//           columnAlignRight: [5, 6],
//           // columnFormat: [2],
//           columnAlignCenter: [3],
//         }}
//       />
//     </div>
//   );
// }

// export default BatchPostingApprovals;


//Ivans salary upload
import React, { useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { AiOutlineEye } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { BiDownload } from "react-icons/bi";
import ButtonComponent from "../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../components/others/Fields/InputField";
import ButtonType from "../../../../components/others/Button/ButtonType";
import ActionButtons from "../../../../components/others/action-buttons/ActionButtons";
import ButtonWColor from "./components/button";
import axios from "axios";
import { API_SERVER } from "../../../../config/constant";
import { Notifications } from "@mantine/notifications";
import swal from "sweetalert";
import notify from "../../payment/notification";
import { read, utils } from "xlsx";
import excelFile from "./components/excelFiles/general salary upload(No Fees).xlsx";
import Header from "../../../../components/others/Header/Header";
// import ViewExceptionsModalX from "./components/viewExceptionsModal";
// import InvalidAccountsModalX from "./components/InvalidAccountsModal";
// import CurrencyMismatchesModalX from "./components/CurrencyMismatchesModal";
import { checkInternetConnection } from "./components/checkConnection";
import TableLoader from "./components/loader";
// import CustomTable from "../../../../components/others/customtable";
import GlobalModal from "./components//modal";
import CustomTable from "../../teller-ops/components/CustomTable";
import DocumentViewing from "../../../../components/others/DocumentViewing"

function CheckOffs() {
  // const [getTheme, setTheme] = useState(
  //   JSON.parse(localStorage.getItem("theme"))
  // );
  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  // states
  const [debitAccount, setDebitAccount] = useState("");
  // const [userDetails, setUserDetails] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [userAvailableBalance, setAvailableBalance] = useState("");
  const [getBatchNumber, setBatchNumber] = useState("");
  const [sweetAlertConfirmed, setSweetAlertConfirmed] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [tableLoader2, setTableLoader2] = useState(false);


  const [documentNumber, setDocumentNumber] = useState("");
  // const [colDefs, setColDefs] = useState();
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [columns, setColumns] = useState([
    "Pin",
    "Account Number",
    "Account Description",
    "Credit Amount",

    "Branch",
  ]);
  const [NoOfTransactions, setNoOfTransactions] = useState(0);
  const [TransactionAmount, setTransactionAmount] = useState(0);
  const [InvalidAccountNo, setInvalidAccountNo] = useState(0);
  const [ValidAccountNo, setValidAccountNo] = useState(0);
  const [CurrencyMismatchNo, setCurrencyMismatchNo] = useState(0);
  const [NonNormalAccountNo, setINonNormalAccountNo] = useState(0);
    const [DuplicateAccountNo, setDuplicateAccountNo] = useState(0);

  const [ViewExceptionsModal, setViewExceptionsModal] = useState(false);
  const [InvalidAccountsModal, setInvalidAccountModal] = useState(false);
  const [CurrencyMismatchModal, setCurrencyMismatchModal] = useState(false);
  const [NonNormalModal, setNonNormalModal] = useState(false);
  const [accountWithExceptionsData, setAccountWithExceptionsData] = useState([]);
  const [InvalidAccountData, setInvalidAccountData] = useState([]);
  const [CurrencyMismatchData, setCurrencyMismatchData] = useState([]);
  const [NonNormalModalData, setNonNormalModalData] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [form, setForm] = useState("");
  const [modalKey, setModalKey] = useState("");
  const [currencyCode, setCurrencyCode] = useState("010");
  const [confirmNofTransactionsFlag, setNoOfTransactionsFlag] = useState(false);
  const [confirmTransAmount, setConfirmTransAmount] = useState(false);
  const [debitNarration, setDebitNarration] = useState("");
  const [creditNarration, setCreditNarration] = useState("");
  const [openModalFlag, setOpenModalFlag] = useState(false)

  // const [showModal, setShowModal] = useState(false);
  // const EXTENSIONS = ["xlsx", "xls", "csv"];

  // format numbers
  function formatNumber(num) {
    const formatted = Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });
    return formatted;
  }

  // handle new btn click
  function handleNewBtnClick() {
    setDebitAccount("");
    setAvailableBalance("");
    setDebitAccount("");
    setDocumentNumber("");
    setTableData([]);
    setData([]);
    setAccountName("");
    setResponseData([]);
    setNoOfTransactions("0");
    setTransactionAmount("0");
    setInvalidAccountNo(0);
    setValidAccountNo(0);
    setCurrencyMismatchNo(0);
    setInvalidAccountNo(0);
    setNoOfTransactionsFlag(false);
    setConfirmTransAmount(false);
    setDebitNarration("");
    setCreditNarration("");
    setModalKey("");
    setINonNormalAccountNo(0);
    // Fetch new batch number
    fetchBatchNumber();
  }

  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
    }
};
  useEffect(() => {
    if (showModal1 && form === "Accounts With Exceptions") {
      handleNewBtnClick();
    }
  }, [showModal1, form]);
  function AcctExceptions() {
    axios
      .post(
        API_SERVER + "/api/salary-upload",
        {
          key: "AccountsWithExceptions",
          batchNumber: getBatchNumber,
          
        },
        {
          headers,
        }
      )
      .then(function (response) {
        if (response.data?.responseCode === "000") {
          if (response.data?.data.length !== 0) {
            // setAccountWithExceptionsData(response.data.data);
            // setOpenModalFlag(true);
            setShowModal1(true);
            setForm("Accounts With Exceptions");
            // handleNewBtnClick();
          } else {
            handleNewBtnClick();
          }
        } else {
          swal({
            title: "Error",
            text: response.data?.responseMessage,
            icon: "error",
            buttons: "OK",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }
  
  function callPrc (){
    setTableLoader2(true);
    axios
    .post(
      API_SERVER + "/api/salary-upload",
      {
        batchNumber : getBatchNumber,
        accountNumber : debitAccount,
        postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
        branchCode: JSON.parse(localStorage.getItem("userInfo")).branchCode,
        debitNarration: debitNarration,
        creditNarration: creditNarration,
        scanDoc: documentNumber ? documentNumber : null,
        transCode:"FTR",
        terminalId: localStorage.getItem("ipAddress"),
        formCode: "CHQQ",
        allow_dup:"N"
      },
      {
        headers
      }
    ).then (function (response){
      setTableLoader2(false);
       if (response.data?.responseCode === "000")
       {
        swal({
          title: "Success",
          text: `Data Successfully Uploaded With Batch No -${getBatchNumber} Pending Approval`,
          icon: "success",
          buttons: "OK"
        }).then((result) => {
        if (result) 
        {
          // console.log("result");
          AcctExceptions();
          // setShowModal1(true);
          // setForm("Accounts With Exceptions");
          // handleNewBtnClick();
           }});
       }else {
          swal({
        title: "Error",
        text: response.data?.responseMessage,
        icon: "error",
        buttons: "OK",
      });
       }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {})
  };
  async function handleSubmit() {
    if (
      debitAccount === "" ||
      debitNarration === "" ||
      tableData.length === 0 ||
      // tableData === []||
      creditNarration === "" ||
      confirmNofTransactionsFlag === false ||
      confirmTransAmount === false
    ) {
      // notify.warn({
      //       title: "Kindly Fill all required fields",
      //       message: "All Fields with asterisk are required",
      //       id: "All Fields with asterisk are required",
      //     });
      swal({
        title: "Warning",
        text: "All Fields with asterisk are required",
        icon: "warning",
        buttons: "OK",
      });
     
    } 
    else if(TransactionAmount>userAvailableBalance){
      swal({
        title: "Warning",
        text: "Funds are Not Suffucient to Carry out Transaction",
        icon: "warning",
        buttons: "OK",
      });
      
    } 
    else {
      if(CurrencyMismatchNo ||InvalidAccountNo || NonNormalAccountNo > 0 ){
        swal({
          title: "Warning",
          text: "Accounts With Exceptions Exit, Do you want To Proceed",
          icon: "warning",
          buttons: true,
        }).then((result) => {
          if (result){
            callPrc();
          }
          });
        
      } else {
        callPrc();
      } 
     
     
    }
  }
  console.log({ batchNumber : getBatchNumber,
    accountNumber : debitAccount,
    postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
    branchCode: JSON.parse(localStorage.getItem("userInfo")).branchCode,
    debitNarration: debitNarration,
    creditNarration: creditNarration,
    scanDoc: documentNumber ? documentNumber : null,
    transCode:"FTR",
    terminalId: localStorage.getItem("ipAddress"),
    formCode: "CHQQ",
    allow_dup:"N"})

  // Function to fetch batch number
  function fetchBatchNumber() {
    axios
      .get(API_SERVER + "/api/get-unique-ref", {
        headers: headers,
      })
      .then(function (response) {
        setBatchNumber(response.data[0]?.unique_ref);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Get Batch Number on component mount
  useEffect(() => {
    fetchBatchNumber();
  }, []);

  // useEffect(()=> {
  //   openModalFlag ? setShowModal1(true) : setOpenModalFlag(false)
  // }, [openModalFlag])

  // Move to nextField
  function switchFocus(e, nextFieldId) {
    if (e.key === "Enter") {
      document.getElementById(nextFieldId).focus();
    }
  }

  // On Enter of Debit Account
  const onEnterDebitAccount = async (e) => {
    if (e.key === "Enter") {
      // Check internet connection if needed
      // await checkInternetConnection();
  
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-account-summary",
          {
            account_number: debitAccount.trim(),
            transType: "teller",
          },
          { headers }
        );
  
        if (response.data.summary.length > 0) {
          const accountStatus = response.data.summary[0].account_status;
          const responseErrorMessage = await axios.post(
            API_SERVER + "/api/get-error-message",
            { code: "06743" },
            { headers }
          );
        //  console.log(accountStatus);
          if (accountStatus === 'CLOSED' || accountStatus === 'DORMANT' || accountStatus === 'ACCOUNT CLOSED') {
            const errorMessage = responseErrorMessage.data.replace('v_acctdesc', accountStatus === 'CLOSED' ? 'ACCOUNT CLOSED' : 'DORMANT');
  
            swal({
              title: "Warning",
              text: errorMessage,
              icon: "warning",
              buttons: "OK",
              dangerMode: true,
            }).then((result) => {
              if (result) {
                // Do something if needed
              }
            });
          } else {
            console.log(response.data.summary[0].availabe_balance);
            setAccountName(response.data.summary[0].account_name);
            setAvailableBalance(response.data.summary[0].availabe_balance);
  
            // Focus on the ScanDoc input
            var input = document.getElementById("ScanDoc");
            input.focus();
          }
        } else {
          swal({
            title: "ERROR",
            text: "Invalid Account Number",
            icon: "warning",
            buttons: "OK",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  
  
  // attach/ view doc function
  function handleClick() {
    if (documentNumber === "") {
      swal({
        title: "ERR - 01346",
        text: "A Valid Document ID is required",
        icon: "warning",
        buttons: "OK",
      }).then((result) => {
        if (result) {
        }
      });
    } else {
      setSweetAlertConfirmed(true);
    }
  }

  // generate excel file
  const downloadExcelFile = () => {
    const link = document.createElement("a");
    link.href = excelFile;
    link.download = "excelTemplate.xlsx";
    link.click();
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const workbook = read(bstr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const newData = utils.sheet_to_json(worksheet);
      setData(newData);
    };
    reader.readAsBinaryString(selectedFile);
  };
  useEffect(() => {
    // Debounce the API call for better performance
    // const debounceTimeout = setTimeout(() => {
    if (data.length !== 0) {
      setTableLoader(true);
      axios
        .post(
          API_SERVER + "/api/salary-upload",
          {
            key: "uploadNoFees",
            postedBy: JSON.parse(localStorage.getItem("userInfo")).id,
            batchNumber: getBatchNumber,
            jsonData: data,
            currencyCode: currencyCode,
          },
          { headers: headers }
        )
        .then(function (response) {
          if (response.data?.responseCode === "999") {
            setTableLoader(false);

            swal({
              title: "Error",
              text: response.data?.responseMessage,
              icon: "error",
              buttons: "OK",
            });
          } else {
            // Store the response data in the `responseData` state
            // console.log(response.data,"::::data");
            setValidAccountNo(response.data.data[0]?.validAccounts);
            setInvalidAccountNo(response.data.data[0]?.invalidAccounts);
            setCurrencyMismatchNo(response.data.data[0]?.CurrencyMismatchesAccounts);
            setINonNormalAccountNo(response.data.data[0]?.notNormalAccounts);
            // setDuplicateAccountNo(response.data.data[0]?.DuplicateAccounts);
            
            setTableData(response?.data.data[1].map((row) => Object.values(row)));
            setTableLoader(false);
            // setResponseData(response?.data.data[1]);
            if (response?.data.data[1].length !== 0) {
              // setTableData(response?.data.data[1].map((row) => Object.values(row)));
              // Calculate the sum of the "CREDIT AMOUNT" column
              let sum = 0;
              response?.data.data[1].forEach((row) => {
                const columnValue = Number(row.CREDIT_AMOUNT);
                if (!isNaN(columnValue)) {
                  sum += columnValue;
                }
              });
              const roundedSum = Math.round(sum * 100) / 100;
              setTransactionAmount(roundedSum);
              setNoOfTransactions(response?.data.data[1].length);
            }
            
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTableLoader(false);
        });
    }
    // }, 500); // Adjust the debounce delay as needed (e.g., 500ms)

    // return () => clearTimeout(debounceTimeout);
  }, [data]);

  // useEffect(() => {
  //   if (responseData.length !== 0) {
  //     // setTableData(response?.data.data[1].map((row) => Object.values(row)));
  //     // Calculate the sum of the "CREDIT AMOUNT" column
  //     let sum = 0;
  //     responseData.forEach((row) => {
  //       const columnValue = Number(row.CREDIT_AMOUNT);
  //       if (!isNaN(columnValue)) {
  //         sum += columnValue;
  //       }
  //     });
  //     const roundedSum = Math.round(sum * 100) / 100;
  //     setTransactionAmount(roundedSum);
  //     setNoOfTransactions(responseData.length);
  //   }
  // }, [responseData]);

  const openFileExplorer = () => {
    // Create an input element of type "file"
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    // Set the accept attribute to only allow Excel files
    fileInput.accept = ".xlsx, .xls, .csv";
    // Add an event listener for file selection
    fileInput.addEventListener("change", handleFileSelect);
    // Simulate a click event on the file input element
    fileInput.click();
  };
// console.log({confirmNofTransactionsFlag});
  return (
    <div className="w-full h-full"style={{ zoom: 0.9 }}>
       {tableLoader2 && (
                  <div className="absolute top-0 left-0 z-10 h-full opacity-90 bg-white flex justify-center align-middle w-full">
                    <TableLoader />
                  </div>
                )}
      {/* {ViewExceptionsModal && (
        <ViewExceptionsModalX
          showModal={ViewExceptionsModal}
          setShowModal={setViewExceptionsModal}

          //  setViewExceptions={setisViewExceptions}
        />
      )}
      {InvalidAccountsModal && (
        <InvalidAccountsModalX
          showModal={InvalidAccountsModal}
          setShowModal={setInvalidAccountModal}
          // InvalidAccountData={InvalidAccountData}
          // InvalidAccountNo={InvalidAccountNo}
        />
      )} */}
      <Notifications
        position={"top-center"}
        zIndex={99999999999999999999}
        limit={5}
      />
      <div>
        
        <div>
          <ActionButtons
            displayFetch={"none"}
            displayRefresh={"none"}
            displayDelete={"none"}
            displayCancel={"none"}
            displayAuthorise={"none"}
            displayView={"none"}
            displayReject={"none"}
            displayHelp={"none"}
            onNewClick={handleNewBtnClick}
            onOkClick={handleSubmit}
            onExitClick={handleExitClick}
            
          />
        </div>
        {/* Batch, Trans, Currency and View Exceptions */}
        <div
        style={{
          padding: "20px",
          border: "2px solid #dfdce6",
          borderRadius: "5px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          marginTop: "20px",
         
        }}
      >
        <div className="bg-white flex w-full px-4 justify-between pt-4">
          {/* Batch, Trans Desc and Currency */}

          <div className="flex ">
            {/* "w-[35%]" */}
            <span
              className="font-bold text-gray-500 pr-2"
              style={{ whiteSpace: "nowrap" }}
            >
              Batch Number :
            </span>
            <span className="text-gray-400">{getBatchNumber}</span>
          </div>

          <div>
            <span
              className="font-bold text-gray-500 pr-2"
              style={{ whiteSpace: "nowrap" }}
            >
              Trans Description :
            </span>
            <span className="text-gray-400">CHECK-OFF TRANSACTION</span>
          </div>

          <div>
            <span
              className="font-bold text-gray-500 pr-2"
              style={{ whiteSpace: "nowrap" }}
            >
              Currency :
            </span>
            <span className="text-gray-400">KES-Kenya Shillings</span>
          </div>
 
          <div>
            <div>
              <button
                className="bg-black flex items-center justify-center space-x-1 text-gray-100 rounded px-3 py-[5.5px]"
                onClick={() => {
                  setShowModal1(true);
                  setForm("View Exceptions");
                  setModalKey("viewExceptionsFees");
                }}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9M15 2h2.5C19.99 2 22 4.01 22 6.5V9M22 16v1.5c0 2.49-2.01 4.5-4.5 4.5H16M9 22H6.5C4.01 22 2 19.99 2 17.5V15"
                    stroke="#FF8A65"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>

                <span>View Exceptions</span>
              </button>
            
              <GlobalModal
                showModal1={showModal1}
                setShowModal1={setShowModal1}
                setForm={setForm}
                modalKey={modalKey}
                form={form}
                batch={getBatchNumber}
                currency_CODE={currencyCode}
                // InvalidAccountData={InvalidAccountData}
              />
            </div>
          </div> 
        </div>

        <div></div>
      </div>

        <br />
        <div
          className=" h-auto pb-2 pt-2 px-2  bg-white space-x-2"
          style={{
            display: "flex",
            flex: 1,
          }}
        >
          <div
            style={{ width: "60%" }}
            className=" h-64 pb-2 pt-2 px-2  wrapper rounded border-2"
          >
            <Header title={"Debit Account Details"} headerShade={true} />

            {/* Debit  Account Details */}
            <div
              className="mt-2"
              style={{
                display: "flex",

                backgroundColor: "",
              }}
            >
              <div className="w-full">
                {/* Debit Account */}
                <div className=" mb-2 flex items-center">
                  <InputField
                    id={"DebitAccount"}
                    label={"Debit Account"}
                    required={true}
                    labelWidth={"20%"}
                    inputWidth={"80%"}
                    onKeyDown={onEnterDebitAccount}
                    onChange={(e) => setDebitAccount(e.target.value)}
                    value={debitAccount}
                  />
                </div>
                {/* Contra Description */}
                <div className="w-full mb-2 flex items-center">
                  <InputField
                    id={"ContraDescription"}
                    label={"Contra Description"}
                    labelWidth={"19.4%"}
                    inputWidth={"78%"}
                    disabled={true}
                    value={accountName}
                  />
                </div>
                {/* Available Balance */}
                <div className="w-full mb-2 flex items-center">
                  <InputField
                    id={"AvailableBalance"}
                    label={"Available Balance"}
                    labelWidth={"20%"}
                    inputWidth={"80%"}
                    disabled={true}
                    textAlign={"right"}
                    defaultValue={"0.00"}
                    // value={userAvailableBalance ? (userAvailableBalance === "NaN" ? "" :formatNumber(userAvailableBalance )) : formatNumber(userAvailableBalance)}
                    value={userAvailableBalance?.trim()}
                    // value={formatNumber(userAvailableBalance)}
                  />
                </div>
                {/* Scan Doc & View Doc Button */}
                <div className="w-full mb-2 flex  space-x-2">
                  <div className="w-[70%]">
                    <InputField
                      id={"ScanDoc"}
                      label={"Scan Document"}
                      labelWidth={"29%"}
                      inputWidth={"70%"}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      onKeyDown={(e) => switchFocus(e, "DebitNarration")}
                    />
                  </div>
                  <div className="w-[30%]">
                    <ButtonComponent
                      buttonColor={"white"}
                      buttonWidth={"100%"}
                      label={"View Document"}
                      // labelWidth="25px"
                      onClick={() => handleClick()}
                    />
                    {/**modal section */}
                    {sweetAlertConfirmed && (
                      <Modal
                        size="70%"
                        opened={sweetAlertConfirmed}
                        onClose={() => setSweetAlertConfirmed(false)}
                        title={"Document Viewing"}
                      >
                        <DocumentViewing documentID={documentNumber} />
                      </Modal>
                      // 1683042691
                    )}
                  </div>
                </div>
                {/* Debit Narration */}
                <div className="w-full mb-2 flex items-center">
                  <InputField
                    id={"DebitNarration"}
                    label={"Debit Narration"}
                    labelWidth={"20%"}
                    inputWidth={"80%"}
                    required={true}
                    onChange={(e) => setDebitNarration(e.target.value)}
                    onKeyDown={(e) => switchFocus(e, "CreditNarration")}
                    value={debitNarration}
                  />
                  
                </div>
                <div
                  className="mb-2 mt-2"
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    marginLeft: "10px",
                    // marginRight: "10px",
                    marginTop: "10px",
                  }}
                >
                  <ButtonComponent
                    label={"Upload Excel"}
                    buttonColor={"white"}
                    buttonIcon={<BiUpload />}
                    buttonHeight={"25px"}
                    onClick={openFileExplorer}
                  />
                  <ButtonWColor
                    buttonIcon={<BiDownload />}
                    buttonColor={"white"}
                    label={"Generate Template"}
                    buttonHeight={"25px"}
                    buttonBackgroundColor={"green"}
                    onClick={downloadExcelFile}
                    // buttonColor={"green"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%", marginLeft: 10, marginRight: 10 }}
            className="h-auto  pb-2 px- 2 wrapper rounded border-2"
          >
            {/* Excel  */}
            <div style={{}}>
              <Header title={"Excel Transactions"} headerShade={true} />
              <div
                style={{ display: "flex", flex: 1, marginTop: "10px" }}
                className="space-x-2 ml-2 mr-2"
              >
                <div
                  style={{ width: "50%" }}
                  className="h-auto  pb-2 pt-2 px-2  wrapper rounded border-2"
                >
                  {/* Summary */}
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div className="w-full">
                      <Header title={"Summary"} headerShade={true} />
                      &nbsp;
                      {/* Valid & Invalid Accounts*/}
                      <div className="mb-2 flex items-center">
                        <InputField
                          label={"Valid Accounts"}
                          labelWidth={"27%"}
                          inputWidth={"73%"}
                          disabled={true}
                          value={ValidAccountNo}
                          textAlign={"right"}
                        />
                      </div>
                      {/* Invalid Accounts */}
                      <div className="mb-2 flex items-center space-x-2">
                        <div className="w-[95%]">
                          <InputField
                            label={"Invalid Accounts"}
                            disabled={true}
                            labelWidth={"30%"}
                            inputWidth={"73%"}
                            value={InvalidAccountNo}
                            textAlign={"right"}
                          />
                        </div>
                        <div className="w-[5%]">
                          <ButtonComponent
                            buttonColor={"white"}
                            buttonIcon={<AiOutlineEye />}
                            buttonHeight={"25px"}
                            buttonWidth={"100%"}
                            onClick={() => {
                              setShowModal1(true);
                              setForm("Invalid Accounts");
                              setModalKey("invalidAccounts")
                            }}
                          />
                        </div>
                      </div>
                      {/* Currency mismatch */}
                      <div className="mb-2 flex items-center  space-x-2">
                        <div className="w-[95%]">
                          <InputField
                            label={"Currency Mismatches"}
                            disabled={true}
                            labelWidth={"28%"}
                            inputWidth={"69%"}
                            value={CurrencyMismatchNo}
                            textAlign={"right"}
                          />
                        </div>
                        <div className="w-[5%]">
                          <ButtonComponent
                            buttonWidth={"100%"}
                            buttonIcon={<AiOutlineEye />}
                            buttonColor={"white"}
                            buttonHeight={"25px"}
                            onClick={() => {
                              setShowModal1(true);
                              setForm("Currency Mismatches");
                              setModalKey("currencyMismatch");
                            }}
                          />
                        </div>
                      </div>
                      {/* Non - Normal */}
                      <div className="mb-2 flex items-center  space-x-2">
                        <div className="w-[95%]">
                          <InputField
                            label={"Non-Normal"}
                            disabled={true}
                            labelWidth={"30%"}
                            inputWidth={"73%"}
                            value={NonNormalAccountNo}
                            textAlign={"right"}
                          />
                        </div>



                       
                        
                        <div className="w-[5%]">
                          <ButtonComponent
                            buttonWidth={"100%"}
                            buttonIcon={<AiOutlineEye />}
                            buttonColor={"white"}
                            buttonHeight={"25px"}
                            onClick={() => {
                              setShowModal1(true);
                              setForm("Non Normal");
                              setModalKey("nonNormalModal");
                            }}
                          />
                        </div>
                      </div>
                       {/* Duplicates */}
                      {/* <div className="mb-2 flex items-center  space-x-2">
                      <div className="w-[95%]">
                          <InputField
                            label={"Duplicates"}
                            disabled={true}
                            labelWidth={"30%"}
                            inputWidth={"73%"}
                            value={DuplicateAccountNo}
                            textAlign={"right"}
                          />
                        </div>


                       
                        
                        <div className="w-[5%]">
                          <ButtonComponent
                            buttonWidth={"100%"}
                            buttonIcon={<AiOutlineEye />}
                            buttonColor={"white"}
                            buttonHeight={"25px"}
                            onClick={() => {
                              setShowModal1(true);
                              setForm("Non Normal");
                              setModalKey("nonNormalModal");
                            }}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                
                {/* Confirm Transaction */}
                <div
                  style={{ width: "50%" }}
                  className="h-auto  pb-2 pt-2 px-2   wrapper rounded border-2"
                >
                  <div style={{ display: "flex" }}>
                    <div className="w-full">
                      <Header
                        title={"Confirm Transactions"}
                        headerShade={true}
                      />
                      &nbsp;
                      <div className="mb-2 flex items-center space-x-2">
                        <div className="w-[5%]">
                          <ButtonType
                          
                            id={"NoOfTransactions"}
                            name={"myCheckBox"}
                            type={"checkbox"}
                            checked={confirmNofTransactionsFlag === true}
                            value1={confirmNofTransactionsFlag}
                            onChange={()=>{
                              setNoOfTransactionsFlag(!confirmNofTransactionsFlag)
                            }}
                            // value1={confirmNofTransactionsFlag ? "N" : "Y"}
                            
                          />
                          
                        </div>
                        {/* No of Transactions */}
                        <div className="w-[95%]">
                          <InputField
                            id={"NoTransactions"}
                            disabled={true}
                            label={"No of Transactions"}
                            labelWidth={"30%"}
                            inputWidth={"70%"}
                            value={NoOfTransactions}
                            textAlign={"right"}
                          />
                        </div>
                      </div>
                      <div className="mb-2 flex items-center space-x-2">
                        <div className="w-[5%]">
                          <ButtonType
                            id={"TransactionAmount"}
                            type={"checkbox"}
                            checked={confirmTransAmount === true}
                             value1={confirmTransAmount}
                            onChange={()=>{
                              setConfirmTransAmount(!confirmTransAmount)
                            }}
                          />
                        </div>
                        {/* Transaction Amount */}
                        <div className="w-[95%]">
                          <InputField
                            id={"TransAmount"}
                            disabled={true}
                            label={"Transaction Amount"}
                            labelWidth={"30%"}
                            inputWidth={"70%"}
                            // formatNumber
                            value={formatNumber(parseInt(TransactionAmount))}
                            textAlign={"right"}
                          />
                        </div>
                      </div>
                      <div className="w-[100%]">
                        <InputField
                          id={"CreditNarration"}
                          label={"Credit Narration"}
                          required={"true"}
                          labelWidth={"36%"}
                          inputWidth={"67%"}
                          onChange={(e) => setCreditNarration(e.target.value)}
                          value={creditNarration}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          
        </div>

        <div className="pb-2 pt-2 px-2 mb-2 mt-2 relative">
                {tableLoader && (
                  <div className="absolute top-0 left-0 z-10 h-full opacity-90 bg-white flex justify-center align-middle w-full">
                    <TableLoader />
                  </div>
                )}
                <CustomTable
                  headers={columns}
                  data={tableData}
                  rowsPerPage={8}
                  style={{
                    headerAlignRight: [4],
                    headerAlignLeft:[3, 5],
                    columnAlignRight: [4],
                    columnFormat: [2],
                    columnAlignCenter: [1, 2],
                  }}
                />
              </div>
      </div>
    </div>
  );
}
export default CheckOffs;
