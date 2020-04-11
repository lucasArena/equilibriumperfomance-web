import React, { useState, useEffect, useCallback } from 'react';
import { parseISO, format } from 'date-fns';

import { Wrapper, Container } from './styles';

import DashboardView from '~/components/DashboardView';

import api from '~/services/api';

export default function Workout() {
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadWorkouts = useCallback(async (offset, filter) => {
    setLoading(true);
    const { count, workouts } = await api.get('/workouts', {
      params: {
        offset,
        filter,
      },
    });

    const formattedResponse = workouts.map((r) => ({
      ...r,
      createdAt: format(parseISO(r.createdAt), 'dd/MM/yyyy'),
    }));

    setTotal(count);
    setStudents(formattedResponse);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return (
    <Wrapper>
      <Container>
        <DashboardView
          titles={['#', 'Descrição', 'Data de criação', 'Ações']}
          data={students}
          baseurl="workouts"
          search="Pesquisar treino"
          handleData={loadWorkouts}
          total={total}
          loading={loading}
        />
      </Container>
    </Wrapper>
  );
}
