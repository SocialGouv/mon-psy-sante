import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="fr-footer" role="contentinfo">
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand">
            <a
              href="/"
              title="République Française"
              target="_self"
              className="ds-fr--no-shadow"
            >
              <p className="fr-logo">
                République
                <br />
                Française
              </p>
            </a>
          </div>
          <div className="fr-footer__brand-link">
            <img src="/images/cnam.png" alt="CNAM" width="200" height="66" />
          </div>
          <div className="fr-footer__content">
            <p className="fr-footer__content-desc">
              Le code source est ouvert et les contributions sont bienvenues.{" "}
              <a
                href="https://github.com/socialgouv/mon-psy-sante/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le code source
              </a>
              . Illustrations de{" "}
              <a
                href="https://storyset.com/work"
                target="_blank"
                rel="noreferrer nofollow noopener"
              >
                Freepik Storyset
              </a>
              .
            </p>
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <div className="fr-footer__content-link">
                  <a
                    href="https://solidarites-sante.gouv.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    solidarites-sante.gouv.fr
                  </a>
                </div>
              </li>
              <li className="fr-footer__content-item">
                <div className="fr-footer__content-link">
                  <a
                    href="https://www.ameli.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ameli.fr
                  </a>
                </div>
              </li>
              <li className="fr-footer__content-item">
                <div className="fr-footer__content-link">
                  <a
                    href="https://www.gouvernement.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    gouvernement.fr
                  </a>
                </div>
              </li>
              <li className="fr-footer__content-item">
                <div className="fr-footer__content-link">
                  <a
                    href="http://www.service-public.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    service-public.fr
                  </a>
                </div>
              </li>
              <li className="fr-footer__content-item">
                <div className="fr-footer__content-link">
                  <a
                    href="http://legifrance.gouv.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    legifrance.gouv.fr
                  </a>
                </div>
              </li>
              <li className="fr-footer__content-item">
                <div className="fr-footer__content-link">
                  <a
                    href="http://data.gouv.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    data.gouv.fr
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <a
                href="/mentions-legales#accessibilite"
                target="_self"
                className="fr-footer__bottom-link"
              >
                Accessibilité : non conforme
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                href="/mentions-legales"
                target="_self"
                className="fr-footer__bottom-link"
              >
                Mentions légales
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                href="/politique-de-confidentialite"
                target="_self"
                className="fr-footer__bottom-link"
              >
                Politique de confidentialité
              </a>
            </li>
            <li className="fr-footer__bottom-item">
              <a
                href="/contact"
                target="_self"
                className="fr-footer__bottom-link"
              >
                Nous contacter
              </a>
            </li>
          </ul>
        </div>
        <div className="fr-footer__bottom-copy">
          <p>
            Sauf mention contraire, tous les contenus de ce site sont sous{" "}
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
    </footer>
  );
};

export default Footer;
