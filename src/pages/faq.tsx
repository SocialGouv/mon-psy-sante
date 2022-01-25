import Head from "next/head";
import {
  Accordion,
  AccordionItem,
  Col,
  Row,
  SideMenu,
  SideMenuLink,
} from "@dataesr/react-dsfr";
import items from "../services/faq/faq";

const Page = () => {
  return (
    <>
      <Head>
        <title>Foire aux questions MonPsySanté</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>Information sur le dispositif MonPsySanté</h1>
        <p className="fr-text--lead">
          Je souhaite m’informer sur le dispositif
        </p>
        <p>
          La santé mentale constitue l’un des enjeux majeurs de santé publique.
          MonPsySanté s’adresse à toute la population dès l’âge de 3 ans,
          résidant en France et présentant des troubles anxieux ou dépressifs
          légers à modérés. Sur adressage d’un médecin, enfants comme adultes
          pourront bénéficier de séances d’accompagnement par des psychologues
          partenaires du dispositifet dont la prise en charge sera assurée par
          l’Assurance Maladie avec la participation des organismes
          complémentaires.
        </p>
        <Row spacing="mt-3w">
          <SideMenu
            buttonLabel="Dans cette rubrique"
            className="fr-sidemenu--sticky fr-col-md-4 fr-col-sm-12 fr-mb-3w"
          >
            {Object.keys(items).map(
              (key) =>
                items[key].title && (
                  <SideMenuLink href={"/faq#" + key}>
                    {items[key].title}
                  </SideMenuLink>
                )
            )}
          </SideMenu>
          <Col n="md-8 sm-12">
            {Object.keys(items).map((key) => (
              <div id={key}>
                {items[key].title && <h2>{items[key].title}</h2>}
                {items[key].sections.map((section) => (
                  <div>
                    {section.title && <h3>{section.title}</h3>}
                    <Accordion className="fr-mb-4w">
                      {section.faq.map((question) => (
                        <AccordionItem title={question.q}>
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: question.r,
                            }}
                          />
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Page;
