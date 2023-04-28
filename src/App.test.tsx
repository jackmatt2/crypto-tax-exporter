import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("renders", () => {
    render(<App />);

    expect(screen.getByLabelText("Export Format")).toBeEnabled();
    expect(screen.getByLabelText("Asset")).toBeInTheDocument();
    expect(screen.getByLabelText("Provider")).toBeInTheDocument();
    expect(screen.getByLabelText("Wallet Address *")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download" })).toBeDisabled();
  });
});
