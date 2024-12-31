import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import { API_SERVER } from "../../../../../../config/constant";
import ListOfValue from "../../components/ListOfValue";
import axios from 'axios'

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/x-www-form-urlencoded",
};

const Disable_form = ({customer}) => {
  const [sector, setSector] = useState([])
  const [subSector, setSubSector] = useState([]);

  console.log("customer", customer)

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.post(
          API_SERVER + "/api/get-code-details",
          { code: "MAS" },
          { headers }
        );
        setSector(response?.data);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    };

    fetchSectors()
  }, [customer]);


  const fetchSubSector = async (sectorValue) => {
    if (!sectorValue) return; // Ensure sectorValue is defined
    try {
      const response = await axios.post(
        API_SERVER + "/api/member-amendment",
        { code_type: "MAS", sector_code: sectorValue },
        { headers }
      );
      setSubSector(response?.data);
    } catch (error) {
      console.error("Error fetching subsectors:", error);
    }
  };

  useEffect(() => {
    if (customer?.SECTOR) {
      fetchSubSector(customer?.SECTOR);
    }
  }, [customer?.SECTOR]);


  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div className="">
          <div className="flex items-center mb-5">
            <InputField
              type="text"
              // placeholder="Enter Customer Number"
              label="&nbsp;Customer Number"
              inputWidth="300px"
              value={customer?.CUSTOMER_NUMBER}
              disabled={true}
            />

            <InputField
              type="text"
              // placeholder="Enter Customer Name"
              label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Customer Name"
              inputWidth="300px"
              value={customer?.CUSTOMER_NAME}
              disabled={true}
            />
          </div>

          <div className="flex items-center mb-5">
            <InputField
              type="text"
              // placeholder="Enter Customer Category"
              label="Customer Category"
              inputWidth="300px"
              className="mr-4"
              value={customer?.C_TYPE == "I" ? "INDIVIDUAL" : "" || customer?.C_TYPE == "C" ? "CORPORATE" : ""}
              disabled={true}
            />

            <InputField
              type="text"
              // placeholder="Enter Relation Number"
              label="&nbsp;&nbsp;Phone Number"
              inputWidth="300px"
              value={customer?.PHONE1 || "N/A"}
              disabled={true}
            />
          </div>

          <div className="flex items-center mb-5">
            <InputField
              type="text"
              // placeholder="Enter Customer Category"
              label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Relation Officer"
              inputWidth="300px"
              className="mr-4"
              value={customer?.ARM_CODE}
              disabled={true}
            />

            <InputField
              type="text"
              // placeholder="Enter Relation Number"
              label="&nbsp;&nbsp;Customer Code"
              inputWidth="300px"
              value={customer?.CUSTOMER_CODE || "N/A"}
              disabled={true}
            />
          </div>

          <div className="flex items-center ml-16 space-x-5">
              <ListOfValue
                label="&nbsp;&nbsp;&nbsp;&nbsp;Sector"
                inputWidth="300px"
                data={sector}
                value={customer?.SECTOR}
                disabled={true}
                // onChange={handleSelectChange}
              />
              
              <ListOfValue
              label="&nbsp;&nbsp;&nbsp;Sub Sector"
              inputWidth="300px"
              value={customer?.SUB_SECTOR}
              data={subSector || []}
              disabled={true}
              // data={AmendData}
              // onChange={handleSelectChange}
            />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disable_form;
