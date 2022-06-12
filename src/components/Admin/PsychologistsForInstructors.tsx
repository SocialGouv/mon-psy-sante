import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Psychologist } from "../../types/psychologist";
import Pagination from "../Pagination";

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

  const itemsPerPage = 2;

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
        <>
          <table
            className="fr-table fr-table--no-caption"
            style={{ borderSpacing: 0 }}
          >
            <caption>Liste de psychologues</caption>
            <thead>
              <tr>
                <th scope="col">Dossier</th>
                <th scope="col">Nom</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPsychologists
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((psychologist) => (
                  <tr key={psychologist.id}>
                    <td>{psychologist.id}</td>
                    <td
                      style={{ width: "100%" }}
                    >{`${psychologist.lastName} ${psychologist.firstName}`}</td>
                    <td>
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={Math.ceil(
                filteredPsychologists.length / itemsPerPage
              )}
            />
          </div>
        </>
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
