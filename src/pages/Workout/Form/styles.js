import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  max-width: 1000px;
  background: #fff;
  flex: 1;
  padding: 20px;
  margin-top: 20px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;

    button {
      padding: 15px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 10px;
      transition: background 0.5s;
      background: #666;
      &:hover {
        background: ${darken(0.03, '#666')};
      }
    }
  }
`;

export const GroupLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  input,
  select {
    flex: 1;
    padding: 10px 15px;
    background: #eee;
    border-radius: 4px;
    align-self: stretch;
    margin: 5px 0;
  }
`;

export const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  & + div {
    margin-left: 15px;
  }

  span {
    color: #f24424;
    font-weight: bold;
    font-size: 12px;
  }
`;

export const ButtonAddExercise = styled.button`
  padding: 5px 10px;
  font-weight: bold;
  background: blue;
  color: #fff;
`;
