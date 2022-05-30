import Head from "next/head";
import { signOut } from "next-auth/react";
import React from "react";
import Link from "next/link";

function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav
      role="navigation"
      className="fr-breadcrumb"
      aria-label="vous êtes ici :"
    >
      <ol className="fr-breadcrumb__list">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            {index === breadcrumbs.length - 1 ? (
              breadcrumb.text
            ) : (
              <Link href={breadcrumb.link}>
                <a className="fr-breadcrumb__link">{breadcrumb.text}</a>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const Header = ({
  breadcrumbs = [{ link: "/administration-annuaire", text: "Admin" }],
}) => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Admin - Edit psychologue</title>
    </Head>
    <div className="fr-container fr-my-1w">
      <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle">
        <div className="fr-col-2">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
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
