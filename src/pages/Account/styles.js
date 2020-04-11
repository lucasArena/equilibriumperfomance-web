import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Container = styled.div`
  min-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px;

  form {
    display: flex;
    flex-direction: column;
    flex: 1;

    hr {
      height: 1px;
      background: #eee;
      margin: 20px 0;
    }

    input {
      padding: 10px 15px;
      background: #eee;
      border-radius: 4px;
      align-self: stretch;
      margin: 5px 0;
    }
  }

  button {
    padding: 15px 20px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    margin-top: 10px;
    transition: background 0.5s;
  }
`;

export const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid #999;
  align-self: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  background: #0316e7;

  &:hover {
    background: ${darken(0.04, '#0316e7')};
  }
`;

export const SignoutButton = styled.button`
  background: #f24424;

  &:hover {
    background: ${darken(0.04, '#F24424')};
  }
`;
