export const zip = <T, U>(array1: T[], array2: U[]): [T, U][] =>
  array1.map((value, i) => [value, array2[i]]);
