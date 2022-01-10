import { act, renderHook } from '@testing-library/react-hooks';

import { createQueryClientWrapper } from '../../../utilities/services/test-utilities.service';
import { useAppointments } from '../hooks/appointments.hook';

test('filter appointments by availability', async () => {
  const { result, waitFor } = renderHook(useAppointments, {
    wrapper: createQueryClientWrapper()
  });

  // wait for hook to populate filtered appointments
  await waitFor(() => Object.keys(result.current.appointments).length > 0);

  const filteredAppointmentsLength = 
    Object.keys(result.current.appointments).length;

  // set to show all appointments
  act(() => result.current.setShowAll(true));

  // wait for filter to be removed and validate result
  await waitFor(() => Object.keys(result.current.appointments).length ===
  filteredAppointmentsLength);
});
