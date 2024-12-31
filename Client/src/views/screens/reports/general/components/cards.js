import React from "react";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";

export default function Card({ header, list, showFilter }) {
  return (
    <div
      className="flex-grow"
      style={{
        // flex: 0.3,
        padding: "20px",
        border: "2px solid #d6d7d9",
        borderRadius: "5px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          fontSize: "25px",
          // fontWeight: "bolder",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        {header}
      </div>
      {list.map((i) => (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              <div>{i.split("-")[0]}</div>
            </div>
            <div>
              <div>
                <ButtonComponent
                  label="OPEN"
                  onClick={() => showFilter({ status: true, title: i })}
                  buttonWidth={"75px"}
                  //   buttonIcon={<AiFillPrinter size={20} />}
                  buttonHeight={"30px"}
                  buttonBackgroundColor={"#c4549c"}
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
