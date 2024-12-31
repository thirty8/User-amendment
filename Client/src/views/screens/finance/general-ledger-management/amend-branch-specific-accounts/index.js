import React, {useEffect,useState} from 'react';
import axios from "axios";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import Header from "../../../../../components/others/Header/Header";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";
import CustomTable from "../../../../../components/others/customtable";
import { FiChevronRight } from "react-icons/fi";
import { API_SERVER } from "../../../../../config/constant";

const headers = {
    "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

    
function AmendBranchSpecificAccounts() {
   
    const [datatableData,setDatatableData] = useState([]);



useEffect(()=>{
    const getBranchSpecificAccounts = () => {
        let arr = [];
        axios.get(API_SERVER + '/api/get-branch-specific-accounts',
        {headers})
        .then((response) => {
          const results = response.data;
          results.map((i,key)=>{arr.push([i.account_code,i.description,i.chart_code,i.clear_to_code,i.cust_no,i.currency,i.sub_ref,i.account_class,i.approved_by,<div style={{display:"flex",justifyContent:"center"}}><ButtonComponent
            onClick={() => {
              // setUniqueTuple({
              //   cust: investmentResponse[key].account_number,
              // });
              // openBalanceEnquiry();
            }}
            buttonIcon={<FiChevronRight />}
          ></ButtonComponent></div>])})
          setDatatableData(arr) 
              console.log(arr, "djd");
          })
          .catch((error)=>{
          console.log(error)
        })
      }
      getBranchSpecificAccounts();

},[])


  return (
    <div>
    <div style={{ padding: "50px 0px" }}>

   <br/>
    <CustomTable headers={["Account Code","Account Description","Chart Code","Clear To Code","Customer No.","Currency Descripton","Memo Code","Sub Ref.","Account Class","Actions"]} data={datatableData}/>
    </div>
    </div>
  );
}

export default AmendBranchSpecificAccounts;