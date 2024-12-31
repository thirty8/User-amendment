import React, { useEffect, useState } from "react";
import Header from "../../../../../../components/others/Header/Header";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CustomTable from "../../../../teller-ops/components/CustomTable";

const CurrencyMismatchTable = ({ currencyMismatchAccts, setShowModal }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let arr = [];
    currencyMismatchAccts.map((i) => {
      arr.push([
        i.p_credit_acct ?? i.p_debit_acct,
        i.account_description,
        i.currency_desc,
      ]);
    });
    setData(arr);
  }, []);
  return (
    <div>
      <Header
        title={"Currency Mismatch Accounts"}
        backgroundColor={"#0580c0"}
        closeIcon={true}
        handleClose={() => setShowModal(false)}
      />
      <div className="p-2">
        <CustomTable
          headers={["Account Number", "Account Description", "Currency"]}
          data={data}
          rowsPerPage={15}
        />
      </div>
    </div>
  );
};

export default CurrencyMismatchTable;
