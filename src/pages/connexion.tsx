import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import { Login, LoginProps } from "../components/Login/index";

const Connexion = ({ error, callbackUrl }: LoginProps) => {
  return (
    <div className="fr-container">
      <Login error={error} callbackUrl={callbackUrl} />
    </div>
  );
};

export default Connexion;

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  context
) => {
  const userSession = await getSession(context);
  console.log(userSession);
  if (userSession) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return {
    props: {
      callbackUrl: (context.query.callbackUrl as string) || "/",
      error: (context.query.error as string) || null,
    },
  };
};
