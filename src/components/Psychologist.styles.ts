import styled, { css } from "styled-components";

export const PsychologistWrapper = styled.div`
  cursor: pointer;
  ${(props) =>
    css`
      ${props.selected
        ? "border: solid 1px black;"
        : "border: solid 1px transparent"}
    `}
`;
