import React, { useEffect, useState } from "react";
import Header from "../../../../../../components/others/Header/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CustomTable from "../../../../teller-ops/components/CustomTable";

const InvalidAcctsTable = ({ invalidAccountsData, setShowModal }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let arr = [];
    invalidAccountsData.map((i) => {
      arr.push([
        i.p_credit_acct ?? i.p_debit_acct,
        i.account_description,
        i.error,
      ]);
    });
    setData(arr);
  }, []);
  return (
    <div>
      <Header
        title={"Invalid Accounts"}
        backgroundColor={"#0580c0"}
        closeIcon={true}
        handleClose={() => setShowModal(false)}
      />
      <div className="p-2">
        <CustomTable
          headers={[
            "Account Number",
            "Account Description",
            "Error Description",
          ]}
          data={data}
        />
      </div>
    </div>
  );
};

export default InvalidAcctsTable;
