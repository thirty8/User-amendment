import React from "react";
import {useState,useEffect} from 'react';
import {Tabs} from "@mantine/core";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import DataTable from "../../../../../../components/others/customtable";

import InputField from "../../../../../../components/others/Fields/InputField";


function BalanceAccountDetails({bbg,stateTwo}) {
  return (
    <div>
      <div className="home_page_container" style={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
        {/* <Tabs.Tab value="messages">Returned Cheques</Tabs.Tab>
        <Tabs.Tab value="former">Statistics</Tabs.Tab>
        <Tabs.Tab value="letter">Services</Tabs.Tab> */}
      {/* <Tabs defaultValue="gallery" variant="pills">
      <Tabs.List>
        <Tabs.Tab value="gallery">Account Details</Tabs.Tab>
        <Tabs.Tab value="messages">View Risk Rating Details</Tabs.Tab>
      </Tabs.List>
       
        <Tabs.Panel value="gallery" pt="xs"> */}
        <div style={{paddingRight:"5px",paddingLeft:"5px",paddingBottom:"10px"}}>
            <div style={{zoom:0.85,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",display:"grid",paddingLeft:"20px",padding:"20px",gridTemplateColumns:"1fr 1fr",columnGap:"40px",rowGap:"15px",paddingTop:"20px"}}>
                        <InputField
                          label={"BBAN"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          value={stateTwo.accountNumber}
                          disabled
                        />
                         <InputField
                          label={"Account Classification"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.acctClass}
                        />
                         <InputField
                          label={"Foreign A/C Category"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          disabled
                          
                        />
                        <InputField
                          label={"Product"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.productDescrp}
                        />
                        <InputField
                          label={"A/C Opened Date"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          type={"date"}
                          disabled={"disabled"}
                          value={stateTwo.dateOpened}
                        />
                         <InputField
                          label={"Impair Status"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.statusDescrp}
                        />
                         <InputField
                          label={"Last DB Trans Date"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          type={"date"}
                          disabled
                          value={stateTwo.lastOdDate}
                        />
                         <InputField
                          label={"Customer Number"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.customerNumber}
                        />
                        <InputField
                          label={"Last Activity Date"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          type={"date"}
                          disabled
                          value={stateTwo.dateOfLastActivity}
                        />
                         <InputField
                          label={"Number Of Deposits"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.noOfDeposits}
                        />
                         <InputField
                          label={"Last CR Trans. Date"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          type={"date"}
                          disabled
                          // value={stateTwo.}
                        />
                         <InputField
                          label={"Number Of Withdrawals"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.noOfWithdrawals}
                        />
                        <InputField
                          label={"Date in Debit"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          type={"date"}
                          disabled
                          value={stateTwo.firstDebitDate}
                        />
                         <InputField
                          label={"Credit Interest Code"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.creditIntCode}
                        />
                           <InputField
                          label={"Date in Credit"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          type={"date"}
                          disabled
                          value={stateTwo.firstCrDate}
                        />
                         <InputField
                          label={"Debit Interest Code"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.debitIntCode}
                        />
                        <InputField
                          label={"Date Account Closed"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          type={"date"}
                          disabled
                          value={stateTwo.dateAccountClosed}
                        />
                         <InputField
                          label={"PC Code"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          // value={stateTwo.}
                        />
                        <InputField
                          label={"Dormant Date"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          type={"date"}
                          disabled
                          value={stateTwo.dateOfDormancy}
                        />
                        <InputField
                          label={"Sector"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.sector}
                        />
                         <InputField
                          label={"Credit Int. Avail. At:"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          disabled
                          // value={stateTwo.}
                        />
                        <InputField
                          label={"Sub Sector"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={stateTwo.subSector}
                        />
                        <InputField
                          label={"Debit Int. Avail. At:"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          disabled
                          // value={stateTwo.}
                        />
                         <InputField
                          label={"Created By"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          // value={stateTwo.}
                        />
                        <InputField
                          label={"Short Name"}
                          labelWidth={"32%"}
                          inputWidth={"45%"}
                          disabled
                          // value={stateTwo.}
                        />
                         <InputField
                          label={"Approved By"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          // value={stateTwo.}
                        />
                        <div></div>
                </div>
              </div>  

            </div>
            {/* </Tabs.Panel> */}
            {/* <DataTable title={"INFO"} rowsPerPage={false} columns={["Check Number","Returned Date","Surname","Gender","Date Of Birth"]}/> */}
            {/* <br></br> */}
            {/* <Tabs.Panel value="messages">
        <div style={{paddingTop:"10px"}}>
            <div style={{boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                <div style={{display:"flex"}}>
                    <div style={{flex:0.05}}></div>
                    <div style={{flex:0.9}}>
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"80px",rowGap:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
                        <InputField label={"First Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Middle Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Surname"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Alias Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Sex"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Date Of Birth"} labelWidth={"40%"} inputWidth={"55%"} type={"date"} disabled/>
                        <InputField label={"Nationality"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Domicile Country"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Country Of Residence"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Next of Kin"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Next of Kin Address"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Next of Kin Phone"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Suffix"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Salutation"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Email Address"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Mobile Number"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Place Of Birth"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Number Of Dependants"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Marital Status"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Mother's First Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Mother's Middle Name"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                        <InputField label={"Mother's Maid. Surname"} labelWidth={"40%"} inputWidth={"55%"} disabled/>
                    </div>
                    </div>
                    <div style={{flex:0.05}}></div>
                </div>
            </div>
        </div>
        </Tabs.Panel> */}
        {/* </Tabs> */}
      </div>
    </div>
      
  );

}

export default BalanceAccountDetails;
