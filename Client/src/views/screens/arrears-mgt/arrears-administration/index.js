import React from "react";
import ActionButtons from "../../account-activities/additional-account-creation/components/comp/ActionButtons";
import ScreenBase from "../../account-activities/m/ScreenBase";
import InputField from "../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../components/others/Fields/ListOfValue";
// import Header from "../../../../components/others/Header/Header";
import HeaderComponent from "../../lending/components/header/HeaderComponent";
import CustomTable from "../../../../components/others/customtable";



function CollectorGroupCreation() {
  return (
  
    <div>
      <ActionButtons onOkClick={"hi"} />

      <ScreenBase
        card_div1a={

          <div style={{ width: "100%" ,display:"grid" , placeItems:"center"}}>
              <div style={{ width: "70%", marginLeft:"20%"}} >

              
            <div style={{ marginBottom: "10px" }}>
              <ListOfValue label={"Collector Group"} 
              inputWidth={"50%"}/>

            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: "0.4" }}>
                
                <InputField label={"Min Arrears Days"}
                inputWidth={"20%"}
                labelWidth={"24.5%"}
               
               />
              </div>
              <div style={{ flex: "0.4" }}>
                <InputField label={"Max Arrears Days"}
                                inputWidth={"20%"}
                                labelWidth={"29%"}

                                />

              </div>
            </div>
            </div>
          </div>
          
        }
        card_div2a={
            <div >

            <div >
               <HeaderComponent
               title={"Collector setup"}
               />
               </div>
               <CustomTable
                headers={[
                  "Collector Code",
                  "Collector Group",
                  "Minimum Days",
                  "Maximum Days",
                  "Posted By",
                  "Amend",
                ]}
                
                data={[["00000", "SOFT COLLECTORS","1","300","UNIONADMIN","arrow"],
                ["00000", "GENERAL COLLECTORS","301","###","UNIONADMIN","arrow"],
                ["00000", "MEDIUM COLLECTORS","95","390","UNIONADMIN","arrow"],
                ["00000", "HARD COLLECTORS","390","99,000","UNIONADMIN","arrow"],
                ["00000", "TOUGH COLLECTORS","9,999,999","999,999,999","UNIONADMIN","arrow"],
                
                
                
                
                ]}/>
                
            </div>
        }
      />
    </div>
  );
}

export default CollectorGroupCreation;

