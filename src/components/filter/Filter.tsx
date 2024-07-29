import React from "react";
import "./Filter.css";

import { Box, Typography, IconButton, SelectChangeEvent, Paper } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import OptionSelect from "@selectors/option-selector/OptionSelector";
import CheckboxGenres from "../checkbox/Checkbox";
import PaginationMovies from "../pagination/Pagination";

import { byOption } from "@helpers/const-values";
import YearsSlider from "@selectors/year-slider/YearsSlider";
import SearchInput from "@components/selectors/search-input/SearchInput";
import { UseStoreDispatcher } from "@redux/store/store";
import { useSelector } from "react-redux";
import { FilterSelectorOption } from "@stateSelectors/filter-handling-selectors";
import { filterAction } from "@slices/filter-slice";
import { dataActions } from "@redux/slices/data-slice";

const Filter = () => {
  const dispatch = UseStoreDispatcher();
  const filterState = useSelector(FilterSelectorOption);

  const handleReset = () => {
    dispatch(filterAction.resetFilter());
    dispatch(dataActions.fetchedSearchedMovies([]));
  };

  const handleChangeSelectorValueOption = (e: SelectChangeEvent) => {
    dispatch(filterAction.changedByOption(e.target.value));
  };

  return (
    <Paper sx={{ position: "relative", width: "410px", height: "610px", marginLeft: "5%" }}>
      <Box className="container" sx={{ display: "flex" }}>
        <Box sx={{ width: "400px", height: "600px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            {" "}
            <Typography variant="h4" ml={2} mt={1} style={{ flexGrow: 1 }} className="filter-typography">
              {" "}
              Filters
            </Typography>{" "}
            <IconButton size="large" sx={{ marginTop: "2%" }}>
              <CloseOutlinedIcon onClick={handleReset} />
            </IconButton>
          </Box>
          <SearchInput />
          <OptionSelect
            onChange={handleChangeSelectorValueOption}
            selectValue={filterState}
            MenuItemContext={byOption}
            label={"Options"}
          />

          <YearsSlider />

          <CheckboxGenres />
          <PaginationMovies />
        </Box>
      </Box>
    </Paper>
  );
};

export default Filter;
