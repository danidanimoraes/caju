import { render, screen } from "@testing-library/react";
import { TextField } from ".";

describe("Textfield", () => {
  it("Should show text with label", () => {
    const id = "meu-id";
    const label = "Meu label";
    const value = "Meu value";
    render(<TextField id={id} label={label} value={value} />);

    expect(screen.getByLabelText(label)).toHaveValue(value);
    expect(screen.queryByTestId(`error-${id}`)).not.toBeInTheDocument;
  });

  it("Should show error", () => {
    const id = "meu-id";
    const label = "Meu label";
    const value = "Meu value";
    const error = "Meu erro";
    render(<TextField id={id} label={label} value={value} error={error} />);

    expect(screen.getByLabelText(label)).toHaveValue(value);
    expect(screen.queryByTestId(`error-${id}`)).toHaveTextContent(error);
  });
});
