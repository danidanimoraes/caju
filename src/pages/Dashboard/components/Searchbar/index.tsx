import { useMask } from "@react-input/mask";
import { ChangeEvent } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import { Actions, Container, SearchContainer, SearchMessage } from "./styles";

type Props = {
  searchTerm: string;
  onSearch: (term: string) => void;
  onRefresh: () => void;
  message?: string;
};

export const SearchBar = ({
  searchTerm,
  onSearch,
  onRefresh,
  message,
}: Props) => {
  const history = useHistory();
  const cpfRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Container>
      <SearchContainer>
        <TextField
          ref={cpfRef}
          placeholder="Digite um CPF válido"
          id="search-cpf"
          onChange={handleSearch}
          value={searchTerm}
        />
        <SearchMessage data-testid="search-error-message">
          {message}
        </SearchMessage>
      </SearchContainer>
      <Actions>
        <IconButton aria-label="atualizar" onClick={onRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </Actions>
    </Container>
  );
};
