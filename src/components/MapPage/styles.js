import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100vw;
  height: 100vh;

  .leaflet-container {
    z-index: 0;
  }
`;
