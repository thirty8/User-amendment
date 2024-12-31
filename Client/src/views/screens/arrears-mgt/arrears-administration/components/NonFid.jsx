import React, { useState } from "react";
import CustomTable from "../../../control-setups/components/CustomTable";
import { FiArrowRight } from "react-icons/fi";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import { Modal } from "antd";
import { ScrollArea } from "@mantine/core";
import NewCustomerQueueDetails from "./modals/new-customer-queue-details";

function NonFid({ data }) {
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});

  const handleClose = () => setOpen(false);

  // FUNCTIONS
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
      <div className="text-left">{i?.fac_no}</div>,
      <div className="text-left">{i?.customer_name}</div>,
      <div>{formatDate(i?.date_due)}</div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.principal))}
      </div>,
      <div className="text-right">{formatNumber(parseFloat(i?.interest))}</div>,
      <div className="text-right">
        {formatNumber(parseFloat(i?.amt_granted) - parseFloat(i?.principal))}
      </div>,

      <div className="text-right">{formatNumber(parseFloat(i?.int_paid))}</div>,
      <div className="text-right font-bold">{i?.overdue_day}</div>,
      <div className="flex items-center justify-center">
        <ButtonComponent
          buttonIcon={<FiArrowRight />}
          buttonWidth={"40px"}
          onClick={() => {
            setCustomerDetails(i);
            setOpen(true);
          }}
        />
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
        <NewCustomerQueueDetails
          customerDetails={customerDetails}
          onclose={handleClose}
        />
      </Modal>
    </div>
  );
}

export default NonFid;
