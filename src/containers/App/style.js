import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background-color: ${({ isAuthenticated }) =>
    isAuthenticated ? '#fff' : '#d2d6de'} !important;
  ${({ isAuthenticated }) => isAuthenticated && 'height: unset;'}
  .content-header {
    margin: 0;
    padding: 25px 30px 0 30px;
  }
  .content {
    padding: 30px 15px;
  }
`;
