import React from "react";
import "./selectfilter.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectFilter = ({ options, value, setValue, label }) => {
  return (
    <FormControl size="small" sx={{ width: 110 }}>
      <Select
        SelectDisplayProps={{
          style: { paddingBlock: 3 },
        }}
        value={value}
        displayEmpty
        onChange={(event) => setValue(event.target.value)}
        renderValue={value !== "" ? undefined : () => <>All {label}</>}
        inputProps={{
          "aria-label": "Without label",
        }}
        classes={{
          select: "select",
          icon: "select-icon",
        }}
      >
        <MenuItem value="">All {label}</MenuItem>
        {label === "Province"
          ? options.map((option) => (
              <MenuItem value={option._id}>{option.name}</MenuItem>
            ))
          : options.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
        {/* <MenuItem value={1}>Sulawesi Tenggaraaaaaaaa</MenuItem>
                <MenuItem value={2}>Jawa Barat</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem> */}
      </Select>
    </FormControl>
  );
};

export default SelectFilter;
