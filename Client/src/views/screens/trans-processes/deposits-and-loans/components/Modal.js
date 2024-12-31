import { Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import { API_SERVER } from "../../../../../config/constant";
import InputField from "../../../../../components/others/Fields/InputField";
import swal from "sweetalert";
import axios from "axios";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { FiEdit, FiX } from "react-icons/fi";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";

const headers = {
  "x-api-key":
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "Content-Type": "application/json",
};
const GlobalModal = ({
  showModal,
  setShowModal,
  body,
  setState,
  setDealAmountFocus,
  sourceAccount,
}) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    var inp = document.getElementById("inputField");
    inp?.focus();
  }, []);

  const handleClose = () => {
    swal({
      title: "Are you sure?",
      text: 'You\'re about to close the " Search by Name or by ID " form',
      icon: "warning",
      buttons: ["Cancel", "Yes, Close Form"],
      dangerMode: true,
    }).then((result) => {
      if (result) {
        setShowModal(false);
        setFilter([]);
      }
    });
  };

  const handleRowClick = (rowData) => {
    console.log(rowData, "row");
    var rw = document.getElementById("miniModalButton");
    rw?.click();
  };

  const handleCloseInnerModal = () => {
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);
  const [fullScreen, setFullscreen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [initialAccNumber, setInitialAccNumber] = useState("");

  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  async function handleChange(e) {
    try {
      const response = await axios.post(
        API_SERVER + "/api/find-by-name",
        {
          accountName: accountNumber,
        },
        { headers }
      );
      const arr = [];

      response.data.map((i) => {
        const dat = [
          ...Object.values(i),
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonComponent
              id="miniModalButton"
              onClick={() => {
                setState(i);
                console.log(i);
                handleCloseInnerModal();
                setDealAmountFocus(true);
              }}
              label={<FiEdit color={"white"} />}
              // buttonHeight={"20px"}
            />
          </div>,
        ];
        arr.push(dat);
      });
      setFilter(arr);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal
      id="globalModal"
      key="globalModal"
      size={"xl"}
      opened={showModal}
      onClose={handleClose}
      // centered
      withCloseButton={false}
      padding={0}
    >
      <div>
        {/* header */}
        <Header
          title="Search Customer by Name"
          headerShade={true}
          closeIcon={
            <button onClick={handleClose} className="mr-2  ">
              <FiX color="black" size={18} />
            </button>
          }
        />

        <div style={{ padding: "15px" }}>
          <p className="px-3 py-2">
            Find a partial value to limit the list , %% to see all values
          </p>
          <div
            className="border-l-4 border-yellow-500 rounded leading-6  px-3 py-2 bg-yellow-50"
            style={{ margin: "5px" }}
          >
            <p>
              Warning : Entering % to see all values may take a very long time
              Entering criteria that can be used to reduce the list may be
              significantly faster
            </p>
          </div>

          <br />

          <div style={{ marginBottom: "10px" }}>
            <InputField
              label={"Find"}
              labelWidth={"15%"}
              inputWidth={"85%"}
              onChange={(e) => setInitialAccNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  setAccountNumber(initialAccNumber);
                  handleChange(e);
                }
              }}
              id="inputField"
            />
          </div>

          {/* table */}
          <div style={{ zoom: 0.83 }}>
            <Header title={"USER DETAILS"} headerShade={true} />
            <CustomTable
              data={filter}
              headers={[
                "Account Name",
                "Account Number",
                "ISO code",
                "Customer Number",
                "Action",
              ]}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GlobalModal;
