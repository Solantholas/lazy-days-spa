import { screen } from '@testing-library/react';
import { renderWithQueryClient } from 'utilities/services/test-utilities.service';

import { Treatments } from '../components/treatments.page';

test('renders response from query', async () => {
  renderWithQueryClient(<Treatments />);

  const treatmentTitles = await screen.findAllByRole('heading', { 
    name: /massage|facial|scrub/i 
  });

  expect(treatmentTitles).toHaveLength(3);
});
