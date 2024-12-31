import React, { useState, useEffect } from "react";
import HeaderComponent from "../dormant-account-reactivation/components/HeaderComponent";
import Cards from "../closed-accounts/cards/Cards";

function ScreenBase2({
  header_title,
  header_icon,
  card_div1a,
  card_div2a,
  card_div3a,
  card_title,
}) {
  return (
    <div>
      <div className="cash__deposit" style={{}}>
        <HeaderComponent icon={header_icon} title={header_title} />
        <div style={{}}>
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
                    marginTop: "10px",
                  }}
                >
                  <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ flex: "70%", marginRight: "10px" }}>
                      <div
                        style={{
                          width: "100%",
                          display: "grid",
                          marginRight: "100px",
                        }}
                      >
                        {card_div1a}
                      </div>
                    </div>

                    <div
                      style={{
                        flex: "30%",
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",

                        borderRadius: "5px",
                      }}
                    >
                      <div>{card_div2a}</div>
                    </div>
                  </div>
                </div>
                {/* <div style={{width:"20%",marginLeft:"1%"}}>
                    <ButtonComponent
                      label={"Sig. Ver"}
                      buttonColor={"white"}
                      buttonBackgroundColor="rgb(21 163 183)"
                      onClick={handleClick2}
                    />
                   {diiiv && <div style={{zIndex:'3',position:'absolute',backgroundColor:'blue'}}><ul><li>ddd</li><li>ddd</li><li>ddd</li></ul></div>}
                  </div>
                  <div style={{width:"20%",marginLeft:"1%"}}>
                    <ButtonComponent
                      label={"Sig. Ver"}
                      buttonColor={"white"}
                      buttonBackgroundColor="rgb(21 163 183)"
                      onClick={handleClick2}
                    />
                   {diiiv && <div style={{zIndex:'3',position:'absolute',backgroundColor:'blue'}}><ul><li>ddd</li><li>ddd</li><li>ddd</li></ul></div>}
                  </div> */}
              </div>
            }
          />
        </div>

        <Cards
          // height="auto"
          // width="auto"

          //left side
          div2={
            <div
              style={{ display: "grid", placeItems: "center", width: "100%" }}
            >
              <div style={{ width: "100%" }}>{card_div3a}</div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default ScreenBase2;
