import { screen } from '@testing-library/react';

import { rest } from 'msw';
import { server } from '../../../utilities/data/mocks/server';
import { renderWithQueryClient } from '../../../utilities/services/test-utilities.service';
import { Calendar } from '../components/calendar.page';

// mocking useUser to mimic a logged-in user
// jest.mock('../../user/hooks/useUser', () => ({
//   __esModule: true,
//   useUser: () => ({ user: mockUser }),
// }));

test('Reserve appointment error', async () => {
  // (re)set handler to return a 500 error for appointments
  server.resetHandlers(
    rest.get(
      'http://localhost:3030/appointments/:month/:year',
      (req, res, ctx) => {
        return res(ctx.status(500));
      },
    ),
  );

  renderWithQueryClient(<Calendar />);

  const alertToast = await screen.findByRole('alert');

  expect(alertToast).toHaveTextContent('Request failed with status code 500');
});
