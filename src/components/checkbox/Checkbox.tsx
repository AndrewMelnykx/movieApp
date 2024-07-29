import React, { useCallback, useEffect, useMemo } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSelector } from "react-redux";
import { UseStoreDispatcher } from "@redux/store/store";

import { TextField, Checkbox, Autocomplete, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FIlterSelectorGenres } from "@stateSelectors/filter-handling-selectors";
import { filterAction } from "@slices/filter-slice";
import { fetchInitialGenresThunk } from "@redux/slices/actions-slice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CheckboxGenres = () => {
  const dispatch = UseStoreDispatcher();
  const genresState = useSelector(FIlterSelectorGenres);

  const checkedGenres = useMemo(() => genresState.filter(genre => genre.checked), [genresState]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const result = await dispatch(fetchInitialGenresThunk());
      } catch (error) {
        toast.error("Failed to fetch genres");
      }
    };

    fetchedData();
  }, []);
  const handleGenresToggling = useCallback(
    (selectedIds: number[]) => {
      genresState.forEach(genre => {
        if (genre.checked !== selectedIds.includes(genre.id)) {
          dispatch(filterAction.toggledTheGenre(genre.id));
        }
      });
    },
    [genresState],
  );

  return (
    <Box mt={2}>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={genresState}
        disableCloseOnSelect
        getOptionLabel={option => option.name}
        value={checkedGenres}
        onChange={(e, newValue) => {
          const selectedIds = newValue.map(genre => genre.id);
          handleGenresToggling(selectedIds);
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            {option.name}
          </li>
        )}
        style={{ width: 370, marginLeft: "2%" }}
        sx={{
          "& .MuiInputBase-input": {
            color: "black",
          },
          "& .MuiInputLabel-root": {
            color: "black",
          },
          "& .MuiInputLabel-root:hover": {
            color: "aqua",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "aqua",
            transition: "0.3s ease-in-out",
          },
        }}
        renderInput={params => <TextField {...params} label="Genres" placeholder="Choose genre" />}
      />
      <ToastContainer />
    </Box>
  );
};
export default CheckboxGenres;
