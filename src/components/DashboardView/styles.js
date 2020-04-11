import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  margin-top: 20px;
`;

export const SearchInput = styled.input`
  padding: 10px 15px;
  color: #999;
  font-size: 14px;
  border-radius: 4px;

  &::placeholder {
    color: #999;
  }
`;

export const ButtonAction = styled.button`
  padding: 15px 20px;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  background: #fff;
`;

export const DashboardViewLine = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DashboardTitle = styled.div`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  margin: 10px 0;
`;

export const DashboardItem = styled.div`
  flex: 1;
  padding: 30px 0;
  background: #fff;
  color: #666;
  font-weight: bold;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  svg {
    cursor: pointer;
  }
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    margin: 0 15px;
    background: #000;
    cursor: pointer;
  }

  span {
    color: #fff;
    font-size: 16px;
  }
`;

export const PreviusPage = styled.button`
  display: ${(props) => (props.enabled ? 'block' : 'none')};
`;
export const ForwardPage = styled.button`
  display: ${(props) => (props.lastPage ? 'none' : 'block')};
`;
