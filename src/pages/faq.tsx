import { Col, Row, Tab, Tabs } from "@dataesr/react-dsfr";
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
                        <Accordion section={section} />
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

const Accordion = ({ section }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="fr-accordions-group fr-mb-4w">
      {section.faq.map(({ question, answer }, index) => (
        <section className="fr-accordion" key={question}>
          <h3 className="fr-accordion__title">
            <button
              className="fr-accordion__btn"
              aria-expanded={open === index}
              aria-controls={`accordion-${index}`}
              onClick={() => setOpen(open === index ? null : index)}
            >
              {question}
            </button>
          </h3>
          <div
            className={
              open === index
                ? "fr-collapse fr-collapse--expanded"
                : "fr-collapse"
            }
            id={`accordion-${index}`}
            style={{
              // @ts-ignore
              "--collapse": "0px",
              maxHeight: open === index ? "none" : null,
            }}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </section>
      ))}
    </div>
  );
};

export default Page;
