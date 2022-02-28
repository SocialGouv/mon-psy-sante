import axios from "axios";

export const AROUND_ME = "Autour de moi";
export const AROUND_ME_OPTION = [{ label: AROUND_ME, value: AROUND_ME }];

const searchCommunes = (
  filter: string,
  action: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >
) => {
  return axios
    .get(
      `https://geo.api.gouv.fr/communes?nom=${filter}&limit=10&fields=population,centre,departement,nom`
    )
    .then((response) => {
      const communes = response.data
        .sort((a, b) => b.population - a.population)
        .map((commune) => ({
          label: `${commune.nom}, ${commune.departement.nom}`,
          value: commune.centre.coordinates,
        }));
      action(communes.concat(AROUND_ME_OPTION));
    });
};

const getDepartment = (text: string): string => {
  if (!text || text.length < 2) {
    return null;
  }

  if (text.startsWith("971")) {
    return "971";
  }
  if (text.startsWith("972")) {
    return "972";
  }
  if (text.startsWith("973")) {
    return "973";
  }
  if (text.startsWith("974")) {
    return "974";
  }
  if (text.startsWith("976")) {
    return "976";
  }
  if (text.startsWith("20")) {
    return "2A|2B";
  }

  const number = +text.slice(0, 2);
  if (number > 0 && number < 96) {
    return text.slice(0, 2);
  }

  return null;
};

const searchDepartments = async (
  department: string,
  filter: string,
  action: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >
) => {
  const results = await Promise.all(
    department
      .split("|")
      .map((x) =>
        axios.get(
          `https://geo.api.gouv.fr/departements/${x}/communes?fields=population,centre,departement,nom,codesPostaux`
        )
      )
  );

  const communes = results
    .flatMap((result) => result.data)
    .flatMap((commune) =>
      commune.codesPostaux.map((codePostal) => ({
        centre: commune.centre,
        codePostal,
        departement: commune.departement,
        nom: commune.nom,
        population: commune.population,
      }))
    )
    .filter((commune) => commune.codePostal.startsWith(filter))
    .sort((a, b) => b.population - a.population)
    .map((commune) => {
      return {
        label: `${commune.nom}, ${commune.codePostal}, ${commune.departement.nom}`,
        value: `${commune.codePostal} ${commune.nom}`,
      };
    });

  action(
    communes
      .filter(
        (commune, index) =>
          communes.findIndex((x) => x.value === commune.value) === index
      )
      .concat(AROUND_ME_OPTION)
  );

  return Promise.resolve();
};

export const search = async (
  filter: string,
  action: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >
) => {
  if (filter) {
    if (isNaN(+filter)) {
      if (filter.length > 2 && filter !== AROUND_ME) {
        return searchCommunes(filter, action);
      }
      return Promise.resolve();
    }

    const department = getDepartment(filter);
    if (department) {
      return searchDepartments(department, filter, action);
    }
  }

  action(AROUND_ME_OPTION);
};
