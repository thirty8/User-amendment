import React, { useState } from 'react'
import ButtonComponent from '../../../../../../components/others/Button/ButtonComponent';
import ReportingLinesInputRows from '../components/reportinglinesinputrows';

function CBReportingLines() {
    const [rows,setRows]= useState([{},{},{},{},{},{},{}])
 
  return (
    <div style={{ padding: "10px 15px",width:'80%',margin:"0 auto" }}>
                 <div style={{boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",paddingBottom:'5px',borderRadius:"3px",backgroundColor:"#ffffff"}}>
         <div style={{
           background:"#0580c0"
                    ,
                    borderBottom:'1px solid white',
                     color:"white", borderTopLeftRadius:'3px',borderTopRightRadius:'3px',height:'25px',fontSize:'1.1em',paddingLeft:'10px',alignItems:'center'}}>
            <span>CB Reporting Lines</span>
            </div>
            <div style={{display:'flex',backgroundColor:'lightgray',background:"#0580c0",color:"white"}}>
                <div style={{flex:0.5,textAlign:'center',borderRight:'1px solid white'}}>
                    <span>Return Code & Return Description</span>
                </div>
                <div style={{flex:0.5,textAlign:'center'}}>
                    <span>Item Code & Item Description</span>
                </div>
            </div>
            <div style={{padding:'10px'}}>
                {rows.map((row,index)=>(
                    <ReportingLinesInputRows/>
                ))}
            </div>
            </div>
            <div style={{display:'flex',justifyContent:'end',marginTop:'10px'}}>
                <ButtonComponent
                label={"Back"}
                buttonWidth={"50px"}
                />
            </div>
    </div>
  )
}

export default CBReportingLines;