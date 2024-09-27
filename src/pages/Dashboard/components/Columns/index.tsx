import { useRef, useState } from "react";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  Snackbar,
  SnackbarVariant,
} from "~/components";
import { Registration } from "~/interfaces";
import { RegistrationCard } from "../RegistrationCard";
import {
  Column,
  ColumnContent,
  Container,
  TitleColumn,
  ToastContainer,
} from "./styles";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  isFetching?: boolean;
  hasError?: boolean;
  registrations?: Registration[];
};

export const Columns = ({ isFetching, hasError, registrations }: Props) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const snackbarTitle = useRef("");
  const snackbarVariant = useRef<SnackbarVariant>("success");

  if (isFetching) {
    return <LoadingState />;
  }

  if (hasError) {
    return <ErrorState />;
  }

  if (!registrations?.length) {
    return <EmptyState />;
  }

  const handleChangeStatus = (newStatus: string, hasError: boolean) => {
    snackbarVariant.current = hasError ? "error" : "success";
    snackbarTitle.current = hasError
      ? `Erro ao mover usuário para ${newStatus}. Tente novamente.`
      : `Usuário movido para ${newStatus} com successo!`;

    setIsSnackbarOpen(true);
  };

  const handleDelete = (name: string, hasError: boolean) => {
    snackbarVariant.current = hasError ? "error" : "success";
    snackbarTitle.current = hasError
      ? `Erro ao remover o usuário ${name}. Tente novamente.`
      : `Usuário ${name} removido com successo!`;

    setIsSnackbarOpen(true);
  };

  return (
    <>
      <Container data-testid="columns-state">
        {allColumns.map((column) => {
          const filterRegistrationByStatus = (registration: Registration) =>
            registration.status === column.status;

          return (
            <Column $status={column.status} key={column.title}>
              <>
                <TitleColumn $status={column.status}>
                  {column.title}
                </TitleColumn>
                <ColumnContent>
                  {registrations
                    ?.filter(filterRegistrationByStatus)
                    .map((registration) => {
                      return (
                        <RegistrationCard
                          data={registration}
                          key={registration.id}
                          onChangeStatus={handleChangeStatus}
                          onDelete={handleDelete}
                        />
                      );
                    })}
                </ColumnContent>
              </>
            </Column>
          );
        })}
      </Container>

      <ToastContainer />
      <Snackbar
        isOpen={isSnackbarOpen}
        title={snackbarTitle.current}
        variant={snackbarVariant.current}
      />
    </>
  );
};
