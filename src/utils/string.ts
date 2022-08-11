const simplify = (value: string): string =>
  value
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
    .normalize("NFD")
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[ -]/g, "")
    .toLowerCase();

export const areSimilar = (value1: string, value2: string): boolean =>
  simplify(value1) === simplify(value2);

export const firstWordAreSimilar = (
  value1: string,
  value2: string
): boolean => {
  const [firstWord1] = value1.split(/[ -]/);
  const [firstWord2] = value2.split(/[ -]/);

  return areSimilar(firstWord1, firstWord2);
};
