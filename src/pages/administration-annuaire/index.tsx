import { Alert } from "@dataesr/react-dsfr";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import React from "react";

import AdminSearchField from "../../components/Admin/AdminSearchField";
import Header from "../../components/Admin/Header";
import PsychologistsForInstructors from "../../components/Admin/PsychologistsForInstructors";
import { countAll, getByDepartment } from "../../services/psychologists";
import { Psychologist } from "../../types/psychologist";

const Admin = ({
  psychologists,
  count,
  department,
}: {
  psychologists: Partial<Psychologist>[];
  count: number;
  department: string | undefined;
}) => {
  const router = useRouter();

  return (
    <>
      <Header />

      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--gutters fr-my-2w">
          <div className="fr-col-12 fr-col-md-2">
            <h2>Nombre de psychologues</h2>
            <p className="fr-text--lead">{count}</p>
          </div>
          <div className="fr-col-12 fr-col-md-6 fr-col-offset-1">
            {router.query.error === "NotFound" && (
              <Alert
                title="Dossier non trouvé"
                className="fr-my-2w"
                type="error"
              />
            )}
            {department ? (
              <PsychologistsForInstructors
                psychologists={psychologists}
                department={department}
              />
            ) : (
              <AdminSearchField />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  let psychologists = [];
  let count;
  let department;
  if (session.user.isSuperAdmin) {
    count = await countAll();
  } else if (session.user.isAdmin) {
    department = session.user.department;
    psychologists = await getByDepartment(department as string);
    psychologists = psychologists.map((psychologist) => {
      const { id, firstName, lastName } = psychologist;
      return { firstName, id, lastName };
    });
    count = psychologists.length;
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const props: any = { psychologists, count };
  if (department) {
    props.department = department;
  }
  return { props: props };
};
