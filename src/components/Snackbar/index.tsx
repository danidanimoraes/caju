import { Title } from "@radix-ui/react-toast";
import { useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { CloseButton, Container } from "./styles";

export type SnackbarVariant = "error" | "success";

type SnackbarProps = {
  isOpen: boolean;
  title: string;
  variant: SnackbarVariant;
};

export const Snackbar = ({ isOpen, title, variant }: SnackbarProps) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <Container open={open} onOpenChange={setOpen} $variant={variant}>
      <Title>{title}</Title>

      <CloseButton
        altText="Fechar"
        name="Fechar"
        onClick={() => setOpen(false)}
      >
        <HiOutlineX />
      </CloseButton>
    </Container>
  );
};

export default Snackbar;
