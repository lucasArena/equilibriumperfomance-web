import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  background: ${lighten(0.05, '#000')};
`;
