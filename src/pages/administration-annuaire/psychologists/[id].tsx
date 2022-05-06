import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Header from "../../../components/Admin/Header";
import PsychologistForm from "../../../components/Admin/PsychologistForm";
import { getOne } from "../../../services/psychologists";

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
  const session = await getSession(context);

  const psychologist = await getOne(
    context.query.id as string,
    session.user.department as string
  );
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
