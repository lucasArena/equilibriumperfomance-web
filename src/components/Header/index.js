import React from 'react';
import { useSelector } from 'react-redux';

import history from '~/services/history';

import Menu from '../Menu';

import { Wrapper, Container, LogoContainer, MainLogo, Right } from './styles';
import Logo from '~/assets/logo.png';

export default function Header() {
  const user = useSelector((state) => state.profile.user);

  function handleMenu() {
    history.push('/students');
  }

  return (
    <Wrapper>
      <Container>
        <LogoContainer>
          <MainLogo type="button" onClick={handleMenu}>
            <img src={Logo} alt="Logo principal" />
          </MainLogo>
          <Menu />
        </LogoContainer>
        <Right>
          <div>
            <p>{user.name}</p>
            <button type="button" onClick={() => history.push('/account')}>
              Meu perfil
            </button>
          </div>
        </Right>
      </Container>
    </Wrapper>
  );
}
