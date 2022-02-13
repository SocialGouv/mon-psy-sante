import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import PsychologistForm from "../../../components/Admin/PsychologistForm";
import { getOne } from "../../../services/psychologists";

const EditablePsychologist = ({ psychologist }: { psychologist: string }) => {
  return (
    <div className="fr-container">
      <PsychologistForm psychologist={JSON.parse(psychologist)} />
    </div>
  );
};

export default EditablePsychologist;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userSession = await getSession(context);
  if (!userSession) {
    return {
      redirect: {
        destination: `/connexion?callbackurl=/admin/psychologists/$${context.query.id}`,
        permanent: false,
      },
    };
  }
  const psychologist = await getOne(context.query.id as string);
  if (!psychologist) {
    return {
      redirect: {
        destination: `/admin`,
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
