import React from "react";

export default function Breadcrumb({ page }: { page: string }) {
  return (
    <nav
      role="navigation"
      className="fr-breadcrumb"
      aria-label="vous êtes ici :"
    >
      <button
        className="fr-breadcrumb__button"
        aria-expanded="false"
        aria-controls="breadcrumb-1"
      >
        Voir le fil d’Ariane
      </button>
      <div className="fr-collapse" id="breadcrumb-1">
        <ol className="fr-breadcrumb__list">
          <li>
            <a className="fr-breadcrumb__link" href="/">
              Accueil
            </a>
          </li>
          <li>{page}</li>
        </ol>
      </div>
    </nav>
  );
}
