import Link from "next/link";
import React, { useState } from "react";

const Nav = () => {
  const [modalMenuOpen, setModalMenuOpen] = useState(false);
  const items = [
    { title: "Accueil", href: "/" },
    { title: "Annuaire MonParcoursPsy", href: "/annuaire" },
    { title: "Psychologue", href: "/psychologues" },
    { title: "Médecin", href: "/medecins" },
    { title: "Foire aux questions", href: "/faq" },
  ];
  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top">
                <div className="fr-header__logo">
                  <p className="fr-logo">
                    <Link href="/">
                      <a title="Page d'accueil MonParcoursPsy" target="_self">
                        République
                        <br />
                        Française
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="fr-header__navbar">
                  <button
                    className="fr-btn--menu fr-btn"
                    onClick={() => setModalMenuOpen(true)}
                    data-fr-opened="false"
                    aria-controls="modal-main-nav"
                    aria-haspopup="menu"
                    title="Menu"
                    id="fr-btn-menu-mobile-4"
                  >
                    Menu
                  </button>
                </div>
                <div className="fr-header__operator">
                  <img
                    src="/images/cnam.png"
                    alt="Logo Caisse Nationale d'Assurance Maladie"
                    width="200"
                    height="66"
                  />
                </div>
              </div>
              <div className="fr-header__service">
                <p className="fr-header__service-title">MonParcoursPsy</p>
                <p className="fr-header__service-tagline">
                  En parler, c’est déjà se soigner.
                </p>
              </div>
            </div>
            <div className="fr-header__tools">
              <div className="fr-header__tools-links">
                <ul
                  className="fr-btns-group--inline fr-btns-group--right"
                  style={{ gap: "1rem" }}
                >
                  <li>
                    <Link href="/annuaire">
                      <a className="fr-link fr-fi-attachment-line fr-link--icon-left fr-mt-1v">
                        Annuaire MonParcoursPsy
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/psychologues">
                      <a className="fr-btn">Psychologues</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/medecins">
                      <a className="fr-btn">Médecins</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalMenuOpen && (
        <div
          className="fr-header__menu fr-modal fr-modal--opened"
          id="modal-main-nav"
          aria-labelledby="fr-btn-menu-mobile-4"
        >
          <div className="fr-container">
            <button
              className="fr-link--close fr-link"
              aria-controls="modal-main-nav"
              aria-label="Fermer le menu"
              onClick={() => setModalMenuOpen(false)}
            >
              Fermer
            </button>
            <div className="fr-header__menu-links" />
            <nav
              className="fr-nav"
              id="header-navigation"
              role="navigation"
              aria-label="Menu principal"
            >
              <ul className="fr-nav__list">
                {items.map((item, index) => (
                  <li className="fr-nav__item" key={item.title}>
                    <Link href={item.href}>
                      <a
                        className="fr-nav__link"
                        role="menuitem"
                        tabIndex={index + 1}
                        onKeyPress={() => {
                          setModalMenuOpen(false);
                        }}
                        onClick={() => {
                          setModalMenuOpen(false);
                        }}
                      >
                        {item.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
