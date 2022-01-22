import styled, { css } from "styled-components";

export const PsychologistWrapper = styled.div`
  cursor: pointer;
  background-color: var(--background-contrast-grey);
  padding: 24px;
  ${(props) =>
    css`
      ${props.selected
        ? "border: solid 1px black;"
        : "border: solid 1px transparent"}
    `}
`;
