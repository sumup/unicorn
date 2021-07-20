import React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import FirebaseAuth from 'components/FirebaseAuth';
import { Heading, spacing } from '@sumup/circuit-ui';

const Auth = () => (
  <div
    style={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Heading size="giga" as="h1" noMargin css={spacing({ bottom: 'mega' })}>
      Sign in with your SumUp Google account
    </Heading>
    <FirebaseAuth />
  </div>
);

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth);
