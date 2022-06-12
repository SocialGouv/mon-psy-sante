import React from "react";

import { getPaginationLabels } from "../services/pagination";

export default function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  const paginationLabels = getPaginationLabels(page, totalPages);
  return (
    <nav role="navigation" className="fr-pagination" aria-label="Pagination">
      <ul className="fr-pagination__list">
        <li>
          <button
            className="fr-pagination__link fr-pagination__link--first"
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            Première page
          </button>
        </li>
        <li>
          <button
            className="fr-pagination__link fr-pagination__link--prev"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Page précédente
          </button>
        </li>
        {paginationLabels.map((label, index) => {
          if (label === "…") {
            return (
              <li
                key={index === 1 ? "left-separator" : "right-separator"}
                className="fr-pagination__link fr-displayed-lg"
              >
                …
              </li>
            );
          }
          const props = {};
          if (String(page) === label) props["aria-current"] = "page";
          return (
            <li key={label}>
              <button
                className="fr-pagination__link"
                {...props}
                title="Page 1"
                onClick={() => setPage(Number(label))}
              >
                {label}
              </button>
            </li>
          );
        })}
        <li>
          <button
            className="fr-pagination__link fr-pagination__link--next"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Page suivante
          </button>
        </li>
        <li>
          <button
            className="fr-pagination__link fr-pagination__link--last"
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
          >
            Dernière page
          </button>
        </li>
      </ul>
    </nav>
  );
}
