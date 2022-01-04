import React from "react";

const Nav = () => {
  return (
    <>
      <header role="banner" className="fr-header">
        <div className="fr-header__body">
          <div className="fr-container">
            <div className="fr-header__body-row">
              <div className="fr-header__brand fr-enlarge-link">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo">
                    <p className="fr-logo">
                      République
                      <br />
                      Française
                    </p>
                  </div>
                  <div className="fr-header__logo">
                    <img
                      src="/images/cpam.png"
                      alt="CNAM"
                      width="200"
                      height="66"
                    />
                  </div>
                </div>
                <div className="fr-header__service">
                  <a href="/" title="Retour à l’accueil">
                    <p className="fr-header__service-title">MonPsySanté</p>
                  </a>
                  <p className="fr-header__service-tagline">
                    En parler, c’est déjà se soigner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
