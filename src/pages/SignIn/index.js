import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, SubmitButton } from './styles';

import Loading from '~/components/Loading';
import Input from '~/components/Input';

import Logo from '~/assets/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth && state.auth.loading);

  const schema = Yup.object().shape({
    email: Yup.string().required('O email é obrigátorio'),
    password: Yup.string().required('A senha é obrigátorio'),
  });

  function handleSignIn(data) {
    const { email, password } = data;
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSignIn}>
        <img src={Logo} alt="Logo Equilibrium Performance" />
        <Input data-testid="email" name="email" placeholder="Email" />
        <Input
          data-testid="password"
          type="password"
          name="password"
          placeholder="Senha"
        />
        <SubmitButton type="submit" load={loading} disabled>
          {loading ? <Loading color="#FFF" size={24} /> : 'Acessar'}
        </SubmitButton>
      </Form>
    </Container>
  );
}
