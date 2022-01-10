import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';

import type { Staff } from '../../../../../shared/types';
import { queryKeys } from '../../../utilities/data/constants/react-query.constants';
import { IUseStaff } from '../data/interfaces/use-staff.interface';
import { filterByTreatment, getStaff } from '../services/staff.service';

export function useStaff(): IUseStaff {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  const selectFn = useCallback((staff: Staff[]) => {
    return filterByTreatment(staff, filter)
  }, [filter]);
  
  const { data: staff = [] } = useQuery(queryKeys.staff, getStaff, {
    select: filter !== 'all' ? selectFn : undefined
  });

  return { staff, filter, setFilter };
}
