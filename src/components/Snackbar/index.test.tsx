import {
  Provider as ToastProvider,
  Viewport as ToastViewport,
} from "@radix-ui/react-toast";

import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { Snackbar } from ".";

describe("Snackbar", () => {
  it("Should show snackbar", () => {
    const title = "Meu título";
    const variant = "success";

    render(
      <ToastProvider>
        <ToastViewport />
        <Snackbar isOpen title={title} variant={variant} />
      </ToastProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should close snackbar", async () => {
    const title = "Meu título";
    const variant = "success";

    render(
      <ToastProvider>
        <ToastViewport />
        <Snackbar isOpen title={title} variant={variant} />
      </ToastProvider>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();

    act(() => screen.getByRole("button").click());

    await waitFor(() =>
      expect(screen.queryByText(title)).not.toBeInTheDocument()
    );
  });
});
