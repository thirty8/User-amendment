import React from "react";
import { useState, useEffect} from 'react';

import DataTable from "../../../../../../components/others/customtable";

import InputField from "../../../../../../components/others/Fields/InputField";

function FloatTransaction({bbg,UCB}) {
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return(
    <div>
    {/* <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"10px",gap:"10px"}}>
              <ButtonComponent label={"Print"} buttonColor={"white"} buttonWidth={"65px"} buttonHeight={"25px"}/>
              <ButtonComponent label={"Excel"} buttonColor={"white"} buttonWidth={"65px"} buttonHeight={"25px"}/>
              </div> */}
              <div style={{zoom:0.9}}>
                <DataTable data={UCB} headers={[
                  "Value Date",
                  "Narration",
                  "CR Amount",
                  "DB Amount",
                  "Batch No.",
                  "Source Br.",
                  "Channel",
                ]}/>
                <div style={{display:"flex",marginTop:"20px"}}>
                  <div style={{flex:0.5}}></div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flex:0.5}}>
                    {/* <div style={{display:"flex",flex:"0.45"}}>
                    <ButtonComponent label={"Accrued Amount"} buttonColor={"white"} buttonWidth={"150px"} buttonHeight={"30px"}/>
                    </div> */}
                    {/* <div style={{display:"flex",flex:"0.55",gap:"10px"}}> */}
                    <InputField label={"Total"} labelWidth={"25%"} inputWidth={"70%"} disabled textAlign={"right"} paddingRight={"5px"}/>
                    <InputField inputWidth={"70%"} disabled textAlign={"right"} paddingRight={"5px"}/>
                    <InputField label={"Diff."} labelWidth={"25%"} inputWidth={"55%"} disabled textAlign={"right"} paddingRight={"5px"}/>
                  </div>
                </div>
                </div>
    </div>
  );
}

export default FloatTransaction;
