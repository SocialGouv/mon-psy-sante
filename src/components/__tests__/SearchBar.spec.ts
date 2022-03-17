import { filterOptions } from "../Directory/SearchBar";

describe("SearchBar", () => {
  it.each`
    text          | text2         | result
    ${"same"}     | ${"same"}     | ${true}
    ${"same"}     | ${"diffrent"} | ${false}
    ${"samé"}     | ${"same"}     | ${true}
    ${"sàme"}     | ${"same"}     | ${true}
    ${"  same  "} | ${"same"}     | ${true}
    ${"sa-me"}    | ${"same"}     | ${true}
    ${"sa'me"}    | ${"same"}     | ${true}
    ${"sàme"}     | ${"sme"}      | ${false}
  `("compare $text $text2", async ({ text, text2, result }) => {
    expect(filterOptions(text, { label: text2 })).toEqual(result);
  });
});
