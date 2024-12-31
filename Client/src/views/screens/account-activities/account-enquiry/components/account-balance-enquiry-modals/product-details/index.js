import {useState,useEffect,React} from 'react';
import axios from "axios";
import {API_SERVER} from "../../../../../../../config/constant";
import InputField from "../../../../../../../components/others/Fields/InputField";
import TabsComponent from "../../../../../../../components/others/tab-component/tab-component";
// import CustomTable from '../../../../../../../components/others/customtable';
import ChargesAccountSetup from "./charges-account-setup";
import ChargesRate from "./charges-rates";

const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

function ProductDetails({currency,product}) {
    const [baseRate,setBaseRate] = useState()
    const [productDetails,setProductDetails] = useState({});
    const [chargeRate,setChargeRate] = useState([]);

    const getBaseRate = () => {
        let baseRate = [];

    axios.get(API_SERVER + "/api/getBaseRate",
    {headers}).then((response)=>{
        let results = response.data;
        results.map((i) => {
            baseRate.push([
              i.base_rate
            ]);
          })
          setBaseRate(baseRate)
    })
    }

    const getProductDetails = () => {
        let productResponse = [] ;
     
        axios.post(API_SERVER + "/api/getProductDetails",
        {
          currency : currency,
          product : product,
        }
        ,{headers})
        .then((res) => {

        let results = res.data.response;
        let ponse = res.data.response1;

        console.log(res,"results")
        results.map((i)=>{
            setProductDetails({chargeFrequency:i?.charge_frequency,lastChargeDate:i?.last_charge_date,nextChargeDate:i?.next_charge_date,penaltyRate:i?.penalty_rate,chargeToNegative:i?.charge_to_negavite,lastWorkingDay:i?.last_work_day,interestIncome:i?.charge_contra,interestReceivable:i?.interest_suspense,interestInSuspense:i?.int_sus_liab_contra,interestInSuspenseContra:i?.int_suspense_liab,penaltyIncome:i?.penalty_contra,penaltyReceivable:i?.penalty_receivable,penaltyInSuspense:i?.penalty_suspense,penaltyInSuspenseContra:i?.penal_suspense_liab})
        })

        ponse.map((i)=>{
            productResponse.push([i.min_bal,i.max_bal,i.interest_variance,i.penalty_variance,i.base_rate,i.charges_rate,i.penalty_rate])
            setChargeRate(productResponse)
        })
        }
        )
      }


    const changeToFirstTab = () => 
        {
          setActiveTab(tabsData[0].value);
        //   setDisabledTabs([tabsData[1].value,tabsData[2].value])
        };
    
    
        const tabsData=[
          { 
            value: 'default', 
            label: 'Charges Account Setup',
            component:<ChargesAccountSetup productDetails={productDetails}/> 
          },
          { 
            value: 'tab-2',
            label: 'Charges Rate',
            component:<ChargesRate chargeRate={chargeRate}/>
          },
        ] 
    
        const [activeTab, setActiveTab] = useState(tabsData[0].value);
       
        const changeToSecondTab = () => 
        {
          setActiveTab(tabsData[1].value);
        //   setDisabledTabs(tabsData[2].value)
        };

useEffect(()=>{
    getBaseRate();
    getProductDetails();
},
[])

console.log(productDetails.chargeFrequency,"heya")
           

  return (
    <div>
        <div style={{display:"flex",justifyContent:"flex-end",marginRight:"20px"}}>
        <InputField
            label={"Base Rate"}
            labelWidth={"90%"}
            inputWidth={"10%"}
            value={baseRate}
            disabled
        />
        </div>
        <TabsComponent activeTab={activeTab} tabsData={tabsData} setActiveTab={setActiveTab} changeToSecondTab={changeToSecondTab}/>
    </div>
      
  );

}

export default ProductDetails;
