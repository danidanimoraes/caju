import { Button, Buttons, Container, FullScreenWrapper } from "./styles";

type Props = {
  verb: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ActionConfirmationModal = ({
  onConfirm,
  onCancel,
  verb,
}: Props) => {
  return (
    <FullScreenWrapper>
      <Container>
        <p>Deseja mesmo {verb}?</p>
        <Buttons>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button $bgColor="rgb(155, 229, 155)" onClick={onConfirm}>
            Confirmar
          </Button>
        </Buttons>
      </Container>
    </FullScreenWrapper>
  );
};

export default ActionConfirmationModal;
