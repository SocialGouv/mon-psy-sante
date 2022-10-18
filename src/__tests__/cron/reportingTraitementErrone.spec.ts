import {
  cpamOnly,
  notEligibleAccepted,
  notificationSelectionNotChecked,
  withoutInstructeurFB,
} from "../../cron/reportingTraitementErrone";
import { request } from "../../services/demarchesSimplifiees/request";
import { DSPsychologist } from "../../types/psychologist";

const INSTRUCTEUR_FB = "SW5zdHJ1Y3RldXItNjQzNjI=";
const DOSSIER_ELIGIBLE = "Q2hhbXAtMTg0NDM5NQ==";
const NOTIFICATION_SELECTION = "Q2hhbXAtMjMyMzA2Mg==";

jest.mock("../../services/demarchesSimplifiees/request");

describe("Cron import from DS", () => {
  function mockDSCall(psychologistsInDS: Partial<DSPsychologist>[]) {
    const mockRequest = <jest.Mock>request;
    mockRequest.mockImplementationOnce(() =>
      Promise.resolve({
        demarche: { dossiers: { nodes: psychologistsInDS, pageInfo: {} } },
      })
    );
  }

  describe("`cpamOnly()`: dossiers en construction with only CPAM instructeurs", () => {
    it("should filter out dossiers with no instructeurs", async () => {
      mockDSCall([
        {
          id: "1",
          instructeurs: [],
        },
      ]);
      expect(await cpamOnly()).toHaveLength(0);
    });

    it("should filter out dossiers with internal instructeurs and no CPAM instructeurs", async () => {
      mockDSCall([
        {
          id: "1",
          instructeurs: [
            { id: "SW5zdHJ1Y3RldXItNjExNTM=", email: "x@example.org" },
            { id: "SW5zdHJ1Y3RldXItNDk3NDI=", email: "y@example.org" },
          ],
        },
      ]);
      expect(await cpamOnly()).toHaveLength(0);
    });

    it("should filter out dossiers with internal instructeurs and CPAM instructeurs", async () => {
      mockDSCall([
        {
          id: "1",
          instructeurs: [
            { id: "SW5zdHJ1Y3RldXItNjExNTM=", email: "x@example.org" },
            { id: "xxxxxxx", email: "cpam@example.org" },
          ],
        },
      ]);
      expect(await cpamOnly()).toHaveLength(0);
    });

    it("should include dossiers with no internal instructeurs and one CPAM instructeurs", async () => {
      mockDSCall([
        {
          id: "1",
          instructeurs: [{ id: "xxxxxxx", email: "cpam@example.org" }],
        },
      ]);
      expect(await cpamOnly()).toHaveLength(1);
    });
    it("should include dossiers with no internal instructeurs and some CPAM instructeurs", async () => {
      mockDSCall([
        {
          id: "1",
          instructeurs: [
            { id: "xxxxxxx", email: "cpam@example.org" },
            { id: "yyyyyyy", email: "cpam2@example.org" },
          ],
        },
      ]);
      expect(await cpamOnly()).toHaveLength(1);
    });
  });

  describe("`notificationSelectionNotChecked()`: dossiers with no notification selection", () => {
    it("should filter out dossiers with notification selection checked", async () => {
      mockDSCall([
        {
          id: "1",
          annotations: [
            {
              id: NOTIFICATION_SELECTION,
              label: "Notification Sélection",
              stringValue: "oui",
            },
          ],
        },
      ]);
      expect(await notificationSelectionNotChecked()).toHaveLength(0);
    });
    it("should filter out dossiers where dossier elligible is not OUI or NON", async () => {
      mockDSCall([
        { id: "0", annotations: [] },
        {
          id: "1",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "peut-être",
            },
          ],
        },
        {
          id: "2",
          annotations: [
            {
              id: NOTIFICATION_SELECTION,
              label: "Notification Sélection",
              stringValue: "",
            },
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "peut-être",
            },
          ],
        },
      ]);
      expect(await notificationSelectionNotChecked()).toHaveLength(0);
    });

    it("should include dossiers with notification selection not checked and dossier elligible OUI or NON", async () => {
      mockDSCall([
        {
          id: "1",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "OUI",
            },
            {
              id: NOTIFICATION_SELECTION,
              label: "Notification Sélection",
              stringValue: "",
            },
          ],
        },
        {
          id: "2",
          annotations: [
            {
              id: NOTIFICATION_SELECTION,
              label: "Notification Sélection",
              stringValue: "",
            },
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "NON",
            },
          ],
        },
      ]);
      expect(await notificationSelectionNotChecked()).toHaveLength(2);
    });
  });

  describe("`notEligibleAccepted()`: dossiers accepted but not marked as eligible", () => {
    it("should filter out dossiers elligible = OUI", async () => {
      mockDSCall([
        {
          id: "1",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "oui",
            },
          ],
        },
      ]);
      expect(await notEligibleAccepted()).toHaveLength(0);
    });

    it("should include dossiers dossier elligible !== OUI", async () => {
      mockDSCall([
        {
          id: "1",
          annotations: [],
        },
        {
          id: "2",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "NON",
            },
          ],
        },
        {
          id: "2",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "quelque chose",
            },
          ],
        },
      ]);
      expect(await notEligibleAccepted()).toHaveLength(3);
    });
  });

  describe("`withoutInstructeurFB()`: dossiers en instruction elligible without FB as an inscructor", () => {
    it("should filter out dossiers where dossier elligible is not OUI or NON", async () => {
      mockDSCall([
        { id: "0", annotations: [] },
        {
          id: "1",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "peut-être",
            },
          ],
        },
      ]);
      expect(await withoutInstructeurFB()).toHaveLength(0);
    });
    it("should filter out dossiers where dossier elligible is OUI or NON and FB is an instructeur", async () => {
      mockDSCall([
        {
          id: "1",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "OUI",
            },
          ],
          instructeurs: [{ id: INSTRUCTEUR_FB, email: "x@example.org" }],
        },
        {
          id: "2",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "NON",
            },
          ],
          instructeurs: [
            { id: INSTRUCTEUR_FB, email: "x@example.org" },
            { id: "yyyyyyy", email: "y@example.org" },
          ],
        },
      ]);
      expect(await withoutInstructeurFB()).toHaveLength(0);
    });
    it("should include dossiers where dossier elligible is OUI or NON and FB is not an instructeur", async () => {
      mockDSCall([
        {
          id: "1",
          annotations: [
            {
              id: DOSSIER_ELIGIBLE,
              label: "Dossier elligible",
              stringValue: "OUI",
            },
          ],
          instructeurs: [{ id: "yyyyyyy", email: "y@example.org" }],
        },
      ]);
      expect(await withoutInstructeurFB()).toHaveLength(1);
    });
  });
});
