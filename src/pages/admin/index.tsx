import { Alert } from "@dataesr/react-dsfr";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import React from "react";

import AdminSearchField from "../../components/Admin/AdminSearchField";
import PsychologistsForInstructors from "../../components/Admin/PsychologistsForInstructors";
import { countAll, getByInstructor } from "../../services/psychologists";
import { Psychologist } from "../../types/psychologist";

const Admin = ({
  psychologists,
  count,
}: {
  psychologists: Partial<Psychologist>[];
  count: number;
}) => {
  const router = useRouter();

  return (
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--gutters fr-my-2w">
        <div className="fr-col-12 fr-col-md-2">
          <h2>Nombre de psychologues</h2>
          <p className="fr-text--lead">{count}</p>
        </div>
        <div className="fr-col-12 fr-col-md-4 fr-col-offset-2">
          {psychologists ? (
            <PsychologistsForInstructors psychologists={psychologists} />
          ) : (
            <AdminSearchField />
          )}
          {router.query.error && (
            <Alert
              title="Dossier non trouvé"
              className="fr-my-2w"
              type="error"
            />
          )}
        </div>
      </div>
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
  const count = await countAll();
  return {
    props: {
      psychologists: psychologists.map((psychologist) => {
        const { id, firstName, lastName } = psychologist;
        return { firstName, id, lastName };
      }),
      count,
    },
  };
};
