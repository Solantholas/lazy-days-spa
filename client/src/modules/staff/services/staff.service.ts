import { axiosInstance } from "utilities/services/axios.service";
import { Staff } from "../../../../../shared/types";

export async function getStaff(): Promise<Staff[]> {
  const response = await axiosInstance.get<Staff[]>('/staff');
  return response.data;
}

export function filterByTreatment(staff: Staff[], treatmentName: string): Staff[] {
  return staff.filter((person) =>
    person.treatmentNames
      .map((t) => t.toLowerCase())
      .includes(treatmentName.toLowerCase()),
  );
}