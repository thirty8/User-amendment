import "./Cards.css";
import Card from "@mui/material/Card";
// import InputField from "../fields/InputField";

function Cards({div1,
  div2}
  
  ) {
  return (
    <div
      className="card-component"
      style={{
        // display: "flex",
        // justifyContent: "space-between",
        height: "auto",
        width: "auto",
        backgroundColor:'#ffffff'
      }}
    >



      <div >{div1}</div>
      <div >{div2}</div>

      {/* <div style={{ flex: props.flexLeft }}>{props.leftside}</div>
      <div style={{ flex: props.flexRight }}>{props.rightside}</div> */}
    </div>
  );
}

export default Cards;
// style={{ flex: props.flexLeft }}