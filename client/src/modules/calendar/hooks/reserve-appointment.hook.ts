import { UseMutateFunction, useMutation, useQueryClient } from 'react-query';
import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../utilities/services/axios.service';
import { queryKeys } from '../../../utilities/data/constants/react-query.constants';
import { useCustomToast } from '../../app/hooks/custom-toast.hook';
import { useUser } from '../../user/hooks/user.hook';

async function setAppointmentUser(
  appointment: Appointment,
  userId: number | undefined,
): Promise<void> {
  if (!userId) return;
  const patchOp = appointment.userId ? 'replace' : 'add';
  const patchData = [{ op: patchOp, path: '/userId', value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

export function useReserveAppointment(): 
  UseMutateFunction<void, unknown, Appointment, unknown> {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const toast = useCustomToast();

  const { mutate } = useMutation((appointment: Appointment) => {
    return setAppointmentUser(appointment, user?.id)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.appointments]);
      toast({
        title: 'You have reserved the appointment!',
        status: 'success'
      });
    }
  });

  return mutate;
}
