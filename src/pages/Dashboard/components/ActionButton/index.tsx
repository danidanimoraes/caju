import { ButtonSmall } from "~/components/Buttons";
import { RegistrationStatus } from "~/interfaces";

type Props = {
  variant: RegistrationStatus;
  label: string;
  onClick: () => void;
};

export const ActionButton = ({ variant, label, onClick }: Props) => {
  return (
    <ButtonSmall $bgColor={getButtonColor(variant)} onClick={onClick}>
      {label}
    </ButtonSmall>
  );
};

const getButtonColor = (variant: RegistrationStatus) => {
  switch (variant) {
    case "APPROVED":
      return "rgb(155, 229, 155)";
    case "REPROVED":
      return "rgb(255, 145, 154)";
    case "REVIEW":
      return "#ff8858";
    default:
      return "#ff8858";
  }
};

export default ActionButton;
