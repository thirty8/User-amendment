import React from 'react'
import { VscClose } from "react-icons/vsc";
import ListOfValue from '../../../../../../components/others/Fields/ListOfValue'
import ButtonComponent from '../../../../../../components/others/Button/ButtonComponent';

function ReportingLinesInputRows() {
  return (
    <div style={{display:'flex',marginBottom:'10px'}}>
        <div style={{flex:0.04}}>
            <ButtonComponent 
            buttonWidth={"25px"}
            buttonHeight={"25px"}
            buttonIcon={<VscClose size={20}/>}
            />
        </div>
        <div style={{flex:0.46}}>
            <ListOfValue
            marginRight={'0'}
            inputWidth={"100%"}
            />
        </div>
        {/* <div style={{flex:0.05}}></div> */}
        <div style={{flex:0.5,marginLeft:'6px'}}>
            <ListOfValue
            inputWidth={"98%"}
            marginRight={'0'}
            />
        </div>
    </div>
  )
}

export default ReportingLinesInputRows;