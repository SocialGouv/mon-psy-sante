import Head from "next/head";

const Page = () => {
  return (
    <>
      <Head>
        <title>MonPsySanté pour les psychologues</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>Je suis psychologue</h1>
        <p className="fr-text--lead">
          Je souhaite m’informer sur le dispositif
        </p>
        <div>
          <div className="fr-mt-3w">
            <h2>MonPsySanté, c’est quoi ?</h2>
            <p>
              Destiné à toute personne en souffrance psychique d’intensité
              légère à modérée, le dispositif MonPsySanté permet d’apporter un
              soutien psychologique d’urgence grâce à l’implication des
              psychologues partenaires.
            </p>
            <p>
              Jusqu’à 8 séances chez un psychologue conventionné sont prises en
              charge par l’Assurance Maladie pour toute personne en souffrance
              psychique à partir de 3 ans, préalablement orientée par un
              médecin.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
