import React, { useEffect, useState } from "react";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../lending/components/button/ButtonComponent";
import { FiCheck, FiX } from "react-icons/fi";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import { headers } from "../../../../teller-ops/teller/teller-activities";

function AssignCollector({ onClose }) {
  const [collectors, setCollectors] = useState([]);
  const [collectorValue, setCollectorValue] = useState("");
  const [collectorDetails, setCollectorDetails] = useState([]);

  const getAvailableCollectors = () => {
    axios
      .get(API_SERVER + "/api/get-available-collectors-lov", {
        headers: headers,
      })
      .then(function (response) {
        console.log(response.data);
        setCollectors(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAvailableCollectorDetailsFromLov = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-available-collectors",
        { username: value },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        console.log(response.data);
        setCollectorDetails(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAvailableCollectors();
  }, []);

  useEffect(() => {
    getAvailableCollectorDetailsFromLov();
  }, [collectorValue]);

  return (
    <div>
      <div className="space-y-4">
        <ListOfValue
          label={"Collector To Assign"}
          labelWidth={"20%"}
          inputWidth={"60%"}
          data={collectors}
          onChange={(value) => {
            setCollectorValue(value);
            getAvailableCollectorDetailsFromLov(value);
          }}
          value={collectorValue}
        />

        <InputField
          label={"Collector Group"}
          labelWidth={"20%"}
          inputWidth={"60%"}
          disabled
          value={collectorDetails?.collector_group}
        />

        <InputField
          label={"Minimum Days"}
          labelWidth={"20%"}
          inputWidth={"20%"}
          disabled
          value={collectorDetails?.collector_min_days}
        />

        <InputField
          label={"Maximum Days"}
          labelWidth={"20%"}
          inputWidth={"20%"}
          disabled
          value={collectorDetails?.collector_max_days}
        />

        <hr />

        <div className="flex justify-end gap-4">
          <ButtonComponent
            label={"Assign"}
            buttonBackgroundColor={"green"}
            buttonWidth={"100px"}
            buttonHeight={"28px"}
            buttonIcon={<FiCheck />}
            // onClick={() => handleOkPressArrearsManagement()}
          />

          <ButtonComponent
            label={"Exit"}
            onClick={() => onClose()}
            buttonBackgroundColor={"red"}
            buttonWidth={"80px"}
            buttonHeight={"28px"}
            buttonIcon={<FiX />}
          />
        </div>
      </div>
    </div>
  );
}

export default AssignCollector;
