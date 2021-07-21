import React, { useCallback, useState } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth';
import { useRouter } from 'next/dist/client/router';

import Header from '../components/Header';
import { RecommendForm } from '../src/pages/recommend/RecommendForm';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

const Recommend = () => {
  const AuthUser = useAuthUser();
  const message = 'This is the page for adding recommendations!';
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = useCallback(
    (merchant) => {
      setLoading(true);
      const merchantListRef = firebase.database().ref('merchants');
      const newMerchantRef = merchantListRef.push();
      newMerchantRef
        .set({
          category: merchant.businessType,
          name: merchant.merchantName,
          description: merchant.description,
          imageUrl: merchant.images[0],
          address: merchant.address,
          phone: merchant.phoneNumber,
          links: {
            website: merchant.merchantWebsite,
            instagram: merchant.merchantInstagram,
            facebook: merchant.merchantFacebook,
          },
        })
        .then(() => {
          setLoading(false);
          router.push('/');
        });
    },
    [router],
  );

  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <span>{message}</span>
      <RecommendForm
        handleFormSubmit={handleFormSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Recommend);
