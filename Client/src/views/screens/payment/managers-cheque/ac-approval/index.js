import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import InputField from "../../../../../../components/others/Fields/InputField";
import ButtonComponent from "../../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import DataTable from "../../../../../../components/others/Datatable/DataTable";
import CustomTable from "../../../../teller-ops/teller/components/CustomTable";
import ACApproval2 from "./components/ACApproval2";
// import ChequeBookMaintenanceApproval2 from "./components/ChequeBookMaintenanceApproval2";
import axios from "axios";
const headers = {
    "x-api-key": process.env.REACT_APP_API_KEY,
    "Content-Type": "application/json",
};
import { API_SERVER } from "../../../../../../config/constant";
import ActionButtons from "../../../../../../components/others/action-buttons/ActionButtons";

function ACApproval() {
    const [getTheme, setGetTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
    );
    const [openChequeReqScreen, setOpenChequeReqScreen] = useState(false);
    const handleBtnClick = () => {
        setOpenChequeReqScreen(true);
    };

    const [data, setData] = useState([
        [
            12345,
            "10-JUL-2022",
            "004001100050080283",
            "JOHN & FLORENCE UNION92151",
            "DENNIS HILTON",
            5,
            "DERRICK",
            <div className="d-flex justify-center">
                <ButtonComponent
                    label={<MDBIcon fas icon="angle-double-right" />}
                    buttonHeight={"20px"}
                    onClick={handleBtnClick}
                />{" "}
            </div>,
        ],
        [12345, "10-JUL-2022", "00400110005008000", "JOHN & FLORENCE UNION92151", "CHARWAY", 3, "KAREN", 5,],
    ]);
    const [accountNumber, setAccountNumber] = useState("");
    const [branch, setBranch] = useState([]);
    const [branchValue, setBranchValue] = useState("");
    const [accountName, setAccountName] = useState("");

    useEffect(() => {
        async function getBranch() {
            const response = await axios.post(
                API_SERVER + "/api/get-code-details",
                { code: "BRA" },
                {
                    headers,
                }
            );
            setBranch(response.data);
        }
        getBranch();
    }, []);

    const handleRefresh = () => {
        if (data) {
            setData(data);
        }
    };

    const handleKeyAccountNumber = (e) => {
        if (e.key === "Enter") {
            if (accountNumber !== "") {
                setData(
                    data.filter((value) => {
                        return value[1].includes(accountNumber);
                    })
                );
            }
        }
    };

    const handleKeyAccountName = (e) => {
        if (e.key === "Enter") {
            if (accountName !== "") {
                setData(
                    data.filter((value) => {
                        return value[2].includes(accountName);
                    })
                );
            }
        }
    };

    return (
        <div>
            <div className="w-full flex justify-center scale-[0.98] cursor-pointer mb-3">
                <ActionButtons displayFetch={"none"} displayRefresh={"none"} />
            </div>

            <div className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white ">
                <div style={{ width: "100%" }} className="wrapper rounded border-2">
                    {/* account number and branch   */}
                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                        className="p-2 mt-2"
                    >
                        <div style={{ flex: 0.33, paddingLeft: "20px", background: "" }}>
                            <InputField
                                label={"Drawer Account"}
                                labelWidth={"35%"}
                                inputWidth={"55%"}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                onKeyDown={handleKeyAccountNumber}
                                value={accountNumber}
                            />
                        </div>
                        <div style={{ flex: 0.67, background: "" }}>
                            <InputField
                                inputWidth={"85%"}
                                disabled={true}
                                noMarginRight={true}
                            />
                        </div>
                    </div>



                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                        className="p-2 mb-2"
                    >
                        <div style={{ flex: 0.4, paddingLeft: "20px" }}>
                            <InputField
                                label={"Cheque No"}
                                labelWidth={"28.5%"}
                                inputWidth={"45.8%"}
                            // onChange={(e) => setAccountNumber(e.target.value)}
                            // onKeyDown={handleKeyAccountNumber}
                            // value={accountNumber}
                            />
                        </div>
                        <div style={{ flex: 0.4 }}>
                            <InputField
                                label={"Posted Date"}
                                labelWidth={"30%"}
                                inputWidth={"40%"}
                                type={"date"}
                            // onChange={(value) => setBranchValue(value)}
                            // value={branchValue}
                            // data={branch}
                            />
                        </div>
                    </div>

                </div>

                <div></div>
            </div>

            {/* datatable   */}
            <div>
                <CustomTable
                    headers={[
                        // "#",
                        "Cheque No",
                        "Posted Date",
                        "Drawer Account",
                        "Drawer Name",
                        "Drawee Name",
                        "Drawer Amount",
                        "Posted By",
                        "Action",

                    ]}
                    data={data}
                />
            </div>

            {/* new screen opened when arrow button is clicked    */}
            {openChequeReqScreen ? (
                <ACApproval2
                    show={openChequeReqScreen}
                    handleClose={() => setOpenChequeReqScreen(false)}
                />
            ) : (
                ""
            )}
        </div>
    );
}

export default ACApproval;
