import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, ContentContainer } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <ContentContainer>{children}</ContentContainer>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
