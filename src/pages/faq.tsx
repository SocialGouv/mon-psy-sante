import {
  Accordion,
  AccordionItem,
  Col,
  Row,
  Tab,
  Tabs,
} from "@dataesr/react-dsfr";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import items from "../services/faq/faq";

const Page = () => {
  const router = useRouter();

  const getActiveTab = () => {
    const tab = router.query.tab;
    const index = items.findIndex((item) => item.key === tab);
    return index >= 0 ? index : 0;
  };

  return (
    <>
      <Head>
        <title>Foire aux questions MonPsy</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>Information sur le dispositif MonPsy</h1>
        <Row spacing="mt-3w">
          <Col>
            <Tabs defaultActiveTab={getActiveTab()}>
              {items.map((item) => (
                <Tab label={item.title} key={item.key}>
                  {item.title && <h2>{item.title}</h2>}
                  {item.sections.map((section, i) => (
                    <div key={i + item.title}>
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
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};

Page.getInitialProps = async () => ({});
export default Page;
