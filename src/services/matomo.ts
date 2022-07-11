import { push } from "@socialgouv/matomo-next";

import { PUBLIC } from "../types/enums/public";

/*

# TODO

[x] Ouverture du site (via tracking auto de navigation)
[x] Clique sur le bouton annuaire (via tracking auto de navigation)
[x] Lancement d’une requête
[x] Ouverture d’une carte de psy
[x] Ouverture de plus d’une carte psy
[x] Pourcentage de requête pour les enfants&ado
[x] recherche par département
[x] pour entretien à distance

*/

enum Dimension {
  SearchDepartment = 1,
  SearchPublic = 2,
  SearchTeleconsultation = 3,
}

enum Category {
  Directory = "DIRECTORY",
}

enum Action {
  Search = "SEARCH",
  ClickOnPsychologistCard = "CLICK_ON_PSYCHOLOGIST_CARD",
}

function d(d: Dimension) {
  return `dimension${d}`;
}

export function trackEventClickOnPsychologistCard({ psychologistId }) {
  push([
    "trackEvent",
    Category.Directory,
    Action.ClickOnPsychologistCard,
    "psychologistId",
    psychologistId,
  ]);
}

export function trackEventDirectorySearch({
  department,
  publicType,
  teleconsultation,
}: {
  department: string;
  publicType: PUBLIC;
  teleconsultation: boolean;
}) {
  push([
    "trackEvent",
    Category.Directory,
    Action.Search,
    null,
    null,
    {
      [d(Dimension.SearchDepartment)]: department,
      [d(Dimension.SearchPublic)]: publicType,
      [d(Dimension.SearchTeleconsultation)]: teleconsultation ? "1" : "0",
    },
  ]);
}
