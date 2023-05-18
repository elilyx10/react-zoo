import styled from "styled-components";

interface IButtonProps {
  color?: string;
  background?: string;
}

export const Button = styled.button`
  padding: 0.5rem;
  margin-bottom: 2rem;
  outline: none;
  border: none;

  :hover {
    cursor: pointer;
  }
`;

export const ActiveButton = styled(Button)`
  color: ${(props: IButtonProps) => props.color || "#8bff8a"};
  background-color: #8bff8a;
  :hover {
    background-color: #f9f9f9;
    color: lightgray;
  }
`;

export const DisabledButton = styled(Button)`
  color: ${(props: IButtonProps) => props.color || "lightgray"};
  background-color: gray;
  :hover {
    cursor: none;
  }
`;

