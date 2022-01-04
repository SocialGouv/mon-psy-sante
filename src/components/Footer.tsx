import React from "react";

const Footer = () => {
  return (
    <footer className="fr-footer fr-mt-2w" id="footer">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand">
            <a className="fr-logo" href="/" title="République française">
              <p className="fr-logo__title fr-mb-0">
                République <br />
                Française
              </p>
            </a>
          </div>
          <div className="fr-footer__brand">
            <a href="/" title="Accueil">
              <img src="/images/cpam.png" alt="CNAM" width="200" height="66" />
            </a>
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              Le code source est ouvert et les contributions sont bienvenues.{" "}
              <a
                title="Voir le code source"
                href="https://github.com/SocialGouv/mon-psy-sante"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le code source
              </a>
            </p>

            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  href="https://solidarites-sante.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  solidarites-sante.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  href="https://www.ameli.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ameli.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  href="https://beta.gouv.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  beta.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <a
                className="fr-footer__bottom-link"
                href="/mentions-legales#accessibilite"
              >
                Accessibilité: non conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a className="fr-footer__bottom-link" href="/mentions-legales">
                Mentions légales
              </a>
            </li>
          </ul>
          <div className="fr-footer__bottom-copy">
            <p>
              Sauf mention contraire, tous les textes de ce site sont sous{" "}
              <a
                href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                rel="noreferrer"
                target="_blank"
              >
                licence etalab-2.0
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
