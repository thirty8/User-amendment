import React from 'react'
import ActionButtons from '../../../../components/others/action-buttons/ActionButtons'
import InputField from '../../../../components/others/Fields/InputField'
import ListOfValue from '../../../../components/others/Fields/ListOfValue'

import TextAreaField from '../../../../components/others/Fields/TextArea'
import ButtonComponent from '../../../../components/others/Button/ButtonComponent'
import CustomTable from '../../teller-ops/components/CustomTable'

function RiskIndicatorSetup() {
    return (
        <div>
            <ActionButtons
                // displayNew={true}
                // displayOk={true}
                // displayExit={true}
                displayAuthorise={"none"}
                displayCancel={"none"}
                displayDelete={"none"}
                displayFetch={"none"}
                displayHelp={"none"}
                displayRefresh={"none"}
                displayReject={"none"}
                displayView={"none"} />

<div style={{marginBottom:"15px", marginTop:"10px"}}>
            <InputField
                label={"Sequence Number"}
                disabled={true} 
                labelWidth={"100%"}
               />
</div>



            <hr />

            <div style={{marginBottom:"15px", marginTop:"10px"}}>

            <ListOfValue
                label={"Risk type"}
                labelWidth={"10%"}
                // labelWidth={"%"}

            />
</div >
            <div style={{ display: "flex" ,marginBottom:"15px" }}>
                <div style={{ flex: "0.5" }}>
                    <InputField
                        label={"Account Number"}
                        inputWidth={"40%"}

                    />

                </div>
                <div style={{ flex: "0.5" }}>
                    <InputField
                        label={"Account Name"}
                    />
                </div>
            </div>

            <hr />


            <div style={{ marginTop :"10px", marginBottom:"15px" }}>

            <ListOfValue
                label={"Risk Code"}
                labelWidth={"10%"}
                inputWidth={"30%"}
            />

            
            </div>
            <div style={{ display: "flex" ,marginBottom:"15px" }}>
            <TextAreaField
                label={"Special Remarks"}
                // labelWidth={"40%"}
                labelWidth={"41%"}
                inputWidth={"59%"}

            />
            </div>

<div style={{ display: "flex" ,marginBottom:"15px" }}>
            <InputField
                label={"Effective Date"}
                labelWidth={"10%"}
                type={"date"}
            />
</div>
            <div style={{ display: "flex",marginBottom:"15px" }}>
                <div style={{ flex: "0.5" }}>

                    <InputField
                        label={"Expiry Date"}
                        labelWidth={"20%"}
                        type={"date"}
                    />
                </div>

                <div style={{ flex: "0.5" }}>

                    <InputField
                        label={"Amount Above Limit"}
                        InputField={"30%"}
                        labelWidth={"10%"}
                    
                   />
                </div>


            </div>
            <hr />

            <div style={{ display: "flex", placeContent: "center" , marginBottom:"15px",marginTop:"20px"}}>
                <div>

                    <ButtonComponent
                        label={"New"}
                        buttonWidth={"1000%"}


                        
                        />

                </div>
                <div>

                    <ButtonComponent
                        label={"Save"} 
                        buttonWidth={"1000%"}
                        marginLeft={"20px"}

                        />

                </div>



            </div>

            <CustomTable

                headers={["Risk Code", "Description", "Remarks", ""]}

            />








        </div>
    )
}

export default RiskIndicatorSetup