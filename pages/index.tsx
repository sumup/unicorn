import React from "react";
import {
  useAuthUser,
  withAuthUser,
  AuthAction,
  AuthUserContext,
} from "next-firebase-auth";
import Header from "../components/Header";
import DemoPageLinks from "../components/DemoPageLinks";

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
      <Header />
      <div style={{ padding: 32 }}>
        <div style={{ marginBottom: 32 }}>
          <h1>Hi {AuthUser.displayName}, you&apos;re logged in!</h1>
          <button onClick={() => addDBRecord(AuthUser)}>
            Update timestamp in DB
          </button>
        </div>
        <DemoPageLinks />
      </div>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Index);
