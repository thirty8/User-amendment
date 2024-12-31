import React, { useState } from "react";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import { VscClose } from "react-icons/vsc";
import InputField from "../../../../../../components/others/Fields/InputField";
import BudgetAccountsSearchModal from "./budgetAccountsSearchModal";

const BudgetRow = ({ budget_type }) => {
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [filterDebitData, setFilterDebitData] = useState([]);

  return (
    <div className="flex w-full gap-1 p-1  items-center">
      <BudgetAccountsSearchModal
        setShowModal={setShowModalSearch}
        showModal={showModalSearch}
        budget_type={budget_type}
        filter1={filterDebitData}
        // handleSelected={handleSelected}
      />
      <div>
        <div className="flex gap-1 w-[350px] ">
          <ButtonComponent
            buttonIcon={<VscClose size={20} />}
            buttonHeight={"25px"}
            buttonBackgroundColor={"#0580c0"}
          />
          <InputField
            noMarginRight={true}
            inputWidth={"100%"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowModalSearch(true);
              }
            }}
          />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
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
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="    w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="    w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
      <div>
        <div className="  w-[150px] ">
          <InputField noMarginRight={true} inputWidth={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default BudgetRow;
