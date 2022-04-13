/* eslint-disable jest/no-conditional-expect */
import { assert, stub } from "sinon";

import { AROUND_ME, AROUND_ME_OPTION, searchCity } from "../frontend/geo.api";

describe("service geo.api", () => {
  let actionStub;

  beforeEach(() => {
    actionStub = stub();
  });

  const testsCases = [
    {
      case: "Par",
      label: "should search by communes ordered by name if not a number",
      results: [
        { label: "Parcey, Jura", value: [5.4768, 47.0221] },
        { label: "Parent, Puy-de-Dôme", value: [3.2282, 45.6243] },
        { label: "Paraza, Aude", value: [2.8133, 43.2561] },
        { label: "Parlan, Cantal", value: [2.171, 44.8213] },
        { label: "Parnes, Oise", value: [1.7459, 49.1991] },
        { label: "Parroy, Meurthe-et-Moselle", value: [6.6107, 48.6733] },
        { label: "Parzac, Charente", value: [0.4221, 45.9264] },
        { label: "Parux, Meurthe-et-Moselle", value: [6.922, 48.5429] },
        { label: "Paréac, Hautes-Pyrénées", value: [0.0202, 43.1159] },
        { label: "Parata, Haute-Corse", value: [9.4174, 42.3658] },
        ...AROUND_ME_OPTION,
      ],
    },
    {
      case: "Pa",
      label: "should not search by communes if less than 3 chars",
      results: null,
    },
    {
      case: AROUND_ME,
      label: "should not search by communes if search around me",
      results: null,
    },
    {
      case: "933",
      label: "should search by department ordered by population",
      results: [
        {
          label: "Aubervilliers, 93300, Seine-Saint-Denis",
          value: "93300 Aubervilliers",
        },
        {
          label: "Neuilly-sur-Marne, 93330, Seine-Saint-Denis",
          value: "93330 Neuilly-sur-Marne",
        },
        {
          label: "Pierrefitte-sur-Seine, 93380, Seine-Saint-Denis",
          value: "93380 Pierrefitte-sur-Seine",
        },
        {
          label: "Clichy-sous-Bois, 93390, Seine-Saint-Denis",
          value: "93390 Clichy-sous-Bois",
        },
        {
          label: "Montfermeil, 93370, Seine-Saint-Denis",
          value: "93370 Montfermeil",
        },
        {
          label: "Les Pavillons-sous-Bois, 93320, Seine-Saint-Denis",
          value: "93320 Les Pavillons-sous-Bois",
        },
        {
          label: "Neuilly-Plaisance, 93360, Seine-Saint-Denis",
          value: "93360 Neuilly-Plaisance",
        },
        {
          label: "Le Pré-Saint-Gervais, 93310, Seine-Saint-Denis",
          value: "93310 Le Pré-Saint-Gervais",
        },
        {
          label: "Le Bourget, 93350, Seine-Saint-Denis",
          value: "93350 Le Bourget",
        },
        {
          label: "Le Raincy, 93340, Seine-Saint-Denis",
          value: "93340 Le Raincy",
        },
        ...AROUND_ME_OPTION,
      ],
    },
    {
      case: "20200",
      label: "should search for corsica department",
      results: [
        { label: "Bastia, 20200, Haute-Corse", value: "20200 Bastia" },
        {
          label: "Ville-di-Pietrabugno, 20200, Haute-Corse",
          value: "20200 Ville-di-Pietrabugno",
        },
        {
          label: "San-Martino-di-Lota, 20200, Haute-Corse",
          value: "20200 San-Martino-di-Lota",
        },
        {
          label: "Santa-Maria-di-Lota, 20200, Haute-Corse",
          value: "20200 Santa-Maria-di-Lota",
        },
        ...AROUND_ME_OPTION,
      ],
    },
    {
      case: "97260",
      label: "should search for DOM department",
      results: [
        {
          label: "Le Morne-Rouge, 97260, Martinique",
          value: "97260 Le Morne-Rouge",
        },
        ...AROUND_ME_OPTION,
      ],
    },
  ];

  testsCases.forEach((testCase) => {
    // eslint-disable-next-line jest/valid-title
    it(testCase.label, async () => {
      await searchCity(testCase.case, actionStub)
        .then(() => {
          testCase.results
            ? actionStub.calledWithMatch((result) => {
                expect(result).toEqual(testCase.results);
              })
            : assert.notCalled(actionStub);
        })
        .catch((e) => {
          console.log(e);
          expect(true).toBe(false);
        });
    });
  });

  it("should remove duplicates when searching by department", async () => {
    await searchCity("69", actionStub)
      .then(() => {
        actionStub.calledWithMatch((result) => {
          expect(result.length).toEqual(279);
          expect(result[0]).toEqual({
            label: "Lyon, 69001, Rhône",
            value: "69001 Lyon",
          });
        });
      })
      .catch((e) => {
        console.log(e);
        expect(true).toBe(false);
      });
  });

  it("should default to around me", async () => {
    await searchCity("17 rue de n'importe quoi", actionStub)
      .then(() => {
        actionStub.calledWithMatch((result) => {
          expect(result).toEqual(AROUND_ME_OPTION);
        });
      })
      .catch((e) => {
        console.log(e);
        expect(true).toBe(false);
      });
  });
});
