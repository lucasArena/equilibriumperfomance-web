import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;

export const MenuItem = styled.button`
  background: transparent;
  padding: 20px;
  font-weight: bold;
  color: #999;
  transition: background 0.5s;

  &:hover {
    background: ${lighten(0.03, '#eee')};
  }
`;
