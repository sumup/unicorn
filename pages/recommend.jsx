import React from "react";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import Header from "../components/Header";
import { RecommendForm } from "../src/pages/recommend/RecommendForm";
import { useCallback } from "react";
import { useState } from "react";

const Recommend = () => {
  const AuthUser = useAuthUser();
  const message = "This is the page for adding recommendations!";
  const [isLoading, setLoading] = useState(false);
  const handleFormSubmit = useCallback((merchant) => {
    console.log(merchant);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

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
