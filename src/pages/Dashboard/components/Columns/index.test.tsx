import { Provider as ToastProvider } from "@radix-ui/react-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { RegistrationStatus } from "~/interfaces";
import { Columns } from ".";

const registrations = [
  {
    id: "1",
    employeeName: "José Cruz",
    admissionDate: "17/09/2023",
    cpf: "32334485933",
    email: "josecruz@caju.com",
    status: "APPROVED" as RegistrationStatus,
  },
];

describe("Dashboard/Columns", () => {
  it("Should show loading state", () => {
    render(
      <Columns
        isFetching={true}
        hasError={undefined}
        registrations={undefined}
      />
    );

    expect(screen.queryByTestId("loading-state")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("columns-state")).not.toBeInTheDocument();
  });

  it("Should show error state", () => {
    render(
      <Columns isFetching={false} hasError={true} registrations={undefined} />
    );

    expect(screen.queryByTestId("loading-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-state")).toBeInTheDocument();
    expect(screen.queryByTestId("columns-state")).not.toBeInTheDocument();
  });

  it("Should show empty state", () => {
    render(<Columns isFetching={false} hasError={false} registrations={[]} />);

    expect(screen.queryByTestId("loading-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).toBeInTheDocument();
    expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("columns-state")).not.toBeInTheDocument();
  });

  it("Should show columns state", () => {
    const queryClient = new QueryClient();
    render(
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Columns
            isFetching={false}
            hasError={false}
            registrations={registrations}
          />
        </QueryClientProvider>
      </ToastProvider>
    );

    expect(screen.queryByTestId("loading-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
    expect(screen.queryByTestId("columns-state")).toBeInTheDocument();

    expect(screen.getByText("Pronto para revisar")).toBeInTheDocument();
    expect(screen.getByText("Reprovado")).toBeInTheDocument();
    expect(screen.getByText("Aprovado")).toBeInTheDocument();

    const columns = document.querySelectorAll(
      'div[data-testid="columns-state"] > div'
    );
    const reviewColumn = columns[0];
    const approvedColumn = columns[1];
    const reprovedColumn = columns[2];

    const reviewCardsContainer = reviewColumn.children[1];
    const approvedCardsContainer = approvedColumn.children[1];
    const reprovedCardsContainer = reprovedColumn.children[1];

    expect(reviewCardsContainer.children.length).toBe(0);
    expect(approvedCardsContainer.children.length).toBe(1);
    expect(reprovedCardsContainer.children.length).toBe(0);
  });
});
