import React from "react";
import { useSelector } from "react-redux";

import YearsSlider from "@components/selectors/year-slider";
import SearchInput from "@components/selectors/search-input";
import { UseStoreDispatcher } from "@redux/store/store";
import { FilterSelectorOption } from "@stateSelectors/filter-handling-selectors";
import { filterAction } from "@slices/filter-slice";
import { dataActions } from "@redux/slices/data-slice";
import OptionSelect from "@components/selectors/option-selector";

import { Box, Typography, IconButton, SelectChangeEvent, Paper } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import CheckboxGenres from "../checkbox";
import PaginationMovies from "../pagination";
import { byOption } from "@helpers/const-values";

import "./index.css";

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
    <Paper
      sx={{
        position: "relative",
        width: { xs: "280px", md: "390px" },
        height: { xs: "480px", md: "530px" },
        marginLeft: { xs: "10%", md: "-3%" },
        borderRadius: "1rem",
        mt: "1rem",
      }}
    >
      <Box className="container" sx={{ display: "flex" }} ml={2}>
        <Box sx={{ width: "400px", height: "600px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h4"
              ml={2}
              mt={1}
              style={{ flexGrow: 1 }}
              className="filter-typography"
            >
              Filters
            </Typography>
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
