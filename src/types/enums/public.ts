export enum PUBLIC {
  ADULTES = "Adultes",
  ADULTES_ADOS = "Adultes et adolescents",
  ADULTES_ADOS_ENFANTS = "Adultes, adolescents et enfants",
  ENFANTS = "Enfants",
}

export const allPublicsFilters = [
  {
    value: PUBLIC.ADULTES_ADOS_ENFANTS,
    label: "Pas de filtre",
  },
  {
    value: PUBLIC.ADULTES_ADOS,
  },
  {
    value: PUBLIC.ADULTES,
  },
  {
    value: PUBLIC.ENFANTS,
  },
];

export const allPublics = Object.values(PUBLIC);
