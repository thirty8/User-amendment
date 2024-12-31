import React from 'react'
import InputField from '../../../../../../../components/others/Fields/InputField';

function ChargesAccountSetup({productDetails}) {

  console.log(productDetails.chargeFrequency,"productDetails")

  return (
    <div>
        <div>
                <div style={{display:"grid",paddingLeft:"20px",padding:"20px",gridTemplateColumns:"1fr 1fr",rowGap:"15px",paddingTop:"20px"}}>
                        <InputField
                          label={"Frequency"}
                          labelWidth={"50%"}
                          inputWidth={"40%"}
                          disabled
                          value={productDetails.chargeFrequency}
                        />
                         <InputField
                          label={"Last Charge Date"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          type={"date"}
                          value={productDetails.lastChargeDate}
                        />
                         <InputField
                          label={"Last Working Date (Next Charge Date)"}
                          labelWidth={"50%"}
                          inputWidth={"40%"}
                          disabled
                          value={productDetails.lastWorkingDay}
                        />
                        <InputField
                          label={"Next Charge Date"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          type={"date"}
                          value={productDetails.nextChargeDate}
                        />
                        <InputField
                          label={"Penalty Rate"}
                          labelWidth={"50%"}
                          inputWidth={"40%"}
                          disabled
                          value={productDetails.penaltyRate}
                        />
                         <InputField
                          label={"Charge To Negative"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={productDetails.chargeToNegative}
                        />
                        
                        <div></div>
                </div>
                <hr/>
                <div style={{display:"grid",paddingLeft:"20px",padding:"20px",gridTemplateColumns:"1fr 1fr",rowGap:"15px",paddingTop:"20px"}}>
                        <InputField
                          label={"Interest Income"}
                          labelWidth={"50%"}
                          inputWidth={"40%"}
                          disabled
                          value={productDetails.interestIncome}
                        />
                         <InputField
                          label={"Interest Receivable"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={productDetails.interestReceivable}
                        />
                         <InputField
                          label={"Interest In Suspense"}
                          labelWidth={"50%"}
                          inputWidth={"40%"}
                          disabled
                          value={productDetails.interestInSuspense}
                        />
                        <InputField
                          label={"Interest In Suspense Contra"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={productDetails.interestInSuspenseContra}
                        />
                        <div></div>
                </div>
                <hr/>
                <div style={{display:"grid",paddingLeft:"20px",padding:"20px",gridTemplateColumns:"1fr 1fr",rowGap:"15px",paddingTop:"20px"}}>
                        <InputField
                          label={"Penalty Income"}
                          labelWidth={"50%"}
                          inputWidth={"40%"}
                          disabled
                          value={productDetails.penaltyIncome}
                        />
                         <InputField
                          label={"Penalty Receivable"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={productDetails.penaltyReceivable}
                        />
                         <InputField
                          label={"Penalty In Suspense"}
                          labelWidth={"50%"}
                          inputWidth={"40%"}
                          disabled
                          value={productDetails.penaltyInSuspense}
                        />
                        <InputField
                          label={"Penalty In Suspense Contra"}
                          labelWidth={"45%"}
                          inputWidth={"45%"}
                          disabled
                          value={productDetails.penaltyInSuspenseContra}
                        />
                        <div></div>
                </div>
            </div>
    </div>
  )
}

export default ChargesAccountSetup;