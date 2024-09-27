import { useRef, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi";
import { IconButton } from "~/components";
import { ActionConfirmationModal } from "~/components/Modals/ActionConfirmationModal/";
import { Registration, RegistrationStatus } from "~/interfaces";
import { useDeleteRegistration, useUpdateRegistration } from "../../hooks/";
import { ActionButton } from "../ActionButton";
import { Actions, Card, IconAndText } from "./styles";

type AvailableActions = RegistrationStatus | "DELETE";

type Props = {
  data: Registration;
  onChangeStatus: (newStatus: string, hasError: boolean) => void;
  onDelete: (id: string, hasError: boolean) => void;
};

export const RegistrationCard = ({ data, onChangeStatus, onDelete }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const registration = data;

  const actionToBeConfirmed = useRef<AvailableActions>();

  const updateRegistrationMutation = useUpdateRegistration();
  const deleteRegistrationMutation = useDeleteRegistration();

  const showModal = (status: AvailableActions) => {
    setIsModalOpen(true);
    actionToBeConfirmed.current = status;
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    actionToBeConfirmed.current = undefined;
  };

  const handleConfirmStatusChange = async () => {
    const newStatus = actionToBeConfirmed.current as RegistrationStatus;

    const newData: Registration = {
      ...registration,
      status: newStatus,
    };

    try {
      await updateRegistrationMutation.mutateAsync({
        registration: newData,
      });

      onChangeStatus(getActionColumnName(newStatus), false);
    } catch (e) {
      onChangeStatus(getActionColumnName(newStatus), true);
    }

    actionToBeConfirmed.current = undefined;
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRegistrationMutation.mutateAsync({ id: registration.id! });

      onDelete(registration.employeeName, false);
    } catch (e) {
      onDelete(registration.employeeName, true);
    }

    actionToBeConfirmed.current = undefined;
  };

  const modalConfirmAction =
    actionToBeConfirmed.current === "DELETE"
      ? handleConfirmDelete
      : handleConfirmStatusChange;

  const actionButtonRenderer = (action: RegistrationStatus) => {
    return (
      <ActionButton
        variant={action}
        label={getActionInfinitive(action)}
        onClick={() => showModal(action)}
      />
    );
  };

  return (
    <>
      <Card>
        <IconAndText>
          <HiOutlineUser />
          <h3>{registration.employeeName}</h3>
        </IconAndText>
        <IconAndText>
          <HiOutlineMail />
          <p>{registration.email}</p>
        </IconAndText>
        <IconAndText>
          <HiOutlineCalendar />
          <span>{registration.admissionDate}</span>
        </IconAndText>
        <Actions>
          {registration.status === "REVIEW" ? (
            <>
              {actionButtonRenderer("REPROVED")}
              {actionButtonRenderer("APPROVED")}
            </>
          ) : (
            <>{actionButtonRenderer("REVIEW")}</>
          )}

          <IconButton aria-label="remover" onClick={() => showModal("DELETE")}>
            <HiOutlineTrash />
          </IconButton>
        </Actions>
      </Card>

      {isModalOpen && actionToBeConfirmed.current ? (
        <ActionConfirmationModal
          verb={getActionInfinitive(actionToBeConfirmed.current)}
          onConfirm={modalConfirmAction}
          onCancel={handleCancelModal}
        />
      ) : null}
    </>
  );
};

const getActionInfinitive = (action?: AvailableActions) => {
  switch (action) {
    case "APPROVED":
      return "Aprovar";
    case "REPROVED":
      return "Reprovar";
    case "REVIEW":
      return "Revisar";
    case "DELETE":
      return "Remover";
    default:
      return "";
  }
};

const getActionColumnName = (action: RegistrationStatus) => {
  switch (action) {
    case "APPROVED":
      return '"Aprovado"';
    case "REPROVED":
      return '"Reprovado"';
    case "REVIEW":
      return '"Pronto para revisar"';
    default:
      return "";
  }
};
