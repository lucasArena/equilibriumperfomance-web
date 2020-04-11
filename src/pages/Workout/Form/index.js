import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import {
  Wrapper,
  Container,
  GroupLine,
  InputGroup,
  ButtonAddExercise,
} from './styles';

import Input from '~/components/Input';
import Select from '~/components/Select';

import api from '~/services/api';
import history from '~/services/history';

export default function WorkoutForm({ location: { state } }) {
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [exercises, setExercises] = useState(state ? state.exercises : [{}]);
  const [bands, setBands] = useState([]);

  const schema = Yup.object().shape({
    description: Yup.string().required('O campo descrição é obrigatório'),
    sequence: Yup.number().required('O campo sequencia é obrigatório'),
    exercises: Yup.array().of(
      Yup.object().shape({
        exercise_id: Yup.number().required(),
        repetitions: Yup.string().required(),
        series: Yup.number().required(),
      })
    ),
  });

  async function handleSubmit(data) {
    try {
      if (!state) {
        await api.post('/workouts', data);
        toast.success('Treino registrado com sucesso');
      } else {
        await api.put(`/workouts/${state.id}`, data);
        toast.success('Treino editado com sucesso');
      }

      history.push('/workouts');
    } catch (error) {
      toast.error('Erro ao tentar salvar/editar o treino');
    }
  }

  async function handleExercise(index, id) {
    if (index === 0) {
      setExercises((oldExercise) => [
        ...oldExercise,
        {
          exercise_id: 0,
          repetitions: 0,
          series: 0,
        },
      ]);
    } else {
      if (id) {
        const res = window.confirm(
          'Deseja realmente excluir o exercício? A ação não poderá ser desfeita'
        );
        if (res) {
          try {
            await api.delete(`/workout/exercise/${id}`);
            toast.success('Exercício desvinculado com sucesso');
          } catch (err) {
            toast.error('Erro ao tentar deletar exercício');
            return;
          }
        }
      }

      setExercises((oldExercise) => oldExercise.filter((_, i) => i !== index));
    }
  }

  useEffect(() => {
    async function loadSelectsOptions() {
      try {
        const [exerciseResponse, bandResponse] = await Promise.all([
          api.get('/exercises'),
          api.get('/bands'),
        ]);
        setExerciseOptions(exerciseResponse.exercises);
        setBands(bandResponse);
      } catch (err) {
        toast.error('Erro ao resgatar as pulseiras');
      }
    }
    loadSelectsOptions();
  }, []);

  return (
    <Wrapper>
      <Container>
        <h1>Cadastro de treinos</h1>
        <Form schema={schema} initialData={state} onSubmit={handleSubmit}>
          <GroupLine>
            <InputGroup>
              <Input name="description" placeholder="Descrição do treino" />
            </InputGroup>
            <InputGroup>
              <Input
                type="number"
                name="sequence"
                placeholder="Sequencia do treino"
              />
            </InputGroup>
            <InputGroup>
              <Select name="band_id">
                {bands.map((band) => (
                  <option key={band.id} value={band.id}>
                    {band.name}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </GroupLine>
          <GroupLine>
            <h3>Exercicios</h3>
          </GroupLine>
          {exercises.map((exercise, index) => (
            <GroupLine key={index}>
              <InputGroup>
                <Select name={`exercises[${index}][exercise_id]`}>
                  {exerciseOptions.length &&
                    exerciseOptions.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </Select>
              </InputGroup>
              <InputGroup>
                <Input
                  name={`exercises[${index}][series]`}
                  placeholder="Series"
                />
              </InputGroup>
              <InputGroup>
                <Input
                  name={`exercises[${index}][repetitions]`}
                  placeholder="Repetições"
                />
              </InputGroup>
              <Input
                type="hidden"
                name={`exercises[${index}][id]`}
                defaultValue={exercise.id}
              />
              <InputGroup>
                <ButtonAddExercise
                  type="button"
                  onClick={() => handleExercise(index, exercise.id)}
                >
                  {index === 0 ? 'Adicionar' : 'Eliminar'}
                </ButtonAddExercise>
              </InputGroup>
            </GroupLine>
          ))}
          <button type="submit">Salvar treino</button>
        </Form>
      </Container>
    </Wrapper>
  );
}

WorkoutForm.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

WorkoutForm.defaultProps = {
  location: {
    state: {},
  },
};
