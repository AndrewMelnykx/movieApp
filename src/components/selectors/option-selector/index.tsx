import React from "react";

import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import { SelectorsProps } from "../selectors_types";

import "./index.css";

const OptionSelect: React.FC<SelectorsProps> = ({
  selectValue,
  onChange,
  label,
  MenuItemContext,
}) => {
  return (
    <Box width={{ xs: "60%", md: "100%" }}>
      <FormControl
        variant="standard"
        sx={{ width: "100%", margin: "3%", marginLeft: "3%", marginTop: "8%" }}
      >
        <InputLabel id="filter-select">
          <i> Filter by: {label}</i>
        </InputLabel>
        <Select
          labelId="filter-select"
          onChange={onChange}
          value={selectValue}
          label={"Options"}
          sx={{ fontSize: "1.1rem" }}
        >
          {MenuItemContext.map(item => (
            <MenuItem key={item.id} value={item.value} sx={{ fontSize: "1.5rem" }}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default OptionSelect;
