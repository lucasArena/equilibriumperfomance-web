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

export default function ExerciseForm({ location: { state } }) {
  const [categories, setCategories] = useState([]);

  const schema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    category_id: Yup.number().required('O campo categoria é obrigatório'),
  });

  async function handleSubmit(data) {
    try {
      if (!state) {
        await api.post('/exercises', data);
        toast.success('Exercício registrado com sucesso');
      } else {
        await api.put(`/exercises/${data.id}`, data);
        toast.success('Exercício editado com sucesso');
      }

      history.push('/exercises');
    } catch (error) {
      toast.error('Erro ao tentar salvar/editar o exercício');
    }
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');

        setCategories(response);
      } catch (err) {
        toast.error('Erro ao resgatar as categorias');
      }
    }
    loadCategories();
  }, []);

  return (
    <Wrapper>
      <Container>
        <h1>{state ? 'Editar exercício' : 'Cadastro exercício'}</h1>
        <Form schema={schema} initialData={state} onSubmit={handleSubmit}>
          <GroupLine>
            <InputGroup>
              <Input name="name" placeholder="Nome do exercício" />
            </InputGroup>
            <InputGroup>
              <Select name="category_id" placeholder="Categoria">
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </InputGroup>
            <Input type="hidden" name="id" />
          </GroupLine>
          <button type="submit">Salvar exercício</button>
        </Form>
      </Container>
    </Wrapper>
  );
}

ExerciseForm.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

ExerciseForm.defaultProps = {
  location: {
    state: [],
  },
};
