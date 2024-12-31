import React from "react";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { RiAddCircleLine } from "react-icons/ri";

function ModuleComponent({ lovData, onChangeOnModule, moduleValue, addBtnOnclick, buttonKey }) {
  return (
    <div>
      <div className="w-full flex justify-center ">
        <div className="w-full flex align-center space-x-1">
          <span className="w-[88%]">
            <ListOfValue
              label={`Select User Group`}
              labelWidth={"28%"}
              inputWidth={"68%"}
              required={true}
              data={lovData}
              onChange={onChangeOnModule}
              value={moduleValue}
              dropdownPosition={"bottom"}
            />
          </span>
          <span className="w-[5%]">
            <ButtonComponent
              buttonIcon={<RiAddCircleLine color={"white"} size={20} key={buttonKey} />}
              buttonHeight={"26px"}
              buttonWidth={"100%"}
              buttonColor={"white"}
              onClick={addBtnOnclick}
              type={"button"}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ModuleComponent;
