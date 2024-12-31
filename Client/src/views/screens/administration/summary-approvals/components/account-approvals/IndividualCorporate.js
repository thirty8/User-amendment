import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_SERVER } from "../../../../../../config/constant";
import ApprovalScreenCorporate from "./membership-approval-corporate";
import ApprovalScreenIndividual from "./membership-approval";

const IndividualCorporate = ({
  batchNo,
  accountSourceBranch,
  setShowModal,
  setApproveChanged,
  setApproved,
  handleClose
}) => {
  const [dataApproval, setDataApproval] = useState({});
  const [ctype, setCtype] = useState("");

  useEffect(() => {
    const fetchDataCustomerNumber = async () => {
      if (batchNo) {
        // console.log("batchNo", batchNo);
        try {
          const response = await axios.post(
            // API_SERVER + "/api/get-approval-test",
            API_SERVER + "/api/get-approval-test_1",
            {
              CUSTOMER_NUMBER: batchNo,
            },
            {
              headers: {
                "x-api-key":
                  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          setDataApproval(response.data);
          setCtype(response.data.C_TYPE);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchDataCustomerNumber();
  }, []);
  return (
    <div>
      {ctype === "C" ? (
        <div>
          <ApprovalScreenCorporate
            batchNo={batchNo}
            accountSourceBranch={accountSourceBranch}
            setCloseModal={setShowModal}
            setApproveChanged={setApproveChanged}
            setApproved={setApproved}
            handleClose={handleClose}
          />
        </div>
      ) : (
        <div>
          <ApprovalScreenIndividual
            batchNo={batchNo}
            accountSourceBranch={accountSourceBranch}
            setCloseModal={setShowModal}
            setApproveChanged={setApproveChanged}
            setApproved={setApproved}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default IndividualCorporate;
