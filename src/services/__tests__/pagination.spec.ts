import { expect } from "@jest/globals";

import { getPaginationLabels } from "../pagination";

describe("getPagesButtons", () => {
  it("should work with 1 page", () => {
    const expected = ["1"];
    expect(getPaginationLabels(1, 1)).toStrictEqual(expected);
  });
  it("should work with 2 pages", () => {
    const expected = ["1", "2"];
    expect(getPaginationLabels(1, 2)).toStrictEqual(expected);
    expect(getPaginationLabels(2, 2)).toStrictEqual(expected);
  });
  it("should work with 3 pages", () => {
    const expected = ["1", "2", "3"];
    expect(getPaginationLabels(1, 3)).toStrictEqual(expected);
    expect(getPaginationLabels(2, 3)).toStrictEqual(expected);
    expect(getPaginationLabels(3, 3)).toStrictEqual(expected);
  });
  it("should work with 4 pages", () => {
    const expected = ["1", "2", "3", "4"];
    expect(getPaginationLabels(1, 4)).toStrictEqual(expected);
    expect(getPaginationLabels(2, 4)).toStrictEqual(expected);
    expect(getPaginationLabels(3, 4)).toStrictEqual(expected);
    expect(getPaginationLabels(4, 4)).toStrictEqual(expected);
  });
  it("should work with 5 pages", () => {
    const expected = ["1", "2", "3", "4", "5"];
    expect(getPaginationLabels(1, 5)).toStrictEqual(expected);
    expect(getPaginationLabels(2, 5)).toStrictEqual(expected);
    expect(getPaginationLabels(3, 5)).toStrictEqual(expected);
    expect(getPaginationLabels(4, 5)).toStrictEqual(expected);
    expect(getPaginationLabels(5, 5)).toStrictEqual(expected);
  });
  it("should work with 6 pages", () => {
    const expected = ["1", "2", "3", "4", "5", "6"];
    expect(getPaginationLabels(1, 6)).toStrictEqual(expected);
    expect(getPaginationLabels(2, 6)).toStrictEqual(expected);
    expect(getPaginationLabels(3, 6)).toStrictEqual(expected);
    expect(getPaginationLabels(4, 6)).toStrictEqual(expected);
    expect(getPaginationLabels(5, 6)).toStrictEqual(expected);
    expect(getPaginationLabels(6, 6)).toStrictEqual(expected);
  });
  it("should work with 7 pages", () => {
    const expected = ["1", "2", "3", "4", "5", "6", "7"];
    expect(getPaginationLabels(1, 7)).toStrictEqual(expected);
    expect(getPaginationLabels(2, 7)).toStrictEqual(expected);
    expect(getPaginationLabels(3, 7)).toStrictEqual(expected);
    expect(getPaginationLabels(4, 7)).toStrictEqual(expected);
    expect(getPaginationLabels(5, 7)).toStrictEqual(expected);
    expect(getPaginationLabels(6, 7)).toStrictEqual(expected);
    expect(getPaginationLabels(7, 7)).toStrictEqual(expected);
  });
  it("should work with 8 pages", () => {
    const expectedForFirstPages = ["1", "2", "3", "4", "5", "…", "8"];
    expect(getPaginationLabels(1, 8)).toStrictEqual(expectedForFirstPages);
    expect(getPaginationLabels(2, 8)).toStrictEqual(expectedForFirstPages);
    expect(getPaginationLabels(3, 8)).toStrictEqual(expectedForFirstPages);
    const expectedForMiddlePage = ["1", "2", "3", "4", "5", "6", "7", "8"];
    expect(getPaginationLabels(4, 8)).toStrictEqual(expectedForMiddlePage);
    expect(getPaginationLabels(5, 8)).toStrictEqual(expectedForMiddlePage);
    const expectedForLastPages = ["1", "…", "4", "5", "6", "7", "8"];
    expect(getPaginationLabels(6, 8)).toStrictEqual(expectedForLastPages);
    expect(getPaginationLabels(7, 8)).toStrictEqual(expectedForLastPages);
    expect(getPaginationLabels(8, 8)).toStrictEqual(expectedForLastPages);
  });
  it("should work with 10 pages", () => {
    const expectedForFirstPages = ["1", "2", "3", "4", "5", "…", "10"];
    expect(getPaginationLabels(1, 10)).toStrictEqual(expectedForFirstPages);
    expect(getPaginationLabels(2, 10)).toStrictEqual(expectedForFirstPages);
    expect(getPaginationLabels(3, 10)).toStrictEqual(expectedForFirstPages);
    const expectedForPage4 = ["1", "2", "3", "4", "5", "6", "…", "10"];
    expect(getPaginationLabels(4, 10)).toStrictEqual(expectedForPage4);
    const expectedForPage5 = ["1", "2", "3", "4", "5", "6", "7", "…", "10"];
    expect(getPaginationLabels(5, 10)).toStrictEqual(expectedForPage5);
    const expectedForPage6 = ["1", "…", "4", "5", "6", "7", "8", "9", "10"];
    expect(getPaginationLabels(6, 10)).toStrictEqual(expectedForPage6);
    const expectedForPage7 = ["1", "…", "5", "6", "7", "8", "9", "10"];
    expect(getPaginationLabels(7, 10)).toStrictEqual(expectedForPage7);
    const expectedForLastPages = ["1", "…", "6", "7", "8", "9", "10"];
    expect(getPaginationLabels(8, 10)).toStrictEqual(expectedForLastPages);
    expect(getPaginationLabels(9, 10)).toStrictEqual(expectedForLastPages);
    expect(getPaginationLabels(10, 10)).toStrictEqual(expectedForLastPages);
  });
  it("should work with 100 pages", () => {
    const expectedForFirstPages = ["1", "2", "3", "4", "5", "…", "100"];
    expect(getPaginationLabels(1, 100)).toStrictEqual(expectedForFirstPages);
    expect(getPaginationLabels(2, 100)).toStrictEqual(expectedForFirstPages);
    expect(getPaginationLabels(3, 100)).toStrictEqual(expectedForFirstPages);
    const expectedForPage4 = ["1", "2", "3", "4", "5", "6", "…", "100"];
    expect(getPaginationLabels(4, 100)).toStrictEqual(expectedForPage4);
    const expectedForPage5 = ["1", "2", "3", "4", "5", "6", "7", "…", "100"];
    expect(getPaginationLabels(5, 100)).toStrictEqual(expectedForPage5);
    const expectedForPage6 = ["1", "…", "4", "5", "6", "7", "8", "…", "100"];
    expect(getPaginationLabels(6, 100)).toStrictEqual(expectedForPage6);
    const expectedForPage7 = ["1", "…", "5", "6", "7", "8", "9", "…", "100"];
    expect(getPaginationLabels(7, 100)).toStrictEqual(expectedForPage7);
    const expectedForPage50 = [
      "1",
      "…",
      "48",
      "49",
      "50",
      "51",
      "52",
      "…",
      "100",
    ];
    expect(getPaginationLabels(50, 100)).toStrictEqual(expectedForPage50);
    const expectedForPage97 = ["1", "…", "95", "96", "97", "98", "99", "100"];
    expect(getPaginationLabels(97, 100)).toStrictEqual(expectedForPage97);
    const expectedForLastPages = ["1", "…", "96", "97", "98", "99", "100"];
    expect(getPaginationLabels(98, 100)).toStrictEqual(expectedForLastPages);
    expect(getPaginationLabels(99, 100)).toStrictEqual(expectedForLastPages);
    expect(getPaginationLabels(100, 100)).toStrictEqual(expectedForLastPages);
  });
});
