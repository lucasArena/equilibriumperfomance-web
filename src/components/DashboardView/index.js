import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';

import history from '~/services/history';
import api from '~/services/api';

import {
  Container,
  SearchInput,
  ButtonAction,
  DashboardViewLine,
  DashboardItem,
  DashboardTitle,
  Pagination,
  PreviusPage,
  ForwardPage,
} from './styles';

export default function DashboardView({
  data,
  total,
  search,
  titles,
  baseurl,
  handleData,
  loading,
}) {
  const [fields, setFields] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [filter, setFilter] = useState('');

  async function handleDelete(id) {
    try {
      await api.delete(`/${baseurl}/${id}`);
      setFields((oldFields) =>
        oldFields.filter((oldField) => oldField.id !== id)
      );
      toast.success('Registro deletado com sucesso');
    } catch (err) {
      toast.error('Erro ao tentar deletar o registro');
    }
  }

  function handlePage(pageToAdd) {
    setPage((oldPage) => {
      const currentPage = oldPage + pageToAdd;

      if (!currentPage) {
        return oldPage;
      }

      handleData(currentPage, filter);
      return currentPage;
    });
  }

  function handleFilter(value) {
    setFilter(value);
    setPage(1);
    handleData(page, value);
  }

  useEffect(() => {
    if (total === page * 5 || total <= page * 5) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
  }, [page, total]);

  useEffect(() => {
    setFields(data);
  }, [data]);

  return (
    <Container>
      <DashboardViewLine>
        <SearchInput
          name="search"
          placeholder={search}
          onChange={(e) => handleFilter(e.target.value)}
        />
        <ButtonAction
          type="button"
          onClick={() => history.push(`/${baseurl}/add`)}
        >
          Cadastrar
        </ButtonAction>
      </DashboardViewLine>
      <DashboardViewLine>
        {titles.map((title) => (
          <DashboardTitle key={title}>{title}</DashboardTitle>
        ))}
      </DashboardViewLine>
      {fields.map((d) => (
        <DashboardViewLine key={d.id}>
          <DashboardItem>{d.id}</DashboardItem>
          <DashboardItem>{d.name}</DashboardItem>
          <DashboardItem>{d.createdAt}</DashboardItem>
          <DashboardItem>
            <MdEdit
              color="#999"
              size={30}
              onClick={() => history.push(`/${baseurl}/edit/${d.id}`, d)}
            />
            <MdDelete
              color="#999"
              size={30}
              onClick={() => handleDelete(d.id)}
            />
          </DashboardItem>
        </DashboardViewLine>
      ))}
      <Pagination>
        <PreviusPage
          type="button"
          enabled={page !== 1}
          onClick={() => handlePage(-1)}
        >
          <IoMdArrowBack color="#FFF" size={30} />
        </PreviusPage>
        <span>{loading ? <Loading color="#FFF" size={30} /> : page}</span>
        <ForwardPage
          type="button"
          lastPage={lastPage}
          onClick={() => handlePage(1)}
        >
          <IoMdArrowForward color="#FFF" size={30} />
        </ForwardPage>
      </Pagination>
    </Container>
  );
}

DashboardView.propTypes = {
  data: PropTypes.array,
  search: PropTypes.string,
  titles: PropTypes.array,
  baseurl: PropTypes.string,
  total: PropTypes.number,
  handleData: PropTypes.func,
  loading: PropTypes.bool,
};

DashboardView.defaultProps = {
  data: [],
  search: '',
  titles: [],
  baseurl: '',
  total: 0,
  loading: false,
  handleData: () => {},
};
