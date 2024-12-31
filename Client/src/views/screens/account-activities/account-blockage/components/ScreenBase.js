import React, { useState, useEffect } from "react";
// import HeaderComponent from "../../dormant-account-reactivation/components/HeaderComponent";
import axios from "axios";
import Cards from "./cards/Cards";


const headers = {
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};





function ScreenBase({ header_title, header_icon, card_div1a, card_div2a }) {
  return (
    <div>
      <div>
     

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
