import React, { useState } from "react";
import CustomTable from "../../../control-setups/components/CustomTable";
import { FiArrowRight } from "react-icons/fi";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { Modal, ScrollArea } from "@mantine/core";
import CustomerQueueDetails from "./modals/customer-queue-details";
import NewCustomerQueueDetails from "./modals/new-customer-queue-details";

function HardQueue({ data }) {
  // FUNCTIONS
  const [open, setOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});

  // FUNCTIONS
  const handleClose = () => setOpen(false);

  function formatNumber(num) {
    if (isNaN(num)) {
      return "";
    }
    const formatted = num.toLocaleString("en-US", { minimumFractionDigits: 2 });

    return formatted;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleString("en-GB", { month: "short" })
      .toUpperCase()
      .slice(0, 3);
    const year = date.toLocaleString("en-GB", { year: "numeric" });

    return `${day}-${month}-${year}`;
  }

  // VARIABLES AND CONSTANT
  const collectorList = [
    <div style={{ textAlign: "left" }}>Facility No.</div>,
    <div style={{ textAlign: "left" }}>Customer Name</div>,
    <div style={{ textAlign: "left" }}>Date Due</div>,
    <div style={{ textAlign: "left" }}>Principal</div>,
    <div>Interest</div>,
    <div style={{ textAlign: "right" }}>Principal Paid</div>,
    <div style={{ textAlign: "right" }}>Interest Paid</div>,
    <div>Days Due</div>,
    <div>Action</div>,
  ];

  const hd = data?.map((i) => {
    return [
      <div className="text-left">{i?.facility_no}</div>,
      <div className="text-left">{i?.customer_name}</div>,
      <div>{formatDate(i?.date_due)}</div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.principal))}
      </div>,
      <div className="text-right">{formatNumber(parseFloat(i?.interest))}</div>,
      <div className="text-right">{formatNumber(parseFloat(i?.prp))}</div>,

      <div className="text-right">{formatNumber(parseFloat(i?.int_paid))}</div>,
      <div className="text-right ">{i?.overdue_day}</div>,
      <div
        className="flex items-center justify-center"
        onClick={() => {
          setOpen(true);
          setCustomerDetails(i);
        }}
      >
        <ButtonComponent buttonIcon={<FiArrowRight />} buttonWidth={"40px"} />
      </div>,
    ];
  });
  return (
    <div>
      <CustomTable
        headers={collectorList}
        data={hd}
        // load={true}
        rowsPerPage={10}
      />

      <Modal
        opened={open}
        onClose={handleClose}
        size={"75%"}
        padding={0}
        withCloseButton={false}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {/* <CustomerQueueDetails
          customerDetails={customerDetails}
          onclose={handleClose}
        /> */}

        <NewCustomerQueueDetails
          customerDetails={customerDetails}
          onclose={handleClose}
        />
      </Modal>
    </div>
  );
}

export default HardQueue;
