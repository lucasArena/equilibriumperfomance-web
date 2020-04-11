import React from 'react';

import { Container, MenuItem } from './styles';

import history from '~/services/history';

export default function Menu() {
  return (
    <Container>
      <MenuItem onClick={() => history.push('/students')}>Alunos</MenuItem>
      <MenuItem onClick={() => history.push('/exercises')}>Exercicios</MenuItem>
      <MenuItem onClick={() => history.push('/workouts')}>Treinos</MenuItem>
    </Container>
  );
}
