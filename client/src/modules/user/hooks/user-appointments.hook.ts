import dayjs from 'dayjs';
import { useQuery } from 'react-query';

import type { Appointment, User } from '../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '../../../utilities/services/axios.service';
import { queryKeys } from '../../../utilities/data/constants/react-query.constants';
import { useUser } from './user.hook';

async function getUserAppointments(
  user: User | null,
): Promise<Appointment[] | null> {
  if (!user)
    return null;

  const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
    headers: getJWTHeader(user),
  });

  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  const { user } = useUser();

  const { data: userAppointments = [] } = useQuery([queryKeys.appointments, queryKeys.user, user?.id], 
    () => getUserAppointments(user),
    {
      enabled: !!user
    }
  );

  return userAppointments;
}
