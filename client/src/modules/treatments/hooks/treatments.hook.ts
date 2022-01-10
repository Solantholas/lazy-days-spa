import { useQuery, useQueryClient } from 'react-query';
import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../utilities/services/axios.service';
import { queryKeys } from '../../../utilities/data/constants/react-query.constants';

async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const { data = [] } = useQuery(queryKeys.treatments, getTreatments);

  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(queryKeys.treatments, getTreatments);
}
