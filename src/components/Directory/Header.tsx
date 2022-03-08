import axios from "axios";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [count, setCount] = useState();

  useEffect(() => {
    axios.get(`/api/psychologists/count`).then((response) => {
      setCount(response.data);
    });
  }, []);

  return (
    <div className="fr-mt-6w">
      <h1>Annuaire</h1>
      <h2>Trouver un psychologue partenaire près de chez soi</h2>
      <h3>
        {`Il y a actuellement ${count || "..."} partenaires du dispositif
        d'accompagnement.`}
      </h3>
      <p>
        La liste est mise à jour quotidiennement, revenez la consulter si vous
        n&lsquo;avez pas pu trouver de psychologue. Une fois muni(e) d’un
        courrier d’adressage signé par un médecin proposant une prise en charge
        psychologique, vous pourrez contacter un psychologue partenaire par
        téléphone ou via son site web. Il n’est pas possible de bénéficier d’un
        remboursement par l’Assurance Maladie sans ce courrier d’adressage. Le
        psychologue, que vous choisissez, peut exercer dans votre département ou
        dans un autre département, notamment dans le cas d&lsquo;un suivi à
        distance.
      </p>
    </div>
  );
};

export default Header;
