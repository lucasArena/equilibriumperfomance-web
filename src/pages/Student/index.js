import React, { useState, useEffect, useCallback } from 'react';
import { parseISO, format } from 'date-fns';

import { Wrapper, Container } from './styles';

import DashboardView from '~/components/DashboardView';

import api from '~/services/api';

export default function Students() {
  const [, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadStudents = useCallback(async (offset, filter) => {
    setLoading(true);
    const { students, count } = await api.get('/students', {
      params: {
        offset,
        filter,
      },
    });

    const formattedResponse = students.map((r) => ({
      ...r,
      birth: format(parseISO(r.birth), 'dd/MM/yyyy'),
      createdAt: format(parseISO(r.createdAt), 'dd/MM/yyyy'),
    }));
    setStudents(formattedResponse);
    setFilteredStudents(formattedResponse);
    setTotal(count);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  return (
    <Wrapper>
      <Container>
        <DashboardView
          titles={['#', 'Nome', 'Data de criação', 'Ações']}
          search="Pesquise o aluno"
          data={filteredStudents}
          total={total}
          baseurl="students"
          handleData={loadStudents}
          loading={loading}
        />
      </Container>
    </Wrapper>
  );
}
