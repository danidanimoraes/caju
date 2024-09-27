import { render, screen } from "@testing-library/react";
import { ActionConfirmationModal } from ".";

const getButton = (name: string) =>
  screen.getByRole("button", { name: new RegExp(name, "i") });

describe("Modals/ActionConfirmationModal", () => {
  it("Should show modal with right verb", () => {
    const verb = "remover";
    const onClickCancel = jest.fn();
    const onClickConfirm = jest.fn();

    render(
      <ActionConfirmationModal
        verb={verb}
        onCancel={onClickCancel}
        onConfirm={onClickConfirm}
      />
    );

    expect(screen.getByText("Deseja mesmo remover?")).toBeInTheDocument();
    expect(getButton("cancelar")).toBeInTheDocument();
    expect(getButton("confirmar")).toBeInTheDocument();
  });

  it("Should click buttons", () => {
    const verb = "remover";
    const onClickCancel = jest.fn();
    const onClickConfirm = jest.fn();

    render(
      <ActionConfirmationModal
        verb={verb}
        onCancel={onClickCancel}
        onConfirm={onClickConfirm}
      />
    );

    expect(getButton("cancelar")).toBeInTheDocument();
    expect(getButton("confirmar")).toBeInTheDocument();

    expect(onClickCancel).not.toHaveBeenCalled();
    expect(onClickConfirm).not.toHaveBeenCalled();

    getButton("cancelar").click();

    expect(onClickCancel).toHaveBeenCalledTimes(1);
    expect(onClickConfirm).not.toHaveBeenCalled();

    getButton("confirmar").click();

    expect(onClickCancel).toHaveBeenCalledTimes(1);
    expect(onClickConfirm).toHaveBeenCalledTimes(1);
  });
});
