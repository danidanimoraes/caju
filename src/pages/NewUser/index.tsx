import { Viewport as ToastViewport } from "@radix-ui/react-toast";
import { useMask } from "@react-input/mask";
import { FocusEvent, FormEvent, useRef, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { Snackbar, SnackbarVariant } from "~/components/Snackbar/";
import TextField from "~/components/TextField";
import { Registration } from "~/interfaces";
import routes from "~/router/routes";
import { useCreateRegistration } from "../Dashboard/hooks/useCreateRegistration";
import { Card, Container } from "./styles";

const NewUserPage = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    cpf: "",
    date: "",
  });
  const [values, setValues] = useState({
    name: "",
    email: "",
    cpf: "",
    date: "",
  });

  const snackbarTitle = useRef("");
  const snackbarVariant = useRef<SnackbarVariant>("success");

  const cpfRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });
  const history = useHistory();

  const createRegistrationMutation = useCreateRegistration();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const handleShowSnackbar = (name: string, hasError: boolean) => {
    snackbarVariant.current = hasError ? "error" : "success";
    snackbarTitle.current = hasError
      ? `Erro ao criar o usuário ${name}. Tente novamente.`
      : `Usuário ${name} criado com successo!`;

    setIsSnackbarOpen(true);
  };

  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dataToSubmit = Object.fromEntries(formData.entries());

    const newRegistration: Registration = {
      employeeName: dataToSubmit.formName.toString(),
      email: dataToSubmit.formEmail.toString(),
      cpf: dataToSubmit.formCPF.toString(),
      admissionDate: dataToSubmit.formAdmissionDate.toString(),
      status: "REVIEW",
    };

    try {
      const createdUser = await createRegistrationMutation.mutateAsync({
        registration: newRegistration,
      });

      handleShowSnackbar(createdUser.data.employeeName, false);
      goToHome();
    } catch (e) {
      handleShowSnackbar(newRegistration.employeeName, true);
    }
  };

  const isNameValid = (name: string) => {
    const includesSpace = name.includes(" ");
    const min2Characters = name.split(" ")[0].length >= 2;
    const doesntStartWithNumber = isNaN(Number(name[0]));
    if (includesSpace && min2Characters && doesntStartWithNumber) {
      return true;
    }
    return false;
  };

  const isEmailValid = (email: string) => {
    const regex = /.+@.+\.[a-z]{3}/;
    return regex.test(email);
  };

  const isCPFValid = (cpf: string) => {
    const regex = /\d{3}.\d{3}.\d{3}-\d{2}/;
    return regex.test(cpf);
  };

  const handleBlurName = (e: FocusEvent<HTMLInputElement>) => {
    setErrorMessages({
      ...errorMessages,
      name: isNameValid(e.target.value)
        ? ""
        : "O nome deve ter um espaço, o primeiro nome deve ter no mínimo 2 letras e não pode começar com número",
    });
  };

  const handleBlurEmail = (e: FocusEvent<HTMLInputElement>) => {
    setErrorMessages({
      ...errorMessages,
      email: isEmailValid(e.target.value)
        ? ""
        : "O email deve seguir o padrão email@example.com",
    });
  };

  const handleBlurCPF = (e: FocusEvent<HTMLInputElement>) => {
    setErrorMessages({
      ...errorMessages,
      cpf: isCPFValid(e.target.value)
        ? ""
        : "O CPF deve seguir o padrão: 888.888.888-88",
    });
  };

  const handleBlurDate = (e: FocusEvent<HTMLInputElement>) => {
    const isDateValid = Date.parse(e.target.value);
    setErrorMessages({
      ...errorMessages,
      date: isDateValid ? "" : "A data deve seguir o padrão: dd/mm/aaaa",
    });
  };

  const hasValidationError = Object.values(errorMessages).some(
    (message) => !!message
  );

  const hasEmptyField = Object.values(values).some((value) => !value);

  return (
    <>
      <Container>
        <form onSubmit={handleCreateUser}>
          <Card>
            <IconButton onClick={() => goToHome()} aria-label="back">
              <HiOutlineArrowLeft size={24} />
            </IconButton>
            <TextField
              id="input-name"
              name="formName"
              placeholder="Nome"
              label="Nome"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              onBlur={handleBlurName}
              error={errorMessages.name}
              required
            />
            <TextField
              id="input-email"
              name="formEmail"
              placeholder="email@exemplo.com"
              label="Email"
              type="email"
              pattern=".+@.+\.[a-z]{3}"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              onBlur={handleBlurEmail}
              error={errorMessages.email}
              required
            />
            <TextField
              id="input-cpf"
              name="formCPF"
              placeholder="888.888.888-88"
              label="CPF"
              pattern="\d{3}.\d{3}.\d{3}-\d{2}"
              ref={cpfRef}
              onChange={(e) => setValues({ ...values, cpf: e.target.value })}
              onBlur={handleBlurCPF}
              error={errorMessages.cpf}
              required
            />
            <TextField
              id="input-admissionDate"
              name="formAdmissionDate"
              label="Data de admissão"
              type="date"
              onChange={(e) => setValues({ ...values, date: e.target.value })}
              onBlur={handleBlurDate}
              error={errorMessages.date}
              required
            />
            <Button
              type="submit"
              disabled={hasValidationError || hasEmptyField}
            >
              Cadastrar
            </Button>
          </Card>
        </form>
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

export default NewUserPage;

const ToastContainer = styled(ToastViewport)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: fixed;
  top: 0;
  right: 0;
  padding: 8px 16px;
  list-style: none;
`;
