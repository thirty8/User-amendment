import React,{useEffect, useState} from 'react'
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../components/others/Header/Header";
import axios from 'axios';
import { API_SERVER } from '../../../../../config/constant';
import { Modal, ScrollArea } from "@mantine/core";
import InputField from '../../../../../components/others/Fields/InputField';
import ListOfValue from '../../../../../components/others/Fields/ListOfValue';
import coop from "../../../../../assets/coop.png";
import { AiOutlineCloseCircle } from "react-icons/ai";

function SasraReport() {
  const [details,setDetails]=useState([])
  const [cbrcode,setCbrcode]=useState([])
  const [form,setForm]=useState([])
  const [date,setDate]=useState("")
  const [report_code,setReport_code]=useState("")
  const [showModal,setShowModal]=useState(false)
    const headers={
    // 'x-api-key': process.env.REACT_APP_API_KEY,
    'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    'Content-Type':'application/json'
  };

  useEffect(()=>{
    async function getCBRCode() {
      let response = await axios.post(
        API_SERVER + "/api/get-code-details",
        { code: "CBR" },
        { headers }
      );
      setCbrcode(response.data);
    }
    getCBRCode()
  },[])
  
  async function fetchReport(){
    await axios.post("http://localhost:3320/api/get-statement-of-financial-position",
    {
      returnCode:report_code,
      reportDate:formatDate(date),
    }
    ,{headers}).then((response)=>{
      setDetails(response.data)
    })
  }

  function handleCloseModal(){
    setShowModal(false)
    setDetails([])
  }

  function generateReport(){
    setForm(cbrcode)
    setShowModal(true)
    fetchReport()
  }


  const formatDate = (inputDate) => {
    const dateParts = inputDate.split('-');
    const day = dateParts[2];
    const month = getMonthName(dateParts[1]);
    const year = dateParts[0];

    return `${day}-${month}-${year}`;
  };

  const getMonthName = (monthNumber) => {
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    return months[parseInt(monthNumber, 10) - 1];
  };

  console.log("dettttttt",formatDate(date))
  return (
    <div>
      <div className='w-[60%] mx-auto'>
      <div className='mb-1'>
        <Header 
     headerShade={true}
     title={"Report Parameters"}
     />
     </div>
     <div 
     className='w-full rounded-sm p-3'
     style={{   boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",}}>
      <div className='mb-4'>
        <ListOfValue
         label={"CBR Return Code"}
         labelWidth={"30%"}
         inputWidth={"60%"}
         data={cbrcode}
         onChange={(value)=>{setReport_code(value)}}
         />
      </div>
      <div className='mb-4'>
        <InputField
        type={"date"}
         label={"Date As At"}
         labelWidth={"30%"}
         inputWidth={"30%"}
         onChange={(e)=>{setDate(e.target.value)}}
         />
      </div>
      <div className='flex w-full justify-center gap-2 '>
      <ButtonComponent label={"Print Report"}
      // onClick={fetchReport}
      />
      <ButtonComponent label={"Download Excel"}
      // onClick={}
      />
      <ButtonComponent label={"Fetch Report"}
      onClick={generateReport}/>
      <ButtonComponent label={"Exit"}
      // onClick={}
      />
      </div>
     </div>
      </div>
      {showModal ?
        <Modal
        padding={0}
        opened={showModal}
        size="85%"
        withCloseButton={false}
        transitionProps={"mounted"}
        onClose={handleCloseModal}
        scrollAreaComponent={ScrollArea.Autosize}
      >
                <div className='mb-2 fixed top-0 w-full'>
                  <Header 
                  backgroundColor={"#0580c0"}
    //  headerShade={true}
     title={"Statement of Financial Position"}
     closeIcon={<AiOutlineCloseCircle size={18} />}
     handleClose={handleCloseModal}
     />
     </div>
     <div className='pt-[50px]' style={{ display: "flex", justifyContent: "center" }}>
              <img src={coop} alt="Coop Tech" style={{ height: "80px" }} />
      </div>
      <div className='flex justify-end pr-7'>
        <span><p>{`Date as at : `}<b>{`${formatDate(date)}`}</b></p></span>
      </div>

        <div className='' 
        >
      <table className='w-full border overflow-y-scroll  border-gray-300 rounded-sm '>
        <thead className='bg-gray-300 sticky top-7'>
        <tr className='bg-blue-200 position-sticky '>
          <th className='py-2 px-4 text-left font-semibold'>Item Description</th>
          <th className='py-2 px-4 text-left font-semibold'>Closing Balance Today</th>
        </tr>
        </thead>
        <tbody>
        {details.map((detail,index)=>{
          return(<tr className={`${
            (detail.level_id === 'H') ? 'font-bold border-t border-b border-gray-300' : (detail.level_id === 'T') ? "font-semibold" : ''
        } ${(detail.level_id === 'H' || detail.level_id === 'T') ? 'bg-gray-100' : 'bg-white'}`}>
            <td className='py-2 px-4'>{detail.item_descrp}</td>
            {detail.level_id === "H" ? <td></td> : <td className='py-2 px-4'>{detail.closing_balance_today}</td>}
            </tr>)
        })
      }
      </tbody>
      </table>
      </div>
      </Modal>
         : ""}
         </div>
  )
    }
    export default SasraReport;