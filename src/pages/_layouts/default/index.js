import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

import Header from '~/components/Header';

export default function DefaultLayout({ children, initialPage }) {
  return (
    <Wrapper>
      <Header initialPage={initialPage} />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  initialPage: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  initialPage: false,
};
