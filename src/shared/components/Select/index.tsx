import React, { ChangeEvent } from "react";
import "./styles.css";

interface Props {
  id: string;
  options: ComboType[];
  placeholder?: string;
  addEmpty?: boolean;
  onChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedValue?: string | number;
}
const SelectCustom: React.FC<Props> = (props) => {
  const { id, options, placeholder, addEmpty, onChangeHandler, selectedValue } =
    props;
  return (
    <select
      id={id}
      key={`select-${selectedValue}`}
      className="custom-select"
      placeholder={placeholder || ""}
      onChange={(e) => {
        onChangeHandler(e);
      }}
      value={selectedValue}
    >
      {(addEmpty
        ? [
            {
              value: "",
              label: placeholder || "",
            },
            ...options,
          ]
        : options
      ).map((o, index) => (
        <option key={`customSelItem-${index}`} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

export default SelectCustom;
