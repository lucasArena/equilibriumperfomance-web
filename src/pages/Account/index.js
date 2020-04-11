import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '~/components/Input';

import { signOut } from '~/store/modules/auth/actions';

import {
  Wrapper,
  Container,
  Image,
  SubmitButton,
  SignoutButton,
} from './styles';

export default function Account() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);

  const schema = Yup.object().shape({
    name: Yup.string().required('Campo nome é obrigatório'),
    email: Yup.string().required('Campo email é obrigatório'),
    oldPassword: Yup.string(),
  });

  function handleSignout() {
    dispatch(signOut());
  }

  return (
    <Wrapper>
      <Container>
        <Form initialData={profile} schema={schema}>
          <Image
            src={
              profile.image
                ? profile.image.path
                : 'https://api.adorable.io/avatars/50/abott@adorable.png'
            }
          />

          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="Email" />

          <hr />

          <Input name="oldPassword" placeholder="Senha atual" />
          <Input name="password" placeholder="Nova senha" />
          <Input
            name="confirmPassoword"
            placeholder="Confirmação da nova senha"
          />
          <SubmitButton>Alterar</SubmitButton>
        </Form>
        <SignoutButton type="button" onClick={handleSignout}>
          Sair
        </SignoutButton>
      </Container>
    </Wrapper>
  );
}
