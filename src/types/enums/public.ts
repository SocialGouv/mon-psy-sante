export enum PUBLIC {
  ADULTES = "Adultes",
  ENFANTS = "Enfants/adolescents",
  BOTH = "Adultes et enfants/adolescents",
}

export const allPublicsFilters = [
  {
    value: "Adultes et enfants/adolescents",
    label: "Pas de filtre",
  },
  {
    value: "Adultes",
  },
  {
    value: "Enfants/adolescents",
  },
];

export const allPublics = Object.values(PUBLIC);
