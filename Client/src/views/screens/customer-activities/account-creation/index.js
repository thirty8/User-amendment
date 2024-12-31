import { useState, useEffect } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import {GiHumanTarget} from 'react-icons/gi'
import {SiNike} from 'react-icons/si'
import {MdOutlinePersonalInjury} from 'react-icons/md'
import Individual_account_opening from './components/individual-account-opening';
import Corporate_Bank from './components/corporate-bank';
import Corporate_Relations from './components/corporate-relations';
import Account_Details from './components/account-details';
import Account_Mandate from './components/account-mandate';
import Ebanking_Customer_Risk from './components/ebanking-customer-risk';
import Account_Referees from './components/account-referees';
import Anti_Money_Laundering from './components/anti-money-laundering';
import HeaderComponent from '../../../../components/others/Header/HeaderComponent';
import { API_SERVER } from '../../../../config/constant';
import { ScrollArea } from '@mantine/core';
import axios from 'axios';
const headers = {
  'x-api-key': process.env.REACT_APP_API_KEY,
  'Content-Type': 'application/json'
};

function AccountCreation({accountTypes, setAccountTypes}) {
  const [customerSegment, setCustomerSegment] = useState("")
  const [customerSubSegment, setCustomerSubSegment] = useState([])
  const [sector, setSector] = useState([])
  const [subSector, setSubSector] = useState([])
  const [handleData, setHandleData] = useState("")
  const [productData, setProductData] = useState([]);
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 9 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));



useEffect(()=>{
    axios.post(API_SERVER + '/api/get-customer-category' , {csType : accountTypes}, { headers }).then((res)=>{
        console.log(res.data , "from Tabs")
        if(res.data.length > 0){
            const arr = []
            res.data?.map((i) => (
                arr.push({value:i.actual_code ,label:i.description })
              ))
              setCustomerSegment(arr)
        }

        
        // localStorage.setItem("customerSegment", JSON.stringify(customerSegment))
    })

    axios.get(API_SERVER + '/api/get-sector', { headers }).then((res)=>{
        // console.log(res.data , "from Tabs")
        if(res.data.length > 0){
            const arr = []
            res.data?.map((i) => (
                arr.push({value:i.class_code ,label:i.description })
              ))
              setSector(arr)
        }
        
        
        // localStorage.setItem("customerSegment", JSON.stringify(customerSegment))
    })
    
} , [accountTypes])

  useEffect(() => {

    
    
    // Get Customer Category
    const getCustomerCategory = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "CUT",
        }, { headers }).then(function (response) {
            localStorage.setItem("getCustomerCategory", JSON.stringify(response.data))
            
            console.log("getCustomerCategory :",response.data);
        })

        // setShow(false)
    }

    // Get Customer Title
    const getCustomerTitle = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "TIT", 
        }, { headers }).then(function (response) {
            localStorage.setItem("title", JSON.stringify(response.data))
            // console.log("CurrencyAmount :",response.data);
        })
    }

    // Get Salutation
    const getSalutation = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "SAL", 
        }, { headers }).then(function (response) {
            localStorage.setItem("Salutation", JSON.stringify(response.data))
            // console.log("CurrencyAmount :",response.data);
        })
    }

    // Get ID Type
    const getIDType = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "HRD", 
        }, { headers }).then(function (response) {
            localStorage.setItem("getIDType", JSON.stringify(response.data))
            // console.log("getCountry :",response.data);
        })
    }

    // Get City
    const getCity = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "CTY", 
        }, { headers }).then(function (response) {
            localStorage.setItem("getCity", JSON.stringify(response.data))
        })
    }

    // Get Country
    const getCountry = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "CON",
        }, { headers }).then(function (response) {
            localStorage.setItem("getCountry", JSON.stringify(response.data))
            console.log("getCountry :",response.data);
        })
    }

    // Get Postal Address
    const getPostalAddress = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "CIT", 
        }, { headers }).then(function (response) {
            localStorage.setItem("getPostalAddress", JSON.stringify(response.data))
        })
    }

    // Get Signatory Level
    const getSignatoryLevel = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "APL", 
        }, { headers }).then(function (response) {
            localStorage.setItem("getSignatoryLevel", JSON.stringify(response.data))
        })
    }

    // Get Preferrred Language
    const getPreferredLanguage = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "LNG",
        }, { headers }).then(function (response) {
            localStorage.setItem("PreferrredLanguage", JSON.stringify(response.data))
        })
    }

    // Get Document Required Type
    const getDocumentRequiredType = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "DRA",
        }, { headers }).then(function (response) {
            localStorage.setItem("DocumentRequiredType", JSON.stringify(response.data))
        })
    }


    // Get Product Group
    async function getProductGroup() {
        axios.get(API_SERVER + "/api/product-group-data", { headers }).then(function (response) {
            localStorage.setItem("ProductGroup_data", JSON.stringify(response.data))
        })
    }

    // Get Product Sub Group
    async function getProductSubGroup() {
        axios.get(API_SERVER + "/api/product-group-data", { headers }).then(function (response) {
            localStorage.setItem("ProductSubGroup", JSON.stringify(response.data))
        })
    }

    // Get Account Mandate
    const getAccountMandate = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "AMD",
        }, { headers }).then(function (response) {
            localStorage.setItem("AccountMandate", JSON.stringify(response.data))
        })
    }

    // Get Nature of Ownership
    const getNatureOfOwnership = () => {
        axios.post(API_SERVER + "/api/get-code-details", { 
        code: "NOW",
        }, { headers }).then(function (response) {
            localStorage.setItem("NatureOfOwnership", JSON.stringify(response.data))
        })
    }

    // Get introductory source
    async function getIntroductorySource() {
        axios.get(API_SERVER + "/api/get-introductory-source", { headers }).then(function (response) {
            localStorage.setItem("introductory_source", JSON.stringify(response.data))
        })
    }


    Promise.all([
        getCustomerCategory(),
        getCustomerTitle(),
        getSalutation(),
        getIDType(),
        getCity(),
        getCountry(),
        getPostalAddress(),
        getSignatoryLevel(),
        getPreferredLanguage(),
        getProductGroup(),
        getProductSubGroup(),
        getDocumentRequiredType(),
        getAccountMandate(),
        getNatureOfOwnership(),
        getIntroductorySource(),
    ])
    .then(function (results) {
        // get currencies
        const getCurrencyAmount = results[0].data;
        localStorage.setItem("getCurrencyAmount", JSON.stringify(getCurrencyAmount));
        console.log(getCurrencyAmount)
    })
    .catch(function (error) {
        console.log(error);
    });
    
}, []);
console.log(customerSegment , accountTypes, "customerSegment")
const allLovs = {
    customerCategory:[],
    title: [],
    salutation:[],
    id_type:[],
    city:[],
    country:[],
    postalAddress:[],
    signatoryLevel:[],
    preferredLanguage:[],
    productGroup:[],
    productSubGroup:[],
    documentRequiredType:[],
    accountMandate:[],
    natureOfOwnership:[],
    customer_segment:[],
    introductorysource: null,
}

