import React from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

export default function Loading({ color, size }) {
  return (
    <Container>
      <FaSpinner color={color} size={size} />
    </Container>
  );
}

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Loading.defaultProps = {
  color: '#FFF',
  size: 24,
};
