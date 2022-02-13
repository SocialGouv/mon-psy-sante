import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Psychologists from "../../components/Admin/Psychologists";
import { getByInstructor } from "../../services/psychologists";
import { Psychologist } from "../../types/psychologist";

const Admin = ({
  psychologists,
}: {
  psychologists: Partial<Psychologist>[];
}) => {
  return (
    <div className="fr-container">
      <Psychologists psychologists={psychologists} />
    </div>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userSession = await getSession(context);
  if (!userSession) {
    return {
      redirect: {
        destination: "/connexion?callbackurl=/admin",
        permanent: false,
      },
    };
  }
  const psychologists = await getByInstructor(userSession.user.group);
  return {
    props: {
      psychologists: psychologists.map((psychologist) => {
        const { id, firstName, lastName } = psychologist;
        return { firstName, id, lastName };
      }),
    },
  };
};
