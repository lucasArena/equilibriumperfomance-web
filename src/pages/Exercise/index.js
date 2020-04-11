import React, { useState, useEffect, useCallback } from 'react';
import { parseISO, format } from 'date-fns';

import { Wrapper, Container } from './styles';

import DashboardView from '~/components/DashboardView';

import api from '~/services/api';

export default function Exercise() {
  const [, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadExercises = useCallback(async (offset, filter) => {
    setLoading(true);
    const { count, exercises } = await api.get('/exercises', {
      params: {
        offset,
        filter,
      },
    });

    const formattedResponse = exercises.map((r) => ({
      ...r,
      createdAt: format(parseISO(r.createdAt), 'dd/MM/yyyy'),
    }));
    setTotal(count);
    setExercises(formattedResponse);
    setFilteredExercises(formattedResponse);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  return (
    <Wrapper>
      <Container>
        <DashboardView
          titles={['#', 'Nome', 'Data de criação', 'Ações']}
          data={filteredExercises}
          baseurl="exercises"
          search="Pesquise um exercício"
          handleData={loadExercises}
          total={total}
          loading={loading}
        />
      </Container>
    </Wrapper>
  );
}
