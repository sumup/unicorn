import React from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
  AuthUserContext,
} from "next-firebase-auth";
import Header from "../components/Header";
import getAbsoluteURL from "../utils/getAbsoluteURL";

const addDBRecord = async (AuthUser: AuthUserContext) => {
  const token = await AuthUser.getIdToken();
  const response = await fetch("/api/createRecord", {
    method: "POST",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });
  const data = await response.json();
  console.log(data);
};

const Index = () => {
  const AuthUser = useAuthUser();
  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={{ padding: 32 }}>
        <h1>Hi {AuthUser.displayName}, you&apos;re logged in!</h1>
        <button onClick={() => addDBRecord(AuthUser)}>
          Update timestamp in DB
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  const token = await AuthUser.getIdToken();
  const endpoint = getAbsoluteURL("/api/example", req);
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: token || "unauthenticated",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Data fetching failed with status ${response.status}: ${JSON.stringify(
        data
      )}`
    );
  }
  return {
    props: {
      favoriteColor: data.favoriteColor,
    },
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
