import empty from "~/assets/empty.png";
import { Container, Text } from "./styles";

export const EmptyState = () => {
  return (
    <Container data-testid="empty-state">
      <Text>Nenhum dado encontrado</Text>
      <img src={empty} alt="Menina vasculhando pasta vazia com lupa" />
      <p>
        <a href="https://www.freepik.com/free-vector/hand-drawn-no-data-concept_55024593.htm#query=empty%20state&position=4&from_view=keyword&track=ais_hybrid&uuid=beb3805e-8a7f-4718-96d9-f430d3a2779a">
          Image by pikisuperstar
        </a>{" "}
        on Freepik
      </p>
    </Container>
  );
};
export default EmptyState;
