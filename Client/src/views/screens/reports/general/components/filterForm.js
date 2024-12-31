import React, { useEffect, useState } from "react";
import InputField from "../../../teller-ops/components/inputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ListOfValue from "../../../teller-ops/components/ListOfValue";

export default function FilterForm({ form, filters, rdf }) {
  const [formData, setFormData] = useState({});

  function formatDate(inputDateStr) {
    var inputDate = new Date(inputDateStr);
    var months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return (
      inputDate.getDate() +
      "-" +
      months[inputDate.getMonth()] +
      "-" +
      inputDate.getFullYear()
    );
  }
  function handleChange(name, value, field) {
    // console.log({ field: field && field.split("-")[1] === "date" });
    if (field && field.split("-")[1] === "date") {
      setFormData((prev) => ({ ...prev, [name]: formatDate(value) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    filters({
      ...formData,
      report: rdf,
      PB: JSON.parse(localStorage.getItem("userInfo"))?.id,
    });
  }, [formData]);

  return (
    <div className="space-y-3 border-2 rounded p-4">
      {form.map((i) => (
        <div className="flex space-x-4 justify-between px-4">
          <div className="w-1/2">
            {i?.left &&
              (i?.left?.field.includes("input") ? (
                <InputField
                  type={i?.left?.field?.split("-")[1] ?? "text"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  label={i?.left?.label}
                  onChange={(e) => {
                    handleChange(i?.left?.name, e.target.value, i.left.field);
                  }}
                />
              ) : (
                <ListOfValue
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  data={i?.left?.data ?? []}
                  label={i?.left?.label}
                  onChange={(value) => handleChange(i?.left?.name, value)}
                />
              ))}
          </div>
          <div className="w-1/2">
            {i.right &&
              (i?.right?.field.includes("input") ? (
                <InputField
                  type={i?.right?.field?.split("-")[1] ?? "text"}
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  label={i?.right?.label}
                  onChange={(e) =>
                    handleChange(i?.right?.name, e.target.value, i.right.field)
                  }
                />
              ) : (
                <ListOfValue
                  labelWidth={"40%"}
                  inputWidth={"60%"}
                  label={i?.right?.label}
                  data={i?.right?.data ?? []}
                  onChange={(value) => handleChange(i?.right?.name, value)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
