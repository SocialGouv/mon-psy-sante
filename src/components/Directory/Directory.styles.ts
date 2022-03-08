import styled, { css } from "styled-components";

export const ResultWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Desktop = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const Mobile = styled.div`
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const SubSearch = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const Psychologists = styled.div`
  overflow-y: scroll;
`;

export const PsychologistWrapper = styled.div`
  cursor: pointer;

  &:hover {
    background-color: var(--background-contrast-grey);
  }

  ${(props) =>
    css`
      ${props.selected
        ? "box-shadow: inset 0 0 0 1px black;"
        : "box-shadow: inset 0 0 0 1px var(--border-default-grey);"}
    `}
`;
