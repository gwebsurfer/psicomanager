import styled from '@emotion/styled';

// This file will not have access to the theme
export const ViewContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  text-align: center;

  button {
    max-width: 300px;
  }

  h1 {
    margin: 0;
  }

  p {
    margin: 0;
    margin-bottom: 10px;
    max-inline-size: 50ch;
    text-wrap: balance;
  }
`;
