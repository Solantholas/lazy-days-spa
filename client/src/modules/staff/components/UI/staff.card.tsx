import { Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

import type { Staff as StaffType } from '../../../../../../shared/types';
import { Card } from '../../../../shared/components/card.component';

interface StaffProps {
  staffData: StaffType;
}

export function StaffCard({ staffData }: StaffProps): ReactElement {
  const cardContents = (
    <Text align="center">{staffData.treatmentNames.join(', ')}</Text>
  );

  return (
    <Card
      itemName={staffData.name}
      image={staffData.image}
      cardContents={cardContents}
    />
  );
}
