import React from 'react';
import styled from 'styled-components';

const KeyBox = styled.div`
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  word-break: break-all;
  font-family: monospace;
  font-size: 14px;
  margin-bottom: 16px;
  position: relative;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #20a495;
  color: white;
  border: none;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.4;

  &:hover {
    background-color: #178575;
    opacity: 1;
  }
`;

export function PrivateKeyDisplay({ privateKey }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateKey)
      .then(() => alert("클립보드에 복사되었습니다."))
      .catch(err => alert("복사 실패: " + err));
  };

  return (
    <KeyBox>
      {privateKey}
      <CopyButton onClick={copyToClipboard}>복사</CopyButton>
    </KeyBox>
  );
}