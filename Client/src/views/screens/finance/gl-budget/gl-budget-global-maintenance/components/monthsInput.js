import React from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { VscClose } from "react-icons/vsc";
import BudgetRow from "./budgetRow";
import { HiPlus, HiPlusCircle } from "react-icons/hi";

const MonthsInput = ({ rows, addNewRow, budget_type }) => {
  return (
    <div className="">
      <div className="flex gap-1 p-2 flex-1 h-[25px] sticky top-0 bg-[#0580c0] items-center text-white">
        {/* <div className="sticky left-0 flex"> */}
        <div>
          <div className="  border-r border-white  w-[350px] text-center ">
            Account Description
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Control Amount
          </div>
        </div>
        {/* </div> */}
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Distributed Amount
          </div>
        </div>
        <div>
          <div className="  border-r border-white  w-[150px] text-center ">
            Jan
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Feb
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Mar
          </div>
        </div>
        <div>
          <div className="  border-r border-white  w-[150px] text-center ">
            Apr
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            May
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Jun
          </div>
        </div>
        <div>
          <div className="  border-r border-white  w-[150px] text-center ">
            Jul
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Aug
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Sep
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Oct
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Nov
          </div>
        </div>
        <div>
          <div className="border-r border-white  w-[150px] text-center ">
            Dec
          </div>
        </div>
      </div>
      <div className=" h-[170px] w-full  overflow-y-scroll py-1">
        {rows.map((i, index) => (
          <BudgetRow key={index} budget_type={budget_type} />
        ))}
      </div>
      <div className="p-1">
        <hr className="border-gray-300 border" />
      </div>
      <div className="flex w-full gap-1 p-1  items-center">
        <div className="sticky  bg-white ml-1 left-0">
          <div>
            <div className="flex gap-1 w-[500px] ">
              <ButtonComponent
                buttonIcon={<HiPlusCircle size={20} />}
                label={"Add Row"}
                buttonWidth={"100px"}
                onClick={() => addNewRow()}
              />
            </div>
          </div>
          {/* <div>
            <div className="  w-[150px] "></div>
          </div> */}
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="    w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="    w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="    w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
        <div>
          <div className="  w-[150px] ">
            <InputField
              noMarginRight={true}
              disabled={true}
              inputWidth={"100%"}
            />
          </div>
        </div>
      </div>
      {/* <div>
        <BudgetRow />
      </div> */}
    </div>
  );
};

export default MonthsInput;
