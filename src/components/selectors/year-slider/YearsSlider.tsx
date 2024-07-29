import React, { useEffect } from "react";
import { Box, Slider, Typography } from "@mui/material";
import { maxYear, minYear } from "../../../helpers/magic-numbers";

import "./YearsSlider.css";
import { UseStoreDispatcher } from "@redux/store/store";
import { useSelector } from "react-redux";
import {
  FIlterSelectorGenres,
  FilterSelectorOption,
  FilterSelectorPage,
  FilterSelectorYear,
} from "@stateSelectors/filter-handling-selectors";
import { filterAction } from "@slices/filter-slice";
import { fetchYearArrangeMoviesThunk } from "@redux/slices/actions-slice";

const YearsSlider = () => {
  const dispatch = UseStoreDispatcher();
  const yearsSliderState = useSelector(FilterSelectorYear);
  const stateOptionValue = useSelector(FilterSelectorOption);
  const statePage = useSelector(FilterSelectorPage);
  const genresState = useSelector(FIlterSelectorGenres);
  const checkedGenres = genresState.filter(genre => genre.checked === true);
  const checkedGenreId = checkedGenres.map(genre => genre.id).join(", ");

  const handleChange = (_event: Event, newValue: number[] | number) => {
    dispatch(filterAction.changedByYear(newValue));
  };
  useEffect(() => {
    dispatch(
      fetchYearArrangeMoviesThunk({
        year: yearsSliderState,
        optionValue: stateOptionValue,
        page: statePage,
        genres: checkedGenreId,
      }),
    );
  }, [yearsSliderState, checkedGenres]);

  return (
    <Box mt={3} mb={2} ml={2} width={360}>
      <Typography mb={1} className="year-slider-typography">
        <i>Filter by:year</i>
      </Typography>
      <Slider
        getAriaLabel={() => "Year range"}
        value={yearsSliderState}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={minYear}
        max={maxYear}
        step={1}
        className="custom-slider"
      />
    </Box>
  );
};
export default YearsSlider;
