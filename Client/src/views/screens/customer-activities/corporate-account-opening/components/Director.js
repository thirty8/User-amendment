import React, {useState} from "react";
import Label from "../../../../../components/others/Label/Label";
import ListOfValue from "./comp/ListOfValue";
import InputField from "./comp/InputField";
import { Modal, Table } from "@mantine/core";

const Director = ({ relationData }) => {
  const [opened, setOpened] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState(null);

  const handleRowClick = (director) => {
    setSelectedDirector(director);
    setOpened(false);
  };

  console.log("Director Relation:", selectedDirector);
  return (
    <div>
      <button className="mb-5" onClick={() => setOpened(true)}>
        <div className="border border-black flex items-center bg-slate-500 text-white font-bold p-2">
          <span>+</span>
          <div>Add Director(s)</div>
        </div>
      </button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select Director"
        size='lg'
      >
        <Table>
          <thead>
            <tr>
              <th>Relation number</th>
              <th>Full name</th>
              <th>Phone number</th>
              <th>Date of birth</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {relationData.map((director, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(director)}
                style={{ cursor: "pointer" }}
              >
                <td>{director.randomNumberString}</td>
                <td>{`${director.P_fname} ${director.P_mname == "null" ? "" : director.P_mname} ${director.P_sname}`}</td>
                <td>{director.P_Mobile_comm_no}</td>
                <td>{director.P_dob}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal>

      <form>
        <div className="flex items-center justify-center space-x-20 -mt-3">
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2 ml-2">
              <div className="md:w-1/3 text-right">
                <Label label="Search Director" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  inputWidth="300px"
                  value={`${selectedDirector ? selectedDirector.randomNumberString : ''} - ${selectedDirector ? selectedDirector.P_fname : ''}`}
                  disabled={true}
                  // Add onChange handler if necessary
                />
              </div>
            </div>
          </div>

          {/* Relationship */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2 ml-2">
              <div className="md:w-1/3 text-right">
                <Label label="Shares percentage" required={true} fontSize="85%" />
              </div>
              <div className="md:w-2/3 md:ml-[2px]">
                <InputField
                  inputWidth="300px"
                  type="text"
                  name="shares_percentage"
                  textAlign="right"
                //   value={selectedDirector ? selectedDirector.shares : ''}
                  // Add onChange handler if necessary
                />
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Director;
