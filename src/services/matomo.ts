import { push } from "@socialgouv/matomo-next";

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

export function trackEventClickOnPsychologistCard({
  psychologistId,
}: {
  psychologistId: number;
}) {
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
  publicType: boolean;
  teleconsultation: boolean;
}) {
  push([
    "trackEvent",
    Category.Directory,
    Action.Search,
    "",
    "",
    {
      [d(Dimension.SearchDepartment)]: department,
      [d(Dimension.SearchPublic)]: publicType,
      [d(Dimension.SearchTeleconsultation)]: teleconsultation ? "1" : "0",
    },
  ]);
}
