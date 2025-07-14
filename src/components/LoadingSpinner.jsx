import styled from "styled-components";

export const Spinner = styled.div`
  border: 3px solid #ffffff;
  border-top: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.6s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;