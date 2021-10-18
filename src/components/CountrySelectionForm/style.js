import styled from "styled-components";

export const FormContainer = styled.div`
  @media (max-width: 720px) {
    width: 100%;

    top: 0rem;
    left: 0rem;

    border-radius: 0 0 1.875rem 1.875rem;
  }
  width: 31.25rem;

  background: #ffffff;
  border-radius: 1.875rem;

  padding: 1.25rem 2.5rem;

  position: absolute;
  top: 2.5rem;
  left: 2.5rem;

  z-index: 1;

  h1 {
    margin-bottom: 1rem;
    color: var(--text-title);
  }

  p {
    margin: 1rem 0;
    font-style: italic;

    color: var(--text-body);
  }
`;