console.log(customerSegment)
    // const getCustomerSeg = JSON.parse(localStorage.getItem('customerSegment'))
    // if(getCustomerSeg.length > 0){
    //     getCustomerSeg?.map((i) => (
    //         allLovs.customer_segment.push({value:i.actual_code ,label:i.description })
    //       ))
    // }

  const getCustomerCat = JSON.parse(localStorage.getItem('getCustomerCategory'))
  getCustomerCat?.map((i) => (
    allLovs.customerCategory.push({value:i.actual_code ,label:i.description })
  ))

  const getTitle = JSON.parse(localStorage.getItem('title'))
  getTitle?.map((i) => (
    allLovs.title.push({value:i.actual_code ,label:i.description })
  ))

  const getSalutation = JSON.parse(localStorage.getItem('Salutation'))
  getSalutation?.map((i) => (
      allLovs.salutation.push({value:i.actual_code ,label:i.description })
    ))

    const getIDType = JSON.parse(localStorage.getItem('getIDType'))
    getIDType?.map((i) => (
      allLovs.id_type.push({value:i.actual_code ,label:i.description })
    ))

    const getCity = JSON.parse(localStorage.getItem('getCity'))
    getCity?.map((i) => (
        allLovs.city.push({value:i.actual_code ,label:i.description })
      ))

    const getCountry = JSON.parse(localStorage.getItem('getCountry'))
    getCountry?.map((i) => (
    allLovs.country.push({value:i.actual_code ,label:i.description })
    ))

    const getPostalAddress = JSON.parse(localStorage.getItem('getPostalAddress'))
    getPostalAddress?.map((i) => (
    allLovs.postalAddress.push({value:i.actual_code ,label:i.description })
    ))

    const getSignatoryLevel = JSON.parse(localStorage.getItem('getSignatoryLevel'))
    getSignatoryLevel?.map((i) => (
    allLovs.signatoryLevel.push({value:i.actual_code ,label:i.description })
    ))

    const getPreferredLanguage = JSON.parse(localStorage.getItem('PreferrredLanguage'))
    getPreferredLanguage?.map((i) => (
    allLovs.preferredLanguage.push({value:i.actual_code ,label:i.description })
    ))

    const getProductGroup = JSON.parse(localStorage.getItem('ProductGroup'))
    getProductGroup?.map((i) => (
    allLovs.productGroup.push({value:i.actual_code ,label:i.description })
    ))

    const getProductSubGroup = JSON.parse(localStorage.getItem('ProductSubGroup'))
    getProductGroup?.map((i) => (
    allLovs.productSubGroup.push({value:i.actual_code ,label:i.description })
    ))

    const getDocumentRequiredType = JSON.parse(localStorage.getItem('DocumentRequiredType'))
    getDocumentRequiredType?.map((i) => (
    allLovs.documentRequiredType.push({value:i.actual_code ,label:i.description })
    ))

    const getAccountMandate = JSON.parse(localStorage.getItem('AccountMandate'))
    getAccountMandate?.map((i) => (
    allLovs.accountMandate.push({value:i.actual_code ,label:i.description })
    ))

    const getNatureOfOwnership = JSON.parse(localStorage.getItem('NatureOfOwnership'))
    getNatureOfOwnership?.map((i) => (
    allLovs.natureOfOwnership.push({value:i.actual_code ,label:i.description })
    ))

    const getIntroductorySource = JSON.parse(localStorage.getItem('introductory_source'))
    console.log(getIntroductorySource, "getIntroductorySource::::")

    allLovs.introductorysource  = getIntroductorySource
    
    

    const handleOnChange = {
        myMethod: function() {
            const getProductGroup = JSON.parse(localStorage.getItem('ProductGroup'))
            getProductGroup?.map((i) => (
                allLovs.productGroup.push({value:i.actual_code ,label:i.description })
            ))
            console.log('Hello World!');
        },

        customerSegment: async function(value) {
            const data = await  axios.post(API_SERVER + "/api/get-sub-segment-cat" , {segmentCode : value}, { headers })
            if(data.data.length > 0){
                const response = data.data
                const arr = []
                console.log(response , "jfj")
                response.map((i) => {
                    arr.push({value:i.ACTUAL_CODE ,label:i.DESCRIPTION })
            // console.log(arr)
        })
        setCustomerSubSegment(arr)
            }
        },

        sector: async function(value) {
            console.log(value, "mmmmm")
            const data = await  axios.post(API_SERVER + "/api/get-sub-sector" , {sectorClassCode : value}, { headers })
            if(data.data.length > 0){
                const response = data.data
                const arr = []
                console.log(response , "Mannnn")
                response.map((i) => {
                    arr.push({value:i.actual_code ,label:i.description })
            // console.log(arr)
        })
        setSubSector(arr)
            }
        
        }
    }

    console.log(subSector , "kkk")

    const handleScroll = (e) => {
        console.log('X-axis scroll:', e.target.scrollRight);
      };

  return (
    <div className='' style={{ zoom: "0.85" }}>
    <div className='border m-2'>
        <HeaderComponent accountTypes={accountTypes} setAccountTypes={setAccountTypes} data={allLovs} />
    </div>
        <div className='md:border overflow-x-auto '>
            <Stepper orientation="horizontal" active={active} size={15} className="m-2 md:w-[100%]" onStepClick={setActive} completedIcon={<SiNike />} onScroll={handleScroll}>
                <Stepper.Step icon={<MdOutlinePersonalInjury size={18} />} description="Individual">
                    <Individual_account_opening data={allLovs} />
                </Stepper.Step>
                <Stepper.Step icon={<GiHumanTarget size={18} />} description="Corporate Bank">
                    <Corporate_Bank data={allLovs}/>
                </Stepper.Step>
                <Stepper.Step icon={<GiHumanTarget size={18} />} description="Corporate Relations">
                    <Corporate_Relations data={allLovs} />
                </Stepper.Step>
                <Stepper.Step icon={<GiHumanTarget size={18} />} description="Account Details">
                    <Account_Details sector={sector} subSector={subSector} customerSegment={customerSegment} customerSubSegment={customerSubSegment} accountTypes={accountTypes} setAccountTypes={setAccountTypes} data={allLovs} onChange={handleOnChange} />
                </Stepper.Step>
                <Stepper.Step icon={<GiHumanTarget size={18} />} description="Account Mandate/Document">
                    <Account_Mandate data={allLovs} />
                </Stepper.Step>
                <Stepper.Step icon={<GiHumanTarget size={18} />} description="Ebanking/Customer Risk Analysis">
                    <Ebanking_Customer_Risk />
                </Stepper.Step>
                <Stepper.Step icon={<GiHumanTarget size={18} />} description="Account Referees  ">
                    <Account_Referees />
                </Stepper.Step>
                <Stepper.Step icon={<GiHumanTarget size={18} />} description="Anti Money Laundering">
                    <Anti_Money_Laundering data={allLovs} />
                </Stepper.Step>
                <Stepper.Completed>
                    {/* <Tab_activity_completed /> */}
                </Stepper.Completed>
            </Stepper>
        </div>

        <Group position="right" mt="xl" className='mr-2'>
            <button className='border p-1 px-2 rounded bg-slate-500 hover:bg-slate-700 hover:text-white' variant="default" onClick={prevStep}>Back</button>
            <button className='border p-1 px-2 rounded bg-slate-500 hover:bg-slate-700 hover:text-white' onClick={nextStep}>Next step</button>
        </Group>
    </div>
  );
}

export default AccountCreation;