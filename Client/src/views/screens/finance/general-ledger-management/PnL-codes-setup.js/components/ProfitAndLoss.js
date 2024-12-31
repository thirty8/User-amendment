import React,{useEffect,useState} from "react";
import axios from "axios";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../../components/others/Fields/InputField";
import TextAreaField from "../../../../../../components/others/Fields/TextArea";
import RadioButtons from '../../../../../../components/others/Fields/RadioButtons';
import Header from "../../../../../../components/others/Header/Header";
import { API_SERVER } from "../../../../../../config/constant";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import CustomTable from '../../../../teller-ops/components/CustomTable';

const headers={
  // 'x-api-key': process.env.REACT_APP_API_KEY,
  'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  'Content-Type':'application/json'
};

function ProfitAndLossHeirachicalView() {

  const [parentLineLOV,setParentLineLOV]= useState([])
  const [parentLine,setParentLine]= useState("")
  const [PLdata,setPLdata]= useState([])

  const columns = [
 "Line Code", "Line Description","Line Level", "Parent Line","Branch" ,"Line Order"
  ];
  
  useEffect(()=>{
    const getProfitAndLossPL = () => {
      let curr = [];
      axios.get(API_SERVER + '/api/get-profit-and-loss-parent-line',
      {headers})
      .then((response) => {
        const results = response.data;
        results.map((i)=>{curr.push({label: i.code + "  -  " + i.description , value: i.code})})
        setParentLineLOV(curr) 
        })
        .catch((error)=>{
        console.log(error)
      })
    }
    getProfitAndLossPL();
  },[])

  useEffect(()=>{
    const getProfitAndLossPLData = () => {
      let array = [];
      axios.post(API_SERVER + '/api/get-profit-and-loss-data',
      {parentLine: parentLine},
      {headers})
      .then((response) => {
        const results = response.data;
        results.map((i)=>{array.push([i.pl_code,i.pl_desc,i.level_indicator,i.clear_to_code,i.branch_code,<div style={{textAlign:"center"}}>{i.ordering}</div>])})
        setPLdata(array) 
        })
        .catch((error)=>{
        console.log(error)
      })
    }
    getProfitAndLossPLData();
  },[parentLine])

  return (
    <div >
      <div>
        {/* save line button   */}
        {/* <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: "15px",
          }}
        >
          <ButtonComponent
            label={"Save Line Order Changes"}
            labelWidth={"20%"}
            type={"button"}
            buttonWidth={"20%"}
            buttonHeight={"25px"}
          />
        </div> */}
        {/* parent line   */}
        <div
          style={{
            display: "flex",
            justifyContent:'space-between',
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderRadius: "3px",
            flex: 1,
            padding: "15px 0px 15px 0px",
            margin: "15px 0px 15px 0px",
          }}
        >
          <div style={{flex: 0.36}}>
          <ListOfValue
            label={"Parent Line"}
            labelWidth={"25%"}
            inputWidth={"75%"}
            data={parentLineLOV}
              onChange={(e)=>{
                setParentLine(e)
              }}
              value={parentLine}
          />
          </div>

          <div style={{flex: 0.4}}></div>
          <div  style={{display:"flex",justifyContent:"center",flex: 0.24}}>
          <ButtonComponent
            label={"Save Line Order Changes"}
            // labelWidth={"20%"}
            type={"button"}
            buttonWidth={"60%"}  
            buttonHeight={"27px"}
          />
          </div>
          
        </div>
        <div style={{ padding: "15px"  }}>
          <CustomTable headers={columns} data={PLdata} />
          {/* <DataTable columns={columns} title={""} /> */}
        </div>
      </div>
    </div>
  );
}

export default ProfitAndLossHeirachicalView;
