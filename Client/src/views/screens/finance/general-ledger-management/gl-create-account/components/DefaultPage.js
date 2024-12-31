import React,{useEffect,useState} from 'react';
import axios from "axios";
import swal from "sweetalert";

import { API_SERVER } from "../../../../../../config/constant";
import { FaLongArrowAltLeft,FaLongArrowAltRight } from "react-icons/fa";

import ListOfValue from '../../../../../../components/others/Fields/ListOfValue';
import CustomTable from '../../../../../../components/others/customtable';
import ButtonComponent from '../../../../../../components/others/Button/ButtonComponent';
import Header from '../../../../../../components/others/Header/Header';

const headers = {
  "x-api-key":
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function AccountsHierarchy({setAccountT,setCT}) {
  // let CoAarray = [];
  const [chartGroups,setChartGroups] = useState("");
  const [chartGroupsLOV,setChartGroupsLOV] = useState([]);
  const [checker,setChecker] = useState(true);
  const [clearToCode,setClearToCode] = useState("");
  const [reverseClearToCode,setReverseClearToCode] = useState("");
  const [clearToCodeLOV,setClearToCodeLOV] = useState([]);
  const [datatableData,setDatatableData] = useState([]);
  const [coAarray,setCoAarray] = useState([]);
  // const [accountT,setAccountT] = useState("");
  
  
 

  const columns= ["Account Description","Level","Currency","Branch","Report Line","Line Code","Customer ID","GL Code","Account Number","Action"]

      useEffect(() => {
        let curr = [];
        const getChartGroups = () => {
          axios
            .get(API_SERVER + "/api/get-chart-group", { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.actual_code + "  -  " + i.description, value: i.actual_code})})
              console.log(curr, "djd");
              setChartGroupsLOV(curr);
              // console.log(stateLOV, "mmm");
            })
            .catch((error) => {
              console.log(error);
            });
        };
        getChartGroups();
      }, []);

      useEffect(() => {
        let curr = [];
          axios
            .post(API_SERVER + "/api/get-clear-to-code",
            {chartCode : chartGroups}, { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{curr.push({label: i.account_code + "  -  " + i.account_descrp, value: i.account_code})})
              console.log(curr, "djd");
              setClearToCodeLOV(curr);
              setClearToCode(curr[0].value);
              // console.log(stateLOV, "mmm");
            })
            .catch((error) => {
              console.log(error);
            });
    
      }, [chartGroups]);

      useEffect(() => {
        if(clearToCode){
      
        const getTDC = () => {
          
            setCoAarray([...coAarray, clearToCode])
          
          let array = [];
          axios
            .post(API_SERVER + "/api/get-chart-of-account",
            {clearToCode : clearToCode}, { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{array.push([<div style={{textAlign:"left"}}>{i.account_descrp}</div>,i.level_id,i.currency,i.branch,i.report_line,i.line_code,i.cust_no,i.gl_code,i.tacct,
              <div style={{display:"flex",justifyContent:"space-between"}}><ButtonComponent buttonIcon={<FaLongArrowAltLeft/>}  onClick={()=>{previousCoA([...coAarray, clearToCode])}}/><ButtonComponent buttonIcon={<FaLongArrowAltRight/>} onClick={()=>{if (i.level_id === "T"){setClearToCode(i.gl_code);}else{console.log("ayoooo")}}}/></div>])})
              setDatatableData(array);
              setAccountT(clearToCode)
              setCT(chartGroups)
              // setTO(accountT)
              setChecker(true)
              console.log("eiiiiiiiiiiiiiiiiii");
              // setClearToCode(curr[0].value);
              // console.log(stateLOV, "mmm");
            })
            .catch((error) => {
              console.log(error);
            });
          }
      getTDC()
        
          // console.log(array, "waale");
        }
        }, [clearToCode]);

        const previousCoA = (letsSee) => {
          let array = [];
          console.log(letsSee,"let's see")
          let prev = letsSee.pop()
          console.log(prev,"prev")
          console.log(letsSee,"coco be coco be coco e")
          setCoAarray(letsSee)
          axios
            .post(API_SERVER + "/api/get-chart-of-account",
            {clearToCode : letsSee[letsSee.length - 1 ]}, { headers })
            .then((response) => {
              const results = response.data;
              results.map((i)=>{array.push([<div style={{textAlign:"left"}}>{i.account_descrp}</div>,i.level_id,i.currency,i.branch,i.report_line,i.line_code,i.cust_no,i.gl_code,i.tacct,
              <div style={{display:"flex",justifyContent:"space-between"}}><ButtonComponent buttonIcon={<FaLongArrowAltLeft/>} onClick={()=>{previousCoA(letsSee)}}/><ButtonComponent buttonIcon={<FaLongArrowAltRight/>} onClick={()=>{setClearToCode(i.gl_code)}}/></div>])})
              setDatatableData(array);
              setAccountT(letsSee[letsSee.length - 1 ])
              setChecker(false)
              setReverseClearToCode(letsSee[letsSee.length - 1 ])
              setCT(chartGroups)

              // setTO(accountT)
              // setCoAarray([...coAarray, clearToCode])
              // setClearToCode(prev); 
              // console.log(array, "djd");
              // console.log(stateLOV, "mmm");
              console.log(letsSee,"lettuce leaf")
            })
            .catch((error) => {
              console.log(error);
            });
          }
        
      

      // console.log(datatableData, "here");
      // console.log(clearToCode, "here n there");
     
      console.log(coAarray, "mini mini mini waale");
      // console.log(accountT, "mini waale mini waale");
      

   
  return (
    
    <div style={{ padding: "10px 15px" }}>
      <div style={{ display: "flex", flex: 1 ,marginBottom:'15px',
      boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",padding: "15px",borderRadius: "3px" }}>
        <div style={{ flex: 0.4 }}>
          {/* chart group   */}
            <ListOfValue
              label={"Chart Group"}
              labelWidth={"20%"}
              inputWidth={"60%"}
              data={chartGroupsLOV}
              onChange={(e)=>{setChartGroups(e)}}
              />
            </div>
              <div style={{ flex: 0.1 }}></div>
          <div style={{flex:0.5}}>
            <ListOfValue
              label={"Clear To Code"}
              labelWidth={"20%"}
              inputWidth={"60%"}
              onChange={(e)=>{setClearToCode(e)}}
              data={clearToCodeLOV}
              value={checker ? clearToCode : reverseClearToCode}
            />
            </div>
      </div>
      <div>
        <br/>
        <div>
          <Header title={"Chart Of Account Setup"} headerShade={true}/>
          <CustomTable headers={columns} data={datatableData} rowsPerPage={12}/>
        </div>
      </div>
    </div>
  );
}

export default AccountsHierarchy;
