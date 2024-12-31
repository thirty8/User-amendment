import React, { useState, useEffect } from "react";
import axios from 'axios';
import swal from 'sweetalert';

import InputField from "../../../../../../../components/others/Fields/InputField";
import RadioButtons from "../../../../../../../components/others/Fields/RadioButtons";
import {API_SERVER} from '../../../../../../../config/constant';

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function MemberPersonalDetails({memberID}) {
  // const [title, setTitle] = useState([]);
  // const [country, setCountry] = useState([])
  // const [region, setRegion] = useState(null);
  // const [guardianType, setGuardianType] = useState([]);
  // const [relationship, setRelationship] = useState([])
  // const [tableData, setTableData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [message, setMessage] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [middleName, setMiddleName] = useState('');
  // const [surname, setSurname] = useState('');
  // const [gender, setGender] = useState('');
  // const [email, setEmail] = useState('');
  // const [dob, setDob] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const [tinNumber, setTinNumber] = useState('')
  // const [id_number, setId_number] = useState('')
  // const [issuing_auth, setIssuing_auth] = useState('')
  // const [issuing_date, setIssuingDate] = useState('')
  // const [idExpiryDate, setIdExpiryDate] = useState('')
  // const [issuingPlace, setIssuingPlace] = useState('')
  // const [houseNumber, setHouseNumber] = useState('')
  // const [streetName, setStreetName] = useState('')
  // const [locationGp, setLocationGp] = useState('')
  // const [risk, setRisk] = useState('')
  // const [relationNo, setRelationNo] = useState('')
  // const [showRiskModal, setShowRiskModal]= useState(false)
  // const [anothertableData, setAnothertableData] = useState([])
  // const [minor, setMinor] = useState("No");
  // const [guarantorID, setGuarantorID] = useState('')
  // const [health, setHealth] = useState("No");
  // const [healthChallengeType, setHealthChallengeType] = useState("");
  // const [staff, setStaff] = useState("No")
  // const [staffID, setStaffID] = useState("")
  // const [language, setLanguage] = useState([])
  // const [inputError, setInputError] = useState('')
  // const [inputErrorMiddleName, setInputErrorMiddleName] = useState('')
  // const [inputErrorSurname, setInputErrorSurname] = useState('')
  // const [inputErrorFullName, setInputErrorFullName] = useState('')
  // const [selectedOption,setSelectedOption] = useState([])

  const [data,setData] = useState({});

  useEffect(()=>{
    if(memberID.length === 6 ){
    axios.post(
        API_SERVER + "/api/getMemberRelationDetails",
        {
          customerID: memberID,
        },
        { headers }
      )
      .then((response) => {
        let data = response.data.response[0];
        let dateOfBirth= response.data.dataTwo.rows[0][0];
  
          console.log(dateOfBirth, "kwekue");
          setData((prevState) => ({
            ...prevState,
            title: data?.title,
            gender: data?.gender,
            firstName: data?.first_name,
            middleName: data?.other_name,
            surname: data?.surname,
            shortName: data?.last_name,
            dateOfBirth:dateOfBirth,
            country: data?.dormicile_country,
            region: data?.region,
            district: data?.district,
            location: data?.location,
            preferredLanguage: data?.prefered_lang,
            minor: data?.minor,
            guardianId: data?.guardian_id,
            guardianType: data?.guardian_type,
            healthChallenge: data?.health_challenge,
            healthChallengeType: data?.h_challenge_type,
            staffID: data?.staff_id,
          }));
      })
      .catch((error) => {
        console.log(error);
      });
  }},[memberID])

console.log(memberID,"ID l3")
  


// useEffect(() => {
//   const getTitle = () => {
//     axios
//       .post(API_SERVER + "/api/get-code-details", {
//         code: "TIT",
//       },{headers})
//       .then(function (response) {
//        //  localStorage.setItem("title", JSON.stringify(response.data));
//         setTitle(response.data);
//         // console.log("Is this the Title ?::::",response.data);
//       });
//   };

//   getTitle()
// },[])

// console.log("Is this the Title ?::::", title)

// [{label: "hajhah" , value: "jksjks"}]


// useEffect(() => {
//   const getCountry = () => {
//     axios
//       .post(API_SERVER + "/api/get-code-details", {
//         code: "CON",
//       },{headers})
//       .then(function (response) {
//        //  localStorage.setItem("getCountry", JSON.stringify(response.data));
//        //  console.log("getCountry :", response.data);
//         setCountry(response.data)
//       });
//   };

//   getCountry()
// },[])


// useEffect(() => {
//   const getPreferredLanguage = () => {
//     axios
//       .post(API_SERVER + "/api/get-code-details", {
//         code: "LNG",
//       },{headers})
//       .then(function (response) {
//         setLanguage(response.data)
//       });
//   };

//   getPreferredLanguage()
// },[])

// useEffect(() => {
// // Relationship
// const getRelationships = () => {
//   axios
//     .post(API_SERVER + "/api/get-code-details", {
//       code: "RRE",
//     },{headers})
//     .then(function (response) {
//      //  localStorage.setItem("title", JSON.stringify(response.data));
//       setRelationship(response.data);
//     });
// };
// getRelationships()
// },[])

// useEffect(() => {
//   const getRegion = () => {
//     axios
//       .post(API_SERVER + "/api/get-code-details", {
//         code: "REG",
//       },{headers})
//       .then(function (response) {
//        //  localStorage.setItem("title", JSON.stringify(response.data));
//        setRegion(response.data);
//         // console.log("Is this the Title ?::::",response.data);
//       });
//   };

//  getRegion()
// },[])

// useEffect(() => {
//   const getGuardianType = () => {
//     axios
//       .post(API_SERVER + "/api/get-code-details", {
//         code: "GUA",
//       },{headers})
//       .then(function (response) {
//        //  localStorage.setItem("title", JSON.stringify(response.data));
//        setGuardianType(response.data);
//         // console.log("Is this the Title ?::::",response.data);
//       });
//   };

//   getGuardianType()
// },[])


return (
   <div style={{display:"flex",boxShadow:"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",backgroundColor:"white"}}>
    <div style={{flex:0.05}}></div>
    <div style={{flex:0.9,display:"grid",gridTemplateColumns:"1fr 1fr",rowGap:"10px",columnGap:"50px",padding:"10px 0px 15px 0px"}}>
    <InputField
                    label={"Title :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.title}
                  />
     {/* <InputField
                    label={"Gender :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  /> */}
    <RadioButtons label={"Gender :"} labelWidth={"31%"} radioButtonsWidth={"69%"} radioLabel={"Male"} radioLabel2={"Female"} radioLabel3={"Other"} display={true} display2={true} display3={true}/>
     <InputField
                    label={"First Name :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.firstName}
                  />
     <InputField
                    label={"Middle Name :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.middleName}
                  />
      <InputField
                    label={"Surname :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.surname}
                  />
     <InputField
                    label={"Short Name :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.shortName}
                  />
     <InputField
                    label={"Full Name :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
     <InputField
                    label={"Preferred Name :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />    
    <InputField
                    label={"Alias :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    // value={formatNumber(stateOne.ledgerBalance)}
                  />
     <InputField
                    label={"Date Of Birth :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    type={"date"}
                    disabled
                    value={data.dateOfBirth}
                  />
     <InputField
                    label={"Country :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.country}
                  />
     <InputField
                    label={"County / Region:"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.region}
                  />
      <InputField
                    label={"District :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.district}
                  />
     <InputField
                    label={"Location :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.location}
                  />
     <InputField
                    label={"Preferred Language :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.preferredLanguage}
                  />
      <RadioButtons label={"Minor :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} radioLabel3={"Other"} display={true} display2={true} display3={false}/>    
      <InputField
                    label={"Guardian ID :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.guardianId}
                  />
     <InputField
                    label={"Guardian Type :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.guardianType}
                  />
     <RadioButtons label={"Health Challenge :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} radioLabel3={"Other"} display={true} display2={true} display3={false}/>
     <InputField
                    label={"Health Challenge Type :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.healthChallengeType}
                  />   
     <RadioButtons label={"Staff Indicator :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} radioLabel3={"Other"} display={true} display2={true} display3={false}/>
     <InputField
                    label={"Staff ID :"}
                    labelWidth={"30%"}
                    inputWidth={"60%"}
                    // textAlign={"right"}
                    paddingRight={"5px"}
                    disabled
                    value={data.staffID}
                  />  
     <RadioButtons label={"Director Related :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} radioLabel3={"Other"} display={true} display2={true} display3={false}/>
     <RadioButtons label={"Staff Related :"} labelWidth={"30%"} radioButtonsWidth={"45%"} radioLabel={"Yes"} radioLabel2={"No"} radioLabel3={"Other"} display={true} display2={true} display3={false}/>
    </div>
    <div style={{flex:0.05}}></div>
    

   </div>
  );
}

export default MemberPersonalDetails;