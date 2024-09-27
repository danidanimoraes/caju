import styled from "styled-components";

export const FullScreenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const Container = styled.div`
  padding: 24px 16px;

  position: relative;
  top: 30%;
  left: calc(50% - 150px);
  z-index: 10;
  width: 300px;
  border-radius: 6px;
  background-color: white;
  box-shadow: 1px 1px 5px darkgray;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Button = styled.button<{
  $bgColor?: string;
  $color?: string;
}>`
  font-size: 16px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.$bgColor ?? "none"};
  color: black;
  cursor: pointer;
  width: 48%;
`;
