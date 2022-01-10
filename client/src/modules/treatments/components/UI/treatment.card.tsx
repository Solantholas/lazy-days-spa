import { Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

import type { Treatment as TreatmentType } from '../../../../../../shared/types';
import { Card } from '../../../../shared/components/card.component';

interface TreatmentProps {
  treatmentData: TreatmentType;
}
export function TreatmentCard({ treatmentData }: TreatmentProps): ReactElement {
  const cardContents = <Text>{treatmentData.description}</Text>;

  return (
    <Card
      itemName={treatmentData.name}
      image={treatmentData.image}
      cardContents={cardContents}
    />
  );
}
