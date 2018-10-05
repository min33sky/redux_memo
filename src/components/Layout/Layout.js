import React from 'react';
import styled from 'styled-components';
import { media } from 'lib/styleUtils';

const Wrapper = styled.div`
  padding-top: 60px; /* 헤더 높이 */
`;

const Layout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

Layout.Main = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  width: 1200px;
  position: relative;
  transition: all 0.3s;

  ${media.desktop`
    width: 990px;
  `};

  ${media.tablet`
     margin-top: 1rem;
    width: calc(100% - 2rem);
  `};

  ${media.mobile`
    margin-top: 0.5rem;
    width: calc(100% - 1rem);
  `};
`;

export default Layout;
