import React, { useState, useEffect } from "react";
import CustomTable from "../../../../../../../components/others/customtable";
import { API_SERVER } from "../../../../../../../config/constant";
import axios from "axios";
import ModalLoader from "../../../../../../../components/others/ModalLoader";
const headers = {
  // "x-api-key": process.env.REACT_APP_API_KEY,
  "x-api-key": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const AccountBalances = ({ formatNumber }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const arr = [];
    setLoading(true);
    try {
      const response = await axios.post(
        API_SERVER + "/api/batch-posting-approval",
        {
          load_account_balances: "true",
          batch_no_v: "",
          //   batch_no_v: "202405173751",
        },
        { headers }
      );

      if (response?.data?.length > 0) {
        response.data.forEach((i) => {
          arr.push([
            i?.acct_link || "",
            formatNumber(i?.bal?.toFixed(2)) || "",
            formatNumber(i?.amt?.toFixed(2)) || "",
            formatNumber(i?.bal_after?.toFixed(2)) || "",
          ]);
        });
      }
      setData(arr);
    } catch (err) {
      console.log(`Error caught in loading account balances: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="pt-[100px] pb-[100px] animate-pulse flex justify-center">
          <ModalLoader />
        </div>
      ) : (
        <div>
          {/* <Header title={"Account Balance Details"} headerShade /> */}
          <h4 className="text-blue-400 text-lg italic mb-2">Account Balance Details</h4>

          <div>
            <CustomTable
              headers={[
                "Acccount No",
                "Current Balance",
                "Transaction Amount",
                "Balance After Transaction",
              ]}
              data={data}
              load={loading}
              //   data={[["55", "234", "11", "343"]]}
              rowsPerPage={10}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountBalances;
