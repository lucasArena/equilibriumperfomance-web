import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 84px;
  background: #000;
  padding: 0 30px;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  flex: 1;
  max-width: 1100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MainLogo = styled.button`
  img {
    height: 70px;
  }

  background: transparent;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;

  p {
    font-weight: bold;
    color: #fff;
    margin-bottom: 5px;
  }

  button {
    padding: 10px;
    color: #000;
    font-weight: bold;
    border-radius: 4px;
    transition: background 0.5s;
    background: #fff;

    &:hover {
      background: ${darken(0.07, '#DDD')};
    }
  }
`;
