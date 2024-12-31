import React, {useState} from "react";
import {
    Row,
    Col,
    Button,
    Container,
    Form,
    Modal,
    Card,
  } from "react-bootstrap";
  import axios from 'axios'
  import { MDBIcon } from "mdb-react-ui-kit";

 function AchDetails(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
      const headers = {
        "x-api-key": process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      };
      return (
        <div>
            <div className="">
              
            </div>
        </div>
      );

 } 
 export default AchDetails;