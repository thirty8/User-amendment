import React, { useState, useEffect } from "react";
import { API_SERVER } from "../../../../../../config/constant";
import axios from "axios";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";


function AmendAch(){
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
    return (
        <div>

        </div>
    );
}
export default AmendAch;