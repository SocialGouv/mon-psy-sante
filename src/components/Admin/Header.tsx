import Head from "next/head";
import { signOut } from "next-auth/react";
import React from "react";

const Header = () => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
      <title>Admin - Edit psychologue</title>
    </Head>
    <div className="fr-container fr-my-1w align-right">
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
  </>
);
export default Header;
