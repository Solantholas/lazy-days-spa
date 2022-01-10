import { Dispatch, SetStateAction } from "react";
import { Staff } from "../../../../../../shared/types";

export interface IUseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}