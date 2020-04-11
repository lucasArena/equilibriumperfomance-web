import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { Wrapper, Container, GroupLine, InputGroup } from './styles';

import Input from '~/components/Input';
import Select from '~/components/Select';

import api from '~/services/api';
import history from '~/services/history';

export default function StudentForm({ location: { state } }) {
  const [bands, setBands] = useState([]);

  const schema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    nickname: Yup.string().required('O campo apelido é obrigatório'),
    email: Yup.string().email().required('O campo email é obrigatório'),
    birth: Yup.string('Data Invalida').required(
      'O campo nascimento é obrigatório'
    ),
  });

  async function handleSubmit(data) {
    try {
      if (!state) {
        await api.post('/students', data);
        toast.success('Aluno registrado com sucesso');
      } else {
        await api.put(`/students/${data.id}`, data);
        toast.success('Aluno editado com sucesso');
      }

      history.push('/students');
    } catch (error) {
      toast.error('Erro ao tentar salvar/editar o aluno');
    }
  }

  useEffect(() => {
    async function loadBands() {
      try {
        const response = await api.get('/bands');
        setBands(response);
      } catch (err) {
        toast.error('Erro ao resgatar as pulseiras');
      }
    }
    loadBands();
  }, []);

  return (
    <Wrapper>
      <Container>
        <h1>Cadastro de Alunos</h1>
        <Form schema={schema} initialData={state} onSubmit={handleSubmit}>
          <GroupLine>
            <InputGroup>
              <Input name="name" placeholder="Nome do aluno" />
            </InputGroup>
            <InputGroup>
              <Input name="nickname" placeholder="Apelido" />
            </InputGroup>
          </GroupLine>
          <GroupLine>
            <InputGroup>
              <Input name="email" placeholder="Email" />
            </InputGroup>
            <InputGroup>
              <Input name="birth" placeholder="Data de nascimento" />
            </InputGroup>
            <InputGroup>
              <Select name="band_id" id="band_id">
                {bands.map((band) => (
                  <option key={band.id} value={band.id}>
                    {band.name}
                  </option>
                ))}
              </Select>
            </InputGroup>
            <Input type="hidden" name="id" />
          </GroupLine>
          <button type="submit">Salvar aluno</button>
        </Form>
      </Container>
    </Wrapper>
  );
}

StudentForm.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.array,
  }),
};

StudentForm.defaultProps = {
  location: {
    state: [],
  },
};
