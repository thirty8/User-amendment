import React, { useState, useEffect } from "react";
import Label from "../../../../../components/others/Label/Label";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "./comp/InputField";


const Anti_Money_Laundering = ({handleChange}) => {
  
//  Anti Money Laundering 
const [sourceOfWealth, setSourceOfWealth] = useState([])
const [sourceOfFund, setSourceOfFund] = useState([])
const [transactionType, setTransactionType] = useState([])
const [data, setData] = useState([
  { data1: 'Data 1', data2: 'Data 2', data3: 'Data 3' },
  { data1: 'Data 4', data2: 'Data 5', data3: 'Data 6' }
]);

// const headers = {
//   "x-api-key": process.env.REACT_APP_API_KEY,
//   "Content-Type": "application/json",
// };

const headers={
  'x-api-key':  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  'Content-Type': 'application/json'
};

// const customTheme = JSON.parse(localStorage.getItem("theme"));

    useEffect(() => {
    // Get Source of Wealth
      const getSourceofWealth = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "SOW",
        },{headers})
        .then(function (response) {
        //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          // console.log("getSourceofWealth :", response.data);
          const arr = [];
          response.data.map((i)=>{
            const [a , b , c] = Object.values(i)
            const values = [b , a ,c]
            values.pop()
            arr.push([...values , <input type="text" className="border px-2"/>])
            // arr.pop()
            // arr.push(<input type="text" />)
          })
          setSourceOfWealth(arr)
          console.log("getSourceofWealth ::::",arr);
        });
      };

      getSourceofWealth()
    },[])

    
    useEffect(() => {
       // Get Source of fund
     const getSourceofFund = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "SOF",
        },{headers})
        .then(function (response) {
         //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          // console.log("getSourceofWealth :", response.data);
          const arr = [];
          response.data.map((i)=>{
            const [a , b , c] = Object.values(i)
            const values = [b , a ,c]
            values.pop()
            arr.push([...values , <input type="checkbox" className="border"/>])
            // arr.pop()
            // arr.push(<input type="text" />)
          })
          setSourceOfFund(arr)
          console.log("getSourceofWealth ::::",arr);
        });
      };

      getSourceofFund()
    },[])


    useEffect(() => {
      // Get Transaction Type
     const getTransactionType = () => {
      axios
        .post(API_SERVER + "/api/get-code-details", {
          code: "TRQ",
        },{headers})
        .then(function (response) {
         //  localStorage.setItem("getCountry", JSON.stringify(response.data));
          // console.log("getSourceofWealth :", response.data);
          const arr = [];
          response.data.map((i)=>{
            const [a , b , c] = Object.values(i)
            const values = [b , a ,c]
            values.pop()
            arr.push([...values , <input type="checkbox" className="border"/>])
            // arr.pop()
            // arr.push(<input type="text" />)
          })
          setTransactionType(arr)
          console.log("getSourceofWealth ::::",arr);
        });
      };

      getTransactionType()
    },[])

    console.log("dataTable Data", sourceOfFund)

      

       ////////////  Source of Fund ///////////////////////////
    const columns = ["Code","Descrition", "Check"]
    const rows = sourceOfFund
      ////////////////End  Source of Fund /////////////////////

      ////////////  Source of Wealth ////////////////
    const columns_ = ["Code","Descrition", "Wealth Value"]
    const rows_ = sourceOfWealth
      ////////////////End  Source of Wealth /////////////////////

    //////////// Transaction Type //////////////////////////////
    const columns__ = ["Code","Descrition", "Check"]
    const rows__ = transactionType
    //////////// End Transaction Type //////////////////////////////
        

    const itemsPerPage =5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data array to get the data for the current page
  // const currentPageData = sourceOfWealth.slice(startIndex, endIndex);
  const currentPageData2 = sourceOfFund.slice(startIndex, endIndex);
  // const currentPageData3 = transactionType.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  // const itemsPerPage = 5; // Number of items to display per page
  // const [currentPage, setCurrentPage] = useState(1); // Current page number

  // // Calculate the index range for the current page
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  // // Slice the data array to get the data for the current page
  // const currentPageData = sourceOfFund.slice(startIndex, endIndex);

  // // Function to handle page change
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

        
      

  return (
    <div>
      <div className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
          
          <div className="w-full max-w-2xl">
               {/* <hr className="-mb-1" /> */}
               <div className=" p-2 text-white bg-sky-700" style={{
                background:'',
                }}
            >
                Other Details
            </div>

            {/*No of Withdrawal per Month*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="No&nbsp;of&nbsp;Withdrawal&nbsp;per&nbsp;Month"  fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px]">
                    <InputField 
                      inputWidth={'75%'}
                    />
                      {/* <input className="risk_label" type="text" /> */}
                  </div>
              </div>
            </div>

            {/*Amount of Withdrawal per Month*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Amt&nbsp;Withdrawals&nbsp;per&nbsp;Month"   fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px]">
                    <InputField 
                      inputWidth={'75%'}
                    />
                  </div>
              </div>
            </div>

            {/*No of Deposits per Month*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="No&nbsp;of&nbsp;Deposits&nbsp;per&nbsp;Month" required={true} fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px]">
                    <InputField 
                      inputWidth={'75%'}
                    />
                  </div>
              </div>
            </div>

            {/*Amount Deposits per Month*/}
            <div class="w-full max-w-xl mt-2">
              <div class="md:flex md:items-center mb-2 ml-2">
                  <div class="md:w-1/3">
                      <Label label="Amount&nbsp;Deposits&nbsp;per&nbsp;Month"  fontSize="85%" />
                  </div>
                  <div class="md:w-2/3 md:ml-[2px]">
                    <InputField 
                      inputWidth={'75%'}
                    />
                  </div>
              </div>
            </div>
                
            {/* <hr /> */}

                <div className="mt-3" />

            {/* Source Of Wealth */}
            <div className='border md:p-2 text-white md:mt-1 bg-sky-400' 
                style={{
                background:'',
                }}
            >
              Source of Wealth
            </div>
            {/* <DataTable columns={columns_} data={rows_} rowsPerPage={2} /> */}
            
              <div>
                <table className="w-full" style={{zoom:0.70}}>
                  <thead className="bg-sky-700">
                    <tr>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Code</th>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Description</th>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sourceOfWealth.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                        <td className="border px-4 py-2">{item[0]}</td>
                        <td className="border px-4 py-2">{item[1]}</td>
                        <td className="border px-4 py-2">{item[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
              </div>
            

         
          
          </div>
          {/* **************************************** */}


          {/* Second Side */}
          {/* Second Side */}
          {/* Second Side */}
          <div className="w-full max-w-2xl">
            


                <div className='border md:p-2 text-white bg-sky-400 ' 
                style={{
                background:'',
                }} 
                
                >
                    Source of Fund
                </div>
                {/* <DataTable columns={columns} data={rows} rowsPerPage={2}   /> */}

                <div className="mb-[10px]">
                <table className="w-full" style={{zoom:0.70}}>
                  <thead className="bg-sky-700">
                    <tr>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Code</th>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Description</th>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageData2.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                        <td className="border px-4 py-2">{item[0]}</td>
                        <td className="border px-4 py-2">{item[1]}</td>
                        <td className="border px-4 py-2">{item[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination controls */}
                <div className="flex justify-end space-x-2 " style={{zoom:0.70}}>
                  <div
                    className="border-2 border-black cursor-pointer px-1 rounded-md bg-sky-700 text-white"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </div>
                  <span>Page {currentPage}</span>
                  <div
                    className="border-2 border-black cursor-pointer px-1 rounded-md bg-sky-700 text-white"
                    disabled={endIndex >= currentPageData2.length || endIndex === itemsPerPage}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </div>
                </div>
                </div>


                <hr />


                <div className='border md:p-2 text-white md:mt-3 bg-sky-400'
                style={{
                    background:'',
                    }}
                >
                
                    Transaction Type
                </div>
                {/* <DataTable columns={columns__} data={rows__} rowsPerPage={2}  /> */}
                <div>
                <table className="w-full" style={{zoom:0.70}}>
                  <thead className="bg-sky-700">
                    <tr>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Code</th>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Description</th>
                      <th style={{borderRight:'1px solid white'}} className="text-white font-bold px-4 py-2">Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionType.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}>
                        <td className="border px-4 py-2">{item[0]}</td>
                        <td className="border px-4 py-2">{item[1]}</td>
                        <td className="border px-4 py-2">{item[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>

          </div>

        </div>

      
      </div>
    </div>
  )
}

export default Anti_Money_Laundering