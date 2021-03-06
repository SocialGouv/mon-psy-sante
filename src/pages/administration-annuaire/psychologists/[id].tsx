import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

import Header from "../../../components/Admin/Header";
import PsychologistForm from "../../../components/Admin/PsychologistForm";
import { getOne } from "../../../services/psychologists";

const EditablePsychologist = ({
  psychologist,
  isSuperAdmin,
}: {
  psychologist: string;
  isSuperAdmin: boolean;
}) => {
  return (
    <>
      <Header
        breadcrumbs={[
          { link: "/administration-annuaire", text: "Admin" },
          { link: "/administration-annuaire", text: "Psychologues" },
        ]}
      />

      <div className="fr-container">
        <PsychologistForm
          psychologist={JSON.parse(psychologist)}
          isSuperAdmin={isSuperAdmin}
        />
      </div>
    </>
  );
};

export default EditablePsychologist;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const psychologist = await getOne(
    context.query.id as string,
    session.user.isSuperAdmin ? "" : (session.user.department as string)
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
      isSuperAdmin: !!session.user.isSuperAdmin,
    },
  };
};
