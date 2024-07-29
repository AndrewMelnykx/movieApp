import { FormControl, TextField, Box } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { FilterSelectorPage } from "@stateSelectors/filter-handling-selectors";
import { UseStoreDispatcher } from "@redux/store/store";
import { fetchSearchDataThunk } from "@redux/slices/actions-slice";

const SearchInput = () => {
  const [value, setValue] = useState("");

  const pageState = useSelector(FilterSelectorPage);
  const dispatch = UseStoreDispatcher();

  const debouncedSetValue = debounce((newValue: string) => {
    setValue(newValue);
  }, 5);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    debouncedSetValue(currentValue);
  };

  const fetchSearch = useCallback(async () => {
    try {
      const response = await dispatch(fetchSearchDataThunk({ value: value, page: pageState }));
    } catch (error) {
      toast.error("There`s nothing to search");
    }
  }, [value, pageState]);
  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return (
    <Box>
      <FormControl sx={{ width: "90%", margin: "3%", marginLeft: "3%", marginTop: "8%", color: "black" }}>
        <TextField
          sx={{
            "& .MuiInputBase-input": {
              color: "black",
            },
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "aqua",
              transition: " 0.3s ease-in-out",
            },
          }}
          id={"movie-search-input"}
          variant="standard"
          label="Movie`s name . . . "
          onChange={handleInputChange}
          value={value}
        ></TextField>
      </FormControl>
      <ToastContainer />
    </Box>
  );
};

export default SearchInput;
