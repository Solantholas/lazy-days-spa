import { act, renderHook } from '@testing-library/react-hooks';
import { createQueryClientWrapper } from 'utilities/services/test-utilities.service';
import { useStaff } from '../hooks/staff.hook';

test('filter staff', async () => {
  const { result, waitFor } = renderHook(useStaff, {
    wrapper: createQueryClientWrapper()
  });

  // wait for data to populate
  await waitFor(() => result.current.staff.length === 4);

  // set filter to facial
  act(() => result.current.setFilter('facial'));

  // wait for filter to be applied and validate
  await waitFor(() => result.current.staff.length === 3);
});
