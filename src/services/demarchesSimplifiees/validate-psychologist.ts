import { SafeParseReturnType, z, ZodIssue } from "zod";
import { SafeParseError } from "zod/lib/types";

import { AdeliData } from "../../types/adeli";
import { Psychologist } from "../../types/psychologist";
import { areSimilar, firstWordAreSimilar } from "../../utils/string";

export type CandidatePsychologist = Pick<
  Psychologist,
  "lastName" | "firstName" | "email"
>;
export type ValidationAdeliData = Pick<
  AdeliData,
  "Nom d'exercice" | "Prénom d'exercice" | "Code profession"
>;

const CODE_PROFESSION_PSYCHOLOGIST = "93";

const baseComparator = (value1: string, value2: string) => value1 === value2;

const validateWithAdeliData = ({
  adeliData,
  message,
  adeliField,
  compare = baseComparator,
}: {
  adeliData: ValidationAdeliData[];
  message: (fieldValue: string, adeliDataFieldValue: string) => string;
  adeliField: keyof ValidationAdeliData;
  compare?: (value1: string, value2: string) => boolean;
}) =>
  z.string().refine(
    (lastName) =>
      adeliData.some((data) => compare(lastName, data?.[adeliField])),
    (lastName) => ({
      message: message(lastName, adeliData[0][adeliField]),
    })
  );

const adeliDataValidator = z.object({
  "Code profession": z.literal(CODE_PROFESSION_PSYCHOLOGIST, {
    errorMap: (issue, ctx) => {
      return {
        message: candidateIsNotAPsychologistMessage(ctx.data),
      };
    },
  }),
});

const getMinimalErrorCase = <T, U>(
  validations: SafeParseReturnType<T, U>[]
): ZodIssue[] =>
  validations
    .filter(
      <T, U>(
        validation: z.SafeParseReturnType<T, U>
      ): validation is SafeParseError<T> => !validation.success
    )
    .map((validation) => validation.error.issues)
    .reduce((minIssues, issues) =>
      issues.length < minIssues.length ? issues : minIssues
    );

export const validatePsychologist = (
  psychologist: CandidatePsychologist,
  adeliData: ValidationAdeliData[]
) => {
  return z
    .object({
      psychologist: z.object({
        lastName: validateWithAdeliData({
          adeliData,
          message: psychologistLastNameDoesNotMatchMessage,
          adeliField: "Nom d'exercice",
          compare: areSimilar,
        }),
        firstName: validateWithAdeliData({
          adeliData,
          message: psychologistFirstNameDoesNotMatchMessage,
          adeliField: "Prénom d'exercice",
          compare: firstWordAreSimilar,
        }),
        email: z.string().email(emailIsInvalidMessage(psychologist.email)),
      }),
      adeliData: z.array(z.any()).superRefine((data, ctx) => {
        const validations = data.map((data) =>
          adeliDataValidator.safeParse(data)
        );

        if (validations.some((validations) => validations.success)) {
          return;
        }

        getMinimalErrorCase(validations).forEach((issue) =>
          ctx.addIssue(issue)
        );
      }),
    })
    .safeParse({ psychologist, adeliData });
};

export const psychologistLastNameDoesNotMatchMessage = (
  candidateName: string,
  targetName: string
) =>
  `Le nom de famille déclaré (${candidateName}) ne correspond pas au nom associé au numéro ADELI (${targetName})`;

export const psychologistFirstNameDoesNotMatchMessage = (
  candidateName: string,
  targetName: string
) =>
  `Le prénom déclaré (${candidateName}) ne correspond pas au nom associé au numéro ADELI (${targetName})`;

export const candidateIsNotAPsychologistMessage = (code) =>
  `Le numéro ADELI du candidat n'est pas associé à un psychologue (code profession : ${code})`;

export const emailIsInvalidMessage = (email) =>
  `L'email renseigné (${email}) n'est pas valide`;
