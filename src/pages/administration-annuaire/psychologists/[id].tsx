import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import PsychologistForm from "../../../components/Admin/PsychologistForm";
import { getOne } from "../../../services/psychologists";
import Header from "../../../components/Admin/Header";

const EditablePsychologist = ({ psychologist }: { psychologist: string }) => {
  return (
    <>
      <Header />

      <div className="fr-container">
        <PsychologistForm psychologist={JSON.parse(psychologist)} />
      </div>
    </>
  );
};

export default EditablePsychologist;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userSession = await getSession(context);
  if (!userSession) {
    return {
      redirect: {
        destination: `/administration-annuaire/connexion?callbackurl=/administration-annuaire/psychologists/$${context.query.id}`,
        permanent: false,
      },
    };
  }
  const psychologist = await getOne(context.query.id as string);
  if (!psychologist) {
    return {
      redirect: {
        destination: `/administration-annuaire?error=NotFound`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      psychologist: JSON.stringify(psychologist),
    },
  };
};
