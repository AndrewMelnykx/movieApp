import React, { useEffect } from "react";
import { Pagination, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import { FilterSelectorPage } from "@stateSelectors/filter-handling-selectors";
import { UseStoreDispatcher } from "@redux/store/store";
import { filterAction } from "@slices/filter-slice";

const PaginationMovies = () => {
  const dispatch = UseStoreDispatcher();
  const state = useSelector(FilterSelectorPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(filterAction.switchedThePage(value));
  };

  return (
    <Stack
      spacing={2}
      sx={{
        margin: "2%",
        marginTop: "auto",
        "& .MuiPaginationItem-root": {
          transition: "color 0.3s ease-in-out",
        },
        "& .MuiPaginationItem-root:hover": {
          background: "aqua",
          transition: "color 0.2s ease-in-out",
          color: "white",
        },
        "& .MuiPaginationItem-page.Mui-selected": {
          color: "black",
        },
      }}
    >
      <Pagination count={500} variant="outlined" page={state} onChange={handlePageChange}></Pagination>
    </Stack>
  );
};

export default PaginationMovies;
