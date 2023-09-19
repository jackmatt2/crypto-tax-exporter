import { getAttribute, toCurrencyAmount, toSymbolPropper } from "./transformer";

describe("toSymbolPropper()", () => {
  it("should extract single unit currency symbol", () => {
    expect(toSymbolPropper("12345678uakt")).toBe("AKT");
    expect(toSymbolPropper("uakt")).toBe("AKT");
  });
});

describe("toSymbolCurrency()", () => {
  it("should extract single unit currency", () => {
    expect(toCurrencyAmount("12345678uakt")).toBe(12.345678);
  });

  it("should extract single unit currency based on denomination", () => {
    expect(toCurrencyAmount("12345678uakt", 100)).toBe(123456.78);
  });
});

describe("getAttribute()", () => {
  it("should extract value", () => {
    expect(
      getAttribute(
        [
          {
            key: "amount",
            value: "100uakt",
          },
        ],
        "amount"
      )
    ).toBe("100uakt");
  });

  it("should extract value from array > 1", () => {
    expect(
      getAttribute(
        [
          {
            key: "recipient",
            value: "xyz",
          },
          {
            key: "amount",
            value: "100uakt",
          },
        ],
        "amount"
      )
    ).toBe("100uakt");
  });

  it("should use empty string if not found", () => {
    expect(
      getAttribute(
        [
          {
            key: "amount",
            value: "100uakt",
          },
        ],
        "recipient"
      )
    ).toBe("");
  });
});
