import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AiFillHome,
  AiFillStar,
  AiFillHeart,
  AiOutlineClose,
  AiOutlineExpand,
  AiOutlineCompress,
  AiOutlineMinus,
  AiFillUpSquare,
  AiOutlineSearch,
} from "react-icons/ai";
import InputField from "./others/Fields/InputField";
import Button from "./others/Button/ButtonComponent";
import { API_SERVER } from "../config/constant";
import { useNavigate } from "react-router-dom";
import CustomTable from "./others/customtable";
import { Scrollbars } from "react-custom-scrollbars";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};

function RateDashboard() {
 
  const [menuScreens, setMenuScreens] = useState([]);
  const [showScreen, setShowScreen] = useState(false);

  const [marketFXRates, setMarketFXRates] = useState([]);
  const [systemRates, setSystemRates] = useState([]);
  const [interBankRates, setInterBankRates] = useState([]);
  const [crossRates, setCrossRates] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dateObject = new Date(userInfo.postingDate);
  const pDate = dateObject.toISOString().split("T")[0];

  const [postDate, setPostDate] = useState();

  const [posting_date, setPostingDate] = useState(pDate);

  const handleOnPostingDateChange = (event) => {
    const selectedDate = event.target.value;
    // alert(selectedDate);
    setPostingDate(selectedDate);
  };

  const handleOnClick = (postingDate) => {
    // alert(postingDate);
    // setPostingDate(postingDate);
    setPostDate(postingDate);
  };

    function formatStringToAmount(stringNumber, decimalPlaces) {
      const parsedNumber = Number(stringNumber);

      if (isNaN(parsedNumber)) {
        throw new Error("Input must be a valid number string");
      }

      if (typeof decimalPlaces !== "number" || decimalPlaces < 0) {
        throw new Error("Decimal places must be a non-negative number");
      }

      const [integerPart, decimalPart] = parsedNumber.toString().split(".");
      const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      const formattedDecimalPart = decimalPart
        ? decimalPart.slice(0, decimalPlaces).padEnd(decimalPlaces, "0")
        : "0".repeat(decimalPlaces);

      return `${formattedIntegerPart}.${formattedDecimalPart}`;
    }

  useEffect(() => {

    let newData = [];

    setPostingDate(posting_date);

    const dateObj = new Date(posting_date);

    const day = dateObj.getUTCDate().toString().padStart(2, "0");
    const month = new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(dateObj)
      .toUpperCase();
    const year = dateObj.getUTCFullYear();

    let postingDate = `${day}-${month}-${year}`;

    async function getMarketFXRates() {
      let response = await axios.post(
        API_SERVER + "/api/market-fx-rates",
        { posting_date: postingDate },
        { headers }
      );

      response.data.map((d, index) => {
        let i = index + 1;

        let buy = formatStringToAmount(d.buy, 2);
        let sell = formatStringToAmount(d.sell, 2);
        let midrate = formatStringToAmount(d.midrate, 2);
        
        const dateObject = new Date(d.posting_date);
        const posting_date = dateObject.toDateString();

        newData.push([
          d.pair,
          buy,
          sell,
          midrate,
          posting_date,
        ]);
      }); 

      setMarketFXRates(newData);
    }

    getMarketFXRates();

  }, [postDate]);



   useEffect(() => {
     let newData = [];

     setPostingDate(posting_date);

     const dateObj = new Date(posting_date);

     const day = dateObj.getUTCDate().toString().padStart(2, "0");
     const month = new Intl.DateTimeFormat("en-US", { month: "short" })
       .format(dateObj)
       .toUpperCase();
     const year = dateObj.getUTCFullYear();

     let postingDate = `${day}-${month}-${year}`;

     async function getSystemRates() {
       let response = await axios.post(
         API_SERVER + "/api/system-rates",
         { posting_date: postingDate },
         { headers }
       );

       response.data.map((d, index) => {
         let i = index + 1;

         let buy = formatStringToAmount(d.buy, 2);
         let sell = formatStringToAmount(d.sell, 2);
         let midrate = formatStringToAmount(d.midrate, 2);

         const dateObject = new Date(d.posting_date);
         const posting_date = dateObject.toDateString();

         newData.push([d.pair, buy, sell, midrate, posting_date]);

       });

       setSystemRates(newData);
     }

     getSystemRates();
   }, [postDate]);



     useEffect(() => {
       let newData = [];

       setPostingDate(posting_date);

       const dateObj = new Date(posting_date);

       const day = dateObj.getUTCDate().toString().padStart(2, "0");
       const month = new Intl.DateTimeFormat("en-US", { month: "short" })
         .format(dateObj)
         .toUpperCase();
       const year = dateObj.getUTCFullYear();

       let postingDate = `${day}-${month}-${year}`;

       async function getInterBankRates() {
         let response = await axios.post(
           API_SERVER + "/api/inter-bank-rates",
           { posting_date: postingDate },
           { headers }
         );

         response.data.map((d, index) => {
           let i = index + 1;

           let buy = formatStringToAmount(d.buy, 2);
           let sell = formatStringToAmount(d.sell, 2);
           let midrate = formatStringToAmount(d.midrate, 2);

           const dateObject = new Date(d.posting_date);
           const posting_date = dateObject.toDateString();

           newData.push([d.pair, buy, sell, midrate, posting_date]);
         });

         setInterBankRates(newData);
       }

       getInterBankRates();
     }, [postDate]);



    useEffect(() => {
       let newData = [];

       setPostingDate(posting_date);

       const dateObj = new Date(posting_date);

       const day = dateObj.getUTCDate().toString().padStart(2, "0");
       const month = new Intl.DateTimeFormat("en-US", { month: "short" })
         .format(dateObj)
         .toUpperCase();
       const year = dateObj.getUTCFullYear();

       let postingDate = `${day}-${month}-${year}`;

       async function getCrossRates() {
         let response = await axios.post(
           API_SERVER + "/api/cross-rates",
           { posting_date: postingDate },
           { headers }
         );

         response.data.map((d, index) => {
           let i = index + 1;

           let buy = formatStringToAmount(d.buy, 2);
           let sell = formatStringToAmount(d.sell, 2);
           let midrate = formatStringToAmount(d.midrate, 2);

           const dateObject = new Date(d.posting_date);
           const posting_date = dateObject.toDateString();

           newData.push([d.pair, buy, sell, midrate, posting_date]);
         });

         setCrossRates(newData);
       }

       getCrossRates();
     }, [postDate]);

  
  return (
    <>
      {/* <Scrollbars style={{ height: "500px" }}> */}
      <div className="flex pull-left">
        <div className="flex" style={{ marginTop: "5px" }}>
          <span
            style={{
              marginTop: "0px",
              fontSize: "14px",
              marginRight: "-11px",
            }}
          >
            Date{" "}
          </span>
          <InputField
            inputWidth={"200px"}
            id={""}
            // onKeyDown={() => handleOnClick(posting_date)}
            onChange={(e) => handleOnPostingDateChange(e)}
            type={"date"}
            value={posting_date}
          />
          <Button
            buttonIcon={<AiOutlineSearch />}
            onClick={() => handleOnClick(posting_date)}
            buttonWidth={"35px"}
            lable={"Fetch"}
          />
        </div>
      </div>

      <div className="mt-3">
        <hr style={{ marginTop: "-3px" }} />

        <p
          style={{
            fontSize: "13px",
            padding: "3",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "3px",
          }}
        >
          Market (FX) Rates
        </p>

        <hr style={{ marginBottom: "-4px" }} />

        <div className="mt-2" style={{ zoom: "0.8" }}>
          <CustomTable
            data={marketFXRates}
            theadBackground="#22c55e"
            headers={["Pair", "Buy", "Sell", "Mid Rate", "Date Modified"]}
            rowsPerPage={10}
          />
        </div>
      </div>

      <div className="mt-3">
        <hr style={{ marginTop: "-5px" }} />

        <p
          style={{
            fontSize: "13px",
            padding: "3",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "3px",
          }}
        >
          System Rates
        </p>

        <hr style={{ marginBottom: "-4px" }} />

        <div className="mt-2" style={{ zoom: "0.8" }}>
          <CustomTable
            data={systemRates}
            theadBackground="#22c55e"
            headers={["Pair", "Buy", "Sell", "Mid Rate", "Date Modified"]}
            rowsPerPage={10}
          />
        </div>
      </div>

      <div className="mt-3">
        <hr style={{ marginTop: "-5px" }} />

        <p
          style={{
            fontSize: "13px",
            padding: "3",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "3px",
          }}
        >
          InterBank (INT) Rate
        </p>

        <hr style={{ marginBottom: "-4px" }} />

        <div className="mt-2" style={{ zoom: "0.8" }}>
          <CustomTable
            data={interBankRates}
            theadBackground="#22c55e"
            headers={["Pair", "Buy", "Sell", "Mid Rate", "Date Modified"]}
            rowsPerPage={10}
          />
        </div>
      </div>

      <div className="mt-3">
        <hr style={{ marginTop: "-5px" }} />

        <p
          style={{
            fontSize: "13px",
            padding: "3",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "3px",
          }}
        >
          Cross Rates
        </p>

        <hr style={{ marginBottom: "-4px" }} />

        <div className="mt-2" style={{ zoom: "0.8" }}>
          <CustomTable
            data={crossRates}
            theadBackground="#22c55e"
            headers={["Pair", "Buy", "Sell", "Mid Rate", "Date Modified"]}
            rowsPerPage={10}
          />
        </div>
      </div>
      {/* </Scrollbars> */}
    </>
  );
}

export default RateDashboard;
