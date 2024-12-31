import React, { useState, useEffect } from "react";
// import HeaderComponent from "../../dormant-account-reactivation/components/HeaderComponent";
import Cards from "../closed-accounts/cards/Cards";
function ScreenBase3({ header_title, header_icon, card_div1a }) {
  return (
    <div>
      <div>
        {/* <HeaderComponent icon={header_icon} title={header_title} /> */}
        <div
          style={
            {
              // marginTop: "5%",
            }
          }
        >
          <Cards
            height="auto"
            width="auto"
            //left side
            div1={
              <div
                style={{ display: "grid", placeItems: "center", width: "100%" }}
              >
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <div style={{ width: "100%" }}>{card_div1a}</div>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ScreenBase3;
