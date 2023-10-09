import styled, { css } from "styled-components";

export default styled.input`
  width: 100%;
  border-radius: 25px;
  background: #fff;
  height: 50px;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 0 16px;
  outline: none;
  transition: border-color 0.2s ease-in;
  font-size: 16px;
  appearance: none;

  &::placeholder {
    color: #bcbcbc;
  }
  &:focus {
    border-color: ${({ theme }) => theme.colors?.primary.main};
  }

  ${({ theme, danger }) =>
    danger &&
    css`
      &:hover {
        border-color: ${theme.colors?.danger.light};
      }
      &:active {
        border-color: ${theme.colors?.danger.dark};
      }
      &:focus {
        border-color: ${({ theme }) => theme.colors?.danger.main};
      }
    `}
`;
