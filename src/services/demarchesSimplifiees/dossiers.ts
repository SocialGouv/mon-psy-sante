import { DSPsychologist } from "../../types/psychologist";

const filterDossiersToVerif = (
  dossiers: DSPsychologist[]
): DSPsychologist[] => {
  return dossiers.filter((psychologist) => {
    return psychologist.annotations.find(
      (annotation) =>
        annotation.label === "Conclusions Vérifications automatiques" &&
        annotation.stringValue !== ""
    );
  });
};
export default filterDossiersToVerif;
