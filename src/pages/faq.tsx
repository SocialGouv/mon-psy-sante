import {
  Accordion,
  AccordionItem,
  Col,
  Row,
  SideMenu,
  SideMenuLink,
} from "@dataesr/react-dsfr";
import Head from "next/head";
import React from "react";

import items from "../services/faq/faq";

const Page = () => {
  return (
    <>
      <Head>
        <title>Foire aux questions MonPsy</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>Information sur le dispositif MonPsy</h1>
        <Row spacing="mt-3w">
          <SideMenu
            buttonLabel="Dans cette rubrique"
            className="fr-sidemenu--sticky fr-col-md-4 fr-col-sm-12 fr-mb-3w"
          >
            {items.map(
              (item) =>
                item.title && (
                  <SideMenuLink href={"/faq#" + item.key}>
                    {item.title}
                  </SideMenuLink>
                )
            )}
          </SideMenu>
          <Col n="md-8 sm-12">
            {items.map((item) => (
              <div id={item.key} key={item.key}>
                {item.title && <h2>{item.title}</h2>}
                {item.sections.map((section) => (
                  <div key={section.title}>
                    {section.title && <h3>{section.title}</h3>}
                    <Accordion className="fr-mb-4w">
                      {section.faq.map(({ question, answer }) => (
                        <AccordionItem title={question} key={question}>
                          <div
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{
                              __html: answer,
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