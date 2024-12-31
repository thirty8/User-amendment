import React, { useState, useEffect } from "react";
// import Headerr from "../../../components/others/Header/Header";
import Header from "../../../../components/others/Header/Header";
import Cards from "../closed-accounts/cards/Cards";
import axios from "axios";

// const headers = {
//   'x-api-key': process.env.REACT_APP_API_KEY,
//   'Content-Type': 'application/json'
// };
// import { FaUserTimes } from "react-icons/fa/index.esm";


// import { blue } from "@mui/material/colors";

function ScreenBase({ header_title, header_icon, card_div1a, card_div2a }) {
  return (
    <div>
      <div>
            <Header icon={header_icon} title={header_title} />
          

    
        


        <Cards
          // height="auto"
          // width="auto"

          //left side
          div1={
            <div
              style={{ display: "grid", placeItems: "center", width: "100%" }}
            >
              <div style={{ width: "100%" }}>{card_div1a}</div>
            </div>
          }
        />
        <Cards
          // height="auto"
          // width="auto"

          //left side
          div2={
            <div
              style={{ display: "grid", placeItems: "center", width: "100%" }}
            >
              <div style={{ width: "100%", backgroundColor: "pin" }}>
                {card_div2a}
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default ScreenBase;
