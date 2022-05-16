import Head from "next/head";
import { signOut } from "next-auth/react";
import React from "react";

const Header = () => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Admin - Edit psychologue</title>
    </Head>
    <div className="fr-container fr-my-1w">
      <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle">
        <div className="fr-col-2">
          <nav
            role="navigation"
            className="fr-breadcrumb"
            aria-label="vous êtes ici :"
          >
            <ol className="fr-breadcrumb__list">
              <li>
                <a
                  className="fr-breadcrumb__link"
                  href="/administration-annuaire"
                >
                  Admin
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="fr-col-2 fr-col-offset-8">
          <button
            className="fr-btn fr-btn--sm fr-btn--icon-right"
            title="Déconnexion"
            onClick={() => signOut()}
          >
            Déconnexion
            <img
              aria-hidden="true"
              alt=""
              className="fr-ml-1w"
              height="14"
              width="14"
              src="/images/icones/logout-circle.svg"
            />
          </button>
        </div>
      </div>
    </div>
  </>
);
export default Header;
