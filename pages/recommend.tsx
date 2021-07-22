import React, { useState } from 'react';
import { withAuthUser, AuthAction, useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/dist/client/router';
import { Merchant } from 'utils/types';
import { RecommendForm } from 'src/pages/recommend/RecommendForm';

const Recommend = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const AuthUser = useAuthUser();

  const handleFormSubmit = async (merchant: Merchant): Promise<void> => {
    setLoading(true);
    const token = await AuthUser.getIdToken();
    const response = await fetch('/api/merchants', {
      method: 'POST',
      headers: {
        Authorization: token || 'unauthenticated',
      },
      body: JSON.stringify(merchant),
    });
    if (!response.ok) {
      console.log('Something went wrong');
      // TODO handle errors
      return;
    }
    setLoading(false);
    await router.push('/');
  };

  return (
    <RecommendForm handleFormSubmit={handleFormSubmit} isLoading={isLoading} />
  );
};

// // eslint-disable-next-line @typescript-eslint/no-empty-function
// export async function getServerSideProps() {} // enables SSR for this page

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Recommend);
