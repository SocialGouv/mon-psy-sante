import styled, { css } from "styled-components";

export const DirectoryWrapper = styled.div`
  margin-bottom: 32px;
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

export const Search = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  flex: 0 1 auto;
  margin: 24px 0;
`;

export const Psychologists = styled.div`
  overflow: scroll;
  margin-right: 16px;
`;

export const PsychologistWrapper = styled.div`
  cursor: pointer;
  background-color: var(--background-default-white);
  padding: 24px;

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
