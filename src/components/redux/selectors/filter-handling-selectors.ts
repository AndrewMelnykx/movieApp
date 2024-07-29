import { RootState } from "@redux/reducers/root-reducer";

const FilterSelectorOption = (state: RootState) => state.filterHandling.selectByOption;
const FilterSelectorYear = (state: RootState) => state.filterHandling.selectByYear;
const FilterSelectorPage = (state: RootState) => state.filterHandling.page;
const FIlterSelectorGenres = (state: RootState) => state.filterHandling.genres;

export { FilterSelectorOption, FIlterSelectorGenres, FilterSelectorPage, FilterSelectorYear };
