import { render, screen } from "@testing-library/react";
import Button from ".";

const getButton = (name: string) =>
  screen.getByRole("button", { name: new RegExp(name, "i") });

describe("Button", () => {
  it("Should show button", () => {
    render(<Button>Ativar</Button>);

    expect(getButton("ativar")).toBeInTheDocument();
    expect(getButton("ativar")).toBeEnabled();
  });

  it("Should click", () => {
    const clickFn = jest.fn();
    render(<Button onClick={clickFn}>Ativar</Button>);

    expect(clickFn).not.toHaveBeenCalled();
    getButton("ativar").click();
    expect(clickFn).toHaveBeenCalledTimes(1);
  });
});
