import { React, useState, useEffect } from "react";
import swal from "sweetalert";
// import axios from "axios";
// import { API_SERVER } from "../../../../../../config/constant";
import AccordionForms from '../../../../customer-activities/individual-account-opening/components/AccordionForms';

import { Modal, Group, Button } from "@mantine/core";
import MemberPersonalDetails from "./member-details/member-personal-details";
import MemberOccupationDetails from "./member-details/member-occupation-details";
import MemberModeOfCommunication from "./member-details/member-mode-of-communication";
import MemberNextOfKing from "./member-details/member-next-of-king";
import MemberCurrentAddress from "./member-details/member-current-address";

import "../../../account-enquiry/customer-search.css";

// const headers = {
//   "x-api-key":
//     "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
//   "Content-Type": "application/json",
// };

function MemberDetails({memberID}) {
  console.log(memberID,"hee hee")
  // let memberNumber = memberID



 

  // const onMouseHover = () =>{
  //   document.getElementById("makeWeSee").style.color = `url(` + window.location.origin +
  //   `/assets/images/headerBackground/` +
  //   getTheme.theme.headerImage +
  //   `)`
  // }

  return (
  <div>
      <AccordionForms title="Basic Details"  isInitiallyExpanded={true}>
        <MemberPersonalDetails memberID={memberID}
        />
      </AccordionForms>
      <AccordionForms title="Identification Details">
        <MemberOccupationDetails memberID={memberID}
        />
      </AccordionForms>
      <AccordionForms title="Communication Details">
          <MemberModeOfCommunication memberID={memberID}
          />
      </AccordionForms>
         <AccordionForms title="Next Of Kin">
        <MemberNextOfKing memberID={memberID}
        />
      </AccordionForms>
      <AccordionForms title="Address">
        <MemberCurrentAddress memberID={memberID}
        />
      </AccordionForms>
 </div>
  );
}
export default MemberDetails;
