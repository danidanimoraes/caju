import { useEffect, useState } from "react";
import { Registration } from "~/interfaces";
import { Columns, SearchBar } from "./components";
import { useRegistrations } from "./hooks";
import { Container } from "./styles";

const isCPFValid = (cpf: string) => {
  return !cpf || (cpf.length === 11 && !isNaN(Number(cpf)));
};

export const DashboardPage = () => {
  const [term, setTerm] = useState("");
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);

  const useRegistrationsParams = {
    cpf: term,
  };

  const {
    data: registrations,
    isError,
    isFetching,
    refetch,
  } = useRegistrations(useRegistrationsParams, isCPFValid(term));

  const filteredRegistrations = registrations?.data ?? [];

  // Cache data to show while user types invalid cpf
  useEffect(() => {
    if (!term && !isError && registrations?.data) {
      setAllRegistrations(registrations.data);
    }
  }, [isError, registrations?.data]);

  const handleSearch = (newTerm: string) => {
    setTerm(newTerm);
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Container>
      <SearchBar
        searchTerm={term}
        onSearch={handleSearch}
        onRefresh={handleRefresh}
        message={isCPFValid(term) ? "" : "CPF inválido. Busca não executada."}
      />
      <Columns
        isFetching={isFetching}
        hasError={
          isCPFValid(term) && (isError || registrations?.status !== 200)
        }
        registrations={
          isCPFValid(term) ? filteredRegistrations : allRegistrations
        }
      />
    </Container>
  );
};
