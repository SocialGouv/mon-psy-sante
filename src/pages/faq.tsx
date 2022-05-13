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
import React, { useEffect, useState } from "react";

import items from "../services/faq/faq";

const Page = () => {
  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(-1);

  useEffect(() => {
    if (!router.isReady) return;
    const tab = router.query.tab;
    const index = items.findIndex((item) => item.key === tab);
    setTabIndex(index >= 0 ? index : 0);
  }, [router.isReady, router.query.tab]);

  return (
    <>
      <Head>
        <title>Foire aux questions MonPsy</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>Information sur le dispositif MonPsy</h1>
        <Row spacing="mt-3w">
          <Col>
            {tabIndex >= 0 && (
              <Tabs defaultActiveTab={tabIndex}>
                {items.map((item) => (
                  //@ts-ignore
                  <Tab label={item.title} key={item.key}>
                    {item.title && <h2>{item.title}</h2>}
                    {item.documents && (
                      <div className="fr-mb-2w">
                        {item.documents.map((doc) => (
                          <a
                            key={item.title}
                            className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                            target="_blank"
                            href={doc.url}
                            rel="noreferrer"
                          >
                            {doc.title}
                          </a>
                        ))}
                      </div>
                    )}
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
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Page;
