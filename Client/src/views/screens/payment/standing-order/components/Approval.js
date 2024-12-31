import React, { useState } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';
import ScreenBase from "../../../../../account-activities/account-blockage/components/ScreenBase";
import InputField from "../../../../../../../components/others/Fields/InputField";
import DataTable from "../../../../../../../components/others/Datatable/DataTable";
import ButtonComponent from "../../../../../../../components/others/Button/ButtonComponent";
import ListOfValue from "../../../../../../../components/others/Fields/ListOfValue";
import ButtonType from "../../../../../../../components/others/Button/ButtonType";
import TextAreaField from "./../../../../../../components/others/Fields/TextArea";
import SelectField from "./../../../../../../components/others/Fields/SelectField";
import ActionButtons from '../../../../../../components/others/action-buttons/ActionButtons';
import CustomTable from "../../../../../teller-ops/teller/components/CustomTable";
import Approval2 from '../origination/approval/components/Approval2';



function Approval() {

    const [openChequeReqScreen, setOpenChequeReqScreen] = useState(false);
    const handleBtnClick = () => {
        setOpenChequeReqScreen(true);

    };
    const [data, setData] = useState([
        [0, "004001100050080283", "JOHN & FLORENCE UNION92151", 3, 4, 5, 6,
            <div className="d-flex justify-center">
                <ButtonComponent
                    label={<MDBIcon fas icon="angle-double-right" />}
                    buttonHeight={"20px"}
                    onClick={handleBtnClick}
                />{" "}
            </div>,

        ],
        [0, "004001087252140067", "UNION930368", 3, 4, 5, 6, 7],
    ]);



    return (
        <div>
            <div className='mb-2'>
                <ActionButtons displayFetch={"none"} displayRefresh={"none"} />
            </div>
            <div className="rounded h-auto pb-2 pt-2 px-2 mb-3 bg-white ">
                <div style={{ width: "100%" }} className="wrapper rounded border-2">
                    {/* account number and branch   */}
                    <div style={{ display: "flex", justifyContent: "space-between" }} className="p-2">
                        <div style={{ flex: 0.4, paddingLeft: "20px" }}>
                            <InputField
                                label={"Batch No."}
                                labelWidth={"22%"}
                                inputWidth={"50%"}
                            // onChange={(e) => setAccountNumber(e.target.value)}
                            // onKeyDown={handleKeyAccountNumber}
                            // value={accountNumber}
                            />
                        </div>
                        <div style={{ flex: 0.4 }}>
                            <InputField
                                label={"Order Date"}
                                labelWidth={"20%"}
                                inputWidth={"35%"}
                                type={"date"}
                            // onChange={(value) => setBranchValue(value)}
                            // value={branchValue}
                            // data={branch}
                            />
                        </div>

                    </div>

                    {/* account name   */}
                    <div style={{ display: "flex", justifyContent: "space-between" }} className="p-2">
                        <div style={{ flex: 0.5, paddingLeft: "20px" }}>
                            <InputField
                                label={"Posted By"}
                                labelWidth={"17.5%"}
                                inputWidth={"40%"}
                            // onChange={(e) => setAccountName(e.target.value.toUpperCase())}
                            // value={accountName}
                            // onKeyDown={handleKeyAccountName}

                            />
                        </div>
                    </div>
                </div>

                <div>
                </div>
            </div>

            <div style={{ marginTop: "10px" }}>
                <CustomTable
                    headers={[
                        "Order Batch",
                        "Order Date",
                        "Batch Count",
                        "Total Amount",
                        "Branch Code",
                        "Posted By",
                        "Request For",
                        "Action",
                    ]}
                    data={data}
                />
            </div>

            {/* modal */}

            {openChequeReqScreen ? (
                <Approval2
                    show={openChequeReqScreen}
                    handleClose={() => setOpenChequeReqScreen(false)}
                />
            ) : (
                ""
            )}



        </div>
    )
}

export default Approval