import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Header from "../../components/Admin/Header";
import { Login, LoginProps } from "../../components/Login";

const Connexion = ({ error, callbackUrl }: LoginProps) => {
  return (
    <>
      <Header />

      <div className="fr-container">
        <Login error={error} callbackUrl={callbackUrl} />
      </div>
    </>
  );
};

export default Connexion;

export const getServerSideProps: GetServerSideProps<LoginProps> = async (
  context
) => {
  const userSession = await getSession(context);
  if (userSession) {
    return {
      redirect: { destination: "/administration-annuaire", permanent: false },
    };
  }

  return {
    props: {
      callbackUrl:
        (context.query.callbackUrl as string) || "/administration-annuaire",
      error: (context.query.error as string) || null,
    },
  };
};
