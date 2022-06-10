import { Table } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Psychologist } from "../../types/psychologist";

const PsychologistsForInstructors = ({
  psychologists,
  department,
}: {
  psychologists: Partial<Psychologist>[];
  department: string;
}) => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    if (!search) {
      setFilteredPsychologists(psychologists);
    } else {
      const searchId = parseInt(search);
      if (searchId) {
        setFilteredPsychologists(
          psychologists.filter((psychologist) =>
            psychologist.id.toString().includes(search)
          )
        );
      } else {
        setFilteredPsychologists(
          psychologists.filter(
            (psychologist) =>
              psychologist.lastName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              psychologist.firstName
                .toLowerCase()
                .includes(search.toLowerCase())
          )
        );
      }
    }
  }, [psychologists, search]);

  const columns = [
    {
      label: "Dossier",
      name: "id",
      sortable: true,
    },
    {
      label: "Nom",
      name: "name",
      render: (psychologist) =>
        `${psychologist.lastName} ${psychologist.firstName}`,
      sort: (a, b) =>
        `${a.lastName} ${a.firstName}`.localeCompare(
          `${b.lastName} ${b.firstName}`
        ),
      sortable: true,
    },
    {
      label: "",
      name: "action",
      render: (psychologist) => (
        <button
          className="fr-btn"
          onClick={() => {
            router.push(
              `/administration-annuaire/psychologists/${psychologist.id}`
            );
          }}
        >
          Modifier
        </button>
      ),
    },
  ];
  return (
    <>
      <h1>Psychologues - CPAM {department}</h1>
      {psychologists.length > 0 && (
        <>
          <div className="fr-input-group">
            <label className="fr-label" htmlFor="text-input-text">
              Rechercher par nom ou id
            </label>
            <input
              className="fr-input"
              required
              id="text-input-text"
              name="text-input-text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </>
      )}
      {filteredPsychologists.length > 0 && (
        <Table
          className="table-instructor-list"
          rowKey="id"
          columns={columns}
          data={filteredPsychologists}
          pagination
          paginationPosition="center"
          perPage={15}
          page={page}
          setPage={setPage}
        />
      )}
      {filteredPsychologists.length === 0 && psychologists.length > 0 && (
        <>
          <p>Aucun résultat</p>
          <button
            className="fr-btn"
            onClick={() => {
              setSearch("");
            }}
          >
            Réinitialiser la recherche
          </button>
        </>
      )}
      {psychologists.length === 0 && (
        <p>Aucun psychologue dans le CPAM {department}</p>
      )}
    </>
  );
};

export default PsychologistsForInstructors;
