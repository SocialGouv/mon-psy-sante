import { expect } from "@jest/globals";
import { SafeParseReturnType } from "zod";
import { SafeParseError } from "zod/lib/types";

import {
  candidateIsNotAPsychologistMessage,
  CandidatePsychologist,
  emailIsInvalidMessage,
  psychologistFirstNameDoesNotMatchMessage,
  psychologistLastNameDoesNotMatchMessage,
  validatePsychologist,
  ValidationAdeliData,
} from "../demarchesSimplifiees/validate-psychologist";

describe("validatePsychologist", () => {
  const validPsychologist: CandidatePsychologist = {
    lastName: "Smet",
    firstName: "Jean-Philippe",
    email: "jean-philippe-smet@sante.gouv.fr",
  };

  const adeliData: ValidationAdeliData = {
    "Nom d'exercice": "Smet",
    "Prénom d'exercice": "Jean-Philippe",
    "Code profession": "93",
  };

  function assertIsValidationError(
    validation: SafeParseReturnType<any, any>
  ): asserts validation is SafeParseError<any> {
    expect(validation.success).toBe(false);
  }

  it("should error when lastName is invalid", () => {
    const invalidPsychologist: CandidatePsychologist = {
      ...validPsychologist,
      lastName: "Hallyday",
    };

    const validation = validatePsychologist(invalidPsychologist, [adeliData]);

    assertIsValidationError(validation);

    expect(validation.error.issues[0]?.message).toEqual(
      psychologistLastNameDoesNotMatchMessage("Hallyday", "Smet")
    );
  });

  it("should succeed when lastName is similar", () => {
    const similarPsychologist: CandidatePsychologist = {
      ...validPsychologist,
      lastName: "SMET",
    };

    const { success } = validatePsychologist(similarPsychologist, [adeliData]);
    expect(success).toBe(true);
  });

  it("should error when firstName is invalid", () => {
    const invalidPsychologist: CandidatePsychologist = {
      ...validPsychologist,
      firstName: "Johnny",
    };

    const validation = validatePsychologist(invalidPsychologist, [adeliData]);

    assertIsValidationError(validation);

    expect(validation.error.issues[0]?.message).toEqual(
      psychologistFirstNameDoesNotMatchMessage("Johnny", "Jean-Philippe")
    );
  });

  it("should succeed when firstName is similar", () => {
    const similarPsychologist: CandidatePsychologist = {
      ...validPsychologist,
      firstName: "jéan philippe",
    };

    const { success } = validatePsychologist(similarPsychologist, [adeliData]);

    expect(success).toBe(true);
  });

  it("should fail when Code Profession is not psychologist", () => {
    const invalidAdeliData: ValidationAdeliData[] = [
      {
        ...adeliData,
        "Code profession": "97",
      },
    ];

    const validation = validatePsychologist(
      validPsychologist,
      invalidAdeliData
    );

    assertIsValidationError(validation);

    expect(validation.error.issues[0]?.message).toBe(
      candidateIsNotAPsychologistMessage("97")
    );
  });

  it("should error when email is invalid", () => {
    const invalidPsychologist: CandidatePsychologist = {
      ...validPsychologist,
      email: "jean-philippe@test",
    };

    const validation = validatePsychologist(invalidPsychologist, [adeliData]);

    assertIsValidationError(validation);

    expect(validation.error.issues[0]?.message).toEqual(
      emailIsInvalidMessage("jean-philippe@test")
    );
  });

  it("should work if one adeli data is ok", () => {
    const adeliDatas: ValidationAdeliData[] = [
      adeliData,
      {
        "Prénom d'exercice": "Autre",
        "Nom d'exercice": "Autre",
        "Code profession": "72",
      },
    ];

    const { success } = validatePsychologist(validPsychologist, adeliDatas);

    expect(success).toBe(true);
  });

  it("should return the minimal error case if no adeli data is ok", () => {
    const adeliDatas: ValidationAdeliData[] = [
      {
        ...adeliData,
        "Prénom d'exercice": "Autre",
        "Code profession": "73",
      },
      {
        "Prénom d'exercice": "Autre",
        "Nom d'exercice": "Autre",
        "Code profession": "72",
      },
      {
        ...adeliData,
        "Code profession": "72",
      },
    ];

    const validation = validatePsychologist(validPsychologist, adeliDatas);

    assertIsValidationError(validation);

    expect(validation.error.issues[0]?.message).toEqual(
      candidateIsNotAPsychologistMessage("73")
    );
  });
});
