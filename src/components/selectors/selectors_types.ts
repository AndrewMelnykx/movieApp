import { SelectChangeEvent } from "@mui/material";

export interface Option {
  id: string;
  value: string | number;
}

export interface SelectorsProps {
  selectValue: string;
  onChange: (e: SelectChangeEvent) => void;
  label: string;
  MenuItemContext: Option[];
}
