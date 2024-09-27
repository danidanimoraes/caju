import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { RegistrationStatus } from "~/interfaces";
import { RegistrationCard } from ".";

const getButton = (name: string) =>
  screen.queryByRole("button", { name: new RegExp(name, "i") });

const registration = {
  id: "1",
  employeeName: "José Cruz",
  admissionDate: "17/09/2023",
  cpf: "32334485933",
  email: "josecruz@caju.com",
  status: "APPROVED" as RegistrationStatus,
};

const queryClient = new QueryClient();

describe("Dashboard/RegistrationCard", () => {
  it("Should show card info", () => {
    const onChangeStatus = jest.fn();
    const onDelete = jest.fn();

    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <RegistrationCard
          data={registration}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </QueryClientProvider>
    );

    expect(screen.queryByText(registration.id)).not.toBeInTheDocument();
    expect(screen.queryByText(registration.employeeName)).toBeInTheDocument();
    expect(screen.queryByText(registration.email)).toBeInTheDocument();
    expect(screen.queryByText(registration.cpf)).not.toBeInTheDocument();
    expect(screen.queryByText(registration.admissionDate)).toBeInTheDocument();

    // aprovado: mostra apenas botão revisar
    expect(getButton("Revisar")).toBeInTheDocument();
    expect(getButton("Aprovar")).not.toBeInTheDocument();
    expect(getButton("Reprovar")).not.toBeInTheDocument();

    rerender(
      <QueryClientProvider client={queryClient}>
        <RegistrationCard
          data={{ ...registration, status: "REVIEW" }}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </QueryClientProvider>
    );

    // pronto para revisar: mostra botões de aprovar e reprovar
    expect(getButton("Revisar")).not.toBeInTheDocument();
    expect(getButton("Aprovar")).toBeInTheDocument();
    expect(getButton("Reprovar")).toBeInTheDocument();

    rerender(
      <QueryClientProvider client={queryClient}>
        <RegistrationCard
          data={{ ...registration, status: "REPROVED" }}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </QueryClientProvider>
    );

    // reprovado: mostra apenas botão revisar
    expect(getButton("Revisar")).toBeInTheDocument();
    expect(getButton("Aprovar")).not.toBeInTheDocument();
    expect(getButton("Reprovar")).not.toBeInTheDocument();
  });

  it("Should open modal on button click and close modal on cancel", async () => {
    const onChangeStatus = jest.fn();
    const onDelete = jest.fn();

    //botão revisar
    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <RegistrationCard
          data={registration}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </QueryClientProvider>
    );

    act(() => {
      getButton("Revisar")?.click();
    });

    await waitFor(() =>
      expect(screen.getByText("Deseja mesmo Revisar?")).toBeInTheDocument()
    );

    act(() => {
      getButton("Cancelar")?.click();
    });

    await waitFor(() =>
      expect(
        screen.queryByText("Deseja mesmo Revisar?")
      ).not.toBeInTheDocument()
    );

    //botão aprovar
    rerender(
      <QueryClientProvider client={queryClient}>
        <RegistrationCard
          data={{ ...registration, status: "REVIEW" }}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </QueryClientProvider>
    );

    act(() => {
      getButton("Aprovar")?.click();
    });

    await waitFor(() =>
      expect(screen.getByText("Deseja mesmo Aprovar?")).toBeInTheDocument()
    );

    act(() => {
      getButton("Cancelar")?.click();
    });

    await waitFor(() =>
      expect(
        screen.queryByText("Deseja mesmo Aprovar?")
      ).not.toBeInTheDocument()
    );

    //botão reprovar
    rerender(
      <QueryClientProvider client={queryClient}>
        <RegistrationCard
          data={{ ...registration, status: "REVIEW" }}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </QueryClientProvider>
    );

    act(() => {
      getButton("Reprovar")?.click();
    });

    await waitFor(() =>
      expect(screen.getByText("Deseja mesmo Reprovar?")).toBeInTheDocument()
    );

    act(() => {
      getButton("Cancelar")?.click();
    });

    await waitFor(() =>
      expect(
        screen.queryByText("Deseja mesmo Aprovar?")
      ).not.toBeInTheDocument()
    );
  });

  it("Should call onChangeStatus", async () => {
    const onChangeStatus = jest.fn();
    const onDelete = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <RegistrationCard
          data={registration}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </QueryClientProvider>
    );

    act(() => {
      getButton("Revisar")?.click();
    });

    await waitFor(() =>
      expect(screen.getByText("Deseja mesmo Revisar?")).toBeInTheDocument()
    );

    act(() => {
      getButton("Confirmar")?.click();
    });

    await waitFor(() => expect(onChangeStatus).toHaveBeenCalledTimes(1));

    expect(onChangeStatus).toHaveBeenCalledWith('"Pronto para revisar"', true);
  });

  it("Should call onDelete", async () => {
    const onChangeStatus = jest.fn();
    const onDelete = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <RegistrationCard
          data={registration}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      </QueryClientProvider>
    );

    act(() => {
      getButton("remover")?.click();
    });

    await waitFor(() =>
      expect(screen.getByText("Deseja mesmo Remover?")).toBeInTheDocument()
    );

    act(() => {
      getButton("Confirmar")?.click();
    });

    await waitFor(() => expect(onDelete).toHaveBeenCalledTimes(1));

    expect(onDelete).toHaveBeenCalledWith(registration.employeeName, true);
  });
});
