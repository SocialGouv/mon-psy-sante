import { Button, Table } from "@dataesr/react-dsfr";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { Psychologist } from "../types/psychologist";

const columns = [
  {
    label: "Nom",
    name: "name",
    render: (psychologist) =>
      `${psychologist.lastName.toUpperCase()} ${psychologist.firstName}`,
  },
  {
    label: "Adresse",
    name: "address",
  },
  {
    label: "",
    name: "action",
    render: () => (
      <>
        <div className="fr-displayed-xs fr-hidden-sm">
          <Button secondary size="sm" className="fr-fi-arrow-right-line" />
        </div>
        <div className="fr-hidden-xs fr-displayed-sm">
          <Button
            data-test-id="psy-table-row-profil-button"
            secondary
            size="sm"
            icon="fr-fi-arrow-right-line"
            iconPosition="right"
          >
            Voir les infos
          </Button>
        </div>
      </>
    ),
  },
];

const Directory = () => {
  const router = useRouter();
  const table = useRef(null);
  const [psychologists, setPsychologists] = useState<Psychologist[]>();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DISPLAY_DIRECTORY !== "true") {
      router.push("/");
    } else {
      axios
        .get("/api/psychologists")
        .then((response) => setPsychologists(response.data));
    }
  }, []);

  if (!psychologists) {
    return null;
  }
  return (
    <div ref={table}>
      <Table
        data-test-id="psy-table"
        className="fr-mb-3w"
        caption={"Psychologues"}
        rowKey="id"
        columns={columns}
        data={psychologists}
        pagination
        paginationPosition="center"
        page={currentPage}
        perPage={10}
        setPage={(p) => {
          setCurrentPage(p);
          table.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        surrendingPages={3}
      />
    </div>
  );
};

export default Directory;
