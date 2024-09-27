import { Action, Root } from "@radix-ui/react-toast";
import styled from "styled-components";
import { SnackbarVariant } from ".";

export const Container = styled(Root)<{ $variant: SnackbarVariant }>`
  background-color: ${({ $variant }) =>
    $variant === "error" ? "rgb(255, 145, 154)" : "rgb(155, 229, 155)"};
  width: fit-content;
  min-height: 50px;
  border-radius: 6px;
  padding: 4px 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CloseButton = styled(Action)`
  background-color: unset;
  padding: 0;
  padding-left: 16px;
  margin-bottom: 24px;
  margin-right: -10px;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;
