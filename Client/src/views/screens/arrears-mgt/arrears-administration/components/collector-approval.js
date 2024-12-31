import Modal from '../../../teller-ops/components/Modal'
import React from 'react'
import ScreenBase3 from '../../../account-activities/m/SreenBase3'
import InputField from '../../../../../components/others/Fields/InputField'
import ListOfValue from '../../../../../components/others/Fields/ListOfValue'
import SelectField from '../../../../../components/others/Fields/SelectField'
import InnerCards from '../../../account-activities/closed-accounts/cards/inner-cards'
import HeaderComponent from '../../../lending/components/header/HeaderComponent'
import CustomTable from '../../../../../components/others/customtable'
import ScreenBase from '../../../account-activities/m/ScreenBase'
import ButtonComponent from '../../../../../components/others/Button/ButtonComponent'



function CollectorApproval() {
  return (
    <div>
     
        <ScreenBase3
        card_div1a={
          <div>

            <div style={{width:"100%", display:"grid",placeItems:"center", marginTop :"50px", marginBottom :"50px"}}>
                <div style={{width:"50%", placeItems:"center"}}>  

                <ListOfValue
                 label={"Collector Name"}
             labelWidth={"30%"}
             inputWidth={"50%"}
                
                />
               
               {/* <Modal showModal={true}/>  */}
             
                </div>
                
                </div>
                <hr/>
                <div style={{marginTop:"10px"}}>
                <HeaderComponent
               title={"COLLECTOR APPROVAL"}
               


               />
                </div>

                         <CustomTable
                headers={[
                  "Collector Name ",
                  "Zone Code",
                  "Zone Name",
                  "Collector Code",
                  "Min Day",
                  "Max Days",
                ]}
                
                data={[["00000", "SOFT COLLECTORS","1","300","UNIONADMIN","arrow"],
                ["00000", "GENERAL COLLECTORS","301","###","UNIONADMIN","arrow"],
                ["00000", "MEDIUM COLLECTORS","95","390","UNIONADMIN","arrow"],
                ["00000", "HARD COLLECTORS","390","99,000","UNIONADMIN","arrow"],
                ["00000", "TOUGH COLLECTORS","9,999,999","999,999,999","UNIONADMIN","arrow"],
                //to do , arrow functionality  
                // when arrow is clicked it populates the  branches " assign branched into collector card"
                
                
                
                
                ]}/> 
            </div>
        }

        
        />
    </div>



  )
}

export default CollectorApproval



// import React from 'react'

// function collectorApproval() {
//   return (
//     <div>collector-approval</div>
//   )
// }

// export default collectorApproval