import React, { useState } from "react";
import Label from "../../../../../../components/others/Label/Label";
import ListOfValue from "../../../../../../components/others/Fields/ListOfValue";
import SelectField from "../../../../../../components/others/Fields/SelectField";
import InputField from "../../../../../../components/others/Fields/InputField";
import EmailInput from "../../components/EmailInput";
import PhoneNumberField from "../../../../../../components/others/Fields/PhoneNumberField";
import RadioButtons from "../../../../../../components/others/Fields/RadioButtons";
import DatePicker from "react-datepicker";
import { formatDate } from "../../../corporate-account-opening/helpers/date_formater";

const Corperate = ({
  data,
  handleChangeCorporateInfo,
  corporate,
  DatePicker,
  isValidKraPin,
  validateKraPin,
  showValidMessage,
  kraPinError,
  errors,
  handleSubmitCorporateData,
  setCorporate,
}) => {
  // Declaration of country state
  const [country, setCountry] = useState("");

  // Array that returns mode of communication
  const modeOfcom = [
    { value: "M", label: "Mobile" },
    { value: "E", label: "Email" },
    { value: "S", label: "SMS" },
  ];

  //   Bank sister company array
  const bankSisterCompany = [
    { value: "N", label: "No" },
    { value: "Y", label: "Yes" },
  ];

  // Function to switch focus
  const switchFocus = (e, id) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = document.getElementById(id);
      input.focus();
    }
  };
  return (
    <div className="w-full border border-blue-500 rounded-md p-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side of corperate details */}
        <div className="w-full max-w-2xl">
          {/* Country of registration */}
          <div className="w-full max-w-xl mt-2 mb-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Country of registration"
                  required={false}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <ListOfValue
                  label={""}
                  inputWidth={300}
                  required={false}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* Physical Address */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Physical Address"
                  required={false}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <InputField
                  label={""}
                  inputWidth={300}
                  required={false}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* Postal Address */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Postal Address"
                  required={false}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <InputField
                  label={""}
                  inputWidth={300}
                  required={false}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* Plot Number */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="Plot Number" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <InputField
                  label={""}
                  inputWidth={300}
                  required={false}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* Website url */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="Website url" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <InputField
                  label={""}
                  inputWidth={300}
                  required={false}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* Telephone Number */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Telephone Number"
                  required={false}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <PhoneNumberField
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* Country */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="Country" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <ListOfValue
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="Email" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <EmailInput
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Preferred Language */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Preferred Language"
                  required={false}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <ListOfValue
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="Description" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <InputField
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
        {/* End of left side of corperate details */}

        {/* Right side of corperate details */}
        <div className="w-full max-w-2xl">
          {/* Town/City */}
          <div className="w-full max-w-xl mt-2 mb-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="town/City" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <InputField
                  label={""}
                  inputWidth={300}
                  required={false}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* Date of Incorp. */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Date of Incorporation"
                  required={true}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <div className="inline-block">
                  {/* <DatePicker
                    id="DATE_OFINCORP"
                    selected={
                      corporate.DATE_OFINCORP
                        ? new Date(corporate.DATE_OFINCORP)
                        : null
                    }
                    // onChange={handleStartDateChange}
                    onChange={(date) => {
                      // Format the date and get the minor status
                      const formattedDate = formatDate(
                        date.toISOString(),
                        false
                      );

                      // Update state based on the selected date
                      setCorporate({
                        ...corporate,
                        DATE_OFINCORP: formattedDate,
                      });
                    }}
                    onKeyPress={(e) => {
                      console.log(
                        document.getElementById("CORP_POSTALADDRESS"),
                        "fighting"
                      );
                      switchFocus(e, "CORP_POSTALADDRESS");
                      setTimeout(() => {
                        if (document.getElementById("CORP_POSTALADDRESS")) {
                          document.getElementById("CORP_POSTALADDRESS");
                        }
                      }, 500);
                    }}
                    className="w-[150px] px-2 border border-gray-300 text-left rounded focus:outline-none"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="dd-mm-yyyy"
                  /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Postal Code */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Postal Code"
                  required={false}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <InputField
                  label={""}
                  inputWidth={300}
                  required={false}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* Communication mode*/}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label 
                  label="Communication mode" 
                  required={false} 
                  fontSize={"85%"} />
              </div>
              <div className="ml-4">
                  {modeOfcom.map((option) => (
                    <label
                      key={option.value}
                      className="inline-flex items-center mr-6"
                    >
                      <input
                        // id="CORP_COMM_MODE"
                        type="radio"
                        // name="CORP_COMM_MODE"
                        value={option.value}
                        // checked={corporate.CORP_COMM_MODE === option.value}
                        // onChange={() =>
                        //   handleChangeCorporateInfo(
                        //     "CORP_COMM_MODE",
                        //     option.value
                        //   )
                        // }
                        // onKeyDown={(e) => {
                        //   switchFocus(e, "WEBSITE_URL");
                        //   if (e.key === "Enter") {
                        //     e.preventDefault();
                        //     const input = document.getElementById("WEBSITE_URL");
                        //     input.focus();
                        //   }
                        // }}
                        className="mr-1"
                      />{" "}
                      {option.label}
                    </label>
                  ))}
                </div>
            </div>
          </div>

           {/* Primary Telephone Number */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Primary Tel. No."
                  required={false}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <PhoneNumberField
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2"
                />
              </div>
            </div>
          </div>

          {/* FFax number */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="Country" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <ListOfValue
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="Email" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <EmailInput
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Preferred Language */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label
                  label="Preferred Language"
                  required={false}
                  fontSize={"85%"}
                />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <ListOfValue
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2 mt-2"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full max-w-xl mt-2">
            <div className="md:flex md:items-center mb-2">
              <div className="md:w-1/3 text-right">
                <Label label="Description" required={false} fontSize={"85%"} />
              </div>
              <div className="md:w-2/3 md:mr-2">
                <InputField
                  label={""}
                  inputWidth={300}
                  required={true}
                  className="mb-2 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>Contact personnel</div>
      <div>Associate Details</div>
    </div>
  );
};

export default Corperate;
