import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import {SiFarfetch} from "react-icons/si"
import {MdOutlineOpenInNew} from "react-icons/md"
import {FiRefreshCcw} from "react-icons/fi"
import {AiFillDelete} from "react-icons/ai"
import {SiWebauthn} from "react-icons/si"
import {LuView} from "react-icons/lu"
import {FaCheck} from "react-icons/fa"
import {GiCancel} from "react-icons/gi"
import {TiCancel} from "react-icons/ti"
import {BiHelpCircle} from "react-icons/bi"
import {ImExit} from "react-icons/im"

function ActionButtons({
  onNewClick,
  onExitClick,
  onHelpClick,
  onRejectClick,
  onCancelClick,
  onOkClick,
  onRefreshClick,
  onDeleteClick,
  onAuthoriseClick,
  onViewClick,
  onFetchClick,
  displayNew,
  displayFetch,
  displayRefresh,
  displayDelete,
  displayAuthorise,
  displayView,
  displayOk,
  displayCancel,
  displayReject,
  displayHelp,
  displayExit,
  handleFinalChange,
  saveDataToDatabase,
  handleSubmitApproval
}) {


  const handleExitClick = () => {
    if (document.getElementById("exitBTN1")) {
      const exitBTN = document.getElementById("exitBTN1");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      exitBTN.dispatchEvent(clickEvent);
        }
  };

  return (
    <div>
      <div
        className="flex"
        style={{
          zoom: "0.80",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        centered
      >
        {/* <div
          style={{ display: displayFetch }} // can be set to 'none'
          className="header-button ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            onClick={onFetchClick}
          >
            <SiFarfetch style={{ color: "grey", paddingTop: "15px", fontSize: 50 }} />

            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Fetch
            </p>
          </div>
        </div> */}

        {/* <div
          style={{ display: displayNew }} // can be set to 'none'
          className="header-button ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            onClick={onNewClick}
          >
            
            <MdOutlineOpenInNew style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">New</p>
          </div>
        </div> */}

        {/* <div
          style={{ display: displayRefresh }}
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onRefreshClick}
        >
          <div className="flex flex-col justify-center items-center ">
           
            <FiRefreshCcw style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Refresh
            </p>
          </div>
        </div> */}

        {/* <div
          style={{ display: displayDelete }}
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onDeleteClick}
        >
          <div className="flex flex-col justify-center items-center ">
        
            <AiFillDelete style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Delete
            </p>
          </div>
        </div> */}

        {/* <div
          style={{ display: displayAuthorise }}
          className="header-button  ml-3 flex flex-col items-center w-[95px]  justify-center rounded hover:bg-gray-200"
          onClick={handleSubmitApproval}
        >
          <div className="flex flex-col justify-center items-center  ">
           
            <SiWebauthn style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 px-2 text-lg mt-[-3px] font-semibold">
              Authorise
            </p>
          </div>
        </div> */}

        {/* <div
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onViewClick}
          style={{ display: displayView }}
        >
          <div className="flex flex-col justify-center items-center ">
          
            <LuView style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              View
            </p>
          </div>
        </div> */}

        <div
          onClick={() => {
            // swal("Record successfully uploaded!");
          }}
          style={{ display: displayOk }}
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
        >
          <div
            className="flex flex-col justify-center items-center "
            // onClick={saveDataToDatabase}
            // onClick={handleFinalChange}
          >

            <FaCheck style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">Submit</p>
          </div>
        </div>

        {/* <div
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onCancelClick}
          style={{ display: displayCancel }}
        >
          <div className="flex flex-col justify-center items-center ">
           
            <GiCancel style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Cancel
            </p>
          </div>
        </div> */}

        {/* <div
          className="header-button  ml-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onRejectClick}
          style={{ display: displayReject }}
        >
          <div className="flex flex-col justify-center items-center ">
          
            <TiCancel style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Reject
            </p>
          </div>
        </div> */}

        {/* <div
          className="header-button  mx-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={onHelpClick}
          style={{ display: displayHelp }}
        >
          <div className="flex flex-col justify-center items-center ">
          
            <BiHelpCircle style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Help
            </p>
          </div>
        </div> */}

        <div
          className="header-button  mx-3 flex flex-col items-center w-[86px]  justify-center rounded hover:bg-gray-200"
          onClick={handleExitClick}
          style={{ display: displayExit }}
        >
          <div
            // onClick={() => {
            //   document.getElementById("closeModalBTN").click();
            // }}
            className=" flex flex-col items-center justify-center"
            style={
              {
                // background:
                //   `url(` +
                //   window.location.origin +
                //   `/assets/images/headerBackground/` +
                //   getTheme.theme.headerImage +
                //   `)`,
              }
            }
          >
            {/* <MDBIcon
              style={{ color: "grey", fontSize: 20, paddingTop: "15px" }}
              fas
              icon="sign-out-alt"
            /> */}

            <ImExit style={{ color: "grey", paddingTop: "15px", fontSize: 50 }}  />
            <p className="text-gray-700 text-lg mt-[-3px] font-semibold">
              Exit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionButtons;