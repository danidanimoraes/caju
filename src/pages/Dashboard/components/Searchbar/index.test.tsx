import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from ".";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("Dashboard/SearchBar", () => {
  it("Should show value on search input", () => {
    const searchTerm = "333.222.111-00";
    const onSearch = jest.fn();
    const onRefresh = jest.fn();

    render(
      <SearchBar
        searchTerm={searchTerm}
        onSearch={onSearch}
        onRefresh={onRefresh}
      />
    );

    expect(screen.queryByPlaceholderText("Digite um CPF válido")).toHaveValue(
      searchTerm
    );
    expect(screen.queryByTestId("search-error-message")).toHaveTextContent("");
    expect(onSearch).toHaveBeenCalledTimes(0);
  });

  it("Should show message", async () => {
    const message = "uma mensagem";
    const onSearch = jest.fn();
    const onRefresh = jest.fn();

    render(
      <SearchBar
        searchTerm=""
        onSearch={onSearch}
        onRefresh={onRefresh}
        message={message}
      />
    );

    expect(screen.queryByPlaceholderText("Digite um CPF válido")).toHaveValue(
      ""
    );
    expect(screen.queryByTestId("search-error-message")).toHaveTextContent(
      message
    );
  });

  it("Should call onSearch", async () => {
    const onSearch = jest.fn();
    const onRefresh = jest.fn();

    render(
      <SearchBar searchTerm="" onSearch={onSearch} onRefresh={onRefresh} />
    );

    userEvent.type(screen.queryByPlaceholderText("Digite um CPF válido")!, "2");

    expect(screen.queryByTestId("search-error-message")).toHaveTextContent("");
    await waitFor(() => expect(onSearch).toHaveBeenCalledTimes(1));
    expect(onSearch).toHaveBeenCalledWith("2");
  });

  it("Should call onRefresh", async () => {
    const onSearch = jest.fn();
    const onRefresh = jest.fn();

    render(
      <SearchBar searchTerm="" onSearch={onSearch} onRefresh={onRefresh} />
    );

    screen.queryByRole("button", { name: "atualizar" })?.click();

    expect(screen.queryByTestId("search-error-message")).toHaveTextContent("");
    await waitFor(() => expect(onRefresh).toHaveBeenCalledTimes(1));
  });
});
