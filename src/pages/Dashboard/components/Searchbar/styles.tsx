import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchMessage = styled.p`
  font-size: 12px;
  line-height: 1;
  min-height: 1em;
`;
