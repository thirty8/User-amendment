import React from "react";
import { useState} from 'react';
import { FiUser } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";


import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomerDetails from "./customer-details";
import AccountDetails from "./account-details";
import RelationDetails from "./relation-details";


function IndividualRelationshipAmendment({customerID,Dataa}) {

  const [currentComponent,setCurrentComponent] = useState('component1');

  const handleComponent = (component)=>{setCurrentComponent(component)}



  return (
    <div style={{zoom:0.9}}>
      <div
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        }}
      >
        <div style={{display:"flex",justifyContent:"flex-start",paddingTop:"10px",paddingBottom:"10px"}}>
            <div style={{flex:0.18,marginLeft:"10px"}}>
          <InputField
            label={"Customer ID"}
            labelWidth={"48%"}
            inputWidth={"52%"}
            disabled
            value={Dataa?.customerNumber}
          />    
            </div>
            <div style={{flex:0.35}}>
          <InputField 
            inputWidth={"70%"}
            disabled
            value={Dataa?.customerName}
            />  
            </div>
        </div>
      </div> 
   
      <div style={{display:"flex",marginTop:"17px",marginBottom:"17px"}}>
        <div style={{display:"flex",flex:0.3,gap:'20px',marginLeft:"5px"}}>
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
          <ButtonComponent
            label={"Customer"}  
            buttonWidth={"105px"}
            buttonHeight={"28px"}
            onClick={()=>{handleComponent('component1')}}
            buttonIcon={<FiUser/>}
          />
        </div>
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
          <ButtonComponent
            label={"Relation"}
            buttonWidth={"100px"}
            // onClick={handleOpen}
            buttonHeight={"28px"}
            onClick={()=>{handleComponent('component2')}}
            buttonIcon={<FaUserFriends/>}
          />
          </div>
          <div style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "4px" }}>
          <ButtonComponent
            label={"Accounts"}
            buttonWidth={"100px"}
            // onClick={handleActive}
            buttonHeight={"28px"}
            onClick={()=>{handleComponent('component3')}}
            buttonIcon={<GiMoneyStack/>}
          />
          </div>
        </div>
      </div>
      <div>
      {currentComponent === 'component1' && <CustomerDetails Dataa={Dataa}/>}
      {currentComponent === 'component2' && <RelationDetails Dataa={Dataa}/>}
      {currentComponent === 'component3' && <AccountDetails  Dataa={Dataa}/>}
      </div>
         </div>
  );
}

export default IndividualRelationshipAmendment;
