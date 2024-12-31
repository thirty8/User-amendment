import { React, useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { API_SERVER } from "../../../../../../config/constant";
import { Tabs } from "@mantine/core";

import TabsComponent from "../../../../../../components/others/tab-component/tab-component";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import InputField from "../../../../../../components/others/Fields/InputField";
import MemberDetails from "../member360/member-details";
import ShareDetails from "./share-details";
import MemberSearchByNumber from "./member-account-details/member-search-by-number";
import SearchModal from "../../../../trans-processes/back-office/shares-transfer/components/SearchModal"
import "../../../account-enquiry/customer-search.css";

const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function Member360() {

const [memberID,setMemberID] = useState("");
const [memberIDFromSearch,setMemberIDFromSearch] = useState("");

const [tabs,setTabs] = useState(false);


  const tabsData = 
  [
    { value: 'default', label: 'MEMBER DETAILS',component:<MemberDetails memberID={memberID}/>},
    { value: 'tab-2', label: 'ACCOUNT DETAILS',component:<MemberSearchByNumber memberID={memberID}/> },
    { value: 'tab-3', label: 'SHARE DETAILS',component:<ShareDetails memberID={memberID}/>}
  ];

  const [activeTab, setActiveTab] = useState(tabsData[0].value);

  const [findById, setFindById] = useState(false);
    const openFindByIDmodal = () => {
        setFindById(true);
    }

    function handleSelected(value) {
      console.log(value.customer_number  , "ghaa")
    setMemberID(value.customer_number);
    setMemberIDFromSearch(value.customer_number);
      setFindById(false);
      
  }


  useEffect(()=>{
    if(memberIDFromSearch){
      axios
      .post(
        API_SERVER + "/api/getByCustomerNumber",
        {customerNumber: memberID}
        ,{headers}
      )
      .then((response) => {
       let results = response.data.response;

        if (results === undefined) {
          swal({
            title: "Invalid Member ID",
            text: "The Member ID could not be found in our records..",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          }).then((result) => {
            if (result) {
              var input = document.getElementById("memberID");
              input?.focus();
              setTabs(false);
             
            }
          }).catch(err=> console.log(err))
        } else {
        setTabs(true);
      }
        // document.getElementById("Start Date")?.focus();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },[memberID])


  const handleMemberData = () =>{
    axios
    .post(
      API_SERVER + "/api/getByCustomerNumber",
      {customerNumber: memberID}
      ,{headers}
    )
    .then((response) => {
     let results = response.data.response;
  
      if (results === undefined) {
        swal({
          title: "Invalid Member ID",
          text: "The Member ID could not be found in our records..",
          icon: "warning",
          buttons: "OK",
          dangerMode: true,
        }).then((result) => {
          if (result) {
            var input = document.getElementById("memberID");
            input?.focus();
            setTabs(false);
           
          }
        }).catch(err=> console.log(err))
      } else {
      setTabs(true);
    }
      // document.getElementById("Start Date")?.focus();
    })
    .catch((error) => {
      console.log(error);
    }); 
  }

  const getMemberData = (e) => {
    if (e.key === "Enter") {
    axios
      .post(
        API_SERVER + "/api/getByCustomerNumber",
        {customerNumber: memberID}
        ,{headers}
      )
      .then((response) => {
       let results = response.data.response;

        if (results === undefined) {
          swal({
            title: "Invalid Member ID",
            text: "The Member ID could not be found in our records..",
            icon: "warning",
            buttons: "OK",
            dangerMode: true,
          }).then((result) => {
            if (result) {
              var input = document.getElementById("memberID");
              input?.focus();
              setTabs(false);
             
            }
          }).catch(err=> console.log(err))
        } else {
        setTabs(true);
      }
        // document.getElementById("Start Date")?.focus();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };


  return (
    <div>
      <div style={{display:"flex",margin:"10px 0px 30px 0px",borderBottom:'1px solid lightgrey',borderTop:'1px solid lightgrey',padding:"10px 0px 10px 0px"}}>
        <div style={{flex:0.01}}></div>
        <div  style={{display:"flex",justifyContent:"flex-start",flex:0.5,gap:"5px"}}>
            <div style={{flex:0.6}}>
      <InputField
                        label={"Member ID :"}
                        labelWidth={"40%"}
                        inputWidth={"60%"}
                        onChange={(e)=>{setMemberID(e.target.value)}}
                        onKeyDown={(e)=>{getMemberData(e)}}
                        id={"memberID"}
                        value={memberID}
                        paddingRight={"5px"}
                        // textAlign={"right"}
                      />
            </div>
            <div  style={{flex:0.01}}>
            <ButtonComponent
                    label={"GO"}
                    buttonColor={"white"}
                    buttonWidth={"35px"}
                    buttonHeight={"25px"}
                    onClick={handleMemberData}
                    buttonBackgroundColor={"green"}
                    // onClick={handleSig}
                    // onClick={signatureVerification?handleSig:handleShoww}
                  />
            </div>
            <ButtonComponent
                    label={"Find"}
                    buttonColor={"white"}
                    buttonWidth={"50px"}
                    buttonHeight={"25px"}
                    onClick={openFindByIDmodal}
                    // buttonBackgroundColor={"#5DBB63"}
                    // onClick={handleSig}
                    // onClick={signatureVerification?handleSig:handleShoww}
                  />
            </div>
            <div style={{flex:0.49}}></div>
      </div>
      <div>
       { tabs ?
        <TabsComponent 
          tabsData={tabsData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeColor={"green"}
          inactiveColor={"#AFE1AF7A"}

          /> :<div/>}
        </div>
        <SearchModal showModal={findById} setShowModal={setFindById} handleSelected={handleSelected}/>
    </div>
  );
}
export default Member360;
