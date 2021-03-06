import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithQueryClient } from 'utilities/services/test-utilities.service';

import { mockUser } from '../../../utilities/data/mocks/mockData';
import { Calendar } from '../components/calendar.page';

// mocking useUser to mimic a logged-in user
jest.mock('../../user/hooks/useUser', () => ({
  __esModule: true,
  useUser: () => ({ user: mockUser }),
}));

test('Reserve appointment', async () => {
  renderWithQueryClient(
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>
  );

  // find all the appointments
  const appointments = await screen.findAllByRole('button', {
    name: /\d\d? [ap]m\s+(scrub|facial|massage)/i,
  });
  
  // click on the first one to reserve
  fireEvent.click(appointments[0]);
  
  // check for the toast alert
  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('reserve');
  
  // close alert to keep state clean and wait for it to disappear
  const alertCloseButton = screen.getByRole('button', { name: 'Close' });
  alertCloseButton.click();
  await waitForElementToBeRemoved(alertToast);
});

test('Cancel appointment', async () => {
  renderWithQueryClient(
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>
  );
  
  const cancelButtons = await screen.findAllByRole('button', {
    name: /cancel appointment/i,
  });

  fireEvent.click(cancelButtons[0]);

  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('cancel');

  const alertCloseButton = screen.getByRole('button', { name: 'Close' });
  alertCloseButton.click();
  await waitForElementToBeRemoved(alertToast);
});
