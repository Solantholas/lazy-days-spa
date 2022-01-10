import { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Calendar } from '../../calendar/components/calendar.page';
import { AllStaff } from '../../staff/components/all-staff.page';
import { Treatments } from '../../treatments/components/treatments.page';
import { Signin } from '../../user/components/signin.page';
import { UserProfile } from '../../user/components/user-profile.page';
import { Home } from './home.page';

export function Routes(): ReactElement {
  return (
    <Switch>
      <Route path="/Staff" component={AllStaff} />
      <Route path="/Calendar" component={Calendar} />
      <Route path="/Treatments" component={Treatments} />
      <Route path="/signin" component={Signin} />
      <Route path="/user/:id" component={UserProfile} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
