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
                      République <br /> Française
                    </p>
                  </div>
                  <div className="fr-header__logo">
                    <img
                      src="/images/cnam.png"
                      alt="CNAM"
                      width="200"
                      height="66"
                    />
                  </div>
                </div>
                <div className="fr-header__service">
                  <a href="/" title="Retour à l’accueil">
                    <p className="fr-header__service-title">MonPsy</p>
                  </a>
                  <p className="fr-header__service-tagline">
                    En parler, c’est déjà se soigner.
                  </p>
                </div>
              </div>
            </div>
            <div className="fr-header__menu fr-modal">
              <div className="fr-container">
                <button
                  title="Fermer"
                  className="fr-link--close fr-link"
                  type="button"
                  aria-label="fermer la navigation"
                >
                  Fermer
                </button>
                <nav
                  id="header-navigation"
                  className="fr-nav"
                  role="navigation"
                  aria-label="Menu principal"
                >
                  <ul className="fr-nav__list">
                    <li className="fr-nav__item">
                      <a href="/" target="_self" className="fr-nav__link">
                        Accueil
                      </a>
                    </li>
                    <li className="fr-nav__item">
                      <a
                        href="/patients"
                        target="_self"
                        className="fr-nav__link"
                      >
                        Je ne me sens pas bien
                      </a>
                    </li>
                    <li className="fr-nav__item">
                      <a
                        href="/psychologues"
                        target="_self"
                        className="fr-nav__link"
                      >
                        Je suis psychologue
                      </a>
                    </li>
                    <li className="fr-nav__item">
                      <a
                        href="/medecins"
                        target="_self"
                        className="fr-nav__link"
                      >
                        Je suis médecin
                      </a>
                    </li>
                    <li className="fr-nav__item">
                      <a href="/faq" target="_self" className="fr-nav__link">
                        Foire aux questions
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Nav;
