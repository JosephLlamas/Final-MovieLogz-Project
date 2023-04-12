import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import React from "react";

const Loading = () => {
  return (
    <LoadWrapper>
      <FiLoaderStyle />
    </LoadWrapper>
  );
};

const LoadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FiLoaderStyle = styled(FiLoader)`
  font-size: 80px;
  animation: rotation 1s infinite linear;
  width: 100px;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export default Loading;
