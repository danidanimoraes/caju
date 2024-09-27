import error from "~/assets/error1.jpg";
import { Container, Text } from "./styles";

export const ErrorState = () => {
  return (
    <Container data-testid="error-state">
      <Text>Houve um erro. Tente novamente.</Text>
      <img
        src={error}
        alt="Quatro pessoas em volta de um monitor com um símbolo de aviso"
      />
      <p>
        <a href="https://www.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_11235921.htm#fromView=search&page=1&position=41&uuid=66d28bb3-e80b-42b3-bbba-2a301fa721b4">
          Image by pch.vector on Freepik
        </a>{" "}
        on Freepik
      </p>
    </Container>
  );
};

export default ErrorState;
